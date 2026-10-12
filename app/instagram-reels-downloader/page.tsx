import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "instagram-reels-downloader";

export const metadata: Metadata = {
  title: "Instagram Reels Downloader – Download Public Instagram Reels Online",
  description:
    "Download supported public Instagram Reels with a simple URL. Paste your Reel link and access available download options — no account needed.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "Instagram Reels Downloader – ClipDown",
    description: "Download supported public Instagram Reels with a simple URL.",
    url: `/${SLUG}`,
  },
};

export default function InstagramReelsDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) return notFound();
  return <Suspense><ToolPageLayout tool={tool} /></Suspense>;
}
