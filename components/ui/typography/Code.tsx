import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const codeVariants = cva(
  'font-mono',
  {
    variants: {
      variant: {
        inline: 'inline px-1.5 py-0.5 text-sm bg-gray-800 text-accent-cyan rounded',
        block: 'block p-4 text-sm bg-gray-900 text-gray-300 rounded-lg overflow-x-auto',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'inline',
      size: 'sm',
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  as?: 'code' | 'pre';
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = 'inline', size, children, as, ...props }, ref) => {
    const Component = variant === 'block' ? 'pre' : as || 'code';

    return (
      <Component
        ref={ref as any}
        className={cn(codeVariants({ variant, size }), className)}
        {...props}
      >
        {variant === 'block' && as === 'code' ? <code>{children}</code> : children}
      </Component>
    );
  }
);

Code.displayName = 'Code';