'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface CardGridProps {
  children: React.ReactNode
  className?: string
  columns?: 'auto' | 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  className,
  columns = 'auto',
  gap = 'md',
  maxWidth = 'xl'
}) => {
  const columnClasses = {
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }

  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div 
      className={cn(
        'grid mx-auto',
        columnClasses[columns],
        gapClasses[gap],
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  )
}