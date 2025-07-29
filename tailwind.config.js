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
        // CSS Variable based colors
        background: {
          DEFAULT: 'hsl(var(--background))',
          secondary: 'hsl(var(--background-secondary))',
          tertiary: 'hsl(var(--background-tertiary))',
          elevated: 'hsl(var(--background-elevated))',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          secondary: 'hsl(var(--foreground-secondary))',
          tertiary: 'hsl(var(--foreground-tertiary))',
          muted: 'hsl(var(--foreground-muted))',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          subtle: 'hsl(var(--border-subtle))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // Brand Colors
        brand: {
          primary: 'hsl(var(--brand-primary))',
          secondary: 'hsl(var(--brand-secondary))',
          accent: 'hsl(var(--brand-accent))',
          ...colors.brand,
        },
        
        // Extended Palette
        purple: colors.purple,
        pink: colors.pink,
        orange: colors.orange,
        
        // AI Theme
        ai: colors.ai,
        
        // Neutrals (override Tailwind defaults)
        gray: colors.neutral,
        
        // Semantic
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        info: 'hsl(var(--info))',
      },
      
      // Custom gradients
      backgroundImage: {
        'gradient-vybe': 'linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
        'gradient-vybe-reverse': 'linear-gradient(270deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
        'gradient-vybe-radial': 'radial-gradient(circle, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8a2be2 0%, #6366F1 100%)',
        'gradient-pink': 'linear-gradient(135deg, #d946a0 0%, #ff6b9d 100%)',
        'gradient-orange': 'linear-gradient(135deg, #e96b3a 0%, #F59E0B 100%)',
        'gradient-ai': 'linear-gradient(90deg, #00ff88 0%, #8844ff 25%, #ff8800 50%, #ff44aa 75%, #0066ff 100%)',
      },
      
      // Shadows with glow effects
      boxShadow: {
        'glow-purple': '0 0 20px rgba(138, 43, 226, 0.3)',
        'glow-pink': '0 0 20px rgba(217, 70, 160, 0.3)',
        'glow-orange': '0 0 20px rgba(233, 107, 58, 0.3)',
      },
      
      // Custom animations
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
      },
      
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(138, 43, 226, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(138, 43, 226, 0.4), 0 0 30px rgba(217, 70, 160, 0.3)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '25%': { 'background-position': '100% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '75%': { 'background-position': '0% 100%' },
        },
      },
    },
  },
  plugins: [],
}