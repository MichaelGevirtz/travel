/**
 * Database Seed Script
 * Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed.ts
 * Or: npx tsx scripts/seed.ts
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Import models
import { PageModel } from "../lib/db/models/Page";
import { SiteConfigModel } from "../lib/db/models/SiteConfig";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env.local");
  process.exit(1);
}

// Sample destination data
const sampleDestinations = [
  {
    slug: "hanoi",
    title: "Hanoi Travel Guide 2025",
    excerpt:
      "Complete guide to Vietnam's charming capital with insider tips on Old Quarter, street food, and day trips.",
    content: `# Hanoi Travel Guide

Hanoi is Vietnam's capital and a city that perfectly blends ancient history with modern development...

## Where to Stay
The Old Quarter is the best area for first-time visitors...

## Things to Do
1. Explore Hoan Kiem Lake
2. Walk through the Old Quarter
3. Visit the Temple of Literature
...`,
    metaTitle: "Hanoi Travel Guide 2025 | Things to Do & Where to Stay",
    metaDescription:
      "Complete Hanoi travel guide with insider tips on Old Quarter, street food, temples, and day trips. Best areas to stay and local recommendations.",
    keywords: ["Hanoi", "Vietnam", "Old Quarter", "street food", "Hoan Kiem Lake"],
    canonicalUrl: "/vietnam/destinations/hanoi",
    status: "published",
    author: "Vietnam Insider",
    destinationType: "city",
    region: "north",
    publishedAt: new Date(),
    contentMeta: {
      readingTime: 12,
      wordCount: 3500,
      imageCount: 15,
      internalLinks: ["ho-chi-minh-city", "ha-long-bay", "sapa"],
      externalLinks: [],
    },
    analytics: {
      views: 12450,
      uniqueVisitors: 9800,
      bounceRate: 0.35,
      avgTimeOnPage: 245,
    },
    searchConsole: {
      impressions: 45000,
      clicks: 1260,
      averagePosition: 8.5,
      ctr: 0.028,
      topQueries: ["hanoi travel guide", "things to do in hanoi", "hanoi vietnam"],
    },
  },
  {
    slug: "ho-chi-minh-city",
    title: "Ho Chi Minh City Travel Guide 2025",
    excerpt:
      "Discover Saigon's best attractions, neighborhoods, and food scene in our comprehensive HCMC guide.",
    content: `# Ho Chi Minh City Travel Guide

Ho Chi Minh City, still called Saigon by locals, is Vietnam's largest and most dynamic city...`,
    metaTitle: "Ho Chi Minh City Guide 2025 | Saigon Travel Tips",
    metaDescription:
      "Complete Ho Chi Minh City travel guide. Best districts, street food, nightlife, day trips, and where to stay in Saigon.",
    keywords: ["Ho Chi Minh City", "Saigon", "Vietnam", "District 1", "Cu Chi Tunnels"],
    canonicalUrl: "/vietnam/destinations/ho-chi-minh-city",
    status: "published",
    author: "Vietnam Insider",
    destinationType: "city",
    region: "south",
    publishedAt: new Date(),
    contentMeta: {
      readingTime: 14,
      wordCount: 4200,
      imageCount: 18,
      internalLinks: ["mekong-delta", "phu-quoc", "mui-ne"],
      externalLinks: [],
    },
    analytics: {
      views: 11200,
      uniqueVisitors: 8900,
      bounceRate: 0.32,
      avgTimeOnPage: 260,
    },
    searchConsole: {
      impressions: 42000,
      clicks: 1134,
      averagePosition: 9.2,
      ctr: 0.027,
      topQueries: ["ho chi minh city guide", "saigon travel", "things to do saigon"],
    },
  },
  {
    slug: "ha-long-bay",
    title: "Ha Long Bay Complete Guide 2025",
    excerpt:
      "Everything you need to know about visiting Ha Long Bay: cruises, costs, best time to visit, and alternatives.",
    content: `# Ha Long Bay Travel Guide

Ha Long Bay is one of Vietnam's most iconic destinations, with thousands of limestone karsts...`,
    metaTitle: "Ha Long Bay Guide 2025 | Cruises, Tips & Best Time",
    metaDescription:
      "Complete Ha Long Bay guide. Compare cruises, find the best time to visit, budget tips, and alternatives like Lan Ha Bay.",
    keywords: ["Ha Long Bay", "Vietnam", "cruise", "limestone karsts", "UNESCO"],
    canonicalUrl: "/vietnam/destinations/ha-long-bay",
    status: "published",
    author: "Vietnam Insider",
    destinationType: "beach",
    region: "north",
    publishedAt: new Date(),
    contentMeta: {
      readingTime: 10,
      wordCount: 3000,
      imageCount: 12,
      internalLinks: ["hanoi", "cat-ba", "ninh-binh"],
      externalLinks: [],
    },
    analytics: {
      views: 9800,
      uniqueVisitors: 7600,
      bounceRate: 0.38,
      avgTimeOnPage: 220,
    },
    searchConsole: {
      impressions: 38000,
      clicks: 988,
      averagePosition: 10.1,
      ctr: 0.026,
      topQueries: ["ha long bay cruise", "ha long bay vietnam", "best ha long bay tour"],
    },
  },
];

// Site config
const siteConfig = {
  siteName: "Vietnam Insider",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultOgImage: "/og-image.jpg",
  contactEmail: "hello@vietnaminsider.com",
  affiliate: {
    bookingcom: {
      partnerId: process.env.BOOKING_PARTNER_ID || "placeholder-partner-id",
      deepLinkBase: "https://www.booking.com",
    },
    agoda: {
      affiliateId: process.env.AGODA_AFFILIATE_ID || "placeholder-affiliate-id",
      cid: "1234567",
    },
  },
  featureFlags: {
    enableAgents: true,
    enableDeals: true,
    enableNewsletter: true,
    enableWhereToStaySplitPages: false,
  },
  security: {
    adminEmails: [process.env.ADMIN_EMAIL || "admin@example.com"],
  },
};

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("✓ Connected to MongoDB\n");

    // Clear existing data (optional - comment out to preserve data)
    console.log("Clearing existing data...");
    await PageModel.deleteMany({});
    await SiteConfigModel.deleteMany({});
    console.log("✓ Cleared existing data\n");

    // Seed site config
    console.log("Seeding site config...");
    await SiteConfigModel.create(siteConfig);
    console.log("✓ Site config created\n");

    // Seed destinations
    console.log("Seeding destination pages...");
    for (const destination of sampleDestinations) {
      await PageModel.create(destination);
      console.log(`  ✓ Created: ${destination.title}`);
    }
    console.log(`\n✓ Created ${sampleDestinations.length} destination pages\n`);

    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

// Run seed
seed();
