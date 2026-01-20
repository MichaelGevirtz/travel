import type { DestinationCardData } from "@/types";

// Featured destinations for homepage (8 cards as per spec)
export const featuredDestinations: DestinationCardData[] = [
  {
    slug: "ho-chi-minh-city",
    name: "Ho Chi Minh City",
    description:
      "Vietnam's vibrant southern hub combines French colonial charm, buzzing street life, and world-class cuisine. A must-see for first-time visitors.",
    image: "/images/destinations/ho-chi-minh-city.jpg",
    imageAlt: "Ho Chi Minh City skyline with Notre Dame Cathedral",
    region: "south",
    type: "city",
    highlights: [
      { type: "days", text: "3-4 days recommended" },
      { type: "budget", text: "$35-60 per day" },
      { type: "bestFor", text: "Food, history, nightlife" },
    ],
  },
  {
    slug: "hanoi",
    name: "Hanoi",
    description:
      "Vietnam's charming capital blends ancient temples, colonial architecture, and the country's best street food scene. Perfect for culture lovers.",
    image: "/images/destinations/hanoi.jpg",
    imageAlt: "Hoan Kiem Lake in Hanoi Old Quarter",
    region: "north",
    type: "city",
    highlights: [
      { type: "days", text: "3-4 days recommended" },
      { type: "budget", text: "$30-50 per day" },
      { type: "bestFor", text: "Culture, food, history" },
    ],
  },
  {
    slug: "ha-long-bay",
    name: "Ha Long Bay",
    description:
      "UNESCO World Heritage site with thousands of limestone islands rising from emerald waters. Experience overnight cruises and kayaking.",
    image: "/images/destinations/ha-long-bay.jpg",
    imageAlt: "Ha Long Bay limestone karsts at sunset",
    region: "north",
    type: "beach",
    highlights: [
      { type: "days", text: "2-3 days ideal" },
      { type: "budget", text: "$100-200 cruise" },
      { type: "bestFor", text: "Nature, adventure" },
    ],
  },
  {
    slug: "hoi-an",
    name: "Hoi An",
    description:
      "Ancient trading port known for lantern-lit streets, tailor shops, and riverside cafes. A magical blend of history and relaxation.",
    image: "/images/destinations/hoi-an.jpg",
    imageAlt: "Hoi An Ancient Town at night with colorful lanterns",
    region: "central",
    type: "city",
    highlights: [
      { type: "days", text: "2-3 days minimum" },
      { type: "budget", text: "$25-40 per day" },
      { type: "bestFor", text: "Couples, photography" },
    ],
  },
  {
    slug: "da-nang",
    name: "Da Nang",
    description:
      "Modern coastal city with beautiful beaches, the famous Golden Bridge, and easy access to Hoi An and Hue.",
    image: "/images/destinations/da-nang.jpg",
    imageAlt: "Dragon Bridge in Da Nang at night",
    region: "central",
    type: "beach",
    highlights: [
      { type: "days", text: "2-3 days recommended" },
      { type: "budget", text: "$35-70 per day" },
      { type: "bestFor", text: "Beach, families" },
    ],
  },
  {
    slug: "phu-quoc",
    name: "Phu Quoc",
    description:
      "Vietnam's largest island paradise with pristine beaches, luxury resorts, and stunning sunsets over the Gulf of Thailand.",
    image: "/images/destinations/phu-quoc.jpg",
    imageAlt: "Sunset over Phu Quoc beach with fishing boats",
    region: "south",
    type: "beach",
    highlights: [
      { type: "days", text: "3-5 days ideal" },
      { type: "budget", text: "$50-150 per day" },
      { type: "bestFor", text: "Beach, relaxation" },
    ],
  },
  {
    slug: "sapa",
    name: "Sapa",
    description:
      "Mountain town surrounded by terraced rice fields and home to diverse ethnic minorities. Perfect for trekking and cultural immersion.",
    image: "/images/destinations/sapa.jpg",
    imageAlt: "Terraced rice fields in Sapa with mountains",
    region: "north",
    type: "mountain",
    highlights: [
      { type: "days", text: "2-3 days trekking" },
      { type: "budget", text: "$30-60 per day" },
      { type: "bestFor", text: "Trekking, culture" },
    ],
  },
  {
    slug: "nha-trang",
    name: "Nha Trang",
    description:
      "Popular beach resort city with excellent seafood, island hopping tours, and vibrant nightlife along the coastal strip.",
    image: "/images/destinations/nha-trang.jpg",
    imageAlt: "Nha Trang beach and coastline",
    region: "central",
    type: "beach",
    highlights: [
      { type: "days", text: "2-4 days ideal" },
      { type: "budget", text: "$40-80 per day" },
      { type: "bestFor", text: "Beach, nightlife" },
    ],
  },
];

// All destinations (20 as per spec, sorted by SEO opportunity)
export const allDestinations: DestinationCardData[] = [
  ...featuredDestinations,
  {
    slug: "hue",
    name: "Hue",
    description:
      "Former imperial capital with UNESCO-listed citadel, royal tombs, and Vietnam's most refined cuisine. A history lover's dream.",
    image: "/images/destinations/hue.jpg",
    imageAlt: "Imperial City of Hue entrance gate",
    region: "central",
    type: "city",
    highlights: [
      { type: "days", text: "2-3 days recommended" },
      { type: "budget", text: "$25-45 per day" },
      { type: "bestFor", text: "History, food" },
    ],
  },
  {
    slug: "da-lat",
    name: "Da Lat",
    description:
      "Cool highland city with French colonial villas, flower gardens, and adventure activities. Vietnam's honeymoon capital.",
    image: "/images/destinations/da-lat.jpg",
    imageAlt: "Dalat flower gardens and pine forests",
    region: "central",
    type: "mountain",
    highlights: [
      { type: "days", text: "2-3 days ideal" },
      { type: "budget", text: "$30-50 per day" },
      { type: "bestFor", text: "Couples, nature" },
    ],
  },
  {
    slug: "ninh-binh",
    name: "Ninh Binh",
    description:
      "Stunning karst landscapes, ancient temples, and river cruises through Trang An. Known as the 'Ha Long Bay on land'.",
    image: "/images/destinations/ninh-binh.jpg",
    imageAlt: "Trang An river landscape in Ninh Binh",
    region: "north",
    type: "region",
    highlights: [
      { type: "days", text: "1-2 days perfect" },
      { type: "budget", text: "$25-40 per day" },
      { type: "bestFor", text: "Nature, temples" },
    ],
  },
  {
    slug: "mui-ne",
    name: "Mui Ne",
    description:
      "Laid-back beach town famous for red and white sand dunes, kitesurfing, and fresh seafood. Great for adventure seekers.",
    image: "/images/destinations/mui-ne.jpg",
    imageAlt: "Red sand dunes in Mui Ne at sunset",
    region: "south",
    type: "beach",
    highlights: [
      { type: "days", text: "2-3 days ideal" },
      { type: "budget", text: "$35-60 per day" },
      { type: "bestFor", text: "Kitesurfing, dunes" },
    ],
  },
  {
    slug: "phong-nha",
    name: "Phong Nha",
    description:
      "Home to the world's largest caves including Son Doong. A must-visit for adventure travelers and nature enthusiasts.",
    image: "/images/destinations/phong-nha.jpg",
    imageAlt: "Inside Phong Nha cave with formations",
    region: "central",
    type: "region",
    highlights: [
      { type: "days", text: "2-4 days recommended" },
      { type: "budget", text: "$40-100 per day" },
      { type: "bestFor", text: "Caves, adventure" },
    ],
  },
  {
    slug: "mekong-delta",
    name: "Mekong Delta",
    description:
      "Lush river delta region with floating markets, fruit orchards, and authentic rural Vietnamese life.",
    image: "/images/destinations/mekong-delta.jpg",
    imageAlt: "Floating market in the Mekong Delta",
    region: "south",
    type: "region",
    highlights: [
      { type: "days", text: "1-3 days ideal" },
      { type: "budget", text: "$25-50 per day" },
      { type: "bestFor", text: "Culture, markets" },
    ],
  },
  {
    slug: "cat-ba",
    name: "Cat Ba Island",
    description:
      "Adventure hub near Ha Long Bay with hiking, rock climbing, and kayaking. Less crowded alternative to cruise tours.",
    image: "/images/destinations/cat-ba.jpg",
    imageAlt: "Cat Ba Island bay with boats",
    region: "north",
    type: "beach",
    highlights: [
      { type: "days", text: "2-3 days ideal" },
      { type: "budget", text: "$30-50 per day" },
      { type: "bestFor", text: "Adventure, budget" },
    ],
  },
  {
    slug: "ha-giang",
    name: "Ha Giang",
    description:
      "Epic motorbike loop through Vietnam's most dramatic mountain scenery. Challenging but unforgettable adventure.",
    image: "/images/destinations/ha-giang.jpg",
    imageAlt: "Ma Pi Leng Pass in Ha Giang",
    region: "north",
    type: "mountain",
    highlights: [
      { type: "days", text: "3-5 days for loop" },
      { type: "budget", text: "$25-40 per day" },
      { type: "bestFor", text: "Motorbike, adventure" },
    ],
  },
  {
    slug: "quy-nhon",
    name: "Quy Nhon",
    description:
      "Off-the-beaten-path coastal city with beautiful beaches, Cham ruins, and authentic local atmosphere.",
    image: "/images/destinations/quy-nhon.jpg",
    imageAlt: "Quy Nhon beach and coastline",
    region: "central",
    type: "beach",
    highlights: [
      { type: "days", text: "2-3 days ideal" },
      { type: "budget", text: "$25-45 per day" },
      { type: "bestFor", text: "Beach, off-beaten" },
    ],
  },
  {
    slug: "con-dao",
    name: "Con Dao Islands",
    description:
      "Remote island paradise with pristine beaches, excellent diving, and historical significance as former prison colony.",
    image: "/images/destinations/con-dao.jpg",
    imageAlt: "Con Dao island beach with turquoise water",
    region: "south",
    type: "beach",
    highlights: [
      { type: "days", text: "3-5 days ideal" },
      { type: "budget", text: "$60-120 per day" },
      { type: "bestFor", text: "Diving, seclusion" },
    ],
  },
  {
    slug: "vung-tau",
    name: "Vung Tau",
    description:
      "Beach getaway popular with Saigon locals, featuring seafood, the Jesus statue, and easy weekend escape vibes.",
    image: "/images/destinations/vung-tau.jpg",
    imageAlt: "Vung Tau beach with Christ statue on hill",
    region: "south",
    type: "beach",
    highlights: [
      { type: "days", text: "1-2 days perfect" },
      { type: "budget", text: "$30-50 per day" },
      { type: "bestFor", text: "Weekend escape" },
    ],
  },
];
