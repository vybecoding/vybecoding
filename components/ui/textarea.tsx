import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm transition-all resize-none",
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
})
Textarea.displayName = "Textarea"

export { Textarea }
