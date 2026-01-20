import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Vietnam Insider",
  description:
    "Learn about Vietnam Insider - your trusted source for Vietnam travel guides, itineraries, and honest hotel recommendations. Our mission and editorial standards.",
  openGraph: {
    title: "About Us | Vietnam Insider",
    description:
      "Learn about Vietnam Insider - your trusted source for Vietnam travel guides and honest recommendations.",
    url: "/about",
  },
};

const values = [
  {
    title: "Honest Recommendations",
    description:
      "We only recommend places, hotels, and experiences we'd use ourselves. Every recommendation is based on real experience or thorough research.",
  },
  {
    title: "Transparent Affiliate Disclosure",
    description:
      "We clearly mark all affiliate links and explain how we earn commissions. Your trust matters more than any commission.",
  },
  {
    title: "Regular Updates",
    description:
      "Travel information changes fast. We review and update our guides regularly to ensure accuracy and relevance.",
  },
  {
    title: "Local Insight",
    description:
      "Our content goes beyond surface-level tourist info. We share neighborhood tips, local favorites, and insider knowledge.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-emerald-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Vietnam Insider</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            Your trusted guide to exploring Vietnam, built by travelers who fell
            in love with this incredible country.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Vietnam Insider was created with a simple goal: to help travelers
              experience Vietnam the way we wish we had on our first visit.
            </p>
            <p>
              After spending years exploring Vietnam&apos;s cities, beaches, mountains,
              and hidden corners, we realized that most travel guides either give
              generic advice or push expensive tours without considering what
              independent travelers actually need.
            </p>
            <p>
              We believe that great travel information should help you:
            </p>
            <ul>
              <li>
                <strong>Know where to stay</strong> – not just which hotel, but
                which neighborhood fits your travel style
              </li>
              <li>
                <strong>Build realistic itineraries</strong> – with actual travel
                times, not just a list of attractions
              </li>
              <li>
                <strong>Avoid common mistakes</strong> – from visa issues to common
                scams to packing the wrong clothes
              </li>
              <li>
                <strong>Discover authentic experiences</strong> – beyond the tourist
                traps and into the real Vietnam
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Editorial Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Make Money */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            How We Make Money
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Vietnam Insider is an independent travel resource that earns money
              through affiliate partnerships. When you book hotels through our
              links to Booking.com or Agoda, we earn a small commission at no
              extra cost to you.
            </p>
            <p>
              This affiliate model allows us to keep our content free while
              covering the costs of running this site, research, and updates.
            </p>
            <p>
              <strong>Important:</strong> Affiliate relationships never influence
              our recommendations. We recommend hotels based on location, value,
              and guest reviews – not commission rates. Many hotels we recommend
              don&apos;t have affiliate programs at all.
            </p>
            <p>
              For full details, see our{" "}
              <Link href="/legal/disclosure" className="text-emerald-600 hover:text-emerald-700">
                Affiliate Disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Have questions, suggestions, or feedback? We&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
