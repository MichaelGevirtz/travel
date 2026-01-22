# Component Testing Best Practices

Guidelines for testing React components with Testing Library.

## Core Philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you." - Kent C. Dodds

**Test user behavior, not implementation details.**

## Basic Component Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComponentName from '@/components/ComponentName';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName title="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Querying Elements

Use queries in this priority order:

### 1. Accessible Queries (Preferred)

**getByRole** - Query by ARIA role (most preferred)
```typescript
// Buttons
screen.getByRole('button', { name: /submit/i });

// Headings
screen.getByRole('heading', { level: 1, name: /welcome/i });

// Links
screen.getByRole('link', { name: /read more/i });

// Text inputs
screen.getByRole('textbox', { name: /email/i });

// Images
screen.getByRole('img', { name: /hanoi skyline/i });
```

**getByLabelText** - Query form fields by their label
```typescript
screen.getByLabelText('Email address');
screen.getByLabelText(/password/i);
```

**getByPlaceholderText** - Query by placeholder
```typescript
screen.getByPlaceholderText('Enter your email');
```

**getByText** - Query by text content
```typescript
screen.getByText('Welcome to Vietnam');
screen.getByText(/welcome/i); // Case insensitive
```

### 2. Last Resort Queries

**getByTestId** - Only use when other queries don't work
```typescript
screen.getByTestId('custom-widget');
```

### Query Variants

- **getBy** - Throws error if not found (most common)
- **queryBy** - Returns null if not found (for asserting non-existence)
- **findBy** - Returns promise, waits for element (for async)

```typescript
// Element must exist
const button = screen.getByRole('button');

// Assert element doesn't exist
expect(screen.queryByText('Error')).not.toBeInTheDocument();

// Wait for async element
const message = await screen.findByText('Success');
```

## Testing Component Rendering

### Simple Rendering

```typescript
import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

describe('Hero', () => {
  it('renders heading and subtitle', () => {
    render(
      <Hero
        title="Discover Vietnam"
        subtitle="Your ultimate travel guide"
      />
    );

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Discover Vietnam');
    expect(screen.getByText('Your ultimate travel guide'))
      .toBeInTheDocument();
  });

  it('renders with image variant', () => {
    render(<Hero title="Test" variant="image" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('does not render image when variant is text', () => {
    render(<Hero title="Test" variant="text" />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
```

### Conditional Rendering

```typescript
describe('DestinationCard', () => {
  const destination = {
    slug: 'hanoi',
    name: 'Hanoi',
    image: '/images/hanoi.jpg',
  };

  it('shows bookmark icon when bookmarked', () => {
    render(<DestinationCard {...destination} isBookmarked={true} />);

    expect(screen.getByRole('button', { name: /bookmarked/i }))
      .toBeInTheDocument();
  });

  it('shows bookmark outline when not bookmarked', () => {
    render(<DestinationCard {...destination} isBookmarked={false} />);

    expect(screen.getByRole('button', { name: /bookmark/i }))
      .toBeInTheDocument();
  });

  it('displays premium badge for premium destinations', () => {
    render(<DestinationCard {...destination} isPremium={true} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('does not display premium badge for regular destinations', () => {
    render(<DestinationCard {...destination} isPremium={false} />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });
});
```

## Testing User Interactions

Always use `userEvent` instead of `fireEvent` for more realistic interactions.

### Button Clicks

```typescript
import userEvent from '@testing-library/user-event';

describe('BookingButton', () => {
  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<BookingButton onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: /book now/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<BookingButton onClick={handleClick} disabled />);

    const button = screen.getByRole('button', { name: /book now/i });
    expect(button).toBeDisabled();

    // Click should not trigger handler
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### Form Inputs

```typescript
describe('NewsletterForm', () => {
  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(<NewsletterForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('submits form with email value', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<NewsletterForm onSubmit={handleSubmit} />);

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();

    render(<NewsletterForm />);

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'invalid-email'
    );
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('clears input after successful submission', async () => {
    const user = userEvent.setup();

    render(<NewsletterForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
    });
  });
});
```

### Keyboard Navigation

```typescript
describe('DropdownMenu', () => {
  it('opens menu with keyboard', async () => {
    const user = userEvent.setup();

    render(<DropdownMenu />);

    const trigger = screen.getByRole('button', { name: /menu/i });

    await user.tab(); // Focus on trigger
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}'); // Open menu

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('navigates menu items with arrow keys', async () => {
    const user = userEvent.setup();

    render(<DropdownMenu />);

    await user.click(screen.getByRole('button', { name: /menu/i }));

    const menuItems = screen.getAllByRole('menuitem');

    await user.keyboard('{ArrowDown}');
    expect(menuItems[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(menuItems[1]).toHaveFocus();
  });
});
```

## Testing Async Behavior

### Loading States

```typescript
describe('DestinationList', () => {
  it('shows loading spinner while fetching', () => {
    render(<DestinationList isLoading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows destinations after loading', async () => {
    const { rerender } = render(<DestinationList isLoading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<DestinationList isLoading={false} data={mockDestinations} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
  });
});
```

### Waiting for Elements

```typescript
import { waitFor } from '@testing-library/react';

describe('SearchResults', () => {
  it('displays search results after typing', async () => {
    const user = userEvent.setup();

    render(<SearchResults />);

    await user.type(screen.getByRole('searchbox'), 'Hanoi');

    // Wait for results to appear
    const results = await screen.findByRole('list');
    expect(results).toBeInTheDocument();
  });

  it('shows "no results" message when search returns nothing', async () => {
    const user = userEvent.setup();

    render(<SearchResults />);

    await user.type(screen.getByRole('searchbox'), 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
```

### Debounced Actions

```typescript
describe('SearchInput', () => {
  it('debounces search API calls', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchInput onSearch={onSearch} debounce={300} />);

    const input = screen.getByRole('searchbox');

    await user.type(input, 'Hanoi');

    // Should not call immediately
    expect(onSearch).not.toHaveBeenCalled();

    // Wait for debounce
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('Hanoi');
    }, { timeout: 500 });

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Error States

```typescript
describe('DestinationPage', () => {
  it('displays error message when fetch fails', () => {
    render(
      <DestinationPage error="Failed to load destination" />
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      /failed to load destination/i
    );
  });

  it('shows retry button on error', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(
      <DestinationPage
        error="Network error"
        onRetry={handleRetry}
      />
    );

    await user.click(screen.getByRole('button', { name: /retry/i }));

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Different States

```typescript
describe('BookingWidget', () => {
  it('shows empty state when no bookings', () => {
    render(<BookingWidget bookings={[]} />);

    expect(screen.getByText(/no bookings yet/i)).toBeInTheDocument();
  });

  it('shows list of bookings when available', () => {
    const bookings = [
      { id: '1', hotel: 'Hanoi Hotel', date: '2024-06-15' },
      { id: '2', hotel: 'Saigon Resort', date: '2024-07-20' },
    ];

    render(<BookingWidget bookings={bookings} />);

    expect(screen.getByText('Hanoi Hotel')).toBeInTheDocument();
    expect(screen.getByText('Saigon Resort')).toBeInTheDocument();
  });

  it('shows success message after booking', () => {
    render(<BookingWidget status="success" />);

    expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
  });

  it('shows error message after failed booking', () => {
    render(<BookingWidget status="error" />);

    expect(screen.getByText(/booking failed/i)).toBeInTheDocument();
  });
});
```

## Testing Props

```typescript
describe('DestinationCard', () => {
  const defaultProps = {
    slug: 'hanoi',
    name: 'Hanoi',
    description: 'Capital of Vietnam',
    image: '/images/hanoi.jpg',
  };

  it('renders with required props only', () => {
    render(<DestinationCard {...defaultProps} />);

    expect(screen.getByText('Hanoi')).toBeInTheDocument();
  });

  it('renders with all optional props', () => {
    render(
      <DestinationCard
        {...defaultProps}
        rating={4.5}
        reviewCount={128}
        featured={true}
      />
    );

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('128 reviews')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('uses default values when optional props not provided', () => {
    render(<DestinationCard {...defaultProps} />);

    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });
});
```

## Testing Component Integration

```typescript
describe('SearchForm with Results', () => {
  it('displays results when search is submitted', async () => {
    const user = userEvent.setup();

    render(
      <SearchContainer>
        <SearchForm />
        <SearchResults />
      </SearchContainer>
    );

    await user.type(screen.getByRole('searchbox'), 'Hanoi');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('Hanoi')).toBeInTheDocument();
  });
});
```

## Accessibility Testing

```typescript
describe('Modal', () => {
  it('traps focus within modal', async () => {
    const user = userEvent.setup();

    render(<Modal isOpen={true} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(confirmButton).toHaveFocus();

    await user.tab();
    // Should cycle back to first element
    expect(closeButton).toHaveFocus();
  });

  it('has accessible labels', () => {
    render(<Modal isOpen={true} title="Confirm Booking" />);

    expect(screen.getByRole('dialog', { name: /confirm booking/i }))
      .toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<Modal isOpen={true} onClose={handleClose} />);

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useBooking', () => {
  it('initializes with empty booking', () => {
    const { result } = renderHook(() => useBooking());

    expect(result.current.booking).toBeNull();
  });

  it('updates booking when createBooking is called', () => {
    const { result } = renderHook(() => useBooking());

    act(() => {
      result.current.createBooking({
        hotel: 'Hanoi Hotel',
        date: '2024-06-15',
      });
    });

    expect(result.current.booking).toEqual({
      hotel: 'Hanoi Hotel',
      date: '2024-06-15',
    });
  });
});
```

## Common Patterns

### Testing Lists

```typescript
it('renders all destinations', () => {
  const destinations = [
    { id: '1', name: 'Hanoi' },
    { id: '2', name: 'Ho Chi Minh' },
    { id: '3', name: 'Da Nang' },
  ];

  render(<DestinationList destinations={destinations} />);

  destinations.forEach(dest => {
    expect(screen.getByText(dest.name)).toBeInTheDocument();
  });
});
```

### Testing Tooltips

```typescript
it('shows tooltip on hover', async () => {
  const user = userEvent.setup();

  render(<IconButton icon="info" tooltip="More information" />);

  const button = screen.getByRole('button');

  await user.hover(button);

  expect(await screen.findByRole('tooltip')).toHaveTextContent(
    'More information'
  );
});
```

### Testing Modals/Dialogs

```typescript
it('opens dialog when trigger is clicked', async () => {
  const user = userEvent.setup();

  render(<BookingDialog />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /open/i }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

## Debugging Tests

```typescript
import { screen } from '@testing-library/react';

// Print entire document
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));

// Print with more lines
screen.debug(undefined, 30000);

// Use logRoles to see available roles
import { logRoles } from '@testing-library/react';
const { container } = render(<Component />);
logRoles(container);
```

## Anti-Patterns to Avoid

❌ **Don't test implementation details:**
```typescript
// Bad - testing internal state
expect(component.state.count).toBe(1);

// Good - testing visible output
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

❌ **Don't use container queries:**
```typescript
// Bad
const { container } = render(<Component />);
container.querySelector('.my-class');

// Good
screen.getByRole('button', { name: /submit/i });
```

❌ **Don't test third-party libraries:**
```typescript
// Don't test that React Router works
// Don't test that Radix UI components render
```

## Checklist for Component Tests

✅ Renders with required props
✅ Renders with all optional props
✅ Handles user interactions (clicks, typing, etc.)
✅ Shows loading state
✅ Shows error state
✅ Shows empty state
✅ Shows success/data state
✅ Handles async operations
✅ Keyboard navigation works
✅ Accessible labels and roles
✅ Conditional rendering works
✅ Callbacks are called correctly
