# Deployment Guide

**Project**: Language Learning Hub
**Last Updated**: 2025-10-07
**Platform**: GitHub Pages
**Status**: Manual Deployment (CI/CD Planned)

---

## Deployment Overview

### Current Deployment Strategy

**Platform**: GitHub Pages (Static Hosting)
**Build Process**: Manual build → Git push
**Domain**: https://bjpl.github.io/online_language_learning_resources/
**Cost**: Free for public repositories

### Deployment Flow

```
Local Development
  ↓
npm run build (Create production bundle)
  ↓
dist/ directory (Optimized output)
  ↓
Git commit and push
  ↓
GitHub Pages (Auto-deploy from main branch)
  ↓
Live at bjpl.github.io
```

---

## Pre-Deployment Checklist

### Code Quality Verification
```bash
# 1. Lint check
npm run lint
# Must pass with 0 errors

# 2. Format check
npm run format:check
# All files should be formatted

# 3. Build verification
npm run build
# Must complete without errors

# 4. Preview production build
npm run preview
# Manual testing at localhost:4173
```

### Manual Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Language pages display resources
- [ ] About page renders
- [ ] Resources page filters work
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] All external links valid

### Performance Verification
```bash
# Run Lighthouse in Chrome DevTools
# Acceptable scores:
# - Performance: 85+
# - Accessibility: 90+
# - Best Practices: 90+
# - SEO: 85+
```

---

## Deployment Procedures

### Method 1: Manual Deployment (Current)

**Step-by-Step**:
```bash
# 1. Ensure clean working directory
git status
# Should show "nothing to commit, working tree clean"

# 2. Build for production
npm run build
# Creates dist/ directory with optimized bundle

# 3. Preview locally
npm run preview
# Test at http://localhost:4173

# 4. Commit changes if any
git add .
git commit -m "chore: Update production build"

# 5. Push to GitHub
git push origin main
# GitHub Pages auto-deploys within 1-2 minutes

# 6. Verify deployment
# Visit: https://bjpl.github.io/online_language_learning_resources/
# Check for updates
```

### Method 2: GitHub Actions (Recommended - Not Yet Implemented)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Benefits**:
- Automated testing on every push
- Automated deployment to GitHub Pages
- No manual build step needed
- Lint and format checks enforced

---

## Environment Configuration

### GitHub Pages Settings

**Repository Settings** → **Pages**:
- **Source**: Deploy from a branch
- **Branch**: `main` / `root` (or `main` / `dist` for build output)
- **Custom domain**: Optional (configure DNS)

### Vite Base Path

**Critical**: Must match GitHub Pages URL structure

```javascript
// vite.config.js
export default defineConfig({
  base: '/online_language_learning_resources/',  // ← Repository name
  // ...
});
```

**Verification**:
- Build: `npm run build`
- Check `dist/index.html` for correct asset paths
- Preview: `npm run preview`

### Environment Variables (Future)

**Not currently used**, but for future features:

**Development** (`.env.development`):
```bash
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ENABLED=false
```

**Production** (`.env.production`):
```bash
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ID=UA-XXXXXX-X
```

**Access in code**:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Deployment Verification

### Post-Deployment Checklist

After deployment completes:
- [ ] Visit live site: https://bjpl.github.io/online_language_learning_resources/
- [ ] Homepage loads without errors
- [ ] Click each navigation link
- [ ] Test at least 3 language pages
- [ ] Check mobile view (DevTools)
- [ ] Verify resources page filters
- [ ] Check browser console (no errors)
- [ ] Test external resource links (sample check)

### Smoke Testing Script

```javascript
// Future: Automated smoke tests
const tests = [
  { url: '/', expect: 'Language Learning Hub' },
  { url: '/language.html?lang=dutch', expect: 'Nederlands' },
  { url: '/resources.html', expect: 'All Resources' },
  { url: '/about.html', expect: 'About' },
];

for (const test of tests) {
  const response = await fetch(test.url);
  const text = await response.text();
  assert(text.includes(test.expect), `${test.url} failed`);
}
```

---

## Rollback Procedures (MANDATORY-24)

### Rolling Back Deployment

**If deployment breaks production**:

```bash
# 1. Identify last working commit
git log --oneline -10

# 2. Revert to last working state
git revert <bad-commit-hash>
# OR (if multiple bad commits)
git reset --hard <last-good-commit>

# 3. Force push (only if you reset)
git push origin main --force

# 4. Verify on GitHub Pages
# Wait 1-2 minutes for deployment
# Test live site
```

### Backup Strategy

**Before major deployments**:
```bash
# Create backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)

# Return to main
git checkout main

# If disaster: restore from backup
git checkout backup-20251007
git checkout -b main-restored
# Test, then force push to main if needed
```

---

## Performance Monitoring

### Tools

**Lighthouse CI** (Future):
```bash
# Install
npm install -D @lhci/cli

# Configure .lighthouserc.json
# Run on every build
npx lhci autorun
```

**Web Vitals Tracking** (Future):
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, id }) {
  // Send to analytics service
  console.log({ metric: name, value: delta, id });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Baselines

**Track these metrics after each deployment**:

| Metric | Target | Acceptable | Poor |
|--------|--------|------------|------|
| **FCP** | <1.0s | <1.8s | >3.0s |
| **LCP** | <1.5s | <2.5s | >4.0s |
| **TTI** | <2.0s | <3.8s | >7.3s |
| **CLS** | <0.05 | <0.1 | >0.25 |
| **Bundle** | <20KB | <50KB | >100KB |

---

## Continuous Integration (Future)

### GitHub Actions Workflow

**On Pull Request**:
- Run linting
- Run tests (when implemented)
- Build verification
- Performance audit
- Comment with results

**On Merge to Main**:
- All PR checks +
- Deploy to staging (if configured)
- Automated deployment to production
- Notify on success/failure

### Status Badges

Add to README.md:
```markdown
![Build Status](https://github.com/bjpl/online_language_learning_resources/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/github/license/bjpl/online_language_learning_resources)
![Last Commit](https://img.shields.io/github/last-commit/bjpl/online_language_learning_resources)
```

---

## Deployment Troubleshooting

### Common Issues

**Issue: 404 on GitHub Pages**
```
Cause: Base path misconfigured
Solution: Check vite.config.js base matches repo name
Verify: /online_language_learning_resources/
```

**Issue: Assets not loading**
```
Cause: Absolute paths instead of relative
Solution: Use relative paths or configure base in Vite
Check: Inspect Network tab for 404s
```

**Issue: Deployment delay**
```
Cause: GitHub Pages cache
Solution: Wait 2-5 minutes, hard refresh (Ctrl+Shift+R)
Check: GitHub repo → Settings → Pages for status
```

**Issue: Build succeeds locally, fails on GitHub**
```
Cause: Node version mismatch
Solution: Match Node versions (local vs GitHub Actions)
Check: package.json engines field
```

---

## Security Considerations for Deployment

### HTTPS Enforcement
- GitHub Pages enforces HTTPS automatically
- No configuration needed
- Mixed content (HTTP) will be blocked

### Content Security Policy (Future)

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self';
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;">
```

### Subresource Integrity (Future)

For CDN resources:
```html
<script src="https://cdn.example.com/lib.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```

---

## Monitoring & Analytics (Future)

### Error Tracking
- **Sentry**: Client-side error monitoring
- **LogRocket**: Session replay
- **Track.js**: JavaScript error tracking

### Analytics
- **Google Analytics 4**: User behavior
- **Plausible**: Privacy-friendly analytics
- **Vercel Analytics**: Performance metrics

### Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Performance monitoring
- **StatusCake**: Multi-location checks

---

## Disaster Recovery

### Backup Locations
1. **GitHub Repository**: Primary source of truth
2. **Local Clone**: Developer machines
3. **Backup Branches**: Created before major changes
4. **Git Tags**: Released versions

### Recovery Scenarios

**Scenario 1: Accidental Force Push**
```bash
# GitHub keeps reflog for 90 days
# Contact GitHub Support to restore
```

**Scenario 2: Corrupted Build**
```bash
# Rollback to previous commit
git log --oneline
git reset --hard <last-good-commit>
git push origin main --force
```

**Scenario 3: Lost Local Changes**
```bash
# Check git reflog
git reflog
git checkout <lost-commit-hash>
git checkout -b recovery
```

---

## References

- `CLAUDE.md` - Universal agent directives
- `CLAUDE-PROJECT.md` - Project configuration
- `docs/ARCHITECTURE.md` - Technical design
- `docs/DEVELOPMENT.md` - Development workflow
- `docs/BUILD_SYSTEM_GUIDE.md` - Build system details

### External Documentation
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-07
**Review Schedule**: Before each major deployment
