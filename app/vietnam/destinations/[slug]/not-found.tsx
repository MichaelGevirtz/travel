import Link from "next/link";
import { MapPin } from "lucide-react";

export default function DestinationNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-6">
          <MapPin className="h-8 w-8" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Destination Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the destination you&apos;re looking for. It may have been
          moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/vietnam/destinations"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse All Destinations
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
