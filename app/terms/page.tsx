// ============================================================
// VidFetch — Terms of Service Page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – VidFetch",
  description:
    "Read VidFetch's Terms of Service. Understand your rights and responsibilities when using our video downloader tools.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service – VidFetch",
    description: "VidFetch's Terms of Service and acceptable use policy.",
    url: "/terms",
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
    id: "acceptance",
    title: "Acceptance of terms",
    content: (
      <p>
        By accessing or using VidFetch (&quot;the Service&quot;) at{" "}
        <strong>vidfetch.me</strong>, you agree to be bound by these Terms of
        Service. If you do not agree to these terms, please do not use the
        Service.
      </p>
    ),
  },
  {
    id: "description",
    title: "Description of the Service",
    content: (
      <p>
        VidFetch is an online tool that allows users to access download options
        for supported <strong>publicly accessible</strong> videos from
        Instagram, TikTok, and YouTube. The Service processes URLs submitted by
        users to retrieve available video metadata and download options from
        configured providers.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You agree not to use the Service:
        </p>
        <ul>
          <li>
            To download content you do not have the right or permission to
            download
          </li>
          <li>To infringe the intellectual property rights of others</li>
          <li>
            To access, download, or distribute private, restricted, or
            confidential content
          </li>
          <li>
            To circumvent technical protection measures or platform access
            controls
          </li>
          <li>
            To violate any applicable law or regulation
          </li>
          <li>
            To abuse or attempt to overload the Service (e.g., automated
            scraping)
          </li>
          <li>
            For any commercial purpose without express permission
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-responsibility",
    title: "User responsibility",
    content: (
      <>
        <p>
          <strong>
            You are solely responsible for ensuring you have the legal right to
            download any content you access using VidFetch.
          </strong>
        </p>
        <p>
          VidFetch is a technical tool. It does not determine whether any
          specific download is legally permitted in your jurisdiction or whether
          you have the rights to download a particular piece of content. You
          must make that determination yourself.
        </p>
        <p>
          Downloading content that is protected by copyright, trademark, or
          other intellectual property rights without permission from the rights
          holder may be illegal in your country. VidFetch does not encourage
          copyright infringement.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-content",
    title: "Prohibited content",
    content: (
      <>
        <p>
          VidFetch is designed exclusively to process publicly accessible
          content. The Service does not and will not:
        </p>
        <ul>
          <li>Access private or restricted content</li>
          <li>Bypass DRM (Digital Rights Management) protections</li>
          <li>Circumvent platform authentication</li>
          <li>Enable downloading of age-restricted content without verification</li>
          <li>Enable downloading of content that requires a paid subscription</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        All content you access through the Service belongs to its respective
        rights holders. VidFetch does not claim ownership of any third-party
        content. The VidFetch name, logo, and website design are the property
        of VidFetch. You may not reproduce or use our branding without written
        permission.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Service availability",
    content: (
      <p>
        We strive to keep VidFetch available and functional, but we make no
        guarantees of uptime, availability, or continued functionality. The
        Service may be unavailable due to maintenance, provider limitations, or
        circumstances outside our control. We reserve the right to modify,
        suspend, or discontinue the Service at any time without notice.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    content: (
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
        WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
        BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
        SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT ANY PARTICULAR
        VIDEO WILL BE AVAILABLE FOR DOWNLOAD.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    content: (
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, CLIPDOWN SHALL NOT BE LIABLE
        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
        DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE,
        INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF REVENUE, OR
        THIRD-PARTY CLAIMS. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED
        THE AMOUNT YOU PAID TO USE THE SERVICE (IF ANY) IN THE PRECEDING THREE
        MONTHS.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>
        We reserve the right to restrict or terminate your access to the
        Service at any time, without notice, if we believe you have violated
        these Terms or are abusing the Service.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with
        applicable law. Any disputes arising from these Terms or your use of
        the Service shall be subject to the exclusive jurisdiction of the
        appropriate courts.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these Terms from time to time. We will post the updated
        Terms on this page with a revised &quot;Last updated&quot; date.
        Continued use of the Service after changes constitutes your acceptance
        of the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have questions about these Terms, please contact us at{" "}
        <a
          href="mailto:legal@vidfetch.me"
          className="text-[var(--brand-primary)] hover:underline"
        >
          legal@vidfetch.me
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Please read these terms carefully before using VidFetch. By using
            the Service, you agree to these terms.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Important:</strong> You are responsible for ensuring you
              have the legal right to download any content you access using
              VidFetch. This tool is intended only for publicly accessible
              content you have permission to download.
            </p>
          </div>
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
              <div className="text-[var(--text-secondary)] leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-[var(--text-primary)] [&_strong]:font-medium">
                {s.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
          <Link href="/privacy" className="hover:text-[var(--brand-primary)] transition-colors">
            Privacy Policy
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
