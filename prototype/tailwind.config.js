module.exports = {
  content: [
    './index.html',
    './dist/index.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        'vybe': {
          // Base colors
          'void': '#000000',
          'dark': '#0a0a0a',
          'midnight': '#111111',
          'shadow': '#1a1a1a',
          'steel': '#242424',
          'slate': '#2a2a2a',
          'carbon': '#333333',
          'pewter': '#404040',
          'silver': '#666666',
          'mist': '#888888',
          'fog': '#aaaaaa',
          'light': '#cccccc',
          
          // Purple to Orange Spectrum
          'purple': '#8a2be2',
          'purple-light': '#a855f7',
          'purple-lighter': '#a855f7',
          'violet': '#8B5CF6',
          'indigo': '#6366F1',
          'magenta': '#ff1493',
          'coral': '#ff6b9d',
          'pink': '#d946a0',
          'orange': '#e96b3a',
          'amber': '#F59E0B',
          
          // AI Accent Colors
          'cyan': '#8a2be2',
          'matrix-green': '#00ff88',
          'neural-purple': '#8844ff',
          'quantum-orange': '#ff8800',
          'plasma-pink': '#ff44aa',
          'fusion-cyan': '#0066ff',
          'laser-red': '#ff4444',
          'volt-yellow': '#ffff00',
          
          // Tier colors
          'free': '#8a2be2',
          'pro': '#8a2be2',
          
          // Gray scale
          'gray-950': '#050505',
          'gray-900': '#111111',
          'gray-800': '#1a1a1a',
          'gray-700': '#2a2a2a',
          'gray-600': '#404040',
          'gray-500': '#6b7280',
          'gray-400': '#888888',
          'gray-300': '#d1d5db',
          'gray-200': '#e5e7eb',
          'gray-100': '#f3f4f6',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
        'particle-float': 'particleFloat 12.5s linear infinite',
        'neural-pulse': 'neuralPulse 5s ease-in-out infinite',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'glow-soft': '0 0 20px rgba(138, 43, 226, 0.15)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.15)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.15)',
      }
    }
  },
  plugins: [],
}