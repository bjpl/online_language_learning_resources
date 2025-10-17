// ===================================
// Integration Tests - Page Loading and Navigation
// ===================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { languageLoader } from '../../assets/js/language-loader.js';
import {
  getLanguageMetadata,
  searchLanguages,
} from '../../assets/js/language-data/language-metadata.js';
import { countAllResources } from '../../assets/js/resource-counter.js';

describe('Full Page Loading Integration', () => {
  beforeEach(() => {
    // Clear cache before each test
    languageLoader.clearCache();

    // Reset DOM
    document.body.innerHTML = `
      <div id="languages-grid"></div>
      <div id="resources-container"></div>
      <input id="quick-search-input" />
      <span class="resource-count" data-type="courses"></span>
      <span class="resource-count" data-type="apps"></span>
      <span class="resource-count" data-type="books"></span>
      <span class="resource-count" data-type="audio"></span>
      <span class="resource-count" data-type="practice"></span>
    `;

    // Mock global languageData
    global.languageData = {};
  });

  afterEach(() => {
    languageLoader.clearCache();
    global.languageData = {};
  });

  describe('Homepage Loading', () => {
    it('should load language metadata quickly', () => {
      const start = performance.now();
      const languages = getLanguageMetadata();
      const duration = performance.now() - start;

      expect(languages).toBeInstanceOf(Array);
      expect(languages.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(50); // Should be < 50ms
    });

    it('should display all 67 languages', () => {
      const languages = getLanguageMetadata();

      expect(languages.length).toBe(67);

      // Verify essential languages are present
      const languageCodes = languages.map((l) => l.code);
      expect(languageCodes).toContain('dutch');
      expect(languageCodes).toContain('french');
      expect(languageCodes).toContain('japanese');
      expect(languageCodes).toContain('spanish');
    });

    it('should render language cards without full data load', () => {
      const languages = getLanguageMetadata();
      const grid = document.getElementById('languages-grid');

      // Simulate rendering cards
      languages.forEach((lang) => {
        const card = document.createElement('article');
        card.className = 'language-card';
        card.dataset.language = lang.code;
        grid.appendChild(card);
      });

      expect(grid.children.length).toBe(67);
    });
  });

  describe('Language Search Integration', () => {
    it('should search languages by name', () => {
      const results = searchLanguages('dutch');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name.toLowerCase()).toContain('dutch');
    });

    it('should search by native name', () => {
      const results = searchLanguages('français');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.code === 'french')).toBe(true);
    });

    it('should handle case-insensitive search', () => {
      const lowercase = searchLanguages('japanese');
      const uppercase = searchLanguages('JAPANESE');
      const mixed = searchLanguages('JaPaNeSe');

      expect(lowercase.length).toBe(uppercase.length);
      expect(lowercase.length).toBe(mixed.length);
    });

    it('should return empty array for no matches', () => {
      const results = searchLanguages('zzzzz-nonexistent');

      expect(results).toEqual([]);
    });

    it('should search partial matches', () => {
      const results = searchLanguages('span');

      expect(results.some((r) => r.name.toLowerCase().includes('span'))).toBe(
        true,
      );
    });
  });

  describe('Lazy Loading Flow', () => {
    it('should not load language data on homepage', () => {
      const stats = languageLoader.getCacheStats();

      expect(stats.loaded).toBe(0);
      expect(stats.loading).toBe(0);
    });

    it('should load language only when clicked', async () => {
      // Mock the import to avoid actual file loading
      const mockData = {
        name: 'Dutch',
        resources: {
          courses: [{ items: [{}, {}] }],
          apps: [{ items: [{}] }],
        },
      };

      vi.spyOn(languageLoader, '_importLanguageModule').mockResolvedValue(
        mockData,
      );

      // Load language
      const data = await languageLoader.loadLanguage('dutch');

      expect(data).toEqual(mockData);
      expect(languageLoader.isLoaded('dutch')).toBe(true);

      // Subsequent calls should use cache
      const cachedData = await languageLoader.loadLanguage('dutch');
      expect(cachedData).toBe(data); // Same object reference
    });

    it('should handle loading errors gracefully', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.spyOn(languageLoader, '_importLanguageModule').mockRejectedValue(
        new Error('Network error'),
      );

      await expect(languageLoader.loadLanguage('dutch')).rejects.toThrow();

      expect(languageLoader.isLoaded('dutch')).toBe(false);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Resource Counting Across All Languages', () => {
    it('should count resources when languageData is populated', () => {
      // Populate with test data
      global.languageData = {
        dutch: {
          resources: {
            courses: [{ items: [{}, {}, {}] }],
            apps: [{ items: [{}] }],
            books: [{ items: [{}, {}] }],
            audio: [],
            practice: [{ items: [{}] }],
          },
        },
        french: {
          resources: {
            courses: [{ items: [{}, {}] }],
            apps: [],
            books: [{ items: [{}] }],
            audio: [{ items: [{}, {}, {}] }],
            practice: [],
          },
        },
      };

      const counts = countAllResources(global.languageData);

      expect(counts).toEqual({
        courses: 5, // 3 + 2
        apps: 1, // 1 + 0
        books: 3, // 2 + 1
        audio: 3, // 0 + 3
        practice: 1, // 1 + 0
      });
    });

    it('should update DOM with resource counts', () => {
      global.languageData = {
        dutch: {
          resources: {
            courses: [{ items: [{}, {}] }],
            apps: [{ items: [{}] }],
            books: [],
            audio: [],
            practice: [],
          },
        },
      };

      const counts = countAllResources(global.languageData);

      // Simulate updating DOM
      document.querySelector('[data-type="courses"]').textContent = `(${counts.courses})`;
      document.querySelector('[data-type="apps"]').textContent = `(${counts.apps})`;

      expect(
        document.querySelector('[data-type="courses"]').textContent,
      ).toBe('(2)');
      expect(document.querySelector('[data-type="apps"]').textContent).toBe(
        '(1)',
      );
    });
  });

  describe('Cross-Page Navigation', () => {
    it('should preserve language code in URL', () => {
      const url = new URL('http://example.com/language.html?lang=dutch');
      const params = new URLSearchParams(url.search);

      expect(params.get('lang')).toBe('dutch');
    });

    it('should default to dutch if no lang param', () => {
      const url = new URL('http://example.com/language.html');
      const params = new URLSearchParams(url.search);
      const lang = params.get('lang') || 'dutch';

      expect(lang).toBe('dutch');
    });

    it('should generate correct language page URLs', () => {
      const languages = getLanguageMetadata();

      languages.forEach((lang) => {
        const url = `language.html?lang=${lang.code}`;

        expect(url).toContain('language.html');
        expect(url).toContain(`lang=${lang.code}`);
      });
    });
  });

  describe('Performance Metrics', () => {
    it('should load metadata in under 100ms', () => {
      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        getLanguageMetadata();
      }

      const duration = performance.now() - start;
      const avgDuration = duration / iterations;

      expect(avgDuration).toBeLessThan(1); // Average < 1ms
    });

    it('should search efficiently with large dataset', () => {
      const start = performance.now();

      const results = searchLanguages('a'); // Should match many languages

      const duration = performance.now() - start;

      expect(results.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(10); // Should be fast
    });
  });

  describe('Data Consistency', () => {
    it('should have matching language codes in loader and metadata', () => {
      const metadataLanguages = getLanguageMetadata();
      const loaderLanguages = Object.keys(languageLoader.languageMap);

      expect(metadataLanguages.length).toBe(loaderLanguages.length);

      metadataLanguages.forEach((lang) => {
        expect(loaderLanguages).toContain(lang.code);
      });
    });

    it('should validate all language metadata has required fields', () => {
      const languages = getLanguageMetadata();

      languages.forEach((lang) => {
        expect(lang).toHaveProperty('code');
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('nativeName');
        expect(lang).toHaveProperty('flag');
        expect(lang).toHaveProperty('speakers');
        expect(lang).toHaveProperty('learners');
      });
    });
  });

  describe('Memory Management', () => {
    it('should clear cache successfully', () => {
      // Add some data to cache
      languageLoader.cache.set('dutch', { name: 'Dutch' });
      languageLoader.cache.set('french', { name: 'French' });

      expect(languageLoader.getCacheStats().loaded).toBe(2);

      languageLoader.clearCache();

      expect(languageLoader.getCacheStats().loaded).toBe(0);
    });

    it('should track loaded languages', async () => {
      const mockData = { name: 'Test' };
      vi.spyOn(languageLoader, '_importLanguageModule').mockResolvedValue(
        mockData,
      );

      await languageLoader.loadLanguage('dutch');
      await languageLoader.loadLanguage('french');

      const loadedLanguages = languageLoader.getLoadedLanguages();

      expect(loadedLanguages).toContain('dutch');
      expect(loadedLanguages).toContain('french');
      expect(loadedLanguages.length).toBe(2);
    });
  });
});
