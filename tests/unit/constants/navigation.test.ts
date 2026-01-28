import {
  navItems,
  footerDestinations,
  footerGuides,
  footerItineraries,
  footerLegal,
} from '@/lib/constants/navigation';

describe('Navigation Constants', () => {
  describe('navItems', () => {
    // Hick's Law - 5 items (streamlined navigation)
    it('contains exactly 5 navigation items', () => {
      expect(navItems).toHaveLength(5);
    });

    // Required fields
    it('all items have label and href', () => {
      navItems.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item.label).toBeTruthy();
        expect(item.href).toBeTruthy();
      });
    });

    // Labels
    it('all labels are non-empty strings', () => {
      navItems.forEach((item) => {
        expect(typeof item.label).toBe('string');
        expect(item.label.length).toBeGreaterThan(0);
      });
    });

    // URLs
    it('all hrefs start with /', () => {
      navItems.forEach((item) => {
        expect(item.href).toMatch(/^\//);
      });
    });

    it('all hrefs are valid URL paths', () => {
      navItems.forEach((item) => {
        expect(item.href).not.toContain(' ');
        expect(item.href).not.toContain('http://');
        expect(item.href).not.toContain('https://');
      });
    });

    // Dropdown items
    it('some items have dropdowns', () => {
      const itemsWithDropdowns = navItems.filter((item) => item.hasDropdown);
      expect(itemsWithDropdowns.length).toBeGreaterThan(0);
    });

    it('items with hasDropdown=true have dropdownItems array', () => {
      navItems
        .filter((item) => item.hasDropdown)
        .forEach((item) => {
          expect(item.dropdownItems).toBeDefined();
          expect(Array.isArray(item.dropdownItems)).toBe(true);
          expect(item.dropdownItems!.length).toBeGreaterThan(0);
        });
    });

    it('dropdown items have label and href', () => {
      navItems
        .filter((item) => item.hasDropdown)
        .forEach((item) => {
          item.dropdownItems?.forEach((dropdownItem) => {
            expect(dropdownItem).toHaveProperty('label');
            expect(dropdownItem).toHaveProperty('href');
            expect(dropdownItem.label).toBeTruthy();
            expect(dropdownItem.href).toBeTruthy();
          });
        });
    });

    // Specific nav items
    it('includes Destinations with dropdown', () => {
      const destinations = navItems.find((item) => item.label === 'Destinations');
      expect(destinations).toBeDefined();
      expect(destinations?.hasDropdown).toBe(true);
      expect(destinations?.dropdownItems).toBeDefined();
      expect(destinations?.dropdownItems!.length).toBeGreaterThanOrEqual(3);
    });

    it('includes Guides with dropdown', () => {
      const guides = navItems.find((item) => item.label === 'Guides');
      expect(guides).toBeDefined();
      expect(guides?.hasDropdown).toBe(true);
      expect(guides?.dropdownItems).toBeDefined();
    });

    it('includes Blog', () => {
      const blog = navItems.find((item) => item.label === 'Blog');
      expect(blog).toBeDefined();
      expect(blog?.href).toBe('/vietnam/blog');
    });

    it('includes About', () => {
      const about = navItems.find((item) => item.label === 'About');
      expect(about).toBeDefined();
      expect(about?.href).toBe('/about');
    });
  });

  describe('footerDestinations', () => {
    // Size
    it('contains destination links', () => {
      expect(footerDestinations.length).toBeGreaterThan(0);
    });

    it('contains exactly 10 destination links', () => {
      expect(footerDestinations).toHaveLength(10);
    });

    // Structure
    it('all items have label and href', () => {
      footerDestinations.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item.label).toBeTruthy();
        expect(item.href).toBeTruthy();
      });
    });

    // URLs
    it('all hrefs start with /vietnam/destinations/', () => {
      footerDestinations.forEach((item) => {
        expect(item.href).toMatch(/^\/vietnam\/destinations\/.+/);
      });
    });

    // Popular destinations
    it('includes Ho Chi Minh City', () => {
      const hcmc = footerDestinations.find((item) => item.label === 'Ho Chi Minh City');
      expect(hcmc).toBeDefined();
      expect(hcmc?.href).toBe('/vietnam/destinations/ho-chi-minh-city');
    });

    it('includes Hanoi', () => {
      const hanoi = footerDestinations.find((item) => item.label === 'Hanoi');
      expect(hanoi).toBeDefined();
      expect(hanoi?.href).toBe('/vietnam/destinations/hanoi');
    });

    it('includes Ha Long Bay', () => {
      const halongbay = footerDestinations.find((item) => item.label === 'Ha Long Bay');
      expect(halongbay).toBeDefined();
      expect(halongbay?.href).toBe('/vietnam/destinations/ha-long-bay');
    });

    // Uniqueness
    it('all destination hrefs are unique', () => {
      const hrefs = footerDestinations.map((d) => d.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(footerDestinations.length);
    });
  });

  describe('footerGuides', () => {
    // Size
    it('contains guide links', () => {
      expect(footerGuides.length).toBeGreaterThan(0);
    });

    it('contains exactly 5 guide links', () => {
      expect(footerGuides).toHaveLength(5);
    });

    // Structure
    it('all items have label and href', () => {
      footerGuides.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item.label).toBeTruthy();
        expect(item.href).toBeTruthy();
      });
    });

    // URLs
    it('all hrefs start with /vietnam/guides/', () => {
      footerGuides.forEach((item) => {
        expect(item.href).toMatch(/^\/vietnam\/guides\/.+/);
      });
    });

    // Essential guides
    it('includes Visa Information', () => {
      const visa = footerGuides.find((item) => item.label === 'Visa Information');
      expect(visa).toBeDefined();
      expect(visa?.href).toBe('/vietnam/guides/visa');
    });

    it('includes Transportation', () => {
      const transport = footerGuides.find((item) => item.label === 'Transportation');
      expect(transport).toBeDefined();
      expect(transport?.href).toBe('/vietnam/guides/transport');
    });

    it('includes Budget & Costs', () => {
      const budget = footerGuides.find((item) => item.label === 'Budget & Costs');
      expect(budget).toBeDefined();
      expect(budget?.href).toBe('/vietnam/guides/costs-budget');
    });
  });

  describe('footerItineraries', () => {
    // Size
    it('contains itinerary links', () => {
      expect(footerItineraries.length).toBeGreaterThan(0);
    });

    it('contains exactly 3 itinerary links', () => {
      expect(footerItineraries).toHaveLength(3);
    });

    // Structure
    it('all items have label and href', () => {
      footerItineraries.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item.label).toBeTruthy();
        expect(item.href).toBeTruthy();
      });
    });

    // URLs
    it('all hrefs start with /vietnam/itineraries/', () => {
      footerItineraries.forEach((item) => {
        expect(item.href).toMatch(/^\/vietnam\/itineraries\/.+/);
      });
    });

    // Specific itineraries
    it('includes 1 Week Itinerary', () => {
      const oneWeek = footerItineraries.find((item) => item.label === '1 Week Itinerary');
      expect(oneWeek).toBeDefined();
      expect(oneWeek?.href).toBe('/vietnam/itineraries/1-week');
    });

    it('includes 2 Week Itinerary', () => {
      const twoWeeks = footerItineraries.find((item) => item.label === '2 Week Itinerary');
      expect(twoWeeks).toBeDefined();
      expect(twoWeeks?.href).toBe('/vietnam/itineraries/2-weeks');
    });

    it('includes 3 Week Itinerary', () => {
      const threeWeeks = footerItineraries.find((item) => item.label === '3 Week Itinerary');
      expect(threeWeeks).toBeDefined();
      expect(threeWeeks?.href).toBe('/vietnam/itineraries/3-weeks');
    });
  });

  describe('footerLegal', () => {
    // Size
    it('contains legal links', () => {
      expect(footerLegal.length).toBeGreaterThan(0);
    });

    it('contains exactly 5 legal links', () => {
      expect(footerLegal).toHaveLength(5);
    });

    // Structure
    it('all items have label and href', () => {
      footerLegal.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item.label).toBeTruthy();
        expect(item.href).toBeTruthy();
      });
    });

    // Essential legal pages
    it('includes About Us', () => {
      const about = footerLegal.find((item) => item.label === 'About Us');
      expect(about).toBeDefined();
      expect(about?.href).toBe('/about');
    });

    it('includes Contact', () => {
      const contact = footerLegal.find((item) => item.label === 'Contact');
      expect(contact).toBeDefined();
      expect(contact?.href).toBe('/contact');
    });

    it('includes Privacy Policy', () => {
      const privacy = footerLegal.find((item) => item.label === 'Privacy Policy');
      expect(privacy).toBeDefined();
      expect(privacy?.href).toBe('/legal/privacy');
    });

    it('includes Terms of Service', () => {
      const terms = footerLegal.find((item) => item.label === 'Terms of Service');
      expect(terms).toBeDefined();
      expect(terms?.href).toBe('/legal/terms');
    });

    it('includes Affiliate Disclosure', () => {
      const disclosure = footerLegal.find((item) => item.label === 'Affiliate Disclosure');
      expect(disclosure).toBeDefined();
      expect(disclosure?.href).toBe('/legal/disclosure');
    });
  });
});
