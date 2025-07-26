#!/usr/bin/env node

/**
 * Simple minification script using basic regex replacements
 * No external dependencies required
 */

const fs = require('fs');
const path = require('path');

// Create dist directories
const dirs = ['dist', 'dist/css', 'dist/js'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

/**
 * Simple JavaScript minifier
 */
function minifyJS(code) {
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, ''); // Block comments
    code = code.replace(/\/\/.*$/gm, ''); // Line comments
    
    // Remove extra whitespace
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/\s*([{}();,:])\s*/g, '$1');
    code = code.replace(/;\s*}/g, '}');
    
    // Remove trailing semicolons before closing braces
    code = code.replace(/;}/g, '}');
    
    return code.trim();
}

/**
 * Simple CSS minifier
 */
function minifyCSS(code) {
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove unnecessary whitespace
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/\s*([{}:;,])\s*/g, '$1');
    
    // Remove last semicolon before closing brace
    code = code.replace(/;}/g, '}');
    
    // Remove spaces around specific operators
    code = code.replace(/\s*>\s*/g, '>');
    code = code.replace(/\s*\+\s*/g, '+');
    code = code.replace(/\s*~\s*/g, '~');
    
    return code.trim();
}

console.log('🔨 Minifying assets...\n');

// JavaScript files to minify
const jsFiles = [
    'js/page-loader.js',
    'js/tabs.js'
];

console.log('📦 Minifying JavaScript:');
jsFiles.forEach(file => {
    try {
        const inputPath = path.join(__dirname, file);
        const outputPath = path.join(__dirname, 'dist', file);
        
        const content = fs.readFileSync(inputPath, 'utf8');
        const minified = minifyJS(content);
        
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = content.length;
        const minifiedSize = minified.length;
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✅ ${file} - ${reduction}% smaller`);
    } catch (error) {
        console.error(`  ❌ Error: ${file} - ${error.message}`);
    }
});

// CSS files to minify
console.log('\n📦 Minifying CSS:');
const cssFiles = ['css/styles.css'];

cssFiles.forEach(file => {
    try {
        const inputPath = path.join(__dirname, file);
        const outputPath = path.join(__dirname, 'dist', file);
        
        const content = fs.readFileSync(inputPath, 'utf8');
        const minified = minifyCSS(content);
        
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = content.length;
        const minifiedSize = minified.length;
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✅ ${file} - ${reduction}% smaller`);
    } catch (error) {
        console.error(`  ❌ Error: ${file} - ${error.message}`);
    }
});

// Also minify inline scripts and styles from HTML
console.log('\n📄 Creating optimized HTML...');
try {
    let html = fs.readFileSync('index.html', 'utf8');
    
    // Update paths to use minified versions
    html = html.replace('css/styles.css?v=2', 'dist/css/styles.css');
    html = html.replace('js/page-loader.js', 'dist/js/page-loader.js');
    html = html.replace('js/tabs.js', 'dist/js/tabs.js');
    
    // Minify inline styles
    html = html.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
        return `<style>${minifyCSS(css)}</style>`;
    });
    
    // Minify inline scripts (but preserve the Tailwind config)
    html = html.replace(/<script>([\s\S]*?)<\/script>/g, (match, js) => {
        if (js.includes('tailwind.config')) {
            // Don't minify Tailwind config too aggressively
            return match;
        }
        return `<script>${minifyJS(js)}</script>`;
    });
    
    fs.writeFileSync('dist/index.html', html);
    console.log('  ✅ Created dist/index.html');
} catch (error) {
    console.error('  ❌ Error creating optimized HTML:', error.message);
}

console.log('\n✨ Minification complete!');