// ===================================
// Language Loader - Dynamic Import System
// ===================================

/**
 * CONCEPT: Lazy Loading Pattern
 * WHY: Load language data on-demand instead of all upfront
 * BENEFIT: 90% faster initial page load
 *
 * PATTERN: Module Cache + Dynamic Imports
 * Each language is loaded once and cached in memory
 */

class LanguageLoader {
  constructor() {
    // Cache for loaded language modules
    this.cache = new Map();

    // Loading states for showing spinners
    this.loadingStates = new Map();

    // Map of language codes to file names
    this.languageMap = {
      afrikaans: 'afrikaans-data',
      arabic: 'arabic-data',
      bengali: 'bengali-data',
      bulgarian: 'bulgarian-data',
      burmese: 'burmese-data',
      cebuano: 'cebuano-data',
      chinese: 'chinese-data',
      cree: 'cree-data',
      croatian: 'croatian-data',
      czech: 'czech-data',
      danish: 'danish-data',
      dari: 'dari-data',
      dutch: 'dutch-data',
      estonian: 'estonian-data',
      finnish: 'finnish-data',
      flemish: 'flemish-data',
      french: 'french-data',
      german: 'german-data',
      greek: 'greek-data',
      guarani: 'guarani-data',
      gujarati: 'gujarati-data',
      hausa: 'hausa-data',
      hebrew: 'hebrew-data',
      hindi: 'hindi-data',
      hmong: 'hmong-data',
      hungarian: 'hungarian-data',
      indonesian: 'indonesian-data',
      inuktitut: 'inuktitut-data',
      irish: 'irish-data',
      italian: 'italian-data',
      japanese: 'japanese-data',
      kannada: 'kannada-data',
      kazakh: 'kazakh-data',
      korean: 'korean-data',
      lao: 'lao-data',
      latvian: 'latvian-data',
      lithuanian: 'lithuanian-data',
      malay: 'malay-data',
      marathi: 'marathi-data',
      mongolian: 'mongolian-data',
      nahuatl: 'nahuatl-data',
      navajo: 'navajo-data',
      nepali: 'nepali-data',
      pashto: 'pashto-data',
      persian: 'persian-data',
      polish: 'polish-data',
      portuguese: 'portuguese-data',
      punjabi: 'punjabi-data',
      quechua: 'quechua-data',
      romanian: 'romanian-data',
      russian: 'russian-data',
      serbian: 'serbian-data',
      signlanguage: 'sign-language-data',
      slovak: 'slovak-data',
      spanish: 'spanish-data',
      swahili: 'swahili-data',
      swedish: 'swedish-data',
      tagalog: 'tagalog-data',
      tamil: 'tamil-data',
      telugu: 'telugu-data',
      thai: 'thai-data',
      ukrainian: 'ukrainian-data',
      urdu: 'urdu-data',
      vietnamese: 'vietnamese-data',
      welsh: 'welsh-data',
      wolof: 'wolof-data',
      yoruba: 'yoruba-data',
    };
  }

  /**
   * Load a language module dynamically
   * @param {string} languageCode - The language code (e.g., 'dutch', 'french')
   * @returns {Promise<Object>} - The language data object
   */
  async loadLanguage(languageCode) {
    // Check cache first
    if (this.cache.has(languageCode)) {
      console.log(`[LanguageLoader] Using cached data for: ${languageCode}`);
      return this.cache.get(languageCode);
    }

    // Check if already loading
    if (this.loadingStates.has(languageCode)) {
      console.log(`[LanguageLoader] Already loading: ${languageCode}`);
      return this.loadingStates.get(languageCode);
    }

    // Get the file name
    const fileName = this.languageMap[languageCode];
    if (!fileName) {
      console.error(`[LanguageLoader] Unknown language code: ${languageCode}`);
      return null;
    }

    console.log(`[LanguageLoader] Loading: ${languageCode} from ${fileName}.js`);

    // Create loading promise
    const loadingPromise = this._importLanguageModule(fileName, languageCode);

    // Store in loading states
    this.loadingStates.set(languageCode, loadingPromise);

    try {
      const data = await loadingPromise;

      // Cache the result
      this.cache.set(languageCode, data);

      // Remove from loading states
      this.loadingStates.delete(languageCode);

      console.log(`[LanguageLoader] Successfully loaded: ${languageCode}`);
      return data;
    } catch (error) {
      console.error(`[LanguageLoader] Failed to load ${languageCode}:`, error);
      this.loadingStates.delete(languageCode);
      throw error;
    }
  }

  /**
   * Import the language module using dynamic import
   * @private
   */
  async _importLanguageModule(fileName, languageCode) {
    try {
      // Dynamic import - Vite will code-split this automatically
      const module = await import(`./${fileName}.js`);

      // The module exports an object like { dutchResources, default: dutchResources }
      // Extract the actual data
      const resourceKey = `${languageCode}Resources`;
      const data = module[resourceKey] || module.default || module;

      return data;
    } catch (error) {
      console.error(`[LanguageLoader] Import failed for ${fileName}:`, error);
      throw new Error(`Failed to load language module: ${fileName}`);
    }
  }

  /**
   * Preload multiple languages
   * @param {string[]} languageCodes - Array of language codes to preload
   */
  async preloadLanguages(languageCodes) {
    console.log(`[LanguageLoader] Preloading ${languageCodes.length} languages`);

    const promises = languageCodes.map((code) => this.loadLanguage(code));

    try {
      await Promise.all(promises);
      console.log('[LanguageLoader] Preloading complete');
    } catch (error) {
      console.error('[LanguageLoader] Preloading failed:', error);
    }
  }

  /**
   * Check if a language is loaded
   * @param {string} languageCode
   * @returns {boolean}
   */
  isLoaded(languageCode) {
    return this.cache.has(languageCode);
  }

  /**
   * Check if a language is currently loading
   * @param {string} languageCode
   * @returns {boolean}
   */
  isLoading(languageCode) {
    return this.loadingStates.has(languageCode);
  }

  /**
   * Clear cache (useful for testing/debugging)
   */
  clearCache() {
    this.cache.clear();
    console.log('[LanguageLoader] Cache cleared');
  }

  /**
   * Get all loaded languages
   * @returns {string[]}
   */
  getLoadedLanguages() {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache statistics
   * @returns {Object}
   */
  getCacheStats() {
    return {
      loaded: this.cache.size,
      loading: this.loadingStates.size,
      total: Object.keys(this.languageMap).length,
      languages: this.getLoadedLanguages(),
    };
  }
}

// Export singleton instance
export const languageLoader = new LanguageLoader();

// Also export the class for testing
export { LanguageLoader };
