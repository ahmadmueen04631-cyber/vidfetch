"use client";

// ============================================================
// ClipDown — Downloader (Main orchestrator)
// Mobile-Optimized with Zero Page Refreshing & Clean Footers
// ============================================================

import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { UrlInput } from "@/components/downloader/UrlInput";
import { ProcessingState } from "@/components/downloader/ProcessingState";
import { ErrorState } from "@/components/downloader/ErrorState";
import { VideoPreview } from "@/components/downloader/VideoPreview";
import { DownloadOptions } from "@/components/downloader/DownloadOptions";
import { trackUrlSubmit, trackPlatformDetected, trackVideoProcessed, trackDownloadError } from "@/lib/analytics";
import { detectAndValidate } from "@/lib/platforms/detect-platform";
import type { DownloaderState, DetectionResult, VideoMetadata, DownloadOption, ErrorCode } from "@/lib/types";

// ── State Machine ──────────────────────────────────────────
type Action =
  | { type: "SUBMIT"; url: string; detection: DetectionResult }
  | { type: "FETCH_SUCCESS"; metadata: VideoMetadata; downloads: DownloadOption[] }
  | { type: "FETCH_ERROR"; code: string; message: string }
  | { type: "RESET" };

function reducer(state: DownloaderState, action: Action): DownloaderState {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        status: "fetching",
        url: action.url,
        detectionResult: action.detection,
        error: undefined,
        metadata: undefined,
        downloads: undefined,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        status: "ready",
        metadata: action.metadata,
        downloads: action.downloads,
        error: undefined,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        status: "error",
        error: {
          code: action.code as ErrorCode,
          message: action.message,
        },
        metadata: undefined,
        downloads: undefined,
      };
    case "RESET":
      return { status: "idle", url: "" };
  }
}

const INITIAL_STATE: DownloaderState = { status: "idle", url: "" };

// ── Downloader Component ───────────────────────────────────
interface DownloaderProps {
  platform?: string;
}

export function Downloader({ platform }: DownloaderProps) {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(
    async (url: string, detection: DetectionResult) => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      dispatch({ type: "SUBMIT", url, detection });

      // Track analytics
      trackUrlSubmit(url, detection.platform);
      if (detection.platform !== "unknown") {
        trackPlatformDetected(detection.platform);
      }

      // Update URL query in browser address bar without triggering Next.js route navigation
      if (typeof window !== "undefined") {
        const params = new URLSearchParams({ url });
        window.history.replaceState(null, "", `?${params.toString()}`);
      }

      try {
        const res = await fetch("/api/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
        });

        const json = await res.json();

        if (!json.success) {
          const errorCode = json.error?.code ?? "UNKNOWN_ERROR";
          dispatch({
            type: "FETCH_ERROR",
            code: errorCode,
            message:
              json.error?.message ?? "An unexpected error occurred.",
          });
          trackDownloadError(detection.platform, errorCode);
          return;
        }

        dispatch({
          type: "FETCH_SUCCESS",
          metadata: json.data.metadata,
          downloads: json.data.downloads,
        });

        trackVideoProcessed(detection.platform);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        dispatch({
          type: "FETCH_ERROR",
          code: "NETWORK_ERROR",
          message:
            "A network error occurred. Please check your connection and try again.",
        });
      }
    },
    []
  );

  // Clean up any pending abortable fetch on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // Pick up ?url= from query string (from direct link navigation)
  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam && state.status === "idle") {
      const detection = detectAndValidate(urlParam);
      if (detection.isValid) {
        handleSubmit(urlParam, detection);
      }
    }
  }, [searchParams, state.status, handleSubmit]);

  const handleReset = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: "RESET" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (state.url && state.detectionResult) {
      handleSubmit(state.url, state.detectionResult);
    }
  }, [state.url, state.detectionResult, handleSubmit]);

  const platformLabel =
    platform
      ? platform.charAt(0).toUpperCase() + platform.slice(1)
      : undefined;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* URL Input */}
      <div className={cn(state.status !== "idle" && "mb-6")}>
        <UrlInput
          onSubmit={handleSubmit}
          loading={state.status === "fetching"}
          size="large"
          placeholder={
            platform
              ? `Paste a ${platformLabel} URL here`
              : "Paste a video URL — Instagram, TikTok, or YouTube"
          }
        />
      </div>

      {/* States */}
      {state.status === "fetching" && (
        <ProcessingState
          platform={
            state.detectionResult?.platform !== "unknown"
              ? platformLabel ?? state.detectionResult?.platform
              : undefined
          }
        />
      )}

      {state.status === "error" && state.error && (
        <ErrorState
          code={state.error.code}
          message={state.error.message}
          onRetry={handleRetry}
          onClear={handleReset}
        />
      )}

      {state.status === "ready" && state.metadata && (
        <ResultCard
          metadata={state.metadata}
          downloads={state.downloads ?? []}
          onReset={handleReset}
        />
      )}

      {/* Idle empty state */}
      {state.status === "idle" && (
        <div
          className="mt-4 text-center py-6"
          aria-hidden="true"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Paste a video URL above to get started.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Result Card ────────────────────────────────────────────
function ResultCard({
  metadata,
  downloads,
  onReset,
}: {
  metadata: VideoMetadata;
  downloads: DownloadOption[];
  onReset: () => void;
}) {
  return (
    <div
      className={cn(
        "glass-card p-4 sm:p-6 animate-scale-in"
      )}
    >
      {/* Video preview */}
      <VideoPreview metadata={metadata} />

      {/* Divider */}
      <div className="h-px bg-[var(--border-subtle)] my-4 sm:my-5" />

      {/* Download options */}
      <DownloadOptions downloads={downloads} platform={metadata.platform} />

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-[var(--text-muted)]">
          Only publicly accessible content is supported.
          Users are responsible for having permission to download this content.
        </p>
        <button
          onClick={onReset}
          className={cn(
            "text-xs font-medium text-indigo-600 dark:text-indigo-400",
            "hover:text-indigo-700 dark:hover:text-indigo-300",
            "transition-colors duration-150 shrink-0 self-start sm:self-auto"
          )}
        >
          Try another URL
        </button>
      </div>
    </div>
  );
}
