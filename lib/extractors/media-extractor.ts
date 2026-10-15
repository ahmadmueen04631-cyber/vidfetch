// ============================================================
// VidFetch — Multi-Platform Direct Media Extractor
// High-Reliability Resolution: Direct CDNs + Invidious + TikWM + Python Fallback
// ============================================================

import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

export interface ResolvedMediaStream {
  url?: string;
  filePath?: string;
  filename?: string;
  contentType?: string;
  format?: string;
  quality?: string;
}

/**
 * Checks whether a URL is already a direct media stream or CDN endpoint
 */
export function isDirectMediaStreamUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== "string") return false;
  try {
    const u = new URL(rawUrl);
    const pathname = u.pathname.toLowerCase();

    // Direct file extensions
    if (
      pathname.endsWith(".mp4") ||
      pathname.endsWith(".mp3") ||
      pathname.endsWith(".m4a") ||
      pathname.endsWith(".webm") ||
      pathname.endsWith(".mov")
    ) {
      return true;
    }

    // Media streaming CDNs & Render stream workers
    const host = u.hostname.toLowerCase();
    if (
      host.includes("googlevideo.com") ||
      host.includes("cdninstagram.com") ||
      host.includes("twimg.com") ||
      host.includes("tikwm.com") ||
      host.includes("tiktokcdn") ||
      host.includes("fbcdn.net") ||
      host.includes("redd.it") ||
      host.includes("pinimg.com") ||
      host.includes("onrender.com") ||
      pathname.includes("/videoplayback") ||
      pathname.includes("/stream")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Parses requested quality string into a target pixel height (e.g. 1080, 720, 480, 360)
 */
function parseTargetHeight(quality?: string): number {
  if (!quality) return 1080;
  const match = quality.match(/(\d{3,4})/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > 0 && num <= 4320) return num;
  }
  if (quality.toLowerCase().includes("hd") || quality.toLowerCase().includes("best")) return 1080;
  if (quality.toLowerCase().includes("sd")) return 480;
  return 1080;
}

/**
 * Cached python command check to avoid repeated failing child_process spawns
 */
let cachedPythonBin: string | null | undefined = undefined;

async function getAvailablePython(): Promise<string | null> {
  if (cachedPythonBin !== undefined) return cachedPythonBin;

  const candidates = process.platform === "win32" ? ["py", "python", "python3"] : ["python3", "python"];

  for (const cmd of candidates) {
    const exists = await new Promise<boolean>((resolve) => {
      execFile(/*turbopackIgnore: true*/ cmd, ["--version"], { timeout: 2000 }, (err) => {
        resolve(!err);
      });
    });
    if (exists) {
      cachedPythonBin = cmd;
      return cmd;
    }
  }

  cachedPythonBin = null;
  return null;
}

import ytdl from "@distube/ytdl-core";

/**
 * Resolves a 100% direct binary media stream or file path matching exact requested quality
 */
export async function resolveBinaryMediaStream(
  webUrl: string,
  preferredFormat: string = "mp4",
  requestedQuality?: string
): Promise<ResolvedMediaStream | null> {
  // 0. If it's already a direct CDN / media URL, return immediately
  if (isDirectMediaStreamUrl(webUrl)) {
    return {
      url: webUrl,
      contentType: preferredFormat === "mp3" ? "audio/mpeg" : "video/mp4",
      format: preferredFormat,
      quality: requestedQuality ?? "HD",
    };
  }

  const targetHeight = parseTargetHeight(requestedQuality);

  // 1. External free extractor worker (Render, Hugging Face, VPS, or self-hosted)
  const workerUrl = process.env.EXTRACTOR_SERVICE_URL || process.env.YTDLP_WORKER_URL;
  if (workerUrl) {
    const workerStream = await extractViaRemoteWorker(workerUrl, webUrl, preferredFormat, targetHeight);
    if (workerStream) return workerStream;
  }

  // 2. TikTok URL -> TikWM API (Free direct CDN)
  if (webUrl.includes("tiktok.com") || webUrl.includes("vt.tiktok.com")) {
    const tikTokStream = await extractTikTokStream(webUrl);
    if (tikTokStream) return tikTokStream;
  }

  // 3. YouTube URL -> Native ytdl-core -> Invidious Cluster
  if (webUrl.includes("youtube.com") || webUrl.includes("youtu.be")) {
    const directYt = await extractYouTubeNative(webUrl, preferredFormat, targetHeight);
    if (directYt) return directYt;

    const ytStream = await extractYouTubeInvidious(webUrl, preferredFormat, targetHeight);
    if (ytStream) return ytStream;
  }

  // 4. Local Python / yt-dlp fallback (only if python is installed on host)
  const pythonCmd = await getAvailablePython();
  if (pythonCmd) {
    const ytdlStream = await extractViaYtDlp(pythonCmd, webUrl, preferredFormat, targetHeight);
    if (ytdlStream) return ytdlStream;
  }

  return null;
}

/**
 * Extract YouTube direct media stream via native @distube/ytdl-core
 */
async function extractYouTubeNative(
  url: string,
  preferredFormat: string,
  targetHeight: number
): Promise<ResolvedMediaStream | null> {
  try {
    const infoPromise = ytdl.getInfo(url);
    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 6000)
    );
    const info = (await Promise.race([infoPromise, timeoutPromise])) as ytdl.videoInfo | null;
    if (!info) return null;

    if (preferredFormat === "mp3") {
      const audioFormat = ytdl.chooseFormat(info.formats, {
        quality: "highestaudio",
        filter: "audioonly",
      });
      if (audioFormat?.url) {
        return {
          url: audioFormat.url,
          contentType: "audio/mpeg",
          format: "mp3",
          quality: "Audio",
        };
      }
    }

    const videoFormats = ytdl.filterFormats(info.formats, "videoandaudio");
    if (videoFormats.length > 0) {
      videoFormats.sort((a, b) => {
        const ha = a.height ?? 0;
        const hb = b.height ?? 0;
        return Math.abs(ha - targetHeight) - Math.abs(hb - targetHeight);
      });
      const chosen = videoFormats[0];
      if (chosen?.url) {
        return {
          url: chosen.url,
          contentType: "video/mp4",
          format: "mp4",
          quality: chosen.qualityLabel ?? `${chosen.height ?? targetHeight}p`,
        };
      }
    }
  } catch {
    // Graceful fallback to Invidious
  }
  return null;
}

/**
 * TikTok Direct No-Watermark Stream Extractor via TikWM
 */
async function extractTikTokStream(url: string): Promise<ResolvedMediaStream | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`,
      { signal: controller.signal, next: { revalidate: 60 } }
    );
    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      if (json.code === 0 && json.data?.play) {
        return {
          url: json.data.play,
          contentType: "video/mp4",
          format: "mp4",
          quality: "HD",
        };
      }
    }
  } catch {
    // Non-blocking fallback
  }
  return null;
}

/**
 * Extract YouTube direct media stream via Invidious public cluster
 */
async function extractYouTubeInvidious(
  url: string,
  preferredFormat: string,
  targetHeight: number
): Promise<ResolvedMediaStream | null> {
  let videoId: string | null = null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.replace(/^\//, "").split("/")[0] || null;
    } else {
      videoId = u.searchParams.get("v") || u.pathname.split("/shorts/")[1]?.split("/")[0] || null;
    }
  } catch {
    return null;
  }

  if (!videoId) return null;

  const nodes = [
    `https://inv.nadeko.net/api/v1/videos/${videoId}`,
    `https://invidious.nerdvpn.de/api/v1/videos/${videoId}`,
    `https://inv.tux.pizza/api/v1/videos/${videoId}`,
    `https://yewtu.be/api/v1/videos/${videoId}`,
  ];

  for (const node of nodes) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(node, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      });
      clearTimeout(timer);

      if (res.ok) {
        const json = await res.json();

        // Audio stream requested
        if (preferredFormat === "mp3") {
          const audioStreams = json.adaptiveFormats?.filter((f: { type?: string; url?: string }) =>
            f.type?.includes("audio") && f.url
          );
          if (audioStreams && audioStreams.length > 0) {
            const bestAudio = audioStreams[0];
            return {
              url: bestAudio.url,
              contentType: "audio/mpeg",
              format: "mp3",
              quality: "Audio",
            };
          }
        }

        // Video format streams (muxed audio+video)
        const formatStreams: Array<{ qualityLabel?: string; url: string; container?: string; height?: number }> =
          json.formatStreams ?? [];

        if (formatStreams.length > 0) {
          // Find stream closest to requested height
          const mp4Streams = formatStreams.filter((f) => f.url && f.container === "mp4");
          if (mp4Streams.length > 0) {
            // Sort by height descending
            mp4Streams.sort((a, b) => {
              const ha = parseInt(a.qualityLabel ?? "0", 10) || (a.height ?? 0);
              const hb = parseInt(b.qualityLabel ?? "0", 10) || (b.height ?? 0);
              return Math.abs(ha - targetHeight) - Math.abs(hb - targetHeight);
            });

            const chosen = mp4Streams[0];
            return {
              url: chosen.url,
              contentType: "video/mp4",
              format: "mp4",
              quality: chosen.qualityLabel ?? `${targetHeight}p`,
            };
          }
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Universal Stream & Muxing Extractor via yt-dlp + ffmpeg
 */
async function extractViaYtDlp(
  pythonCmd: string,
  url: string,
  preferredFormat: string,
  targetHeight: number
): Promise<ResolvedMediaStream | null> {
  const urlHash = crypto
    .createHash("md5")
    .update(`${url}_${preferredFormat}_${targetHeight}`)
    .digest("hex")
    .slice(0, 12);
  const cacheFile = path.join(os.tmpdir(), `vidfetch-${urlHash}-${targetHeight}p.${preferredFormat}`);

  if (fs.existsSync(/*turbopackIgnore: true*/ cacheFile) && fs.statSync(cacheFile).size > 10000) {
    return {
      filePath: cacheFile,
      contentType: preferredFormat === "mp3" ? "audio/mpeg" : "video/mp4",
      format: preferredFormat,
      quality: `${targetHeight}p`,
    };
  }

  return new Promise((resolve) => {
    const args: string[] = ["-m", "yt_dlp", "--dump-single-json", "--no-warnings"];

    if (preferredFormat === "mp3") {
      args.push("-f", "bestaudio/best");
    } else {
      args.push("-f", `bestvideo[height<=${targetHeight}]+bestaudio/best[height<=${targetHeight}]/best`);
    }

    args.push(url);

    execFile(
      /*turbopackIgnore: true*/ pythonCmd,
      args,
      { timeout: 12000, maxBuffer: 15 * 1024 * 1024 },
      (jsonErr, stdout) => {
        if (jsonErr || !stdout) return resolve(null);
        try {
          const json = JSON.parse(stdout);
          if (json.url) {
            return resolve({
              url: json.url,
              contentType: preferredFormat === "mp3" ? "audio/mpeg" : "video/mp4",
              format: preferredFormat,
              quality: `${targetHeight}p`,
            });
          }
          return resolve(null);
        } catch {
          return resolve(null);
        }
      }
    );
  });
}

/**
 * Extract media stream via a free self-hosted yt-dlp microservice (Render, Hugging Face, VPS)
 */
async function extractViaRemoteWorker(
  workerBaseUrl: string,
  url: string,
  format: string,
  targetHeight: number
): Promise<ResolvedMediaStream | null> {
  try {
    const cleanBase = workerBaseUrl.replace(/\/+$/, "");
    const targetUrl = new URL(`${cleanBase}/extract`);
    targetUrl.searchParams.set("url", url);
    targetUrl.searchParams.set("format", format);
    targetUrl.searchParams.set("height", String(targetHeight));

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data?.url) {
        return {
          url: data.url,
          format: data.format ?? format,
          quality: data.quality ?? `${targetHeight}p`,
          contentType: format === "mp3" ? "audio/mpeg" : "video/mp4",
        };
      }
    }
  } catch (err) {
    console.warn("[Remote Worker Error]:", err);
  }
  return null;
}
