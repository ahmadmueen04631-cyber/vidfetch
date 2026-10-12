// ============================================================
// ClipDown — AdSlot Placeholder
// ============================================================
// Renders nothing in production until ad provider is connected.
// Replace the content with actual ad code when ready.

import { cn } from "@/lib/utils";

type Placement =
  | "tool-top"
  | "tool-bottom"
  | "sidebar"
  | "between-sections"
  | "footer";

interface AdSlotProps {
  placement: Placement;
  className?: string;
}

const AD_SIZES: Record<Placement, { minHeight: string; label: string }> = {
  "tool-top": { minHeight: "90px", label: "Top Banner" },
  "tool-bottom": { minHeight: "90px", label: "Bottom Banner" },
  sidebar: { minHeight: "250px", label: "Sidebar" },
  "between-sections": { minHeight: "90px", label: "Mid-Page" },
  footer: { minHeight: "90px", label: "Footer Banner" },
};

// Set to true during development to see ad slot placeholders
const SHOW_DEV_PLACEHOLDER =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";

export function AdSlot({ placement, className }: AdSlotProps) {
  const size = AD_SIZES[placement];

  if (SHOW_DEV_PLACEHOLDER) {
    return (
      <div
        className={cn(
          "w-full flex items-center justify-center",
          "border-2 border-dashed border-[var(--border-default)]",
          "bg-[var(--bg-surface)] rounded-xl",
          "text-xs text-[var(--text-muted)]",
          className
        )}
        style={{ minHeight: size.minHeight }}
        aria-hidden="true"
        data-ad-placement={placement}
      >
        Ad Slot — {size.label} [{placement}]
      </div>
    );
  }

  // Production: renders nothing until ad provider is connected
  return null;
}
