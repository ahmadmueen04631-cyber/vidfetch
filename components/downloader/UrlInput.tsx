"use client";

// ============================================================
// ClipDown — URL Input with Platform Detection
// Mobile-Optimized with Strict Form Submit Prevention
// ============================================================

import React, { useState, useRef, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { detectAndValidate } from "@/lib/platforms/detect-platform";
import type { DetectionResult, Platform } from "@/lib/types";
import { Button } from "@/components/ui/Button";

// Platform Icons (inline SVG for zero dependency)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#fcb045" />
          <stop offset="50%" stopColor="#fd1d1d" />
          <stop offset="100%" stopColor="#833ab4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"
        fill="#ff0050"
      />
      <path
        d="M18.58 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"
        fill="#010101"
        style={{ transform: "translateX(-1px)" }}
      />
      <path
        d="M18.08 6.19a4.83 4.83 0 01-3.77-4.25V1.5h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V8.51a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.19a8.18 8.18 0 004.78 1.52V6.23a4.85 4.85 0 01-1.01-.04z"
        fill="#00f2ea"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#ff0000" />
      <path d="M10 8.5l5.5 3.5-5.5 3.5V8.5z" fill="white" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#1da1f2" />
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="white"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1877f2" />
      <path
        d="M14 12h-2v7h-3v-7H7.5V9.5H9V8c0-2 1-3 3-3h2v2.5h-1c-.5 0-1 .5-1 1v1h2L14 12z"
        fill="white"
      />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#e60023" />
      <path
        d="M12 6c-3.3 0-6 2.5-6 5.7 0 2.2 1.3 4.1 3.2 5-.1-.7-.2-1.7 0-2.4l1.3-5.3s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1.1.6 2 1.7 2 2 0 3.6-2.1 3.6-5.2 0-2.7-1.9-4.6-4.7-4.6z"
        fill="white"
      />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ff4500" />
      <circle cx="9" cy="11" r="1.5" fill="white" />
      <circle cx="15" cy="11" r="1.5" fill="white" />
      <path d="M9 15c1 1 5 1 6 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

const PLATFORM_ICONS: Record<Exclude<Platform, "unknown">, React.ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  pinterest: PinterestIcon,
  reddit: RedditIcon,
};

const PLATFORM_LABELS: Record<Exclude<Platform, "unknown">, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitter: "Twitter / X",
  facebook: "Facebook",
  pinterest: "Pinterest",
  reddit: "Reddit",
};

const PLATFORM_COLORS: Record<Exclude<Platform, "unknown">, string> = {
  instagram: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
  tiktok: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800",
  youtube: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  twitter: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800",
  facebook: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  pinterest: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800",
  reddit: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
};

interface UrlInputProps {
  onSubmit: (url: string, detection: DetectionResult) => void;
  loading?: boolean;
  size?: "default" | "large";
  placeholder?: string;
  className?: string;
}

export function UrlInput({
  onSubmit,
  loading = false,
  size = "default",
  placeholder = "Paste a video URL — Instagram, TikTok, or YouTube",
  className,
}: UrlInputProps) {
  const [value, setValue] = useState("");
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  // Run detection whenever value changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setValue(raw);
    setError(null);

    if (!raw.trim()) {
      setDetection(null);
      return;
    }

    if (raw.trim().length > 10) {
      const result = detectAndValidate(raw.trim());
      setDetection(result);
    } else {
      setDetection(null);
    }
  }, []);

  const handleSubmit = useCallback(
    (e?: React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const trimmed = value.trim();
      if (!trimmed) {
        setError("Please paste a video URL.");
        inputRef.current?.focus();
        return;
      }

      const result = detectAndValidate(trimmed);

      if (!result.isValid) {
        setError(result.error ?? "Please enter a valid URL.");
        setDetection(result);
        return;
      }

      setError(null);
      onSubmit(trimmed, result);
    },
    [value, onSubmit]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    const trimmed = pasted.trim();
    if (trimmed) {
      setTimeout(() => {
        const result = detectAndValidate(trimmed);
        setDetection(result);
        setError(null);
      }, 0);
    }
  }, []);

  const handleClear = useCallback(() => {
    setValue("");
    setDetection(null);
    setError(null);
    inputRef.current?.focus();
  }, []);

  const isLarge = size === "large";
  const detectedPlatform =
    detection?.platform && detection.platform !== "unknown"
      ? (detection.platform as Exclude<Platform, "unknown">)
      : null;

  const PlatformIcon = detectedPlatform ? PLATFORM_ICONS[detectedPlatform] : null;

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit(e);
        }}
        noValidate
      >
        <label
          htmlFor={inputId}
          className="sr-only"
        >
          Paste a video URL to download
        </label>

        {/* Main Input Row */}
        <div
          className={cn(
            "relative flex items-center gap-2",
            "bg-[var(--bg-elevated)] rounded-2xl",
            "border-2 transition-all duration-200",
            "shadow-[var(--shadow-md)]",
            focused
              ? "border-indigo-400 shadow-[0_0_0_4px_rgba(99,102,241,0.12),var(--shadow-lg)]"
              : error
              ? "border-red-400"
              : detection?.isValid && detection.platform !== "unknown"
              ? "border-emerald-400"
              : "border-[var(--border-default)] hover:border-[var(--border-strong)]",
            isLarge ? "p-2" : "p-1.5"
          )}
        >
          {/* Left icon — link or platform */}
          <div
            className={cn(
              "shrink-0 flex items-center justify-center",
              "transition-all duration-300",
              isLarge ? "ml-2 w-6 h-6" : "ml-1.5 w-5 h-5"
            )}
          >
            {detectedPlatform && PlatformIcon ? (
              <PlatformIcon className="w-full h-full animate-scale-in" />
            ) : (
              <LinkIcon
                className={cn(
                  "w-full h-full",
                  focused ? "text-indigo-400" : "text-[var(--text-muted)]"
                )}
              />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            id={inputId}
            type="url"
            value={value}
            onChange={handleChange}
            onPaste={handlePaste}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(e);
              }
            }}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "flex-1 min-w-0 bg-transparent border-none outline-none",
              "text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:truncate",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isLarge ? "text-sm sm:text-base py-2.5 px-1" : "text-xs sm:text-sm py-2 px-1"
            )}
          />

          {/* Clear button */}
          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "shrink-0 w-6 h-6 flex items-center justify-center rounded-lg",
                "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                "hover:bg-[var(--bg-surface)] transition-all duration-150"
              )}
              aria-label="Clear input"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            size={isLarge ? "lg" : "md"}
            loading={loading}
            disabled={loading}
            className="shrink-0 px-3.5 sm:px-6 text-xs sm:text-base font-semibold"
            aria-label="Download video"
          >
            {loading ? "Analyzing…" : "Download"}
          </Button>
        </div>

        {/* Platform detection indicator */}
        <div className="mt-2.5 min-h-[1.5rem] flex items-center gap-2">
          {detectedPlatform && detection?.isValid && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1",
                "rounded-full border text-xs font-medium",
                "animate-slide-up",
                PLATFORM_COLORS[detectedPlatform]
              )}
              role="status"
              aria-live="polite"
            >
              {PlatformIcon && <PlatformIcon className="w-3.5 h-3.5" />}
              {PLATFORM_LABELS[detectedPlatform]} detected
              <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-3.5-3.5 1.41-1.41L10 13.67l5.59-5.59L17 9.5l-7 7z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Error message */}
          {error && (
            <p
              id={`${inputId}-error`}
              className="text-xs text-red-500 flex items-center gap-1 animate-slide-up"
              role="alert"
              aria-live="assertive"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}

          {/* Idle hint */}
          {!value && !error && (
            <p className="text-xs text-[var(--text-muted)]">
              Supported: Instagram · TikTok · YouTube · Twitter/X · Facebook · Pinterest · Reddit
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
