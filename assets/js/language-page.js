// ===================================
// Language Page JavaScript
// ===================================

(function() {
    'use strict';

    // Get language from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') || 'dutch';

    // Store language data reference
    let language = null;
    let isDataLoaded = false;

    // Listen for language data loaded event (from lazy loading)
    window.addEventListener('languageDataLoaded', (event) => {
        console.warn('[LanguagePage] Language data loaded event received:', event.detail);

        if (event.detail.lang === langParam) {
            language = event.detail.data;
            isDataLoaded = true;
            init();
        }
    });

    // Listen for language data error event
    window.addEventListener('languageDataError', (event) => {
        console.error('[LanguagePage] Language data error event received:', event.detail);

        if (event.detail.lang === langParam) {
            showErrorState();
        }
    });

    // Fallback: Check if data is already available (backwards compatibility)
    if (typeof window.languageData === 'object' && window.languageData[langParam]) {
        console.warn('[LanguagePage] Using pre-loaded language data');
        language = window.languageData[langParam];
        isDataLoaded = true;
    }

    // Initialize page
    function init() {
        if (!language) {
            console.error('[LanguagePage] Cannot initialize - language data not available');
            showErrorState();
            return;
        }

        console.warn('[LanguagePage] Initializing with language:', langParam);
        updateHeroSection();
        renderResources();
        bindEvents();
    }

    // Update hero section with language info
    function updateHeroSection() {
        document.getElementById('breadcrumb-language').textContent = language.name;
        document.getElementById('language-flag').textContent = language.flag;
        document.getElementById('language-title').textContent = `${language.name} Learning Resources`;
        document.getElementById('language-native').textContent = language.nativeName;

        // Update page title
        document.title = `${language.name} Resources - Language Learning Hub`;
    }

    // Render resources based on language
    function renderResources(filter = 'all') {
        const container = document.getElementById('resources-container');
        container.innerHTML = '';

        // Special handling for languages with comprehensive resource structure
        const comprehensiveLanguages = ['dutch', 'danish', 'dari', 'portuguese', 'italian', 'indonesian', 'inuktitut', 'korean', 'lao', 'hindi', 'hmong', 'swahili', 'japanese', 'swedish', 'finnish', 'flemish', 'polish', 'punjabi', 'quechua', 'vietnamese', 'welsh', 'wolof', 'tamil', 'telugu', 'bengali', 'kazakh', 'kannada', 'greek', 'guarani', 'latvian', 'marathi', 'persian', 'mongolian', 'navajo', 'nahuatl', 'nepali', 'pashto', 'ukrainian', 'urdu', 'signLanguage', 'irish', 'yoruba', 'slovak', 'afrikaans', 'arabic', 'bulgarian', 'burmese', 'cebuano', 'chinese', 'cree', 'croatian', 'estonian', 'french', 'german', 'hausa', 'hungarian', 'gujarati', 'malay', 'romanian', 'russian', 'serbian', 'spanish', 'tagalog', 'thai', 'lithuanian'];

        if (comprehensiveLanguages.includes(langParam)) {
            renderComprehensiveResources(filter);
            // Re-initialize collapsible functionality after rendering
            // Use setTimeout to ensure DOM has updated
            setTimeout(() => {
                if (typeof window.reinitCollapsible === 'function') {
                    window.reinitCollapsible();
                }
            }, 0);
            return;
        }

        // Standard resource rendering for other languages
        Object.entries(language.resources).forEach(([category, items]) => {
            if (filter === 'all' || filter === category) {
                const section = createResourceSection(category, items);
                container.appendChild(section);
            }
        });

        // Re-initialize collapsible functionality after rendering
        setTimeout(() => {
            if (typeof window.reinitCollapsible === 'function') {
                window.reinitCollapsible();
            }
        }, 0);
    }

    // Special rendering for comprehensive resource structures (Dutch, Danish, Portuguese)
    function renderComprehensiveResources(filter) {
        const container = document.getElementById('resources-container');

        if (filter === 'all' || filter === 'courses') {
            language.resources.courses?.forEach(category => {
                const section = createComprehensiveSection(category.category, category.items, 'courses');
                container.appendChild(section);
            });
        }

        if (filter === 'all' || filter === 'books') {
            language.resources.books?.forEach(category => {
                const section = createComprehensiveSection(category.category, category.items, 'books');
                container.appendChild(section);
            });
        }

        if (filter === 'all' || filter === 'audio') {
            language.resources.audio?.forEach(category => {
                const section = createComprehensiveSection(category.category, category.items, 'audio');
                container.appendChild(section);
            });
        }

        if (filter === 'all' || filter === 'apps') {
            if ((language.resources?.apps || language.apps) && Array.isArray(language.resources?.apps || language.apps)) {
                // Check if apps have nested structure (with category and items)
                if ((language.resources?.apps || language.apps).length > 0 && (language.resources?.apps || language.apps)[0].category && (language.resources?.apps || language.apps)[0].items) {
                    // Comprehensive structure with categories
                    (language.resources?.apps || language.apps).forEach(category => {
                        if (category && category.items && Array.isArray(category.items)) {
                            const section = createComprehensiveSection(category.category, category.items, 'apps');
                            container.appendChild(section);
                        }
                    });
                } else {
                    // Flat structure (old format)
                    const section = createResourceSection('apps', language.resources?.apps || language.apps);
                    container.appendChild(section);
                }
            }
        }

        if (filter === 'all' || filter === 'practice') {
            language.resources.practice?.forEach(category => {
                if (category && category.items && Array.isArray(category.items)) {
                    const section = createComprehensiveSection(category.category, category.items, 'practice');
                    container.appendChild(section);
                }
            });
        }
    }

    // Create comprehensive resource section
    function createComprehensiveSection(title, items, type) {
        // Filter out undefined or invalid items
        const validItems = items.filter(item => item && item.name);

        const section = document.createElement('div');
        section.className = 'resource-section';
        section.dataset.category = type;

        const icon = getIconForCategory(type);

        section.innerHTML = `
            <div class="resource-section-header">
                <span class="resource-section-icon">${icon}</span>
                <h2 class="resource-section-title">${title}</h2>
                <span class="resource-section-count">${validItems.length} resources</span>
            </div>
            <div class="resource-items">
                ${validItems.map(item => createComprehensiveResourceItem(item)).join('')}
            </div>
        `;

        return section;
    }

    // Create comprehensive resource item
    function createComprehensiveResourceItem(item) {
        const badges = [];
        if (item.free) badges.push('<span class="resource-badge free">Free</span>');
        if (item.level) badges.push(`<span class="resource-badge level">${item.level}</span>`);

        return `
            <div class="resource-item">
                <div class="resource-info">
                    <div class="resource-name">
                        ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${item.name}</a>` : item.name}
                    </div>
                    ${item.description ? `<div class="resource-description">${item.description}</div>` : ''}
                    ${item.features ? `
                        <div class="features-list">
                            ${item.features.join(' | ')}
                        </div>
                    ` : ''}
                    <div class="resource-meta">
                        ${badges.join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Create standard resource section
    function createResourceSection(category, items) {
        const section = document.createElement('div');
        section.className = 'resource-section';
        section.dataset.category = category;

        const icon = getIconForCategory(category);
        const title = getCategoryTitle(category);

        section.innerHTML = `
            <div class="resource-section-header">
                <span class="resource-section-icon">${icon}</span>
                <h2 class="resource-section-title">${title}</h2>
                <span class="resource-section-count">${items.length} resources</span>
            </div>
            <div class="resource-items">
                ${items.map(item => createResourceItem(item, category)).join('')}
            </div>
        `;

        return section;
    }

    // Create standard resource item
    function createResourceItem(item, category) {
        const badges = [];
        if (item.free) badges.push('<span class="resource-badge free">Free</span>');
        if (item.level) badges.push(`<span class="resource-badge level">${item.level}</span>`);

        // Handle different item structures
        const author = item.author ? ` by ${item.author}` : '';

        return `
            <div class="resource-item">
                <div class="resource-info">
                    <div class="resource-name">
                        ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${item.name}</a>` : item.name}
                        ${author}
                    </div>
                    ${item.description ? `<div class="resource-description">${item.description}</div>` : ''}
                    ${item.features ? `
                        <div class="features-list">
                            ${item.features.join(' | ')}
                        </div>
                    ` : ''}
                    <div class="resource-meta">
                        ${badges.join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Get icon for category
    function getIconForCategory(category) {
        const icons = {
            apps: '📱',
            books: '📚',
            podcasts: '🎧',
            audio: '🎧',
            videos: '🎬',
            communities: '👥',
            practice: '💬',
            courses: '🎓',
            tools: '🛠️'
        };
        return icons[category] || '📌';
    }

    // Get title for category
    function getCategoryTitle(category) {
        const titles = {
            apps: 'Mobile Apps & Software',
            books: 'Books & Textbooks',
            podcasts: 'Podcasts',
            audio: 'Audio & Video Resources',
            videos: 'Videos & Courses',
            communities: 'Communities & Forums',
            practice: 'Practice & Exchange',
            courses: 'Online Courses',
            tools: 'Study Tools'
        };
        return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Bind event handlers
    function bindEvents() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', handleFilterClick);
        });

        // Mobile navigation
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    // Handle filter click
    function handleFilterClick(e) {
        const {filter} = e.target.dataset;

        // Update active state
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add('active');

        // Re-render resources
        renderResources(filter);

        // Smooth scroll to top of resources
        document.querySelector('.resources-detailed').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Show error state when language fails to load
    function showErrorState() {
        const container = document.getElementById('resources-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: #5E5869;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2 style="margin-bottom: 0.5rem; color: #1A1625;">Unable to Load Resources</h2>
                    <p>The language resources for <strong>${langParam}</strong> could not be loaded.</p>
                    <p style="margin-top: 1rem;">
                        <a href="index.html" style="color: #5B4E8C; text-decoration: underline;">
                            Return to home page
                        </a>
                    </p>
                </div>
            `;
        }

        // Update hero with default values
        document.getElementById('breadcrumb-language').textContent = langParam;
        document.getElementById('language-title').textContent = 'Language Resources';
        document.title = `${langParam} Resources - Language Learning Hub`;
    }

    // Initialize when DOM is ready (only if data is already loaded)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (isDataLoaded) {
                init();
            }
        });
    } else {
        if (isDataLoaded) {
            init();
        }
    }
})();