import { cn } from '@/lib/utils';

describe('cn utility', () => {
  // Happy path
  it('merges multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('merges single class name', () => {
    expect(cn('single-class')).toBe('single-class');
  });

  // Conditional classes
  it('handles conditional classes with true condition', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
  });

  it('handles conditional classes with false condition', () => {
    const isActive = false;
    expect(cn('base', isActive && 'active')).toBe('base');
  });

  // Tailwind merge functionality
  it('resolves conflicting Tailwind classes using last value', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('resolves conflicting padding classes', () => {
    expect(cn('p-2', 'p-4', 'p-6')).toBe('p-6');
  });

  it('resolves conflicting text color classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  // Edge cases
  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles undefined values', () => {
    expect(cn('base', undefined, 'other')).toBe('base other');
  });

  it('handles null values', () => {
    expect(cn('base', null, 'other')).toBe('base other');
  });

  it('handles array of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('handles objects with boolean values', () => {
    expect(cn({ active: true, disabled: false, visible: true })).toBe('active visible');
  });

  // Complex scenarios
  it('handles mix of strings, conditionals, and objects', () => {
    const isActive = true;
    const isDisabled = false;
    expect(
      cn('base', isActive && 'active', { disabled: isDisabled, visible: true })
    ).toBe('base active visible');
  });

  it('merges conflicting classes in complex scenario', () => {
    expect(
      cn('px-2 py-4', { 'px-4': true, 'py-2': false })
    ).toBe('py-4 px-4');
  });
});
