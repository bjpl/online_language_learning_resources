// CONCEPT: Direct check of what's in languageData after loading all files
// WHY: Need to verify exactly which languages are present

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Create a sandbox environment
const sandbox = {
    console: console,
    window: {},
    languageData: {}
};

const context = vm.createContext(sandbox);

// Load main language-data.js
const mainPath = path.join(__dirname, '..', 'assets', 'js', 'language-data.js');
if (fs.existsSync(mainPath)) {
    const content = fs.readFileSync(mainPath, 'utf-8');
    vm.runInContext(content, context);
}

// List of ALL language files we have
const languageFiles = fs.readdirSync(path.join(__dirname, '..', 'assets', 'js'))
    .filter(file => file.endsWith('-data.js') && file !== 'language-data.js')
    .map(file => file.replace('-data.js', ''));

console.log(`Found ${languageFiles.length} language data files\n`);

// Load each file
languageFiles.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`ERROR loading ${lang}:`, error.message);
    }
});

// Check what's in languageData
const loadedLanguages = Object.keys(sandbox.languageData).filter(key =>
    sandbox.languageData[key] &&
    typeof sandbox.languageData[key] === 'object' &&
    sandbox.languageData[key].name
);

console.log(`\n=== LOADED LANGUAGES (${loadedLanguages.length} total) ===`);
loadedLanguages.sort().forEach((lang, index) => {
    const data = sandbox.languageData[lang];
    const apps = data.resources?.apps || data.apps;
    let appCount = 0;

    if (apps && Array.isArray(apps)) {
        apps.forEach(category => {
            if (category.items && Array.isArray(category.items)) {
                appCount += category.items.length;
            } else if (category.name) {
                appCount += 1;
            }
        });
    }

    console.log(`${String(index + 1).padStart(2)}. ${lang.padEnd(15)} - ${data.name.padEnd(20)} - ${appCount} apps`);
});

// Check for specific languages that might be missing
const checkFor = ['czech', 'hebrew', 'norwegian', 'turkish'];
console.log('\n=== CHECKING SPECIFIC LANGUAGES ===');
checkFor.forEach(lang => {
    if (loadedLanguages.includes(lang)) {
        console.log(`✓ ${lang} is loaded`);
    } else {
        console.log(`✗ ${lang} is MISSING`);
        // Check if file exists
        const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);
        if (fs.existsSync(filePath)) {
            console.log(`  File exists: ${lang}-data.js`);
            // Check content
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.includes(`languageData.${lang}`)) {
                console.log(`  Has assignment: languageData.${lang}`);
            } else if (content.includes(`languageData['${lang}']`)) {
                console.log(`  Has assignment: languageData['${lang}']`);
            } else {
                console.log(`  NO ASSIGNMENT FOUND`);
            }
        } else {
            console.log(`  FILE NOT FOUND: ${lang}-data.js`);
        }
    }
});