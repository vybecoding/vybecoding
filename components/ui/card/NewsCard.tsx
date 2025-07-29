'use client';

import React from 'react';
import { Card, CardProps } from './Card';

export interface NewsCardProps extends Omit<CardProps, 'variant'> {
  title: string;
  excerpt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: string;
  category?: string;
  image?: string;
  tags?: string[];
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  author,
  readTime,
  category,
  image,
  tags = [],
  date,
  className,
  ...props
}) => {
  const stats = (
    <>
      {author && (
        <div className="flex items-center gap-2">
          {author.avatar && (
            <img 
              src={author.avatar} 
              alt={author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span className="text-sm text-gray-400">{author.name}</span>
        </div>
      )}
      {readTime && (
        <span className="text-sm text-gray-500">{readTime} read</span>
      )}
    </>
  );

  return (
    <Card
      variant="news"
      stats={stats}
      date={date}
      className={className}
      {...props}
    >
      {/* Featured image */}
      {image && (
        <div className="relative -mx-5 -mt-8 mb-4">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {category && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs bg-orange-500/90 text-white rounded-full">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-white line-clamp-2">
        {title}
      </h3>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-sm text-gray-400 line-clamp-3">
          {excerpt}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-orange-500/10 text-orange-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};