// ============================================================
// ClipDown — API Route: GET /api/download
// High-performance binary media download proxy
// Real-time byte streaming with Content-Length header for progress tracking
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { resolveBinaryMediaStream, isDirectMediaStreamUrl } from "@/lib/extractors/media-extractor";
import fs from "fs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");
  const filename = searchParams.get("filename") ?? "clipdown-video.mp4";
  const format = searchParams.get("format") ?? "mp4";
  const quality = searchParams.get("quality") ?? "1080p";

  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    // 0. If rawUrl is already a direct media stream URL, stream it directly
    if (isDirectMediaStreamUrl(rawUrl)) {
      const directRes = await fetch(rawUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
        },
      });

      if (directRes.ok && directRes.body) {
        return createAttachmentResponse(directRes, filename, format);
      }
    }

    // 1. Resolve through multi-tier extractor
    const resolvedStream = await resolveBinaryMediaStream(rawUrl, format, quality);

    // 2. If resolved as a local merged file (contains video + audio track merged)
    if (resolvedStream?.filePath && fs.existsSync(/*turbopackIgnore: true*/ resolvedStream.filePath)) {
      const stats = fs.statSync(resolvedStream.filePath);
      const nodeStream = fs.createReadStream(resolvedStream.filePath);

      const webStream = new ReadableStream({
        start(controller) {
          nodeStream.on("data", (chunk) => controller.enqueue(chunk));
          nodeStream.on("end", () => controller.close());
          nodeStream.on("error", (err) => controller.error(err));
        },
      });

      const headers = new Headers();
      headers.set("Content-Type", format === "mp3" ? "audio/mpeg" : "video/mp4");
      headers.set(
        "Content-Disposition",
        `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
      );
      headers.set("Content-Length", String(stats.size));
      headers.set("Accept-Ranges", "bytes");
      headers.set("Cache-Control", "no-cache");
      headers.set("Access-Control-Expose-Headers", "Content-Length, Content-Disposition, Content-Type");

      return new NextResponse(webStream, { status: 200, headers });
    }

    // 3. If resolved as a direct URL
    if (resolvedStream?.url) {
      const mediaRes = await fetch(resolvedStream.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
        },
      });

      if (mediaRes.ok && mediaRes.body) {
        return createAttachmentResponse(mediaRes, filename, format);
      }
    }

    return NextResponse.json(
      {
        error:
          "Video extraction failed. This usually means the download service API key is not configured or has expired. The site owner needs to subscribe to a video extraction API (e.g., on RapidAPI) or set up yt-dlp on the server.",
        code: "EXTRACTION_UNAVAILABLE",
      },
      { status: 502 }
    );
  } catch (err) {
    console.error("[Download Proxy Error]:", err);
    return NextResponse.json(
      { error: "Unable to complete media download. Please try another quality option or retry in a moment." },
      { status: 500 }
    );
  }
}

// ── Create Binary Attachment Response ─────────────────────
function createAttachmentResponse(
  mediaRes: Response,
  filename: string,
  format: string
): NextResponse {
  const serverContentType = (mediaRes.headers.get("content-type") ?? "").toLowerCase();
  const finalContentType =
    format === "mp3"
      ? "audio/mpeg"
      : serverContentType.includes("video") || serverContentType.includes("octet-stream")
      ? serverContentType
      : "video/mp4";

  const headers = new Headers();
  headers.set("Content-Type", finalContentType);
  headers.set(
    "Content-Disposition",
    `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
  );
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "no-cache");
  headers.set("Access-Control-Expose-Headers", "Content-Length, Content-Disposition, Content-Type");

  const contentLength = mediaRes.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 0) {
    headers.set("Content-Length", contentLength);
  }

  return new NextResponse(mediaRes.body as ReadableStream, {
    status: 200,
    headers,
  });
}
