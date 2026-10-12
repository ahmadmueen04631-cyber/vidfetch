import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "youtube-shorts-downloader";

export const metadata: Metadata = {
  title: "YouTube Shorts Downloader – Download Supported YouTube Shorts Online",
  description:
    "Download supported public YouTube Shorts with a simple URL paste. No account required. Access available formats and qualities instantly.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "YouTube Shorts Downloader – ClipDown",
    description: "Download supported public YouTube Shorts with a simple URL.",
    url: `/${SLUG}`,
  },
};

export default function YouTubeShortsDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();
  return <Suspense><ToolPageLayout tool={tool} /></Suspense>;
}
