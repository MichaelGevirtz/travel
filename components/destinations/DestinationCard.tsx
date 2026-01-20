import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import type { DestinationCardData } from "@/types";

type DestinationCardProps = DestinationCardData;

export function DestinationCard({
  slug,
  name,
  description,
  image,
  imageAlt,
  highlights,
}: DestinationCardProps) {
  // Icon mapping - Miller's Law: Visual recognition is faster than reading
  const iconMap = {
    days: Clock,
    budget: DollarSign,
    bestFor: MapPin,
  };

  return (
    <article className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Fitts's Law: Entire card is clickable */}
      <Link href={`/vietnam/destinations/${slug}`} className="block">
        {/* Image Container - Refactoring UI: Cards should "float" not "box" */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle overlay on hover - enhances readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section - Law of Proximity: Related info stays close */}
        <div className="p-5 md:p-6">
          {/* Destination Name */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>

          {/* Description - line-clamp-2: Prevents layout shift, keeps cards uniform */}
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Highlights - Miller's Law: 3 items = easy to process */}
          <ul className="space-y-2 mb-5">
            {highlights.map((highlight, index) => {
              const Icon = iconMap[highlight.type];
              return (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Icon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{highlight.text}</span>
                </li>
              );
            })}
          </ul>

          {/* CTA - Von Restorff Effect: Subtle but discoverable */}
          <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700">
            <span>Explore {name}</span>
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}

// Destination Grid Component
interface DestinationGridProps {
  destinations: DestinationCardData[];
  title?: string;
  subtitle?: string;
}

export function DestinationGrid({
  destinations,
  title = "Top Destinations in Vietnam",
  subtitle,
}: DestinationGridProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
          )}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
