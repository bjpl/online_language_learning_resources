const fs = require('fs');
const path = require('path');

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Fixing apps section structure in ${languageFiles.length} language data files...\n`);

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backups', `backup_apps_structure_${new Date().toISOString().replace(/[:.]/g, '-')}`);
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

let fixedCount = 0;
const fixedFiles = [];

// Process each language file that was modified
const filesToFix = [
    'cebuano-data.js', 'croatian-data.js', 'dari-data.js', 'gujarati-data.js',
    'hausa-data.js', 'hmong-data.js', 'hungarian-data.js', 'inuktitut-data.js',
    'irish-data.js', 'kannada-data.js', 'lao-data.js', 'mongolian-data.js',
    'navajo-data.js', 'nepali-data.js', 'pashto-data.js', 'punjabi-data.js',
    'quechua-data.js', 'sign-language-data.js', 'slovak-data.js', 'telugu-data.js',
    'ukrainian-data.js', 'urdu-data.js', 'welsh-data.js', 'yoruba-data.js'
];

filesToFix.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        let modified = false;

        // Find misplaced apps section and fix it
        const misplacedAppsPattern = /,\s*"apps":\s*\[\]\s*}/;
        const misplacedAppsPattern2 = /\s*,\s*"apps":\s*\[\]\s*\n\s*}/;

        if (misplacedAppsPattern.test(content) || misplacedAppsPattern2.test(content)) {
            // First, remove the misplaced apps section
            content = content.replace(/,\s*"apps":\s*\[\]\s*(?=})/g, '');

            // Now find the correct place to insert it
            // Look for the end of the resources object
            const resourcesPattern = /(resources:\s*{[\s\S]*?)\n(\s*)}/;
            const match = content.match(resourcesPattern);

            if (match) {
                // Insert apps after resources but within the main object
                const beforeEnd = match[0];
                const indentation = match[2];

                // Replace the resources closing brace with resources closing + apps
                const replacement = beforeEnd.replace(/\n(\s*)}$/, `\n$1},\n\n${indentation}apps: []`);
                content = content.replace(resourcesPattern, replacement);
                modified = true;
            } else {
                // Try with quoted "resources"
                const quotedResourcesPattern = /("resources":\s*{[\s\S]*?)\n(\s*)}/;
                const quotedMatch = content.match(quotedResourcesPattern);

                if (quotedMatch) {
                    const beforeEnd = quotedMatch[0];
                    const indentation = quotedMatch[2];

                    const replacement = beforeEnd.replace(/\n(\s*)}$/, `\n$1},\n\n${indentation}"apps": []`);
                    content = content.replace(quotedResourcesPattern, replacement);
                    modified = true;
                }
            }

            // Finally add closing brace for the main object if needed
            if (!content.trim().endsWith('}') && !content.trim().endsWith('};')) {
                content += '\n};';
                modified = true;
            }
        }

        if (modified) {
            // Create backup
            const backupPath = path.join(backupDir, file);
            fs.writeFileSync(backupPath, originalContent, 'utf8');

            // Save fixed file
            fs.writeFileSync(filePath, content, 'utf8');

            fixedCount++;
            fixedFiles.push({
                file,
                language: languageName
            });

            console.log(`✅ Fixed structure in ${file}`);
        } else {
            console.log(`ℹ️  ${file} doesn't need structural fix`);
        }

    } catch (error) {
        console.log(`❌ Error processing ${file}: ${error.message}`);
    }
});

// Generate report
console.log('\n=== STRUCTURE FIX SUMMARY ===\n');
console.log(`Total files fixed: ${fixedCount}`);
if (fixedCount > 0) {
    console.log(`Backup created at: ${backupDir}\n`);
    console.log('Fixed files:');
    fixedFiles.forEach(item => {
        console.log(`  - ${item.file}`);
    });
}