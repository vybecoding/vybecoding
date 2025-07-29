// Ensure guides-specific CSS is loaded
(function() {
        const cssFiles = [
        'css/guides-showcase-match.css',
        'css/guides-date-corner.css',
        'css/guides-container-fix.css',
        'css/badge-component.css',
        'css/vertical-centering-fix.css',
        'css/guides-spacing-fix.css',
        'css/guides-flex-fix.css',
        // Showcase perfected styles
        'css/showcase-cards-fix.css',
        'css/force-flexible-cards.css',
        'css/showcase-perfect-labels.css',
        'css/ultimate-row-spacing.css',
        'css/fix-calendar-and-member-cards.css',
        'css/fix-badge-spacing.css',
        'css/guides-badge-spacing-fix.css',
        'css/universal-badge-spacing.css',
        'css/universal-card-padding.css',
        'css/badge-gap-fix.css',
        'css/force-4px-badge-gap.css'
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