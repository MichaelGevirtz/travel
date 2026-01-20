import type { NavItem } from "@/types";

// Main navigation items - Hick's Law: Exactly 7 items (optimal for decision-making)
export const navItems: NavItem[] = [
  {
    label: "Destinations",
    href: "/vietnam/destinations",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "All Destinations",
        href: "/vietnam/destinations",
        description: "Browse all Vietnam destinations",
      },
      {
        label: "Cities",
        href: "/vietnam/destinations?type=city",
        description: "Hanoi, Ho Chi Minh, Da Nang",
      },
      {
        label: "Beaches",
        href: "/vietnam/destinations?type=beach",
        description: "Phu Quoc, Nha Trang, Mui Ne",
      },
      {
        label: "Mountains",
        href: "/vietnam/destinations?type=mountain",
        description: "Sapa, Ha Giang, Da Lat",
      },
    ],
  },
  {
    label: "Itineraries",
    href: "/vietnam/itineraries",
  },
  {
    label: "Guides",
    href: "/vietnam/guides",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Guides", href: "/vietnam/guides" },
      { label: "Visa Information", href: "/vietnam/guides/visa" },
      { label: "Best Time to Visit", href: "/vietnam/guides/best-time-to-visit" },
      { label: "Transportation", href: "/vietnam/guides/transport" },
      { label: "Budget & Costs", href: "/vietnam/guides/costs-budget" },
    ],
  },
  {
    label: "Where to Stay",
    href: "/vietnam/where-to-stay",
  },
  {
    label: "Blog",
    href: "/vietnam/blog",
  },
  {
    label: "Deals",
    href: "/vietnam/deals",
  },
  {
    label: "About",
    href: "/about",
  },
];

// Footer navigation
export const footerDestinations = [
  { label: "Ho Chi Minh City", href: "/vietnam/destinations/ho-chi-minh-city" },
  { label: "Hanoi", href: "/vietnam/destinations/hanoi" },
  { label: "Da Nang", href: "/vietnam/destinations/da-nang" },
  { label: "Hoi An", href: "/vietnam/destinations/hoi-an" },
  { label: "Phu Quoc", href: "/vietnam/destinations/phu-quoc" },
  { label: "Ha Long Bay", href: "/vietnam/destinations/ha-long-bay" },
  { label: "Sapa", href: "/vietnam/destinations/sapa" },
  { label: "Nha Trang", href: "/vietnam/destinations/nha-trang" },
  { label: "Hue", href: "/vietnam/destinations/hue" },
  { label: "Da Lat", href: "/vietnam/destinations/da-lat" },
];

export const footerGuides = [
  { label: "Visa Information", href: "/vietnam/guides/visa" },
  { label: "SIM & eSIM", href: "/vietnam/guides/sim-esim" },
  { label: "Transportation", href: "/vietnam/guides/transport" },
  { label: "Budget & Costs", href: "/vietnam/guides/costs-budget" },
  { label: "Safety Tips", href: "/vietnam/guides/safety-scams" },
];

export const footerItineraries = [
  { label: "1 Week Itinerary", href: "/vietnam/itineraries/1-week" },
  { label: "2 Week Itinerary", href: "/vietnam/itineraries/2-weeks" },
  { label: "3 Week Itinerary", href: "/vietnam/itineraries/3-weeks" },
];

export const footerLegal = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Affiliate Disclosure", href: "/legal/disclosure" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
];
