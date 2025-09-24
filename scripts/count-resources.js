const fs = require('fs');
const path = require('path');

// Get all -data.js files
const dataDir = path.join(__dirname, '..', 'assets', 'js');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('-data.js'));

let totalResources = 0;
const resourceCounts = {};

files.forEach(file => {
    try {
        const lang = file.replace('-data.js', '');
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Count resources - looking for url: patterns within resources sections
        const urlMatches = content.match(/url\s*:/g) || [];
        const count = urlMatches.length;

        resourceCounts[lang] = count;
        totalResources += count;
        console.log(`${lang}: ${count} resources`);
    } catch (error) {
        console.log(`${file}: ERROR - ${error.message}`);
    }
});

console.log('\n' + '='.repeat(40));
console.log(`TOTAL RESOURCES: ${totalResources}`);
console.log('='.repeat(40));