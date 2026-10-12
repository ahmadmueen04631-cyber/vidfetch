// ============================================================
// ClipDown — General Utilities
// ============================================================

import type { Platform } from "@/lib/types";

// ── Format Duration ────────────────────────────────────────
export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ── Format File Size ───────────────────────────────────────
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}

// ── Format View Count ──────────────────────────────────────
export function formatCount(count: number): string {
  if (!count) return "";
  if (count < 1000) return String(count);
  if (count < 1_000_000) return `${(count / 1000).toFixed(1)}K`;
  if (count < 1_000_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  return `${(count / 1_000_000_000).toFixed(1)}B`;
}

// ── Platform Label ─────────────────────────────────────────
export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    twitter: "Twitter / X",
    facebook: "Facebook",
    pinterest: "Pinterest",
    reddit: "Reddit",
    unknown: "Unknown",
  };
  return labels[platform];
}

// ── Content Type Label ─────────────────────────────────────
export function getContentTypeLabel(
  contentType: string,
  platform: Platform
): string {
  if (contentType === "reel") return "Reel";
  if (contentType === "short") return "Short";
  if (contentType === "story") return "Story";
  if (platform === "youtube") return "YouTube Video";
  if (platform === "instagram") return "Instagram Video";
  if (platform === "tiktok") return "TikTok Video";
  if (platform === "twitter") return "Twitter Video";
  if (platform === "facebook") return "Facebook Video";
  if (platform === "pinterest") return "Pinterest Pin";
  if (platform === "reddit") return "Reddit Video";
  return "Video";
}

// ── Truncate Text ──────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

// ── Class Names Helper ─────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Delay ─────────────────────────────────────────────────
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Is Browser ────────────────────────────────────────────
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
