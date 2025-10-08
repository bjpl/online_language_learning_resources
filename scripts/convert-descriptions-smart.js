const fs = require('fs');
const path = require('path');

// Smart feature extraction that creates concise, meaningful features
function extractFeatures(description) {
    if (!description || typeof description !== 'string') {
        return null;
    }

    let features = [];

    // First, split by major separators (periods, semicolons, "and")
    const parts = description
        .split(/[.;]|(?<!\band\s)(?:\s+and\s+)(?!\s)/gi)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    for (const part of parts) {
        // Extract level information (A1-C2, beginner-advanced, etc.)
        const levelMatch = part.match(/\b([ABCXYZ][12](?:-[ABCXYZ][12])?|beginner|intermediate|advanced|all levels)\b/i);

        // Extract certificate/certification info
        const certMatch = part.match(/\b(certificate|certification|certified)\b/i);

        // Extract platform/provider info
        const providerMatch = part.match(/(?:by|from|via)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})/);

        // Extract learning modalities
        const modalityMatch = part.match(/\b(video|audio|interactive|gamified|immersive|conversation|listening|reading|writing|speaking|grammar|vocabulary|pronunciation)\b/i);

        // Extract special features
        const specialMatch = part.match(/\b(free|paid|tutor|native speaker|community|forum|podcast|app|mobile|desktop|web-based)\b/i);

        // Build features from extracted information
        if (levelMatch && !features.some(f => /level|beginner|intermediate|advanced/i.test(f))) {
            features.push(levelMatch[1]);
        }

        if (certMatch && !features.some(f => /certificate/i.test(f))) {
            features.push('Certificate available');
        }

        if (providerMatch && !features.some(f => f.includes(providerMatch[1]))) {
            const provider = providerMatch[1].trim();
            if (provider.split(' ').length <= 3) {
                features.push(`${provider} platform`);
            }
        }

        if (modalityMatch && !features.some(f => f.toLowerCase().includes(modalityMatch[1].toLowerCase()))) {
            features.push(`${modalityMatch[1]} exercises`);
        }

        if (specialMatch && !features.some(f => f.toLowerCase().includes(specialMatch[1].toLowerCase()))) {
            const special = specialMatch[1].toLowerCase();
            if (special === 'tutor') {
                features.push('Tutor support');
            } else if (special === 'native speaker') {
                features.push('Native speaker content');
            } else if (special === 'community' || special === 'forum') {
                features.push('Community support');
            } else if (special === 'app' || special === 'mobile') {
                features.push('Mobile app');
            }
        }

        // If no specific patterns matched, try to extract a clean short description
        if (features.length === 0 || (part.length < 50 && !features.some(f => part.toLowerCase().includes(f.toLowerCase())))) {
            // Clean up the part
            const cleaned = part
                .replace(/\([^)]*\)/g, '') // Remove parentheses
                .replace(/\s+/g, ' ')
                .trim();

            // If it's short enough and meaningful, add it
            if (cleaned.length > 5 && cleaned.length < 60 && cleaned.split(' ').length <= 8) {
                // Make sure it's not redundant
                if (!features.some(f => cleaned.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(cleaned.toLowerCase()))) {
                    features.push(cleaned);
                }
            }
        }
    }

    // If we still have no features, try a more aggressive approach
    if (features.length === 0) {
        // Split by commas and take first few meaningful chunks
        const chunks = description
            .split(/[,]/)
            .map(s => s.trim().replace(/\([^)]*\)/g, '').trim())
            .filter(s => s.length > 5 && s.length < 60)
            .slice(0, 4);

        features = chunks;
    }

    // Limit to 5 features max
    features = features.slice(0, 5);

    // Ensure each feature is properly capitalized
    features = features.map(f => {
        if (f === f.toUpperCase() || f === f.toLowerCase()) {
            return f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
        }
        return f;
    });

    return features.length > 0 ? features : null;
}

// Process items recursively
function processItems(items) {
    let convertedCount = 0;

    for (const item of items) {
        // Only convert if description exists and features doesn't
        if (item.description && !item.features) {
            const features = extractFeatures(item.description);
            if (features && features.length > 0) {
                item.features = features;
                delete item.description;
                convertedCount++;
            }
        }
    }

    return convertedCount;
}

// Process a single language file
function processLanguageFile(filePath) {
    console.log(`\nProcessing ${path.basename(filePath)}...`);

    const content = fs.readFileSync(filePath, 'utf8');

    // Load the module using require (after temporarily renaming to .cjs)
    // Better approach: parse the object structure directly
    const match = content.match(/const\s+(\w+Resources)\s*=\s*(\{[\s\S]*?\n\})/);
    if (!match) {
        console.log(`  ⚠ Could not parse resources object`);
        return;
    }

    const varName = match[1];
    const objStr = match[2];

    // Use eval to parse the object (safe in this controlled context)
    let languageData;
    try {
        languageData = eval(`(${objStr})`);
    } catch (e) {
        console.log(`  ⚠ Could not evaluate resources object: ${e.message}`);
        return;
    }

    let totalConverted = 0;

    // Process all resource categories
    if (languageData.resources) {
        for (const categoryKey in languageData.resources) {
            const categoryArray = languageData.resources[categoryKey];
            if (Array.isArray(categoryArray)) {
                for (const category of categoryArray) {
                    if (category.items && Array.isArray(category.items)) {
                        totalConverted += processItems(category.items);
                    }
                }
            }
        }
    }

    if (totalConverted === 0) {
        console.log(`  ℹ No conversions needed`);
        return;
    }

    // Write back to file
    let newContent = `const ${varName} = ${JSON.stringify(languageData, null, 4)};\n\n`;
    newContent += `export default ${varName};`;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✓ Converted ${totalConverted} descriptions to features`);
}

// Main execution
const assetsJsDir = path.join(__dirname, '..', 'assets', 'js');

// List of languages that need conversion (from the user's request)
const languagesToConvert = [
    'cebuano', 'chinese', 'cree', 'croatian', 'dari', 'flemish', 'guarani',
    'gujarati', 'hausa', 'hmong', 'hungarian', 'inuktitut', 'irish', 'kannada',
    'lao', 'mongolian', 'nahuatl', 'navajo', 'nepali', 'pashto', 'punjabi',
    'quechua', 'sign-language', 'slovak', 'telugu', 'ukrainian', 'urdu', 'welsh', 'yoruba'
];

console.log('Starting smart description-to-features conversion...\n');

for (const lang of languagesToConvert) {
    const filePath = path.join(assetsJsDir, `${lang}-data.js`);
    if (fs.existsSync(filePath)) {
        try {
            processLanguageFile(filePath);
        } catch (error) {
            console.log(`  ✗ Error processing ${lang}: ${error.message}`);
        }
    } else {
        console.log(`  ⚠ File not found: ${lang}-data.js`);
    }
}

console.log('\n✓ Smart conversion complete!');