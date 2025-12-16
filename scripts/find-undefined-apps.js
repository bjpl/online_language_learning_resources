const fs = require('fs');
const path = require('path');

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Checking ${languageFiles.length} language data files for undefined app entries...\n`);

const filesWithUndefined = [];
const undefinedDetails = [];

// Process each language file
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for undefined entries in apps section
        // Look for patterns like empty objects {}, incomplete entries, or literal undefined

        // Pattern 1: Empty objects in apps array
        const emptyObjectPattern = /apps:\s*\[\s*{\s*}\s*\]/g;

        // Pattern 2: Objects with only partial data (missing name)
        const incompletePattern = /apps:\s*\[[\s\S]*?{\s*(?:category|url|level|features|free):[^}]*?(?:,\s*)?}\s*(?:,|\])/g;

        // Pattern 3: Literal undefined values
        const undefinedPattern = /apps:\s*\[[\s\S]*?undefined[\s\S]*?\]/g;

        // Pattern 4: Apps with missing critical fields (no name or empty name)
        const missingNamePattern = /{\s*(?!name)[^}]*?url\s*:[^}]*?}/g;

        // Pattern 5: Check for apps array that might have issues
        const appsMatch = content.match(/apps:\s*\[([\s\S]*?)\](?:\s*,|\s*})/);

        if (appsMatch) {
            const appsContent = appsMatch[1];

            // Check for various issues
            let hasIssues = false;
            const issueDetails = [];

            // Check for empty apps array
            if (appsContent.trim() === '') {
                hasIssues = true;
                issueDetails.push('Empty apps array');
            }

            // Check for undefined values
            if (appsContent.includes('undefined')) {
                hasIssues = true;
                issueDetails.push('Contains undefined values');
            }

            // Check for objects without name property
            const objectMatches = appsContent.match(/\{[^}]*\}/g);
            if (objectMatches) {
                objectMatches.forEach((obj, index) => {
                    if (!obj.includes('name:') && !obj.includes('category:')) {
                        // It's a resource object without a name
                        if (obj.trim() !== '{}') {
                            hasIssues = true;
                            issueDetails.push(`Object ${index + 1} missing name property`);
                        }
                    }
                });
            }

            // Check for malformed structure
            if (appsContent.includes('{{') || appsContent.includes('}}')) {
                hasIssues = true;
                issueDetails.push('Malformed object structure');
            }

            if (hasIssues) {
                filesWithUndefined.push(file);
                undefinedDetails.push({
                    file,
                    language: languageName,
                    issues: issueDetails,
                    snippet: appsContent.substring(0, 200) + (appsContent.length > 200 ? '...' : '')
                });
            }
        }

        // Also check if apps section exists at all
        if (!content.includes('apps:')) {
            filesWithUndefined.push(file);
            undefinedDetails.push({
                file,
                language: languageName,
                issues: ['No apps section found'],
                snippet: 'N/A'
            });
        }

    } catch (error) {
        console.log(`Error processing ${file}: ${error.message}`);
    }
});

// Generate report
console.log('\n=== UNDEFINED APPS REPORT ===\n');

if (filesWithUndefined.length === 0) {
    console.log('✅ No undefined app entries found!');
} else {
    console.log(`⚠️  Found issues in ${filesWithUndefined.length} files:\n`);

    undefinedDetails.forEach(detail => {
        console.log(`\n📁 ${detail.file} (${detail.language})`);
        console.log('Issues:');
        detail.issues.forEach(issue => {
            console.log(`  - ${issue}`);
        });
        if (detail.snippet !== 'N/A') {
            console.log('Snippet:');
            console.log(`  ${  detail.snippet.replace(/\n/g, '\n  ')}`);
        }
    });
}

// Save detailed report
const reportPath = path.join(__dirname, '..', 'undefined_apps_report.json');
fs.writeFileSync(reportPath, JSON.stringify(undefinedDetails, null, 2), 'utf8');
console.log(`\n📄 Detailed report saved to: ${reportPath}`);

// Return results for fixing
module.exports = undefinedDetails;