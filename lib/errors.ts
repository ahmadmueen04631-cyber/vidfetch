// ============================================================
// ClipDown — Custom Error Classes
// ============================================================

import type { ErrorCode } from "@/lib/types";

export class ClipDownError extends Error {
  public readonly code: ErrorCode;
  public readonly userMessage: string;

  constructor(code: ErrorCode, userMessage: string, message?: string) {
    super(message ?? userMessage);
    this.name = "ClipDownError";
    this.code = code;
    this.userMessage = userMessage;
  }
}

export class InvalidUrlError extends ClipDownError {
  constructor(detail?: string) {
    super(
      "INVALID_URL",
      detail ?? "Please enter a valid Instagram, TikTok, or YouTube URL."
    );
    this.name = "InvalidUrlError";
  }
}

export class UnsupportedPlatformError extends ClipDownError {
  constructor() {
    super(
      "UNSUPPORTED_PLATFORM",
      "This platform isn't supported yet. We currently support Instagram, TikTok, and YouTube."
    );
    this.name = "UnsupportedPlatformError";
  }
}

export class PrivateContentError extends ClipDownError {
  constructor() {
    super(
      "PRIVATE_CONTENT",
      "This content appears to be private. This tool only supports publicly accessible videos."
    );
    this.name = "PrivateContentError";
  }
}

export class VideoUnavailableError extends ClipDownError {
  constructor() {
    super(
      "CONTENT_UNAVAILABLE",
      "This video could not be processed. It may have been removed, made private, or is otherwise unavailable."
    );
    this.name = "VideoUnavailableError";
  }
}

export class ProviderUnavailableError extends ClipDownError {
  constructor() {
    super(
      "PROVIDER_UNAVAILABLE",
      "The download service is temporarily unavailable. Please try again in a moment."
    );
    this.name = "ProviderUnavailableError";
  }
}

export class ProviderNotConfiguredError extends ClipDownError {
  constructor(platform?: string) {
    super(
      "PROVIDER_NOT_CONFIGURED",
      platform
        ? `The ${platform} provider is not configured. Please set up the required environment variables.`
        : "A required service provider is not configured. Please check the server configuration."
    );
    this.name = "ProviderNotConfiguredError";
  }
}

export class RateLimitError extends ClipDownError {
  constructor() {
    super(
      "RATE_LIMITED",
      "You've made too many requests. Please wait a moment before trying again."
    );
    this.name = "RateLimitError";
  }
}

export class NetworkError extends ClipDownError {
  constructor() {
    super(
      "NETWORK_ERROR",
      "A network error occurred. Please check your connection and try again."
    );
    this.name = "NetworkError";
  }
}

// ── Error to API Response ──────────────────────────────────
export function errorToResponse(error: unknown): {
  code: ErrorCode;
  message: string;
} {
  if (error instanceof ClipDownError) {
    return { code: error.code, message: error.userMessage };
  }

  if (error instanceof Error) {
    // Don't expose implementation details
    console.error("[ClipDown] Unhandled error:", error);
    return {
      code: "UNKNOWN_ERROR",
      message: "An unexpected error occurred. Please try again.",
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred. Please try again.",
  };
}

// ── User-Friendly Error Messages ───────────────────────────
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  INVALID_URL:
    "Please enter a valid Instagram, TikTok, or YouTube URL.",
  UNSUPPORTED_PLATFORM:
    "This platform isn't supported yet. We support Instagram, TikTok, and YouTube.",
  PRIVATE_CONTENT:
    "This tool only supports publicly accessible content.",
  CONTENT_UNAVAILABLE:
    "This video could not be processed. It may be unavailable or unsupported.",
  PROVIDER_UNAVAILABLE:
    "The download service is temporarily unavailable. Please try again later.",
  PROVIDER_NOT_CONFIGURED:
    "This service isn't configured yet. Please check back soon.",
  RATE_LIMITED:
    "Too many requests. Please wait a moment and try again.",
  NETWORK_ERROR:
    "A network error occurred. Please check your connection.",
  UNKNOWN_ERROR:
    "An unexpected error occurred. Please try again.",
};
