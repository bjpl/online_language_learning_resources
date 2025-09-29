// CONCEPT: Systematically check and fix each language file for undefined issues
// WHY: Need to carefully identify and fix the actual undefined content

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const problematicLanguages = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian', 'danish',
    'dari', 'dutch', 'estonian'
];

console.log('=== SYSTEMATIC LANGUAGE-BY-LANGUAGE FIX ===\n');

const issues = [];
const fixes = [];

problematicLanguages.forEach(lang => {
    console.log(`\n=== Checking ${lang} ===`);
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`  ❌ File not found: ${lang}-data.js`);
        issues.push({ lang, issue: 'file-missing' });
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
        console.log(`  ❌ Error loading file: ${error.message}`);
        issues.push({ lang, issue: 'load-error', error: error.message });
        return;
    }

    // Check if language was added to languageData
    const langData = sandbox.languageData[lang];
    if (!langData) {
        console.log(`  ❌ Language not in languageData`);
        issues.push({ lang, issue: 'not-in-languageData' });
        return;
    }

    // Check apps structure
    const apps = langData.resources?.apps || langData.apps;
    if (!apps) {
        console.log(`  ❌ No apps property found`);
        issues.push({ lang, issue: 'no-apps' });
        return;
    }

    if (!Array.isArray(apps)) {
        console.log(`  ❌ Apps is not an array`);
        issues.push({ lang, issue: 'apps-not-array' });
        return;
    }

    // Check for undefined or problematic entries
    let hasIssues = false;
    let undefinedCount = 0;
    let emptyItemsCount = 0;
    let invalidNamesCount = 0;

    apps.forEach((category, catIndex) => {
        if (!category) {
            console.log(`  ❌ Category ${catIndex} is undefined`);
            undefinedCount++;
            hasIssues = true;
            return;
        }

        if (!category.items || !Array.isArray(category.items)) {
            console.log(`  ⚠️ Category "${category.category}" has no items array`);
            emptyItemsCount++;
            return;
        }

        category.items.forEach((item, itemIndex) => {
            if (!item) {
                console.log(`  ❌ Item ${catIndex}.${itemIndex} is undefined`);
                undefinedCount++;
                hasIssues = true;
            } else if (!item.name || item.name === 'undefined') {
                console.log(`  ❌ Item ${catIndex}.${itemIndex} has invalid name: "${item.name}"`);
                invalidNamesCount++;
                hasIssues = true;
            }
        });
    });

    if (hasIssues) {
        console.log(`  ⚠️ ISSUES FOUND:`);
        console.log(`     - Undefined entries: ${undefinedCount}`);
        console.log(`     - Invalid names: ${invalidNamesCount}`);
        console.log(`     - Empty categories: ${emptyItemsCount}`);

        issues.push({
            lang,
            issue: 'has-undefined',
            details: { undefinedCount, invalidNamesCount, emptyItemsCount }
        });

        // Prepare fix
        fixes.push(lang);
    } else {
        const totalApps = apps.reduce((sum, cat) => {
            if (cat.items && Array.isArray(cat.items)) {
                return sum + cat.items.length;
            }
            return sum;
        }, 0);
        console.log(`  ✅ OK - ${totalApps} apps`);
    }
});

console.log('\n\n=== SUMMARY ===');
console.log(`Total languages checked: ${problematicLanguages.length}`);
console.log(`Languages with issues: ${issues.length}`);

if (issues.length > 0) {
    console.log('\n=== ISSUES BY LANGUAGE ===');
    issues.forEach(({ lang, issue, details, error }) => {
        console.log(`${lang}: ${issue}`);
        if (details) {
            console.log(`  Details:`, details);
        }
        if (error) {
            console.log(`  Error: ${error}`);
        }
    });

    console.log('\n=== FILES THAT NEED FIXING ===');
    fixes.forEach(lang => {
        console.log(`- ${lang}-data.js`);
    });

    // Create a fix script
    console.log('\n=== CREATING FIX SCRIPT ===');

    const fixScript = `// Auto-generated fix script
const fs = require('fs');
const path = require('path');

const filesToFix = ${JSON.stringify(fixes, null, 2)};

filesToFix.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', \`\${lang}-data.js\`);
    console.log(\`Fixing \${lang}-data.js...\`);

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove any undefined entries in apps arrays
    // This is a careful regex to find and remove undefined items
    content = content.replace(/,\\s*undefined(?=[\\s,\\]])/g, '');
    content = content.replace(/undefined,\\s*/g, '');
    content = content.replace(/\\[\\s*undefined\\s*\\]/g, '[]');

    // Remove items with name: "undefined"
    content = content.replace(/\\{[^}]*name:\\s*["']undefined["'][^}]*\\},?/g, '');

    // Clean up any double commas left behind
    content = content.replace(/,\\s*,/g, ',');
    content = content.replace(/\\[\\s*,/g, '[');
    content = content.replace(/,\\s*\\]/g, ']');

    fs.writeFileSync(filePath, content);
    console.log(\`✓ Fixed \${lang}-data.js\`);
});

console.log('\\nAll fixes complete!');`;

    fs.writeFileSync(path.join(__dirname, 'apply-undefined-fixes.js'), fixScript);
    console.log('Fix script created: apply-undefined-fixes.js');
    console.log('Run: node scripts/apply-undefined-fixes.js');
}