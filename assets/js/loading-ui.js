// ===================================
// Loading UI - Visual Feedback for Async Operations
// ===================================

/**
 * CONCEPT: Loading States Pattern
 * WHY: Users need feedback during async operations
 * UX PRINCIPLE: Perceived performance is as important as actual performance
 *
 * STATES: idle → loading → success → error
 */

class LoadingUI {
  constructor() {
    this.activeLoaders = new Map();
    this.styles = this._injectStyles();
  }

  /**
   * Show a loading spinner in a target element
   * @param {string|HTMLElement} target - CSS selector or element
   * @param {string} message - Optional loading message
   * @returns {string} - Loader ID for later removal
   */
  showLoader(target, message = 'Loading...') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
      console.warn('[LoadingUI] Target element not found:', target);
      return null;
    }

    // Generate unique ID
    const loaderId = `loader-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create loader element
    const loaderHTML = `
      <div class="loading-overlay" data-loader-id="${loaderId}">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p class="loading-message">${message}</p>
        </div>
      </div>
    `;

    // Insert loader
    element.style.position = 'relative'; // Ensure positioning context
    element.insertAdjacentHTML('beforeend', loaderHTML);

    // Store reference
    this.activeLoaders.set(loaderId, {
      element,
      target,
      startTime: Date.now(),
    });

    return loaderId;
  }

  /**
   * Remove a loading spinner
   * @param {string} loaderId - The loader ID from showLoader()
   */
  hideLoader(loaderId) {
    if (!loaderId || !this.activeLoaders.has(loaderId)) {
      return;
    }

    const loader = document.querySelector(`[data-loader-id="${loaderId}"]`);
    if (loader) {
      // Fade out animation
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 300);
    }

    const loaderData = this.activeLoaders.get(loaderId);
    const duration = Date.now() - loaderData.startTime;
    console.warn(`[LoadingUI] Loader removed after ${duration}ms`);

    this.activeLoaders.delete(loaderId);
  }

  /**
   * Show inline loading indicator (smaller, for buttons/cards)
   * @param {string|HTMLElement} target
   * @param {string} size - 'small', 'medium', 'large'
   * @returns {string} - Loader ID
   */
  showInlineLoader(target, size = 'small') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
      return null;
    }

    const loaderId = `inline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const spinner = document.createElement('span');
    spinner.className = `inline-spinner inline-spinner-${size}`;
    spinner.setAttribute('data-loader-id', loaderId);
    spinner.innerHTML = '<span class="spinner-dot"></span>'.repeat(3);

    element.appendChild(spinner);

    this.activeLoaders.set(loaderId, { element, target, startTime: Date.now() });

    return loaderId;
  }

  /**
   * Show a toast notification
   * @param {string} message
   * @param {string} type - 'success', 'error', 'info', 'warning'
   * @param {number} duration - Auto-hide duration in ms (0 = no auto-hide)
   */
  showToast(message, type = 'info', duration = 3000) {
    const toastId = `toast-${Date.now()}`;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('data-toast-id', toastId);

    toast.innerHTML = `
      <span class="toast-icon">${this._getToastIcon(type)}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    // Add to body
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);

    // Close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this._removeToast(toastId);
    });

    // Auto-hide
    if (duration > 0) {
      setTimeout(() => {
        this._removeToast(toastId);
      }, duration);
    }

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });
  }

  /**
   * Show error message
   * @param {string} message
   * @param {Error} error - Optional error object for details
   */
  showError(message, error = null) {
    if (error) {
      console.error('[LoadingUI] Error:', error);
    }
    this.showToast(message, 'error', 5000);
  }

  /**
   * Show success message
   * @param {string} message
   */
  showSuccess(message) {
    this.showToast(message, 'success', 3000);
  }

  /**
   * Private: Remove toast
   */
  _removeToast(toastId) {
    const toast = document.querySelector(`[data-toast-id="${toastId}"]`);
    if (toast) {
      toast.classList.remove('toast-show');
      toast.classList.add('toast-hide');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }

  /**
   * Private: Get icon for toast type
   */
  _getToastIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type] || icons.info;
  }

  /**
   * Private: Inject CSS styles
   */
  _injectStyles() {
    if (document.getElementById('loading-ui-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'loading-ui-styles';
    style.textContent = `
      /* Loading Overlay */
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: opacity 0.3s ease;
      }

      .loading-spinner {
        text-align: center;
      }

      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(91, 78, 140, 0.1);
        border-top-color: var(--color-primary, #5B4E8C);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto 1rem;
      }

      .loading-message {
        color: var(--color-gray-700, #5E5869);
        font-size: 0.875rem;
        margin: 0;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Inline Spinner */
      .inline-spinner {
        display: inline-flex;
        gap: 4px;
        margin-left: 8px;
      }

      .spinner-dot {
        width: 6px;
        height: 6px;
        background: currentColor;
        border-radius: 50%;
        animation: pulse 1.2s ease-in-out infinite;
      }

      .spinner-dot:nth-child(2) { animation-delay: 0.2s; }
      .spinner-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
      }

      /* Toast Notifications */
      .toast-container {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .toast-show {
        opacity: 1;
        transform: translateX(0);
      }

      .toast-hide {
        opacity: 0;
        transform: translateX(100%);
      }

      .toast-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
      }

      .toast-success .toast-icon {
        background: #10b981;
        color: white;
      }

      .toast-error .toast-icon {
        background: #ef4444;
        color: white;
      }

      .toast-warning .toast-icon {
        background: #f59e0b;
        color: white;
      }

      .toast-info .toast-icon {
        background: #3b82f6;
        color: white;
      }

      .toast-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-dark, #1A1625);
      }

      .toast-close {
        flex-shrink: 0;
        background: none;
        border: none;
        font-size: 20px;
        line-height: 1;
        color: var(--color-gray-500, #8E8896);
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        transition: color 0.2s;
      }

      .toast-close:hover {
        color: var(--color-gray-700, #5E5869);
      }

      @media (max-width: 640px) {
        .toast-container {
          right: 16px;
          left: 16px;
          max-width: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Clean up all active loaders
   */
  cleanup() {
    for (const [loaderId] of this.activeLoaders) {
      this.hideLoader(loaderId);
    }
  }
}

// Export singleton instance
export const loadingUI = new LoadingUI();

// Also export class for testing
export { LoadingUI };
