import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "instagram-video-downloader";

export const metadata: Metadata = {
  title: "Instagram Video Downloader – Download Public Instagram Videos Online",
  description:
    "Download supported public Instagram videos with a simple URL paste. No login required. Access available download options instantly.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "Instagram Video Downloader – ClipDown",
    description: "Download supported public Instagram videos with a simple URL paste.",
    url: `/${SLUG}`,
  },
};

export default function InstagramVideoDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();
  return <Suspense><ToolPageLayout tool={tool} /></Suspense>;
}
