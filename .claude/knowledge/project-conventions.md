# Project-Specific Testing Conventions

Testing conventions and patterns specific to the Vietnam Travel project.

## Project Overview

This is a Next.js 14 (App Router) travel guide website focusing on Vietnam destinations, with:
- MongoDB for content management
- Mongoose for data modeling
- Radix UI components
- Tailwind CSS for styling
- TypeScript for type safety
- Server and client components

## File Structure & Test Placement

### Project Structure
```
travel/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components (shadcn)
│   ├── layout/            # Layout components
│   ├── home/              # Homepage sections
│   ├── destinations/      # Destination-specific components
│   └── common/            # Shared components
├── lib/                    # Utilities and helpers
│   ├── db/                # Database models and connection
│   ├── constants/         # Static data and constants
│   └── utils.ts           # Helper functions
└── tests/                  # All test files
    ├── unit/              # Unit tests (lib, utils)
    ├── component/         # Component tests
    ├── mocks/             # Shared mocks
    └── fixtures/          # Test fixtures
```

### Test File Naming

```
Source File                          → Test File
─────────────────────────────────────────────────────────────────
lib/utils.ts                         → tests/unit/utils.test.ts
lib/constants/destinations.ts        → tests/unit/constants/destinations.test.ts
lib/db/models/Page.ts                → tests/unit/db/models/Page.test.ts
components/destinations/DestinationCard.tsx → tests/component/destinations/DestinationCard.test.tsx
app/page.tsx                         → tests/component/page.test.tsx
app/vietnam/destinations/[slug]/page.tsx → tests/component/destinations/slug-page.test.tsx
```

## Data Types & Interfaces

### DestinationCardData

```typescript
interface DestinationCardData {
  slug: string;              // URL-friendly identifier
  name: string;              // Display name
  description: string;       // Brief description
  image: string;             // Image path
  imageAlt: string;          // Accessibility description
  region: 'north' | 'central' | 'south';
  type: 'city' | 'beach' | 'mountain' | 'region';
  highlights: Array<{
    type: 'days' | 'budget' | 'bestFor';
    text: string;
  }>;
}
```

### Testing DestinationCardData

```typescript
// tests/fixtures/destinations.ts
export const mockDestination: DestinationCardData = {
  slug: 'hanoi',
  name: 'Hanoi',
  description: 'Capital of Vietnam',
  image: '/images/destinations/hanoi.jpg',
  imageAlt: 'Hoan Kiem Lake in Hanoi',
  region: 'north',
  type: 'city',
  highlights: [
    { type: 'days', text: '3-4 days recommended' },
    { type: 'budget', text: '$30-50 per day' },
    { type: 'bestFor', text: 'Culture, food' },
  ],
};

// Use in tests
import { mockDestination } from '@/tests/fixtures/destinations';

it('renders destination card', () => {
  render(<DestinationCard {...mockDestination} />);
  expect(screen.getByText('Hanoi')).toBeInTheDocument();
});
```

## MongoDB/Mongoose Testing

### Page Model

The `Page` model stores CMS content:

```typescript
interface IPage {
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  status: 'draft' | 'published';
  updatedAt: Date;
}
```

### Mocking MongoDB Operations

```typescript
import { vi } from 'vitest';

vi.mock('@/lib/db/mongodb', () => ({
  connectDB: vi.fn(),
  Page: {
    find: vi.fn(),
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

import { Page } from '@/lib/db/mongodb';

describe('getPageBySlug', () => {
  it('fetches published page from database', async () => {
    const mockPage = {
      slug: 'hanoi',
      title: 'Hanoi Travel Guide',
      content: 'Complete guide...',
      status: 'published',
    };

    vi.mocked(Page.findOne).mockResolvedValue(mockPage);

    const result = await getPageBySlug('hanoi');

    expect(Page.findOne).toHaveBeenCalledWith({
      slug: 'hanoi',
      status: 'published',
    });
    expect(result).toEqual(mockPage);
  });

  it('returns null for draft pages', async () => {
    vi.mocked(Page.findOne).mockResolvedValue(null);

    const result = await getPageBySlug('draft-page');

    expect(result).toBeNull();
  });
});
```

## Component Testing Patterns

### UI Components (Radix UI)

When testing Radix UI-based components:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies variant className', () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('border');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### DestinationCard Component

```typescript
import { render, screen } from '@testing-library/react';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { mockDestination } from '@/tests/fixtures/destinations';

describe('DestinationCard', () => {
  it('renders destination information', () => {
    render(<DestinationCard {...mockDestination} />);

    expect(screen.getByRole('heading', { name: 'Hanoi' })).toBeInTheDocument();
    expect(screen.getByText('Capital of Vietnam')).toBeInTheDocument();
  });

  it('displays all highlight items', () => {
    render(<DestinationCard {...mockDestination} />);

    expect(screen.getByText('3-4 days recommended')).toBeInTheDocument();
    expect(screen.getByText('$30-50 per day')).toBeInTheDocument();
    expect(screen.getByText('Culture, food')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<DestinationCard {...mockDestination} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Hoan Kiem Lake in Hanoi');
  });

  it('creates link to destination page', () => {
    render(<DestinationCard {...mockDestination} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/vietnam/destinations/hanoi');
  });

  it('shows correct icon for each highlight type', () => {
    render(<DestinationCard {...mockDestination} />);

    // Icons are rendered via lucide-react
    // Test by checking the parent structure
    const highlights = screen.getAllByRole('listitem');
    expect(highlights).toHaveLength(3);
  });
});
```

### DestinationGrid Component

```typescript
describe('DestinationGrid', () => {
  const mockDestinations = [
    { ...mockDestination, slug: 'hanoi', name: 'Hanoi' },
    { ...mockDestination, slug: 'hcmc', name: 'Ho Chi Minh City' },
    { ...mockDestination, slug: 'da-nang', name: 'Da Nang' },
  ];

  it('renders all destination cards', () => {
    render(<DestinationGrid destinations={mockDestinations} />);

    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument();
    expect(screen.getByText('Da Nang')).toBeInTheDocument();
  });

  it('displays section title', () => {
    render(
      <DestinationGrid
        destinations={mockDestinations}
        title="Featured Destinations"
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Featured Destinations' })
    ).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(
      <DestinationGrid
        destinations={mockDestinations}
        subtitle="Explore Vietnam's top destinations"
      />
    );

    expect(screen.getByText("Explore Vietnam's top destinations")).toBeInTheDocument();
  });

  it('handles empty destination list', () => {
    render(<DestinationGrid destinations={[]} />);

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
```

## Constants Testing

### Testing Static Data

```typescript
import { featuredDestinations, allDestinations } from '@/lib/constants/destinations';

describe('Destinations Constants', () => {
  describe('featuredDestinations', () => {
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

    it('all slugs are unique', () => {
      const slugs = featuredDestinations.map((d) => d.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(featuredDestinations.length);
    });

    it('all destinations have valid region', () => {
      const validRegions = ['north', 'central', 'south'];
      featuredDestinations.forEach((dest) => {
        expect(validRegions).toContain(dest.region);
      });
    });

    it('all destinations have valid type', () => {
      const validTypes = ['city', 'beach', 'mountain', 'region'];
      featuredDestinations.forEach((dest) => {
        expect(validTypes).toContain(dest.type);
      });
    });

    it('all destinations have exactly 3 highlights', () => {
      featuredDestinations.forEach((dest) => {
        expect(dest.highlights).toHaveLength(3);
      });
    });

    it('highlights contain days, budget, and bestFor', () => {
      featuredDestinations.forEach((dest) => {
        const types = dest.highlights.map((h) => h.type);
        expect(types).toContain('days');
        expect(types).toContain('budget');
        expect(types).toContain('bestFor');
      });
    });
  });

  describe('allDestinations', () => {
    it('contains at least 8 destinations', () => {
      expect(allDestinations.length).toBeGreaterThanOrEqual(8);
    });

    it('includes all featured destinations', () => {
      const allSlugs = allDestinations.map((d) => d.slug);
      const featuredSlugs = featuredDestinations.map((d) => d.slug);

      featuredSlugs.forEach((slug) => {
        expect(allSlugs).toContain(slug);
      });
    });
  });
});
```

## Testing Utility Functions

### Common Utilities

```typescript
// lib/utils.ts uses cn() from class-variance-authority
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
  });

  it('handles tailwind conflicts', () => {
    // tailwind-merge functionality
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
```

## Server Components Testing

Next.js Server Components require special handling:

```typescript
// For async server components
describe('DestinationPage (Server Component)', () => {
  it('fetches destination data', async () => {
    vi.mocked(Page.findOne).mockResolvedValue({
      slug: 'hanoi',
      title: 'Hanoi Travel Guide',
      content: 'Guide content...',
    });

    // Render the async component
    const { props } = await getServerSideProps({ params: { slug: 'hanoi' } });

    expect(props.destination.title).toBe('Hanoi Travel Guide');
  });
});
```

## Affiliate Link Testing

When testing affiliate widgets:

```typescript
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from '@/lib/analytics';

describe('BookingWidget', () => {
  it('tracks click on booking.com link', async () => {
    const user = userEvent.setup();
    render(<BookingWidget destination="hanoi" />);

    await user.click(screen.getByRole('link', { name: /find hotels/i }));

    expect(trackEvent).toHaveBeenCalledWith('affiliate_click', {
      provider: 'booking.com',
      destination: 'hanoi',
      page: expect.any(String),
    });
  });

  it('includes affiliate parameters in URL', () => {
    render(<BookingWidget destination="hanoi" />);

    const link = screen.getByRole('link', { name: /find hotels/i });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('aid=')
    );
  });
});
```

## SEO & Metadata Testing

```typescript
describe('Page Metadata', () => {
  it('generates correct metadata for destination page', () => {
    const metadata = generateMetadata({
      params: { slug: 'hanoi' },
    });

    expect(metadata.title).toContain('Hanoi');
    expect(metadata.description).toBeTruthy();
    expect(metadata.openGraph).toBeDefined();
  });

  it('includes structured data for destinations', () => {
    const structuredData = generateStructuredData('hanoi');

    expect(structuredData['@type']).toBe('Place');
    expect(structuredData.name).toBe('Hanoi');
  });
});
```

## Common Test Fixtures

Create these in `tests/fixtures/`:

```typescript
// tests/fixtures/destinations.ts
export const mockDestination: DestinationCardData = { /* ... */ };
export const mockDestinations: DestinationCardData[] = [ /* ... */ ];

// tests/fixtures/pages.ts
export const mockPage = {
  slug: 'about',
  title: 'About Us',
  content: 'Page content...',
  status: 'published',
};

// tests/fixtures/users.ts (if auth is added)
export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
};
```

## Coverage Exceptions

Don't aim for 100% coverage on:

- Radix UI component wrappers in `/components/ui/` (already tested by Radix)
- Simple barrel exports (`index.ts` files)
- Next.js configuration files
- Tailwind/PostCSS config
- Type definition files

## Running Tests for Specific Features

```bash
# Test all destination-related code
npm test destination

# Test all components
npm test component

# Test database models
npm test db/models

# Test with coverage for lib directory
npm test -- lib --coverage
```

## Best Practices for This Project

1. **Use Realistic Data**: Use actual destination names and data from `lib/constants/destinations.ts`

2. **Mock MongoDB Consistently**: Always mock at `@/lib/db/mongodb` level

3. **Test Accessibility**: This is a public-facing site, ensure proper ARIA labels and roles

4. **Test Responsive Behavior**: Many components have mobile/desktop differences

5. **Test Loading States**: Server components often have loading states

6. **Test Error Boundaries**: Pages should gracefully handle missing data

7. **Mock Next.js Modules**: Use the global mocks in `tests/setup.ts`

8. **Test Image Optimization**: Verify Next/Image usage with proper sizes

9. **Test SEO Elements**: Check meta tags, structured data, and heading hierarchy

10. **Avoid Testing Styling**: Don't test Tailwind classes; test behavior instead
