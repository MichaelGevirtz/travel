import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  DollarSign,
  Calendar,
  Users,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout";
import { DestinationCard } from "@/components/destinations";
import { allDestinations } from "@/lib/constants/destinations";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DestinationPageProps {
  params: { slug: string };
}

// Generate static params for all destinations
export function generateStaticParams() {
  return allDestinations.map((dest) => ({
    slug: dest.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const destination = allDestinations.find((d) => d.slug === params.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Travel Guide | Things to Do & Where to Stay`,
    description: `Complete guide to ${destination.name}, Vietnam. Best things to do, where to stay, getting around, costs, and insider tips for your visit.`,
    openGraph: {
      title: `${destination.name} Travel Guide | Vietnam Insider`,
      description: destination.description,
      url: `/vietnam/destinations/${destination.slug}`,
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: destination.imageAlt,
        },
      ],
    },
  };
}

// Fetch published articles for this destination
async function getDestinationArticles(destinationSlug: string) {
  try {
    // In production, use the full URL. For now, call directly
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/content/by-destination?destination=${destinationSlug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching destination articles:", error);
    return [];
  }
}

// Sample FAQ data (would come from database in production)
const sampleFaqs = [
  {
    question: "How many days should I spend here?",
    answer:
      "We recommend 2-4 days to explore the main attractions and get a feel for the local culture. If you want to take day trips or explore more deeply, consider staying 4-5 days.",
  },
  {
    question: "What is the best time to visit?",
    answer:
      "The best time depends on what you want to do. Generally, the dry season (November to April) offers the best weather. However, each destination has its own microclimate - check our detailed weather section above.",
  },
  {
    question: "Is it safe for solo travelers?",
    answer:
      "Vietnam is generally very safe for solo travelers, including women traveling alone. Use normal precautions, watch your belongings in crowded areas, and you'll have a great experience.",
  },
  {
    question: "Do I need to book accommodation in advance?",
    answer:
      "During peak season (December-February and July-August), we recommend booking at least a few days ahead for popular areas. In low season, you can often find good deals on arrival.",
  },
];

export default async function DestinationPage({ params }: DestinationPageProps) {
  const destination = allDestinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  // Fetch published articles for this destination
  const articles = await getDestinationArticles(params.slug);

  // Get related destinations (same region, different destination)
  const relatedDestinations = allDestinations
    .filter((d) => d.region === destination.region && d.slug !== destination.slug)
    .slice(0, 4);

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Destinations", href: "/vietnam/destinations" },
    { label: destination.name },
  ];

  // JSON-LD for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${destination.name} Travel Guide`,
    description: destination.description,
    image: destination.image,
    author: {
      "@type": "Organization",
      name: "Vietnam Insider",
    },
    publisher: {
      "@type": "Organization",
      name: "Vietnam Insider",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/vietnam/destinations/${destination.slug}`,
    },
  };

  // JSON-LD for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sampleFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
          <Image
            src={destination.image}
            alt={destination.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-4">
                <Breadcrumbs items={breadcrumbs} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {destination.type?.charAt(0).toUpperCase()}
                  {destination.type?.slice(1)}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {destination.region?.charAt(0).toUpperCase()}
                  {destination.region?.slice(1)} Vietnam
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {destination.description}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Facts Bar */}
        <section className="bg-white border-b border-gray-200 py-4 sticky top-16 md:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                {destination.highlights.map((highlight, index) => {
                  const icons = {
                    days: Clock,
                    budget: DollarSign,
                    bestFor: Users,
                  };
                  const Icon = icons[highlight.type];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm text-gray-700">{highlight.text}</span>
                    </div>
                  );
                })}
              </div>
              <Link
                href={`/vietnam/where-to-stay/${destination.slug}`}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Where to Stay
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Article Banner (if available) */}
          {articles.length > 0 && (
            <div className="mb-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-white/20 rounded-xl">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <p className="text-emerald-100 text-sm font-medium mb-2">
                    Complete Travel Guide
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {articles[0].title}
                  </h2>
                  <p className="text-emerald-100 mb-6 line-clamp-2">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-emerald-100">
                      <Clock className="h-4 w-4" />
                      <span>{articles[0].contentMeta.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-100">
                      <span>
                        {articles[0].contentMeta.wordCount.toLocaleString()} words
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/vietnam/blog/${articles[0].slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Read Complete Guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Overview
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    {destination.name} is one of Vietnam&apos;s most popular destinations,
                    attracting travelers from around the world. Whether you&apos;re looking
                    for cultural experiences, natural beauty, or culinary adventures,
                    this destination has something for everyone.
                  </p>
                  <p>
                    Located in {destination.region} Vietnam, {destination.name} offers
                    a unique blend of traditional Vietnamese culture and modern amenities.
                    The area is known for its {destination.type === "beach"
                      ? "pristine beaches and water activities"
                      : destination.type === "mountain"
                      ? "stunning mountain scenery and trekking opportunities"
                      : "rich history, vibrant street life, and incredible food scene"}.
                  </p>
                </div>
              </section>

              {/* Things to Do */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Top Things to Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Explore the local markets and street food scene",
                    "Visit historic temples and pagodas",
                    "Take a walking tour of the old town",
                    "Enjoy local cuisine at authentic restaurants",
                    "Experience the nightlife and entertainment",
                    "Day trip to nearby attractions",
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Getting There */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Getting There & Around
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>By Air:</strong> The nearest airport serves domestic and
                    international flights. From the airport, taxis and ride-hailing
                    apps (Grab) are readily available.
                  </p>
                  <p>
                    <strong>By Train:</strong> Vietnam&apos;s train network connects major
                    cities. The journey offers scenic views and is a great way to
                    experience the countryside.
                  </p>
                  <p>
                    <strong>Getting Around:</strong> Within the city, options include
                    taxis, Grab, motorbike rentals, and walking for short distances.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {sampleFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Quick Facts Card */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Region</dt>
                    <dd className="font-medium text-gray-900 capitalize">
                      {destination.region} Vietnam
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Type</dt>
                    <dd className="font-medium text-gray-900 capitalize">
                      {destination.type}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Best For</dt>
                    <dd className="font-medium text-gray-900">
                      {destination.highlights.find((h) => h.type === "bestFor")?.text}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Budget</dt>
                    <dd className="font-medium text-gray-900">
                      {destination.highlights.find((h) => h.type === "budget")?.text}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-bold text-gray-900">Best Time to Visit</h3>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  The ideal time to visit {destination.name} is during the dry season,
                  typically from November to April when you&apos;ll enjoy pleasant weather
                  and fewer crowds.
                </p>
                <Link
                  href="/vietnam/guides/best-time-to-visit"
                  className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
                >
                  Read full weather guide →
                </Link>
              </div>

              {/* Where to Stay CTA */}
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Where to Stay</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our neighborhood guide helps you choose the perfect area to stay
                  in {destination.name}.
                </p>
                <Link
                  href={`/vietnam/where-to-stay/${destination.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  View Accommodation Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Related Guides */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/vietnam/guides/visa"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Vietnam Visa Requirements →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vietnam/guides/transport"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Getting Around Vietnam →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vietnam/guides/costs-budget"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Vietnam Budget Guide →
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                More Destinations in{" "}
                {destination.region?.charAt(0).toUpperCase()}
                {destination.region?.slice(1)} Vietnam
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDestinations.map((dest) => (
                  <DestinationCard key={dest.slug} {...dest} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
