"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Enable rich colors for methods like toast.success()
      richColors
      toastOptions={{
        classNames: {
          // By targeting data attributes, we create more specific and reliable styles
          toast: `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg
                  group-[.toaster]:data-[type="success"]:bg-white
                  group-[.toaster]:data-[type="success"]:text-[#50B5FF]
                  group-[.toaster]:data-[type="success"]:border-[#50B5FF]
                  group-[.toaster]:data-[type="info"]:bg-secondary
                  group-[.toaster]:data-[type="info"]:text-secondary-foreground
                 `,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
