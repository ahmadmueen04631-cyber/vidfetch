// ============================================================
// ClipDown — Pinterest Provider (Resilient RapidAPI + Fallback Engine)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";

export class PinterestProvider implements VideoProvider {
  platform: Platform = "pinterest";

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return host.includes("pinterest.com") || host.includes("pin.it");
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const response = await fetch(
          `https://pinterest-video-downloader.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": "pinterest-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            return {
              platform: "pinterest",
              contentType: "video",
              title: data.title ?? "Pinterest Video Pin",
              thumbnail: data.thumbnail ?? undefined,
              originalUrl: url.toString(),
            };
          }
        }
      } catch {
        // Fall back below
      }
    }

    return this.fallbackMetadata(url);
  }

  async getAvailableDownloads(url: URL): Promise<DownloadOption[]> {
    if (RAPIDAPI_KEY) {
      try {
        const response = await fetch(
          `https://pinterest-video-downloader.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": "pinterest-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const downloads: DownloadOption[] = [];

          if (data.url) {
            downloads.push({
              id: "pin-hd",
              label: "Pinterest Video (MP4)",
              format: "mp4",
              quality: "HD",
              downloadUrl: data.url,
            });
          }

          if (downloads.length > 0) return downloads;
        }
      } catch {
        // Fall back below
      }
    }

    return this.fallbackDownloads(url);
  }

  private fallbackMetadata(url: URL): VideoMetadata {
    return {
      platform: "pinterest",
      contentType: "video",
      title: "Pinterest Video Pin",
      author: "Pinterest User",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "pin-fb-hd",
        label: "Pinterest Video (HD MP4)",
        format: "mp4",
        quality: "HD",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
    ];
  }
}
