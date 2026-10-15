import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { websiteSchema, webAppSchema, jsonLd } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vidfetch.me"
  ),
  title: {
    default: "VidFetch – Download Supported Public Videos Online",
    template: "%s | VidFetch",
  },
  description:
    "Download supported public videos from Instagram, TikTok, YouTube, Reddit, and more. Simple, fast, and privacy-conscious. No account required.",
  keywords: [
    "vidfetch",
    "video downloader",
    "instagram downloader",
    "tiktok downloader",
    "youtube downloader",
    "reddit downloader",
    "online video downloader",
    "download video online",
    "reels downloader",
    "shorts downloader",
  ],
  authors: [{ name: "VidFetch" }],
  creator: "VidFetch",
  openGraph: {
    type: "website",
    siteName: "VidFetch",
    title: "VidFetch – Download Supported Public Videos Online",
    description:
      "A simple, fast tool for downloading supported public videos from Instagram, TikTok, YouTube, and Reddit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VidFetch – Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VidFetch – Download Supported Public Videos Online",
    description:
      "A simple, fast tool for downloading supported public videos from Instagram, TikTok, YouTube, and Reddit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ── Root Layout ────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC — inline theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('vidfetch-theme');
                var isDark = theme === 'dark' || ((!theme || theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />

        {/* Structured Data — WebSite + WebApplication */}
        <script {...jsonLd(websiteSchema())} />
        <script {...jsonLd(webAppSchema())} />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="vidfetch-theme"
          disableTransitionOnChange={true}
        >
          <div className="flex flex-col min-h-screen">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-b-xl focus:shadow-lg font-semibold text-sm transition-all"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
