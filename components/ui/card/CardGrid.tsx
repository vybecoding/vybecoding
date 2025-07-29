'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import styles from './CardGrid.module.css';

export interface CardGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 'auto' | 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  className,
  columns = 'auto',
  gap = 'md',
  maxWidth = 'xl'
}) => {
  return (
    <div 
      className={cn(
        styles.grid,
        styles[`grid--columns-${columns}`],
        styles[`grid--gap-${gap}`],
        styles[`grid--max-${maxWidth}`],
        className
      )}
    >
      {children}
    </div>
  );
};