import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'brand' | 'title' | 'purple' | 'pink' | 'orange' | 'ai' | 'custom';
  customGradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'brand',
  customGradient
}) => {
  const gradientClasses = {
    brand: 'bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange',
    title: 'bg-gradient-to-br from-vybe-purple to-vybe-orange',
    purple: 'bg-gradient-to-br from-vybe-purple to-vybe-indigo',
    pink: 'bg-gradient-to-br from-vybe-pink to-vybe-coral',
    orange: 'bg-gradient-to-br from-vybe-orange to-vybe-amber',
    ai: 'bg-gradient-to-r from-vybe-matrix-green via-vybe-neural-purple via-vybe-quantum-orange via-vybe-plasma-pink to-vybe-fusion-cyan',
    custom: ''
  };

  const gradientClass = gradient === 'custom' ? '' : gradientClasses[gradient];
  
  return (
    <span 
      className={cn(
        'bg-clip-text text-transparent',
        gradientClass,
        className
      )}
      style={gradient === 'custom' && customGradient ? {
        backgroundImage: customGradient
      } : undefined}
    >
      {children}
    </span>
  );
};