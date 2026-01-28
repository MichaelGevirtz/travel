import { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, Bell, Hotel } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";
import { allDestinations } from "@/lib/constants/destinations";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatSlugToTitle(slug: string): string {
  // Check if it matches a known destination
  const destination = allDestinations.find((d) => d.slug === slug);
  if (destination) {
    return destination.name;
  }

  // Fallback to formatting the slug
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = formatSlugToTitle(slug);

  return {
    title: `Where to Stay in ${title} - Coming Soon | Vietnam Insider`,
    description: `Our accommodation guide for ${title} is coming soon. Discover the best hotels, hostels, and places to stay.`,
  };
}

export default async function WhereToStayComingSoonPage({ params }: Props) {
  const { slug } = await params;
  const destinationName = formatSlugToTitle(slug);

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Destinations", href: "/vietnam/destinations" },
    { label: destinationName, href: `/vietnam/destinations/${slug}` },
    { label: "Where to Stay" },
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
            <span>Coming Soon</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Where to Stay in {destinationName}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Our accommodation guide for {destinationName} is being prepared.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
            <Hotel className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Accommodation Guide Coming Soon
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We&apos;re researching the best places to stay in {destinationName}.
            In the meantime, explore the destination or check our blog for tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/vietnam/destinations/${slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {destinationName}
            </Link>
            <Link
              href="/vietnam/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Bell className="h-4 w-4" />
              Browse Blog
            </Link>
          </div>
        </div>

        {/* Tips Section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Booking Tips for {destinationName}
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Book 2-4 weeks ahead during peak season (Nov-Apr)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Check reviews on Booking.com and Agoda for best deals</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Hostels typically cost $8-15/night, hotels $25-80/night</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Look for properties with free breakfast included</span>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
