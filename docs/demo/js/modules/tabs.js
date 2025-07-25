/**
 * @fileoverview Tab management module for VybeCoding demo
 * @module tabs
 */

import { EventEmitter } from './utils.js';

/**
 * Tab manager class for handling tabbed interfaces
 */
export class TabManager extends EventEmitter {
    /**
     * @param {string} containerSelector - Container selector for tabs
     * @param {Object} options - Configuration options
     */
    constructor(containerSelector, options = {}) {
        super();
        this.container = document.querySelector(containerSelector);
        this.options = {
            tabSelector: '.tab-button',
            contentSelector: '.tab-content',
            activeClass: 'active',
            hiddenClass: 'hidden',
            ...options
        };
        this.currentTab = null;
        this.init();
    }
    
    /**
     * Initialize tab functionality
     * @private
     */
    init() {
        if (!this.container) {
            console.warn(`Tab container not found: ${this.containerSelector}`);
            return;
        }
        
        this.setupEventListeners();
        this.activateFirstTab();
    }
    
    /**
     * Setup event listeners for tabs
     * @private
     */
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const tabButton = e.target.closest(this.options.tabSelector);
            if (tabButton) {
                e.preventDefault();
                const tabId = tabButton.dataset.tab;
                if (tabId) {
                    this.activateTab(tabId);
                }
            }
        });
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            const tabButton = e.target.closest(this.options.tabSelector);
            if (tabButton && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const tabId = tabButton.dataset.tab;
                if (tabId) {
                    this.activateTab(tabId);
                }
            }
        });
    }
    
    /**
     * Activate the first tab if no tab is active
     * @private
     */
    activateFirstTab() {
        const activeTab = this.container.querySelector(`${this.options.tabSelector}.${this.options.activeClass}`);
        if (!activeTab) {
            const firstTab = this.container.querySelector(this.options.tabSelector);
            if (firstTab && firstTab.dataset.tab) {
                this.activateTab(firstTab.dataset.tab);
            }
        }
    }
    
    /**
     * Activate a specific tab
     * @param {string} tabId - Tab identifier
     */
    activateTab(tabId) {
        if (tabId === this.currentTab && this.container.querySelector(`${this.options.tabSelector}[data-tab="${tabId}"].${this.options.activeClass}`)) {
            // Tab is already active and has the active class, no need to re-activate
            return;
        }
        
        this.emit('tab:before-change', { from: this.currentTab, to: tabId });
        
        // Deactivate all tabs
        this.deactivateAllTabs();
        
        // Activate target tab
        const tabButton = this.container.querySelector(`${this.options.tabSelector}[data-tab="${tabId}"]`);
        const tabContent = this.container.querySelector(`${this.options.contentSelector}[data-tab="${tabId}"]`) ||
                          this.container.querySelector(`${this.options.contentSelector}[data-tab-content="${tabId}"]`) ||
                          document.getElementById(`${tabId}-content`) ||
                          document.getElementById(`dashboard-${tabId}-content`);
        
        if (tabButton) {
            tabButton.classList.add(this.options.activeClass);
            tabButton.setAttribute('aria-selected', 'true');
            tabButton.setAttribute('tabindex', '0');
            
            // Force style recalculation to ensure active state is visible
            tabButton.offsetHeight;
        }
        
        if (tabContent) {
            tabContent.classList.remove(this.options.hiddenClass);
            tabContent.setAttribute('aria-hidden', 'false');
        }
        
        this.currentTab = tabId;
        
        // Ensure dashboard navigation link stays active when dashboard tabs change
        if (this.container.classList.contains('dashboard-tabs') || 
            this.container.querySelector('.dashboard-tab')) {
            if (window.vybeApp && window.vybeApp.navigation) {
                window.vybeApp.navigation.ensureDashboardActive();
            }
        }
        
        this.emit('tab:changed', { tab: tabId });
    }
    
    /**
     * Deactivate all tabs
     * @private
     */
    deactivateAllTabs() {
        // Deactivate tab buttons
        this.container.querySelectorAll(this.options.tabSelector).forEach(tab => {
            tab.classList.remove(this.options.activeClass);
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        // Hide tab contents
        this.container.querySelectorAll(this.options.contentSelector).forEach(content => {
            content.classList.add(this.options.hiddenClass);
            content.setAttribute('aria-hidden', 'true');
        });
        
        // Also check for dashboard-specific content
        document.querySelectorAll('.dashboard-tab-content').forEach(content => {
            content.classList.add(this.options.hiddenClass);
        });
    }
    
    /**
     * Get current active tab
     * @returns {string|null} Current tab identifier
     */
    getCurrentTab() {
        return this.currentTab;
    }
    
    /**
     * Check if a tab exists
     * @param {string} tabId - Tab identifier
     * @returns {boolean} True if tab exists
     */
    hasTab(tabId) {
        const tabButton = this.container.querySelector(`${this.options.tabSelector}[data-tab="${tabId}"]`);
        return !!tabButton;
    }
}

/**
 * Dashboard-specific tab functionality
 */
export class DashboardTabs extends TabManager {
    constructor() {
        super('.dashboard-tabs', {
            tabSelector: '.dashboard-tab',
            contentSelector: '.dashboard-tab-content'
        });
    }
    
    /**
     * Override init to prevent setting up click listeners
     * Dashboard tabs use onclick handlers instead
     */
    init() {
        if (!this.container) {
            console.warn(`Tab container not found: .dashboard-tabs`);
            return;
        }
        
        // Don't setup event listeners for dashboard tabs
        // They use onclick handlers instead
        // Also don't activate first tab - let the main.js handle initial state
        
        this.emit('ready');
    }
    
    /**
     * Show specific dashboard tab
     * @param {string} tabName - Tab name (overview, mentorship, etc.)
     */
    showDashboardTab(tabName) {
        this.activateTab(tabName);
        
        // Ensure dashboard navigation link stays active
        if (window.vybeApp && window.vybeApp.navigation) {
            window.vybeApp.navigation.ensureDashboardActive();
        }
        
        // Handle special tab initialization
        if (tabName === 'overview') {
            // Ensure overview section is properly initialized
            setTimeout(() => {
                // Check if overview section function exists
                if (typeof window.showOverviewSection === 'function') {
                    // Check if any overview section is active
                    const activeOverviewBtn = document.querySelector('.overview-section-btn.active');
                    if (!activeOverviewBtn) {
                        // Default to earnings section
                        window.showOverviewSection('earnings');
                    }
                } else {
                    // Fallback: manually activate earnings section
                    const earningsBtn = document.querySelector('.overview-section-btn[data-section="earnings"]');
                    const analyticsBtn = document.querySelector('.overview-section-btn[data-section="analytics"]');
                    
                    if (earningsBtn) {
                        // Remove active from all buttons first
                        document.querySelectorAll('.overview-section-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        // Add active to earnings button
                        earningsBtn.classList.add('active');
                        
                        // Show earnings content, hide analytics
                        const earningsContent = document.getElementById('earnings-content');
                        const analyticsContent = document.getElementById('analytics-content');
                        if (earningsContent) earningsContent.classList.remove('hidden');
                        if (analyticsContent) analyticsContent.classList.add('hidden');
                    }
                }
            }, 50);
        }
    }
}

/**
 * Profile-specific tab functionality
 */
export class ProfileTabs extends TabManager {
    constructor() {
        super('.profile-tabs', {
            tabSelector: '.profile-tab',
            contentSelector: '.profile-tab-content'
        });
    }
    
    /**
     * Show specific profile tab
     * @param {string} tabName - Tab name (info, booking, etc.)
     */
    showProfileTab(tabName) {
        this.activateTab(tabName);
    }
}