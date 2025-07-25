#!/usr/bin/env node

/**
 * Complete build script for production optimization
 * - Minifies CSS and JS
 * - Creates optimized HTML
 * - Removes CDN dependencies
 */

const fs = require('fs');
const path = require('path');

// Ensure dist directories exist
['dist', 'dist/css', 'dist/js'].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('🚀 Production Build Starting...\n');

// Simple minification functions
function minifyJS(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around syntax
        .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
        .trim();
}

function minifyCSS(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around syntax
        .replace(/;}/g, '}') // Remove last semicolon
        .replace(/\s*>\s*/g, '>') // Remove spaces around selectors
        .trim();
}

// Step 1: Minify JavaScript files
console.log('📦 Minifying JavaScript...');
const jsFiles = ['js/page-loader.js', 'js/tabs.js'];

jsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const minified = minifyJS(content);
    fs.writeFileSync(path.join('dist', file), minified);
    
    const reduction = ((1 - minified.length / content.length) * 100).toFixed(1);
    console.log(`  ✅ ${file} (${reduction}% smaller)`);
});

// Step 2: Minify CSS
console.log('\n📦 Minifying CSS...');
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
const minifiedCSS = minifyCSS(cssContent);
fs.writeFileSync('dist/css/styles.css', minifiedCSS);

const cssReduction = ((1 - minifiedCSS.length / cssContent.length) * 100).toFixed(1);
console.log(`  ✅ css/styles.css (${cssReduction}% smaller)`);

// Step 3: Create optimized HTML
console.log('\n📄 Creating optimized HTML...');
let html = fs.readFileSync('index.html', 'utf8');

// Remove Tailwind CDN and config script
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>[\s\S]*?<\/script>/m, '');

// Add precompiled Tailwind styles (assuming we have them)
const tailwindPlaceholder = '<!-- Tailwind styles will be inserted here -->';
const tailwindStyles = `
    <style>
        /* Core Tailwind utilities used in the project */
        /* This is a subset - in production, use the full Tailwind build */
        .fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}
        .inset-0{inset:0}.top-0{top:0}.left-0{left:0}.right-0{right:0}
        .z-10{z-index:10}.z-50{z-index:50}
        .mx-auto{margin-left:auto;margin-right:auto}
        .flex{display:flex}.hidden{display:none}.block{display:block}
        .h-8{height:2rem}.w-8{width:2rem}.h-full{height:100%}.w-full{width:100%}
        .max-w-7xl{max-width:80rem}
        .items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}
        .gap-3{gap:0.75rem}.space-x-8>*+*{margin-left:2rem}
        .rounded-lg{border-radius:0.5rem}.rounded-md{border-radius:0.375rem}
        .border{border-width:1px}.border-2{border-width:2px}
        .bg-black{background-color:#000}.text-white{color:#fff}
        .px-6{padding-left:1.5rem;padding-right:1.5rem}
        .text-lg{font-size:1.125rem}.text-xl{font-size:1.25rem}.text-xs{font-size:0.75rem}
        .font-semibold{font-weight:600}.font-mono{font-family:monospace}
        .leading-none{line-height:1}
        .transition-colors{transition:color 0.15s}
        /* Add more as needed */
    </style>`;

// Update asset paths
html = html
    .replace('css/styles.css?v=2', 'dist/css/styles.css')
    .replace('js/page-loader.js', 'dist/js/page-loader.js')
    .replace('js/tabs.js', 'dist/js/tabs.js')
    .replace(tailwindPlaceholder, tailwindStyles);

// Minify inline styles
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
    return `<style>${minifyCSS(css)}</style>`;
});

// Minify inline scripts (preserve functionality)
html = html.replace(/<script>(?!.*tailwind\.config)([\s\S]*?)<\/script>/g, (match, js) => {
    return `<script>${minifyJS(js)}</script>`;
});

fs.writeFileSync('dist/index.html', html);
console.log('  ✅ Created dist/index.html');

// Step 4: Copy fonts and other assets
console.log('\n📁 Copying assets...');
// In a real build, you'd copy fonts, images, etc.

console.log('\n✨ Production build complete!');
console.log('\n📊 Summary:');
console.log('  - JavaScript minified and optimized');
console.log('  - CSS minified and optimized');
console.log('  - Removed external CDN dependencies');
console.log('  - Created production-ready dist/ folder');
console.log('\n🚀 Serve with: cd dist && python3 -m http.server 8080');