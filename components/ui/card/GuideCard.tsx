'use client';

import React from 'react';
import { Card, CardProps } from './Card';
import { cn } from '@/lib/utils';

export interface GuideCardProps extends Omit<CardProps, 'variant'> {
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  description?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  title,
  author,
  description,
  tags = [],
  views = 0,
  likes = 0,
  difficulty,
  duration,
  className,
  ...props
}) => {
  const stats = (
    <>
      <div className="flex items-center gap-4">
        {views > 0 && (
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {views.toLocaleString()}
          </span>
        )}
        {likes > 0 && (
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {likes.toLocaleString()}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {difficulty && (
          <span className={cn(
            "px-2 py-1 text-xs rounded-full",
            difficulty === 'beginner' && "bg-green-500/10 text-green-500",
            difficulty === 'intermediate' && "bg-yellow-500/10 text-yellow-500",
            difficulty === 'advanced' && "bg-red-500/10 text-red-500"
          )}>
            {difficulty}
          </span>
        )}
        {duration && (
          <span className="text-sm text-gray-500">{duration}</span>
        )}
      </div>
    </>
  );

  return (
    <Card
      variant="guide"
      stats={stats}
      className={className}
      {...props}
    >
      {/* Author info */}
      <div className="flex items-center gap-2">
        {author.avatar && (
          <img 
            src={author.avatar} 
            alt={author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-sm text-gray-400">{author.name}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 line-clamp-3">
          {description}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};