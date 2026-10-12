// ============================================================
// ClipDown — How It Works Section
// ============================================================

import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Paste the URL",
    description:
      "Copy the video URL from Instagram, TikTok, or YouTube and paste it into the input field.",
    icon: PasteIcon,
    color: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    number: "02",
    title: "Detect & Analyze",
    description:
      "VidFetch automatically detects the platform, validates the link, and fetches available video information.",
    icon: DetectIcon,
    color: "from-violet-500 to-pink-500",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    number: "03",
    title: "Choose & Download",
    description:
      "Select from available quality and format options, then download the video directly to your device.",
    icon: DownloadIcon,
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
  },
];

export function HowItWorks() {
  return (
    <section
      className="section-py"
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Download in three steps
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">
            No account needed. No unnecessary steps. Just a URL.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
            aria-hidden="true"
          >
            <div className="w-full h-full bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 dark:from-indigo-700 dark:via-violet-700 dark:to-pink-700 opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Browser mockup illustration */}
        <div className="mt-16 max-w-2xl mx-auto">
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center",
        "p-6 rounded-2xl",
        "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
        "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
        "transition-all duration-300 hover:-translate-y-1",
        "group"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${step.glow} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Number badge */}
      <div className="relative z-10 mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            "bg-gradient-to-br text-white shadow-md",
            "group-hover:scale-110 transition-transform duration-300",
            step.color
          )}
        >
          <Icon />
        </div>
        {/* Step number */}
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-muted)] flex items-center justify-center">
          {index + 1}
        </span>
      </div>

      <h3 className="relative z-10 text-lg font-semibold text-[var(--text-primary)] mb-2">
        {step.title}
      </h3>
      <p className="relative z-10 text-sm text-[var(--text-secondary)] leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

// ── Browser Mockup ─────────────────────────────────────────
function BrowserMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-xl)]"
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="bg-[var(--bg-surface)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border-subtle)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 bg-[var(--bg-elevated)] rounded-lg flex items-center px-3 gap-2">
            <svg className="w-3 h-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-[var(--text-muted)]">vidfetch.me</span>
          </div>
        </div>
      </div>

      {/* Page content mockup */}
      <div className="bg-[var(--bg-elevated)] p-5">
        {/* URL input mockup */}
        <div className="flex items-center gap-2 p-3 bg-[var(--bg-page)] rounded-xl border-2 border-indigo-400 shadow-[0_0_0_4px_rgba(99,102,241,0.12)] mb-4">
          <div className="w-4 h-4 rounded bg-pink-400 flex-shrink-0" />
          <div className="flex-1 h-3 bg-[var(--border-subtle)] rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-indigo-200 to-violet-200 dark:from-indigo-800 dark:to-violet-800 rounded-full" />
          </div>
          <div className="px-3 py-1.5 bg-indigo-600 rounded-lg flex-shrink-0">
            <div className="h-2 w-14 bg-white/60 rounded-full" />
          </div>
        </div>

        {/* Detection chip */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-full">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-amber-400 to-pink-500" />
            <div className="h-2 w-24 bg-pink-200 dark:bg-pink-800 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Result card mockup */}
        <div className="bg-[var(--bg-page)] rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-pink-100 to-violet-100 dark:from-pink-950 dark:to-violet-950 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <div className="h-3 bg-[var(--border-default)] rounded w-3/4 mb-2" />
            <div className="h-2.5 bg-[var(--border-subtle)] rounded w-1/2 mb-4" />
            <div className="space-y-2">
              {["1080p", "720p", "480p"].map((q) => (
                <div key={q} className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-6 w-10 bg-[var(--border-subtle)] rounded" />
                    <div className="h-6 w-14 bg-[var(--border-subtle)] rounded" />
                  </div>
                  <div className="h-7 w-20 bg-indigo-100 dark:bg-indigo-900 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step Icons ─────────────────────────────────────────────
function PasteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  );
}

function DetectIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v12M6 10l6 6 6-6" />
      <rect x="4" y="18" width="16" height="2" rx="1" fill="white" />
    </svg>
  );
}
