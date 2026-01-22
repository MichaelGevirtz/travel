# Testing Knowledge Base

Comprehensive testing documentation for the Vietnam Travel project.

## Overview

This knowledge base provides guidelines, patterns, and best practices for writing tests in this project. It's designed to be referenced by both developers and automated testing agents.

## Files

### 1. testing-principles.md
**Core testing philosophy and fundamental principles**

Topics covered:
- The Testing Pyramid (unit → integration → E2E)
- Test Behavior vs Implementation
- AAA Pattern (Arrange-Act-Assert)
- One Assertion Per Test
- Test Independence
- Coverage Guidelines
- Naming Conventions
- Debugging Failed Tests

**When to use:** Start here. Read before writing any tests.

---

### 2. unit-testing.md
**Guidelines for testing pure functions, utilities, and business logic**

Topics covered:
- Testing pure functions
- Testing functions with dependencies
- Testing calculations and validations
- Testing async functions
- Testing array/object transformations
- Testing date/time functions
- Common testing patterns
- Vitest matchers and assertions

**When to use:** Writing tests for files in `lib/` directory (utilities, helpers, business logic).

---

### 3. component-testing.md
**Best practices for testing React components**

Topics covered:
- React Testing Library philosophy
- Querying elements (priority order)
- Testing rendering and props
- Testing user interactions
- Testing async behavior
- Testing forms and inputs
- Testing accessibility
- Testing custom hooks
- Debugging component tests

**When to use:** Writing tests for files in `components/` and `app/` directories.

---

### 4. mocking-strategies.md
**Comprehensive guide to mocking dependencies**

Topics covered:
- Module mocking with vi.mock()
- Function mocking with vi.fn()
- Spy mocking with vi.spyOn()
- Mocking Next.js modules (router, Image, Link)
- Mocking MongoDB/Mongoose
- Mocking fetch/API calls
- Mocking external APIs (Anthropic, Booking.com)
- Mocking date/time
- Mocking environment variables
- Mocking localStorage and file system

**When to use:** Whenever your code depends on external services, APIs, databases, or third-party modules.

---

### 5. project-conventions.md
**Project-specific patterns and conventions for Vietnam Travel site**

Topics covered:
- File structure and test placement
- Data types and interfaces (DestinationCardData)
- MongoDB/Mongoose testing patterns
- Component testing patterns (DestinationCard, DestinationGrid)
- Testing constants and static data
- Testing utility functions
- Server Components testing
- Affiliate link testing
- SEO and metadata testing
- Common test fixtures
- Coverage exceptions

**When to use:** Writing tests for this specific project. Contains project-specific patterns and examples.

---

## Quick Start

### For New Developers

1. Read `testing-principles.md` to understand core concepts
2. Skim `unit-testing.md` and `component-testing.md` to see patterns
3. Reference `project-conventions.md` for project-specific examples
4. Use `mocking-strategies.md` as needed when dealing with dependencies

### For Writing Unit Tests

1. Reference `testing-principles.md` for structure
2. Follow patterns in `unit-testing.md`
3. Use mocks from `mocking-strategies.md` as needed
4. Check `project-conventions.md` for project-specific utilities

### For Writing Component Tests

1. Reference `testing-principles.md` for structure
2. Follow patterns in `component-testing.md`
3. Use project examples from `project-conventions.md`
4. Mock Next.js modules using `mocking-strategies.md`

### For Testing Agent

When generating tests automatically:

1. **Always read** `testing-principles.md` first
2. Determine test type (unit vs component)
3. Read relevant guide (`unit-testing.md` or `component-testing.md`)
4. Check `project-conventions.md` for project-specific patterns
5. Use `mocking-strategies.md` for mocking dependencies
6. Generate tests following AAA pattern
7. Ensure coverage thresholds are met (80% statements/functions/lines, 75% branches)

## Coverage Standards

### Minimum Required
- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 80%
- **Lines:** 80%

### What to Prioritize
1. Business logic and calculations
2. User interactions
3. Error handling
4. Critical user flows

### What NOT to Test
- Third-party libraries
- Radix UI component wrappers
- Simple barrel exports
- Configuration files
- Type definitions

## Common Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.test.ts

# Run tests matching pattern
npm test -- destination
```

## Test File Structure

```
tests/
├── unit/              # Tests for lib/ directory
│   ├── utils.test.ts
│   ├── constants/
│   └── db/
├── component/         # Tests for components/ and app/
│   ├── destinations/
│   ├── home/
│   └── layout/
├── e2e/              # End-to-end tests (future)
├── mocks/            # Shared mock implementations
├── fixtures/         # Test data and fixtures
└── setup.ts          # Global test configuration
```

## Getting Help

If you're unsure which file to reference:

- **"How do I test a pure function?"** → `unit-testing.md`
- **"How do I test a React component?"** → `component-testing.md`
- **"How do I mock an API call?"** → `mocking-strategies.md`
- **"What patterns does this project use?"** → `project-conventions.md`
- **"What are the core principles?"** → `testing-principles.md`

## Maintenance

This knowledge base should be updated when:
- New testing patterns emerge
- Project structure changes
- New dependencies are added
- Coverage standards change
- Common issues are identified

Last updated: 2024-06-15
