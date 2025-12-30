"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast",
          description: "!text-current !opacity-80",
          success: "!border-l-4 !border-l-green-500 [&_svg]:!text-green-500",
          error: "!border-l-4 !border-l-red-500 [&_svg]:!text-red-500",
          warning: "!border-l-4 !border-l-amber-500 [&_svg]:!text-amber-500",
          info: "!border-l-4 !border-l-blue-500 [&_svg]:!text-blue-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
