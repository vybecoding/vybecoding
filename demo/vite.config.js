/**
 * Vite configuration for VybeCoding demo
 * Modern build pipeline with optimization and development tools
 */

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  
  // Development server configuration
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    hmr: {
      overlay: true
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: '0.0.0.0'
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    
    // Asset handling
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        // Code splitting configuration
        manualChunks: {
          vendor: ['utils'],
          navigation: ['./js/modules/navigation.js'],
          ui: ['./js/modules/tabs.js', './js/modules/loading.js'],
          error: ['./js/modules/error-handler.js']
        },
        // Asset naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${extType}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/img/[name]-[hash].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        }
      }
    },
    
    // Performance optimizations
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        // PostCSS plugins will be configured separately
      ]
    }
  },
  
  // Plugin configuration
  plugins: [
    // Custom plugin to handle legacy browser support
    {
      name: 'legacy-support',
      generateBundle(options, bundle) {
        // Add polyfills and legacy support
        this.emitFile({
          type: 'asset',
          fileName: 'legacy-polyfills.js',
          source: `
            // Legacy browser polyfills
            if (!window.fetch) {
              console.warn('Fetch API not supported, please use a modern browser');
            }
            if (!window.Promise) {
              console.warn('Promises not supported, please use a modern browser');
            }
          `
        });
      }
    }
  ],
  
  // Dependency optimization
  optimizeDeps: {
    include: [],
    exclude: []
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './js'),
      '@modules': resolve(__dirname, './js/modules'),
      '@css': resolve(__dirname, './css'),
      '@assets': resolve(__dirname, './assets')
    }
  }
});