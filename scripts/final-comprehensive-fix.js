const fs = require('fs');
const path = require('path');

// CONCEPT: Final comprehensive fix for all language files
// WHY: Need to properly place apps sections without breaking existing structure
// PATTERN: Parse structure, remove misplaced apps, add in correct location

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log('🔧 FINAL COMPREHENSIVE FIX\n');
console.log('=' . repeat(60) + '\n');

let fixedCount = 0;
let alreadyCorrect = 0;
let errors = 0;

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        console.log(`Processing ${file}...`);

        // Step 1: Remove any misplaced apps sections
        // Look for apps in wrong places (like in the middle of items)
        const misplacedPatterns = [
            /,\s*apps\s*:\s*\[\s*\]/g,  // apps as a property of an item
            /\]\s*,\s*apps\s*:\s*\[\s*\]/g,  // apps after an array close
            /free\s*:\s*true\s*,\s*apps\s*:\s*\[\s*\]/g,  // apps after free property
        ];

        misplacedPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                console.log(`  Removing misplaced apps...`);
                content = content.replace(pattern, (match) => {
                    // Keep the structural parts but remove apps
                    if (match.includes('free')) {
                        return 'free: true';
                    }
                    if (match.startsWith(']')) {
                        return ']';
                    }
                    return '';
                });
            }
        });

        // Step 2: Check if apps exists in the correct location
        let hasCorrectApps = false;

        // Check for Type A structure (nested resources)
        if (content.includes('resources:') || content.includes('"resources":')) {
            // Find the resources object boundaries
            const resourcesMatch = content.match(/resources\s*:\s*\{([\s\S]*?)\n\s*\}/);
            if (resourcesMatch) {
                const resourcesContent = resourcesMatch[1];
                // Check if apps is at the end of resources content
                hasCorrectApps = /,\s*apps\s*:\s*\[\s*\]\s*$/.test(resourcesContent) ||
                                /\n\s*apps\s*:\s*\[\s*\]\s*$/.test(resourcesContent);
            }
        } else {
            // Check for Type B structure (flat)
            // Apps should be near the end of the main object
            const mainObjectMatch = content.match(/const\s+\w+Resources\s*=\s*\{([\s\S]*)\}\s*;?/);
            if (mainObjectMatch) {
                const mainContent = mainObjectMatch[1];
                hasCorrectApps = /,\s*apps\s*:\s*\[\s*\]\s*$/.test(mainContent) ||
                                /\n\s*apps\s*:\s*\[\s*\]\s*$/.test(mainContent);
            }
        }

        if (hasCorrectApps) {
            console.log(`  ✅ Already has apps in correct location`);
            alreadyCorrect++;
        } else {
            // Step 3: Add apps in the correct location
            console.log(`  Adding apps in correct location...`);

            // Remove any remaining apps references first
            content = content.replace(/,?\s*apps\s*:\s*\[\s*\]/g, '');

            // Determine structure and add apps
            if (content.includes('resources:') || content.includes('"resources":')) {
                // Type A: Nested resources
                // Find the closing of the resources object
                const pattern = /(resources\s*:\s*\{[\s\S]*?)(\n\s*\})/;
                const match = content.match(pattern);

                if (match) {
                    const resourcesContent = match[1];
                    const closing = match[2];

                    // Add apps before the closing brace
                    const needsComma = resourcesContent.trim().endsWith(']') ||
                                      resourcesContent.trim().endsWith('}');
                    const insertion = needsComma ? ',\n        apps: []' : '\n        apps: []';

                    content = content.replace(pattern, resourcesContent + insertion + closing);
                }
            } else {
                // Type B: Flat structure
                // Find the end of the main object
                const pattern = /(const\s+\w+Resources\s*=\s*\{[\s\S]*?)(\n\s*\}\s*;?)/;
                const match = content.match(pattern);

                if (match) {
                    const mainContent = match[1];
                    const closing = match[2];

                    // Add apps before the closing brace
                    const needsComma = mainContent.trim().endsWith(']') ||
                                      mainContent.trim().endsWith('}');
                    const insertion = needsComma ? ',\n    apps: []' : '\n    apps: []';

                    content = content.replace(pattern, mainContent + insertion + closing);
                }
            }
        }

        // Step 4: Clean up any syntax issues
        content = content.replace(/,,+/g, ',');  // Remove double commas
        content = content.replace(/,(\s*\})/g, '$1');  // Remove trailing commas before }
        content = content.replace(/,(\s*\])/g, '$1');  // Remove trailing commas before ]

        // Step 5: Validate and save
        if (content !== originalContent) {
            // Quick validation - no orphaned content
            const hasOrphanedContent = /\]\s*,\s*free/.test(content) ||
                                       /\}\s*,\s*free/.test(content) ||
                                       /\]\s*,\s*"/.test(content);

            if (hasOrphanedContent) {
                console.log(`  ⚠️ Still has structural issues, skipping`);
                errors++;
            } else {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  ✅ Fixed and saved`);
                fixedCount++;
            }
        }

    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        errors++;
    }
});

// Final validation
console.log('\n' + '='.repeat(60));
console.log('VALIDATION RESULTS\n');

let validCount = 0;
let invalidFiles = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Basic syntax checks
        const issues = [];
        if (/,,/.test(content)) issues.push('double comma');
        if (/\]\s*,\s*free/.test(content)) issues.push('orphaned free property');
        if (/\}\s*,\s*free/.test(content)) issues.push('misplaced free property');

        if (issues.length === 0) {
            validCount++;
        } else {
            invalidFiles.push({ file, issues });
        }
    } catch (error) {
        invalidFiles.push({ file, issues: ['read error'] });
    }
});

// Summary
console.log('=' . repeat(60));
console.log('FINAL SUMMARY');
console.log('=' . repeat(60));
console.log(`✅ Fixed: ${fixedCount} files`);
console.log(`✓  Already correct: ${alreadyCorrect} files`);
console.log(`✓  Valid files: ${validCount}/${languageFiles.length}`);
console.log(`❌ Invalid files: ${invalidFiles.length}`);
console.log(`⚠️  Errors: ${errors}`);

if (invalidFiles.length > 0) {
    console.log('\n❌ FILES STILL WITH ISSUES:');
    invalidFiles.forEach(item => {
        console.log(`  ${item.file}: ${item.issues.join(', ')}`);
    });
    console.log('\nThese files need manual review.');
} else {
    console.log('\n✨ SUCCESS! All files are now properly structured.');
    console.log('\n💡 NEXT STEPS:');
    console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
    console.log('2. Hard refresh the page (Ctrl+Shift+R)');
    console.log('3. Check that undefined entries are gone');
}