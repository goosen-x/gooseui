"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Side = "top" | "bottom" | "left" | "right"
type Align = "start" | "center" | "end"
type TriggerProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>
}
const Context = React.createContext<{
  id: string
  anchor: string
  trigger: React.RefObject<HTMLElement | null>
  content: React.RefObject<HTMLDivElement | null>
  schedule: () => void
  close: () => void
} | null>(null)
function useTooltip() {
  const value = React.useContext(Context)
  if (!value) throw new Error("Tooltip parts must be inside Tooltip")
  return value
}
function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value)
  else if (ref) ref.current = value
}
function TooltipProvider({
  children,
}: {
  children: React.ReactNode
  delayDuration?: number
}) {
  return <>{children}</>
}
function Tooltip({ children }: { children: React.ReactNode }) {
  const id = `tooltip-${React.useId().replace(/:/g, "")}`
  const anchor = `--${id}`
  const trigger = React.useRef<HTMLElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const close = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    if (content.current?.matches(":popover-open")) content.current.hidePopover()
  }, [])
  const schedule = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const node = content.current
      if (node && !node.hidden && !node.matches(":popover-open"))
        node.showPopover()
    }, 300)
  }, [])
  React.useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", keydown)
    return () => {
      document.removeEventListener("keydown", keydown)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [close])
  return (
    <Context.Provider value={{ id, anchor, trigger, content, schedule, close }}>
      {children}
    </Context.Provider>
  )
}
function TooltipTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const ctx = useTooltip()
  const child = asChild
    ? (React.Children.only(children) as React.ReactElement<TriggerProps>)
    : null
  const original = child?.props
  const merged: TriggerProps = {
    ...props,
    ...original,
    className: cn("cursor-pointer", props.className, original?.className),
    ref: (node) => {
      ctx.trigger.current = node
      assignRef(original?.ref, node)
    },
    style: {
      ...props.style,
      ...original?.style,
      anchorName: ctx.anchor,
    } as React.CSSProperties,
    "aria-describedby": [original?.["aria-describedby"], ctx.id]
      .filter(Boolean)
      .join(" "),
    onMouseEnter: (event) => {
      props.onMouseEnter?.(event as React.MouseEvent<HTMLButtonElement>)
      original?.onMouseEnter?.(event)
      if (!event.defaultPrevented) ctx.schedule()
    },
    onMouseLeave: (event) => {
      props.onMouseLeave?.(event as React.MouseEvent<HTMLButtonElement>)
      original?.onMouseLeave?.(event)
      ctx.close()
    },
    onFocus: (event) => {
      props.onFocus?.(event as React.FocusEvent<HTMLButtonElement>)
      original?.onFocus?.(event)
      if (!event.defaultPrevented) ctx.schedule()
    },
    onBlur: (event) => {
      props.onBlur?.(event as React.FocusEvent<HTMLButtonElement>)
      original?.onBlur?.(event)
      ctx.close()
    },
  }
  return child ? (
    React.cloneElement(child, merged)
  ) : (
    <button type="button" {...(merged as React.ComponentProps<"button">)}>
      {children}
    </button>
  )
}
function TooltipContent({
  className,
  side = "top",
  align = "center",
  sideOffset = 4,
  style,
  hidden,
  ...props
}: React.ComponentProps<"div"> & {
  side?: Side
  align?: Align
  sideOffset?: number
}) {
  const ctx = useTooltip()
  React.useEffect(() => {
    const node = ctx.content.current
    const anchor = ctx.trigger.current
    if (!node || !anchor || CSS.supports("anchor-name: --a")) return
    const position = () => {
      if (!node.matches(":popover-open")) return
      const a = anchor.getBoundingClientRect(),
        b = node.getBoundingClientRect()
      let left =
        side === "left"
          ? a.left - b.width - sideOffset
          : side === "right"
            ? a.right + sideOffset
            : align === "start"
              ? a.left
              : align === "end"
                ? a.right - b.width
                : a.left + (a.width - b.width) / 2
      let top =
        side === "top"
          ? a.top - b.height - sideOffset
          : side === "bottom"
            ? a.bottom + sideOffset
            : align === "start"
              ? a.top
              : align === "end"
                ? a.bottom - b.height
                : a.top + (a.height - b.height) / 2
      left = Math.max(4, Math.min(left, innerWidth - b.width - 4))
      top = Math.max(4, Math.min(top, innerHeight - b.height - 4))
      Object.assign(node.style, { left: `${left}px`, top: `${top}px` })
    }
    node.addEventListener("toggle", position)
    window.addEventListener("resize", position)
    window.addEventListener("scroll", position, true)
    return () => {
      node.removeEventListener("toggle", position)
      window.removeEventListener("resize", position)
      window.removeEventListener("scroll", position, true)
    }
  }, [ctx.content, ctx.trigger, side, align, sideOffset])
  React.useEffect(() => {
    if (hidden) ctx.close()
  }, [hidden, ctx.close])
  return (
    <>
      <style>{`
      [data-goose-tooltip] { position: fixed; inset: auto; margin: 0; position-anchor: var(--goose-anchor); position-area: var(--goose-side); position-try-fallbacks: flip-block, flip-inline; opacity: 0; scale: .96; transition: opacity .15s, scale .15s, display .15s allow-discrete, overlay .15s allow-discrete; transition-behavior: allow-discrete; }
      [data-goose-tooltip]:popover-open { opacity: 1; scale: 1; }
      @starting-style { [data-goose-tooltip]:popover-open { opacity: 0; scale: .96; } }
      @media (prefers-reduced-motion: reduce) { [data-goose-tooltip] { transition: none; } }
    `}</style>
      <div
        {...props}
        id={ctx.id}
        ref={ctx.content}
        role="tooltip"
        popover="manual"
        hidden={hidden}
        data-goose-tooltip=""
        data-side={side}
        className={cn(
          "z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-background text-balance",
          className,
        )}
        style={
          {
            ...style,
            "--goose-anchor": ctx.anchor,
            "--goose-side":
              align === "center"
                ? side
                : `${side} ${side === "top" || side === "bottom" ? (align === "start" ? "span-right" : "span-left") : align === "start" ? "span-bottom" : "span-top"}`,
            ...(align === "center"
              ? {}
              : side === "top" || side === "bottom"
                ? { justifySelf: align }
                : { alignSelf: align }),
            marginBlock:
              side === "top" || side === "bottom"
                ? `${sideOffset / 16}rem`
                : undefined,
            marginInline:
              side === "left" || side === "right"
                ? `${sideOffset / 16}rem`
                : undefined,
          } as unknown as React.CSSProperties
        }
      />
    </>
  )
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
