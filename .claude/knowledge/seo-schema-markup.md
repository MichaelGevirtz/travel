# SEO Schema Markup Guide

> JSON-LD structured data patterns for travel articles. Use these templates to enable rich results in Google Search.

## Why Schema Markup Matters

- Enables rich snippets in search results (stars, images, FAQs)
- Helps Google understand content context
- Improves click-through rates
- Essential for AI/LLM content discovery
- Core schema types (Article, Breadcrumb, FAQ) remain supported in 2025/2026

## Supported Schema Types for Travel Articles

| Schema Type | Use Case | Rich Result |
|-------------|----------|-------------|
| Article / BlogPosting | All articles | Enhanced title, image, date |
| BreadcrumbList | Navigation path | Breadcrumb trail in SERP |
| FAQPage | FAQ sections | Expandable Q&A in SERP |
| HowTo | Step-by-step guides | Step cards in SERP |
| Place | Destination info | Knowledge panel data |
| TouristDestination | Destination guides | Enhanced geo results |
| TouristAttraction | Individual attractions | POI rich results |
| City / AdministrativeArea | City/region pages | Geographic entity |
| Organization | Publisher info | Brand knowledge panel |

---

## Article Schema

Use for all blog posts and destination guides.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "description": "{{metaDescription}}",
  "image": [
    "{{imageUrl1x1}}",
    "{{imageUrl4x3}}",
    "{{imageUrl16x9}}"
  ],
  "datePublished": "{{publishedAt}}",
  "dateModified": "{{updatedAt}}",
  "author": {
    "@type": "Person",
    "name": "{{authorName}}",
    "url": "{{authorUrl}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vietnam Insider",
    "url": "https://vietnaminsider.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vietnaminsider.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{canonicalUrl}}"
  },
  "wordCount": {{wordCount}},
  "articleSection": "{{category}}",
  "keywords": "{{keywords}}"
}
```

### BlogPosting Variant

For blog-style articles (more casual content):

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{title}}",
  "description": "{{metaDescription}}",
  "image": "{{heroImageUrl}}",
  "datePublished": "{{publishedAt}}",
  "dateModified": "{{updatedAt}}",
  "author": {
    "@type": "Person",
    "name": "{{authorName}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vietnam Insider"
  }
}
```

### Required Properties

| Property | Required | Notes |
|----------|----------|-------|
| headline | Yes | Max 110 characters (truncated in rich results) |
| image | Recommended | Multiple sizes: 1x1, 4x3, 16x9 (min 50K pixels) |
| datePublished | Recommended | ISO 8601 format |
| dateModified | Recommended | ISO 8601 format |
| author | Recommended | Person or Organization with name and url |

---

## BreadcrumbList Schema

Essential for navigation and site hierarchy signals.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://vietnaminsider.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Vietnam",
      "item": "https://vietnaminsider.com/vietnam"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Destinations",
      "item": "https://vietnaminsider.com/vietnam/destinations"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "{{destinationName}}",
      "item": "{{canonicalUrl}}"
    }
  ]
}
```

### Implementation Notes

- Last item should NOT have an "item" property (current page)
- Position starts at 1, not 0
- Match breadcrumb names to actual navigation labels

---

## FAQPage Schema

Enables expandable FAQ rich results. High-value for featured snippets.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a trip to Hanoi cost per day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget travelers can expect to spend $25-35 per day in Hanoi, covering accommodation, street food, and local transport. Mid-range travelers should budget $50-80 per day for private hotel rooms and sit-down restaurants. Luxury travelers can spend $150+ per day."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best time to visit Hanoi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best time to visit Hanoi is from October to December and March to April. These months offer pleasant temperatures (15-25°C), low rainfall, and fewer crowds than peak season. Avoid June-August (hot and humid) and January-February (cold and drizzly)."
      }
    }
  ]
}
```

### Best Practices

- 3-5 questions per page (Google may not show all)
- Questions should match actual search queries
- Answers should be concise but complete (40-100 words)
- Don't use FAQ schema for non-FAQ content (spam risk)
- Answer must directly address the question

---

## HowTo Schema

For step-by-step guides (e.g., "How to Get from Hanoi to Ha Long Bay").

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get from Hanoi to Ha Long Bay",
  "description": "Complete guide to traveling from Hanoi to Ha Long Bay by bus, shuttle, or tour.",
  "totalTime": "PT4H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "15-50"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Book transportation",
      "text": "Book a shuttle bus, tour, or private car. Budget option: Local bus from My Dinh station ($8). Convenient option: Hotel shuttle ($15-20). Premium option: Private car ($50-80).",
      "image": "{{stepImageUrl}}"
    },
    {
      "@type": "HowToStep",
      "name": "Depart from Hanoi",
      "text": "Most shuttles depart between 7-8 AM from Hanoi Old Quarter hotels. The journey takes 3.5-4 hours depending on traffic.",
      "image": "{{stepImageUrl}}"
    },
    {
      "@type": "HowToStep",
      "name": "Arrive at Ha Long Bay",
      "text": "Shuttles drop you at Tuan Chau Harbor or Bai Chay Tourist Wharf. From there, board your cruise or explore the town.",
      "image": "{{stepImageUrl}}"
    }
  ]
}
```

### When to Use

- "How to..." articles
- Transportation guides
- Visa application guides
- Booking process guides

---

## Place Schema

For destination-specific information.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Hanoi",
  "description": "Capital city of Vietnam, known for its centuries-old architecture, rich culture, and vibrant street food scene.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressRegion": "Hanoi"
  },
  "image": "{{destinationImageUrl}}",
  "url": "{{canonicalUrl}}"
}
```

---

## TouristDestination Schema

**Essential for travel destination pages.** Provides rich geographic signals to Google.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Hanoi",
  "description": "Vietnam's capital city, a vibrant mix of ancient temples, French colonial architecture, and world-famous street food.",
  "url": "{{canonicalUrl}}",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "containedInPlace": {
    "@type": "Country",
    "name": "Vietnam",
    "sameAs": "https://en.wikipedia.org/wiki/Vietnam"
  },
  "touristType": ["Cultural tourism", "Food tourism", "Historical tourism"],
  "includesAttraction": [
    {
      "@type": "TouristAttraction",
      "name": "Hoan Kiem Lake",
      "sameAs": "https://en.wikipedia.org/wiki/Hoan_Kiem_Lake"
    },
    {
      "@type": "TouristAttraction",
      "name": "Temple of Literature",
      "sameAs": "https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi"
    }
  ],
  "image": "{{heroImageUrl}}",
  "sameAs": [
    "https://en.wikipedia.org/wiki/Hanoi",
    "https://www.wikidata.org/wiki/Q1858"
  ]
}
```

### Properties

| Property | Required | Description |
|----------|----------|-------------|
| name | Yes | Destination name |
| geo | Yes | GeoCoordinates with lat/lng |
| description | Recommended | Brief description (150-300 chars) |
| containedInPlace | Recommended | Parent geographic entity |
| touristType | Recommended | Types of tourism available |
| includesAttraction | Recommended | Notable attractions |
| sameAs | Recommended | Wikipedia/Wikidata links for entity matching |

---

## TouristAttraction Schema

For individual attractions, landmarks, and points of interest.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Temple of Literature",
  "description": "Vietnam's first national university, built in 1070, featuring traditional Vietnamese architecture and peaceful gardens.",
  "url": "{{attractionUrl}}",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0294,
    "longitude": 105.8355
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "58 Quoc Tu Giam Street",
    "addressLocality": "Hanoi",
    "addressRegion": "Dong Da District",
    "addressCountry": "VN"
  },
  "openingHours": "Tu-Su 08:00-17:00",
  "priceRange": "$2-3",
  "image": "{{attractionImageUrl}}",
  "containedInPlace": {
    "@type": "City",
    "name": "Hanoi"
  },
  "sameAs": "https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi",
  "isAccessibleForFree": false,
  "publicAccess": true
}
```

### Attraction Types

Use specific types when applicable:

| Type | Use For |
|------|---------|
| TouristAttraction | Generic attractions |
| Museum | Museums |
| Park | Parks, gardens |
| Beach | Beaches |
| LandmarksOrHistoricalBuildings | Historical sites |
| Temple | Temples, pagodas |
| Mountain | Mountains, peaks |
| NaturalFeature | Natural landmarks (Ha Long Bay) |

---

## City Schema

For city destination pages.

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "City",
  "name": "Hanoi",
  "alternateName": ["Ha Noi", "Thang Long"],
  "description": "Capital and second-largest city of Vietnam, located in the northern region.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": "Northern Vietnam",
    "containedInPlace": {
      "@type": "Country",
      "name": "Vietnam"
    }
  },
  "population": {
    "@type": "QuantitativeValue",
    "value": 8500000,
    "unitText": "people"
  },
  "sameAs": [
    "https://en.wikipedia.org/wiki/Hanoi",
    "https://www.wikidata.org/wiki/Q1858"
  ],
  "image": "{{cityImageUrl}}",
  "url": "{{canonicalUrl}}"
}
```

---

## AdministrativeArea Schema

For region pages (North Vietnam, Central Vietnam, etc.).

### Template

```json
{
  "@context": "https://schema.org",
  "@type": "AdministrativeArea",
  "name": "Northern Vietnam",
  "alternateName": "North Vietnam",
  "description": "The northern region of Vietnam, home to Hanoi, Ha Long Bay, Sapa, and Ninh Binh.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.5,
    "longitude": 105.5
  },
  "containedInPlace": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "containsPlace": [
    {
      "@type": "City",
      "name": "Hanoi",
      "sameAs": "https://en.wikipedia.org/wiki/Hanoi"
    },
    {
      "@type": "TouristDestination",
      "name": "Ha Long Bay",
      "sameAs": "https://en.wikipedia.org/wiki/Ha_Long_Bay"
    },
    {
      "@type": "TouristDestination",
      "name": "Sapa",
      "sameAs": "https://en.wikipedia.org/wiki/Sa_Pa"
    }
  ],
  "url": "{{regionUrl}}"
}
```

---

## Combined Geo Schema for Destination Pages

Use @graph to combine multiple geo schemas on destination pages:

### Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristDestination",
      "@id": "{{canonicalUrl}}#destination",
      "name": "Hanoi",
      "description": "{{metaDescription}}",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.0285,
        "longitude": 105.8542
      },
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Northern Vietnam",
        "containedInPlace": {
          "@type": "Country",
          "name": "Vietnam"
        }
      },
      "touristType": ["Cultural", "Food", "Historical"],
      "sameAs": "https://en.wikipedia.org/wiki/Hanoi"
    },
    {
      "@type": "Article",
      "headline": "{{title}}",
      "description": "{{metaDescription}}",
      "datePublished": "{{publishedAt}}",
      "dateModified": "{{updatedAt}}",
      "author": {
        "@type": "Person",
        "name": "{{authorName}}"
      },
      "about": {
        "@id": "{{canonicalUrl}}#destination"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vietnaminsider.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Vietnam",
          "item": "https://vietnaminsider.com/vietnam"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "North",
          "item": "https://vietnaminsider.com/vietnam/north"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Hanoi"
        }
      ]
    }
  ]
}
```

---

## Vietnam Destinations Reference Data

Quick reference for geo coordinates:

### North Vietnam
| Destination | Latitude | Longitude | Type |
|-------------|----------|-----------|------|
| Hanoi | 21.0285 | 105.8542 | City |
| Ha Long Bay | 20.9101 | 107.1839 | NaturalFeature |
| Sapa | 22.3363 | 103.8438 | TouristDestination |
| Ninh Binh | 20.2506 | 105.9745 | TouristDestination |

### Central Vietnam
| Destination | Latitude | Longitude | Type |
|-------------|----------|-----------|------|
| Da Nang | 16.0544 | 108.2022 | City |
| Hoi An | 15.8801 | 108.3380 | TouristDestination |
| Hue | 16.4637 | 107.5909 | City |
| Phong Nha | 17.5914 | 106.2834 | Park |

### South Vietnam
| Destination | Latitude | Longitude | Type |
|-------------|----------|-----------|------|
| Ho Chi Minh City | 10.8231 | 106.6297 | City |
| Phu Quoc | 10.2899 | 103.9840 | TouristDestination |
| Mui Ne | 10.9330 | 108.2872 | Beach |
| Mekong Delta | 10.0452 | 105.7469 | TouristDestination |
| Da Lat | 11.9404 | 108.4583 | City |
| Can Tho | 10.0452 | 105.7469 | City |

---

## Combining Multiple Schemas

Use @graph to include multiple schema types on one page:

### Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Hanoi Travel Guide 2025",
      "datePublished": "2025-01-15T08:00:00+07:00",
      "author": {
        "@type": "Person",
        "name": "Vietnam Travel Team"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vietnaminsider.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hanoi Travel Guide"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Hanoi safe for tourists?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Hanoi is generally very safe for tourists. Petty theft like pickpocketing can occur in crowded areas, so keep valuables secure. Traffic is the biggest hazard - cross streets slowly and confidently."
          }
        }
      ]
    }
  ]
}
```

---

## Implementation in Next.js

### Component Example

```tsx
// components/seo/ArticleSchema.tsx
interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  imageUrl: string;
  canonicalUrl: string;
  wordCount: number;
  keywords: string[];
}

export function ArticleSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  imageUrl,
  canonicalUrl,
  wordCount,
  keywords,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Vietnam Insider",
      logo: {
        "@type": "ImageObject",
        url: "https://vietnaminsider.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    wordCount,
    keywords: keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Validation

Always validate schema markup before publishing:

1. **Rich Results Test**: https://search.google.com/test/rich-results
   - Tests for Google-specific rich result eligibility

2. **Schema Markup Validator**: https://validator.schema.org/
   - Tests general schema.org compliance

### Common Errors

| Error | Fix |
|-------|-----|
| Missing required property | Add the property or use recommended alternative |
| Invalid date format | Use ISO 8601: "2025-01-15T08:00:00+07:00" |
| Image too small | Use images with minimum 50K pixels |
| Headline too long | Keep under 110 characters |

---

## Sources

- [Google Article Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Structured Data Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Schema.org](https://schema.org)
