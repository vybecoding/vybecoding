/**
 * Base Component Styles
 * Foundation styles for components using CSS Modules approach
 */

import { createVariants } from '../utils/css-modules';

/**
 * Button base styles
 * Demonstrates CSS Modules + Tailwind hybrid approach
 */
export const buttonVariants = createVariants({
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  
  variants: {
    variant: {
      primary: 'bg-brand-primary text-white hover:bg-purple-light focus:ring-brand-primary',
      secondary: 'bg-brand-secondary text-white hover:bg-pink-coral focus:ring-brand-secondary',
      gradient: 'bg-gradient-vybe text-white hover:shadow-glow-purple focus:ring-brand-primary',
      ghost: 'bg-transparent hover:bg-gray-steel text-gray-light hover:text-white',
      glass: 'backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20',
    },
    
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    },
    
    glow: {
      true: 'shadow-glow-purple hover:shadow-glow-pink',
      false: '',
    },
  },
  
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    glow: false,
  },
});

/**
 * Card base styles
 */
export const cardVariants = createVariants({
  base: 'rounded-xl transition-all duration-300',
  
  variants: {
    variant: {
      solid: 'bg-gray-steel border border-gray-carbon',
      glass: 'backdrop-blur-md bg-white/5 border border-white/10',
      gradient: 'bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 border border-brand-primary/20',
    },
    
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    
    interactive: {
      true: 'hover:scale-[1.02] hover:shadow-xl cursor-pointer',
      false: '',
    },
  },
  
  defaultVariants: {
    variant: 'solid',
    padding: 'md',
    interactive: false,
  },
});

/**
 * Badge base styles
 */
export const badgeVariants = createVariants({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  
  variants: {
    variant: {
      purple: 'bg-purple/20 text-purple-light',
      pink: 'bg-pink/20 text-pink-coral',
      orange: 'bg-orange/20 text-orange-amber',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      error: 'bg-error/20 text-error',
      info: 'bg-info/20 text-info',
    },
    
    glow: {
      true: 'shadow-sm',
      false: '',
    },
  },
  
  defaultVariants: {
    variant: 'purple',
    glow: false,
  },
});

/**
 * Input base styles
 */
export const inputVariants = createVariants({
  base: 'w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2',
  
  variants: {
    variant: {
      solid: 'bg-gray-steel border border-gray-carbon text-white placeholder:text-gray-mist focus:border-brand-primary focus:ring-brand-primary',
      glass: 'backdrop-blur-md bg-white/5 border border-white/10 text-white placeholder:text-gray-fog focus:border-white/30 focus:ring-white/20',
    },
    
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    },
  },
  
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

/**
 * Typography base styles
 */
export const headingVariants = createVariants({
  base: 'font-bold',
  
  variants: {
    level: {
      h1: 'text-5xl lg:text-6xl',
      h2: 'text-4xl lg:text-5xl',
      h3: 'text-3xl lg:text-4xl',
      h4: 'text-2xl lg:text-3xl',
      h5: 'text-xl lg:text-2xl',
      h6: 'text-lg lg:text-xl',
    },
    
    gradient: {
      true: 'bg-gradient-vybe bg-clip-text text-transparent',
      false: '',
    },
    
    glow: {
      true: 'drop-shadow-glow-purple',
      false: '',
    },
  },
  
  defaultVariants: {
    level: 'h1',
    gradient: false,
    glow: false,
  },
});