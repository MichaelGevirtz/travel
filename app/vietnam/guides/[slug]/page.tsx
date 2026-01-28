import { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, Bell } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

// Known guide slugs that have dedicated pages
const KNOWN_GUIDES = [
  "visa",
  "best-time-to-visit",
  "transport",
  "costs-budget",
  "sim-esim",
  "safety-scams",
];

// Map slugs to display titles
const GUIDE_TITLES: Record<string, string> = {
  "first-time": "First Time in Vietnam",
  "digital-nomad": "Digital Nomad Guide",
  "couples": "Couples & Romance",
  "adventure": "Adventure Travel",
  "family": "Family Travel",
  "budget": "Budget Travel",
  "luxury": "Luxury Travel",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = GUIDE_TITLES[slug] || formatSlugToTitle(slug);

  return {
    title: `${title} - Coming Soon | Vietnam Insider`,
    description: `Our ${title} guide is coming soon. Check out our other Vietnam travel guides in the meantime.`,
  };
}

function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function GuideComingSoonPage({ params }: Props) {
  const { slug } = await params;

  // If this is a known guide, redirect (shouldn't happen due to Next.js routing priority)
  if (KNOWN_GUIDES.includes(slug)) {
    return null;
  }

  const title = GUIDE_TITLES[slug] || formatSlugToTitle(slug);

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="flex items-center gap-2 text-emerald-200 text-sm mb-4">
            <Clock className="h-4 w-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            This guide is currently being written by our travel experts.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
            <Bell className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Coming Soon
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We&apos;re working on this guide to help you plan your perfect Vietnam trip.
            Check back soon or explore our other guides below.
          </p>
          <Link
            href="/vietnam/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            View All Guides
          </Link>
        </div>

        {/* Available Guides */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Available Guides
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/vietnam/guides/visa"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">Visa Information</div>
              <div className="text-sm text-gray-500">E-visa and entry requirements</div>
            </Link>
            <Link
              href="/vietnam/guides/best-time-to-visit"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">Best Time to Visit</div>
              <div className="text-sm text-gray-500">Weather and seasons by region</div>
            </Link>
            <Link
              href="/vietnam/guides/transport"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">Transportation</div>
              <div className="text-sm text-gray-500">Getting around Vietnam</div>
            </Link>
            <Link
              href="/vietnam/guides/costs-budget"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">Budget & Costs</div>
              <div className="text-sm text-gray-500">Daily costs and money tips</div>
            </Link>
            <Link
              href="/vietnam/guides/sim-esim"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">SIM & eSIM</div>
              <div className="text-sm text-gray-500">Stay connected in Vietnam</div>
            </Link>
            <Link
              href="/vietnam/guides/safety-scams"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <div className="font-semibold text-gray-900">Safety & Scams</div>
              <div className="text-sm text-gray-500">Stay safe while traveling</div>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
