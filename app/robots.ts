// ============================================================
// VidFetch — Robots.txt (app/robots.ts)
// Controls search engine crawling behavior
// ============================================================

import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidfetch.me";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Never crawl server API routes
          "/_next/",    // Next.js internals
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
