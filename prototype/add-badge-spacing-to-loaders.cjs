const fs = require('fs');
const path = require('path');

// Add fix-badge-spacing.css to all CSS loaders
const loaderFiles = [
    'js/guides-css-loader.js',
    'js/apps-css-loader.js', 
    'js/members-css-loader.js',
    'js/featured-css-loader.js'
];

loaderFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add the new CSS file to the list
        if (!content.includes('fix-badge-spacing.css')) {
            // Find the cssFiles array and add the new file
            content = content.replace(
                /'css\/fix-calendar-and-member-cards\.css'/,
                `'css/fix-calendar-and-member-cards.css',
        'css/fix-badge-spacing.css'`
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Added fix-badge-spacing.css to ${file}`);
        } else {
            console.log(`ℹ️ fix-badge-spacing.css already in ${file}`);
        }
    }
});

console.log('\\n✅ Badge spacing CSS added to all loaders!');