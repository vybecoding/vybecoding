/**
 * CSS Modules Utilities
 * Helper functions for managing CSS Modules with Tailwind
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values and merges Tailwind classes intelligently
 * This prevents CSS conflicts by ensuring Tailwind utility classes don't override each other
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a CSS Module class name generator
 * Ensures proper scoping and prevents cascade issues
 */
export function createStyles<T extends Record<string, string>>(
  styles: T
): {
  (className: keyof T): string;
  compose(...classNames: Array<keyof T | string>): string;
} {
  const fn = (className: keyof T) => styles[className] || '';
  
  fn.compose = (...classNames: Array<keyof T | string>) => {
    return classNames
      .map(className => 
        typeof className === 'string' && className in styles 
          ? styles[className] 
          : className
      )
      .filter(Boolean)
      .join(' ');
  };
  
  return fn;
}

/**
 * Creates variant classes using CSS Modules + Tailwind
 * Prevents cascade issues by using CSS Modules for component-specific styles
 */
export interface VariantProps {
  base: string;
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
}

export function createVariants(props: VariantProps) {
  return (variantProps?: Record<string, any>) => {
    const classes = [props.base];
    
    if (props.variants && variantProps) {
      Object.entries(variantProps).forEach(([key, value]) => {
        if (props.variants![key] && props.variants![key][value]) {
          classes.push(props.variants![key][value]);
        }
      });
    }
    
    if (props.defaultVariants && !variantProps) {
      Object.entries(props.defaultVariants).forEach(([key, value]) => {
        if (props.variants![key] && props.variants![key][value]) {
          classes.push(props.variants![key][value]);
        }
      });
    }
    
    return cn(...classes);
  };
}