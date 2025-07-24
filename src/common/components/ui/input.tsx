import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex peer w-full min-w-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        boxed:
          "h-12 rounded-[10px] border border-input bg-transparent px-5 py-1 text-sm shadow-xs focus:border-[#50B5FF]",
        underline:
          "h-12 border-0 border-b-2 border-input bg-transparent px-1 py-2 text-base focus-visible:ring-0 focus-visible:border-b-primary",
        borderless:
          "h-12 border-0 bg-transparent px-3 py-2 text-base focus-visible:ring-0 focus-visible:border-b-primary",
      },
    },
    defaultVariants: {
      variant: "boxed",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
