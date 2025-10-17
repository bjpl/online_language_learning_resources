# Complete Testing Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Watch mode (development)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Test Suite Summary

### Total Tests Created: 200+

#### Unit Tests (70+ tests)
- `/tests/unit/main.test.js` - 23 tests for homepage functionality
- `/tests/unit/resource-counter.test.js` - 27 tests for counting logic
- `/tests/unit/language-loader.test.js` - 20 tests for lazy loading

#### Integration Tests (50+ tests)
- `/tests/integration/page-loading.test.js` - 30 tests for page flows
- `/tests/integration/language-page.test.js` - 20 tests for language pages

#### E2E Tests (60+ tests)
- `/tests/e2e/browser-simulation.test.js` - 40 tests for user flows
- `/tests/e2e/mobile-responsiveness.test.js` - 20 tests for mobile

#### Performance Tests (20+ tests)
- `/tests/performance/benchmarks.test.js` - 20 tests for speed

## What's Tested

### ✅ Core Functionality
- Resource counting across all languages
- Language metadata loading
- Search and filtering
- Lazy loading system
- Cache management

### ✅ User Interactions
- Search workflows
- Navigation flows
- Mobile menu toggling
- Keyboard navigation
- Form submissions

### ✅ Page Loading
- Homepage initialization
- Language page rendering
- Cross-page navigation
- Error handling
- Data synchronization

### ✅ Performance
- Resource counting speed (<1ms per language)
- Search performance (<5ms per query)
- DOM rendering (<100ms for 67 items)
- Memory efficiency
- Cache access speed

### ✅ Responsiveness
- Mobile viewport detection
- Touch interactions
- Grid layout changes
- Font scaling
- Safe area handling

### ✅ Accessibility
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Touch target sizes

## Test Coverage Goals

| Area | Target | Current |
|------|--------|---------|
| Statements | 80% | Measuring... |
| Branches | 75% | Measuring... |
| Functions | 80% | Measuring... |
| Lines | 80% | Measuring... |

## Running Specific Tests

```bash
# Run one test file
npx vitest run tests/unit/resource-counter.test.js

# Run tests matching pattern
npx vitest run --grep "Resource Count"

# Run in UI mode
npm run test:ui

# Run with specific reporter
npx vitest run --reporter=verbose
```

## Continuous Integration

Tests run automatically on:
- Every push to main/develop
- Every pull request
- Daily scheduled runs
- Multiple OS (Ubuntu, Windows, macOS)
- Multiple Node versions (18.x, 20.x)

## Regression Prevention

Key areas protected against regressions:

1. **Resource Counting** - Prevents miscounting issues that were previously problematic
2. **Language Loading** - Ensures all 67 languages load correctly
3. **Display Accuracy** - Verifies resources display properly on all pages
4. **Performance** - Catches performance degradations early
5. **Mobile Compatibility** - Ensures mobile experience remains optimal

## Test Patterns Used

### AAA Pattern
```javascript
it('should count resources correctly', () => {
  // Arrange
  const data = { resources: {...} };

  // Act
  const result = countResources(data);

  // Assert
  expect(result).toBe(10);
});
```

### Mock Pattern
```javascript
vi.spyOn(loader, 'loadLanguage').mockResolvedValue(mockData);
```

### Performance Testing
```javascript
const start = performance.now();
// operation
const duration = performance.now() - start;
expect(duration).toBeLessThan(100);
```

## Debugging Tests

### VS Code Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Vitest Tests",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "test:watch"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Browser DevTools

Use Vitest UI for interactive debugging:

```bash
npm run test:ui
```

## Common Test Scenarios

### Testing Async Functions

```javascript
it('should load language asynchronously', async () => {
  const data = await loader.loadLanguage('dutch');
  expect(data).toBeDefined();
});
```

### Testing DOM Manipulation

```javascript
it('should render language cards', () => {
  const grid = document.getElementById('languages-grid');
  // create cards
  expect(grid.children.length).toBe(67);
});
```

### Testing Events

```javascript
it('should handle click events', () => {
  const button = document.createElement('button');
  let clicked = false;
  button.addEventListener('click', () => clicked = true);
  button.click();
  expect(clicked).toBe(true);
});
```

### Testing Performance

```javascript
it('should execute quickly', () => {
  const start = performance.now();
  operation();
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(50);
});
```

## Maintenance

### Adding New Tests

1. Choose appropriate directory (unit/integration/e2e/performance)
2. Follow naming: `feature.test.js`
3. Import required modules
4. Write clear test descriptions
5. Ensure tests pass: `npm test`

### Updating Tests

1. Run existing tests first
2. Make necessary changes
3. Verify all tests pass
4. Update documentation

### Test Data

Mock data is kept in test files for clarity:

```javascript
const mockLanguageData = {
  dutch: {
    name: 'Dutch',
    resources: {
      courses: [{ items: [{}, {}] }],
      apps: [{ items: [{}] }]
    }
  }
};
```

## Performance Benchmarks

### Current Targets

| Operation | Target | Purpose |
|-----------|--------|---------|
| Single language count | <1ms | Fast UI updates |
| All languages count | <50ms | Homepage load |
| Search query | <5ms | Responsive search |
| Metadata load | <10ms | Quick initial render |
| DOM render (67 cards) | <100ms | Smooth UX |

### Running Benchmarks

```bash
npm run test:performance
```

## Troubleshooting

### Tests Pass Locally, Fail in CI

1. Check Node version compatibility
2. Verify dependencies are locked
3. Look for race conditions
4. Check environment-specific code

### Flaky Tests

1. Use `vi.useFakeTimers()` for timing-dependent tests
2. Avoid `setTimeout` in tests
3. Mock external dependencies
4. Use `beforeEach`/`afterEach` for cleanup

### Memory Issues

```javascript
afterEach(() => {
  loader.clearCache();
  document.body.innerHTML = '';
  global.languageData = {};
});
```

## Resources

- [Test README](/tests/README.md) - Detailed test documentation
- [Vitest Docs](https://vitest.dev/)
- [Happy-dom Docs](https://github.com/capricorn86/happy-dom)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## Contributing

When adding features:

1. Write tests first (TDD)
2. Ensure >80% coverage
3. Add performance tests for critical paths
4. Update documentation
5. Verify CI passes

---

**Test Suite Version**: 1.0.0
**Framework**: Vitest 3.2.4
**Environment**: happy-dom 19.0.2
**Last Updated**: 2025-10-16
