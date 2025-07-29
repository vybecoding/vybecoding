import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonGroupVariants = cva(
  'inline-flex',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      attached: {
        true: '',
        false: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      // Horizontal attached buttons
      {
        orientation: 'horizontal',
        attached: true,
        className: '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:last-child)]:border-r-0',
      },
      // Vertical attached buttons
      {
        orientation: 'vertical',
        attached: true,
        className: '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child)]:border-b-0',
      },
      // Spacing for non-attached horizontal
      {
        orientation: 'horizontal',
        attached: false,
        size: 'sm',
        className: 'gap-1',
      },
      {
        orientation: 'horizontal',
        attached: false,
        size: 'md',
        className: 'gap-2',
      },
      {
        orientation: 'horizontal',
        attached: false,
        size: 'lg',
        className: 'gap-3',
      },
      // Spacing for non-attached vertical
      {
        orientation: 'vertical',
        attached: false,
        size: 'sm',
        className: 'gap-1',
      },
      {
        orientation: 'vertical',
        attached: false,
        size: 'md',
        className: 'gap-2',
      },
      {
        orientation: 'vertical',
        attached: false,
        size: 'lg',
        className: 'gap-3',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      attached: false,
      size: 'md',
    },
  }
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, attached, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation, attached, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';