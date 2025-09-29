/**
 * Restore the actual apps content from backups
 * The previous fix incorrectly replaced all apps with empty arrays
 */

const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '..', 'backups', 'backup_2025-09-29T04-04-34-791Z');
const targetDir = path.join(__dirname, '..', 'assets', 'js');

// Get all language files from backup
const files = fs.readdirSync(backupDir).filter(file =>
    file.endsWith('-data.js') && file !== 'language-data.js'
);

console.log(`🔄 Restoring apps content from backup for ${files.length} files\n`);

let restoredCount = 0;
let noAppsCount = 0;
let errorCount = 0;

files.forEach(file => {
    try {
        const backupPath = path.join(backupDir, file);
        const targetPath = path.join(targetDir, file);

        // Read backup file
        const backupContent = fs.readFileSync(backupPath, 'utf8');

        // Extract apps section from backup
        const appsMatch = backupContent.match(/apps:\s*\[[\s\S]*?\n\s*\]/);

        if (!appsMatch) {
            console.log(`⚠️  ${file} - No apps section in backup`);
            noAppsCount++;
            return;
        }

        const appsContent = appsMatch[0];

        // Read current file
        let currentContent = fs.readFileSync(targetPath, 'utf8');

        // Replace empty apps array with actual content
        currentContent = currentContent.replace(/apps:\s*\[\]/, appsContent);

        // Save the file
        fs.writeFileSync(targetPath, currentContent, 'utf8');
        console.log(`✅ ${file} - Apps content restored`);
        restoredCount++;

    } catch (error) {
        console.error(`❌ ${file} - Error: ${error.message}`);
        errorCount++;
    }
});

console.log('\n📊 Summary:');
console.log(`✅ Restored: ${restoredCount} files`);
console.log(`⚠️  No apps in backup: ${noAppsCount} files`);
console.log(`❌ Errors: ${errorCount} files`);

if (restoredCount > 0) {
    console.log('\n🎉 Apps content successfully restored!');
}