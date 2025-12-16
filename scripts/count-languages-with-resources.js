const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const allFiles = fs.readdirSync(jsDir)
    .filter(f => f.endsWith('-data.js') && f !== 'data-simple.js')
    .sort();

console.log('Checking which languages have resources...\n');

let withResources = 0;
let withoutResources = 0;
const languagesWithoutResources = [];

allFiles.forEach(filename => {
    const filePath = path.join(jsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file has resources section
    if (content.includes('resources:') && content.includes('courses:') ||
        content.includes('apps:') ||
        content.includes('books:')) {
        withResources++;
    } else {
        withoutResources++;
        languagesWithoutResources.push(filename);
    }
});

console.log(`Languages WITH resources: ${withResources}`);
console.log(`Languages WITHOUT resources: ${withoutResources}`);
console.log(`\nTotal: ${allFiles.length}`);

if (languagesWithoutResources.length > 0) {
    console.log('\n Languages without resources:');
    languagesWithoutResources.forEach(f => console.log(`   - ${f}`));
}