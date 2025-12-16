// CONCEPT: Simulate browser loading to understand why 13 languages are missing
// WHY: Need to replicate exact browser behavior to diagnose the issue
// PATTERN: Load files in sequence just like the browser does

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== BROWSER SIMULATION TEST ===\n');
console.log('Simulating how browser loads language files...\n');

// Create a sandbox environment similar to browser
const sandbox = {
    console,
    window: {},
    languageData: {}  // This is what gets populated
};

// Create VM context
const context = vm.createContext(sandbox);

// First, load the main language-data.js file
const mainDataPath = path.join(__dirname, '..', 'assets', 'js', 'language-data.js');
if (fs.existsSync(mainDataPath)) {
    const mainContent = fs.readFileSync(mainDataPath, 'utf-8');
    try {
        vm.runInContext(mainContent, context);
        console.log('✓ Loaded language-data.js');
    } catch (error) {
        console.log('✗ Error loading language-data.js:', error.message);
    }
}

// List of language files from the test page (in exact order)
const languageFiles = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian', 'danish',
    'dari', 'dutch', 'estonian', 'finnish', 'flemish',
    'french', 'german', 'greek', 'guarani', 'gujarati',
    'hausa', 'hindi', 'hmong', 'hungarian', 'indonesian',
    'inuktitut', 'irish', 'italian', 'japanese', 'kannada',
    'kazakh', 'korean', 'lao', 'latvian', 'lithuanian',
    'malay', 'marathi', 'mongolian', 'nahuatl', 'navajo',
    'nepali', 'pashto', 'persian', 'polish', 'portuguese',
    'punjabi', 'quechua', 'romanian', 'russian', 'serbian',
    'sign-language', 'slovak', 'spanish', 'swahili', 'swedish',
    'tagalog', 'tamil', 'telugu', 'thai', 'ukrainian',
    'urdu', 'vietnamese', 'welsh', 'wolof', 'yoruba'
];

const loadResults = {};
const missingLanguages = [];

// Load each language file
languageFiles.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`✗ FILE NOT FOUND: ${lang}-data.js`);
        loadResults[lang] = 'file-not-found';
        missingLanguages.push(lang);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    try {
        vm.runInContext(content, context);
        loadResults[lang] = 'loaded';
    } catch (error) {
        console.log(`✗ ERROR LOADING ${lang}-data.js:`, error.message.substring(0, 50));
        loadResults[lang] = 'error';
        missingLanguages.push(lang);
    }
});

// Check what's actually in languageData now
const loadedLanguages = Object.keys(sandbox.languageData).filter(key =>
    typeof sandbox.languageData[key] === 'object' &&
    sandbox.languageData[key].name
);

console.log('\n=== RESULTS ===');
console.log(`Total files attempted to load: ${languageFiles.length}`);
console.log(`Successfully loaded: ${Object.values(loadResults).filter(r => r === 'loaded').length}`);
console.log(`Languages in languageData: ${loadedLanguages.length}`);

// Find which languages are missing from languageData
const expectedLanguages = languageFiles.filter(lang => loadResults[lang] === 'loaded');
const actuallyMissing = expectedLanguages.filter(lang => !loadedLanguages.includes(lang));

if (actuallyMissing.length > 0) {
    console.log('\n=== LANGUAGES NOT IN LANGUAGEDATA ===');
    console.log('These files loaded but didn\'t add to languageData:');
    actuallyMissing.forEach(lang => {
        console.log(`- ${lang}`);

        // Check what variable name they use
        const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const varNameMatch = content.match(/const\s+(\w+Resources)\s*=/);
        if (varNameMatch) {
            console.log(`  Uses variable: ${varNameMatch[1]}`);
        }

        // Check assignment pattern
        if (content.includes(`languageData.${lang}`)) {
            console.log(`  Has assignment: languageData.${lang}`);
        } else if (content.includes(`languageData['${lang}']`)) {
            console.log(`  Has assignment: languageData['${lang}']`);
        } else if (content.includes(`languageData["${lang}"]`)) {
            console.log(`  Has assignment: languageData["${lang}"]`);
        } else {
            console.log(`  NO ASSIGNMENT FOUND`);
        }
    });
}

console.log('\n=== LOADED LANGUAGES ===');
console.log('Languages successfully in languageData:');
loadedLanguages.sort().forEach(lang => {
    const hasApps = sandbox.languageData[lang].resources?.apps ||
                   sandbox.languageData[lang].apps;
    const appsCount = hasApps && Array.isArray(hasApps) ?
                     hasApps.reduce((count, cat) => {
                         if (cat.items && Array.isArray(cat.items)) {
                             return count + cat.items.length;
                         }
                         return count + (cat.name ? 1 : 0);
                     }, 0) : 0;

    console.log(`- ${lang}: ${appsCount} apps`);
});

// Compare with what test page shows
console.log('\n=== COMPARISON WITH TEST PAGE EXPECTATION ===');
console.log(`Test page shows: 52 languages`);
console.log(`We loaded: ${loadedLanguages.length} languages`);
console.log(`Difference: ${52 - loadedLanguages.length} languages`);

if (loadedLanguages.length < 52) {
    console.log('\nSomething is wrong - we have FEWER than the test page shows!');
} else if (loadedLanguages.length > 52) {
    console.log('\nWe have MORE languages than test page shows.');
    console.log('The test page might be filtering or having display issues.');
}