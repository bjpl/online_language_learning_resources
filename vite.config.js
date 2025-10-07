// ===================================
// Vite Configuration - Production-Optimized Build
// ===================================

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: '/online_language_learning_resources/',

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',

    // Clean output directory before build
    emptyOutDir: true,

    // Generate source maps for debugging (disable in production for smaller builds)
    sourcemap: false,

    // Target modern browsers for smaller bundle size
    target: 'es2020',

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500, // Warn if chunks exceed 500KB

    // Rollup options for advanced bundling
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        language: resolve(__dirname, 'language.html'),
        resources: resolve(__dirname, 'resources.html'),
        about: resolve(__dirname, 'about.html'),
      },

      output: {
        // Manual chunking strategy for optimal code splitting
        manualChunks: (id) => {
          // Core vendor libraries (if any are added later)
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Language data files - each gets its own chunk for lazy loading
          if (id.includes('assets/js') && id.includes('-data.js')) {
            const match = id.match(/([a-z-]+)-data\.js/);
            if (match) {
              return `lang-${match[1]}`;
            }
          }

          // Main application code
          if (id.includes('assets/js/main.js')) {
            return 'app-main';
          }

          // Grid manager
          if (id.includes('assets/js/grid-manager.js')) {
            return 'app-grid';
          }

          // Language page specific code
          if (id.includes('assets/js/language-page.js')) {
            return 'app-language-page';
          }

          // Modern UI code
          if (id.includes('assets/js/modern-ui-clean.js')) {
            return 'app-ui';
          }
        },

        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }

          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }

          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        // JS chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inlining threshold (8KB)
    assetsInlineLimit: 8192,
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    host: true, // Listen on all addresses
  },

  // Preview server (for testing production builds)
  preview: {
    port: 4173,
    open: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [],
    exclude: [],
  },

  // CSS preprocessing options
  css: {
    devSourcemap: true,
  },
});
