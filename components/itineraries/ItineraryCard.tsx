import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Plane, ArrowRight } from "lucide-react";
import type { ItineraryCardData } from "@/types";

type ItineraryCardProps = ItineraryCardData;

const seasonColors = {
  spring: "bg-green-100 text-green-700",
  summer: "bg-amber-100 text-amber-700",
  autumn: "bg-orange-100 text-orange-700",
  winter: "bg-blue-100 text-blue-700",
};

const durationLabels = {
  "1-week": "7 Days",
  "2-week": "14 Days",
  "3-week": "21 Days",
};

export function ItineraryCard({
  slug,
  title,
  duration,
  season,
  description,
  image,
  regions,
  stops,
  pace,
}: ItineraryCardProps) {
  const routePreview = stops.slice(0, 4).join(" → ") + (stops.length > 4 ? " ..." : "");

  return (
    <article className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link href={`/vietnam/itineraries/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-white/90 text-gray-800 rounded-full">
              {durationLabels[duration]}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${seasonColors[season]}`}>
              {season}
            </span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-6">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Route Preview */}
          <div className="flex items-start gap-2 text-sm text-gray-700 mb-3">
            <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{routePreview}</span>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {regions.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(", ")}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Plane className="h-3.5 w-3.5" />
              {pace} pace
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700">
            <span>View Itinerary</span>
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}

// Itinerary Grid Component
interface ItineraryGridProps {
  itineraries: ItineraryCardData[];
  title?: string;
  subtitle?: string;
}

export function ItineraryGrid({
  itineraries,
  title = "Vietnam Itineraries",
  subtitle,
}: ItineraryGridProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {title && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}

        {/* Responsive Grid - 3 columns max for itineraries (wider cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.slug} {...itinerary} />
          ))}
        </div>
      </div>
    </section>
  );
}
