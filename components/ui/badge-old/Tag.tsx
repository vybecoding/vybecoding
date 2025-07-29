import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Hash } from 'lucide-react';
import styles from './Tag.module.css';

const tagVariants = cva(
  styles.tag,
  {
    variants: {
      variant: {
        default: styles.default,
        primary: styles.primary,
        secondary: styles.secondary,
        outline: styles.outline,
      },
      size: {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  href?: string;
  showHash?: boolean;
  onClick?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      children,
      href,
      showHash = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {showHash && <Hash className={styles.hash} />}
        <span className={styles.content}>{children}</span>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={cn(tagVariants({ variant, size }), styles.link, className)}
          onClick={onClick}
          {...props}
        >
          {content}
        </a>
      );
    }

    if (onClick) {
      return (
        <button
          type="button"
          ref={ref}
          className={cn(tagVariants({ variant, size }), styles.button, className)}
          onClick={onClick}
          {...props}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

// Tag Group component for managing multiple tags
export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  className,
  gap = 'md',
}) => {
  const gapClasses = {
    sm: styles.gapSm,
    md: styles.gapMd,
    lg: styles.gapLg,
  };

  return (
    <div className={cn(styles.tagGroup, gapClasses[gap], className)}>
      {children}
    </div>
  );
};