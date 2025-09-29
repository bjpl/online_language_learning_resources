const fs = require('fs');
const path = require('path');

// Get all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

// Read resources.html and extract script tags
const htmlPath = path.join(__dirname, '..', 'resources.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const scriptMatches = htmlContent.matchAll(/src="assets\/js\/([^"]+)"/g);
const scriptsInHtml = [...scriptMatches]
    .map(m => m[1])
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

console.log('Language data files in filesystem:', allFiles.length);
console.log('Language scripts in resources.html:', scriptsInHtml.length);
console.log('');

// Find missing from HTML
const missingFromHtml = allFiles.filter(f => !scriptsInHtml.includes(f));
if (missingFromHtml.length > 0) {
    console.log('❌ Missing from resources.html:');
    missingFromHtml.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

// Find in HTML but not in filesystem
const notInFilesystem = scriptsInHtml.filter(f => !allFiles.includes(f));
if (notInFilesystem.length > 0) {
    console.log('⚠️  In HTML but not in filesystem:');
    notInFilesystem.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

if (missingFromHtml.length === 0 && notInFilesystem.length === 0) {
    console.log('✅ All language files are properly loaded in resources.html!');
}