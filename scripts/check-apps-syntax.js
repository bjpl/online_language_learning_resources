const fs = require('fs');
const path = require('path');

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Checking apps syntax in ${languageFiles.length} language files...\n`);

const syntaxVariations = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for different syntax patterns for apps
        const patterns = {
            'apps: []': /apps:\s*\[\s*\]/,
            '"apps": []': /"apps":\s*\[\s*\]/,
            'apps: [{...}]': /apps:\s*\[\s*{/,
            '"apps": [{...}]': /"apps":\s*\[\s*{/,
            'apps: [...]': /apps:\s*\[[\s\S]+?\]/,
            'malformed': /apps\s*\]/  // Missing opening bracket
        };

        let foundPattern = null;
        for (const [name, pattern] of Object.entries(patterns)) {
            if (pattern.test(content)) {
                foundPattern = name;
                break;
            }
        }

        // Also check if apps is at the wrong nesting level or has syntax errors
        const appsMatch = content.match(/(apps|"apps")\s*:\s*(\[[\s\S]*?\])/);
        let appsContent = '';
        let hasIssue = false;
        let issueDetails = '';

        if (appsMatch) {
            appsContent = appsMatch[2];

            // Check for common syntax issues
            if (appsContent.includes('undefined')) {
                hasIssue = true;
                issueDetails = 'Contains undefined';
            }

            // Check if it's just after a closing brace without comma
            const beforeApps = content.substring(Math.max(0, appsMatch.index - 20), appsMatch.index);
            if (beforeApps.includes('}') && !beforeApps.includes(',')) {
                hasIssue = true;
                issueDetails = 'Missing comma before apps';
            }

            // Check if it's incorrectly nested (not inside resources)
            const resourcesEnd = content.lastIndexOf('}', appsMatch.index);
            const resourcesStart = content.lastIndexOf('resources', appsMatch.index);
            if (resourcesEnd > resourcesStart) {
                // apps might be outside resources object
                hasIssue = true;
                issueDetails = 'Apps might be outside resources object';
            }
        }

        syntaxVariations.push({
            file,
            language: languageName,
            pattern: foundPattern || 'NOT FOUND',
            hasIssue,
            issueDetails,
            snippet: appsContent ? `${appsContent.substring(0, 50)  }...` : 'N/A'
        });

    } catch (error) {
        syntaxVariations.push({
            file,
            language: languageName,
            pattern: 'ERROR',
            hasIssue: true,
            issueDetails: error.message,
            snippet: 'N/A'
        });
    }
});

// Group by pattern type
const byPattern = {};
syntaxVariations.forEach(item => {
    if (!byPattern[item.pattern]) {
        byPattern[item.pattern] = [];
    }
    byPattern[item.pattern].push(item.language);
});

console.log('=== SYNTAX PATTERNS FOUND ===\n');
Object.entries(byPattern).forEach(([pattern, languages]) => {
    console.log(`${pattern}: ${languages.length} files`);
    if (languages.length <= 10) {
        console.log(`  Languages: ${languages.join(', ')}`);
    }
    console.log();
});

// Report issues
const issues = syntaxVariations.filter(item => item.hasIssue);
if (issues.length > 0) {
    console.log('=== POTENTIAL ISSUES ===\n');
    issues.forEach(item => {
        console.log(`${item.file}:`);
        console.log(`  Issue: ${item.issueDetails}`);
        console.log(`  Pattern: ${item.pattern}`);
        console.log();
    });
}

// Save detailed report
const reportPath = path.join(__dirname, '..', 'apps_syntax_report.json');
fs.writeFileSync(reportPath, JSON.stringify(syntaxVariations, null, 2), 'utf8');
console.log(`\nDetailed report saved to: ${reportPath}`);