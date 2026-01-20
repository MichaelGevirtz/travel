import Link from "next/link";
import { CheckCircle, RefreshCw, FileText, Users } from "lucide-react";

const trustItems = [
  {
    icon: RefreshCw,
    title: "Updated Monthly",
    description:
      "All guides are reviewed and updated regularly to ensure accuracy.",
  },
  {
    icon: FileText,
    title: "Transparent Disclosure",
    description:
      "We clearly mark affiliate links and explain how we earn commissions.",
  },
  {
    icon: Users,
    title: "Real Experience",
    description:
      "Written by travelers who have actually visited and explored Vietnam.",
  },
  {
    icon: CheckCircle,
    title: "Honest Recommendations",
    description:
      "We only recommend places and services we'd use ourselves.",
  },
];

export function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Trust Vietnam Insider?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our editorial standards ensure you get reliable, unbiased travel information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8">
          <h3 className="font-bold text-gray-900 mb-4">How We Choose Hotels</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                We evaluate hotels based on location convenience, value for money,
                guest reviews, and our own stay experiences. We prioritize
                properties that offer the best balance of quality and price in
                each price category.
              </p>
              <p className="text-sm text-gray-600">
                Our recommendations include affiliate links to Booking.com and
                Agoda. If you book through these links, we earn a small
                commission at no extra cost to you.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Our Selection Criteria:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Location within recommended neighborhoods</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>8.0+ rating on major booking platforms</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Value for money in their category</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Recent positive reviews (within 6 months)</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/legal/disclosure"
              className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Read our full affiliate disclosure →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
