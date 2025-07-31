import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm transition-all",
          "bg-[#1f2937] border border-[#374151] text-white",
          "placeholder:text-[#6b7280]",
          "hover:border-[#4b5563]",
          "focus:outline-none focus:border-vybe-purple-light focus:ring-1 focus:ring-vybe-purple-light",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
