import React from 'react';
import { Button, ButtonProps } from './Button';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  'aria-label': string;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'icon', children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn('p-0', className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';