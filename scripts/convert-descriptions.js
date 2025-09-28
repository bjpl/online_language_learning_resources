const fs = require('fs');
const path = require('path');

const languageFiles = [
    'quechua-data.js', 'hausa-data.js', 'gujarati-data.js', 'punjabi-data.js',
    'urdu-data.js', 'hmong-data.js', 'lao-data.js', 'telugu-data.js',
    'pashto-data.js', 'sign-language-data.js', 'ukrainian-data.js', 'navajo-data.js',
    'slovak-data.js', 'yoruba-data.js', 'irish-data.js', 'mongolian-data.js',
    'flemish-data.js', 'cree-data.js', 'chinese-data.js', 'guarani-data.js'
];

function convertDescriptionToFeatures(description) {
    const parts = description
        .replace(/\s+-\s+/g, ' | ')
        .replace(/\.\s+/g, ' | ')
        .replace(/,\s+/g, ' | ')
        .split(' | ')
        .map(part => part.trim())
        .filter(part => part.length > 0 && part.length < 100);

    if (parts.length > 5) {
        return parts.slice(0, 5);
    }

    return parts.length > 0 ? parts : [description];
}

function processFile(filename) {
    const filePath = path.join(__dirname, '..', 'assets', 'js', filename);

    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filename} - file not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    const descriptionRegex = /description:\s*"([^"]+)"/g;
    let match;
    let conversions = 0;

    while ((match = descriptionRegex.exec(content)) !== null) {
        const originalDesc = match[1];
        const features = convertDescriptionToFeatures(originalDesc);
        const featuresStr = JSON.stringify(features);

        const oldPattern = `description: "${originalDesc}"`;
        const newPattern = `features: ${featuresStr}`;

        content = content.replace(oldPattern, newPattern);
        conversions++;
    }

    if (conversions > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${filename}: Converted ${conversions} descriptions to features`);
    } else {
        console.log(`○ ${filename}: No conversions needed`);
    }
}

console.log('Converting descriptions to features arrays...\n');

languageFiles.forEach(file => {
    try {
        processFile(file);
    } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
    }
});

console.log('\nConversion complete!');