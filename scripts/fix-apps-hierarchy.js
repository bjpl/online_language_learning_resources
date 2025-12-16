const fs = require('fs');
const path = require('path');

// CONCEPT: Fix hierarchical structure mismatch in language data files
// WHY: Apps arrays are at root level but should be inside resources object
// PATTERN: Parse-Transform-Write with validation and backup

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Fixing apps hierarchy in ${languageFiles.length} language files...\n`);

let successCount = 0;
let alreadyCorrectCount = 0;
let errorCount = 0;
const results = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // PATTERN: Multiple detection patterns for robust matching
        // Check if apps is at root level (wrong position)
        const rootAppsPattern = /(\s*)(apps|"apps")\s*:\s*(\[[^\]]*?\])/;
        const rootAppsMatch = content.match(rootAppsPattern);

        // Check if apps is already inside resources (correct position)
        const insideResourcesPattern = /resources\s*:\s*\{[^}]*apps\s*:/;
        const alreadyInside = insideResourcesPattern.test(content);

        if (alreadyInside) {
            console.log(`✅ ${file} - Apps already inside resources`);
            alreadyCorrectCount++;
            results.push({
                file,
                status: 'ALREADY_CORRECT',
                message: 'Apps already nested in resources'
            });
            return;
        }

        if (rootAppsMatch) {
            console.log(`🔧 ${file} - Moving apps into resources...`);

            // Extract the apps array content
            const appsContent = rootAppsMatch[3];
            const appsIndent = rootAppsMatch[1];

            // Remove apps from root level
            content = content.replace(rootAppsPattern, '');

            // Clean up any trailing comma before where apps was
            content = content.replace(/,\s*\n\s*\n/, ',\n');

            // Find the end of resources object to insert apps
            // PATTERN: Look for closing brace of resources object
            const resourcesPattern = /(resources\s*:\s*\{[^]*?)(\n\s*\})/;
            const resourcesMatch = content.match(resourcesPattern);

            if (resourcesMatch) {
                const beforeClose = resourcesMatch[1];
                const closeBrace = resourcesMatch[2];

                // Check if we need a comma before apps
                const needsComma = !beforeClose.trim().endsWith(',') && !beforeClose.trim().endsWith('{');
                const comma = needsComma ? ',' : '';

                // Insert apps inside resources with proper indentation
                const appsInsertion = `${comma}\n        apps: ${appsContent}`;
                const newResources = beforeClose + appsInsertion + closeBrace;

                content = content.replace(resourcesPattern, newResources);

                // Save the fixed file
                fs.writeFileSync(filePath, content, 'utf8');

                // Verify the fix worked
                const verifyContent = fs.readFileSync(filePath, 'utf8');
                const verifyPattern = /resources\s*:\s*\{[^}]*apps\s*:/;

                if (verifyPattern.test(verifyContent)) {
                    console.log(`  ✓ Successfully moved apps inside resources`);
                    successCount++;
                    results.push({
                        file,
                        status: 'FIXED',
                        message: 'Apps moved into resources successfully'
                    });
                } else {
                    console.log(`  ⚠️ Verification failed - manual review needed`);
                    // Restore original if verification fails
                    fs.writeFileSync(filePath, originalContent, 'utf8');
                    errorCount++;
                    results.push({
                        file,
                        status: 'VERIFICATION_FAILED',
                        message: 'Fix applied but verification failed - restored original'
                    });
                }
            } else {
                console.log(`  ⚠️ Could not find resources object structure`);
                errorCount++;
                results.push({
                    file,
                    status: 'NO_RESOURCES',
                    message: 'Could not find resources object'
                });
            }
        } else {
            console.log(`❓ ${file} - No apps section found at root level`);
            results.push({
                file,
                status: 'NO_ROOT_APPS',
                message: 'No apps section found at root level'
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

// Save detailed report
const reportPath = path.join(__dirname, '..', 'apps_hierarchy_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`\n${  '='.repeat(60)}`);
console.log('HIERARCHY FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`✓  Already correct: ${alreadyCorrectCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📊 Total processed: ${languageFiles.length} files`);
console.log(`\n📄 Detailed report saved to: ${reportPath}`);

// EDGE CASE: Check if any files still have undefined potential
if (successCount > 0) {
    console.log('\n💡 NEXT STEPS:');
    console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
    console.log('2. Hard refresh the page (Ctrl+Shift+R)');
    console.log('3. Check console for any errors');
    console.log('4. Verify apps now display correctly');
}