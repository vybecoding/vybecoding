'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive'
  hover?: boolean
  clickable?: boolean
}

export const BaseCard = React.forwardRef<HTMLDivElement, BaseCardProps>(
  ({ className, variant = 'default', hover = true, clickable = true, children, ...props }, ref) => {
    const variants = {
      default: 'backdrop-blur-[10px] border-[rgba(51,51,51,0.4)]',
      outlined: 'bg-transparent border-white/20',
      elevated: 'bg-vybe-shadow/90 backdrop-blur-md border-white/20 shadow-xl',
      interactive: 'bg-black/60 backdrop-blur-lg border-gray-700/40'
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles matching demo exactly
          'relative rounded-lg border p-4 pb-2',
          'transition-all duration-300',
          'flex flex-col h-full',
          // Demo background: rgba(26, 26, 26, 0.8)
          '[background:rgba(26,26,26,0.8)]',
          // Variant styles
          variants[variant],
          // Hover effects matching demo exactly
          hover && clickable && [
            'hover:[background:rgba(42,42,42,0.8)]',
            'hover:[border-color:rgba(64,64,64,0.5)]',
            'hover:-translate-y-0.5',
            'hover:[box-shadow:0_8px_24px_rgba(0,0,0,0.2)]'
          ],
          // Clickable cursor
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BaseCard.displayName = 'BaseCard'

// Card label component for type indicators
export interface CardLabelProps {
  type: 'app' | 'guide' | 'news' | 'member'
  className?: string
}

export const CardLabel: React.FC<CardLabelProps> = ({ type, className }) => {
  const typeConfig = {
    app: {
      label: 'APP',
      bg: 'rgba(236, 72, 153, 0.5625)' // Fuchsia
    },
    guide: {
      label: 'GUIDE',
      bg: 'rgba(138, 43, 226, 0.5625)' // Purple
    },
    news: {
      label: 'NEWS',
      bg: 'rgba(251, 146, 60, 0.5625)' // Orange
    },
    member: {
      label: 'MEMBER',
      bg: 'linear-gradient(135deg, rgba(138, 43, 226, 0.5625), rgba(236, 72, 153, 0.5625))'
    }
  }

  const config = typeConfig[type]

  return (
    <div
      className={cn(
        'absolute top-0 left-0 text-white font-semibold uppercase tracking-wide',
        'rounded-br-lg z-20',
        className
      )}
      style={{
        background: config.bg,
        padding: '0.375rem 0.5rem',
        paddingTop: '0.5rem',
        fontSize: '0.844rem',
        lineHeight: 1,
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        letterSpacing: '0.25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
      }}
    >
      {config.label}
    </div>
  )
}

// Card date component for corner dates
export interface CardDateProps {
  date: string | Date
  className?: string
}

export const CardDate: React.FC<CardDateProps> = ({ date, className }) => {
  const timeAgo = typeof date === 'string' ? date : formatDistanceToNow(date)
  
  return (
    <div className={cn(
      'absolute top-2 right-3 flex items-baseline gap-1',
      'text-xs text-gray-400 z-20',
      className
    )}>
      <svg className="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      {timeAgo}
    </div>
  )
}

// Helper function (should be imported from utils in real app)
function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const distance = now.getTime() - date.getTime()
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}