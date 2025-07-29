import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
  glow?: 'purple' | 'pink' | 'orange' | null;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 0.2,
  border = true,
  glow = null
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const glowClasses = {
    purple: 'shadow-glow-purple',
    pink: 'shadow-glow-pink',
    orange: 'shadow-glow-orange'
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        blurClasses[blur],
        border && 'border border-vybe-pewter/30',
        glow && glowClasses[glow],
        className
      )}
      style={{
        backgroundColor: `rgba(26, 26, 26, ${opacity})`,
      }}
    >
      {/* Optional gradient border effect */}
      {border && (
        <div className="absolute inset-0 bg-gradient-to-br from-vybe-purple/20 via-transparent to-vybe-pink/20 opacity-50" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};