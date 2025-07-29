'use client';

import React from 'react';
import { Card, CardProps } from './Card';

export interface MemberCardProps extends Omit<CardProps, 'variant'> {
  name: string;
  avatar?: string;
  role?: string;
  expertise?: string[];
  location?: string;
  isAvailable?: boolean;
  rating?: number;
  hourlyRate?: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  avatar,
  role,
  expertise = [],
  location,
  isAvailable = false,
  rating,
  hourlyRate,
  className,
  ...props
}) => {
  const stats = location || rating ? (
    <>
      {location && (
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </span>
      )}
      {rating && (
        <span className="flex items-center gap-1 text-sm">
          <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-gray-400">{rating.toFixed(1)}</span>
        </span>
      )}
    </>
  ) : null;

  return (
    <Card
      variant="member"
      stats={stats}
      className={className}
      {...props}
    >
      {/* Avatar and availability */}
      <div className="relative">
        <img 
          src={avatar || '/default-avatar.png'} 
          alt={name}
          className="w-20 h-20 rounded-full object-cover mx-auto"
        />
        {isAvailable && (
          <div className="absolute bottom-0 right-1/2 translate-x-10 translate-y-0">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        )}
      </div>

      {/* Name and role */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">
          {name}
        </h3>
        {role && (
          <p className="text-sm text-gray-400">{role}</p>
        )}
      </div>

      {/* Hourly rate */}
      {hourlyRate && (
        <div className="text-center">
          <span className="text-2xl font-bold text-white">${hourlyRate}</span>
          <span className="text-sm text-gray-400">/hour</span>
        </div>
      )}

      {/* Expertise tags */}
      {expertise.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {expertise.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full"
            >
              {skill}
            </span>
          ))}
          {expertise.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{expertise.length - 3} more
            </span>
          )}
        </div>
      )}
    </Card>
  );
};