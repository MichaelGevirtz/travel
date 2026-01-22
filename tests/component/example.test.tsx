import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple component for testing
function TestComponent({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to Vietnam Travel Guide</p>
      <button>Book Now</button>
    </div>
  );
}

describe('React Testing Library Setup', () => {
  it('should render a component', () => {
    render(<TestComponent title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should find elements by role', () => {
    render(<TestComponent title="Vietnam Travel" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Vietnam Travel');
  });

  it('should find button elements', () => {
    render(<TestComponent title="Test" />);

    const button = screen.getByRole('button', { name: /book now/i });
    expect(button).toBeInTheDocument();
  });

  it('should render with different props', () => {
    const { rerender } = render(<TestComponent title="First Title" />);
    expect(screen.getByText('First Title')).toBeInTheDocument();

    rerender(<TestComponent title="Second Title" />);
    expect(screen.getByText('Second Title')).toBeInTheDocument();
  });

  it('should use jest-dom matchers', () => {
    render(<TestComponent title="Hanoi Guide" />);

    const paragraph = screen.getByText(/welcome to vietnam/i);
    expect(paragraph).toBeVisible();
    expect(paragraph).toBeInTheDocument();
  });
});
