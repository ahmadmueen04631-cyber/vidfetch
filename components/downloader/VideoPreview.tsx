// ============================================================
// ClipDown — Video Preview Card
// ============================================================

import Image from "next/image";
import { cn, formatDuration, formatCount, getPlatformLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { VideoMetadata } from "@/lib/types";

interface VideoPreviewProps {
  metadata: VideoMetadata;
}

export function VideoPreview({ metadata }: VideoPreviewProps) {
  const {
    platform,
    contentType,
    title,
    thumbnail,
    duration,
    author,
    authorHandle,
    viewCount,
  } = metadata;

  const platformLabel = getPlatformLabel(platform);
  const contentLabel =
    contentType === "reel"
      ? "Reel"
      : contentType === "short"
      ? "Short"
      : "Video";

  const badgeVariant =
    platform === "instagram"
      ? "instagram"
      : platform === "tiktok"
      ? "tiktok"
      : platform === "youtube"
      ? "youtube"
      : "default";

  return (
    <div className="animate-fade-in">
      <div className="flex gap-4 items-start">
        {/* Thumbnail */}
        <div
          className={cn(
            "relative flex-shrink-0",
            "w-28 h-20 sm:w-36 sm:h-24",
            "rounded-xl overflow-hidden",
            "bg-[var(--bg-surface)] border border-[var(--border-subtle)]",
            "shadow-[var(--shadow-sm)]"
          )}
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title ? `Thumbnail for: ${title}` : "Video thumbnail"}
              fill
              className="object-cover"
              unoptimized // External URLs from providers
              sizes="(max-width: 640px) 112px, 144px"
            />
          ) : (
            <ThumbnailPlaceholder />
          )}

          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-1.5 right-1.5">
              <span className="px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-black/70 text-white">
                {formatDuration(duration)}
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          {/* Platform badge */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={badgeVariant} size="sm" dot>
              {platformLabel} {contentLabel}
            </Badge>
          </div>

          {/* Title */}
          {title ? (
            <h3
              className="text-sm font-semibold text-[var(--text-primary)] leading-snug line-clamp-2 mb-1.5"
              title={title}
            >
              {title}
            </h3>
          ) : (
            <p className="text-sm text-[var(--text-muted)] mb-1.5 italic">
              No title available
            </p>
          )}

          {/* Author */}
          {(author || authorHandle) && (
            <p className="text-xs text-[var(--text-secondary)] mb-1">
              <span className="text-[var(--text-muted)]">by </span>
              <span className="font-medium">
                {author ?? authorHandle}
              </span>
              {author && authorHandle && author !== authorHandle && (
                <span className="text-[var(--text-muted)]">
                  {" "}(@{authorHandle})
                </span>
              )}
            </p>
          )}

          {/* Stats */}
          {viewCount !== undefined && (
            <p className="text-xs text-[var(--text-muted)]">
              {formatCount(viewCount)} views
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Thumbnail Placeholder ──────────────────────────────────
function ThumbnailPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-[var(--text-muted)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}
