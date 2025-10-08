// ===================================
// Resource Review Tool v3 - Smart Preview Edition
// Intelligent iframe handling with automatic tab fallback
// ===================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        preloadCount: 5,
        autoAdvance: true,
        advanceDelay: 0,
        autoSaveInterval: 5000,
        storageKey: 'reviewToolProgressV3',
        iframeTimeout: 3000  // Time to wait before considering iframe blocked
    };

    // Don't pre-block ANY sites - let them all try to load
    const IFRAME_BLOCKERS = [];

    // State
    const state = {
        resources: [],
        currentIndex: 0,
        decisions: {},
        checks: {},
        stats: { keep: 0, delete: 0, edit: 0, skip: 0 },
        preloadStatus: {},
        iframeStatus: {}, // Track which URLs work in iframes
        sessionStartTime: Date.now(),
        lastSaveTime: null,
        isDirty: false,
        currentTabWindow: null
    };

    // Preload management
    const preloadFrames = [];
    let autoSaveInterval = null;
    let sessionTimer = null;

    // Initialize
    window.addEventListener('DOMContentLoaded', init);

    async function init() {
        console.warn('Initializing Smart Preview Review Tool v3...');

        // Setup preload frames
        for (let i = 1; i <= CONFIG.preloadCount; i++) {
            preloadFrames.push(document.getElementById(`preload-${i}`));
        }

        // Load all resources
        await loadAllResources();

        // Check for saved progress
        const hasProgress = checkForSavedProgress();
        if (hasProgress) {
            const shouldRestore = await showRestoreDialog();
            if (shouldRestore) {
                restoreProgress();
                showToast('Progress restored successfully!', 'info');
            }
        }

        // Setup UI
        setupKeyboardShortcuts();
        displayCurrentResource();
        updateQueue();
        updateProgress();

        // Start services
        startAutoSave();
        startSessionTimer();

        // Load current preview
        loadPreview(state.resources[state.currentIndex]);
    }

    // Load all resources from language data
    async function loadAllResources() {
        if (typeof languageData === 'undefined' || !window.languageData) {
            console.error('Language data not loaded!');
            alert('Error: Language data failed to load. Please refresh the page.');
            return;
        }

        console.warn('Starting to load resources from', Object.keys(languageData).length, 'languages');

        let resourceCount = 0;
        Object.keys(languageData).forEach(langKey => {
            const lang = languageData[langKey];
            if (!lang) {
                console.warn(`No data for language key: ${langKey}`);
                return;
            }

            let langResourceCount = 0;

            ['courses', 'apps', 'books', 'audio', 'practice'].forEach(type => {
                const resources = lang.resources?.[type] || lang[type];
                if (!resources || !Array.isArray(resources)) return;

                resources.forEach(item => {
                    if (item.items && Array.isArray(item.items)) {
                        item.items.forEach(resource => {
                            langResourceCount++;
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
                        langResourceCount++;
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

            if (langResourceCount > 0) {
                console.warn(`${lang.flag} ${lang.name}: ${langResourceCount} resources`);
                resourceCount += langResourceCount;
            }
        });

        console.warn(`Loaded ${state.resources.length} resources`);

        if (state.resources.length === 0) {
            console.error('No resources were loaded!');
            alert('Error: No resources found. Please check if language data files are loading correctly.');
        } else {
            document.getElementById('counter').textContent = `1 / ${state.resources.length}`;
        }
    }

    // No longer pre-checking if sites should open in tab
    // Let everything try iframe first

    // Load preview for current resource
    function loadPreview(resource) {
        if (!resource || !resource.url) {
            showNoPreview();
            return;
        }

        // ALWAYS try iframe - no pre-blocking
        console.warn(`Loading preview for ${resource.url}`);
        attemptIframeLoad(resource.url);
    }

    // Attempt to load URL in iframe - simplified version
    function attemptIframeLoad(url) {
        const frame = document.getElementById('preview-frame');
        const blockedDiv = document.getElementById('preview-blocked');

        // Show iframe, hide blocked message
        frame.style.display = 'block';
        blockedDiv.classList.remove('active');

        updatePreviewStatus('loading', 'Loading preview...');

        // Just load it - don't try to detect if it's blocked
        frame.src = url;

        // Simple onload handler
        frame.onload = () => {
            updatePreviewStatus('iframe', 'Preview loaded (may be blank if blocked)');
        };

        // After a delay, update status but don't block
        setTimeout(() => {
            // Just note it might be blocked but leave iframe visible
            updatePreviewStatus('iframe', 'Preview area - use "Open in Tab" if blank');
        }, 3000);
    }

    // Handle blocked iframe
    function handleIframeBlocked(url) {
        console.warn(`Iframe blocked for ${url}`);

        // Mark this domain as blocked for this session
        try {
            const hostname = new URL(url).hostname.replace('www.', '');
            state.iframeStatus[hostname] = 'blocked';
        } catch (e) {}

        showBlockedPreview(url);

        // Don't auto-open - let user click the button
        // This avoids unexpected tab openings
        updatePreviewStatus('blocked', 'Iframe blocked - click to open in tab');

        // Only show toast for first time
        if (!state.toastShown) {
            showToast('Some sites block embedding - click "Open in Tab" button to view', 'info');
            state.toastShown = true;
        }
    }

    // Mark URL as working in iframe
    function markUrlAsWorking(url) {
        try {
            const hostname = new URL(url).hostname.replace('www.', '');
            state.iframeStatus[hostname] = 'working';
        } catch (e) {}
    }

    // Show blocked preview UI
    function showBlockedPreview(url) {
        const frame = document.getElementById('preview-frame');
        const blockedDiv = document.getElementById('preview-blocked');

        frame.style.display = 'none';
        blockedDiv.classList.add('active');
        document.getElementById('blocked-url').textContent = url;
    }

    // Show no preview
    function showNoPreview() {
        const frame = document.getElementById('preview-frame');
        const blockedDiv = document.getElementById('preview-blocked');

        frame.style.display = 'none';
        blockedDiv.classList.remove('active');
        updatePreviewStatus('none', 'No URL available');
    }

    // Update preview status indicator
    function updatePreviewStatus(status, text) {
        const indicator = document.getElementById('preview-indicator');
        const statusText = document.getElementById('preview-status-text');

        indicator.className = `preview-indicator ${  status}`;
        statusText.textContent = text;
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

        // Load preview
        loadPreview(resource);

        // Update queue
        updateQueueHighlight();
    }

    // Update queue display
    function updateQueue() {
        const queueList = document.getElementById('queue-list');
        queueList.innerHTML = '';

        const start = Math.max(0, state.currentIndex - 2);
        const end = Math.min(state.resources.length, state.currentIndex + 15);

        for (let i = start; i < end; i++) {
            const resource = state.resources[i];
            const item = document.createElement('div');
            item.className = 'queue-item';
            if (i === state.currentIndex) item.classList.add('current');
            if (state.decisions[resource._id]) item.classList.add('decided');

            item.innerHTML = `
                <div style="flex: 1;">
                    <div style="font-size: 14px; margin-bottom: 4px;">${resource.name || 'Unnamed'}</div>
                    <div style="font-size: 11px; color: #888;">${resource._langFlag} ${resource._langName} • ${resource._type}</div>
                </div>
            `;

            item.onclick = () => jumpToResource(i);
            queueList.appendChild(item);
        }

        document.getElementById('queue-count').textContent =
            `${state.resources.length - Object.keys(state.decisions).length} remaining`;
    }

    // Update queue highlighting
    function updateQueueHighlight() {
        document.querySelectorAll('.queue-item').forEach((item, i) => {
            const actualIndex = Math.max(0, state.currentIndex - 2) + i;
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
        }
    }

    function previousResource() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            displayCurrentResource();
            updateQueue();
            updateProgress();
        }
    }

    function jumpToResource(index) {
        if (index >= 0 && index < state.resources.length) {
            state.currentIndex = index;
            displayCurrentResource();
            updateQueue();
            updateProgress();
        }
    }

    // Decision making
    window.decide = function(decision) {
        const resource = state.resources[state.currentIndex];
        if (!resource) return;

        state.decisions[resource._id] = {
            decision,
            checks: state.checks[resource._id] || {},
            timestamp: Date.now()
        };

        state.stats[decision]++;
        state.isDirty = true;

        updateQueue();
        updateProgress();

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

        state.isDirty = true;
        displayCurrentResource();
    };

    // Update progress
    function updateProgress() {
        const reviewed = Object.keys(state.decisions).length;
        const total = state.resources.length;
        const percent = (reviewed / total) * 100;

        document.getElementById('progress-bar').style.width = `${percent  }%`;
    }

    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                manualSave();
                return;
            }

            switch(e.key.toLowerCase()) {
                case 'k': decide('keep'); break;
                case 'd': decide('delete'); break;
                case 'e': decide('edit'); break;
                case 's':
                    if (!e.ctrlKey && !e.metaKey) {
                        decide('skip');
                    }
                    break;
                case 'arrowleft': previousResource(); break;
                case 'arrowright': nextResource(); break;
                case ' ':
                    e.preventDefault();
                    openInNewTab();
                    break;
                case '1': toggleCheck('valid'); break;
                case '2': toggleCheck('relevant'); break;
                case '3': toggleCheck('free'); break;
            }
        });
    }

    // Open in new tab
    window.openInNewTab = function() {
        const resource = state.resources[state.currentIndex];
        if (resource?.url) {
            if (state.currentTabWindow && !state.currentTabWindow.closed) {
                state.currentTabWindow.location.href = resource.url;
                state.currentTabWindow.focus();
            } else {
                state.currentTabWindow = window.open(resource.url, 'preview_window');
            }

            // Update status to show it's in a tab
            updatePreviewStatus('tab', 'Opened in new tab');
        }
    };

    // Force reload in iframe (for testing)
    window.forceIframeLoad = function() {
        const resource = state.resources[state.currentIndex];
        if (resource?.url) {
            console.warn('Forcing iframe load for:', resource.url);
            attemptIframeLoad(resource.url);
        }
    };

    // ===================================
    // Save/Load Functions
    // ===================================

    function checkForSavedProgress() {
        return localStorage.getItem(CONFIG.storageKey) !== null;
    }

    async function showRestoreDialog() {
        const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey));
        const reviewedCount = Object.keys(saved.decisions || {}).length;
        const totalCount = saved.totalResources || 0;
        const lastSave = new Date(saved.lastSaveTime).toLocaleString();

        const message = `Found saved progress from ${lastSave}\n\n` +
                       `Progress: ${reviewedCount} / ${totalCount} resources reviewed\n\n` +
                       `Continue from where you left off?`;

        return confirm(message);
    }

    function saveProgress() {
        const saveData = {
            currentIndex: state.currentIndex,
            decisions: state.decisions,
            checks: state.checks,
            stats: state.stats,
            iframeStatus: state.iframeStatus,
            totalResources: state.resources.length,
            sessionStartTime: state.sessionStartTime,
            lastSaveTime: Date.now(),
            version: '3.0'
        };

        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(saveData));
            state.lastSaveTime = Date.now();
            state.isDirty = false;
            updateSaveIndicator('saved');
            return true;
        } catch (e) {
            console.error('Failed to save progress:', e);
            showToast('Failed to save progress!', 'error');
            return false;
        }
    }

    function restoreProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey));

            state.currentIndex = saved.currentIndex || 0;
            state.decisions = saved.decisions || {};
            state.checks = saved.checks || {};
            state.stats = saved.stats || { keep: 0, delete: 0, edit: 0, skip: 0 };
            state.iframeStatus = saved.iframeStatus || {};
            state.sessionStartTime = saved.sessionStartTime || Date.now();

        } catch (e) {
            console.error('Failed to restore progress:', e);
        }
    }

    function startAutoSave() {
        autoSaveInterval = setInterval(() => {
            if (state.isDirty) {
                saveProgress();
            }
        }, CONFIG.autoSaveInterval);
    }

    window.manualSave = function() {
        if (saveProgress()) {
            showToast('Progress saved!', 'info');
        }
    };

    // Export session data
    window.exportSession = function() {
        const exportData = {
            currentIndex: state.currentIndex,
            decisions: state.decisions,
            checks: state.checks,
            stats: state.stats,
            iframeStatus: state.iframeStatus,
            totalResources: state.resources.length,
            sessionStartTime: state.sessionStartTime,
            exportTime: new Date().toISOString(),
            version: '3.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `review-session-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Session exported successfully!', 'info');
    };

    // Import session data
    window.importSession = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);

                    // Restore imported data
                    state.currentIndex = data.currentIndex || 0;
                    state.decisions = data.decisions || {};
                    state.checks = data.checks || {};
                    state.stats = data.stats || { keep: 0, delete: 0, edit: 0, skip: 0 };
                    state.iframeStatus = data.iframeStatus || {};

                    // Save to localStorage
                    saveProgress();

                    // Update UI
                    displayCurrentResource();
                    updateQueue();
                    updateProgress();

                    showToast('Session imported successfully!', 'info');
                } catch (error) {
                    console.error('Import failed:', error);
                    showToast('Failed to import session!', 'error');
                }
            };

            reader.readAsText(file);
        };

        input.click();
    };

    function updateSaveIndicator(status) {
        const indicator = document.getElementById('save-indicator');
        if (!indicator) return;

        indicator.className = `save-indicator ${  status}`;
        indicator.textContent = status === 'saved' ? 'Saved' : 'Auto-save on';
    }

    // Session timer
    function startSessionTimer() {
        sessionTimer = setInterval(() => {
            const elapsed = Date.now() - state.sessionStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            document.getElementById('session-time').textContent =
                `${minutes}:${seconds.toString().padStart(2, '0')}`;

            const rate = state.currentIndex > 0 ?
                Math.round((state.currentIndex / (elapsed / 60000))) : 0;
            document.getElementById('review-rate').textContent = `${rate}/min`;
        }, 1000);
    }

    // Toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Expose global functions
    window.nextResource = nextResource;
    window.previousResource = previousResource;

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (state.isDirty) {
            saveProgress();
        }
        if (state.currentTabWindow && !state.currentTabWindow.closed) {
            state.currentTabWindow.close();
        }
    });

})();