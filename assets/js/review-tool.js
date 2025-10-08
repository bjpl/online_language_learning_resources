// ===================================
// Resource Review Tool - Fast & Efficient
// ===================================

(function() {
    'use strict';

    // State Management
    const reviewState = {
        allResources: [],
        currentIndex: 0,
        decisions: {},
        checks: {},
        stats: {
            keep: 0,
            delete: 0,
            edit: 0,
            review: 0,
            skipped: 0
        },
        previewMode: 'none', // 'none', 'iframe', 'newtab'
        autoAdvance: true,
        batchMode: false
    };

    // Initialize on load
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        loadAllResources();
        setupKeyboardShortcuts();
        displayCurrentResource();
        updateProgress();
        updateStats();

        // Pre-load next resources in background
        preloadNextResources();
    }

    // Load all resources from language data
    function loadAllResources() {
        console.warn('Loading all resources...');

        Object.keys(languageData).forEach(langKey => {
            const lang = languageData[langKey];
            if (!lang || !lang.resources) return;

            // Process all resource types
            ['courses', 'apps', 'books', 'audio', 'practice'].forEach(type => {
                const resources = lang.resources[type] || lang[type];
                if (!resources) return;

                if (Array.isArray(resources)) {
                    resources.forEach(categoryOrItem => {
                        // Handle both category structure and direct items
                        if (categoryOrItem.items && Array.isArray(categoryOrItem.items)) {
                            categoryOrItem.items.forEach(item => {
                                reviewState.allResources.push({
                                    ...item,
                                    _type: type,
                                    _category: categoryOrItem.category,
                                    _language: langKey,
                                    _languageName: lang.name,
                                    _languageFlag: lang.flag,
                                    _id: `${langKey}_${type}_${item.name}`
                                });
                            });
                        } else if (categoryOrItem.name) {
                            reviewState.allResources.push({
                                ...categoryOrItem,
                                _type: type,
                                _language: langKey,
                                _languageName: lang.name,
                                _languageFlag: lang.flag,
                                _id: `${langKey}_${type}_${categoryOrItem.name}`
                            });
                        }
                    });
                }
            });
        });

        console.warn(`Loaded ${reviewState.allResources.length} resources for review`);

        // Shuffle for variety (optional - can be removed)
        // reviewState.allResources.sort(() => Math.random() - 0.5);
    }

    // Display current resource
    function displayCurrentResource() {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (!resource) return;

        // Update display
        document.getElementById('language-flag').textContent = resource._languageFlag;
        document.getElementById('language-name').textContent = resource._languageName;
        document.getElementById('resource-name').textContent = resource.name || 'Unnamed Resource';
        document.getElementById('resource-url').textContent = resource.url || 'No URL';
        document.getElementById('resource-url').href = resource.url || '#';
        document.getElementById('resource-category').textContent = resource._category || resource._type;
        document.getElementById('resource-status').textContent = resource.free ? 'Free' : 'Paid';
        document.getElementById('resource-level').textContent = resource.level || 'All levels';

        // Update features
        const featuresList = document.getElementById('features-list');
        featuresList.innerHTML = '';
        if (resource.features && Array.isArray(resource.features)) {
            resource.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            featuresList.innerHTML = '<li>No features listed</li>';
        }

        // Update checks from saved state
        const checks = reviewState.checks[resource._id] || {};
        ['valid', 'relevant', 'free'].forEach(check => {
            const btn = document.getElementById(`check-${check}`);
            btn.classList.toggle('valid', checks[check] === true);
            btn.classList.toggle('invalid', checks[check] === false);
        });

        // Update notes
        const notes = reviewState.decisions[resource._id]?.notes || '';
        document.getElementById('notes-input').value = notes;

        // Don't auto-load iframe - let user click if they want
        document.getElementById('preview-frame').style.display = 'none';
        document.getElementById('no-preview').style.display = 'flex';

        // Pre-load next resource in background
        preloadNextResources();
    }

    // Pre-load next resources (for speed)
    function preloadNextResources() {
        // Pre-fetch next 3 resources
        for (let i = 1; i <= 3; i++) {
            const nextIndex = reviewState.currentIndex + i;
            if (nextIndex < reviewState.allResources.length) {
                const nextResource = reviewState.allResources[nextIndex];
                if (nextResource.url) {
                    // Create hidden link to pre-fetch DNS
                    const link = document.createElement('link');
                    link.rel = 'dns-prefetch';
                    link.href = new URL(nextResource.url).origin;
                    document.head.appendChild(link);
                }
            }
        }
    }

    // Toggle check buttons
    window.toggleCheck = function(type) {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (!resource) return;

        if (!reviewState.checks[resource._id]) {
            reviewState.checks[resource._id] = {};
        }

        const current = reviewState.checks[resource._id][type];
        if (current === true) {
            reviewState.checks[resource._id][type] = false;
        } else if (current === false) {
            reviewState.checks[resource._id][type] = undefined;
        } else {
            reviewState.checks[resource._id][type] = true;
        }

        displayCurrentResource();
    };

    // Make decision
    window.makeDecision = function(decision) {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (!resource) return;

        // Save decision
        reviewState.decisions[resource._id] = {
            decision,
            checks: reviewState.checks[resource._id] || {},
            notes: document.getElementById('notes-input').value,
            timestamp: new Date().toISOString(),
            resource: {
                name: resource.name,
                url: resource.url,
                language: resource._languageName,
                type: resource._type,
                free: resource.free
            }
        };

        // Update stats
        reviewState.stats[decision]++;
        updateStats();

        // Auto-advance to next
        if (reviewState.autoAdvance) {
            nextResource();
        }
    };

    // Navigation
    function nextResource() {
        if (reviewState.currentIndex < reviewState.allResources.length - 1) {
            reviewState.currentIndex++;
            displayCurrentResource();
            updateProgress();
        } else {
            alert('Review complete! Click "Export Results" to save your decisions.');
        }
    }

    window.previousResource = function() {
        if (reviewState.currentIndex > 0) {
            reviewState.currentIndex--;
            displayCurrentResource();
            updateProgress();
        }
    };

    window.skipResource = function() {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (resource) {
            reviewState.decisions[resource._id] = {
                decision: 'skipped',
                timestamp: new Date().toISOString()
            };
            reviewState.stats.skipped++;
            updateStats();
        }
        nextResource();
    };

    // Preview functions
    window.openInNewTab = function() {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (resource && resource.url) {
            window.open(resource.url, '_blank');
        }
    };

    window.refreshPreview = function() {
        const resource = reviewState.allResources[reviewState.currentIndex];
        if (resource && resource.url) {
            const iframe = document.getElementById('preview-frame');
            const noPreview = document.getElementById('no-preview');

            // Toggle preview
            if (iframe.style.display === 'none') {
                iframe.src = resource.url;
                iframe.style.display = 'block';
                noPreview.style.display = 'none';
            } else {
                iframe.src = resource.url;
            }
        }
    };

    // Update progress bar
    function updateProgress() {
        const reviewed = Object.keys(reviewState.decisions).length;
        const total = reviewState.allResources.length;
        const percentage = (reviewed / total) * 100;

        document.getElementById('progress-fill').style.width = `${percentage  }%`;
        document.getElementById('progress-text').textContent = `${reviewed} / ${total}`;
        document.getElementById('current-category').textContent =
            `${reviewState.allResources[reviewState.currentIndex]?._type || 'All'} Resources`;
    }

    // Update stats
    function updateStats() {
        Object.keys(reviewState.stats).forEach(stat => {
            document.getElementById(`stat-${stat}`).textContent = reviewState.stats[stat];
        });
    }

    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger when typing in textarea
            if (e.target.tagName === 'TEXTAREA') return;

            switch(e.key.toLowerCase()) {
                case 'k':
                    makeDecision('keep');
                    break;
                case 'd':
                    makeDecision('delete');
                    break;
                case 'e':
                    makeDecision('edit');
                    break;
                case 'r':
                    makeDecision('review');
                    break;
                case 's':
                    skipResource();
                    break;
                case 'arrowleft':
                    previousResource();
                    break;
                case 'arrowright':
                    nextResource();
                    break;
                case ' ':
                    e.preventDefault();
                    openInNewTab();
                    break;
                case '1':
                    toggleCheck('valid');
                    break;
                case '2':
                    toggleCheck('relevant');
                    break;
                case '3':
                    toggleCheck('free');
                    break;
            }
        });
    }

    // Export functions
    window.showExportModal = function() {
        const modal = document.getElementById('export-modal');
        modal.classList.add('active');

        // Update export stats
        const statsHtml = `
            <h3>Review Summary</h3>
            <p>Total Resources: ${reviewState.allResources.length}</p>
            <p>Reviewed: ${Object.keys(reviewState.decisions).length}</p>
            <p>Keep: ${reviewState.stats.keep}</p>
            <p>Delete: ${reviewState.stats.delete}</p>
            <p>Edit: ${reviewState.stats.edit}</p>
            <p>Review Later: ${reviewState.stats.review}</p>
            <p>Skipped: ${reviewState.stats.skipped}</p>
        `;
        document.getElementById('export-stats').innerHTML = statsHtml;
    };

    window.closeExportModal = function() {
        document.getElementById('export-modal').classList.remove('active');
    };

    window.exportData = function() {
        const format = document.getElementById('export-format').value;
        let data, filename, type;

        switch(format) {
            case 'json':
                data = JSON.stringify(reviewState.decisions, null, 2);
                filename = 'review-results.json';
                type = 'application/json';
                break;

            case 'csv':
                data = exportToCSV();
                filename = 'review-results.csv';
                type = 'text/csv';
                break;

            case 'markdown':
                data = exportToMarkdown();
                filename = 'review-results.md';
                type = 'text/markdown';
                break;
        }

        // Download file
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);

        closeExportModal();
    };

    function exportToCSV() {
        let csv = 'Resource Name,Language,Type,URL,Decision,Link Valid,Relevant,Free,Notes\n';

        Object.entries(reviewState.decisions).forEach(([id, data]) => {
            const resource = data.resource || {};
            const checks = data.checks || {};
            csv += `"${resource.name}","${resource.language}","${resource.type}","${resource.url}","${data.decision}","${checks.valid || ''}","${checks.relevant || ''}","${checks.free || ''}","${data.notes || ''}"\n`;
        });

        return csv;
    }

    function exportToMarkdown() {
        let md = '# Resource Review Results\n\n';
        md += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
        md += `**Total Resources:** ${reviewState.allResources.length}\n`;
        md += `**Reviewed:** ${Object.keys(reviewState.decisions).length}\n\n`;

        // Group by decision
        const byDecision = {};
        Object.entries(reviewState.decisions).forEach(([id, data]) => {
            if (!byDecision[data.decision]) {
                byDecision[data.decision] = [];
            }
            byDecision[data.decision].push(data);
        });

        // Output each decision group
        ['delete', 'edit', 'review', 'keep'].forEach(decision => {
            if (byDecision[decision] && byDecision[decision].length > 0) {
                md += `## ${decision.toUpperCase()} (${byDecision[decision].length})\n\n`;
                byDecision[decision].forEach(item => {
                    const r = item.resource || {};
                    md += `- **${r.name}** (${r.language}, ${r.type})\n`;
                    if (r.url) md += `  - URL: ${r.url}\n`;
                    if (item.notes) md += `  - Notes: ${item.notes}\n`;
                    md += '\n';
                });
            }
        });

        return md;
    }

    // Batch review mode (review multiple quickly)
    window.toggleBatchMode = function() {
        reviewState.batchMode = !reviewState.batchMode;
        if (reviewState.batchMode) {
            document.getElementById('preview-panel').style.display = 'none';
            document.querySelector('.review-container').style.justifyContent = 'center';
        } else {
            document.getElementById('preview-panel').style.display = 'flex';
            document.querySelector('.review-container').style.justifyContent = 'space-between';
        }
    };

})();