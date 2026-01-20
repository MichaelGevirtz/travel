import mongoose, { Schema, Model, Document } from "mongoose";

export interface DailySources {
  organic: number;
  direct: number;
  referral: number;
  social: number;
  breakdown?: Record<string, number>;
}

export interface TimeOnPageBuckets {
  "0-10": number;
  "10-30": number;
  "30-60": number;
  "60-180": number;
  "180+": number;
}

export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
}

export interface IAnalyticsDaily extends Document {
  date: string;
  pageId: mongoose.Types.ObjectId;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  exitRate: number;
  scrollDepth: number[];
  timeOnPageBuckets: TimeOnPageBuckets;
  sources: DailySources;
  affiliateClicks: number;
  affiliateClicksByProvider: Record<string, number>;
  conversions: number;
  revenue: number;
  avgLoadTime: number;
  coreWebVitals: CoreWebVitals;
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsDailySchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: "Page",
      required: true,
      index: true
    },

    // Traffic
    pageViews: { type: Number, default: 0, min: 0 },
    uniqueVisitors: { type: Number, default: 0, min: 0 },
    sessions: { type: Number, default: 0, min: 0 },
    avgSessionDuration: { type: Number, default: 0, min: 0 },

    // Behavior
    bounceRate: { type: Number, default: 0, min: 0, max: 1 },
    exitRate: { type: Number, default: 0, min: 0, max: 1 },
    scrollDepth: { type: [Number], default: [0, 0, 0, 0] },
    timeOnPageBuckets: {
      "0-10": { type: Number, default: 0, min: 0 },
      "10-30": { type: Number, default: 0, min: 0 },
      "30-60": { type: Number, default: 0, min: 0 },
      "60-180": { type: Number, default: 0, min: 0 },
      "180+": { type: Number, default: 0, min: 0 },
    },

    // Sources
    sources: {
      organic: { type: Number, default: 0, min: 0 },
      direct: { type: Number, default: 0, min: 0 },
      referral: { type: Number, default: 0, min: 0 },
      social: { type: Number, default: 0, min: 0 },
      breakdown: { type: Schema.Types.Mixed, default: {} },
    },

    // Conversions
    affiliateClicks: { type: Number, default: 0, min: 0 },
    affiliateClicksByProvider: { type: Schema.Types.Mixed, default: {} },
    conversions: { type: Number, default: 0, min: 0 },
    revenue: { type: Number, default: 0, min: 0 },

    // Performance
    avgLoadTime: { type: Number, default: 0, min: 0 },
    coreWebVitals: {
      lcp: { type: Number, default: 0, min: 0 },
      fid: { type: Number, default: 0, min: 0 },
      cls: { type: Number, default: 0, min: 0 },
    },
  },
  { timestamps: true }
);

AnalyticsDailySchema.index({ date: 1, pageId: 1 }, { unique: true });

export const AnalyticsDailyModel: Model<IAnalyticsDaily> =
  mongoose.models.AnalyticsDaily || mongoose.model<IAnalyticsDaily>("AnalyticsDaily", AnalyticsDailySchema);
