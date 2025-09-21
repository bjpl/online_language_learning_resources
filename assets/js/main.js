// ===================================
// Language Learning Hub - Main JavaScript
// ===================================

// PATTERN: Module pattern for encapsulation and organization
// WHY: Prevents global namespace pollution and creates clear interfaces

const LanguageHub = (function() {
    'use strict';

    // Cache DOM elements for performance
    const elements = {
        nav: null,
        navToggle: null,
        navMenu: null,
        languagesGrid: null,
        searchInput: null,
        searchButton: null,
        showAllBtn: null,
        languagePills: null
    };

    // State management
    const state = {
        allLanguagesVisible: false,
        searchTerm: '',
        selectedCategory: null,
        scrolled: false
    };

    // Initialize all functionality
    function init() {
        cacheElements();
        if (elementsExist()) {
            bindEvents();
            renderLanguages();
            initializeAnimations();
            setupIntersectionObserver();
        }
    }

    // Cache DOM elements
    function cacheElements() {
        elements.nav = document.querySelector('.nav');
        elements.navToggle = document.querySelector('.nav-toggle');
        elements.navMenu = document.querySelector('.nav-menu');
        elements.languagesGrid = document.getElementById('languages-grid');
        elements.searchInput = document.getElementById('quick-search-input');
        elements.searchButton = document.querySelector('.search-button');
        elements.showAllBtn = document.getElementById('show-all-languages');
        elements.languagePills = document.querySelectorAll('.pill');
    }

    // Check if required elements exist
    function elementsExist() {
        return elements.languagesGrid !== null;
    }

    // Bind event handlers
    function bindEvents() {
        // Navigation toggle
        if (elements.navToggle) {
            elements.navToggle.addEventListener('click', toggleMobileNav);
        }

        // Scroll events
        window.addEventListener('scroll', handleScroll);

        // Search functionality
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
            elements.searchInput.addEventListener('keypress', handleSearchKeypress);
        }

        if (elements.searchButton) {
            elements.searchButton.addEventListener('click', executeSearch);
        }

        // Show all languages button
        if (elements.showAllBtn) {
            elements.showAllBtn.addEventListener('click', toggleAllLanguages);
        }

        // Language pills
        elements.languagePills.forEach(pill => {
            pill.addEventListener('click', handlePillClick);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });

        // Resource cards
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', handleResourceClick);
        });
    }

    // Toggle mobile navigation
    function toggleMobileNav() {
        const isOpen = elements.navMenu.classList.contains('active');
        elements.navMenu.classList.toggle('active');
        elements.navToggle.setAttribute('aria-expanded', !isOpen);

        // Animate hamburger
        elements.navToggle.classList.toggle('active');
    }

    // Handle scroll events
    function handleScroll() {
        const scrolled = window.scrollY > 100;

        if (scrolled !== state.scrolled) {
            state.scrolled = scrolled;
            elements.nav.classList.toggle('scrolled', scrolled);
        }
    }

    // Smooth scroll handler
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offset = 80; // Nav height
                const top = target.offsetTop - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                elements.navMenu.classList.remove('active');
            }
        }
    }

    // Render language cards
    function renderLanguages(showAll = false) {
        // Filter out placeholder comments and only show real language data
        const languages = Object.entries(languageData).filter(([key, lang]) =>
            lang && typeof lang === 'object' && lang.name
        );
        const limit = showAll ? languages.length : 6;
        const filteredLanguages = state.searchTerm
            ? languages.filter(([key, lang]) =>
                lang.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                lang.nativeName.toLowerCase().includes(state.searchTerm.toLowerCase())
              )
            : languages;

        elements.languagesGrid.innerHTML = '';

        filteredLanguages.slice(0, limit).forEach(([key, language], index) => {
            const card = createLanguageCard(key, language, index);
            elements.languagesGrid.appendChild(card);
        });

        // Button removed as we only show featured languages for now
    }

    // Create a language card element
    function createLanguageCard(key, language, index) {
        const card = document.createElement('article');
        card.className = 'language-card fade-in';
        card.dataset.language = key;
        card.style.animationDelay = `${index * 100}ms`;

        // Calculate resource count
        const resourceCount = Object.values(language.resources || {})
            .reduce((sum, category) => sum + (category?.length || 0), 0);

        card.innerHTML = `
            <div class="language-header">
                <span class="language-flag">${language.flag}</span>
                <div class="language-info">
                    <h3>${language.name}</h3>
                    <span class="language-native">${language.nativeName}</span>
                </div>
            </div>
            <div class="language-stats">
                <div class="stat">
                    <span class="stat-value">${language.speakers}</span>
                    <span class="stat-label">Speakers</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${language.difficulty}</span>
                    <span class="stat-label">Difficulty</span>
                </div>
            </div>
            <p class="language-description">${language.description}</p>
            <a href="language.html?lang=${key}" class="language-link">
                Explore ${resourceCount}+ resources
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
            </a>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.language-link')) {
                window.location.href = `language.html?lang=${key}`;
            }
        });

        return card;
    }

    // Toggle showing all languages
    function toggleAllLanguages() {
        state.allLanguagesVisible = !state.allLanguagesVisible;
        renderLanguages(state.allLanguagesVisible);
    }

    // Handle search
    function handleSearch(e) {
        state.searchTerm = e.target.value;
        renderLanguages(state.allLanguagesVisible || state.searchTerm !== '');

        // Scroll to languages section if searching
        if (state.searchTerm) {
            document.getElementById('languages').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle search keypress (Enter key)
    function handleSearchKeypress(e) {
        if (e.key === 'Enter') {
            executeSearch();
        }
    }

    // Execute search
    function executeSearch() {
        if (state.searchTerm) {
            renderLanguages(true);
            document.getElementById('languages').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle language pill clicks
    function handlePillClick(e) {
        e.preventDefault();
        const lang = e.currentTarget.dataset.lang;

        // Scroll to language in grid or go to language page
        const card = document.querySelector(`[data-language="${getLanguageKeyByCode(lang)}"]`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('highlight');
            setTimeout(() => card.classList.remove('highlight'), 2000);
        }
    }

    // Get language key by language code
    function getLanguageKeyByCode(code) {
        const codeMap = {
            'nl': 'dutch',
            'da': 'danish',
            'pt': 'portuguese'
        };
        return codeMap[code] || code;
    }

    // Handle resource card clicks
    function handleResourceClick(e) {
        if (!e.target.closest('a')) {
            const category = e.currentTarget.dataset.category;
            window.location.href = `resources.html?type=${category}`;
        }
    }

    // Initialize animations
    function initializeAnimations() {
        // Add animation delays to resource cards
        document.querySelectorAll('.resource-card').forEach((card, i) => {
            card.style.setProperty('--i', i);
        });
    }

    // Setup Intersection Observer for scroll animations
    function setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    // Utility: Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Utility: Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Add keyboard navigation
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape closes mobile menu
            if (e.key === 'Escape' && elements.navMenu.classList.contains('active')) {
                toggleMobileNav();
            }

            // Slash focuses search
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                elements.searchInput?.focus();
            }
        });
    }

    // Initialize keyboard navigation
    initKeyboardNavigation();

    // Public API
    return {
        init: init,
        renderLanguages: renderLanguages,
        state: state
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', LanguageHub.init);
} else {
    LanguageHub.init();
}

// Add CSS class for JavaScript-enabled styling
document.documentElement.classList.add('js');

// Performance monitoring (development)
if (window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Metrics:', {
            'DOM Interactive': perfData.domInteractive + 'ms',
            'DOM Complete': perfData.domComplete + 'ms',
            'Load Complete': perfData.loadEventEnd + 'ms'
        });
    });
}