// Test the resources aggregation logic
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TESTING RESOURCES AGGREGATION FIX ===\n');

// Create a sandbox with mock DOM
const sandbox = {
    console: console,
    window: {},
    document: {
        getElementById: () => null,
        createElement: () => ({ appendChild: () => {} }),
        querySelectorAll: () => []
    },
    localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
    },
    languageData: {}
};

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const dataFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'language-data.js')
    .sort();

console.log(`Loading ${dataFiles.length} language files...\n`);

// Load each file
dataFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const context = vm.createContext(sandbox);
    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`Error loading ${file}: ${error.message}`);
    }
});

console.log(`Loaded ${Object.keys(sandbox.languageData).length} languages\n`);

// Now test the aggregation logic
const allResources = {
    apps: []
};

// Process apps using the FIXED logic
Object.keys(sandbox.languageData).forEach(langKey => {
    const lang = sandbox.languageData[langKey];
    if (!lang || !lang.resources) return;

    // Process apps (using the fixed logic)
    if (lang.resources?.apps || lang.apps) {
        if (Array.isArray(lang.resources?.apps || lang.apps)) {
            (lang.resources?.apps || lang.apps).forEach(category => {
                // Check if this is a category with items or a direct app item
                if (category.items && Array.isArray(category.items)) {
                    // It's a category with items - iterate through the items
                    category.items.forEach(app => {
                        allResources.apps.push({
                            ...app,
                            language: langKey,
                            languageName: lang.name,
                            languageFlag: lang.flag,
                            category: category.category
                        });
                    });
                } else if (category.name) {
                    // It's a direct app item (legacy structure)
                    allResources.apps.push({
                        ...category,
                        language: langKey,
                        languageName: lang.name,
                        languageFlag: lang.flag
                    });
                }
            });
        }
    }
});

console.log(`\n=== AGGREGATION RESULTS ===`);
console.log(`Total apps aggregated: ${allResources.apps.length}`);

// Check for undefined names
const undefinedApps = allResources.apps.filter(app => !app.name || app.name === 'undefined');
console.log(`Apps with undefined names: ${undefinedApps.length}`);

if (undefinedApps.length > 0) {
    console.log('\n❌ STILL HAVE UNDEFINED APPS:');
    undefinedApps.slice(0, 10).forEach(app => {
        console.log(`  - ${app.languageName}: ${JSON.stringify(app).substring(0, 100)}`);
    });
} else {
    console.log('\n✅ ALL APPS HAVE VALID NAMES!');
}

// Show sample of correctly aggregated apps
console.log('\n=== SAMPLE OF AGGREGATED APPS ===');
const samples = allResources.apps.slice(0, 10);
samples.forEach(app => {
    console.log(`✅ ${app.languageFlag} ${app.languageName}: ${app.name} (${app.free ? 'Free' : 'Paid'})`);
});

// Count by language
const byLanguage = {};
allResources.apps.forEach(app => {
    byLanguage[app.languageName] = (byLanguage[app.languageName] || 0) + 1;
});

console.log('\n=== APPS COUNT BY LANGUAGE (Top 20) ===');
Object.entries(byLanguage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([lang, count]) => {
        console.log(`  ${lang}: ${count} apps`);
    });

console.log('\n=== TEST COMPLETE ===');
console.log(`\nSummary: ${allResources.apps.length} total apps, ${undefinedApps.length} undefined`);