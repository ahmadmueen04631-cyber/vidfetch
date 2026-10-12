import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "tiktok-video-downloader";

export const metadata: Metadata = {
  title: "TikTok Video Downloader – Download Public TikTok Videos Online",
  description:
    "Download supported public TikTok videos using a standard or short video URL. No account required. Access available download options instantly.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "TikTok Video Downloader – ClipDown",
    description: "Download supported public TikTok videos using a simple URL.",
    url: `/${SLUG}`,
  },
};

export default function TikTokVideoDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();
  return <Suspense><ToolPageLayout tool={tool} /></Suspense>;
}
