/**
 * VybeCoding Demo - Page Loader Framework
 * AI-optimized modular content loading system
 */

class PageLoader {
    constructor() {
        this.currentPage = 'home';
        this.currentTab = null;
        this.contentCache = new Map();
        this.dataCache = new Map();
        this.init();
    }

    init() {
        // Initialize navigation event listeners
        this.setupNavigation();
        // Load initial page
        this.loadInitialPage();
    }

    /**
     * Main navigation function - replaces showPage()
     */
    async navigateTo(section, subsection = null) {
        try {
            console.log(`Navigating to: ${section}${subsection ? '/' + subsection : ''}`);
            
            // Update current page tracking
            this.currentPage = section;
            this.currentTab = subsection;
            
            // Determine file path
            const pagePath = this.getPagePath(section, subsection);
            
            // Load content
            const content = await this.loadContent(pagePath);
            
            // Check if home page failed to load (null return)
            if (content === null && section === 'home') {
                this.showWelcomePage();
                return;
            }
            
            // Update page container
            this.updatePageContainer(content);
            
            // Update URL and navigation state
            this.updateURL(section, subsection);
            this.updateNavigationState(section, subsection);
            
            // Page-specific initialization
            this.initializePage(section, subsection);
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.showErrorPage();
        }
    }

    /**
     * Get file path for page/tab content
     */
    getPagePath(section, subsection) {
        if (subsection) {
            // Tab content: pages/section/section-subsection.html
            return `pages/${section}/${section}-${subsection}.html`;
        } else {
            // Main page: pages/section.html
            return `pages/${section}.html`;
        }
    }

    /**
     * Load content with caching
     */
    async loadContent(path) {
        console.log(`Loading content from: ${path}`);
        
        // Check cache first
        if (this.contentCache.has(path)) {
            console.log(`Content loaded from cache: ${path}`);
            return this.contentCache.get(path);
        }

        try {
            const response = await fetch(path);
            console.log(`Fetch response for ${path}:`, response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
            }
            
            const content = await response.text();
            console.log(`Content loaded successfully: ${path} (${content.length} chars)`);
            
            // Cache the content
            this.contentCache.set(path, content);
            
            return content;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            
            // If it's the home page that failed, show welcome fallback
            if (path === 'pages/home.html') {
                console.log('Home page failed to load, showing welcome fallback');
                return null; // Signal to use welcome page
            }
            
            return this.getErrorContent(path);
        }
    }

    /**
     * Update main content container
     */
    updatePageContainer(content) {
        const container = document.getElementById('main-content') || document.body;
        
        // Hide all existing pages first
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Create or update content container
        let contentDiv = document.getElementById('dynamic-content');
        if (!contentDiv) {
            contentDiv = document.createElement('div');
            contentDiv.id = 'dynamic-content';
            contentDiv.className = 'page active';
            container.appendChild(contentDiv);
        }
        
        contentDiv.innerHTML = content;
        contentDiv.classList.add('active');
        
        // Initialize tabs after content is loaded
        if (typeof initializeTabs === 'function') {
            setTimeout(initializeTabs, 100);
        }
        
        // Add nebula elements after content is loaded
        if (typeof window.addNebulaElements === 'function') {
            setTimeout(window.addNebulaElements, 50);
        }
    }

    /**
     * Load JSON data with caching
     */
    async loadJSON(path) {
        if (this.dataCache.has(path)) {
            return this.dataCache.get(path);
        }

        try {
            const response = await fetch(path);
            const data = await response.json();
            this.dataCache.set(path, data);
            return data;
        } catch (error) {
            console.error(`Error loading JSON ${path}:`, error);
            return {};
        }
    }

    /**
     * Content consistency - load card content
     */
    async loadCardContent(cardId, contentType) {
        try {
            const mapping = await this.loadJSON('data/card-mappings.json');
            if (!mapping[contentType] || !mapping[contentType][cardId]) {
                throw new Error(`No mapping found for ${contentType}/${cardId}`);
            }
            
            const dataSource = mapping[contentType][cardId].data_source;
            const [file, id] = dataSource.split('#');
            const data = await this.loadJSON(`data/${file}`);
            
            return data[id];
        } catch (error) {
            console.error('Error loading card content:', error);
            return null;
        }
    }

    /**
     * Setup navigation event listeners
     */
    setupNavigation() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-navigate]');
            if (target) {
                e.preventDefault();
                const [section, subsection] = target.dataset.navigate.split('/');
                this.navigateTo(section, subsection);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.navigateTo(e.state.section, e.state.subsection);
            }
        });
    }

    /**
     * Update URL without page reload
     */
    updateURL(section, subsection) {
        const url = subsection ? `#${section}/${subsection}` : `#${section}`;
        const state = { section, subsection };
        
        if (window.location.hash !== url) {
            window.history.pushState(state, '', url);
        }
    }

    /**
     * Update navigation visual state
     */
    updateNavigationState(section, subsection) {
        // Remove active classes from all nav items
        document.querySelectorAll('.nav-item, .tab-button').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current nav item
        const navItem = document.querySelector(`[data-navigate="${section}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        if (subsection) {
            const tabItem = document.querySelector(`[data-navigate="${section}/${subsection}"]`);
            if (tabItem) {
                tabItem.classList.add('active');
            }
        }
    }

    /**
     * Page-specific initialization
     */
    initializePage(section, subsection) {
        // Add page-specific body classes for styling
        document.body.className = document.body.className.replace(/page-\w+/g, '');
        document.body.classList.add(`page-${section}`);
        
        if (subsection) {
            document.body.classList.add(`page-${section}-${subsection}`);
        }

        // Initialize page-specific functionality
        switch (section) {
            case 'guides':
                this.initializeGuidesPage(subsection);
                break;
            case 'apps':
                this.initializeAppsPage(subsection);
                break;
            case 'dashboard':
                this.initializeDashboardPage(subsection);
                break;
            case 'profile':
                this.initializeProfilePage(subsection);
                break;
        }
    }

    /**
     * Page-specific initializers
     */
    initializeGuidesPage(tab) {
        if (tab === 'submit') {
            this.initializeGuideSubmissionForm();
        }
    }

    initializeAppsPage(tab) {
        if (tab === 'submit') {
            this.initializeAppSubmissionForm();
        }
    }

    initializeDashboardPage(tab) {
        // Initialize dashboard-specific functionality
    }

    initializeProfilePage(tab) {
        if (tab === 'booking') {
            this.initializeBookingInterface();
        }
    }

    initializeGuideSubmissionForm() {
        // Form validation and submission logic
    }

    initializeAppSubmissionForm() {
        // Form validation and submission logic
    }

    initializeBookingInterface() {
        // Calendar and booking logic
    }

    /**
     * Load initial page based on URL hash
     */
    loadInitialPage() {
        const hash = window.location.hash.slice(1); // Remove #
        if (hash) {
            const [section, subsection] = hash.split('/');
            this.navigateTo(section, subsection);
        } else {
            // Load the actual home page content
            this.navigateTo('home');
        }
    }

    /**
     * Show welcome page for local testing
     */
    showWelcomePage() {
        const welcomeContent = `
            <div class="page active">
                <div class="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 pb-4">
                    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <div class="animate-fade-in">
                            <h1 class="text-5xl md:text-7xl font-light mb-6 leading-tight">
                                <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-medium">vybecoding.ai</span>
                            </h1>
                            <p class="text-3xl md:text-5xl text-gray-300 font-light mb-8">
                                Where <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">vibe coding</span> meets<br>
                                <span class="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">context engineering</span>.
                            </p>
                            <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Transform your development workflow with AI-powered tools, expert guidance, and a vibrant community of developers.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button onclick="pageLoader.navigateTo('guides')" class="px-10 py-3 text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                                    Explore Guides
                                </button>
                                <button onclick="pageLoader.navigateTo('apps')" class="px-10 py-3 text-lg border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300">
                                    Browse Apps
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.updatePageContainer(welcomeContent);
        this.updateNavigationState('home');
        document.body.classList.add('page-home');
    }

    /**
     * Error handling
     */
    getErrorContent(path) {
        return `
            <div class="error-container p-8 text-center">
                <h2 class="text-xl font-bold text-red-400 mb-4">Content Not Found</h2>
                <p class="text-gray-400">Could not load: ${path}</p>
                <button onclick="pageLoader.navigateTo('home')" class="mt-4 px-4 py-2 bg-vybe-purple rounded">
                    Return Home
                </button>
            </div>
        `;
    }

    showErrorPage() {
        this.updatePageContainer(this.getErrorContent('Unknown error'));
    }
}

// Legacy function compatibility - maintain old function names
window.showPage = (pageName) => pageLoader.navigateTo(pageName);
window.showGuidesTab = (tabName) => pageLoader.navigateTo('guides', tabName);
window.showAppsTab = (tabName) => pageLoader.navigateTo('apps', tabName);
window.showDashboardTab = (tabName) => pageLoader.navigateTo('dashboard', tabName);
window.showProfileTab = (tabName) => pageLoader.navigateTo('profile', tabName);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add nebula elements to all nebula-background containers
    function addNebulaElements() {
        const nebulaContainers = document.querySelectorAll('.nebula-background');
        nebulaContainers.forEach(container => {
            // Check if elements already exist to avoid duplicates
            if (!container.querySelector('.nebula-middle')) {
                // Add middle nebula
                const middleNebula = document.createElement('div');
                middleNebula.className = 'nebula-middle';
                container.appendChild(middleNebula);
                
                // Add bottom nebula
                const bottomNebula = document.createElement('div');
                bottomNebula.className = 'nebula-bottom';
                container.appendChild(bottomNebula);
            }
        });
    }
    
    // Initialize nebula backgrounds
    addNebulaElements();
    
    // Also add to body if it has nebula-background class
    setTimeout(() => {
        const body = document.querySelector('body.nebula-background');
        if (body && !body.querySelector('.nebula-middle')) {
            const middleNebula = document.createElement('div');
            middleNebula.className = 'nebula-middle';
            middleNebula.style.pointerEvents = 'none';
            body.appendChild(middleNebula);
            
            const bottomNebula = document.createElement('div');
            bottomNebula.className = 'nebula-bottom';
            bottomNebula.style.pointerEvents = 'none';
            body.appendChild(bottomNebula);
        }
    }, 100);
    
    // Store the addNebulaElements function globally for page loader to use
    window.addNebulaElements = addNebulaElements;
    
    window.pageLoader = new PageLoader();
    
    // Make showAppDetail globally accessible for onclick handlers
    window.showAppDetail = function(category, appId, appSlug) {
        console.log('Showing app detail:', { category, appId, appSlug });
        
        // Navigate to appropriate detail page based on category
        if (category === 'members') {
            window.pageLoader.navigateTo('app-member-preview');
        } else if (category === 'vibe-coding' || category === 'native') {
            window.pageLoader.navigateTo('app-native-detail');
        } else {
            console.warn('Unknown app category:', category);
            alert(`App category "${category}" not yet implemented`);
        }
    };
    
    // Make showGuideDetail globally accessible for onclick handlers
    window.showGuideDetail = function(type) {
        console.log('Showing guide detail:', { type });
        // Navigate to guide detail page
        window.pageLoader.navigateTo('guide-detail');
        
        // TODO: In a real implementation, update content based on type
        // (free, premium-locked, etc.)
    };
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageLoader;
}