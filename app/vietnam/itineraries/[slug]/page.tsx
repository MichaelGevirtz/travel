import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Plane,
  DollarSign,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { ItineraryCard } from "@/components/itineraries";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/components/blog/MarkdownComponents";
import { allItineraries } from "@/lib/constants/itineraries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import fs from "fs/promises";
import path from "path";

interface ItineraryPageProps {
  params: { slug: string };
}

// Read itinerary from JSON files
async function getItinerary(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "scripts/generated-itineraries",
      `${slug}.json`
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
}

// Generate static params for all itineraries
export async function generateStaticParams() {
  return allItineraries.map((itinerary) => ({
    slug: itinerary.slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const itinerary = await getItinerary(params.slug);

  if (!itinerary) {
    return {
      title: "Itinerary Not Found",
    };
  }

  return {
    title: itinerary.metaTitle || itinerary.title,
    description: itinerary.metaDescription || itinerary.excerpt,
    keywords: itinerary.keywords,
    openGraph: {
      title: itinerary.metaTitle || itinerary.title,
      description: itinerary.metaDescription || itinerary.excerpt,
      url: `/vietnam/itineraries/${itinerary.slug}`,
      type: "article",
      images: itinerary.ogImage ? [{ url: itinerary.ogImage }] : [],
    },
  };
}

const seasonColors = {
  spring: "bg-green-100 text-green-700 border-green-200",
  summer: "bg-amber-100 text-amber-700 border-amber-200",
  autumn: "bg-orange-100 text-orange-700 border-orange-200",
  winter: "bg-blue-100 text-blue-700 border-blue-200",
};

const seasonLabels = {
  spring: "Spring (Mar-Apr)",
  summer: "Summer (May-Aug)",
  autumn: "Autumn (Sep-Nov)",
  winter: "Winter (Dec-Feb)",
};

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const itinerary = await getItinerary(params.slug);

  if (!itinerary) {
    notFound();
  }

  const { itineraryMeta, route, faq } = itinerary;

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Itineraries", href: "/vietnam/itineraries" },
    { label: itinerary.title },
  ];

  // Get related itineraries (same duration or season)
  const relatedItineraries = allItineraries
    .filter(
      (i) =>
        i.slug !== params.slug &&
        (i.duration === itineraryMeta.duration || i.season === itineraryMeta.season)
    )
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-0"
            >
              {itineraryMeta.days} Days
            </Badge>
            <Badge
              variant="secondary"
              className={`border ${seasonColors[itineraryMeta.season as keyof typeof seasonColors]}`}
            >
              {seasonLabels[itineraryMeta.season as keyof typeof seasonLabels]}
            </Badge>
            {itineraryMeta.regions.map((region: string) => (
              <Badge
                key={region}
                variant="secondary"
                className="bg-white/20 text-white border-0 capitalize"
              >
                {region} Vietnam
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {itinerary.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-emerald-100 mb-8">
            {itinerary.excerpt}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-emerald-100">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{itinerary.contentMeta?.readingTime || 5} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>
                {itineraryMeta.internalFlights} internal flight
                {itineraryMeta.internalFlights !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                ${itineraryMeta.budgetRange.min}-{itineraryMeta.budgetRange.max}
                /day
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick Facts Bar */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Route Preview */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">
                {route.stops.map((s: any) => s.slug.replace(/-/g, " ")).join(" → ")}
              </span>
            </div>

            {/* CTA */}
            <div className="text-sm text-gray-600 capitalize">
              {itineraryMeta.pace} pace
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/vietnam/itineraries"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            All Itineraries
          </Link>

          {/* Route Overview Card */}
          <div className="mb-12 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Your Route
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {route.stops.map((stop: any, index: number) => (
                <div key={stop.slug} className="flex items-center gap-3">
                  <div className="text-center">
                    <Link
                      href={`/vietnam/destinations/${stop.slug}`}
                      className="font-medium text-emerald-700 hover:text-emerald-800 capitalize"
                    >
                      {stop.slug.replace(/-/g, " ")}
                    </Link>
                    <div className="text-xs text-gray-500">
                      {stop.nights} night{stop.nights !== 1 ? "s" : ""}
                    </div>
                  </div>
                  {index < route.stops.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Render Markdown */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown components={markdownComponents}>
              {itinerary.content}
            </ReactMarkdown>
          </div>

          {/* FAQ Section */}
          {faq && faq.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item: any, index: number) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-gray-900">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Related Itineraries */}
          {relatedItineraries.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Itineraries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItineraries.map((related) => (
                  <ItineraryCard key={related.slug} {...related} />
                ))}
              </div>
            </div>
          )}

          {/* Back to All */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/vietnam/itineraries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse All Itineraries
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: itinerary.title,
            description: itinerary.excerpt,
            touristType: "Leisure traveler",
            itinerary: {
              "@type": "ItemList",
              numberOfItems: route.stops.length,
              itemListElement: route.stops.map((stop: any, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "TouristDestination",
                  name: stop.slug.replace(/-/g, " "),
                },
              })),
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item: any) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}
    </article>
  );
}
