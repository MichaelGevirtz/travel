# Test Generation Guide

Quick reference for generating tests with the test agent.

## How to Generate Tests

### Via Claude Code Chat

Simply ask Claude to generate tests for any file:

```
"Generate tests for components/home/Hero.tsx"
"Generate tests for lib/utils/format.ts"
"Generate unit tests for lib/constants/destinations.ts"
```

### Running Existing Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only component tests
npm run test:component

# Run with coverage
npm run test:coverage

# Run specific file
npm test -- path/to/test.test.ts
```

## File Type Detection

The test agent automatically determines the test type based on file location:

| Location | Test Type | Test Directory |
|----------|-----------|----------------|
| `lib/**/*.ts` | Unit | `tests/unit/` |
| `components/**/*.tsx` | Component | `tests/component/` |
| `app/**/*.tsx` | Component | `tests/component/` |

## Request Patterns

### For Unit Tests

```
"Generate tests for lib/utils/format.ts"
"Test the calculateTripBudget function"
"Create unit tests for lib/api/destinations.ts"
```

### For Component Tests

```
"Generate tests for components/home/Hero.tsx"
"Test the DestinationCard component"
"Create tests for app/page.tsx"
```

### For Specific Coverage

```
"Generate tests with 100% coverage for lib/utils.ts"
"Add more tests to improve coverage for Hero.tsx"
```

## What Gets Generated

For each file, the agent generates:

- ✅ Happy path tests (normal usage)
- ✅ Edge case tests (empty, zero, max values)
- ✅ Error tests (invalid input, exceptions)
- ✅ Async tests (for promises/async functions)
- ✅ Accessibility tests (for components)
- ✅ User interaction tests (for components)

**Minimum:** 3 tests per function, 80% coverage

## Test Agent Process

1. **Analyzes** the source file
2. **Reads** knowledge base for patterns
3. **Generates** comprehensive tests
4. **Creates** the test file
5. **Runs** tests to verify they pass
6. **Checks** coverage
7. **Reports** results

## Examples

### Generate Component Tests

```
"Generate tests for components/destinations/DestinationCard.tsx"
```

Results in: `tests/component/destinations/DestinationCard.test.tsx`

### Generate Unit Tests

```
"Generate tests for lib/utils/budget.ts"
```

Results in: `tests/unit/utils/budget.test.ts`

## Quick Commands

```bash
# Test a specific component
npm test -- Hero

# Test all destination components
npm test -- destinations

# Run tests and see coverage
npm run test:coverage
```

## Need Help?

- Check `TESTING_GUIDE.md` for complete documentation
- Review `.claude/knowledge/` for detailed patterns
- Look at existing tests in `tests/` for examples
