'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, Heart, Download, ExternalLink, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard, CardLabel, CardDate } from './BaseCard'
import { Badge } from '@/components/ui/badge'

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  name: string
  description?: string
  icon?: string
  category: string
  developer?: {
    name: string
    avatar?: string
  }
  techStack?: string[]
  platforms?: string[]
  stats?: {
    views?: number
    likes?: number
    downloads?: number
    rating?: number
  }
  pricing?: 'free' | 'paid' | 'freemium'
  featured?: boolean
  createdAt: Date | string
  liveUrl?: string
  appStoreUrl?: string
  playStoreUrl?: string
}

export const AppCard: React.FC<AppCardProps> = ({
  id,
  name,
  description,
  icon,
  category,
  developer,
  techStack = [],
  platforms = [],
  stats = {},
  pricing = 'free',
  featured,
  createdAt,
  liveUrl,
  appStoreUrl,
  playStoreUrl,
  className,
  ...props
}) => {
  const primaryUrl = liveUrl || appStoreUrl || playStoreUrl
  
  return (
    <BaseCard variant="interactive" className={className} {...props}>
      {/* Type label */}
      <CardLabel type="app" />
      
      {/* Date in corner */}
      <CardDate date={createdAt} />
      
      {/* Featured badge - offset from card edge */}
      {featured && (
        <div className="absolute -top-2 -right-2 z-30">
          <div className="bg-gradient-to-r from-vybe-purple to-vybe-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ Featured
          </div>
        </div>
      )}
      
      {/* Title */}
      <h3 className="mt-6 text-lg font-semibold text-white hover:text-vybe-orange transition-colors duration-200 mb-0">
        <Link href={`/apps/${id}`}>
          {name}
        </Link>
      </h3>
      
      {/* Developer info */}
      {developer && (
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700">
            {developer.avatar ? (
              <Image 
                src={developer.avatar} 
                alt={developer.name}
                width={24}
                height={24}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
                {developer.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-400">{developer.name}</span>
        </div>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 mt-3 line-clamp-2 flex-grow">
          {description}
        </p>
      )}
      
      {/* Category & pricing badges */}
      <div className="flex items-center gap-2 mt-3">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        {pricing && (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              pricing === 'free' && "border-green-500/30 text-green-400",
              pricing === 'paid' && "border-blue-500/30 text-blue-400",
              pricing === 'freemium' && "border-purple-500/30 text-purple-400"
            )}
          >
            {pricing === 'free' && '✓ Free'}
            {pricing === 'paid' && '$ Paid'}
            {pricing === 'freemium' && '✨ Freemium'}
          </Badge>
        )}
      </div>
      
      {/* Tech stack */}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {techStack.slice(0, 3).map((tech) => (
            <span 
              key={tech}
              className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* Platforms */}
      {platforms.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {platforms.map((platform) => (
            <span 
              key={platform}
              className="bg-gray-700/50 text-gray-300 px-2 py-1 text-xs rounded"
            >
              {platform}
            </span>
          ))}
        </div>
      )}
      
      {/* Bottom stats section */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-700/50">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          {stats.views !== undefined && (
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {stats.views.toLocaleString()}
            </span>
          )}
          {stats.downloads !== undefined && (
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {stats.downloads.toLocaleString()}
            </span>
          )}
          {stats.rating !== undefined && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {stats.rating.toFixed(1)}
            </span>
          )}
        </div>
        {primaryUrl && (
          <a 
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vybe-purple hover:text-vybe-pink transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </BaseCard>
  )
}