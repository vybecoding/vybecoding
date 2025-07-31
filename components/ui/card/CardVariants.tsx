'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

// Primary Card with Header
export interface PrimaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  headerVariant?: 'default' | 'gradient' | 'purple' | 'pink' | 'orange'
  title?: string
}

export const PrimaryCard = React.forwardRef<HTMLDivElement, PrimaryCardProps>(
  ({ className, headerVariant = 'default', title, children, ...props }, ref) => {
    const headerStyles = {
      default: 'bg-[rgba(20,20,20,0.9)] border-b border-[rgba(51,51,51,0.4)]',
      gradient: 'bg-gradient-to-r from-vybe-purple to-vybe-pink',
      purple: 'bg-vybe-purple/20 border-b border-vybe-purple/30',
      pink: 'bg-vybe-pink/20 border-b border-vybe-pink/30',
      orange: 'bg-vybe-orange/20 border-b border-vybe-orange/30'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-lg',
          '[background:rgba(26,26,26,0.8)] backdrop-blur-[10px]',
          'border border-[rgba(51,51,51,0.4)]',
          'transition-all duration-300',
          'hover:[background:rgba(42,42,42,0.8)]',
          'hover:[border-color:rgba(64,64,64,0.5)]',
          'hover:-translate-y-0.5',
          'hover:[box-shadow:0_8px_24px_rgba(0,0,0,0.2)]',
          className
        )}
        {...props}
      >
        {title && (
          <div className={cn(
            'px-6 py-4',
            headerStyles[headerVariant]
          )}>
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    )
  }
)

PrimaryCard.displayName = 'PrimaryCard'

// Secondary Card with Icon
export interface SecondaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colorVariant?: 'default' | 'purple' | 'pink' | 'orange'
  icon?: LucideIcon
  title?: string
}

export const SecondaryCard = React.forwardRef<HTMLDivElement, SecondaryCardProps>(
  ({ className, colorVariant = 'default', icon: Icon, title, children, ...props }, ref) => {
    const borderStyles = {
      default: 'border-[rgba(51,51,51,0.4)]',
      purple: 'border-vybe-purple/50',
      pink: 'border-vybe-pink/50',
      orange: 'border-vybe-orange/50'
    }

    const iconColors = {
      default: 'text-vybe-gray-400',
      purple: 'text-vybe-purple',
      pink: 'text-vybe-pink',
      orange: 'text-vybe-orange'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6',
          '[background:rgba(26,26,26,0.8)] backdrop-blur-[10px]',
          'border',
          borderStyles[colorVariant],
          'transition-all duration-300',
          'hover:[background:rgba(42,42,42,0.8)]',
          'hover:-translate-y-0.5',
          'hover:[box-shadow:0_8px_24px_rgba(0,0,0,0.2)]',
          className
        )}
        {...props}
      >
        {(Icon || title) && (
          <div className="flex items-center gap-3 mb-4">
            {Icon && <Icon className={cn('w-5 h-5', iconColors[colorVariant])} />}
            {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          </div>
        )}
        {children}
      </div>
    )
  }
)

SecondaryCard.displayName = 'SecondaryCard'

// Tertiary Card (minimal styling)
export interface TertiaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: 'default' | 'purple' | 'pink' | 'orange'
}

export const TertiaryCard = React.forwardRef<HTMLDivElement, TertiaryCardProps>(
  ({ className, accentColor = 'default', children, ...props }, ref) => {
    const accentStyles = {
      default: '',
      purple: 'border-l-2 border-l-vybe-purple/30',
      pink: 'border-l-2 border-l-vybe-pink/30',
      orange: 'border-l-2 border-l-vybe-orange/30'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-4',
          '[background:rgba(26,26,26,0.6)] backdrop-blur-[8px]',
          'border border-[rgba(51,51,51,0.3)]',
          accentStyles[accentColor],
          'transition-all duration-300',
          'hover:[background:rgba(30,30,30,0.6)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TertiaryCard.displayName = 'TertiaryCard'

// Helper component for consistent card content spacing
export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={cn('space-y-4', className)}>{children}</div>
}

CardContent.displayName = 'CardContent'