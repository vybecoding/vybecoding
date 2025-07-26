#!/usr/bin/env node

/**
 * Build script for minifying CSS and JS files
 * Requires: npm install -g terser clean-css-cli
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directories
const dirs = ['dist/css', 'dist/js'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('🔨 Building minified assets...\n');

// Minify JavaScript files
const jsFiles = [
    'js/page-loader.js',
    'js/tabs.js',
    'js/app-core.js',
    'js/security-utils.js'
];

console.log('📦 Minifying JavaScript files:');
jsFiles.forEach(file => {
    const inputFile = path.join(__dirname, file);
    const outputFile = path.join(__dirname, 'dist', file.replace('.js', '.min.js'));
    
    try {
        // Check if terser is installed
        try {
            execSync('which terser', { stdio: 'ignore' });
        } catch {
            console.log('⚠️  Terser not found. Install with: npm install -g terser');
            process.exit(1);
        }
        
        // Minify with terser
        execSync(`terser ${inputFile} -o ${outputFile} -c -m`, { stdio: 'inherit' });
        
        const originalSize = fs.statSync(inputFile).size;
        const minifiedSize = fs.statSync(outputFile).size;
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✅ ${file} → ${file.replace('.js', '.min.js')} (${reduction}% smaller)`);
    } catch (error) {
        console.error(`  ❌ Error minifying ${file}:`, error.message);
    }
});

// Minify CSS files
console.log('\n📦 Minifying CSS files:');
const cssFiles = ['css/styles.css'];

cssFiles.forEach(file => {
    const inputFile = path.join(__dirname, file);
    const outputFile = path.join(__dirname, 'dist', file.replace('.css', '.min.css'));
    
    try {
        // Check if clean-css is installed
        try {
            execSync('which cleancss', { stdio: 'ignore' });
        } catch {
            console.log('⚠️  Clean-CSS not found. Install with: npm install -g clean-css-cli');
            process.exit(1);
        }
        
        // Minify with clean-css
        execSync(`cleancss -O2 -o ${outputFile} ${inputFile}`, { stdio: 'inherit' });
        
        const originalSize = fs.statSync(inputFile).size;
        const minifiedSize = fs.statSync(outputFile).size;
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✅ ${file} → ${file.replace('.css', '.min.css')} (${reduction}% smaller)`);
    } catch (error) {
        console.error(`  ❌ Error minifying ${file}:`, error.message);
    }
});

// Create production HTML that uses minified files
console.log('\n📄 Creating production HTML...');
const htmlContent = fs.readFileSync('index.html', 'utf8');
const productionHtml = htmlContent
    .replace(/href="css\/styles\.css\?v=\d+"/g, 'href="dist/css/styles.min.css"')
    .replace(/src="js\/page-loader\.js"/g, 'src="dist/js/page-loader.min.js"')
    .replace(/src="js\/tabs\.js"/g, 'src="dist/js/tabs.min.js"');

fs.writeFileSync('index-production.html', productionHtml);
console.log('  ✅ Created index-production.html');

console.log('\n✨ Build complete!');