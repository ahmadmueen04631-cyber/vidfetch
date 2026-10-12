"use client";

// ============================================================
// ClipDown — Reusable Ad Banner Component (components/ads/AdBanner.tsx)
// Handles Google AdSense & generic ad network slots with fallback UI
// ============================================================

import React, { useEffect } from "react";

export type AdSlotType = "leaderboard" | "rectangle" | "responsive";

interface AdBannerProps {
  slotId?: string;
  format?: AdSlotType;
  className?: string;
  label?: string;
}

export function AdBanner({
  slotId,
  format = "responsive",
  className = "",
  label = "Advertisement",
}: AdBannerProps) {
  useEffect(() => {
    // Push adsbygoogle if AdSense client script is present
    try {
      if (typeof window !== "undefined" && slotId) {
        // @ts-expect-error Google Adsense global array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.debug("[AdBanner] AdSense script not ready or blocked:", err);
    }
  }, [slotId]);

  const clientPublisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Render AdSense unit if Publisher ID & Slot ID are configured
  if (clientPublisherId && slotId) {
    return (
      <div className={`my-6 text-center overflow-hidden ${className}`}>
        {label && (
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            {label}
          </span>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={clientPublisherId}
          data-ad-slot={slotId}
          data-ad-format={format === "responsive" ? "auto" : undefined}
          data-full-width-responsive={format === "responsive" ? "true" : "false"}
        />
      </div>
    );
  }

  // Visual placeholder during development or before AdSense approval
  return (
    <div
      className={`my-6 mx-auto w-full p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center flex flex-col items-center justify-center text-xs text-slate-400 dark:text-slate-500 min-h-[90px] ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider mb-1 text-slate-400">
        {label} Slot ({format})
      </span>
      <span className="text-[11px] text-slate-500 dark:text-slate-400">
        Set <code className="text-indigo-500 font-mono">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> to enable live ads
      </span>
    </div>
  );
}
