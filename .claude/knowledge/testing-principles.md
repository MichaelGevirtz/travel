# Testing Principles

Core principles for writing high-quality, maintainable tests.

## The Testing Pyramid

```
        /\
       /  \
      / E2E \      <- Few (Slow, Expensive, Brittle)
     /______\
    /        \
   / Integration \  <- Some (Medium Speed/Cost)
  /__________\
 /            \
/    Unit      \   <- Many (Fast, Cheap, Reliable)
/______________\
```

**Priority Order:**
1. **Unit Tests** (70%) - Test individual functions and logic
2. **Integration Tests** (20%) - Test component interactions
3. **E2E Tests** (10%) - Test critical user flows

## Core Principles

### 1. Test Behavior, Not Implementation

❌ **Bad - Testing Implementation:**
```typescript
it('calls setState with correct value', () => {
  const setState = vi.fn();
  const { result } = renderHook(() => useCounter(setState));
  result.current.increment();
  expect(setState).toHaveBeenCalledWith(expect.any(Function));
});
```

✅ **Good - Testing Behavior:**
```typescript
it('increments counter when increment button is clicked', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole('button', { name: /increment/i }));

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 2. Arrange-Act-Assert (AAA) Pattern

Every test should follow this structure:

```typescript
it('calculates trip cost correctly', () => {
  // Arrange - Set up test data and conditions
  const dailyBudget = 50;
  const days = 7;

  // Act - Execute the function being tested
  const result = calculateTripCost(dailyBudget, days);

  // Assert - Verify the result
  expect(result).toBe(350);
});
```

### 3. One Logical Assertion Per Test

❌ **Bad - Multiple Unrelated Assertions:**
```typescript
it('handles user profile', () => {
  const user = createUser();
  expect(user.name).toBe('John');
  expect(user.email).toContain('@');
  expect(user.age).toBeGreaterThan(0);
  expect(user.isActive).toBe(true);
  expect(user.roles).toContain('user');
});
```

✅ **Good - Focused Single Assertion:**
```typescript
it('creates user with valid email format', () => {
  const user = createUser({ email: 'test@example.com' });
  expect(user.email).toBe('test@example.com');
});

it('creates user with active status by default', () => {
  const user = createUser();
  expect(user.isActive).toBe(true);
});
```

**Exception:** Related assertions that verify the same behavior are OK:
```typescript
it('formats Vietnamese currency correctly', () => {
  const result = formatVND(1000000);
  expect(result).toBe('1,000,000 ₫');
  expect(result).toContain('₫');
});
```

### 4. Test Edge Cases and Boundaries

For every function, test:
- **Happy path** - Normal, expected input
- **Edge cases** - Boundary conditions (empty, zero, max values)
- **Error cases** - Invalid input, exceptions

```typescript
describe('calculateDiscount', () => {
  // Happy path
  it('applies 10% discount for eligible bookings', () => {
    expect(calculateDiscount(100, 0.1)).toBe(90);
  });

  // Edge cases
  it('handles zero discount rate', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  it('handles 100% discount', () => {
    expect(calculateDiscount(100, 1)).toBe(0);
  });

  it('handles zero price', () => {
    expect(calculateDiscount(0, 0.1)).toBe(0);
  });

  // Error cases
  it('throws error for negative price', () => {
    expect(() => calculateDiscount(-100, 0.1)).toThrow('Price must be positive');
  });

  it('throws error for invalid discount rate', () => {
    expect(() => calculateDiscount(100, 1.5)).toThrow('Discount rate must be between 0 and 1');
  });
});
```

### 5. Descriptive Test Names

Test names should be complete sentences describing what is being tested.

❌ **Bad:**
```typescript
it('works', () => { });
it('test booking', () => { });
it('returns true', () => { });
```

✅ **Good:**
```typescript
it('creates booking with valid dates', () => { });
it('throws error when check-out date is before check-in date', () => { });
it('applies early bird discount for bookings made 30 days in advance', () => { });
```

**Pattern:** `it('[action/behavior] [under condition] [expected result]')`

### 6. Keep Tests Independent

Each test should be completely independent and able to run in any order.

❌ **Bad - Tests Depend on Each Other:**
```typescript
let userId: string;

it('creates a user', () => {
  userId = createUser().id;
  expect(userId).toBeDefined();
});

it('fetches the user', () => {
  const user = getUser(userId); // Depends on previous test!
  expect(user).toBeDefined();
});
```

✅ **Good - Tests Are Independent:**
```typescript
it('creates a user', () => {
  const user = createUser({ name: 'John' });
  expect(user.id).toBeDefined();
});

it('fetches existing user by id', () => {
  const mockUser = { id: '123', name: 'John' };
  vi.mocked(getUser).mockResolvedValue(mockUser);

  const user = await getUser('123');
  expect(user).toEqual(mockUser);
});
```

### 7. Fast Tests

Tests should run quickly (< 1 second each).

**Strategies:**
- Mock external dependencies (APIs, databases)
- Avoid real network calls
- Use in-memory data structures
- Don't test third-party libraries

### 8. DRY with Caution

Don't over-abstract test setup. Tests should be readable even if slightly repetitive.

❌ **Bad - Over-Abstracted:**
```typescript
const setupTest = (variant: string, config: any) => {
  const wrapper = createWrapper(config);
  const result = wrapper.render(getComponent(variant));
  return processResult(result, config.options);
};

it('test case 1', () => {
  const result = setupTest('a', { options: { flag: true } });
  // Hard to understand what's being tested
});
```

✅ **Good - Clear and Explicit:**
```typescript
it('renders hero component with image variant', () => {
  render(<Hero variant="image" />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

it('renders hero component with video variant', () => {
  render(<Hero variant="video" />);
  expect(screen.getByTestId('video-player')).toBeInTheDocument();
});
```

**Exception:** Use `beforeEach` for common setup that's the same across all tests:
```typescript
describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Tests...
});
```

### 9. Mock External Dependencies

Always mock:
- API calls
- Database queries
- File system operations
- Third-party services
- Current date/time
- Random number generation

```typescript
import { vi } from 'vitest';

// Mock API
vi.mock('@/lib/api/destinations', () => ({
  fetchDestination: vi.fn(),
}));

// Mock date
vi.setSystemTime(new Date('2024-01-15'));

// Mock random
vi.spyOn(Math, 'random').mockReturnValue(0.5);
```

### 10. Test Error Conditions

Don't just test the happy path. Test what happens when things go wrong.

```typescript
describe('bookHotel', () => {
  it('successfully books hotel with valid data', async () => {
    const booking = await bookHotel(validData);
    expect(booking.status).toBe('confirmed');
  });

  it('throws error when hotel is fully booked', async () => {
    vi.mocked(checkAvailability).mockResolvedValue(false);
    await expect(bookHotel(validData)).rejects.toThrow('Hotel is fully booked');
  });

  it('throws error when payment fails', async () => {
    vi.mocked(processPayment).mockRejectedValue(new Error('Payment failed'));
    await expect(bookHotel(validData)).rejects.toThrow('Payment failed');
  });

  it('handles network timeout gracefully', async () => {
    vi.mocked(bookHotel).mockRejectedValue(new Error('Network timeout'));
    await expect(bookHotel(validData)).rejects.toThrow('Network timeout');
  });
});
```

## Coverage Guidelines

### Minimum Requirements
- **80% statement coverage** - Most code paths are tested
- **75% branch coverage** - Most conditional logic is tested
- **80% function coverage** - Most functions are tested
- **80% line coverage** - Most lines are executed

### What to Prioritize
1. **Business logic** - Calculations, validations, transformations
2. **User interactions** - Buttons, forms, navigation
3. **Error handling** - Edge cases, exceptions
4. **Critical paths** - Checkout, booking, payment flows

### What NOT to Test
- Third-party libraries (trust they're tested)
- Simple pass-through functions
- Type definitions
- Configuration files
- Constants

## Test Naming Conventions

### File Naming
- `utils/format.ts` → `tests/unit/utils/format.test.ts`
- `components/Hero.tsx` → `tests/component/Hero.test.tsx`
- `app/page.tsx` → `tests/component/page.test.tsx`

### Describe Block Structure
```typescript
describe('ComponentName or functionName', () => {
  describe('specific feature or method', () => {
    it('does something specific', () => { });
  });
});
```

### Test Name Patterns
- `'renders with [props/state]'`
- `'handles [user action]'`
- `'throws error when [condition]'`
- `'calculates [result] for [input]'`
- `'displays [element] when [condition]'`

## Red-Green-Refactor Cycle

When writing tests using TDD:

1. **Red** - Write a failing test
2. **Green** - Write minimal code to make it pass
3. **Refactor** - Improve code while keeping tests green

## Debugging Failed Tests

When a test fails:

1. **Read the error message carefully**
2. **Check the expected vs actual values**
3. **Add console.log or screen.debug() to inspect state**
4. **Run the single failing test in isolation**
5. **Check if mocks are set up correctly**
6. **Verify test data matches component expectations**

## Common Anti-Patterns to Avoid

❌ Testing implementation details
❌ Testing third-party libraries
❌ Overly complex test setup
❌ Tests that depend on each other
❌ Slow tests (> 1 second)
❌ Vague test names
❌ No test for error cases
❌ 100% coverage obsession (aim for quality over quantity)
❌ Testing console.log statements

## Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Kent C. Dodds - Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
