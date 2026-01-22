#!/bin/bash

# Check for missing test files
# This script checks if modified source files have corresponding test files

echo "🧪 Checking for test coverage..."

# Get list of modified files (staged for commit)
MODIFIED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# Track files without tests
MISSING_TESTS=()

for FILE in $MODIFIED_FILES; do
  # Skip if file is already a test file
  if [[ $FILE == *".test."* ]] || [[ $FILE == *".spec."* ]]; then
    continue
  fi

  # Check lib/ files (should have unit tests)
  if [[ $FILE == lib/*.ts ]] && [[ $FILE != *".d.ts" ]]; then
    # Calculate expected test path
    TEST_FILE="tests/unit/${FILE#lib/}"
    TEST_FILE="${TEST_FILE%.ts}.test.ts"

    if [ ! -f "$TEST_FILE" ]; then
      MISSING_TESTS+=("$FILE -> $TEST_FILE")
    fi
  fi

  # Check component files (should have component tests)
  if [[ $FILE == components/*.tsx ]]; then
    TEST_FILE="tests/component/${FILE#components/}"
    TEST_FILE="${TEST_FILE%.tsx}.test.tsx"

    if [ ! -f "$TEST_FILE" ]; then
      MISSING_TESTS+=("$FILE -> $TEST_FILE")
    fi
  fi
done

# Report results
if [ ${#MISSING_TESTS[@]} -eq 0 ]; then
  echo "✅ All modified files have tests!"
  exit 0
else
  echo "⚠️  The following files don't have tests:"
  for MISSING in "${MISSING_TESTS[@]}"; do
    echo "   - $MISSING"
  done
  echo ""
  echo "💡 To generate tests, ask Claude:"
  echo "   'Generate tests for <file>'"
  echo ""
  echo "Press Enter to commit anyway, or Ctrl+C to cancel"
  read
  exit 0
fi
