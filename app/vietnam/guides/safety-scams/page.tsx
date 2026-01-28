import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock, Shield, AlertTriangle, CheckCircle2, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Vietnam Safety Guide 2026 | Scams & Tips",
  description:
    "Stay safe in Vietnam. Common scams to avoid, safety tips, and emergency contacts. What every tourist should know.",
  openGraph: {
    title: "Vietnam Safety Guide 2026 | Scams & Tips",
    description: "Safety tips and common scams to avoid in Vietnam.",
    url: "/vietnam/guides/safety-scams",
  },
};

export default function SafetyScamsGuidePage() {
  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Guides", href: "/vietnam/guides" },
    { label: "Safety Tips" },
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
            Safety & Common Scams
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Vietnam is safe for tourists. A few precautions go a long way.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Overall:</strong> Vietnam is very safe for tourists</li>
            <li><strong>Main risks:</strong> Petty theft, traffic, and tourist scams</li>
            <li><strong>Emergency:</strong> Police 113, Ambulance 115, Fire 114</li>
            <li><strong>Best practice:</strong> Use Grab app for taxis, agree prices upfront</li>
          </ul>
        </div>

        {/* Common Scams */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Scams to Avoid</h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Taxi Meter Tricks</h3>
                  <p className="text-gray-600 mt-1">
                    Some taxis have rigged meters or take long routes. <strong>Solution:</strong> Use Grab app exclusively. Price is fixed before you ride.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Shoe Shine / Massage Offers</h3>
                  <p className="text-gray-600 mt-1">
                    Street vendors offer services then demand high prices. <strong>Solution:</strong> Politely decline and keep walking. Don&apos;t engage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Motorbike Rentals</h3>
                  <p className="text-gray-600 mt-1">
                    Some shops claim damage you didn&apos;t cause. <strong>Solution:</strong> Take photos/video before renting. Use reputable shops recommended by your hotel.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Currency Confusion</h3>
                  <p className="text-gray-600 mt-1">
                    Vietnamese Dong notes look similar. 500,000 and 20,000 are both blue. <strong>Solution:</strong> Check each note carefully. 1 USD ≈ 24,500 VND.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">General Safety Tips</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Traffic:</strong> Look both ways constantly. Motorbikes don&apos;t always stop. Walk slowly and predictably—drivers will go around you.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Bag snatching:</strong> Wear bags cross-body on the building side, not the street side. Keep phones secure.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Food safety:</strong> Eat where locals eat. Busy = fresh ingredients. Avoid ice in drinks at street stalls.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Valuables:</strong> Use hotel safe for passport and extra cash. Carry a photocopy of your passport.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                <strong>Prices:</strong> Always agree on price before services (tours, rides, food). Get it in writing if possible.
              </span>
            </li>
          </ul>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Police</p>
                  <p className="text-red-600 font-bold">113</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Ambulance</p>
                  <p className="text-red-600 font-bold">115</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Fire</p>
                  <p className="text-red-600 font-bold">114</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Tourist Hotline</p>
                  <p className="text-red-600 font-bold">1900 6868</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://vietnam.travel/plan-your-trip/useful-information"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                Vietnam Tourism - Useful Information
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Vietnam.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
              >
                US State Dept - Vietnam Travel Advisory
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
              href="/vietnam/guides/sim-esim"
              className="text-sm bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              SIM & eSIM
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
