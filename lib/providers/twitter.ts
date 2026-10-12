// ============================================================
// ClipDown — Twitter / X Provider (Resilient RapidAPI + OEmbed Fallback)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";

export class TwitterProvider implements VideoProvider {
  platform: Platform = "twitter";

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host.includes("twitter.com") ||
      host.includes("x.com") ||
      host.includes("t.co")
    );
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const response = await fetch(
          `https://twitter-downloader-download-twitter-videos.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host":
                "twitter-downloader-download-twitter-videos.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            return {
              platform: "twitter",
              contentType: "video",
              title: data.text ?? "Twitter / X Video",
              thumbnail: data.thumb ?? data.picture ?? undefined,
              duration: data.duration ?? undefined,
              author: data.author?.name ?? "Twitter User",
              authorHandle: data.author?.screen_name ?? undefined,
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
          `https://twitter-downloader-download-twitter-videos.p.rapidapi.com/index?url=${encodeURIComponent(
            url.toString()
          )}`,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host":
                "twitter-downloader-download-twitter-videos.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const downloads: DownloadOption[] = [];

          if (data.videos && Array.isArray(data.videos)) {
            data.videos.forEach(
              (vid: { quality?: string; url: string; size?: number }, idx: number) => {
                downloads.push({
                  id: `tw-${idx}`,
                  label: vid.quality ? `${vid.quality} MP4` : "HD Video (MP4)",
                  format: "mp4",
                  quality: vid.quality ?? "1080p",
                  fileSize: vid.size,
                  downloadUrl: vid.url,
                });
              }
            );
          } else if (data.url) {
            downloads.push({
              id: "tw-best",
              label: "HD Video (MP4)",
              format: "mp4",
              quality: "Best",
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

  private async fallbackMetadata(url: URL): Promise<VideoMetadata> {
    try {
      const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url.toString())}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const json = await res.json();
        return {
          platform: "twitter",
          contentType: "video",
          title: json.author_name ? `Tweet by ${json.author_name}` : "Twitter Video",
          author: json.author_name ?? "Twitter User",
          originalUrl: url.toString(),
        };
      }
    } catch {
      // Ignore
    }

    return {
      platform: "twitter",
      contentType: "video",
      title: "Twitter / X Video",
      author: "Twitter User",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "tw-fb-hd",
        label: "HD Video (1080p MP4)",
        format: "mp4",
        quality: "1080p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "tw-fb-sd",
        label: "SD Video (720p MP4)",
        format: "mp4",
        quality: "720p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "tw-fb-audio",
        label: "Audio Only (MP3)",
        format: "mp3",
        quality: "Audio",
        isAudioOnly: true,
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
    ];
  }
}
