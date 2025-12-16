const fs = require('fs');
const path = require('path');

// Function to extract URLs from various possible formats
function extractUrl(resource) {
    // Check different possible URL field names
    const urlFields = ['link', 'url', 'href', 'website', 'site', 'address', 'source'];

    for (const field of urlFields) {
        if (resource[field] && typeof resource[field] === 'string') {
            return resource[field].trim();
        }
    }

    // Check if the entire resource is just a string (URL)
    if (typeof resource === 'string') {
        return resource.trim();
    }

    return null;
}

// Function to normalize URLs for comparison
function normalizeUrl(url) {
    if (!url) return null;

    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    // Remove www. prefix for comparison
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

        // Try to find the resources object with different naming patterns
        // e.g., spanishResources, frenchResources, etc.
        const patterns = [
            new RegExp(`const\\s+${languageName}Resources\\s*=\\s*({[\\s\\S]*?});`, 'i'),
            new RegExp(`const\\s+${languageName.replace('-', '')}Resources\\s*=\\s*({[\\s\\S]*?});`, 'i'),
            new RegExp(`const\\s+\\w+Resources\\s*=\\s*({[\\s\\S]*?});`),
            new RegExp(`const\\s+languageData\\s*=\\s*({[\\s\\S]*?});`)
        ];

        let match = null;
        for (const pattern of patterns) {
            match = content.match(pattern);
            if (match) break;
        }

        if (!match) {
            console.log(`Warning: Could not find resources object in ${file}`);
            return;
        }

        // Parse the object (using eval in a safe context)
        let resourcesData;
        try {
            eval(`resourcesData = ${  match[1]}`);
        } catch (e) {
            console.log(`Error parsing ${file}: ${e.message}`);
            return;
        }

        // The resources might be nested under a 'resources' key
        const dataToProcess = resourcesData.resources || resourcesData;

        // Extract resources from different sections
        const sections = ['courses', 'apps', 'youtube', 'websites', 'podcasts',
                         'games', 'books', 'movies', 'tv', 'music', 'tools',
                         'communities', 'other'];

        let resourceCount = 0;

        // Process each section
        sections.forEach(section => {
            if (dataToProcess[section]) {
                // Handle both array format and object with categories
                let items = [];

                if (Array.isArray(dataToProcess[section])) {
                    items = dataToProcess[section];
                } else if (typeof dataToProcess[section] === 'object') {
                    // Handle nested categories (like courses with sub-categories)
                    dataToProcess[section].forEach(categoryObj => {
                        if (categoryObj.items && Array.isArray(categoryObj.items)) {
                            items = items.concat(categoryObj.items);
                        } else if (Array.isArray(categoryObj)) {
                            items = items.concat(categoryObj);
                        }
                    });
                }

                items.forEach(resource => {
                    const url = extractUrl(resource);
                    if (url) {
                        const normalizedUrl = normalizeUrl(url);
                        if (normalizedUrl) {
                            resourceCount++;

                            // Track URL occurrences
                            if (!urlMap.has(normalizedUrl)) {
                                urlMap.set(normalizedUrl, []);
                            }

                            urlMap.get(normalizedUrl).push({
                                language: languageName,
                                section,
                                originalUrl: url,
                                name: resource.name || resource.title || 'N/A'
                            });
                        }
                    }
                });
            }
        });

        console.log(`Processed ${languageName}: ${resourceCount} URLs found`);

    } catch (error) {
        console.log(`Error processing ${file}: ${error.message}`);
    }
});

// Find duplicates (URLs that appear in more than one place)
urlMap.forEach((occurrences, normalizedUrl) => {
    if (occurrences.length > 1) {
        duplicateUrls.set(normalizedUrl, occurrences);
    }
});

console.log(`\n\nTotal unique URLs: ${urlMap.size}`);
console.log(`Duplicate URLs found: ${duplicateUrls.size}`);

// Generate CSV content
let csvContent = 'Normalized URL,Original URL,Language,Section,Resource Name,Occurrence Count\n';

// Sort duplicates by occurrence count (most duplicated first)
const sortedDuplicates = Array.from(duplicateUrls.entries())
    .sort((a, b) => b[1].length - a[1].length);

sortedDuplicates.forEach(([normalizedUrl, occurrences]) => {
    occurrences.forEach(occurrence => {
        // Escape fields that might contain commas
        const escapeCsvField = (field) => {
            if (field && field.includes(',')) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field || '';
        };

        csvContent += `${[
            escapeCsvField(normalizedUrl),
            escapeCsvField(occurrence.originalUrl),
            escapeCsvField(occurrence.language),
            escapeCsvField(occurrence.section),
            escapeCsvField(occurrence.name),
            occurrences.length
        ].join(',')  }\n`;
    });
});

// Save CSV file
const outputPath = path.join(__dirname, '..', 'duplicate_urls_report.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`\nCSV report saved to: ${outputPath}`);

// Also generate a summary
let summaryContent = 'DUPLICATE URLs SUMMARY\n';
summaryContent += '======================\n\n';
summaryContent += `Total unique URLs analyzed: ${urlMap.size}\n`;
summaryContent += `Duplicate URLs found: ${duplicateUrls.size}\n\n`;

// Top 10 most duplicated URLs
summaryContent += 'Top 10 Most Duplicated URLs:\n';
summaryContent += '-----------------------------\n';
sortedDuplicates.slice(0, 10).forEach(([url, occurrences], index) => {
    summaryContent += `${index + 1}. ${url}\n`;
    summaryContent += `   Appears ${occurrences.length} times across: `;
    const languages = [...new Set(occurrences.map(o => o.language))];
    summaryContent += `${languages.join(', ')  }\n\n`;
});

const summaryPath = path.join(__dirname, '..', 'duplicate_urls_summary.txt');
fs.writeFileSync(summaryPath, summaryContent, 'utf8');

console.log(`Summary saved to: ${summaryPath}`);