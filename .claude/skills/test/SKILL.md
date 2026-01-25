---
name: test
description: Generate comprehensive tests for TypeScript and React components with 80% minimum coverage. Use when the user wants to generate tests, write tests, or add test coverage.
argument-hint: <file_path>
---

# Test Generation Skill

You are now in test generation mode. Generate comprehensive tests for the specified file.

## Input

File path: `$ARGUMENTS`

If no file path is provided, ask the user which file they want to generate tests for.

## Process

Follow these steps systematically:

### Step 1: Analyze the File

Read the source file and identify:
- Exported functions and their signatures
- React components and their props
- External dependencies that need mocking
- Test type needed (unit vs component)

```bash
Read $ARGUMENTS
```

### Step 2: Load Knowledge Base

Read these files in order to understand testing patterns:

```bash
Read .claude/knowledge/testing-principles.md
Read .claude/knowledge/project-conventions.md
```

Then read based on test type:
- For functions/utilities: `Read .claude/knowledge/unit-testing.md`
- For React components: `Read .claude/knowledge/component-testing.md`

If mocking is needed:
```bash
Read .claude/knowledge/mocking-strategies.md
```

### Step 3: Determine Test File Path

Map source file to test file:
- `lib/utils/format.ts` → `tests/unit/utils/format.test.ts`
- `lib/services/agents/writerAgent.ts` → `tests/unit/services/agents/writerAgent.test.ts`
- `components/Hero.tsx` → `tests/component/Hero.test.tsx`
- `app/admin/content/page.tsx` → `tests/component/admin/content/page.test.tsx`

### Step 4: Check for Existing Tests

```bash
Read <test_file_path>
```

If exists: **UPDATE** existing tests (add missing coverage)
If not exists: **CREATE** new test file

### Step 5: Generate Comprehensive Tests

Follow patterns from the knowledge base. Include:

**For Unit Tests:**
- ✅ Happy path (normal cases)
- ✅ Edge cases (empty, null, zero, max values)
- ✅ Error cases (invalid input, exceptions)
- ✅ Async operations (if applicable)
- ✅ Mock external dependencies

**For Component Tests:**
- ✅ Rendering with different props
- ✅ User interactions (clicks, typing, form submission)
- ✅ Different states (loading, error, empty, data)
- ✅ Accessibility (proper labels, keyboard navigation)
- ✅ Mock Next.js modules (Image, Link, router)

### Step 6: Create Test File

Create directories if needed:
```bash
Bash: mkdir -p <test_directory>
```

Write the test file:
```bash
Write <test_file_path>
```

### Step 7: Run Tests

Execute the test file to verify:
```bash
Bash: npm run test:run -- <test_file_path>
```

**If tests fail:**
1. Read error messages carefully
2. Fix the issues in the test code
3. Re-run (max 3 attempts)
4. Report if still failing

### Step 8: Check Coverage

Run coverage check:
```bash
Bash: npm run test:coverage -- <test_file_path>
```

**Coverage thresholds:**
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

**If coverage is below threshold:**
- Identify uncovered lines/branches
- Add tests for missing cases
- Re-check coverage

### Step 9: Report Results

Provide a detailed report in this format:

```
🧪 Test Generation Report

📝 Source File: <file_path>
🎯 Test Type: unit | component
📄 Test File: <test_file_path>
📊 Status: NEW | UPDATED

Tests Generated:
✅ <test_name_1>
✅ <test_name_2>
✅ <test_name_3>
... (<total> tests total)

Test Execution:
✅ <pass_count> passing
❌ <fail_count> failing (if any)

Coverage:
📈 Statements: <percent>% (threshold: 80%)
📈 Branches: <percent>% (threshold: 75%)
📈 Functions: <percent>% (threshold: 80%)
📈 Lines: <percent>% (threshold: 80%)

✅ All quality gates passed! Tests are production-ready.
```

## Quality Standards (Required)

- ✅ Minimum 3 tests per function
- ✅ Coverage ≥ 80% for statements, functions, lines
- ✅ Coverage ≥ 75% for branches
- ✅ All tests must pass
- ✅ Follow AAA pattern (Arrange-Act-Assert)
- ✅ Descriptive test names (full sentences)
- ✅ Mock all external dependencies
- ✅ Use proper queries (getByRole > getByTestId)
- ✅ No console.log in test code
- ✅ Tests are independent (no shared state)

## Important Notes

- **Always read the knowledge base** before generating tests
- **Never skip steps** - follow the process systematically
- **Run tests to verify** - don't assume they work
- **Check coverage** - ensure thresholds are met
- **Report honestly** - if tests fail or coverage is low, say so
- **Be thorough** - cover happy path, edge cases, and errors

## Success Criteria

Task is complete ONLY when:
- ✅ Test file created/updated
- ✅ All tests pass
- ✅ Coverage meets thresholds (80/75/80/80)
- ✅ Report provided to user

Now proceed with test generation following these instructions step by step.
