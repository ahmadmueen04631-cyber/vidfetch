// ============================================================
// VidFetch — Privacy Policy Page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – VidFetch",
  description:
    "Read VidFetch's privacy policy. We explain what data we collect, how URLs are processed, and how we protect your privacy.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy – VidFetch",
    description: "VidFetch's privacy policy and data practices.",
    url: "/privacy",
  },
};

const LAST_UPDATED = "October 2026";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          VidFetch (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
          committed to protecting your privacy. This Privacy Policy explains
          how we handle information when you use our website at{" "}
          <strong>vidfetch.me</strong> (the &quot;Service&quot;).
        </p>
        <p>
          VidFetch does not require user accounts and does not build user
          profiles. We have designed the Service to collect as little
          information as possible.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect minimal information necessary to operate the Service:
        </p>
        <ul>
          <li>
            <strong>Video URLs you submit:</strong> When you paste a URL into
            VidFetch, that URL is sent to our server to detect the platform,
            fetch available metadata, and retrieve download options. URLs are
            processed in real time and are not stored in any database.
          </li>
          <li>
            <strong>Server logs:</strong> Our hosting infrastructure
            (Vercel) automatically generates standard server logs that may
            include IP addresses, browser types, request timestamps, and
            pages visited. These logs are retained per Vercel&apos;s standard
            retention policies.
          </li>
          <li>
            <strong>Analytics data:</strong> We use Google Analytics to
            understand how the Service is used. This includes page views,
            session duration, and anonymized event data. Google Analytics may
            set cookies in your browser.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process video URL requests and return available download options</li>
          <li>Prevent abuse through server-side rate limiting</li>
          <li>Understand aggregate usage patterns to improve the Service</li>
          <li>Monitor and maintain service reliability</li>
        </ul>
        <p>
          We do not sell, rent, or share your information with third parties
          for marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>VidFetch uses minimal cookies:</p>
        <ul>
          <li>
            <strong>Theme preference:</strong> A small value stored in{" "}
            <code>localStorage</code> to remember your light/dark mode
            preference. This is not a cookie and is not transmitted to our
            servers.
          </li>
          <li>
            <strong>Google Analytics:</strong> Google Analytics sets cookies
            (typically <code>_ga</code> and <code>_gid</code>) to distinguish
            users and sessions. You can opt out using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    content: (
      <>
        <p>VidFetch integrates with the following third-party services:</p>
        <ul>
          <li>
            <strong>Vercel:</strong> Our hosting provider. Vercel may collect
            server logs and performance metrics. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] hover:underline"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics:</strong> Analytics and usage measurement.
            See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Download providers:</strong> When processing a video URL,
            our server may communicate with a configured third-party API or
            service to retrieve video metadata and download options. URLs are
            passed to these services solely to complete your request.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    content: (
      <p>
        We do not store video URLs, video files, or user submissions in any
        persistent database. Server-side rate limiting data is stored
        temporarily in memory and is cleared automatically. Server logs are
        retained per our hosting provider&apos;s standard policies.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>
          Depending on your location, you may have rights regarding your
          personal data, including the right to access, correction, or
          deletion. Because we do not store personal data in a database, most
          requests may be satisfied by confirming that we hold no personal
          information associated with you.
        </p>
        <p>
          To make a privacy-related request, please contact us at the address
          below.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    content: (
      <p>
        VidFetch is not directed at children under the age of 13. We do not
        knowingly collect information from children. If you believe a child has
        provided us with personal information, please contact us immediately.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. We will post the
        updated policy on this page with a revised &quot;Last updated&quot;
        date. Continued use of the Service after any changes constitutes your
        acceptance of the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have questions about this Privacy Policy, please contact us at{" "}
        <a
          href="mailto:privacy@vidfetch.me"
          className="text-[var(--brand-primary)] hover:underline"
        >
          privacy@vidfetch.me
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            VidFetch is built to respect your privacy. This page explains exactly
            what we collect, why, and how we protect it.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
        {/* Nav */}
        <nav className="mb-12 p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Contents
          </p>
          <ol className="space-y-1.5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                {i + 1}. {s.title}
              </h2>
              <div className="text-[var(--text-secondary)] leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-[var(--text-primary)] [&_strong]:font-medium [&_code]:font-mono [&_code]:text-sm [&_code]:bg-[var(--bg-surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                {s.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
          <Link href="/terms" className="hover:text-[var(--brand-primary)] transition-colors">
            Terms of Service
          </Link>
          <Link href="/about" className="hover:text-[var(--brand-primary)] transition-colors">
            About VidFetch
          </Link>
          <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
