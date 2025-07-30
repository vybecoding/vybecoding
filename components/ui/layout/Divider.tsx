import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dividerVariants = cva(
  'border-gray-800',
  {
    variants: {
      orientation: {
        horizontal: 'border-t w-full',
        vertical: 'border-l h-full',
      },
      size: {
        thin: '',
        medium: '',
        thick: '',
      },
      color: {
        default: 'border-gray-800',
        muted: 'border-gray-900',
        accent: 'border-accent-cyan/20',
        gradient: 'bg-gradient-to-r from-transparent via-gray-700 to-transparent h-px border-0',
      },
      spacing: {
        none: '',
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      // Horizontal sizing
      {
        orientation: 'horizontal',
        size: 'thin',
        className: 'border-t',
      },
      {
        orientation: 'horizontal',
        size: 'medium',
        className: 'border-t-2',
      },
      {
        orientation: 'horizontal',
        size: 'thick',
        className: 'border-t-4',
      },
      // Vertical sizing
      {
        orientation: 'vertical',
        size: 'thin',
        className: 'border-l',
      },
      {
        orientation: 'vertical',
        size: 'medium',
        className: 'border-l-2',
      },
      {
        orientation: 'vertical',
        size: 'thick',
        className: 'border-l-4',
      },
      // Horizontal spacing
      {
        orientation: 'horizontal',
        spacing: 'sm',
        className: 'my-2',
      },
      {
        orientation: 'horizontal',
        spacing: 'md',
        className: 'my-4',
      },
      {
        orientation: 'horizontal',
        spacing: 'lg',
        className: 'my-8',
      },
      // Vertical spacing
      {
        orientation: 'vertical',
        spacing: 'sm',
        className: 'mx-2',
      },
      {
        orientation: 'vertical',
        spacing: 'md',
        className: 'mx-4',
      },
      {
        orientation: 'vertical',
        spacing: 'lg',
        className: 'mx-8',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'thin',
      color: 'default',
      spacing: 'md',
    },
  }
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'color'>,
    VariantProps<typeof dividerVariants> {
  label?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation, size, color, spacing, label, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div className={cn('relative', spacing === 'sm' && 'my-2', spacing === 'md' && 'my-4', spacing === 'lg' && 'my-8')}>
          <div className="absolute inset-0 flex items-center">
            <hr
              ref={ref}
              className={cn(dividerVariants({ orientation, size, color, spacing: 'none' }), className)}
              {...props}
            />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-950 px-4 text-sm text-gray-400">{label}</span>
          </div>
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn(dividerVariants({ orientation, size, color, spacing }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';