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
        'css/members-grid-fix.css'
    ];
    
    cssFiles.forEach(file => {
        const existing = document.querySelector(`link[href*="${file.split('/').pop()}"]`);
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../' + file + '?v=' + Date.now();
            document.head.appendChild(link);
        }
    });
})();