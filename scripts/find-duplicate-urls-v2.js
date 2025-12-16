const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Function to extract URLs from various possible formats
function extractUrl(resource) {
    // Check different possible URL field names
    const urlFields = ['link', 'url', 'href', 'website', 'site', 'address', 'source'];

    for (const field of urlFields) {
        if (resource && resource[field] && typeof resource[field] === 'string') {
            return resource[field].trim();
        }
    }

    // Check if the entire resource is just a string (URL)
    if (typeof resource === 'string' && (resource.includes('http') || resource.includes('www'))) {
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

// Function to recursively extract all URLs from an object
function extractAllUrls(obj, section = 'unknown') {
    const urls = [];

    function recurse(item, currentSection) {
        if (!item) return;

        // If it's an array, process each item
        if (Array.isArray(item)) {
            item.forEach(subItem => recurse(subItem, currentSection));
            return;
        }

        // Try to extract URL from current item
        const url = extractUrl(item);
        if (url) {
            urls.push({
                url,
                section: currentSection,
                name: item.name || item.title || 'N/A'
            });
        }

        // If it's an object, recurse through its properties
        if (typeof item === 'object') {
            // Check for items array
            if (item.items && Array.isArray(item.items)) {
                item.items.forEach(subItem => recurse(subItem, currentSection));
            }

            // Check for resources property
            if (item.resources && typeof item.resources === 'object') {
                Object.keys(item.resources).forEach(key => {
                    recurse(item.resources[key], key);
                });
            }

            // Check for other common section names
            const sectionNames = ['courses', 'apps', 'youtube', 'websites', 'podcasts',
                                'games', 'books', 'movies', 'tv', 'music', 'tools',
                                'communities', 'other'];

            sectionNames.forEach(sectionName => {
                if (item[sectionName]) {
                    recurse(item[sectionName], sectionName);
                }
            });
        }
    }

    recurse(obj, section);
    return urls;
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
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove any IIFE wrappers
        content = content.replace(/^\s*\(function\s*\([^)]*\)\s*{[\s\S]*?'use strict';?/, '');
        content = content.replace(/}\)\([^)]*\);?\s*$/, '');

        // Create a sandbox to safely evaluate the JavaScript
        const sandbox = {
            console,
            global: {},
            window: {},
            module: { exports: {} },
            exports: {}
        };

        // Create a VM context
        const context = vm.createContext(sandbox);

        try {
            // Execute the script in the sandbox
            vm.runInContext(content, context, { filename: file });
        } catch (e) {
            console.log(`Warning: Error executing ${file}: ${e.message}`);
        }

        // Find the resources object from the sandbox
        let resourcesData = null;
        const possibleNames = [
            `${languageName}Resources`,
            `${languageName}Data`,
            `${languageName.replace('-', '')}Resources`,
            `${languageName.replace('-', '')}Data`,
            'languageData',
            'resourcesData'
        ];

        // Check for the data in various places
        for (const varName of possibleNames) {
            if (sandbox[varName]) {
                resourcesData = sandbox[varName];
                break;
            }
            // Also check camelCase and other variations
            const camelCaseName = varName.charAt(0).toLowerCase() + varName.slice(1);
            if (sandbox[camelCaseName]) {
                resourcesData = sandbox[camelCaseName];
                break;
            }
        }

        // If not found in expected places, search all properties
        if (!resourcesData) {
            Object.keys(sandbox).forEach(key => {
                if (typeof sandbox[key] === 'object' && sandbox[key] &&
                    (sandbox[key].resources || sandbox[key].courses || sandbox[key].apps)) {
                    resourcesData = sandbox[key];
                }
            });
        }

        if (!resourcesData) {
            console.log(`Warning: Could not find resources data in ${file}`);
            return;
        }

        // Extract all URLs from the data
        const urls = extractAllUrls(resourcesData);

        console.log(`Processed ${languageName}: ${urls.length} URLs found`);

        // Track URL occurrences
        urls.forEach(({ url, section, name }) => {
            const normalizedUrl = normalizeUrl(url);
            if (normalizedUrl) {
                if (!urlMap.has(normalizedUrl)) {
                    urlMap.set(normalizedUrl, []);
                }

                urlMap.get(normalizedUrl).push({
                    language: languageName,
                    section,
                    originalUrl: url,
                    name
                });
            }
        });

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
            if (field && field.toString().includes(',')) {
                return `"${field.toString().replace(/"/g, '""')}"`;
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

if (duplicateUrls.size > 0) {
    // Top 10 most duplicated URLs
    summaryContent += 'Top Most Duplicated URLs:\n';
    summaryContent += '-----------------------------\n';
    const topDuplicates = sortedDuplicates.slice(0, Math.min(20, sortedDuplicates.length));

    topDuplicates.forEach(([url, occurrences], index) => {
        summaryContent += `\n${index + 1}. ${url}\n`;
        summaryContent += `   Appears ${occurrences.length} times in:\n`;

        // Group by language
        const byLanguage = {};
        occurrences.forEach(o => {
            if (!byLanguage[o.language]) {
                byLanguage[o.language] = [];
            }
            byLanguage[o.language].push(o.section);
        });

        Object.keys(byLanguage).forEach(lang => {
            const sections = [...new Set(byLanguage[lang])];
            summaryContent += `   - ${lang}: ${sections.join(', ')}\n`;
        });
    });
} else {
    summaryContent += 'No duplicate URLs found across languages.\n';
}

const summaryPath = path.join(__dirname, '..', 'duplicate_urls_summary.txt');
fs.writeFileSync(summaryPath, summaryContent, 'utf8');

console.log(`Summary saved to: ${summaryPath}`);