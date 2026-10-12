// ============================================================
// VidFetch — About Page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VidFetch – Simple, Fast Video Downloader",
  description:
    "Learn about VidFetch — a simple, privacy-conscious tool for downloading supported public videos from Instagram, TikTok, and YouTube.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About VidFetch",
    description:
      "A simple, fast tool for downloading supported public videos from Instagram, TikTok, and YouTube.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
            About VidFetch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5">
            Built for simplicity.
            <br />
            <span className="text-[var(--brand-primary)]">Designed for trust.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            VidFetch is a lightweight, privacy-conscious tool that helps you
            access download options for supported public videos from Instagram,
            TikTok, and YouTube — without accounts, without clutter.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 space-y-16">
        {/* Mission */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Our mission
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Most video downloader tools are cluttered with ads, broken
            functionality, and misleading download buttons. VidFetch is
            different — it focuses exclusively on what matters: a clean
            interface, reliable platform detection, honest error messages, and
            real download options where they&apos;re technically and legally
            available.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We built VidFetch because we believe useful tools should be simple,
            fast, and trustworthy. No fake download buttons. No unnecessary
            data collection. No dark patterns.
          </p>
        </div>

        {/* What we support */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            What we support
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            VidFetch supports downloading supported <strong>public</strong>{" "}
            videos from three platforms:
          </p>
          <ul className="space-y-3">
            {[
              {
                name: "Instagram",
                detail: "Public videos and Reels",
                color: "#e1306c",
              },
              {
                name: "TikTok",
                detail: "Public TikTok videos",
                color: "#00f2ea",
              },
              {
                name: "YouTube",
                detail: "Public videos and Shorts",
                color: "#ff0000",
              },
            ].map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: p.color }}
                />
                <span className="font-medium text-[var(--text-primary)]">
                  {p.name}
                </span>
                <span className="text-[var(--text-secondary)] text-sm">
                  — {p.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we don't do */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            What we don&apos;t do
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            VidFetch is intentionally limited to what is technically and legally
            appropriate. We do not:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {[
              "Access private or restricted content",
              "Bypass DRM or access controls",
              "Circumvent platform authentication",
              "Store your videos or submitted URLs",
              "Require user accounts",
              "Encourage or enable copyright infringement",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Privacy
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            VidFetch is designed to collect as little data as possible. We do
            not require accounts, we do not store video files, and we do not
            build user profiles. URLs you submit are processed server-side
            solely to fetch available metadata and download options, then
            discarded.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We use Google Analytics to understand aggregate usage patterns. No
            personally identifiable information is intentionally collected.
          </p>
          <div className="mt-6">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:underline"
            >
              Read our Privacy Policy
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Tools */}
        <div className="text-center pt-4">
          <p className="text-[var(--text-secondary)] mb-6">
            Ready to get started? Try one of our tools:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/instagram-video-downloader", label: "Instagram" },
              { href: "/tiktok-video-downloader", label: "TikTok" },
              { href: "/youtube-video-downloader", label: "YouTube" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors"
              >
                {t.label} Downloader
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
