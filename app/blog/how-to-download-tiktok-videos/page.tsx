// ============================================================
// ClipDown — Blog: How to Download TikTok Videos
// ============================================================

import type { Metadata } from "next";
import { BlogPostLayout } from "@/components/layout/BlogPostLayout";
import Link from "next/link";

const META = {
  slug: "how-to-download-tiktok-videos",
  title: "How to Download TikTok Videos",
  description:
    "Learn how to download supported public TikTok videos step by step. Covers URL formats, what content is supported, and common issues.",
  date: "2026-10-01",
  readTime: "3 min read",
  platform: "TikTok",
  platformColor: "#00f2ea",
  relatedTool: {
    href: "/tiktok-video-downloader",
    label: "Open TikTok Video Downloader",
  },
};

const FAQS = [
  {
    question: "How do I get a TikTok video URL?",
    answer:
      "In the TikTok app, tap the Share button on any video, then tap 'Copy link'. On TikTok's website, copy the URL from your browser's address bar. Both standard and short links (vm.tiktok.com) are supported.",
  },
  {
    question: "Can I download TikTok videos without a watermark?",
    answer:
      "Available download options depend on what the TikTok platform makes technically accessible for the specific video. All available options will be shown after processing — ClipDown displays only what is actually available.",
  },
  {
    question: "Are private TikTok videos supported?",
    answer:
      "No. Only publicly accessible TikTok videos can be processed. Private videos and videos from accounts that require following to view are not supported.",
  },
  {
    question: "Why isn't my TikTok URL working?",
    answer:
      "Make sure you are using a full video URL, not a profile URL. The URL should contain /video/ followed by a number (e.g., https://www.tiktok.com/@username/video/1234567890) or be a short link like https://vm.tiktok.com/XXXXX/.",
  },
];

export const metadata: Metadata = {
  title: "How to Download TikTok Videos – ClipDown Guide",
  description: META.description,
  alternates: { canonical: `/blog/${META.slug}` },
  openGraph: {
    title: "How to Download TikTok Videos – ClipDown",
    description: META.description,
    url: `/blog/${META.slug}`,
  },
};

export default function HowToDownloadTikTokVideos() {
  return (
    <BlogPostLayout meta={META} faqs={FAQS}>
      <h2>What you&apos;ll need</h2>
      <p>
        To download a supported TikTok video, you need the public URL of the
        video. You do not need a TikTok account and you do not need to be logged
        in. The video must be publicly visible.
      </p>

      <h2>Step-by-step guide</h2>

      <div className="prose-step">
        <div className="prose-step-num">1</div>
        <div>
          <strong>Find the TikTok video</strong>
          <p className="mt-1 mb-0 text-sm">
            Open TikTok and find the public video you want to download. The
            video must be from a <strong>public account</strong> and must be
            publicly viewable — no login or following required to watch it.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">2</div>
        <div>
          <strong>Copy the video URL</strong>
          <p className="mt-1 mb-0 text-sm">
            In the TikTok app, tap the <strong>Share</strong> icon, then tap{" "}
            <strong>Copy link</strong>. On the TikTok website, copy the URL
            from your browser address bar. Both full URLs and short{" "}
            <code>vm.tiktok.com</code> links are supported.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">3</div>
        <div>
          <strong>Paste the URL into ClipDown</strong>
          <p className="mt-1 mb-0 text-sm">
            Open the{" "}
            <Link href="/tiktok-video-downloader">
              TikTok Video Downloader
            </Link>{" "}
            and paste the URL into the input field. ClipDown will automatically
            recognize it as a TikTok URL.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">4</div>
        <div>
          <strong>Click Download</strong>
          <p className="mt-1 mb-0 text-sm">
            Click <strong>Download</strong>. ClipDown will validate the URL,
            detect the platform, and fetch available video information and
            download options. This usually takes a few seconds.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">5</div>
        <div>
          <strong>Select and download</strong>
          <p className="mt-1 mb-0 text-sm">
            When processing completes, available download options will appear
            showing format and quality. Click the download button next to your
            preferred option.
          </p>
        </div>
      </div>

      <h2>Supported URL formats</h2>
      <p>ClipDown supports the following TikTok URL formats:</p>
      <ul>
        <li>
          <code>https://www.tiktok.com/@username/video/1234567890</code>
        </li>
        <li>
          <code>https://vm.tiktok.com/SHORTCODE/</code> (short links)
        </li>
        <li>
          <code>https://m.tiktok.com/v/1234567890.html</code> (mobile links)
        </li>
      </ul>

      <h2>What is not supported</h2>
      <ul>
        <li>Videos from private TikTok accounts</li>
        <li>Videos that require login to view</li>
        <li>Videos that have been deleted or made private</li>
        <li>TikTok Live streams</li>
        <li>TikTok Stories (not publicly accessible via URL)</li>
      </ul>

      <h2>Your responsibility</h2>
      <p>
        You are responsible for ensuring you have the right to download any
        content you access through ClipDown. Respect creators&apos; rights and
        only download content you own or have explicit permission to save. Do
        not redistribute downloaded content without permission.
      </p>
    </BlogPostLayout>
  );
}
