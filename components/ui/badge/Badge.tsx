import * as React from "react"
import { Badge as ShadcnBadge, type BadgeProps as ShadcnBadgeProps } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Map our variants to Shadcn variants
const variantMap = {
  default: "secondary" as const,
  primary: "default" as const,
  secondary: "secondary" as const,
  success: "secondary" as const, // Custom color
  warning: "secondary" as const, // Custom color
  danger: "destructive" as const,
  info: "secondary" as const, // Custom color
  outline: "outline" as const,
}

// Map our sizes
const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-base px-3 py-1",
}

export interface BadgeProps extends Omit<ShadcnBadgeProps, "variant"> {
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeClasses
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    removable = false,
    onRemove,
    icon,
    children,
    ...props 
  }, ref) => {
    // Custom color classes for our specific variants
    const customClasses = cn(
      sizeClasses[size],
      variant === "success" && "bg-green-600/10 text-green-600 hover:bg-green-600/20",
      variant === "warning" && "bg-yellow-600/10 text-yellow-600 hover:bg-yellow-600/20",
      variant === "info" && "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20",
      removable && "pr-1"
    )

    return (
      <ShadcnBadge
        variant={variantMap[variant]}
        className={cn(customClasses, className)}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-1 hover:text-white focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </ShadcnBadge>
    )
  }
)
Badge.displayName = "Badge"