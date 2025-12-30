import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      gradient:
        "bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent",
      highlight:
        "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-500/30 dark:via-yellow-400/30 dark:to-yellow-500/30 px-1 rounded",
    },
    affects: {
      default: "",
      removePMargin: "[&:not(:first-child)]:mt-0",
      withPMargin: "[&:not(:first-child)]:mt-6",
    },
  },
  defaultVariants: {
    variant: "p",
    affects: "default",
  },
})

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "blockquote"
  | "code"

const variantElementMap: Record<string, TypographyElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  blockquote: "blockquote",
  code: "code",
  gradient: "span",
  highlight: "span",
}

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement
}

function Typography({
  className,
  variant,
  affects,
  as,
  children,
  ...props
}: TypographyProps) {
  const Comp = as || variantElementMap[variant || "p"] || "p"

  return React.createElement(
    Comp,
    {
      className: cn(typographyVariants({ variant, affects, className })),
      ...props,
    },
    children,
  )
}

export { Typography, typographyVariants }
