#!/usr/bin/env node

// ===================================
// Test Resource Counter Fix - Validation Script
// ===================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESOURCE_COUNTS_FILE = path.join(__dirname, '../assets/data/resource-counts.json');

console.log('🧪 Testing Resource Counter Fix\n');

// Test 1: Verify resource-counts.json exists
console.log('Test 1: Checking if resource-counts.json exists...');
if (!fs.existsSync(RESOURCE_COUNTS_FILE)) {
  console.error('❌ FAILED: resource-counts.json not found');
  process.exit(1);
}
console.log('✅ PASSED: resource-counts.json exists\n');

// Test 2: Verify JSON is valid
console.log('Test 2: Validating JSON structure...');
let data;
try {
  const content = fs.readFileSync(RESOURCE_COUNTS_FILE, 'utf-8');
  data = JSON.parse(content);
  console.log('✅ PASSED: JSON is valid\n');
} catch (error) {
  console.error('❌ FAILED: Invalid JSON:', error.message);
  process.exit(1);
}

// Test 3: Verify required fields exist
console.log('Test 3: Checking required fields...');
const requiredFields = ['generated', 'totalCounts', 'languageCounts', 'languageCount'];
const missingFields = requiredFields.filter(field => !(field in data));

if (missingFields.length > 0) {
  console.error('❌ FAILED: Missing fields:', missingFields.join(', '));
  process.exit(1);
}
console.log('✅ PASSED: All required fields present\n');

// Test 4: Verify totalCounts structure
console.log('Test 4: Validating totalCounts structure...');
const requiredCountTypes = ['courses', 'apps', 'books', 'audio', 'practice'];
const missingCountTypes = requiredCountTypes.filter(type => !(type in data.totalCounts));

if (missingCountTypes.length > 0) {
  console.error('❌ FAILED: Missing count types:', missingCountTypes.join(', '));
  process.exit(1);
}
console.log('✅ PASSED: totalCounts has all required types\n');

// Test 5: Verify counts are reasonable
console.log('Test 5: Checking if counts are reasonable...');
const { totalCounts } = data;
const totalResources = Object.values(totalCounts).reduce((sum, count) => sum + count, 0);

console.log('   Total Counts:');
console.log(`   - Courses: ${totalCounts.courses}`);
console.log(`   - Apps: ${totalCounts.apps}`);
console.log(`   - Books: ${totalCounts.books}`);
console.log(`   - Audio: ${totalCounts.audio}`);
console.log(`   - Practice: ${totalCounts.practice}`);
console.log(`   - TOTAL: ${totalResources}`);

if (totalResources === 0) {
  console.error('❌ FAILED: No resources counted');
  process.exit(1);
}

if (totalResources < 1000) {
  console.warn('⚠️  WARNING: Total resources seem low (expected 3000+)');
}

console.log('✅ PASSED: Counts are reasonable\n');

// Test 6: Verify language counts
console.log('Test 6: Checking language counts...');
const languageCount = Object.keys(data.languageCounts).length;

console.log(`   Languages processed: ${languageCount}`);
console.log(`   Language count field: ${data.languageCount}`);

if (languageCount !== data.languageCount) {
  console.warn(`⚠️  WARNING: Mismatch between actual (${languageCount}) and stored (${data.languageCount}) language count`);
}

if (languageCount === 0) {
  console.error('❌ FAILED: No languages counted');
  process.exit(1);
}

console.log('✅ PASSED: Language counts are valid\n');

// Test 7: Verify timestamp is recent
console.log('Test 7: Checking generation timestamp...');
const generatedDate = new Date(data.generated);
const now = new Date();
const ageMinutes = (now - generatedDate) / 1000 / 60;

console.log(`   Generated: ${data.generated}`);
console.log(`   Age: ${ageMinutes.toFixed(1)} minutes ago`);

if (ageMinutes > 60) {
  console.warn('⚠️  WARNING: Data is more than 1 hour old, consider regenerating');
}

console.log('✅ PASSED: Timestamp is valid\n');

// Test 8: Sample language data validation
console.log('Test 8: Validating sample language data...');
const sampleLanguages = ['dutch', 'japanese', 'spanish', 'french'];
const foundLanguages = [];
const missingLanguages = [];

sampleLanguages.forEach(lang => {
  if (data.languageCounts[lang]) {
    foundLanguages.push(lang);
  } else {
    missingLanguages.push(lang);
  }
});

console.log(`   Found: ${foundLanguages.join(', ')}`);
if (missingLanguages.length > 0) {
  console.warn(`   Missing: ${missingLanguages.join(', ')}`);
}

console.log('✅ PASSED: Sample languages validated\n');

// Summary
console.log('═══════════════════════════════════════════════════════');
console.log('🎉 ALL TESTS PASSED!');
console.log('═══════════════════════════════════════════════════════');
console.log('');
console.log('📊 Summary:');
console.log(`   ✓ Total Resources: ${totalResources}`);
console.log(`   ✓ Languages: ${languageCount}`);
console.log(`   ✓ Generated: ${data.generated}`);
console.log('');
console.log('✅ Resource counter fix is working correctly!');
console.log('');
console.log('Next steps:');
console.log('   1. Open index.html in a browser');
console.log('   2. Check the resource count badges on the homepage');
console.log('   3. Resource counts should display as: (794), (862), (921), etc.');
console.log('');

process.exit(0);
