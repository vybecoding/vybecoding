import React from 'react';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label?: string;
}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioProps
>(({ label, id, ...props }, ref) => {
  const radioId = id || `radio-${props.value}`;
  
  if (label) {
    return (
      <div className="flex items-center space-x-2">
        <RadioGroupItem ref={ref} id={radioId} {...props} />
        <Label htmlFor={radioId}>{label}</Label>
      </div>
    );
  }
  
  return <RadioGroupItem ref={ref} id={radioId} {...props} />;
});

Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup> {
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroup>,
  RadioGroupProps
>(({ children, ...props }, ref) => {
  return (
    <ShadcnRadioGroup ref={ref} {...props}>
      {children}
    </ShadcnRadioGroup>
  );
});

RadioGroup.displayName = 'RadioGroup';