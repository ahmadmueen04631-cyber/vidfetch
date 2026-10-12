// ============================================================
// ClipDown — Blog Post Layout (shared)
// ============================================================

import Link from "next/link";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/structured-data";

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  readTime: string;
  platform: string;
  platformColor: string;
  slug: string;
  relatedTool?: { href: string; label: string };
}

interface BlogPostLayoutProps {
  meta: BlogPostMeta;
  faqs?: Array<{ question: string; answer: string }>;
  children: React.ReactNode;
}

export function BlogPostLayout({ meta, faqs, children }: BlogPostLayoutProps) {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: meta.title, url: `/blog/${meta.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <script {...jsonLd(breadcrumbSchema(breadcrumbs))} />
      {faqs && faqs.length > 0 && <script {...jsonLd(faqSchema(faqs))} />}

      {/* Header */}
      <section className="py-12 md:py-16 border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] flex-wrap">
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: meta.title, href: null },
              ].map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[var(--text-primary)] transition-colors truncate max-w-[120px]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: meta.platformColor }}
            />
            <span className="text-sm text-[var(--text-muted)]">{meta.platform}</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-sm text-[var(--text-muted)]">{meta.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {meta.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
        <article className="prose-custom">
          {children}
        </article>

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="mt-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-bold text-[var(--text-primary)] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 list-none select-none text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150">
                    {faq.question}
                    <svg className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 group-open:rotate-180 transition-transform duration-200 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        {meta.relatedTool && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/40">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              Ready to try it?
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Use our free tool to download supported public videos right now.
            </p>
            <Link
              href={meta.relatedTool.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)] transition-colors"
            >
              {meta.relatedTool.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Back + Related */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap justify-between items-center gap-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All guides
          </Link>
          <div className="flex gap-3">
            <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
