// ===================================
// Modern UI/UX Enhancements
// ===================================

(function() {
    'use strict';

    // Initialize all UI enhancements
    function initModernUI() {
        initBackToTop();
        initStickyFilters();
        initCollapsibleSections();
        initSearch();
        initProgressBar();
        initKeyboardShortcuts();
        initSmoothReveal();
        initResourceCounter();
        enhanceMobileExperience();
    }

    // Back to Top Button
    function initBackToTop() {
        // Create button element
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5z"/>
            </svg>
        `;
        document.body.appendChild(button);

        // Show/hide based on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 300) {
                    button.classList.add('visible');
                } else {
                    button.classList.remove('visible');
                }
            }, 10);
        });

        // Smooth scroll to top
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Sticky Filter Enhancement
    function initStickyFilters() {
        const filterTabs = document.querySelector('.filter-tabs');
        if (!filterTabs) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                filterTabs.classList.add('scrolled');
            } else {
                filterTabs.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Collapsible Resource Sections
    function initCollapsibleSections() {
        const headers = document.querySelectorAll('.resource-section-header');

        headers.forEach(header => {
            // Add toggle arrow
            const toggle = document.createElement('span');
            toggle.className = 'section-toggle';
            toggle.innerHTML = '▼';
            header.appendChild(toggle);

            // Click handler
            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');

                // Save state to localStorage
                const sectionId = header.querySelector('.resource-section-title').textContent;
                const isCollapsed = header.classList.contains('collapsed');
                localStorage.setItem(`section-${sectionId}`, isCollapsed);
            });

            // Restore saved state
            const sectionId = header.querySelector('.resource-section-title').textContent;
            const savedState = localStorage.getItem(`section-${sectionId}`);
            if (savedState === 'true') {
                header.classList.add('collapsed');
            }
        });
    }

    // Search Functionality
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
            <input type="text" class="search-box" placeholder="Search resources... (Press '/' to focus)" />
        `;

        // Insert after filter tabs
        const filterTabs = container.querySelector('.filter-tabs');
        if (filterTabs && filterTabs.nextSibling) {
            container.insertBefore(searchContainer, filterTabs.nextSibling);
        }

        const searchBox = searchContainer.querySelector('.search-box');

        // Search functionality
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const resourceItems = document.querySelectorAll('.resource-item');

            resourceItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });

            // Update section visibility
            document.querySelectorAll('.resource-section').forEach(section => {
                const visibleItems = section.querySelectorAll('.resource-item[style*="display: none"]');
                const allItems = section.querySelectorAll('.resource-item');

                if (visibleItems.length === allItems.length) {
                    section.style.display = 'none';
                } else {
                    section.style.display = '';
                }
            });
        });
    }

    // Progress Bar
    function initProgressBar() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'page-progress';
        progressBar.innerHTML = '<div class="page-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const bar = progressBar.querySelector('.page-progress-bar');

        // Update on scroll
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;

            bar.style.width = `${progress  }%`;
        });
    }

    // Keyboard Shortcuts
    function initKeyboardShortcuts() {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'shortcuts-toast';
        toast.innerHTML = `
            Press <span class="shortcut-key">?</span> for shortcuts |
            <span class="shortcut-key">/</span> to search |
            <span class="shortcut-key">↑</span> to top |
            <span class="shortcut-key">ESC</span> to close
        `;
        document.body.appendChild(toast);

        let toastTimeout;

        document.addEventListener('keydown', (e) => {
            // Ignore if typing in input
            if (e.target.tagName === 'INPUT') {
                if (e.key === 'Escape') {
                    e.target.blur();
                }
                return;
            }

            switch(e.key) {
                case '/':
                    e.preventDefault();
                    const searchBox = document.querySelector('.search-box');
                    if (searchBox) {
                        searchBox.focus();
                        searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    break;

                case '?':
                    e.preventDefault();
                    toast.classList.add('visible');
                    clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        toast.classList.remove('visible');
                    }, 3000);
                    break;

                case 'ArrowUp':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    break;

                case 'Escape':
                    toast.classList.remove('visible');
                    break;

                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    if (e.altKey) {
                        e.preventDefault();
                        const tabs = document.querySelectorAll('.filter-tab');
                        const index = parseInt(e.key) - 1;
                        if (tabs[index]) {
                            tabs[index].click();
                        }
                    }
                    break;
            }
        });
    }

    // Smooth Reveal Animations
    function initSmoothReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe resource items
        document.querySelectorAll('.resource-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.05}s`;
            observer.observe(item);
        });
    }

    // Animated Resource Counter
    function initResourceCounter() {
        const counters = document.querySelectorAll('.resource-section-count');

        counters.forEach(counter => {
            const target = parseInt(counter.textContent.match(/\d+/)[0]);
            const duration = 1000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current = Math.min(current + step, target);
                counter.textContent = `${Math.floor(current)} resources`;

                if (current < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = `${target} resources`;
                }
            };

            // Start animation when visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            });

            observer.observe(counter);
        });
    }

    // Mobile Experience Enhancements
    function enhanceMobileExperience() {
        // Touch gesture support for filters
        const filterTabs = document.querySelector('.filter-tabs');
        if (filterTabs && 'ontouchstart' in window) {
            let startX = 0;
            let scrollLeft = 0;

            filterTabs.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - filterTabs.offsetLeft;
                scrollLeft = filterTabs.scrollLeft;
            });

            filterTabs.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].pageX - filterTabs.offsetLeft;
                const walk = (x - startX) * 2;
                filterTabs.scrollLeft = scrollLeft - walk;
            });
        }

        // Add haptic feedback for mobile (if supported)
        if ('vibrate' in navigator) {
            document.querySelectorAll('button, .filter-tab').forEach(element => {
                element.addEventListener('click', () => {
                    navigator.vibrate(10);
                });
            });
        }

        // Lazy load images for performance
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img').forEach(img => {
                img.loading = 'lazy';
            });
        }
    }

    // Performance optimization: Debounce scroll events
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

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModernUI);
    } else {
        initModernUI();
    }

    // Export for use in other modules
    window.ModernUI = {
        init: initModernUI,
        showToast: (message) => {
            const toast = document.querySelector('.shortcuts-toast');
            if (toast) {
                toast.textContent = message;
                toast.classList.add('visible');
                setTimeout(() => toast.classList.remove('visible'), 3000);
            }
        }
    };
})();