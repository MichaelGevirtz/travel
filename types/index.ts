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
  duration: string;
  description: string;
  image: string;
  highlights: string[];
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
