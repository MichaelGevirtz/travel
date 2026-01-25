export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 py-12 md:py-16 animate-pulse">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 bg-white/20 rounded w-64 mb-6" />
          <div className="flex gap-2 mb-6">
            <div className="h-6 bg-white/20 rounded w-20" />
            <div className="h-6 bg-white/20 rounded w-24" />
          </div>
          <div className="h-12 bg-white/20 rounded w-3/4 mb-6" />
          <div className="h-6 bg-white/20 rounded w-full mb-2" />
          <div className="h-6 bg-white/20 rounded w-2/3 mb-8" />
          <div className="flex gap-6">
            <div className="h-4 bg-white/20 rounded w-32" />
            <div className="h-4 bg-white/20 rounded w-24" />
            <div className="h-4 bg-white/20 rounded w-20" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-12 animate-pulse">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </section>
    </div>
  );
}
