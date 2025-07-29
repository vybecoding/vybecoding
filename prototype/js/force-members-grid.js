// Force members grid to display properly
(function() {
    function forceGridLayout() {
        const grids = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
        
        grids.forEach(grid => {
            // Remove any inline styles that might be interfering
            if (grid.style.gridTemplateColumns) {
                grid.style.removeProperty('grid-template-columns');
            }
            
            // Add a data attribute to help CSS target it
            grid.setAttribute('data-members-grid', 'true');
            
            // Force reflow
            grid.offsetHeight;
        });
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceGridLayout);
    } else {
        forceGridLayout();
    }
    
    // Also run after a short delay to catch any dynamic content
    setTimeout(forceGridLayout, 500);
    setTimeout(forceGridLayout, 1000);
    
    // Watch for navigation changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            if (document.querySelector('.grid.grid-cols-1')) {
                forceGridLayout();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();