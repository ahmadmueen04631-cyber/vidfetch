// ============================================================
// ClipDown — YouTube Provider (Resilient RapidAPI + Invidious + OEmbed Fallback)
// ============================================================

import type {
  VideoProvider,
  VideoMetadata,
  DownloadOption,
  Platform,
} from "@/lib/types";
import { extractVideoId } from "@/lib/platforms/detect-platform";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST =
  process.env.YOUTUBE_RAPIDAPI_HOST ??
  "youtube-media-downloader.p.rapidapi.com";

export class YouTubeProvider implements VideoProvider {
  platform: Platform = "youtube";

  canHandle(url: URL): boolean {
    return (
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com" ||
      url.hostname === "youtu.be" ||
      url.hostname === "music.youtube.com"
    );
  }

  private getVideoId(url: URL): string {
    const id = extractVideoId(url.toString(), "youtube");
    return id ?? "dQw4w9WgXcQ";
  }

  async getMetadata(url: URL): Promise<VideoMetadata> {
    const videoId = this.getVideoId(url);

    if (RAPIDAPI_KEY) {
      try {
        const data = await this.fetchVideoDetails(videoId);
        if (data && data.videos?.items?.[0]) {
          const item = data.videos.items[0];
          const thumbs = item.thumbnails ?? [];
          const bestThumb =
            thumbs.sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0]?.url ??
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

          return {
            platform: "youtube",
            contentType: url.pathname.includes("/shorts/") ? "short" : "video",
            title: item.title ?? `YouTube Video (${videoId})`,
            thumbnail: bestThumb,
            duration: item.lengthSeconds
              ? parseInt(String(item.lengthSeconds))
              : undefined,
            author: item.author?.title ?? undefined,
            authorHandle: item.author?.canonicalBaseUrl?.replace("/", "") ?? undefined,
            viewCount: item.viewCount ? parseInt(String(item.viewCount)) : undefined,
            originalUrl: url.toString(),
          };
        }
      } catch {
        // Fall through
      }
    }

    return this.fallbackOEmbed(url, videoId);
  }

  async getAvailableDownloads(url: URL): Promise<DownloadOption[]> {
    const videoId = this.getVideoId(url);

    if (RAPIDAPI_KEY) {
      try {
        const data = await this.fetchVideoDetails(videoId);
        if (data && data.videos?.items?.[0]?.streamingData) {
          const downloads: DownloadOption[] = [];
          const formats: YTFormat[] = data.videos.items[0].streamingData.formats ?? [];
          const adaptiveFormats: YTFormat[] =
            data.videos.items[0].streamingData.adaptiveFormats ?? [];

          const videoFormats = [...formats, ...adaptiveFormats]
            .filter(
              (f) =>
                f.mimeType?.startsWith("video/mp4") &&
                f.qualityLabel &&
                f.url
            )
            .sort((a, b) => {
              const qa = parseInt(a.qualityLabel ?? "0");
              const qb = parseInt(b.qualityLabel ?? "0");
              return qb - qa;
            });

          const seen = new Set<string>();
          for (const fmt of videoFormats) {
            const key = fmt.qualityLabel ?? "unknown";
            if (seen.has(key)) continue;
            seen.add(key);

            downloads.push({
              id: `yt-${fmt.itag ?? key}`,
              label: `MP4 ${fmt.qualityLabel}`,
              format: "mp4",
              quality: fmt.qualityLabel ?? undefined,
              width: fmt.width ?? undefined,
              height: fmt.height ?? undefined,
              fileSize: fmt.contentLength ? parseInt(String(fmt.contentLength)) : undefined,
              bitrate: fmt.bitrate ?? undefined,
              downloadUrl: fmt.url,
            });

            if (downloads.length >= 4) break;
          }

          const audioFmt = [...formats, ...adaptiveFormats].find(
            (f) =>
              (f.mimeType?.includes("audio/mp4") ||
                f.mimeType?.includes("audio/webm")) &&
              f.url
          );

          if (audioFmt) {
            downloads.push({
              id: `yt-audio-${audioFmt.itag ?? "audio"}`,
              label: "Audio Only (MP3)",
              format: "mp3",
              isAudioOnly: true,
              bitrate: audioFmt.bitrate ?? undefined,
              downloadUrl: audioFmt.url,
            });
          }

          if (downloads.length > 0) return downloads;
        }
      } catch {
        // Fall back below
      }
    }

    // Try resolving streams via Invidious cluster
    const invidiousStreams = await this.fetchInvidiousStreams(videoId);
    if (invidiousStreams && invidiousStreams.length > 0) {
      return invidiousStreams;
    }

    return this.fallbackDownloads(videoId);
  }

  private async fetchVideoDetails(videoId: string): Promise<YTApiResponse> {
    const apiUrl = `https://${RAPIDAPI_HOST}/v2/video/details?videoId=${videoId}&includeStreamingData=true`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("API error");
    return await res.json();
  }

  private async fetchInvidiousStreams(videoId: string): Promise<DownloadOption[] | null> {
    const nodes = [
      `https://inv.nadeko.net/api/v1/videos/${videoId}`,
      `https://invidious.nerdvpn.de/api/v1/videos/${videoId}`,
      `https://inv.tux.pizza/api/v1/videos/${videoId}`,
      `https://yewtu.be/api/v1/videos/${videoId}`,
    ];

    for (const node of nodes) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(node, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 },
        });
        clearTimeout(timer);

        if (res.ok) {
          const json = await res.json();
          const formatStreams = json.formatStreams ?? [];
          const downloads: DownloadOption[] = [];

          formatStreams.forEach(
            (fmt: { qualityLabel?: string; url: string; container?: string; height?: number }, idx: number) => {
              if (fmt.url && fmt.container === "mp4") {
                downloads.push({
                  id: `yt-inv-${idx}`,
                  label: `MP4 ${fmt.qualityLabel ?? (fmt.height ? `${fmt.height}p` : "HD")}`,
                  format: "mp4",
                  quality: fmt.qualityLabel ?? (fmt.height ? `${fmt.height}p` : "720p"),
                  downloadUrl: fmt.url,
                });
              }
            }
          );

          // Audio track
          const audioStream = json.adaptiveFormats?.find(
            (f: { type?: string; url?: string }) => f.type?.includes("audio") && f.url
          );
          if (audioStream) {
            downloads.push({
              id: "yt-inv-audio",
              label: "Audio Track (MP3)",
              format: "mp3",
              isAudioOnly: true,
              downloadUrl: audioStream.url,
            });
          }

          if (downloads.length > 0) return downloads;
        }
      } catch {
        continue;
      }
    }
    return null;
  }

  private async fallbackOEmbed(url: URL, videoId: string): Promise<VideoMetadata> {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`
      )}&format=json`;

      const res = await fetch(oembedUrl);
      if (res.ok) {
        const json = await res.json();
        return {
          platform: "youtube",
          contentType: url.pathname.includes("/shorts/") ? "short" : "video",
          title: json.title ?? `YouTube Video (${videoId})`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          author: json.author_name ?? "YouTube Channel",
          originalUrl: url.toString(),
        };
      }
    } catch {
      // Ignore
    }

    return {
      platform: "youtube",
      contentType: url.pathname.includes("/shorts/") ? "short" : "video",
      title: `YouTube Video (${videoId})`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      originalUrl: url.toString(),
    };
  }

  private fallbackDownloads(videoId: string): DownloadOption[] {
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return [
      {
        id: `yt-fb-1080p`,
        label: "MP4 1080p Full HD",
        format: "mp4",
        quality: "1080p",
        downloadUrl: watchUrl,
        needsExtraction: true,
      },
      {
        id: `yt-fb-720p`,
        label: "MP4 720p HD",
        format: "mp4",
        quality: "720p",
        downloadUrl: watchUrl,
        needsExtraction: true,
      },
      {
        id: `yt-fb-480p`,
        label: "MP4 480p SD",
        format: "mp4",
        quality: "480p",
        downloadUrl: watchUrl,
        needsExtraction: true,
      },
      {
        id: `yt-fb-mp3`,
        label: "Audio Only (MP3)",
        format: "mp3",
        quality: "Audio",
        isAudioOnly: true,
        downloadUrl: watchUrl,
        needsExtraction: true,
      },
    ];
  }
}

interface YTFormat {
  itag?: number;
  mimeType?: string;
  quality?: string;
  qualityLabel?: string;
  width?: number;
  height?: number;
  url?: string;
  contentLength?: string | number;
  bitrate?: number;
}

interface YTApiResponse {
  status?: string | boolean;
  videos?: {
    items?: Array<{
      title?: string;
      lengthSeconds?: string | number;
      viewCount?: string | number;
      thumbnails?: Array<{ url: string; width?: number; height?: number }>;
      author?: {
        title?: string;
        canonicalBaseUrl?: string;
      };
      streamingData?: {
        formats?: YTFormat[];
        adaptiveFormats?: YTFormat[];
      };
    }>;
  };
}
