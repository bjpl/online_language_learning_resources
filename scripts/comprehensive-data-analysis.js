// COMPREHENSIVE DATA QUALITY ANALYSIS
// Let's understand EXACTLY what's happening with the data

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('='.repeat(80));
console.log('COMPREHENSIVE DATA QUALITY ANALYSIS - FINDING THE REAL ISSUE');
console.log('='.repeat(80));
console.log('\n');

// Get ALL language files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'language-data.js');

console.log(`Found ${allFiles.length} language data files to analyze\n`);

// Analysis results
const analysis = {
    total: 0,
    withApps: 0,
    withoutApps: 0,
    directStructure: [],
    categoryStructure: [],
    emptyApps: [],
    invalidStructure: [],
    propertyAnalysis: {},
    sampleData: {}
};

// Load each file and analyze
allFiles.forEach(file => {
    const lang = file.replace('-data.js', '');
    analysis.total++;

    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Create sandbox
    const sandbox = { languageData: {}, window: {}, console: console };
    const context = vm.createContext(sandbox);

    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`ERROR loading ${lang}: ${error.message}`);
        analysis.invalidStructure.push(lang);
        return;
    }

    // Find the language data (handle both 'signlanguage' and 'sign-language' cases)
    const langData = sandbox.languageData[lang] ||
                    sandbox.languageData[lang.replace('-', '')] ||
                    Object.values(sandbox.languageData)[0];

    if (!langData) {
        console.log(`WARNING: ${lang} not found in languageData`);
        analysis.withoutApps++;
        return;
    }

    // Check apps
    const apps = langData.resources?.apps || langData.apps;

    if (!apps || !Array.isArray(apps)) {
        analysis.withoutApps++;
        analysis.emptyApps.push(lang);
        return;
    }

    analysis.withApps++;

    // Analyze structure
    if (apps.length === 0) {
        analysis.emptyApps.push(lang);
        return;
    }

    const firstItem = apps[0];

    // Detailed structure analysis
    if (firstItem) {
        // Check if it's a direct app item or a category
        const hasCategory = 'category' in firstItem;
        const hasItems = 'items' in firstItem;
        const hasName = 'name' in firstItem;

        if (hasCategory && hasItems) {
            // Category structure
            analysis.categoryStructure.push(lang);

            // Analyze items within category
            let itemCount = 0;
            let validItems = 0;
            let invalidItems = 0;
            let sampleItem = null;

            apps.forEach(category => {
                if (category.items && Array.isArray(category.items)) {
                    category.items.forEach(item => {
                        itemCount++;
                        if (item && item.name && item.name !== 'undefined') {
                            validItems++;
                            if (!sampleItem) sampleItem = item;
                        } else {
                            invalidItems++;
                        }
                    });
                }
            });

            analysis.propertyAnalysis[lang] = {
                structure: 'category',
                totalItems: itemCount,
                validItems: validItems,
                invalidItems: invalidItems,
                sample: sampleItem
            };

        } else if (hasName) {
            // Direct structure
            analysis.directStructure.push(lang);

            let validItems = 0;
            let invalidItems = 0;
            let sampleItem = null;

            apps.forEach(item => {
                if (item && item.name && item.name !== 'undefined') {
                    validItems++;
                    if (!sampleItem) sampleItem = item;
                } else {
                    invalidItems++;
                }
            });

            analysis.propertyAnalysis[lang] = {
                structure: 'direct',
                totalItems: apps.length,
                validItems: validItems,
                invalidItems: invalidItems,
                sample: sampleItem
            };

        } else {
            // Unknown structure
            analysis.invalidStructure.push(lang);
            analysis.propertyAnalysis[lang] = {
                structure: 'unknown',
                firstItem: JSON.stringify(firstItem).substring(0, 200)
            };
        }

        // Store sample data for debugging
        if (lang === 'danish' || lang === 'dutch' || lang === 'afrikaans' || lang === 'italian') {
            analysis.sampleData[lang] = {
                structure: hasCategory && hasItems ? 'category' : hasName ? 'direct' : 'unknown',
                firstItem: firstItem,
                appsLength: apps.length
            };
        }
    }
});

// Print comprehensive report
console.log('ANALYSIS SUMMARY');
console.log('-'.repeat(40));
console.log(`Total files analyzed: ${analysis.total}`);
console.log(`Files with apps: ${analysis.withApps}`);
console.log(`Files without apps: ${analysis.withoutApps}`);
console.log(`Empty apps arrays: ${analysis.emptyApps.length}`);
console.log(`Direct structure: ${analysis.directStructure.length}`);
console.log(`Category structure: ${analysis.categoryStructure.length}`);
console.log(`Invalid structure: ${analysis.invalidStructure.length}`);

console.log('\n\nSTRUCTURAL BREAKDOWN');
console.log('-'.repeat(40));

console.log('\n📁 CATEGORY STRUCTURE (should work):');
analysis.categoryStructure.sort().forEach(lang => {
    const info = analysis.propertyAnalysis[lang];
    const status = info.invalidItems > 0 ? '⚠️' : '✅';
    console.log(`  ${status} ${lang}: ${info.validItems} valid, ${info.invalidItems} invalid`);
});

console.log('\n📝 DIRECT STRUCTURE (needs fixing):');
analysis.directStructure.sort().forEach(lang => {
    const info = analysis.propertyAnalysis[lang];
    console.log(`  ❌ ${lang}: ${info.totalItems} items (direct structure)`);
});

console.log('\n❓ INVALID/UNKNOWN STRUCTURE:');
analysis.invalidStructure.forEach(lang => {
    const info = analysis.propertyAnalysis[lang];
    console.log(`  ❌ ${lang}: ${info.firstItem || 'unknown'}`);
});

console.log('\n\nSAMPLE DATA FOR KEY LANGUAGES');
console.log('-'.repeat(40));
Object.entries(analysis.sampleData).forEach(([lang, data]) => {
    console.log(`\n${lang.toUpperCase()}:`);
    console.log(`  Structure: ${data.structure}`);
    console.log(`  Apps array length: ${data.appsLength}`);
    console.log(`  First item keys: ${Object.keys(data.firstItem).join(', ')}`);
    if (data.firstItem.name) {
        console.log(`  First item name: "${data.firstItem.name}"`);
    }
    if (data.firstItem.category) {
        console.log(`  First category: "${data.firstItem.category}"`);
        if (data.firstItem.items && data.firstItem.items[0]) {
            console.log(`  First item in category: "${data.firstItem.items[0].name}"`);
        }
    }
});

// Check for patterns
console.log('\n\nPATTERN ANALYSIS');
console.log('-'.repeat(40));

// Languages reported as showing undefined by user
const userReportedUndefined = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian',
    'dari', 'estonian', 'german', 'gujarati', 'greek',
    'guarani', 'hausa', 'hungarian', 'french', 'spanish',
    'malay', 'marathi', 'mongolian', 'navajo', 'nahuatl',
    'nepali', 'pashto', 'russian', 'tagalog', 'romanian',
    'hmong', 'tamil', 'telugu', 'thai', 'ukrainian', 'urdu',
    'serbian', 'slovak', 'flemish', 'punjabi', 'quechua',
    'persian', 'welsh', 'yoruba', 'wolof'
];

// Languages reported as working by user
const userReportedWorking = [
    'danish', 'dutch', 'italian', 'indonesian', 'korean',
    'hindi', 'swahili', 'japanese', 'swedish', 'finnish',
    'polish', 'vietnamese'
];

console.log('\nUSER REPORTED UNDEFINED - STRUCTURE ANALYSIS:');
userReportedUndefined.forEach(lang => {
    const info = analysis.propertyAnalysis[lang];
    if (info) {
        console.log(`  ${lang}: ${info.structure} structure, ${info.validItems || 0} valid items`);
    } else {
        console.log(`  ${lang}: NO DATA FOUND`);
    }
});

console.log('\nUSER REPORTED WORKING - STRUCTURE ANALYSIS:');
userReportedWorking.forEach(lang => {
    const info = analysis.propertyAnalysis[lang];
    if (info) {
        console.log(`  ${lang}: ${info.structure} structure, ${info.validItems || 0} valid items`);
    } else {
        console.log(`  ${lang}: NO DATA FOUND`);
    }
});

// Save detailed report
const reportPath = path.join(__dirname, 'comprehensive-analysis.json');
fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
        total: analysis.total,
        withApps: analysis.withApps,
        withoutApps: analysis.withoutApps,
        directStructure: analysis.directStructure.length,
        categoryStructure: analysis.categoryStructure.length,
        invalidStructure: analysis.invalidStructure.length
    },
    details: analysis.propertyAnalysis,
    samples: analysis.sampleData
}, null, 2));

console.log(`\n\n📊 Detailed report saved to: ${reportPath}`);
console.log('\n' + '='.repeat(80));