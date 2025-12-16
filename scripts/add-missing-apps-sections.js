const fs = require('fs');
const path = require('path');

// CONCEPT: Add apps sections to files that completely lack them
// WHY: Some language files have no apps section at all
// PATTERN: Structural analysis with targeted insertion

const jsDir = path.join(__dirname, '..', 'assets', 'js');

// List of files that need apps sections added
const filesNeedingApps = [
    'cebuano-data.js', 'croatian-data.js', 'dari-data.js', 'gujarati-data.js',
    'hausa-data.js', 'hmong-data.js', 'hungarian-data.js', 'inuktitut-data.js',
    'irish-data.js', 'kannada-data.js', 'lao-data.js', 'mongolian-data.js',
    'navajo-data.js', 'nepali-data.js', 'pashto-data.js', 'punjabi-data.js',
    'quechua-data.js', 'sign-language-data.js', 'slovak-data.js', 'telugu-data.js',
    'ukrainian-data.js', 'urdu-data.js', 'welsh-data.js', 'yoruba-data.js'
];

console.log(`Adding apps sections to ${filesNeedingApps.length} files...\n`);

let successCount = 0;
let errorCount = 0;
const results = [];

filesNeedingApps.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Check if apps already exists (shouldn't but verify)
        if (content.includes('apps:') || content.includes('"apps"')) {
            console.log(`✅ ${file} - Already has apps section`);
            results.push({
                file,
                status: 'ALREADY_HAS_APPS',
                message: 'File already contains apps section'
            });
            return;
        }

        console.log(`🔧 ${file} - Adding apps section...`);

        // Two main structures to handle
        // Type 1: const xxxResources = { ... resources: { ... } }
        // Type 2: const xxxResources = { ... direct properties ... }

        // Check if this file has a nested resources object
        const hasNestedResources = content.includes('"resources":') || content.includes('resources:');

        if (hasNestedResources) {
            // Type 1: Has nested resources - add apps inside resources
            // Find the closing of resources object
            const resourcesPattern = /(resources\s*:\s*\{[^]*?)(\n\s*\})/;
            const match = content.match(resourcesPattern);

            if (match) {
                const beforeClose = match[1];
                const closeBrace = match[2];

                // Add apps before the closing brace
                const lastItemPattern = /(\]\s*)$/;
                const fixedBeforeClose = beforeClose.replace(lastItemPattern, '],');
                const insertion = `\n        apps: []`;
                const newContent = fixedBeforeClose + insertion + closeBrace;

                content = content.replace(resourcesPattern, newContent);
            }
        } else {
            // Type 2: The entire const IS the resources object
            // Find the last closing array bracket before the final object close
            const patterns = [
                // Pattern 1: Look for the last ']' of a category array
                /(\]\s*\}\s*\]\s*)(\n\s*\}\s*\}\s*;)/,
                // Pattern 2: Simpler structure
                /(\]\s*\}\s*\])(\s*\}\s*;)/,
                // Pattern 3: Even simpler
                /(\]\s*)(\n\s*\}\s*;)/
            ];

            let fixed = false;
            for (const pattern of patterns) {
                if (pattern.test(content)) {
                    content = content.replace(pattern, (match, before, after) => `${before  },\n        apps: []${  after}`);
                    fixed = true;
                    break;
                }
            }

            if (!fixed) {
                // Fallback: Find the very last closing of the main object
                const lastClosePattern = /(\n)(\s*\}\s*;?\s*)$/;
                const match = content.match(lastClosePattern);

                if (match) {
                    // Find the last property before the close
                    const beforeMatch = content.substring(0, match.index);
                    const afterMatch = match[0];

                    // Ensure we add a comma after the last property
                    let modifiedBefore = beforeMatch;
                    if (!beforeMatch.trim().endsWith(',')) {
                        // Add comma after the last ']' or '}'
                        modifiedBefore = beforeMatch.replace(/(\]|\})(\s*)$/, '$1,$2');
                    }

                    content = `${modifiedBefore  },\n        apps: []${  afterMatch}`;
                }
            }
        }

        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');

        // Verify the fix
        const verifyContent = fs.readFileSync(filePath, 'utf8');
        if (verifyContent.includes('apps:') || verifyContent.includes('"apps"')) {
            console.log(`  ✓ Successfully added apps section`);
            successCount++;
            results.push({
                file,
                status: 'ADDED',
                message: 'Apps section added successfully'
            });
        } else {
            console.log(`  ⚠️ Failed to add apps section`);
            fs.writeFileSync(filePath, originalContent, 'utf8');
            errorCount++;
            results.push({
                file,
                status: 'FAILED',
                message: 'Could not add apps section'
            });
        }

    } catch (error) {
        console.log(`❌ ${file} - Error: ${error.message}`);
        errorCount++;
        results.push({
            file,
            status: 'ERROR',
            message: error.message
        });
    }
});

// Save report
const reportPath = path.join(__dirname, '..', 'add_missing_apps_report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`\n${  '='.repeat(60)}`);
console.log('ADD MISSING APPS SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Successfully added: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📊 Total processed: ${filesNeedingApps.length} files`);
console.log(`\n📄 Report saved to: ${reportPath}`);