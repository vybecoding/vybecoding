import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'flex w-full items-center justify-between rounded-md bg-gray-900 px-3 py-2 text-sm text-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-gray-800 focus-visible:border-gray-700 focus-visible:ring-gray-700',
        error: 'border border-red-600 focus-visible:border-red-500 focus-visible:ring-red-600',
        success: 'border border-green-600 focus-visible:border-green-500 focus-visible:ring-green-600',
        filled: 'border-0 bg-gray-800 focus-visible:bg-gray-900 focus-visible:ring-accent-cyan',
      },
      selectSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'md',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant,
    selectSize,
    options,
    placeholder,
    value,
    ...props 
  }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            selectVariants({ variant, selectSize }),
            'appearance-none cursor-pointer pr-10',
            className
          )}
          ref={ref}
          value={value}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" 
        />
      </div>
    );
  }
);

Select.displayName = 'Select';