// ============================================================
// ClipDown — Footer
// ============================================================

import Link from "next/link";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
  Tools: [
    { label: "Video Downloader", href: "/video-downloader" },
    {
      label: "Instagram Downloader",
      href: "/instagram-video-downloader",
    },
    { label: "Reels Downloader", href: "/instagram-reels-downloader" },
    { label: "TikTok Downloader", href: "/tiktok-video-downloader" },
    {
      label: "YouTube Downloader",
      href: "/youtube-video-downloader",
    },
    {
      label: "YouTube Shorts",
      href: "/youtube-shorts-downloader",
    },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="container-page">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
              aria-label="VidFetch – Home"
            >
              <LogoMark />
              <span className="font-bold text-lg text-[var(--text-primary)]">
                Vid<span className="gradient-text">Fetch</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
              A simple, fast tool for downloading supported public
              videos from Instagram, TikTok, YouTube, and Reddit.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Only public, authorized content supported.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-[var(--text-secondary)]",
                        "hover:text-[var(--text-primary)]",
                        "transition-colors duration-150"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
            &copy; {currentYear} VidFetch. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-right max-w-md">
            VidFetch is an independent tool. Not affiliated with Instagram,
            TikTok, YouTube, or Reddit. Use responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="vidfetch-ftr-grad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="8.5"
        fill="none"
        stroke="url(#vidfetch-ftr-grad)"
        strokeWidth="2.2"
      />

      <path
        d="M16 8v10M11.5 13.5L16 18l4.5-4.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--text-primary)] transition-colors duration-150"
      />

      <path
        d="M10 22h12"
        stroke="url(#vidfetch-ftr-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
