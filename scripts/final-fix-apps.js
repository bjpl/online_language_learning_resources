const fs = require('fs');
const path = require('path');

// Files that need the apps section properly fixed
const filesToFix = [
    'cebuano-data.js', 'croatian-data.js', 'dari-data.js', 'gujarati-data.js',
    'hausa-data.js', 'hmong-data.js', 'hungarian-data.js', 'inuktitut-data.js',
    'irish-data.js', 'kannada-data.js', 'lao-data.js', 'mongolian-data.js',
    'navajo-data.js', 'nepali-data.js', 'pashto-data.js', 'punjabi-data.js',
    'quechua-data.js', 'sign-language-data.js', 'slovak-data.js', 'telugu-data.js',
    'ukrainian-data.js', 'urdu-data.js', 'welsh-data.js', 'yoruba-data.js'
];

const jsDir = path.join(__dirname, '..', 'assets', 'js');
console.log(`Fixing apps section in ${filesToFix.length} language files...\n`);

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backups', `backup_apps_final_${new Date().toISOString().replace(/[:.]/g, '-')}`);
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

let fixedCount = 0;

filesToFix.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Remove any misplaced apps sections
        content = content.replace(/,?\s*"apps":\s*\[\]\s*/g, '');

        // Find the proper location: after the resources object closes
        // Look for pattern: resources object ending
        const resourcesEndPattern = /("resources":\s*{[\s\S]*?)\n(\s*)}/;
        const match = content.match(resourcesEndPattern);

        if (match) {
            // We found the resources object
            const beforeResourcesEnd = match[1];
            const indentation = match[2];

            // Check if there's more content after resources (looking for the main object closing)
            const fullMatch = match[0];
            const afterResourcesIndex = content.indexOf(fullMatch) + fullMatch.length;
            const afterResources = content.substring(afterResourcesIndex);

            // Build the new content with apps properly placed
            let newContent = content.substring(0, content.indexOf(fullMatch));
            newContent += beforeResourcesEnd + '\n' + indentation + '},\n\n';
            newContent += indentation + '"apps": []';

            // Add the rest of the content (should be the closing of main object)
            if (afterResources.trim()) {
                newContent += afterResources;
            } else {
                newContent += '\n};';
            }

            content = newContent;
        } else {
            // Try without quotes on resources
            const unquotedResourcesEndPattern = /(resources:\s*{[\s\S]*?)\n(\s*)}/;
            const unquotedMatch = content.match(unquotedResourcesEndPattern);

            if (unquotedMatch) {
                const beforeResourcesEnd = unquotedMatch[1];
                const indentation = unquotedMatch[2];
                const fullMatch = unquotedMatch[0];
                const afterResourcesIndex = content.indexOf(fullMatch) + fullMatch.length;
                const afterResources = content.substring(afterResourcesIndex);

                let newContent = content.substring(0, content.indexOf(fullMatch));
                newContent += beforeResourcesEnd + '\n' + indentation + '},\n\n';
                newContent += indentation + 'apps: []';

                if (afterResources.trim()) {
                    newContent += afterResources;
                } else {
                    newContent += '\n};';
                }

                content = newContent;
            }
        }

        // Ensure proper ending
        if (!content.trim().endsWith('}') && !content.trim().endsWith('};')) {
            content = content.trim() + '\n};';
        }

        // Save backup
        const backupPath = path.join(backupDir, file);
        fs.writeFileSync(backupPath, originalContent, 'utf8');

        // Save fixed file
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed ${file}`);

    } catch (error) {
        console.log(`❌ Error fixing ${file}: ${error.message}`);
    }
});

console.log(`\n=== FINAL FIX COMPLETE ===`);
console.log(`Fixed ${fixedCount} files`);
console.log(`Backups saved to: ${backupDir}`);