// ============================================================
// ClipDown — /video-downloader (All Platforms)
// ============================================================

import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "video-downloader";

export const metadata: Metadata = {
  title: "Video Downloader – Download Public Videos from Instagram, TikTok & YouTube",
  description:
    "Download supported public videos from Instagram, TikTok, and YouTube with one simple tool. Paste any supported URL to access available download options.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "Video Downloader – VidFetch",
    description:
      "Download supported public videos from Instagram, TikTok, and YouTube.",
    url: `/${SLUG}`,
  },
};

export default function VideoDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();

  return (
    <Suspense>
      <ToolPageLayout tool={tool} />
    </Suspense>
  );
}
