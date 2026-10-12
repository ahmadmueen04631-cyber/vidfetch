// ============================================================
// ClipDown — Analytics Helper
// ============================================================

import type { AnalyticsEvent, Platform } from "@/lib/types";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

// ── Track Event ────────────────────────────────────────────
export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!GA_MEASUREMENT_ID) return;

  try {
    window.gtag("event", event, {
      ...params,
    });
  } catch (err) {
    // Never let analytics errors break the UI
    console.warn("[ClipDown Analytics] Failed to track event:", err);
  }
}

// ── Convenience Trackers ───────────────────────────────────
export function trackUrlSubmit(url: string, platform: Platform): void {
  trackEvent("url_submit", { platform, url_length: url.length });
}

export function trackPlatformDetected(platform: Platform): void {
  trackEvent("platform_detected", { platform });
}

export function trackVideoProcessed(platform: Platform): void {
  trackEvent("video_processed", { platform });
}

export function trackDownloadClicked(
  platform: Platform,
  format: string,
  quality?: string
): void {
  trackEvent("download_clicked", { platform, format, quality: quality ?? "" });
}

export function trackDownloadSuccess(platform: Platform): void {
  trackEvent("download_success", { platform });
}

export function trackDownloadError(
  platform: Platform,
  errorCode: string
): void {
  trackEvent("download_error", { platform, error_code: errorCode });
}

export function trackToolPageView(slug: string, platform?: Platform): void {
  trackEvent("tool_page_view", { tool_slug: slug, platform: platform ?? "" });
}
