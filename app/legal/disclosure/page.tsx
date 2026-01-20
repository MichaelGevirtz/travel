import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Vietnam Insider",
  description:
    "Learn how Vietnam Insider earns money through affiliate partnerships and how this affects our recommendations.",
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Affiliate Disclosure
        </h1>

        <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>How We Make Money</h2>
          <p>
            Vietnam Insider is a free travel resource. We earn money through
            affiliate partnerships with travel booking platforms. When you click
            on certain links on our site and make a purchase or booking, we may
            receive a commission at no additional cost to you.
          </p>

          <h2>Our Affiliate Partners</h2>
          <p>We currently partner with:</p>
          <ul>
            <li>
              <strong>Booking.com</strong> - Hotel and accommodation bookings
            </li>
            <li>
              <strong>Agoda</strong> - Hotel and accommodation bookings
            </li>
          </ul>

          <h2>How Affiliate Links Work</h2>
          <p>
            When you click on an affiliate link on our site, a cookie is placed
            on your browser. If you make a booking within a certain time period
            (typically 30 days), we receive a small commission from the booking
            platform.
          </p>
          <p>
            <strong>Important:</strong> You pay the same price whether you use
            our affiliate link or go directly to the booking site. The
            commission comes from the platform, not from you.
          </p>

          <h2>Our Editorial Independence</h2>
          <p>
            We want to be completely transparent: affiliate partnerships do{" "}
            <strong>not</strong> influence our recommendations.
          </p>
          <p>Here&apos;s how we maintain editorial independence:</p>
          <ul>
            <li>
              We recommend hotels and services based on quality, location, and
              value - not commission rates
            </li>
            <li>
              We include options that don&apos;t have affiliate programs when they&apos;re
              the best choice
            </li>
            <li>We never accept payment for positive reviews</li>
            <li>
              We disclose affiliate relationships clearly (look for phrases like
              &quot;affiliate link&quot; or &quot;we may earn a commission&quot;)
            </li>
          </ul>

          <h2>Identifying Affiliate Links</h2>
          <p>Affiliate links on our site are identified in several ways:</p>
          <ul>
            <li>Links to Booking.com or Agoda from hotel recommendations</li>
            <li>Buttons labeled &quot;Book Now&quot; or &quot;Check Prices&quot;</li>
            <li>
              Disclosure statements near recommendations (e.g., &quot;We may earn a
              commission...&quot;)
            </li>
          </ul>

          <h2>Why We Use Affiliate Links</h2>
          <p>
            Running a travel website requires significant time and resources.
            Affiliate partnerships allow us to:
          </p>
          <ul>
            <li>Keep our content free for all visitors</li>
            <li>Invest in research and content updates</li>
            <li>Cover hosting, maintenance, and operational costs</li>
            <li>Continue providing honest, helpful travel advice</li>
          </ul>

          <h2>Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships or how
            we make recommendations, please{" "}
            <Link
              href="/contact"
              className="text-emerald-600 hover:text-emerald-700"
            >
              contact us
            </Link>
            . We&apos;re happy to explain our process.
          </p>

          <p>
            Thank you for supporting Vietnam Insider by using our affiliate
            links!
          </p>
        </div>
      </article>
    </div>
  );
}
