const fs = require('fs');
const path = require('path');

// Function to normalize URLs for comparison
function normalizeUrl(url) {
    if (!url) return null;

    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    // Remove protocol and www for comparison
    url = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Convert to lowercase for case-insensitive comparison
    url = url.toLowerCase();

    return url;
}

// Load all language data files
const jsDir = path.join(__dirname, '..', 'assets', 'js');
const languageFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('-data.js') && !file.includes('backup'));

console.log(`Found ${languageFiles.length} language data files\n`);

// Map to store URLs and their occurrences
const urlMap = new Map();
const duplicateUrls = new Map();

// Process each language file
languageFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const languageName = file.replace('-data.js', '');

    try {
        // Read the file content
        const content = fs.readFileSync(filePath, 'utf8');

        // Use regex to find all URL patterns in the file
        // Match patterns like url: "...", 'url': '...', link: "...", etc.
        const urlPatterns = [
            /(?:url|link|href|website|site|source)\s*:\s*["']([^"']+)["']/gi,
            /(?:url|link|href|website|site|source)\s*:\s*`([^`]+)`/gi
        ];

        const foundUrls = new Set();

        urlPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const url = match[1];
                // Filter out only valid URLs
                if (url && (url.startsWith('http') || url.startsWith('www') || url.includes('.com') || url.includes('.org'))) {
                    foundUrls.add(url);
                }
            }
        });

        console.log(`Processed ${languageName}: ${foundUrls.size} URLs found`);

        // Track URL occurrences
        foundUrls.forEach(url => {
            const normalizedUrl = normalizeUrl(url);
            if (normalizedUrl) {
                if (!urlMap.has(normalizedUrl)) {
                    urlMap.set(normalizedUrl, []);
                }

                urlMap.get(normalizedUrl).push({
                    language: languageName,
                    originalUrl: url
                });
            }
        });

    } catch (error) {
        console.log(`Error processing ${file}: ${error.message}`);
    }
});

// Find duplicates (URLs that appear in more than one language)
urlMap.forEach((occurrences, normalizedUrl) => {
    // Check if URL appears in multiple languages
    const languages = [...new Set(occurrences.map(o => o.language))];
    if (languages.length > 1) {
        duplicateUrls.set(normalizedUrl, occurrences);
    }
});

console.log(`\n\nTotal unique URLs: ${urlMap.size}`);
console.log(`URLs appearing in multiple languages: ${duplicateUrls.size}`);

// Generate CSV content
let csvContent = 'Normalized URL,Original URL,Language,Languages Using This URL,Total Occurrences\n';

// Sort duplicates by occurrence count (most duplicated first)
const sortedDuplicates = Array.from(duplicateUrls.entries())
    .sort((a, b) => b[1].length - a[1].length);

// Group occurrences by normalized URL for CSV
sortedDuplicates.forEach(([normalizedUrl, occurrences]) => {
    const languageList = [...new Set(occurrences.map(o => o.language))].join('; ');

    occurrences.forEach(occurrence => {
        // Escape fields that might contain commas
        const escapeCsvField = (field) => {
            if (field && field.toString().includes(',')) {
                return `"${field.toString().replace(/"/g, '""')}"`;
            }
            return field || '';
        };

        csvContent += `${[
            escapeCsvField(normalizedUrl),
            escapeCsvField(occurrence.originalUrl),
            escapeCsvField(occurrence.language),
            escapeCsvField(languageList),
            occurrences.length
        ].join(',')  }\n`;
    });
});

// Save CSV file
const outputPath = path.join(__dirname, '..', 'duplicate_urls_report.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`\nCSV report saved to: ${outputPath}`);

// Also generate a detailed summary
let summaryContent = 'DUPLICATE URLs SUMMARY\n';
summaryContent += '======================\n\n';
summaryContent += `Total unique URLs analyzed: ${urlMap.size}\n`;
summaryContent += `URLs appearing in multiple languages: ${duplicateUrls.size}\n\n`;

if (duplicateUrls.size > 0) {
    summaryContent += 'URLs Found in Multiple Languages:\n';
    summaryContent += '-----------------------------\n';

    sortedDuplicates.forEach(([url, occurrences], index) => {
        const languages = [...new Set(occurrences.map(o => o.language))];
        summaryContent += `\n${index + 1}. ${url}\n`;
        summaryContent += `   Found in ${languages.length} languages: ${languages.join(', ')}\n`;

        // Show original URLs if they differ
        const uniqueOriginals = [...new Set(occurrences.map(o => o.originalUrl))];
        if (uniqueOriginals.length > 1) {
            summaryContent += `   URL variations:\n`;
            uniqueOriginals.forEach(orig => {
                summaryContent += `   - ${orig}\n`;
            });
        }
    });
} else {
    summaryContent += 'No duplicate URLs found across different languages.\n';
}

// Add statistics about URL distribution
summaryContent += '\n\nURL Distribution by Language:\n';
summaryContent += '-----------------------------\n';

const languageStats = {};
urlMap.forEach(occurrences => {
    occurrences.forEach(occ => {
        if (!languageStats[occ.language]) {
            languageStats[occ.language] = 0;
        }
        languageStats[occ.language]++;
    });
});

// Sort by count
const sortedStats = Object.entries(languageStats).sort((a, b) => b[1] - a[1]);
sortedStats.forEach(([lang, count]) => {
    summaryContent += `${lang}: ${count} URLs\n`;
});

const summaryPath = path.join(__dirname, '..', 'duplicate_urls_summary.txt');
fs.writeFileSync(summaryPath, summaryContent, 'utf8');

console.log(`Summary saved to: ${summaryPath}`);