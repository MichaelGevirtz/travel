/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Model, Document } from "mongoose";
import { PAGE_STATUS, DEST_TYPES, VN_REGIONS, AFF_PROVIDERS, AFF_PLACEMENTS } from "../enums";
import type { PageStatus, DestinationType, VietnamRegion, AffiliateProvider, AffiliatePlacement } from "../enums";

// Interfaces
export interface AffiliateLink {
  provider: AffiliateProvider;
  url: string;
  placement: AffiliatePlacement;
  anchorText?: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface PageSearchConsole {
  impressions: number;
  clicks: number;
  averagePosition: number;
  ctr: number;
  topQueries: string[];
  lastFetchedAt?: Date;
}

export interface PageAnalytics {
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnPage: number;
  lastAnalyzedAt?: Date;
}

export interface PageContentMeta {
  readingTime: number;
  wordCount: number;
  imageCount: number;
  internalLinks: string[];
  externalLinks: string[];
}

export interface FactToVerify {
  claim: string;
  location: string;
  priority: "high" | "medium" | "low";
  verified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
}

export interface AgentEditHistory {
  iteration: number;
  editorDecision: "approve" | "reject";
  editorScore: number;
  editorSummary: string;
  issues: any[];
  requiredChanges: string[];
  timestamp: Date;
}

export interface AgentWorkflow {
  generatedBy: "agent" | "manual";
  agentIterations: number;
  agentFinalScore: number;
  agentEditHistory: AgentEditHistory[];
  factsToVerify: FactToVerify[];
  generatedAt: Date;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface NearbyDestination {
  slug: string;
  name: string;
  distance: number; // in kilometers
  travelTime: string;
  direction: string; // north, south, east, west, etc.
}

export interface NearestAirport {
  name: string;
  code: string;
  distance: string; // e.g., "35km / 45 minutes"
}

export interface PageGeo {
  coordinates: GeoCoordinates;
  nearestAirport?: NearestAirport;
  distanceFromHanoi?: string;
  distanceFromHCMC?: string;
  nearbyDestinations: NearbyDestination[];
}

export interface IPage extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  status: PageStatus;
  publishedAt?: Date;
  author: string;
  analytics: PageAnalytics;
  searchConsole: PageSearchConsole;
  affiliateLinks: AffiliateLink[];
  contentMeta: PageContentMeta;
  destinationType?: DestinationType;
  region?: VietnamRegion;
  geo?: PageGeo;
  agentWorkflow?: AgentWorkflow;
  createdAt: Date;
  updatedAt: Date;
}

const AffiliateLinkSchema = new Schema(
  {
    provider: { type: String, enum: AFF_PROVIDERS, required: true },
    url: { type: String, required: true, maxlength: 2000 },
    placement: { type: String, enum: AFF_PLACEMENTS, required: true },
    anchorText: { type: String, maxlength: 120 },
    clicks: { type: Number, default: 0, min: 0 },
    conversions: { type: Number, default: 0, min: 0 },
    revenue: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    // Basic
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      maxlength: 160
    },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    excerpt: { type: String, required: true, maxlength: 320 },
    content: { type: String, required: true },

    // SEO
    metaTitle: { type: String, required: true, maxlength: 60 },
    metaDescription: { type: String, required: true, maxlength: 160 },
    keywords: {
      type: [String],
      default: [],
      validate: [(arr: string[]) => arr.length <= 25, 'Maximum 25 keywords allowed']
    },
    canonicalUrl: { type: String, required: true, maxlength: 2000 },
    ogImage: { type: String, maxlength: 2000 },

    // Publishing
    status: {
      type: String,
      enum: PAGE_STATUS,
      required: true,
      default: "draft",
      index: true
    },
    publishedAt: { type: Date },
    author: { type: String, required: true, maxlength: 80 },

    // Analytics (site measured)
    analytics: {
      views: { type: Number, default: 0, min: 0 },
      uniqueVisitors: { type: Number, default: 0, min: 0 },
      bounceRate: { type: Number, default: 0, min: 0, max: 1 },
      avgTimeOnPage: { type: Number, default: 0, min: 0 },
      lastAnalyzedAt: { type: Date },
    },

    // Search Console (imported)
    searchConsole: {
      impressions: { type: Number, default: 0, min: 0 },
      clicks: { type: Number, default: 0, min: 0 },
      averagePosition: { type: Number, default: 0, min: 0 },
      ctr: { type: Number, default: 0, min: 0, max: 1 },
      topQueries: {
        type: [String],
        default: [],
        validate: [(arr: string[]) => arr.length <= 50, 'Maximum 50 queries allowed']
      },
      lastFetchedAt: { type: Date },
    },

    // Affiliate
    affiliateLinks: { type: [AffiliateLinkSchema], default: [] },

    // Content metadata
    contentMeta: {
      readingTime: { type: Number, default: 0, min: 0 },
      wordCount: { type: Number, default: 0, min: 0 },
      imageCount: { type: Number, default: 0, min: 0 },
      internalLinks: {
        type: [String],
        default: [],
        validate: [(arr: string[]) => arr.length <= 300, 'Maximum 300 internal links allowed']
      },
      externalLinks: {
        type: [String],
        default: [],
        validate: [(arr: string[]) => arr.length <= 300, 'Maximum 300 external links allowed']
      },
    },

    // Category
    destinationType: { type: String, enum: DEST_TYPES },
    region: { type: String, enum: VN_REGIONS },

    // Geographic data for Geo SEO
    geo: {
      coordinates: {
        latitude: { type: Number, min: -90, max: 90 },
        longitude: { type: Number, min: -180, max: 180 },
      },
      nearestAirport: {
        name: { type: String, maxlength: 100 },
        code: { type: String, maxlength: 10 },
        distance: { type: String, maxlength: 50 },
      },
      distanceFromHanoi: { type: String, maxlength: 50 },
      distanceFromHCMC: { type: String, maxlength: 50 },
      nearbyDestinations: [
        {
          slug: { type: String, required: true, maxlength: 160 },
          name: { type: String, required: true, maxlength: 100 },
          distance: { type: Number, min: 0 }, // in kilometers
          travelTime: { type: String, maxlength: 50 },
          direction: { type: String, maxlength: 20 },
        },
      ],
    },

    // Agent Workflow (optional - only for agent-generated content)
    agentWorkflow: {
      generatedBy: { type: String, enum: ["agent", "manual"] },
      agentIterations: { type: Number, min: 0, max: 10 },
      agentFinalScore: { type: Number, min: 0, max: 100 },
      agentEditHistory: [
        {
          iteration: { type: Number, min: 1 },
          editorDecision: { type: String, enum: ["approve", "reject"] },
          editorScore: { type: Number, min: 0, max: 100 },
          editorSummary: { type: String },
          issues: { type: Array },
          requiredChanges: { type: [String] },
          timestamp: { type: Date },
        },
      ],
      factsToVerify: [
        {
          claim: { type: String, required: true },
          location: { type: String, required: true },
          priority: { type: String, enum: ["high", "medium", "low"], required: true },
          verified: { type: Boolean, default: false },
          verifiedAt: { type: Date },
          verifiedBy: { type: String },
        },
      ],
      generatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

// Indexes for queries + agents
PageSchema.index({ status: 1, publishedAt: -1 });
PageSchema.index({ destinationType: 1, region: 1 });
PageSchema.index({ "searchConsole.impressions": -1 });
PageSchema.index({ "affiliateLinks.provider": 1 });
PageSchema.index({ "geo.coordinates.latitude": 1, "geo.coordinates.longitude": 1 });

// Note: publishedAt should be set when status changes to 'published' in API routes

export const PageModel: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);
