const fs = require('fs');
const path = require('path');

// Add apps-news-badge-spacing.css to all CSS loaders
const loaderFiles = [
    'js/apps-css-loader.js',
    'js/featured-css-loader.js',
    'js/members-css-loader.js' // In case there are app cards on members page
];

loaderFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add the new CSS file to the list
        if (!content.includes('apps-news-badge-spacing.css')) {
            // Find where to insert - after fix-badge-spacing.css
            content = content.replace(
                /'css\/fix-badge-spacing\.css'/,
                `'css/fix-badge-spacing.css',
        'css/apps-news-badge-spacing.css'`
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Added apps-news-badge-spacing.css to ${file}`);
        } else {
            console.log(`ℹ️ apps-news-badge-spacing.css already in ${file}`);
        }
    }
});

// Also add to index.html for the main page sections
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    if (!indexContent.includes('apps-news-badge-spacing.css')) {
        // Add after guides-badge-spacing-fix.css
        indexContent = indexContent.replace(
            '<link rel="stylesheet" href="css/guides-badge-spacing-fix.css">',
            `<link rel="stylesheet" href="css/guides-badge-spacing-fix.css">
    <link rel="stylesheet" href="css/apps-news-badge-spacing.css">`
        );
        
        fs.writeFileSync(indexPath, indexContent);
        console.log('✅ Added apps-news-badge-spacing.css to index.html');
    }
}

console.log('\\n✅ Apps/News badge spacing CSS added to all relevant files!');