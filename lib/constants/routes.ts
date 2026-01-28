/**
 * Route Registry - All valid routes in the application
 * Used by link validation tests to catch broken links
 */

import { allDestinations } from "./destinations";

// Static routes that always exist
export const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/legal/disclosure",
  "/legal/privacy",
  "/legal/terms",
  "/vietnam",
  "/vietnam/destinations",
  "/vietnam/itineraries",
  "/vietnam/blog",
  "/vietnam/guides",
  // Known guide pages
  "/vietnam/guides/visa",
  "/vietnam/guides/best-time-to-visit",
  "/vietnam/guides/transport",
  "/vietnam/guides/costs-budget",
  "/vietnam/guides/sim-esim",
  "/vietnam/guides/safety-scams",
  "/vietnam/tips",
] as const;

// Dynamic route patterns (regex)
export const dynamicRoutePatterns = [
  // Destinations - any slug from allDestinations
  /^\/vietnam\/destinations\/[\w-]+$/,
  // Itineraries - specific slugs
  /^\/vietnam\/itineraries\/[\w-]+$/,
  // Blog posts
  /^\/vietnam\/blog\/[\w-]+$/,
  // Guides - catch-all (shows Coming Soon for unknown)
  /^\/vietnam\/guides\/[\w-]+$/,
  // Where to stay - catch-all (shows Coming Soon)
  /^\/vietnam\/where-to-stay\/[\w-]+$/,
  // Query params are allowed on destinations
  /^\/vietnam\/destinations\?/,
] as const;

// Known destination slugs for validation
export const destinationSlugs = allDestinations.map((d) => d.slug);

// Known itinerary slugs
export const itinerarySlugs = [
  "vietnam-1-week-itinerary-winter",
  "vietnam-2-week-itinerary-spring",
  "vietnam-3-week-itinerary-autumn",
  "1-week",
  "2-weeks",
  "3-weeks",
];

// Known guide slugs (pages that actually exist)
export const guideSlugs = [
  "visa",
  "best-time-to-visit",
  "transport",
  "costs-budget",
  "sim-esim",
  "safety-scams",
];

/**
 * Check if a route is valid (exists in the app)
 * @param href - The href to validate
 * @returns true if route exists, false if it would 404
 */
export function isValidRoute(href: string): boolean {
  // Remove query params for pattern matching
  const [path, query] = href.split("?");

  // Check static routes
  if (staticRoutes.includes(path as (typeof staticRoutes)[number])) {
    return true;
  }

  // Check dynamic patterns
  for (const pattern of dynamicRoutePatterns) {
    if (pattern.test(path) || pattern.test(href)) {
      return true;
    }
  }

  // External links are valid
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return true;
  }

  // Anchor links are valid
  if (href.startsWith("#")) {
    return true;
  }

  return false;
}

/**
 * Check if a route would show real content (not Coming Soon)
 * @param href - The href to validate
 * @returns true if route has actual content
 */
export function hasActualContent(href: string): boolean {
  const [path] = href.split("?");

  // Static routes always have content
  if (staticRoutes.includes(path as (typeof staticRoutes)[number])) {
    return true;
  }

  // Check destination pages
  const destMatch = path.match(/^\/vietnam\/destinations\/([\w-]+)$/);
  if (destMatch && destinationSlugs.includes(destMatch[1])) {
    return true;
  }

  // Check itinerary pages
  const itinMatch = path.match(/^\/vietnam\/itineraries\/([\w-]+)$/);
  if (itinMatch && itinerarySlugs.includes(itinMatch[1])) {
    return true;
  }

  // Check guide pages
  const guideMatch = path.match(/^\/vietnam\/guides\/([\w-]+)$/);
  if (guideMatch && guideSlugs.includes(guideMatch[1])) {
    return true;
  }

  // External links have content
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return true;
  }

  return false;
}

export type StaticRoute = (typeof staticRoutes)[number];
