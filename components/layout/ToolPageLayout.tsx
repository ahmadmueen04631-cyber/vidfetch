// ============================================================
// ClipDown — Tool Page Layout (reusable)
// ============================================================

import React, { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ToolDefinition } from "@/lib/types";
import { Downloader } from "@/components/downloader/Downloader";
import { AdSlot } from "@/components/marketing/AdSlot";
import {
  breadcrumbSchema,
  webAppSchema,
  faqSchema,
  jsonLd,
} from "@/lib/structured-data";

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children?: React.ReactNode;
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/video-downloader" },
    { label: tool.shortName, href: `/${tool.slug}` },
  ];

  // Build structured data for this tool page
  const breadcrumbJsonLd = breadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href }))
  );
  const webAppJsonLd = webAppSchema({
    name: tool.name,
    description: tool.description,
    url: `/${tool.slug}`,
  });
  const faqJsonLd =
    tool.faqs.length > 0 ? faqSchema(tool.faqs) : null;

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script {...jsonLd(breadcrumbJsonLd)} />
      <script {...jsonLd(webAppJsonLd)} />
      {faqJsonLd && <script {...jsonLd(faqJsonLd)} />}

      {/* Hero strip */}
      <section className="hero-gradient pt-12 pb-16 border-b border-[var(--border-subtle)]">
        <div className="container-page">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-[var(--text-primary)] font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-[var(--text-primary)] transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* H1 + description */}
          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {tool.name}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Ad slot top */}
          <AdSlot placement="tool-top" className="mb-6" />

          {/* Downloader tool */}
          <Suspense fallback={<div className="h-32 animate-shimmer rounded-2xl" />}>
            <Downloader platform={tool.platform} />
          </Suspense>
        </div>
      </section>

      {/* Content sections */}
      <div className="container-page py-12 space-y-16">
        {/* Supported URL formats */}
        <section aria-labelledby="supported-urls-heading">
          <h2
            id="supported-urls-heading"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            Supported URL formats
          </h2>
          <div className="space-y-2">
            {tool.supportedUrlPatterns.map((pattern) => (
              <div
                key={pattern}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
              >
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-3.5-3.5 1.41-1.41L10 13.67l5.59-5.59L17 9.5l-7 7z" clipRule="evenodd" />
                </svg>
                <code className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] break-all sm:break-normal">
                  {pattern}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section aria-labelledby="how-to-use-heading">
          <h2
            id="how-to-use-heading"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            How to use {tool.shortName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Copy the URL",
                description: `Copy the video URL from ${tool.platform ? tool.platform.charAt(0).toUpperCase() + tool.platform.slice(1) : "the platform"} and paste it in the input field above.`,
              },
              {
                step: "2",
                title: "Analyze",
                description:
                  "Click Download. VidFetch will validate the URL and fetch available video information and download options.",
              },
              {
                step: "3",
                title: "Download",
                description:
                  "Select your preferred format and quality from the available options and start the download.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        {tool.features.length > 0 && (
          <section aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              Features
            </h2>
            <ul className="space-y-2">
              {tool.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Ad slot between sections */}
        <AdSlot placement="between-sections" />

        {/* FAQ — tool-specific */}
        {tool.faqs.length > 0 && (
          <section aria-labelledby="tool-faq-heading">
            <h2
              id="tool-faq-heading"
              className="text-xl font-bold text-[var(--text-primary)] mb-6"
            >
              Frequently asked questions
            </h2>
            <div className="space-y-2" itemScope itemType="https://schema.org/FAQPage">
              {tool.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary
                    className={cn(
                      "flex items-center justify-between cursor-pointer",
                      "px-5 py-4 list-none select-none",
                      "text-sm font-semibold text-[var(--text-primary)]",
                      "hover:bg-[var(--bg-surface)] transition-colors duration-150"
                    )}
                    itemProp="name"
                  >
                    {faq.question}
                    <svg className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 group-open:rotate-180 transition-transform duration-200 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div
                    className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related tools */}
        <RelatedTools currentSlug={tool.slug} />

        {/* Ad bottom */}
        <AdSlot placement="tool-bottom" />
      </div>

      {/* Extra slot for injected content */}
      {children}
    </div>
  );
}

// ── Related Tools ──────────────────────────────────────────
const ALL_TOOLS = [
  { slug: "video-downloader", label: "Video Downloader", desc: "All platforms" },
  { slug: "instagram-video-downloader", label: "Instagram Video", desc: "Instagram" },
  { slug: "instagram-reels-downloader", label: "Instagram Reels", desc: "Instagram" },
  { slug: "tiktok-video-downloader", label: "TikTok Video", desc: "TikTok" },
  { slug: "youtube-video-downloader", label: "YouTube Video", desc: "YouTube" },
  { slug: "youtube-shorts-downloader", label: "YouTube Shorts", desc: "YouTube" },
];

function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = ALL_TOOLS.filter((t) => t.slug !== currentSlug).slice(0, 4);

  return (
    <section aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="text-xl font-bold text-[var(--text-primary)] mb-4"
      >
        Related tools
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={cn(
              "group flex flex-col p-4 rounded-xl",
              "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
              "hover:border-[var(--border-default)] hover:shadow-[var(--shadow-sm)]",
              "transition-all duration-150"
            )}
          >
            <span className="text-sm font-semibold text-[var(--text-primary)] mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {tool.label}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{tool.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
