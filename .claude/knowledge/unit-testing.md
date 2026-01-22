# Unit Testing Best Practices

Guidelines for writing unit tests for pure functions, utilities, and business logic.

## What is a Unit Test?

A unit test tests a single "unit" of code in isolation:
- Pure functions
- Utility functions
- Helper functions
- Class methods
- Business logic
- Data transformations
- Calculations
- Validations

## File Structure

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { functionName } from '@/path/to/module';

describe('functionName', () => {
  // Setup
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Tests
  it('handles normal case', () => {
    // Test implementation
  });

  it('handles edge case', () => {
    // Test implementation
  });

  it('throws error for invalid input', () => {
    // Test implementation
  });
});
```

## Testing Pure Functions

Pure functions are the easiest to test - same input always produces same output.

### Example: String Formatting

```typescript
// lib/utils/format.ts
export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} ₫`;
}

// tests/unit/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatVND } from '@/lib/utils/format';

describe('formatVND', () => {
  it('formats positive numbers with thousand separators', () => {
    expect(formatVND(1000000)).toBe('1,000,000 ₫');
  });

  it('formats small numbers without separators', () => {
    expect(formatVND(500)).toBe('500 ₫');
  });

  it('formats zero correctly', () => {
    expect(formatVND(0)).toBe('0 ₫');
  });

  it('handles decimal numbers by rounding', () => {
    expect(formatVND(999.99)).toBe('1,000 ₫');
  });

  it('throws error for negative amounts', () => {
    expect(() => formatVND(-1000)).toThrow('Amount must be positive');
  });
});
```

## Testing Functions with Dependencies

When testing functions that depend on other modules, mock the dependencies.

### Example: API Utility

```typescript
// lib/api/destinations.ts
import { fetchFromCMS } from '@/lib/cms/client';

export async function getDestination(slug: string) {
  const data = await fetchFromCMS(`/destinations/${slug}`);
  return {
    ...data,
    visited: false,
    bookmarked: false,
  };
}

// tests/unit/api/destinations.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getDestination } from '@/lib/api/destinations';
import { fetchFromCMS } from '@/lib/cms/client';

// Mock the dependency
vi.mock('@/lib/cms/client', () => ({
  fetchFromCMS: vi.fn(),
}));

describe('getDestination', () => {
  it('fetches destination and adds default properties', async () => {
    const mockData = {
      slug: 'hanoi',
      title: 'Hanoi',
      description: 'Capital of Vietnam',
    };

    vi.mocked(fetchFromCMS).mockResolvedValue(mockData);

    const result = await getDestination('hanoi');

    expect(fetchFromCMS).toHaveBeenCalledWith('/destinations/hanoi');
    expect(result).toEqual({
      ...mockData,
      visited: false,
      bookmarked: false,
    });
  });

  it('throws error when destination not found', async () => {
    vi.mocked(fetchFromCMS).mockRejectedValue(new Error('Not found'));

    await expect(getDestination('invalid')).rejects.toThrow('Not found');
  });
});
```

## Testing Calculations

### Example: Budget Calculator

```typescript
// lib/utils/budget.ts
export interface DailyBudget {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
}

export function calculateTripBudget(
  dailyBudget: DailyBudget,
  days: number,
  contingency: number = 0.1
): number {
  if (days <= 0) {
    throw new Error('Days must be positive');
  }

  const dailyTotal =
    dailyBudget.accommodation +
    dailyBudget.food +
    dailyBudget.transport +
    dailyBudget.activities;

  const subtotal = dailyTotal * days;
  const contingencyAmount = subtotal * contingency;

  return Math.round(subtotal + contingencyAmount);
}

// tests/unit/utils/budget.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTripBudget, DailyBudget } from '@/lib/utils/budget';

describe('calculateTripBudget', () => {
  const standardBudget: DailyBudget = {
    accommodation: 30,
    food: 25,
    transport: 10,
    activities: 20,
  };

  it('calculates total budget for multi-day trip', () => {
    const result = calculateTripBudget(standardBudget, 5);

    // (30+25+10+20) * 5 = 425
    // 425 + (425 * 0.1) = 467.5 → 468
    expect(result).toBe(468);
  });

  it('calculates budget for single day trip', () => {
    const result = calculateTripBudget(standardBudget, 1);

    // 85 + (85 * 0.1) = 93.5 → 94
    expect(result).toBe(94);
  });

  it('applies custom contingency rate', () => {
    const result = calculateTripBudget(standardBudget, 5, 0.2);

    // 425 + (425 * 0.2) = 510
    expect(result).toBe(510);
  });

  it('applies zero contingency when specified', () => {
    const result = calculateTripBudget(standardBudget, 5, 0);

    expect(result).toBe(425);
  });

  it('handles budget with all zeros', () => {
    const zeroBudget: DailyBudget = {
      accommodation: 0,
      food: 0,
      transport: 0,
      activities: 0,
    };

    const result = calculateTripBudget(zeroBudget, 5);

    expect(result).toBe(0);
  });

  it('throws error for zero days', () => {
    expect(() => calculateTripBudget(standardBudget, 0)).toThrow(
      'Days must be positive'
    );
  });

  it('throws error for negative days', () => {
    expect(() => calculateTripBudget(standardBudget, -5)).toThrow(
      'Days must be positive'
    );
  });

  it('rounds result to nearest integer', () => {
    const oddBudget: DailyBudget = {
      accommodation: 33,
      food: 27,
      transport: 11,
      activities: 19,
    };

    const result = calculateTripBudget(oddBudget, 3);

    // (33+27+11+19) * 3 = 270
    // 270 + 27 = 297
    expect(result).toBe(297);
  });
});
```

## Testing Validation Functions

### Example: Input Validation

```typescript
// lib/utils/validation.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// tests/unit/utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { isValidEmail } from '@/lib/utils/validation';

describe('isValidEmail', () => {
  // Valid emails
  it('accepts standard email format', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('accepts email with plus sign', () => {
    expect(isValidEmail('user+tag@example.com')).toBe(true);
  });

  it('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).toBe(true);
  });

  it('accepts email with numbers', () => {
    expect(isValidEmail('user123@example456.com')).toBe(true);
  });

  // Invalid emails
  it('rejects email without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('rejects email without domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('rejects email without extension', () => {
    expect(isValidEmail('user@example')).toBe(false);
  });

  it('rejects email with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
```

## Testing Async Functions

### Example: Data Fetching

```typescript
// lib/api/pages.ts
export async function fetchPageContent(slug: string): Promise<PageContent> {
  const response = await fetch(`/api/pages/${slug}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.statusText}`);
  }

  return response.json();
}

// tests/unit/api/pages.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPageContent } from '@/lib/api/pages';

// Mock global fetch
global.fetch = vi.fn();

describe('fetchPageContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and returns page content successfully', async () => {
    const mockContent = {
      slug: 'hanoi',
      title: 'Hanoi Guide',
      content: 'Complete travel guide...',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockContent,
    } as Response);

    const result = await fetchPageContent('hanoi');

    expect(fetch).toHaveBeenCalledWith('/api/pages/hanoi');
    expect(result).toEqual(mockContent);
  });

  it('throws error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    } as Response);

    await expect(fetchPageContent('invalid')).rejects.toThrow(
      'Failed to fetch page: Not Found'
    );
  });

  it('throws error when network fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(fetchPageContent('hanoi')).rejects.toThrow('Network error');
  });
});
```

## Testing Array/Object Transformations

### Example: Data Mapping

```typescript
// lib/utils/transform.ts
export interface Destination {
  id: string;
  name: string;
  slug: string;
  featured: boolean;
}

export function sortDestinationsByName(destinations: Destination[]): Destination[] {
  return [...destinations].sort((a, b) => a.name.localeCompare(b.name));
}

export function getFeaturedDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter(d => d.featured);
}

// tests/unit/utils/transform.test.ts
import { describe, it, expect } from 'vitest';
import {
  sortDestinationsByName,
  getFeaturedDestinations,
  Destination,
} from '@/lib/utils/transform';

describe('sortDestinationsByName', () => {
  it('sorts destinations alphabetically', () => {
    const destinations: Destination[] = [
      { id: '1', name: 'Hoi An', slug: 'hoi-an', featured: false },
      { id: '2', name: 'Hanoi', slug: 'hanoi', featured: true },
      { id: '3', name: 'Da Nang', slug: 'da-nang', featured: false },
    ];

    const result = sortDestinationsByName(destinations);

    expect(result[0].name).toBe('Da Nang');
    expect(result[1].name).toBe('Hanoi');
    expect(result[2].name).toBe('Hoi An');
  });

  it('handles empty array', () => {
    expect(sortDestinationsByName([])).toEqual([]);
  });

  it('handles single destination', () => {
    const destination: Destination = {
      id: '1',
      name: 'Hanoi',
      slug: 'hanoi',
      featured: true,
    };

    const result = sortDestinationsByName([destination]);

    expect(result).toEqual([destination]);
  });

  it('does not mutate original array', () => {
    const destinations: Destination[] = [
      { id: '1', name: 'Hoi An', slug: 'hoi-an', featured: false },
      { id: '2', name: 'Hanoi', slug: 'hanoi', featured: true },
    ];

    const original = [...destinations];
    sortDestinationsByName(destinations);

    expect(destinations).toEqual(original);
  });
});

describe('getFeaturedDestinations', () => {
  it('returns only featured destinations', () => {
    const destinations: Destination[] = [
      { id: '1', name: 'Hoi An', slug: 'hoi-an', featured: false },
      { id: '2', name: 'Hanoi', slug: 'hanoi', featured: true },
      { id: '3', name: 'Da Nang', slug: 'da-nang', featured: true },
    ];

    const result = getFeaturedDestinations(destinations);

    expect(result).toHaveLength(2);
    expect(result.every(d => d.featured)).toBe(true);
  });

  it('returns empty array when no featured destinations', () => {
    const destinations: Destination[] = [
      { id: '1', name: 'Hoi An', slug: 'hoi-an', featured: false },
    ];

    expect(getFeaturedDestinations(destinations)).toEqual([]);
  });
});
```

## Testing Date/Time Functions

Always mock dates for consistent test results.

```typescript
// lib/utils/dates.ts
export function isTripInPast(endDate: Date): boolean {
  return endDate < new Date();
}

// tests/unit/utils/dates.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isTripInPast } from '@/lib/utils/dates';

describe('isTripInPast', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for dates in the past', () => {
    const pastDate = new Date('2024-06-10T12:00:00Z');
    expect(isTripInPast(pastDate)).toBe(true);
  });

  it('returns false for dates in the future', () => {
    const futureDate = new Date('2024-06-20T12:00:00Z');
    expect(isTripInPast(futureDate)).toBe(false);
  });

  it('returns false for current date', () => {
    const currentDate = new Date('2024-06-15T12:00:00Z');
    expect(isTripInPast(currentDate)).toBe(false);
  });
});
```

## Common Patterns

### Testing Error Throwing
```typescript
// Synchronous
expect(() => riskyFunction()).toThrow('Error message');
expect(() => riskyFunction()).toThrow(TypeError);

// Asynchronous
await expect(asyncRiskyFunction()).rejects.toThrow('Error message');
await expect(asyncRiskyFunction()).rejects.toThrow(TypeError);
```

### Testing Truthiness
```typescript
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();
```

### Testing Numbers
```typescript
expect(value).toBe(100);
expect(value).toBeGreaterThan(99);
expect(value).toBeLessThan(101);
expect(value).toBeCloseTo(100.001, 2); // For floating point
```

### Testing Strings
```typescript
expect(str).toBe('exact match');
expect(str).toContain('substring');
expect(str).toMatch(/regex/);
expect(str).toHaveLength(10);
```

### Testing Arrays
```typescript
expect(arr).toHaveLength(3);
expect(arr).toContain('value');
expect(arr).toEqual(['a', 'b', 'c']); // Deep equality
expect(arr).toContainEqual({ id: 1 }); // Contains object
```

### Testing Objects
```typescript
expect(obj).toEqual({ key: 'value' }); // Deep equality
expect(obj).toMatchObject({ key: 'value' }); // Partial match
expect(obj).toHaveProperty('key');
expect(obj).toHaveProperty('key', 'value');
```

## Checklist for Unit Tests

✅ Test happy path with valid input
✅ Test edge cases (empty, zero, max values)
✅ Test error cases (invalid input, exceptions)
✅ Test boundary conditions
✅ Mock all external dependencies
✅ Use AAA pattern (Arrange-Act-Assert)
✅ One logical assertion per test
✅ Descriptive test names
✅ Tests are independent
✅ Tests run fast (< 100ms each)

## What NOT to Test

❌ Third-party library functions
❌ Language built-ins (Array.map, String.split)
❌ Simple getters/setters
❌ Type definitions
❌ Constants
