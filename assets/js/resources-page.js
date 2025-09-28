// ===================================
// Resources Page - Aggregation & Display
// ===================================

(function() {
    'use strict';

    // State
    let allResources = {
        courses: [],
        apps: [],
        books: [],
        audio: [],
        practice: []
    };

    let currentLanguageFilter = 'all';
    let currentTypeFilter = 'all';
    let currentView = 'grid';

    // Initialize
    function init() {
        populateLanguageDropdown();
        aggregateResources();
        displayStatistics();

        // Check for filter preference from homepage
        const savedFilter = localStorage.getItem('resourceFilter');
        if (savedFilter && savedFilter !== 'all') {
            currentTypeFilter = savedFilter;
            // Update active button
            document.querySelectorAll('.type-filter').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.type === savedFilter) {
                    btn.classList.add('active');
                }
            });
            // Clear the saved filter
            localStorage.removeItem('resourceFilter');
        }

        renderAllResources();
        bindEventHandlers();
        initCollapsibleSections();
    }

    // Populate language dropdown with all available languages
    function populateLanguageDropdown() {
        const select = document.getElementById('language-select');
        if (!select || !languageData) return;

        // Get all languages from languageData and sort alphabetically
        const languages = Object.keys(languageData).sort((a, b) => {
            return languageData[a].name.localeCompare(languageData[b].name);
        });

        // Add each language as an option
        languages.forEach(langKey => {
            const lang = languageData[langKey];
            const option = document.createElement('option');
            option.value = langKey;
            option.textContent = `${lang.flag} ${lang.name}`;
            select.appendChild(option);
        });
    }

    // Aggregate resources from all languages
    function aggregateResources() {
        // Use all languages from languageData instead of hardcoded list
        const languages = Object.keys(languageData);

        languages.forEach(langKey => {
            const lang = languageData[langKey];
            if (!lang || !lang.resources) return;

            // Process courses
            if (lang.resources.courses) {
                processCategoryResources(lang.resources.courses, 'courses', langKey, lang);
            }

            // Process apps
            if (lang.resources.apps) {
                if (Array.isArray(lang.resources.apps)) {
                    lang.resources.apps.forEach(app => {
                        allResources.apps.push({
                            ...app,
                            language: langKey,
                            languageName: lang.name,
                            languageFlag: lang.flag
                        });
                    });
                }
            }

            // Process books
            if (lang.resources.books) {
                processCategoryResources(lang.resources.books, 'books', langKey, lang);
            }

            // Process audio
            if (lang.resources.audio) {
                processCategoryResources(lang.resources.audio, 'audio', langKey, lang);
            }

            // Process practice
            if (lang.resources.practice) {
                processCategoryResources(lang.resources.practice, 'practice', langKey, lang);
            }
        });
    }

    // Process resources that have nested category structure
    function processCategoryResources(categories, type, langKey, langData) {
        if (Array.isArray(categories)) {
            categories.forEach(category => {
                if (category.items && Array.isArray(category.items)) {
                    category.items.forEach(item => {
                        allResources[type].push({
                            ...item,
                            category: category.category,
                            language: langKey,
                            languageName: langData.name,
                            languageFlag: langData.flag
                        });
                    });
                }
            });
        }
    }

    // Display statistics
    function displayStatistics() {
        let totalResources = 0;
        let freeResources = 0;

        Object.values(allResources).forEach(typeResources => {
            totalResources += typeResources.length;
            freeResources += typeResources.filter(r => r.free).length;
        });

        // Count unique languages
        const uniqueLanguages = new Set();
        Object.values(allResources).forEach(typeResources => {
            typeResources.forEach(resource => {
                if (resource.language) {
                    uniqueLanguages.add(resource.language);
                }
            });
        });
        const totalLanguages = uniqueLanguages.size;

        // Animate counters
        animateCounter('total-resources', totalResources);
        animateCounter('total-languages', totalLanguages);
        animateCounter('free-resources', freeResources);
    }

    // Animate counter
    function animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const duration = 1000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Render all resources
    function renderAllResources() {
        // Check if we should show specific type or all
        if (currentTypeFilter === 'all') {
            // Show all type sections
            document.querySelectorAll('.type-section').forEach(section => {
                section.style.display = '';
            });
            Object.keys(allResources).forEach(type => {
                renderResourceType(type);
            });
        } else {
            // Hide all sections first
            document.querySelectorAll('.type-section').forEach(section => {
                section.style.display = 'none';
            });
            // Show only selected type
            const selectedSection = document.getElementById(`${currentTypeFilter}-section`);
            if (selectedSection) {
                selectedSection.style.display = '';
                renderResourceType(currentTypeFilter);
            }
        }
    }

    // Render resources for a specific type
    function renderResourceType(type) {
        const grid = document.getElementById(`${type}-grid`);
        // IMPORTANT: Only select the count badge in the section header, NOT the filter buttons
        const countElement = document.querySelector(`.type-section .type-header .type-count[data-type="${type}"]`);

        if (!grid) return;

        // Filter resources by language
        let resources = allResources[type];
        if (currentLanguageFilter !== 'all') {
            resources = resources.filter(r => r.language === currentLanguageFilter);
        }

        // Update count in section header only
        if (countElement && countElement.classList.contains('type-count')) {
            countElement.textContent = `${resources.length} resources`;
        }

        // Clear grid
        grid.innerHTML = '';
        grid.className = `resources-grid ${currentView}-view`;

        // Show empty state if no resources
        if (resources.length === 0) {
            grid.innerHTML = createEmptyState(type);
            return;
        }

        // Render resource cards
        resources.forEach((resource, index) => {
            const card = createResourceCard(resource);
            grid.appendChild(card);

            // Stagger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 30);
        });
    }

    // Create resource card
    function createResourceCard(resource) {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';

        const languageBadgeClass = `language-badge ${resource.language}`;

        card.innerHTML = `
            <div class="language-badge ${languageBadgeClass}">
                <span>${resource.languageFlag}</span>
                <span>${resource.languageName}</span>
            </div>

            <div class="card-header">
                ${resource.url ?
                    `<a href="${resource.url}" target="_blank" rel="noopener" class="resource-title">${resource.name}</a>` :
                    `<div class="resource-title">${resource.name}</div>`
                }
            </div>

            ${resource.features && resource.features.length > 0 ? `
                <div class="resource-features">
                    ${resource.features.slice(0, 3).map(feature =>
                        `<span class="feature-item">${feature}</span>`
                    ).join('')}
                </div>
            ` : ''}

            <div class="resource-meta">
                ${resource.free ?
                    '<span class="meta-badge free">Free</span>' :
                    '<span class="meta-badge paid">Paid</span>'
                }
                ${resource.level ?
                    `<span class="meta-badge level">${resource.level}</span>` :
                    ''
                }
                ${resource.variant ?
                    `<span class="meta-badge level">${resource.variant}</span>` :
                    ''
                }
            </div>
        `;

        return card;
    }

    // Create empty state
    function createEmptyState(type) {
        const icons = {
            courses: '🎓',
            apps: '📱',
            books: '📚',
            audio: '🎧',
            practice: '💬'
        };

        return `
            <div class="empty-state">
                <div class="empty-icon">${icons[type] || '📌'}</div>
                <div class="empty-message">No ${type} available</div>
                <div class="empty-hint">Try selecting "All Languages" to see more resources</div>
            </div>
        `;
    }

    // Initialize collapsible sections
    function initCollapsibleSections() {
        document.querySelectorAll('.type-header').forEach(header => {
            // Add toggle arrow
            const toggle = document.createElement('span');
            toggle.className = 'type-toggle';
            toggle.innerHTML = '▼';
            header.appendChild(toggle);

            // Click handler
            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');

                // Save state to localStorage
                const typeTitle = header.querySelector('.type-title').textContent;
                const isCollapsed = header.classList.contains('collapsed');
                localStorage.setItem(`resources-section-${typeTitle}`, isCollapsed);
            });

            // Restore saved state
            const typeTitle = header.querySelector('.type-title').textContent;
            const savedState = localStorage.getItem(`resources-section-${typeTitle}`);
            if (savedState === 'true') {
                header.classList.add('collapsed');
            }
        });
    }

    // Bind event handlers
    function bindEventHandlers() {
        // Language dropdown filter
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                // Update filter and re-render
                currentLanguageFilter = e.target.value;
                renderAllResources();
            });
        }

        // Type filters
        document.querySelectorAll('.type-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.type-filter').forEach(f =>
                    f.classList.remove('active'));
                filter.classList.add('active');

                // Update filter and re-render
                currentTypeFilter = filter.dataset.type;
                renderAllResources();
            });
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.view-btn').forEach(b =>
                    b.classList.remove('active'));
                btn.classList.add('active');

                // Update view and re-render
                currentView = btn.dataset.view;
                renderAllResources();
            });
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize language filter layout (two-row grid)
    function initLanguageFilterLayout() {
        const filterContainer = document.querySelector('.language-filters');

        if (!filterContainer) return;

        // Ensure all filters are visible in the two-row grid
        const filters = filterContainer.querySelectorAll('.lang-filter');

        // Add visual feedback for active filter
        const activeFilter = filterContainer.querySelector('.lang-filter.active');
        if (activeFilter) {
            activeFilter.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initLanguageFilterLayout();
        });
    } else {
        init();
        initLanguageFilterLayout();
    }
})();