'use client'

import React from 'react'
import { Calendar, Heart, Lock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { Badge } from '../badge/Badge'
import { FeaturedContent, VerificationStatus } from '@/types/featured'

interface FeaturedCardProps {
  content: FeaturedContent
  onClick?: (content: FeaturedContent) => void
  className?: string
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  content,
  onClick,
  className
}) => {
  const handleClick = () => {
    onClick?.(content)
  }

  const getVerificationInfo = (status?: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return {
          icon: '✅',
          text: `Verified ${getRelativeTime(content.date)}`,
          color: 'text-green-400'
        }
      case 'needs-verification':
        return {
          icon: '⚪',
          text: 'Needs verification',
          color: 'text-vybe-gray-500'
        }
      case 'possibly-outdated':
        return {
          icon: '⚠️',
          text: 'May be outdated',
          color: 'text-yellow-500'
        }
      case 'likely-outdated':
        return {
          icon: '❌',
          text: 'Likely outdated',
          color: 'text-red-500'
        }
      default:
        return null
    }
  }

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  const getCardVariant = (status?: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return 'card-verified'
      case 'needs-verification':
        return 'card-needs-verification'
      case 'possibly-outdated':
        return 'card-possibly-outdated'
      case 'likely-outdated':
        return 'card-likely-outdated'
      default:
        return ''
    }
  }

  const getHoverColor = (type: string, status?: VerificationStatus) => {
    if (status === 'possibly-outdated' || status === 'likely-outdated') {
      return 'group-hover:text-vybe-orange'
    }
    
    switch (type) {
      case 'app':
        return 'group-hover:text-vybe-orange'
      case 'news':
        return 'group-hover:text-blue-400'
      case 'guide':
        return 'group-hover:text-vybe-purple-light'
      default:
        return 'group-hover:text-vybe-purple-light'
    }
  }

  const getTagColor = (type: string, tag: string) => {
    // Difficulty level tags (special coloring)
    if (['Advanced', 'Expert'].includes(tag)) {
      return 'bg-red-500/10 border-red-500/20 text-red-500'
    }
    if (['Intermediate', 'Medium'].includes(tag)) {
      return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
    }
    if (['Beginner', 'Easy'].includes(tag)) {
      return 'bg-green-500/10 border-green-500/20 text-green-500'
    }
    
    // Type-based coloring
    switch (type) {
      case 'app':
        return 'bg-vybe-orange/10 border-vybe-orange/20 text-vybe-orange'
      case 'news':
        return 'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light'
      case 'guide':
      default:
        return 'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light'
    }
  }

  const verificationInfo = getVerificationInfo(content.verificationStatus)

  return (
    <BaseCard
      onClick={handleClick}
      className={cn(
        'minimal-card transition-all cursor-pointer group',
        getCardVariant(content.verificationStatus),
        className
      )}
    >
      {/* Title */}
      <h3 className={cn(
        'text-lg font-medium text-white mb-2 transition-colors',
        getHoverColor(content.type, content.verificationStatus)
      )}>
        {content.title}
      </h3>
      
      {/* Author and Date */}
      <div className="flex items-center gap-2 mb-3">
        <div className={cn(
          'w-6 h-6 rounded-full flex-shrink-0',
          content.type === 'news' 
            ? 'bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'
            : content.author.tier === 'PRO'
              ? 'bg-gradient-to-br from-vybe-purple to-vybe-pink'
              : 'bg-gradient-to-br from-vybe-purple to-vybe-orange'
        )}>
          {content.type === 'news' && (
            <span className="text-xs font-bold text-white">AI</span>
          )}
        </div>
        <span className="text-sm text-vybe-gray-400">
          {content.type === 'news' ? content.author.name : `@${content.author.username}`}
          {content.author.tier === 'PRO' && (
            <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">
              PRO
            </span>
          )}
          {content.author.isOfficial && (
            <span className="text-blue-400 font-medium ml-1">Official</span>
          )}
        </span>
        <span className="text-vybe-gray-500">•</span>
        {content.author.isTopCreator && (
          <>
            <span className="text-sm text-amber-500">🏆 Top Creator</span>
            <span className="text-vybe-gray-500">•</span>
          </>
        )}
        <div className="flex items-center gap-1 text-sm text-vybe-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{content.date}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-vybe-gray-400 mb-4 line-clamp-2">
        {content.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {content.tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              'px-2 py-1 text-xs rounded font-medium border',
              getTagColor(content.type, tag)
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-800/50 mt-auto">
        <div className="flex items-center gap-1 text-xs">
          {content.isPremium && !content.isPurchased ? (
            <div className="flex items-center gap-1 text-amber-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Premium • ${content.price}</span>
            </div>
          ) : content.isPurchased ? (
            <div className="flex items-center gap-1 text-green-500">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Purchased</span>
            </div>
          ) : verificationInfo ? (
            <div className={cn('flex items-center gap-1', verificationInfo.color)}>
              <span className="text-xs">{verificationInfo.icon}</span>
              <span>{verificationInfo.text}</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-vybe-gray-400">
            <Heart className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
            <span>{content.stats.likes}</span>
          </div>
        </div>
      </div>
    </BaseCard>
  )
}

export default FeaturedCard