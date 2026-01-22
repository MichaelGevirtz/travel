# Testing Guide

Complete guide to testing in the Vietnam Travel project.

## Table of Contents

- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Using the Test Agent](#using-the-test-agent)
- [Test Structure](#test-structure)
- [Best Practices](#best-practices)
- [Coverage](#coverage)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Run Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- path/to/test.test.ts
```

### Write Your First Test

```typescript
// tests/unit/utils/myFunction.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/utils/myFunction';

describe('myFunction', () => {
  it('returns expected result', () => {
    expect(myFunction('input')).toBe('output');
  });
});
```

## Running Tests

### Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in watch mode |
| `npm run test:run` | Run all tests once (for CI) |
| `npm run test:watch` | Run tests in watch mode explicitly |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ui` | Run tests with Vitest UI |

### Run Specific Tests

```bash
# Run tests for a specific file
npm test -- tests/unit/utils/format.test.ts

# Run tests matching a pattern
npm test -- destination

# Run tests in a directory
npm test -- tests/component/

# Run single test by name
npm test -- -t "renders destination card"
```

## Writing Tests

### Unit Tests

For testing pure functions, utilities, and business logic:

```typescript
// tests/unit/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatVND } from '@/lib/utils/format';

describe('formatVND', () => {
  it('formats positive numbers with thousand separators', () => {
    expect(formatVND(1000000)).toBe('1,000,000 ₫');
  });

  it('throws error for negative amounts', () => {
    expect(() => formatVND(-1000)).toThrow('Amount must be positive');
  });
});
```

### Component Tests

For testing React components:

```typescript
// tests/component/DestinationCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { mockDestination } from '@/tests/fixtures/destinations';

describe('DestinationCard', () => {
  it('renders destination name', () => {
    render(<DestinationCard {...mockDestination} />);

    expect(screen.getByRole('heading', { name: 'Hanoi' }))
      .toBeInTheDocument();
  });
});
```

### Using Fixtures

Reuse common test data from fixtures:

```typescript
import {
  mockDestination,
  mockDestinations,
} from '@/tests/fixtures/destinations';

import { mockPage } from '@/tests/fixtures/pages';

// Use in your tests
it('renders multiple destinations', () => {
  render(<DestinationGrid destinations={mockDestinations} />);
  expect(screen.getAllByRole('article')).toHaveLength(4);
});
```

## Using the Test Agent

The test agent can automatically generate tests for your code.

### Manual Test Generation

Ask the agent to generate tests:

```
"Generate tests for components/destinations/DestinationCard.tsx"
```

The agent will:
1. Read and analyze the source file
2. Reference the knowledge base
3. Generate comprehensive tests
4. Create the test file
5. Run tests to verify they pass
6. Check coverage
7. Report results

### What the Agent Does

- ✅ Generates tests following best practices
- ✅ Includes happy path, edge cases, and error cases
- ✅ Mocks external dependencies correctly
- ✅ Ensures 80% coverage minimum
- ✅ Runs tests and verifies they pass
- ✅ Provides detailed report

### Agent Requirements

The agent ensures:
- Minimum 3 tests per function
- 80% statement coverage
- 75% branch coverage
- 80% function coverage
- 80% line coverage
- All tests pass

## Test Structure

### Directory Organization

```
tests/
├── unit/              # Unit tests for lib/ directory
│   ├── utils/
│   ├── constants/
│   └── db/
├── component/         # Component tests
│   ├── destinations/
│   ├── home/
│   └── layout/
├── e2e/              # End-to-end tests (future)
├── mocks/            # Shared mock implementations
├── fixtures/         # Test data and fixtures
│   ├── destinations.ts
│   └── pages.ts
└── setup.ts          # Global test configuration
```

### File Naming Convention

| Source File | Test File |
|-------------|-----------|
| `lib/utils.ts` | `tests/unit/utils.test.ts` |
| `lib/constants/destinations.ts` | `tests/unit/constants/destinations.test.ts` |
| `components/Hero.tsx` | `tests/component/Hero.test.tsx` |
| `app/page.tsx` | `tests/component/page.test.tsx` |

## Best Practices

### Do's ✅

- **Test behavior, not implementation**
- **Use AAA pattern** (Arrange, Act, Assert)
- **One assertion per test** (one logical concept)
- **Descriptive test names** (full sentences)
- **Mock external dependencies** (APIs, database, file system)
- **Test edge cases** (empty, null, zero, max values)
- **Test error conditions** (invalid input, exceptions)
- **Use fixtures for common data**
- **Keep tests fast** (< 1 second each)
- **Make tests independent** (no shared state)

### Don'ts ❌

- Don't test implementation details
- Don't test third-party libraries
- Don't make tests depend on each other
- Don't use real API calls or database
- Don't forget to mock Next.js modules
- Don't skip edge cases and errors
- Don't use vague test names
- Don't test Tailwind CSS classes

### Querying Elements

Use queries in this priority order:

1. **`getByRole`** - Most preferred, best for accessibility
   ```typescript
   screen.getByRole('button', { name: /submit/i });
   screen.getByRole('heading', { level: 1 });
   ```

2. **`getByLabelText`** - For form fields
   ```typescript
   screen.getByLabelText('Email address');
   ```

3. **`getByPlaceholderText`** - For inputs with placeholders
   ```typescript
   screen.getByPlaceholderText('Enter your email');
   ```

4. **`getByText`** - For text content
   ```typescript
   screen.getByText('Welcome to Vietnam');
   ```

5. **`getByTestId`** - Last resort only
   ```typescript
   screen.getByTestId('custom-widget');
   ```

### Testing User Interactions

Always use `userEvent` instead of `fireEvent`:

```typescript
import userEvent from '@testing-library/user-event';

it('handles button click', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  render(<Button onClick={onClick} />);

  await user.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
```

## Coverage

### Coverage Thresholds

| Metric | Threshold |
|--------|-----------|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

### Check Coverage

```bash
# Run with coverage
npm run test:coverage

# Coverage report opens in browser
open coverage/index.html
```

### What to Test

**High Priority:**
- Business logic and calculations
- User interactions
- Error handling
- Critical user flows (booking, navigation)

**Don't Test:**
- Third-party libraries
- Radix UI component wrappers
- Simple barrel exports (index.ts)
- Configuration files
- Type definitions

## Troubleshooting

### Tests Won't Run

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install

# Run tests again
npm test
```

### Import Errors

Make sure your tsconfig.json has correct path mapping:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Mock Not Working

Ensure mocks are defined before imports:

```typescript
// ✅ Correct
vi.mock('@/lib/api/client');
import { fetchData } from '@/lib/api/client';

// ❌ Wrong
import { fetchData } from '@/lib/api/client';
vi.mock('@/lib/api/client'); // Too late!
```

### Next.js Modules

Next.js modules (Image, Link, router) are already mocked globally in `tests/setup.ts`. You can override them in specific tests if needed.

### Type Errors

Add proper types to mocked functions:

```typescript
import { vi } from 'vitest';
import type { MyFunction } from '@/lib/utils';

const mockFunction = vi.fn() as vi.MockedFunction<typeof MyFunction>;
```

## Knowledge Base

Detailed testing documentation is available in `.claude/knowledge/`:

- **testing-principles.md** - Core testing principles
- **unit-testing.md** - Unit testing patterns
- **component-testing.md** - Component testing patterns
- **mocking-strategies.md** - How to mock dependencies
- **project-conventions.md** - Project-specific patterns

## Examples

### Testing a Utility Function

```typescript
// tests/unit/utils/budget.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTripBudget } from '@/lib/utils/budget';

describe('calculateTripBudget', () => {
  const dailyBudget = {
    accommodation: 30,
    food: 25,
    transport: 10,
    activities: 20,
  };

  it('calculates total budget for multi-day trip', () => {
    const result = calculateTripBudget(dailyBudget, 5);
    expect(result).toBe(468); // (30+25+10+20) * 5 * 1.1
  });

  it('throws error for zero days', () => {
    expect(() => calculateTripBudget(dailyBudget, 0))
      .toThrow('Days must be positive');
  });
});
```

### Testing with MongoDB

```typescript
// tests/unit/api/pages.test.ts
import { vi } from 'vitest';
import { Page } from '@/lib/db/mongodb';
import { getPageBySlug } from '@/lib/api/pages';

vi.mock('@/lib/db/mongodb', () => ({
  Page: {
    findOne: vi.fn(),
  },
}));

describe('getPageBySlug', () => {
  it('fetches published page', async () => {
    vi.mocked(Page.findOne).mockResolvedValue({
      slug: 'hanoi',
      title: 'Hanoi Guide',
      status: 'published',
    });

    const result = await getPageBySlug('hanoi');

    expect(Page.findOne).toHaveBeenCalledWith({
      slug: 'hanoi',
      status: 'published',
    });
    expect(result.title).toBe('Hanoi Guide');
  });
});
```

### Testing Async Components

```typescript
describe('DestinationList', () => {
  it('loads destinations on mount', async () => {
    render(<DestinationList />);

    // Wait for async data to load
    await waitFor(() => {
      expect(screen.getByText('Hanoi')).toBeInTheDocument();
    });
  });
});
```

## Getting Help

- Check the knowledge base in `.claude/knowledge/`
- Review existing tests in `tests/` directory
- Ask the test agent to generate tests
- See [Testing Library docs](https://testing-library.com/)
- See [Vitest docs](https://vitest.dev/)

## Contributing

When adding new features:

1. Write tests first (TDD) or immediately after
2. Ensure coverage meets thresholds
3. Follow existing test patterns
4. Add fixtures for reusable data
5. Update this guide if needed

---

**Happy Testing!** 🧪
