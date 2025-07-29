import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border ring-offset-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-700 text-accent-cyan focus-visible:ring-gray-700',
        error: 'border-red-600 text-red-600 focus-visible:ring-red-600',
        success: 'border-green-600 text-green-600 focus-visible:ring-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const radioIndicatorVariants = cva(
  'h-2 w-2 rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-accent-cyan',
        error: 'bg-red-600',
        success: 'bg-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof radioVariants> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="radio"
          className={cn(
            'peer absolute opacity-0',
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            radioVariants({ variant }),
            'flex items-center justify-center cursor-pointer',
            'peer-checked:border-current'
          )}
        >
          <div
            className={cn(
              radioIndicatorVariants({ variant }),
              'scale-0 peer-checked:scale-100 transition-transform'
            )}
          />
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'flex gap-2',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className
        )}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';