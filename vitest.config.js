// ===================================
// Vitest Configuration - Browser Environment Testing
// ===================================

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Browser-like environment for testing DOM manipulation
    environment: 'happy-dom',

    // Global test APIs (describe, it, expect, etc.)
    globals: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        'scripts/**',
        'backups/**',
        '*.config.js',
        'assets/js/review-tool*.js', // Exclude dev tools
        'assets/js/data.js', // Large data file
        'assets/js/data-simple.js',
      ],
    },

    // Test file patterns
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs}'],

    // Setup files (run before tests)
    setupFiles: ['./tests/setup.js'],

    // Test timeout (default 5s)
    testTimeout: 10000,

    // Bail on first failure in CI
    bail: process.env.CI ? 1 : 0,

    // Mock timers configuration
    fakeTimers: {
      toFake: ['setTimeout', 'setInterval', 'Date'],
    },
  },

  // Resolve configuration (for imports)
  resolve: {
    alias: {
      '@': '/assets',
      '@js': '/assets/js',
      '@css': '/assets/css',
    },
  },
});
