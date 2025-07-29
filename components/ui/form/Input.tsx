import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-gray-800 focus-visible:border-gray-700 focus-visible:ring-gray-700',
        error: 'border border-red-600 focus-visible:border-red-500 focus-visible:ring-red-600',
        success: 'border border-green-600 focus-visible:border-green-500 focus-visible:ring-green-600',
        filled: 'border-0 bg-gray-800 focus-visible:bg-gray-900 focus-visible:ring-accent-cyan',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

const iconWrapperVariants = cva(
  'absolute top-1/2 -translate-y-1/2 text-gray-500',
  {
    variants: {
      position: {
        left: 'left-3',
        right: 'right-3',
      },
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type,
    variant,
    inputSize,
    leftIcon,
    rightIcon,
    onRightIconClick,
    disabled,
    ...props 
  }, ref) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;
    const isClickableRightIcon = !!onRightIconClick && hasRightIcon;

    const inputClasses = cn(
      inputVariants({ variant, inputSize }),
      hasLeftIcon && 'pl-10',
      hasRightIcon && 'pr-10',
      className
    );

    if (hasLeftIcon || hasRightIcon) {
      return (
        <div className="relative">
          {hasLeftIcon && (
            <div className={cn(iconWrapperVariants({ position: 'left' }))}>
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          
          {hasRightIcon && (
            <div 
              className={cn(
                iconWrapperVariants({ position: 'right' }),
                isClickableRightIcon && 'cursor-pointer hover:text-gray-300'
              )}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';