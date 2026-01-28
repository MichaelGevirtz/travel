import { render, screen } from '@testing-library/react';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import {
  mockDestination,
  mockDestinationBeach,
  mockDestinationMinimal,
} from '@/tests/fixtures/destinations';

describe('DestinationCard', () => {
  describe('Rendering', () => {
    it('renders destination name as heading', () => {
      render(<DestinationCard {...mockDestination} />);

      expect(
        screen.getByRole('heading', { name: 'Hanoi' })
      ).toBeTruthy();
    });

    it('renders destination description', () => {
      render(<DestinationCard {...mockDestination} />);

      expect(
        screen.getByText(/charming capital blends ancient temples/i)
      ).toBeTruthy();
    });

    it('renders image with correct alt text', () => {
      render(<DestinationCard {...mockDestination} />);

      const image = screen.getByAltText('Hoan Kiem Lake in Hanoi Old Quarter');
      expect(image).toBeTruthy();
    });

    it('renders with different destination data', () => {
      render(<DestinationCard {...mockDestinationBeach} />);

      expect(screen.getByRole('heading', { name: 'Da Nang' })).toBeTruthy();
      expect(screen.getByText(/modern coastal city/i)).toBeTruthy();
    });

    it('renders with minimal required props', () => {
      render(<DestinationCard {...mockDestinationMinimal} />);

      expect(
        screen.getByRole('heading', { name: 'Test Destination' })
      ).toBeTruthy();
    });
  });

  describe('Highlights', () => {
    it('displays all three highlight items', () => {
      render(<DestinationCard {...mockDestination} />);

      expect(screen.getByText('3-4 days recommended')).toBeTruthy();
      expect(screen.getByText('$30-50 per day')).toBeTruthy();
      expect(screen.getByText('Culture, food, history')).toBeTruthy();
    });

    it('displays correct highlight for beach destination', () => {
      render(<DestinationCard {...mockDestinationBeach} />);

      expect(screen.getByText('Beach, families')).toBeTruthy();
      expect(screen.getByText('$35-70 per day')).toBeTruthy();
    });

    it('renders highlights as list items', () => {
      render(<DestinationCard {...mockDestination} />);

      const highlights = screen.getAllByRole('listitem');
      expect(highlights).toHaveLength(3);
    });
  });

  describe('Links', () => {
    it('creates link to destination page', () => {
      render(<DestinationCard {...mockDestination} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe('/vietnam/destinations/hanoi');
    });

    it('creates correct link for different slug', () => {
      render(<DestinationCard {...mockDestinationBeach} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe('/vietnam/destinations/da-nang');
    });

    it('makes entire card clickable', () => {
      render(<DestinationCard {...mockDestination} />);

      // Should only be one link (entire card is wrapped)
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
    });
  });

  describe('Call to Action', () => {
    it('displays explore CTA with destination name', () => {
      render(<DestinationCard {...mockDestination} />);

      expect(screen.getByText('Explore Hanoi')).toBeTruthy();
    });

    it('displays CTA for different destination', () => {
      render(<DestinationCard {...mockDestinationBeach} />);

      expect(screen.getByText('Explore Da Nang')).toBeTruthy();
    });
  });

  describe('Semantic HTML', () => {
    it('uses article element for card wrapper', () => {
      const { container } = render(<DestinationCard {...mockDestination} />);

      expect(container.querySelector('article')).toBeTruthy();
    });

    it('uses unordered list for highlights', () => {
      render(<DestinationCard {...mockDestination} />);

      expect(screen.getByRole('list')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading hierarchy', () => {
      render(<DestinationCard {...mockDestination} />);

      const heading = screen.getByRole('heading');
      expect(heading.tagName).toBe('H3');
    });

    it('has descriptive link text', () => {
      render(<DestinationCard {...mockDestination} />);

      const link = screen.getByRole('link');
      // Link should contain meaningful text, not just "click here"
      expect(link.textContent).toContain('Hanoi');
    });

    it('has descriptive alt text for image', () => {
      render(<DestinationCard {...mockDestination} />);

      const image = screen.getByAltText(/hoan kiem lake/i);
      expect(image).toBeTruthy();
    });
  });
});
