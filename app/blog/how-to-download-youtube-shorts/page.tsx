// ============================================================
// ClipDown — Blog: How to Download YouTube Shorts
// ============================================================

import type { Metadata } from "next";
import { BlogPostLayout } from "@/components/layout/BlogPostLayout";
import Link from "next/link";

const META = {
  slug: "how-to-download-youtube-shorts",
  title: "How to Download YouTube Shorts",
  description:
    "Download supported YouTube Shorts quickly using ClipDown. This guide covers supported URL formats and available quality options.",
  date: "2026-10-01",
  readTime: "3 min read",
  platform: "YouTube",
  platformColor: "#ff0000",
  relatedTool: {
    href: "/youtube-shorts-downloader",
    label: "Open YouTube Shorts Downloader",
  },
};

const FAQS = [
  {
    question: "What is the format of a YouTube Shorts URL?",
    answer:
      "YouTube Shorts URLs look like: https://www.youtube.com/shorts/VIDEO_ID. You can find this in your browser address bar when viewing a Short on youtube.com.",
  },
  {
    question: "Can I download age-restricted Shorts?",
    answer:
      "No. Age-restricted content requires Google account verification to view, which ClipDown does not provide. Only unrestricted public Shorts are supported.",
  },
  {
    question: "What quality options are available for Shorts?",
    answer:
      "YouTube Shorts are typically available in up to 1080p. Available quality options will be displayed after the Short is processed — exact options depend on the specific video.",
  },
  {
    question: "Does a regular YouTube video URL work too?",
    answer:
      "Yes. For regular YouTube videos, use our YouTube Video Downloader. For Shorts specifically (youtube.com/shorts/ID), use the YouTube Shorts Downloader — both tools use the same underlying processing.",
  },
];

export const metadata: Metadata = {
  title: "How to Download YouTube Shorts – ClipDown Guide",
  description: META.description,
  alternates: { canonical: `/blog/${META.slug}` },
  openGraph: {
    title: "How to Download YouTube Shorts – ClipDown",
    description: META.description,
    url: `/blog/${META.slug}`,
  },
};

export default function HowToDownloadYouTubeShorts() {
  return (
    <BlogPostLayout meta={META} faqs={FAQS}>
      <h2>What you&apos;ll need</h2>
      <p>
        To download a supported YouTube Short, you need the public URL of the
        Short. No Google account is required, and you do not need to be logged
        in. The Short must be publicly accessible.
      </p>

      <h2>The difference between Shorts and regular videos</h2>
      <p>
        YouTube Shorts are vertical short-form videos (under 60 seconds) found
        at URLs like <code>youtube.com/shorts/VIDEO_ID</code>. They are
        different from regular YouTube videos (<code>youtube.com/watch?v=ID</code>
        ) but both are supported by ClipDown.
      </p>

      <h2>Step-by-step guide</h2>

      <div className="prose-step">
        <div className="prose-step-num">1</div>
        <div>
          <strong>Find the YouTube Short</strong>
          <p className="mt-1 mb-0 text-sm">
            Go to YouTube and find the Short you want to download. It must be
            publicly available — not age-restricted, private, or
            members-only.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">2</div>
        <div>
          <strong>Copy the Shorts URL</strong>
          <p className="mt-1 mb-0 text-sm">
            Copy the URL from your browser address bar. It should look like{" "}
            <code>https://www.youtube.com/shorts/VIDEO_ID</code>. On mobile,
            tap <strong>Share &gt; Copy link</strong>.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">3</div>
        <div>
          <strong>Paste into ClipDown</strong>
          <p className="mt-1 mb-0 text-sm">
            Open the{" "}
            <Link href="/youtube-shorts-downloader">
              YouTube Shorts Downloader
            </Link>{" "}
            and paste the URL. ClipDown will automatically detect that it is a
            YouTube Shorts URL.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">4</div>
        <div>
          <strong>Click Download</strong>
          <p className="mt-1 mb-0 text-sm">
            Click the <strong>Download</strong> button. ClipDown will validate
            the URL and fetch available metadata and quality options. Processing
            usually takes a few seconds.
          </p>
        </div>
      </div>

      <div className="prose-step">
        <div className="prose-step-num">5</div>
        <div>
          <strong>Choose quality and download</strong>
          <p className="mt-1 mb-0 text-sm">
            Select your preferred quality from the available options (e.g.,
            1080p, 720p) and click the corresponding download button.
          </p>
        </div>
      </div>

      <h2>Supported URL formats</h2>
      <p>ClipDown supports the following YouTube Shorts URL formats:</p>
      <ul>
        <li>
          <code>https://www.youtube.com/shorts/VIDEO_ID</code>
        </li>
        <li>
          <code>https://youtu.be/VIDEO_ID</code> (short links — processed as
          regular YouTube)
        </li>
      </ul>

      <h2>What is not supported</h2>
      <ul>
        <li>Age-restricted or mature content Shorts</li>
        <li>Members-only or Premieres</li>
        <li>Private videos</li>
        <li>DRM-protected content</li>
        <li>YouTube Live streams</li>
      </ul>

      <h2>Also available</h2>
      <p>
        If you want to download a regular YouTube video (not a Short), use the{" "}
        <Link href="/youtube-video-downloader">YouTube Video Downloader</Link>{" "}
        instead.
      </p>
    </BlogPostLayout>
  );
}
