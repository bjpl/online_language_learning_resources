const fs = require('fs');
const path = require('path');

// URLs to KEEP (these won't be removed even if duplicated)
const urlsToKeep = [
    'swayam.gov.in',
    'gutenberg.org/browse/languages/nl',
    'bipa.ut.ac.id',
    'oq.gov.kz/en/p-learning',
    'indonesian-online.com'
];

// Function to normalize URLs for comparison
function normalizeUrl(url) {
    if (!url) return null;
    url = url.replace(/\/+$/, '');
    url = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    url = url.toLowerCase();
    return url;
}

// Function to check if URL should be kept
function shouldKeepUrl(url) {
    const normalized = normalizeUrl(url);
    return urlsToKeep.some(keepUrl => normalized.includes(keepUrl.toLowerCase()));
}

// First pass: collect all URLs and track which ones are duplicates
console.log('Phase 1: Analyzing all language files to find duplicates...\n');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

// Map to track URL occurrences
const urlOccurrences = new Map();

// Process each file to collect URLs
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Find all URLs in the file
        const urlPatterns = [
            /(?:url|link|href|website|site|source)\s*:\s*["']([^"']+)["']/gi,
            /(?:url|link|href|website|site|source)\s*:\s*`([^`]+)`/gi
        ];

        urlPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const url = match[1];
                if (url && (url.startsWith('http') || url.startsWith('www') || url.includes('.com') || url.includes('.org'))) {
                    const normalizedUrl = normalizeUrl(url);
                    if (normalizedUrl) {
                        if (!urlOccurrences.has(normalizedUrl)) {
                            urlOccurrences.set(normalizedUrl, []);
                        }
                        urlOccurrences.get(normalizedUrl).push({
                            language: languageName,
                            originalUrl: url
                        });
                    }
                }
            }
        });
    } catch (error) {
        console.log(`Error processing ${file}: ${error.message}`);
    }
});

// Identify duplicates (URLs appearing in multiple languages)
const duplicatesToRemove = new Map();
urlOccurrences.forEach((occurrences, normalizedUrl) => {
    const languages = [...new Set(occurrences.map(o => o.language))];
    if (languages.length > 1 && !shouldKeepUrl(normalizedUrl)) {
        // This URL appears in multiple languages and should be removed
        duplicatesToRemove.set(normalizedUrl, occurrences);
    }
});

console.log(`Found ${duplicatesToRemove.size} duplicate URLs to remove`);
console.log(`Keeping ${urlsToKeep.length} specified URLs\n`);

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backups', `backup_${new Date().toISOString().replace(/[:.]/g, '-')}`);
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// Phase 2: Remove duplicates from files
console.log('Phase 2: Removing duplicate URLs from language files...\n');

let totalRemoved = 0;
const removalLog = [];

languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    let removedCount = 0;
    const removedUrls = [];

    // For each duplicate URL, check if it appears in this file
    duplicatesToRemove.forEach((occurrences, normalizedUrl) => {
        const fileOccurrences = occurrences.filter(o => o.language === languageName);

        if (fileOccurrences.length > 0) {
            fileOccurrences.forEach(occurrence => {
                // Create regex patterns to match the entire resource object
                const escapedUrl = occurrence.originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // Pattern to match complete resource objects containing this URL
                const patterns = [
                    // Match object from opening { to closing } that contains this URL
                    new RegExp(`\\{[^{}]*?(?:url|link|href|website|site|source)\\s*:\\s*["'\`]${escapedUrl}["'\`][^{}]*?\\}`, 'g'),
                    // Match array item if it's just a URL string
                    new RegExp(`["'\`]${escapedUrl}["'\`]\\s*,?`, 'g')
                ];

                patterns.forEach(pattern => {
                    const matches = content.match(pattern);
                    if (matches) {
                        matches.forEach(match => {
                            // Check if this match contains other important fields
                            if (match.includes('{')) {
                                // It's an object - remove the entire object
                                const newContent = content.replace(match, '');
                                if (newContent !== content) {
                                    content = newContent;
                                    removedCount++;
                                    removedUrls.push(occurrence.originalUrl);

                                    // Clean up any trailing commas
                                    content = content.replace(/,\s*,/g, ',');
                                    content = content.replace(/\[\s*,/g, '[');
                                    content = content.replace(/,\s*\]/g, ']');
                                    content = content.replace(/,\s*\}/g, '}');
                                }
                            }
                        });
                    }
                });
            });
        }
    });

    if (removedCount > 0) {
        // Backup original file
        const backupPath = path.join(backupDir, file);
        fs.writeFileSync(backupPath, originalContent, 'utf8');

        // Save modified content
        fs.writeFileSync(filePath, content, 'utf8');

        console.log(`${languageName}: Removed ${removedCount} duplicate resources`);
        totalRemoved += removedCount;

        removalLog.push({
            language: languageName,
            removedCount,
            removedUrls
        });
    }
});

// Generate detailed report
console.log(`\n\nTotal duplicate resources removed: ${totalRemoved}`);

// Create removal report
let reportContent = 'DUPLICATE URL REMOVAL REPORT\n';
reportContent += '============================\n\n';
reportContent += `Date: ${new Date().toISOString()}\n`;
reportContent += `Total duplicate URLs identified: ${duplicatesToRemove.size}\n`;
reportContent += `Total resources removed: ${totalRemoved}\n`;
reportContent += `Backup location: ${backupDir}\n\n`;

reportContent += 'URLS KEPT (as requested):\n';
reportContent += '-------------------------\n';
urlsToKeep.forEach(url => {
    reportContent += `- ${url}\n`;
});

reportContent += '\n\nREMOVED DUPLICATES BY URL:\n';
reportContent += '-------------------------\n';

// Sort by number of occurrences
const sortedRemovals = Array.from(duplicatesToRemove.entries())
    .sort((a, b) => b[1].length - a[1].length);

sortedRemovals.forEach(([url, occurrences]) => {
    const languages = [...new Set(occurrences.map(o => o.language))];
    reportContent += `\n${url}\n`;
    reportContent += `  Removed from ${languages.length} languages: ${languages.join(', ')}\n`;
});

reportContent += '\n\nREMOVAL DETAILS BY LANGUAGE:\n';
reportContent += '----------------------------\n';

removalLog.forEach(entry => {
    reportContent += `\n${entry.language}:\n`;
    reportContent += `  Resources removed: ${entry.removedCount}\n`;
    if (entry.removedUrls.length > 0) {
        reportContent += '  URLs removed:\n';
        const uniqueUrls = [...new Set(entry.removedUrls)];
        uniqueUrls.forEach(url => {
            reportContent += `    - ${url}\n`;
        });
    }
});

const reportPath = path.join(__dirname, '..', 'duplicate_removal_report.txt');
fs.writeFileSync(reportPath, reportContent, 'utf8');

console.log(`\nRemoval report saved to: ${reportPath}`);
console.log(`Backup files saved to: ${backupDir}`);

// Also create a JSON report for programmatic use
const jsonReport = {
    date: new Date().toISOString(),
    backupLocation: backupDir,
    urlsKept: urlsToKeep,
    totalDuplicatesFound: duplicatesToRemove.size,
    totalResourcesRemoved: totalRemoved,
    removedUrls: Array.from(duplicatesToRemove.keys()),
    removalsByLanguage: removalLog
};

const jsonReportPath = path.join(__dirname, '..', 'duplicate_removal_report.json');
fs.writeFileSync(jsonReportPath, JSON.stringify(jsonReport, null, 2), 'utf8');

console.log(`JSON report saved to: ${jsonReportPath}`);