import Link from "next/link";
import {
  footerDestinations,
  footerGuides,
  footerItineraries,
  footerLegal,
} from "@/lib/constants/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
            >
              <span className="text-emerald-400">Vietnam</span>
              <span> Insider</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Your trusted guide to Vietnam travel. Curated itineraries, honest
              hotel recommendations, and insider tips from years of exploring
              this beautiful country.
            </p>
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                Updated: January 2026
              </p>
            </div>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Top Destinations
            </h3>
            <ul className="space-y-2">
              {footerDestinations.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Destinations */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              More Places
            </h3>
            <ul className="space-y-2">
              {footerDestinations.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Travel Guides
            </h3>
            <ul className="space-y-2">
              {footerGuides.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 mt-6">
              Itineraries
            </h3>
            <ul className="space-y-2">
              {footerItineraries.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Vietnam Insider. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/legal/disclosure"
                className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Affiliate Disclosure
              </Link>
              <Link
                href="/legal/privacy"
                className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center md:text-left">
            This site contains affiliate links. We may earn a commission when you
            book through our links, at no extra cost to you.{" "}
            <Link href="/legal/disclosure" className="underline hover:text-emerald-400">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
