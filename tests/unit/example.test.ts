import { describe, it, expect } from 'vitest';

describe('Vitest Setup', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true);
  });

  it('should perform arithmetic correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle strings', () => {
    const greeting = 'Hello, Vietnam!';
    expect(greeting).toContain('Vietnam');
  });

  it('should work with arrays', () => {
    const destinations = ['Hanoi', 'Ho Chi Minh', 'Da Nang'];
    expect(destinations).toHaveLength(3);
    expect(destinations).toContain('Hanoi');
  });

  it('should work with objects', () => {
    const destination = {
      name: 'Hanoi',
      region: 'North',
      visited: true,
    };

    expect(destination.name).toBe('Hanoi');
    expect(destination.visited).toBeTruthy();
  });
});
