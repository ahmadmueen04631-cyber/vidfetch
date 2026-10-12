"use client";

// ============================================================
// ClipDown — Global Error Boundary (app/error.tsx)
// Catches unhandled client/server errors gracefully
// ============================================================

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console/analytics
    console.error("[ClipDown App Error]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 border border-amber-500/20">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Something went wrong
      </h1>

      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
        An unexpected error occurred while loading this page. Don&apos;t worry,
        our team has been notified.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
