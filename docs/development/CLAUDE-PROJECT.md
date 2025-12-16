# Language Learning Hub - Project Configuration

**Last Updated**: 2025-10-08
**Version**: 2.2.0 (Mobile Optimizations + Testing Infrastructure)
**Status**: ✅ ALL PHASES COMPLETE, 🚀 DEPLOYED TO PRODUCTION

---

## Overview

A production-ready website curating language learning resources for 65+ languages. Built with modern development practices, optimized performance, and professional architecture.

**Live Site**: https://bjpl.github.io/online_language_learning_resources/
**Repository**: https://github.com/bjpl/online_language_learning_resources

---

## Technology Stack

### Frontend
- **Core**: Pure HTML/CSS/JavaScript (ES6 modules)
- **No Framework**: Vanilla JS for simplicity and performance
- **Styling**: CSS custom properties (design tokens)
- **Fonts**: Google Fonts (Crimson Text + Inter)

### Build System
- **Bundler**: Vite 7.1.9
  - Code splitting for 67 language modules
  - Terser minification
  - CSS code splitting
  - ES2020 target
- **Code Quality**: ESLint 9.37 (modern flat config, 40+ browser globals)
- **Formatting**: Prettier 3.6
- **Testing**: Vitest 3.2.4 (50 automated tests, 100% passing) **NEW v2.1.0**
- **Package Manager**: npm

### Performance Optimization
- **Lazy Loading**: Dynamic imports for language data
- **Caching**: Map-based in-memory cache
- **Loading UI**: Custom loading states and spinners
- **Bundle Size**: ~15KB initial, on-demand language files
- **Mobile Optimizations**: 30 categories, 573 lines of mobile-specific CSS **NEW v2.2.0**
  - 48x48px touch targets (WCAG AAA)
  - Safe area insets (iPhone notch support)
  - Reduced motion & high contrast
  - GPU acceleration & performance

### Deployment
- **Platform**: GitHub Pages
- **Build**: Static site generation via Vite
- **CI/CD**: Manual (automated workflow planned)

---

## Project Structure

```
online_language_learning_resources/
├── CLAUDE.md                    # Universal agent directives
├── CLAUDE-PROJECT.md            # This file - project config
├── README.md                    # Public-facing documentation
├── package.json                 # npm configuration
├── vite.config.js               # Build configuration
├── eslint.config.js             # Linting rules
├── .prettierrc.json             # Formatting rules
│
├── index.html                   # Homepage
├── language.html                # Language-specific resources
├── resources.html               # All resources page
├── about.html                   # About page
│
├── assets/
│   ├── css/                     # Stylesheets
│   │   ├── main.css             # Core styles
│   │   ├── components.css       # UI components
│   │   ├── language.css         # Language page styles
│   │   └── ...                  # Additional styles
│   └── js/                      # JavaScript modules
│       ├── language-loader.js   # Dynamic import system
│       ├── loading-ui.js        # Loading states/spinners
│       ├── main.js              # Main application logic
│       ├── data-simple.js       # Language data initialization
│       ├── *-data.js            # 67 language data modules
│       └── ...                  # Additional modules
│
├── docs/
│   ├── ARCHITECTURE.md          # Architecture decisions
│   ├── DEVELOPMENT.md           # Development workflow
│   ├── DEPLOYMENT.md            # Deployment procedures
│   ├── BUILD_SYSTEM_GUIDE.md    # Build system documentation
│   └── development-notes/       # Dev artifacts (gitignored)
│
├── tests/                       # Test files (gitignored)
├── daily_reports/               # Daily development logs
└── scripts/                     # Build and utility scripts
    ├── convert-to-modules.js    # ES6 module converter
    └── generate-daily-reports.js # Report generator
```

---

## File Management Rules (MANDATORY-11 Implementation)

### ⛔ NEVER Save to Root Directory
- **No test files** (`test-*.html`, debug files)
- **No report files** (`*_report.json`, `*.csv`)
- **No markdown notes** (except README, CLAUDE files)
- **No temporary files** (backups, debug outputs)

**Rationale**: Root directory should contain only production files and primary documentation.

### ✅ Proper File Organization

| File Type | Destination | Examples |
|-----------|-------------|----------|
| **Tests** | `/tests` | `test-*.html`, review tools |
| **Reports** | `/docs/development-notes` | `*_report.json`, analytics |
| **Documentation** | `/docs` | Technical guides, specs |
| **Scripts** | `/scripts` | Build tools, utilities |
| **Daily Logs** | `/daily_reports` | `YYYY-MM-DD.md` files |
| **Source Code** | `/assets/js` | JavaScript modules |
| **Styles** | `/assets/css` | CSS files |

### Version Control Rules (MANDATORY-3 Implementation)

**Gitignored Directories**:
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.cache/`, `.vite/` - Build cache
- `docs/development-notes/` - Dev artifacts
- `coverage/` - Test coverage reports

---

## Key Files Reference

### Configuration Files
| File | Purpose | Notes |
|------|---------|-------|
| `vite.config.js` | Build system configuration | Code splitting, optimization |
| `eslint.config.js` | Code quality rules | Modern flat config |
| `.prettierrc.json` | Formatting standards | Consistent style |
| `package.json` | Dependencies and scripts | npm configuration |
| `.gitignore` | Version control exclusions | Build artifacts excluded |

### Core Application Files
| File | Purpose | Notes |
|------|---------|-------|
| `index.html` | Homepage | Language grid, hero section |
| `language.html` | Language-specific resources | Dynamic content loading |
| `resources.html` | All resources by type | Filterable resource list |
| `about.html` | About page | Project information |

### JavaScript Modules
| File | Purpose | Lines | Notes |
|------|---------|-------|-------|
| `language-loader.js` | Dynamic import system | 240 | Singleton, caching |
| `loading-ui.js` | Loading states/UI feedback | 370 | Spinners, toasts |
| `main.js` | Main application logic | 383 | Module pattern |
| `data-simple.js` | Global initialization | 7 | `languageData = {}` |
| `*-data.js` (×67) | Language resource data | ~500 ea | ES6 modules |

### Documentation Files
| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Public documentation | Users, contributors |
| `CLAUDE.md` | Universal agent directives | AI agents |
| `CLAUDE-PROJECT.md` | Project configuration | AI agents |
| `docs/ARCHITECTURE.md` | Technical design | Developers |
| `docs/DEVELOPMENT.md` | Development workflow | Developers |
| `docs/DEPLOYMENT.md` | Deployment procedures | DevOps |
| `docs/BUILD_SYSTEM_GUIDE.md` | Build system guide | Developers |

---

## Development Workflow

### Quick Start
```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Development server with HMR | Port 3000, auto-reload |
| `npm run build` | Production build | Output: `dist/` |
| `npm run preview` | Preview production build | Port 4173 |
| `npm run lint` | Check code quality | ESLint check |
| `npm run lint:fix` | Auto-fix linting issues | Modifies files |
| `npm run format` | Format all files | Prettier format |
| `npm run format:check` | Check formatting | No modifications |
| `npm run test` | Run automated tests | 50 tests, ~3s **NEW** |
| `npm run test:watch` | Test watch mode | Development TDD **NEW** |
| `npm run test:ui` | Interactive test UI | Visual debugging **NEW** |
| `npm run test:coverage` | Coverage reports | HTML + JSON **NEW** |

### Development Process

1. **Create feature branch** (optional for solo dev)
2. **Make changes** with hot reload (`npm run dev`)
3. **Lint and format** before committing
4. **Test build** with `npm run build`
5. **Preview** with `npm run preview`
6. **Commit** with conventional format
7. **Push** to GitHub

---

## Commit Standards (MANDATORY-3 Implementation)

### Commit Message Format
```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Types
| Type | Use Case | Example |
|------|----------|---------|
| `feat:` | New features | `feat: Add lazy loading system` |
| `fix:` | Bug fixes | `fix: Resolve undefined apps display` |
| `docs:` | Documentation only | `docs: Update README with new workflow` |
| `style:` | Code style/formatting | `style: Apply Prettier formatting` |
| `refactor:` | Code refactoring | `refactor: Extract language loader` |
| `test:` | Test additions/changes | `test: Add unit tests for loader` |
| `chore:` | Maintenance tasks | `chore: Update dependencies` |
| `perf:` | Performance improvements | `perf: Optimize bundle size` |

### Commit Guidelines
- **Atomic commits**: One logical change per commit
- **Working state**: Each commit should leave system functional
- **Clear subject**: 50 chars or less, imperative mood
- **Detailed body**: Explain "why" not "what" (code shows "what")
- **Reference issues**: Link to GitHub issues if applicable
- **Breaking changes**: Note in body with `BREAKING CHANGE:` prefix

---

## Performance Targets

### Before Optimization (Initial Implementation)
- ❌ **Initial Load**: ~10,000ms (67 × 150ms HTTP requests)
- ❌ **Bundle Size**: ~850KB (all languages loaded upfront)
- ❌ **HTTP Requests**: 67 separate script tags
- ❌ **Caching**: None (re-download on every visit)
- ❌ **Time to Interactive**: 10+ seconds on 3G

### After Optimization (Current State)
- ✅ **Initial Load**: ~200ms (core app only, -98%)
- ✅ **Bundle Size**: ~15KB initial (-98%)
- ✅ **HTTP Requests**: On-demand per language
- ✅ **Caching**: Map-based in-memory cache
- ✅ **Time to Interactive**: <1 second

### Performance Monitoring
- **Tool**: Chrome DevTools Performance tab
- **Metrics**: First Contentful Paint, Time to Interactive, Bundle Size
- **Target**: Lighthouse score 90+ on mobile
- **Future**: Web Vitals tracking, Real User Monitoring

---

## Security Guidelines (MANDATORY-9 Implementation)

### Environment Variables
```bash
# Example .env structure (if needed in future)
# NEVER commit this file
API_KEY=your_api_key_here
ANALYTICS_ID=your_analytics_id
```

### Input Sanitization
All user inputs must be sanitized:
```javascript
// Current implementation in loading-ui.js
function sanitize(html) {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### Security Checklist
- [x] No secrets in repository
- [x] Input sanitization implemented
- [x] XSS prevention at boundaries
- [ ] Content Security Policy headers (planned)
- [ ] Subresource Integrity for CDN resources (planned)
- [x] HTTPS only (enforced by GitHub Pages)
- [x] Dependency security audits (`npm audit`)

### Security Update Process
```bash
# Regular security checks
npm audit
npm audit fix

# Major version updates (review breaking changes)
npm outdated
npm update <package>
```

---

## Testing Strategy (MANDATORY-8 Implementation)

### Current State
**Manual Testing**:
- Visual testing during development
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsive design verification
- Build validation before deployment

**Build Testing**:
```bash
npm run build        # Must complete without errors
npm run preview      # Visual verification
npm run lint         # No linting errors
```

### Future Enhancements (Planned)
**Unit Tests** (Jest/Vitest):
- Language loader functionality
- Loading UI components
- Data validation
- Cache management

**Integration Tests**:
- Dynamic import system
- Language data loading
- Error handling flows

**E2E Tests** (Playwright/Cypress):
- Homepage to language page flow
- Resource filtering
- Search functionality (when implemented)
- Mobile navigation

**Performance Tests**:
- Bundle size limits
- Load time benchmarks
- Lighthouse CI integration

---

## Known Limitations

### Technical Limitations
1. **HTML Integration Pending**: Lazy loading infrastructure built but not yet wired to HTML files
2. **No Backend**: Static site only, no server-side processing or database
3. **Manual Data Entry**: Language resources added manually (no CMS)
4. **No Search**: Client-side search not yet implemented
5. **No User Accounts**: No personalization or saved preferences

### Scalability Considerations
- **Language Data**: 67 files currently, manageable but consider database for 100+
- **Static Site**: No dynamic content or real-time updates
- **GitHub Pages**: Limited to static hosting, no server-side features
- **Manual Deployment**: No automated CI/CD pipeline yet

### Browser Support
- **Modern Browsers**: ES2020 features require recent browser versions
- **No IE Support**: Internet Explorer not supported
- **Mobile**: Optimized for mobile but no native app
- **Progressive Web App**: PWA features not yet implemented

---

## Next Steps Roadmap

### Completed (Oct 7-8)
- [x] Complete HTML integration for lazy loading
- [x] Remove 67 `<script>` tags from HTML files
- [x] Update main.js to use languageLoader
- [x] Create language-metadata.js for card rendering
- [x] Deploy lazy loading system to production
- [x] Add automated testing infrastructure (50 tests)
- [x] Refactor code complexity (73% reduction)
- [x] Clean up repository (remove backups)
- [x] Add comprehensive mobile optimizations (30 categories)
- [x] Implement WCAG 2.1 AAA touch targets (48x48px)
- [x] Add iPhone notch support (safe area insets)
- [x] Deploy to production (v2.2.0)

### Immediate (This Week)
- [ ] Monitor production site for errors
- [ ] Gather user feedback
- [ ] Performance validation (Lighthouse audit)
- [ ] Fix any critical bugs discovered

### Short-term (This Month)
- [ ] Implement client-side search functionality
- [ ] Add more languages (target: 100+)
- [ ] Create recommendation engine
- [ ] Improve mobile experience
- [ ] Add PWA features (offline support)
- [ ] Implement GitHub Actions CI/CD

### Long-term (3-6 Months)
- [ ] Backend API for dynamic content
- [ ] User accounts and saved resources
- [ ] Community features (ratings, reviews, comments)
- [ ] Analytics dashboard
- [ ] Mobile app exploration (React Native/Flutter)
- [ ] Internationalization (i18n) for UI

---

## Support & Resources

### Documentation
- **Architecture**: `docs/ARCHITECTURE.md`
- **Development**: `docs/DEVELOPMENT.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Build System**: `docs/BUILD_SYSTEM_GUIDE.md`
- **Daily Reports**: `daily_reports/*.md`

### External Resources
- **Issue Tracking**: [GitHub Issues](https://github.com/bjpl/online_language_learning_resources/issues)
- **Vite Documentation**: https://vitejs.dev
- **ESLint Documentation**: https://eslint.org
- **Prettier Documentation**: https://prettier.io

### Community
- **Contributors**: Open to pull requests
- **Discussions**: GitHub Discussions (to be enabled)
- **Contact**: Create an issue for questions

---

## Directive Implementation Quick Reference

This project implements universal directives from `CLAUDE.md`:

| Directive | Implementation Details |
|-----------|------------------------|
| **MANDATORY-3** | Version Control & Documentation | See "Commit Standards" above |
| **MANDATORY-8** | Testing & Quality Assurance | See "Testing Strategy" above |
| **MANDATORY-9** | Security & Privacy | See "Security Guidelines" above |
| **MANDATORY-10** | Architecture & Design | See `docs/ARCHITECTURE.md` |
| **MANDATORY-11** | Incremental Delivery | See "File Management Rules" above |
| **MANDATORY-12** | Documentation Standards | This file + docs/ directory |
| **MANDATORY-13** | Dependency Management | See `package.json`, lockfile committed |
| **MANDATORY-14** | Performance Awareness | See "Performance Targets" above |

For complete universal directives, see `CLAUDE.md`.

---

**Document Version**: 2.1.0
**Agent Directives Version**: 1.1 (26 directives)
**Project Status**: ✅ ALL PHASES COMPLETE, 🚀 DEPLOYED TO PRODUCTION (v2.2.0)
