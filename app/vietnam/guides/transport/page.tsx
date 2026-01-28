import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, Plane, Train, Bus, Car } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam Transportation Guide 2026 | Getting Around",
  description:
    "Complete guide to transportation in Vietnam. Flights, trains, buses, and motorbikes. How to get around Vietnam safely and affordably.",
  openGraph: {
    title: "Vietnam Transportation Guide 2026 | Getting Around",
    description: "How to travel within Vietnam by plane, train, bus, and more.",
    url: "/vietnam/guides/transport",
  },
};

export default function TransportGuidePage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "Transportation" },
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
            <span>2 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Getting Around Vietnam
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Vietnam is well-connected. Here&apos;s how to travel between cities.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Plane className="h-5 w-5 text-emerald-600" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Long distance:</strong> Flights (cheap, 1-2 hrs)</li>
            <li><strong>Scenic routes:</strong> Trains (Hanoi-Hue-Saigon)</li>
            <li><strong>Budget option:</strong> Sleeper buses (overnight)</li>
            <li><strong>Within cities:</strong> Grab app (like Uber)</li>
          </ul>
        </div>

        {/* Transport Options */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transport Options</h2>

          {/* Domestic Flights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Plane className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Domestic Flights</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Best for Hanoi ↔ Saigon (2 hrs vs 30+ by land). Vietnam Airlines, VietJet, and Bamboo Airways fly daily.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Price: $30-80 USD</p>
                <p className="text-gray-600">Book 2-3 weeks ahead for deals</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Major airports</p>
                <p className="text-gray-600">Hanoi, Saigon, Da Nang, Nha Trang</p>
              </div>
            </div>
          </div>

          {/* Trains */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Train className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Trains</h3>
            </div>
            <p className="text-gray-600 mb-3">
              The Reunification Express runs Hanoi → Hue → Da Nang → Saigon. Scenic coastal views. Book soft sleeper for overnight trips.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Hanoi → Hue: 13 hrs</p>
                <p className="text-gray-600">Soft sleeper ~$40 USD</p>
              </div>
              <div>
                <p className="font-medium text-emerald-600">Hanoi → Saigon: 33 hrs</p>
                <p className="text-gray-600">Soft sleeper ~$70 USD</p>
              </div>
            </div>
          </div>

          {/* Buses */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Bus className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Sleeper Buses</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Budget-friendly overnight option. Lie-flat seats. Popular routes: Hanoi → Sapa, Hue → Hoi An, Saigon → Dalat.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Price: $10-25 USD</p>
                <p className="text-gray-600">Book at hostels or 12go.asia</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Tip</p>
                <p className="text-gray-600">Bring earplugs and a blanket</p>
              </div>
            </div>
          </div>

          {/* Grab & Taxis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Car className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">City Transport</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Use the Grab app (Southeast Asia&apos;s Uber). Safe, metered, no haggling. Available in all major cities.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">GrabCar</p>
                <p className="text-gray-600">Air-conditioned, 4-seater</p>
              </div>
              <div>
                <p className="font-medium text-emerald-600">GrabBike</p>
                <p className="text-gray-600">Motorbike taxi, faster in traffic</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Flights:</strong> Book on airline websites directly for best prices</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Trains:</strong> Use official Vietnam Railways site or 12go.asia</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Peak seasons:</strong> Book trains/buses 1 week ahead during Tet</span>
            </li>
          </ul>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.vietnamairlines.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Airlines
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- National carrier</span>
            </li>
            <li>
              <a
                href="https://dsvn.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Railways
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Train bookings</span>
            </li>
            <li>
              <a
                href="https://12go.asia/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                12go.asia
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Multi-transport booking</span>
            </li>
          </ul>
        </section>

        {/* Related Guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vietnam/guides/visa"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Visa Information
            </Link>
            <Link
              href="/vietnam/guides/best-time-to-visit"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Best Time to Visit
            </Link>
            <Link
              href="/vietnam/guides/costs-budget"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Budget & Costs
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
