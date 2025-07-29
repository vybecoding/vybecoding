'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'guide' | 'app' | 'news' | 'member';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  // Header elements
  typeLabel?: string; // Override default type label
  date?: string | Date;
  // Stats section
  stats?: React.ReactNode;
  // Accessibility
  ariaLabel?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default',
    className,
    children,
    onClick,
    href,
    typeLabel,
    date,
    stats,
    ariaLabel,
    ...props
  }, ref) => {
    // Format date if provided
    const formattedDate = date ? (
      typeof date === 'string' ? date : new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date)
    ) : null;

    // Determine type label
    const displayLabel = typeLabel || (variant !== 'default' ? variant.toUpperCase() : null);

    // Wrapper component based on whether we have href or onClick
    const Component = href ? 'a' : 'div';
    const componentProps = href ? { href } : {};

    return (
      <Component
        ref={ref as any}
        className={cn(
          styles.card,
          styles[`card--${variant}`],
          className
        )}
        onClick={onClick}
        role={onClick || href ? 'button' : undefined}
        tabIndex={onClick || href ? 0 : undefined}
        aria-label={ariaLabel}
        {...componentProps}
        {...props}
      >
        {/* Type Label */}
        {displayLabel && (
          <div className={styles.typeLabel} aria-label={`${displayLabel} content`}>
            {displayLabel}
          </div>
        )}

        {/* Date */}
        {formattedDate && (
          <div className={styles.date} aria-label={`Published ${formattedDate}`}>
            <svg 
              className={styles.dateIcon}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formattedDate}</span>
          </div>
        )}

        {/* Main Content */}
        <div className={styles.content}>
          {children}
        </div>

        {/* Stats Section */}
        {stats && (
          <div className={styles.stats}>
            {stats}
          </div>
        )}
      </Component>
    );
  }
);

Card.displayName = 'Card';