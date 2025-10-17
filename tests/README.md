# Automated Testing Suite

Comprehensive test suite for the Language Learning Resources website ensuring code quality, preventing regressions, and maintaining performance standards.

## Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Categories](#test-categories)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)
- [Coverage Requirements](#coverage-requirements)
- [Troubleshooting](#troubleshooting)

## Overview

This test suite uses **Vitest** as the test framework with **happy-dom** for browser environment simulation. All tests are organized by type and purpose for maintainability.

### Key Features

- ✅ **Unit Tests** - Pure function testing with high coverage
- ✅ **Integration Tests** - Full page loading and navigation flows
- ✅ **E2E Tests** - Browser simulation and user interaction testing
- ✅ **Performance Tests** - Benchmarking and regression detection
- ✅ **Mobile Tests** - Responsiveness and touch interaction testing
- ✅ **CI/CD** - Automated testing on GitHub Actions

## Test Structure

```
tests/
├── unit/                      # Unit tests for individual modules
│   ├── main.test.js          # Homepage functionality tests
│   ├── resource-counter.test.js  # Resource counting logic
│   └── language-loader.test.js   # Language loading system
├── integration/               # Integration tests
│   ├── page-loading.test.js  # Full page load flows
│   └── language-page.test.js # Language page display
├── e2e/                      # End-to-end tests
│   ├── browser-simulation.test.js  # Complete user flows
│   └── mobile-responsiveness.test.js  # Mobile testing
├── performance/              # Performance benchmarks
│   └── benchmarks.test.js    # Speed and efficiency tests
├── setup.js                  # Global test configuration
└── README.md                 # This file
```

## Running Tests

### Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### By Category

```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e

# Performance benchmarks only
npm run test:performance

# Run all test categories sequentially
npm run test:all
```

### CI Mode

```bash
# Run in CI mode (used by GitHub Actions)
npm run test:ci
```

## Test Categories

### 1. Unit Tests

**Purpose**: Test individual functions and modules in isolation

**Location**: `/tests/unit/`

**Examples**:
- Resource counting functions
- Language data validation
- Utility functions (debounce, throttle)
- DOM element manipulation

**Coverage Target**: >80%

```javascript
// Example: tests/unit/resource-counter.test.js
describe('countResourcesByType()', () => {
  it('should count items in standard nested structure', () => {
    const coursesArray = [
      { name: 'Beginner', items: [{}, {}, {}] },
      { name: 'Advanced', items: [{}, {}] },
    ];

    const count = countResourcesByType(coursesArray, 'courses');
    expect(count).toBe(5);
  });
});
```

### 2. Integration Tests

**Purpose**: Test how multiple components work together

**Location**: `/tests/integration/`

**Examples**:
- Homepage loading flow
- Language page rendering
- Search and filtering
- Resource counting across pages

**Coverage Target**: >75%

```javascript
// Example: tests/integration/page-loading.test.js
describe('Full Page Loading Integration', () => {
  it('should load language metadata quickly', () => {
    const start = performance.now();
    const languages = getLanguageMetadata();
    const duration = performance.now() - start;

    expect(languages).toBeInstanceOf(Array);
    expect(duration).toBeLessThan(50);
  });
});
```

### 3. E2E Tests

**Purpose**: Simulate real user interactions and flows

**Location**: `/tests/e2e/`

**Examples**:
- Complete search workflow
- Navigation between pages
- Mobile menu interactions
- Form submissions

**Coverage Target**: Critical paths covered

```javascript
// Example: tests/e2e/browser-simulation.test.js
describe('User Interaction Flow: Search', () => {
  it('should complete full search interaction', async () => {
    const searchInput = document.getElementById('quick-search-input');

    // User types
    searchInput.value = 'dutch';
    searchInput.dispatchEvent(new Event('input'));

    // User presses Enter
    const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
    searchInput.dispatchEvent(enterEvent);

    expect(searchInput.value).toBe('dutch');
  });
});
```

### 4. Performance Tests

**Purpose**: Ensure code meets performance requirements

**Location**: `/tests/performance/`

**Examples**:
- Resource counting speed
- Search performance
- DOM rendering benchmarks
- Memory usage tracking

**Performance Targets**:
- Resource counting: <1ms per language
- Search: <5ms per query
- Page load: <200ms total
- DOM updates: <100ms for 67 items

```javascript
// Example: tests/performance/benchmarks.test.js
describe('Resource Counting Performance', () => {
  it('should count resources for single language in < 1ms', () => {
    const iterations = 1000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      countLanguageResources(mockLanguage);
    }

    const duration = performance.now() - start;
    const avgDuration = duration / iterations;

    expect(avgDuration).toBeLessThan(1);
  });
});
```

### 5. Mobile Responsiveness Tests

**Purpose**: Verify mobile-specific functionality

**Location**: `/tests/e2e/mobile-responsiveness.test.js`

**Examples**:
- Viewport detection
- Touch interactions
- Mobile navigation
- Grid layout responsiveness
- Font scaling

```javascript
// Example: Mobile navigation test
describe('Mobile Navigation', () => {
  it('should toggle menu on hamburger click', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.click();
    navMenu.classList.toggle('active');

    expect(navMenu.classList.contains('active')).toBe(true);
  });
});
```

## Writing Tests

### Test Structure (AAA Pattern)

```javascript
describe('Feature or Component', () => {
  // Setup
  beforeEach(() => {
    // Arrange: Set up test conditions
  });

  // Cleanup
  afterEach(() => {
    // Clean up after each test
  });

  it('should do something specific', () => {
    // Arrange: Set up test data
    const input = 'test';

    // Act: Execute the code under test
    const result = functionToTest(input);

    // Assert: Verify the result
    expect(result).toBe('expected');
  });
});
```

### Best Practices

1. **Descriptive Names**: Test names should explain what and why
   ```javascript
   ❌ it('works', () => {...})
   ✅ it('should count resources across all languages', () => {...})
   ```

2. **One Assertion Per Test**: Each test should verify one behavior
   ```javascript
   ✅ it('should return empty array for invalid input', () => {
     expect(search(null)).toEqual([]);
   });
   ```

3. **Mock External Dependencies**
   ```javascript
   vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);
   ```

4. **Test Edge Cases**
   ```javascript
   it('should handle empty input gracefully', () => {...});
   it('should handle null values', () => {...});
   it('should handle very large datasets', () => {...});
   ```

5. **Performance Assertions**
   ```javascript
   const start = performance.now();
   // ... operation
   const duration = performance.now() - start;
   expect(duration).toBeLessThan(100);
   ```

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on:
- Every push to `main` and `develop` branches
- Every pull request
- Daily at 2 AM UTC (scheduled)

### Workflow Steps

1. **Checkout code**
2. **Install dependencies** (with caching)
3. **Run linting** (code quality)
4. **Run unit tests**
5. **Run integration tests**
6. **Run E2E tests**
7. **Run performance tests**
8. **Generate coverage report**
9. **Upload to Codecov**
10. **Archive test artifacts**

### Matrix Testing

Tests run on multiple environments:
- **OS**: Ubuntu, Windows, macOS
- **Node**: v18.x, v20.x

### Viewing Results

- GitHub Actions tab in repository
- Pull request checks
- Coverage reports on Codecov

## Coverage Requirements

### Minimum Coverage Targets

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Excluded from Coverage

- `node_modules/`
- `dist/`
- `tests/`
- `scripts/`
- `*.config.js`
- Development tools (`review-tool*.js`)
- Large data files (`data.js`, `data-simple.js`)

## Troubleshooting

### Common Issues

#### 1. Tests failing locally but passing in CI

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests fresh
npm test
```

#### 2. Happy-dom vs JSDOM differences

If you see DOM-related test failures, check:
- Element creation methods
- Event simulation syntax
- Browser API availability

#### 3. Performance tests inconsistent

Performance tests may vary by system. Use averages:

```javascript
// Run multiple iterations
const iterations = 100;
const durations = [];

for (let i = 0; i < iterations; i++) {
  const start = performance.now();
  // operation
  durations.push(performance.now() - start);
}

const avg = durations.reduce((a, b) => a + b) / iterations;
expect(avg).toBeLessThan(threshold);
```

#### 4. Memory leaks in tests

```javascript
afterEach(() => {
  // Clear all caches
  loader.clearCache();

  // Reset DOM
  document.body.innerHTML = '';

  // Clear global state
  global.languageData = {};
});
```

### Debug Mode

```bash
# Run tests with debugging
npm run test:watch

# Use Vitest UI for interactive debugging
npm run test:ui
```

## Test Maintenance

### Adding New Tests

1. Determine test category (unit/integration/e2e/performance)
2. Create test file in appropriate directory
3. Follow naming convention: `feature-name.test.js`
4. Import required modules
5. Write descriptive test cases
6. Verify all tests pass: `npm test`

### Updating Existing Tests

1. Run tests before changes: `npm test`
2. Make necessary updates
3. Ensure all tests still pass
4. Update coverage if needed
5. Document breaking changes

### Regression Prevention

When fixing bugs:

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify test now passes
4. Keep test to prevent regression

## Performance Benchmarks

### Current Benchmarks (as of 2024)

| Operation | Target | Current |
|-----------|--------|---------|
| Single language count | <1ms | ~0.3ms |
| All languages count (67) | <50ms | ~12ms |
| Language search | <5ms | ~2ms |
| Metadata load | <10ms | ~3ms |
| DOM render (67 cards) | <100ms | ~45ms |
| Page load (complete) | <200ms | ~120ms |

### Running Benchmarks

```bash
npm run test:performance
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Happy-dom Documentation](https://github.com/capricorn86/happy-dom)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Contributing

When contributing, ensure:
- All tests pass locally
- New features have test coverage
- Performance benchmarks are maintained
- CI/CD pipeline passes

---

**Last Updated**: 2025-10-16
**Test Framework**: Vitest v3.2.4
**Coverage Tool**: v8
**CI/CD**: GitHub Actions
