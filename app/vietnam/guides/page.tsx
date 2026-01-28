import { Metadata } from "next";
import Link from "next/link";
import { FileText, Plane, Sun, Train, DollarSign, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam Travel Guides 2026 | Essential Information",
  description:
    "Essential guides for traveling to Vietnam. Visa requirements, best time to visit, transportation, and budget tips.",
  openGraph: {
    title: "Vietnam Travel Guides 2026 | Essential Information",
    description: "Everything you need to know before visiting Vietnam.",
    url: "/vietnam/guides",
  },
};

const guides = [
  {
    title: "Visa Information",
    description: "E-visa, visa exemptions, and entry requirements for Vietnam.",
    href: "/vietnam/guides/visa",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Best Time to Visit",
    description: "Weather by region and the best seasons to travel.",
    href: "/vietnam/guides/best-time-to-visit",
    icon: Sun,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Transportation",
    description: "Getting around Vietnam by plane, train, bus, and Grab.",
    href: "/vietnam/guides/transport",
    icon: Train,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Budget & Costs",
    description: "Daily costs, money tips, and sample budgets.",
    href: "/vietnam/guides/costs-budget",
    icon: DollarSign,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
];

export default function GuidesPage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Vietnam Travel Guides
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Essential information to plan your trip to Vietnam.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${guide.bgColor}`}>
                    <Icon className={`h-6 w-6 ${guide.color}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                      {guide.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h2>
                    <p className="text-gray-600 mt-1">{guide.description}</p>
                    <p className="text-sm text-emerald-600 mt-2">2 min read</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-3">Planning Your Trip?</h2>
          <p className="text-gray-700 mb-4">
            Check out our sample itineraries for 1, 2, or 3 week trips through Vietnam.
          </p>
          <Link
            href="/vietnam/itineraries"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View Itineraries
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
