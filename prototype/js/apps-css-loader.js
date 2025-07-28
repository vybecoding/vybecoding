// Ensure apps-specific CSS is loaded
(function() {
    const cssFiles = [
        'css/apps-card-standard.css',
        'css/universal-card-standard.css',
        'css/badge-component.css',
        'css/vertical-centering-fix.css'
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