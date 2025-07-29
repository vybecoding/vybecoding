'use client';

import React from 'react';
import { Card, CardProps } from './Card';

export interface AppCardProps extends Omit<CardProps, 'variant'> {
  title: string;
  developer: string;
  description?: string;
  icon?: string;
  category?: string;
  pricing?: 'free' | 'paid' | 'freemium';
  rating?: number;
  downloads?: number;
  tags?: string[];
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  developer,
  description,
  icon,
  category,
  pricing = 'free',
  rating,
  downloads = 0,
  tags = [],
  className,
  ...props
}) => {
  const stats = (
    <>
      <div className="flex items-center gap-3">
        {rating && (
          <span className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-gray-400">{rating.toFixed(1)}</span>
          </span>
        )}
        {downloads > 0 && (
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloads.toLocaleString()}
          </span>
        )}
      </div>
      <span className={`
        px-2 py-1 text-xs rounded-full
        ${pricing === 'free' ? 'bg-green-500/10 text-green-500' : ''}
        ${pricing === 'paid' ? 'bg-blue-500/10 text-blue-500' : ''}
        ${pricing === 'freemium' ? 'bg-orange-500/10 text-orange-500' : ''}
      `}>
        {pricing}
      </span>
    </>
  );

  return (
    <Card
      variant="app"
      stats={stats}
      className={className}
      {...props}
    >
      {/* App header with icon */}
      <div className="flex items-start gap-3">
        {icon && (
          <img 
            src={icon} 
            alt={`${title} icon`}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{developer}</p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 line-clamp-2">
          {description}
        </p>
      )}

      {/* Category and Tags */}
      <div className="flex flex-wrap gap-1">
        {category && (
          <span className="px-2 py-1 text-xs bg-fuchsia-500/10 text-fuchsia-400 rounded-full">
            {category}
          </span>
        )}
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-gray-500/10 text-gray-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
};