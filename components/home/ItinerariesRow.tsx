import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const itineraries = [
  {
    slug: "1-week",
    title: "1 Week Highlights",
    duration: "7 days",
    description: "Perfect introduction to Vietnam covering Hanoi, Ha Long Bay, and Ho Chi Minh City.",
    image: "/images/itineraries/1-week.jpg",
    route: "North to South",
  },
  {
    slug: "2-weeks",
    title: "2 Week Classic",
    duration: "14 days",
    description: "The classic route from Hanoi to Saigon with stops in Hoi An, Hue, and more.",
    image: "/images/itineraries/2-weeks.jpg",
    route: "North to South",
  },
  {
    slug: "3-weeks",
    title: "3 Week Complete",
    duration: "21 days",
    description: "Experience everything Vietnam has to offer with time to explore hidden gems.",
    image: "/images/itineraries/3-weeks.jpg",
    route: "Comprehensive",
  },
];

export function ItinerariesRow() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Sample Itineraries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Ready-to-use travel plans with flexible suggestions and insider tips
            </p>
          </div>
          <Link
            href="/vietnam/itineraries"
            className="hidden md:inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4 md:mt-0"
          >
            View all itineraries
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {itineraries.map((itinerary) => (
            <Link
              key={itinerary.slug}
              href={`/vietnam/itineraries/${itinerary.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={itinerary.image}
                  alt={itinerary.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {itinerary.duration}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {itinerary.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {itinerary.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {itinerary.route}
                  </span>
                  <span className="text-emerald-600 font-semibold text-sm group-hover:text-emerald-700">
                    View itinerary →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/vietnam/itineraries"
            className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            View all itineraries
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
