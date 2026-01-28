import { featuredDestinations, allDestinations } from '@/lib/constants/destinations';

describe('Destinations Constants', () => {
  describe('featuredDestinations', () => {
    // Data structure
    it('contains exactly 8 destinations', () => {
      expect(featuredDestinations).toHaveLength(8);
    });

    it('all destinations have required fields', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest).toHaveProperty('slug');
        expect(dest).toHaveProperty('name');
        expect(dest).toHaveProperty('description');
        expect(dest).toHaveProperty('image');
        expect(dest).toHaveProperty('imageAlt');
        expect(dest).toHaveProperty('region');
        expect(dest).toHaveProperty('type');
        expect(dest).toHaveProperty('highlights');
      });
    });

    // Uniqueness
    it('all slugs are unique', () => {
      const slugs = featuredDestinations.map((d) => d.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(featuredDestinations.length);
    });

    it('all names are unique', () => {
      const names = featuredDestinations.map((d) => d.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(featuredDestinations.length);
    });

    // Field validation
    it('all slugs are lowercase and URL-friendly', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.slug).toMatch(/^[a-z0-9-]+$/);
        expect(dest.slug).not.toContain(' ');
        expect(dest.slug).not.toContain('_');
      });
    });

    it('all names are non-empty strings', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.name).toBeTruthy();
        expect(typeof dest.name).toBe('string');
        expect(dest.name.length).toBeGreaterThan(0);
      });
    });

    it('all descriptions are non-empty strings', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.description).toBeTruthy();
        expect(typeof dest.description).toBe('string');
        expect(dest.description.length).toBeGreaterThan(20);
      });
    });

    it('all image paths start with /images/destinations/', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.image).toMatch(/^\/images\/destinations\/.+\.(jpg|jpeg|png|webp)$/);
      });
    });

    it('all imageAlt texts are descriptive', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.imageAlt).toBeTruthy();
        expect(dest.imageAlt.length).toBeGreaterThan(10);
      });
    });

    // Region validation
    it('all destinations have valid region', () => {
      const validRegions = ['north', 'central', 'south'];
      featuredDestinations.forEach((dest) => {
        expect(validRegions).toContain(dest.region);
      });
    });

    it('contains destinations from all regions', () => {
      const regions = new Set(featuredDestinations.map((d) => d.region));
      expect(regions).toContain('north');
      expect(regions).toContain('central');
      expect(regions).toContain('south');
    });

    // Type validation
    it('all destinations have valid type', () => {
      const validTypes = ['city', 'beach', 'mountain', 'region'];
      featuredDestinations.forEach((dest) => {
        expect(validTypes).toContain(dest.type);
      });
    });

    it('contains mix of destination types', () => {
      const types = new Set(featuredDestinations.map((d) => d.type));
      expect(types.size).toBeGreaterThanOrEqual(2);
    });

    // Highlights validation
    it('all destinations have exactly 3 highlights', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.highlights).toHaveLength(3);
      });
    });

    it('highlights contain days, budget, and bestFor types', () => {
      featuredDestinations.forEach((dest) => {
        const types = dest.highlights.map((h) => h.type);
        expect(types).toContain('days');
        expect(types).toContain('budget');
        expect(types).toContain('bestFor');
      });
    });

    it('all highlight texts are non-empty', () => {
      featuredDestinations.forEach((dest) => {
        dest.highlights.forEach((highlight) => {
          expect(highlight.text).toBeTruthy();
          expect(highlight.text.length).toBeGreaterThan(3);
        });
      });
    });

    // Specific destinations
    it('includes Hanoi', () => {
      const hanoi = featuredDestinations.find((d) => d.slug === 'hanoi');
      expect(hanoi).toBeDefined();
      expect(hanoi?.name).toBe('Hanoi');
      expect(hanoi?.region).toBe('north');
      expect(hanoi?.type).toBe('city');
    });

    it('includes Ho Chi Minh City', () => {
      const hcmc = featuredDestinations.find((d) => d.slug === 'ho-chi-minh-city');
      expect(hcmc).toBeDefined();
      expect(hcmc?.name).toBe('Ho Chi Minh City');
      expect(hcmc?.region).toBe('south');
      expect(hcmc?.type).toBe('city');
    });

    it('includes Ha Long Bay', () => {
      const halongbay = featuredDestinations.find((d) => d.slug === 'ha-long-bay');
      expect(halongbay).toBeDefined();
      expect(halongbay?.name).toBe('Ha Long Bay');
      expect(halongbay?.region).toBe('north');
      expect(halongbay?.type).toBe('beach');
    });
  });

  describe('allDestinations', () => {
    // Size
    it('contains at least 8 destinations', () => {
      expect(allDestinations.length).toBeGreaterThanOrEqual(8);
    });

    it('contains exactly 19 destinations', () => {
      expect(allDestinations).toHaveLength(19);
    });

    // Relationship with featured
    it('includes all featured destinations', () => {
      const allSlugs = allDestinations.map((d) => d.slug);
      const featuredSlugs = featuredDestinations.map((d) => d.slug);

      featuredSlugs.forEach((slug) => {
        expect(allSlugs).toContain(slug);
      });
    });

    it('featuredDestinations appears first in allDestinations', () => {
      const first8Slugs = allDestinations.slice(0, 8).map((d) => d.slug);
      const featuredSlugs = featuredDestinations.map((d) => d.slug);

      expect(first8Slugs).toEqual(featuredSlugs);
    });

    // All same validations
    it('all slugs are unique', () => {
      const slugs = allDestinations.map((d) => d.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(allDestinations.length);
    });

    it('all destinations have required fields', () => {
      allDestinations.forEach((dest) => {
        expect(dest).toHaveProperty('slug');
        expect(dest).toHaveProperty('name');
        expect(dest).toHaveProperty('description');
        expect(dest).toHaveProperty('image');
        expect(dest).toHaveProperty('imageAlt');
        expect(dest).toHaveProperty('region');
        expect(dest).toHaveProperty('type');
        expect(dest).toHaveProperty('highlights');
      });
    });

    it('all destinations have valid region', () => {
      const validRegions = ['north', 'central', 'south'];
      allDestinations.forEach((dest) => {
        expect(validRegions).toContain(dest.region);
      });
    });

    it('all destinations have valid type', () => {
      const validTypes = ['city', 'beach', 'mountain', 'region'];
      allDestinations.forEach((dest) => {
        expect(validTypes).toContain(dest.type);
      });
    });

    it('all destinations have exactly 3 highlights with correct types', () => {
      allDestinations.forEach((dest) => {
        expect(dest.highlights).toHaveLength(3);
        const types = dest.highlights.map((h) => h.type);
        expect(types).toContain('days');
        expect(types).toContain('budget');
        expect(types).toContain('bestFor');
      });
    });

    // Non-featured destinations
    it('contains non-featured destinations', () => {
      const nonFeaturedCount = allDestinations.length - featuredDestinations.length;
      expect(nonFeaturedCount).toBe(11);
    });

    it('non-featured destinations follow same structure', () => {
      const nonFeatured = allDestinations.slice(8);
      nonFeatured.forEach((dest) => {
        expect(dest).toHaveProperty('slug');
        expect(dest).toHaveProperty('name');
        expect(dest).toHaveProperty('description');
        expect(dest).toHaveProperty('highlights');
        expect(dest.highlights).toHaveLength(3);
      });
    });
  });
});
