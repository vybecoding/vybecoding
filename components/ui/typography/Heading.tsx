import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  'font-semibold leading-tight tracking-tight',
  {
    variants: {
      as: {
        h1: 'text-4xl md:text-5xl lg:text-6xl',
        h2: 'text-3xl md:text-4xl lg:text-5xl',
        h3: 'text-2xl md:text-3xl lg:text-4xl',
        h4: 'text-xl md:text-2xl lg:text-3xl',
        h5: 'text-lg md:text-xl lg:text-2xl',
        h6: 'text-base md:text-lg lg:text-xl',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      color: {
        default: 'text-gray-100',
        muted: 'text-gray-400',
        primary: 'text-accent-cyan',
        secondary: 'text-accent-purple',
        gradient: 'bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      as: 'h1',
      align: 'left',
      color: 'default',
      weight: 'semibold',
    },
  }
);

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h1', align, color, weight, children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ as, align, color, weight }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';