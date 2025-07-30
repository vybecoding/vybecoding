'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, Heart, Clock, CheckCircle, AlertCircle, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard, CardLabel, CardDate } from './BaseCard'
import { Badge } from '@/components/ui/badge'

export interface GuideCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  title: string
  slug: string
  author: {
    name: string
    avatar?: string
    isTopCreator?: boolean
  }
  description?: string
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  readTime?: number
  views?: number
  likes?: number
  createdAt: Date | string
  isPro?: boolean
  verificationStatus?: 'verified' | 'needs_verification' | 'outdated'
  lastVerified?: string
  category?: string
}

export const GuideCard: React.FC<GuideCardProps> = ({
  id,
  title,
  slug,
  author,
  description,
  tags = [],
  difficulty,
  readTime,
  views = 0,
  likes = 0,
  createdAt,
  isPro = false,
  verificationStatus = 'verified',
  lastVerified = '2h',
  category = 'Tutorial',
  className,
  ...props
}) => {
  // Difficulty colors matching demo
  const difficultyConfig = {
    beginner: {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/30'
    },
    intermediate: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-400', 
      border: 'border-yellow-500/30'
    },
    advanced: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30'
    }
  }

  // Verification status
  const verificationConfig = {
    verified: {
      icon: <CheckCircle className="w-3 h-3" />,
      text: `Verified ${lastVerified} ago`,
      className: 'text-green-400'
    },
    needs_verification: {
      icon: <AlertCircle className="w-3 h-3" />,
      text: `Last verified ${lastVerified} ago`,
      className: 'text-gray-400'
    },
    outdated: {
      icon: <AlertCircle className="w-3 h-3" />,
      text: 'Possibly outdated',
      className: 'text-amber-400'
    }
  }

  const verification = verificationConfig[verificationStatus]
  const difficultyStyles = difficulty ? difficultyConfig[difficulty] : null

  return (
    <BaseCard variant="interactive" className={className} {...props}>
      {/* Type label */}
      <CardLabel type="guide" />
      
      {/* Date in corner */}
      <CardDate date={createdAt} />
      
      {/* Title */}
      <h3 className="mt-6 text-lg font-semibold text-white hover:text-vybe-purple-light transition-colors duration-200 mb-0">
        <Link href={`/guides/${slug}`}>
          {title}
        </Link>
      </h3>
      
      {/* Author info */}
      <div className="flex items-center gap-2 mt-3">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700">
          {author.avatar ? (
            <Image 
              src={author.avatar} 
              alt={author.name}
              width={24}
              height={24}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
              {author.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-400">{author.name}</span>
        
        {/* Top Creator badge */}
        {author.isTopCreator && (
          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs animate-pulse">
            🏆 Top Creator
          </Badge>
        )}
        
        {/* PRO badge */}
        {isPro && (
          <Badge className="bg-vybe-purple/20 text-vybe-purple-light text-xs">
            <Crown className="w-3 h-3 mr-1" />
            PRO
          </Badge>
        )}
      </div>
      
      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 mt-3 line-clamp-2 flex-grow">
          {description}
        </p>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* Difficulty & Verification */}
      <div className="flex items-center gap-2 mt-2">
        {difficulty && difficultyStyles && (
          <span className={cn(
            "px-2 py-1 text-xs rounded border font-medium capitalize",
            difficultyStyles.bg,
            difficultyStyles.text,
            difficultyStyles.border
          )}>
            {difficulty}
          </span>
        )}
        
        <div className={cn("flex items-center gap-1 text-xs", verification.className)}>
          {verification.icon}
          <span>{verification.text}</span>
        </div>
      </div>
      
      {/* Bottom stats section */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-700/50">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes.toLocaleString()}
          </span>
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}m
            </span>
          )}
        </div>
        <span className="text-xs text-vybe-purple-light font-medium">{category}</span>
      </div>
    </BaseCard>
  )
}