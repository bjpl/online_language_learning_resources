/**
 * Extract app resources from other sections and move them to apps section
 * Apps like Duolingo, Memrise, Anki, HelloTalk, Tandem should be in apps, not courses
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'js');

// App keywords to identify app resources
const appKeywords = [
    'Duolingo', 'Memrise', 'Anki', 'Drops', 'Babbel', 'Busuu',
    'HelloTalk', 'Tandem', 'Mondly', 'Rosetta Stone', 'LingQ',
    'FluentU', 'Clozemaster', 'Lingvist', 'Beelinguapp',
    'Google Translate', 'DeepL', 'app', 'App', 'mobile', 'Mobile',
    'iOS', 'Android', 'iPhone', 'iPad', 'Play Store', 'App Store'
];

// Files that need apps extracted (the 26 with empty apps)
const filesToProcess = [
    'cebuano-data.js', 'croatian-data.js', 'dari-data.js', 'gujarati-data.js',
    'hausa-data.js', 'hmong-data.js', 'hungarian-data.js', 'inuktitut-data.js',
    'irish-data.js', 'kannada-data.js', 'lao-data.js', 'mongolian-data.js',
    'navajo-data.js', 'nepali-data.js', 'pashto-data.js', 'punjabi-data.js',
    'quechua-data.js', 'sign-language-data.js', 'slovak-data.js', 'telugu-data.js',
    'ukrainian-data.js', 'urdu-data.js', 'welsh-data.js', 'yoruba-data.js'
];

console.log(`📱 Extracting apps from other sections for ${filesToProcess.length} files\n`);

let processedCount = 0;
let appsFoundCount = 0;

filesToProcess.forEach(file => {
    const filePath = path.join(targetDir, file);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Parse the file to find items that should be apps
        const extractedApps = [];

        // Look for items in courses, practice, and other sections
        const itemMatches = content.matchAll(/"name":\s*"([^"]+)"[^}]*?"url":\s*"([^"]+)"/g);

        for (const match of itemMatches) {
            const name = match[1];
            const url = match[2];

            // Check if this item is likely an app
            const isApp = appKeywords.some(keyword =>
                name.includes(keyword) || url.includes('play.google.com') ||
                url.includes('apps.apple.com') || url.includes('duolingo.com') ||
                url.includes('memrise.com') || url.includes('ankiweb.net') ||
                url.includes('hellotalk.com') || url.includes('tandem.net')
            );

            if (isApp) {
                // Extract the full item
                const itemStart = content.indexOf(match[0]);
                const itemEnd = content.indexOf('}', itemStart) + 1;
                const itemContent = content.substring(
                    content.lastIndexOf('{', itemStart),
                    itemEnd
                );

                // Only add if it's a valid app entry
                if (itemContent.includes('name') && itemContent.includes('url')) {
                    extractedApps.push(itemContent);
                }
            }
        }

        if (extractedApps.length > 0) {
            console.log(`✅ ${file} - Found ${extractedApps.length} apps to extract`);

            // Create proper apps section
            const appsSection = `apps: [
        {
            category: "Mobile Apps & Software",
            items: [
${extractedApps.map(app => '                ' + app).join(',\n')}
            ]
        }
    ]`;

            // Replace empty apps array
            content = content.replace(/apps:\s*\[\]/, appsSection);

            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            appsFoundCount += extractedApps.length;
        } else {
            console.log(`⚠️  ${file} - No apps found to extract`);
        }

        processedCount++;

    } catch (error) {
        console.error(`❌ ${file} - Error: ${error.message}`);
    }
});

console.log('\n📊 Summary:');
console.log(`✅ Processed: ${processedCount} files`);
console.log(`📱 Apps found and extracted: ${appsFoundCount} total`);

if (appsFoundCount > 0) {
    console.log('\n🎉 Apps successfully extracted to proper sections!');
}