/**
 * @fileoverview Loading state manager for VybeCoding demo
 * @module loading
 */

import { EventEmitter } from './utils.js';

/**
 * Loading state manager
 * @extends EventEmitter
 * @fires LoadingManager#loading:start
 * @fires LoadingManager#loading:complete
 * @fires LoadingManager#loading:error
 * @example
 * const loader = new LoadingManager();
 * loader.show('page-load', 'Loading page...');
 * loader.hide('page-load');
 */
export class LoadingManager extends EventEmitter {
    /**
     * Create a loading manager
     * @param {import('../types.js').LoadingOptions} options - Configuration options
     */
    constructor(options = {}) {
        super();
        this.options = {
            defaultTimeout: 30000,
            className: 'loading-overlay',
            ...options
        };
        this.activeLoaders = new Map();
        this.init();
    }
    
    /**
     * Initialize loading manager
     * @private
     */
    init() {
        this.createGlobalLoader();
        this.setupStyles();
    }
    
    /**
     * Create global loading overlay
     * @private
     */
    createGlobalLoader() {
        if (document.getElementById('global-loader')) return;
        
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.className = `${this.options.className} hidden`;
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-live', 'polite');
        loader.setAttribute('aria-label', 'Loading');
        
        loader.innerHTML = `
            <div class="loading-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <div class="loading-content bg-vybe-shadow/90 border border-vybe-carbon rounded-lg p-6 max-w-sm mx-4">
                    <div class="flex items-center gap-4">
                        <div class="loading-spinner">
                            <svg class="animate-spin h-6 w-6 text-vybe-purple" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <div class="loading-message text-white text-sm">Loading...</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
    }
    
    /**
     * Setup loading styles
     * @private
     */
    setupStyles() {
        if (document.getElementById('loading-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            .loading-overlay {
                transition: opacity 0.2s ease-in-out;
            }
            
            .loading-overlay.hidden {
                opacity: 0;
                pointer-events: none;
            }
            
            .loading-overlay:not(.hidden) {
                opacity: 1;
                pointer-events: all;
            }
            
            .loading-spinner svg {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .loading-shimmer {
                background: linear-gradient(90deg, 
                    rgba(255,255,255,0.1) 25%, 
                    rgba(255,255,255,0.2) 50%, 
                    rgba(255,255,255,0.1) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Show loading state
     * @param {string} id - Unique identifier for the loading state
     * @param {string} message - Loading message to display
     * @param {Object} options - Loading options
     */
    show(id, message = 'Loading...', options = {}) {
        const { timeout = this.options.defaultTimeout, element = null } = options;
        
        this.emit('loading:start', { id, message });
        
        if (element) {
            this.showElementLoader(element, message);
        } else {
            this.showGlobalLoader(message);
        }
        
        // Store loader info
        const timeoutId = setTimeout(() => {
            this.error(id, 'Loading timeout');
        }, timeout);
        
        this.activeLoaders.set(id, {
            message,
            element,
            timeoutId,
            startTime: Date.now()
        });
    }
    
    /**
     * Hide loading state
     * @param {string} id - Unique identifier for the loading state
     */
    hide(id) {
        const loader = this.activeLoaders.get(id);
        if (!loader) return;
        
        clearTimeout(loader.timeoutId);
        
        if (loader.element) {
            this.hideElementLoader(loader.element);
        } else {
            this.hideGlobalLoader();
        }
        
        this.activeLoaders.delete(id);
        
        const duration = Date.now() - loader.startTime;
        this.emit('loading:complete', { id, duration });
    }
    
    /**
     * Show error state
     * @param {string} id - Unique identifier for the loading state
     * @param {string} message - Error message
     */
    error(id, message) {
        const loader = this.activeLoaders.get(id);
        if (!loader) return;
        
        clearTimeout(loader.timeoutId);
        
        if (loader.element) {
            this.showElementError(loader.element, message);
        } else {
            this.showGlobalError(message);
        }
        
        this.activeLoaders.delete(id);
        this.emit('loading:error', { id, message });
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            if (loader.element) {
                this.hideElementLoader(loader.element);
            } else {
                this.hideGlobalLoader();
            }
        }, 5000);
    }
    
    /**
     * Show global loading overlay
     * @param {string} message - Loading message
     * @private
     */
    showGlobalLoader(message) {
        const loader = document.getElementById('global-loader');
        const messageEl = loader.querySelector('.loading-message');
        
        messageEl.textContent = message;
        loader.classList.remove('hidden');
        loader.setAttribute('aria-label', message);
    }
    
    /**
     * Hide global loading overlay
     * @private
     */
    hideGlobalLoader() {
        const loader = document.getElementById('global-loader');
        loader.classList.add('hidden');
    }
    
    /**
     * Show global error message
     * @param {string} message - Error message
     * @private
     */
    showGlobalError(message) {
        const loader = document.getElementById('global-loader');
        const content = loader.querySelector('.loading-content');
        
        content.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="text-red-400">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <div class="text-white text-sm">${message}</div>
            </div>
        `;
        
        loader.classList.remove('hidden');
        loader.setAttribute('aria-label', `Error: ${message}`);
    }
    
    /**
     * Show loading state on specific element
     * @param {HTMLElement} element - Target element
     * @param {string} message - Loading message
     * @private
     */
    showElementLoader(element, message) {
        element.classList.add('loading-shimmer');
        element.setAttribute('aria-busy', 'true');
        element.setAttribute('aria-label', message);
        
        // Disable interactive elements
        const interactiveElements = element.querySelectorAll('button, a, input, select, textarea');
        interactiveElements.forEach(el => {
            el.setAttribute('disabled', 'true');
            el.setAttribute('data-was-disabled', 'false');
        });
    }
    
    /**
     * Hide loading state from specific element
     * @param {HTMLElement} element - Target element
     * @private
     */
    hideElementLoader(element) {
        element.classList.remove('loading-shimmer');
        element.removeAttribute('aria-busy');
        
        // Re-enable interactive elements
        const interactiveElements = element.querySelectorAll('[disabled][data-was-disabled="false"]');
        interactiveElements.forEach(el => {
            el.removeAttribute('disabled');
            el.removeAttribute('data-was-disabled');
        });
    }
    
    /**
     * Show error state on specific element
     * @param {HTMLElement} element - Target element
     * @param {string} message - Error message
     * @private
     */
    showElementError(element, message) {
        this.hideElementLoader(element);
        
        // Add error styling
        element.classList.add('border-red-400', 'bg-red-900/20');
        
        // Create error message
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message text-red-400 text-sm mt-2';
        errorEl.textContent = message;
        errorEl.setAttribute('role', 'alert');
        
        element.appendChild(errorEl);
        
        // Remove error styling after 5 seconds
        setTimeout(() => {
            element.classList.remove('border-red-400', 'bg-red-900/20');
            errorEl.remove();
        }, 5000);
    }
    
    /**
     * Check if any loaders are active
     * @returns {boolean} True if any loaders are active
     */
    isLoading() {
        return this.activeLoaders.size > 0;
    }
    
    /**
     * Get active loader IDs
     * @returns {string[]} Array of active loader IDs
     */
    getActiveLoaders() {
        return Array.from(this.activeLoaders.keys());
    }
    
    /**
     * Hide all active loaders
     */
    hideAll() {
        for (const id of this.activeLoaders.keys()) {
            this.hide(id);
        }
    }
}