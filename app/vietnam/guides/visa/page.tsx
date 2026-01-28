import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam Visa Guide 2026 | Requirements & E-Visa",
  description:
    "Complete guide to Vietnam visa requirements. Learn about e-visa, visa exemptions, and how to apply. Updated for 2026.",
  openGraph: {
    title: "Vietnam Visa Guide 2026 | Requirements & E-Visa",
    description: "Everything you need to know about Vietnam visa requirements.",
    url: "/vietnam/guides/visa",
  },
};

export default function VisaGuidePage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "Visa Information" },
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
            Vietnam Visa Guide
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Everything you need to know about entry requirements for Vietnam.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>E-Visa:</strong> Available for 80+ countries, valid 90 days</li>
            <li><strong>Visa-free:</strong> 13 countries get 15-45 day exemptions</li>
            <li><strong>Processing:</strong> E-visa takes 3 business days</li>
            <li><strong>Cost:</strong> $25 USD for e-visa</li>
          </ul>
        </div>

        {/* E-Visa Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vietnam E-Visa</h2>
          <p className="text-gray-700 mb-4">
            The easiest way to visit Vietnam. Apply online through the official government portal.
            Most nationalities qualify for the 90-day single or multiple entry e-visa.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Apply</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            <li>Visit the official Vietnam Immigration portal</li>
            <li>Fill out the application form with passport details</li>
            <li>Upload a passport photo and passport data page</li>
            <li>Pay $25 USD by credit card</li>
            <li>Receive your e-visa via email in 3 business days</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Official Source:</strong>{" "}
              <a
                href="https://evisa.xuatnhapcanh.gov.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 inline-flex items-center gap-1"
              >
                Vietnam Immigration Department
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </section>

        {/* Visa-Free Countries */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visa-Free Entry</h2>
          <p className="text-gray-700 mb-4">
            Some countries don&apos;t need a visa for short stays. Check if you qualify:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">45 Days Visa-Free</h3>
              <p className="text-sm text-gray-600">
                UK, Germany, France, Italy, Spain, Japan, South Korea, and more EU countries
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">15-30 Days</h3>
              <p className="text-sm text-gray-600">
                ASEAN countries, Belarus, and select others
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>US, Canada, Australia:</strong> You need an e-visa or visa on arrival.
              No visa-free entry available.
            </p>
          </div>
        </section>

        {/* Important Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Passport validity:</strong> Must be valid for 6+ months from entry
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Print your e-visa:</strong> Immigration officers may ask for a printed copy
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Entry ports:</strong> E-visa valid at all major airports and land borders
              </span>
            </li>
          </ul>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://evisa.xuatnhapcanh.gov.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam E-Visa Portal
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Official application site</span>
            </li>
            <li>
              <a
                href="https://vietnam.travel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam National Administration of Tourism
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="text-gray-500 text-sm ml-2">- Official tourism board</span>
            </li>
          </ul>
        </section>

        {/* Related Guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vietnam/guides/transport"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Transportation
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
