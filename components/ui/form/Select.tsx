import React from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, defaultValue, onChange, placeholder, disabled, className, name, required }, ref) => {
    return (
      <ShadcnSelect 
        value={value} 
        defaultValue={defaultValue} 
        onValueChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <SelectTrigger ref={ref} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>
    );
  }
);

Select.displayName = 'Select';