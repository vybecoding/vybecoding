/**
 * VybeCoding Core Application Framework
 * Optimized for AI agent development workflows
 * Reduces code duplication and provides consistent patterns
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const APP_CONFIG = {
    // Timing constants
    TIMING: {
        FADE_DELAY: 3000,
        TRANSITION: 500,
        LOADING_DELAY: 800,
        SUCCESS_DISPLAY: 4000
    },
    
    // Business logic constants
    PRICES: {
        QUICK_HELP: 75,
        FULL_SESSION: 150,
        PREMIUM_GUIDE: 25
    },
    
    // Visual constants
    COLORS: {
        PURPLE_ALPHA: 'rgba(138, 43, 226, 0.15)',
        SUCCESS_ALPHA: 'rgba(34, 197, 94, 0.15)',
        WARNING_ALPHA: 'rgba(245, 158, 11, 0.15)'
    },
    
    // Common selectors (cached)
    SELECTORS: {
        MOBILE_MENU: '#mobileMenu',
        PROFILE_DROPDOWN: '#profileDropdown',
        PAGE_CONTAINER: '#pageContainer',
        TAB_CONTENT: '.tab-content',
        ACTIVE_TAB: '.tab-button.active'
    }
};

// Session types data structure
const SESSION_TYPES = [
    {
        name: 'Quick Help',
        duration: 30,
        price: 75,
        description: 'Get quick answers and direction',
        features: ['30-minute focused session', 'Specific question resolution', 'Best practices guidance']
    },
    {
        name: 'Full Session', 
        duration: 90,
        price: 150,
        description: 'Comprehensive development guidance',
        features: ['90-minute deep dive', 'Code review and optimization', 'Architecture planning', 'Career guidance']
    }
];

// Month names constant (reused multiple times in original)
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// ============================================
// DOM CACHE SYSTEM
// ============================================

class DOMCache {
    constructor() {
        this.elements = new Map();
        this.initialized = false;
    }
    
    /**
     * Get cached element or query and cache it
     * @param {string} selector - CSS selector
     * @returns {Element|null}
     */
    get(selector) {
        if (!this.elements.has(selector)) {
            const element = document.querySelector(selector);
            this.elements.set(selector, element);
        }
        return this.elements.get(selector);
    }
    
    /**
     * Get all elements matching selector (cached)
     * @param {string} selector - CSS selector
     * @returns {NodeList}
     */
    getAll(selector) {
        const cacheKey = `all:${selector}`;
        if (!this.elements.has(cacheKey)) {
            const elements = document.querySelectorAll(selector);
            this.elements.set(cacheKey, elements);
        }
        return this.elements.get(cacheKey);
    }
    
    /**
     * Clear cache (useful when DOM structure changes)
     */
    clear() {
        this.elements.clear();
    }
    
    /**
     * Pre-cache commonly used elements
     */
    preload() {
        if (this.initialized) return;
        
        // Cache common selectors
        Object.values(APP_CONFIG.SELECTORS).forEach(selector => {
            this.get(selector);
        });
        
        // Cache tab-related elements
        this.getAll('.tab-button');
        this.getAll('.tab-content');
        
        this.initialized = true;
    }
}

// ============================================
// UNIFIED TAB MANAGER
// ============================================

class TabManager {
    constructor(domCache) {
        this.cache = domCache;
        this.activeTabMap = new Map(); // Track active tabs per group
    }
    
    /**
     * Generic tab switching with consistent behavior
     * @param {string} tabName - Tab to activate
     * @param {string} containerPrefix - Container prefix for content
     * @param {string} group - Tab group name (optional)
     */
    showTab(tabName, containerPrefix, group = 'main') {
        // Hide all tabs in group
        this.hideAllTabs(containerPrefix);
        
        // Remove active states from all tab buttons
        this.clearActiveStates(containerPrefix);
        
        // Show selected tab content
        const contentId = `${containerPrefix}-${tabName}`;
        const content = this.cache.get(`#${contentId}`);
        if (content) {
            content.classList.remove('hidden');
        }
        
        // Set active state on button
        const buttonSelector = `[onclick*="${tabName}"]`;
        const button = this.cache.get(buttonSelector);
        if (button) {
            button.classList.add('active');
        }
        
        // Track active tab
        this.activeTabMap.set(group, tabName);
        
        // Custom callback for specific tab logic
        this.onTabChange(tabName, containerPrefix, group);
    }
    
    /**
     * Hide all tab content in a container group
     * @param {string} containerPrefix 
     */
    hideAllTabs(containerPrefix) {
        const contentElements = this.cache.getAll(`[id^="${containerPrefix}-"]`);
        contentElements.forEach(element => {
            element.classList.add('hidden');
        });
    }
    
    /**
     * Clear active states from tab buttons
     * @param {string} containerPrefix 
     */
    clearActiveStates(containerPrefix) {
        const buttons = this.cache.getAll('.tab-button, .nav-button');
        buttons.forEach(button => {
            button.classList.remove('active', 'bg-vybe-purple', 'text-white');
            button.classList.add('text-vybe-gray-400');
        });
    }
    
    /**
     * Get currently active tab for a group
     * @param {string} group 
     * @returns {string|null}
     */
    getActiveTab(group = 'main') {
        return this.activeTabMap.get(group);
    }
    
    /**
     * Custom logic hook for specific tab behaviors
     * @param {string} tabName 
     * @param {string} containerPrefix 
     * @param {string} group 
     */
    onTabChange(tabName, containerPrefix, group) {
        // Override in specific implementations
        console.log(`Tab changed: ${group}/${tabName}`);
    }
}

// ============================================
// FORM UTILITIES
// ============================================

class FormUtils {
    static validateInput(input, type) {
        const validators = {
            email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            url: (val) => {
                try { new URL(val); return true; } catch { return false; }
            },
            text: (val) => val.length > 0 && val.length <= 1000,
            price: (val) => !isNaN(val) && parseFloat(val) >= 0
        };
        
        const validator = validators[type];
        return validator ? validator(input) : true;
    }
    
    static sanitizeInput(input) {
        return input.replace(/[<>\"'&]/g, '');
    }
    
    static formatPrice(amount) {
        return `$${amount}`;
    }
    
    static formatDuration(minutes) {
        return minutes >= 60 ? 
            `${Math.floor(minutes / 60)}h ${minutes % 60}m` : 
            `${minutes}m`;
    }
}

// ============================================
// STATE MANAGEMENT
// ============================================

class AppState {
    constructor() {
        this.state = {
            currentPage: 'home',
            selectedSession: null,
            selectedDate: null,
            selectedTime: null,
            user: null
        };
        this.listeners = new Map();
    }
    
    /**
     * Update state and notify listeners
     * @param {string} key 
     * @param {any} value 
     */
    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        // Notify listeners
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => {
                callback(value, oldValue, key);
            });
        }
    }
    
    /**
     * Get state value
     * @param {string} key 
     * @returns {any}
     */
    getState(key) {
        return this.state[key];
    }
    
    /**
     * Subscribe to state changes
     * @param {string} key 
     * @param {Function} callback 
     */
    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }
    
    /**
     * Get all state (for debugging)
     */
    getFullState() {
        return { ...this.state };
    }
}

// ============================================
// TEMPLATE SYSTEM
// ============================================

class TemplateRenderer {
    /**
     * Render session type card
     * @param {Object} session 
     * @param {boolean} isSelected 
     */
    static sessionCard(session, isSelected = false) {
        const activeClass = isSelected ? 'border-vybe-purple bg-vybe-purple/10' : 'border-vybe-gray-700';
        
        return `
            <div class="session-card p-6 rounded-xl border-2 cursor-pointer transition-all ${activeClass}"
                 data-session="${session.name}" 
                 onclick="selectSession('${session.name}')">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold text-white">${session.name}</h3>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-vybe-purple">${FormUtils.formatPrice(session.price)}</div>
                        <div class="text-sm text-vybe-gray-400">${FormUtils.formatDuration(session.duration)}</div>
                    </div>
                </div>
                <p class="text-vybe-gray-300 mb-4">${session.description}</p>
                <ul class="space-y-2">
                    ${session.features.map(feature => `
                        <li class="flex items-center gap-2 text-sm text-vybe-gray-400">
                            <div class="w-1.5 h-1.5 bg-vybe-purple rounded-full"></div>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    /**
     * Render success message
     * @param {string} message 
     */
    static successMessage(message) {
        return `
            <div class="fixed top-4 right-4 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-300 z-50">
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>${message}</span>
                </div>
            </div>
        `;
    }
}

// ============================================
// MAIN APPLICATION CLASS
// ============================================

class VybeApp {
    constructor() {
        this.cache = new DOMCache();
        this.tabManager = new TabManager(this.cache);
        this.state = new AppState();
        this.initialized = false;
    }
    
    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;
        
        // Pre-load DOM cache
        this.cache.preload();
        
        // Set up global event listeners
        this.setupEventListeners();
        
        // Initialize components
        this.initializeComponents();
        
        // Set initial state
        this.state.setState('currentPage', 'home');
        
        this.initialized = true;
        console.log('✅ VybeApp initialized successfully');
    }
    
    /**
     * Set up global event listeners
     */
    setupEventListeners() {
        // Global click handler for better performance
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // State change listeners
        this.state.subscribe('currentPage', (page) => {
            console.log(`Page changed to: ${page}`);
        });
    }
    
    /**
     * Global click handler with delegation
     * @param {Event} event 
     */
    handleGlobalClick(event) {
        const target = event.target.closest('[data-action]');
        if (target) {
            const action = target.dataset.action;
            const data = target.dataset;
            this.handleAction(action, data, target);
        }
    }
    
    /**
     * Handle actions from data attributes
     * @param {string} action 
     * @param {Object} data 
     * @param {Element} element 
     */
    handleAction(action, data, element) {
        const actions = {
            'select-session': () => this.selectSession(data.session),
            'show-tab': () => this.tabManager.showTab(data.tab, data.container || 'page'),
            'toggle-dropdown': () => this.toggleDropdown(data.target),
            'save-settings': () => this.saveSettings()
        };
        
        const handler = actions[action];
        if (handler) {
            handler();
        } else {
            console.warn(`Unknown action: ${action}`);
        }
    }
    
    /**
     * Initialize components
     */
    initializeComponents() {
        // Initialize any component-specific logic
        this.initializeBooking();
        this.initializeFilters();
    }
    
    /**
     * Initialize booking system
     */
    initializeBooking() {
        // Set up session types
        this.renderSessionTypes();
    }
    
    /**
     * Render session types using template
     */
    renderSessionTypes() {
        const container = this.cache.get('#session-types-container');
        if (!container) return;
        
        const html = SESSION_TYPES.map(session => 
            TemplateRenderer.sessionCard(session, false)
        ).join('');
        
        container.innerHTML = html;
    }
    
    /**
     * Select session (replaces multiple similar functions)
     * @param {string} sessionName 
     */
    selectSession(sessionName) {
        const session = SESSION_TYPES.find(s => s.name === sessionName);
        if (!session) return;
        
        this.state.setState('selectedSession', session);
        
        // Update UI
        this.updateSessionSelection(session);
    }
    
    /**
     * Update session selection UI
     * @param {Object} session 
     */
    updateSessionSelection(session) {
        // Remove previous selections
        const cards = this.cache.getAll('.session-card');
        cards.forEach(card => {
            card.classList.remove('border-vybe-purple', 'bg-vybe-purple/10');
            card.classList.add('border-vybe-gray-700');
        });
        
        // Highlight selected card
        const selectedCard = this.cache.get(`[data-session="${session.name}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('border-vybe-gray-700');
            selectedCard.classList.add('border-vybe-purple', 'bg-vybe-purple/10');
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Clear cache on resize as layout may change
        this.cache.clear();
        this.cache.preload();
    }
    
    /**
     * Show success message with automatic dismiss
     * @param {string} message 
     */
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.innerHTML = TemplateRenderer.successMessage(message);
        document.body.appendChild(successDiv.firstElementChild);
        
        // Auto-dismiss
        setTimeout(() => {
            successDiv.firstElementChild?.remove();
        }, APP_CONFIG.TIMING.SUCCESS_DISPLAY);
    }
}

// ============================================
// GLOBAL INITIALIZATION
// ============================================

// Create global app instance
window.vybeApp = new VybeApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.vybeApp.init());
} else {
    window.vybeApp.init();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VybeApp, TabManager, DOMCache, AppState, FormUtils, TemplateRenderer };
}