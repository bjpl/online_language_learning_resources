// Final test of all problematic languages
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const problematicLanguages = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian', 'czech',
    'danish', 'dari', 'dutch', 'estonian', 'hebrew'
];

console.log('=== FINAL TEST OF ALL LANGUAGES ===\n');

// Create sandbox
const sandbox = {
    console,
    window: {},
    languageData: {}
};
const context = vm.createContext(sandbox);

// Load data-simple.js
const dataSimplePath = path.join(__dirname, '..', 'assets', 'js', 'data-simple.js');
if (fs.existsSync(dataSimplePath)) {
    vm.runInContext(fs.readFileSync(dataSimplePath, 'utf-8'), context);
}

let allGood = true;
const results = [];

problematicLanguages.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ ${lang}: FILE NOT FOUND`);
        results.push({ lang, status: 'missing-file', apps: 0 });
        allGood = false;
        return;
    }

    // Load the file
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
        vm.runInContext(content, context);
    } catch (error) {
        console.log(`❌ ${lang}: ERROR - ${error.message}`);
        results.push({ lang, status: 'error', apps: 0 });
        allGood = false;
        return;
    }

    // Check the data
    const langData = sandbox.languageData[lang];
    if (!langData) {
        console.log(`❌ ${lang}: NOT IN LANGUAGEDATA`);
        results.push({ lang, status: 'not-loaded', apps: 0 });
        allGood = false;
        return;
    }

    // Check apps
    const apps = langData.resources?.apps || langData.apps;
    if (!apps || !Array.isArray(apps)) {
        console.log(`❌ ${lang}: NO APPS ARRAY`);
        results.push({ lang, status: 'no-apps', apps: 0 });
        allGood = false;
        return;
    }

    // Count apps with correct structure
    let appCount = 0;
    let hasCorrectStructure = true;

    apps.forEach(category => {
        if (!category.category || !category.items || !Array.isArray(category.items)) {
            hasCorrectStructure = false;
        } else {
            appCount += category.items.length;
        }
    });

    if (!hasCorrectStructure) {
        console.log(`⚠️  ${lang}: WRONG STRUCTURE - needs category/items format`);
        results.push({ lang, status: 'wrong-structure', apps: appCount });
        allGood = false;
    } else {
        console.log(`✅ ${lang}: ${appCount} apps`);
        results.push({ lang, status: 'ok', apps: appCount });
    }
});

console.log('\n=== SUMMARY ===');
console.log(`Total tested: ${problematicLanguages.length}`);
console.log(`Passed: ${results.filter(r => r.status === 'ok').length}`);
console.log(`Failed: ${results.filter(r => r.status !== 'ok').length}`);

if (allGood) {
    console.log('\n✅ ALL LANGUAGES FIXED AND WORKING!');
} else {
    console.log('\n⚠️ Some languages still have issues:');
    results.filter(r => r.status !== 'ok').forEach(r => {
        console.log(`  - ${r.lang}: ${r.status}`);
    });
}

// Also test that they're included in index.html
console.log('\n=== CHECKING INDEX.HTML INCLUDES ===');
const indexPath = path.join(__dirname, '..', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

problematicLanguages.forEach(lang => {
    if (!indexContent.includes(`${lang}-data.js`)) {
        console.log(`⚠️ ${lang} NOT included in index.html`);
    }
});

console.log('\nTest complete!');