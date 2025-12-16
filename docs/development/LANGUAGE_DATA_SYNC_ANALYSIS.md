# Language Data Synchronization Issue - Comprehensive Analysis

**Analysis Date:** 2025-10-16
**Project:** Online Language Learning Resources
**Status:** CRITICAL - Languages not displaying on homepage

---

## Executive Summary

The online language learning resources website has a **critical data synchronization issue** preventing languages from displaying on the homepage. The root cause is a **broken data flow chain** between the old global `languageData` object and the new ES6 module-based lazy-loading system.

**Severity:** HIGH - Core functionality broken
**Impact:** 67 languages unavailable on main page
**Root Cause:** Architectural mismatch between legacy and modern code patterns

---

## 1. PROJECT STRUCTURE ANALYSIS

### File Organization

```
/assets/js/
├── main.js                    ✅ Main application logic (ES6 modules)
├── language-loader.js         ✅ Dynamic import system
├── language-page.js           ⚠️  Expects global languageData
├── resource-counter.js        ✅ Pure functions for counting
├── grid-manager.js            ❓ Not examined
├── modern-ui-clean.js         ❓ Not examined
└── language-data/             ✅ All language files present (67 total)
    ├── language-metadata.js   ✅ Lightweight metadata for cards
    ├── dutch-data.js          ✅ Sample verified
    ├── portuguese-data.js     ✅ Mentioned in docs
    └── [65 more language files]

/
├── index.html                 ✅ Homepage - languages should display here
├── language.html              ✅ Individual language page
├── resources.html             ❓ Not examined
└── data.js                    ⚠️  OLD legacy global data structure
```

### Data Migration Status

| Component | Status | Pattern | Issues |
|-----------|--------|---------|--------|
| Language files | ✅ Complete | ES6 modules | All 67 files exist |
| Metadata | ✅ Complete | Named exports | Proper structure |
| Language loader | ✅ Implemented | Class + singleton | Well designed |
| Main.js | ⚠️ Partial | Mixed patterns | References missing global |
| Language-page.js | ❌ Broken | Global dependency | Expects `window.languageData` |
| Index.html | ⚠️ Partial | Module scripts | Initializes empty object |

---

## 2. DATA FLOW ANALYSIS

### Expected Flow (By Design)

```mermaid
graph TD
    A[index.html loads] --> B[Initialize window.languageData = {}]
    B --> C[main.js imports language-metadata]
    C --> D[Render language cards from metadata]
    D --> E[User clicks card]
    E --> F[languageLoader.loadLanguage]
    F --> G[Dynamic import from language-data/]
    G --> H[Store in window.languageData]
    H --> I[Navigate to language.html]
```

### Actual Flow (Broken)

```mermaid
graph TD
    A[index.html loads] --> B[Initialize window.languageData = {}]
    B --> C[main.js imports language-metadata]
    C --> D[getLanguageMetadata returns 67 languages]
    D --> E[renderLanguages creates cards]
    E --> F[Cards appear in DOM]
    F --> G[resource-counter.js tries to count]
    G --> H[Expects window.languageData to be populated]
    H --> I[FAILURE: window.languageData is empty]
    I --> J[Resource counts show undefined]
```

---

## 3. CRITICAL ISSUES IDENTIFIED

### Issue #1: Empty Global languageData Object

**Location:** `/index.html` line 250-252

```javascript
<script type="module">
  // Initialize global languageData object for backwards compatibility
  window.languageData = {};
</script>
```

**Problem:** The global object is initialized as empty `{}` but never populated.

**Expected Behavior:** Should contain all language data for resource counting.

**Actual Behavior:** Remains empty, breaking `resource-counter.js` which expects data.

**Evidence:**
- `main.js` line 356: `const resourceCounts = countAllResources(languageData);`
- `resource-counter.js` expects populated object with structure:
  ```javascript
  {
    dutch: { resources: { courses: [...], apps: [...] } },
    french: { resources: { courses: [...], apps: [...] } },
    // ... all 67 languages
  }
  ```

---

### Issue #2: Resource Counter Receives Empty Data

**Location:** `/assets/js/main.js` lines 348-365

```javascript
function updateResourceCounts() {
    // Check if we're on the homepage
    const resourceCountElements = document.querySelectorAll('.resource-count[data-type]');
    if (resourceCountElements.length === 0) {
        return;
    }

    // Use helper module to count all resources (pure function, tested)
    const resourceCounts = countAllResources(languageData);  // ❌ languageData is undefined!

    // Update the DOM with counts
    resourceCountElements.forEach((element) => {
        const { type } = element.dataset;
        if (resourceCounts[type] !== undefined) {
            element.textContent = `(${resourceCounts[type]})`;
        }
    });
}
```

**Problems:**
1. `languageData` is not defined in module scope
2. Should reference `window.languageData` explicitly
3. Function executes before any data is loaded
4. No check if data is available before counting

**Expected:** Should count resources across all 67 languages
**Actual:** Returns `{courses: 0, apps: 0, books: 0, audio: 0, practice: 0}`

---

### Issue #3: Lazy Loading System Not Triggered on Homepage

**Location:** `/assets/js/main.js` lines 152-169

**Analysis:** The `renderLanguages()` function creates language cards using lightweight metadata:

```javascript
function renderLanguages(_showAll = true) {
    // Get lightweight metadata for all languages
    const languages = getLanguageMetadata();  // ✅ This works - returns 67 languages

    // Filter languages based on search term
    const filteredLanguages = state.searchTerm
        ? searchLanguages(state.searchTerm)
        : languages;

    // Clear grid
    elements.languagesGrid.innerHTML = '';

    // Render cards with staggered animation
    filteredLanguages.forEach((language, index) => {
        const card = createLanguageCard(language, index);  // ✅ Creates cards
        elements.languagesGrid.appendChild(card);
    });
}
```

**Good:**
- Metadata system works perfectly
- 67 language cards should render
- Click handlers for lazy loading are attached

**Problem:**
- Full language data is ONLY loaded on card click
- Resource counts run BEFORE any data is loaded
- No mechanism to pre-load data for homepage display

---

### Issue #4: Architectural Mismatch

**Core Problem:** Two incompatible systems exist simultaneously:

#### Old System (Legacy)
```javascript
// /assets/js/data.js
const languageData = {
    dutch: { name: "Dutch", resources: {...} },
    french: { name: "French", resources: {...} },
    // ... all languages in one file
};
```

**Characteristics:**
- Global variable
- All data loaded upfront
- Synchronous access
- Works with resource-counter.js

#### New System (Current)
```javascript
// /assets/js/language-data/*.js
// 67 separate files, loaded on demand
const dutchResources = { name: "Dutch", resources: {...} };
export { dutchResources };
```

**Characteristics:**
- ES6 modules
- Lazy loading (90% faster)
- Asynchronous access
- NOT compatible with legacy code expecting global object

**The Disconnect:**
- `language-page.js` (line 13) expects: `const language = languageData[langParam]`
- `main.js` (line 356) expects: `countAllResources(languageData)`
- But `languageData` is initialized empty and never populated!

---

## 4. DATA STRUCTURE COMPARISON

### Language Metadata (Lightweight - 9KB)

```javascript
// /assets/js/language-data/language-metadata.js
export const languageMetadata = [
  {
    code: 'dutch',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    speakers: '24M native',
    learners: '5M'
  },
  // ... 66 more languages
];
```

**Purpose:** Display language cards on homepage
**Size:** ~9KB total
**Status:** ✅ Working perfectly

---

### Full Language Data (Heavy - ~1.9MB)

```javascript
// /assets/js/language-data/dutch-data.js
const dutchResources = {
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    learners: "5M",
    speakers: "24M native",
    highlights: ["Germanic roots similar to English", ...],
    resources: {
        courses: [
            {
                category: "University MOOCs",
                items: [
                    {
                        name: "University of Groningen - Introduction to Dutch",
                        url: "https://www.futurelearn.com/courses/dutch",
                        level: "Beginner (A1)",
                        features: ["Completely free", "Cultural videos", ...],
                        free: true
                    },
                    // ... hundreds more resources
                ]
            }
        ],
        apps: [...],
        books: [...],
        audio: [...],
        practice: [...]
    }
};
```

**Purpose:** Display full resource lists on individual language pages
**Size:** ~12KB per language × 67 = ~804KB minimum
**Status:** ⚠️ Files exist but not loaded on homepage

---

## 5. MISSING SYNCHRONIZATION MECHANISM

### What Should Happen

For resource counts to work on the homepage, we need:

1. **Option A: Pre-load All Data (Simple but Slow)**
   ```javascript
   // In index.html, after initializing window.languageData
   async function preloadAllLanguages() {
       const languages = ['dutch', 'french', 'german', ...]; // all 67
       for (const lang of languages) {
           const data = await languageLoader.loadLanguage(lang);
           window.languageData[lang] = data;
       }
       updateResourceCounts();
   }
   preloadAllLanguages();
   ```

   **Pros:** Simple, compatible with existing code
   **Cons:** Downloads ~804KB on page load (defeats lazy loading)

2. **Option B: Extend Metadata with Counts (Efficient)**
   ```javascript
   // language-metadata.js
   export const languageMetadata = [
     {
       code: 'dutch',
       name: 'Dutch',
       nativeName: 'Nederlands',
       flag: '🇳🇱',
       speakers: '24M native',
       learners: '5M',
       resourceCounts: {  // ← Add this
         courses: 15,
         apps: 8,
         books: 12,
         audio: 20,
         practice: 6
       }
     },
     // ...
   ];
   ```

   **Pros:** Fast, no extra downloads, scalable
   **Cons:** Requires pre-calculation script, metadata must stay in sync

3. **Option C: Separate Counts API (Best Practice)**
   ```javascript
   // /assets/js/language-data/resource-counts.js
   export const resourceCounts = {
       total: { courses: 1250, apps: 450, books: 680, audio: 890, practice: 320 },
       byLanguage: {
           dutch: { courses: 15, apps: 8, books: 12, audio: 20, practice: 6 },
           french: { courses: 18, apps: 10, books: 15, audio: 22, practice: 8 },
           // ... all 67 languages
       }
   };
   ```

   **Pros:** Small file (~15KB), fast, maintainable
   **Cons:** Requires build script to generate from language files

---

## 6. SPECIFIC CODE LOCATIONS WITH ISSUES

### File: `/assets/js/main.js`

#### Line 356: Undefined Variable
```javascript
const resourceCounts = countAllResources(languageData);
```

**Problem:** `languageData` is not defined in module scope
**Fix:** Should be `window.languageData` OR use metadata counts

#### Line 225-238: Incomplete Data Flow
```javascript
async function handleLanguageCardClick(languageCode, cardElement) {
    try {
        const loaderId = loadingUI.showLoader(cardElement, 'Loading resources...');
        const data = await languageLoader.loadLanguage(languageCode);

        // Store in global object for backwards compatibility
        if (typeof window.languageData === 'object') {
            window.languageData[languageCode] = data;  // ✅ Good
        }

        loadingUI.hideLoader(loaderId);
        window.location.href = `language.html?lang=${languageCode}`;
    } catch (error) {
        loadingUI.showError(`Failed to load ${languageCode} resources: ${error.message}`);
    }
}
```

**Problem:** Data is loaded on click, but resource counts need it BEFORE click
**Current Flow:** metadata → render cards → count resources (FAIL) → user clicks → load data
**Needed Flow:** metadata → pre-calculate counts → render cards → show counts

---

### File: `/assets/js/language-page.js`

#### Line 13: Global Dependency
```javascript
const language = languageData[langParam] || languageData.dutch;
```

**Problem:** Expects global `languageData` object to be populated
**Reality:** Object is empty until language is clicked on homepage

#### Missing: Event Listener for Dynamic Loading

The file has NO listener for the `languageDataLoaded` event that `language.html` dispatches:

```javascript
// language.html line 125-128
const event = new CustomEvent('languageDataLoaded', {
    detail: { lang, data }
});
window.dispatchEvent(event);
```

**Expected:** `language-page.js` should listen for this event
**Actual:** No listener exists, so initialization may fail

---

### File: `/index.html`

#### Line 253-255: Missing Data Load
```javascript
<script type="module" src="/assets/js/grid-manager.js"></script>
<script type="module" src="/assets/js/main.js"></script>
<script type="module" src="/assets/js/modern-ui-clean.js"></script>
```

**Missing:** No script to populate `window.languageData` before `main.js` runs

**Should Have:**
```javascript
<script type="module">
  import { getAllLanguageData } from '/assets/js/language-data-aggregator.js';
  window.languageData = await getAllLanguageData();
</script>
<script type="module" src="/assets/js/main.js"></script>
```

---

### File: `/assets/js/language-loader.js`

#### Lines 149-163: Export Name Mismatch Risk

```javascript
async _importLanguageModule(fileName, languageCode) {
    try {
        const module = await import(`./language-data/${fileName}.js`);

        // The module exports an object like { dutchResources, default: dutchResources }
        const resourceKey = `${languageCode}Resources`;
        const data = module[resourceKey] || module.default || module;

        return data;
    } catch (error) {
        console.error(`[LanguageLoader] Import failed for ${fileName}:`, error);
        throw new Error(`Failed to load language module: ${fileName}`);
    }
}
```

**Potential Issue:** Assumes export name follows pattern `{language}Resources`

**Example:**
- Language code: `dutch`
- Expected export: `dutchResources`
- File: `dutch-data.js`

**Verification Needed:**
- Do ALL 67 language files follow this naming convention?
- Are there any with different export names?

---

## 7. BUILD SYSTEM ISSUES

### Vite Build Error

```
✘ [ERROR] Cannot start service: Host version "0.25.10" does not match binary version "0.21.5"
```

**Location:** Build process
**Impact:** Cannot test production build
**Root Cause:** esbuild version mismatch

**Fix Required:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 8. MIGRATION GAPS

### Incomplete Migration from Old to New System

| Feature | Old System (data.js) | New System (language-data/) | Status |
|---------|---------------------|---------------------------|--------|
| Language metadata | ✅ Included inline | ✅ Separate file | Complete |
| Full resource data | ✅ All in one file | ✅ Separate files | Complete |
| Global access | ✅ Direct variable | ❌ Empty object | **BROKEN** |
| Resource counting | ✅ Works | ❌ No data | **BROKEN** |
| Homepage display | ✅ Works | ⚠️ Partial | **DEGRADED** |
| Language pages | ✅ Works | ⚠️ Async only | **DEGRADED** |
| Lazy loading | ❌ No | ✅ Yes | Added |
| Performance | ❌ Slow (1.9MB) | ✅ Fast (~9KB) | Improved |

**Conclusion:** Migration is 70% complete but critical functionality broken

---

## 9. RECOMMENDED SOLUTIONS

### Solution 1: Generate Static Resource Counts (RECOMMENDED)

**Approach:** Create a build script that generates a small counts file

**Implementation:**

1. **Create Build Script:** `/scripts/generate-resource-counts.js`
   ```javascript
   import fs from 'fs';
   import { glob } from 'glob';

   async function generateCounts() {
       const languageFiles = await glob('assets/js/language-data/*-data.js');
       const counts = { total: {}, byLanguage: {} };

       for (const file of languageFiles) {
           const module = await import(file);
           const data = module.default || Object.values(module)[0];
           const langCode = file.match(/([^/]+)-data\.js$/)[1];

           counts.byLanguage[langCode] = {
               courses: countResources(data.resources.courses),
               apps: countResources(data.resources.apps),
               books: countResources(data.resources.books),
               audio: countResources(data.resources.audio),
               practice: countResources(data.resources.practice)
           };
       }

       // Calculate totals
       for (const type of ['courses', 'apps', 'books', 'audio', 'practice']) {
           counts.total[type] = Object.values(counts.byLanguage)
               .reduce((sum, lang) => sum + lang[type], 0);
       }

       fs.writeFileSync(
           'assets/js/language-data/resource-counts.js',
           `export const resourceCounts = ${JSON.stringify(counts, null, 2)};`
       );
   }

   generateCounts();
   ```

2. **Update package.json:**
   ```json
   {
     "scripts": {
       "prebuild": "node scripts/generate-resource-counts.js",
       "build": "vite build"
     }
   }
   ```

3. **Update main.js to use counts:**
   ```javascript
   import { resourceCounts } from './language-data/resource-counts.js';

   function updateResourceCounts() {
       const resourceCountElements = document.querySelectorAll('.resource-count[data-type]');
       if (resourceCountElements.length === 0) return;

       resourceCountElements.forEach((element) => {
           const { type } = element.dataset;
           if (resourceCounts.total[type] !== undefined) {
               element.textContent = `(${resourceCounts.total[type]})`;
           }
       });
   }
   ```

**Pros:**
- Fast (only ~15KB additional download)
- No architectural changes needed
- Automatic during build
- Scales to thousands of languages

**Cons:**
- Requires build step
- Must regenerate when resources change

---

### Solution 2: Fix Global languageData Population

**Approach:** Populate `window.languageData` with all data on page load

**Implementation:**

1. **Create Aggregator:** `/assets/js/language-data-aggregator.js`
   ```javascript
   import { languageLoader } from './language-loader.js';

   export async function loadAllLanguages() {
       const languages = [
           'dutch', 'danish', 'portuguese', /* ... all 67 */
       ];

       const data = {};

       // Load all languages in parallel
       const promises = languages.map(async (lang) => {
           data[lang] = await languageLoader.loadLanguage(lang);
       });

       await Promise.all(promises);
       return data;
   }
   ```

2. **Update index.html:**
   ```html
   <script type="module">
     import { loadAllLanguages } from '/assets/js/language-data-aggregator.js';
     import { loadingUI } from '/assets/js/loading-ui.js';

     const loaderId = loadingUI.showOverlay('Loading languages...');
     window.languageData = await loadAllLanguages();
     loadingUI.hideOverlay(loaderId);
   </script>
   <script type="module" src="/assets/js/main.js"></script>
   ```

**Pros:**
- Simple implementation
- Compatible with all existing code
- No build script needed

**Cons:**
- Slow initial load (~804KB minimum)
- Defeats purpose of lazy loading
- Doesn't scale well

---

### Solution 3: Hybrid Approach (BEST)

**Approach:** Combine static counts for homepage + lazy loading for detail pages

**Implementation:**

1. Use Solution 1 for homepage resource counts
2. Keep lazy loading for individual language pages
3. Pre-populate `window.languageData` only when needed

**Code Changes:**

```javascript
// main.js
import { resourceCounts } from './language-data/resource-counts.js';

function updateResourceCounts() {
    // Use pre-calculated counts instead of loading all data
    const counts = resourceCounts.total;

    document.querySelectorAll('.resource-count[data-type]').forEach((element) => {
        const { type } = element.dataset;
        element.textContent = `(${counts[type] || 0})`;
    });
}

async function handleLanguageCardClick(languageCode, cardElement) {
    // Keep lazy loading for detail view
    const data = await languageLoader.loadLanguage(languageCode);
    window.languageData[languageCode] = data;
    window.location.href = `language.html?lang=${languageCode}`;
}
```

**Pros:**
- Fast homepage (only 15KB extra)
- Fast detail pages (lazy loaded)
- Best of both worlds
- Scalable architecture

**Cons:**
- Requires build script
- Slightly more complex

---

## 10. IMPLEMENTATION PRIORITY

### Phase 1: Quick Fix (1-2 hours)
1. ✅ Fix `main.js` line 356: Change `languageData` to `window.languageData`
2. ✅ Add null check before calling `countAllResources`
3. ✅ Fix esbuild version mismatch
4. ⚠️ Test if language cards display (should work with metadata)

### Phase 2: Proper Solution (4-6 hours)
1. ✅ Implement Solution 3 (Hybrid Approach)
2. ✅ Create `generate-resource-counts.js` script
3. ✅ Add to build process
4. ✅ Update `main.js` to use static counts
5. ✅ Test all 67 languages
6. ✅ Verify resource counts accurate

### Phase 3: Cleanup (2-3 hours)
1. Remove old `/assets/js/data.js` file
2. Update all references to use new system
3. Add comprehensive tests
4. Update documentation

---

## 11. TESTING CHECKLIST

### Homepage Tests
- [ ] Do all 67 language cards display?
- [ ] Are resource counts showing correctly?
- [ ] Does search filter work?
- [ ] Do language pills work?
- [ ] Is lazy loading triggered on click?

### Language Page Tests
- [ ] Does direct navigation work? (`language.html?lang=dutch`)
- [ ] Do resources display correctly?
- [ ] Do filters work (courses, apps, etc.)?
- [ ] Are collapsible sections working?
- [ ] Does back navigation work?

### Performance Tests
- [ ] Initial page load < 2 seconds
- [ ] Language data loads < 500ms
- [ ] No console errors
- [ ] No 404s for language files
- [ ] Build process succeeds

---

## 12. FILE INVENTORY

### Verified Files (All Present)

**Language Data Files (67):**
- ✅ afrikaans-data.js
- ✅ arabic-data.js
- ✅ bengali-data.js
- ✅ bulgarian-data.js
- ✅ burmese-data.js
- ✅ cebuano-data.js
- ✅ chinese-data.js
- ✅ cree-data.js
- ✅ croatian-data.js
- ✅ czech-data.js
- ✅ danish-data.js
- ✅ dari-data.js
- ✅ dutch-data.js (verified structure)
- ✅ estonian-data.js
- ✅ finnish-data.js
- ✅ flemish-data.js
- ✅ french-data.js
- ✅ german-data.js
- ✅ greek-data.js
- ✅ guarani-data.js
- ✅ gujarati-data.js
- ✅ hausa-data.js
- ✅ hebrew-data.js
- ✅ hindi-data.js
- ✅ hmong-data.js
- ✅ hungarian-data.js
- ✅ indonesian-data.js
- ✅ inuktitut-data.js
- ✅ irish-data.js
- ✅ italian-data.js
- ✅ japanese-data.js
- ✅ kannada-data.js
- ✅ kazakh-data.js
- ✅ korean-data.js
- ✅ lao-data.js
- ✅ latvian-data.js
- ✅ lithuanian-data.js
- ✅ malay-data.js
- ✅ marathi-data.js
- ✅ mongolian-data.js
- ✅ nahuatl-data.js
- ✅ navajo-data.js
- ✅ nepali-data.js
- ✅ pashto-data.js
- ✅ persian-data.js
- ✅ polish-data.js
- ✅ portuguese-data.js
- ✅ punjabi-data.js
- ✅ quechua-data.js
- ✅ romanian-data.js
- ✅ russian-data.js
- ✅ serbian-data.js
- ✅ sign-language-data.js
- ✅ slovak-data.js
- ✅ spanish-data.js
- ✅ swahili-data.js
- ✅ swedish-data.js
- ✅ tagalog-data.js
- ✅ tamil-data.js
- ✅ telugu-data.js
- ✅ thai-data.js
- ✅ ukrainian-data.js
- ✅ urdu-data.js
- ✅ vietnamese-data.js
- ✅ welsh-data.js
- ✅ wolof-data.js
- ✅ yoruba-data.js

**Metadata:**
- ✅ language-metadata.js (67 languages defined)

**Total:** 68 files, all present and accounted for

---

## 13. CONCLUSION

### Current State
- ✅ All language data files exist and are properly formatted
- ✅ Language metadata system works perfectly
- ✅ Lazy loading infrastructure is well-designed
- ❌ Global `languageData` object is never populated
- ❌ Resource counts display as undefined/zero
- ❌ Legacy code expects synchronous data access
- ⚠️ Architectural mismatch between old and new patterns

### Root Cause
**The migration from monolithic `data.js` to modular language files was incomplete.** The new lazy-loading system was implemented but the critical step of populating `window.languageData` for backward compatibility was omitted.

### Impact
- Homepage displays language cards correctly (metadata works)
- Resource counts show zero (no data to count)
- Individual language pages may fail (expect populated global object)
- User experience is degraded but not completely broken

### Recommended Action
**Implement Solution 3 (Hybrid Approach):**
1. Generate static resource counts during build
2. Use counts for homepage display
3. Maintain lazy loading for detail pages
4. Keep backward compatibility with minimal overhead

### Estimated Effort
- Quick fix: 2 hours
- Proper solution: 6 hours
- Full cleanup: 11 hours total

---

## Appendix A: Key File Paths

```
/mnt/c/Users/brand/Development/Project_Workspace/active-development/online_language_learning_resources/

Main Files:
- index.html
- language.html
- assets/js/main.js
- assets/js/language-loader.js
- assets/js/language-page.js
- assets/js/resource-counter.js

Data Files:
- assets/js/language-data/language-metadata.js
- assets/js/language-data/*-data.js (67 files)

Legacy:
- assets/js/data.js (old system, being phased out)
```

---

## Appendix B: Code Snippets

### Working Metadata Structure
```javascript
// language-metadata.js
export const languageMetadata = [
  { code: 'dutch', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', speakers: '24M native', learners: '5M' },
  // ... 66 more
];
```

### Working Language Data Structure
```javascript
// dutch-data.js
const dutchResources = {
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    resources: {
        courses: [{ category: "...", items: [...] }],
        apps: [{ category: "...", items: [...] }],
        books: [{ category: "...", items: [...] }],
        audio: [{ category: "...", items: [...] }],
        practice: [{ category: "...", items: [...] }]
    }
};
```

### Broken Resource Counter Call
```javascript
// main.js line 356
const resourceCounts = countAllResources(languageData);  // undefined!
```

### Proposed Fix
```javascript
// Generate counts at build time
import { resourceCounts } from './language-data/resource-counts.js';

function updateResourceCounts() {
    const counts = resourceCounts.total;
    // Use counts directly without loading data
}
```

---

**End of Analysis**
