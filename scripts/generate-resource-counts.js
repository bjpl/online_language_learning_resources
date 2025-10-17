#!/usr/bin/env node

// ===================================
// Generate Resource Counts - Emergency Fix Script
// ===================================

/**
 * PURPOSE: Generate accurate resource counts from all language data files
 * OUTPUT: /assets/data/resource-counts.json
 * USAGE: node scripts/generate-resource-counts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGE_DATA_DIR = path.join(__dirname, '../assets/js/language-data');
const OUTPUT_FILE = path.join(__dirname, '../assets/data/resource-counts.json');

/**
 * Count resources of a specific type from a resource array
 */
function countResourcesByType(resourceArray, resourceType) {
  if (!Array.isArray(resourceArray)) {
    return 0;
  }

  let count = 0;

  resourceArray.forEach((category) => {
    if (!category || typeof category !== 'object') {
      return;
    }

    // Standard structure: category.items is an array
    if (category.items && Array.isArray(category.items)) {
      count += category.items.length;
    }
    // Special case for apps: Some languages have direct app items
    else if (resourceType === 'apps' && category.name) {
      count += 1;
    }
  });

  return count;
}

/**
 * Count all resources from a single language object
 */
function countLanguageResources(languageObj) {
  const counts = {
    courses: 0,
    apps: 0,
    books: 0,
    audio: 0,
    practice: 0,
  };

  if (!languageObj || !languageObj.resources) {
    return counts;
  }

  const { resources } = languageObj;

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
 * Load a language data file using dynamic import
 */
async function loadLanguageData(filePath) {
  try {
    // Use dynamic import for ES6 modules
    const fileUrl = `file://${filePath}`;
    const module = await import(fileUrl);

    // Get the default export or named export
    const languageData = module.default || module[Object.keys(module)[0]];

    return languageData;
  } catch (error) {
    console.error(`Error loading ${path.basename(filePath)}:`, error.message);
    return null;
  }
}

/**
 * Main function to generate resource counts
 */
async function generateResourceCounts() {
  console.log('🔍 Scanning language data files...');

  // Get all language data files
  const files = fs.readdirSync(LANGUAGE_DATA_DIR)
    .filter(file => file.endsWith('-data.js') && file !== 'language-metadata.js');

  console.log(`📊 Found ${files.length} language files`);

  // Initialize totals
  const totalCounts = {
    courses: 0,
    apps: 0,
    books: 0,
    audio: 0,
    practice: 0,
  };

  const languageCounts = {};
  let successCount = 0;

  // Process each language file
  for (const file of files) {
    const filePath = path.join(LANGUAGE_DATA_DIR, file);
    const languageData = await loadLanguageData(filePath);

    if (!languageData) {
      continue;
    }

    // Extract language name from file (e.g., 'dutch-data.js' -> 'dutch')
    const langKey = file.replace('-data.js', '');

    // Count resources for this language
    const counts = countLanguageResources(languageData);

    // Store individual language counts
    languageCounts[langKey] = counts;

    // Add to totals
    totalCounts.courses += counts.courses;
    totalCounts.apps += counts.apps;
    totalCounts.books += counts.books;
    totalCounts.audio += counts.audio;
    totalCounts.practice += counts.practice;

    successCount++;

    console.log(`  ✓ ${languageData.name}: ${counts.courses + counts.apps + counts.books + counts.audio + counts.practice} resources`);
  }

  console.log('\n📈 Total Resource Counts:');
  console.log(`  Courses: ${totalCounts.courses}`);
  console.log(`  Apps: ${totalCounts.apps}`);
  console.log(`  Books: ${totalCounts.books}`);
  console.log(`  Audio: ${totalCounts.audio}`);
  console.log(`  Practice: ${totalCounts.practice}`);
  console.log(`  TOTAL: ${totalCounts.courses + totalCounts.apps + totalCounts.books + totalCounts.audio + totalCounts.practice}`);

  // Prepare output data
  const outputData = {
    generated: new Date().toISOString(),
    totalCounts,
    languageCounts,
    languageCount: successCount,
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`\n📁 Created directory: ${outputDir}`);
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), 'utf-8');

  console.log(`\n✅ Resource counts saved to: ${OUTPUT_FILE}`);
  console.log(`   Processed ${successCount}/${files.length} language files successfully`);

  return outputData;
}

// Run the script
generateResourceCounts()
  .then(() => {
    console.log('\n🎉 Resource count generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error generating resource counts:', error);
    process.exit(1);
  });
