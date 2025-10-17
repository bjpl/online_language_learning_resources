# Stabilization Runbook - Language Learning Hub
**Created**: 2025-10-16
**Status**: Ready for Execution
**Estimated Effort**: 40-50 hours over 4 weeks

---

## Purpose

This runbook provides step-by-step instructions for executing the stabilization plan identified in the Technical Analysis Incident Report (2025-10-16). Follow these procedures to complete the incomplete Phase 1 consolidation from September 2024 and address current technical debt.

---

## Prerequisites

### Required Tools
```bash
# Verify installations
node --version  # v20.19+ required
npm --version   # v10+
git --version   # v2.30+

# Install dependencies
npm install

# Run tests to ensure baseline
npm test
```

### Required Knowledge
- CSS cascade and specificity
- Git workflows (branches, commits, rollback)
- JavaScript ES6 modules
- Vite build system basics

### Backup Strategy
```bash
# Create safety branch (DO FIRST)
git checkout -b pre-stabilization-backup-$(date +%Y%m%d)
git push origin pre-stabilization-backup-$(date +%Y%m%d)

# Create working branch
git checkout main
git checkout -b tech-debt-stabilization
```

---

## P0 - Critical Fixes (Day 1)

### P0.1 - Restore Portuguese Apps (10 minutes)

**Objective**: Fix empty Portuguese apps array

**Steps**:

1. **Compare files**:
   ```bash
   diff assets/js/portuguese-data-backup.js assets/js/language-data/portuguese-data.js
   ```

2. **Review backup content**:
   ```bash
   grep -A 20 "apps:" assets/js/portuguese-data-backup.js
   ```

3. **Restore apps array**:
   ```javascript
   // Edit: assets/js/language-data/portuguese-data.js

   // BEFORE:
   apps: []

   // AFTER (copy from backup):
   apps: [
     {
       category: "Language Learning Platforms",
       items: [
         // ... copy all items from backup
       ]
     },
     // ... other categories
   ]
   ```

4. **Verify structure**:
   ```bash
   node -e "
   const data = require('./assets/js/language-data/portuguese-data.js');
   console.log('Portuguese apps count:', data.portugueseResources.apps.length);
   "
   ```

5. **Test in browser**:
   - Open `language.html?lang=portuguese`
   - Verify apps display correctly
   - Check resource count updates

6. **Commit**:
   ```bash
   git add assets/js/language-data/portuguese-data.js
   git commit -m "fix: Restore Portuguese language apps from backup

   - Copied apps array from portuguese-data-backup.js
   - Portuguese now has X apps (was 0)
   - Verified structure and display

   Closes #<issue-number>"
   ```

**Validation**:
- [ ] Portuguese apps count > 0
- [ ] Apps display on language page
- [ ] No console errors
- [ ] Resource count updated

---

### P0.2 - Remove Redundant Aggregation Files (5 minutes)

**Objective**: Delete `data.js` and `data-simple.js` (not needed with lazy loading)

**Steps**:

1. **Search for dependencies**:
   ```bash
   # Check if any files import these
   grep -r "data\.js\|data-simple\.js" assets/js/*.js
   grep -r "data\.js\|data-simple\.js" *.html

   # Expected: No results (if results found, do NOT proceed)
   ```

2. **Verify lazy loading is active**:
   ```bash
   # Check that language-loader.js is imported
   grep -r "language-loader\.js" *.html

   # Expected: Found in index.html, language.html
   ```

3. **Archive files (don't delete immediately)**:
   ```bash
   mkdir -p archive/deprecated-$(date +%Y%m%d)
   mv assets/js/data.js archive/deprecated-$(date +%Y%m%d)/
   mv assets/js/data-simple.js archive/deprecated-$(date +%Y%m%d)/
   ```

4. **Test all pages**:
   ```bash
   # Start dev server
   npm run dev

   # Test pages (manual browser testing):
   # - http://localhost:5173/
   # - http://localhost:5173/language.html?lang=dutch
   # - http://localhost:5173/language.html?lang=japanese
   # - http://localhost:5173/resources.html
   ```

5. **Verify no errors**:
   - Open browser console
   - Navigate to all pages
   - Check for 404 errors or import failures
   - Expected: No errors

6. **Commit**:
   ```bash
   git add archive/
   git add -u  # Stage deletions
   git commit -m "refactor: Remove redundant data aggregation files

   - Moved data.js and data-simple.js to archive/
   - Not needed with lazy loading architecture
   - Verified no imports reference these files
   - All pages tested successfully

   Part of tech debt cleanup (P0)"
   ```

**Validation**:
- [ ] No grep results for file imports
- [ ] All pages load without errors
- [ ] Language data still loads correctly
- [ ] Files archived (not deleted from git history)

---

## P1 - High Priority (Week 1)

### P1.1 - CSS Consolidation (4-6 hours)

**Objective**: Reduce CSS files from 10 to 4

**Target Structure**:
```
assets/css/
├── base.css          (variables + reset + typography)
├── components.css    (all reusable components)
├── pages.css         (page-specific overrides)
└── mobile.css        (mobile optimizations)
```

**Steps**:

1. **Audit current CSS imports** (30 minutes):
   ```bash
   # Check what each HTML file imports
   for file in *.html; do
     echo "=== $file ==="
     grep -A 5 "stylesheet" "$file"
   done
   ```

2. **Create base.css** (1 hour):
   ```bash
   # Create new file
   touch assets/css/base.css
   ```

   ```css
   /* base.css - Foundation styles */

   /* 1. CSS Variables (from main.css) */
   @import url('variables.css');  /* If separate */

   /* 2. Reset/Normalize (from main.css) */
   *, *::before, *::after {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }

   /* 3. Typography (from main.css) */
   body {
     font-family: var(--font-primary);
     font-size: var(--fs-body);
     line-height: 1.6;
     color: var(--color-text);
   }

   /* ... rest of base styles */
   ```

3. **Consolidate modern-ui files** (1 hour):
   ```bash
   # Decision: Keep modern-ui-clean.css (more recent)

   # Merge unique styles from modern-ui.css into modern-ui-clean.css
   diff assets/css/modern-ui.css assets/css/modern-ui-clean.css > modern-ui-diff.txt

   # Manually review diff, copy unique styles
   # Edit: assets/css/modern-ui-clean.css
   ```

   After merge:
   ```bash
   # Archive old file
   mv assets/css/modern-ui.css archive/deprecated-$(date +%Y%m%d)/

   # Rename canonical version
   mv assets/css/modern-ui-clean.css assets/css/ui-enhancements.css
   ```

4. **Consolidate filter files** (1 hour):
   ```bash
   # Decision: Keep language-filters.css (more complete)

   # Check scalable version for unique features
   diff assets/css/language-filters.css assets/css/language-filters-scalable.css

   # Merge unique scalable features into main filters file
   # Edit: assets/css/language-filters.css

   # Archive scalable version
   mv assets/css/language-filters-scalable.css archive/deprecated-$(date +%Y%m%d)/
   ```

5. **Merge filters into components.css** (30 minutes):
   ```bash
   # Append language-filters.css to components.css
   cat assets/css/language-filters.css >> assets/css/components.css

   # Archive original
   mv assets/css/language-filters.css archive/deprecated-$(date +%Y%m%d)/
   ```

6. **Delete empty files** (5 minutes):
   ```bash
   # language.css is 0 lines
   git rm assets/css/language.css
   ```

7. **Update HTML imports** (1 hour):
   ```html
   <!-- BEFORE (index.html): -->
   <link rel="stylesheet" href="assets/css/main.css">
   <link rel="stylesheet" href="assets/css/components.css">
   <link rel="stylesheet" href="assets/css/modern-ui-clean.css">
   <link rel="stylesheet" href="assets/css/mobile-optimizations.css">

   <!-- AFTER (index.html): -->
   <link rel="stylesheet" href="assets/css/base.css">
   <link rel="stylesheet" href="assets/css/components.css">
   <link rel="stylesheet" href="assets/css/ui-enhancements.css">
   <link rel="stylesheet" href="assets/css/mobile.css">
   ```

   Update all HTML files:
   - `index.html`
   - `language.html`
   - `resources.html`
   - `about.html`

8. **Visual regression testing** (1-2 hours):
   ```bash
   # Start dev server
   npm run dev

   # Test checklist (manual browser testing):
   ```

   **Test Matrix**:
   | Page | Desktop | Mobile | Tablet | Notes |
   |------|---------|--------|--------|-------|
   | index.html | [ ] | [ ] | [ ] | Check hero, grid, cards |
   | language.html?lang=dutch | [ ] | [ ] | [ ] | Check resources display |
   | resources.html | [ ] | [ ] | [ ] | Check filters, sorting |
   | about.html | [ ] | [ ] | [ ] | Check content layout |

   **Browser Matrix**:
   - [ ] Chrome (desktop)
   - [ ] Firefox (desktop)
   - [ ] Safari (if available)
   - [ ] Chrome Mobile (DevTools)
   - [ ] Safari Mobile (DevTools)

9. **Commit**:
   ```bash
   git add assets/css/
   git add *.html
   git commit -m "refactor: Consolidate CSS from 10 files to 4

   Changes:
   - Created base.css (variables, reset, typography)
   - Merged modern-ui.css into modern-ui-clean.css
   - Merged language-filters-scalable.css into language-filters.css
   - Merged filters into components.css
   - Renamed modern-ui-clean.css to ui-enhancements.css
   - Renamed mobile-optimizations.css to mobile.css
   - Deleted empty language.css
   - Updated all HTML imports

   Testing:
   - All 4 pages tested on desktop/mobile/tablet
   - No visual regressions detected
   - All components render correctly

   Result: 10 files → 4 files (60% reduction)

   Part of tech debt cleanup (P1)"
   ```

**Validation**:
- [ ] Only 4 CSS files remain in assets/css/
- [ ] All pages render correctly
- [ ] No broken styles
- [ ] Mobile responsiveness maintained
- [ ] Design system tokens still work

---

### P1.2 - Eliminate Remaining !important (2 hours)

**Objective**: Reduce !important declarations from 9 to 0

**Steps**:

1. **Find all !important** (10 minutes):
   ```bash
   # Search and document
   grep -rn "!important" assets/css/*.css > important-declarations.txt
   cat important-declarations.txt
   ```

2. **For each !important, apply fix strategy** (1.5 hours):

   **Strategy A: Increase Specificity**
   ```css
   /* BEFORE */
   .lang-filter.active {
     background: #5B4E8C !important;
   }

   /* AFTER */
   .filter-section .language-filters .lang-filter.active {
     background: var(--filter-active-bg);
   }
   ```

   **Strategy B: Use :where() for Low Specificity**
   ```css
   /* BEFORE */
   .button {
     padding: 1rem !important;
   }

   /* AFTER */
   :where(.button) {
     padding: var(--space-md);
   }
   /* This has (0,0,0) specificity, so other rules can override */
   ```

   **Strategy C: Reorder CSS (Last Rule Wins)**
   ```css
   /* BEFORE */
   .card { color: blue; }
   .card.active { color: red !important; }

   /* AFTER (reorder if possible) */
   .card { color: blue; }
   .card.active { color: red; }
   /* Ensure .card.active comes after .card in cascade */
   ```

3. **Test each fix** (20 minutes):
   ```bash
   # After each fix, reload browser and test
   # Check that active states still work correctly
   ```

4. **Verify zero !important** (10 minutes):
   ```bash
   # Should return nothing
   grep -r "!important" assets/css/*.css

   # Expected: No results
   ```

5. **Commit**:
   ```bash
   git add assets/css/
   git commit -m "refactor: Eliminate all !important declarations

   Changes:
   - Fixed specificity for 9 remaining !important rules
   - Used :where() for low-specificity base styles
   - Increased selector specificity where needed
   - Reordered CSS rules for proper cascade

   Testing:
   - All active states work correctly
   - Filter buttons highlight properly
   - No visual regressions

   Result: 9 !important → 0 !important (100% reduction)
   Total reduction from Sept 2024: 69 → 0 (100%)

   Part of tech debt cleanup (P1)"
   ```

**Validation**:
- [ ] grep returns 0 results
- [ ] All interactive states work (hover, active, focus)
- [ ] Filter buttons highlight correctly
- [ ] Mobile touch states work

---

### P1.3 - Pre-Commit Validation (3 hours)

**Objective**: Prevent data quality issues like empty Portuguese apps

**Steps**:

1. **Create validation script** (1.5 hours):
   ```bash
   # Create script
   touch scripts/validate-language-data.js
   chmod +x scripts/validate-language-data.js
   ```

   ```javascript
   #!/usr/bin/env node
   // scripts/validate-language-data.js

   import { readdirSync, readFileSync } from 'fs';
   import { join, dirname } from 'path';
   import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);

   const LANGUAGE_DATA_DIR = join(__dirname, '../assets/js/language-data');

   let errors = [];
   let warnings = [];

   // Get all language data files
   const files = readdirSync(LANGUAGE_DATA_DIR)
     .filter(f => f.endsWith('-data.js') && f !== 'language-metadata.js');

   console.log(`\n🔍 Validating ${files.length} language data files...\n`);

   files.forEach(file => {
     const filePath = join(LANGUAGE_DATA_DIR, file);
     const content = readFileSync(filePath, 'utf-8');

     // Extract language name from filename
     const langName = file.replace('-data.js', '');

     // CHECK 1: Empty apps array
     if (content.includes('apps: []')) {
       errors.push(`${file}: Empty apps array detected`);
     }

     // CHECK 2: Empty resources arrays
     const emptyResources = ['courses: []', 'books: []', 'audio: []', 'practice: []'];
     emptyResources.forEach(pattern => {
       if (content.includes(pattern)) {
         warnings.push(`${file}: ${pattern} - Consider adding resources`);
       }
     });

     // CHECK 3: Undefined app names
     if (content.includes('name: undefined') || content.includes('name:undefined')) {
       errors.push(`${file}: Undefined app name detected`);
     }

     // CHECK 4: Missing export
     const expectedExport = `export { ${langName}Resources }`;
     if (!content.includes(expectedExport) && !content.includes(`export default`)) {
       errors.push(`${file}: Missing export statement`);
     }

     // CHECK 5: Valid structure (basic check)
     if (!content.includes('resources:') && !content.includes('apps:')) {
       errors.push(`${file}: Missing resources or apps property`);
     }
   });

   // Report results
   console.log(`✅ Checked ${files.length} files\n`);

   if (warnings.length > 0) {
     console.log(`⚠️  ${warnings.length} warnings:\n`);
     warnings.forEach(w => console.log(`   ${w}`));
     console.log();
   }

   if (errors.length > 0) {
     console.log(`❌ ${errors.length} errors:\n`);
     errors.forEach(e => console.log(`   ${e}`));
     console.log();
     process.exit(1);
   }

   console.log('✅ All validations passed!\n');
   process.exit(0);
   ```

2. **Add to package.json** (10 minutes):
   ```json
   {
     "scripts": {
       "validate": "node scripts/validate-language-data.js",
       "test": "npm run validate && vitest",
       "precommit": "npm run validate && npm test"
     }
   }
   ```

3. **Install Husky for git hooks** (30 minutes):
   ```bash
   # Install Husky
   npm install --save-dev husky

   # Initialize Husky
   npx husky install

   # Create pre-commit hook
   npx husky add .husky/pre-commit "npm run precommit"
   ```

4. **Test validation** (1 hour):
   ```bash
   # Test with current code (should pass)
   npm run validate

   # Test error detection (create temporary error)
   echo "apps: []" >> assets/js/language-data/dutch-data.js
   npm run validate  # Should fail

   # Revert test change
   git checkout assets/js/language-data/dutch-data.js

   # Test pre-commit hook
   git add .
   git commit -m "test: Verify pre-commit hook works"
   # Should run validation automatically
   ```

5. **Document in README** (10 minutes):
   ```markdown
   ## Development Workflow

   ### Pre-Commit Validation

   Automatic validation runs before every commit:
   - Language data structure validation
   - No empty resource arrays
   - No undefined references
   - All required exports present

   To run manually:
   \`\`\`bash
   npm run validate
   \`\`\`
   ```

6. **Commit**:
   ```bash
   git add scripts/validate-language-data.js
   git add package.json
   git add .husky/
   git add README.md
   git commit -m "feat: Add pre-commit validation for language data

   Changes:
   - Created validate-language-data.js script
   - Checks for empty arrays, undefined values, valid structure
   - Installed Husky for git hooks
   - Added pre-commit hook to run validation
   - Updated package.json scripts
   - Documented in README.md

   Prevents:
   - Empty apps/resources arrays (like Portuguese issue)
   - Undefined app names
   - Missing exports
   - Invalid data structure

   Part of tech debt cleanup (P1)"
   ```

**Validation**:
- [ ] `npm run validate` passes
- [ ] Pre-commit hook triggers on commit
- [ ] Validation catches empty arrays
- [ ] Validation catches undefined values
- [ ] Documentation updated

---

## P2 - Medium Priority (Week 2-3)

### P2.1 - CI/CD Resource Counting (4 hours)

**Objective**: Automate resource counting and report generation

**Steps**:

1. **Create GitHub Action** (2 hours):
   ```yaml
   # .github/workflows/update-resource-counts.yml
   name: Update Resource Counts

   on:
     push:
       branches: [main]
       paths:
         - 'assets/js/language-data/**'
     workflow_dispatch:

   jobs:
     update-counts:
       runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '20'

         - name: Install dependencies
           run: npm ci

         - name: Generate resource counts
           run: node scripts/generate-resource-counts.js

         - name: Update language status report
           run: node scripts/update-language-status.js

         - name: Commit updated counts
           run: |
             git config user.name "github-actions[bot]"
             git config user.email "github-actions[bot]@users.noreply.github.com"
             git add assets/data/resource-counts.json
             git add LANGUAGE_STATUS_REPORT.md
             git diff --quiet && git diff --staged --quiet || git commit -m "chore: Update resource counts [skip ci]"
             git push
   ```

2. **Create count generation script** (1 hour):
   ```javascript
   // scripts/generate-resource-counts.js
   import { writeFileSync } from 'fs';
   import { languageLoader } from '../assets/js/language-loader.js';
   import { countLanguageResources, countAllResources } from '../assets/js/resource-counter.js';

   async function generateCounts() {
     const counts = {
       totalCounts: {
         courses: 0,
         apps: 0,
         books: 0,
         audio: 0,
         practice: 0
       },
       languageCounts: {},
       languageCount: 0,
       generatedAt: new Date().toISOString()
     };

     // Load all languages
     const languages = Object.keys(languageLoader.languageMap);

     for (const langCode of languages) {
       const data = await languageLoader.loadLanguage(langCode);
       const langCounts = countLanguageResources(data);

       counts.languageCounts[langCode] = langCounts;

       // Add to totals
       counts.totalCounts.courses += langCounts.courses;
       counts.totalCounts.apps += langCounts.apps;
       counts.totalCounts.books += langCounts.books;
       counts.totalCounts.audio += langCounts.audio;
       counts.totalCounts.practice += langCounts.practice;
     }

     counts.languageCount = languages.length;

     // Write to file
     writeFileSync(
       'assets/data/resource-counts.json',
       JSON.stringify(counts, null, 2)
     );

     console.log('✅ Resource counts generated:', counts.totalCounts);
   }

   generateCounts().catch(console.error);
   ```

3. **Test workflow locally** (30 minutes):
   ```bash
   # Install act (GitHub Actions local runner)
   brew install act  # macOS
   # or: https://github.com/nektos/act#installation

   # Test workflow
   act push
   ```

4. **Commit**:
   ```bash
   git add .github/workflows/update-resource-counts.yml
   git add scripts/generate-resource-counts.js
   git commit -m "feat: Add CI/CD for automated resource counting

   Changes:
   - Created GitHub Action to run on data changes
   - Auto-generates resource-counts.json
   - Auto-updates LANGUAGE_STATUS_REPORT.md
   - Runs on push to main or manual trigger

   Benefits:
   - Always accurate resource counts
   - No manual counting needed
   - Prevents stale documentation

   Part of tech debt cleanup (P2)"
   ```

**Validation**:
- [ ] Workflow runs successfully
- [ ] resource-counts.json updates correctly
- [ ] LANGUAGE_STATUS_REPORT.md updates
- [ ] No manual intervention needed

---

## Rollback Procedures

### If CSS Consolidation Breaks Styles

```bash
# Identify the problematic commit
git log --oneline --grep="CSS"

# Rollback specific file
git checkout <commit-hash>^ -- assets/css/components.css

# Or rollback entire commit
git revert <commit-hash>

# Test
npm run dev
```

### If Portuguese Apps Restore Fails

```bash
# Rollback to original state
git checkout HEAD^ -- assets/js/language-data/portuguese-data.js

# Re-attempt with different approach
```

### If Pre-Commit Hook Blocks Valid Commits

```bash
# Temporarily bypass (use sparingly)
git commit --no-verify -m "Your message"

# Or fix validation script
nano scripts/validate-language-data.js
```

### Full Rollback to Pre-Stabilization

```bash
# Reset to backup branch
git checkout main
git reset --hard pre-stabilization-backup-<date>
git push --force origin main  # DANGEROUS: Coordinate with team first
```

---

## Success Criteria Checklist

### Week 1 (P0 + P1)
- [ ] Portuguese apps restored (> 0 apps)
- [ ] Aggregation files removed
- [ ] CSS files reduced to 4
- [ ] !important declarations = 0
- [ ] Pre-commit validation working

### Week 2 (P1 Automation)
- [ ] CI/CD pipeline running
- [ ] Resource counts auto-generated
- [ ] Reports auto-updated
- [ ] No manual counting needed

### Week 3-4 (P2 Polish)
- [ ] All documentation updated
- [ ] Old scripts archived
- [ ] Runbook validated
- [ ] Team trained on new workflow

### Final Validation
- [ ] All 67 languages functional
- [ ] All apps accessible
- [ ] No console errors
- [ ] Mobile experience smooth
- [ ] Test coverage > 85%
- [ ] Build time < 2 seconds
- [ ] Bundle size < 20KB

---

## Support & Escalation

### If You Get Stuck

1. **Check incident report**: `/docs/ad_hoc_reports/TECHNICAL_ANALYSIS_INCIDENT_REPORT_20251016.md`
2. **Review git history**: `git log --grep="tech debt"`
3. **Check swarm memory**: `npx claude-flow@alpha memory retrieve swarm/analyst/findings`
4. **Rollback if needed**: Use procedures above

### Contact Points

- **Technical Lead**: [Name]
- **DevOps**: [Name]
- **QA**: [Name]

---

**Prepared By**: Technical Analysis Agent
**Date**: 2025-10-16
**Version**: 1.0
**Status**: Ready for Execution
