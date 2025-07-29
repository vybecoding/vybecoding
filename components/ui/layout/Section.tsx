import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva(
  'relative',
  {
    variants: {
      spacing: {
        none: '',
        sm: 'py-8 sm:py-12',
        md: 'py-12 sm:py-16 lg:py-20',
        lg: 'py-16 sm:py-20 lg:py-24',
        xl: 'py-20 sm:py-24 lg:py-32',
      },
      background: {
        none: '',
        subtle: 'bg-gray-950/50',
        dark: 'bg-gray-900',
        darker: 'bg-gray-950',
        gradient: 'bg-gradient-to-b from-gray-900 to-gray-950',
        pattern: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black',
      },
      border: {
        none: '',
        top: 'border-t border-gray-800',
        bottom: 'border-b border-gray-800',
        both: 'border-y border-gray-800',
      },
    },
    defaultVariants: {
      spacing: 'md',
      background: 'none',
      border: 'none',
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, border, as: Component = 'section', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ spacing, background, border }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';