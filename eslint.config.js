// ===================================
// ESLint Configuration - Modern Flat Config
// ===================================

import js from '@eslint/js';
import html from 'eslint-plugin-html';
import prettier from 'eslint-config-prettier';

export default [
  // Recommended base rules
  js.configs.recommended,

  // Global configuration
  {
    files: ['**/*.js'],
    plugins: {
      html,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',

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

  // HTML files configuration
  {
    files: ['**/*.html'],
    plugins: {
      html,
    },
    processor: 'html/html',
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'tests/**',
      'docs/development-notes/**',
      '*.config.js',
    ],
  },

  // Prettier compatibility (disable conflicting rules)
  prettier,
];
