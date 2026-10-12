import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "youtube-video-downloader";

export const metadata: Metadata = {
  title: "YouTube Video Downloader – Download Supported YouTube Videos Online",
  description:
    "Download supported public YouTube videos in available quality options. Paste a YouTube URL and access 1080p, 720p, and more where available.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "YouTube Video Downloader – ClipDown",
    description: "Download supported public YouTube videos in available quality options.",
    url: `/${SLUG}`,
  },
};

export default function YouTubeVideoDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();
  return <Suspense><ToolPageLayout tool={tool} /></Suspense>;
}
