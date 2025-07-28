const fs = require('fs');
const path = require('path');

// CSS files from showcase that need to be applied to all pages
const showcaseCSSFiles = [
    'css/showcase-cards-fix.css',
    'css/force-flexible-cards.css', 
    'css/showcase-perfect-labels.css',
    'css/ultimate-row-spacing.css',
    'css/fix-calendar-and-member-cards.css'
];

// Update guides-css-loader.js to include showcase CSS
const guidesLoaderPath = path.join(__dirname, 'js/guides-css-loader.js');
let guidesLoader = fs.readFileSync(guidesLoaderPath, 'utf8');

// Add showcase CSS files to the loader
const newCSSList = `    const cssFiles = [
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
        'css/fix-calendar-and-member-cards.css'
    ];`;

guidesLoader = guidesLoader.replace(/const cssFiles = \[[\s\S]*?\];/, newCSSList);
fs.writeFileSync(guidesLoaderPath, guidesLoader);
console.log('✅ Updated guides-css-loader.js');

// Create loaders for other pages
const createCSSLoader = (pageName) => {
    const loaderContent = `// Ensure ${pageName}-specific CSS is loaded with showcase styles
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
        'css/fix-calendar-and-member-cards.css'
    ];
    
    cssFiles.forEach(file => {
        const existing = document.querySelector(\`link[href*="\${file}"]\`);
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file + '?v=' + Date.now();
            document.head.appendChild(link);
        }
    });
})();`;
    
    const loaderPath = path.join(__dirname, 'js', `${pageName}-css-loader.js`);
    fs.writeFileSync(loaderPath, loaderContent);
    console.log(`✅ Created ${pageName}-css-loader.js`);
};

// Create loaders for apps, members, featured pages
['apps', 'members', 'featured'].forEach(page => {
    createCSSLoader(page);
});

// Update HTML pages to include the CSS loaders
const updateHTMLPage = (pageName) => {
    const htmlPath = path.join(__dirname, 'pages', `${pageName}.html`);
    
    if (fs.existsSync(htmlPath)) {
        let content = fs.readFileSync(htmlPath, 'utf8');
        
        // Check if loader already exists
        if (!content.includes(`${pageName}-css-loader.js`)) {
            // Add loader script after the page-container div
            const loaderScript = `            <!-- Load ${pageName}-specific CSS -->
            <script src="js/${pageName}-css-loader.js"></script>
            `;
            
            content = content.replace(
                /(<div class="page-container[^"]*">)/,
                `$1\n${loaderScript}`
            );
            
            fs.writeFileSync(htmlPath, content);
            console.log(`✅ Updated ${pageName}.html to include CSS loader`);
        } else {
            console.log(`ℹ️ ${pageName}.html already has CSS loader`);
        }
    }
};

// Update all pages
['apps', 'members', 'featured'].forEach(page => {
    updateHTMLPage(page);
});

console.log('\\n🎉 All pages updated with showcase card styles!');