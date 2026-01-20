/**
 * Database Enums and Types
 * Shared across models, API routes, and frontend
 */

export const PAGE_STATUS = ["draft", "published", "archived"] as const;
export type PageStatus = (typeof PAGE_STATUS)[number];

export const DEST_TYPES = ["city", "region", "beach", "mountain"] as const;
export type DestinationType = (typeof DEST_TYPES)[number];

export const VN_REGIONS = ["north", "central", "south"] as const;
export type VietnamRegion = (typeof VN_REGIONS)[number];

export const AFF_PROVIDERS = ["bookingcom", "agoda"] as const;
export type AffiliateProvider = (typeof AFF_PROVIDERS)[number];

export const AGENT_TYPES = ["content", "seo", "conversion"] as const;
export type AgentType = (typeof AGENT_TYPES)[number];

export const TASK_PRIORITY = ["high", "medium", "low"] as const;
export type TaskPriority = (typeof TASK_PRIORITY)[number];

export const TASK_STATUS = ["pending", "approved", "rejected", "completed", "failed"] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];

export const AFF_PLACEMENTS = [
  "hero",
  "above_fold",
  "mid_content",
  "hotels_table",
  "inline_card",
  "sidebar",
  "footer",
] as const;
export type AffiliatePlacement = (typeof AFF_PLACEMENTS)[number];

// Helper type for metric tracking
export const IMPACT_METRICS = [
  "ctr",
  "avg_position",
  "conversions",
  "revenue",
  "bounce_rate",
  "time_on_page",
  "pageviews",
] as const;
export type ImpactMetric = (typeof IMPACT_METRICS)[number];

// Region labels for display
export const REGION_LABELS: Record<VietnamRegion, string> = {
  north: "Northern Vietnam",
  central: "Central Vietnam",
  south: "Southern Vietnam",
};

// Destination type labels
export const DEST_TYPE_LABELS: Record<DestinationType, string> = {
  city: "City",
  region: "Region",
  beach: "Beach",
  mountain: "Mountain",
};
