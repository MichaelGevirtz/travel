import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextStepCTAProps {
  variant: "destination" | "itinerary" | "guide";
  // For destination pages - link to filtered itineraries
  destinationName?: string;
  destinationSlug?: string;
  // For itinerary pages - featured destination from route
  featuredDestination?: { name: string; slug: string };
  // For guide pages - context-aware target
  guideType?: "visa" | "transport" | "budget" | "timing" | "safety" | "connectivity";
}

const guideConfig: Record<
  string,
  { heading: string; cta: string; href: string }
> = {
  visa: {
    heading: "Ready to start planning?",
    cta: "Explore destinations",
    href: "/vietnam/destinations",
  },
  transport: {
    heading: "Know how to get around?",
    cta: "See sample itineraries",
    href: "/vietnam/itineraries",
  },
  budget: {
    heading: "Got your budget sorted?",
    cta: "Plan with our itineraries",
    href: "/vietnam/itineraries",
  },
  timing: {
    heading: "Know when to visit?",
    cta: "Browse destinations",
    href: "/vietnam/destinations",
  },
  safety: {
    heading: "Ready to explore safely?",
    cta: "View destinations",
    href: "/vietnam/destinations",
  },
  connectivity: {
    heading: "Staying connected?",
    cta: "Continue planning",
    href: "/vietnam/itineraries",
  },
};

export function NextStepCTA({
  variant,
  destinationName,
  destinationSlug,
  featuredDestination,
  guideType,
}: NextStepCTAProps) {
  let heading: string;
  let ctaText: string;
  let href: string;

  switch (variant) {
    case "destination":
      heading = "Plan your visit";
      ctaText = `See itineraries featuring ${destinationName}`;
      href = `/vietnam/itineraries?destination=${destinationSlug}`;
      break;
    case "itinerary":
      heading = "Explore your first stop";
      ctaText = `Discover ${featuredDestination?.name || "this destination"}`;
      href = `/vietnam/destinations/${featuredDestination?.slug || ""}`;
      break;
    case "guide":
      const config = guideConfig[guideType || "visa"];
      heading = config.heading;
      ctaText = config.cta;
      href = config.href;
      break;
    default:
      heading = "Continue planning";
      ctaText = "View itineraries";
      href = "/vietnam/itineraries";
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-8 md:p-10 text-center">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        {heading}
      </h3>
      <Link
        href={href}
        data-cta="primary"
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg group"
      >
        {ctaText}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
