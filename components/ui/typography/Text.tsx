import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva(
  'leading-relaxed',
  {
    variants: {
      as: {
        p: 'text-base',
        span: 'text-base',
        div: 'text-base',
        small: 'text-sm',
        label: 'text-sm font-medium',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      color: {
        default: 'text-gray-300',
        muted: 'text-gray-500',
        bright: 'text-gray-100',
        primary: 'text-accent-cyan',
        secondary: 'text-accent-purple',
        error: 'text-red-400',
        success: 'text-green-400',
        warning: 'text-yellow-400',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      truncate: {
        true: 'truncate',
        false: '',
      },
    },
    defaultVariants: {
      as: 'p',
      size: 'base',
      color: 'default',
      weight: 'normal',
      align: 'left',
      truncate: false,
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'small' | 'label';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as = 'p', size, color, weight, align, truncate, children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(textVariants({ as, size, color, weight, align, truncate }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';