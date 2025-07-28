# Gemini Testing Best Practices

This document outlines the best practices for creating and managing tests in this project. Following these guidelines ensures that our test suite remains organized, and that temporary debugging artifacts are properly handled.

## Test File Organization

**Always create test files in a `__tests__` directory, never in the root folder.** This keeps the project root clean and separates test code from application code.

The `__tests__` directory is structured as follows:

-   `__tests__/unit/`: For unit tests that verify individual components or functions in isolation.
-   `__tests__/integration/`: For integration tests that verify the interaction between multiple components.
-   `__tests__/temp/`: For temporary, one-off tests used for debugging or quick verification.

### Temporary Test Cleanup

When creating tests for debugging purposes:

1.  Place them in `__tests__/temp/` with a descriptive name, like `test-specific-issue.js`.
2.  **Delete the test file immediately** after it has served its purpose (i.e., after the debugging session is complete and the fix is implemented).
3.  If a temporary test reveals a bug that should be covered by a permanent test, move the test from `__tests__/temp/` to the appropriate directory (`unit` or `integration`) and integrate it into the main test suite.

This system helps turn every debugging session into a permanent, searchable record with clear evidence of what went wrong and how it was fixed.

### Example Directory Structure

```
project/
├── __tests__/
│   ├── unit/
│   │   └── components.test.js
│   ├── integration/
│   │   └── api.test.js
│   └── temp/
│       └── test-debug-issue.js  # Delete after use
├── src/
└── package.json
```

### Cleanup Command

To facilitate the cleanup of temporary tests, add the following script to your `package.json`:

```json
"scripts": {
  "test:cleanup": "rm -rf __tests__/temp/*"
}
```

You can run this command periodically to ensure the `temp` directory stays clean.
