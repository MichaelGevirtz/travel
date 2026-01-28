import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, Smartphone, Wifi, Signal, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam SIM Card & eSIM Guide 2026 | Stay Connected",
  description:
    "Best SIM cards and eSIM options for Vietnam. Prices, coverage, and where to buy. Stay connected during your trip.",
  openGraph: {
    title: "Vietnam SIM Card & eSIM Guide 2026 | Stay Connected",
    description: "How to get mobile data and stay connected in Vietnam.",
    url: "/vietnam/guides/sim-esim",
  },
};

export default function SimEsimGuidePage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "SIM & eSIM" },
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
            SIM Cards & eSIM in Vietnam
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Getting mobile data in Vietnam is cheap and easy.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-emerald-600" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Best option:</strong> eSIM (instant, no physical card needed)</li>
            <li><strong>Budget option:</strong> Local SIM at airport ($5-10)</li>
            <li><strong>Data cost:</strong> ~$5-15 for 30 days unlimited</li>
            <li><strong>Coverage:</strong> 4G/LTE in all cities, most rural areas</li>
          </ul>
        </div>

        {/* Options */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Options</h2>

          {/* eSIM */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Wifi className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">eSIM (Recommended)</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Download before you arrive. Works instantly when you land. No physical SIM swap needed.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="font-medium text-emerald-600">Price: $8-15</p>
                <p className="text-gray-600">7-30 days unlimited data</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Providers</p>
                <p className="text-gray-600">Airalo, Holafly, Nomad</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Check compatibility:</strong> iPhone XS or newer, most Android phones from 2019+
              </p>
            </div>
          </div>

          {/* Local SIM */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Signal className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Local SIM Card</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Buy at the airport arrivals hall. Staff will set it up for you. Passport required.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Price: $5-10</p>
                <p className="text-gray-600">30 days with 3-5GB/day</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Best carriers</p>
                <p className="text-gray-600">Viettel, Mobifone, Vinaphone</p>
              </div>
            </div>
          </div>

          {/* Pocket WiFi */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Wifi className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Pocket WiFi Rental</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Good for groups. Rent at airport, return when leaving. Connects 5+ devices.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Price: $3-5/day</p>
                <p className="text-gray-600">Unlimited data, shared connection</p>
              </div>
              <div>
                <p className="font-medium text-amber-600">Downside</p>
                <p className="text-gray-600">Need to carry extra device</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>eSIM users:</strong> Download the eSIM before leaving home (needs WiFi)
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Airport SIM:</strong> Booths are right after customs. Takes 5-10 minutes.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Top-ups:</strong> Buy credit at any convenience store (Circle K, FamilyMart)
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Free WiFi:</strong> Available at most cafes, hotels, and restaurants
              </span>
            </li>
          </ul>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">eSIM Providers</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.airalo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Airalo
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Popular eSIM marketplace</span>
            </li>
            <li>
              <a
                href="https://www.holafly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Holafly
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Unlimited data plans</span>
            </li>
            <li>
              <a
                href="https://vietteltelecom.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Viettel
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Vietnam&apos;s largest carrier</span>
            </li>
          </ul>
        </section>

        {/* Related Guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vietnam/guides/costs-budget"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Budget & Costs
            </Link>
            <Link
              href="/vietnam/guides/transport"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Transportation
            </Link>
            <Link
              href="/vietnam/guides/safety-scams"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Safety Tips
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
