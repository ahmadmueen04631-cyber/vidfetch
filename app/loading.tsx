// ============================================================
// ClipDown — Global Loading State (app/loading.tsx)
// Suspense loading screen with modern skeletal shimmer
// ============================================================

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>

      {/* Input Box Skeleton */}
      <div className="max-w-2xl mx-auto p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-3">
        <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="flex justify-between items-center px-2">
          <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      {/* Feature Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 space-y-3"
          >
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
