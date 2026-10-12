// ============================================================
// ClipDown — Instagram Provider (Resilient RapidAPI + OEmbed Fallback)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST =
  process.env.INSTAGRAM_RAPIDAPI_HOST ??
  "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com";

export class InstagramProvider implements VideoProvider {
  platform: Platform = "instagram";

  canHandle(url: URL): boolean {
    return (
      url.hostname === "www.instagram.com" ||
      url.hostname === "instagram.com" ||
      url.hostname === "instagr.am"
    );
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const apiUrl = `https://${RAPIDAPI_HOST}/index?url=${encodeURIComponent(
          url.toString()
        )}`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
          next: { revalidate: 0 },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && !data.error) {
            return {
              platform: "instagram",
              contentType: url.pathname.includes("/reel/") ? "reel" : "video",
              title: data.title ?? data.caption ?? "Instagram Video",
              thumbnail: data.thumbnail ?? data.thumbnail_url ?? undefined,
              duration: data.duration ?? undefined,
              author: data.author?.name ?? data.owner?.username ?? "Instagram Creator",
              authorHandle: data.author?.username ?? data.owner?.username ?? undefined,
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
        const apiUrl = `https://${RAPIDAPI_HOST}/index?url=${encodeURIComponent(
          url.toString()
        )}`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
          next: { revalidate: 0 },
        });

        if (res.ok) {
          const data = await res.json();
          const downloads: DownloadOption[] = [];
          const mediaItems = data.media ?? (data.url ? [{ url: data.url, quality: "HD" }] : []);

          mediaItems.forEach((item: { url?: string; quality?: string; size?: number }, i: number) => {
            if (item.url) {
              downloads.push({
                id: `instagram-${i}`,
                label: item.quality ?? (i === 0 ? "HD Video (MP4)" : `Video ${i + 1}`),
                format: "mp4",
                quality: item.quality ?? "HD",
                fileSize: item.size,
                downloadUrl: item.url,
              });
            }
          });

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
      const oembedUrl = `https://api.instagram.com/oembed?url=${encodeURIComponent(url.toString())}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const json = await res.json();
        return {
          platform: "instagram",
          contentType: url.pathname.includes("/reel/") ? "reel" : "video",
          title: json.title ?? "Instagram Video",
          thumbnail: json.thumbnail_url,
          author: json.author_name ?? "Instagram User",
          originalUrl: url.toString(),
        };
      }
    } catch {
      // Ignore
    }

    return {
      platform: "instagram",
      contentType: url.pathname.includes("/reel/") ? "reel" : "video",
      title: "Instagram Reel / Video",
      author: "Instagram User",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "ig-fb-hd",
        label: "HD Video (1080p MP4)",
        format: "mp4",
        quality: "1080p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "ig-fb-sd",
        label: "SD Video (720p MP4)",
        format: "mp4",
        quality: "720p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "ig-fb-audio",
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
