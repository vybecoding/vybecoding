import React from 'react';
import { cn } from '@/lib/utils';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  inline?: boolean;
  maxWidth?: string | number;
}

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, as: Component = 'div', inline = false, maxWidth, style, children, ...props }, ref) => {
    const baseClasses = inline
      ? 'inline-flex items-center justify-center'
      : 'flex items-center justify-center';

    return (
      <Component
        ref={ref}
        className={cn(baseClasses, className)}
        style={{
          maxWidth: maxWidth,
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Center.displayName = 'Center';