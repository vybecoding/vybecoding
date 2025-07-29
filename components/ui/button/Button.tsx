import * as React from "react"
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Map our variants to Shadcn variants
const variantMap = {
  default: "default" as const,
  primary: "default" as const, // Use default with custom styling
  secondary: "secondary" as const,
  outline: "outline" as const,
  ghost: "ghost" as const,
  danger: "destructive" as const,
  success: "default" as const, // Use default with custom styling
  link: "link" as const,
}

// Map our sizes to Shadcn sizes
const sizeMap = {
  xs: "sm" as const,
  sm: "sm" as const,
  md: "default" as const,
  lg: "lg" as const,
  xl: "lg" as const,
  icon: "icon" as const,
  "icon-sm": "icon" as const,
  "icon-lg": "icon" as const,
}

export interface ButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md", 
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    // Custom class names for our specific variants
    const customClasses = cn(
      fullWidth && "w-full",
      variant === "primary" && "bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:opacity-90",
      variant === "success" && "bg-green-600 text-white hover:bg-green-700",
      size === "xs" && "h-7 px-2 text-xs",
      size === "xl" && "h-14 px-8 text-lg",
      size === "icon-sm" && "h-8 w-8",
      size === "icon-lg" && "h-12 w-12"
    )

    return (
      <ShadcnButton
        ref={ref}
        variant={variantMap[variant]}
        size={sizeMap[size]}
        className={cn(customClasses, className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </ShadcnButton>
    )
  }
)
Button.displayName = "Button"