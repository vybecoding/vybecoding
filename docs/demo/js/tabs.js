/**
 * Tab functionality for dashboard, guides, and apps pages
 */

// Dashboard tab functionality
function showDashboardTab(tabName) {
    // Hide all dashboard tab contents
    document.querySelectorAll('.dashboard-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all dashboard tabs
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`dashboard-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.dashboard-tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // If showing overview tab, initialize the earnings section
    if (tabName === 'overview' && typeof window.showOverviewSection === 'function') {
        setTimeout(() => window.showOverviewSection('earnings'), 10);
    }
}

// Guides tab functionality
function showGuidesTab(tabName) {
    // Hide all guides tab contents
    document.querySelectorAll('.guides-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all guides tabs
    document.querySelectorAll('.guides-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`guides-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.guides-tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Apps tab functionality
function showAppsTab(tabName) {
    // Hide all apps tab contents
    document.querySelectorAll('.apps-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all apps tabs
    document.querySelectorAll('.apps-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`apps-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.apps-tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Earnings tab functionality (30 Days / Total)
function showEarningsTab(tabName) {
    // Hide all earnings content
    document.querySelectorAll('[id^="earnings-"][id$="-content"]').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all earnings tabs
    document.querySelectorAll('.earnings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`earnings-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.earnings-tab[data-period="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Sales performance tab functionality (Guides / Apps / Mentorship)
function showSalesTab(tabName) {
    // Hide all sales content
    document.querySelectorAll('[id^="sales-"][id$="-content"]').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all sales tabs
    document.querySelectorAll('.sales-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('text-vybe-gray-400');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`sales-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.sales-tab[onclick*="'${tabName}'"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.classList.remove('text-vybe-gray-400');
    }
}

// Settings section functionality
function showSettingsSection(sectionName) {
    // Hide all settings sections
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active from all settings tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(`settings-${sectionName}`);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.settings-tab[data-section="${sectionName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Profile tab functionality
function showProfileTab(tabName) {
    // Hide all profile tab contents
    document.querySelectorAll('.profile-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active from all profile tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`profile-${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Set active tab
    const activeTab = document.querySelector(`.profile-tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // If booking tab, could initialize calendar here
    if (tabName === 'booking' && typeof initializeBookingCalendar === 'function') {
        initializeBookingCalendar();
    }
}

// App detail navigation function
function showAppDetail(category, appId, appSlug) {
    console.log('Showing app detail:', { category, appId, appSlug });
    
    // Navigate to appropriate detail page based on category
    if (category === 'members') {
        // Navigate to member app preview page
        window.pageLoader.navigateTo('app-member-preview');
    } else if (category === 'vibe-coding' || category === 'native') {
        // Navigate to native/built-in app detail page
        window.pageLoader.navigateTo('app-native-detail');
    } else {
        // Fallback for other categories
        console.warn('Unknown app category:', category);
        alert(`App category "${category}" not yet implemented`);
    }
    
    // In a real implementation, you would:
    // 1. Pass the appId/appSlug to load specific app data
    // 2. Update the detail page content dynamically
    // 3. Store the current app context for the detail view
}

// Overview section functionality (Earnings/Analytics subtabs)
function showOverviewSection(section) {
    // Update tab styles
    document.querySelectorAll('.overview-section-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set active tab
    const activeBtn = document.querySelector(`.overview-section-btn[data-section="${section}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Force hide the specific sections by ID to ensure they're really hidden
    const earningsSection = document.getElementById('overview-earnings-section');
    const analyticsSection = document.getElementById('overview-analytics-section');
    
    if (earningsSection) {
        earningsSection.style.display = 'none';
        earningsSection.classList.add('hidden');
    }
    if (analyticsSection) {
        analyticsSection.style.display = 'none';
        analyticsSection.classList.add('hidden');
    }
    
    // Show selected section
    if (section === 'earnings' && earningsSection) {
        earningsSection.style.display = 'block';
        earningsSection.classList.remove('hidden');
    } else if (section === 'analytics' && analyticsSection) {
        analyticsSection.style.display = 'block';
        analyticsSection.classList.remove('hidden');
    }
}

// Initialize default tabs when pages load
function initializeTabs() {
    // Initialize dashboard with review tab
    const dashboardContent = document.getElementById('dashboard-review-content');
    if (dashboardContent) {
        showDashboardTab('review');
    }
    
    // Initialize overview sections - ensure earnings is shown by default
    const overviewContent = document.getElementById('dashboard-overview-content');
    if (overviewContent) {
        // Make sure sections start in correct state
        const earningsSection = document.getElementById('overview-earnings-section');
        const analyticsSection = document.getElementById('overview-analytics-section');
        
        if (earningsSection && analyticsSection) {
            // Ensure only earnings is visible initially
            earningsSection.style.display = 'block';
            earningsSection.classList.remove('hidden');
            analyticsSection.style.display = 'none';
            analyticsSection.classList.add('hidden');
            
            // Set the correct active button
            document.querySelectorAll('.overview-section-btn').forEach(btn => {
                if (btn.dataset.section === 'earnings') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }
    
    // Initialize guides with browse tab
    const guidesContent = document.getElementById('guides-browse-content');
    if (guidesContent) {
        showGuidesTab('browse');
    }
    
    // Initialize apps with browse tab
    const appsContent = document.getElementById('apps-browse-content');
    if (appsContent) {
        showAppsTab('browse');
    }
    
    // Initialize earnings with 30days tab
    const earningsContent = document.getElementById('earnings-30days-content');
    if (earningsContent) {
        showEarningsTab('30days');
    }
}