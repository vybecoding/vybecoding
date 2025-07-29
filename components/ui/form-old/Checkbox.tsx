import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded border ring-offset-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-700 text-accent-cyan focus-visible:ring-gray-700 data-[state=checked]:bg-accent-cyan data-[state=checked]:border-accent-cyan',
        error: 'border-red-600 text-red-600 focus-visible:ring-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600',
        success: 'border-green-600 text-green-600 focus-visible:ring-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    variant,
    checked,
    defaultChecked,
    onCheckedChange,
    onChange,
    ...props 
  }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      
      onChange?.(e);
      onCheckedChange?.(newChecked);
    };

    return (
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            checkboxVariants({ variant }),
            'absolute opacity-0',
            className
          )}
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            checkboxVariants({ variant }),
            'flex items-center justify-center cursor-pointer'
          )}
          data-state={isChecked ? 'checked' : 'unchecked'}
        >
          {isChecked && (
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';