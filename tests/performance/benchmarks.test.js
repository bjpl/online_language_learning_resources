// ===================================
// Performance Benchmarking Tests
// ===================================

import { describe, it, expect, beforeEach } from 'vitest';
import { countAllResources, countLanguageResources } from '../../assets/js/resource-counter.js';
import { getLanguageMetadata, searchLanguages } from '../../assets/js/language-data/language-metadata.js';
import { LanguageLoader } from '../../assets/js/language-loader.js';

describe('Performance Benchmarks', () => {
  describe('Resource Counting Performance', () => {
    it('should count resources for single language in < 1ms', () => {
      const mockLanguage = {
        name: 'Dutch',
        resources: {
          courses: [
            { items: new Array(50).fill({}) },
            { items: new Array(30).fill({}) },
          ],
          apps: [{ items: new Array(20).fill({}) }],
          books: [{ items: new Array(15).fill({}) }],
          audio: [{ items: new Array(10).fill({}) }],
          practice: [{ items: new Array(5).fill({}) }],
        },
      };

      const iterations = 1000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        countLanguageResources(mockLanguage);
      }

      const duration = performance.now() - start;
      const avgDuration = duration / iterations;

      expect(avgDuration).toBeLessThan(1); // < 1ms per count
    });

    it('should count all resources (67 languages) in < 50ms', () => {
      // Create mock data for 67 languages
      const mockLanguageData = {};

      for (let i = 0; i < 67; i++) {
        mockLanguageData[`lang${i}`] = {
          resources: {
            courses: [{ items: new Array(10).fill({}) }],
            apps: [{ items: new Array(8).fill({}) }],
            books: [{ items: new Array(12).fill({}) }],
            audio: [{ items: new Array(6).fill({}) }],
            practice: [{ items: new Array(4).fill({}) }],
          },
        };
      }

      const start = performance.now();
      const counts = countAllResources(mockLanguageData);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50);
      expect(counts.courses).toBe(670); // 67 * 10
    });

    it('should handle large datasets efficiently', () => {
      // Stress test: 1000 items per category
      const largeLanguage = {
        resources: {
          courses: [{ items: new Array(1000).fill({}) }],
          apps: [{ items: new Array(1000).fill({}) }],
          books: [{ items: new Array(1000).fill({}) }],
          audio: [{ items: new Array(1000).fill({}) }],
          practice: [{ items: new Array(1000).fill({}) }],
        },
      };

      const start = performance.now();
      const counts = countLanguageResources(largeLanguage);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(10); // Should still be fast
      expect(counts.courses).toBe(1000);
    });
  });

  describe('Language Metadata Performance', () => {
    it('should load metadata for all 67 languages in < 10ms', () => {
      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        getLanguageMetadata();
      }

      const duration = performance.now() - start;
      const avgDuration = duration / iterations;

      expect(avgDuration).toBeLessThan(10);
    });

    it('should return metadata instantly (cached)', () => {
      // First call (may parse data)
      getLanguageMetadata();

      // Subsequent calls should be instant
      const start = performance.now();
      const languages = getLanguageMetadata();
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1);
      expect(languages.length).toBe(67);
    });
  });

  describe('Search Performance', () => {
    it('should search languages in < 5ms', () => {
      const queries = ['dutch', 'french', 'japanese', 'a', 'language'];

      queries.forEach((query) => {
        const start = performance.now();
        const results = searchLanguages(query);
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(5);
        expect(Array.isArray(results)).toBe(true);
      });
    });

    it('should handle long search queries efficiently', () => {
      const longQuery = 'a'.repeat(100);

      const start = performance.now();
      const results = searchLanguages(longQuery);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(10);
      expect(results).toEqual([]); // No matches expected
    });

    it('should search case-insensitively without performance penalty', () => {
      const lowercaseStart = performance.now();
      searchLanguages('dutch');
      const lowercaseDuration = performance.now() - lowercaseStart;

      const uppercaseStart = performance.now();
      searchLanguages('DUTCH');
      const uppercaseDuration = performance.now() - uppercaseStart;

      const mixedStart = performance.now();
      searchLanguages('DuTcH');
      const mixedDuration = performance.now() - mixedStart;

      // All should be similarly fast
      expect(lowercaseDuration).toBeLessThan(5);
      expect(uppercaseDuration).toBeLessThan(5);
      expect(mixedDuration).toBeLessThan(5);
    });
  });

  describe('DOM Manipulation Performance', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="languages-grid"></div>';
    });

    it('should render 67 language cards in < 100ms', () => {
      const grid = document.getElementById('languages-grid');
      const languages = getLanguageMetadata();

      const start = performance.now();

      languages.forEach((lang) => {
        const card = document.createElement('article');
        card.className = 'language-card';
        card.dataset.language = lang.code;
        card.innerHTML = `
          <h3>${lang.name}</h3>
          <p>${lang.nativeName}</p>
          <span>${lang.flag}</span>
        `;
        grid.appendChild(card);
      });

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(100);
      expect(grid.children.length).toBe(67);
    });

    it('should update DOM efficiently (batch vs individual)', () => {
      const grid = document.getElementById('languages-grid');
      const languages = getLanguageMetadata().slice(0, 20);

      // Individual updates
      const individualStart = performance.now();
      languages.forEach((lang) => {
        const card = document.createElement('div');
        card.textContent = lang.name;
        grid.appendChild(card);
      });
      const individualDuration = performance.now() - individualStart;

      grid.innerHTML = '';

      // Batch update
      const batchStart = performance.now();
      const fragment = document.createDocumentFragment();
      languages.forEach((lang) => {
        const card = document.createElement('div');
        card.textContent = lang.name;
        fragment.appendChild(card);
      });
      grid.appendChild(fragment);
      const batchDuration = performance.now() - batchStart;

      // Batch should be faster or similar
      expect(batchDuration).toBeLessThanOrEqual(individualDuration * 1.5);
    });
  });

  describe('Cache Performance', () => {
    it('should access cached language data instantly', () => {
      const loader = new LanguageLoader();

      // Populate cache
      loader.cache.set('dutch', { name: 'Dutch', resources: {} });
      loader.cache.set('french', { name: 'French', resources: {} });

      const start = performance.now();

      const dutchData = loader.cache.get('dutch');
      const frenchData = loader.cache.get('french');

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1); // Instant cache access
      expect(dutchData.name).toBe('Dutch');
      expect(frenchData.name).toBe('French');
    });

    it('should handle large cache efficiently', () => {
      const loader = new LanguageLoader();

      // Fill cache with 67 languages
      for (let i = 0; i < 67; i++) {
        loader.cache.set(`lang${i}`, {
          name: `Language ${i}`,
          resources: {},
        });
      }

      const start = performance.now();
      const stats = loader.getCacheStats();
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(5);
      expect(stats.loaded).toBe(67);
    });
  });

  describe('Memory Efficiency', () => {
    it('should not leak memory on repeated operations', () => {
      const initialMemory = performance.memory?.usedJSHeapSize || 0;

      // Perform operations
      for (let i = 0; i < 1000; i++) {
        getLanguageMetadata();
        searchLanguages('test');

        const mockData = {
          resources: {
            courses: [{ items: [{}] }],
            apps: [],
            books: [],
            audio: [],
            practice: [],
          },
        };
        countLanguageResources(mockData);
      }

      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be minimal (< 5MB for 1000 operations)
      if (performance.memory) {
        expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
      }
    });
  });

  describe('Throughput Benchmarks', () => {
    it('should process 10,000 resource counts per second', () => {
      const mockLanguage = {
        resources: {
          courses: [{ items: [{}, {}] }],
          apps: [{ items: [{}] }],
          books: [],
          audio: [],
          practice: [],
        },
      };

      const iterations = 10000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        countLanguageResources(mockLanguage);
      }

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1000); // < 1 second for 10k operations
      const throughput = iterations / (duration / 1000);
      expect(throughput).toBeGreaterThan(10000); // > 10k ops/sec
    });

    it('should search 1,000 times per second', () => {
      const iterations = 1000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        searchLanguages('test');
      }

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1000); // < 1 second
      const throughput = iterations / (duration / 1000);
      expect(throughput).toBeGreaterThan(1000);
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle typical homepage load in < 200ms', () => {
      const start = performance.now();

      // 1. Load metadata
      const languages = getLanguageMetadata();

      // 2. Render cards
      const grid = document.createElement('div');
      languages.forEach((lang) => {
        const card = document.createElement('div');
        card.textContent = lang.name;
        grid.appendChild(card);
      });

      // 3. Count resources (if data loaded)
      const mockData = {};
      for (let i = 0; i < 10; i++) {
        mockData[`lang${i}`] = {
          resources: {
            courses: [{ items: [{}] }],
            apps: [],
            books: [],
            audio: [],
            practice: [],
          },
        };
      }
      countAllResources(mockData);

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(200);
    });

    it('should handle search with filtering in < 50ms', () => {
      const start = performance.now();

      // 1. Search
      const results = searchLanguages('a');

      // 2. Filter results
      const filtered = results.filter((lang) => lang.speakers.includes('M'));

      // 3. Render
      const container = document.createElement('div');
      filtered.forEach((lang) => {
        const el = document.createElement('div');
        el.textContent = lang.name;
        container.appendChild(el);
      });

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50);
    });
  });
});
