# Test Directory Structure

This directory contains all tests for the Vietnam Travel project.

## Directory Organization

```
tests/
├── unit/           # Unit tests for utilities, helpers, and pure functions
├── component/      # Component tests for React components
├── e2e/           # End-to-end tests (Playwright/Cypress)
├── mocks/         # Shared mock data and mock implementations
├── fixtures/      # Test fixtures and sample data
└── setup.ts       # Global test setup and configuration
```

## Naming Conventions

- Test files should match the source file name with `.test.ts` or `.test.tsx` extension
- Example: `app/page.tsx` → `tests/component/page.test.tsx`
- Example: `lib/utils/format.ts` → `tests/unit/utils/format.test.ts`

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui
```

## Coverage Thresholds

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## Writing Tests

### Unit Tests
For pure functions, utilities, and business logic:
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/utils';

describe('myFunction', () => {
  it('returns expected result for valid input', () => {
    expect(myFunction('input')).toBe('output');
  });
});
```

### Component Tests
For React components:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Mocking

### Next.js Router
Already mocked globally in `setup.ts`

### Next.js Image
Already mocked globally in `setup.ts`

### Custom Mocks
Place shared mocks in `tests/mocks/` directory
```typescript
// tests/mocks/mockDestination.ts
export const mockDestination = {
  slug: 'hanoi',
  title: 'Hanoi',
  content: 'Travel guide...',
};
```
