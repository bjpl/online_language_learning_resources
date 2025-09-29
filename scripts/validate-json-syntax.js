const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

console.log('Validating JavaScript syntax in all language files...\n');

let validCount = 0;
let invalidCount = 0;

allFiles.forEach(filename => {
    const filePath = path.join(jsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    try {
        // Try to evaluate the file content
        eval(content);
        validCount++;
    } catch (error) {
        console.log(`❌ ${filename}: ${error.message}`);
        invalidCount++;
    }
});

console.log(`\n✅ Valid files: ${validCount}`);
console.log(`❌ Invalid files: ${invalidCount}`);
console.log(`Total: ${allFiles.length}`);