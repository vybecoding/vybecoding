import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-gray-200',
        error: 'text-red-400',
        success: 'text-green-400',
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-400",
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      required: false,
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  description?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, required, description, children, ...props }, ref) => {
    if (description) {
      return (
        <div className="space-y-1">
          <label
            ref={ref}
            className={cn(labelVariants({ variant, required }), className)}
            {...props}
          >
            {children}
          </label>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      );
    }

    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant, required }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';