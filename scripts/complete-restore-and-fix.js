const fs = require('fs');
const path = require('path');

// CONCEPT: Complete restoration and proper apps addition
// WHY: Files are severely broken, need to restore from backup and carefully add apps
// PATTERN: Restore first, then add apps in the correct location

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const backupDir = path.join(__dirname, '..', 'backups', 'backup_20250925_184135');

// List of all language files
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log('🔄 COMPLETE RESTORATION AND FIX PROCESS\n');
console.log('=' . repeat(60));

// Step 1: Check if we have a clean backup
const hasBackup = fs.existsSync(backupDir);

if (!hasBackup) {
    console.log('❌ No clean backup found at:', backupDir);
    console.log('Creating emergency backup of current state...');

    // Create emergency backup
    const emergencyBackup = path.join(__dirname, '..', 'backups', `emergency_${Date.now()}`);
    fs.mkdirSync(emergencyBackup, { recursive: true });

    languageFiles.forEach(file => {
        const src = path.join(jsDir, file);
        const dest = path.join(emergencyBackup, file);
        fs.copyFileSync(src, dest);
    });
    console.log('✅ Emergency backup created at:', emergencyBackup);
}

// Step 2: Restore files that exist in backup
console.log('\n📦 RESTORING FROM CLEAN BACKUP...\n');

const backupFiles = hasBackup ? fs.readdirSync(backupDir).filter(f => f.endsWith('-data.js')) : [];
let restoredCount = 0;

backupFiles.forEach(file => {
    const backupPath = path.join(backupDir, file);
    const targetPath = path.join(jsDir, file);

    console.log(`  📄 Restoring ${file}...`);
    fs.copyFileSync(backupPath, targetPath);
    restoredCount++;
});

console.log(`\n✅ Restored ${restoredCount} files from backup`);

// Step 3: Now properly add apps sections
console.log('\n🔧 ADDING APPS SECTIONS PROPERLY...\n');

let fixedCount = 0;
let alreadyHasApps = 0;
const results = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Check if apps already exists anywhere
        const hasApps = /apps\s*:\s*\[/.test(content);

        if (hasApps) {
            console.log(`  ✅ ${file} - Already has apps section`);
            alreadyHasApps++;
            results.push({ file, status: 'ALREADY_HAS_APPS' });
            return;
        }

        console.log(`  🔧 ${file} - Adding apps section...`);

        // Determine structure type
        const hasNestedResources = /resources\s*:\s*\{/.test(content);

        if (hasNestedResources) {
            // Type A: Has nested resources object
            // Find the end of the resources object
            let braceCount = 0;
            const resourcesStart = content.indexOf('resources');
            const startIdx = content.indexOf('{', resourcesStart);
            let endIdx = startIdx;

            braceCount = 1;
            for (let i = startIdx + 1; i < content.length && braceCount > 0; i++) {
                if (content[i] === '{') braceCount++;
                if (content[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        endIdx = i;
                        break;
                    }
                }
            }

            if (endIdx > startIdx) {
                // Insert apps before the closing brace of resources
                const beforeClose = content.substring(0, endIdx);
                const afterClose = content.substring(endIdx);

                // Check if we need a comma
                let insertion = '';
                const lastNonWhitespace = beforeClose.trim().slice(-1);
                if (lastNonWhitespace === ']' || lastNonWhitespace === '}') {
                    insertion = ',\n        apps: []';
                } else {
                    insertion = '\n        apps: []';
                }

                content = beforeClose + insertion + afterClose;
            }
        } else {
            // Type B: The entire const IS the resources object
            // Find the main object's closing brace
            const mainObjectEnd = content.lastIndexOf('}');

            if (mainObjectEnd > 0) {
                const beforeClose = content.substring(0, mainObjectEnd);
                const afterClose = content.substring(mainObjectEnd);

                // Check if we need a comma
                let insertion = '';
                const lastNonWhitespace = beforeClose.trim().slice(-1);
                if (lastNonWhitespace === ']' || lastNonWhitespace === '}') {
                    insertion = ',\n    apps: []';
                } else {
                    insertion = '\n    apps: []';
                }

                content = beforeClose + insertion + afterClose;
            }
        }

        // Validate the result doesn't have syntax errors
        const hasSyntaxError = /,,/.test(content) || /,\s*,/.test(content);
        if (hasSyntaxError) {
            console.log(`    ⚠️ Syntax error detected, not saving`);
            results.push({ file, status: 'SYNTAX_ERROR' });
            return;
        }

        // Save the fixed content
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`    ✅ Apps section added successfully`);
            fixedCount++;
            results.push({ file, status: 'FIXED' });
        }

    } catch (error) {
        console.log(`  ❌ ${file} - Error: ${error.message}`);
        results.push({ file, status: 'ERROR', message: error.message });
    }
});

// Step 4: Final validation
console.log('\n🔍 FINAL VALIDATION...\n');

let validFiles = 0;
const invalidFiles = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for syntax errors
        const syntaxChecks = [
            { pattern: /,,/, name: 'double comma' },
            { pattern: /,\s*,/, name: 'spaced double comma' },
            { pattern: /\}\s*\]\s*,\s*free/, name: 'malformed structure' },
            { pattern: /\]\s*,\s*free/, name: 'orphaned content' }
        ];

        let isValid = true;
        const issues = [];

        syntaxChecks.forEach(check => {
            if (check.pattern.test(content)) {
                isValid = false;
                issues.push(check.name);
            }
        });

        if (!isValid) {
            invalidFiles.push({ file, issues });
            console.log(`  ❌ ${file}: ${issues.join(', ')}`);
        } else {
            validFiles++;
        }

    } catch (error) {
        invalidFiles.push({ file, issues: ['read error'] });
    }
});

// Save report
const report = {
    timestamp: new Date().toISOString(),
    restoredFromBackup: restoredCount,
    appsAdded: fixedCount,
    alreadyHadApps: alreadyHasApps,
    validFiles,
    invalidFiles: invalidFiles.length,
    details: results
};

const reportPath = path.join(__dirname, '..', 'complete_restoration_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

// Summary
console.log(`\n${  '='.repeat(60)}`);
console.log('COMPLETE RESTORATION SUMMARY');
console.log('='.repeat(60));
console.log(`📦 Restored from backup: ${restoredCount} files`);
console.log(`➕ Apps sections added: ${fixedCount} files`);
console.log(`✅ Already had apps: ${alreadyHasApps} files`);
console.log(`✓  Valid files: ${validFiles}/${languageFiles.length}`);
console.log(`❌ Invalid files: ${invalidFiles.length}`);

if (invalidFiles.length > 0) {
    console.log('\n⚠️ FILES WITH ISSUES:');
    invalidFiles.forEach(item => {
        console.log(`  ${item.file}: ${item.issues.join(', ')}`);
    });
}

console.log(`\n📄 Report saved to: ${reportPath}`);

if (invalidFiles.length === 0) {
    console.log('\n✨ SUCCESS! All files are now properly structured.');
    console.log('Clear your browser cache and the undefined issue should be resolved.');
} else {
    console.log('\n⚠️ Some files still have issues. Manual review may be needed.');
}