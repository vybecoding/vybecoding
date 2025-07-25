/**
 * @fileoverview Navigation module for VybeCoding demo
 * @module navigation
 */

import { EventEmitter, waitForElement } from './utils.js';

/**
 * Navigation manager class that handles page routing, mobile menu, and browser history
 * @extends EventEmitter
 * @fires NavigationManager#navigate:start
 * @fires NavigationManager#navigate:complete
 * @fires NavigationManager#mobile-menu:open
 * @fires NavigationManager#mobile-menu:close
 * @example
 * const nav = new NavigationManager({
 *   mobileBreakpoint: 768,
 *   enableHistory: true
 * });
 * nav.on('navigate:complete', ({ page }) => {
 *   console.log(`Navigated to ${page}`);
 * });
 */
export class NavigationManager extends EventEmitter {
    /**
     * Create a navigation manager
     * @param {import('../types.js').NavigationOptions} options - Configuration options
     */
    constructor(options = {}) {
        super();
        this.currentPage = 'home';
        this.options = {
            mobileBreakpoint: 1024,
            ...options
        };
        this.init();
    }
    
    /**
     * Initialize navigation
     * @private
     */
    async init() {
        try {
            await this.setupEventListeners();
            this.setupMobileMenu();
            this.setupResponsive();
            
            // Load initial page based on URL hash
            this.loadInitialPage();
            
            this.emit('ready');
        } catch (error) {
            console.error('Navigation initialization failed:', error);
        }
    }
    
    /**
     * Load initial page based on URL hash
     * @private
     */
    loadInitialPage() {
        const hash = window.location.hash.slice(1); // Remove #
        const page = hash || 'home';
        
        // Set current page and load content without updating URL
        this.currentPage = page;
        this.loadPageContent(page);
        this.updateNavigationState(page);
    }
    
    /**
     * Setup navigation event listeners
     * @private
     */
    async setupEventListeners() {
        // Wait for navigation elements
        const nav = await waitForElement('nav');
        
        // Setup navigation link clicks on nav
        nav.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-navigate]');
            if (navLink) {
                e.preventDefault();
                const page = navLink.dataset.navigate;
                this.navigateTo(page);
            }
        });
        
        // Also setup global navigation for data-navigate links (e.g., in footer)
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-navigate]');
            if (navLink && !nav.contains(navLink)) { // If not already handled by nav
                e.preventDefault();
                const page = navLink.dataset.navigate;
                this.navigateTo(page);
            }
        });
        
        // Setup popstate for browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page, { pushState: false });
            }
        });
    }
    
    /**
     * Setup mobile menu functionality
     * @private
     */
    setupMobileMenu() {
        const toggleButton = document.querySelector('[onclick*="toggleMobileMenu"]');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (toggleButton && mobileMenu) {
            // Remove inline onclick and use proper event listener
            toggleButton.removeAttribute('onclick');
            toggleButton.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    /**
     * Setup responsive behavior
     * @private
     */
    setupResponsive() {
        const mediaQuery = window.matchMedia(`(min-width: ${this.options.mobileBreakpoint}px)`);
        
        const handleResize = (e) => {
            if (e.matches) {
                // Desktop view - ensure mobile menu is closed
                this.closeMobileMenu();
            }
        };
        
        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery); // Initial check
    }
    
    /**
     * Navigate to a page
     * @param {string} page - Page identifier
     * @param {Object} options - Navigation options
     */
    async navigateTo(page, options = {}) {
        const { pushState = true } = options;
        
        if (page === this.currentPage) return;
        
        this.emit('navigate:start', { from: this.currentPage, to: page });
        
        // Update current page
        this.currentPage = page;
        
        // Load page content
        await this.loadPageContent(page);
        
        // Update URL if needed
        if (pushState) {
            const url = page === 'home' ? '/' : `/#${page}`;
            history.pushState({ page }, '', url);
        }
        
        // Update navigation state
        this.updateNavigationState(page);
        
        // Close mobile menu
        this.closeMobileMenu();
        
        // Ensure dashboard tabs are properly restored
        if (page === 'dashboard') {
            this.ensureDashboardTabsActivated();
        }
        
        this.emit('navigate:complete', { page });
    }
    
    /**
     * Load page content
     * @param {string} page - Page identifier
     * @private
     */
    async loadPageContent(page) {
        try {
            // Add cache-busting parameter to ensure fresh content
            const timestamp = Date.now();
            const pagePath = `pages/${page}.html?v=${timestamp}`;
            const response = await fetch(pagePath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${pagePath}: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Update main content container
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                // Create or update dynamic content container
                let dynamicContent = document.getElementById('dynamic-content');
                if (!dynamicContent) {
                    dynamicContent = document.createElement('div');
                    dynamicContent.id = 'dynamic-content';
                    dynamicContent.className = 'page active';
                    mainContent.appendChild(dynamicContent);
                }
                
                dynamicContent.innerHTML = content;
                dynamicContent.classList.add('active');
                
                // Initialize page-specific functionality
                this.initializePage(page);
                
                // Trigger main app page initialization
                if (window.vybeApp && typeof window.vybeApp.initializePageModules === 'function') {
                    window.vybeApp.initializePageModules(page);
                }
                
                // Ensure dashboard tabs are activated if this is the dashboard page
                if (page === 'dashboard') {
                    this.ensureDashboardTabsActivated();
                }
            }
        } catch (error) {
            console.error(`Error loading page ${page}:`, error);
            this.showErrorPage(page);
        }
    }
    
    /**
     * Initialize page-specific functionality
     * @param {string} page - Page identifier
     * @private
     */
    initializePage(page) {
        // Add page-specific body classes
        document.body.className = document.body.className.replace(/page-\w+/g, '');
        document.body.classList.add(`page-${page}`);
        
        // Initialize any page-specific scripts or components
        // This can be extended for page-specific initialization
    }
    
    /**
     * Show error page
     * @param {string} page - Page that failed to load
     * @private
     */
    showErrorPage(page) {
        const errorContent = `
            <div class="error-container p-8 text-center">
                <h2 class="text-xl font-bold text-red-400 mb-4">Content Not Found</h2>
                <p class="text-gray-400">Could not load: pages/${page}.html</p>
                <button onclick="window.vybeApp.getNavigation().navigateTo('home')" class="mt-4 px-4 py-2 bg-vybe-purple rounded text-white">
                    Return Home
                </button>
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            let dynamicContent = document.getElementById('dynamic-content');
            if (!dynamicContent) {
                dynamicContent = document.createElement('div');
                dynamicContent.id = 'dynamic-content';
                dynamicContent.className = 'page active';
                mainContent.appendChild(dynamicContent);
            }
            dynamicContent.innerHTML = errorContent;
        }
    }
    
    /**
     * Update navigation active states
     * @param {string} activePage - Active page identifier
     * @private
     */
    updateNavigationState(activePage) {
        // Update navigation links
        document.querySelectorAll('[data-navigate]').forEach(link => {
            const page = link.dataset.navigate;
            if (page === activePage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
        
        // Store current page for dashboard tab handling
        this.currentPage = activePage;
    }
    
    /**
     * Ensure dashboard navigation link stays active when dashboard tabs change
     * This should be called whenever dashboard tabs are switched
     */
    ensureDashboardActive() {
        if (this.currentPage === 'dashboard') {
            const dashboardLink = document.querySelector('[data-navigate="dashboard"]');
            if (dashboardLink && !dashboardLink.classList.contains('active')) {
                dashboardLink.classList.add('active');
                dashboardLink.setAttribute('aria-current', 'page');
            }
        }
    }
    
    /**
     * Ensure dashboard tabs are properly activated after navigation
     * This fixes issues where tab highlighting gets stuck
     */
    ensureDashboardTabsActivated() {
        setTimeout(() => {
            const savedTab = sessionStorage.getItem('dashboardTab') || 'profile';
            const activeTab = document.querySelector('.dashboard-tab.active');
            
            // If the active tab doesn't match saved state, fix it
            if (!activeTab || activeTab.dataset.tab !== savedTab) {
                // Use the global function to properly switch tabs
                if (typeof window.showDashboardTab === 'function') {
                    window.showDashboardTab(savedTab);
                }
            }
        }, 100);
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    /**
     * Open mobile menu
     */
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const toggleButton = document.querySelector('[onclick*="toggleMobileMenu"], .mobile-menu-button');
        
        mobileMenu.classList.remove('hidden');
        toggleButton?.setAttribute('aria-expanded', 'true');
        
        this.emit('mobile-menu:open');
    }
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const toggleButton = document.querySelector('[onclick*="toggleMobileMenu"], .mobile-menu-button');
        
        mobileMenu.classList.add('hidden');
        toggleButton?.setAttribute('aria-expanded', 'false');
        
        this.emit('mobile-menu:close');
    }
    
    /**
     * Ensure dashboard tabs are properly activated with modern styling
     * @private
     */
    ensureDashboardTabsActivated() {
        // Wait a moment for DOM to be ready
        setTimeout(() => {
            // First check main dashboard tabs
            const activeDashboardTab = document.querySelector('.dashboard-tab.active');
            if (!activeDashboardTab) {
                // No active dashboard tab, restore from session or set default
                const savedTab = sessionStorage.getItem('dashboardTab') || 'profile';
                const targetTab = document.querySelector(`.dashboard-tab[data-tab="${savedTab}"]`);
                if (targetTab) {
                    // Remove active from all tabs first
                    document.querySelectorAll('.dashboard-tab').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    // Add active to the target tab
                    targetTab.classList.add('active');
                    console.log('✅ Dashboard tab restored:', savedTab);
                    
                    // Show the corresponding content
                    document.querySelectorAll('.dashboard-tab-content').forEach(content => {
                        content.classList.add('hidden');
                    });
                    const tabContent = document.getElementById(`dashboard-${savedTab}-content`);
                    if (tabContent) {
                        tabContent.classList.remove('hidden');
                    }
                    
                    // Trigger the tab function
                    if (typeof window.showDashboardTab === 'function') {
                        window.showDashboardTab(savedTab);
                    }
                }
            }
            
            // If overview tab is active, ensure sub-section is also active
            const activeTab = document.querySelector('.dashboard-tab.active');
            if (activeTab && activeTab.dataset.tab === 'overview') {
                setTimeout(() => {
                    const activeOverviewBtn = document.querySelector('.overview-section-btn.active');
                    if (!activeOverviewBtn) {
                        const earningsBtn = document.querySelector('.overview-section-btn[data-section="earnings"]');
                        if (earningsBtn) {
                            earningsBtn.classList.add('active');
                            console.log('✅ Overview section activated: earnings');
                        }
                    }
                }, 50);
            }
        }, 200);
    }
    
    /**
     * Get current page
     * @returns {string} Current page identifier
     */
    getCurrentPage() {
        return this.currentPage;
    }
}