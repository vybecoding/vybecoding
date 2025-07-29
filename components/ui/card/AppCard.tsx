'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  const pricingBadgeVariant = pricing === 'free' ? 'secondary' : 
                             pricing === 'paid' ? 'destructive' : 'default';

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple text-xl font-bold">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">{developer}</CardDescription>
            </div>
          </div>
          <Badge variant={pricingBadgeVariant as any} className="capitalize">
            {pricing}
          </Badge>
        </div>
      </CardHeader>
      
      {description && (
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      )}
      
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {rating && (
              <span className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-muted-foreground">{rating.toFixed(1)}</span>
              </span>
            )}
            {downloads > 0 && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Download className="w-4 h-4" />
                {downloads.toLocaleString()}
              </span>
            )}
          </div>
          {category && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 w-full">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};