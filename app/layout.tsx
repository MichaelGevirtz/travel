import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Vietnam Insider | Complete Vietnam Travel Guide 2025",
    template: "%s | Vietnam Insider",
  },
  description:
    "Your complete guide to Vietnam travel. Insider tips, detailed itineraries, and honest hotel recommendations from 7+ years exploring Vietnam.",
  keywords: [
    "Vietnam travel",
    "Vietnam guide",
    "Vietnam itinerary",
    "Vietnam hotels",
    "Hanoi",
    "Ho Chi Minh City",
    "Ha Long Bay",
    "Hoi An",
    "Vietnam destinations",
    "Vietnam travel tips",
  ],
  authors: [{ name: "Vietnam Insider" }],
  creator: "Vietnam Insider",
  publisher: "Vietnam Insider",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Vietnam Insider",
    title: "Vietnam Insider | Complete Vietnam Travel Guide 2025",
    description:
      "Your complete guide to Vietnam travel. Insider tips, detailed itineraries, and honest hotel recommendations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vietnam Insider - Your Complete Vietnam Travel Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnam Insider | Complete Vietnam Travel Guide 2025",
    description:
      "Your complete guide to Vietnam travel. Insider tips, detailed itineraries, and honest hotel recommendations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vietnam Insider",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vietnaminsider.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/logo.png`,
  description:
    "Your complete guide to Vietnam travel with insider tips, itineraries, and hotel recommendations.",
  sameAs: [],
};

// JSON-LD for WebSite with SearchAction
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vietnam Insider",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vietnaminsider.com",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
