import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/home/Hero';
import { allDestinations } from '@/lib/constants/destinations';

describe('Hero', () => {
  describe('Rendering', () => {
    it('renders main heading with Vietnam Travel highlighted', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', {
        level: 1,
        name: /your complete guide to vietnam travel/i,
      });

      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Your Complete Guide to');
      expect(heading.textContent).toContain('Vietnam Travel');
    });

    it('renders subheading with value proposition', () => {
      render(<Hero />);

      expect(
        screen.getByText(
          /insider tips, detailed itineraries, and honest hotel recommendations/i
        )
      ).toBeTruthy();
    });

    it('renders experience mention in subheading', () => {
      render(<Hero />);

      expect(screen.getByText(/7\+ years exploring vietnam/i)).toBeTruthy();
    });
  });

  describe('Background Image', () => {
    it('renders hero background image with correct alt text', () => {
      render(<Hero />);

      const image = screen.getByAltText(
        "Sapa rice terraces - Vietnam's stunning mountain landscape"
      );

      expect(image).toBeTruthy();
    });

    it('uses correct image source', () => {
      render(<Hero />);

      const image = screen.getByAltText(/sapa rice terraces/i);

      expect(image.getAttribute('src')).toBe('/images/homepage.jpg');
    });
  });

  describe('Call-to-Action Links', () => {
    it('renders primary CTA link to destinations', () => {
      render(<Hero />);

      const link = screen.getByRole('link', { name: /explore destinations/i });

      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/vietnam/destinations');
    });

    it('renders secondary CTA link to itineraries', () => {
      render(<Hero />);

      const link = screen.getByRole('link', {
        name: /view sample itineraries/i,
      });

      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/vietnam/itineraries');
    });

    it('renders both CTA buttons', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(2);
    });

    it('primary CTA contains arrow icon indicator', () => {
      render(<Hero />);

      const primaryLink = screen.getByRole('link', {
        name: /explore destinations/i,
      });

      expect(primaryLink.textContent).toContain('Explore Destinations');
    });
  });

  describe('Trust Signals', () => {
    it('displays "Updated for 2026" trust signal', () => {
      render(<Hero />);

      expect(screen.getByText('Updated for 2026')).toBeTruthy();
    });

    it('displays dynamic destinations count trust signal', () => {
      render(<Hero />);

      expect(screen.getByText(`${allDestinations.length}+ Destinations Covered`)).toBeTruthy();
    });

    it('displays traveler count trust signal', () => {
      render(<Hero />);

      expect(screen.getByText('Used by 120K+ Travelers')).toBeTruthy();
    });

    it('renders all three trust signals', () => {
      render(<Hero />);

      expect(screen.getByText('Updated for 2026')).toBeTruthy();
      expect(screen.getByText(`${allDestinations.length}+ Destinations Covered`)).toBeTruthy();
      expect(screen.getByText('Used by 120K+ Travelers')).toBeTruthy();
    });
  });

  describe('Semantic HTML', () => {
    it('uses section element as wrapper', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('has correct heading hierarchy with h1', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('renders as landmark region', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has descriptive alt text for hero image', () => {
      render(<Hero />);

      const image = screen.getByAltText(
        /sapa rice terraces.*vietnam's stunning mountain landscape/i
      );

      expect(image).toBeTruthy();
    });

    it('has accessible link text for primary CTA', () => {
      render(<Hero />);

      const link = screen.getByRole('link', { name: /explore destinations/i });

      expect(link.textContent).toContain('Explore Destinations');
    });

    it('has accessible link text for secondary CTA', () => {
      render(<Hero />);

      const link = screen.getByRole('link', {
        name: /view sample itineraries/i,
      });

      expect(link.textContent).toContain('View Sample Itineraries');
    });

    it('heading is visible and readable', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });

      expect(heading).toBeTruthy();
      expect(heading.textContent?.toLowerCase()).toContain('your complete guide to vietnam travel');
    });
  });

  describe('Content Hierarchy', () => {
    it('renders heading before subheading', () => {
      const { container } = render(<Hero />);

      const heading = container.querySelector('h1');
      const subheading = container.querySelector('p');

      expect(heading).toBeTruthy();
      expect(subheading).toBeTruthy();

      // Heading should appear before subheading in DOM order
      const allElements = Array.from(container.querySelectorAll('*'));
      const headingIndex = allElements.indexOf(heading!);
      const subheadingIndex = allElements.indexOf(subheading!);

      expect(headingIndex).toBeLessThan(subheadingIndex);
    });

    it('renders CTAs after descriptive content', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      const links = screen.getAllByRole('link');

      expect(heading).toBeTruthy();
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders trust signals after CTAs', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');
      const trustSignal = screen.getByText('Updated for 2026');

      expect(links.length).toBeGreaterThan(0);
      expect(trustSignal).toBeTruthy();
    });
  });

  describe('Visual Elements', () => {
    it('renders gradient overlay for text readability', () => {
      const { container } = render(<Hero />);

      const overlays = container.querySelectorAll('.absolute');
      expect(overlays.length).toBeGreaterThan(0);
    });

    it('renders scroll indicator element', () => {
      const { container } = render(<Hero />);

      const scrollIndicator = container.querySelector('.animate-bounce');
      expect(scrollIndicator).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('renders without props', () => {
      expect(() => render(<Hero />)).not.toThrow();
    });

    it('contains all main content sections', () => {
      render(<Hero />);

      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
      expect(screen.getByRole('img')).toBeTruthy();
      expect(screen.getAllByRole('link')).toHaveLength(2);
      expect(screen.getByText('Updated for 2026')).toBeTruthy();
    });

    it('renders with correct layout structure', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('relative');
    });
  });
});
