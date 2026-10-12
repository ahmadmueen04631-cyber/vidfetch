// ============================================================
// VidFetch — Feature Grid (Why Use Our Tool)
// ============================================================

import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Instant Detection",
    description:
      "Paste any supported URL and VidFetch automatically identifies the platform and content type in real time.",
    icon: BoltIcon,
    color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
  },
  {
    title: "No Account Required",
    description:
      "No login, no sign-up, no account. Just paste a URL and get access to available download options.",
    icon: UserOffIcon,
    color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Privacy-Conscious",
    description:
      "Your submitted URLs are only used to fetch available metadata. We don't store your video files.",
    icon: ShieldIcon,
    color: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Mobile-Friendly",
    description:
      "Designed mobile-first. Works perfectly on phones, tablets, and desktops with a clean responsive layout.",
    icon: DeviceIcon,
    color: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Multiple Formats",
    description:
      "Access available quality options — from HD resolutions to compact formats — depending on what the provider returns.",
    icon: LayersIcon,
    color: "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400",
  },
  {
    title: "Three Platforms",
    description:
      "Instagram, TikTok, and YouTube all supported through one interface. More platforms coming soon.",
    icon: GridIcon,
    color: "bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400",
  },
];

export function FeatureGrid() {
  return (
    <section
      className="section-py bg-[var(--bg-surface)]"
      aria-labelledby="features-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Why VidFetch
          </span>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Built to be simple
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">
            No clutter, no ads blocking the UI, no confusing options.
            Just a clean tool that does one thing well.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: (typeof FEATURES)[0]) {
  return (
    <div
      className={cn(
        "relative group p-6 rounded-2xl",
        "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
        "hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)]",
        "hover:-translate-y-0.5",
        "transition-all duration-200"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
          "transition-transform duration-300 group-hover:scale-110",
          color
        )}
      >
        <Icon />
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────
function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function UserOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 11l-4 4m0-4l4 4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
