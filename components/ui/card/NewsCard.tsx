'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NewsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt?: string;
  author?: string;
  date?: Date | string;
  readTime?: number;
  category?: string;
  image?: string;
  featured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
  featured,
  className,
  ...props
}) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  return (
    <Card className={cn('hover:shadow-lg transition-shadow overflow-hidden', className)} {...props}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          {category && (
            <Badge variant={featured ? 'default' : 'secondary'}>
              {category}
            </Badge>
          )}
          {featured && (
            <Badge variant="default" className="bg-accent-purple">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      
      {excerpt && (
        <CardContent>
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardContent>
      )}
      
      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {author && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {author}
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};