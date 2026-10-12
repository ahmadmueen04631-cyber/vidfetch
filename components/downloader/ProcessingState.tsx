// ============================================================
// ClipDown — Processing State (Loading UI)
// ============================================================

import { cn } from "@/lib/utils";

type Step = {
  label: string;
  done: boolean;
  active: boolean;
};

interface ProcessingStateProps {
  steps?: Step[];
  platform?: string;
}

const DEFAULT_STEPS: Step[] = [
  { label: "Detecting platform", done: false, active: true },
  { label: "Fetching video info", done: false, active: false },
  { label: "Preparing download options", done: false, active: false },
];

export function ProcessingState({
  steps = DEFAULT_STEPS,
  platform,
}: ProcessingStateProps) {
  return (
    <div
      className={cn(
        "glass-card p-8 animate-fade-in",
        "flex flex-col items-center text-center"
      )}
      role="status"
      aria-live="polite"
      aria-label="Processing video"
    >
      {/* Animated spinner ring */}
      <div className="relative w-16 h-16 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[var(--border-subtle)]" />
        {/* Spinning gradient arc */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spinner-grad" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#spinner-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="44 132"
          />
        </svg>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v12M6 10l6 6 6-6"
            />
            <rect x="4" y="18" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Analyzing video
        {platform ? ` from ${platform}` : ""}…
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-xs">
        Fetching available download options. This usually takes a few seconds.
      </p>

      {/* Step indicators */}
      <div className="w-full max-w-xs space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 text-sm",
              "transition-opacity duration-300",
              !step.active && !step.done && "opacity-40"
            )}
          >
            {/* Step icon */}
            <div
              className={cn(
                "w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center",
                "transition-all duration-300",
                step.done
                  ? "bg-emerald-500"
                  : step.active
                  ? "bg-indigo-500"
                  : "bg-[var(--border-default)]"
              )}
            >
              {step.done ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : step.active ? (
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
              )}
            </div>

            <span
              className={cn(
                "font-medium",
                step.done
                  ? "text-emerald-600 dark:text-emerald-400"
                  : step.active
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)]"
              )}
            >
              {step.label}
            </span>

            {step.active && (
              <span className="ml-auto text-xs text-indigo-500 font-medium">
                Working…
              </span>
            )}
            {step.done && (
              <span className="ml-auto text-xs text-emerald-500 font-medium">
                Done
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
