export default function DestinationLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-200 animate-pulse" />

      {/* Quick Facts Bar Skeleton */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
