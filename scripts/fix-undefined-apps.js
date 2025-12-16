const fs = require('fs');
const path = require('path');

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Fixing undefined app entries in ${languageFiles.length} language data files...\n`);

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backups', `backup_apps_fix_${new Date().toISOString().replace(/[:.]/g, '-')}`);
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

let fixedCount = 0;
const fixedFiles = [];

// Process each language file
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        let modified = false;

        // Check if apps section exists
        if (!content.includes('apps:')) {
            console.log(`Adding apps section to ${file}...`);

            // Find where to insert apps section
            // Look for the end of resources object
            const resourcesMatch = content.match(/(resources:\s*{[\s\S]*?)(}\s*(?:}|,))/);

            if (resourcesMatch) {
                const beforeResources = content.substring(0, resourcesMatch.index + resourcesMatch[1].length);
                const afterResources = resourcesMatch[2];

                // Insert empty apps array after resources but before closing
                const appsSection = `,

        apps: []`;

                content = `${beforeResources + appsSection  }\n    ${  afterResources}`;
                modified = true;
            } else {
                // Try alternative structure - look for the main object
                const mainObjMatch = content.match(/(const\s+\w+Resources\s*=\s*{[\s\S]*?)(}\s*;?)/);

                if (mainObjMatch) {
                    const beforeEnd = content.substring(0, mainObjMatch.index + mainObjMatch[1].length);
                    const afterEnd = mainObjMatch[2];

                    // Add apps property before the closing brace
                    const appsSection = `,

    "apps": []`;

                    content = `${beforeEnd + appsSection  }\n${  afterEnd}`;
                    modified = true;
                }
            }
        } else {
            // Check if apps array is empty
            const appsMatch = content.match(/apps:\s*\[\s*\]/);
            if (appsMatch) {
                console.log(`${file} already has empty apps array (this is okay)`);
            }
        }

        // Also fix Portuguese's empty apps array if needed (actually, empty is fine)
        if (file === 'portuguese-data.js') {
            // Check the current state
            const appsMatch = content.match(/apps:\s*\[([\s\S]*?)\]/);
            if (appsMatch && appsMatch[1].trim() === '') {
                console.log(`Portuguese has empty apps array (keeping as is - this is valid)`);
            }
        }

        if (modified) {
            // Create backup
            const backupPath = path.join(backupDir, file);
            fs.writeFileSync(backupPath, originalContent, 'utf8');

            // Save modified file
            fs.writeFileSync(filePath, content, 'utf8');

            fixedCount++;
            fixedFiles.push({
                file,
                language: languageName,
                action: 'Added empty apps array'
            });

            console.log(`✅ Fixed ${file}`);
        }

    } catch (error) {
        console.log(`❌ Error processing ${file}: ${error.message}`);
    }
});

// Generate report
console.log('\n=== FIX SUMMARY ===\n');
console.log(`Total files fixed: ${fixedCount}`);
console.log(`Backup created at: ${backupDir}\n`);

if (fixedFiles.length > 0) {
    console.log('Fixed files:');
    fixedFiles.forEach(item => {
        console.log(`  - ${item.file}: ${item.action}`);
    });
}

// Save fix report
const reportPath = path.join(__dirname, '..', 'apps_fix_report.json');
const report = {
    date: new Date().toISOString(),
    totalFixed: fixedCount,
    backupLocation: backupDir,
    fixedFiles
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n📄 Fix report saved to: ${reportPath}`);