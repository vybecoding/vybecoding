import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spacerVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      size: {
        xs: 'h-2 w-2',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10',
        '2xl': 'h-12 w-12',
        '3xl': 'h-16 w-16',
        '4xl': 'h-20 w-20',
      },
      direction: {
        horizontal: '',
        vertical: '',
      },
    },
    compoundVariants: [
      {
        direction: 'horizontal',
        size: 'xs',
        className: 'h-0 w-2',
      },
      {
        direction: 'horizontal',
        size: 'sm',
        className: 'h-0 w-4',
      },
      {
        direction: 'horizontal',
        size: 'md',
        className: 'h-0 w-6',
      },
      {
        direction: 'horizontal',
        size: 'lg',
        className: 'h-0 w-8',
      },
      {
        direction: 'horizontal',
        size: 'xl',
        className: 'h-0 w-10',
      },
      {
        direction: 'vertical',
        size: 'xs',
        className: 'h-2 w-0',
      },
      {
        direction: 'vertical',
        size: 'sm',
        className: 'h-4 w-0',
      },
      {
        direction: 'vertical',
        size: 'md',
        className: 'h-6 w-0',
      },
      {
        direction: 'vertical',
        size: 'lg',
        className: 'h-8 w-0',
      },
      {
        direction: 'vertical',
        size: 'xl',
        className: 'h-10 w-0',
      },
    ],
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  grow?: boolean;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, direction, grow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          spacerVariants({ size, direction }),
          grow && 'flex-grow',
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';