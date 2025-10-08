const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Simulate browser environment
global.window = { languageData: {} };
global.languageData = {};

// Load all data files in the order they appear in resources.html
const files = [
    'dutch', 'danish', 'portuguese', 'italian', 'indonesian', 'korean',
    'hindi', 'swahili', 'japanese', 'swedish', 'finnish', 'polish', 'vietnamese'
];

const errors = [];
let successCount = 0;

files.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Run in context to catch syntax errors
        vm.runInThisContext(content, { filename: `${lang}-data.js` });

        console.log(`✓ ${lang}-data.js loaded successfully`);
        successCount++;
    } catch (error) {
        errors.push(`${lang}-data.js: ${error.message}`);
        console.log(`✗ ${lang}-data.js: ${error.message}`);
    }
});

console.log(`\n${  '='.repeat(40)}`);
console.log(`Languages loaded: ${successCount}/${files.length}`);
console.log(`Total in languageData: ${Object.keys(global.window.languageData || {}).length}`);

if (errors.length > 0) {
    console.log(`\nErrors found (${errors.length}):`);
    errors.forEach(err => console.log(`  - ${err}`));
    process.exit(1);
} else {
    console.log('All files loaded successfully! ✓');
}
console.log('='.repeat(40));