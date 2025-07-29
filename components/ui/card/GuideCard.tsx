'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  className,
  ...props
}) => {
  const difficultyColor = {
    beginner: 'secondary',
    intermediate: 'default',
    advanced: 'destructive'
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription>
          by {author.name}
        </CardDescription>
      </CardHeader>
      
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
      )}
      
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {views > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views.toLocaleString()}
            </span>
          )}
          {likes > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes.toLocaleString()}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime} min
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          {difficulty && (
            <Badge variant={difficultyColor[difficulty] as any} className="capitalize text-xs">
              {difficulty}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};