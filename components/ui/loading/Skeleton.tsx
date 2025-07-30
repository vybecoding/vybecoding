import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  }

  return (
    <div
      className={cn(
        "bg-vybe-steel",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1.2em'
      }}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, className, ...props }: { lines?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4 p-6 rounded-lg bg-vybe-shadow", className)} {...props}>
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="60%" />
      <SkeletonText lines={2} />
      <div className="flex items-center gap-2 mt-4">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  )
}