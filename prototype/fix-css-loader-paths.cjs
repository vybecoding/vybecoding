const fs = require('fs');
const path = require('path');

// Fix all CSS loader files to use correct relative paths
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
        
        // Replace the link.href line to add ../
        content = content.replace(
            /link\.href = file \+ '\?v=' \+ Date\.now\(\);/g,
            "link.href = '../' + file + '?v=' + Date.now();"
        );
        
        // Also update the querySelector to be more flexible
        content = content.replace(
            /const existing = document\.querySelector\(`link\[href\*="\${file}"\]`\);/g,
            'const existing = document.querySelector(`link[href*="${file.split(\'/\').pop()}"]`);'
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed paths in ${file}`);
    }
});

console.log('\\n✅ All CSS loader paths fixed!');