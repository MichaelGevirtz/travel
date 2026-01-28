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

    // getByText throws if not found, so existence is already verified
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('should find elements by role', () => {
    render(<TestComponent title="Vietnam Travel" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Vietnam Travel');
  });

  it('should find button elements', () => {
    render(<TestComponent title="Test" />);

    const button = screen.getByRole('button', { name: /book now/i });
    expect(button).toBeTruthy();
  });

  it('should render with different props', () => {
    const { rerender } = render(<TestComponent title="First Title" />);
    expect(screen.getByText('First Title')).toBeTruthy();

    rerender(<TestComponent title="Second Title" />);
    expect(screen.getByText('Second Title')).toBeTruthy();
  });

  it('should find elements by text pattern', () => {
    render(<TestComponent title="Hanoi Guide" />);

    const paragraph = screen.getByText(/welcome to vietnam/i);
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('Welcome to Vietnam');
  });
});
