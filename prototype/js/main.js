/**
 * @fileoverview Main application entry point for vybecoding demo
 * @module main
 */

import { NavigationManager } from './modules/navigation.js';
import { DashboardTabs, ProfileTabs } from './modules/tabs.js';
import { LoadingManager } from './modules/loading.js';
import { globalErrorHandler, AppError, ErrorType, ErrorSeverity } from './modules/error-handler.js';
import { debounce } from './modules/utils.js';

/**
 * Main application class
 */
class VybeApp {
    constructor() {
        this.navigation = null;
        this.dashboardTabs = null;
        this.profileTabs = null;
        this.loading = null;
        this.errorHandler = globalErrorHandler;
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show loading state
            this.loading = new LoadingManager();
            this.loading.show('app-init', 'Initializing application...');
            
            await this.initializeModules();
            this.setupGlobalEventHandlers();
            this.setupLegacyFunctionSupport();
            this.setupErrorHandling();
            
            // Hide loading state
            this.loading.hide('app-init');
            console.log('✅ vybecoding demo initialized');
        } catch (error) {
            this.loading?.hide('app-init');
            this.errorHandler.handleError(
                new AppError(
                    'Failed to initialize application',
                    ErrorType.CLIENT,
                    ErrorSeverity.CRITICAL,
                    { originalError: error, userMessage: 'Application failed to start. Please refresh the page.' }
                )
            );
        }
    }
    
    /**
     * Initialize core modules
     * @private
     */
    async initializeModules() {
        try {
            // Initialize navigation with error handling
            this.navigation = new NavigationManager();
            await this.waitForNavigation();
            
            // Initialize tab managers when containers are available
            if (document.querySelector('.dashboard-tabs')) {
                this.dashboardTabs = new DashboardTabs();
            }
            
            if (document.querySelector('.profile-tabs')) {
                this.profileTabs = new ProfileTabs();
            }
            
            // Setup module communication
            this.setupModuleCommunication();
        } catch (error) {
            throw new AppError(
                'Module initialization failed',
                ErrorType.CLIENT,
                ErrorSeverity.HIGH,
                { originalError: error }
            );
        }
    }
    
    /**
     * Wait for navigation to be ready
     * @private
     */
    async waitForNavigation() {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Navigation initialization timeout'));
            }, 5000);
            
            this.navigation.on('ready', () => {
                clearTimeout(timeout);
                resolve();
            });
        });
    }
    
    /**
     * Setup communication between modules
     * @private
     */
    setupModuleCommunication() {
        // When navigation changes, initialize page-specific modules
        this.navigation.on('navigate:complete', ({ page }) => {
            this.initializePageModules(page);
        });
    }
    
    /**
     * Initialize page-specific modules after content loads
     * @param {string} page - Page identifier
     * @private
     */
    initializePageModules(page) {
        // Wait for DOM to be updated
        setTimeout(() => {
            if (page === 'dashboard') {
                // Initialize dashboard-specific functions FIRST
                this.initializeDashboardFunctions();
                
                // Initialize dashboard tabs if container exists
                const dashboardTabsContainer = document.querySelector('.dashboard-tabs');
                if (dashboardTabsContainer) {
                    // Always create a new instance when navigating to dashboard
                    // This ensures proper state after page reload
                    this.dashboardTabs = new DashboardTabs();
                    console.log('✅ Dashboard tabs initialized');
                    
                    // Always restore tab state when navigating to dashboard
                    const urlParams = new URLSearchParams(window.location.search);
                    const savedTab = sessionStorage.getItem('dashboardTab');
                    const requestedTab = urlParams.get('tab') || savedTab || 'profile';
                    
                    // Always show the requested tab to ensure proper state
                    this.dashboardTabs.showDashboardTab(requestedTab);
                }
            }
            
            if (page === 'profile') {
                // Initialize profile-specific functions
                this.initializeProfileFunctions();
                
                // Initialize profile tabs if container exists
                if (document.querySelector('.profile-tabs') && !this.profileTabs) {
                    this.profileTabs = new ProfileTabs();
                    console.log('✅ Profile tabs initialized');
                }
            }
        }, 100);
    }
    
    /**
     * Initialize dashboard-specific functions
     * @private
     */
    initializeDashboardFunctions() {
        console.log('Initializing dashboard functions...');

        // Function to load HTML content into a container
        const loadTabContent = async (containerId, filePath) => {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                } else {
                    console.error(`Container with ID ${containerId} not found.`);
                }
            } catch (error) {
                console.error(`Failed to load content from ${filePath}:`, error);
                // Optionally display an error message to the user
            }
        };

        // Overview section switching (Earnings/Analytics)
        window.showOverviewSection = async (section) => {
            console.log('Switching to overview section:', section);

            // Update tab styles
            document.querySelectorAll('.overview-section-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Set active tab
            const activeBtn = document.querySelector(`.overview-section-btn[data-section="${section}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            } else {
                console.warn('Button not found for section:', section);
            }

            // Load content dynamically
            await loadTabContent('overview-content-container', `/pages/dashboard/overview/${section}.html`);
        };

        // Settings section switching
        window.showSettingsSection = async (section) => {
            console.log('Switching to settings section:', section);

            // Update tab styles
            document.querySelectorAll('.settings-tab').forEach(btn => {
                btn.classList.remove('active');
            });

            // Set active tab
            const activeBtn = document.querySelector(`.settings-tab[data-section="${section}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            } else {
                console.warn('Button not found for section:', section);
            }

            // Load content dynamically
            await loadTabContent('settings-content-container', `/pages/dashboard/settings/${section}.html`);
        };

        // Initialize dashboard tab switching
        window.showDashboardTab = async (tabName) => {
            console.log('showDashboardTab called with:', tabName);

            // Always use the global app instance
            const app = window.vybeApp;
            if (!app) {
                console.error('VybeApp not found!');
                return;
            }

            // Save tab preference for navigation
            sessionStorage.setItem('dashboardTab', tabName);

            // Remove active class from all tabs
            document.querySelectorAll('.dashboard-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Add active class to target tab
            const targetTab = document.querySelector(`.dashboard-tab[data-tab="${tabName}"]`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Load content dynamically
            await loadTabContent('dashboard-content-container', `/pages/dashboard/${tabName}.html`);

            // Ensure dashboard navigation link stays active
            if (app.navigation) {
                app.navigation.ensureDashboardActive();
            }

            // If showing overview tab, ensure overview section is initialized
            if (tabName === 'overview') {
                requestAnimationFrame(() => {
                    const activeOverviewBtn = document.querySelector('.overview-section-btn.active');
                    if (!activeOverviewBtn) {
                        window.showOverviewSection('earnings');
                    }
                });
            } else if (tabName === 'settings') {
                requestAnimationFrame(() => {
                    const activeSettingsBtn = document.querySelector('.settings-tab.active');
                    if (!activeSettingsBtn) {
                        window.showSettingsSection('profile');
                    }
                });
            }
        };

        console.log('✅ Dashboard functions initialized');
    }

    /**
     * Initialize profile-specific functions
     * @private
     */
    initializeProfileFunctions() {
        // Function to load HTML content into a container
        const loadTabContent = async (containerId, filePath) => {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                } else {
                    console.error(`Container with ID ${containerId} not found.`);
                }
            } catch (error) {
                console.error(`Failed to load content from ${filePath}:`, error);
                // Optionally display an error message to the user
            }
        };

        // Profile tab switching
        window.showProfileTab = async (tabName) => {
            console.log('showProfileTab called with:', tabName);

            // Remove active class from all profile tabs
            document.querySelectorAll('.profile-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Add active class to target tab
            const targetTab = document.querySelector(`.profile-tab[data-tab="${tabName}"]`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Load content dynamically
            await loadTabContent('profile-content-container', `/pages/profile/${tabName}.html`);

            // Initialize booking calendar if needed
            if (tabName === 'booking' && typeof initializeBookingCalendar === 'function') {
                initializeBookingCalendar();
            }
        };

        console.log('✅ Profile functions initialized');
    }
    
    /**
     * Setup global event handlers
     * @private
     */
    setupGlobalEventHandlers() {
        // Scroll performance optimization
        const handleScroll = debounce(() => {
            this.updateScrollIndicator();
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Responsive updates
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
        
        // Enhanced error handling is now handled by globalErrorHandler
    }
    
    /**
     * Setup error handling
     * @private
     */
    setupErrorHandling() {
        // Listen for navigation errors
        this.navigation?.on('error', (error) => {
            this.errorHandler.handleError(
                new AppError(
                    'Navigation error',
                    ErrorType.CLIENT,
                    ErrorSeverity.MEDIUM,
                    { originalError: error, userMessage: 'Failed to navigate. Please try again.' }
                )
            );
        });
        
        // Listen for loading errors
        this.loading?.on('loading:error', ({ id, message }) => {
            this.errorHandler.handleError(
                new AppError(
                    `Loading timeout: ${message}`,
                    ErrorType.CLIENT,
                    ErrorSeverity.MEDIUM,
                    { loadingId: id, userMessage: 'Loading took too long. Please try again.' }
                )
            );
        });
        
        // Setup navigation loading states
        this.navigation?.on('navigate:start', ({ to }) => {
            this.loading?.show('navigation', `Loading ${to}...`, { timeout: 10000 });
        });
        
        this.navigation?.on('navigate:complete', () => {
            this.loading?.hide('navigation');
        });
    }
    
    /**
     * Setup legacy function support for backward compatibility
     * @private
     */
    setupLegacyFunctionSupport() {
        // Support for old showPage function
        window.showPage = (page) => {
            if (this.navigation) {
                this.navigation.navigateTo(page);
            } else {
                // Fallback for when navigation isn't initialized
                window.location.hash = `#${page}`;
            }
        };
        
        // Function to load HTML content into a container (moved here for broader access)
        const loadTabContent = async (containerId, filePath) => {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                } else {
                    console.error(`Container with ID ${containerId} not found.`);
                }
            } catch (error) {
                console.error(`Failed to load content from ${filePath}:`, error);
                // Optionally display an error message to the user
            }
        };

        // Support for old tab functions
        // Profile tab switching
        window.showProfileTab = async (tabName) => {
            console.log('showProfileTab called with:', tabName);

            // Remove active class from all profile tabs
            document.querySelectorAll('.profile-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Add active class to target tab
            const targetTab = document.querySelector(`.profile-tab[data-tab="${tabName}"]`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Load content dynamically
            await loadTabContent('profile-content-container', `/pages/profile/${tabName}.html`);

            // Initialize booking calendar if needed
            if (tabName === 'booking' && typeof initializeBookingCalendar === 'function') {
                initializeBookingCalendar();
            }
        };
        
        // Support for guides tab
        window.showGuidesTab = async (tabName) => {
            const tabButton = document.querySelector(`.guides-tab[data-tab="${tabName}"]`);
            if (tabButton) {
                // Remove active class from all tabs
                document.querySelectorAll('.guides-tab').forEach(tab => tab.classList.remove('active'));
                // Add active class to selected tab
                tabButton.classList.add('active');

                // Load content dynamically
                await loadTabContent('guides-content-container', `/pages/guides/${tabName}.html`);
            }
        };
        
        // Support for apps tab
        window.showAppsTab = async (tabName) => {
            const tabButton = document.querySelector(`.apps-tab[data-tab="${tabName}"]`);
            if (tabButton) {
                // Remove active class from all tabs
                document.querySelectorAll('.apps-tab').forEach(tab => tab.classList.remove('active'));
                // Add active class to selected tab
                tabButton.classList.add('active');

                // Load content dynamically
                await loadTabContent('apps-content-container', `/pages/apps/${tabName}.html`);
            }
        };
        
        // Support for guide detail navigation
        window.showGuideDetail = (guideType) => {
            // Store the guide type in sessionStorage for the detail page
            sessionStorage.setItem('selectedGuideType', guideType);
            
            // Check if we should show unlocked version
            const urlParams = new URLSearchParams(window.location.search);
            // Show unlocked version for purchased guides or when explicitly requested
            if (urlParams.get('unlocked') === 'true' || 
                guideType === 'demo-unlocked' || 
                guideType === 'premium-purchased') {
                this.navigation.navigateTo('guide-detail-unlocked');
            } else {
                this.navigation.navigateTo('guide-detail');
            }
        };
        
        // Support for guide view navigation
        window.showGuideView = (guideId) => {
            // Store the guide ID in sessionStorage for the view page
            sessionStorage.setItem('selectedGuideId', guideId);
            this.navigation.navigateTo('guide-view');
        };
        
        // Support for book session navigation
        window.bookSession = (mentorId) => {
            // Store the mentor ID if provided
            if (mentorId) {
                sessionStorage.setItem('selectedMentorId', mentorId);
            }
            this.navigation.navigateTo('profile');
            // Switch to booking tab after navigation
            setTimeout(() => {
                if (typeof window.showProfileTab === 'function') {
                    window.showProfileTab('booking');
                }
            }, 500);
        };
        
        // Support for insights pro navigation
        window.showInsightsPro = () => {
            // Set the tab preference before navigation
            sessionStorage.setItem('dashboardTab', 'overview');
            sessionStorage.setItem('overviewSection', 'analytics');
            
            this.navigation.navigateTo('dashboard');
            
            // Ensure the tab and section are shown after navigation
            this.navigation.once('navigate:complete', ({ page }) => {
                if (page === 'dashboard') {
                    setTimeout(() => {
                        window.showDashboardTab('overview');
                        setTimeout(() => {
                            if (typeof window.showOverviewSection === 'function') {
                                window.showOverviewSection('analytics');
                            }
                        }, 100);
                    }, 200);
                }
            });
        };
        
        // Support for mobile menu
        window.toggleMobileMenu = () => {
            this.navigation.toggleMobileMenu();
        };
        
        // Support for guide creation step navigation
        window.goToGuideStep = async (step, fromIndicator = false) => {
            console.log('goToGuideStep called with step:', step);

            // Define the container for the steps
            const stepsContainer = document.getElementById('guide-step-content-container');
            if (!stepsContainer) {
                console.error('guide-step-content-container not found.');
                return;
            }

            // Clear previous step content
            stepsContainer.innerHTML = '';

            // Load content dynamically
            const filePath = `/pages/guides/submit/step${step}.html`;
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                stepsContainer.innerHTML = html;
            } catch (error) {
                console.error(`Failed to load guide step content from ${filePath}:`, error);
                // Optionally display an error message to the user
                stepsContainer.innerHTML = `<p class="text-red-500">Failed to load step ${step}. Please try again.</p>`;
                return;
            }

            // Update progress indicators
            for (let i = 1; i <= 5; i++) {
                const indicator = document.getElementById(`guide-step-indicator-${i}`);
                if (indicator) {
                    const numberDiv = indicator.querySelector('div:first-child');
                    const textSpan = indicator.querySelector('span');
                    
                    if (i < step) {
                        // Completed step - purple with checkmark
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-purple text-white flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
                        textSpan.className = 'text-sm text-vybe-purple-light font-medium whitespace-nowrap';
                    } else if (i === step) {
                        // Current step - purple
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-purple text-white flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = i;
                        textSpan.className = 'text-sm text-vybe-purple-light font-medium whitespace-nowrap';
                    } else {
                        // Future step - gray
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-gray-800 text-vybe-gray-400 flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = i;
                        textSpan.className = 'text-sm text-vybe-gray-400 whitespace-nowrap';
                    }
                }
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        };
        
        // Support for guide submission
        window.submitGuide = () => {
            // Show loading state
            const submitBtn = event.target;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Simulate submission
            setTimeout(() => {
                alert('Guide submitted successfully! You will receive an email notification once the AI review is complete.');
                // Reset to browse tab
                showGuidesTab('browse');
            }, 2000);
        };
        
        // Support for adding modules
        window.addModule = () => {
            const modulesList = document.getElementById('modules-list');
            if (!modulesList) return;
            
            const moduleCount = modulesList.children.length + 1;
            
            const newModule = document.createElement('div');
            newModule.className = 'module-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/60 rounded-xl p-5 hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-200';
            newModule.innerHTML = `
                <!-- Accent line on hover -->
                <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-vybe-purple to-vybe-pink opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                <div class="flex items-start gap-4">
                    <!-- Drag handle -->
                    <div class="cursor-move text-gray-500 hover:text-gray-400 mt-1 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/>
                        </svg>
                    </div>
                    
                    <!-- Module number badge -->
                    <div class="flex-shrink-0 w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center text-vybe-purple font-semibold">
                        ${moduleCount}
                    </div>
                    
                    <div class="flex-1 space-y-3">
                        <!-- Title -->
                        <input type="text" class="w-full text-lg font-semibold bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-vybe-purple focus:ring-1 focus:ring-vybe-purple/20" placeholder="Module Title">
                        
                        <!-- Description -->
                        <textarea class="w-full text-sm text-gray-300 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-vybe-purple focus:ring-1 focus:ring-vybe-purple/20 resize-none" rows="5" placeholder="Describe what students will learn in this module..."></textarea>
                        
                        <!-- Module metadata -->
                        <div class="flex items-center gap-6 pt-2">
                            <!-- Duration -->
                            <div class="flex items-center gap-2 text-sm text-gray-400">
                                <svg class="w-4 h-4 text-vybe-purple" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>0 min</span>
                            </div>
                            
                            <!-- Lessons count -->
                            <div class="flex items-center gap-2 text-sm text-gray-400">
                                <svg class="w-4 h-4 text-vybe-purple" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span>0 lessons</span>
                            </div>
                            
                            <!-- Add lesson button -->
                            <button class="ml-auto flex items-center gap-1.5 text-sm text-vybe-purple hover:text-vybe-purple-light transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                                </svg>
                                Add Lesson
                            </button>
                        </div>
                    </div>
                    
                    <!-- Delete button -->
                    <button class="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200" onclick="this.closest('.module-card').remove()">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `;
            
            modulesList.appendChild(newModule);
        };
        
        // Support for app creation step navigation
        window.goToAppStep = (step, fromIndicator = false) => {
            console.log('goToAppStep called with step:', step);
            // Hide all steps
            document.querySelectorAll('.app-creation-step').forEach(s => s.classList.add('hidden'));
            
            // Show selected step
            const targetStep = document.getElementById(`app-creation-step-${step}`);
            if (targetStep) {
                targetStep.classList.remove('hidden');
            }
            
            // Update progress indicators
            for (let i = 1; i <= 4; i++) {
                const indicator = document.getElementById(`step-indicator-${i}`);
                if (indicator) {
                    const numberDiv = indicator.querySelector('div:first-child');
                    const textSpan = indicator.querySelector('span');
                    
                    if (i < step) {
                        // Completed step - orange with checkmark
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-orange text-white flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
                        textSpan.className = 'text-sm text-vybe-orange font-medium whitespace-nowrap';
                    } else if (i === step) {
                        // Current step - orange
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-orange text-white flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = i;
                        textSpan.className = 'text-sm text-vybe-orange font-medium whitespace-nowrap';
                    } else {
                        // Future step - gray
                        numberDiv.className = 'w-10 h-10 rounded-full bg-vybe-gray-800 text-vybe-gray-400 flex items-center justify-center font-semibold mb-2';
                        numberDiv.innerHTML = i;
                        textSpan.className = 'text-sm text-vybe-gray-400 whitespace-nowrap';
                    }
                }
            }
            
            // If on preview step, generate preview
            if (step === 3) {
                generateAppPreview();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        };
        
        // Generate app preview
        window.generateAppPreview = () => {
            const appName = document.getElementById('app-name')?.value || 'Untitled App';
            const appUrl = document.getElementById('app-url')?.value || '#';
            const appCategory = document.getElementById('app-category')?.value || 'uncategorized';
            const appDescription = document.getElementById('app-description')?.value || 'No description provided';
            const appTech = document.getElementById('app-tech')?.value || 'Not specified';
            const appTags = document.getElementById('app-tags')?.value || '';
            const appDetailedDesc = document.getElementById('app-detailed-description')?.value || '';
            const appSource = document.getElementById('app-source')?.value || '';
            const appDemo = document.getElementById('app-demo')?.value || '';
            
            // Get pricing information
            const pricingType = document.querySelector('input[name="app-pricing-type"]:checked')?.value || 'free';
            const appPrice = document.getElementById('app-price')?.value || '';
            const appLicense = document.getElementById('app-license')?.value || 'single';
            const demoEnabled = document.getElementById('app-demo-enabled')?.checked || false;
            const supportIncluded = document.getElementById('app-support-included')?.checked || false;
            const updatesIncluded = document.getElementById('app-updates-included')?.checked || false;
            
            const previewContent = document.getElementById('app-preview-content');
            if (!previewContent) return;
            
            previewContent.innerHTML = `
                <div class="bg-gray-700/40 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-2">${appName}</h3>
                    <p class="text-vybe-gray-400 mb-4">${appDescription}</p>
                    
                    <div class="flex flex-wrap gap-4 text-sm mb-4">
                        <span class="text-vybe-gray-400">Category: <span class="text-white capitalize">${appCategory}</span></span>
                        <span class="text-vybe-gray-400">URL: <a href="${appUrl}" target="_blank" class="text-vybe-orange hover:underline">${appUrl}</a></span>
                    </div>
                    
                    <!-- Pricing Information -->
                    <div class="mb-4">
                        <h4 class="font-medium mb-2">Pricing & Distribution</h4>
                        ${pricingType === 'premium' ? `
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01-.567-3.677A1.99 1.99 0 0112 14a1.99 1.99 0 011.567.046 1.993 1.993 0 01-.567 3.677z"/>
                                </svg>
                                <span class="text-amber-500 font-medium">Premium App - $${appPrice}</span>
                            </div>
                            <p class="text-vybe-gray-400">License: ${appLicense === 'single' ? 'Single Site' : appLicense === 'multiple' ? 'Multiple Site' : appLicense === 'commercial' ? 'Commercial' : 'Unlimited'}</p>
                            ${demoEnabled ? '<p class="text-vybe-gray-400">• Live demo access included</p>' : ''}
                            ${supportIncluded ? '<p class="text-vybe-gray-400">• Email support (30 days)</p>' : ''}
                            ${updatesIncluded ? '<p class="text-vybe-gray-400">• Free updates (1 year)</p>' : ''}
                        </div>
                        ` : `
                        <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span class="text-green-500 font-medium">Free App</span>
                        </div>
                        `}
                    </div>
                    
                    ${appDetailedDesc ? `
                    <div class="mb-4">
                        <h4 class="font-medium mb-2">Detailed Description</h4>
                        <p class="text-sm text-vybe-gray-400">${appDetailedDesc}</p>
                    </div>
                    ` : ''}
                    
                    <div class="mb-4">
                        <h4 class="font-medium mb-2">Technologies</h4>
                        <p class="text-sm text-vybe-gray-400">${appTech}</p>
                    </div>
                    
                    ${appTags ? `
                    <div class="mb-4">
                        <h4 class="font-medium mb-2">Tags</h4>
                        <div class="flex flex-wrap gap-2">
                            ${appTags.split(',').map(tag => `<span class="px-2 py-1 bg-vybe-purple/20 text-vybe-purple-light rounded-full text-xs">${tag.trim()}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="flex gap-4">
                        ${appSource ? `<a href="${appSource}" target="_blank" class="text-sm text-vybe-orange hover:underline">Source Code</a>` : ''}
                        ${appDemo ? `<a href="${appDemo}" target="_blank" class="text-sm text-vybe-orange hover:underline">Demo Video</a>` : ''}
                    </div>
                </div>
            `;
        };
        
        // Submit app function
        window.submitApp = () => {
            const termsCheckbox = document.getElementById('app-terms');
            if (!termsCheckbox?.checked) {
                alert('Please agree to the submission terms before submitting.');
                return;
            }
            
            // Show loading state
            const submitBtn = event.target;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Simulate submission
            setTimeout(() => {
                alert('App submitted successfully! You will receive an email notification once the review is complete.');
                // Reset to browse tab
                showAppsTab('browse');
                // Reset form
                const form = document.querySelector('#apps-submit-content');
                if (form) {
                    form.querySelectorAll('input, textarea, select').forEach(field => {
                        if (field.type === 'checkbox') {
                            field.checked = false;
                        } else {
                            field.value = '';
                        }
                    });
                }
            }, 2000);
        };
        
        // Toggle pricing fields for guide submission
        window.toggleGuidePricingFields = (pricingType) => {
            const premiumOptions = document.getElementById('guide-premium-options');
            const priceInput = document.getElementById('guide-price');
            
            if (premiumOptions) {
                if (pricingType === 'premium') {
                    premiumOptions.classList.remove('hidden');
                    if (priceInput && !priceInput.value) {
                        priceInput.value = '25'; // Default price
                    }
                } else {
                    premiumOptions.classList.add('hidden');
                    if (priceInput) {
                        priceInput.value = '';
                    }
                }
            }
            
            // Update pricing validation
            window.updatePricingValidation('guide');
        };
        
        // Toggle pricing fields for app submission
        window.toggleAppPricingFields = (pricingType) => {
            const premiumOptions = document.getElementById('app-premium-options');
            const priceInput = document.getElementById('app-price');
            
            if (premiumOptions) {
                if (pricingType === 'premium') {
                    premiumOptions.classList.remove('hidden');
                    if (priceInput && !priceInput.value) {
                        priceInput.value = '35'; // Default price for apps
                    }
                } else {
                    premiumOptions.classList.add('hidden');
                    if (priceInput) {
                        priceInput.value = '';
                    }
                }
            }
            
            // Update pricing validation
            window.updatePricingValidation('app');
        };
        
        // Validate pricing configuration
        window.validatePricing = (type) => {
            const isGuide = type === 'guide';
            const pricingTypeInput = document.querySelector(`input[name="${isGuide ? 'guide' : 'app'}-pricing-type"]:checked`);
            const priceInput = document.getElementById(`${isGuide ? 'guide' : 'app'}-price`);
            
            if (!pricingTypeInput) {
                return { valid: false, message: 'Please select a pricing type' };
            }
            
            const pricingType = pricingTypeInput.value;
            
            if (pricingType === 'premium') {
                if (!priceInput || !priceInput.value) {
                    return { valid: false, message: 'Please enter a price for premium content' };
                }
                
                const price = parseFloat(priceInput.value);
                const minPrice = isGuide ? 5 : 5;
                const maxPrice = isGuide ? 500 : 1000;
                
                if (isNaN(price) || price < minPrice || price > maxPrice) {
                    return { 
                        valid: false, 
                        message: `Price must be between $${minPrice} and $${maxPrice}` 
                    };
                }
                
                if (price % 5 !== 0) {
                    return { 
                        valid: false, 
                        message: 'Price must be in increments of $5' 
                    };
                }
            }
            
            return { valid: true, message: '' };
        };
        
        // Update pricing validation UI
        window.updatePricingValidation = (type) => {
            const validation = window.validatePricing(type);
            const isGuide = type === 'guide';
            
            // Update checklist if we're on the review step
            if (isGuide) {
                const checklistItem = document.getElementById('guide-pricing-check');
                const previewPricing = document.getElementById('guide-preview-pricing');
                const pricingType = document.querySelector('input[name="guide-pricing-type"]:checked')?.value || 'free';
                const price = document.getElementById('guide-price')?.value || '';
                
                if (checklistItem) {
                    const span = checklistItem.querySelector('span');
                    if (pricingType === 'premium' && validation.valid) {
                        span.textContent = `Pricing configured: Premium guide ($${price})`;
                    } else {
                        span.textContent = 'Pricing configured: Free guide';
                    }
                }
                
                if (previewPricing) {
                    const span = previewPricing.querySelector('span');
                    if (pricingType === 'premium' && validation.valid) {
                        previewPricing.className = 'flex items-center gap-1 text-amber-500 text-xs';
                        previewPricing.innerHTML = `
                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01-.567-3.677A1.99 1.99 0 0112 14a1.99 1.99 0 011.567.046 1.993 1.993 0 01-.567 3.677z"/>
                            </svg>
                            <span>Premium • $${price}</span>
                        `;
                    } else {
                        previewPricing.className = 'flex items-center gap-1 text-green-400 text-xs';
                        previewPricing.innerHTML = `
                            <span class="text-xs">✅</span>
                            <span>Free Guide</span>
                        `;
                    }
                }
            }
            
            // Update app preview if needed
            if (!isGuide && document.getElementById('app-creation-step-3') && !document.getElementById('app-creation-step-3').classList.contains('hidden')) {
                window.generateAppPreview();
            }
        };
        
        // Add price validation listeners
        window.setupPricingValidation = () => {
            // Guide price validation
            const guidePriceInput = document.getElementById('guide-price');
            if (guidePriceInput) {
                guidePriceInput.addEventListener('input', () => {
                    window.updatePricingValidation('guide');
                });
            }
            
            // App price validation
            const appPriceInput = document.getElementById('app-price');
            if (appPriceInput) {
                appPriceInput.addEventListener('input', () => {
                    window.updatePricingValidation('app');
                });
            }
        };
        
        // Initialize pricing validation when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', window.setupPricingValidation);
        } else {
            window.setupPricingValidation();
        }
    }
    
    /**
     * Update scroll indicator
     * @private
     */
    updateScrollIndicator() {
        const scrollIndicator = document.getElementById('scrollProgress');
        if (scrollIndicator) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
    }
    
    /**
     * Handle window resize
     * @private
     */
    handleResize() {
        // Update any size-dependent calculations
        this.updateScrollIndicator();
    }
    
    /**
     * Get navigation manager
     * @returns {NavigationManager} Navigation manager instance
     */
    getNavigation() {
        return this.navigation;
    }
    
    /**
     * Get dashboard tabs manager
     * @returns {DashboardTabs|null} Dashboard tabs instance
     */
    getDashboardTabs() {
        return this.dashboardTabs;
    }
    
    /**
     * Get profile tabs manager
     * @returns {ProfileTabs|null} Profile tabs instance
     */
    getProfileTabs() {
        return this.profileTabs;
    }
    
    /**
     * Get loading manager
     * @returns {LoadingManager|null} Loading manager instance
     */
    getLoadingManager() {
        return this.loading;
    }
    
    /**
     * Get error handler
     * @returns {ErrorHandler} Error handler instance
     */
    getErrorHandler() {
        return this.errorHandler;
    }
    
    /**
     * Show a loading state
     * @param {string} id - Loading identifier
     * @param {string} message - Loading message
     * @param {Object} options - Loading options
     */
    showLoading(id, message, options = {}) {
        this.loading?.show(id, message, options);
    }
    
    /**
     * Hide a loading state
     * @param {string} id - Loading identifier
     */
    hideLoading(id) {
        this.loading?.hide(id);
    }
    
    /**
     * Handle an error
     * @param {Error|AppError} error - Error to handle
     * @param {Object} options - Error handling options
     */
    handleError(error, options = {}) {
        this.errorHandler.handleError(error, options);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.vybeApp = new VybeApp();
    });
} else {
    window.vybeApp = new VybeApp();
}

// Export for module use
export default VybeApp;