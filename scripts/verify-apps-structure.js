const fs = require('fs');
const path = require('path');

// CONCEPT: Final verification of apps structure across all language files
// WHY: Ensure the undefined display issue is resolved
// PATTERN: Comprehensive validation with actionable report

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Verifying apps structure in ${languageFiles.length} language files...\n`);

const categories = {
    correct: [],
    wrongLocation: [],
    missing: [],
    malformed: [],
    error: []
};

// Helper to check if apps is properly inside resources
function checkAppsLocation(content, file) {
    const languageName = file.replace('-data.js', '');

    try {
        // Type 1: Files with nested resources object
        if (content.includes('"resources":') || content.includes('resources:')) {
            // Check if apps is inside resources
            const resourcesMatch = content.match(/(resources\s*:\s*\{[^]*?\n\s*\})/);
            if (resourcesMatch) {
                const resourcesContent = resourcesMatch[0];
                if (resourcesContent.includes('apps:') || resourcesContent.includes('"apps"')) {
                    return { status: 'CORRECT', location: 'inside_resources' };
                }
            }

            // Check if apps is outside resources
            if (content.includes('apps:') || content.includes('"apps"')) {
                return { status: 'WRONG_LOCATION', location: 'outside_resources' };
            }

            return { status: 'MISSING', location: 'none' };
        }

        // Type 2: Files where the entire const IS the resources
        // These files should have apps as a direct property
        if (content.includes('apps:') || content.includes('"apps"')) {
            // Check if it's at the correct level (direct property)
            const constPattern = new RegExp(`const\\s+${languageName}Resources\\s*=\\s*\\{`);
            if (constPattern.test(content)) {
                // Apps should be a direct property here
                return { status: 'CORRECT', location: 'direct_property' };
            }
        }

        return { status: 'MISSING', location: 'none' };

    } catch (error) {
        return { status: 'ERROR', location: 'error', message: error.message };
    }
}

// Process each file
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const result = checkAppsLocation(content, file);

        switch (result.status) {
            case 'CORRECT':
                categories.correct.push({ file, location: result.location });
                console.log(`✅ ${file} - Apps correctly positioned (${result.location})`);
                break;
            case 'WRONG_LOCATION':
                categories.wrongLocation.push({ file, location: result.location });
                console.log(`⚠️ ${file} - Apps in wrong location (${result.location})`);
                break;
            case 'MISSING':
                categories.missing.push({ file });
                console.log(`❌ ${file} - Apps section missing`);
                break;
            case 'ERROR':
                categories.error.push({ file, message: result.message });
                console.log(`🔥 ${file} - Error: ${result.message}`);
                break;
        }

    } catch (error) {
        categories.error.push({ file, message: error.message });
        console.log(`🔥 ${file} - Read error: ${error.message}`);
    }
});

// Generate summary report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        total: languageFiles.length,
        correct: categories.correct.length,
        wrongLocation: categories.wrongLocation.length,
        missing: categories.missing.length,
        errors: categories.error.length
    },
    details: categories,
    recommendation: ''
};

// Add recommendation based on results
if (categories.wrongLocation.length > 0 || categories.missing.length > 0) {
    report.recommendation = 'Files need fixing. Run comprehensive-apps-fix.js again.';
} else if (categories.correct.length === languageFiles.length) {
    report.recommendation = '✨ All files are correctly structured! Clear browser cache and test.';
} else {
    report.recommendation = 'Some files have errors. Manual review needed.';
}

// Save detailed report
const reportPath = path.join(__dirname, '..', 'final_apps_verification.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

// Display summary
console.log(`\n${  '='.repeat(60)}`);
console.log('FINAL VERIFICATION SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Correct structure: ${categories.correct.length} files`);
console.log(`⚠️ Wrong location: ${categories.wrongLocation.length} files`);
console.log(`❌ Missing apps: ${categories.missing.length} files`);
console.log(`🔥 Errors: ${categories.error.length} files`);
console.log('='.repeat(60));
console.log(`\n📊 Total files: ${languageFiles.length}`);
console.log(`\n💡 RECOMMENDATION: ${report.recommendation}`);
console.log(`\n📄 Full report saved to: ${reportPath}`);

// Display action items if needed
if (categories.wrongLocation.length > 0) {
    console.log('\n⚠️ FILES WITH APPS IN WRONG LOCATION:');
    categories.wrongLocation.forEach(item => {
        console.log(`  - ${item.file} (currently: ${item.location})`);
    });
}

if (categories.missing.length > 0) {
    console.log('\n❌ FILES MISSING APPS SECTION:');
    categories.missing.forEach(item => {
        console.log(`  - ${item.file}`);
    });
}