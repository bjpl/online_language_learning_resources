// CONCEPT: Find exactly why app names are showing as undefined
// WHY: Need to identify the specific issue in app item structures

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Languages showing undefined in the user's list
const problematicLanguages = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian',
    'dari', 'estonian', // danish and dutch work now
    'italian', 'indonesian', 'inuktitut', 'irish',
    'kazakh', 'kannada', 'korean', 'lao', 'latvian', 'lithuanian',
    'german', 'gujarati', 'greek', 'guarani', 'hausa', 'hungarian',
    'french', 'spanish', 'malay', 'marathi', 'mongolian',
    'navajo', 'nahuatl', 'nepali', 'pashto', 'russian',
    'tagalog', 'romanian', 'hindi', 'hmong', 'swahili',
    'tamil', 'telugu', 'thai', 'ukrainian', 'urdu',
    'japanese', 'serbian', 'signlanguage', 'slovak',
    'swedish', 'finnish', 'flemish', 'polish', 'punjabi',
    'quechua', 'persian', 'vietnamese', 'welsh', 'yoruba', 'wolof'
];

console.log('=== FINDING UNDEFINED APP NAMES ===\n');

const issues = {};

problematicLanguages.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ ${lang}: FILE NOT FOUND`);
        issues[lang] = { type: 'missing-file' };
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Create sandbox to load the file
    const sandbox = {
        console: console,
        window: {},
        languageData: {}
    };
    const context = vm.createContext(sandbox);

    // Load the file
    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`❌ ${lang}: LOAD ERROR - ${error.message}`);
        issues[lang] = { type: 'load-error', error: error.message };
        return;
    }

    // Get the language data
    const langData = sandbox.languageData[lang] || sandbox.languageData[lang.replace('-', '')];
    if (!langData) {
        console.log(`❌ ${lang}: NOT IN LANGUAGEDATA`);
        issues[lang] = { type: 'not-loaded' };
        return;
    }

    // Check apps
    const apps = langData.resources?.apps || langData.apps;
    if (!apps) {
        console.log(`❌ ${lang}: NO APPS`);
        issues[lang] = { type: 'no-apps' };
        return;
    }

    // Analyze app structure
    let hasIssues = false;
    const appIssues = [];

    // Check if apps is direct items or has categories
    if (apps.length > 0) {
        const firstItem = apps[0];

        // Check if it's direct app items (wrong) or categories (correct)
        if (firstItem && firstItem.name && !firstItem.category) {
            // Direct items - WRONG STRUCTURE
            console.log(`⚠️ ${lang}: DIRECT ITEMS (needs category wrapper)`);
            issues[lang] = {
                type: 'direct-items',
                count: apps.length,
                sample: firstItem.name
            };
            hasIssues = true;
        } else if (firstItem && firstItem.category && firstItem.items) {
            // Has categories - check items
            let undefinedCount = 0;
            let totalItems = 0;

            apps.forEach((category, catIdx) => {
                if (category.items && Array.isArray(category.items)) {
                    category.items.forEach((item, itemIdx) => {
                        totalItems++;
                        if (!item || !item.name || item.name === 'undefined') {
                            undefinedCount++;
                            appIssues.push(`Cat ${catIdx}, Item ${itemIdx}: ${item ? item.name : 'null'}`);
                        }
                    });
                }
            });

            if (undefinedCount > 0) {
                console.log(`❌ ${lang}: ${undefinedCount}/${totalItems} UNDEFINED NAMES`);
                issues[lang] = {
                    type: 'undefined-names',
                    undefinedCount,
                    totalItems,
                    issues: appIssues
                };
                hasIssues = true;
            }
        } else {
            console.log(`❓ ${lang}: UNKNOWN STRUCTURE`);
            console.log(`  First item:`, JSON.stringify(firstItem).substring(0, 100));
            issues[lang] = { type: 'unknown-structure' };
            hasIssues = true;
        }
    }

    if (!hasIssues) {
        // Count total apps
        let totalApps = 0;
        apps.forEach(cat => {
            if (cat.items && Array.isArray(cat.items)) {
                totalApps += cat.items.length;
            }
        });
        console.log(`✅ ${lang}: OK (${totalApps} apps)`);
    }
});

console.log('\n=== SUMMARY ===');
const issueTypes = {};
Object.values(issues).forEach(issue => {
    issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
});

console.log('Issue breakdown:');
Object.entries(issueTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} languages`);
});

console.log('\n=== LANGUAGES NEEDING CATEGORY WRAPPER ===');
Object.entries(issues).forEach(([lang, issue]) => {
    if (issue.type === 'direct-items') {
        console.log(`  ${lang}: ${issue.count} items need wrapping (sample: "${issue.sample}")`);
    }
});

console.log('\n=== LANGUAGES WITH UNDEFINED NAMES ===');
Object.entries(issues).forEach(([lang, issue]) => {
    if (issue.type === 'undefined-names') {
        console.log(`  ${lang}: ${issue.undefinedCount} undefined of ${issue.totalItems} total`);
    }
});

// Save detailed report
const reportPath = path.join(__dirname, 'undefined-apps-report.json');
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
console.log(`\n📄 Detailed report saved to: ${reportPath}`);