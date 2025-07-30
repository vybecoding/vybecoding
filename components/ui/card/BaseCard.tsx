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
      default: 'bg-vybe-shadow/80 backdrop-blur-sm border-white/10',
      outlined: 'bg-transparent border-white/20',
      elevated: 'bg-vybe-shadow/90 backdrop-blur-md border-white/20 shadow-xl',
      interactive: 'bg-black/60 backdrop-blur-lg border-gray-700/40'
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles matching demo
          'relative rounded-lg border p-4 pb-2',
          'transition-all duration-300',
          'flex flex-col h-full',
          // Variant styles
          variants[variant],
          // Hover effects
          hover && clickable && [
            'hover:bg-gray-800/60',
            'hover:border-gray-600/50',
            'hover:-translate-y-0.5',
            'hover:shadow-lg'
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
        'absolute top-0 left-0 px-2 py-1.5',
        'text-white text-xs font-semibold uppercase tracking-wide',
        'rounded-br-lg z-20',
        className
      )}
      style={{ background: config.bg }}
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