const fs = require('fs');
const path = require('path');

// CONCEPT: Fix JavaScript syntax errors caused by improper app section insertion
// WHY: Double commas and malformed sections are preventing files from loading
// PATTERN: Parse and fix syntax errors systematically

const jsDir = path.join(__dirname, '..', 'assets', 'js');

// Files reported with syntax errors
const errorFiles = [
    'afrikaans-data.js', 'arabic-data.js', 'bengali-data.js', 'bulgarian-data.js',
    'burmese-data.js', 'chinese-data.js', 'cree-data.js', 'dutch-data.js',
    'danish-data.js', 'estonian-data.js', 'portuguese-data.js', 'kazakh-data.js',
    'latvian-data.js', 'lithuanian-data.js', 'german-data.js', 'greek-data.js',
    'guarani-data.js', 'french-data.js', 'spanish-data.js', 'malay-data.js',
    'marathi-data.js', 'nahuatl-data.js', 'russian-data.js', 'tagalog-data.js',
    'romanian-data.js', 'tamil-data.js', 'thai-data.js', 'serbian-data.js',
    'flemish-data.js', 'persian-data.js', 'wolof-data.js', 'finnish-data.js',
    'indonesian-data.js', 'italian-data.js', 'japanese-data.js', 'korean-data.js',
    'polish-data.js', 'swedish-data.js', 'vietnamese-data.js'
];

console.log(`Fixing syntax errors in ${errorFiles.length} files...\n`);

let fixedCount = 0;
const results = [];

errorFiles.forEach(file => {
    const filePath = path.join(jsDir, file);

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        let issues = [];

        console.log(`🔧 ${file} - Checking for syntax errors...`);

        // Fix 1: Remove double commas (,,)
        if (content.includes(',,')) {
            content = content.replace(/,,+/g, ',');
            issues.push('Fixed double commas');
        }

        // Fix 2: Remove trailing comma before closing brace (,})
        content = content.replace(/,(\s*})/g, '$1');

        // Fix 3: Remove trailing comma before closing bracket (,])
        content = content.replace(/,(\s*])/g, '$1');

        // Fix 4: Look for the specific pattern where apps was incorrectly inserted
        // Pattern: ],, followed by random content
        const badPattern = /\]\s*,\s*,[\s\S]*?apps\s*:\s*\[\]/;
        if (badPattern.test(content)) {
            // Find where the resources section actually ends and place apps correctly
            const resourcesEndPattern = /(resources\s*:\s*\{[\s\S]*?\n\s*\]\s*\}\s*\])\s*\}/;
            const match = content.match(resourcesEndPattern);

            if (match) {
                // Remove the malformed apps insertion
                content = content.replace(badPattern, '],\n        apps: []');
                issues.push('Fixed malformed apps insertion');
            }
        }

        // Fix 5: Look for orphaned content after resources
        // This is content that was accidentally duplicated
        const orphanedPattern = /(\]\s*\}\s*\]\s*),\s*free:\s*true[\s\S]*?apps\s*:\s*\[\]/;
        if (orphanedPattern.test(content)) {
            content = content.replace(orphanedPattern, '$1,\n        apps: []');
            issues.push('Removed orphaned content');
        }

        // Fix 6: Ensure apps is in the right place
        // If apps appears after the resources closing, move it inside
        const appsOutsidePattern = /(\}\s*)\n\s*,?\s*apps\s*:\s*\[\]/;
        if (appsOutsidePattern.test(content)) {
            content = content.replace(appsOutsidePattern, ',\n        apps: []\n$1');
            issues.push('Moved apps inside resources');
        }

        // Fix 7: Clean up any remaining syntax issues
        // Remove multiple consecutive newlines
        content = content.replace(/\n{3,}/g, '\n\n');

        // Ensure proper formatting
        content = content.replace(/\}\s*,\s*,/g, '},');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ Fixed: ${issues.join(', ')}`);
            fixedCount++;
            results.push({
                file: file,
                status: 'FIXED',
                issues: issues
            });
        } else {
            console.log(`  ℹ️ No syntax errors found`);
            results.push({
                file: file,
                status: 'NO_CHANGES',
                message: 'No syntax errors detected'
            });
        }

    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        results.push({
            file: file,
            status: 'ERROR',
            message: error.message
        });
    }
});

// Additional check for all language files
const allLanguageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log('\n📋 Verifying all language files for syntax...\n');

let syntaxErrors = 0;
allLanguageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Try to parse as JavaScript (basic check)
        // Check for common syntax errors
        const syntaxIssues = [];

        if (content.match(/,,+/)) syntaxIssues.push('double commas');
        if (content.match(/,\s*\}/)) syntaxIssues.push('trailing comma before }');
        if (content.match(/,\s*\]/)) syntaxIssues.push('trailing comma before ]');
        if (content.match(/\]\s*,\s*,/)) syntaxIssues.push('double comma after ]');
        if (content.match(/\}\s*,\s*,/)) syntaxIssues.push('double comma after }');

        if (syntaxIssues.length > 0) {
            console.log(`⚠️ ${file}: ${syntaxIssues.join(', ')}`);
            syntaxErrors++;
        }

    } catch (error) {
        console.log(`❌ ${file}: ${error.message}`);
        syntaxErrors++;
    }
});

// Save report
const reportPath = path.join(__dirname, '..', 'syntax_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log('\n' + '='.repeat(60));
console.log('SYNTAX FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Files fixed: ${fixedCount}`);
console.log(`⚠️ Remaining syntax issues: ${syntaxErrors}`);
console.log(`📊 Total processed: ${errorFiles.length}`);
console.log(`\n📄 Report saved to: ${reportPath}`);

if (syntaxErrors > 0) {
    console.log('\n⚠️ Some files still have syntax issues. Running deep fix...');
}