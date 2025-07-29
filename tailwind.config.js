/** @type {import('tailwindcss').Config} */
const { colors } = require('./design-system/tokens/colors.js');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
  	extend: {
  		colors: {
  			background: {
  				DEFAULT: 'hsl(var(--background))',
  				secondary: 'hsl(var(--background-secondary))',
  				tertiary: 'hsl(var(--background-tertiary))',
  				elevated: 'hsl(var(--background-elevated))'
  			},
  			foreground: {
  				DEFAULT: 'hsl(var(--foreground))',
  				secondary: 'hsl(var(--foreground-secondary))',
  				tertiary: 'hsl(var(--foreground-tertiary))',
  				muted: 'hsl(var(--foreground-muted))'
  			},
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				subtle: 'hsl(var(--border-subtle))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			// Brand colors with exact values from demo
  			brand: {
  				primary: '#8a2be2',
  				secondary: '#d946a0',
  				accent: '#e96b3a',
  			},
  			// Vybe color palette from demo
  			vybe: {
  				// Neutral palette
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
  				'matrix-green': '#00ff88',
  				'neural-purple': '#8844ff',
  				'quantum-orange': '#ff8800',
  				'plasma-pink': '#ff44aa',
  				'fusion-cyan': '#0066ff',
  				'laser-red': '#ff4444',
  				'volt-yellow': '#ffff00',
  			},
  			// Extended color palettes
  			purple: colors.purple,
  			pink: colors.pink,
  			orange: colors.orange,
  			ai: colors.ai,
  			gray: colors.neutral,
  			// Semantic colors
  			success: '#00ff88',
  			warning: '#ff8800',
  			error: '#ff4444',
  			info: '#0066ff'
  		},
  		backgroundImage: {
  			'gradient-vybe': 'linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  			'gradient-vybe-reverse': 'linear-gradient(270deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  			'gradient-vybe-radial': 'radial-gradient(circle, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  			'gradient-purple': 'linear-gradient(135deg, #8a2be2 0%, #6366F1 100%)',
  			'gradient-pink': 'linear-gradient(135deg, #d946a0 0%, #ff6b9d 100%)',
  			'gradient-orange': 'linear-gradient(135deg, #e96b3a 0%, #F59E0B 100%)',
  			'gradient-ai': 'linear-gradient(90deg, #00ff88 0%, #8844ff 25%, #ff8800 50%, #ff44aa 75%, #0066ff 100%)'
  		},
  		boxShadow: {
  			'glow-purple': '0 0 20px rgba(138, 43, 226, 0.3)',
  			'glow-pink': '0 0 20px rgba(217, 70, 160, 0.3)',
  			'glow-orange': '0 0 20px rgba(233, 107, 58, 0.3)'
  		},
  		animation: {
  			glow: 'glow 2s ease-in-out infinite alternate',
  			'gradient-x': 'gradient-x 3s ease infinite',
  			'gradient-y': 'gradient-y 3s ease infinite',
  			'gradient-xy': 'gradient-xy 3s ease infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fadeIn 0.8s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
  			'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
  			'particle-float': 'particleFloat 12.5s linear infinite',
  			'neural-pulse': 'neuralPulse 5s ease-in-out infinite',
			'spin-slow': 'spin 8s linear infinite',
  		},
  		keyframes: {
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px rgba(138, 43, 226, 0.2)'
  				},
  				'100%': {
  					boxShadow: '0 0 20px rgba(138, 43, 226, 0.4), 0 0 30px rgba(217, 70, 160, 0.3)'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				}
  			},
  			'gradient-y': {
  				'0%, 100%': {
  					'background-position': '50% 0%'
  				},
  				'50%': {
  					'background-position': '50% 100%'
  				}
  			},
  			'gradient-xy': {
  				'0%, 100%': {
  					'background-position': '0% 0%'
  				},
  				'25%': {
  					'background-position': '100% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				'75%': {
  					'background-position': '0% 100%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			fadeIn: {
  				from: { 
  					opacity: '0', 
  					transform: 'translateY(20px)' 
  				},
  				to: { 
  					opacity: '1', 
  					transform: 'translateY(0)' 
  				}
  			},
  			slideUp: {
  				from: { 
  					opacity: '0', 
  					transform: 'translateY(40px)' 
  				},
  				to: { 
  					opacity: '1', 
  					transform: 'translateY(0)' 
  				}
  			},
  			gentleBounce: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-3px)' }
  			},
  			subtlePulse: {
  				'0%, 100%': { opacity: '0.7' },
  				'50%': { opacity: '1' }
  			},
  			particleFloat: {
  				'0%': {
  					transform: 'translateY(100vh) rotate(0deg)',
  					opacity: '0'
  				},
  				'10%': {
  					opacity: '0.35'
  				},
  				'90%': {
  					opacity: '0.35'
  				},
  				'100%': {
  					transform: 'translateY(-100vh) rotate(720deg)',
  					opacity: '0'
  				}
  			},
  			neuralPulse: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '0.15'
  				},
  				'50%': {
  					transform: 'scale(1.5)',
  					opacity: '0.3'
  				}
  			}
  		}
  	}
  },
  plugins: [],
}