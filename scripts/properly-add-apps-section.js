const fs = require('fs');
const path = require('path');

// List of ALL language files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Checking and fixing apps sections in ${languageFiles.length} language files...\n`);

let fixedCount = 0;
let alreadyHasApps = 0;
const report = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Check if apps section exists anywhere in the file
        const hasApps = content.includes('apps:') || content.includes('"apps"');

        if (!hasApps) {
            console.log(`❌ ${file} - MISSING apps section, adding...`);

            // Find the best place to add the apps section
            // Look for the end of the main resources object

            // Pattern 1: After resources object
            const pattern1 = /(resources:\s*{[^]*?}\s*)(}\s*;?)/;
            const match1 = content.match(pattern1);

            // Pattern 2: After "resources" with quotes
            const pattern2 = /("resources":\s*{[^]*?}\s*)(}\s*;?)/;
            const match2 = content.match(pattern2);

            // Pattern 3: Before the final closing of the main object
            const pattern3 = /(const\s+\w+Resources\s*=\s*{[^]*)(}\s*;?\s*$)/;
            const match3 = content.match(pattern3);

            let modified = false;

            if (match1) {
                const beforeEnd = match1[1];
                const ending = match1[2];
                const replacement = `${beforeEnd  }},\n\n    apps: []\n${  ending}`;
                content = content.replace(pattern1, replacement);
                modified = true;
            } else if (match2) {
                const beforeEnd = match2[1];
                const ending = match2[2];
                const replacement = `${beforeEnd  }},\n\n    "apps": []\n${  ending}`;
                content = content.replace(pattern2, replacement);
                modified = true;
            } else if (match3) {
                const beforeEnd = match3[1];
                const ending = match3[2];
                // Add a comma after the last property and then add apps
                const lastPropertyPattern = /([^,])\s*$/;
                const fixedBeforeEnd = beforeEnd.replace(lastPropertyPattern, '$1,');
                content = `${fixedBeforeEnd  }\n\n    apps: []\n${  ending}`;
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                fixedCount++;
                report.push({
                    file,
                    status: 'FIXED',
                    message: 'Added apps: [] section'
                });
            } else {
                report.push({
                    file,
                    status: 'FAILED',
                    message: 'Could not find appropriate place to add apps section'
                });
            }

        } else {
            console.log(`✅ ${file} - Already has apps section`);
            alreadyHasApps++;

            // Verify it's properly structured
            const appsMatch = content.match(/apps:\s*\[([^]*?)\]/);
            if (appsMatch) {
                const appsContent = appsMatch[1].trim();
                if (appsContent === '') {
                    report.push({
                        file,
                        status: 'OK',
                        message: 'Has empty apps array (valid)'
                    });
                } else {
                    report.push({
                        file,
                        status: 'OK',
                        message: 'Has apps with content'
                    });
                }
            }
        }

    } catch (error) {
        console.log(`❌ Error processing ${file}: ${error.message}`);
        report.push({
            file,
            status: 'ERROR',
            message: error.message
        });
    }
});

// Save report
const reportPath = path.join(__dirname, '..', 'apps_section_verification.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log('\n=== SUMMARY ===');
console.log(`Files fixed: ${fixedCount}`);
console.log(`Files already had apps: ${alreadyHasApps}`);
console.log(`Total processed: ${languageFiles.length}`);
console.log(`\nReport saved to: ${reportPath}`);