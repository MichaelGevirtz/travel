import { Metadata } from "next";
import { Suspense } from "react";
import { ItineraryGrid } from "@/components/itineraries";
import { ItineraryFilters } from "@/components/itineraries";
import { Breadcrumbs } from "@/components/layout";
import { filterItineraries } from "@/lib/constants/itineraries";

export const metadata: Metadata = {
  title: "Vietnam Itineraries | 1, 2 & 3 Week Trip Plans for 2026",
  description:
    "Plan your Vietnam trip with our curated itineraries. Choose from 1-week, 2-week, or 3-week routes optimized for each season. Expert-crafted travel plans.",
  openGraph: {
    title: "Vietnam Itineraries | 1, 2 & 3 Week Trip Plans",
    description:
      "Plan your Vietnam trip with curated itineraries for every season and duration.",
    url: "/vietnam/itineraries",
  },
};

interface ItinerariesPageProps {
  searchParams: { duration?: string; season?: string };
}

export default function ItinerariesPage({ searchParams }: ItinerariesPageProps) {
  const { duration, season } = searchParams;

  // Filter itineraries based on query params
  const filteredItineraries = filterItineraries({ duration, season });

  // Dynamic page title based on filters
  let pageTitle = "Vietnam Itineraries";
  let pageSubtitle = "Curated trip plans for every duration and season";

  if (duration === "1-week") {
    pageTitle = "1-Week Vietnam Itineraries";
    pageSubtitle = "Perfect for a quick but immersive Vietnam experience";
  } else if (duration === "2-week") {
    pageTitle = "2-Week Vietnam Itineraries";
    pageSubtitle = "The sweet spot for exploring two regions in depth";
  } else if (duration === "3-week") {
    pageTitle = "3-Week Vietnam Itineraries";
    pageSubtitle = "The ultimate journey covering all of Vietnam";
  }

  if (season === "spring") {
    pageTitle = `Spring ${pageTitle}`;
    pageSubtitle = "March-April routes with ideal weather across Vietnam";
  } else if (season === "summer") {
    pageTitle = `Summer ${pageTitle}`;
    pageSubtitle = "May-August routes optimized for highlands and northern mountains";
  } else if (season === "autumn") {
    pageTitle = `Autumn ${pageTitle}`;
    pageSubtitle = "September-November routes avoiding typhoon season";
  } else if (season === "winter") {
    pageTitle = `Winter ${pageTitle}`;
    pageSubtitle = "December-February routes for sunshine and beaches";
  }

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Itineraries" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            {pageSubtitle}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Suspense fallback={<div className="h-10" />}>
            <ItineraryFilters
              currentDuration={duration}
              currentSeason={season}
            />
          </Suspense>
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600">
          Showing {filteredItineraries.length} itinerar
          {filteredItineraries.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {/* Itineraries Grid */}
      {filteredItineraries.length > 0 ? (
        <ItineraryGrid itineraries={filteredItineraries} title="" />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600 text-lg">
            No itineraries found matching your filters.
          </p>
          <a
            href="/vietnam/itineraries"
            className="inline-block mt-4 text-emerald-600 font-medium hover:text-emerald-700"
          >
            View all itineraries
          </a>
        </div>
      )}

      {/* SEO Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Planning Your Vietnam Trip
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Vietnam stretches over 1,650km from north to south, making route planning essential.
              Our itineraries are designed around two key factors: <strong>how much time you have</strong> and
              <strong> when you&apos;re traveling</strong>.
            </p>

            <h3>Choosing Your Duration</h3>
            <ul>
              <li><strong>1 week:</strong> Focus on one region. Enough for Hanoi + Ha Long Bay, or HCMC + Mekong + beach.</li>
              <li><strong>2 weeks:</strong> Cover two regions comfortably. The classic North-to-South or South-to-North routes.</li>
              <li><strong>3 weeks:</strong> Experience all of Vietnam. From Hanoi&apos;s ancient streets to Phu Quoc&apos;s beaches.</li>
            </ul>

            <h3>Timing Your Visit</h3>
            <ul>
              <li><strong>Spring (Mar-Apr):</strong> Ideal weather across all regions. The best time for a full Vietnam trip.</li>
              <li><strong>Summer (May-Aug):</strong> Head to the mountains. Sapa and Da Lat offer cooler temperatures.</li>
              <li><strong>Autumn (Sep-Nov):</strong> Avoid Central Vietnam (typhoon season). North and South are excellent.</li>
              <li><strong>Winter (Dec-Feb):</strong> Go south. Phu Quoc and the Mekong are at their best.</li>
            </ul>

            <p>
              Each itinerary includes specific destinations, suggested nights, day trip options,
              and realistic travel times between stops.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
