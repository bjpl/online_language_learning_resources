const fs = require('fs');
const path = require('path');

// CONCEPT: Comprehensive fix for all language file variations
// WHY: Different files have different structures and naming conventions
// PATTERN: Multi-pattern matching with fallback strategies

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Comprehensive apps fix for ${languageFiles.length} language files...\n`);

let successCount = 0;
let alreadyCorrectCount = 0;
let errorCount = 0;
const results = [];

// PATTERN: Helper function to find resources object boundaries
function findResourcesObject(content) {
    // Multiple patterns to match different structures
    const patterns = [
        // Pattern 1: resources: { ... }
        {
            start: /resources\s*:\s*\{/,
            end: (startIndex, content) => {
                let braceCount = 1;
                let i = content.indexOf('{', startIndex) + 1;
                while (i < content.length && braceCount > 0) {
                    if (content[i] === '{') braceCount++;
                    if (content[i] === '}') braceCount--;
                    i++;
                }
                return i - 1;
            }
        },
        // Pattern 2: "resources": { ... }
        {
            start: /"resources"\s*:\s*\{/,
            end: (startIndex, content) => {
                let braceCount = 1;
                let i = content.indexOf('{', startIndex) + 1;
                while (i < content.length && braceCount > 0) {
                    if (content[i] === '{') braceCount++;
                    if (content[i] === '}') braceCount--;
                    i++;
                }
                return i - 1;
            }
        }
    ];

    for (const pattern of patterns) {
        const match = content.match(pattern.start);
        if (match) {
            const startIndex = match.index;
            const endIndex = pattern.end(startIndex, content);
            return {
                start: startIndex,
                end: endIndex,
                content: content.substring(startIndex, endIndex + 1)
            };
        }
    }

    return null;
}

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Check if apps already inside resources
        const resourcesObj = findResourcesObject(content);

        if (resourcesObj && resourcesObj.content.includes('apps:')) {
            console.log(`✅ ${file} - Apps already inside resources`);
            alreadyCorrectCount++;
            results.push({
                file,
                status: 'ALREADY_CORRECT',
                message: 'Apps already nested in resources'
            });
            return;
        }

        // Look for apps at any level
        const appsPatterns = [
            /(,\s*\n\s*)(apps|"apps")\s*:\s*(\[[^\]]*?\])/,
            /(\n\s*)(apps|"apps")\s*:\s*(\[[^\]]*?\])/,
            /(}\s*,\s*\n\s*)(apps|"apps")\s*:\s*(\[[^\]]*?\])/
        ];

        let appsMatch = null;
        let appsPattern = null;

        for (const pattern of appsPatterns) {
            appsMatch = content.match(pattern);
            if (appsMatch) {
                appsPattern = pattern;
                break;
            }
        }

        if (!appsMatch) {
            // Special case: might be at the very end without proper formatting
            const endPattern = /(apps|"apps")\s*:\s*(\[[^\]]*?\])\s*}\s*;?\s*$/;
            appsMatch = content.match(endPattern);
            if (appsMatch) {
                appsPattern = endPattern;
            }
        }

        if (appsMatch && resourcesObj) {
            console.log(`🔧 ${file} - Moving apps into resources...`);

            // Extract apps content
            const appsKey = appsMatch[2] || appsMatch[1];
            const appsArray = appsMatch[3] || appsMatch[2];

            // Remove apps from current position
            content = content.replace(appsPattern, '');

            // Clean up any double commas or trailing commas
            content = content.replace(/,\s*,/g, ',');
            content = content.replace(/,\s*}/g, '}');

            // Insert apps into resources
            const resourcesEnd = resourcesObj.end;
            const beforeEnd = content.substring(0, resourcesEnd);
            const afterEnd = content.substring(resourcesEnd);

            // Check if we need a comma
            const lastChar = beforeEnd.trim().slice(-1);
            const needsComma = lastChar !== ',' && lastChar !== '{';

            const insertion = `${needsComma ? ',' : ''}\n        apps: ${appsArray}`;
            content = beforeEnd + insertion + afterEnd;

            // Write the fixed content
            fs.writeFileSync(filePath, content, 'utf8');

            // Verify the fix
            const verifyContent = fs.readFileSync(filePath, 'utf8');
            const verifyResources = findResourcesObject(verifyContent);

            if (verifyResources && verifyResources.content.includes('apps:')) {
                console.log(`  ✓ Successfully moved apps inside resources`);
                successCount++;
                results.push({
                    file,
                    status: 'FIXED',
                    message: 'Apps moved into resources successfully'
                });
            } else {
                console.log(`  ⚠️ Verification failed - restoring original`);
                fs.writeFileSync(filePath, originalContent, 'utf8');
                errorCount++;
                results.push({
                    file,
                    status: 'VERIFICATION_FAILED',
                    message: 'Fix applied but verification failed'
                });
            }
        } else if (!resourcesObj) {
            // File doesn't have a resources object - different structure
            console.log(`⚠️ ${file} - No resources object found`);

            // Check if it's a file where the entire const IS the resources
            const wholeFilePattern = /const\s+\w+Resources\s*=\s*\{/;
            if (wholeFilePattern.test(content)) {
                // The entire const is the resources object
                // Find apps and move it inside
                if (appsMatch) {
                    console.log(`  🔧 Attempting alternate fix...`);

                    // Remove apps from current position
                    const appsArray = appsMatch[3] || appsMatch[2];
                    content = content.replace(appsPattern, '');

                    // Find the last property before the final closing brace
                    const lastBracePattern = /(\n\s*)\}\s*;\s*$/;
                    const lastBraceMatch = content.match(lastBracePattern);

                    if (lastBraceMatch) {
                        const indent = lastBraceMatch[1];
                        const insertion = `,\n    apps: ${appsArray}${indent}}`;
                        content = content.replace(lastBracePattern, `${insertion  };`);

                        fs.writeFileSync(filePath, content, 'utf8');
                        console.log(`  ✓ Applied alternate fix`);
                        successCount++;
                        results.push({
                            file,
                            status: 'FIXED_ALTERNATE',
                            message: 'Apps fixed using alternate method'
                        });
                    }
                }
            } else {
                errorCount++;
                results.push({
                    file,
                    status: 'NO_RESOURCES_OBJECT',
                    message: 'Could not find resources structure'
                });
            }
        } else {
            console.log(`❓ ${file} - No apps section found`);
            results.push({
                file,
                status: 'NO_APPS',
                message: 'No apps section found in file'
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
const reportPath = path.join(__dirname, '..', 'comprehensive_apps_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`\n${  '='.repeat(60)}`);
console.log('COMPREHENSIVE FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`✓  Already correct: ${alreadyCorrectCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📊 Total processed: ${languageFiles.length} files`);
console.log(`\n📄 Detailed report saved to: ${reportPath}`);

// List files that need manual review
const needsReview = results.filter(r =>
    r.status === 'NO_RESOURCES_OBJECT' ||
    r.status === 'VERIFICATION_FAILED' ||
    r.status === 'ERROR'
);

if (needsReview.length > 0) {
    console.log('\n⚠️ FILES NEEDING MANUAL REVIEW:');
    needsReview.forEach(r => {
        console.log(`  - ${r.file}: ${r.message}`);
    });
}