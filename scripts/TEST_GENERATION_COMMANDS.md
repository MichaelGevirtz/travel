# Test Generation Commands

All the ways to generate and run tests in this project.

## 🤖 Generate Tests (via Claude Code)

The easiest way is to ask Claude directly in the chat:

### Component Tests
```
"Generate tests for components/home/Hero.tsx"
"Generate tests for components/destinations/DestinationCard.tsx"
"Test the Newsletter component"
```

### Unit Tests
```
"Generate tests for lib/utils.ts"
"Generate tests for lib/constants/destinations.ts"
"Test the formatVND function"
```

### Specific Requests
```
"Generate unit tests only for lib/api/destinations.ts"
"Add more tests to improve coverage for Hero.tsx"
"Create tests with 100% coverage for lib/utils/budget.ts"
```

## 🏃 Run Existing Tests

```bash
# Run all tests in watch mode
npm test

# Run all tests once (CI mode)
npm run test:run

# Run only unit tests
npm run test:unit

# Run only component tests
npm run test:component

# Run with coverage report
npm run test:coverage

# Run with UI
npm run test:ui

# Run specific file
npm test -- Hero

# Run specific directory
npm test -- tests/component/destinations/
```

## 📊 Check Coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser (after running coverage)
open coverage/index.html
```

## 🔍 Find Files Without Tests

```bash
# Run the test checker (optional)
bash scripts/check-tests.sh
```

This will show which files don't have corresponding test files.

## 🎯 What Gets Auto-Detected

The test agent automatically determines test type:

| File Location | Test Type | Output Location |
|---------------|-----------|-----------------|
| `lib/**/*.ts` | Unit Test | `tests/unit/**/*.test.ts` |
| `components/**/*.tsx` | Component Test | `tests/component/**/*.test.tsx` |
| `app/**/*.tsx` | Component Test | `tests/component/**/*.test.tsx` |

## 📝 Test Generation Process

When you ask Claude to generate tests:

1. ✅ Analyzes the source file
2. ✅ Reads knowledge base for patterns
3. ✅ Generates comprehensive test suite
4. ✅ Creates the test file
5. ✅ Runs tests to verify they pass
6. ✅ Checks coverage (80% minimum)
7. ✅ Reports results

## 💡 Pro Tips

### Batch Test Generation

Generate tests for multiple files at once:

```
"Generate tests for:
- components/home/Hero.tsx
- components/home/ValueProposition.tsx
- lib/utils/format.ts"
```

### Update Existing Tests

```
"Add more edge case tests to tests/component/Hero.test.tsx"
"Improve coverage for DestinationCard tests"
```

### Test Specific Scenarios

```
"Test the error handling in lib/api/destinations.ts"
"Test keyboard navigation for the Newsletter component"
"Test accessibility for all components in components/home/"
```

## 🔗 Quick Links

- **Full Testing Guide**: See `TESTING_GUIDE.md`
- **Knowledge Base**: See `.claude/knowledge/`
- **Test Examples**: See `tests/` directory
- **Test Fixtures**: See `tests/fixtures/`

## 🎓 Examples

### Example 1: Generate Component Tests

**You ask:**
```
"Generate tests for components/home/Hero.tsx"
```

**Claude will:**
1. Read Hero.tsx
2. Generate 20-30 comprehensive tests
3. Create `tests/component/home/Hero.test.tsx`
4. Run tests (all pass)
5. Check coverage (100%)
6. Report results

### Example 2: Generate Unit Tests

**You ask:**
```
"Generate tests for lib/utils/budget.ts"
```

**Claude will:**
1. Read budget.ts
2. Generate tests for all functions
3. Create `tests/unit/utils/budget.test.ts`
4. Include happy path, edge cases, errors
5. Ensure 80%+ coverage
6. Report results

### Example 3: Run Specific Tests

```bash
# Test only Hero component
npm test -- Hero

# Test all home components
npm test -- home

# Test with coverage
npm run test:coverage -- Hero
```

## 🚀 Getting Started

1. **Ask Claude to generate tests** (easiest!)
   ```
   "Generate tests for components/home/Hero.tsx"
   ```

2. **Run the tests**
   ```bash
   npm test
   ```

3. **Check coverage**
   ```bash
   npm run test:coverage
   ```

That's it! The test agent handles everything else.

## ❓ Need Help?

- Ask Claude: "How do I test [X]?"
- Read: `TESTING_GUIDE.md`
- Check examples in: `tests/` directory
- Review patterns in: `.claude/knowledge/`

---

**Remember:** Just ask Claude to generate tests - it's that simple! 🎉
