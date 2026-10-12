// ============================================================
// ClipDown — Homepage
// ============================================================

import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { PlatformCards } from "@/components/marketing/PlatformCards";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PopularTools } from "@/components/marketing/PopularTools";
import { FAQ } from "@/components/marketing/FAQ";
import { HomeCTA } from "@/components/marketing/HomeCTA";

export const metadata: Metadata = {
  title: "ClipDown – Download Supported Public Videos Online",
  description:
    "Download supported public videos from Instagram, TikTok, and YouTube. Paste a URL, detect the platform, and access available download options. No account required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClipDown – Download Supported Public Videos Online",
    description:
      "A simple, fast tool for downloading supported public videos from Instagram, TikTok, and YouTube.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero — URL input + headline */}
      <Hero />

      {/* How it works */}
      <HowItWorks />

      {/* Supported platforms */}
      <PlatformCards />

      {/* Popular tools links */}
      <PopularTools />

      {/* Why use ClipDown */}
      <FeatureGrid />

      {/* FAQ */}
      <FAQ />

      {/* Bottom CTA */}
      <HomeCTA />
    </>
  );
}
