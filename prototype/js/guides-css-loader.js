// Ensure guides-specific CSS is loaded
(function() {
    const cssFiles = [
        'css/guides-showcase-match.css',
        'css/guides-date-corner.css',
        'css/guides-container-fix.css',
        'css/badge-component.css',
        'css/vertical-centering-fix.css',
        'css/guides-spacing-fix.css',
        'css/guides-flex-fix.css'
    ];
    
    cssFiles.forEach(file => {
        const existing = document.querySelector(`link[href*="${file}"]`);
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file + '?v=' + Date.now();
            document.head.appendChild(link);
        }
    });
})();