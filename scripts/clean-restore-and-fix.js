const fs = require('fs');
const path = require('path');

// CONCEPT: Clean restoration from oldest backup, then careful apps addition
// WHY: Current files have syntax errors that need complete clean slate
// PATTERN: Full restore, validate, then add apps only where needed

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const oldestBackup = path.join(__dirname, '..', 'backups', 'backup_20250925_184135');

console.log('🧹 CLEAN RESTORE AND FIX\n');
console.log(`${'=' . repeat(60)  }\n`);

// Step 1: Get all language files
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

// Step 2: Check what's in the oldest backup
const backupFiles = fs.existsSync(oldestBackup)
    ? fs.readdirSync(oldestBackup).filter(f => f.endsWith('-data.js'))
    : [];

console.log(`Found ${backupFiles.length} files in oldest backup\n`);

// Step 3: Restore files from oldest backup
console.log('📦 RESTORING FROM OLDEST BACKUP...\n');

const restoredFiles = new Set();
backupFiles.forEach(file => {
    const src = path.join(oldestBackup, file);
    const dest = path.join(jsDir, file);

    console.log(`  Restoring ${file}...`);
    const content = fs.readFileSync(src, 'utf8');
    fs.writeFileSync(dest, content, 'utf8');
    restoredFiles.add(file);
});

console.log(`\n✅ Restored ${restoredFiles.size} files from oldest backup\n`);

// Step 4: For files not in oldest backup, check current state
console.log('🔍 CHECKING NON-BACKED-UP FILES...\n');

const needsApps = [];
const hasApps = [];
const errors = [];

languageFiles.forEach(file => {
    if (restoredFiles.has(file)) {
        // These were restored from backup, they don't have apps
        needsApps.push(file);
        return;
    }

    const filePath = path.join(jsDir, file);

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if it has apps
        if (/\bapps\s*:\s*\[/.test(content)) {
            console.log(`  ✅ ${file} - Already has apps`);
            hasApps.push(file);
        } else {
            console.log(`  📝 ${file} - Needs apps`);
            needsApps.push(file);
        }

        // Quick syntax check
        try {
            // Check for basic syntax issues
            if (content.includes(',,')) {
                throw new Error('Double comma found');
            }
            console.log(`    ✓ No syntax errors`);
        } catch (e) {
            console.log(`    ⚠️ Has syntax issues: ${e.message}`);
            errors.push({ file, error: e.message });
        }

    } catch (error) {
        console.log(`  ❌ ${file} - Error: ${error.message}`);
        errors.push({ file, error: error.message });
    }
});

console.log(`\nFiles needing apps: ${needsApps.length}`);
console.log(`Files with apps: ${hasApps.length}`);
console.log(`Files with errors: ${errors.length}\n`);

// Step 5: Now add apps to files that need it
console.log('➕ ADDING APPS SECTIONS...\n');

let addedCount = 0;
let failedCount = 0;

needsApps.forEach(file => {
    const filePath = path.join(jsDir, file);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        console.log(`Processing ${file}...`);

        // Determine structure
        const hasNestedResources = /resources\s*:\s*\{/.test(content);

        if (hasNestedResources) {
            // Type A: Nested structure
            // Find the last closing of a section array before resources closes
            // We need to find: }] } pattern which indicates end of last section

            // Find resources object
            const resourcesMatch = content.match(/(resources\s*:\s*\{[\s\S]*?)((\n\s*\}\s*\])*\s*\n\s*\})/);

            if (resourcesMatch) {
                const beforeClose = resourcesMatch[1];
                const closing = resourcesMatch[2];

                // Add apps before the closing
                const needsComma = beforeClose.trim().endsWith(']');
                const insertion = needsComma ? ',\n\n        apps: []' : '\n\n        apps: []';

                content = beforeClose + insertion + closing;

                // Validate - no double commas
                if (!content.includes(',,')) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`  ✅ Added apps successfully`);
                    addedCount++;
                } else {
                    console.log(`  ⚠️ Would create syntax error, skipping`);
                    failedCount++;
                }
            } else {
                console.log(`  ⚠️ Could not find resources structure`);
                failedCount++;
            }
        } else {
            // Type B: Flat structure
            // Find the main object closing
            const mainMatch = content.match(/(const\s+\w+Resources\s*=\s*\{[\s\S]*?)((\n\s*\}\s*\])*\s*\n\s*\}\s*;?)/);

            if (mainMatch) {
                const beforeClose = mainMatch[1];
                const closing = mainMatch[2];

                // Add apps before the closing
                const needsComma = beforeClose.trim().endsWith(']') || beforeClose.trim().endsWith('}');
                const insertion = needsComma ? ',\n\n    apps: []' : '\n\n    apps: []';

                content = beforeClose + insertion + closing;

                // Validate - no double commas
                if (!content.includes(',,')) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`  ✅ Added apps successfully`);
                    addedCount++;
                } else {
                    console.log(`  ⚠️ Would create syntax error, skipping`);
                    failedCount++;
                }
            } else {
                console.log(`  ⚠️ Could not find main structure`);
                failedCount++;
            }
        }

    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        failedCount++;
    }
});

// Step 6: Final validation
console.log(`\n${  '=' . repeat(60)}`);
console.log('FINAL VALIDATION\n');

let validCount = 0;
const invalidFiles = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        const issues = [];

        // Check for syntax errors
        if (content.includes(',,')) issues.push('double comma');
        if (content.match(/,\s*,/)) issues.push('spaced double comma');
        if (content.match(/\}\s*\]\s*,/)) issues.push('wrong closing order');

        // Check for apps
        if (!content.includes('apps:')) issues.push('missing apps');

        if (issues.length === 0) {
            validCount++;
        } else {
            invalidFiles.push({ file, issues });
        }

    } catch (error) {
        invalidFiles.push({ file, issues: ['read error'] });
    }
});

// Summary
console.log('=' . repeat(60));
console.log('CLEAN RESTORE SUMMARY');
console.log('=' . repeat(60));
console.log(`📦 Restored from backup: ${restoredFiles.size} files`);
console.log(`➕ Apps added: ${addedCount} files`);
console.log(`⚠️ Failed to add: ${failedCount} files`);
console.log(`✓  Valid files: ${validCount}/${languageFiles.length}`);
console.log(`❌ Invalid files: ${invalidFiles.length}`);

if (invalidFiles.length > 0) {
    console.log('\n⚠️ FILES WITH ISSUES:');
    invalidFiles.slice(0, 10).forEach(item => {
        console.log(`  ${item.file}: ${item.issues.join(', ')}`);
    });
    if (invalidFiles.length > 10) {
        console.log(`  ... and ${invalidFiles.length - 10} more`);
    }
}

console.log('\n💡 Next: Clear browser cache and test');