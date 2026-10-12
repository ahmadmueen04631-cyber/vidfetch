// ============================================================
// ClipDown — Core Types
// ============================================================

export type Platform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "facebook"
  | "pinterest"
  | "reddit"
  | "unknown";

export type ContentType =
  | "video"
  | "reel"
  | "short"
  | "story"
  | "post"
  | "unknown";

// ── Video Metadata ─────────────────────────────────────────
export interface VideoMetadata {
  platform: Platform;
  contentType: ContentType;
  title?: string;
  thumbnail?: string;
  duration?: number; // seconds
  author?: string;
  authorHandle?: string;
  viewCount?: number;
  likeCount?: number;
  originalUrl: string;
  publishedAt?: string;
}

// ── Download Option ────────────────────────────────────────
export interface DownloadOption {
  id: string;
  label: string;
  format: "mp4" | "mp3" | "webm" | "mov";
  quality?: string; // "1080p", "720p", "480p", "360p", "audio"
  width?: number;
  height?: number;
  fileSize?: number; // bytes
  bitrate?: number; // kbps
  downloadUrl?: string;
  isAudioOnly?: boolean;
  note?: string;
  /** When true, downloadUrl is a webpage URL that requires server-side extraction */
  needsExtraction?: boolean;
}

// ── Provider Interface ─────────────────────────────────────
export interface VideoProvider {
  platform: Platform;
  canHandle(url: URL): boolean;
  getMetadata(url: URL): Promise<VideoMetadata>;
  getAvailableDownloads(url: URL): Promise<DownloadOption[]>;
}

// ── URL Detection Result ───────────────────────────────────
export interface DetectionResult {
  platform: Platform;
  contentType: ContentType;
  isValid: boolean;
  normalizedUrl?: string;
  videoId?: string;
  error?: string;
}

// ── Tool Definition ────────────────────────────────────────
export interface ToolDefinition {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  platform?: Platform;
  contentType?: ContentType;
  keywords: string[];
  features: string[];
  supportedUrlPatterns: string[];
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// ── API Response Types ─────────────────────────────────────
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ── Error Codes ────────────────────────────────────────────
export type ErrorCode =
  | "INVALID_URL"
  | "UNSUPPORTED_PLATFORM"
  | "PRIVATE_CONTENT"
  | "CONTENT_UNAVAILABLE"
  | "PROVIDER_UNAVAILABLE"
  | "RATE_LIMITED"
  | "PROVIDER_NOT_CONFIGURED"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

// ── Downloader State ───────────────────────────────────────
export type DownloaderStatus =
  | "idle"
  | "detecting"
  | "fetching"
  | "ready"
  | "error";

export interface DownloaderState {
  status: DownloaderStatus;
  url: string;
  detectionResult?: DetectionResult;
  metadata?: VideoMetadata;
  downloads?: DownloadOption[];
  error?: {
    code: ErrorCode;
    message: string;
  };
}

// ── Analytics Events ───────────────────────────────────────
export type AnalyticsEvent =
  | "url_submit"
  | "platform_detected"
  | "video_processed"
  | "download_clicked"
  | "download_success"
  | "download_error"
  | "tool_page_view";
