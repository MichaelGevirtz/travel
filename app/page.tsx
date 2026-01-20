import {
  Hero,
  ValueProposition,
  IntentTiles,
  ItinerariesRow,
  GuidesSection,
  WhereToStayModule,
  TrustSection,
} from "@/components/home";
import { DestinationGrid } from "@/components/destinations";
import { Newsletter } from "@/components/common";
import { featuredDestinations } from "@/lib/constants/destinations";

// Homepage FAQ for SEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best time to visit Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best time to visit Vietnam depends on the region. For the north (Hanoi, Ha Long Bay), visit from October to April. For central Vietnam (Hoi An, Da Nang), February to August is ideal. The south (Ho Chi Minh City, Mekong Delta) is best from December to April during the dry season.",
      },
    },
    {
      "@type": "Question",
      name: "How many days do I need in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend at least 10-14 days to explore Vietnam's highlights. A week allows you to see 2-3 destinations, while 2-3 weeks lets you travel from north to south at a comfortable pace. Our sample itineraries help you plan the perfect trip length.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a visa for Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most visitors need a visa for Vietnam. Citizens of many countries can apply for an e-visa online, which allows stays of up to 90 days. Some nationalities qualify for visa exemption for shorter stays. Check our visa guide for the latest requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Is Vietnam safe for tourists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vietnam is generally very safe for tourists. Violent crime against travelers is rare. The main concerns are petty theft (watch your belongings in crowded areas) and traffic safety. Read our safety guide for tips on avoiding common scams.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to travel in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vietnam offers excellent value for travelers. Budget travelers can get by on $25-40 per day, mid-range travelers typically spend $50-100 per day, and luxury experiences start around $150+ per day. Costs vary by region, with cities generally being more expensive than rural areas.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Intent Tiles */}
      <IntentTiles />

      {/* Featured Destinations (8 cards) */}
      <DestinationGrid
        destinations={featuredDestinations}
        title="Top Destinations in Vietnam"
        subtitle="From bustling cities to serene beaches, discover where to go in Vietnam"
      />

      {/* Sample Itineraries */}
      <ItinerariesRow />

      {/* Where to Stay Module */}
      <WhereToStayModule />

      {/* Essential Guides */}
      <GuidesSection />

      {/* Value Proposition */}
      <ValueProposition />

      {/* Trust Section */}
      <TrustSection />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
