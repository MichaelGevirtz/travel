import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Map, Calendar, Wallet, Shield } from "lucide-react";
import { DestinationGrid } from "@/components/destinations";
import { featuredDestinations } from "@/lib/constants/destinations";

export const metadata: Metadata = {
  title: "Vietnam Travel Guide | Complete Guide to Visiting Vietnam 2026",
  description:
    "Everything you need to know about traveling to Vietnam. Destinations, itineraries, accommodation, visa, budget, and insider tips from experienced travelers.",
  openGraph: {
    title: "Vietnam Travel Guide | Complete Guide to Visiting Vietnam 2026",
    description:
      "Everything you need to know about traveling to Vietnam. Destinations, itineraries, accommodation, visa, budget, and insider tips.",
    url: "/vietnam",
  },
};

const quickLinks = [
  {
    title: "Destinations",
    description: "Explore 50+ destinations across Vietnam",
    href: "/vietnam/destinations",
    icon: Map,
  },
  {
    title: "Itineraries",
    description: "Sample routes for 1, 2, or 3 weeks",
    href: "/vietnam/itineraries",
    icon: Calendar,
  },
  {
    title: "Budget Guide",
    description: "Daily costs and money-saving tips",
    href: "/vietnam/guides/costs-budget",
    icon: Wallet,
  },
  {
    title: "Safety Tips",
    description: "Scams to avoid and safety advice",
    href: "/vietnam/guides/safety-scams",
    icon: Shield,
  },
];

export default function VietnamHubPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/vietnam-hero.jpg"
          alt="Vietnam landscape with rice terraces"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-gray-900/30" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Vietnam Travel Guide
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            From the limestone karsts of Ha Long Bay to the bustling streets of Saigon,
            discover everything you need to plan your perfect Vietnam trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vietnam/destinations"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Explore Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/vietnam/itineraries"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              View Itineraries
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Start Planning Your Trip
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <link.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <DestinationGrid
        destinations={featuredDestinations}
        title="Top Vietnam Destinations"
        subtitle="The most popular places to visit in Vietnam"
      />

      {/* Quick Facts */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Vietnam Quick Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Best Time to Visit</h3>
              <p className="text-gray-600 text-sm mb-3">
                Vietnam can be visited year-round. The best months depend on the region:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>North:</strong> Oct - Apr (cool, dry)</li>
                <li><strong>Central:</strong> Feb - Aug (least rain)</li>
                <li><strong>South:</strong> Dec - Apr (dry season)</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Visa Requirements</h3>
              <p className="text-gray-600 text-sm mb-3">
                Most visitors need a visa. Options include:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>E-visa:</strong> Up to 90 days (most countries)</li>
                <li><strong>Visa on arrival:</strong> Pre-approval needed</li>
                <li><strong>Exemptions:</strong> 15-45 days for some nationalities</li>
              </ul>
              <Link
                href="/vietnam/guides/visa"
                className="inline-block mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700"
              >
                Full visa guide →
              </Link>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Daily Budget</h3>
              <p className="text-gray-600 text-sm mb-3">
                Vietnam offers excellent value for money:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Budget:</strong> $25-40/day</li>
                <li><strong>Mid-range:</strong> $50-100/day</li>
                <li><strong>Luxury:</strong> $150+/day</li>
              </ul>
              <Link
                href="/vietnam/guides/costs-budget"
                className="inline-block mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700"
              >
                Full budget guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Plan Your Vietnam Trip?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Browse our sample itineraries for inspiration, or start exploring
            destinations to build your own perfect route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vietnam/itineraries"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Sample Itineraries
            </Link>
            <Link
              href="/vietnam/destinations"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Browse All Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
