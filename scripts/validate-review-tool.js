// ===================================
// Validate Review Tool Data Loading
// Ensures all resources load correctly without undefined values
// ===================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🔍 VALIDATING REVIEW TOOL DATA LOADING\n');
console.log('=' .repeat(60));

// Create sandbox to simulate browser environment
const sandbox = {
    console,
    window: {},
    document: {
        getElementById: () => ({
            appendChild: () => {},
            innerHTML: '',
            style: {},
            classList: { add: () => {}, remove: () => {}, toggle: () => {} }
        }),
        createElement: () => ({ appendChild: () => {} }),
        querySelectorAll: () => [],
        addEventListener: () => {}
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

console.log(`📚 Loading ${dataFiles.length} language data files...\n`);

// Load each language file
dataFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const context = vm.createContext(sandbox);
    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`❌ Error loading ${file}: ${error.message}`);
    }
});

console.log(`✅ Successfully loaded ${Object.keys(sandbox.languageData).length} languages\n`);
console.log('=' .repeat(60));

// Simulate review tool's resource loading logic
const allResources = [];

Object.keys(sandbox.languageData).forEach(langKey => {
    const lang = sandbox.languageData[langKey];
    if (!lang) return;

    // Process all resource types (matching review-tool-v2.js logic)
    ['courses', 'apps', 'books', 'audio', 'practice'].forEach(type => {
        const resources = lang.resources?.[type] || lang[type];
        if (!resources || !Array.isArray(resources)) return;

        resources.forEach(item => {
            if (item.items && Array.isArray(item.items)) {
                // Category with items
                item.items.forEach(resource => {
                    allResources.push({
                        ...resource,
                        _id: `${langKey}_${type}_${resource.name}`,
                        _type: type,
                        _category: item.category,
                        _language: langKey,
                        _langName: lang.name,
                        _langFlag: lang.flag
                    });
                });
            } else if (item.name) {
                // Direct item
                allResources.push({
                    ...item,
                    _id: `${langKey}_${type}_${item.name}`,
                    _type: type,
                    _language: langKey,
                    _langName: lang.name,
                    _langFlag: lang.flag
                });
            }
        });
    });
});

// Validation checks
console.log('\n📊 VALIDATION RESULTS:\n');

// 1. Total resources
console.log(`✅ Total resources loaded: ${allResources.length}`);

// 2. Check for undefined names
const undefinedResources = allResources.filter(r => !r.name || r.name === 'undefined');
if (undefinedResources.length > 0) {
    console.log(`\n❌ CRITICAL: ${undefinedResources.length} resources have undefined names!`);
    undefinedResources.slice(0, 5).forEach(r => {
        console.log(`   - ${r._langName} (${r._type}): ${JSON.stringify(r).substring(0, 100)}`);
    });
} else {
    console.log('✅ All resources have valid names (0 undefined)');
}

// 3. Check for missing URLs
const noUrlResources = allResources.filter(r => !r.url);
console.log(`\n⚠️  Resources without URLs: ${noUrlResources.length}`);

// 4. Resource type breakdown
const typeBreakdown = {};
allResources.forEach(r => {
    typeBreakdown[r._type] = (typeBreakdown[r._type] || 0) + 1;
});

console.log('\n📈 Resources by Type:');
Object.entries(typeBreakdown).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
});

// 5. Language coverage
const languageCoverage = {};
allResources.forEach(r => {
    languageCoverage[r._langName] = (languageCoverage[r._langName] || 0) + 1;
});

console.log(`\n🌍 Languages with resources: ${Object.keys(languageCoverage).length}`);

// 6. Free vs Paid breakdown
const freeResources = allResources.filter(r => r.free === true);
const paidResources = allResources.filter(r => r.free === false);
console.log(`\n💰 Pricing Breakdown:`);
console.log(`   Free: ${freeResources.length}`);
console.log(`   Paid: ${paidResources.length}`);
console.log(`   Unspecified: ${allResources.length - freeResources.length - paidResources.length}`);

// 7. Check for duplicate IDs
const idMap = {};
allResources.forEach(r => {
    if (idMap[r._id]) {
        idMap[r._id]++;
    } else {
        idMap[r._id] = 1;
    }
});
const duplicates = Object.entries(idMap).filter(([id, count]) => count > 1);
if (duplicates.length > 0) {
    console.log(`\n⚠️  Duplicate resource IDs found: ${duplicates.length}`);
} else {
    console.log('\n✅ All resource IDs are unique');
}

// 8. Sample resources for verification
console.log('\n📋 Sample Resources (first 5):');
allResources.slice(0, 5).forEach((r, i) => {
    console.log(`\n${i + 1}. ${r._langFlag} ${r._langName} - ${r.name}`);
    console.log(`   Type: ${r._type}, Free: ${r.free ? 'Yes' : 'No'}`);
    console.log(`   URL: ${r.url ? `${r.url.substring(0, 50)  }...` : 'No URL'}`);
});

// Final summary
console.log(`\n${  '=' .repeat(60)}`);
console.log('📊 FINAL SUMMARY:');
console.log('=' .repeat(60));

const validationStatus = undefinedResources.length === 0 ? '✅ PASSED' : '❌ FAILED';
console.log(`\nValidation Status: ${validationStatus}`);
console.log(`Total Resources: ${allResources.length}`);
console.log(`Undefined Names: ${undefinedResources.length}`);
console.log(`Missing URLs: ${noUrlResources.length}`);
console.log(`Unique Languages: ${Object.keys(languageCoverage).length}`);

if (undefinedResources.length === 0) {
    console.log('\n🎉 Review tool data loading is VALID and ready for use!');
} else {
    console.log('\n⚠️  Please fix undefined resources before using review tool.');
}

console.log(`\n${  '=' .repeat(60)}`);