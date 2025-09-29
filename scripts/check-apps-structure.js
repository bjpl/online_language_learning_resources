// CONCEPT: Check the exact structure of apps in problematic languages
// WHY: Need to understand why these specific languages show undefined

const fs = require('fs');
const path = require('path');

const problematicLanguages = [
    'afrikaans', 'arabic', 'bengali', 'bulgarian', 'burmese',
    'cebuano', 'chinese', 'cree', 'croatian', 'czech',
    'danish', 'dari', 'dutch', 'estonian', 'hebrew',
    'norwegian', 'turkish'
];

const workingLanguages = [
    'finnish', 'french', 'german', 'spanish', 'italian'
];

console.log('=== CHECKING APPS STRUCTURE ===\n');

function analyzeLanguageFile(lang, isProblematic) {
    const filePath = path.join(__dirname, '..', 'assets', 'js', `${lang}-data.js`);

    if (!fs.existsSync(filePath)) {
        console.log(`  ❌ FILE NOT FOUND: ${lang}-data.js`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for apps location
    const appsMatches = content.match(/apps:\s*\[/g);
    const appsIndices = [];
    let index = 0;
    while ((index = content.indexOf('apps:', index)) !== -1) {
        appsIndices.push(index);
        index += 5;
    }

    // Check if apps is inside resources or at root level
    const resourcesIndex = content.indexOf('resources:');
    const appsIndex = content.indexOf('apps:');

    // Find the structure
    let structure = 'UNKNOWN';
    if (appsIndex > 0) {
        // Check if apps is inside resources
        if (resourcesIndex > 0 && appsIndex > resourcesIndex) {
            // Find the closing brace for resources
            const resourcesSection = content.substring(resourcesIndex);
            const bracesCount = [];
            let openBraces = 0;
            for (let i = 0; i < resourcesSection.length; i++) {
                if (resourcesSection[i] === '{') openBraces++;
                if (resourcesSection[i] === '}') {
                    openBraces--;
                    if (openBraces === 0) {
                        // This is where resources closes
                        const resourcesEnd = resourcesIndex + i;
                        if (appsIndex < resourcesEnd) {
                            structure = 'INSIDE_RESOURCES';
                        } else {
                            structure = 'AFTER_RESOURCES';
                        }
                        break;
                    }
                }
            }
        } else {
            structure = 'ROOT_LEVEL';
        }
    }

    // Check how many times 'apps:' appears
    const appsCount = appsMatches ? appsMatches.length : 0;

    // Check line number of apps
    const lines = content.split('\n');
    let appsLine = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('apps:')) {
            appsLine = i + 1;
            break;
        }
    }

    const status = isProblematic ? '⚠️' : '✅';
    console.log(`${status} ${lang}:`);
    console.log(`    Structure: ${structure}`);
    console.log(`    Apps at line: ${appsLine}`);
    console.log(`    Apps occurrences: ${appsCount}`);

    // Check if it's accessing apps correctly
    if (structure === 'INSIDE_RESOURCES') {
        console.log(`    Access: language.resources.apps`);
    } else if (structure === 'AFTER_RESOURCES' || structure === 'ROOT_LEVEL') {
        console.log(`    Access: language.apps`);
    }

    console.log('');
}

console.log('PROBLEMATIC LANGUAGES:');
problematicLanguages.forEach(lang => analyzeLanguageFile(lang, true));

console.log('\nWORKING LANGUAGES (for comparison):');
workingLanguages.forEach(lang => analyzeLanguageFile(lang, false));

console.log('\n=== KEY INSIGHT ===');
console.log('If problematic languages have apps AFTER_RESOURCES or at ROOT_LEVEL,');
console.log('but the code expects them INSIDE_RESOURCES, that would cause undefined.');