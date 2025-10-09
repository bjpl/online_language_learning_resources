// ===================================
// Resource Counter Tests
// ===================================

import { describe, it, expect } from 'vitest';
import {
  countResourcesByType,
  countLanguageResources,
  countAllResources,
  isValidLanguageObject,
} from '../../assets/js/resource-counter.js';

describe('countResourcesByType()', () => {
  describe('Standard resource structure', () => {
    it('should count items in standard nested structure', () => {
      const coursesArray = [
        { name: 'Beginner', items: [{}, {}, {}] },
        { name: 'Intermediate', items: [{}, {}] },
        { name: 'Advanced', items: [{}] },
      ];

      const count = countResourcesByType(coursesArray, 'courses');
      expect(count).toBe(6); // 3 + 2 + 1
    });

    it('should return 0 for empty resource array', () => {
      const count = countResourcesByType([], 'courses');
      expect(count).toBe(0);
    });

    it('should return 0 for invalid input (not an array)', () => {
      expect(countResourcesByType(null, 'courses')).toBe(0);
      expect(countResourcesByType(undefined, 'courses')).toBe(0);
      expect(countResourcesByType({}, 'courses')).toBe(0);
      expect(countResourcesByType('invalid', 'courses')).toBe(0);
    });

    it('should handle mixed valid/invalid categories', () => {
      const mixedArray = [
        { name: 'Valid', items: [{}, {}] }, // 2 items
        { name: 'NoItems' }, // No items property - skip
        { items: null }, // Invalid items - skip
        { name: 'AnotherValid', items: [{}] }, // 1 item
        null, // Invalid category - skip
      ];

      const count = countResourcesByType(mixedArray, 'courses');
      expect(count).toBe(3); // 2 + 1
    });

    it('should ignore categories without items array', () => {
      const arrayWithoutItems = [
        { name: 'Category1' }, // No items
        { name: 'Category2', items: 'not-an-array' }, // Invalid items
      ];

      const count = countResourcesByType(arrayWithoutItems, 'books');
      expect(count).toBe(0);
    });
  });

  describe('Apps special case', () => {
    it('should count direct app items (special structure)', () => {
      const appsArray = [
        { name: 'Duolingo', url: 'https://...' }, // Direct app +1
        { name: 'Memrise', url: 'https://...' }, // Direct app +1
        { items: [{}, {}] }, // Standard nested +2
      ];

      const count = countResourcesByType(appsArray, 'apps');
      expect(count).toBe(4); // 1 + 1 + 2
    });

    it('should handle apps with only direct items (no nested)', () => {
      const directApps = [
        { name: 'App1' },
        { name: 'App2' },
        { name: 'App3' },
      ];

      const count = countResourcesByType(directApps, 'apps');
      expect(count).toBe(3);
    });

    it('should NOT count direct items for non-apps resources', () => {
      const booksArray = [
        { name: 'BookTitle' }, // Should NOT count for books (only apps)
        { items: [{}] }, // Should count
      ];

      const count = countResourcesByType(booksArray, 'books');
      expect(count).toBe(1); // Only the nested one
    });

    it('should handle mix of direct and nested apps', () => {
      const mixedApps = [
        { items: [{}, {}, {}] }, // Nested: 3
        { name: 'DirectApp1' }, // Direct: 1
        { items: [{}] }, // Nested: 1
        { name: 'DirectApp2' }, // Direct: 1
      ];

      const count = countResourcesByType(mixedApps, 'apps');
      expect(count).toBe(6); // 3 + 1 + 1 + 1
    });
  });

  describe('Edge cases', () => {
    it('should handle empty items arrays', () => {
      const emptyItems = [
        { name: 'Empty1', items: [] },
        { name: 'Empty2', items: [] },
      ];

      const count = countResourcesByType(emptyItems, 'audio');
      expect(count).toBe(0);
    });

    it('should handle single category with many items', () => {
      const largeCategory = [{ name: 'Huge', items: new Array(100).fill({}) }];

      const count = countResourcesByType(largeCategory, 'practice');
      expect(count).toBe(100);
    });
  });
});

describe('countLanguageResources()', () => {
  it('should count all resource types for a language', () => {
    const language = {
      name: 'Dutch',
      resources: {
        courses: [{ items: [{}, {}] }],
        apps: [{ items: [{}] }],
        books: [{ items: [{}, {}, {}] }],
        audio: [{ items: [{}] }],
        practice: [],
      },
    };

    const counts = countLanguageResources(language);

    expect(counts).toEqual({
      courses: 2,
      apps: 1,
      books: 3,
      audio: 1,
      practice: 0,
    });
  });

  it('should return zero counts for language without resources', () => {
    const languageNoResources = {
      name: 'Test Language',
    };

    const counts = countLanguageResources(languageNoResources);

    expect(counts).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });
  });

  it('should handle language with partial resources', () => {
    const partialLanguage = {
      resources: {
        courses: [{ items: [{}, {}, {}] }],
        // No apps
        books: [{ items: [{}] }],
        // No audio
        // No practice
      },
    };

    const counts = countLanguageResources(partialLanguage);

    expect(counts.courses).toBe(3);
    expect(counts.books).toBe(1);
    expect(counts.apps).toBe(0);
    expect(counts.audio).toBe(0);
    expect(counts.practice).toBe(0);
  });

  it('should handle apps in languageObj.apps (legacy structure)', () => {
    const languageWithLegacyApps = {
      resources: {
        courses: [],
        books: [],
        audio: [],
        practice: [],
      },
      apps: [
        { name: 'DirectApp1' },
        { name: 'DirectApp2' },
      ],
    };

    const counts = countLanguageResources(languageWithLegacyApps);
    expect(counts.apps).toBe(2);
  });

  it('should prefer resources.apps over languageObj.apps', () => {
    const languageWithBothApps = {
      resources: {
        apps: [{ items: [{}, {}, {}] }], // Should use this (3 items)
      },
      apps: [{ name: 'LegacyApp' }], // Should ignore this
    };

    const counts = countLanguageResources(languageWithBothApps);
    expect(counts.apps).toBe(3); // Uses resources.apps
  });

  it('should return zero counts for null/undefined language', () => {
    expect(countLanguageResources(null)).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });

    expect(countLanguageResources(undefined)).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });
  });
});

describe('countAllResources()', () => {
  it('should count resources across multiple languages', () => {
    const languageData = {
      dutch: {
        resources: {
          courses: [{ items: [{}, {}] }],
          apps: [{ items: [{}] }],
          books: [],
          audio: [{ items: [{}] }],
          practice: [],
        },
      },
      french: {
        resources: {
          courses: [{ items: [{}] }],
          apps: [],
          books: [{ items: [{}, {}, {}] }],
          audio: [],
          practice: [{ items: [{}] }],
        },
      },
      japanese: {
        resources: {
          courses: [],
          apps: [{ name: 'DirectApp' }],
          books: [],
          audio: [{ items: [{}, {}] }],
          practice: [],
        },
      },
    };

    const totalCounts = countAllResources(languageData);

    expect(totalCounts).toEqual({
      courses: 3, // 2 + 1 + 0
      apps: 2, // 1 + 0 + 1
      books: 3, // 0 + 3 + 0
      audio: 3, // 1 + 0 + 2
      practice: 1, // 0 + 1 + 0
    });
  });

  it('should return zero counts for empty language data object', () => {
    const counts = countAllResources({});
    expect(counts).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });
  });

  it('should return zero counts for null/undefined input', () => {
    expect(countAllResources(null)).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });

    expect(countAllResources(undefined)).toEqual({
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0,
    });
  });

  it('should skip invalid language entries', () => {
    const mixedData = {
      dutch: {
        resources: {
          courses: [{ items: [{}, {}] }],
        },
      },
      invalidLanguage: null, // Should skip
      anotherInvalid: 'string', // Should skip
      french: {
        resources: {
          books: [{ items: [{}] }],
        },
      },
    };

    const counts = countAllResources(mixedData);

    expect(counts.courses).toBe(2); // Only from dutch
    expect(counts.books).toBe(1); // Only from french
  });

  it('should handle large dataset (67 languages)', () => {
    // Simulate real scenario with 67 languages
    const manyLanguages = {};
    for (let i = 0; i < 67; i++) {
      manyLanguages[`lang${i}`] = {
        resources: {
          courses: [{ items: [{}] }], // 1 course each
          apps: [],
          books: [],
          audio: [],
          practice: [],
        },
      };
    }

    const counts = countAllResources(manyLanguages);
    expect(counts.courses).toBe(67);
  });
});

describe('isValidLanguageObject()', () => {
  it('should return true for valid language with resources', () => {
    const validLang = {
      name: 'Dutch',
      resources: {
        courses: [],
      },
    };

    expect(isValidLanguageObject(validLang)).toBe(true);
  });

  it('should return true for language with legacy apps', () => {
    const legacyLang = {
      name: 'French',
      apps: [{ name: 'App' }],
    };

    expect(isValidLanguageObject(legacyLang)).toBe(true);
  });

  it('should return false for null/undefined', () => {
    expect(isValidLanguageObject(null)).toBe(false);
    expect(isValidLanguageObject(undefined)).toBe(false);
  });

  it('should return false for non-object', () => {
    expect(isValidLanguageObject('string')).toBe(false);
    expect(isValidLanguageObject(123)).toBe(false);
    expect(isValidLanguageObject([])).toBe(false);
  });

  it('should return false for object without resources or apps', () => {
    const invalidLang = {
      name: 'Test',
      otherProperty: 'value',
    };

    expect(isValidLanguageObject(invalidLang)).toBe(false);
  });
});
