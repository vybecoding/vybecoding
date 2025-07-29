import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import styles from './Badge.module.css';

const badgeVariants = cva(
  styles.badge,
  {
    variants: {
      variant: {
        default: styles.default,
        primary: styles.primary,
        secondary: styles.secondary,
        success: styles.success,
        warning: styles.warning,
        danger: styles.danger,
        info: styles.info,
        outline: styles.outline,
      },
      size: {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
      },
      shape: {
        default: '',
        pill: styles.pill,
        square: styles.square,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onRemove?: () => void;
  removable?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      children,
      icon,
      onRemove,
      removable = false,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
        {(removable || onRemove) && (
          <button
            type="button"
            onClick={onRemove}
            className={styles.removeButton}
            aria-label="Remove badge"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';