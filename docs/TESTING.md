# Testing Guide

**Project**: Language Learning Hub
**Testing Framework**: Vitest 3.2.4
**Last Updated**: 2025-10-08
**Version**: 2.1.0

---

## Overview

This project uses **Vitest** for automated testing with a focus on unit tests for core functionality. Our testing philosophy prioritizes critical business logic, maintainability, and confidence in refactoring.

### Current Test Coverage

| Module | Tests | Status | Coverage |
|--------|-------|--------|----------|
| **language-loader.js** | 23 tests | ✅ 100% passing | High (all public APIs) |
| **resource-counter.js** | 27 tests | ✅ 100% passing | 100% (pure functions) |
| **Total** | **50 tests** | ✅ **100% passing** | **Core functionality** |

**Execution Time**: ~3-5 seconds for full suite

---

## Quick Start

### Running Tests

```bash
# Run all tests once
npm run test

# Watch mode (recommended for development)
npm run test:watch

# Interactive UI mode
npm run test:ui

# Generate coverage reports
npm run test:coverage
```

### Test File Structure

```
tests/
├── setup.js                        # Global test configuration
└── unit/                           # Unit tests
    ├── language-loader.test.js     # LanguageLoader class tests (23)
    └── resource-counter.test.js    # Resource counting tests (27)
```

---

## Testing Stack

### Dependencies

```json
{
  "devDependencies": {
    "vitest": "^3.2.4",          // Test runner (Vite-native)
    "@vitest/ui": "^3.2.4",      // Interactive test UI
    "happy-dom": "^19.0.2",      // Browser environment (lightweight)
    "jsdom": "^27.0.0"           // Alternative DOM (heavier, more complete)
  }
}
```

### Configuration

**vitest.config.js**:
```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',     // Simulates browser
    globals: true,                 // describe, it, expect available globally
    setupFiles: ['./tests/setup.js'],
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

**tests/setup.js**:
```javascript
// Global test configuration
global.languageData = {};

// Mock helpers
global.createMockElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};
```

---

## Writing Tests

### Test Structure Pattern

```javascript
// tests/unit/my-module.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MyModule } from '../../assets/js/my-module.js';

describe('MyModule', () => {
  // Setup before each test
  beforeEach(() => {
    // Initialize fresh state
  });

  // Cleanup after each test
  afterEach(() => {
    // Reset mocks, clear state
  });

  // Group related tests
  describe('methodName()', () => {
    it('should handle normal case', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = MyModule.methodName(input);

      // Assert
      expect(result).toBe('expected');
    });

    it('should handle edge case (null)', () => {
      expect(MyModule.methodName(null)).toBe(defaultValue);
    });

    it('should throw error for invalid input', () => {
      expect(() => MyModule.methodName(invalid)).toThrow('Error message');
    });
  });
});
```

### Naming Conventions

**Test Files**:
- Pattern: `{module-name}.test.js` or `{module-name}.spec.js`
- Location: `tests/unit/`
- Example: `language-loader.test.js`

**Test Descriptions**:
```javascript
// ✅ Good: Clear, specific, behavior-focused
it('should cache loaded language data', () => {});
it('should return null for unknown language code', () => {});
it('should clean up loading state after failed load', () => {});

// ❌ Avoid: Vague, implementation-focused
it('works', () => {});
it('test cache', () => {});
it('loadLanguage function', () => {});
```

---

## Testing Patterns

### 1. Testing Pure Functions

**Example**: `resource-counter.js` functions

```javascript
// Pure function - easy to test (no mocks needed)
import { countResourcesByType } from '../../assets/js/resource-counter.js';

describe('countResourcesByType()', () => {
  it('should count items in standard nested structure', () => {
    const resources = [
      { name: 'Category 1', items: [{}, {}, {}] },  // 3 items
      { name: 'Category 2', items: [{}, {}] },      // 2 items
    ];

    const count = countResourcesByType(resources, 'courses');

    expect(count).toBe(5);  // 3 + 2
  });

  it('should return 0 for invalid input', () => {
    expect(countResourcesByType(null, 'courses')).toBe(0);
    expect(countResourcesByType(undefined, 'courses')).toBe(0);
    expect(countResourcesByType([], 'courses')).toBe(0);
  });
});
```

**Why Pure Functions Are Easy to Test**:
- No side effects
- No global state dependencies
- Predictable output for given input
- No mocking required

---

### 2. Testing Async Functions

**Example**: `LanguageLoader.loadLanguage()`

```javascript
import { describe, it, expect, vi } from 'vitest';
import { LanguageLoader } from '../../assets/js/language-loader.js';

describe('LanguageLoader.loadLanguage()', () => {
  it('should load and cache language data', async () => {
    const loader = new LanguageLoader();
    const mockData = { name: 'Dutch', resources: {} };

    // Mock the dynamic import
    vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);

    // Test async function
    const result = await loader.loadLanguage('dutch');

    expect(result).toEqual(mockData);
    expect(loader.isLoaded('dutch')).toBe(true);
  });

  it('should handle loading errors gracefully', async () => {
    const loader = new LanguageLoader();
    const error = new Error('Import failed');

    vi.spyOn(loader, '_importLanguageModule').mockRejectedValue(error);

    // Expect promise to reject
    await expect(loader.loadLanguage('dutch')).rejects.toThrow();

    // Verify error handling cleanup
    expect(loader.isLoading('dutch')).toBe(false);
  });
});
```

**Async Testing Tips**:
- Always use `async`/`await` in test functions
- Use `expect(...).rejects.toThrow()` for error testing
- Verify cleanup happens even on error paths

---

### 3. Testing with Mocks

**Mock Functions** (`vi.fn()`):
```javascript
it('should call callback with correct arguments', () => {
  const callback = vi.fn();

  myFunction('input', callback);

  expect(callback).toHaveBeenCalledWith('expected-arg');
  expect(callback).toHaveBeenCalledTimes(1);
});
```

**Spy on Methods** (`vi.spyOn()`):
```javascript
it('should use cached data when available', async () => {
  const importSpy = vi.spyOn(loader, '_importLanguageModule')
    .mockResolvedValue(mockData);

  await loader.loadLanguage('dutch');  // Loads from import
  await loader.loadLanguage('dutch');  // Uses cache

  expect(importSpy).toHaveBeenCalledTimes(1);  // Only called once
});
```

**Mock Modules**:
```javascript
// Mock entire module
vi.mock('./language-loader.js', () => ({
  languageLoader: {
    loadLanguage: vi.fn().mockResolvedValue({}),
  },
}));
```

---

### 4. Testing DOM Interactions

**Simple DOM Tests**:
```javascript
it('should create element with correct attributes', () => {
  const element = createLanguageCard({ code: 'dutch', name: 'Dutch' });

  expect(element.tagName).toBe('ARTICLE');
  expect(element.dataset.language).toBe('dutch');
  expect(element.querySelector('h3').textContent).toBe('Dutch');
});
```

**Event Handler Tests**:
```javascript
it('should handle click events', async () => {
  const card = createLanguageCard({ code: 'dutch' });
  const clickHandler = vi.fn();

  card.addEventListener('click', clickHandler);
  card.click();

  expect(clickHandler).toHaveBeenCalled();
});
```

---

## Test Organization

### Describe Blocks

**Hierarchical Organization**:
```javascript
describe('LanguageLoader', () => {
  describe('Constructor', () => {
    it('should initialize with empty cache', () => {});
    it('should have 67 languages in map', () => {});
  });

  describe('loadLanguage()', () => {
    describe('when language is valid', () => {
      it('should load and cache data', async () => {});
      it('should return cached data on second call', async () => {});
    });

    describe('when language is invalid', () => {
      it('should return null', async () => {});
      it('should log error', async () => {});
    });
  });

  describe('Edge cases', () => {
    it('should handle concurrent loads', async () => {});
    it('should handle network failures', async () => {});
  });
});
```

**Benefits of Good Organization**:
- Easy to find related tests
- Clear documentation of module behavior
- Selective test running (describe.only, it.only)
- Better error messages

---

## Best Practices

### 1. Test Behavior, Not Implementation

```javascript
// ✅ Good: Tests behavior
it('should return cached data on subsequent calls', async () => {
  await loader.loadLanguage('dutch');
  await loader.loadLanguage('dutch');

  // We don't care HOW caching works, just that it happens
  expect(importSpy).toHaveBeenCalledTimes(1);
});

// ❌ Bad: Tests implementation details
it('should store data in this.cache Map', async () => {
  await loader.loadLanguage('dutch');

  // Tightly coupled to internal implementation
  expect(loader.cache instanceof Map).toBe(true);
  expect(loader.cache.has('dutch')).toBe(true);
});
```

### 2. AAA Pattern (Arrange-Act-Assert)

```javascript
it('should count resources correctly', () => {
  // Arrange: Set up test data
  const languageData = {
    dutch: { resources: { courses: [{ items: [{}, {}] }] } },
    french: { resources: { courses: [{ items: [{}] }] } },
  };

  // Act: Execute the function
  const counts = countAllResources(languageData);

  // Assert: Verify results
  expect(counts.courses).toBe(3);  // 2 + 1
});
```

### 3. Test Edge Cases

```javascript
describe('Edge cases', () => {
  it('should handle null input', () => {
    expect(countAllResources(null)).toEqual(emptyCounts);
  });

  it('should handle undefined input', () => {
    expect(countAllResources(undefined)).toEqual(emptyCounts);
  });

  it('should handle empty object', () => {
    expect(countAllResources({})).toEqual(emptyCounts);
  });

  it('should handle invalid language entries', () => {
    const mixed = {
      dutch: validLanguage,
      invalid: null,
      another: 'string',
    };

    // Should skip invalid entries gracefully
    expect(() => countAllResources(mixed)).not.toThrow();
  });
});
```

### 4. Mock External Dependencies

```javascript
it('should use languageLoader to fetch data', async () => {
  // Mock the loader instead of making real imports
  const loadSpy = vi.spyOn(languageLoader, 'loadLanguage')
    .mockResolvedValue(mockData);

  await myFunction('dutch');

  expect(loadSpy).toHaveBeenCalledWith('dutch');
});
```

### 5. Clean Up After Tests

```javascript
describe('MyComponent', () => {
  let cleanup;

  beforeEach(() => {
    // Setup
    cleanup = setupComponent();
  });

  afterEach(() => {
    // Always clean up to prevent test interference
    cleanup();
    vi.clearAllMocks();
  });

  it('should work', () => {
    // Test...
  });
});
```

---

## Testing Workflows

### Test-Driven Development (TDD)

**Red-Green-Refactor Cycle**:

```
1. 🔴 RED: Write Failing Test
   ├── Think about desired behavior
   ├── Write test that demonstrates it
   ├── Run test (should fail - feature doesn't exist yet)
   └── Verify test fails for right reason

2. 🟢 GREEN: Make Test Pass
   ├── Write minimum code to pass test
   ├── Don't worry about perfect code yet
   ├── Run test (should pass now)
   └── Verify all tests still pass

3. ♻️ REFACTOR: Improve Code
   ├── Clean up implementation
   ├── Remove duplication
   ├── Improve readability
   ├── Run tests (should still pass)
   └── Commit with passing tests
```

**Example TDD Session**:
```bash
# Terminal 1: Watch mode
npm run test:watch

# Terminal 2: Code editor
# 1. Write failing test
# 2. See it fail (RED)
# 3. Write code to pass
# 4. See it pass (GREEN)
# 5. Refactor
# 6. See it still pass (REFACTOR)
```

### Development Workflow

**Option A: Test-First** (Recommended):
```
1. Write test for new feature
2. Run test (fails)
3. Implement feature
4. Run test (passes)
5. Refactor
6. Commit
```

**Option B: Test-After**:
```
1. Implement feature
2. Manual testing
3. Write tests for the feature
4. Run tests (should pass)
5. Refactor if needed
6. Commit
```

---

## Common Testing Scenarios

### Scenario 1: Testing Caching Logic

```javascript
describe('Caching behavior', () => {
  it('should cache on first load', async () => {
    const loader = new LanguageLoader();
    const importSpy = vi.spyOn(loader, '_importLanguageModule')
      .mockResolvedValue(mockData);

    await loader.loadLanguage('dutch');

    expect(importSpy).toHaveBeenCalledTimes(1);
    expect(loader.isLoaded('dutch')).toBe(true);
  });

  it('should use cache on second load', async () => {
    const loader = new LanguageLoader();
    const importSpy = vi.spyOn(loader, '_importLanguageModule')
      .mockResolvedValue(mockData);

    const result1 = await loader.loadLanguage('dutch');
    const result2 = await loader.loadLanguage('dutch');

    expect(importSpy).toHaveBeenCalledTimes(1);  // Only once
    expect(result1).toBe(result2);  // Same reference
  });
});
```

### Scenario 2: Testing Error Handling

```javascript
describe('Error handling', () => {
  it('should throw error for invalid input', () => {
    expect(() => myFunction(invalid)).toThrow('Invalid input');
  });

  it('should handle async errors gracefully', async () => {
    const loader = new LanguageLoader();
    vi.spyOn(loader, '_importLanguageModule')
      .mockRejectedValue(new Error('Network error'));

    await expect(loader.loadLanguage('dutch')).rejects.toThrow();
  });

  it('should clean up state after error', async () => {
    const loader = new LanguageLoader();
    vi.spyOn(loader, '_importLanguageModule')
      .mockRejectedValue(new Error());

    try {
      await loader.loadLanguage('dutch');
    } catch (e) {
      // Expected to throw
    }

    // Verify cleanup happened
    expect(loader.isLoading('dutch')).toBe(false);
  });
});
```

### Scenario 3: Testing State Management

```javascript
describe('State transitions', () => {
  it('should transition from not-loaded → loading → loaded', async () => {
    const loader = new LanguageLoader();

    // Initial state
    expect(loader.isLoaded('dutch')).toBe(false);
    expect(loader.isLoading('dutch')).toBe(false);

    // Start loading
    const promise = loader.loadLanguage('dutch');
    expect(loader.isLoading('dutch')).toBe(true);

    // Finish loading
    await promise;
    expect(loader.isLoaded('dutch')).toBe(true);
    expect(loader.isLoading('dutch')).toBe(false);
  });
});
```

### Scenario 4: Testing Concurrent Operations

```javascript
describe('Concurrent operations', () => {
  it('should deduplicate concurrent loads', async () => {
    const loader = new LanguageLoader();
    let importCount = 0;

    vi.spyOn(loader, '_importLanguageModule').mockImplementation(async () => {
      importCount++;
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockData;
    });

    // Trigger two concurrent loads
    const [result1, result2] = await Promise.all([
      loader.loadLanguage('dutch'),
      loader.loadLanguage('dutch'),
    ]);

    // Both get data, but import only called once
    expect(result1).toEqual(mockData);
    expect(result2).toEqual(mockData);
    expect(importCount).toBe(1);
  });
});
```

---

## Debugging Tests

### Using Interactive UI

```bash
npm run test:ui
```

Opens browser with visual test interface:
- Click individual tests to run
- See detailed stack traces
- View assertion differences
- Inspect test execution time

### Console Debugging

```javascript
it('should do something complex', async () => {
  const loader = new LanguageLoader();

  console.log('Initial state:', loader.getCacheStats());

  await loader.loadLanguage('dutch');

  console.log('After load:', loader.getCacheStats());
  console.table(loader.cache);

  expect(loader.isLoaded('dutch')).toBe(true);
});
```

### Debugging Specific Tests

```javascript
// Run only this describe block
describe.only('Focus on this', () => {
  it('test 1', () => {});
  it('test 2', () => {});
});

// Run only this test
it.only('Focus on this one test', () => {});

// Skip this test
it.skip('Not ready yet', () => {});
```

---

## Coverage Reports

### Generating Coverage

```bash
npm run test:coverage
```

**Output**:
- Terminal: Text summary
- `coverage/index.html`: Interactive HTML report
- `coverage/coverage-final.json`: Machine-readable data

### Interpreting Coverage

**Coverage Types**:
- **Line Coverage**: % of lines executed
- **Branch Coverage**: % of if/else paths taken
- **Function Coverage**: % of functions called
- **Statement Coverage**: % of statements executed

**Target Goals**:
- **Critical Business Logic**: 80%+ coverage
- **Public APIs**: 100% coverage
- **Utility Functions**: 70%+ coverage
- **UI Code**: 50%+ coverage (harder to test)

**Example Coverage Report**:
```
File                    | % Stmts | % Branch | % Funcs | % Lines |
------------------------|---------|----------|---------|---------|
language-loader.js      |   92.31 |    85.71 |  100.00 |   92.00 |
resource-counter.js     |  100.00 |   100.00 |  100.00 |  100.00 |
loading-ui.js           |   45.83 |    40.00 |   66.67 |   45.45 |
------------------------|---------|----------|---------|---------|
All files               |   79.31 |    75.00 |   88.89 |   78.95 |
```

---

## Continuous Integration (Future)

### GitHub Actions Workflow (Planned)

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'

      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### Pre-commit Hooks (Future)

```bash
# .husky/pre-commit
npm run lint
npm run test
```

---

## Adding New Tests

### Step-by-Step Guide

**1. Create Test File**:
```bash
touch tests/unit/my-new-module.test.js
```

**2. Write Basic Structure**:
```javascript
import { describe, it, expect } from 'vitest';
import { MyModule } from '../../assets/js/my-new-module.js';

describe('MyModule', () => {
  it('should exist', () => {
    expect(MyModule).toBeDefined();
  });
});
```

**3. Run in Watch Mode**:
```bash
npm run test:watch
```

**4. Add More Tests Iteratively**:
```javascript
describe('MyModule', () => {
  it('should handle basic case', () => {
    expect(MyModule.doSomething('input')).toBe('output');
  });

  it('should handle edge case', () => {
    expect(MyModule.doSomething(null)).toBe(null);
  });

  // Add more tests as you think of scenarios
});
```

**5. Verify All Tests Pass**:
```bash
npm run test
```

**6. Check Coverage**:
```bash
npm run test:coverage
```

---

## Troubleshooting

### Tests Fail Randomly

**Problem**: Flaky tests
**Causes**:
- Shared state between tests
- Async timing issues
- Mock cleanup not happening

**Solutions**:
```javascript
// Use beforeEach/afterEach
beforeEach(() => {
  // Fresh state for each test
  loader = new LanguageLoader();
});

afterEach(() => {
  // Clean up mocks
  vi.clearAllMocks();
  vi.restoreAllMocks();
});
```

### Import Errors in Tests

**Problem**: `Cannot find module`
**Solution**:
```javascript
// Make sure path is correct (relative from test file)
import { MyModule } from '../../assets/js/my-module.js';
//                       ^^^ Two levels up from tests/unit/
```

### Timeout Errors

**Problem**: Test times out
**Solutions**:
```javascript
// Option 1: Increase timeout for slow test
it('slow operation', async () => {
  // test code
}, 10000);  // 10 second timeout

// Option 2: Increase global timeout in vitest.config.js
export default defineConfig({
  test: {
    testTimeout: 15000,  // 15s default
  },
});
```

---

## Testing Checklist

### Before Committing

- [ ] All tests pass (`npm run test`)
- [ ] No .only() or .skip() left in code
- [ ] Console logs removed (or intentional)
- [ ] Coverage acceptable for new code
- [ ] Tests are clear and well-named
- [ ] Edge cases covered
- [ ] Error paths tested

### Before Pull Request

- [ ] All tests pass
- [ ] Coverage report reviewed
- [ ] New tests documented (if complex)
- [ ] CI/CD will pass (simulate locally)

---

## References

### Official Documentation
- [Vitest Documentation](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [happy-dom Documentation](https://github.com/capricorn86/happy-dom)

### Internal Documentation
- `vitest.config.js` - Test configuration
- `tests/setup.js` - Global test setup
- `DEVELOPMENT.md` - Testing workflow
- `ARCHITECTURE.md` - Testing architecture

### Example Test Files
- `tests/unit/language-loader.test.js` - Comprehensive example (23 tests)
- `tests/unit/resource-counter.test.js` - Pure function testing (27 tests)

---

## Future Enhancements

### Planned Additions

1. **Integration Tests**
   - Full user flow testing
   - Language card click → load → render

2. **E2E Tests** (Playwright)
   - Browser automation
   - Real user scenarios
   - Cross-browser testing

3. **Visual Regression Tests**
   - Screenshot comparison
   - Catch UI breaking changes

4. **Performance Tests**
   - Bundle size limits
   - Load time benchmarks
   - Memory leak detection

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-08
**Test Framework**: Vitest 3.2.4
**Total Tests**: 50 (100% passing)
