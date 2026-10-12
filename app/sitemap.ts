// ============================================================
// VidFetch — Sitemap (app/sitemap.ts)
// Auto-generated XML sitemap for Google Search Console
// ============================================================

import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidfetch.me";

// Tool pages
const TOOL_PAGES = [
  "/video-downloader",
  "/instagram-video-downloader",
  "/instagram-reels-downloader",
  "/tiktok-video-downloader",
  "/youtube-video-downloader",
  "/youtube-shorts-downloader",
  "/twitter-video-downloader",
  "/facebook-video-downloader",
  "/pinterest-video-downloader",
  "/reddit-video-downloader",
];

// Static pages
const STATIC_PAGES = ["/", "/about", "/privacy", "/terms", "/blog"];

// Blog posts
const BLOG_POSTS = [
  "/blog/how-to-download-instagram-reels",
  "/blog/how-to-download-tiktok-videos",
  "/blog/how-to-download-youtube-shorts",
  "/blog/video-download-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOL_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...toolEntries, ...blogEntries];
}
