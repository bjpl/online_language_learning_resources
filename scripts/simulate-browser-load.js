const fs = require('fs');
const path = require('path');

// Simulate browser global
global.window = {};
global.languageData = {};

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

console.log('Simulating browser loading of all language files...\n');

let loadedCount = 0;
const failedFiles = [];

allFiles.forEach(filename => {
    const filePath = path.join(jsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    try {
        eval(content);
        if (Object.keys(global.languageData).length > loadedCount) {
            loadedCount = Object.keys(global.languageData).length;
        }
    } catch (error) {
        failedFiles.push({ file: filename, error: error.message });
    }
});

console.log(`Files processed: ${allFiles.length}`);
console.log(`Languages in languageData: ${Object.keys(global.languageData).length}`);
console.log(`Failed to load: ${failedFiles.length}`);

if (failedFiles.length > 0) {
    console.log('\nFailed files:');
    failedFiles.forEach(({ file, error }) => {
        console.log(`  ❌ ${file}: ${error}`);
    });
}

console.log('\nLanguages successfully loaded:');
console.log(Object.keys(global.languageData).sort().join(', '));