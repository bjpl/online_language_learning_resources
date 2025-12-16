// ===================================
// Language Loader Tests
// ===================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageLoader } from '../../assets/js/language-loader.js';

describe('LanguageLoader', () => {
  let loader;

  beforeEach(() => {
    // Create fresh instance for each test
    loader = new LanguageLoader();
  });

  describe('Constructor', () => {
    it('should initialize with empty cache', () => {
      expect(loader.cache.size).toBe(0);
      expect(loader.loadingStates.size).toBe(0);
    });

    it('should have language map with 67 languages', () => {
      const languageCount = Object.keys(loader.languageMap).length;
      expect(languageCount).toBe(67);
    });

    it('should map language codes to file names correctly', () => {
      expect(loader.languageMap.dutch).toBe('dutch-data');
      expect(loader.languageMap.french).toBe('french-data');
      expect(loader.languageMap.japanese).toBe('japanese-data');
    });
  });

  describe('isLoaded()', () => {
    it('should return false for unloaded language', () => {
      expect(loader.isLoaded('dutch')).toBe(false);
    });

    it('should return true after caching a language', () => {
      // Manually populate cache (simulating successful load)
      loader.cache.set('dutch', { name: 'Dutch', resources: {} });
      expect(loader.isLoaded('dutch')).toBe(true);
    });
  });

  describe('isLoading()', () => {
    it('should return false when not loading', () => {
      expect(loader.isLoading('dutch')).toBe(false);
    });

    it('should return true when loading state exists', () => {
      // Simulate loading state
      loader.loadingStates.set('dutch', Promise.resolve({}));
      expect(loader.isLoading('dutch')).toBe(true);
    });
  });

  describe('clearCache()', () => {
    it('should clear all cached languages', () => {
      // Add some cached data
      loader.cache.set('dutch', {});
      loader.cache.set('french', {});
      expect(loader.cache.size).toBe(2);

      // Clear cache
      loader.clearCache();
      expect(loader.cache.size).toBe(0);
    });
  });

  describe('getLoadedLanguages()', () => {
    it('should return empty array when nothing loaded', () => {
      expect(loader.getLoadedLanguages()).toEqual([]);
    });

    it('should return array of loaded language codes', () => {
      loader.cache.set('dutch', {});
      loader.cache.set('french', {});
      loader.cache.set('japanese', {});

      const loaded = loader.getLoadedLanguages();
      expect(loaded).toHaveLength(3);
      expect(loaded).toContain('dutch');
      expect(loaded).toContain('french');
      expect(loaded).toContain('japanese');
    });
  });

  describe('getCacheStats()', () => {
    it('should return correct statistics', () => {
      loader.cache.set('dutch', {});
      loader.cache.set('french', {});
      loader.loadingStates.set('japanese', Promise.resolve({}));

      const stats = loader.getCacheStats();

      expect(stats.loaded).toBe(2);
      expect(stats.loading).toBe(1);
      expect(stats.total).toBe(67);
      expect(stats.languages).toHaveLength(2);
      expect(stats.languages).toContain('dutch');
      expect(stats.languages).toContain('french');
    });

    it('should show all zeros when nothing loaded', () => {
      const stats = loader.getCacheStats();

      expect(stats.loaded).toBe(0);
      expect(stats.loading).toBe(0);
      expect(stats.total).toBe(67);
      expect(stats.languages).toEqual([]);
    });
  });

  describe('loadLanguage() - caching behavior', () => {
    it('should return null for unknown language code', async () => {
      // Mock console.error to suppress output
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await loader.loadLanguage('nonexistent');

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[LanguageLoader] Unknown language code: nonexistent',
      );

      consoleErrorSpy.mockRestore();
    });

    it('should cache loaded language data', async () => {
      // Mock the private import method to avoid actual file loading
      const mockData = {
        name: 'Dutch',
        resources: { courses: [], apps: [] },
      };

      vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);

      // Load language
      const result = await loader.loadLanguage('dutch');

      // Verify result
      expect(result).toEqual(mockData);

      // Verify it's cached
      expect(loader.isLoaded('dutch')).toBe(true);
      expect(loader.cache.get('dutch')).toEqual(mockData);
    });

    it('should return cached data on subsequent calls', async () => {
      const mockData = { name: 'Dutch' };
      const importSpy = vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);

      // First call
      await loader.loadLanguage('dutch');
      expect(importSpy).toHaveBeenCalledTimes(1);

      // Second call (should use cache)
      const result = await loader.loadLanguage('dutch');
      expect(importSpy).toHaveBeenCalledTimes(1); // NOT called again
      expect(result).toEqual(mockData);
    });

    it('should handle loading errors gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('Import failed');

      vi.spyOn(loader, '_importLanguageModule').mockRejectedValue(error);

      // Expect promise to reject
      await expect(loader.loadLanguage('dutch')).rejects.toThrow();

      // Verify error logging
      expect(consoleErrorSpy).toHaveBeenCalled();

      // Verify not cached
      expect(loader.isLoaded('dutch')).toBe(false);

      consoleErrorSpy.mockRestore();
    });

    it('should clean up loading state after successful load', async () => {
      const mockData = { name: 'Dutch' };
      vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);

      await loader.loadLanguage('dutch');

      // Loading state should be cleared
      expect(loader.isLoading('dutch')).toBe(false);
    });

    it('should clean up loading state after failed load', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(loader, '_importLanguageModule').mockRejectedValue(new Error('Failed'));

      try {
        await loader.loadLanguage('dutch');
      } catch (e) {
        // Expected to throw
      }

      // Loading state should be cleared even on error
      expect(loader.isLoading('dutch')).toBe(false);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('preloadLanguages()', () => {
    it('should load multiple languages in parallel', async () => {
      const mockData = { name: 'Test' };
      const importSpy = vi.spyOn(loader, '_importLanguageModule').mockResolvedValue(mockData);

      await loader.preloadLanguages(['dutch', 'french', 'japanese']);

      // All three should be loaded
      expect(loader.isLoaded('dutch')).toBe(true);
      expect(loader.isLoaded('french')).toBe(true);
      expect(loader.isLoaded('japanese')).toBe(true);

      // Import called 3 times
      expect(importSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle errors in batch preloading', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock: first succeeds, second fails, third succeeds
      vi.spyOn(loader, '_importLanguageModule')
        .mockResolvedValueOnce({ name: 'Dutch' })
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValueOnce({ name: 'Japanese' });

      // Should not throw (catches errors internally)
      await loader.preloadLanguages(['dutch', 'french', 'japanese']);

      // Dutch and Japanese should be loaded, French should not
      expect(loader.isLoaded('dutch')).toBe(true);
      expect(loader.isLoaded('french')).toBe(false);
      expect(loader.isLoaded('japanese')).toBe(true);

      consoleErrorSpy.mockRestore();
    });

    it('should work with empty array', async () => {
      const importSpy = vi.spyOn(loader, '_importLanguageModule');

      await loader.preloadLanguages([]);

      expect(importSpy).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle concurrent loads of same language', async () => {
      const mockData = { name: 'Dutch' };
      let importCallCount = 0;

      // Slow import to simulate network delay
      vi.spyOn(loader, '_importLanguageModule').mockImplementation(async () => {
        importCallCount++;
        await new Promise((resolve) => setTimeout(resolve, 100));
        return mockData;
      });

      // Trigger two concurrent loads
      const promise1 = loader.loadLanguage('dutch');
      const promise2 = loader.loadLanguage('dutch');

      const [result1, result2] = await Promise.all([promise1, promise2]);

      // Both should get the same data
      expect(result1).toEqual(mockData);
      expect(result2).toEqual(mockData);

      // Import should only be called ONCE (deduplication)
      expect(importCallCount).toBe(1);
    });

    it('should handle case-sensitive language codes', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // 'Dutch' (capital D) vs 'dutch' (lowercase)
      const result = await loader.loadLanguage('Dutch');

      // Should fail because languageMap keys are lowercase
      expect(result).toBeNull();

      consoleErrorSpy.mockRestore();
    });
  });
});
