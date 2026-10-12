"use client";

// ============================================================
// ClipDown — Button Component
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-indigo-600 text-white",
    "hover:bg-indigo-700 active:bg-indigo-800",
    "shadow-[0_1px_3px_rgba(99,102,241,0.3),0_4px_12px_rgba(99,102,241,0.15)]",
    "hover:shadow-[0_1px_3px_rgba(99,102,241,0.4),0_6px_16px_rgba(99,102,241,0.25)]",
    "focus-visible:shadow-[0_0_0_3px_rgba(99,102,241,0.3)]",
  ].join(" "),

  secondary: [
    "bg-[var(--bg-elevated)] text-[var(--text-primary)]",
    "border border-[var(--border-default)]",
    "hover:bg-[var(--bg-surface)] hover:border-[var(--border-strong)]",
    "shadow-[var(--shadow-sm)]",
    "hover:shadow-[var(--shadow-md)]",
  ].join(" "),

  ghost: [
    "bg-transparent text-[var(--text-secondary)]",
    "hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]",
  ].join(" "),

  outline: [
    "bg-transparent text-indigo-600 dark:text-indigo-400",
    "border border-indigo-300 dark:border-indigo-700",
    "hover:bg-indigo-50 dark:hover:bg-indigo-950",
  ].join(" "),

  destructive: [
    "bg-red-600 text-white",
    "hover:bg-red-700 active:bg-red-800",
    "shadow-[0_1px_3px_rgba(239,68,68,0.2)]",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2 rounded-xl",
  xl: "h-14 px-8 text-lg gap-2.5 rounded-2xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "btn-base font-medium transition-all duration-200",
          "relative overflow-hidden select-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size={size} />
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ── Spinner ────────────────────────────────────────────────
function Spinner({ size }: { size: Size }) {
  const spinnerSize =
    size === "sm" ? "w-3.5 h-3.5" : size === "xl" ? "w-5 h-5" : "w-4 h-4";

  return (
    <svg
      className={cn("animate-spin shrink-0", spinnerSize)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
