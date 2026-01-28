import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, Sun, CloudRain, Thermometer } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Best Time to Visit Vietnam 2026 | Weather & Seasons",
  description:
    "Find the best time to visit Vietnam by region. Weather guide for North, Central, and South Vietnam. Plan your trip around festivals and dry seasons.",
  openGraph: {
    title: "Best Time to Visit Vietnam 2026 | Weather & Seasons",
    description: "Weather guide and best seasons to visit each region of Vietnam.",
    url: "/vietnam/guides/best-time-to-visit",
  },
};

export default function BestTimeToVisitPage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "Best Time to Visit" },
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
            Best Time to Visit Vietnam
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Vietnam spans 1,650km north to south. Weather varies by region.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5 text-emerald-600" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>North (Hanoi, Sapa):</strong> Oct-Apr (dry, cooler)</li>
            <li><strong>Central (Hoi An, Hue):</strong> Feb-Aug (dry season)</li>
            <li><strong>South (Saigon, Mekong):</strong> Dec-Apr (dry season)</li>
            <li><strong>Best overall:</strong> Feb-Apr or Oct-Nov</li>
          </ul>
        </div>

        {/* By Region */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather by Region</h2>

          {/* North */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">North Vietnam</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Hanoi, Ha Long Bay, Sapa, Ninh Binh</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Best: Oct-Apr</p>
                <p className="text-gray-600">Dry and cool. Dec-Feb can be chilly (10-15°C)</p>
              </div>
              <div>
                <p className="font-medium text-amber-600">Avoid: May-Sep</p>
                <p className="text-gray-600">Hot, humid, heavy rain. Typhoon season.</p>
              </div>
            </div>
          </div>

          {/* Central */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <CloudRain className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Central Vietnam</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Da Nang, Hoi An, Hue, Nha Trang</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Best: Feb-Aug</p>
                <p className="text-gray-600">Warm and dry. Perfect beach weather.</p>
              </div>
              <div>
                <p className="font-medium text-amber-600">Avoid: Oct-Dec</p>
                <p className="text-gray-600">Monsoon season. Risk of flooding in Hoi An.</p>
              </div>
            </div>
          </div>

          {/* South */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">South Vietnam</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Ho Chi Minh City, Mekong Delta, Phu Quoc</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-emerald-600">Best: Dec-Apr</p>
                <p className="text-gray-600">Dry season. Consistent 28-32°C.</p>
              </div>
              <div>
                <p className="font-medium text-amber-600">Wet: May-Nov</p>
                <p className="text-gray-600">Daily afternoon showers. Still warm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Festivals */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Festivals</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold text-emerald-600 w-24">Jan/Feb</span>
              <span><strong>Tet (Lunar New Year)</strong> - Biggest holiday. Many businesses close 1 week.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-emerald-600 w-24">Full Moon</span>
              <span><strong>Hoi An Lantern Festival</strong> - 14th day of lunar month. Beautiful night market.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-emerald-600 w-24">Sep/Oct</span>
              <span><strong>Mid-Autumn Festival</strong> - Mooncakes and lion dances.</span>
            </li>
          </ul>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://vietnam.travel/things-to-do/best-time-visit-vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Tourism - Best Time to Visit
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nchmf.gov.vn/Kttvsite/en-US/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Weather Forecast Center
                <ExternalLink className="h-4 w-4" />
              </a>
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
              href="/vietnam/guides/transport"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Transportation
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
