// ============================================================
// ClipDown — Facebook Provider (Resilient RapidAPI + Fallback Engine)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";

export class FacebookProvider implements VideoProvider {
  platform: Platform = "facebook";

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host.includes("facebook.com") ||
      host.includes("fb.watch") ||
      host.includes("fb.gg")
    );
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const response = await fetch(
          `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host":
                "facebook-reel-and-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            return {
              platform: "facebook",
              contentType: url.pathname.includes("/reel/") ? "reel" : "video",
              title: data.title ?? "Facebook Video",
              thumbnail: data.sd?.thumbnail ?? data.hd?.thumbnail ?? undefined,
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
          `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host":
                "facebook-reel-and-video-downloader.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const downloads: DownloadOption[] = [];

          if (data.links?.hd || data.hd) {
            downloads.push({
              id: "fb-hd",
              label: "HD Video (1080p MP4)",
              format: "mp4",
              quality: "1080p",
              downloadUrl: data.links?.hd ?? data.hd,
            });
          }

          if (data.links?.sd || data.sd) {
            downloads.push({
              id: "fb-sd",
              label: "SD Video (720p MP4)",
              format: "mp4",
              quality: "720p",
              downloadUrl: data.links?.sd ?? data.sd,
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
      platform: "facebook",
      contentType: url.pathname.includes("/reel/") ? "reel" : "video",
      title: "Facebook Video / Reel",
      author: "Facebook Creator",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "fb-fb-hd",
        label: "HD Video (1080p MP4)",
        format: "mp4",
        quality: "1080p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "fb-fb-sd",
        label: "SD Video (720p MP4)",
        format: "mp4",
        quality: "720p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "fb-fb-audio",
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
