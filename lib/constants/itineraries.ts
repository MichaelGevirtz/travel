import type { ItineraryCardData } from "@/types";

export const allItineraries: ItineraryCardData[] = [
  // 1-Week Itineraries
  {
    slug: "vietnam-1-week-itinerary-spring",
    title: "Vietnam 1-Week Itinerary – Spring 2026",
    duration: "1-week",
    days: 7,
    season: "spring",
    description: "The perfect 7-day introduction to North Vietnam. Hanoi, Ha Long Bay, and Ninh Binh in ideal March-April weather.",
    image: "/images/itineraries/vietnam-1-week-spring.jpg",
    regions: ["north"],
    stops: ["Hanoi", "Ninh Binh", "Ha Long Bay"],
    pace: "balanced",
  },
  {
    slug: "vietnam-1-week-itinerary-summer",
    title: "Vietnam 1-Week Itinerary – Summer 2026",
    duration: "1-week",
    days: 7,
    season: "summer",
    description: "Beat the heat with this North Vietnam summer route. Hanoi, cool Sapa highlands, and Ha Long Bay.",
    image: "/images/itineraries/vietnam-1-week-summer.jpg",
    regions: ["north"],
    stops: ["Hanoi", "Sapa", "Ha Long Bay"],
    pace: "balanced",
  },
  {
    slug: "vietnam-1-week-itinerary-autumn",
    title: "Vietnam 1-Week Itinerary – Autumn 2026",
    duration: "1-week",
    days: 7,
    season: "autumn",
    description: "Experience North Vietnam's golden season. Hanoi, Ninh Binh's harvest fields, and Ha Long Bay.",
    image: "/images/itineraries/vietnam-1-week-autumn.jpg",
    regions: ["north"],
    stops: ["Hanoi", "Ninh Binh", "Ha Long Bay"],
    pace: "relaxed",
  },
  {
    slug: "vietnam-1-week-itinerary-winter",
    title: "Vietnam 1-Week Itinerary – Winter 2026",
    duration: "1-week",
    days: 7,
    season: "winter",
    description: "Escape winter cold with this South Vietnam route. HCMC, Mekong Delta, and Phu Quoc beaches.",
    image: "/images/itineraries/vietnam-1-week-winter.jpg",
    regions: ["south"],
    stops: ["Ho Chi Minh City", "Mekong Delta", "Phu Quoc"],
    pace: "relaxed",
  },

  // 2-Week Itineraries
  {
    slug: "vietnam-2-week-itinerary-spring",
    title: "Vietnam 2-Week Itinerary – Spring 2026",
    duration: "2-week",
    days: 14,
    season: "spring",
    description: "The perfect 14-day Vietnam route for spring. North and Central Vietnam with ideal March-April weather.",
    image: "/images/itineraries/vietnam-2-week-spring.jpg",
    regions: ["north", "central"],
    stops: ["Hanoi", "Ha Long Bay", "Hue", "Hoi An"],
    pace: "balanced",
  },
  {
    slug: "vietnam-2-week-itinerary-summer",
    title: "Vietnam 2-Week Itinerary – Summer 2026",
    duration: "2-week",
    days: 14,
    season: "summer",
    description: "Beat the summer heat with highlands and northern mountains. Hanoi, Sapa, and cool Da Lat.",
    image: "/images/itineraries/vietnam-2-week-summer.jpg",
    regions: ["north", "central"],
    stops: ["Hanoi", "Sapa", "Da Nang", "Da Lat"],
    pace: "balanced",
  },
  {
    slug: "vietnam-2-week-itinerary-autumn",
    title: "Vietnam 2-Week Itinerary – Autumn 2026",
    duration: "2-week",
    days: 14,
    season: "autumn",
    description: "Deep dive into North Vietnam's golden harvest. Ha Giang, Sapa, Ninh Binh, and Ha Long Bay.",
    image: "/images/itineraries/vietnam-2-week-autumn.jpg",
    regions: ["north"],
    stops: ["Hanoi", "Ha Giang", "Sapa", "Ninh Binh", "Ha Long Bay"],
    pace: "balanced",
  },
  {
    slug: "vietnam-2-week-itinerary-winter",
    title: "Vietnam 2-Week Itinerary – Winter 2026",
    duration: "2-week",
    days: 14,
    season: "winter",
    description: "Escape winter cold with Central and South Vietnam. Hoi An's charm and Phu Quoc's beaches.",
    image: "/images/itineraries/vietnam-2-week-winter.jpg",
    regions: ["central", "south"],
    stops: ["Hoi An", "Hue", "Ho Chi Minh City", "Phu Quoc"],
    pace: "relaxed",
  },

  // 3-Week Itineraries
  {
    slug: "vietnam-3-week-itinerary-spring",
    title: "Vietnam 3-Week Itinerary – Spring 2026",
    duration: "3-week",
    days: 21,
    season: "spring",
    description: "The ultimate 21-day Vietnam journey. All three regions in perfect spring weather.",
    image: "/images/itineraries/vietnam-3-week-spring.jpg",
    regions: ["north", "central", "south"],
    stops: ["Hanoi", "Ha Long Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Phu Quoc"],
    pace: "relaxed",
  },
  {
    slug: "vietnam-3-week-itinerary-summer",
    title: "Vietnam 3-Week Itinerary – Summer 2026",
    duration: "3-week",
    days: 21,
    season: "summer",
    description: "South to North summer adventure. Start with beaches, end in cool northern mountains.",
    image: "/images/itineraries/vietnam-3-week-summer.jpg",
    regions: ["north", "central", "south"],
    stops: ["Ho Chi Minh City", "Da Lat", "Hoi An", "Hanoi", "Sapa"],
    pace: "balanced",
  },
  {
    slug: "vietnam-3-week-itinerary-autumn",
    title: "Vietnam 3-Week Itinerary – Autumn 2026",
    duration: "3-week",
    days: 21,
    season: "autumn",
    description: "North and South Vietnam avoiding typhoon season. Golden paddies to tropical beaches.",
    image: "/images/itineraries/vietnam-3-week-autumn.jpg",
    regions: ["north", "south"],
    stops: ["Hanoi", "Sapa", "Ha Long Bay", "Ho Chi Minh City", "Mekong Delta", "Phu Quoc"],
    pace: "relaxed",
  },
  {
    slug: "vietnam-3-week-itinerary-winter",
    title: "Vietnam 3-Week Itinerary – Winter 2026",
    duration: "3-week",
    days: 21,
    season: "winter",
    description: "Escape winter with this sunshine route. Brief Hanoi, charming Hoi An, and 6 nights on Phu Quoc.",
    image: "/images/itineraries/vietnam-3-week-winter.jpg",
    regions: ["north", "central", "south"],
    stops: ["Hanoi", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Phu Quoc"],
    pace: "relaxed",
  },
];

// Helper function to get itinerary by slug
export function getItineraryBySlug(slug: string): ItineraryCardData | undefined {
  return allItineraries.find((i) => i.slug === slug);
}

// Helper function to filter itineraries
export function filterItineraries(options: {
  duration?: string;
  season?: string;
  region?: string;
}): ItineraryCardData[] {
  let filtered = allItineraries;

  if (options.duration) {
    filtered = filtered.filter((i) => i.duration === options.duration);
  }

  if (options.season) {
    filtered = filtered.filter((i) => i.season === options.season);
  }

  if (options.region) {
    filtered = filtered.filter((i) => i.regions.includes(options.region as "north" | "central" | "south"));
  }

  return filtered;
}

// Get itineraries that include a specific destination
export function getItinerariesByDestination(destinationSlug: string): ItineraryCardData[] {
  // Map destination slugs to display names used in stops
  const slugToName: Record<string, string[]> = {
    "hanoi": ["Hanoi"],
    "ho-chi-minh-city": ["Ho Chi Minh City", "HCMC"],
    "hoi-an": ["Hoi An"],
    "da-nang": ["Da Nang"],
    "hue": ["Hue"],
    "ha-long-bay": ["Ha Long Bay"],
    "sapa": ["Sapa"],
    "ninh-binh": ["Ninh Binh"],
    "phu-quoc": ["Phu Quoc"],
    "da-lat": ["Da Lat"],
    "mekong-delta": ["Mekong Delta"],
    "nha-trang": ["Nha Trang"],
    "mui-ne": ["Mui Ne"],
    "con-dao": ["Con Dao"],
    "phong-nha": ["Phong Nha"],
    "quy-nhon": ["Quy Nhon"],
    "vung-tau": ["Vung Tau"],
    "can-tho": ["Can Tho"],
    "cat-ba": ["Cat Ba"],
    "hai-phong": ["Hai Phong"],
  };

  const names = slugToName[destinationSlug] || [destinationSlug];

  return allItineraries.filter((itinerary) =>
    itinerary.stops.some((stop) =>
      names.some((name) => stop.toLowerCase().includes(name.toLowerCase()))
    )
  );
}
