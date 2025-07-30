"use client";

import React from "react";

export interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showStats?: boolean;
}

export function SkeletonCard({ 
  className = "", 
  showImage = true, 
  showStats = true 
}: SkeletonCardProps) {
  return (
    <div className={`minimal-card animate-pulse ${className}`}>
      {/* Type label skeleton */}
      <div className="absolute top-0 left-0 w-12 h-6 bg-gray-700 rounded-br-lg"></div>
      
      {/* Image skeleton */}
      {showImage && (
        <div className="w-full h-48 bg-gray-700 rounded-t-lg mb-4"></div>
      )}
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        
        {/* Creator info */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
          <div className="h-4 bg-gray-700 rounded w-8"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-700 rounded w-20"></div>
          <div className="h-6 bg-gray-700 rounded w-12"></div>
        </div>
        
        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-700 rounded w-8"></div>
              <div className="h-4 bg-gray-700 rounded w-8"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}