// ============================================================
// ClipDown — Web App Manifest (app/manifest.ts)
// Enables PWA installation on Mobile & Desktop browsers
// ============================================================

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VidFetch – Online Video Downloader",
    short_name: "VidFetch",
    description:
      "Download supported public videos from Instagram, TikTok, YouTube, and Reddit. Fast, free, and privacy-focused.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["utilities", "productivity", "entertainment"],
  };
}
