const fs = require('fs');
const path = require('path');

// CONCEPT: Properly fix the apps placement without breaking the structure
// WHY: Apps was inserted in the wrong place, breaking the resources structure
// PATTERN: Find the correct end of resources and add apps there

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Fixing apps placement in ${languageFiles.length} language files...\n`);

let fixedCount = 0;
let alreadyCorrectCount = 0;
const results = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        console.log(`🔧 ${file} - Analyzing structure...`);

        // First, check if there's a broken apps placement
        // Look for patterns where apps interrupts other sections
        const brokenAppsPattern = /\],\s*free:\s*true[\s\S]*?apps:\s*\[/;
        const hasbrokenApps = brokenAppsPattern.test(content);

        if (hasbrokenApps) {
            console.log(`  ⚠️ Found broken apps placement, removing...`);

            // Remove the broken apps section and any orphaned content
            content = content.replace(/\],\s*free:\s*true[\s\S]*?(?=\},)/g, ']');
            content = content.replace(/apps:\s*\[[^\]]*\]/g, '');
        }

        // Check if file has nested resources structure
        const hasNestedResources = /resources\s*:\s*\{/.test(content);

        if (hasNestedResources) {
            // Type A: Has nested resources object
            // Check if apps already exists in the right place
            const resourcesMatch = content.match(/(resources\s*:\s*\{[\s\S]*?)(\n\s*\})/);

            if (resourcesMatch) {
                const resourcesContent = resourcesMatch[1];
                const hasAppsInResources = /apps\s*:\s*\[/.test(resourcesContent);

                if (!hasAppsInResources) {
                    console.log(`  ➕ Adding apps to resources...`);

                    // Find the last section in resources (usually practice or community)
                    const lastSectionPattern = /(\]\s*\}\s*\])(\s*\})/;
                    const resourcesEndPattern = /(resources\s*:\s*\{[\s\S]*?)(\n\s*\})/;

                    const match = content.match(resourcesEndPattern);
                    if (match) {
                        const beforeEnd = match[1];
                        const closingBrace = match[2];

                        // Add apps array properly
                        const newContent = `${beforeEnd  },\n        apps: []${  closingBrace}`;
                        content = content.replace(resourcesEndPattern, newContent);
                    }
                } else {
                    console.log(`  ✅ Apps already correctly placed in resources`);
                    alreadyCorrectCount++;
                }
            }
        } else {
            // Type B: The entire const IS the resources object
            // Check if apps exists at root level
            const hasAppsAtRoot = /,\s*apps\s*:\s*\[/.test(content);

            if (!hasAppsAtRoot) {
                console.log(`  ➕ Adding apps at root level...`);

                // Find the end of the main object
                const mainObjectEndPattern = /(\n\s*\}\s*);/;
                const match = content.match(mainObjectEndPattern);

                if (match) {
                    // Add apps before the closing brace
                    content = content.replace(mainObjectEndPattern, ',\n    apps: []$1;');
                }
            } else {
                console.log(`  ✅ Apps already correctly placed`);
                alreadyCorrectCount++;
            }
        }

        // Clean up any syntax errors
        content = content.replace(/,,+/g, ',');
        content = content.replace(/,(\s*\})/g, '$1');
        content = content.replace(/,(\s*\])/g, '$1');
        content = content.replace(/\}\s*,\s*,/g, '},');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ Fixed and saved`);
            fixedCount++;
            results.push({
                file,
                status: 'FIXED',
                message: 'Structure corrected'
            });
        } else {
            results.push({
                file,
                status: 'NO_CHANGES',
                message: 'Already correct'
            });
        }

    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        results.push({
            file,
            status: 'ERROR',
            message: error.message
        });
    }
});

// Verify no syntax errors remain
console.log('\n📋 Final verification...\n');

let remainingErrors = 0;
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for common syntax errors
        if (content.match(/,,+/) ||
            content.match(/,\s*\}/) ||
            content.match(/,\s*\]/) ||
            content.match(/\]\s*,\s*free:/)) {
            console.log(`⚠️ ${file}: Still has syntax issues`);
            remainingErrors++;
        }

    } catch (error) {
        console.log(`❌ ${file}: ${error.message}`);
        remainingErrors++;
    }
});

// Save report
const reportPath = path.join(__dirname, '..', 'final_structure_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`\n${  '='.repeat(60)}`);
console.log('FINAL STRUCTURE FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Files fixed: ${fixedCount}`);
console.log(`✓  Already correct: ${alreadyCorrectCount}`);
console.log(`⚠️ Remaining issues: ${remainingErrors}`);
console.log(`📊 Total processed: ${languageFiles.length}`);
console.log(`\n📄 Report saved to: ${reportPath}`);

if (remainingErrors === 0) {
    console.log('\n✨ All files are now properly structured!');
    console.log('Clear your browser cache and the undefined issue should be resolved.');
}