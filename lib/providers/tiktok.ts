// ============================================================
// ClipDown — TikTok Provider (Resilient RapidAPI + OEmbed Fallback)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST =
  process.env.TIKTOK_RAPIDAPI_HOST ??
  "tiktok-download-without-watermark.p.rapidapi.com";

export class TikTokProvider implements VideoProvider {
  platform: Platform = "tiktok";

  canHandle(url: URL): boolean {
    return (
      url.hostname === "www.tiktok.com" ||
      url.hostname === "tiktok.com" ||
      url.hostname === "vm.tiktok.com" ||
      url.hostname === "vt.tiktok.com"
    );
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    if (RAPIDAPI_KEY) {
      try {
        const data = await this.fetchData(url);
        if (data) {
          return {
            platform: "tiktok",
            contentType: "video",
            title: data.title ?? "TikTok Video",
            thumbnail: data.cover ?? data.origin_cover ?? data.thumbnail ?? undefined,
            duration: data.duration ?? undefined,
            author: data.author?.nickname ?? data.author?.unique_id ?? "TikTok User",
            authorHandle: data.author?.unique_id ?? undefined,
            viewCount: data.play_count ?? undefined,
            likeCount: data.digg_count ?? undefined,
            originalUrl: url.toString(),
          };
        }
      } catch {
        // Fall back below
      }
    }

    // Try TikWM Direct API
    try {
      const tikwmData = await this.fetchTikWM(url);
      if (tikwmData) {
        return {
          platform: "tiktok",
          contentType: "video",
          title: tikwmData.title ?? "TikTok Video",
          thumbnail: tikwmData.cover ?? undefined,
          duration: tikwmData.duration ?? undefined,
          author: tikwmData.author?.nickname ?? tikwmData.author?.unique_id ?? "TikTok User",
          authorHandle: tikwmData.author?.unique_id ?? undefined,
          originalUrl: url.toString(),
        };
      }
    } catch {
      // Fall back below
    }

    return this.fallbackMetadata(url);
  }

  async getAvailableDownloads(url: URL): Promise<DownloadOption[]> {
    if (RAPIDAPI_KEY) {
      try {
        const data = await this.fetchData(url);
        if (data) {
          const downloads: DownloadOption[] = [];

          if (data.wmplay || data.play) {
            downloads.push({
              id: "tiktok-nowm",
              label: "Video (No Watermark MP4)",
              format: "mp4",
              quality: "HD",
              fileSize: data.size ?? undefined,
              downloadUrl: data.wmplay ?? data.play,
              note: "No watermark",
            });
          }

          if (data.hdplay) {
            downloads.push({
              id: "tiktok-hd",
              label: "Video (Full HD MP4)",
              format: "mp4",
              quality: "1080p",
              fileSize: data.hd_size ?? undefined,
              downloadUrl: data.hdplay,
            });
          }

          if (data.music) {
            downloads.push({
              id: "tiktok-music",
              label: "Audio Track (MP3)",
              format: "mp3",
              isAudioOnly: true,
              downloadUrl: data.music,
            });
          }

          if (downloads.length > 0) return downloads;
        }
      } catch {
        // Fall back below
      }
    }

    // Try TikWM Direct API
    try {
      const tikwmData = await this.fetchTikWM(url);
      if (tikwmData) {
        const downloads: DownloadOption[] = [];

        if (tikwmData.play) {
          downloads.push({
            id: "tiktok-tikwm-nowm",
            label: "Video (No Watermark MP4)",
            format: "mp4",
            quality: "HD",
            fileSize: tikwmData.size ?? undefined,
            downloadUrl: tikwmData.play,
            note: "No watermark",
          });
        }

        if (tikwmData.hdplay) {
          downloads.push({
            id: "tiktok-tikwm-hd",
            label: "Video (Full HD MP4)",
            format: "mp4",
            quality: "1080p",
            fileSize: tikwmData.hd_size ?? undefined,
            downloadUrl: tikwmData.hdplay,
          });
        }

        if (tikwmData.music) {
          downloads.push({
            id: "tiktok-tikwm-audio",
            label: "Audio Track (MP3)",
            format: "mp3",
            isAudioOnly: true,
            downloadUrl: tikwmData.music,
          });
        }

        if (downloads.length > 0) return downloads;
      }
    } catch {
      // Fall back below
    }

    return this.fallbackDownloads(url);
  }

  private async fetchTikWM(url: URL): Promise<TikTokApiResponse | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url.toString())}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    if (json.code === 0 && json.data) {
      return json.data as TikTokApiResponse;
    }
    return null;
  }

  private async fetchData(url: URL): Promise<TikTokApiResponse> {
    const apiUrl = `https://${RAPIDAPI_HOST}/analysis?url=${encodeURIComponent(
      url.toString()
    )}&hd=1`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("API Error");
    const json = await res.json();
    if (json.code !== 0 || !json.data) throw new Error("Video invalid");
    return json.data as TikTokApiResponse;
  }

  private async fallbackMetadata(url: URL): Promise<VideoMetadata> {
    try {
      const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url.toString())}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const json = await res.json();
        return {
          platform: "tiktok",
          contentType: "video",
          title: json.title ?? "TikTok Video",
          thumbnail: json.thumbnail_url,
          author: json.author_name ?? "TikTok Creator",
          originalUrl: url.toString(),
        };
      }
    } catch {
      // Ignore
    }

    return {
      platform: "tiktok",
      contentType: "video",
      title: "TikTok Video",
      author: "TikTok Creator",
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(url: URL): DownloadOption[] {
    return [
      {
        id: "tt-fb-nowm",
        label: "Video (No Watermark MP4)",
        format: "mp4",
        quality: "HD",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "tt-fb-hd",
        label: "Video (Full HD MP4)",
        format: "mp4",
        quality: "1080p",
        downloadUrl: url.toString(),
        needsExtraction: true,
      },
      {
        id: "tt-fb-audio",
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

interface TikTokApiResponse {
  title?: string;
  cover?: string;
  origin_cover?: string;
  thumbnail?: string;
  duration?: number;
  play?: string;
  wmplay?: string;
  hdplay?: string;
  music?: string;
  size?: number;
  hd_size?: number;
  play_count?: number;
  digg_count?: number;
  author?: {
    nickname?: string;
    unique_id?: string;
  };
}
