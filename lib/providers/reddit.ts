// ============================================================
// ClipDown — Reddit Provider (Resilient RapidAPI + Fallback Engine)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";

export class RedditProvider implements VideoProvider {
  platform: Platform = "reddit";

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return host.includes("reddit.com") || host.includes("v.redd.it");
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const response = await fetch(
          `https://reddit-video-downloader.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": "reddit-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            return {
              platform: "reddit",
              contentType: "video",
              title: data.title ?? "Reddit Video Post",
              thumbnail: data.thumbnail ?? undefined,
              author: data.author ?? "Reddit User",
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
          `https://reddit-video-downloader.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": "reddit-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const downloads: DownloadOption[] = [];

          if (data.sd_url || data.url) {
            downloads.push({
              id: "reddit-hd",
              label: "Reddit Video with Audio (MP4)",
              format: "mp4",
              quality: "HD",
              downloadUrl: data.sd_url ?? data.url,
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
      platform: "reddit",
      contentType: "video",
      title: "Reddit Video Post",
      author: "Reddit User",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "reddit-fb-hd",
        label: "Reddit Video with Audio (HD MP4)",
        format: "mp4",
        quality: "HD",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "reddit-fb-audio",
        label: "Audio Track (MP3)",
        format: "mp3",
        quality: "Audio",
        isAudioOnly: true,
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
    ];
  }
}
