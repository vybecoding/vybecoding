import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow'
  animate?: boolean
}

export function GradientText({ 
  children, 
  className,
  variant = 'primary',
  animate = false,
  ...props 
}: GradientTextProps) {
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange',
    secondary: 'bg-gradient-to-r from-vybe-purple to-vybe-indigo',
    accent: 'bg-gradient-to-r from-vybe-pink to-vybe-orange',
    rainbow: 'bg-gradient-to-r from-vybe-matrix-green via-vybe-neural-purple to-vybe-quantum-orange'
  }

  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent",
        gradientClasses[variant],
        animate && "animate-gradient-x bg-[length:200%_auto]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}