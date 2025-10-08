// ===================================
// Clean & Minimal UI Enhancements
// ===================================

(function() {
    'use strict';

    // Initialize clean UI
    function initCleanUI() {
        initBackToTop();
        initSearch();
        initCollapsible();
        initKeyboardShortcuts();
        initProgressBar();
    }

    // Simple Back to Top
    function initBackToTop() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
        `;
        document.body.appendChild(button);

        // Simple show/hide
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Clean Search
    function initSearch() {
        const container = document.querySelector('.resources-detailed .container');
        if (!container) return;

        // Create search box
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input type="text" class="search-box" placeholder="Search resources..." />
        `;

        const filterTabs = container.querySelector('.filter-tabs');
        if (filterTabs && filterTabs.nextSibling) {
            container.insertBefore(searchContainer, filterTabs.nextSibling);
        }

        const searchBox = searchContainer.querySelector('.search-box');

        // Simple search
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const resourceItems = document.querySelectorAll('.resource-item');

            resourceItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? '' : 'none';
            });

            // Hide empty sections
            document.querySelectorAll('.resource-section').forEach(section => {
                const hasVisibleItems = section.querySelector('.resource-item:not([style*="display: none"])');
                section.style.display = hasVisibleItems ? '' : 'none';
            });
        });
    }

    // Simple Collapsible Sections
    function initCollapsible() {
        const headers = document.querySelectorAll('.resource-section-header');

        headers.forEach(header => {
            // Skip if already initialized
            if (header.querySelector('.section-toggle')) return;

            // Add arrow
            const toggle = document.createElement('span');
            toggle.className = 'section-toggle';
            toggle.innerHTML = '▼';
            header.appendChild(toggle);

            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');
            });
        });
    }

    // Expose globally for use in other modules
    window.reinitCollapsible = initCollapsible;

    // Minimal Keyboard Shortcuts
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') {
                if (e.key === 'Escape') e.target.blur();
                return;
            }

            if (e.key === '/') {
                e.preventDefault();
                const searchBox = document.querySelector('.search-box');
                if (searchBox) searchBox.focus();
            }
        });
    }

    // Subtle Progress Bar
    function initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'page-progress';
        progressBar.innerHTML = '<div class="page-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const bar = progressBar.querySelector('.page-progress-bar');

        window.addEventListener('scroll', () => {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;
            bar.style.width = `${progress  }%`;
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCleanUI);
    } else {
        initCleanUI();
    }
})();