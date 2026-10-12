// ============================================================
// ClipDown — Blog Index Page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, jsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Video Download Guides & Tips – ClipDown Blog",
  description:
    "Learn how to download Instagram Reels, TikTok videos, YouTube Shorts, and more. Step-by-step guides for using ClipDown's video downloader tools.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Video Download Guides & Tips – ClipDown Blog",
    description:
      "Step-by-step guides for downloading supported public videos from Instagram, TikTok, and YouTube.",
    url: "/blog",
  },
};

const POSTS = [
  {
    slug: "how-to-download-instagram-reels",
    title: "How to Download Instagram Reels",
    description:
      "A step-by-step guide to downloading supported public Instagram Reels using ClipDown. Learn which URLs are supported and what to expect.",
    date: "2026-10-01",
    readTime: "3 min read",
    platform: "Instagram",
    platformColor: "#e1306c",
  },
  {
    slug: "how-to-download-tiktok-videos",
    title: "How to Download TikTok Videos",
    description:
      "Learn how to download supported public TikTok videos step by step. Covers URL formats, what content is supported, and common issues.",
    date: "2026-10-01",
    readTime: "3 min read",
    platform: "TikTok",
    platformColor: "#00f2ea",
  },
  {
    slug: "how-to-download-youtube-shorts",
    title: "How to Download YouTube Shorts",
    description:
      "Download supported YouTube Shorts quickly using ClipDown. This guide covers supported URL formats and available quality options.",
    date: "2026-10-01",
    readTime: "3 min read",
    platform: "YouTube",
    platformColor: "#ff0000",
  },
  {
    slug: "video-download-guide",
    title: "The Complete Video Download Guide",
    description:
      "Everything you need to know about downloading supported public videos from Instagram, TikTok, and YouTube using ClipDown.",
    date: "2026-10-01",
    readTime: "5 min read",
    platform: "All Platforms",
    platformColor: "#6366f1",
  },
];

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <script {...jsonLd(breadcrumbSchema(breadcrumbs))} />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <span className="text-[var(--text-primary)] font-medium" aria-current="page">
                  Blog
                </span>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Guides & Tips
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Step-by-step guides for downloading supported public videos from
            Instagram, TikTok, and YouTube.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
            >
              {/* Platform badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: post.platformColor }}
                />
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  {post.platform}
                </span>
                <span className="text-xs text-[var(--text-muted)] ml-auto">
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                {post.description}
              </p>

              <div className="flex items-center gap-1.5 mt-5 text-xs font-medium text-[var(--brand-primary)]">
                Read guide
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Tools CTA */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-muted)] mb-4">Ready to try the tools?</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/instagram-video-downloader", label: "Instagram Downloader" },
              { href: "/tiktok-video-downloader", label: "TikTok Downloader" },
              { href: "/youtube-video-downloader", label: "YouTube Downloader" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
