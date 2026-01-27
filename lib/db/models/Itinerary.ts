import mongoose, { Schema, Model, Document } from "mongoose";
import { PAGE_STATUS, VN_REGIONS } from "../enums";
import type { PageStatus, VietnamRegion } from "../enums";

// Interfaces
export interface ItineraryStop {
  slug: string;
  nights: number;
  dayTrips: string[];
}

export interface ItineraryRoute {
  entryCity: string;
  exitCity: string;
  direction: string;
  stops: ItineraryStop[];
}

export interface ItineraryBudgetRange {
  min: number;
  max: number;
  currency: string;
  perDay: boolean;
}

export interface ItineraryMeta {
  duration: "1-week" | "2-week" | "3-week";
  days: number;
  season: "spring" | "summer" | "autumn" | "winter";
  months: string[];
  regions: VietnamRegion[];
  internalFlights: number;
  pace: "relaxed" | "balanced" | "active";
  budgetRange: ItineraryBudgetRange;
}

export interface ItineraryContentMeta {
  wordCount: number;
  readingTime: number;
  internalLinks: string[];
}

export interface ItineraryFAQ {
  question: string;
  answer: string;
}

export interface ItineraryAgentWorkflow {
  generatedBy: "agent" | "manual";
  generatedAt: Date;
}

export interface IItinerary extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  author: string;
  status: PageStatus;
  publishedAt?: Date;
  itineraryMeta: ItineraryMeta;
  route: ItineraryRoute;
  contentMeta: ItineraryContentMeta;
  faq: ItineraryFAQ[];
  agentWorkflow?: ItineraryAgentWorkflow;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryStopSchema = new Schema(
  {
    slug: { type: String, required: true, maxlength: 160 },
    nights: { type: Number, required: true, min: 0 },
    dayTrips: { type: [String], default: [] },
  },
  { _id: false }
);

const ItinerarySchema = new Schema(
  {
    // Basic
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      maxlength: 160,
    },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    excerpt: { type: String, required: true, maxlength: 320 },
    content: { type: String, required: true },

    // SEO
    metaTitle: { type: String, required: true, maxlength: 70 },
    metaDescription: { type: String, required: true, maxlength: 165 },
    keywords: {
      type: [String],
      default: [],
      validate: [
        (arr: string[]) => arr.length <= 15,
        "Maximum 15 keywords allowed",
      ],
    },
    canonicalUrl: { type: String, required: true, maxlength: 2000 },
    ogImage: { type: String, maxlength: 2000 },

    // Publishing
    author: { type: String, required: true, maxlength: 80 },
    status: {
      type: String,
      enum: PAGE_STATUS,
      required: true,
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date },

    // Itinerary-specific metadata
    itineraryMeta: {
      duration: {
        type: String,
        enum: ["1-week", "2-week", "3-week"],
        required: true,
        index: true,
      },
      days: { type: Number, required: true, min: 1 },
      season: {
        type: String,
        enum: ["spring", "summer", "autumn", "winter"],
        required: true,
        index: true,
      },
      months: { type: [String], default: [] },
      regions: {
        type: [String],
        enum: VN_REGIONS,
        required: true,
      },
      internalFlights: { type: Number, default: 0, min: 0 },
      pace: {
        type: String,
        enum: ["relaxed", "balanced", "active"],
        default: "balanced",
      },
      budgetRange: {
        min: { type: Number, required: true, min: 0 },
        max: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "USD" },
        perDay: { type: Boolean, default: true },
      },
    },

    // Route information
    route: {
      entryCity: { type: String, required: true, maxlength: 100 },
      exitCity: { type: String, required: true, maxlength: 100 },
      direction: { type: String, required: true, maxlength: 50 },
      stops: { type: [ItineraryStopSchema], required: true },
    },

    // Content metadata
    contentMeta: {
      wordCount: { type: Number, default: 0, min: 0 },
      readingTime: { type: Number, default: 0, min: 0 },
      internalLinks: { type: [String], default: [] },
    },

    // FAQ
    faq: [
      {
        question: { type: String, required: true, maxlength: 200 },
        answer: { type: String, required: true, maxlength: 1000 },
      },
    ],

    // Agent workflow
    agentWorkflow: {
      generatedBy: { type: String, enum: ["agent", "manual"] },
      generatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

// Indexes
ItinerarySchema.index({ "itineraryMeta.duration": 1, "itineraryMeta.season": 1 });
ItinerarySchema.index({ status: 1, publishedAt: -1 });

export const ItineraryModel: Model<IItinerary> =
  mongoose.models.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", ItinerarySchema);
