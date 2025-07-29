/**
 * Security Utilities for Safe DOM Manipulation
 * Replaces unsafe innerHTML usage with secure alternatives
 * Implements XSS prevention and input sanitization
 */

class SecurityUtils {
    /**
     * Safely creates and appends text content to an element
     * @param {HTMLElement} element - Target element
     * @param {string} text - Text content to add
     * @param {string} [className] - Optional CSS class for text wrapper
     */
    static setTextContent(element, text, className = '') {
        element.innerHTML = ''; // Clear existing content safely
        const textNode = document.createTextNode(text);
        
        if (className) {
            const wrapper = document.createElement('span');
            wrapper.className = className;
            wrapper.appendChild(textNode);
            element.appendChild(wrapper);
        } else {
            element.appendChild(textNode);
        }
    }

    /**
     * Safely creates a structured element with text content and optional sub-elements
     * @param {HTMLElement} parent - Parent element
     * @param {Object} config - Configuration object
     * @param {string} config.tag - HTML tag name
     * @param {string} [config.text] - Text content
     * @param {string} [config.className] - CSS class names
     * @param {Object} [config.attributes] - Element attributes
     * @param {Array} [config.children] - Child element configurations
     */
    static createSecureElement(parent, config) {
        parent.innerHTML = ''; // Clear parent safely
        
        const element = document.createElement(config.tag || 'div');
        
        // Set text content safely
        if (config.text) {
            element.textContent = config.text;
        }
        
        // Set class names
        if (config.className) {
            element.className = config.className;
        }
        
        // Set attributes safely
        if (config.attributes) {
            Object.entries(config.attributes).forEach(([key, value]) => {
                // Sanitize attribute names and values
                const sanitizedKey = key.replace(/[^a-zA-Z0-9-_]/g, '');
                const sanitizedValue = this.sanitizeAttribute(value);
                element.setAttribute(sanitizedKey, sanitizedValue);
            });
        }
        
        // Add children recursively
        if (config.children && Array.isArray(config.children)) {
            config.children.forEach(childConfig => {
                this.createSecureElement(element, childConfig);
            });
        }
        
        parent.appendChild(element);
        return element;
    }

    /**
     * Sanitizes text input to prevent XSS
     * @param {string} input - User input to sanitize
     * @returns {string} - Sanitized text
     */
    static sanitizeText(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // Create temporary element to leverage browser's built-in text encoding
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML; // This will be HTML-encoded
    }

    /**
     * Sanitizes attribute values
     * @param {string} value - Attribute value to sanitize
     * @returns {string} - Sanitized attribute value
     */
    static sanitizeAttribute(value) {
        if (typeof value !== 'string') {
            return '';
        }
        
        // Remove potentially dangerous characters and patterns
        return value
            .replace(/[<>"'&]/g, '') // Remove HTML chars
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+\s*=/gi, '') // Remove event handlers
            .substring(0, 200); // Limit length
    }

    /**
     * Safely updates date display with formatted date and subtitle
     * @param {HTMLElement} element - Target element
     * @param {string} displayDate - Date to display
     * @param {string} [subtitle] - Optional subtitle text
     */
    static updateDateDisplay(element, displayDate, subtitle = '') {
        this.createSecureElement(element, {
            tag: 'div',
            children: [
                {
                    tag: 'span',
                    text: this.sanitizeText(displayDate),
                    className: 'text-white'
                },
                ...(subtitle ? [{
                    tag: 'p',
                    text: this.sanitizeText(subtitle),
                    className: 'text-xs text-vybe-gray-500 mt-1'
                }] : [])
            ]
        });
    }

    /**
     * Safely creates price section with lock icon and text
     * @param {HTMLElement} element - Target element
     * @param {Object} config - Price configuration
     */
    static updatePriceSection(element, config) {
        const children = [];
        
        // Add lock icon if needed
        if (config.showLock) {
            children.push({
                tag: 'div',
                className: 'flex items-center gap-2 text-yellow-400',
                children: [
                    {
                        tag: 'svg',
                        className: 'w-4 h-4',
                        attributes: {
                            'viewBox': '0 0 24 24',
                            'fill': 'currentColor'
                        }
                        // Note: SVG path would need to be added via createElement for security
                    },
                    {
                        tag: 'span',
                        text: 'Premium Feature',
                        className: 'text-sm font-medium'
                    }
                ]
            });
        }
        
        // Add price text
        if (config.priceText) {
            children.push({
                tag: 'div',
                text: this.sanitizeText(config.priceText),
                className: 'text-2xl font-bold text-white'
            });
        }
        
        this.createSecureElement(element, {
            tag: 'div',
            className: config.containerClass || 'space-y-2',
            children
        });
    }

    /**
     * Safely creates success message with icon
     * @param {HTMLElement} element - Target element
     * @param {string} message - Success message text
     */
    static showSuccessMessage(element, message) {
        this.createSecureElement(element, {
            tag: 'div',
            className: 'flex items-center gap-2 text-green-400',
            children: [
                {
                    tag: 'div',
                    className: 'w-5 h-5 bg-green-500 rounded-full flex items-center justify-center',
                    children: [{
                        tag: 'span',
                        text: '✓',
                        className: 'text-white text-xs'
                    }]
                },
                {
                    tag: 'span',
                    text: this.sanitizeText(message),
                    className: 'font-medium'
                }
            ]
        });
    }

    /**
     * Creates pagination button with secure indicator
     * @param {HTMLElement} button - Button element
     * @param {boolean} isActive - Whether button is active
     */
    static updatePaginationButton(button, isActive) {
        this.createSecureElement(button, {
            tag: 'span',
            className: `w-2 h-2 rounded-full ${isActive ? 'bg-vybe-purple' : 'bg-vybe-gray-500'}`
        });
    }

    /**
     * Input validation for common form fields
     * @param {string} input - User input
     * @param {string} type - Validation type ('email', 'url', 'text', etc.)
     * @returns {Object} - Validation result {isValid: boolean, message: string}
     */
    static validateInput(input, type) {
        if (typeof input !== 'string') {
            return { isValid: false, message: 'Invalid input format' };
        }

        // Length check
        if (input.length > 1000) {
            return { isValid: false, message: 'Input too long' };
        }

        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return {
                    isValid: emailRegex.test(input),
                    message: emailRegex.test(input) ? '' : 'Please enter a valid email address'
                };
                
            case 'url':
                try {
                    new URL(input);
                    return { isValid: true, message: '' };
                } catch {
                    return { isValid: false, message: 'Please enter a valid URL' };
                }
                
            case 'text':
                const hasScript = /<script|javascript:|on\w+\s*=|<iframe/i.test(input);
                return {
                    isValid: !hasScript,
                    message: hasScript ? 'Invalid characters detected' : ''
                };
                
            default:
                return { isValid: true, message: '' };
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityUtils;
}

// Global access for backward compatibility
window.SecurityUtils = SecurityUtils;