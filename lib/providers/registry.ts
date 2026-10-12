// ============================================================
// ClipDown — Provider Registry
// ============================================================

import type { VideoProvider, Platform } from "@/lib/types";
import { InstagramProvider } from "./instagram";
import { TikTokProvider } from "./tiktok";
import { YouTubeProvider } from "./youtube";
import { TwitterProvider } from "./twitter";
import { FacebookProvider } from "./facebook";
import { PinterestProvider } from "./pinterest";
import { RedditProvider } from "./reddit";

// Singleton provider instances
const providers: VideoProvider[] = [
  new InstagramProvider(),
  new TikTokProvider(),
  new YouTubeProvider(),
  new TwitterProvider(),
  new FacebookProvider(),
  new PinterestProvider(),
  new RedditProvider(),
];

/**
 * Find the provider that can handle a given URL.
 * Returns null if no provider matches.
 */
export function getProvider(url: URL): VideoProvider | null {
  return providers.find((p) => p.canHandle(url)) ?? null;
}

/**
 * Get a provider by platform name.
 */
export function getProviderByPlatform(
  platform: Platform
): VideoProvider | null {
  return providers.find((p) => p.platform === platform) ?? null;
}

/**
 * List all registered providers.
 */
export function listProviders(): VideoProvider[] {
  return [...providers];
}
