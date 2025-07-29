import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './Label';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className, 
    label,
    description,
    error,
    required,
    htmlFor,
    children,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label 
            htmlFor={htmlFor}
            required={required}
            variant={error ? 'error' : 'default'}
          >
            {label}
          </Label>
        )}
        
        {description && !error && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        
        {children}
        
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';