// ===================================
// ESLint Configuration - Modern Flat Config
// ===================================

import js from '@eslint/js';
// import html from 'eslint-plugin-html'; // TODO: Re-enable when ESLint 9 compatibility is fixed
import prettier from 'eslint-config-prettier';

export default [
  // Recommended base rules
  js.configs.recommended,

  // Global configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals - Window & Document
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',

        // Browser APIs
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',

        // Timers & Animation
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',

        // Performance & Monitoring
        performance: 'readonly',
        PerformanceObserver: 'readonly',

        // Observers
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',

        // Events
        Event: 'readonly',
        CustomEvent: 'readonly',
        EventTarget: 'readonly',

        // DOM Elements
        Element: 'readonly',
        HTMLElement: 'readonly',
        HTMLImageElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLInputElement: 'readonly',
        NodeList: 'readonly',

        // User Interaction
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',

        // Data Structures
        Map: 'readonly',
        Set: 'readonly',
        WeakMap: 'readonly',
        WeakSet: 'readonly',

        // File APIs
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        FileList: 'readonly',
        FormData: 'readonly',

        // Custom globals (from your language data files)
        languageData: 'writable',
        dutchResources: 'readonly',
        danishResources: 'readonly',
        portugueseResources: 'readonly',
        // Add other language resources as needed
      },
    },
    rules: {
      // Error prevention
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'error',
      'require-await': 'warn',

      // Code quality
      'complexity': ['warn', 15],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3],
      'max-params': ['warn', 5],

      // ES6+ features
      'arrow-body-style': ['warn', 'as-needed'],
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-destructuring': ['warn', {
        array: false,
        object: true,
      }],
    },
  },

  // HTML files configuration - DISABLED due to ESLint 9 compatibility issues
  // TODO: Re-enable when eslint-plugin-html supports ESLint 9 flat config properly
  // {
  //   files: ['**/*.html'],
  //   plugins: {
  //     html,
  //   },
  //   processor: 'html/html',
  // },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'tests/**',
      'scripts/**',
      'backups/**',
      'docs/development-notes/**',
      '*.config.js',
      'vite.config.js',
      'eslint.config.js',
    ],
  },

  // Prettier compatibility (disable conflicting rules)
  prettier,
];
