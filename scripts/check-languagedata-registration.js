const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

console.log('Checking languageData registration in all files...\n');

const missingRegistration = [];
const hasRegistration = [];

allFiles.forEach(filename => {
    const filePath = path.join(jsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file has languageData registration
    if (content.includes('if (typeof languageData') || content.includes('languageData[')) {
        hasRegistration.push(filename);
    } else {
        missingRegistration.push(filename);
    }
});

console.log(`✅ Files WITH languageData registration: ${hasRegistration.length}`);
console.log(`❌ Files MISSING languageData registration: ${missingRegistration.length}\n`);

if (missingRegistration.length > 0) {
    console.log('Files missing registration:');
    missingRegistration.forEach(f => console.log(`   - ${f}`));
}