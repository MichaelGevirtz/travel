import { Metadata } from "next";
import { Suspense } from "react";
import { DestinationGrid } from "@/components/destinations";
import { Breadcrumbs } from "@/components/layout";
import { allDestinations } from "@/lib/constants/destinations";
import { DestinationFilters } from "@/components/destinations/DestinationFilters";

export const metadata: Metadata = {
  title: "Vietnam Destinations | Top Places to Visit in 2026",
  description:
    "Explore 50+ Vietnam destinations from bustling cities to serene beaches. Find the perfect places to visit with our detailed guides, maps, and local tips.",
  openGraph: {
    title: "Vietnam Destinations | Top Places to Visit in 2026",
    description:
      "Explore 50+ Vietnam destinations from bustling cities to serene beaches.",
    url: "/vietnam/destinations",
  },
};

interface DestinationsPageProps {
  searchParams: { type?: string; region?: string };
}

export default function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const { type, region } = searchParams;

  // Filter destinations based on query params
  let filteredDestinations = allDestinations;

  if (type) {
    filteredDestinations = filteredDestinations.filter((d) => d.type === type);
  }

  if (region) {
    filteredDestinations = filteredDestinations.filter((d) => d.region === region);
  }

  // Page title based on filters
  let pageTitle = "All Vietnam Destinations";
  let pageSubtitle = "Explore every corner of Vietnam, from bustling cities to hidden gems";

  if (type === "city") {
    pageTitle = "Vietnam Cities";
    pageSubtitle = "Vibrant urban destinations with culture, food, and nightlife";
  } else if (type === "beach") {
    pageTitle = "Vietnam Beaches & Islands";
    pageSubtitle = "Pristine coastlines and tropical paradise destinations";
  } else if (type === "mountain") {
    pageTitle = "Vietnam Mountains & Highlands";
    pageSubtitle = "Stunning mountain scenery and cool highland retreats";
  } else if (type === "region") {
    pageTitle = "Vietnam Regions";
    pageSubtitle = "Explore Vietnam's diverse regional landscapes";
  }

  if (region === "north") {
    pageTitle = `Northern ${pageTitle.replace("Vietnam ", "")}`;
    pageSubtitle = "Destinations in Northern Vietnam including Hanoi, Ha Long Bay, and Sapa";
  } else if (region === "central") {
    pageTitle = `Central ${pageTitle.replace("Vietnam ", "")}`;
    pageSubtitle = "Destinations in Central Vietnam including Hoi An, Da Nang, and Hue";
  } else if (region === "south") {
    pageTitle = `Southern ${pageTitle.replace("Vietnam ", "")}`;
    pageSubtitle = "Destinations in Southern Vietnam including Ho Chi Minh City and Mekong Delta";
  }

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Destinations" },
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
            <DestinationFilters
              currentType={type}
              currentRegion={region}
            />
          </Suspense>
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600">
          Showing {filteredDestinations.length} destination
          {filteredDestinations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <DestinationGrid
          destinations={filteredDestinations}
          title=""
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600 text-lg">
            No destinations found matching your filters.
          </p>
          <a
            href="/vietnam/destinations"
            className="inline-block mt-4 text-emerald-600 font-medium hover:text-emerald-700"
          >
            View all destinations →
          </a>
        </div>
      )}
    </div>
  );
}
