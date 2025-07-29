'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  role?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  rating?: number;
  reviews?: number;
  hourlyRate?: string;
  available?: boolean;
  onBook?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  avatar,
  role,
  location,
  bio,
  skills = [],
  rating,
  reviews = 0,
  hourlyRate,
  available = true,
  onBook,
  className,
  ...props
}) => {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)} {...props}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-accent-purple/10 flex items-center justify-center text-2xl font-bold text-accent-purple">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
        {location && (
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        )}
      </CardHeader>
      
      {bio && (
        <CardContent>
          <p className="text-sm text-muted-foreground text-center line-clamp-3">{bio}</p>
        </CardContent>
      )}
      
      <CardFooter className="flex flex-col gap-3">
        {rating && (
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            {reviews > 0 && (
              <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
            )}
          </div>
        )}
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
        
        {hourlyRate && (
          <p className="text-lg font-semibold text-center">{hourlyRate}/hr</p>
        )}
        
        {onBook && (
          <Button 
            onClick={onBook} 
            className="w-full" 
            variant={available ? 'default' : 'secondary'}
            disabled={!available}
          >
            {available ? 'Book Now' : 'Unavailable'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};