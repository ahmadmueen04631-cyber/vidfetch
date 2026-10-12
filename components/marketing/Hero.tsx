"use client";

// ============================================================
// ClipDown — Hero Section (with Direct In-Place Downloader)
// ============================================================

import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Downloader } from "@/components/downloader/Downloader";

export function Hero() {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "hero-gradient noise-overlay",
        "pt-28 pb-20 md:pt-36 md:pb-28"
      )}
      aria-labelledby="hero-heading"
    >
      {/* Decorative floating orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left orb */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Top-right orb */}
        <div
          className="absolute -top-12 right-0 w-80 h-80 rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            animationDelay: "1s",
          }}
        />
        {/* Bottom orb */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Floating platform chips */}
        <div className="hidden lg:block">
          <FloatingChip
            label="Instagram Reel"
            color="#e1306c"
            className="absolute top-32 right-[8%] animate-float"
            icon="📱"
          />
          <FloatingChip
            label="TikTok Video"
            color="#00f2ea"
            className="absolute top-48 left-[6%] animate-float-delayed"
            icon="🎵"
          />
          <FloatingChip
            label="YouTube Short"
            color="#ff0000"
            className="absolute bottom-24 right-[12%] animate-float"
            icon="▶️"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #6366f1 1px, transparent 1px),
              linear-gradient(to bottom, #6366f1 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-page relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag line pill */}
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Simple · Fast · Privacy-Conscious
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="animate-slide-up stagger-2 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.07] text-[var(--text-primary)] mb-5"
          >
            Download Videos{" "}
            <span className="gradient-text block sm:inline">
              From Any Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-slide-up stagger-3 text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
            Paste a public video URL from Instagram, TikTok, or YouTube
            and access available download options instantly.
          </p>

          {/* Direct Downloader Component */}
          <div className="animate-slide-up stagger-4 max-w-2xl mx-auto">
            <Suspense fallback={<div className="h-16 rounded-2xl bg-[var(--bg-elevated)] animate-pulse" />}>
              <Downloader />
            </Suspense>
          </div>

          {/* Platform support indicators */}
          <div className="animate-slide-up stagger-5 mt-8 flex items-center justify-center gap-6 flex-wrap">
            {[
              {
                label: "Instagram",
                sub: "Videos & Reels",
                gradient: "from-pink-500 via-red-500 to-amber-400",
              },
              {
                label: "TikTok",
                sub: "Public Videos",
                gradient: "from-cyan-400 via-slate-900 to-red-500",
              },
              {
                label: "YouTube",
                sub: "Videos & Shorts",
                gradient: "from-red-600 to-red-400",
              },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2.5 group">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full bg-gradient-to-r flex-shrink-0",
                    p.gradient
                  )}
                />
                <div className="text-left">
                  <span className="block text-sm font-medium text-[var(--text-primary)]">
                    {p.label}
                  </span>
                  <span className="block text-xs text-[var(--text-muted)]">
                    {p.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <p className="mt-8 text-xs text-[var(--text-muted)] max-w-md mx-auto">
            Only publicly accessible content is supported. Users are
            responsible for ensuring they have the right to download
            any content.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Floating Chip ──────────────────────────────────────────
function FloatingChip({
  label,
  color,
  className,
  icon,
  style,
}: {
  label: string;
  color: string;
  className?: string;
  icon: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3.5 py-2 rounded-xl",
        "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
        "shadow-[var(--shadow-lg)]",
        "text-sm font-medium text-[var(--text-primary)]",
        className
      )}
      style={style}
      aria-hidden="true"
    >
      <span className="text-base" role="presentation">{icon}</span>
      <span>{label}</span>
      <span
        className="w-2 h-2 rounded-full ml-0.5"
        style={{ background: color }}
      />
    </div>
  );
}
