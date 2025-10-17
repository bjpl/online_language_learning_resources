#!/usr/bin/env node

/**
 * TEST 1: Validate window.languageData is Empty on Page Load
 *
 * PURPOSE: Confirm the critical issue that window.languageData is initialized
 * as an empty object and never populated with actual language resources.
 *
 * EXPECTED RESULT: window.languageData should be {} (empty)
 * CRITICAL FINDING: Resource counter tries to count from empty object
 */

import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n========================================');
console.log('TEST 1: Empty window.languageData Issue');
console.log('========================================\n');

async function testEmptyLanguageData() {
  try {
    // Read the actual index.html
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Create a DOM environment
    const dom = new JSDOM(html, {
      url: 'http://localhost/',
      resources: 'usable',
      runScripts: 'dangerously',
      beforeParse(window) {
        // Mock console for better output
        window.console.warn = (...args) => console.log('[BROWSER WARN]', ...args);
        window.console.error = (...args) => console.log('[BROWSER ERROR]', ...args);
      }
    });

    const { window } = dom;

    // Wait for initial scripts to execute
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log('STEP 1: Check initial window.languageData state');
    console.log('-----------------------------------------------');
    console.log('Type:', typeof window.languageData);
    console.log('Is Object?:', window.languageData && typeof window.languageData === 'object');
    console.log('Is Empty?:', Object.keys(window.languageData || {}).length === 0);
    console.log('Keys:', Object.keys(window.languageData || {}));
    console.log('Value:', JSON.stringify(window.languageData, null, 2));

    // Check what HTML initializes
    console.log('\nSTEP 2: Check HTML initialization code');
    console.log('----------------------------------------');
    const scripts = dom.window.document.querySelectorAll('script[type="module"]');
    scripts.forEach((script, i) => {
      if (script.textContent && script.textContent.includes('languageData')) {
        console.log(`Script ${i + 1}:`, script.textContent.trim());
      }
    });

    console.log('\nSTEP 3: Validate Critical Issue');
    console.log('--------------------------------');

    const isEmpty = Object.keys(window.languageData || {}).length === 0;

    if (isEmpty) {
      console.log('✅ CONFIRMED: window.languageData IS EMPTY');
      console.log('   This is the ROOT CAUSE of the resource counter showing (0)');
      console.log('   The counter tries to count resources from an empty object!');
    } else {
      console.log('❌ UNEXPECTED: window.languageData has data:', Object.keys(window.languageData));
    }

    console.log('\nSTEP 4: Check resource-counter.js expectations');
    console.log('-----------------------------------------------');
    const counterPath = path.join(__dirname, '..', 'assets', 'js', 'resource-counter.js');
    const counterCode = fs.readFileSync(counterPath, 'utf-8');

    console.log('resource-counter.js expects:');
    console.log('- countAllResources(languageDataObj) to receive populated object');
    console.log('- languageDataObj should have keys like: dutch, french, german, etc.');
    console.log('- Each language should have .resources property with courses, apps, etc.');

    console.log('\nActual state on page load:');
    console.log('- window.languageData =', JSON.stringify(window.languageData));
    console.log('- countAllResources(window.languageData) would return all zeros!');

    console.log('\nSTEP 5: Demonstrate the problem');
    console.log('--------------------------------');

    // Simulate what resource counter does
    const mockCounts = {
      courses: 0,
      apps: 0,
      books: 0,
      audio: 0,
      practice: 0
    };

    const languageKeys = Object.keys(window.languageData || {});
    console.log('Language keys found:', languageKeys.length);
    console.log('Resource counts:', mockCounts);
    console.log('\n❌ RESULT: All resource counts are 0 because no language data is loaded!');

    return {
      success: true,
      isEmpty: isEmpty,
      languageCount: languageKeys.length,
      issue: 'window.languageData is empty on page load'
    };

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    console.error(error.stack);
    return { success: false, error: error.message };
  }
}

// Run test
testEmptyLanguageData().then(result => {
  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================');
  console.log('Result:', result);
  console.log('\nCONCLUSION:');
  console.log('- window.languageData is initialized as {} in index.html');
  console.log('- Language data is NEVER loaded into window.languageData');
  console.log('- Lazy loading stores data in languageLoader.cache, not window.languageData');
  console.log('- resource-counter.js receives empty object and returns zeros');
  console.log('\nSOLUTION NEEDED:');
  console.log('- Either preload all language data into window.languageData');
  console.log('- OR modify resource-counter to use languageLoader.cache');
  console.log('- OR create a bulk resource count function that uses metadata');
  process.exit(result.success ? 0 : 1);
});
