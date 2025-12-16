// ✻ Thinking intensely about the missing languages problem...
// CONCEPT: Systematically identify which languages are missing from languageData
// WHY: Need to understand exactly which 13 languages aren't loading properly

const fs = require('fs');
const path = require('path');

console.log('=== DIAGNOSING MISSING LANGUAGES ===\n');

// List of all 65 language files we expect
const expectedLanguages = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian', 'czech',
    'danish', 'dari', 'dutch', 'estonian', 'finnish',
    'flemish', 'french', 'german', 'greek', 'guarani',
    'gujarati', 'hausa', 'hebrew', 'hindi', 'hmong',
    'hungarian', 'indonesian', 'inuktitut', 'irish', 'italian',
    'japanese', 'kannada', 'kazakh', 'korean', 'lao',
    'latvian', 'lithuanian', 'malay', 'marathi', 'mongolian',
    'nahuatl', 'navajo', 'nepali', 'norwegian', 'pashto',
    'persian', 'polish', 'portuguese', 'punjabi', 'quechua',
    'romanian', 'russian', 'serbian', 'sign-language', 'slovak',
    'spanish', 'swahili', 'swedish', 'tagalog', 'tamil',
    'telugu', 'thai', 'turkish', 'ukrainian', 'urdu',
    'vietnamese', 'welsh', 'wolof', 'yoruba'
];

// Check each language file
const languageStatuses = {};
const missingFromData = [];
const presentInData = [];

expectedLanguages.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ FILE MISSING: ${lang}-data.js`);
        languageStatuses[lang] = 'file-missing';
        return;
    }

    // Read the file and check its structure
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check if it assigns to languageData
    const hasAssignment = content.includes(`languageData['${lang}']`) ||
                         content.includes(`languageData["${lang}"]`) ||
                         content.includes(`languageData.${lang}`);

    if (!hasAssignment) {
        console.log(`⚠️  NO ASSIGNMENT: ${lang}-data.js doesn't assign to languageData`);
        languageStatuses[lang] = 'no-assignment';
        missingFromData.push(lang);
    } else {
        // Check if the assignment is valid
        const assignmentPattern = /languageData\[['"]([^'"]+)['"]\]\s*=\s*{/;
        const match = content.match(assignmentPattern);

        if (match && match[1] === lang) {
            languageStatuses[lang] = 'valid';
            presentInData.push(lang);
        } else {
            console.log(`⚠️  MISMATCHED KEY: ${lang}-data.js assigns to wrong key`);
            languageStatuses[lang] = 'wrong-key';
            missingFromData.push(lang);
        }
    }
});

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total expected languages: ${expectedLanguages.length}`);
console.log(`Languages with valid assignments: ${presentInData.length}`);
console.log(`Languages missing or incorrect: ${missingFromData.length}`);

if (missingFromData.length > 0) {
    console.log('\n=== MISSING/INCORRECT LANGUAGES ===');
    missingFromData.forEach(lang => {
        console.log(`- ${lang} (${languageStatuses[lang]})`);
    });
}

// Check what the test page actually includes
console.log('\n=== CHECKING TEST PAGE INCLUDES ===');
const testPagePath = path.join(__dirname, '..', 'test-apps-display.html');
const testContent = fs.readFileSync(testPagePath, 'utf-8');

const scriptTags = testContent.match(/<script src="assets\/js\/([^"]+)"><\/script>/g);
const includedFiles = scriptTags.map(tag => {
    const match = tag.match(/([^/]+)-data\.js/);
    return match ? match[1] : null;
}).filter(Boolean);

console.log(`Test page includes ${includedFiles.length} language files`);

// Find which ones are missing from test page
const missingFromTestPage = expectedLanguages.filter(lang => !includedFiles.includes(lang));
if (missingFromTestPage.length > 0) {
    console.log('\n=== MISSING FROM TEST PAGE ===');
    missingFromTestPage.forEach(lang => {
        console.log(`- ${lang}-data.js not included in test page`);
    });
}

// Check for extra/unexpected files
const extraFiles = includedFiles.filter(lang => !expectedLanguages.includes(lang));
if (extraFiles.length > 0) {
    console.log('\n=== UNEXPECTED FILES IN TEST PAGE ===');
    extraFiles.forEach(lang => {
        console.log(`- ${lang}-data.js (not in expected list)`);
    });
}

console.log('\n=== DIAGNOSTIC COMPLETE ===');