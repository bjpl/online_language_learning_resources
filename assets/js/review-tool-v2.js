// ===================================
// Resource Review Tool v2 - Ultra Fast Edition
// No waiting, smart preloading, batch operations
// ===================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        preloadCount: 5,      // Number of resources to preload
        autoAdvance: true,     // Auto advance after decision
        advanceDelay: 0,       // Delay before auto-advance (ms)
        batchSize: 10,         // Items per batch
        maxQueueDisplay: 20   // Max items to show in queue
    };

    // State
    const state = {
        resources: [],
        currentIndex: 0,
        decisions: {},
        checks: {},
        stats: { keep: 0, delete: 0, edit: 0, skip: 0 },
        preloadStatus: {},
        previewMode: 'iframe',
        batchMode: false,
        selectedBatch: new Set()
    };

    // Preload management
    const preloadFrames = [];
    const preloadQueue = [];

    // Initialize
    window.addEventListener('DOMContentLoaded', init);

    async function init() {
        console.log('Initializing Ultra Fast Review Tool...');

        // Setup preload frames
        for (let i = 1; i <= CONFIG.preloadCount; i++) {
            preloadFrames.push(document.getElementById(`preload-${i}`));
        }

        // Load all resources
        await loadAllResources();

        // Setup UI
        setupKeyboardShortcuts();
        displayCurrentResource();
        updateQueue();
        updateProgress();

        // Start preloading
        startPreloadQueue();

        // Load current in main preview
        loadPreview(state.resources[state.currentIndex]);
    }

    // Load all resources from language data
    async function loadAllResources() {
        // Need to load language data files first
        if (typeof languageData === 'undefined') {
            console.error('Language data not loaded!');
            return;
        }

        Object.keys(languageData).forEach(langKey => {
            const lang = languageData[langKey];
            if (!lang) return;

            // Process all resource types
            ['courses', 'apps', 'books', 'audio', 'practice'].forEach(type => {
                const resources = lang.resources?.[type] || lang[type];
                if (!resources || !Array.isArray(resources)) return;

                resources.forEach(item => {
                    if (item.items && Array.isArray(item.items)) {
                        // Category with items
                        item.items.forEach(resource => {
                            state.resources.push({
                                ...resource,
                                _id: `${langKey}_${type}_${resource.name}`,
                                _type: type,
                                _category: item.category,
                                _language: langKey,
                                _langName: lang.name,
                                _langFlag: lang.flag
                            });
                        });
                    } else if (item.name) {
                        // Direct item
                        state.resources.push({
                            ...item,
                            _id: `${langKey}_${type}_${item.name}`,
                            _type: type,
                            _language: langKey,
                            _langName: lang.name,
                            _langFlag: lang.flag
                        });
                    }
                });
            });
        });

        console.log(`Loaded ${state.resources.length} resources`);

        // Optionally shuffle for variety
        // state.resources.sort(() => Math.random() - 0.5);
    }

    // Display current resource
    function displayCurrentResource() {
        const resource = state.resources[state.currentIndex];
        if (!resource) return;

        // Update header
        document.getElementById('lang-flag').textContent = resource._langFlag || '🌐';
        document.getElementById('lang-name').textContent = resource._langName || 'Unknown';
        document.getElementById('resource-name').textContent = resource.name || 'Unnamed';
        document.getElementById('resource-url').textContent = resource.url || 'No URL';

        // Update info
        document.getElementById('info-type').textContent = resource._type || '-';
        document.getElementById('info-status').textContent = resource.free ? 'Free' : 'Paid';
        document.getElementById('info-level').textContent = resource.level || 'All levels';
        document.getElementById('info-category').textContent = resource._category || '-';

        // Update features
        const featuresDiv = document.getElementById('features-list');
        featuresDiv.innerHTML = '';
        if (resource.features && Array.isArray(resource.features)) {
            resource.features.forEach(feature => {
                const tag = document.createElement('span');
                tag.className = 'feature-tag';
                tag.textContent = feature;
                featuresDiv.appendChild(tag);
            });
        }

        // Update checks
        const checks = state.checks[resource._id] || {};
        ['valid', 'relevant', 'free'].forEach(type => {
            const box = document.getElementById(`check-${type}`);
            box.classList.remove('yes', 'no');
            if (checks[type] === true) box.classList.add('yes');
            if (checks[type] === false) box.classList.add('no');
        });

        // Update counter
        document.getElementById('counter').textContent =
            `${state.currentIndex + 1} / ${state.resources.length}`;

        // Update queue highlighting
        updateQueueHighlight();
    }

    // Smart preloading system
    function startPreloadQueue() {
        // Clear existing queue
        preloadQueue.length = 0;

        // Queue next N resources for preloading
        for (let i = 1; i <= CONFIG.preloadCount; i++) {
            const idx = state.currentIndex + i;
            if (idx < state.resources.length) {
                const resource = state.resources[idx];
                if (resource.url) {
                    preloadQueue.push({ index: idx, resource });
                }
            }
        }

        // Start preloading
        preloadQueue.forEach((item, i) => {
            if (preloadFrames[i]) {
                preloadResource(item.resource, preloadFrames[i], item.index);
            }
        });
    }

    // Preload a resource in a hidden iframe
    function preloadResource(resource, frame, index) {
        if (!resource.url) return;

        state.preloadStatus[index] = 'loading';

        // Update queue display
        updateQueueItemStatus(index, 'loading');

        // Set iframe src
        frame.src = resource.url;

        // Mark as loaded after a timeout (can't reliably detect iframe load)
        setTimeout(() => {
            state.preloadStatus[index] = 'loaded';
            updateQueueItemStatus(index, 'loaded');
        }, 3000);
    }

    // Load preview for current resource
    function loadPreview(resource) {
        const frame = document.getElementById('preview-frame');
        if (resource && resource.url) {
            // Check if already preloaded
            const preloadIndex = preloadQueue.findIndex(item => item.index === state.currentIndex);
            if (preloadIndex >= 0 && preloadFrames[preloadIndex]) {
                // Swap preloaded content to main frame
                frame.src = preloadFrames[preloadIndex].src;
            } else {
                // Load fresh
                frame.src = resource.url;
            }
        }
    }

    // Update queue display
    function updateQueue() {
        const queueList = document.getElementById('queue-list');
        queueList.innerHTML = '';

        const start = Math.max(0, state.currentIndex - 5);
        const end = Math.min(state.resources.length, state.currentIndex + CONFIG.maxQueueDisplay);

        for (let i = start; i < end; i++) {
            const resource = state.resources[i];
            const item = document.createElement('div');
            item.className = 'queue-item';
            if (i === state.currentIndex) item.classList.add('current');
            if (state.decisions[resource._id]) item.classList.add('decided');

            item.innerHTML = `
                <div class="queue-number">${i + 1}</div>
                <div class="queue-info">
                    <div class="queue-name">${resource.name || 'Unnamed'}</div>
                    <div class="queue-lang">${resource._langName} • ${resource._type}</div>
                </div>
                <div class="queue-status" id="queue-status-${i}">
                    ${state.preloadStatus[i] === 'loaded' ? 'ready' :
                      state.preloadStatus[i] === 'loading' ? 'loading...' : ''}
                </div>
            `;

            item.onclick = () => jumpToResource(i);
            queueList.appendChild(item);
        }

        document.getElementById('queue-count').textContent =
            `${state.resources.length - Object.keys(state.decisions).length} remaining`;
    }

    // Update queue item status
    function updateQueueItemStatus(index, status) {
        const statusEl = document.getElementById(`queue-status-${index}`);
        if (statusEl) {
            statusEl.textContent = status === 'loaded' ? 'ready' : 'loading...';
            statusEl.className = `queue-status ${status}`;
        }
    }

    // Update queue highlighting
    function updateQueueHighlight() {
        document.querySelectorAll('.queue-item').forEach((item, i) => {
            const actualIndex = Math.max(0, state.currentIndex - 5) + i;
            item.classList.toggle('current', actualIndex === state.currentIndex);
        });
    }

    // Navigation
    function nextResource() {
        if (state.currentIndex < state.resources.length - 1) {
            state.currentIndex++;
            displayCurrentResource();
            updateQueue();
            updateProgress();
            loadPreview(state.resources[state.currentIndex]);
            startPreloadQueue(); // Refresh preload queue
        }
    }

    function previousResource() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            displayCurrentResource();
            updateQueue();
            updateProgress();
            loadPreview(state.resources[state.currentIndex]);
        }
    }

    function jumpToResource(index) {
        if (index >= 0 && index < state.resources.length) {
            state.currentIndex = index;
            displayCurrentResource();
            updateQueue();
            updateProgress();
            loadPreview(state.resources[state.currentIndex]);
            startPreloadQueue();
        }
    }

    // Decision making
    window.decide = function(decision) {
        const resource = state.resources[state.currentIndex];
        if (!resource) return;

        // Save decision
        state.decisions[resource._id] = {
            decision,
            checks: state.checks[resource._id] || {},
            timestamp: Date.now()
        };

        // Update stats
        state.stats[decision]++;
        updateStats();

        // Mark queue item
        updateQueue();

        // Auto advance
        if (CONFIG.autoAdvance) {
            setTimeout(() => nextResource(), CONFIG.advanceDelay);
        }
    };

    // Toggle checks
    window.toggleCheck = function(type) {
        const resource = state.resources[state.currentIndex];
        if (!resource) return;

        if (!state.checks[resource._id]) {
            state.checks[resource._id] = {};
        }

        const current = state.checks[resource._id][type];
        if (current === true) {
            state.checks[resource._id][type] = false;
        } else if (current === false) {
            delete state.checks[resource._id][type];
        } else {
            state.checks[resource._id][type] = true;
        }

        displayCurrentResource();
    };

    // Update progress
    function updateProgress() {
        const reviewed = Object.keys(state.decisions).length;
        const total = state.resources.length;
        const percent = (reviewed / total) * 100;

        document.getElementById('progress-bar').style.width = percent + '%';
    }

    // Update stats
    function updateStats() {
        Object.keys(state.stats).forEach(key => {
            const el = document.getElementById(`stat-${key}`);
            if (el) el.textContent = state.stats[key];
        });
    }

    // Preview mode switching
    window.switchPreviewMode = function(mode) {
        state.previewMode = mode;
        document.querySelectorAll('.preview-tab').forEach(tab => {
            tab.classList.toggle('active', tab.textContent.toLowerCase().includes(mode));
        });

        // Handle different modes
        if (mode === 'batch') {
            showBatchMode();
        } else {
            hideBatchMode();
        }
    };

    // Batch mode
    function showBatchMode() {
        const batchDiv = document.getElementById('batch-mode');
        const grid = document.getElementById('batch-grid');

        grid.innerHTML = '';

        // Show next N resources
        for (let i = 0; i < CONFIG.batchSize && state.currentIndex + i < state.resources.length; i++) {
            const resource = state.resources[state.currentIndex + i];
            const item = document.createElement('div');
            item.className = 'batch-item';
            item.innerHTML = `
                <strong>${resource.name}</strong><br>
                <small>${resource._langName} • ${resource._type}</small><br>
                <small>${resource.free ? 'Free' : 'Paid'}</small>
            `;
            item.onclick = () => toggleBatchSelection(state.currentIndex + i);
            grid.appendChild(item);
        }

        batchDiv.style.display = 'block';
    }

    function hideBatchMode() {
        document.getElementById('batch-mode').style.display = 'none';
    }

    function toggleBatchSelection(index) {
        if (state.selectedBatch.has(index)) {
            state.selectedBatch.delete(index);
        } else {
            state.selectedBatch.add(index);
        }
        // Update UI
        document.querySelectorAll('.batch-item')[index - state.currentIndex]
            ?.classList.toggle('selected');
    }

    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if typing
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch(e.key.toLowerCase()) {
                case 'k': decide('keep'); break;
                case 'd': decide('delete'); break;
                case 'e': decide('edit'); break;
                case 's': decide('skip'); break;
                case 'arrowleft': previousResource(); break;
                case 'arrowright': nextResource(); break;
                case ' ':
                    e.preventDefault();
                    openInNewTab();
                    break;
                case '1': toggleCheck('valid'); break;
                case '2': toggleCheck('relevant'); break;
                case '3': toggleCheck('free'); break;
                case 'b': toggleBatchMode(); break;
            }
        });
    }

    // Utilities
    window.openInNewTab = function() {
        const resource = state.resources[state.currentIndex];
        if (resource?.url) {
            window.open(resource.url, '_blank');
        }
    };

    window.toggleBatchMode = function() {
        state.batchMode = !state.batchMode;
        switchPreviewMode(state.batchMode ? 'batch' : 'iframe');
    };

    window.exportResults = function() {
        const data = {
            timestamp: new Date().toISOString(),
            total: state.resources.length,
            reviewed: Object.keys(state.decisions).length,
            decisions: state.decisions,
            stats: state.stats
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `review-results-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Expose some functions globally
    window.nextResource = nextResource;
    window.previousResource = previousResource;

})();