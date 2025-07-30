import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  blur?: 'xs' | 'sm' | 'md' | 'lg'
  opacity?: number
  border?: boolean
}

export function GlassCard({ 
  children, 
  className,
  blur = 'md',
  opacity = 0.4,
  border = true,
  ...props 
}: GlassCardProps) {
  const blurValues = {
    xs: '2px',
    sm: '4px',
    md: '12px',
    lg: '20px'
  }

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg",
        border && "border border-white/10",
        className
      )}
      style={{
        background: `rgba(26, 26, 26, ${opacity})`,
        backdropFilter: `blur(${blurValues[blur]})`,
        WebkitBackdropFilter: `blur(${blurValues[blur]})`
      }}
      {...props}
    >
      {children}
    </div>
  )
}