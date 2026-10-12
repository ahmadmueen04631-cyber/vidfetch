"use client";

// ============================================================
// ClipDown — Download Options List (Mobile Optimized)
// Compact, Responsive Rows with Zero Text Overlaps
// ============================================================

import React, { useState } from "react";
import { cn, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { DownloadOption, Platform } from "@/lib/types";
import { trackDownloadClicked, trackDownloadSuccess } from "@/lib/analytics";

interface DownloadOptionsProps {
  downloads: DownloadOption[];
  platform: Platform;
}

export function DownloadOptions({ downloads, platform }: DownloadOptionsProps) {
  if (downloads.length === 0) {
    return (
      <div className="flex items-center gap-2 py-4 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
        <span className="text-amber-600 dark:text-amber-400 text-sm">
          No download options are available for this video.
        </span>
      </div>
    );
  }

  const allNeedExtraction = downloads.every((d) => d.needsExtraction);

  return (
    <div className="space-y-2.5" aria-label="Available download options">
      <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
        Available Downloads ({downloads.length})
      </h4>
      {allNeedExtraction && (
        <div className="flex items-start gap-2 py-2.5 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/70 mb-1">
          <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold">Server-side extraction required.</span>{" "}
            Downloads may fail if the extraction service is not configured. The video will be processed on the server before downloading.
          </p>
        </div>
      )}
      {downloads.map((option, i) => (
        <DownloadRow
          key={option.id}
          option={option}
          platform={platform}
          index={i}
        />
      ))}
    </div>
  );
}

interface ProgressState {
  percent: number;
  loaded: number;
  total: number;
}

// ── Single Download Row Component ──────────────────────────
function DownloadRow({
  option,
  platform,
  index,
}: {
  option: DownloadOption;
  platform: Platform;
  index: number;
}) {
  const [status, setStatus] = useState<"idle" | "preparing" | "downloading" | "done" | "error">(
    "idle"
  );
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleDownload = async () => {
    if (!option.downloadUrl || status === "preparing" || status === "downloading") return;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus("preparing");
    setProgress(null);
    setErrorMessage(null);
    trackDownloadClicked(platform, option.format, option.quality);

    const filename = buildFilename(option, platform);
    const downloadEndpoint = `/api/download?url=${encodeURIComponent(
      option.downloadUrl
    )}&filename=${encodeURIComponent(filename)}&format=${encodeURIComponent(
      option.format
    )}&quality=${encodeURIComponent(option.quality ?? "")}`;

    try {
      // 1. Fetch direct binary stream with cancellation signal
      const res = await fetch(downloadEndpoint, {
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorText = "Download could not be prepared.";
        try {
          const json = await res.json();
          errorText = json.error || errorText;
        } catch {
          // Ignore
        }
        throw new Error(errorText);
      }

      if (!res.body) {
        throw new Error("Direct streaming not supported by browser.");
      }

      // 2. Read headers for real Content-Length
      const contentLengthHeader = res.headers.get("content-length");
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;

      setStatus("downloading");

      // 3. Read stream chunks and track live progress with throttling (max once per 100ms)
      const reader = res.body.getReader();
      const chunks: BlobPart[] = [];
      let loadedBytes = 0;
      let lastProgressTick = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          chunks.push(value);
          loadedBytes += value.length;
        }

        const now = Date.now();
        if (now - lastProgressTick > 100) {
          lastProgressTick = now;
          const percent = totalBytes > 0
            ? Math.min(99, Math.round((loadedBytes / totalBytes) * 100))
            : 50;

          setProgress({
            percent,
            loaded: loadedBytes,
            total: totalBytes,
          });
        }
      }

      // 4. Download 100% complete — save file to device
      setProgress({
        percent: 100,
        loaded: loadedBytes,
        total: totalBytes || loadedBytes,
      });

      const blob = new Blob(chunks, {
        type: option.format === "mp3" ? "audio/mpeg" : "video/mp4",
      });

      if (blob.size === 0) {
        throw new Error("Downloaded file is empty.");
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);

      setStatus("done");
      trackDownloadSuccess(platform);
      setTimeout(() => {
        setStatus("idle");
        setProgress(null);
      }, 4000);
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setStatus("idle");
        setProgress(null);
        return;
      }

      console.error("[Download Error]:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to complete download. Please try another quality option."
      );
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage(null);
        setProgress(null);
      }, 6000);
    }
  };

  const isFirst = index === 0;
  const isBusy = status === "preparing" || status === "downloading";

  // Clean, non-repetitive mobile display label
  const displayTitle = getCleanLabel(option);

  return (
    <div className="space-y-1.5">
      <div
        className={cn(
          "flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all duration-200 border",
          "animate-slide-up",
          status === "error"
            ? "bg-rose-50/50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800"
            : isBusy
            ? "bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 shadow-xs"
            : isFirst
            ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
            : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
        )}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Left: Format + Quality info */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Format badge */}
          <span
            className={cn(
              "text-[11px] font-bold px-1.5 py-0.5 rounded-md uppercase font-mono shrink-0",
              option.isAudioOnly
                ? "bg-violet-100 dark:bg-violet-900/80 text-violet-700 dark:text-violet-300"
                : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
            )}
          >
            {option.format}
          </span>

          {/* Quality badge */}
          {option.quality && !option.isAudioOnly && (
            <span
              className={cn(
                "text-[11px] font-semibold px-1.5 py-0.5 rounded-md shrink-0",
                isFirst
                  ? "bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
              )}
            >
              {option.quality}
            </span>
          )}

          {/* Label + note */}
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] truncate flex items-center">
              <span className="truncate">{displayTitle}</span>
              {isFirst && (
                <span className="ml-1.5 text-[10px] sm:text-xs text-indigo-500 dark:text-indigo-400 font-normal shrink-0">
                  Best
                </span>
              )}
            </p>
            {option.fileSize && (
              <p className="text-[11px] text-[var(--text-muted)] truncate">
                {formatFileSize(option.fileSize)}
              </p>
            )}
          </div>
        </div>

        {/* Right: Download button */}
        <div className="shrink-0">
          {!option.downloadUrl ? (
            <span className="text-xs text-[var(--text-muted)] px-2.5 py-1">
              Unavailable
            </span>
          ) : (
            <Button
              variant={status === "error" ? "ghost" : isFirst ? "primary" : "secondary"}
              size="sm"
              loading={isBusy}
              onClick={handleDownload}
              aria-label={`Download ${option.label} ${option.quality ?? ""}`}
              leftIcon={
                status === "done" ? (
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === "error" ? (
                  <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : isBusy ? undefined : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12M6 10l6 6 6-6" />
                  </svg>
                )
              }
            >
              {status === "preparing"
                ? "Preparing..."
                : status === "downloading"
                ? `${progress?.percent ?? 0}%`
                : status === "done"
                ? "Downloaded"
                : status === "error"
                ? "Retry"
                : "Download"}
            </Button>
          )}
        </div>
      </div>

      {/* Real-time Progress Bar & Status Details */}
      {isBusy && (
        <div className="px-3 space-y-1 animate-fade-in">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block shrink-0" />
              {status === "preparing"
                ? "Preparing Video Stream..."
                : `Downloading... ${progress?.percent ?? 0}%`}
            </span>
            <span className="text-[var(--text-muted)] shrink-0 ml-2">
              {progress?.total && progress.total > 0
                ? `${formatFileSize(progress.loaded)} / ${formatFileSize(progress.total)}`
                : progress?.loaded
                ? `${formatFileSize(progress.loaded)}`
                : "Starting..."}
            </span>
          </div>

          {/* Progress bar container */}
          <div className="w-full h-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 overflow-hidden border border-indigo-200/50 dark:border-indigo-800/50">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-200 ease-out",
                status === "preparing"
                  ? "w-1/3 bg-indigo-400/60 animate-pulse"
                  : "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"
              )}
              style={{
                width: status === "preparing" ? undefined : `${progress?.percent ?? 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="text-xs text-rose-500 dark:text-rose-400 px-3">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

// Helper to format clean, short mobile labels
function getCleanLabel(option: DownloadOption): string {
  if (option.isAudioOnly) return "Audio Track";
  if (option.quality?.includes("1080")) return "Full HD Video";
  if (option.quality?.includes("720")) return "HD Video";
  if (option.quality?.includes("480")) return "SD Video";
  if (option.quality?.includes("360")) return "Compact Video";
  return option.label.replace(/\([^)]*\)/g, "").trim();
}

// ── Build download filename ────────────────────────────────
function buildFilename(option: DownloadOption, platform: Platform): string {
  const cleanQuality = option.quality
    ? option.quality.toLowerCase().replace(/[^a-z0-9]/g, "")
    : option.format;
  return `vidfetch-${platform}-${cleanQuality}.${option.format}`;
}
