// Re-export database types
export type {
  IPage,
  AffiliateLink,
  PageAnalytics,
  PageSearchConsole,
  PageContentMeta,
} from "@/lib/db/models/Page";

export type {
  IAgentTask,
  EstimatedImpact,
  ActualResult,
} from "@/lib/db/models/AgentTask";

export type {
  IAnalyticsDaily,
  DailySources,
  TimeOnPageBuckets,
  CoreWebVitals,
} from "@/lib/db/models/AnalyticsDaily";

export type {
  ISiteConfig,
  FeatureFlags,
  AffiliateConfig,
} from "@/lib/db/models/SiteConfig";

// Re-export enums
export * from "@/lib/db/enums";

// Component-specific types
export interface DestinationHighlight {
  type: 'days' | 'budget' | 'bestFor';
  text: string;
}

export interface DestinationCardData {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: DestinationHighlight[];
  region?: 'north' | 'central' | 'south';
  type?: 'city' | 'beach' | 'mountain' | 'region';
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface GuideCardData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface ItineraryCardData {
  slug: string;
  title: string;
  duration: "1-week" | "2-week" | "3-week";
  days: number;
  season: "spring" | "summer" | "autumn" | "winter";
  description: string;
  image: string;
  regions: ("north" | "central" | "south")[];
  stops: string[];
  pace: "relaxed" | "balanced" | "active";
}

export interface ItineraryFullData extends ItineraryCardData {
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  months: string[];
  internalFlights: number;
  budgetRange: {
    min: number;
    max: number;
    currency: string;
    perDay: boolean;
  };
  route: {
    entryCity: string;
    exitCity: string;
    direction: string;
    stops: {
      slug: string;
      nights: number;
      dayTrips: string[];
    }[];
  };
  faq: { question: string; answer: string }[];
}

export interface HotelRecommendation {
  name: string;
  area: string;
  priceRange: string;
  provider: 'bookingcom' | 'agoda';
  affiliateUrl: string;
  bestFor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface VideoCardData {
  id: string;
  title: string;
  channelName: string;
  description: string;
  duration: string;
  category: "tips" | "guide" | "vlog" | "food";
}
