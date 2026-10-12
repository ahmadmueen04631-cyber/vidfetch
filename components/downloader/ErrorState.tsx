// ============================================================
// ClipDown — Error State Component
// ============================================================

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { ErrorCode } from "@/lib/types";

interface ErrorStateProps {
  code?: ErrorCode;
  message?: string;
  onRetry?: () => void;
  onClear?: () => void;
}

const ERROR_CONFIG: Record<
  ErrorCode,
  { icon: string; title: string; color: string }
> = {
  INVALID_URL: {
    icon: "🔗",
    title: "Invalid URL",
    color: "amber",
  },
  UNSUPPORTED_PLATFORM: {
    icon: "🚫",
    title: "Unsupported Platform",
    color: "amber",
  },
  PRIVATE_CONTENT: {
    icon: "🔒",
    title: "Private Content",
    color: "amber",
  },
  CONTENT_UNAVAILABLE: {
    icon: "📭",
    title: "Video Unavailable",
    color: "red",
  },
  PROVIDER_UNAVAILABLE: {
    icon: "⚡",
    title: "Service Unavailable",
    color: "red",
  },
  PROVIDER_NOT_CONFIGURED: {
    icon: "🔧",
    title: "Provider Not Configured",
    color: "indigo",
  },
  RATE_LIMITED: {
    icon: "⏱",
    title: "Too Many Requests",
    color: "amber",
  },
  NETWORK_ERROR: {
    icon: "📡",
    title: "Network Error",
    color: "red",
  },
  UNKNOWN_ERROR: {
    icon: "❌",
    title: "Something Went Wrong",
    color: "red",
  },
};

const COLOR_STYLES: Record<
  string,
  { bg: string; border: string; icon: string; title: string }
> = {
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    icon: "bg-amber-100 dark:bg-amber-900",
    title: "text-amber-800 dark:text-amber-200",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    icon: "bg-red-100 dark:bg-red-900",
    title: "text-red-800 dark:text-red-200",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    border: "border-indigo-200 dark:border-indigo-800",
    icon: "bg-indigo-100 dark:bg-indigo-900",
    title: "text-indigo-800 dark:text-indigo-200",
  },
};

export function ErrorState({
  code = "UNKNOWN_ERROR",
  message,
  onRetry,
  onClear,
}: ErrorStateProps) {
  const config = ERROR_CONFIG[code] ?? ERROR_CONFIG.UNKNOWN_ERROR;
  const colors = COLOR_STYLES[config.color];

  const isConfigError = code === "PROVIDER_NOT_CONFIGURED";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 animate-scale-in",
        colors.bg,
        colors.border
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            colors.icon
          )}
          aria-hidden="true"
        >
          <span className="text-xl">{config.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-base mb-1", colors.title)}>
            {config.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {message ?? "An unexpected error occurred. Please try again."}
          </p>

          {/* Config error — extra guidance */}
          {isConfigError && (
            <div className="mt-3 text-xs text-[var(--text-muted)] p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <p className="font-medium text-[var(--text-secondary)] mb-1">
                For administrators:
              </p>
              <p>
                Set the <code className="font-mono bg-[var(--bg-surface)] px-1 rounded">RAPIDAPI_KEY</code> environment variable in{" "}
                <code className="font-mono bg-[var(--bg-surface)] px-1 rounded">.env.local</code>{" "}
                to enable downloads. See <code className="font-mono bg-[var(--bg-surface)] px-1 rounded">.env.example</code> for details.
              </p>
            </div>
          )}

          {/* Actions */}
          {(onRetry || onClear) && (
            <div className="flex gap-2 mt-4">
              {onRetry && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onRetry}
                  leftIcon={
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  Try Again
                </Button>
              )}
              {onClear && (
                <Button variant="ghost" size="sm" onClick={onClear}>
                  Try a Different URL
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
