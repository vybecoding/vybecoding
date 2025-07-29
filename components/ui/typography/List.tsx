import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const listVariants = cva(
  'space-y-2',
  {
    variants: {
      variant: {
        unordered: 'list-disc list-inside',
        ordered: 'list-decimal list-inside',
        none: 'list-none',
      },
      size: {
        sm: 'text-sm space-y-1',
        base: 'text-base space-y-2',
        lg: 'text-lg space-y-3',
      },
      color: {
        default: 'text-gray-300',
        muted: 'text-gray-500',
        bright: 'text-gray-100',
      },
    },
    defaultVariants: {
      variant: 'unordered',
      size: 'base',
      color: 'default',
    },
  }
);

const listItemVariants = cva(
  'leading-relaxed',
  {
    variants: {
      variant: {
        default: '',
        check: 'flex items-start space-x-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  as?: 'ul' | 'ol';
}

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  icon?: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, as, variant, size, color, children, ...props }, ref) => {
    const Component = as || (variant === 'ordered' ? 'ol' : 'ul');

    return (
      <Component
        ref={ref as any}
        className={cn(listVariants({ variant, size, color }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ variant }), className)}
        {...props}
      >
        {icon && variant === 'check' && (
          <span className="text-accent-cyan flex-shrink-0 mt-0.5">{icon}</span>
        )}
        <span>{children}</span>
      </li>
    );
  }
);

List.displayName = 'List';
ListItem.displayName = 'ListItem';