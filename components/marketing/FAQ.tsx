"use client";

// ============================================================
// VidFetch — FAQ Accordion
// ============================================================

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Which platforms does VidFetch support?",
    answer:
      "VidFetch currently supports public videos from Instagram (videos and Reels), TikTok (public videos), and YouTube (videos and Shorts). More platforms may be added in the future.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. VidFetch does not require you to sign up, log in, or provide any personal information. Just paste a URL and go.",
  },
  {
    question: "Can I download private videos?",
    answer:
      "No. VidFetch only supports publicly accessible content. Videos from private accounts or behind authentication cannot be processed. This is by design.",
  },
  {
    question: "Is there a limit on how many videos I can download?",
    answer:
      "There may be rate limits in place to prevent abuse, but there is no strict per-user quota for normal usage.",
  },
  {
    question: "What happens to the URL I submit?",
    answer:
      "Submitted URLs are sent to our server to fetch available metadata and download options. We do not store your URLs beyond the request lifetime, and we do not store the video files themselves.",
  },
  {
    question: "Is it legal to download videos?",
    answer:
      "This depends on the platform's terms of service, the content creator's copyright, and your jurisdiction. You should only download content you have permission to download. VidFetch is a technical tool; users are responsible for ensuring they have appropriate rights to any content they download.",
  },
  {
    question: "What video formats and qualities are available?",
    answer:
      "Available formats and quality options depend on the specific video and the provider. Options displayed in the results are the ones actually available — we never show formats that can't be downloaded.",
  },
  {
    question: "Why can't I download a specific video?",
    answer:
      "Some videos may be unavailable due to geographic restrictions, platform limitations, the video being deleted or made private, or provider-side issues. VidFetch will display a clear explanation when a video cannot be processed.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="section-py"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3"
            >
              Common questions
            </h2>
            <p className="text-[var(--text-secondary)]">
              Everything you need to know about VidFetch.
            </p>
          </div>

          {/* Accordion */}
          <div
            className="space-y-2"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                {...faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = `faq-${index}`;

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        isOpen
          ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-[var(--shadow-sm)]"
          : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
      )}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        id={`${id}-trigger`}
        className={cn(
          "w-full flex items-center justify-between gap-4",
          "px-5 py-4 text-left",
          "rounded-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
      >
        <span
          className="text-sm sm:text-base font-semibold text-[var(--text-primary)]"
          itemProp="name"
        >
          {question}
        </span>
        <div
          className={cn(
            "shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
            "transition-all duration-300",
            isOpen
              ? "bg-indigo-600 text-white rotate-45"
              : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
          )}
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      {/* Answer panel */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <p
          className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed"
          itemProp="text"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
