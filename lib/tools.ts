// ============================================================
// VidFetch — Tool Definitions (Configuration-Driven)
// ============================================================

import type { ToolDefinition } from "@/lib/types";

export const TOOLS: Record<string, ToolDefinition> = {
  "video-downloader": {
    slug: "video-downloader",
    name: "Video Downloader",
    shortName: "Video Downloader",
    description:
      "Download supported public videos from Instagram, TikTok, YouTube, Twitter, Facebook, Pinterest, and Reddit.",
    longDescription:
      "VidFetch is a simple, fast tool for downloading supported public videos from major platforms. Paste any public video URL and access available download options.",
    keywords: [
      "video downloader",
      "online video downloader",
      "download video",
      "free video downloader",
    ],
    features: [
      "Supports 7 major social video platforms",
      "Multiple quality options",
      "No account required",
      "Mobile-friendly",
      "Fast and simple",
    ],
    supportedUrlPatterns: [
      "https://www.instagram.com/reel/...",
      "https://www.tiktok.com/@user/video/...",
      "https://www.youtube.com/watch?v=...",
      "https://twitter.com/user/status/...",
      "https://www.facebook.com/watch/?v=...",
      "https://www.pinterest.com/pin/...",
      "https://www.reddit.com/r/sub/comments/...",
    ],
    faqs: [
      {
        question: "Which platforms are supported?",
        answer:
          "VidFetch supports public videos from Instagram, TikTok, YouTube, Twitter / X, Facebook, Pinterest, and Reddit.",
      },
      {
        question: "Do I need an account to use VidFetch?",
        answer:
          "No. VidFetch does not require you to create an account or log in to any platform.",
      },
      {
        question: "Can I download private videos?",
        answer:
          "No. VidFetch only supports publicly accessible content. Private or restricted videos cannot be processed.",
      },
      {
        question: "Is VidFetch free to use?",
        answer:
          "Yes, VidFetch is free to use for supported public content.",
      },
    ],
  },

  "instagram-video-downloader": {
    slug: "instagram-video-downloader",
    name: "Instagram Video Downloader",
    shortName: "Instagram Downloader",
    description:
      "Download supported public Instagram videos quickly with a simple URL.",
    longDescription:
      "Paste a public Instagram video URL to access available download options. Supports standard posts and IGTV videos.",
    platform: "instagram",
    contentType: "video",
    keywords: [
      "instagram video downloader",
      "download instagram video",
      "instagram downloader",
      "save instagram video",
    ],
    features: [
      "Download public Instagram videos",
      "No Instagram login required",
      "Multiple quality options where available",
      "Fast processing",
    ],
    supportedUrlPatterns: [
      "https://www.instagram.com/p/SHORTCODE/",
      "https://www.instagram.com/tv/SHORTCODE/",
    ],
    faqs: [
      {
        question: "What Instagram URLs are supported?",
        answer:
          "We support public Instagram posts (/p/) and IGTV (/tv/) URLs. Private account content is not supported.",
      },
      {
        question: "Why can't I download a private Instagram video?",
        answer:
          "VidFetch only supports publicly accessible content. Videos from private accounts require authentication, which we do not support.",
      },
      {
        question: "Can I download Instagram Stories?",
        answer:
          "Instagram Stories from public accounts may be supported depending on availability.",
      },
    ],
  },

  "instagram-reels-downloader": {
    slug: "instagram-reels-downloader",
    name: "Instagram Reels Downloader",
    shortName: "Reels Downloader",
    description:
      "Download supported public Instagram Reels using a simple URL.",
    longDescription:
      "Paste a public Instagram Reels URL and access available download options. Only publicly accessible Reels are supported.",
    platform: "instagram",
    contentType: "reel",
    keywords: [
      "instagram reels downloader",
      "download instagram reels",
      "save instagram reel",
      "reel downloader",
    ],
    features: [
      "Download public Instagram Reels",
      "No login required",
      "Simple URL input",
      "Fast and private",
    ],
    supportedUrlPatterns: [
      "https://www.instagram.com/reel/SHORTCODE/",
    ],
    faqs: [
      {
        question: "What is the format of an Instagram Reel URL?",
        answer:
          "Instagram Reel URLs look like: https://www.instagram.com/reel/SHORTCODE/. Copy the URL from the app or site.",
      },
      {
        question: "Are private Reels supported?",
        answer:
          "No. Only Reels from public accounts can be processed.",
      },
    ],
  },

  "tiktok-video-downloader": {
    slug: "tiktok-video-downloader",
    name: "TikTok Video Downloader",
    shortName: "TikTok Downloader",
    description:
      "Download supported public TikTok videos using a video URL.",
    longDescription:
      "Paste a public TikTok video URL to access available download options. Supports standard and short links.",
    platform: "tiktok",
    contentType: "video",
    keywords: [
      "tiktok video downloader",
      "download tiktok video",
      "tiktok downloader",
      "save tiktok video",
    ],
    features: [
      "Download public TikTok videos",
      "Supports standard and short URLs",
      "No TikTok account required",
      "Mobile-friendly interface",
    ],
    supportedUrlPatterns: [
      "https://www.tiktok.com/@username/video/1234567890",
      "https://vm.tiktok.com/SHORTCODE/",
    ],
    faqs: [
      {
        question: "How do I get a TikTok video URL?",
        answer:
          "In the TikTok app, tap Share on any video, then tap 'Copy link'. On the website, copy the URL from your address bar.",
      },
      {
        question: "Are private TikTok videos supported?",
        answer:
          "No. Only publicly accessible TikTok videos can be processed.",
      },
    ],
  },

  "youtube-video-downloader": {
    slug: "youtube-video-downloader",
    name: "YouTube Video Downloader",
    shortName: "YouTube Downloader",
    description:
      "Download supported public YouTube videos in available quality options.",
    longDescription:
      "Paste a public YouTube video URL to view available download options. Supports standard YouTube videos and short links.",
    platform: "youtube",
    contentType: "video",
    keywords: [
      "youtube video downloader",
      "download youtube video",
      "youtube downloader",
      "save youtube video",
    ],
    features: [
      "Download public YouTube videos",
      "Multiple quality options",
      "Fast URL processing",
    ],
    supportedUrlPatterns: [
      "https://www.youtube.com/watch?v=VIDEO_ID",
      "https://youtu.be/VIDEO_ID",
    ],
    faqs: [
      {
        question: "What video qualities are available?",
        answer:
          "Available quality options typically include 1080p, 720p, 480p, and 360p where available.",
      },
    ],
  },

  "youtube-shorts-downloader": {
    slug: "youtube-shorts-downloader",
    name: "YouTube Shorts Downloader",
    shortName: "Shorts Downloader",
    description:
      "Download supported public YouTube Shorts using a simple URL.",
    longDescription:
      "Paste a public YouTube Shorts URL to access available download options.",
    platform: "youtube",
    contentType: "short",
    keywords: [
      "youtube shorts downloader",
      "download youtube shorts",
      "shorts downloader",
    ],
    features: [
      "Download public YouTube Shorts",
      "Simple URL input",
      "Fast processing",
    ],
    supportedUrlPatterns: [
      "https://www.youtube.com/shorts/VIDEO_ID",
    ],
    faqs: [
      {
        question: "What is the format of a YouTube Shorts URL?",
        answer:
          "YouTube Shorts URLs look like: https://www.youtube.com/shorts/VIDEO_ID.",
      },
    ],
  },

  "twitter-video-downloader": {
    slug: "twitter-video-downloader",
    name: "Twitter / X Video Downloader",
    shortName: "Twitter Downloader",
    description:
      "Download supported public Twitter / X videos and GIFs using a tweet URL.",
    longDescription:
      "Paste a public Twitter or X post URL containing a video to view and download available quality resolutions.",
    platform: "twitter",
    contentType: "video",
    keywords: [
      "twitter video downloader",
      "x video downloader",
      "download twitter video",
      "save tweet video",
    ],
    features: [
      "Download public Twitter / X videos",
      "Supports x.com and twitter.com links",
      "Fast HD quality processing",
      "No Twitter login needed",
    ],
    supportedUrlPatterns: [
      "https://twitter.com/username/status/1234567890",
      "https://x.com/username/status/1234567890",
    ],
    faqs: [
      {
        question: "How do I download a video from Twitter / X?",
        answer:
          "Copy the tweet URL from Twitter or X, paste it into VidFetch, and click Download.",
      },
      {
        question: "Can I download videos from private Twitter accounts?",
        answer:
          "No. Only public tweets with embedded videos are supported.",
      },
    ],
  },

  "facebook-video-downloader": {
    slug: "facebook-video-downloader",
    name: "Facebook Video Downloader",
    shortName: "Facebook Downloader",
    description:
      "Download supported public Facebook videos and Reels online.",
    longDescription:
      "Paste a public Facebook video or Reel link to extract downloadable MP4 videos in HD and SD resolutions.",
    platform: "facebook",
    contentType: "video",
    keywords: [
      "facebook video downloader",
      "fb video downloader",
      "download facebook reel",
      "facebook to mp4",
    ],
    features: [
      "Download public Facebook videos & Reels",
      "HD and SD MP4 options",
      "No Facebook login required",
    ],
    supportedUrlPatterns: [
      "https://www.facebook.com/watch/?v=1234567890",
      "https://www.facebook.com/reel/1234567890",
      "https://fb.watch/SHORTCODE/",
    ],
    faqs: [
      {
        question: "Does VidFetch support Facebook Reels?",
        answer:
          "Yes! VidFetch supports public Facebook video watch links, group videos, and Reels.",
      },
      {
        question: "Are private Facebook videos supported?",
        answer:
          "No. Videos in private Facebook groups or from private profiles cannot be downloaded.",
      },
    ],
  },

  "pinterest-video-downloader": {
    slug: "pinterest-video-downloader",
    name: "Pinterest Video Downloader",
    shortName: "Pinterest Downloader",
    description:
      "Download supported public Pinterest video pins in high quality.",
    longDescription:
      "Paste any public Pinterest video pin link to download the video file directly to your device.",
    platform: "pinterest",
    contentType: "video",
    keywords: [
      "pinterest video downloader",
      "download pinterest video",
      "save pinterest pin",
      "pinterest downloader",
    ],
    features: [
      "Download public Pinterest video pins",
      "Supports pin.it short links",
      "Simple one-click processing",
    ],
    supportedUrlPatterns: [
      "https://www.pinterest.com/pin/1234567890/",
      "https://pin.it/SHORTCODE",
    ],
    faqs: [
      {
        question: "How do I get a Pinterest video link?",
        answer:
          "Open the video pin in Pinterest, tap the Share button, and choose 'Copy Link'.",
      },
    ],
  },

  "reddit-video-downloader": {
    slug: "reddit-video-downloader",
    name: "Reddit Video Downloader",
    shortName: "Reddit Downloader",
    description:
      "Download supported public Reddit videos with audio included.",
    longDescription:
      "Paste a public Reddit post link or v.redd.it URL to download the video with audio track merged.",
    platform: "reddit",
    contentType: "video",
    keywords: [
      "reddit video downloader",
      "download reddit video with audio",
      "save reddit video",
      "v.redd.it downloader",
    ],
    features: [
      "Download public Reddit videos",
      "Supports v.redd.it and post comment links",
      "Fast MP4 extraction",
    ],
    supportedUrlPatterns: [
      "https://www.reddit.com/r/subreddit/comments/id/title/",
      "https://v.redd.it/VIDEO_ID",
    ],
    faqs: [
      {
        question: "Does the downloaded Reddit video have sound?",
        answer:
          "Yes, VidFetch extracts the combined audio and video streams where available.",
      },
    ],
  },
};

export function getTool(slug: string): ToolDefinition | null {
  return TOOLS[slug] ?? null;
}

export function getAllTools(): ToolDefinition[] {
  return Object.values(TOOLS);
}

export function getToolsByPlatform(
  platform: string
): ToolDefinition[] {
  return Object.values(TOOLS).filter((t) => t.platform === platform);
}
