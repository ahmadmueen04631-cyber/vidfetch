// ============================================================
// VidFetch — Structured Data Helpers (JSON-LD)
// ============================================================

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidfetch.me";

// ── WebSite schema ──────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VidFetch",
    url: BASE_URL,
    description:
      "Download supported public videos from Instagram, TikTok, YouTube, and Reddit. Simple, fast, and privacy-conscious.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/video-downloader?url={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── WebApplication schema ──────────────────────────────────
export function webAppSchema(opts?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts?.name ?? "VidFetch",
    url: opts?.url ? `${BASE_URL}${opts.url}` : BASE_URL,
    description:
      opts?.description ??
      "A simple, fast tool for downloading supported public videos from Instagram, TikTok, YouTube, and Reddit.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

// ── BreadcrumbList schema ──────────────────────────────────
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ── FAQPage schema ─────────────────────────────────────────
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── JsonLd component helper ────────────────────────────────
// Usage: <script {...jsonLd(schema)} />
export function jsonLd(schema: Record<string, unknown>) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema),
    },
  };
}
