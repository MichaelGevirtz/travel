import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HotelPick {
  destination: string;
  area: string;
  priceRange: string;
  bestFor: string;
  provider: "bookingcom" | "agoda";
  href: string;
}

const hotelPicks: HotelPick[] = [
  {
    destination: "Hanoi",
    area: "Old Quarter",
    priceRange: "$30-80/night",
    bestFor: "First-timers, street food lovers",
    provider: "bookingcom",
    href: "/vietnam/where-to-stay/hanoi#old-quarter",
  },
  {
    destination: "Ho Chi Minh City",
    area: "District 1",
    priceRange: "$40-120/night",
    bestFor: "Nightlife, convenience",
    provider: "bookingcom",
    href: "/vietnam/where-to-stay/ho-chi-minh-city#district-1",
  },
  {
    destination: "Hoi An",
    area: "Ancient Town",
    priceRange: "$25-60/night",
    bestFor: "Culture, walking access",
    provider: "agoda",
    href: "/vietnam/where-to-stay/hoi-an#ancient-town",
  },
  {
    destination: "Da Nang",
    area: "My Khe Beach",
    priceRange: "$35-100/night",
    bestFor: "Beach lovers, families",
    provider: "agoda",
    href: "/vietnam/where-to-stay/da-nang#my-khe-beach",
  },
  {
    destination: "Phu Quoc",
    area: "Long Beach",
    priceRange: "$50-150/night",
    bestFor: "Resorts, sunsets",
    provider: "bookingcom",
    href: "/vietnam/where-to-stay/phu-quoc#long-beach",
  },
  {
    destination: "Nha Trang",
    area: "Beach Road",
    priceRange: "$30-80/night",
    bestFor: "Nightlife, beach access",
    provider: "agoda",
    href: "/vietnam/where-to-stay/nha-trang#beach-road",
  },
];

export function WhereToStayModule() {
  return (
    <section className="py-12 md:py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Where to Stay in Vietnam
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Quick picks for the best areas to book in each destination
            </p>
          </div>
          <Link
            href="/vietnam/where-to-stay"
            className="hidden md:inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4 md:mt-0"
          >
            Full accommodation guide
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Destination
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Best Area
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Price Range
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Best For
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
                  Learn More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotelPicks.map((pick, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {pick.destination}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{pick.area}</td>
                  <td className="px-6 py-4 text-gray-700">{pick.priceRange}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {pick.bestFor}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={pick.href}
                      className="inline-flex items-center text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
                    >
                      View guide
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {hotelPicks.map((pick, index) => (
            <Link
              key={index}
              href={pick.href}
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{pick.destination}</h3>
                  <p className="text-sm text-emerald-600">{pick.area}</p>
                </div>
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {pick.priceRange}
                </span>
              </div>
              <p className="text-sm text-gray-600">{pick.bestFor}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/vietnam/where-to-stay"
            className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Full accommodation guide
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Disclosure Notice */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          We may earn a commission when you book through our links.{" "}
          <Link href="/legal/disclosure" className="underline hover:text-emerald-600">
            Learn more
          </Link>
        </p>
      </div>
    </section>
  );
}
