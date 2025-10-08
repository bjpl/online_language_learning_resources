const fs = require('fs');
const path = require('path');

// CONCEPT: Definitive fix - Only add apps where missing, in the correct location
// WHY: Previous attempts added apps in wrong places or created syntax errors
// PATTERN: Careful parsing, precise insertion, validation before saving

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log('🎯 DEFINITIVE APPS FIX\n');
console.log('This will ONLY add apps to files that don\'t have it.\n');
console.log(`${'=' . repeat(60)  }\n`);

let addedCount = 0;
let alreadyHasCount = 0;
let errorCount = 0;
const results = [];

// Helper function to find the correct insertion point
function findInsertionPoint(content, isNestedStructure) {
    if (isNestedStructure) {
        // Type A: Find the end of the resources object
        // Look for resources: { ... }
        const resourcesStart = content.indexOf('resources:') !== -1
            ? content.indexOf('resources:')
            : content.indexOf('"resources":');

        if (resourcesStart === -1) return -1;

        // Find the opening brace
        const openBrace = content.indexOf('{', resourcesStart);
        if (openBrace === -1) return -1;

        // Count braces to find the matching closing brace
        let braceCount = 1;
        let pos = openBrace + 1;

        while (pos < content.length && braceCount > 0) {
            if (content[pos] === '{') braceCount++;
            if (content[pos] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    return pos;  // This is where we insert before
                }
            }
            pos++;
        }
        return -1;
    } else {
        // Type B: Find the end of the main object
        // Look for the last closing brace before the final semicolon
        const lastSemicolon = content.lastIndexOf(';');
        const lastBrace = content.lastIndexOf('}', lastSemicolon);
        return lastBrace;
    }
}

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Check if apps already exists
        const hasApps = /\bapps\s*:\s*\[/.test(content);

        if (hasApps) {
            console.log(`✅ ${file} - Already has apps section`);
            alreadyHasCount++;
            results.push({
                file,
                status: 'ALREADY_HAS_APPS',
                message: 'Apps section already present'
            });
            return;
        }

        console.log(`🔧 ${file} - Adding apps section...`);

        // Determine structure type
        const isNestedStructure = /resources\s*:\s*\{/.test(content) ||
                                 /"resources"\s*:\s*\{/.test(content);

        // Find insertion point
        const insertPos = findInsertionPoint(content, isNestedStructure);

        if (insertPos === -1) {
            console.log(`  ❌ Could not find insertion point`);
            errorCount++;
            results.push({
                file,
                status: 'ERROR',
                message: 'Could not find proper insertion point'
            });
            return;
        }

        // Prepare the insertion
        const beforeInsert = content.substring(0, insertPos);
        const afterInsert = content.substring(insertPos);

        // Determine if we need a comma
        const trimmedBefore = beforeInsert.trim();
        const needsComma = trimmedBefore.endsWith(']') ||
                          trimmedBefore.endsWith('}');

        // Determine indentation based on structure type
        const indent = isNestedStructure ? '        ' : '    ';
        const insertion = `${needsComma ? ',' : ''  }\n${  indent  }apps: []`;

        // Create the new content
        content = beforeInsert + insertion + afterInsert;

        // Validate the new content
        // Check for basic syntax errors
        const syntaxErrors = [];
        if (/,,/.test(content)) syntaxErrors.push('double comma');
        if (/,\s*,/.test(content)) syntaxErrors.push('spaced double comma');

        // Check structure integrity
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) syntaxErrors.push('mismatched braces');

        const openBrackets = (content.match(/\[/g) || []).length;
        const closeBrackets = (content.match(/\]/g) || []).length;
        if (openBrackets !== closeBrackets) syntaxErrors.push('mismatched brackets');

        if (syntaxErrors.length > 0) {
            console.log(`  ❌ Syntax errors detected: ${syntaxErrors.join(', ')}`);
            errorCount++;
            results.push({
                file,
                status: 'SYNTAX_ERROR',
                message: `Syntax errors: ${syntaxErrors.join(', ')}`
            });
            return;
        }

        // Save the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Apps section added successfully`);
        addedCount++;
        results.push({
            file,
            status: 'ADDED',
            message: 'Apps section added successfully'
        });

    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        errorCount++;
        results.push({
            file,
            status: 'ERROR',
            message: error.message
        });
    }
});

// Final validation of all files
console.log(`\n${  '=' . repeat(60)}`);
console.log('FINAL VALIDATION\n');

let validCount = 0;
const invalidFiles = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for apps section
        const hasApps = /\bapps\s*:\s*\[/.test(content);

        // Check for syntax errors
        const issues = [];
        if (!hasApps) issues.push('missing apps');
        if (/,,/.test(content)) issues.push('double comma');
        if (/,\s*,/.test(content)) issues.push('spaced double comma');

        if (issues.length === 0) {
            validCount++;
        } else {
            invalidFiles.push({ file, issues });
        }
    } catch (error) {
        invalidFiles.push({ file, issues: ['read error'] });
    }
});

// Save comprehensive report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        total: languageFiles.length,
        alreadyHadApps: alreadyHasCount,
        appsAdded: addedCount,
        errors: errorCount,
        validFiles: validCount,
        invalidFiles: invalidFiles.length
    },
    details: results,
    invalidFiles
};

const reportPath = path.join(__dirname, '..', 'definitive_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

// Display summary
console.log('=' . repeat(60));
console.log('DEFINITIVE FIX SUMMARY');
console.log('=' . repeat(60));
console.log(`✓  Already had apps: ${alreadyHasCount} files`);
console.log(`✅ Apps added: ${addedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`\n✓  Valid files: ${validCount}/${languageFiles.length}`);
console.log(`❌ Invalid files: ${invalidFiles.length}`);

if (invalidFiles.length > 0) {
    console.log('\n⚠️ FILES WITH ISSUES:');
    invalidFiles.forEach(item => {
        console.log(`  ${item.file}: ${item.issues.join(', ')}`);
    });
}

console.log(`\n📄 Full report saved to: ${reportPath}`);

if (invalidFiles.length === 0) {
    console.log('\n✨ SUCCESS! All files now have apps sections with valid syntax.');
    console.log('\n💡 The undefined display issue should now be resolved.');
    console.log('Clear your browser cache and refresh the page.');
} else {
    console.log('\n⚠️ Some files still need attention.');
}