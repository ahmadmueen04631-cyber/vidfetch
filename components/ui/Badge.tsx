// ============================================================
// ClipDown — Badge Component
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "instagram"
  | "tiktok"
  | "youtube";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  default: [
    "bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)]",
    "text-[var(--text-secondary)]",
    "border border-[var(--border-subtle)]",
  ].join(" "),

  primary: [
    "bg-indigo-50 dark:bg-indigo-950",
    "text-indigo-700 dark:text-indigo-300",
    "border border-indigo-200 dark:border-indigo-800",
  ].join(" "),

  success: [
    "bg-emerald-50 dark:bg-emerald-950",
    "text-emerald-700 dark:text-emerald-300",
    "border border-emerald-200 dark:border-emerald-800",
  ].join(" "),

  warning: [
    "bg-amber-50 dark:bg-amber-950",
    "text-amber-700 dark:text-amber-300",
    "border border-amber-200 dark:border-amber-800",
  ].join(" "),

  error: [
    "bg-red-50 dark:bg-red-950",
    "text-red-700 dark:text-red-300",
    "border border-red-200 dark:border-red-800",
  ].join(" "),

  instagram: [
    "bg-pink-50 dark:bg-pink-950",
    "text-pink-700 dark:text-pink-300",
    "border border-pink-200 dark:border-pink-800",
  ].join(" "),

  tiktok: [
    "bg-cyan-50 dark:bg-cyan-950",
    "text-cyan-700 dark:text-cyan-300",
    "border border-cyan-200 dark:border-cyan-800",
  ].join(" "),

  youtube: [
    "bg-red-50 dark:bg-red-950",
    "text-red-700 dark:text-red-300",
    "border border-red-200 dark:border-red-800",
  ].join(" "),
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5 rounded-md",
  md: "text-xs px-2.5 py-1 rounded-lg",
};

export function Badge({
  variant = "default",
  dot = false,
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" && "bg-emerald-500",
            variant === "warning" && "bg-amber-500",
            variant === "error" && "bg-red-500",
            variant === "primary" && "bg-indigo-500",
            (variant === "default" || variant === "instagram" ||
              variant === "tiktok" || variant === "youtube") &&
              "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
