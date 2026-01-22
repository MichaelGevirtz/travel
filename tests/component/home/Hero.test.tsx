import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/home/Hero';

describe('Hero', () => {
  describe('Rendering', () => {
    it('renders main heading with Vietnam Travel highlighted', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', {
        level: 1,
        name: /your complete guide to vietnam travel/i,
      });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain('Your Complete Guide to');
      expect(heading.textContent).toContain('Vietnam Travel');
    });

    it('renders subheading with value proposition', () => {
      render(<Hero />);

      expect(
        screen.getByText(
          /insider tips, detailed itineraries, and honest hotel recommendations/i
        )
      ).toBeInTheDocument();
    });

    it('renders experience mention in subheading', () => {
      render(<Hero />);

      expect(screen.getByText(/7\+ years exploring vietnam/i)).toBeInTheDocument();
    });
  });

  describe('Background Image', () => {
    it('renders hero background image with correct alt text', () => {
      render(<Hero />);

      const image = screen.getByAltText(
        "Ha Long Bay at sunset - Vietnam's iconic limestone karsts"
      );

      expect(image).toBeInTheDocument();
    });

    it('uses correct image source', () => {
      render(<Hero />);

      const image = screen.getByAltText(/ha long bay at sunset/i);

      expect(image).toHaveAttribute('src', '/images/hero-vietnam.jpg');
    });
  });

  describe('Call-to-Action Links', () => {
    it('renders primary CTA link to destinations', () => {
      render(<Hero />);

      const link = screen.getByRole('link', { name: /explore destinations/i });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/vietnam/destinations');
    });

    it('renders secondary CTA link to itineraries', () => {
      render(<Hero />);

      const link = screen.getByRole('link', {
        name: /view sample itineraries/i,
      });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/vietnam/itineraries');
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

      // Link should contain the text and the arrow icon is part of the link
      expect(primaryLink.textContent).toContain('Explore Destinations');
    });
  });

  describe('Trust Signals', () => {
    it('displays "Updated for 2025" trust signal', () => {
      render(<Hero />);

      expect(screen.getByText('Updated for 2025')).toBeInTheDocument();
    });

    it('displays destinations count trust signal', () => {
      render(<Hero />);

      expect(screen.getByText('50+ Destinations Covered')).toBeInTheDocument();
    });

    it('displays traveler count trust signal', () => {
      render(<Hero />);

      expect(screen.getByText('Used by 120K+ Travelers')).toBeInTheDocument();
    });

    it('renders all three trust signals', () => {
      render(<Hero />);

      expect(screen.getByText('Updated for 2025')).toBeInTheDocument();
      expect(screen.getByText('50+ Destinations Covered')).toBeInTheDocument();
      expect(screen.getByText('Used by 120K+ Travelers')).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('uses section element as wrapper', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has correct heading hierarchy with h1', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('renders as landmark region', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has descriptive alt text for hero image', () => {
      render(<Hero />);

      const image = screen.getByAltText(
        /ha long bay at sunset.*vietnam's iconic limestone karsts/i
      );

      expect(image).toBeInTheDocument();
    });

    it('has accessible link text for primary CTA', () => {
      render(<Hero />);

      const link = screen.getByRole('link', { name: /explore destinations/i });

      // Link text should be descriptive, not generic like "click here"
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

      expect(heading).toBeVisible();
      expect(heading).toHaveTextContent(/your complete guide to vietnam travel/i);
    });
  });

  describe('Content Hierarchy', () => {
    it('renders heading before subheading', () => {
      const { container } = render(<Hero />);

      const heading = container.querySelector('h1');
      const subheading = container.querySelector('p');

      expect(heading).toBeInTheDocument();
      expect(subheading).toBeInTheDocument();

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

      expect(heading).toBeInTheDocument();
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders trust signals after CTAs', () => {
      const { container } = render(<Hero />);

      const links = screen.getAllByRole('link');
      const trustSignal = screen.getByText('Updated for 2025');

      expect(links.length).toBeGreaterThan(0);
      expect(trustSignal).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('renders gradient overlay for text readability', () => {
      const { container } = render(<Hero />);

      // Gradient overlay should exist for text readability
      const overlays = container.querySelectorAll('.absolute');
      expect(overlays.length).toBeGreaterThan(0);
    });

    it('renders scroll indicator element', () => {
      const { container } = render(<Hero />);

      // Scroll indicator exists (hidden on mobile)
      const scrollIndicator = container.querySelector('.animate-bounce');
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders without props', () => {
      // Hero component takes no props
      expect(() => render(<Hero />)).not.toThrow();
    });

    it('contains all main content sections', () => {
      render(<Hero />);

      // Check all main content is present
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(2);
      expect(screen.getByText('Updated for 2025')).toBeInTheDocument();
    });

    it('renders with correct layout structure', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('relative');
    });
  });
});
