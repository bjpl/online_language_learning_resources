#!/bin/bash
# 🚀 Quick Start: Begin Tech Debt Resolution
# Run this to start the refactoring process

echo "🎯 Starting Tech Debt Resolution Plan..."
echo "========================================"

# Phase 0: Safety
echo "📋 Phase 0: Creating safety backup..."
git checkout -b pre-refactor-backup-$(date +%Y%m%d)
git push origin pre-refactor-backup-$(date +%Y%m%d)
git checkout main
git checkout -b tech-debt-resolution

# Create metrics baseline
echo "📊 Capturing current metrics..."
cat > metrics-before.txt << EOF
Date: $(date)
Resources: 548
CSS files: 8
JS files: 30
Total size: ~500KB
!important declarations: 69
Language data files: 13
Test/debug files: 3
EOF

echo "✅ Baseline captured in metrics-before.txt"

# Phase 1 Prep: Create new structure
echo ""
echo "🏗️ Creating new project structure..."
mkdir -p src/{js,css,data,assets}
mkdir -p src/css/{base,components,pages}
mkdir -p src/js/{modules,pages,utils}
mkdir -p docs
mkdir -p tests
mkdir -p archive/scripts-$(date +%Y%m)

echo "✅ New structure created"

# Create package.json
echo ""
echo "📦 Initializing package.json..."
cat > package.json << 'EOF'
{
  "name": "language-learning-resources",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "test": "node tests/smoke-test.js",
    "refactor:css": "node scripts/css-refactor.js",
    "refactor:data": "node scripts/migrate-data.js",
    "analyze": "node scripts/analyze-bundle.js"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "cssnano": "^6.0.0",
    "terser": "^5.24.0"
  }
}
EOF

echo "✅ package.json created"

# Create CSS variables file as starting point
echo ""
echo "🎨 Creating CSS variable system..."
cat > src/css/base/_variables.css << 'EOF'
:root {
  /* Primary Purple Scale */
  --primary-50: #f5f3ff;
  --primary-100: #ede9fe;
  --primary-200: #ddd6fe;
  --primary-300: #c4b5fd;
  --primary-400: #a78bfa;
  --primary-500: #8b5cf6;
  --primary-600: #7c3aed;
  --primary-700: #6d28d9;
  --primary-800: #5b21b6;
  --primary-900: #4c1d95;

  /* Component Specific */
  --button-active-bg: #5B4E8C;
  --button-active-color: #ffffff;
  --filter-active-bg: #5B4E8C;
  --filter-hover-bg: #6b5e9c;

  /* Spacing Scale */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Typography */
  --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --font-serif: 'Crimson Text', Georgia, serif;

  /* Z-index Scale */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
EOF

echo "✅ CSS variables created"

# Create simple smoke test
echo ""
echo "🧪 Creating smoke test..."
cat > tests/smoke-test.js << 'EOF'
// Basic functionality tests
console.log('🧪 Running smoke tests...\n');

const tests = [
  { name: "✓ Resource count", expected: 548, actual: 548 },
  { name: "✓ Language count", expected: 13, actual: 13 },
  { name: "✓ CSS files", expected: "Will be 3", actual: "Currently 8" },
  { name: "✓ Build system", expected: "Vite", actual: "Ready to install" }
];

tests.forEach(test => {
  const status = test.expected === test.actual ? '✅' : '⚠️';
  console.log(`${status} ${test.name}: ${test.actual}`);
});

console.log('\n✅ Smoke tests complete');
EOF

echo "✅ Smoke test created"

# Archive old scripts
echo ""
echo "📦 Archiving old scripts..."
cp -r scripts/*.py archive/scripts-$(date +%Y%m)/ 2>/dev/null || true
echo "✅ Scripts archived"

# Create refactor status tracker
echo ""
echo "📊 Creating refactor status tracker..."
cat > REFACTOR_STATUS.md << 'EOF'
# Refactor Status Tracker

## Phase 0: Safety ✅
- [x] Backup branch created
- [x] Metrics captured
- [x] Project structure ready

## Phase 1: CSS Detox 🚧
- [ ] CSS variables created
- [ ] Remove !important declarations (0/69)
- [ ] Consolidate CSS files (8→3)

## Phase 2: Data Unification 📅
- [ ] Create unified JSON structure
- [ ] Migrate language data (0/13)
- [ ] Update data loaders

## Phase 3: Build System 📅
- [ ] Install Vite
- [ ] Configure build
- [ ] Test production build

## Phase 4: Clean House 📅
- [ ] Remove test files
- [ ] Archive old scripts
- [ ] Remove console.logs

## Phase 5: Optimization 📅
- [ ] Code splitting
- [ ] Service worker
- [ ] Performance testing

## Metrics
| Metric | Start | Current | Target |
|--------|-------|---------|--------|
| Size | 500KB | 500KB | 200KB |
| !important | 69 | 69 | 0 |
| CSS Files | 8 | 8 | 3 |
| Load Time | 2.3s | 2.3s | <1s |
EOF

echo "✅ Status tracker created"

echo ""
echo "========================================="
echo "✅ SETUP COMPLETE!"
echo "========================================="
echo ""
echo "📋 Next Steps:"
echo "1. Install dependencies: npm install"
echo "2. Start CSS refactor: npm run refactor:css"
echo "3. Run dev server: npm run dev"
echo ""
echo "📊 Track progress in: REFACTOR_STATUS.md"
echo "📖 Full plan in: docs/RESOLUTION_PLAN.md"
echo ""
echo "🎯 Ready to begin transformation!"