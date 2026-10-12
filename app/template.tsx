"use client";

// ============================================================
// ClipDown — App Template (Page Transitions)
// Ultra-smooth page fade & slide animation on route changes
// ============================================================

import React from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-page-fade-in w-full min-h-[calc(100vh-4rem)] flex flex-col flex-1"
    >
      {children}
    </div>
  );
}
