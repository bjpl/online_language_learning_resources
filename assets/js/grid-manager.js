// ===================================
// Grid Manager - Intelligent Layout System
// ===================================

(function(global) {
    'use strict';

    // CONCEPT: Dynamic grid management based on content
    // WHY: Automatically optimizes layout as languages are added
    // PATTERN: Observer pattern with responsive design

    const GridManager = {
        // Configuration for different language counts
        gridConfigs: {
            small: { min: 1, max: 6, columns: 'auto-fit', info: '' },
            medium: { min: 7, max: 12, columns: 6, info: '' },
            large: { min: 13, max: 14, columns: 7, info: '' },
            extraLarge: { min: 15, max: 18, columns: 6, info: '3 rows' },
            huge: { min: 19, max: 24, columns: 6, info: '4 rows' },
            scrollable: { min: 25, max: 99, columns: 5, info: 'Scroll for more' }
        },

        // Initialize the grid manager
        init() {
            this.updateAllGrids();
            this.observeGridChanges();
            this.addKeyboardSupport();
        },

        // Update all language filter grids on the page
        updateAllGrids() {
            const grids = document.querySelectorAll('.language-filters');

            grids.forEach(grid => {
                this.optimizeGrid(grid);
            });
        },

        // Optimize a specific grid based on its content
        optimizeGrid(grid) {
            const buttons = grid.querySelectorAll('.lang-filter');
            const count = buttons.length;

            // Set data attribute for CSS targeting
            grid.setAttribute('data-language-count', count);

            // Add visual feedback for many languages
            if (count > 18) {
                grid.classList.add('many-languages');

                // Find matching config
                const config = this.getConfigForCount(count);
                if (config && config.info) {
                    grid.setAttribute('data-language-info', config.info);
                }
            }

            // Apply ARIA attributes for accessibility
            this.enhanceAccessibility(grid, count);

            // Log for debugging (remove in production)
            console.warn(`Grid optimized for ${count} languages`);
        },

        // Get configuration for a specific language count
        getConfigForCount(count) {
            for (const config of Object.values(this.gridConfigs)) {
                if (count >= config.min && count <= config.max) {
                    return config;
                }
            }
            return this.gridConfigs.scrollable;
        },

        // Enhance accessibility
        enhanceAccessibility(grid, count) {
            grid.setAttribute('role', 'group');
            grid.setAttribute('aria-label', `Language filters: ${count} languages available`);

            // Add keyboard navigation hints
            const buttons = grid.querySelectorAll('.lang-filter');
            buttons.forEach((button, index) => {
                button.setAttribute('tabindex', '0');
                button.setAttribute('aria-position', `${index + 1} of ${count}`);
            });
        },

        // Add keyboard navigation support
        addKeyboardSupport() {
            document.addEventListener('keydown', (e) => {
                const {activeElement} = document;

                if (!activeElement || !activeElement.classList.contains('lang-filter')) {
                    return;
                }

                const grid = activeElement.closest('.language-filters');
                if (!grid) return;

                const buttons = Array.from(grid.querySelectorAll('.lang-filter'));
                const currentIndex = buttons.indexOf(activeElement);

                let nextIndex = -1;

                switch(e.key) {
                    case 'ArrowRight':
                        nextIndex = (currentIndex + 1) % buttons.length;
                        break;
                    case 'ArrowLeft':
                        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                        break;
                    case 'Home':
                        nextIndex = 0;
                        break;
                    case 'End':
                        nextIndex = buttons.length - 1;
                        break;
                }

                if (nextIndex !== -1) {
                    e.preventDefault();
                    buttons[nextIndex].focus();
                }
            });
        },

        // Observe DOM changes to re-optimize when languages are added/removed
        observeGridChanges() {
            if (!window.MutationObserver) return;

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        const grid = mutation.target.closest('.language-filters');
                        if (grid) {
                            this.optimizeGrid(grid);
                        }
                    }
                });
            });

            // Observe all grids
            document.querySelectorAll('.language-filters').forEach(grid => {
                observer.observe(grid, { childList: true, subtree: true });
            });
        },

        // Utility: Calculate optimal grid dimensions
        calculateOptimalGrid(itemCount, maxColumns = 7) {
            const columns = Math.min(itemCount, maxColumns);
            const rows = Math.ceil(itemCount / columns);

            return {
                columns,
                rows,
                emptySlots: (columns * rows) - itemCount
            };
        },

        // Future feature: Group languages by region
        groupLanguagesByRegion() {
            const regions = {
                'European': ['dutch', 'danish', 'italian', 'swedish', 'finnish', 'polish'],
                'Asian': ['korean', 'japanese', 'hindi', 'indonesian', 'vietnamese'],
                'African': ['swahili'],
                'Romance': ['portuguese', 'italian', 'french', 'spanish'],
                'Germanic': ['dutch', 'danish', 'swedish', 'german'],
                'Slavic': ['polish', 'russian', 'czech']
            };

            // Implementation for future grouped display
            return regions;
        },

        // Analytics: Track which languages are most clicked
        trackLanguageUsage() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('lang-filter')) {
                    const language = e.target.dataset.lang;

                    // Store in localStorage for simple analytics
                    const stats = JSON.parse(localStorage.getItem('languageStats') || '{}');
                    stats[language] = (stats[language] || 0) + 1;
                    localStorage.setItem('languageStats', JSON.stringify(stats));

                    // Could reorder based on popularity in future
                    this.considerReorderByPopularity(stats);
                }
            });
        },

        // Consider reordering languages by popularity
        considerReorderByPopularity(stats) {
            // Future enhancement: Reorder languages based on usage
            // This would require coordination with the main app
            const threshold = 10; // After 10 total clicks
            const totalClicks = Object.values(stats).reduce((a, b) => a + b, 0);

            if (totalClicks > threshold) {
                // Could emit event for main app to handle
                const event = new CustomEvent('languageReorder', {
                    detail: { stats, suggestion: 'popularity' }
                });
                document.dispatchEvent(event);
            }
        }
    };

    // Make available globally
    global.GridManager = GridManager;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => GridManager.init());
    } else {
        GridManager.init();
    }

})(window);