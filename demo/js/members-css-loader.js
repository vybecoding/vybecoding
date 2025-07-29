// Ensure members-specific CSS is loaded with showcase styles
(function() {
    const cssFiles = [
        // Core styles
        'css/universal-card-standard.css',
        'css/badge-component.css',
        // Showcase perfected styles
        'css/showcase-cards-fix.css',
        'css/force-flexible-cards.css',
        'css/showcase-perfect-labels.css',
        'css/ultimate-row-spacing.css',
        'css/fix-calendar-and-member-cards.css',
        'css/fix-badge-spacing.css',
        'css/apps-news-badge-spacing.css',
        'css/universal-badge-spacing.css',
        'css/universal-card-padding.css',
        'css/badge-gap-fix.css',
        'css/force-4px-badge-gap.css',
        // Members page specific fixes
        'css/members-grid-fix.css',
        'css/force-members-3col.css',
        'css/members-3-column-grid.css',
        'css/members-grid-override.css'
    ];
    
    // Determine the correct path prefix based on current location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const pathPrefix = isInPagesDir ? '../' : '';
    
    cssFiles.forEach(file => {
        const existing = document.querySelector(`link[href*="${file.split('/').pop()}"]`);
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = pathPrefix + file + '?v=' + Date.now();
            document.head.appendChild(link);
        }
    });
})();