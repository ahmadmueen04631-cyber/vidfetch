// ============================================================
// ClipDown — Skeleton Component (Loading Placeholder)
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  lines?: number;
}

const roundedStyles = {
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({
  width,
  height,
  rounded = "md",
  lines,
  className,
  style,
  ...props
}: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-shimmer",
              roundedStyles[rounded],
              i === lines - 1 && "w-3/4" // last line shorter
            )}
            style={{
              height: height ?? "1rem",
              width: i === lines - 1 ? "75%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("animate-shimmer", roundedStyles[rounded], className)}
      style={{ width, height: height ?? "1rem", ...style }}
      {...props}
    />
  );
}

// ── Skeleton Card ──────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      {/* Thumbnail */}
      <Skeleton rounded="xl" height="200px" className="w-full mb-4" />

      {/* Metadata */}
      <div className="space-y-2 mb-4">
        <Skeleton height="20px" className="w-3/4" />
        <Skeleton height="16px" className="w-1/2" />
        <Skeleton height="14px" className="w-1/3" />
      </div>

      {/* Download options */}
      <div className="space-y-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <Skeleton height="14px" className="w-1/4 mb-3" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <Skeleton width="40px" height="28px" rounded="md" />
              <Skeleton width="60px" height="28px" rounded="md" />
            </div>
            <Skeleton width="90px" height="36px" rounded="lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
