// CONCEPT: Fix languages with direct app items by wrapping them in categories
// WHY: Display code expects apps[].category and apps[].items structure

const fs = require('fs');
const path = require('path');

// Languages that need fixing (have direct items instead of categories)
const languagesToFix = [
    'italian', 'indonesian', 'korean', 'hindi', 'swahili',
    'japanese', 'swedish', 'finnish', 'polish', 'vietnamese'
];

console.log('=== FIXING DIRECT APPS STRUCTURE ===\n');
console.log(`Will fix ${languagesToFix.length} languages with direct app items.\n`);

languagesToFix.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);
    console.log(`\nProcessing ${lang}-data.js...`);

    if (!fs.existsSync(filePath)) {
        console.log(`  ❌ File not found: ${lang}-data.js`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Find the apps array
    const appsStartRegex = /(\s+)apps:\s*\[/;
    const appsStartMatch = content.match(appsStartRegex);

    if (!appsStartMatch) {
        console.log(`  ❌ Could not find apps array`);
        return;
    }

    const indentLevel = appsStartMatch[1];
    console.log(`  Found apps array with indent level: ${indentLevel.length} spaces`);

    // Find where apps array ends
    const startIndex = content.indexOf(appsStartMatch[0]);
    let bracketCount = 0;
    let inApps = false;
    let endIndex = -1;

    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '[') {
            bracketCount++;
            inApps = true;
        } else if (content[i] === ']' && inApps) {
            bracketCount--;
            if (bracketCount === 0) {
                endIndex = i + 1;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.log(`  ❌ Could not find end of apps array`);
        return;
    }

    // Extract the apps array content
    const appsSection = content.substring(startIndex, endIndex);
    console.log(`  Extracted apps section (${appsSection.length} chars)`);

    // Check if already has category structure
    if (appsSection.includes('category:') && appsSection.includes('items:')) {
        console.log(`  ✓ Already has category structure, skipping`);
        return;
    }

    // Parse the individual app items
    const itemRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    const items = [];
    let match;

    while ((match = itemRegex.exec(appsSection)) !== null) {
        const itemContent = match[0];
        // Check if this looks like an app item (has name property)
        if (itemContent.includes('name:')) {
            // Adjust indentation - add 8 more spaces for nesting under items
            const adjustedItem = itemContent.split('\n').map((line, idx) => {
                if (idx === 0) return '                    {';
                if (line.trim() === '') return line;
                return `        ${  line}`;
            }).join('\n');
            items.push(adjustedItem);
        }
    }

    console.log(`  Found ${items.length} app items to wrap`);

    if (items.length === 0) {
        console.log(`  ⚠️ No app items found, skipping`);
        return;
    }

    // Create new apps structure with category wrapper
    const newAppsStructure = `${indentLevel}apps: [
${indentLevel}        {
${indentLevel}            category: "Mobile Apps and Software",
${indentLevel}            items: [
${items.join(',\n')}
${indentLevel}            ]
${indentLevel}        }
${indentLevel}    ]`;

    // Replace the old apps section with the new one
    const newContent = content.substring(0, startIndex) +
                       newAppsStructure +
                       content.substring(endIndex);

    // Write the fixed content
    fs.writeFileSync(filePath, newContent);
    console.log(`  ✅ Fixed ${lang}-data.js - wrapped ${items.length} items in category structure`);
});

console.log('\n=== FIX COMPLETE ===');
console.log(`\nAll ${languagesToFix.length} languages have been fixed with proper category/items structure.`);
console.log('\nThe undefined display issue should now be resolved for all languages.');