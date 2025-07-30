'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Briefcase, CheckCircle, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard, CardLabel } from './BaseCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface MemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  username: string
  name: string
  avatar?: string
  role?: string
  location?: string
  bio?: string
  skills?: string[]
  rating?: number
  reviews?: number
  hourlyRate?: number
  available?: boolean
  verified?: boolean
  onlineStatus?: 'online' | 'offline' | 'away'
  joinedDate?: Date | string
}

export const MemberCard: React.FC<MemberCardProps> = ({
  id,
  username,
  name,
  avatar,
  role = 'Developer',
  location,
  bio,
  skills = [],
  rating,
  reviews = 0,
  hourlyRate,
  available = true,
  verified = false,
  onlineStatus = 'offline',
  joinedDate,
  className,
  ...props
}) => {
  const statusColors = {
    online: 'bg-green-400',
    away: 'bg-yellow-400',
    offline: 'bg-gray-400'
  }

  return (
    <BaseCard variant="interactive" className={className} {...props}>
      {/* Type label */}
      <CardLabel type="member" />
      
      {/* Avatar with online status */}
      <div className="flex justify-center mt-6 mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700">
            {avatar ? (
              <Image 
                src={avatar} 
                alt={name}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-300">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* Online status indicator */}
          <div className={cn(
            "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-900",
            statusColors[onlineStatus]
          )} />
        </div>
      </div>
      
      {/* Name and verified badge */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white flex items-center justify-center gap-1">
          <Link href={`/profile/${username}`} className="hover:text-vybe-purple-light transition-colors">
            {name}
          </Link>
          {verified && (
            <CheckCircle className="w-4 h-4 text-blue-400" />
          )}
        </h3>
        
        {/* Role */}
        {role && (
          <p className="text-sm text-gray-400 mt-1">{role}</p>
        )}
        
        {/* Location */}
        {location && (
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        )}
      </div>
      
      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-400 text-center mt-3 line-clamp-2">
          {bio}
        </p>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-3">
          {skills.slice(0, 3).map(skill => (
            <span 
              key={skill}
              className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light px-2 py-1 text-xs rounded">
              +{skills.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* Rating and hourly rate */}
      <div className="mt-auto">
        {rating && (
          <div className="flex items-center justify-center gap-1 mt-3">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-white">{rating.toFixed(1)}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-400">({reviews} reviews)</span>
            )}
          </div>
        )}
        
        {hourlyRate && (
          <p className="text-center mt-2">
            <span className="text-2xl font-semibold text-white">${hourlyRate}</span>
            <span className="text-sm text-gray-400">/hr</span>
          </p>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/50">
        <Button 
          variant="secondary"
          size="sm"
          className="flex-1"
          asChild
        >
          <Link href={`/profile/${username}`}>
            View Profile
          </Link>
        </Button>
        {available && hourlyRate && (
          <Button 
            size="sm"
            className="flex-1 bg-gradient-to-r from-vybe-purple to-vybe-pink hover:shadow-lg hover:shadow-vybe-purple/25"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Book Now
          </Button>
        )}
      </div>
    </BaseCard>
  )
}