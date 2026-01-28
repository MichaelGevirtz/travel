import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { VideoGrid } from "@/components/videos";
import { travelTipVideos } from "@/lib/constants/videos";

export const metadata: Metadata = {
  title: "Vietnam Travel Tips & Videos | Vietnam Insider",
  description:
    "Watch curated YouTube videos with the best travel tips, guides, and vlogs for visiting Vietnam. Learn from experienced travelers before your trip.",
  openGraph: {
    title: "Vietnam Travel Tips & Videos | Vietnam Insider",
    description:
      "Watch curated YouTube videos with the best travel tips, guides, and vlogs for visiting Vietnam.",
    url: "/vietnam/tips",
  },
};

const breadcrumbs = [
  { label: "Vietnam", href: "/vietnam" },
  { label: "Tips & Videos" },
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Vietnam Travel Tips & Videos
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            Learn from experienced travelers with our curated collection of
            YouTube videos covering everything you need to know about visiting
            Vietnam.
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <VideoGrid
        videos={travelTipVideos}
        title="Featured Videos"
        subtitle="Hand-picked videos to help you plan your Vietnam adventure"
      />
    </div>
  );
}
