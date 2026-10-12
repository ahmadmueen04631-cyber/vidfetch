"use client";

// ============================================================
// ClipDown — Homepage CTA Section
// ============================================================

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  const router = useRouter();

  return (
    <section
      className="section-py relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container-page">
        <div
          className={cn(
            "max-w-2xl mx-auto text-center",
            "px-6 py-14 rounded-3xl",
            "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
            "shadow-[var(--shadow-xl)]",
            "relative overflow-hidden"
          )}
        >
          {/* Decorative gradient blob */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />

          <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
            Get Started
          </span>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Ready to download?
          </h2>

          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Paste a public video URL and access available download options in
            seconds. No account needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/video-downloader")}
              className="w-full sm:w-auto"
            >
              Start Downloading
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/#how-it-works")}
              className="w-full sm:w-auto"
            >
              How It Works
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-5 flex-wrap">
            {[
              "No account required",
              "Privacy-conscious",
              "Public content only",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"
              >
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-3.5-3.5 1.41-1.41L10 13.67l5.59-5.59L17 9.5l-7 7z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
