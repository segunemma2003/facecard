import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-face-sky-blue/30 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-face-sky-blue focus-visible:ring-offset-2 focus-visible:border-face-sky-blue",
          "focus:outline-none focus:ring-2 focus:ring-face-sky-blue focus:ring-offset-2 focus:border-face-sky-blue",
          "-webkit-tap-highlight-color-transparent outline-none",
          className
        )}
        style={{ 
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none'
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }