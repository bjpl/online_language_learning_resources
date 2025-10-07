# Development Workflow Guide

**Project**: Language Learning Hub
**Last Updated**: 2025-10-07
**Audience**: Developers, AI Agents

---

## Quick Start

### First-Time Setup
```bash
# Clone repository
git clone https://github.com/bjpl/online_language_learning_resources.git
cd online_language_learning_resources

# Install dependencies
npm install

# Start development server
npm run dev
# Opens http://localhost:3000 with hot reload
```

### Daily Development
```bash
# Pull latest changes
git pull origin main

# Start dev server
npm run dev

# Make changes...
# (auto-reload on file save)

# Before committing:
npm run lint:fix    # Fix linting issues
npm run format      # Format code

# Test build
npm run build
npm run preview     # Test production build

# Commit and push
git add .
git commit -m "feat: Your change description"
git push origin main
```

---

## Development Environment

### Required Software
| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 20.19+ or 22.12+ | JavaScript runtime |
| **npm** | 10.x | Package manager |
| **Git** | 2.x | Version control |
| **VS Code** | Latest | Recommended editor |

### Optional Tools
- **Chrome DevTools**: Performance profiling, debugging
- **Firefox DevTools**: Cross-browser testing
- **GitHub CLI** (`gh`): GitHub operations from terminal
- **HTTPie** or `curl`: API testing (future)

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-js-debug",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### Editor Configuration
`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "html"],
  "files.eol": "\n"
}
```

---

## npm Scripts Reference

### Development Commands
| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Start development server | Port 3000, HMR enabled |
| `npm run build` | Build for production | Output: `dist/` |
| `npm run preview` | Preview production build | Port 4173 |

### Code Quality Commands
| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run lint` | Check code quality | ESLint check only |
| `npm run lint:fix` | Auto-fix linting issues | Modifies files |
| `npm run format` | Format all files | Prettier format |
| `npm run format:check` | Check formatting | No file modifications |

### Future Commands (Planned)
| Command | Purpose | Status |
|---------|---------|--------|
| `npm test` | Run unit tests | 🔜 Planned |
| `npm run test:watch` | Test watch mode | 🔜 Planned |
| `npm run test:coverage` | Coverage report | 🔜 Planned |
| `npm run e2e` | E2E tests | 🔜 Planned |

---

## Development Workflow

### Feature Development Process

```
1. Plan
   ├── Review requirements
   ├── Check existing code
   └── Design approach

2. Implement
   ├── npm run dev (start server)
   ├── Write code with hot reload
   ├── Test in browser
   └── Iterate until working

3. Quality Check
   ├── npm run lint:fix
   ├── npm run format
   ├── Visual testing (cross-browser)
   └── Performance check (DevTools)

4. Build Verification
   ├── npm run build
   ├── npm run preview
   └── Verify no build errors

5. Commit
   ├── git add .
   ├── git commit -m "type: description"
   └── git push origin main

6. Deploy (Automatic)
   └── GitHub Pages auto-deploys from main
```

### Branching Strategy (Future)

**Current**: Direct commits to `main` (solo development)

**Recommended (Team)**:
```
main (production)
  ├── develop (integration)
  │   ├── feature/lazy-loading
  │   ├── feature/search
  │   └── fix/undefined-resources
  └── hotfix/critical-bug
```

---

## Code Style Guidelines (MANDATORY-10 Implementation)

### JavaScript Style

**Module Pattern**:
```javascript
// ✅ Good: Module pattern for encapsulation
const MyModule = (function() {
  'use strict';

  // Private state
  const privateData = new Map();

  // Public API
  return {
    publicMethod() {
      // Implementation
    }
  };
})();

// ❌ Avoid: Global variables
var globalThing = 'bad';
```

**ES6 Modules**:
```javascript
// ✅ Good: ES6 import/export
import { languageLoader } from './language-loader.js';
export { MyClass };
export default MyClass;

// ❌ Avoid: Require/module.exports (not supported)
const loader = require('./language-loader');
```

**Async/Await**:
```javascript
// ✅ Good: Async/await for clarity
async function loadLanguage(code) {
  try {
    const data = await languageLoader.loadLanguage(code);
    renderContent(data);
  } catch (error) {
    handleError(error);
  }
}

// ❌ Avoid: Callback hell
loadLanguage(code, function(data) {
  renderContent(data, function() {
    // ...nested callbacks
  });
});
```

**Error Handling**:
```javascript
// ✅ Good: Try-catch with context
try {
  const result = await riskyOperation();
} catch (error) {
  console.error('Operation failed:', { error, context });
  showUserFriendlyError('Something went wrong. Please try again.');
}

// ❌ Avoid: Silent failures
try {
  await riskyOperation();
} catch (error) {
  // Nothing
}
```

### CSS Style

**Custom Properties**:
```css
/* ✅ Good: CSS custom properties for theming */
:root {
  --color-primary: #5B4E8C;
  --space-md: 1.5rem;
}

.button {
  background: var(--color-primary);
  padding: var(--space-md);
}

/* ❌ Avoid: Hardcoded values everywhere */
.button {
  background: #5B4E8C;
  padding: 24px;
}
```

**BEM Naming** (Recommended but not enforced):
```css
/* ✅ Good: BEM structure */
.language-card { }
.language-card__title { }
.language-card__title--highlighted { }

/* ⚠️ Acceptable: Semantic naming */
.card { }
.card-title { }
```

### HTML Style

**Semantic HTML**:
```html
<!-- ✅ Good: Semantic elements -->
<article class="resource-card">
  <header>
    <h3>Resource Title</h3>
  </header>
  <p>Description...</p>
  <footer>
    <a href="...">Learn More</a>
  </footer>
</article>

<!-- ❌ Avoid: Div soup -->
<div class="card">
  <div class="title">Resource Title</div>
  <div class="description">Description...</div>
  <div class="link">
    <a href="...">Learn More</a>
  </div>
</div>
```

**Accessibility**:
```html
<!-- ✅ Good: ARIA labels, semantic structure -->
<button aria-label="Close dialog" class="close-btn">
  <span aria-hidden="true">×</span>
</button>

<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="#languages">Languages</a></li>
  </ul>
</nav>

<!-- ❌ Avoid: Missing labels, unclear structure -->
<div onclick="close()">×</div>
```

---

## File Organization Standards

### Directory Structure Rules

**Production Files** (Root directory):
```
✅ index.html, language.html, resources.html, about.html
✅ CLAUDE.md, CLAUDE-PROJECT.md, README.md
✅ package.json, vite.config.js, eslint.config.js
✅ .gitignore, .prettierrc.json

❌ test-*.html (→ move to /tests)
❌ debug-*.html (→ move to /tests)
❌ *_report.json (→ move to /docs/development-notes)
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **JavaScript** | kebab-case | `language-loader.js` |
| **CSS** | kebab-case | `modern-ui-clean.css` |
| **HTML** | kebab-case | `language.html` |
| **Modules** | kebab-case | `loading-ui.js` |
| **Data Files** | language-data | `dutch-data.js` |
| **Config Files** | dot-prefix | `.prettierrc.json` |
| **Documentation** | UPPERCASE.md | `ARCHITECTURE.md` |
| **Scripts** | kebab-case.js | `generate-daily-reports.js` |

### Import Path Conventions
```javascript
// ✅ Relative paths with .js extension
import { loader } from './language-loader.js';
import { UI } from '../loading-ui.js';

// ❌ Missing .js extension (won't work in browser)
import { loader } from './language-loader';
```

---

## Testing Guidelines (MANDATORY-8 Implementation)

### Current Testing Approach

**Manual Testing Checklist**:
- [ ] Visual appearance (all pages)
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive (DevTools device mode)
- [ ] All links work
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse)
- [ ] Build completes without errors

### Browser Testing Matrix

| Browser | Version | Priority |
|---------|---------|----------|
| **Chrome** | Latest | High |
| **Firefox** | Latest | High |
| **Safari** | Latest (macOS/iOS) | High |
| **Edge** | Latest | Medium |
| **Mobile Safari** | iOS 14+ | High |
| **Chrome Mobile** | Latest | Medium |

### Performance Testing

**Lighthouse Checklist**:
```bash
# Run Lighthouse in Chrome DevTools
# Target Scores:
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 90+
```

**Performance Budget**:
- Initial JS: <20KB gzipped
- Initial CSS: <15KB gzipped
- Total Initial: <50KB gzipped
- Time to Interactive: <2s on 3G

### Future: Automated Testing

**Unit Tests** (Planned):
```javascript
// Example: language-loader.test.js
import { LanguageLoader } from './language-loader.js';

describe('LanguageLoader', () => {
  test('caches loaded languages', async () => {
    const loader = new LanguageLoader();
    await loader.loadLanguage('dutch');
    expect(loader.isLoaded('dutch')).toBe(true);
  });

  test('reuses cached data', async () => {
    const loader = new LanguageLoader();
    const data1 = await loader.loadLanguage('dutch');
    const data2 = await loader.loadLanguage('dutch');
    expect(data1).toBe(data2); // Same reference
  });
});
```

---

## Debugging Tools & Techniques

### Browser DevTools

**Performance Profiling**:
```
1. Open DevTools → Performance tab
2. Click Record
3. Interact with site (load language, filter, etc.)
4. Stop recording
5. Analyze: Look for long tasks, layout shifts
```

**Network Analysis**:
```
1. DevTools → Network tab
2. Reload page
3. Check:
   - Total requests (should be minimal)
   - Waterfall (parallel vs sequential)
   - File sizes (compression working?)
   - Cache headers (304 responses)
```

**Console Debugging**:
```javascript
// Use console methods strategically
console.group('Language Loading');
console.log('Loading:', languageCode);
console.time('load-time');
await loader.loadLanguage(languageCode);
console.timeEnd('load-time');
console.groupEnd();

// Check cache state
console.table(loader.getCacheStats());
```

### Common Issues & Solutions

**Issue: Module not found**
```
Error: Failed to resolve module specifier "language-loader"

Solution: Add .js extension
import { loader } from './language-loader.js';  // ✅
```

**Issue: CORS errors in development**
```
Solution: Use npm run dev (Vite dev server)
Don't open HTML files directly (file:// protocol)
```

**Issue: Build succeeds but page broken**
```
1. Check base path in vite.config.js
2. Verify paths are relative
3. Check browser console for errors
4. Test with npm run preview
```

---

## Git Workflow

### Commit Message Format (MANDATORY-3)

```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting (no code change)
- `refactor:` - Code restructuring
- `perf:` - Performance improvement
- `test:` - Test additions/changes
- `chore:` - Maintenance (deps, build, etc.)

**Subject Guidelines**:
- 50 characters or less
- Imperative mood ("Add" not "Added")
- No period at end
- Lowercase after type

**Examples**:
```bash
✅ feat: Add lazy loading for language data
✅ fix: Resolve undefined resources display
✅ docs: Update README with build instructions
✅ perf: Optimize bundle size with code splitting

❌ added lazy loading
❌ Fixed bug.
❌ WIP
```

### Pre-Commit Checklist

Before every commit:
- [ ] Code linted (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] No console.log statements (except intentional logging)
- [ ] No commented-out code
- [ ] No TODO comments (create issues instead)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes tested in browser

### .gitignore Patterns

**Currently Ignored**:
```
node_modules/
dist/
.cache/
.vite/
*.log
.env
.DS_Store
docs/development-notes/
```

**Never Commit**:
- Secrets, API keys, credentials
- node_modules/
- Build outputs (dist/)
- IDE files (.vscode/, .idea/)
- OS files (.DS_Store, Thumbs.db)
- Development notes (*.txt, *.tmp)

---

## Dependency Management (MANDATORY-13)

### Adding Dependencies

```bash
# Install dependency
npm install package-name

# Verify it's needed
# - Does it solve a real problem?
# - Is vanilla JS sufficient?
# - What's the bundle size impact?

# Document why
# Add comment in package.json or ARCHITECTURE.md
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all (careful with major versions)
npm update

# After updates:
npm run build    # Verify build works
npm run preview  # Test functionality
```

### Security Audits

```bash
# Run security audit
npm audit

# Fix automatically (safe)
npm audit fix

# Fix with breaking changes (review first)
npm audit fix --force

# Check specific vulnerability
npm audit --json
```

---

## Performance Optimization Workflow

### Before Optimizing
1. **Measure first**: Run Lighthouse, check Network tab
2. **Identify bottleneck**: What's actually slow?
3. **Set target**: Define acceptable performance
4. **Implement fix**: Code the optimization
5. **Measure again**: Verify improvement

### Optimization Techniques

**Code Splitting**:
```javascript
// Before: Everything in one file
import { allLanguages } from './all-data.js';

// After: Load on-demand
const data = await import(`./languages/${code}-data.js`);
```

**Image Optimization**:
- Use appropriate formats (WebP, AVIF)
- Compress images (TinyPNG, Squoosh)
- Lazy load images below fold
- Use responsive images (srcset)

**CSS Optimization**:
- Remove unused CSS
- Minimize specificity
- Use CSS containment
- Avoid @import (use bundler)

**JavaScript Optimization**:
- Debounce expensive operations
- Use requestAnimationFrame for animations
- Avoid layout thrashing
- Cache DOM queries

---

## Documentation Standards (MANDATORY-12)

### Code Comments

**When to Comment**:
```javascript
// ✅ Good: Explain WHY, not WHAT
// Use Map for O(1) lookups instead of Array.find() which is O(n)
const cache = new Map();

// ❌ Bad: Comment explains obvious code
// Create a new map
const cache = new Map();
```

**JSDoc for Public APIs**:
```javascript
/**
 * Load a language module dynamically
 * @param {string} languageCode - Language code (e.g., 'dutch')
 * @returns {Promise<Object>} Language data object
 * @throws {Error} If language code is invalid
 */
async loadLanguage(languageCode) {
  // Implementation...
}
```

### README Updates

After adding features:
1. Update feature list
2. Add usage examples if needed
3. Update screenshots/demos
4. Note breaking changes

### Architecture Decision Records

For significant decisions, document in `docs/ARCHITECTURE.md`:
- What was decided
- What alternatives were considered
- Rationale for choice
- Trade-offs accepted

---

## Troubleshooting Guide

### Build Fails

**Symptom**: `npm run build` errors
**Solutions**:
1. Check Node version (`node --version` → should be 20.19+)
2. Clear cache: `rm -rf node_modules .vite dist && npm install`
3. Check for syntax errors in new files
4. Review vite.config.js for typos

### Hot Reload Not Working

**Symptom**: Changes don't appear in browser
**Solutions**:
1. Check if dev server is running (`npm run dev`)
2. Hard refresh browser (Ctrl+Shift+R)
3. Check for JavaScript errors in console
4. Restart dev server

### Import Errors

**Symptom**: `Cannot find module`
**Solutions**:
1. Add `.js` extension to import
2. Check file path is correct (relative or absolute)
3. Verify file exists in expected location
4. Check for typos in filename

---

## References

- `CLAUDE.md` - Universal agent directives
- `CLAUDE-PROJECT.md` - Project configuration
- `docs/ARCHITECTURE.md` - Technical design
- `docs/DEPLOYMENT.md` - Deployment procedures
- `docs/BUILD_SYSTEM_GUIDE.md` - Build system details

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-07
**Maintained By**: Project contributors
