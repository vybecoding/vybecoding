// Ensure guides-specific CSS is loaded
(function() {
    const cssFiles = [
        'css/guides-showcase-match.css',
        'css/guides-date-corner.css',
        'css/guides-container-fix.css',
        'css/badge-component.css'
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