# Mocking Strategies

Comprehensive guide to mocking external dependencies in tests.

## Why Mock?

Mocking allows you to:
- Test code in isolation
- Make tests fast and deterministic
- Avoid external dependencies (APIs, databases, file system)
- Simulate error conditions
- Test edge cases that are hard to reproduce

## Types of Mocking

### 1. Module Mocking

Mock entire modules with `vi.mock()`.

```typescript
import { vi } from 'vitest';

// Mock before imports
vi.mock('@/lib/api/destinations', () => ({
  fetchDestination: vi.fn(),
  createDestination: vi.fn(),
}));

import { fetchDestination } from '@/lib/api/destinations';

describe('DestinationPage', () => {
  it('fetches destination on mount', async () => {
    vi.mocked(fetchDestination).mockResolvedValue({
      slug: 'hanoi',
      name: 'Hanoi',
    });

    // Test implementation
  });
});
```

### 2. Function Mocking

Mock individual functions with `vi.fn()`.

```typescript
const mockCallback = vi.fn();

// Use in component
render(<Button onClick={mockCallback} />);

// Assert it was called
expect(mockCallback).toHaveBeenCalledTimes(1);
expect(mockCallback).toHaveBeenCalledWith({ id: '123' });
```

### 3. Spy Mocking

Spy on existing functions without replacing them.

```typescript
const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

// Use Math.random() in your code
const result = generateRandomId();

expect(spy).toHaveBeenCalled();
expect(result).toBe('expected-id-based-on-0.5');

spy.mockRestore();
```

## Mocking Next.js Modules

### Next.js Navigation

Already mocked globally in `tests/setup.ts`:

```typescript
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
```

Override in specific tests:

```typescript
import { useRouter } from 'next/navigation';

describe('Navigation', () => {
  it('navigates to destination page', async () => {
    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    } as any);

    const user = userEvent.setup();
    render(<DestinationCard slug="hanoi" />);

    await user.click(screen.getByRole('link'));

    expect(pushMock).toHaveBeenCalledWith('/vietnam/destinations/hanoi');
  });
});
```

### Next.js Image

Already mocked globally in `tests/setup.ts`:

```typescript
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => ({
    type: 'img',
    props: { src, alt, ...props },
  }),
}));
```

### Next.js Link

```typescript
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));
```

## Mocking MongoDB/Mongoose

### Option 1: Mock the Module

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
  Destination: {
    find: vi.fn(),
    findOne: vi.fn(),
    // ... other methods
  },
}));

import { Page } from '@/lib/db/mongodb';

describe('getPageBySlug', () => {
  it('fetches page from database', async () => {
    const mockPage = {
      slug: 'about',
      title: 'About Us',
      content: 'We are...',
    };

    vi.mocked(Page.findOne).mockResolvedValue(mockPage);

    const result = await getPageBySlug('about');

    expect(Page.findOne).toHaveBeenCalledWith({ slug: 'about' });
    expect(result).toEqual(mockPage);
  });

  it('returns null when page not found', async () => {
    vi.mocked(Page.findOne).mockResolvedValue(null);

    const result = await getPageBySlug('nonexistent');

    expect(result).toBeNull();
  });
});
```

### Option 2: Mock at the Function Level

```typescript
import { vi } from 'vitest';
import * as db from '@/lib/db/mongodb';

vi.spyOn(db, 'connectDB').mockResolvedValue(undefined);
vi.spyOn(db.Page, 'findOne').mockResolvedValue({
  slug: 'test',
  title: 'Test',
});
```

## Mocking Fetch/API Calls

### Global Fetch Mock

```typescript
import { vi } from 'vitest';

global.fetch = vi.fn();

describe('fetchDestinations', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches destinations successfully', async () => {
    const mockDestinations = [
      { slug: 'hanoi', name: 'Hanoi' },
      { slug: 'hcmc', name: 'Ho Chi Minh City' },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockDestinations,
    } as Response);

    const result = await fetchDestinations();

    expect(fetch).toHaveBeenCalledWith('/api/destinations');
    expect(result).toEqual(mockDestinations);
  });

  it('throws error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error',
    } as Response);

    await expect(fetchDestinations()).rejects.toThrow(
      'Failed to fetch destinations'
    );
  });

  it('handles network errors', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(fetchDestinations()).rejects.toThrow('Network error');
  });
});
```

### Mocking fetch for Specific URLs

```typescript
global.fetch = vi.fn((url: string) => {
  if (url.includes('/api/destinations')) {
    return Promise.resolve({
      ok: true,
      json: async () => [{ slug: 'hanoi', name: 'Hanoi' }],
    } as Response);
  }

  if (url.includes('/api/pages')) {
    return Promise.resolve({
      ok: true,
      json: async () => ({ title: 'Page Title' }),
    } as Response);
  }

  return Promise.reject(new Error('Not found'));
});
```

## Mocking External APIs

### Anthropic/Claude API

```typescript
vi.mock('@anthropic-ai/sdk', () => ({
  Anthropic: vi.fn(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        id: 'msg_123',
        content: [
          {
            type: 'text',
            text: 'This is a generated travel guide for Hanoi...',
          },
        ],
        model: 'claude-3-5-sonnet-20241022',
        role: 'assistant',
      }),
    },
  })),
}));

import { Anthropic } from '@anthropic-ai/sdk';

describe('generateDestinationContent', () => {
  it('generates content using Claude API', async () => {
    const result = await generateDestinationContent('Hanoi');

    expect(result).toContain('travel guide for Hanoi');

    const anthropic = new Anthropic();
    expect(anthropic.messages.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: expect.any(String),
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: 'user',
            content: expect.stringContaining('Hanoi'),
          }),
        ]),
      })
    );
  });

  it('handles API errors gracefully', async () => {
    const anthropic = new Anthropic();
    vi.mocked(anthropic.messages.create).mockRejectedValue(
      new Error('API rate limit exceeded')
    );

    await expect(generateDestinationContent('Hanoi')).rejects.toThrow(
      'API rate limit exceeded'
    );
  });
});
```

### Booking.com / Affiliate APIs

```typescript
vi.mock('@/lib/api/booking', () => ({
  searchHotels: vi.fn(),
  getHotelDetails: vi.fn(),
}));

import { searchHotels } from '@/lib/api/booking';

describe('HotelSearch', () => {
  it('displays search results from Booking.com API', async () => {
    const mockHotels = [
      {
        id: 'hotel-1',
        name: 'Hanoi Luxury Hotel',
        price: 50,
        rating: 8.5,
      },
      {
        id: 'hotel-2',
        name: 'Old Quarter Hostel',
        price: 15,
        rating: 7.8,
      },
    ];

    vi.mocked(searchHotels).mockResolvedValue(mockHotels);

    render(<HotelSearch destination="hanoi" />);

    await waitFor(() => {
      expect(screen.getByText('Hanoi Luxury Hotel')).toBeInTheDocument();
      expect(screen.getByText('Old Quarter Hostel')).toBeInTheDocument();
    });
  });
});
```

## Mocking Date/Time

### Fixed Date

```typescript
import { vi, beforeEach, afterEach } from 'vitest';

describe('DateDependentFeature', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates days until trip', () => {
    const tripDate = new Date('2024-06-20T12:00:00Z');
    const result = calculateDaysUntil(tripDate);

    expect(result).toBe(5);
  });

  it('identifies expired bookings', () => {
    const expiredBooking = {
      id: '123',
      date: new Date('2024-06-10T12:00:00Z'),
    };

    expect(isBookingExpired(expiredBooking)).toBe(true);
  });
});
```

### Advancing Time

```typescript
describe('AutoSave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('auto-saves after 5 seconds of inactivity', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup({ delay: null });

    render(<Editor onSave={onSave} />);

    await user.type(screen.getByRole('textbox'), 'Some content');

    // Advance time by 5 seconds
    vi.advanceTimersByTime(5000);

    expect(onSave).toHaveBeenCalledWith('Some content');
  });
});
```

## Mocking Environment Variables

```typescript
describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('uses production API in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

    const config = getConfig();

    expect(config.apiUrl).toBe('https://api.example.com');
  });

  it('uses development API in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';

    const config = getConfig();

    expect(config.apiUrl).toBe('http://localhost:3000');
  });
});
```

## Mocking Local Storage

```typescript
describe('Bookmarks', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('saves bookmark to localStorage', () => {
    const destination = { slug: 'hanoi', name: 'Hanoi' };

    saveBookmark(destination);

    const saved = localStorage.getItem('bookmarks');
    expect(saved).toBeTruthy();
    expect(JSON.parse(saved!)).toContainEqual(destination);
  });

  it('retrieves bookmarks from localStorage', () => {
    localStorage.setItem(
      'bookmarks',
      JSON.stringify([
        { slug: 'hanoi', name: 'Hanoi' },
        { slug: 'hcmc', name: 'Ho Chi Minh City' },
      ])
    );

    const bookmarks = getBookmarks();

    expect(bookmarks).toHaveLength(2);
    expect(bookmarks[0].name).toBe('Hanoi');
  });
});
```

## Mocking File System (Node.js)

```typescript
import { vi } from 'vitest';
import * as fs from 'fs/promises';

vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

describe('FileHandler', () => {
  it('reads file content', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('file content');

    const content = await readConfigFile('config.json');

    expect(fs.readFile).toHaveBeenCalledWith('config.json', 'utf-8');
    expect(content).toBe('file content');
  });

  it('writes file content', async () => {
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);

    await saveConfigFile('config.json', '{ "key": "value" }');

    expect(fs.writeFile).toHaveBeenCalledWith(
      'config.json',
      '{ "key": "value" }',
      'utf-8'
    );
  });
});
```

## Partial Mocking

Mock only specific functions from a module:

```typescript
import { vi } from 'vitest';
import * as utils from '@/lib/utils';

vi.spyOn(utils, 'formatDate').mockReturnValue('2024-06-15');

// Other functions in utils still work normally
const result = utils.formatCurrency(100); // Works as expected
```

## Mock Implementation

### Simple Return Value

```typescript
const mockFn = vi.fn().mockReturnValue('fixed value');
```

### Multiple Return Values

```typescript
const mockFn = vi.fn()
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')
  .mockReturnValue('subsequent calls');

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'subsequent calls'
mockFn(); // 'subsequent calls'
```

### Async Return Value

```typescript
const mockFn = vi.fn().mockResolvedValue({ data: 'success' });
```

### Async Rejection

```typescript
const mockFn = vi.fn().mockRejectedValue(new Error('Failed'));
```

### Custom Implementation

```typescript
const mockFn = vi.fn((input: string) => {
  if (input === 'hanoi') {
    return { slug: 'hanoi', name: 'Hanoi' };
  }
  throw new Error('Not found');
});
```

## Checking Mock Calls

```typescript
const mockFn = vi.fn();

mockFn('arg1', 'arg2');
mockFn('arg3');

// Called at all
expect(mockFn).toHaveBeenCalled();

// Called specific number of times
expect(mockFn).toHaveBeenCalledTimes(2);

// Called with specific arguments
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg3');

// Called with partial match
expect(mockFn).toHaveBeenCalledWith(
  expect.stringContaining('arg'),
  expect.any(String)
);

// Check all calls
expect(mockFn.mock.calls).toEqual([
  ['arg1', 'arg2'],
  ['arg3'],
]);
```

## Resetting Mocks

```typescript
describe('Test Suite', () => {
  const mockFn = vi.fn();

  beforeEach(() => {
    // Clear call history but keep implementation
    vi.clearAllMocks();

    // OR: Reset implementation to undefined
    vi.resetAllMocks();

    // OR: Reset and restore original implementation
    vi.restoreAllMocks();
  });
});
```

## Best Practices

✅ **DO:**
- Mock at the module boundary
- Use `beforeEach` to reset mocks
- Mock external dependencies (APIs, databases, file system)
- Keep mocks simple and focused
- Test both success and error cases

❌ **DON'T:**
- Mock internal functions within the same module
- Over-mock (mock too many things)
- Create complex mock implementations
- Mock third-party library internals
- Forget to restore mocks after tests

## Common Mocking Patterns

### Mocking a Service Class

```typescript
vi.mock('@/lib/services/DestinationService', () => ({
  DestinationService: vi.fn(() => ({
    getAll: vi.fn().mockResolvedValue([]),
    getBySlug: vi.fn(),
    create: vi.fn(),
  })),
}));
```

### Mocking Default Exports

```typescript
vi.mock('@/lib/api/client', () => ({
  default: vi.fn(() => ({
    get: vi.fn(),
    post: vi.fn(),
  })),
}));
```

### Mocking Named Exports

```typescript
vi.mock('@/lib/utils', () => ({
  formatDate: vi.fn(),
  formatCurrency: vi.fn(),
  calculateTotal: vi.fn(),
}));
```

## Project-Specific Mocks

These mocks are commonly needed for the Vietnam Travel project:

### Destination API
```typescript
vi.mock('@/lib/api/destinations', () => ({
  fetchDestination: vi.fn(),
  fetchAllDestinations: vi.fn(),
}));
```

### MongoDB Models
```typescript
vi.mock('@/lib/db/mongodb', () => ({
  connectDB: vi.fn(),
  Page: { findOne: vi.fn(), find: vi.fn() },
  Destination: { findOne: vi.fn(), find: vi.fn() },
}));
```

### Analytics
```typescript
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
}));
```
