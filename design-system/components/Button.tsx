/**
 * Button Component
 * Demonstrates the CSS Modules + Tailwind hybrid approach
 */

import React, { forwardRef, MouseEvent, useState } from 'react';
import { cn, createStyles } from '../utils/css-modules';
import { buttonVariants } from '../styles/base';
import styles from './Button.module.css';

// Create a typed styles object
const s = createStyles(styles);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  effect3d?: boolean;
  glowTrail?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    variant = 'primary',
    size = 'md',
    glow = false,
    loading = false,
    iconLeft,
    iconRight,
    effect3d = false,
    glowTrail = false,
    children,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      // Create ripple effect
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      
      setRipples(prev => [...prev, { x, y, id }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
      
      // Call original onClick
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, glow }),
          s.compose(
            'button',
            loading && 'loading',
            effect3d && 'button3d',
            glowTrail && 'glowTrail'
          ),
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {iconLeft && <span className={s('iconLeft')}>{iconLeft}</span>}
        {children}
        {iconRight && <span className={s('iconRight')}>{iconRight}</span>}
        
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={s('ripple')}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        ))}
      </button>
    );
  }
);

Button.displayName = 'Button';