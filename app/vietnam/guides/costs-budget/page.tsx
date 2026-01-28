import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, DollarSign, Utensils, Home, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam Budget Guide 2026 | Daily Costs & Prices",
  description:
    "How much does Vietnam cost? Daily budget breakdown for food, accommodation, and transport. Plan your Vietnam trip budget.",
  openGraph: {
    title: "Vietnam Budget Guide 2026 | Daily Costs & Prices",
    description: "Real costs and daily budgets for traveling in Vietnam.",
    url: "/vietnam/guides/costs-budget",
  },
};

export default function BudgetGuidePage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "Budget & Costs" },
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
            Vietnam Budget Guide
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Vietnam is affordable. Here&apos;s what to expect for daily costs.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Daily Budget Overview
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Budget:</strong> $25-40 USD/day (hostels, street food)</li>
            <li><strong>Mid-range:</strong> $50-80 USD/day (hotels, restaurants)</li>
            <li><strong>Comfort:</strong> $100-150 USD/day (nice hotels, tours)</li>
            <li><strong>Currency:</strong> 1 USD ≈ 24,500 VND</li>
          </ul>
        </div>

        {/* Cost Breakdown */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>

          {/* Accommodation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Home className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Accommodation</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Hostel dorm</p>
                <p className="text-emerald-600 font-semibold">$5-10</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Budget hotel</p>
                <p className="text-emerald-600 font-semibold">$15-30</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Mid-range hotel</p>
                <p className="text-emerald-600 font-semibold">$40-80</p>
              </div>
            </div>
          </div>

          {/* Food */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Utensils className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Food & Drinks</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Street food meal</p>
                <p className="text-emerald-600 font-semibold">$1-3</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Restaurant meal</p>
                <p className="text-emerald-600 font-semibold">$5-15</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Local beer</p>
                <p className="text-emerald-600 font-semibold">$0.50-1</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Pho (noodle soup): $1.50-3 | Banh mi (sandwich): $1-2 | Coffee: $1-3
            </p>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Activities & Transport</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Museum entry</p>
                <p className="text-emerald-600 font-semibold">$2-5</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Day tour</p>
                <p className="text-emerald-600 font-semibold">$25-60</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Grab ride (5km)</p>
                <p className="text-emerald-600 font-semibold">$2-4</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Budgets */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Daily Budgets</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Backpacker: $30/day</h3>
              <p className="text-sm text-blue-800">
                Hostel dorm ($8) + Street food x3 ($6) + Local transport ($3) + One activity ($10) + Drinks ($3)
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-900 mb-2">Mid-range: $70/day</h3>
              <p className="text-sm text-emerald-800">
                3-star hotel ($35) + Mix of street/restaurant food ($15) + Grab rides ($8) + Tour or activity ($12)
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Comfort: $120/day</h3>
              <p className="text-sm text-purple-800">
                4-star hotel ($60) + Restaurant meals ($30) + Private transfers ($15) + Premium tour ($15)
              </p>
            </div>
          </div>
        </section>

        {/* Money Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Money Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>ATMs:</strong> Withdraw in VND. Use Citibank or HSBC for lower fees.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Cards:</strong> Visa/Mastercard accepted at hotels and restaurants. Cash for markets.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Tipping:</strong> Not expected, but 5-10% appreciated at restaurants.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Bargaining:</strong> Expected at markets. Start at 50% of asking price.</span>
            </li>
          </ul>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://vietnam.travel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Tourism
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Official tourism board</span>
            </li>
            <li>
              <a
                href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=VND"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                XE Currency Converter
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Live exchange rates</span>
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
              href="/vietnam/guides/transport"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Transportation
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
