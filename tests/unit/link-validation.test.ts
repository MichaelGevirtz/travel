import {
  navItems,
  footerDestinations,
  footerGuides,
  footerItineraries,
  footerLegal,
} from "@/lib/constants/navigation";
import {
  isValidRoute,
  hasActualContent,
  staticRoutes,
  destinationSlugs,
  guideSlugs,
  itinerarySlugs,
} from "@/lib/constants/routes";

describe("Link Validation", () => {
  describe("Navigation Links", () => {
    it("all nav items have valid routes", () => {
      navItems.forEach((item) => {
        expect(isValidRoute(item.href)).toBe(true);

        // Check dropdown items
        if (item.dropdownItems) {
          item.dropdownItems.forEach((dropdownItem) => {
            expect(isValidRoute(dropdownItem.href)).toBe(true);
          });
        }
      });
    });

    it("all nav items have actual content (not Coming Soon)", () => {
      navItems.forEach((item) => {
        expect(hasActualContent(item.href)).toBe(true);

        if (item.dropdownItems) {
          item.dropdownItems.forEach((dropdownItem) => {
            expect(hasActualContent(dropdownItem.href)).toBe(true);
          });
        }
      });
    });
  });

  describe("Footer Destination Links", () => {
    it("all footer destinations have valid routes", () => {
      footerDestinations.forEach((dest) => {
        expect(isValidRoute(dest.href)).toBe(true);
      });
    });

    it("all footer destinations match known destination slugs", () => {
      footerDestinations.forEach((dest) => {
        const slug = dest.href.replace("/vietnam/destinations/", "");
        expect(destinationSlugs).toContain(slug);
      });
    });
  });

  describe("Footer Guide Links", () => {
    it("all footer guides have valid routes", () => {
      footerGuides.forEach((guide) => {
        expect(isValidRoute(guide.href)).toBe(true);
      });
    });

    it("all footer guides have actual content", () => {
      footerGuides.forEach((guide) => {
        expect(hasActualContent(guide.href)).toBe(true);
      });
    });
  });

  describe("Footer Itinerary Links", () => {
    it("all footer itineraries have valid routes", () => {
      footerItineraries.forEach((itin) => {
        expect(isValidRoute(itin.href)).toBe(true);
      });
    });
  });

  describe("Footer Legal Links", () => {
    it("all footer legal links have valid routes", () => {
      footerLegal.forEach((legal) => {
        expect(isValidRoute(legal.href)).toBe(true);
      });
    });

    it("all footer legal links have actual content", () => {
      footerLegal.forEach((legal) => {
        expect(hasActualContent(legal.href)).toBe(true);
      });
    });
  });

  describe("Route Validation Function", () => {
    it("validates static routes correctly", () => {
      staticRoutes.forEach((route) => {
        expect(isValidRoute(route)).toBe(true);
      });
    });

    it("validates dynamic destination routes", () => {
      destinationSlugs.forEach((slug) => {
        expect(isValidRoute(`/vietnam/destinations/${slug}`)).toBe(true);
      });
    });

    it("validates dynamic guide routes", () => {
      guideSlugs.forEach((slug) => {
        expect(isValidRoute(`/vietnam/guides/${slug}`)).toBe(true);
      });
    });

    it("validates unknown guide routes (Coming Soon)", () => {
      // These should be valid (show Coming Soon, not 404)
      expect(isValidRoute("/vietnam/guides/first-time")).toBe(true);
      expect(isValidRoute("/vietnam/guides/digital-nomad")).toBe(true);
      expect(isValidRoute("/vietnam/guides/unknown-guide")).toBe(true);
    });

    it("validates where-to-stay routes (Coming Soon)", () => {
      expect(isValidRoute("/vietnam/where-to-stay/hanoi")).toBe(true);
      expect(isValidRoute("/vietnam/where-to-stay/any-city")).toBe(true);
    });

    it("validates external links", () => {
      expect(isValidRoute("https://example.com")).toBe(true);
      expect(isValidRoute("http://example.com")).toBe(true);
    });

    it("validates anchor links", () => {
      expect(isValidRoute("#section")).toBe(true);
    });

    it("rejects invalid routes", () => {
      expect(isValidRoute("/nonexistent")).toBe(false);
      expect(isValidRoute("/vietnam/nonexistent")).toBe(false);
      expect(isValidRoute("/random/path")).toBe(false);
    });
  });

  describe("Content Validation Function", () => {
    it("identifies guides with actual content", () => {
      guideSlugs.forEach((slug) => {
        expect(hasActualContent(`/vietnam/guides/${slug}`)).toBe(true);
      });
    });

    it("identifies guides without content (Coming Soon)", () => {
      expect(hasActualContent("/vietnam/guides/first-time")).toBe(false);
      expect(hasActualContent("/vietnam/guides/digital-nomad")).toBe(false);
    });

    it("identifies where-to-stay as Coming Soon", () => {
      expect(hasActualContent("/vietnam/where-to-stay/hanoi")).toBe(false);
    });
  });
});
