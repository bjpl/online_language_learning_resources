const fs = require('fs');
const path = require('path');

// List of files that need fixing (from the error messages)
const filesToFix = [
    'cebuano-data.js',
    'croatian-data.js',
    'dari-data.js',
    'gujarati-data.js',
    'hausa-data.js',
    'hmong-data.js',
    'hungarian-data.js',
    'inuktitut-data.js',
    'irish-data.js',
    'kannada-data.js',
    'lao-data.js',
    'mongolian-data.js',
    'navajo-data.js',
    'nepali-data.js',
    'pashto-data.js',
    'punjabi-data.js',
    'quechua-data.js',
    'sign-language-data.js',
    'slovak-data.js',
    'telugu-data.js',
    'ukrainian-data.js',
    'urdu-data.js',
    'welsh-data.js',
    'yoruba-data.js'
];

const assetsJsDir = path.join(__dirname, '..', 'assets', 'js');

console.log('Fixing export statements in language files...\n');

filesToFix.forEach(filename => {
    const filePath = path.join(assetsJsDir, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠ File not found: ${filename}`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Extract the variable name from the export statement
        const exportMatch = content.match(/export default (\w+Resources);/);

        if (!exportMatch) {
            console.log(`  ⚠ No export statement found in ${filename}`);
            return;
        }

        const varName = exportMatch[1];

        // Get the language key (e.g., 'cebuano' from 'cebuanoResources')
        const langKey = varName.replace('Resources', '').toLowerCase();

        // Replace ES6 export with traditional assignment
        const newExport = `
if (typeof languageData !== 'undefined') {
    languageData.${langKey} = ${varName};
}`;

        content = content.replace(/export default \w+Resources;/, newExport.trim());

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ Fixed ${filename} (${langKey})`);

    } catch (error) {
        console.log(`  ✗ Error fixing ${filename}: ${error.message}`);
    }
});

console.log('\n✓ Export fix complete!');