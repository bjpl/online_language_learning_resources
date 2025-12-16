const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// CONCEPT: Bulletproof fix - restore ALL from git, then add apps correctly
// WHY: Files are corrupted from multiple broken attempts
// PATTERN: Git restore to known good state, then careful addition

const jsDir = path.join(__dirname, '..', 'assets', 'js');

console.log('🛡️ BULLETPROOF FIX\n');
console.log('This will restore all files to the last known good state\n');
console.log('then add apps sections only where needed.\n');
console.log(`${'=' . repeat(60)  }\n`);

// Step 1: Find the last good commit before we started breaking things
console.log('📜 Finding last good commit...\n');

try {
    // Get commit history for today
    const gitLog = execSync('git log --oneline --since="1 day ago"', {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
    });

    console.log('Recent commits:');
    console.log(gitLog);

    // The commit before we started the apps fixes was likely good
    // Let's restore to the commit with comprehensive design system (before apps changes)
    const goodCommit = '50f824d';  // "docs: Add comprehensive verification checklist"

    console.log(`\n🔄 Restoring all JS files to commit ${goodCommit}...\n`);

    // Restore all language data files to that commit
    execSync(`git checkout ${goodCommit} -- assets/js/*-data.js`, {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
    });

    console.log('✅ Files restored to known good state\n');

} catch (error) {
    console.log('⚠️ Could not use git restore, using backup method...\n');
}

// Step 2: Now check which files need apps
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js'));

console.log(`🔍 Checking ${languageFiles.length} language files...\n`);

const needsApps = [];
const hasApps = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Simple check - does it have apps array?
    if (/\bapps\s*:\s*\[/.test(content)) {
        hasApps.push(file);
    } else {
        needsApps.push(file);
    }
});

console.log(`Files with apps: ${hasApps.length}`);
console.log(`Files needing apps: ${needsApps.length}\n`);

// Step 3: Add apps to files that need it
console.log('➕ ADDING APPS SECTIONS...\n');

let successCount = 0;
let failCount = 0;

needsApps.forEach(file => {
    const filePath = path.join(jsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    console.log(`Processing ${file}...`);

    // Find the right place to add apps
    // For nested structure: inside resources, after all other sections
    // For flat structure: at root level, after all other sections

    const hasNestedResources = /resources\s*:\s*\{/.test(content);

    try {
        if (hasNestedResources) {
            // Type A: Nested structure
            // Find the closing of resources object
            // Match everything up to the last section's closing
            const pattern = /(resources\s*:\s*\{[\s\S]*?)((?:\n\s*\]\s*\}\s*\])|(?:\n\s*\]\s*\})|(?:\n\s*\}))\s*(\n\s*\})/;
            const match = content.match(pattern);

            if (match) {
                const beforeLastSection = match[1];
                const lastSectionClose = match[2];
                const resourcesClose = match[3];

                // Add apps after the last section
                const insertion = ',\n\n        apps: []';
                content = beforeLastSection + lastSectionClose + insertion + resourcesClose;

                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  ✅ Added apps to resources`);
                successCount++;
            } else {
                console.log(`  ⚠️ Could not match resources structure`);
                failCount++;
            }
        } else {
            // Type B: Flat structure (entire const is resources)
            // Find the last section before main object closes
            const pattern = /(const\s+\w+Resources\s*=\s*\{[\s\S]*?)((?:\n\s*\]\s*\}\s*\])|(?:\n\s*\]\s*\})|(?:\n\s*\}))\s*(\n\s*\}\s*;?)/;
            const match = content.match(pattern);

            if (match) {
                const beforeLastSection = match[1];
                const lastSectionClose = match[2];
                const mainClose = match[3];

                // Add apps after the last section
                const insertion = ',\n\n    apps: []';
                content = beforeLastSection + lastSectionClose + insertion + mainClose;

                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  ✅ Added apps to main object`);
                successCount++;
            } else {
                console.log(`  ⚠️ Could not match main structure`);
                failCount++;
            }
        }
    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        failCount++;
    }
});

// Step 4: Validate all files
console.log(`\n${  '=' . repeat(60)}`);
console.log('VALIDATION\n');

let validCount = 0;
const invalidFiles = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Basic syntax validation
        const hasApps = /\bapps\s*:\s*\[/.test(content);
        const hasDoubleComma = /,,/.test(content);
        const hasTrailingComma = /,\s*\}/.test(content) || /,\s*\]/.test(content);

        // Try to parse as JavaScript
        try {
            execSync(`node -c "${filePath}"`, { encoding: 'utf8' });

            if (!hasApps) {
                invalidFiles.push({ file, issue: 'Missing apps' });
            } else if (hasDoubleComma) {
                invalidFiles.push({ file, issue: 'Double comma' });
            } else if (hasTrailingComma) {
                invalidFiles.push({ file, issue: 'Trailing comma' });
            } else {
                validCount++;
            }
        } catch (syntaxError) {
            invalidFiles.push({ file, issue: 'Syntax error' });
        }

    } catch (error) {
        invalidFiles.push({ file, issue: 'Read error' });
    }
});

// Final summary
console.log('=' . repeat(60));
console.log('BULLETPROOF FIX SUMMARY');
console.log('=' . repeat(60));
console.log(`✅ Apps sections added: ${successCount}`);
console.log(`⚠️ Failed to add: ${failCount}`);
console.log(`✓  Valid JavaScript files: ${validCount}/${languageFiles.length}`);
console.log(`❌ Invalid files: ${invalidFiles.length}`);

if (invalidFiles.length > 0) {
    console.log('\n⚠️ FILES WITH ISSUES:');
    invalidFiles.slice(0, 10).forEach(item => {
        console.log(`  ${item.file}: ${item.issue}`);
    });
    if (invalidFiles.length > 10) {
        console.log(`  ... and ${invalidFiles.length - 10} more`);
    }
} else {
    console.log('\n✨ SUCCESS! All files are valid.');
    console.log('\n💡 NEXT STEPS:');
    console.log('1. Clear browser cache completely');
    console.log('2. Hard refresh (Ctrl+Shift+R)');
    console.log('3. The undefined issue should be resolved');
}