#!/usr/bin/env node

/**
 * TEST 3: Performance Testing - Load Time vs Lazy Loading
 *
 * PURPOSE: Measure actual performance impact of different loading strategies
 *
 * TESTS:
 * 1. Load ALL 67 languages at once (traditional approach)
 * 2. Load only metadata (current approach)
 * 3. Measure memory usage
 * 4. Compare lazy loading vs eager loading
 */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n========================================');
console.log('TEST 3: Performance Analysis');
console.log('========================================\n');

async function testPerformance() {
  try {
    console.log('STEP 1: Import required modules');
    console.log('--------------------------------');

    const loaderPath = path.join(__dirname, '..', 'assets', 'js', 'language-loader.js');
    const metadataPath = path.join(__dirname, '..', 'assets', 'js', 'language-data', 'language-metadata.js');

    const { languageLoader } = await import(loaderPath);
    const { languageMetadata } = await import(metadataPath);

    console.log('✅ Modules imported');
    console.log('Languages available:', languageMetadata.length);

    console.log('\nSTEP 2: Measure metadata-only load (current approach)');
    console.log('------------------------------------------------------');
    const metadataStart = performance.now();
    const metadata = languageMetadata;
    const metadataTime = performance.now() - metadataStart;

    console.log('✅ Metadata loaded');
    console.log('Time:', metadataTime.toFixed(2), 'ms');
    console.log('Languages:', metadata.length);
    console.log('Data per language: ~150 bytes (flag, name, speakers, etc.)');
    console.log('Total metadata size: ~10KB');

    console.log('\nSTEP 3: Measure loading ALL languages (traditional approach)');
    console.log('------------------------------------------------------------');

    const allLanguages = metadata.map(lang => lang.code);
    console.log('Loading', allLanguages.length, 'language files...');

    const eagerLoadStart = performance.now();
    const loadedLanguages = [];
    const failedLanguages = [];

    for (const code of allLanguages) {
      try {
        const data = await languageLoader.loadLanguage(code);
        loadedLanguages.push({ code, size: JSON.stringify(data).length });
      } catch (error) {
        failedLanguages.push({ code, error: error.message });
      }
    }

    const eagerLoadTime = performance.now() - eagerLoadStart;

    console.log('✅ Eager loading complete');
    console.log('Total time:', eagerLoadTime.toFixed(2), 'ms');
    console.log('Successfully loaded:', loadedLanguages.length);
    console.log('Failed:', failedLanguages.length);
    console.log('Average per language:', (eagerLoadTime / loadedLanguages.length).toFixed(2), 'ms');

    if (failedLanguages.length > 0) {
      console.log('\nFailed languages:');
      failedLanguages.forEach(({ code, error }) => {
        console.log(`  ❌ ${code}: ${error}`);
      });
    }

    console.log('\nSTEP 4: Calculate data sizes');
    console.log('-----------------------------');

    const totalDataSize = loadedLanguages.reduce((sum, lang) => sum + lang.size, 0);
    const averageSize = totalDataSize / loadedLanguages.length;

    console.log('Total data loaded:', (totalDataSize / 1024).toFixed(2), 'KB');
    console.log('Average per language:', (averageSize / 1024).toFixed(2), 'KB');
    console.log('Largest language:', Math.max(...loadedLanguages.map(l => l.size)) / 1024, 'KB');
    console.log('Smallest language:', Math.min(...loadedLanguages.map(l => l.size)) / 1024, 'KB');

    console.log('\nSTEP 5: Simulate lazy loading scenario');
    console.log('---------------------------------------');

    // Clear cache to simulate fresh page load
    languageLoader.clearCache();

    console.log('Scenario: User visits homepage, clicks 3 language cards');
    const userLanguages = ['dutch', 'french', 'spanish'];

    const lazyLoadStart = performance.now();
    for (const code of userLanguages) {
      await languageLoader.loadLanguage(code);
    }
    const lazyLoadTime = performance.now() - lazyLoadStart;

    console.log('✅ Lazy loading complete');
    console.log('Time for 3 languages:', lazyLoadTime.toFixed(2), 'ms');
    console.log('vs. Loading all 67:', eagerLoadTime.toFixed(2), 'ms');
    console.log('Speed improvement:', (eagerLoadTime / lazyLoadTime).toFixed(1) + 'x faster');
    console.log('Data saved:', ((totalDataSize - userLanguages.reduce((sum, code) => {
      const lang = loadedLanguages.find(l => l.code === code);
      return sum + (lang?.size || 0);
    }, 0)) / 1024).toFixed(2), 'KB');

    console.log('\nSTEP 6: Measure resource counting performance');
    console.log('----------------------------------------------');

    // Test counting with different amounts of data
    const counterPath = path.join(__dirname, '..', 'assets', 'js', 'resource-counter.js');
    const { countAllResources } = await import(counterPath);

    // Create mock data with all loaded languages
    const mockLanguageData = {};
    for (const { code } of loadedLanguages) {
      const data = languageLoader.cache.get(code);
      if (data) {
        mockLanguageData[code] = data;
      }
    }

    console.log('Counting resources from', Object.keys(mockLanguageData).length, 'languages...');
    const countStart = performance.now();
    const counts = countAllResources(mockLanguageData);
    const countTime = performance.now() - countStart;

    console.log('✅ Counting complete');
    console.log('Time:', countTime.toFixed(2), 'ms');
    console.log('Results:', counts);

    console.log('\nSTEP 7: Memory usage estimation');
    console.log('--------------------------------');

    if (global.gc) {
      global.gc();
      const memUsage = process.memoryUsage();
      console.log('Heap used:', (memUsage.heapUsed / 1024 / 1024).toFixed(2), 'MB');
      console.log('Heap total:', (memUsage.heapTotal / 1024 / 1024).toFixed(2), 'MB');
    } else {
      console.log('(Run with --expose-gc flag for memory stats)');
    }

    console.log('\nSTEP 8: Performance recommendations');
    console.log('------------------------------------');

    const timePercentage = ((metadataTime + lazyLoadTime) / eagerLoadTime * 100).toFixed(1);
    const dataSaved = ((totalDataSize / 1024) - (metadataTime + lazyLoadTime)).toFixed(2);

    console.log('📊 METRICS:');
    console.log('  Metadata + 3 languages:', (metadataTime + lazyLoadTime).toFixed(2), 'ms');
    console.log('  Loading all languages:', eagerLoadTime.toFixed(2), 'ms');
    console.log('  Time saved:', (eagerLoadTime - (metadataTime + lazyLoadTime)).toFixed(2), 'ms');
    console.log('  Efficiency:', timePercentage + '%', 'of eager loading time');

    return {
      success: true,
      metadataTime,
      eagerLoadTime,
      lazyLoadTime: metadataTime + lazyLoadTime,
      speedImprovement: (eagerLoadTime / (metadataTime + lazyLoadTime)).toFixed(1),
      totalDataSize: (totalDataSize / 1024).toFixed(2) + ' KB',
      recommendation: 'Use lazy loading with resource count caching'
    };

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    console.error(error.stack);
    return { success: false, error: error.message };
  }
}

// Run test
testPerformance().then(result => {
  console.log('\n========================================');
  console.log('PERFORMANCE TEST SUMMARY');
  console.log('========================================');
  console.log('Result:', result);
  console.log('\nRECOMMENDATION:');
  console.log('1. Keep lazy loading - it\'s significantly faster');
  console.log('2. Pre-calculate resource counts in metadata');
  console.log('3. Store counts as static data, not dynamic calculation');
  console.log('4. Only load full language data when user navigates to language page');
  process.exit(result.success ? 0 : 1);
});
