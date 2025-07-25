/**
 * CONSTANTS EXTRACTION EXAMPLE
 * 
 * This shows how to replace 150+ magic numbers and hardcoded values
 * with a centralized, maintainable configuration system
 */

// ============================================
// BEFORE: Magic Numbers Everywhere 
// ============================================

/*
// Scattered throughout 15,122 lines:

// Timing values (no context about what they mean)
setTimeout(callback, 3000);           // Why 3000?
setTimeout(hideLoader, 500);          // Why 500?
setTimeout(updateUI, 800);            // Why 800?

// Business logic values (no single source of truth)
if (sessionType === 'quick') price = 75;     // Why 75?
if (sessionType === 'full') price = 150;     // Why 150?

// Visual values (inconsistent and arbitrary)
opacity: 0.15;                        // Why 0.15?
opacity: 0.4;                         // Why 0.4?
rgba(138, 43, 226, 0.15);            // Magic color values
rgba(0, 0, 0, 0.3);                  // More magic

// Dimensions (scattered and inconsistent)
width: 320px;                         // Mobile breakpoint?
max-width: 1200px;                    // Desktop max?
padding: 24px;                        // Why 24?

// API and data values
limit: 10;                            // Page size?
maxRetries: 3;                        // Why 3 retries?
timeout: 5000;                        // Why 5 seconds?
*/

// ============================================
// AFTER: Centralized Configuration
// ============================================

const VYBE_CONSTANTS = {
    // ================================
    // TIMING & ANIMATION
    // ================================
    TIMING: {
        // User feedback timing
        SUCCESS_MESSAGE_DURATION: 4000,     // How long success messages display
        ERROR_MESSAGE_DURATION: 6000,       // How long error messages display
        WARNING_MESSAGE_DURATION: 5000,     // How long warning messages display
        
        // UI transitions
        FAST_TRANSITION: 200,                // Quick hover effects
        STANDARD_TRANSITION: 300,            // Standard UI transitions  
        SLOW_TRANSITION: 500,                // Page transitions
        
        // Loading states
        LOADING_SPINNER_DELAY: 800,          // Delay before showing spinner
        SKELETON_SCREEN_MIN: 600,            // Min time to show skeleton
        PAGE_LOAD_TIMEOUT: 10000,            // Max time for page load
        
        // Auto-save and debouncing
        DEBOUNCE_DELAY: 300,                 // Input debouncing
        AUTO_SAVE_INTERVAL: 30000,           // Auto-save every 30s
        SESSION_REFRESH: 900000              // Refresh session every 15min
    },
    
    // ================================
    // BUSINESS LOGIC
    // ================================
    PRICING: {
        // Session types
        QUICK_HELP_PRICE: 75,                // 30-minute focused session
        FULL_SESSION_PRICE: 150,             // 90-minute comprehensive session
        EXTENDED_SESSION_PRICE: 225,         // 120-minute deep dive
        
        // Content pricing
        PREMIUM_GUIDE_PRICE: 25,             // Individual guide access
        COURSE_BUNDLE_PRICE: 99,             // Bundle of related guides
        MONTHLY_SUBSCRIPTION: 49,            // Monthly all-access
        YEARLY_SUBSCRIPTION: 399,            // Yearly all-access (33% off)
        
        // Currency and formatting
        CURRENCY_SYMBOL: '$',
        CURRENCY_CODE: 'USD',
        DECIMAL_PLACES: 0                    // Whole dollar amounts
    },
    
    DURATIONS: {
        // Session durations (in minutes)
        QUICK_HELP: 30,
        FULL_SESSION: 90,
        EXTENDED_SESSION: 120,
        
        // Content estimations
        GUIDE_READ_TIME: 15,                 // Average guide reading time
        COURSE_COMPLETION: 180,              // Average course completion
        WORKSHOP_DURATION: 240               // Live workshop length
    },
    
    // ================================
    // VISUAL DESIGN SYSTEM
    // ================================
    COLORS: {
        // Brand colors (with semantic names)
        BRAND_PURPLE: '#8a2be2',
        BRAND_PURPLE_RGB: '138, 43, 226',
        
        // Alpha variations for overlays
        PURPLE_LIGHT: 'rgba(138, 43, 226, 0.1)',    // Very subtle
        PURPLE_MEDIUM: 'rgba(138, 43, 226, 0.15)',  // Card backgrounds
        PURPLE_STRONG: 'rgba(138, 43, 226, 0.3)',   // Hover states
        
        // Success/error states
        SUCCESS_COLOR: '#10b981',
        SUCCESS_ALPHA: 'rgba(16, 185, 129, 0.15)',
        ERROR_COLOR: '#ef4444', 
        ERROR_ALPHA: 'rgba(239, 68, 68, 0.15)',
        WARNING_COLOR: '#f59e0b',
        WARNING_ALPHA: 'rgba(245, 158, 11, 0.15)',
        
        // Neutral grays
        OVERLAY_LIGHT: 'rgba(0, 0, 0, 0.1)',        // Light overlay
        OVERLAY_MEDIUM: 'rgba(0, 0, 0, 0.3)',       // Modal backdrop
        OVERLAY_STRONG: 'rgba(0, 0, 0, 0.6)'        // Loading backdrop
    },
    
    SPACING: {
        // Consistent spacing scale (based on 4px grid)
        XS: '4px',      // 0.25rem - tight spacing
        SM: '8px',      // 0.5rem  - small spacing
        MD: '16px',     // 1rem    - standard spacing
        LG: '24px',     // 1.5rem  - large spacing  
        XL: '32px',     // 2rem    - extra large
        XXL: '48px',    // 3rem    - section spacing
        
        // Component-specific spacing
        CARD_PADDING: '24px',
        BUTTON_PADDING: '12px 24px',
        INPUT_PADDING: '12px 16px',
        MODAL_PADDING: '32px'
    },
    
    BREAKPOINTS: {
        // Responsive design breakpoints
        MOBILE: '320px',       // Small phones
        MOBILE_L: '480px',     // Large phones
        TABLET: '768px',       // Tablets
        DESKTOP: '1024px',     // Small desktops
        DESKTOP_L: '1200px',   // Large desktops
        DESKTOP_XL: '1440px'   // Extra large screens
    },
    
    // ================================
    // LAYOUT & DIMENSIONS
    // ================================
    LAYOUT: {
        // Maximum widths
        CONTENT_MAX_WIDTH: '1200px',         // Main content container
        READING_MAX_WIDTH: '800px',          // Optimal reading width
        FORM_MAX_WIDTH: '500px',             // Form containers
        
        // Minimum heights
        MIN_TOUCH_TARGET: '44px',            // iOS touch target minimum
        MIN_BUTTON_HEIGHT: '40px',           // Button minimum height
        MIN_INPUT_HEIGHT: '40px',            // Input minimum height
        
        // Z-index scale (prevents z-index conflicts)
        Z_INDEX: {
            DROPDOWN: 10,
            TOOLTIP: 20,
            MODAL_BACKDROP: 30,
            MODAL: 40,
            NOTIFICATION: 50,
            DEBUG: 99999
        }
    },
    
    // ================================
    // API & DATA LIMITS
    // ================================
    DATA: {
        // Pagination
        DEFAULT_PAGE_SIZE: 10,               // Default items per page
        MAX_PAGE_SIZE: 100,                  // Maximum items per page
        MAX_SEARCH_RESULTS: 50,              // Limit search results
        
        // Input validation
        MAX_INPUT_LENGTH: 1000,              // General text inputs
        MAX_TITLE_LENGTH: 100,               // Titles and names
        MAX_DESCRIPTION_LENGTH: 500,         // Descriptions
        MIN_PASSWORD_LENGTH: 8,              // Password requirements
        
        // File uploads
        MAX_FILE_SIZE: 10485760,             // 10MB in bytes
        ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif'],
        ALLOWED_DOC_TYPES: ['pdf', 'doc', 'docx'],
        
        // Performance limits
        MAX_RETRIES: 3,                      // API retry attempts
        REQUEST_TIMEOUT: 10000,              // 10 second timeout
        CACHE_DURATION: 300000               // 5 minute cache
    },
    
    // ================================
    // FEATURE FLAGS & SETTINGS
    // ================================
    FEATURES: {
        // Enable/disable features
        ENABLE_ANALYTICS: true,
        ENABLE_CHAT: true,
        ENABLE_NOTIFICATIONS: true,
        ENABLE_OFFLINE_MODE: false,
        
        // Debug settings
        DEBUG_MODE: false,
        VERBOSE_LOGGING: false,
        PERFORMANCE_MONITORING: true
    }
};

// ============================================
// UTILITY FUNCTIONS FOR CONSTANTS
// ============================================

class ConstantsHelper {
    /**
     * Get formatted price string
     * @param {number} amount 
     * @returns {string}
     */
    static formatPrice(amount) {
        return `${VYBE_CONSTANTS.PRICING.CURRENCY_SYMBOL}${amount.toFixed(VYBE_CONSTANTS.PRICING.DECIMAL_PLACES)}`;
    }
    
    /**
     * Get formatted duration string
     * @param {number} minutes 
     * @returns {string}
     */
    static formatDuration(minutes) {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
        }
        return `${minutes}m`;
    }
    
    /**
     * Get session details by type
     * @param {string} sessionType 
     * @returns {Object}
     */
    static getSessionDetails(sessionType) {
        const sessions = {
            'quick': {
                price: VYBE_CONSTANTS.PRICING.QUICK_HELP_PRICE,
                duration: VYBE_CONSTANTS.DURATIONS.QUICK_HELP,
                name: 'Quick Help'
            },
            'full': {
                price: VYBE_CONSTANTS.PRICING.FULL_SESSION_PRICE,
                duration: VYBE_CONSTANTS.DURATIONS.FULL_SESSION,
                name: 'Full Session'
            },
            'extended': {
                price: VYBE_CONSTANTS.PRICING.EXTENDED_SESSION_PRICE,
                duration: VYBE_CONSTANTS.DURATIONS.EXTENDED_SESSION,
                name: 'Extended Session'
            }
        };
        
        return sessions[sessionType] || null;
    }
    
    /**
     * Get responsive breakpoint
     * @param {string} breakpoint 
     * @returns {string}
     */
    static getBreakpoint(breakpoint) {
        return VYBE_CONSTANTS.BREAKPOINTS[breakpoint.toUpperCase()] || '768px';
    }
    
    /**
     * Get z-index value
     * @param {string} layer 
     * @returns {number}
     */
    static getZIndex(layer) {
        return VYBE_CONSTANTS.LAYOUT.Z_INDEX[layer.toUpperCase()] || 1;
    }
}

// ============================================
// MIGRATION EXAMPLES
// ============================================

// ❌ BEFORE: Magic numbers everywhere
/*
setTimeout(() => showSuccess('Saved!'), 3000);
if (sessionType === 'quick') price = 75;
element.style.background = 'rgba(138, 43, 226, 0.15)';
*/

// ✅ AFTER: Semantic constants
setTimeout(() => showSuccess('Saved!'), VYBE_CONSTANTS.TIMING.SUCCESS_MESSAGE_DURATION);
const sessionDetails = ConstantsHelper.getSessionDetails('quick');
element.style.background = VYBE_CONSTANTS.COLORS.PURPLE_MEDIUM;

// ============================================
// BENEFITS FOR AI AGENTS
// ============================================

console.log(`
🤖 AI AGENT BENEFITS:

1. SEMANTIC UNDERSTANDING:
   • Magic numbers replaced with meaningful names
   • Business logic clearly separated from implementation
   • Design system values are self-documenting

2. SINGLE SOURCE OF TRUTH:
   • All pricing in one place - easy to find and modify
   • Visual constants centralized - consistent theming
   • Timing values organized by purpose

3. EASIER MODIFICATIONS:
   • Change a price? Update one value, affects entire app
   • Adjust timing? Single constant controls all related animations
   • Update colors? Central theme affects all components

4. REDUCED COGNITIVE LOAD:
   • Instead of memorizing 150+ magic numbers
   • Understand 1 well-organized configuration object
   • Clear relationships between related values

5. VALIDATION READY:
   • Constants can be validated at startup
   • Type checking becomes much easier
   • Business rules are explicit and testable

This transforms the codebase from "guess what this number means"
to "clearly documented, maintainable configuration system"
`);

// Export for use throughout the application
window.VYBE_CONSTANTS = VYBE_CONSTANTS;
window.ConstantsHelper = ConstantsHelper;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VYBE_CONSTANTS, ConstantsHelper };
}