// ============================================================
// ClipDown — Platform Detection & Validation Engine
// Robust, high-coverage URL patterns for Instagram, TikTok, YouTube,
// Twitter/X, Facebook, Pinterest, Reddit
// ============================================================

import type { Platform, ContentType, DetectionResult } from "@/lib/types";

// ── Instagram URL Patterns ─────────────────────────────────
const INSTAGRAM_PATTERNS = [
  /^https?:\/\/(www\.|m\.)?instagram\.com\/(p|reel|reels|tv|share\/(p|reel|reels))\/([A-Za-z0-9_-]+)/,
  /^https?:\/\/(www\.|m\.)?instagram\.com\/stories\/([^/]+)\/([0-9]+)/,
  /^https?:\/\/(www\.|m\.)?instagr\.am\/(p|reel|reels)\/([A-Za-z0-9_-]+)/,
];

// ── TikTok URL Patterns ────────────────────────────────────
const TIKTOK_PATTERNS = [
  /^https?:\/\/(www\.|m\.)?tiktok\.com\/@([^/]+)\/video\/([0-9]+)/,
  /^https?:\/\/(www\.|m\.)?tiktok\.com\/t\/([A-Za-z0-9]+)/,
  /^https?:\/\/(www\.|m\.)?tiktok\.com\/v\/([0-9]+)/,
  /^https?:\/\/vm\.tiktok\.com\/([A-Za-z0-9]+)/,
  /^https?:\/\/vt\.tiktok\.com\/([A-Za-z0-9]+)/,
  /^https?:\/\/tiktok\.com\/@([^/]+)\/video\/([0-9]+)/,
];

// ── YouTube URL Patterns ───────────────────────────────────
const YOUTUBE_PATTERNS = [
  /^https?:\/\/(www\.|m\.)?youtube\.com\/watch\?.*v=([A-Za-z0-9_-]{11})/,
  /^https?:\/\/youtu\.be\/([A-Za-z0-9_-]{11})/,
  /^https?:\/\/(www\.|m\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  /^https?:\/\/(www\.|m\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
  /^https?:\/\/(www\.|m\.)?youtube\.com\/v\/([A-Za-z0-9_-]{11})/,
  /^https?:\/\/music\.youtube\.com\/watch\?.*v=([A-Za-z0-9_-]{11})/,
];

// ── Twitter / X URL Patterns ───────────────────────────────
const TWITTER_PATTERNS = [
  /^https?:\/\/(www\.|m\.)?(twitter|x)\.com\/([^/]+)\/status\/([0-9]+)/,
  /^https?:\/\/(www\.|m\.)?(twitter|x)\.com\/i\/status\/([0-9]+)/,
  /^https?:\/\/t\.co\/([A-Za-z0-9]+)/,
];

// ── Facebook URL Patterns ──────────────────────────────────
const FACEBOOK_PATTERNS = [
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/(watch\/?\?v=|reel\/|reels\/|videos\/|share\/(v|r)\/|[^/]+\/videos\/)([0-9A-Za-z_-]+)/,
  /^https?:\/\/fb\.watch\/([A-Za-z0-9_-]+)/,
  /^https?:\/\/fb\.gg\/v\/([A-Za-z0-9_-]+)/,
];

// ── Pinterest URL Patterns ─────────────────────────────────
const PINTEREST_PATTERNS = [
  /^https?:\/\/(www\.|[a-z]{2}\.)?pinterest\.(com|[a-z]{2})\/pin\/([0-9]+)/,
  /^https?:\/\/pin\.it\/([A-Za-z0-9]+)/,
];

// ── Reddit URL Patterns ────────────────────────────────────
const REDDIT_PATTERNS = [
  /^https?:\/\/(www\.|old\.|new\.|sh\.)?reddit\.com\/r\/([^/]+)\/comments\/([A-Za-z0-9]+)/,
  /^https?:\/\/(www\.|old\.|new\.|sh\.)?reddit\.com\/r\/([^/]+)\/s\/([A-Za-z0-9]+)/,
  /^https?:\/\/v\.redd\.it\/([A-Za-z0-9]+)/,
];

// ── Detect Platform ────────────────────────────────────────
export function detectPlatform(rawUrl: string): Platform {
  const url = rawUrl.trim().toLowerCase();

  if (url.includes("instagram.com") || url.includes("instagr.am")) {
    return "instagram";
  }

  if (
    url.includes("tiktok.com") ||
    url.includes("vm.tiktok.com") ||
    url.includes("vt.tiktok.com")
  ) {
    return "tiktok";
  }

  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("music.youtube.com")
  ) {
    return "youtube";
  }

  if (
    url.includes("twitter.com") ||
    url.includes("x.com") ||
    url.includes("t.co")
  ) {
    return "twitter";
  }

  if (
    url.includes("facebook.com") ||
    url.includes("fb.watch") ||
    url.includes("fb.gg")
  ) {
    return "facebook";
  }

  if (url.includes("pinterest.com") || url.includes("pin.it")) {
    return "pinterest";
  }

  if (url.includes("reddit.com") || url.includes("v.redd.it")) {
    return "reddit";
  }

  return "unknown";
}

// ── Detect Content Type ────────────────────────────────────
export function detectContentType(
  rawUrl: string,
  platform: Platform
): ContentType {
  const url = rawUrl.trim().toLowerCase();

  switch (platform) {
    case "instagram":
      if (url.includes("/reel/") || url.includes("/reels/")) return "reel";
      if (url.includes("/stories/")) return "story";
      return "video";

    case "youtube":
      if (url.includes("/shorts/")) return "short";
      return "video";

    case "facebook":
      if (url.includes("/reel/") || url.includes("/reels/")) return "reel";
      return "video";

    case "tiktok":
    case "twitter":
    case "pinterest":
    case "reddit":
      return "video";

    default:
      return "unknown";
  }
}

// ── Extract Video ID ───────────────────────────────────────
export function extractVideoId(
  rawUrl: string,
  platform: Platform
): string | null {
  try {
    const url = new URL(rawUrl);

    switch (platform) {
      case "instagram": {
        const match = rawUrl.match(
          /instagram\.com\/(?:p|reel|reels|tv|share\/(?:p|reel|reels))\/([A-Za-z0-9_-]+)/i
        );
        return match ? match[1] : null;
      }

      case "tiktok": {
        const stdMatch = rawUrl.match(/\/video\/([0-9]+)/);
        if (stdMatch) return stdMatch[1];
        const shortMatch = rawUrl.match(/(?:vm|vt)\.tiktok\.com\/([A-Za-z0-9]+)/);
        return shortMatch ? shortMatch[1] : null;
      }

      case "youtube": {
        if (url.hostname === "youtu.be") {
          return url.pathname.slice(1).split("/")[0] || null;
        }
        const vParam = url.searchParams.get("v");
        if (vParam && /^[A-Za-z0-9_-]{11}$/.test(vParam)) return vParam;
        const pathMatch = url.pathname.match(/\/(shorts|embed|v)\/([A-Za-z0-9_-]{11})/);
        return pathMatch ? pathMatch[2] : null;
      }

      case "twitter": {
        const match = rawUrl.match(/(?:twitter|x)\.com\/(?:[^/]+\/status|i\/status)\/([0-9]+)/);
        return match ? match[1] : null;
      }

      case "facebook": {
        const match = rawUrl.match(/(?:watch\/?\?v=|reel\/|reels\/|videos\/)([0-9A-Za-z_-]+)/);
        return match ? match[1] : null;
      }

      case "pinterest": {
        const match = rawUrl.match(/pin\/([0-9]+)/);
        return match ? match[1] : null;
      }

      case "reddit": {
        const match = rawUrl.match(/comments\/([A-Za-z0-9]+)/);
        return match ? match[1] : null;
      }

      default:
        return null;
    }
  } catch {
    return null;
  }
}

// ── Normalize URL ──────────────────────────────────────────
export function normalizeUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "igshid",
      "fbclid",
      "ref",
      "si",
      "s",
      "t",
    ];
    trackingParams.forEach((p) => parsed.searchParams.delete(p));
    return parsed.toString();
  } catch {
    return url;
  }
}

// ── Validate URL ───────────────────────────────────────────
export function validateUrl(rawUrl: string): {
  isValid: boolean;
  error?: string;
} {
  if (!rawUrl || rawUrl.trim().length === 0) {
    return { isValid: false, error: "Please enter a URL." };
  }

  let url = rawUrl.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return { isValid: false, error: "Please enter a valid URL." };
  }

  return { isValid: true };
}

// ── Validate Platform-Specific URL ────────────────────────
export function validatePlatformUrl(
  rawUrl: string,
  platform: Platform
): { isValid: boolean; error?: string } {
  const base = validateUrl(rawUrl);
  if (!base.isValid) return base;

  const url = normalizeUrl(rawUrl);

  switch (platform) {
    case "instagram":
      return INSTAGRAM_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid Instagram video or Reel URL." };

    case "tiktok":
      return TIKTOK_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid TikTok video URL." };

    case "youtube":
      return YOUTUBE_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid YouTube video or Shorts URL." };

    case "twitter":
      return TWITTER_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid Twitter / X video post URL." };

    case "facebook":
      return FACEBOOK_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid Facebook video or Reel URL." };

    case "pinterest":
      return PINTEREST_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid Pinterest pin URL." };

    case "reddit":
      return REDDIT_PATTERNS.some((p) => p.test(url))
        ? { isValid: true }
        : { isValid: false, error: "Please enter a valid Reddit video post URL." };

    case "unknown":
      return {
        isValid: false,
        error: "This platform isn't supported yet.",
      };
  }
}

// ── Full Detection Pipeline ────────────────────────────────
export function detectAndValidate(rawUrl: string): DetectionResult {
  const validation = validateUrl(rawUrl);
  if (!validation.isValid) {
    return {
      platform: "unknown",
      contentType: "unknown",
      isValid: false,
      error: validation.error,
    };
  }

  const normalized = normalizeUrl(rawUrl);
  const platform = detectPlatform(normalized);
  const contentType = detectContentType(normalized, platform);

  if (platform === "unknown") {
    return {
      platform: "unknown",
      contentType: "unknown",
      isValid: false,
      error: "Unsupported platform. We support Instagram, TikTok, YouTube, Twitter/X, Facebook, Pinterest, and Reddit.",
    };
  }

  const platformValidation = validatePlatformUrl(normalized, platform);
  if (!platformValidation.isValid) {
    return {
      platform,
      contentType,
      isValid: false,
      error: platformValidation.error,
    };
  }

  const videoId = extractVideoId(normalized, platform);

  return {
    platform,
    contentType,
    isValid: true,
    normalizedUrl: normalized,
    videoId: videoId ?? undefined,
  };
}

// ── Platform Display Info ──────────────────────────────────
export const PLATFORM_INFO: Record<
  Exclude<Platform, "unknown">,
  {
    name: string;
    color: string;
    bgColor: string;
    gradient: string;
  }
> = {
  instagram: {
    name: "Instagram",
    color: "#e1306c",
    bgColor: "rgba(225,48,108,0.1)",
    gradient: "linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)",
  },
  tiktok: {
    name: "TikTok",
    color: "#010101",
    bgColor: "rgba(0,242,234,0.1)",
    gradient: "linear-gradient(135deg, #00f2ea, #010101, #ff0050)",
  },
  youtube: {
    name: "YouTube",
    color: "#ff0000",
    bgColor: "rgba(255,0,0,0.08)",
    gradient: "linear-gradient(135deg, #ff0000, #cc0000)",
  },
  twitter: {
    name: "Twitter / X",
    color: "#1da1f2",
    bgColor: "rgba(29,161,242,0.1)",
    gradient: "linear-gradient(135deg, #1da1f2, #000000)",
  },
  facebook: {
    name: "Facebook",
    color: "#1877f2",
    bgColor: "rgba(24,119,242,0.1)",
    gradient: "linear-gradient(135deg, #1877f2, #0b51c5)",
  },
  pinterest: {
    name: "Pinterest",
    color: "#e60023",
    bgColor: "rgba(230,0,35,0.1)",
    gradient: "linear-gradient(135deg, #e60023, #ad001a)",
  },
  reddit: {
    name: "Reddit",
    color: "#ff4500",
    bgColor: "rgba(255,69,0,0.1)",
    gradient: "linear-gradient(135deg, #ff4500, #cc3700)",
  },
};
