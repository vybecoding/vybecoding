/**
 * @fileoverview Type definitions for VybeCoding demo
 * @module types
 */

/**
 * @typedef {Object} NavigationOptions
 * @property {number} [mobileBreakpoint=1024] - Mobile breakpoint in pixels
 * @property {boolean} [enableHistory=true] - Enable browser history management
 * @property {string} [defaultPage='home'] - Default page to load
 */

/**
 * @typedef {Object} TabOptions
 * @property {string} [tabSelector='.tab-button'] - CSS selector for tab buttons
 * @property {string} [contentSelector='.tab-content'] - CSS selector for tab content
 * @property {string} [activeClass='active'] - CSS class for active state
 * @property {string} [hiddenClass='hidden'] - CSS class for hidden state
 * @property {boolean} [keyboard=true] - Enable keyboard navigation
 */

/**
 * @typedef {Object} NavigationEvent
 * @property {string} from - Previous page
 * @property {string} to - Target page
 * @property {number} timestamp - Event timestamp
 */

/**
 * @typedef {Object} TabEvent
 * @property {string|null} from - Previous tab
 * @property {string} to - Target tab
 * @property {number} timestamp - Event timestamp
 */

/**
 * @typedef {Object} PageConfig
 * @property {string} title - Page title
 * @property {string} path - Page path
 * @property {string[]} [scripts] - Required scripts
 * @property {string[]} [styles] - Required styles
 * @property {Object} [meta] - Meta information
 */

/**
 * @typedef {Object} ComponentState
 * @property {boolean} initialized - Whether component is initialized
 * @property {boolean} loading - Whether component is loading
 * @property {Error|null} error - Last error if any
 * @property {Object} data - Component data
 */

/**
 * @typedef {Object} AnimationConfig
 * @property {number} duration - Animation duration in ms
 * @property {string} easing - CSS easing function
 * @property {number} delay - Animation delay in ms
 * @property {boolean} loop - Whether to loop animation
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {number} loadTime - Page load time
 * @property {number} renderTime - Render time
 * @property {number} interactiveTime - Time to interactive
 * @property {number} memoryUsage - Memory usage
 */

/**
 * @typedef {Object} LoadingOptions
 * @property {number} [defaultTimeout=30000] - Default timeout in milliseconds
 * @property {string} [className='loading-overlay'] - CSS class for loading overlay
 * @property {boolean} [enableGlobalLoader=true] - Enable global loading overlay
 */

/**
 * @typedef {Object} LoadingState
 * @property {string} id - Loading identifier
 * @property {string} message - Loading message
 * @property {HTMLElement|null} element - Target element (if element-specific)
 * @property {number} timeoutId - Timeout ID
 * @property {number} startTime - Start timestamp
 */

/**
 * @typedef {Object} ErrorHandlerOptions
 * @property {boolean} [enableGlobalHandler=true] - Enable global error handlers
 * @property {boolean} [enableConsoleLog=true] - Enable console logging
 * @property {boolean} [enableUserNotification=true] - Enable user notifications
 * @property {number} [maxErrors=100] - Maximum errors to store
 * @property {number} [retryAttempts=3] - Maximum retry attempts
 * @property {number} [retryDelay=1000] - Base retry delay in milliseconds
 */

/**
 * @typedef {Object} ErrorContext
 * @property {Error} [originalError] - Original error object
 * @property {string} [userMessage] - User-friendly error message
 * @property {string} [userDetails] - Additional user details
 * @property {string} [operation] - Operation that failed
 * @property {Object} [metadata] - Additional metadata
 */

/**
 * @typedef {Object} ErrorAction
 * @property {string} label - Action button label
 * @property {Function} action - Action callback function
 */

/**
 * @typedef {Object} NotificationOptions
 * @property {number} [timeout=5000] - Auto-hide timeout in milliseconds
 * @property {boolean} [persistent=false] - Whether notification persists
 * @property {ErrorAction[]} [actions] - Action buttons
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [showNotification] - Force show notification for low severity
 */

export {}; // Make this a module