// ===================================
// Resource Counter - Pure Functions for Counting Language Resources
// ===================================

/**
 * CONCEPT: Pure Function Pattern
 * WHY: Testable, reusable, no side effects
 * BENEFIT: Can unit test without DOM or global state
 *
 * PATTERN: Single Responsibility Principle
 * Each function does ONE thing well
 */

/**
 * Count resources of a specific type from a language's resource array
 *
 * @param {Array} resourceArray - Array of resource categories (e.g., lang.resources.courses)
 * @param {string} resourceType - Type of resource ('courses', 'apps', 'books', etc.)
 * @returns {number} - Total count of items
 *
 * @example
 * const coursesArray = [
 *   { name: "Beginner", items: [{}, {}] },
 *   { name: "Advanced", items: [{}, {}, {}] }
 * ];
 * countResourcesByType(coursesArray, 'courses'); // Returns 5
 */
export function countResourcesByType(resourceArray, resourceType) {
  // Validate inputs
  if (!Array.isArray(resourceArray)) {
    return 0;
  }

  let count = 0;

  resourceArray.forEach((category) => {
    // Skip null/undefined categories
    if (!category || typeof category !== 'object') {
      return;
    }

    // Standard structure: category.items is an array
    if (category.items && Array.isArray(category.items)) {
      count += category.items.length;
    }
    // Special case for apps: Some languages have direct app items without nested structure
    // Example: { name: "Duolingo", url: "..." } instead of { items: [...] }
    else if (resourceType === 'apps' && category.name) {
      count += 1;
    }
  });

  return count;
}

/**
 * Count all resources from a single language object
 *
 * @param {Object} languageObj - Language data object with resources property
 * @returns {Object} - Counts object: { courses, apps, books, audio, practice }
 *
 * @example
 * const dutchData = {
 *   name: "Dutch",
 *   resources: {
 *     courses: [{ items: [{}, {}] }],
 *     apps: [{ items: [{}] }],
 *     books: [],
 *     audio: [{ items: [{}, {}, {}] }],
 *     practice: []
 *   }
 * };
 * countLanguageResources(dutchData);
 * // Returns { courses: 2, apps: 1, books: 0, audio: 3, practice: 0 }
 */
export function countLanguageResources(languageObj) {
  // Initialize counts
  const counts = {
    courses: 0,
    apps: 0,
    books: 0,
    audio: 0,
    practice: 0,
  };

  // Return empty counts if no resources
  if (!languageObj || !languageObj.resources) {
    return counts;
  }

  const { resources } = languageObj;

  // Count each resource type
  counts.courses = countResourcesByType(resources.courses, 'courses');
  counts.books = countResourcesByType(resources.books, 'books');
  counts.audio = countResourcesByType(resources.audio, 'audio');
  counts.practice = countResourcesByType(resources.practice, 'practice');

  // Apps: Special case - can be in resources.apps OR languageObj.apps
  const appsArray = resources.apps || languageObj.apps;
  counts.apps = countResourcesByType(appsArray, 'apps');

  return counts;
}

/**
 * Count all resources across all languages in a languageData object
 *
 * @param {Object} languageDataObj - Global languageData object with all languages
 * @returns {Object} - Total counts: { courses, apps, books, audio, practice }
 *
 * @example
 * const languageData = {
 *   dutch: { resources: { courses: [...], apps: [...] } },
 *   french: { resources: { courses: [...], books: [...] } },
 *   japanese: { resources: { audio: [...] } }
 * };
 * countAllResources(languageData);
 * // Returns { courses: 25, apps: 12, books: 8, audio: 15, practice: 3 }
 */
export function countAllResources(languageDataObj) {
  // Initialize total counts
  const totalCounts = {
    courses: 0,
    apps: 0,
    books: 0,
    audio: 0,
    practice: 0,
  };

  // Return empty counts if no data
  if (!languageDataObj || typeof languageDataObj !== 'object') {
    return totalCounts;
  }

  // Get all language keys
  const languageKeys = Object.keys(languageDataObj);

  // Count resources for each language
  languageKeys.forEach((langKey) => {
    const language = languageDataObj[langKey];

    // Skip if language is invalid
    if (!language || typeof language !== 'object') {
      return;
    }

    // Get counts for this language
    const langCounts = countLanguageResources(language);

    // Add to totals
    totalCounts.courses += langCounts.courses;
    totalCounts.apps += langCounts.apps;
    totalCounts.books += langCounts.books;
    totalCounts.audio += langCounts.audio;
    totalCounts.practice += langCounts.practice;
  });

  return totalCounts;
}

/**
 * Validation helper: Check if a language object has valid structure
 *
 * @param {Object} languageObj - Language data object
 * @returns {boolean} - True if valid structure
 */
export function isValidLanguageObject(languageObj) {
  return !!(
    languageObj &&
    typeof languageObj === 'object' &&
    (languageObj.resources || languageObj.apps)
  );
}
