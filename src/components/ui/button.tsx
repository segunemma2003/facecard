import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-face-sky-blue text-white hover:bg-face-sky-blue-dark shadow-lg border-2 border-face-sky-blue hover:border-face-sky-blue-dark hover:scale-105 focus-visible:ring-2 focus-visible:ring-face-sky-blue focus-visible:ring-offset-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2",
        outline:
          "border-2 border-face-sky-blue bg-white text-face-sky-blue hover:bg-face-sky-blue hover:text-white shadow-lg hover:scale-105 focus-visible:ring-2 focus-visible:ring-face-sky-blue focus-visible:ring-offset-2",
        secondary:
          "bg-face-grey text-white hover:bg-face-grey/80 shadow-md hover:scale-105 focus-visible:ring-2 focus-visible:ring-face-grey focus-visible:ring-offset-2",
        ghost: "hover:bg-face-sky-blue/10 hover:text-face-sky-blue focus-visible:ring-2 focus-visible:ring-face-sky-blue focus-visible:ring-offset-2",
        link: "text-face-sky-blue underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-face-sky-blue focus-visible:ring-offset-2",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-lg px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ outline: 'none' }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }