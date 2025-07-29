'use client';

import React from 'react';
import { Calendar, Eye, Heart, Crown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface GuideCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  description?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  readTime?: number;
  views?: number;
  likes?: number;
  createdAt?: string;
  verificationStatus?: 'verified' | 'needs_verification' | 'outdated';
  lastVerified?: string;
  isTopCreator?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  title,
  author,
  description,
  tags = [],
  difficulty,
  readTime,
  views = 0,
  likes = 0,
  createdAt,
  verificationStatus = 'verified',
  lastVerified = '2h',
  isTopCreator = false,
  className,
  ...props
}) => {
  // Difficulty colors matching demo
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  // Verification status colors and text
  const getVerificationStatus = () => {
    switch (verificationStatus) {
      case 'verified':
        return {
          text: `✅ Verified ${lastVerified} ago`,
          className: 'text-green-400'
        };
      case 'needs_verification':
        return {
          text: `⚪ Last verified ${lastVerified} ago`,
          className: 'text-gray-400'
        };
      case 'outdated':
        return {
          text: '⚠️ Possibly outdated',
          className: 'text-amber-400'
        };
      default:
        return {
          text: '✅ Verified 2h ago',
          className: 'text-green-400'
        };
    }
  };

  const verification = getVerificationStatus();

  // Title hover color based on verification status
  const getTitleHoverColor = () => {
    switch (verificationStatus) {
      case 'verified':
        return 'hover:text-vybe-purple-light';
      case 'needs_verification':
        return 'hover:text-vybe-pink';
      case 'outdated':
        return 'hover:text-vybe-orange';
      default:
        return 'hover:text-vybe-purple-light';
    }
  };

  return (
    <div className={cn(
      "minimal-card relative bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg p-4 pb-2 hover:bg-gray-800/60 hover:border-gray-600/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col h-full",
      className
    )} {...props}>
      {/* Type label in top-left with purple background */}
      <div 
        className="absolute top-0 left-0 px-2 py-1.5 text-white text-xs font-semibold uppercase tracking-wide rounded-br-lg z-20"
        style={{ background: 'rgba(138, 43, 226, 0.5625)' }}
      >
        GUIDE
      </div>

      {/* Date in top-right corner */}
      {createdAt && (
        <div className="absolute top-2 right-3 flex items-baseline gap-1 text-xs text-gray-400 z-20">
          <Calendar className="w-3 h-3 opacity-70" />
          {createdAt} ago
        </div>
      )}

      {/* Title with hover effect based on verification status */}
      <h3 className={cn(
        "mt-6 text-lg font-semibold text-white transition-colors duration-200 mb-0",
        getTitleHoverColor()
      )}>
        {title}
      </h3>

      {/* Creator info */}
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
        
        {/* Top Creator badge with pulse animation */}
        {isTopCreator && (
          <div className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 text-xs font-medium rounded flex items-center gap-1 animate-pulse">
            🏆 Top Creator
          </div>
        )}
        
        {/* PRO badge */}
        <div className="bg-vybe-purple/20 text-vybe-purple-light px-1.5 py-0.5 text-xs font-medium rounded flex items-center gap-1">
          <Crown className="w-3 h-3" />
          PRO
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 mt-3 line-clamp-2 flex-grow">
          {description}
        </p>
      )}

      {/* Tags with purple theme */}
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

      {/* Difficulty tag */}
      {difficulty && (
        <div className="mt-2">
          <span className={cn(
            "px-2 py-1 text-xs rounded border font-medium capitalize",
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
        </div>
      )}

      {/* Verification status */}
      <div className={cn("text-xs mt-2", verification.className)}>
        {verification.text}
      </div>

      {/* Bottom stats section */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-700/50">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views || 0}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes || 0}
          </span>
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}m
            </span>
          )}
        </div>
        <span className="text-xs text-vybe-purple-light font-medium">Tutorial</span>
      </div>
    </div>
  );
};