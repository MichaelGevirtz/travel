import { isValidRoute, hasActualContent } from "@/lib/constants/routes";

/**
 * Integration test for broken links detection
 *
 * This test imports components and extracts their href values
 * to validate against the route registry.
 *
 * Why this approach:
 * - Catches broken links at test time, not runtime
 * - Works without rendering (faster, no DOM needed)
 * - Reports exact file/component with broken link
 */

// Import navigation constants (these define all links in nav/footer)
import {
  navItems,
  footerDestinations,
  footerGuides,
  footerItineraries,
  footerLegal,
} from "@/lib/constants/navigation";

// Import component data sources
import { featuredDestinations, allDestinations } from "@/lib/constants/destinations";

// Import IntentTiles data (inline array in component, so we define expected hrefs)
const intentTileHrefs = [
  "/vietnam/guides/first-time",
  "/vietnam/guides/digital-nomad",
  "/vietnam/destinations?theme=couples",
  "/vietnam/destinations?theme=adventure",
];

// Hero component links
const heroHrefs = ["/vietnam/destinations", "/vietnam/itineraries"];

// Guides index page links (to individual guide pages)
const guideIndexHrefs = [
  "/vietnam/guides/visa",
  "/vietnam/guides/best-time-to-visit",
  "/vietnam/guides/transport",
  "/vietnam/guides/costs-budget",
  "/vietnam/guides/sim-esim",
  "/vietnam/guides/safety-scams",
];

describe("Broken Links Integration Tests", () => {
  describe("Homepage Links", () => {
    it("Hero component links are valid", () => {
      heroHrefs.forEach((href) => {
        expect(isValidRoute(href), `Hero link broken: ${href}`).toBe(true);
        expect(hasActualContent(href), `Hero link has no content: ${href}`).toBe(true);
      });
    });

    it("IntentTiles links are valid routes (may show Coming Soon)", () => {
      intentTileHrefs.forEach((href) => {
        expect(isValidRoute(href), `IntentTile link broken: ${href}`).toBe(true);
      });
    });

    it("Featured destination cards have valid links", () => {
      featuredDestinations.forEach((dest) => {
        const href = `/vietnam/destinations/${dest.slug}`;
        expect(isValidRoute(href), `Featured destination broken: ${href}`).toBe(true);
        expect(hasActualContent(href), `Featured destination has no content: ${href}`).toBe(true);
      });
    });
  });

  describe("Destinations Page Links", () => {
    it("all destination slugs create valid routes", () => {
      allDestinations.forEach((dest) => {
        const href = `/vietnam/destinations/${dest.slug}`;
        expect(isValidRoute(href), `Destination link broken: ${href}`).toBe(true);
      });
    });

    it("where-to-stay links from destination pages are valid (Coming Soon)", () => {
      // Destination pages link to /vietnam/where-to-stay/[slug]
      allDestinations.forEach((dest) => {
        const href = `/vietnam/where-to-stay/${dest.slug}`;
        expect(isValidRoute(href), `Where to stay link broken: ${href}`).toBe(true);
        // Note: hasActualContent will be false (Coming Soon), which is expected
      });
    });
  });

  describe("Guides Page Links", () => {
    it("guides index links to valid guide pages", () => {
      guideIndexHrefs.forEach((href) => {
        expect(isValidRoute(href), `Guide index link broken: ${href}`).toBe(true);
        expect(hasActualContent(href), `Guide has no content: ${href}`).toBe(true);
      });
    });
  });

  describe("Navigation Component Links", () => {
    it("all navigation items have valid routes", () => {
      const brokenLinks: string[] = [];

      navItems.forEach((item) => {
        if (!isValidRoute(item.href)) {
          brokenLinks.push(`Nav item "${item.label}": ${item.href}`);
        }
        if (item.dropdownItems) {
          item.dropdownItems.forEach((dropdown) => {
            if (!isValidRoute(dropdown.href)) {
              brokenLinks.push(`Nav dropdown "${dropdown.label}": ${dropdown.href}`);
            }
          });
        }
      });

      expect(brokenLinks, `Broken navigation links found:\n${brokenLinks.join("\n")}`).toHaveLength(
        0
      );
    });

    it("all navigation items have actual content (not Coming Soon)", () => {
      const comingSoonLinks: string[] = [];

      navItems.forEach((item) => {
        if (!hasActualContent(item.href)) {
          comingSoonLinks.push(`Nav item "${item.label}": ${item.href}`);
        }
        if (item.dropdownItems) {
          item.dropdownItems.forEach((dropdown) => {
            if (!hasActualContent(dropdown.href)) {
              comingSoonLinks.push(`Nav dropdown "${dropdown.label}": ${dropdown.href}`);
            }
          });
        }
      });

      expect(
        comingSoonLinks,
        `Navigation links without content:\n${comingSoonLinks.join("\n")}`
      ).toHaveLength(0);
    });
  });

  describe("Footer Component Links", () => {
    it("all footer destination links are valid", () => {
      const brokenLinks: string[] = [];

      footerDestinations.forEach((item) => {
        if (!isValidRoute(item.href)) {
          brokenLinks.push(`Footer destination "${item.label}": ${item.href}`);
        }
      });

      expect(brokenLinks, `Broken footer destination links:\n${brokenLinks.join("\n")}`).toHaveLength(
        0
      );
    });

    it("all footer guide links are valid and have content", () => {
      const brokenLinks: string[] = [];
      const noContentLinks: string[] = [];

      footerGuides.forEach((item) => {
        if (!isValidRoute(item.href)) {
          brokenLinks.push(`Footer guide "${item.label}": ${item.href}`);
        }
        if (!hasActualContent(item.href)) {
          noContentLinks.push(`Footer guide "${item.label}": ${item.href}`);
        }
      });

      expect(brokenLinks, `Broken footer guide links:\n${brokenLinks.join("\n")}`).toHaveLength(0);
      expect(
        noContentLinks,
        `Footer guide links without content:\n${noContentLinks.join("\n")}`
      ).toHaveLength(0);
    });

    it("all footer itinerary links are valid", () => {
      const brokenLinks: string[] = [];

      footerItineraries.forEach((item) => {
        if (!isValidRoute(item.href)) {
          brokenLinks.push(`Footer itinerary "${item.label}": ${item.href}`);
        }
      });

      expect(brokenLinks, `Broken footer itinerary links:\n${brokenLinks.join("\n")}`).toHaveLength(
        0
      );
    });

    it("all footer legal links are valid and have content", () => {
      const brokenLinks: string[] = [];
      const noContentLinks: string[] = [];

      footerLegal.forEach((item) => {
        if (!isValidRoute(item.href)) {
          brokenLinks.push(`Footer legal "${item.label}": ${item.href}`);
        }
        if (!hasActualContent(item.href)) {
          noContentLinks.push(`Footer legal "${item.label}": ${item.href}`);
        }
      });

      expect(brokenLinks, `Broken footer legal links:\n${brokenLinks.join("\n")}`).toHaveLength(0);
      expect(
        noContentLinks,
        `Footer legal links without content:\n${noContentLinks.join("\n")}`
      ).toHaveLength(0);
    });
  });

  describe("Cross-Component Link Consistency", () => {
    it("destination slugs are consistent across components", () => {
      // Ensure all destinations referenced anywhere exist in allDestinations
      const validSlugs = allDestinations.map((d) => d.slug);

      footerDestinations.forEach((item) => {
        const slug = item.href.replace("/vietnam/destinations/", "");
        expect(
          validSlugs,
          `Footer references unknown destination: ${slug}`
        ).toContain(slug);
      });
    });
  });
});

/**
 * Summary of what this test catches:
 *
 * 1. Broken links in navigation (header/footer)
 * 2. Broken links in homepage components (Hero, IntentTiles, FeaturedDestinations)
 * 3. Missing destination pages
 * 4. Missing guide pages
 * 5. Inconsistent slugs between components
 * 6. Links pointing to Coming Soon pages in navigation (user-facing nav should have content)
 *
 * To add new link sources:
 * 1. Import the data source
 * 2. Add a test case that extracts hrefs and validates with isValidRoute()
 */
