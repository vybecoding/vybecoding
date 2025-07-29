import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 transition-colors resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-gray-800 focus-visible:border-gray-700 focus-visible:ring-gray-700',
        error: 'border border-red-600 focus-visible:border-red-500 focus-visible:ring-red-600',
        success: 'border border-green-600 focus-visible:border-green-500 focus-visible:ring-green-600',
        filled: 'border-0 bg-gray-800 focus-visible:bg-gray-900 focus-visible:ring-accent-cyan',
      },
      textareaSize: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant,
    textareaSize,
    resize,
    showCount,
    maxLength,
    value,
    defaultValue,
    onChange,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = String(currentValue).length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            textareaVariants({ variant, textareaSize, resize }), 
            showCount && 'pb-6',
            className
          )}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {showCount && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-500">
            {currentLength}{maxLength ? `/${maxLength}` : ''}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';