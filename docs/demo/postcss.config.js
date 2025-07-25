/**
 * PostCSS configuration for VybeCoding demo
 * CSS processing and optimization
 */

export default {
  plugins: {
    // Import resolution
    'postcss-import': {},
    
    // CSS nesting support
    'postcss-nesting': {},
    
    // Custom properties fallbacks
    'postcss-custom-properties': {
      preserve: true
    },
    
    // Autoprefixer for vendor prefixes
    'autoprefixer': {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11'
      ]
    },
    
    // CSS optimization (production only)
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['advanced', {
          discardComments: {
            removeAll: true
          },
          reduceIdents: false,
          zindex: false
        }]
      }
    } : {})
  }
};