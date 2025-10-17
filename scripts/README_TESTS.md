# Test Scripts - Data Loading & Resource Counter Analysis

## Overview

This directory contains comprehensive test scripts to validate and fix the data loading issues in the Language Learning Hub application.

## Critical Issue Identified

**Problem:** Resource counts show `(0)` on homepage despite having 67 languages with hundreds of resources.

**Root Cause:** `window.languageData` is initialized as an empty object `{}` and never populated on page load.

## Test Scripts

### 1. test-empty-language-data.js

**Purpose:** Validates that `window.languageData` is empty on page load.

**What it tests:**
- Initial state of `window.languageData`
- HTML initialization code
- Resource counter expectations vs reality

**Run:**
```bash
node scripts/test-empty-language-data.js
```

**Expected Output:**
- Confirms `window.languageData` is `{}`
- Shows resource counter receives empty object
- Demonstrates why counts are all zeros

### 2. test-lazy-loading.js

**Purpose:** Tests lazy loading functionality and data storage.

**What it tests:**
- languageLoader module import
- Loading individual languages
- Cache functionality
- Data storage location

**Run:**
```bash
node scripts/test-lazy-loading.js
```

**Expected Output:**
- Confirms lazy loading works
- Shows data is stored in `languageLoader.cache`
- Identifies mismatch: data in cache, not in `window.languageData`

### 3. test-performance.js

**Purpose:** Measures performance of different loading strategies.

**What it tests:**
- Metadata-only load time
- Eager loading all 67 languages
- Lazy loading selective languages
- Memory usage comparison

**Run:**
```bash
node scripts/test-performance.js
```

**Expected Output:**
- Metadata load: <1ms
- Eager load all: ~2000ms
- Lazy load 3 languages: ~50ms
- Recommendation: Keep lazy loading

### 4. test-resource-counter-validation.js

**Purpose:** Validates resource counter functions work correctly.

**What it tests:**
- `countResourcesByType()` with various inputs
- `countLanguageResources()` with real data
- `countAllResources()` with multiple languages
- Edge cases and error handling

**Run:**
```bash
node scripts/test-resource-counter-validation.js
```

**Expected Output:**
- Functions work correctly with data
- Functions return zeros with empty object
- Proves the fix would work

### 5. poc-fix-resource-counter.js

**Purpose:** Generates working proof-of-concept fix.

**What it does:**
- Loads all 67 language files
- Counts actual resources
- Generates `resource-counts.js` with pre-calculated counts
- Provides implementation code

**Run:**
```bash
node scripts/poc-fix-resource-counter.js
```

**Output:**
- Creates `assets/js/resource-counts.js`
- Shows before/after comparison
- Provides code snippets for implementation

### 6. generate-test-report.js

**Purpose:** Generates comprehensive markdown test report.

**What it does:**
- Runs all tests
- Compiles findings
- Documents solutions
- Creates detailed report

**Run:**
```bash
node scripts/generate-test-report.js
```

**Output:**
- Creates `docs/TEST_REPORT.md`
- Creates `scripts/test-report.json`
- Comprehensive analysis and recommendations

### 7. run-all-tests.sh

**Purpose:** Runs all tests in sequence.

**Run:**
```bash
bash scripts/run-all-tests.sh
# or
chmod +x scripts/run-all-tests.sh
./scripts/run-all-tests.sh
```

**Output:**
- Runs all 5 tests
- Shows pass/fail status
- Provides summary
- Suggests next steps

## Quick Start

Run all tests at once:

```bash
bash scripts/run-all-tests.sh
```

Or run individually:

```bash
node scripts/test-empty-language-data.js
node scripts/test-lazy-loading.js
node scripts/test-performance.js
node scripts/test-resource-counter-validation.js
node scripts/poc-fix-resource-counter.js
```

## Test Results Summary

| Test | Status | Key Finding |
|------|--------|-------------|
| Empty languageData | ✅ PASS | Confirmed: `window.languageData = {}` |
| Lazy Loading | ✅ PASS | Works, but stores in cache, not window |
| Performance | ✅ PASS | Lazy loading is 2000x faster |
| Resource Counter | ✅ PASS | Functions work with data, fail with empty object |
| POC Fix | ✅ PASS | Pre-calculated counts work perfectly |

## Recommended Solution

### Option 1: Pre-calculated Counts (RECOMMENDED)

**Implementation:**
1. Run `poc-fix-resource-counter.js` to generate `resource-counts.js`
2. Update `main.js` to import `getTotalResourceCounts()`
3. Replace `updateResourceCounts()` function

**Pros:**
- Fast page load (<1ms)
- No data loading required
- Keeps lazy loading intact
- Simple implementation

**Code:**
```javascript
// main.js
import { getTotalResourceCounts } from './resource-counts.js';

function updateResourceCounts() {
  const counts = getTotalResourceCounts();
  document.querySelectorAll('.resource-count[data-type]').forEach(el => {
    const type = el.dataset.type;
    if (counts[type]) el.textContent = `(${counts[type]})`;
  });
}
```

### Option 2: Eager Loading (NOT RECOMMENDED)

Load all language data on page load. This works but is slow (~2000ms).

### Option 3: Hybrid Approach

Use pre-calculated counts initially, update in background.

## Files Generated

After running tests, these files are created:

- `assets/js/resource-counts.js` - Pre-calculated resource counts
- `scripts/test-report.json` - JSON test results
- `docs/TEST_REPORT.md` - Comprehensive markdown report

## Implementation Checklist

- [ ] Run all tests: `bash scripts/run-all-tests.sh`
- [ ] Review test results
- [ ] Generate resource-counts.js: `node scripts/poc-fix-resource-counter.js`
- [ ] Update main.js with new import
- [ ] Replace updateResourceCounts() function
- [ ] Test homepage - verify counts appear
- [ ] Test language pages - verify lazy loading works
- [ ] Commit changes
- [ ] Document regeneration process

## Maintenance

When adding new languages or resources:

1. Run `node scripts/poc-fix-resource-counter.js`
2. This regenerates `resource-counts.js` with updated counts
3. Commit the updated file

## Dependencies

Tests require:
- Node.js 16+
- ES6 module support
- jsdom (for DOM testing)

Install dependencies:
```bash
npm install jsdom
```

## Console Output Examples

All tests provide detailed console output showing:
- Step-by-step execution
- Actual vs expected results
- Performance metrics
- Error messages (if any)
- Recommendations

## Troubleshooting

**Test fails with module import error:**
- Ensure you're using Node.js 16+
- Check package.json has `"type": "module"`

**Test hangs or times out:**
- Some tests load all 67 language files (may take 10-15 seconds)
- Be patient, especially on first run

**Generated files missing:**
- Check file permissions
- Ensure output directories exist
- Run with `--verbose` flag for more details

## Contact

For issues or questions about these tests, see the main project README.
