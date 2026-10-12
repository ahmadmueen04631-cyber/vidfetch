# VidFetch

**VidFetch** is a premium, production-ready multi-platform video downloader web application built with Next.js, TypeScript, and Tailwind CSS.

It provides a simple interface for downloading supported **public/authorized videos** from Instagram, TikTok, and YouTube.

> ⚠️ VidFetch is designed exclusively for publicly accessible content. Users are responsible for ensuring they have the legal right to download content they access through this tool.

---

## Live URL

[https://vidfetch.me](https://vidfetch.me)

---

## Features

- 🎬 Multi-platform support: Instagram, TikTok, YouTube
- 🔍 Automatic platform detection from pasted URL
- 🎨 Beautiful, responsive UI — dark mode, light mode, system preference
- ⚡ Fast, server-rendered with Next.js App Router
- 🔒 Server-side URL validation and rate limiting
- 📱 Mobile-first responsive design
- 🗺️ SEO-optimized with sitemap, robots.txt, structured data
- 📊 Google Analytics event tracking
- ♿ Accessible — WCAG-compliant, keyboard navigable
- 🛡️ Security headers, no secret exposure
- 📝 Blog foundation for SEO content

---

## Technology Stack

| Category   | Technology           |
|------------|----------------------|
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript (strict)  |
| Styling    | Tailwind CSS v4      |
| Hosting    | Vercel               |
| Analytics  | Google Analytics 4   |
| Fonts      | Inter (Google Fonts) |
| Theme      | next-themes          |
| Icons      | lucide-react         |

---

## Project Structure

```
app/
├── page.tsx                        # Homepage
├── layout.tsx                      # Root layout (Header, Footer, Analytics, JSON-LD)
├── globals.css                     # Design system / global styles
├── sitemap.ts                      # Auto-generated XML sitemap
├── robots.ts                       # Robots.txt rules
├── video-downloader/page.tsx       # Multi-platform downloader
├── instagram-video-downloader/     # Instagram video tool page
├── instagram-reels-downloader/     # Instagram Reels tool page
├── tiktok-video-downloader/        # TikTok tool page
├── youtube-video-downloader/       # YouTube video tool page
├── youtube-shorts-downloader/      # YouTube Shorts tool page
├── blog/                           # Blog index + 4 guide posts
├── about/page.tsx                  # About page
├── privacy/page.tsx                # Privacy policy
├── terms/page.tsx                  # Terms of service
└── api/process/route.ts            # POST /api/process — video processing API

components/
├── ui/                             # Button, Card, Badge, Input, Skeleton
├── layout/                         # Header, Footer, ThemeToggle, ToolPageLayout, BlogPostLayout
├── downloader/                     # UrlInput, Downloader, VideoPreview, DownloadOptions, ProcessingState, ErrorState
└── marketing/                      # Hero, HowItWorks, PlatformCards, PopularTools, FeatureGrid, FAQ, HomeCTA, AdSlot

lib/
├── types.ts                        # Shared TypeScript types
├── utils.ts                        # Utility helpers
├── errors.ts                       # Typed error classes
├── tools.ts                        # Configuration-driven tool definitions
├── analytics.ts                    # Google Analytics event helpers
├── structured-data.ts              # JSON-LD schema builders
├── platforms/detect-platform.ts   # URL detection, validation, normalization
└── providers/                      # Provider adapters (Instagram, TikTok, YouTube, registry)
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/your-org/clipdown.git
cd clipdown
npm install
```

### Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Then fill in the values:

```env
# Site URL (used in sitemap, OG tags, structured data)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
# Leave empty to disable analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Provider API key for video metadata/downloads
# See "Provider Configuration" below
PROVIDER_API_KEY=

# Rate limiting (requests per window per IP)
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Provider Configuration

VidFetch uses a provider abstraction (`lib/providers/`) to fetch video metadata and download options. The providers are located at:

```
lib/providers/
├── instagram.ts   # Instagram provider adapter
├── tiktok.ts      # TikTok provider adapter
├── youtube.ts     # YouTube provider adapter
└── registry.ts    # Provider registry (maps URLs to providers)
```

Each provider implements the `VideoProvider` interface:

```ts
interface VideoProvider {
  canHandle(url: URL): boolean;
  getMetadata(url: URL): Promise<VideoMetadata>;
  getAvailableDownloads(url: URL): Promise<DownloadOption[]>;
}
```

To configure a provider, set `PROVIDER_API_KEY` in `.env.local` to your API key from a compliant video processing service (e.g., a self-hosted yt-dlp wrapper, RapidAPI endpoint, or similar).

If no provider is configured, the app will return a clear `PROVIDER_NOT_CONFIGURED` error rather than fake results.

---

## Analytics Setup

### Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Set it in `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

Analytics events tracked:

| Event | Trigger |
|---|---|
| `url_submit` | User submits a URL |
| `platform_detected` | Platform is successfully detected |
| `video_processed` | Video metadata successfully fetched |
| `download_clicked` | User clicks a download button |
| `download_success` | Download initiated successfully |
| `download_error` | API returns an error |
| `tool_page_view` | Tool page is viewed |

### Google Search Console

1. Deploy the site to your domain.
2. Go to [search.google.com/search-console](https://search.google.com/search-console).
3. Add your property using the **Domain** or **URL prefix** method.
4. Verify ownership via DNS TXT record (recommended) or HTML file.
5. Submit your sitemap: `https://yourdomain.com/sitemap.xml`.

The sitemap is auto-generated by `app/sitemap.ts` and includes all tool pages, blog posts, and static pages.

---

## SEO Architecture

- **Metadata**: Unique `title`, `description`, `canonical`, `og:*`, `twitter:*` on every page
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots**: Configured at `/robots.txt` — allows all crawlers, blocks `/api/`
- **Structured Data**: JSON-LD on every page:
  - `WebSite` + `WebApplication` (root layout)
  - `BreadcrumbList` + `WebApplication` + `FAQPage` (tool pages)
  - `BreadcrumbList` + `FAQPage` (blog posts)
- **Blog**: SEO-focused guides at `/blog/*`
- **Internal linking**: Related tools, breadcrumbs, cross-page links

---

## Deployment (Vercel)

### Initial Setup

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **New Project**.
3. Import your repository.
4. Set environment variables in the Vercel dashboard (Project → Settings → Environment Variables).
5. Deploy.

### Environment Variables on Vercel

Set these in Vercel dashboard → Settings → Environment Variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL (`https://vidfetch.app`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics Measurement ID |
| `PROVIDER_API_KEY` | Yes (for real downloads) | API key for video provider |
| `RATE_LIMIT_MAX` | No | Max requests per IP per window (default: 10) |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms (default: 60000) |

### Caching

- All static pages are pre-rendered at build time (`○ Static`).
- The API route (`/api/process`) is server-rendered on demand (`ƒ Dynamic`).
- API responses include `Cache-Control: no-store` to prevent stale downloads.

---

## Adding a New Platform

1. Create a new provider in `lib/providers/`:

   ```ts
   // lib/providers/facebook.ts
   export const FacebookProvider: VideoProvider = {
     canHandle(url) { /* ... */ },
     async getMetadata(url) { /* ... */ },
     async getAvailableDownloads(url) { /* ... */ },
   };
   ```

2. Register it in `lib/providers/registry.ts`.

3. Add URL detection in `lib/platforms/detect-platform.ts`.

4. Add a tool definition in `lib/tools.ts`.

5. Create a new page: `app/facebook-video-downloader/page.tsx`.

6. Update `app/sitemap.ts` to include the new page.

---

## Security

- Server-side URL validation — client input is never trusted.
- API keys stored in environment variables only — never exposed to the browser.
- Rate limiting (in-memory, configurable) on `/api/process`.
- Security headers on all routes (via `next.config.ts`):
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## License

This project is private. All rights reserved.
