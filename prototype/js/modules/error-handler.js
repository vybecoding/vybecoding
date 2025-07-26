/**
 * @fileoverview Error handling utilities for VybeCoding demo
 * @module error-handler
 */

import { EventEmitter } from './utils.js';

/**
 * Error types enumeration
 * @readonly
 * @enum {string}
 */
export const ErrorType = {
    NETWORK: 'network',
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    PERMISSION: 'permission',
    NOT_FOUND: 'not_found',
    SERVER: 'server',
    CLIENT: 'client',
    UNKNOWN: 'unknown'
};

/**
 * Error severity levels
 * @readonly
 * @enum {string}
 */
export const ErrorSeverity = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};

/**
 * Custom application error
 * @extends Error
 */
export class AppError extends Error {
    /**
     * Create an application error
     * @param {string} message - Error message
     * @param {string} type - Error type from ErrorType enum
     * @param {string} severity - Error severity from ErrorSeverity enum
     * @param {Object} context - Additional error context
     */
    constructor(message, type = ErrorType.UNKNOWN, severity = ErrorSeverity.MEDIUM, context = {}) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.severity = severity;
        this.context = context;
        this.timestamp = new Date().toISOString();
        this.id = this.generateId();
    }
    
    /**
     * Generate unique error ID
     * @returns {string} Unique error ID
     * @private
     */
    generateId() {
        return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Convert error to JSON
     * @returns {Object} Error object
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            message: this.message,
            type: this.type,
            severity: this.severity,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

/**
 * Global error handler
 * @extends EventEmitter
 * @fires ErrorHandler#error:captured
 * @fires ErrorHandler#error:displayed
 * @fires ErrorHandler#error:recovered
 */
export class ErrorHandler extends EventEmitter {
    /**
     * Create an error handler
     * @param {import('../types.js').ErrorHandlerOptions} options - Configuration options
     */
    constructor(options = {}) {
        super();
        this.options = {
            enableGlobalHandler: true,
            enableConsoleLog: true,
            enableUserNotification: true,
            maxErrors: 100,
            retryAttempts: 3,
            retryDelay: 1000,
            ...options
        };
        this.errorLog = [];
        this.retryCount = new Map();
        this.init();
    }
    
    /**
     * Initialize error handler
     * @private
     */
    init() {
        if (this.options.enableGlobalHandler) {
            this.setupGlobalHandlers();
        }
        this.createNotificationContainer();
    }
    
    /**
     * Setup global error handlers
     * @private
     */
    setupGlobalHandlers() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            const error = new AppError(
                event.message,
                ErrorType.CLIENT,
                ErrorSeverity.HIGH,
                {
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    stack: event.error?.stack
                }
            );
            this.handleError(error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            const error = new AppError(
                event.reason?.message || 'Unhandled promise rejection',
                ErrorType.CLIENT,
                ErrorSeverity.HIGH,
                {
                    reason: event.reason,
                    promise: event.promise
                }
            );
            this.handleError(error);
        });
    }
    
    /**
     * Create notification container
     * @private
     */
    createNotificationContainer() {
        if (document.getElementById('error-notifications')) return;
        
        const container = document.createElement('div');
        container.id = 'error-notifications';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-label', 'Error notifications');
        
        document.body.appendChild(container);
    }
    
    /**
     * Handle an error
     * @param {Error|AppError} error - Error to handle
     * @param {Object} options - Handling options
     */
    handleError(error, options = {}) {
        const appError = error instanceof AppError ? error : this.normalizeError(error);
        
        // Log error
        this.logError(appError);
        
        // Emit error event
        this.emit('error:captured', appError);
        
        // Handle based on severity
        switch (appError.severity) {
            case ErrorSeverity.CRITICAL:
                this.handleCriticalError(appError, options);
                break;
            case ErrorSeverity.HIGH:
                this.handleHighSeverityError(appError, options);
                break;
            case ErrorSeverity.MEDIUM:
                this.handleMediumSeverityError(appError, options);
                break;
            case ErrorSeverity.LOW:
                this.handleLowSeverityError(appError, options);
                break;
        }
    }
    
    /**
     * Normalize error to AppError
     * @param {Error} error - Error to normalize
     * @returns {AppError} Normalized error
     * @private
     */
    normalizeError(error) {
        if (error instanceof AppError) return error;
        
        let type = ErrorType.UNKNOWN;
        let severity = ErrorSeverity.MEDIUM;
        
        // Determine error type based on error properties
        if (error.name === 'TypeError') {
            type = ErrorType.CLIENT;
        } else if (error.name === 'NetworkError' || error.message.includes('fetch')) {
            type = ErrorType.NETWORK;
            severity = ErrorSeverity.HIGH;
        } else if (error.name === 'ValidationError') {
            type = ErrorType.VALIDATION;
            severity = ErrorSeverity.LOW;
        }
        
        return new AppError(error.message, type, severity, {
            originalError: error,
            stack: error.stack
        });
    }
    
    /**
     * Log error
     * @param {AppError} error - Error to log
     * @private
     */
    logError(error) {
        // Add to error log
        this.errorLog.push(error);
        
        // Limit error log size
        if (this.errorLog.length > this.options.maxErrors) {
            this.errorLog.shift();
        }
        
        // Console log if enabled
        if (this.options.enableConsoleLog) {
            console.error(`[${error.severity.toUpperCase()}] ${error.type}:`, error.message, error);
        }
    }
    
    /**
     * Handle critical errors
     * @param {AppError} error - Error to handle
     * @param {Object} options - Handling options
     * @private
     */
    handleCriticalError(error, options) {
        this.showNotification(error, {
            ...options,
            persistent: true,
            actions: [
                { label: 'Reload Page', action: () => window.location.reload() },
                { label: 'Report Issue', action: () => this.reportError(error) }
            ]
        });
    }
    
    /**
     * Handle high severity errors
     * @param {AppError} error - Error to handle
     * @param {Object} options - Handling options
     * @private
     */
    handleHighSeverityError(error, options) {
        this.showNotification(error, {
            ...options,
            timeout: 10000,
            actions: [
                { label: 'Retry', action: () => this.retryOperation(error) },
                { label: 'Dismiss', action: () => {} }
            ]
        });
    }
    
    /**
     * Handle medium severity errors
     * @param {AppError} error - Error to handle
     * @param {Object} options - Handling options
     * @private
     */
    handleMediumSeverityError(error, options) {
        this.showNotification(error, {
            ...options,
            timeout: 5000
        });
    }
    
    /**
     * Handle low severity errors
     * @param {AppError} error - Error to handle
     * @param {Object} options - Handling options
     * @private
     */
    handleLowSeverityError(error, options) {
        // Only log, don't show notification unless specified
        if (options.showNotification) {
            this.showNotification(error, {
                ...options,
                timeout: 3000
            });
        }
    }
    
    /**
     * Show error notification
     * @param {AppError} error - Error to display
     * @param {Object} options - Notification options
     */
    showNotification(error, options = {}) {
        if (!this.options.enableUserNotification) return;
        
        const {
            timeout = 5000,
            persistent = false,
            actions = [],
            className = ''
        } = options;
        
        const container = document.getElementById('error-notifications');
        const notification = document.createElement('div');
        
        const severityClass = this.getSeverityClass(error.severity);
        notification.className = `error-notification ${severityClass} ${className} bg-vybe-shadow/95 border border-red-400/50 rounded-lg p-4 shadow-lg backdrop-blur-sm max-w-md`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        const userMessage = this.getUserFriendlyMessage(error);
        
        notification.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                    ${this.getSeverityIcon(error.severity)}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-white font-medium text-sm">${userMessage}</div>
                    ${error.context?.userDetails ? `<div class="text-gray-300 text-xs mt-1">${error.context.userDetails}</div>` : ''}
                </div>
                <button class="flex-shrink-0 text-gray-400 hover:text-white close-btn">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            ${actions.length > 0 ? this.createActionButtons(actions) : ''}
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        container.appendChild(notification);
        
        // Auto-remove if not persistent
        if (!persistent && timeout > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, timeout);
        }
        
        this.emit('error:displayed', error);
    }
    
    /**
     * Get severity CSS class
     * @param {string} severity - Error severity
     * @returns {string} CSS class name
     * @private
     */
    getSeverityClass(severity) {
        const classes = {
            [ErrorSeverity.LOW]: 'border-yellow-400/50',
            [ErrorSeverity.MEDIUM]: 'border-orange-400/50',
            [ErrorSeverity.HIGH]: 'border-red-400/50',
            [ErrorSeverity.CRITICAL]: 'border-red-600/75 ring-2 ring-red-600/25'
        };
        return classes[severity] || classes[ErrorSeverity.MEDIUM];
    }
    
    /**
     * Get severity icon
     * @param {string} severity - Error severity
     * @returns {string} SVG icon HTML
     * @private
     */
    getSeverityIcon(severity) {
        const icons = {
            [ErrorSeverity.LOW]: '<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
            [ErrorSeverity.MEDIUM]: '<svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
            [ErrorSeverity.HIGH]: '<svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>',
            [ErrorSeverity.CRITICAL]: '<svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
        };
        return icons[severity] || icons[ErrorSeverity.MEDIUM];
    }
    
    /**
     * Get user-friendly error message
     * @param {AppError} error - Error object
     * @returns {string} User-friendly message
     * @private
     */
    getUserFriendlyMessage(error) {
        const messages = {
            [ErrorType.NETWORK]: 'Connection problem. Please check your internet connection.',
            [ErrorType.AUTHENTICATION]: 'Please sign in to continue.',
            [ErrorType.PERMISSION]: 'You don\'t have permission to perform this action.',
            [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
            [ErrorType.SERVER]: 'Server error. Please try again later.',
            [ErrorType.VALIDATION]: 'Please check your input and try again.',
            [ErrorType.CLIENT]: 'Something went wrong. Please refresh the page.'
        };
        
        return error.context?.userMessage || messages[error.type] || 'An unexpected error occurred.';
    }
    
    /**
     * Create action buttons
     * @param {Array} actions - Action definitions
     * @returns {string} HTML for action buttons
     * @private
     */
    createActionButtons(actions) {
        const buttons = actions.map(action => 
            `<button class="action-btn px-3 py-1 text-xs bg-vybe-purple hover:bg-vybe-purple-light text-white rounded transition-colors" data-action="${action.label}">
                ${action.label}
            </button>`
        ).join('');
        
        return `<div class="mt-3 flex gap-2">${buttons}</div>`;
    }
    
    /**
     * Remove notification
     * @param {HTMLElement} notification - Notification element
     * @private
     */
    removeNotification(notification) {
        notification.style.transition = 'opacity 0.3s ease-out';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    /**
     * Retry operation with exponential backoff
     * @param {AppError} error - Error that triggered retry
     * @returns {Promise} Retry promise
     */
    async retryOperation(error) {
        const retryKey = error.context?.operation || error.id;
        const currentRetries = this.retryCount.get(retryKey) || 0;
        
        if (currentRetries >= this.options.retryAttempts) {
            throw new AppError(
                'Maximum retry attempts exceeded',
                ErrorType.CLIENT,
                ErrorSeverity.HIGH,
                { originalError: error, retryAttempts: currentRetries }
            );
        }
        
        this.retryCount.set(retryKey, currentRetries + 1);
        
        // Exponential backoff
        const delay = this.options.retryDelay * Math.pow(2, currentRetries);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        this.emit('error:recovered', { error, attempt: currentRetries + 1 });
        
        // Reset retry count on success (would need to be called by the operation)
        // this.retryCount.delete(retryKey);
    }
    
    /**
     * Report error to external service
     * @param {AppError} error - Error to report
     */
    reportError(error) {
        // In a real application, this would send to an error reporting service
        console.log('Reporting error:', error.toJSON());
        
        // For demo purposes, just show a success message
        this.showNotification(
            new AppError('Error report sent successfully', ErrorType.CLIENT, ErrorSeverity.LOW),
            { timeout: 3000 }
        );
    }
    
    /**
     * Get error statistics
     * @returns {Object} Error statistics
     */
    getErrorStats() {
        const stats = {
            total: this.errorLog.length,
            bySeverity: {},
            byType: {},
            recent: this.errorLog.slice(-10)
        };
        
        // Count by severity
        Object.values(ErrorSeverity).forEach(severity => {
            stats.bySeverity[severity] = this.errorLog.filter(e => e.severity === severity).length;
        });
        
        // Count by type
        Object.values(ErrorType).forEach(type => {
            stats.byType[type] = this.errorLog.filter(e => e.type === type).length;
        });
        
        return stats;
    }
    
    /**
     * Clear error log
     */
    clearErrorLog() {
        this.errorLog = [];
        this.retryCount.clear();
    }
}

// Global error handler instance
export const globalErrorHandler = new ErrorHandler();