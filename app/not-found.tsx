// ============================================================
// ClipDown — 404 Not Found Page (app/not-found.tsx)
// Modern, responsive 404 page with helpful quick links
// ============================================================

import Link from "next/link";
import { Video, Film, Play, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <span className="text-8xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 select-none dark:opacity-40">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Page Not Found
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
        Oops! We couldn&apos;t find that page
      </h1>

      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
        The link you followed might be broken, or the page may have been moved.
        Try using one of our popular downloader tools below.
      </p>

      {/* Quick Tool Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mb-8">
        <Link
          href="/instagram-video-downloader"
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs"
        >
          <Film className="w-4 h-4 text-pink-500" />
          Instagram Downloader
        </Link>
        <Link
          href="/tiktok-video-downloader"
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs"
        >
          <Video className="w-4 h-4 text-cyan-500" />
          TikTok Downloader
        </Link>
        <Link
          href="/youtube-video-downloader"
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs"
        >
          <Play className="w-4 h-4 text-red-500 fill-current" />
          YouTube Downloader
        </Link>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md shadow-indigo-500/20"
      >
        <Home className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );
}
