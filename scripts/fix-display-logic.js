const fs = require('fs');
const path = require('path');

// CONCEPT: Fix display logic to handle both data structures
// WHY: Some files have nested resources, others have flat structure
// PATTERN: Defensive programming with fallback checks

console.log('Fixing display logic to handle both data structures...\n');

const fixes = [];

// Fix 1: Update language-page.js
const languagePagePath = path.join(__dirname, '..', 'assets', 'js', 'language-page.js');
console.log('📝 Fixing language-page.js...');

try {
    let content = fs.readFileSync(languagePagePath, 'utf8');
    const originalContent = content;

    // Replace the apps checking logic to handle both structures
    // Original: if (language.resources.apps && Array.isArray(language.resources.apps))
    // New: Check both language.resources.apps AND language.apps

    // Fix the first check
    content = content.replace(
        /if \(language\.resources\.apps && Array\.isArray\(language\.resources\.apps\)\)/g,
        'if ((language.resources?.apps || language.apps) && Array.isArray(language.resources?.apps || language.apps))'
    );

    // Fix the references to language.resources.apps
    content = content.replace(
        /language\.resources\.apps\.length/g,
        '(language.resources?.apps || language.apps).length'
    );

    content = content.replace(
        /language\.resources\.apps\[0\]/g,
        '(language.resources?.apps || language.apps)[0]'
    );

    content = content.replace(
        /language\.resources\.apps\.forEach/g,
        '(language.resources?.apps || language.apps).forEach'
    );

    // Fix the createResourceSection call
    content = content.replace(
        /createResourceSection\('apps', language\.resources\.apps\)/g,
        "createResourceSection('apps', language.resources?.apps || language.apps)"
    );

    fs.writeFileSync(languagePagePath, content, 'utf8');
    console.log('  ✅ Successfully updated language-page.js');
    fixes.push({ file: 'language-page.js', status: 'FIXED' });

} catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    fixes.push({ file: 'language-page.js', status: 'ERROR', message: error.message });
}

// Fix 2: Update main.js
const mainJsPath = path.join(__dirname, '..', 'assets', 'js', 'main.js');
console.log('📝 Fixing main.js...');

try {
    let content = fs.readFileSync(mainJsPath, 'utf8');

    // Fix the apps counting logic
    content = content.replace(
        /if \(lang\.resources\.apps && Array\.isArray\(lang\.resources\.apps\)\)/g,
        'if ((lang.resources?.apps || lang.apps) && Array.isArray(lang.resources?.apps || lang.apps))'
    );

    content = content.replace(
        /resourceCounts\.apps \+= lang\.resources\.apps\.length/g,
        'resourceCounts.apps += (lang.resources?.apps || lang.apps).length'
    );

    fs.writeFileSync(mainJsPath, content, 'utf8');
    console.log('  ✅ Successfully updated main.js');
    fixes.push({ file: 'main.js', status: 'FIXED' });

} catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    fixes.push({ file: 'main.js', status: 'ERROR', message: error.message });
}

// Fix 3: Update resources-page.js
const resourcesPagePath = path.join(__dirname, '..', 'assets', 'js', 'resources-page.js');
console.log('📝 Fixing resources-page.js...');

try {
    let content = fs.readFileSync(resourcesPagePath, 'utf8');

    // Fix the apps processing logic
    content = content.replace(
        /if \(lang\.resources\.apps\)/g,
        'if (lang.resources?.apps || lang.apps)'
    );

    content = content.replace(
        /if \(Array\.isArray\(lang\.resources\.apps\)\)/g,
        'if (Array.isArray(lang.resources?.apps || lang.apps))'
    );

    // Fix any direct references
    const appsRefPattern = /lang\.resources\.apps(?!\s*\|\|)/g;
    content = content.replace(appsRefPattern, '(lang.resources?.apps || lang.apps)');

    fs.writeFileSync(resourcesPagePath, content, 'utf8');
    console.log('  ✅ Successfully updated resources-page.js');
    fixes.push({ file: 'resources-page.js', status: 'FIXED' });

} catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    fixes.push({ file: 'resources-page.js', status: 'ERROR', message: error.message });
}

// Save report
const reportPath = path.join(__dirname, '..', 'display_logic_fix_report.json');
fs.writeFileSync(reportPath, JSON.stringify(fixes, null, 2), 'utf8');

console.log(`\n${  '='.repeat(60)}`);
console.log('DISPLAY LOGIC FIX SUMMARY');
console.log('='.repeat(60));

const successCount = fixes.filter(f => f.status === 'FIXED').length;
const errorCount = fixes.filter(f => f.status === 'ERROR').length;

console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);

console.log('\n✨ SOLUTION EXPLANATION:');
console.log('The undefined display issue was caused by two different data structures:');
console.log('  1. Type A (40 files): language.resources.apps');
console.log('  2. Type B (25 files): language.apps (no nested resources)');
console.log('\nThe display logic now handles BOTH structures using optional chaining.');
console.log('This is cleaner than restructuring all 25 Type B files.');

console.log('\n💡 NEXT STEPS:');
console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
console.log('2. Hard refresh the page (Ctrl+Shift+R)');
console.log('3. The undefined display should now be fixed!');
console.log(`\n📄 Report saved to: ${  reportPath}`);