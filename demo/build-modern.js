#!/usr/bin/env node

/**
 * Modern build script for VybeCoding demo
 * Provides Vite build with fallback to legacy system
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Check if Vite is available
 * @returns {boolean} True if Vite is installed
 */
function hasVite() {
    try {
        execSync('npm list vite', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Run Vite build
 * @returns {Promise<boolean>} True if successful
 */
async function runViteBuild() {
    try {
        console.log('🚀 Building with Vite...');
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Vite build completed successfully');
        return true;
    } catch (error) {
        console.error('❌ Vite build failed:', error.message);
        return false;
    }
}

/**
 * Run legacy build system
 * @returns {Promise<boolean>} True if successful
 */
async function runLegacyBuild() {
    try {
        console.log('🔄 Falling back to legacy build system...');
        
        // Check if legacy build files exist
        const legacyFiles = ['build-all.cjs', 'minify.cjs'];
        const missingFiles = legacyFiles.filter(file => !existsSync(path.join(__dirname, file)));
        
        if (missingFiles.length > 0) {
            throw new Error(`Missing legacy build files: ${missingFiles.join(', ')}`);
        }
        
        execSync('npm run build:legacy', { stdio: 'inherit' });
        console.log('✅ Legacy build completed successfully');
        return true;
    } catch (error) {
        console.error('❌ Legacy build failed:', error.message);
        return false;
    }
}

/**
 * Main build function
 */
async function main() {
    console.log('🏗️  VybeCoding Demo Build System');
    console.log('================================');
    
    // Try Vite first if available
    if (hasVite()) {
        const viteSuccess = await runViteBuild();
        if (viteSuccess) {
            console.log('\n🎉 Build completed with modern pipeline!');
            console.log('📁 Output: dist/');
            console.log('🌐 Preview: npm run preview');
            return;
        }
    }
    
    // Fallback to legacy build
    console.log('\n⚠️  Vite not available, using legacy build system');
    const legacySuccess = await runLegacyBuild();
    
    if (legacySuccess) {
        console.log('\n✅ Build completed with legacy pipeline!');
        console.log('📁 Output: dist/');
        console.log('🌐 Serve: npm run serve:dist');
    } else {
        console.error('\n❌ All build systems failed!');
        console.error('Please check your configuration and try again.');
        process.exit(1);
    }
}

// Handle CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    });
}

export { main as buildModern };