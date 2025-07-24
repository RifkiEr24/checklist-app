"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 1. CVA for the Checkbox container styles
const checkboxVariants = cva(
  "peer shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-[#50B5FF] data-[state=checked]:text-primary-foreground data-[state=checked]:border-[#50b6ff93]",
        green:
          "data-[state=checked]:bg-[#6ed2302c]  data-[state=checked]:text-[##6DD230] text-[#6DD230] font-bold data-[state=checked]:border-[#6ed2302c]",
      },
      size: {
        default: "size-4",
        small: "size-3",
        large: "size-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. CVA specifically for the CheckIcon's size
const iconVariants = cva("", {
  variants: {
    iconSize: {
      default: "size-3.5",
      small: "size-2.5",
      large: "size-6",
    },
  },
  defaultVariants: {
    iconSize: "default",
  },
})

// 3. Extend props to include all variants
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants>,
    VariantProps<typeof iconVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, iconSize, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {/* 4. Apply the icon-specific variants here */}
        <CheckIcon className={cn(iconVariants({ iconSize }))} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }