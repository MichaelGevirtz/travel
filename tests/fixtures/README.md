# Test Fixtures

Reusable test data for consistent testing across the project.

## What are Fixtures?

Fixtures are pre-defined test data that can be reused across multiple tests. They ensure consistency and reduce boilerplate.

## Available Fixtures

### destinations.ts

Mock destination data matching the `DestinationCardData` interface.

```typescript
import {
  mockDestination,
  mockDestinationHCMC,
  mockDestinationBeach,
  mockDestinationMountain,
  mockDestinations,
  mockDestinationMinimal,
} from '@/tests/fixtures/destinations';

// Use in tests
it('renders destination card', () => {
  render(<DestinationCard {...mockDestination} />);
  expect(screen.getByText('Hanoi')).toBeInTheDocument();
});

// Test with multiple destinations
it('renders list of destinations', () => {
  render(<DestinationGrid destinations={mockDestinations} />);
  expect(screen.getAllByRole('article')).toHaveLength(4);
});
```

**Available fixtures:**
- `mockDestination` - Hanoi (city, north)
- `mockDestinationHCMC` - Ho Chi Minh City (city, south)
- `mockDestinationBeach` - Da Nang (beach, central)
- `mockDestinationMountain` - Sapa (mountain, north)
- `mockDestinations` - Array of all above
- `mockDestinationMinimal` - Minimal test data

### pages.ts

Mock MongoDB page documents.

```typescript
import {
  mockPage,
  mockPageDraft,
  mockPageAbout,
  mockPages,
  createMockPage,
} from '@/tests/fixtures/pages';

// Use in tests
vi.mock('@/lib/db/mongodb', () => ({
  Page: {
    findOne: vi.fn(),
  },
}));

it('fetches page from database', async () => {
  vi.mocked(Page.findOne).mockResolvedValue(mockPage);

  const result = await getPageBySlug('hanoi');

  expect(result.title).toBe('Hanoi Travel Guide');
});

// Create custom page with factory
it('handles custom page data', () => {
  const customPage = createMockPage({
    slug: 'custom',
    title: 'Custom Page',
  });

  expect(customPage.slug).toBe('custom');
  expect(customPage.status).toBe('published'); // Inherits default
});
```

**Available fixtures:**
- `mockPage` - Published Hanoi guide
- `mockPageDraft` - Draft page (not published)
- `mockPageAbout` - About page
- `mockPages` - Array of published pages
- `createMockPage()` - Factory function for custom pages

## Creating New Fixtures

When creating new fixtures:

1. **Match real data structures** - Use actual interfaces from the project
2. **Provide variants** - Create different states (published/draft, different types)
3. **Use realistic data** - Real city names, realistic prices
4. **Export as named exports** - Easier to import specific fixtures
5. **Add factory functions** - For easy customization

### Example: Creating a new fixture file

```typescript
// tests/fixtures/bookings.ts
export const mockBooking = {
  id: 'booking-123',
  hotelName: 'Hanoi Luxury Hotel',
  checkIn: new Date('2024-07-01'),
  checkOut: new Date('2024-07-05'),
  status: 'confirmed',
  totalPrice: 200,
};

export const mockBookingPending = {
  ...mockBooking,
  id: 'booking-456',
  status: 'pending',
};

export function createMockBooking(overrides = {}) {
  return {
    ...mockBooking,
    ...overrides,
  };
}
```

## Best Practices

✅ **DO:**
- Use fixtures for consistent test data
- Create variants for different scenarios
- Keep fixtures simple and focused
- Export named exports for clarity
- Document available fixtures

❌ **DON'T:**
- Create fixtures for one-off test data
- Make fixtures overly complex
- Add logic to fixtures
- Mutate shared fixtures in tests (spread them first)

## Updating Fixtures

When the data structure changes:

1. Update the relevant fixture file
2. Run all tests to catch breaking changes
3. Update fixture documentation if needed

## Adding More Fixtures

Common fixtures to add as the project grows:

- `users.ts` - User authentication data (when auth is added)
- `bookings.ts` - Hotel/tour bookings
- `reviews.ts` - User reviews
- `analytics.ts` - Analytics events
- `itineraries.ts` - Sample travel itineraries
