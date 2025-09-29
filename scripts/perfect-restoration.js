/**
 * PERFECT RESTORATION SCRIPT
 *
 * This script properly adds apps: [] to language files without truncation.
 *
 * CRITICAL: Preserves ALL content when inserting apps section
 *
 * Pattern matching for two data structures:
 * Type A: { resources: { courses: [...], apps: [] } }
 * Type B: { courses: [...], apps: [] }
 */

const fs = require('fs');
const path = require('path');

// Get all language data files except the 5 that already have apps properly
const dir = path.join(__dirname, '..', 'assets', 'js');
const files = fs.readdirSync(dir).filter(file =>
    file.endsWith('-data.js') &&
    file !== 'language-data.js' &&
    !['yoruba-data.js', 'ukrainian-data.js', 'urdu-data.js', 'slovak-data.js', 'welsh-data.js'].includes(file)
);

console.log('🔧 Perfect Restoration Script Starting...');
console.log(`📁 Processing ${files.length} files (excluding the 5 already fixed)\n`);

let fixedCount = 0;
let errorCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalLength = content.length;

        // Check if file already has apps
        if (/\bapps\s*:\s*\[/.test(content)) {
            console.log(`✅ ${file} - Already has apps section`);
            return;
        }

        // Find the best insertion point - right before the closing brace and semicolon
        // Look for patterns like: }; or };$ (end of file)

        // Strategy: Find the LAST closing brace that belongs to our main object
        // This is typically followed by a semicolon and optionally languageData assignment

        // First, let's find where the main object ends
        // Pattern 1: Look for }\n}; at the end (nested structure)
        // Pattern 2: Look for just }; at the end (flat structure)

        let insertionPoint = -1;
        let insertionType = '';

        // Check for nested resources structure
        if (content.includes('"resources"') || content.includes('resources:')) {
            // Type A: Nested structure - find the closing of resources object
            // Look for the pattern: } (closing resources) } (closing main object);
            const resourcesMatch = content.match(/(\n\s*)\}\s*\n\s*\};/);
            if (resourcesMatch) {
                // Insert before the closing brace of resources
                insertionPoint = content.lastIndexOf(resourcesMatch[0]);
                const indent = resourcesMatch[1] || '\n    ';
                content = content.slice(0, insertionPoint) +
                         `,${indent}    apps: []` +
                         content.slice(insertionPoint);
                insertionType = 'nested resources';
            }
        }

        // If we didn't find a nested structure, try flat structure
        if (insertionPoint === -1) {
            // Type B: Flat structure - find the last closing brace
            const lastBraceMatch = content.match(/(\n\s*)\};(?:\s*\n\s*if\s*\(typeof\s+languageData)?/);
            if (lastBraceMatch) {
                insertionPoint = content.lastIndexOf(lastBraceMatch[0]);
                const indent = lastBraceMatch[1] || '\n    ';
                // Insert before the closing brace
                const insertBefore = lastBraceMatch[0];
                const replacement = `,${indent}apps: []${insertBefore}`;
                content = content.slice(0, insertionPoint) + replacement +
                         content.slice(insertionPoint + insertBefore.length);
                insertionType = 'flat structure';
            }
        }

        // Fallback: If we still haven't found a good spot, look for the very last };
        if (insertionPoint === -1) {
            const lastSemicolon = content.lastIndexOf('};');
            if (lastSemicolon !== -1) {
                content = content.slice(0, lastSemicolon) +
                         ',\n    apps: []\n};' +
                         content.slice(lastSemicolon + 2);
                insertionType = 'fallback';
            }
        }

        // CRITICAL: Verify we didn't truncate the file
        if (content.length < originalLength - 100) {
            console.error(`❌ ${file} - File would be truncated! Original: ${originalLength}, New: ${content.length}`);
            errorCount++;
            return;
        }

        // Verify the syntax is valid
        try {
            // Basic syntax check - ensure balanced braces
            const openBraces = (content.match(/\{/g) || []).length;
            const closeBraces = (content.match(/\}/g) || []).length;
            if (openBraces !== closeBraces) {
                throw new Error(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
            }

            // Check for languageData assignment at the end
            if (!content.includes('if (typeof languageData')) {
                throw new Error('Missing languageData assignment at the end');
            }

            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${file} - Fixed (${insertionType}). Size: ${originalLength} → ${content.length}`);
            fixedCount++;

        } catch (syntaxError) {
            console.error(`❌ ${file} - Syntax validation failed: ${syntaxError.message}`);
            errorCount++;
        }

    } catch (error) {
        console.error(`❌ ${file} - Error: ${error.message}`);
        errorCount++;
    }
});

console.log('\n📊 Summary:');
console.log(`✅ Fixed: ${fixedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`⏭️ Skipped: ${5} files (already have proper apps)`);

if (errorCount > 0) {
    console.log('\n⚠️ Some files had errors. Please check the output above.');
} else {
    console.log('\n🎉 All files processed successfully!');
}