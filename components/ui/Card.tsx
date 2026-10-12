"use client";

// ============================================================
// ClipDown — Card Component
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  glow?: boolean;
}

const variantStyles = {
  default: [
    "bg-[var(--bg-elevated)]",
    "border border-[var(--border-subtle)]",
    "shadow-[var(--shadow-md)]",
  ].join(" "),

  elevated: [
    "bg-[var(--bg-elevated)]",
    "border border-[var(--border-subtle)]",
    "shadow-[var(--shadow-xl)]",
  ].join(" "),

  outlined: [
    "bg-transparent",
    "border border-[var(--border-default)]",
  ].join(" "),

  ghost: "bg-[var(--bg-surface)]",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  hover = false,
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "transition-all duration-200",
        variantStyles[variant],
        paddingStyles[padding],
        hover && [
          "cursor-pointer",
          "hover:border-[var(--border-strong)]",
          "hover:shadow-[var(--shadow-lg)]",
          "hover:-translate-y-0.5",
        ].join(" "),
        glow && "hover:shadow-[var(--shadow-glow-strong)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Card Header ────────────────────────────────────────────
interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({
  title,
  description,
  action,
  icon,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          {title && (
            <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ── Card Body ──────────────────────────────────────────────
export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
}

// ── Card Divider ───────────────────────────────────────────
export function CardDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("border-t border-[var(--border-subtle)] my-4", className)}
      {...props}
    />
  );
}
