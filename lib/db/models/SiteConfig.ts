import mongoose, { Schema, Model, Document } from "mongoose";

export interface FeatureFlags {
  enableAgents: boolean;
  enableDeals: boolean;
  enableNewsletter: boolean;
  enableWhereToStaySplitPages: boolean;
}

export interface AffiliateConfig {
  bookingcom: {
    partnerId: string;
    deepLinkBase?: string;
  };
  agoda: {
    affiliateId: string;
    cid?: string;
  };
}

export interface ISiteConfig extends Document {
  siteName: string;
  siteUrl: string;
  defaultOgImage: string;
  contactEmail: string;
  affiliate: AffiliateConfig;
  apiKeysEncrypted: {
    claudeApiKeyEnc?: string;
    googleSearchConsoleEnc?: string;
    posthogProjectKeyEnc?: string;
  };
  featureFlags: FeatureFlags;
  security: {
    adminEmails: string[];
    webhookSecretHash?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteConfigSchema = new Schema(
  {
    siteName: { type: String, required: true, maxlength: 80 },
    siteUrl: { type: String, required: true, maxlength: 2000 },
    defaultOgImage: { type: String, required: true, maxlength: 2000 },
    contactEmail: { type: String, required: true, maxlength: 120 },

    affiliate: {
      bookingcom: {
        partnerId: { type: String, required: true, maxlength: 80 },
        deepLinkBase: { type: String, maxlength: 2000 },
      },
      agoda: {
        affiliateId: { type: String, required: true, maxlength: 80 },
        cid: { type: String, maxlength: 80 },
      },
    },

    apiKeysEncrypted: {
      claudeApiKeyEnc: { type: String },
      googleSearchConsoleEnc: { type: String },
      posthogProjectKeyEnc: { type: String },
    },

    featureFlags: {
      enableAgents: { type: Boolean, default: true },
      enableDeals: { type: Boolean, default: true },
      enableNewsletter: { type: Boolean, default: true },
      enableWhereToStaySplitPages: { type: Boolean, default: false },
    },

    security: {
      adminEmails: { type: [String], default: [] },
      webhookSecretHash: { type: String },
    },
  },
  { timestamps: true }
);

export const SiteConfigModel: Model<ISiteConfig> =
  mongoose.models.SiteConfig || mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

// Helper to get or create the single site config
export async function getSiteConfig(): Promise<ISiteConfig> {
  let config = await SiteConfigModel.findOne();

  if (!config) {
    config = await SiteConfigModel.create({
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Vietnam Insider",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      defaultOgImage: "/og-image.jpg",
      contactEmail: process.env.ADMIN_EMAIL || "admin@example.com",
      affiliate: {
        bookingcom: {
          partnerId: process.env.BOOKING_PARTNER_ID || "placeholder",
        },
        agoda: {
          affiliateId: process.env.AGODA_AFFILIATE_ID || "placeholder",
        },
      },
    });
  }

  return config;
}
