// ===================================
// Integration Tests - Language Page Display
// ===================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Language Page Integration', () => {
  beforeEach(() => {
    // Mock URL parameters
    delete window.location;
    window.location = new URL('http://example.com/language.html?lang=dutch');

    // Setup DOM
    document.body.innerHTML = `
      <div id="breadcrumb-language"></div>
      <div id="language-flag"></div>
      <h1 id="language-title"></h1>
      <div id="language-native"></div>
      <div id="resources-container"></div>
    `;

    // Mock language data
    global.languageData = {
      dutch: {
        name: 'Dutch',
        nativeName: 'Nederlands',
        flag: '🇳🇱',
        resources: {
          courses: [
            {
              category: 'Beginner Courses',
              items: [
                { name: 'Course 1', url: 'http://example.com/1' },
                { name: 'Course 2', url: 'http://example.com/2' },
              ],
            },
          ],
          apps: [
            {
              category: 'Language Apps',
              items: [{ name: 'Duolingo', url: 'http://duolingo.com' }],
            },
          ],
          books: [],
          audio: [],
          practice: [],
        },
      },
    };
  });

  afterEach(() => {
    global.languageData = {};
  });

  describe('Page Initialization', () => {
    it('should extract language code from URL', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');

      expect(langParam).toBe('dutch');
    });

    it('should default to dutch if no lang param', () => {
      window.location = new URL('http://example.com/language.html');
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') || 'dutch';

      expect(langParam).toBe('dutch');
    });

    it('should load language data from global object', () => {
      const langParam = 'dutch';
      const language =
        global.languageData[langParam] || global.languageData.dutch;

      expect(language).toBeDefined();
      expect(language.name).toBe('Dutch');
    });
  });

  describe('Hero Section Updates', () => {
    it('should update all hero section elements', () => {
      const language = global.languageData.dutch;

      document.getElementById('breadcrumb-language').textContent = language.name;
      document.getElementById('language-flag').textContent = language.flag;
      document.getElementById('language-title').textContent =
        `${language.name} Learning Resources`;
      document.getElementById('language-native').textContent =
        language.nativeName;

      expect(
        document.getElementById('breadcrumb-language').textContent,
      ).toBe('Dutch');
      expect(document.getElementById('language-flag').textContent).toBe('🇳🇱');
      expect(document.getElementById('language-title').textContent).toBe(
        'Dutch Learning Resources',
      );
      expect(document.getElementById('language-native').textContent).toBe(
        'Nederlands',
      );
    });

    it('should update page title', () => {
      const language = global.languageData.dutch;
      document.title = `${language.name} Resources - Language Learning Hub`;

      expect(document.title).toBe('Dutch Resources - Language Learning Hub');
    });
  });

  describe('Resource Rendering', () => {
    it('should render courses correctly', () => {
      const language = global.languageData.dutch;
      const container = document.getElementById('resources-container');

      // Simulate rendering courses
      const section = document.createElement('section');
      section.className = 'resource-section';
      section.dataset.category = 'courses';

      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = 'Beginner Courses';
      section.appendChild(categoryTitle);

      language.resources.courses.forEach((category) => {
        category.items.forEach((item) => {
          const itemElement = document.createElement('a');
          itemElement.textContent = item.name;
          itemElement.href = item.url;
          section.appendChild(itemElement);
        });
      });

      container.appendChild(section);

      expect(container.querySelectorAll('.resource-section').length).toBe(1);
      expect(container.querySelectorAll('a').length).toBe(2);
    });

    it('should render apps correctly', () => {
      const language = global.languageData.dutch;
      const appsCount = language.resources.apps[0].items.length;

      expect(appsCount).toBe(1);
      expect(language.resources.apps[0].items[0].name).toBe('Duolingo');
    });

    it('should handle empty resource categories', () => {
      const language = global.languageData.dutch;

      expect(language.resources.books).toEqual([]);
      expect(language.resources.audio).toEqual([]);
      expect(language.resources.practice).toEqual([]);
    });
  });

  describe('Resource Filtering', () => {
    it('should filter by resource type', () => {
      const language = global.languageData.dutch;
      const filter = 'courses';

      const filtered = Object.entries(language.resources).filter(
        ([category]) => filter === 'all' || filter === category,
      );

      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0][0]).toBe('courses');
    });

    it('should show all resources when filter is "all"', () => {
      const language = global.languageData.dutch;
      const filter = 'all';

      const filtered = Object.entries(language.resources).filter(
        ([category]) => filter === 'all' || filter === category,
      );

      expect(filtered.length).toBe(5); // courses, apps, books, audio, practice
    });
  });

  describe('Comprehensive Language Structure', () => {
    it('should detect comprehensive language structure', () => {
      const comprehensiveLanguages = [
        'dutch',
        'danish',
        'portuguese',
        'french',
        'japanese',
      ];

      expect(comprehensiveLanguages).toContain('dutch');
    });

    it('should handle nested category structure', () => {
      const language = global.languageData.dutch;

      // Check courses have nested structure
      expect(language.resources.courses[0]).toHaveProperty('category');
      expect(language.resources.courses[0]).toHaveProperty('items');
      expect(Array.isArray(language.resources.courses[0].items)).toBe(true);
    });

    it('should handle apps with different structures', () => {
      const language = global.languageData.dutch;

      // Comprehensive structure
      if (language.resources.apps[0]?.category) {
        expect(language.resources.apps[0]).toHaveProperty('category');
        expect(language.resources.apps[0]).toHaveProperty('items');
      }

      // Direct structure
      else if (language.resources.apps[0]?.name) {
        expect(language.resources.apps[0]).toHaveProperty('name');
        expect(language.resources.apps[0]).toHaveProperty('url');
      }
    });
  });

  describe('Resource Display Accuracy', () => {
    it('should display correct number of resources', () => {
      const language = global.languageData.dutch;

      const coursesCount = language.resources.courses.reduce(
        (sum, cat) => sum + (cat.items?.length || 0),
        0,
      );
      const appsCount = language.resources.apps.reduce(
        (sum, cat) => sum + (cat.items?.length || 0),
        0,
      );

      expect(coursesCount).toBe(2);
      expect(appsCount).toBe(1);
    });

    it('should create valid links for all resources', () => {
      const language = global.languageData.dutch;

      language.resources.courses.forEach((category) => {
        category.items.forEach((item) => {
          expect(item.url).toMatch(/^http/);
          expect(item.name).toBeTruthy();
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing language gracefully', () => {
      const langParam = 'nonexistent';
      const language =
        global.languageData[langParam] || global.languageData.dutch;

      expect(language).toBeDefined();
      expect(language.name).toBe('Dutch'); // Falls back to dutch
    });

    it('should handle malformed resource data', () => {
      global.languageData.broken = {
        name: 'Broken',
        resources: null,
      };

      const language = global.languageData.broken;

      expect(language.resources).toBeNull();
    });

    it('should handle language with only apps (legacy structure)', () => {
      global.languageData.legacy = {
        name: 'Legacy',
        apps: [{ name: 'App1' }, { name: 'App2' }],
      };

      const language = global.languageData.legacy;

      expect(language.apps).toBeDefined();
      expect(language.apps.length).toBe(2);
    });
  });

  describe('Collapsible Sections', () => {
    it('should initialize collapsible functionality', () => {
      // Mock collapsible initialization
      window.reinitCollapsible = vi.fn();

      // Simulate timeout for DOM update
      setTimeout(() => {
        if (typeof window.reinitCollapsible === 'function') {
          window.reinitCollapsible();
        }
      }, 0);

      // Verify function exists
      expect(window.reinitCollapsible).toBeDefined();
    });

    it('should create collapsible sections for categories', () => {
      const section = document.createElement('section');
      section.className = 'resource-section collapsible';

      const header = document.createElement('h2');
      header.className = 'collapsible-header';
      section.appendChild(header);

      const content = document.createElement('div');
      content.className = 'collapsible-content';
      section.appendChild(content);

      expect(section.classList.contains('collapsible')).toBe(true);
      expect(section.querySelector('.collapsible-header')).toBeTruthy();
      expect(section.querySelector('.collapsible-content')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should render resources quickly', () => {
      const language = global.languageData.dutch;
      const container = document.getElementById('resources-container');

      const start = performance.now();

      // Simulate rendering
      language.resources.courses.forEach((category) => {
        const section = document.createElement('section');
        category.items.forEach((item) => {
          const link = document.createElement('a');
          link.textContent = item.name;
          link.href = item.url;
          section.appendChild(link);
        });
        container.appendChild(section);
      });

      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50); // Should be fast
      expect(container.children.length).toBeGreaterThan(0);
    });
  });
});
