// ============================================================
// ClipDown — Popular Tools Section
// ============================================================

import Link from "next/link";
import { cn } from "@/lib/utils";

const POPULAR_TOOLS = [
  {
    label: "Instagram Video Downloader",
    href: "/instagram-video-downloader",
    platform: "instagram",
    description: "Download public Instagram videos",
  },
  {
    label: "Instagram Reels Downloader",
    href: "/instagram-reels-downloader",
    platform: "instagram",
    description: "Download public Instagram Reels",
  },
  {
    label: "TikTok Video Downloader",
    href: "/tiktok-video-downloader",
    platform: "tiktok",
    description: "Download public TikTok videos",
  },
  {
    label: "YouTube Video Downloader",
    href: "/youtube-video-downloader",
    platform: "youtube",
    description: "Download public YouTube videos",
  },
  {
    label: "YouTube Shorts Downloader",
    href: "/youtube-shorts-downloader",
    platform: "youtube",
    description: "Download YouTube Shorts",
  },
  {
    label: "All Video Downloader",
    href: "/video-downloader",
    platform: "all",
    description: "Multi-platform video downloader",
  },
];

const PLATFORM_DOTS: Record<string, string> = {
  instagram: "bg-gradient-to-br from-amber-400 to-pink-600",
  tiktok: "bg-gradient-to-br from-cyan-400 to-pink-500",
  youtube: "bg-gradient-to-br from-red-500 to-red-600",
  all: "bg-gradient-to-br from-indigo-500 to-violet-600",
};

export function PopularTools() {
  return (
    <section
      className="section-py bg-[var(--bg-surface)]"
      aria-labelledby="tools-heading"
    >
      <div className="container-page">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Tools
            </span>
            <h2
              id="tools-heading"
              className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
            >
              Popular downloaders
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Each tool is optimised for its platform with specific URL
              format guidance and support information.
            </p>
          </div>

          {/* Tool grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "group flex items-center gap-3 p-4 rounded-xl",
                  "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
                  "hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)]",
                  "hover:-translate-y-0.5",
                  "transition-all duration-200"
                )}
              >
                {/* Platform dot */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex-shrink-0",
                    "flex items-center justify-center",
                    "group-hover:scale-110 transition-transform duration-200",
                    PLATFORM_DOTS[tool.platform]
                  )}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12M6 10l6 6 6-6"
                    />
                  </svg>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate leading-tight">
                    {tool.label}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {tool.description}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-[var(--text-muted)] ml-auto flex-shrink-0 group-hover:translate-x-0.5 group-hover:text-indigo-500 transition-all duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
