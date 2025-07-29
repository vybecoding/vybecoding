import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const boxVariants = cva(
  'relative',
  {
    variants: {
      padding: {
        none: '',
        xs: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      margin: {
        none: '',
        xs: 'm-1',
        sm: 'm-2',
        md: 'm-4',
        lg: 'm-6',
        xl: 'm-8',
        auto: 'mx-auto',
      },
      rounded: {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      border: {
        none: '',
        thin: 'border border-gray-800',
        medium: 'border-2 border-gray-700',
        thick: 'border-4 border-gray-600',
      },
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
        auto: 'overflow-auto',
        scroll: 'overflow-scroll',
      },
    },
    defaultVariants: {
      padding: 'none',
      margin: 'none',
      rounded: 'none',
      shadow: 'none',
      border: 'none',
      overflow: 'visible',
    },
  }
);

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    className, 
    padding, 
    margin, 
    rounded, 
    shadow, 
    border, 
    overflow,
    as: Component = 'div', 
    children, 
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({ padding, margin, rounded, shadow, border, overflow }), 
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';