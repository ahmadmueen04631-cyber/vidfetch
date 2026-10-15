import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { getTool } from "@/lib/tools";
import { notFound } from "next/navigation";

const SLUG = "twitter-video-downloader";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getTool(SLUG);
  if (!tool) return {};

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | VidFetch`,
      description: tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | VidFetch`,
      description: tool.description,
    },
  };
}

export default function TwitterVideoDownloaderPage() {
  const tool = getTool(SLUG);
  if (!tool) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen pt-20" />}>
      <ToolPageLayout tool={tool} />
    </Suspense>
  );
}
