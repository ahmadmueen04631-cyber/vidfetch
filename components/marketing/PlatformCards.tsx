// ============================================================
// ClipDown — Platform Cards Section
// ============================================================

import Link from "next/link";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  {
    name: "Instagram",
    description:
      "Download public Instagram videos and Reels with a simple URL paste.",
    gradient: "from-amber-400 via-pink-500 to-purple-600",
    bgGlow: "rgba(225,48,108,0.08)",
    tools: [
      { label: "Video Downloader", href: "/instagram-video-downloader" },
      { label: "Reels Downloader", href: "/instagram-reels-downloader" },
    ],
    icon: InstagramSVG,
    supported: ["Public Videos", "Reels", "IGTV"],
  },
  {
    name: "TikTok",
    description:
      "Download public TikTok videos from any standard or short link.",
    gradient: "from-cyan-400 via-black to-pink-500",
    bgGlow: "rgba(0,242,234,0.06)",
    tools: [
      { label: "Video Downloader", href: "/tiktok-video-downloader" },
    ],
    icon: TikTokSVG,
    supported: ["Public Videos", "Short Links"],
  },
  {
    name: "YouTube",
    description:
      "Download public YouTube videos and Shorts in multiple quality options.",
    gradient: "from-red-500 to-red-700",
    bgGlow: "rgba(255,0,0,0.06)",
    tools: [
      { label: "Video Downloader", href: "/youtube-video-downloader" },
      { label: "Shorts Downloader", href: "/youtube-shorts-downloader" },
    ],
    icon: YouTubeSVG,
    supported: ["Videos", "Shorts", "HD / 4K"],
  },
  {
    name: "Twitter / X",
    description:
      "Extract HD videos and video clips from public Twitter / X posts.",
    gradient: "from-sky-400 to-black",
    bgGlow: "rgba(29,161,242,0.08)",
    tools: [
      { label: "Twitter Downloader", href: "/twitter-video-downloader" },
    ],
    icon: TwitterSVG,
    supported: ["Tweet Videos", "x.com Links"],
  },
  {
    name: "Facebook",
    description:
      "Download public Facebook watch videos, clips, and Facebook Reels.",
    gradient: "from-blue-500 to-blue-700",
    bgGlow: "rgba(24,119,242,0.08)",
    tools: [
      { label: "Facebook Downloader", href: "/facebook-video-downloader" },
    ],
    icon: FacebookSVG,
    supported: ["Public Videos", "Reels"],
  },
  {
    name: "Pinterest & Reddit",
    description:
      "Download public Pinterest video pins and Reddit post videos with audio.",
    gradient: "from-rose-500 to-orange-500",
    bgGlow: "rgba(230,0,35,0.08)",
    tools: [
      { label: "Pinterest Downloader", href: "/pinterest-video-downloader" },
      { label: "Reddit Downloader", href: "/reddit-video-downloader" },
    ],
    icon: PinterestSVG,
    supported: ["Video Pins", "Reddit MP4"],
  },
];

export function PlatformCards() {
  return (
    <section
      className="section-py bg-[var(--bg-surface)]"
      aria-labelledby="platforms-heading"
    >
      <div className="container-page">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Supported Platforms
          </span>
          <h2
            id="platforms-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            All major video platforms supported
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Support for Instagram, TikTok, YouTube, Twitter/X, Facebook, Pinterest, and Reddit.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PLATFORMS.map((platform) => (
            <PlatformCard key={platform.name} {...platform} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  name,
  description,
  gradient,
  bgGlow,
  tools,
  icon: Icon,
  supported,
}: (typeof PLATFORMS)[0]) {
  return (
    <div
      className={cn(
        "relative group overflow-hidden flex flex-col justify-between",
        "bg-[var(--bg-elevated)] rounded-2xl",
        "border border-[var(--border-subtle)]",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--shadow-xl)] hover:-translate-y-1",
        "transition-all duration-300 p-6"
      )}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${bgGlow} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div>
        {/* Platform icon */}
        <div className="relative mb-5">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              "bg-gradient-to-br text-white shadow-md",
              gradient
            )}
            aria-hidden="true"
          >
            <Icon />
          </div>
        </div>

        {/* Name & description */}
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          {name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
          {description}
        </p>

        {/* Supported content types */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {supported.map((item) => (
            <span
              key={item}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Tool links */}
      <div className="space-y-2 pt-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={cn(
              "flex items-center justify-between w-full",
              "px-3.5 py-2.5 rounded-xl",
              "bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]",
              "border border-[var(--border-subtle)] hover:border-[var(--border-default)]",
              "text-sm font-medium text-[var(--text-primary)]",
              "transition-all duration-150 group/link"
            )}
          >
            <span>{tool.label}</span>
            <svg
              className="w-4 h-4 text-[var(--text-muted)] group-hover/link:translate-x-0.5 transition-transform duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Inline Platform Icons ──────────────────────────────────
function InstagramSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" />
    </svg>
  );
}

function TikTokSVG() {
  return (
    <svg width="20" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
    </svg>
  );
}

function YouTubeSVG() {
  return (
    <svg width="22" height="16" viewBox="0 0 24 18" fill="none" aria-hidden="true">
      <path d="M23 3.5S22.7 1.5 21.8.6C20.7-.5 19.5-.5 19 -.4 15.9-.2 12 -.2 12 -.2s-3.9 0-7 .2c-.5-.1-1.7-.1-2.8 1C1.3 1.9 1 3.5 1 3.5S.7 5.8.7 8v2.1c0 2.2.3 4.5.3 4.5s.3 2 1.2 2.9c1.1 1.1 2.6 1.1 3.2 1.2C7.5 18.8 12 18.8 12 18.8s3.9 0 7-.2c.5.1 1.7.1 2.8-1 .9-.9 1.2-2.9 1.2-2.9s.3-2.3.3-4.5V8c0-2.2-.3-4.5-.3-4.5zM9.7 12.1V5.2l7 3.5-7 3.4z" fill="white" />
    </svg>
  );
}

function TwitterSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" />
    </svg>
  );
}

function PinterestSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.14 2.5 7.69 6.06 9.18-.08-.78-.16-1.98.03-2.83.18-.76 1.15-4.87 1.15-4.87s-.29-.59-.29-1.46c0-1.37.8-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.11-.82 3.29-.23.98.49 1.78 1.46 1.78 1.75 0 3.1-1.85 3.1-4.52 0-2.36-1.7-4.01-4.12-4.01-2.8 0-4.45 2.1-4.45 4.27 0 .85.33 1.76.74 2.26.08.1.09.19.07.29-.07.3-.23.95-.26 1.08-.04.18-.15.22-.35.13-1.3-.6-2.12-2.5-2.12-4.02 0-3.28 2.39-6.3 6.89-6.3 3.61 0 6.42 2.57 6.42 6.01 0 3.59-2.26 6.48-5.4 6.48-1.05 0-2.04-.55-2.38-1.19l-.65 2.47c-.24.91-.88 2.06-1.31 2.76A9.98 9.98 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}
