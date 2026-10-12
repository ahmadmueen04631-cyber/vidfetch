// ============================================================
// ClipDown — API Route: POST /api/process
// Accepts a video URL, returns metadata + download options
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { detectAndValidate, normalizeUrl } from "@/lib/platforms/detect-platform";
import { getProvider } from "@/lib/providers/registry";
import { errorToResponse } from "@/lib/errors";
import type { ApiResponse, VideoMetadata, DownloadOption, Platform } from "@/lib/types";

// ── Rate limiting (simple in-memory — use Redis in prod) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX ?? "10");
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000");

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── URL Validation ─────────────────────────────────────────
const MAX_URL_LENGTH = 2048;

function sanitizeUrl(raw: string): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed.length > MAX_URL_LENGTH) return null;
  // Must start with http/https
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

// ── Fetch from Free Worker (yt-dlp microservice) ───────────
async function fetchFromWorker(
  rawUrl: string,
  platform: Platform
): Promise<{ metadata: VideoMetadata; downloads: DownloadOption[] } | null> {
  const workerBase = process.env.EXTRACTOR_SERVICE_URL || process.env.YTDLP_WORKER_URL;
  if (!workerBase) return null;

  try {
    const cleanBase = workerBase.replace(/\/+$/, "");
    const target = new URL(`${cleanBase}/info`);
    target.searchParams.set("url", rawUrl);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(target.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });
    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      if (json?.metadata && json?.downloads) {
        return {
          metadata: {
            ...json.metadata,
            platform,
          },
          downloads: json.downloads,
        };
      }
    }
  } catch (err) {
    console.warn("[Worker Process Error]:", err);
  }
  return null;
}

// ── Handler ────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Rate limit check
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message:
            "Too many requests. Please wait a moment and try again.",
        },
      } satisfies ApiResponse<never>,
      { status: 429 }
    );
  }

  // Parse body
  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_URL",
          message: "Invalid request body.",
        },
      } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  // Validate URL input — never trust client
  const rawUrl = typeof body.url === "string" ? body.url : null;
  const sanitized = rawUrl ? sanitizeUrl(rawUrl) : null;

  if (!sanitized) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_URL",
          message:
            "Please enter a valid Instagram, TikTok, or YouTube URL.",
        },
      } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  // Platform detection + validation (server-side)
  const detection = detectAndValidate(sanitized);
  if (!detection.isValid) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code:
            detection.platform === "unknown"
              ? "UNSUPPORTED_PLATFORM"
              : "INVALID_URL",
          message:
            detection.error ??
            "Please enter a valid Instagram, TikTok, or YouTube URL.",
        },
      } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  // Get provider
  const normalized = normalizeUrl(sanitized);
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalized);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_URL", message: "Invalid URL format." },
      } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  const provider = getProvider(parsedUrl);
  if (!provider) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNSUPPORTED_PLATFORM",
          message:
            "This platform isn't supported yet. We support Instagram, TikTok, and YouTube.",
        },
      } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  // Fetch metadata + downloads (Worker first if configured, else provider)
  try {
    const workerResult = await fetchFromWorker(sanitized, detection.platform);
    if (workerResult && workerResult.downloads.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: workerResult,
        } satisfies ApiResponse<{
          metadata: VideoMetadata;
          downloads: DownloadOption[];
        }>,
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    const [metadata, downloads] = await Promise.all([
      provider.getMetadata(parsedUrl),
      provider.getAvailableDownloads(parsedUrl),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: { metadata, downloads },
      } satisfies ApiResponse<{
        metadata: VideoMetadata;
        downloads: DownloadOption[];
      }>,
      {
        status: 200,
        headers: {
          // Never cache API responses
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err) {
    const errorPayload = errorToResponse(err);
    const status =
      errorPayload.code === "RATE_LIMITED"
        ? 429
        : errorPayload.code === "PROVIDER_NOT_CONFIGURED"
        ? 503
        : errorPayload.code === "CONTENT_UNAVAILABLE" ||
          errorPayload.code === "PRIVATE_CONTENT"
        ? 422
        : 500;

    return NextResponse.json(
      {
        success: false,
        error: errorPayload,
      } satisfies ApiResponse<never>,
      { status }
    );
  }
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
