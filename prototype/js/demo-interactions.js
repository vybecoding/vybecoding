/**
 * Demo Interactions
 * Adds basic interactivity for demo purposes
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Search functionality feedback
    document.querySelectorAll('input[type="search"], .search-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                showDemoMessage('Search functionality will be available in the full version');
            }
        });
    });
    
    // 2. Form submission feedback
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formName = form.id || 'Form';
            showDemoMessage(`${formName} submitted successfully! (Demo mode)`);
        });
    });
    
    // 3. Filter/Sort interactions
    document.querySelectorAll('select.filter, select.sort').forEach(select => {
        select.addEventListener('change', (e) => {
            showDemoMessage(`Filter applied: ${e.target.value}`);
        });
    });
    
    // 4. Unlock premium content
    document.querySelectorAll('[id*="unlock"], .unlock-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoMessage('Premium content unlock flow would start here');
        });
    });
    
    // 5. Book session buttons
    document.querySelectorAll('[onclick*="bookSession"]').forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showDemoMessage('Booking system integration coming soon');
            });
        }
    });
    
    // 6. Save/Bookmark functionality
    document.querySelectorAll('[onclick*="save"], [onclick*="bookmark"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoMessage('Saved to your collection');
        });
    });
    
    // 7. Share buttons
    document.querySelectorAll('.share-button, [onclick*="share"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoMessage('Share functionality coming soon');
        });
    });
    
});

// Demo message display function
function showDemoMessage(message) {
    // Remove any existing demo messages
    const existing = document.querySelector('.demo-message');
    if (existing) {
        existing.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'demo-message';
    messageEl.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(236, 72, 153, 0.95) 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        ">
            <div style="display: flex; align-items: center; gap: 12px;">
                <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div style="font-size: 14px; line-height: 1.4;">${message}</div>
            </div>
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Expose function globally
window.showDemoMessage = showDemoMessage;