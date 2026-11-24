"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Side = "top" | "bottom" | "left" | "right"
type Align = "start" | "center" | "end"
const OPPOSITE: Record<Side, Side> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
}
function area(side: Side, align: Align) {
  if (align === "center") return side
  const span =
    side === "top" || side === "bottom"
      ? align === "start"
        ? "span-right"
        : "span-left"
      : align === "start"
        ? "span-bottom"
        : "span-top"
  return `${side} ${span}`
}
// transform-origin sits on the trigger side; the menu slides out from there
function motion(side: Side, align: Align) {
  const cross = align === "start" ? "start" : align === "end" ? "end" : "center"
  const x =
    side === "left"
      ? "right"
      : side === "right"
        ? "left"
        : cross === "start"
          ? "left"
          : cross === "end"
            ? "right"
            : "center"
  const y =
    side === "top"
      ? "bottom"
      : side === "bottom"
        ? "top"
        : cross === "start"
          ? "top"
          : cross === "end"
            ? "bottom"
            : "center"
  const from = {
    top: "0 6px",
    bottom: "0 -6px",
    left: "6px 0",
    right: "-6px 0",
  }
  return { origin: `${x} ${y}`, from: from[side] }
}
type TriggerProps = React.HTMLAttributes<HTMLElement> & {
  popoverTarget?: string
  ref?: React.Ref<HTMLElement>
}
const Context = React.createContext<{
  id: string
  anchor: string
  trigger: React.RefObject<HTMLElement | null>
  content: React.RefObject<HTMLDivElement | null>
  open: boolean
  setOpen: (open: boolean) => void
  close: (restore?: boolean) => void
} | null>(null)
function useMenu() {
  const ctx = React.useContext(Context)
  if (!ctx) throw new Error("DropdownMenu parts must be inside DropdownMenu")
  return ctx
}
function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value)
  else if (ref) ref.current = value
}
function DropdownMenu({ children }: { children: React.ReactNode }) {
  const id = `menu-${React.useId().replace(/:/g, "")}`
  const trigger = React.useRef<HTMLElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback((restore = false) => {
    if (content.current?.matches(":popover-open")) content.current.hidePopover()
    if (restore) trigger.current?.focus()
  }, [])
  return (
    <Context.Provider
      value={{ id, anchor: `--${id}`, trigger, content, open, setOpen, close }}
    >
      {children}
    </Context.Provider>
  )
}
function DropdownMenuTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const ctx = useMenu()
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
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.id,
    // Declarative toggle: opens the menu even before JavaScript loads
    popoverTarget: ctx.id,
    onClick: (event) => {
      props.onClick?.(event as React.MouseEvent<HTMLButtonElement>)
      original?.onClick?.(event)
    },
    onKeyDown: (event) => {
      props.onKeyDown?.(event as React.KeyboardEvent<HTMLButtonElement>)
      original?.onKeyDown?.(event)
      if (
        !event.defaultPrevented &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
        event.preventDefault()
        if (!ctx.content.current?.matches(":popover-open"))
          ctx.content.current?.showPopover()
        requestAnimationFrame(() => {
          const items = ctx.content.current?.querySelectorAll<HTMLElement>(
            '[role^="menuitem"]:not([aria-disabled="true"])',
          )
          items?.[event.key === "ArrowUp" ? items.length - 1 : 0]?.focus()
        })
      }
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
function DropdownMenuContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  style,
  onKeyDown,
  ...props
}: React.ComponentProps<"div"> & {
  side?: Side
  align?: Align
  sideOffset?: number
}) {
  const ctx = useMenu()
  React.useEffect(() => {
    const node = ctx.content.current,
      anchor = ctx.trigger.current
    if (!node || !anchor) return
    const native = CSS.supports("anchor-name: --a")
    const update = () => {
      if (!node.matches(":popover-open")) return
      const a = anchor.getBoundingClientRect(),
        // Layout size: not affected by the entry scale animation
        b = { width: node.offsetWidth, height: node.offsetHeight },
        vertical = side === "top" || side === "bottom",
        // Fixed bars (for example a review panel) publish their height here
        reserve =
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--review-panel-h",
            ),
          ) || 0
      const room = {
        top: a.top - 4,
        bottom: innerHeight - reserve - a.bottom - 4,
        left: a.left - 4,
        right: innerWidth - a.right - 4,
      }
      const need = (vertical ? b.height : b.width) + sideOffset
      // Flip only when the chosen side is too tight and the other one has more room
      const placement: Side =
        room[side] < need && room[OPPOSITE[side]] > room[side]
          ? OPPOSITE[side]
          : side
      if (native) {
        node.style.setProperty("--goose-side", area(placement, align))
      } else {
        let left =
          placement === "left"
            ? a.left - b.width - sideOffset
            : placement === "right"
              ? a.right + sideOffset
              : align === "start"
                ? a.left
                : align === "end"
                  ? a.right - b.width
                  : a.left + (a.width - b.width) / 2
        let top =
          placement === "top"
            ? a.top - b.height - sideOffset
            : placement === "bottom"
              ? a.bottom + sideOffset
              : align === "start"
                ? a.top
                : align === "end"
                  ? a.bottom - b.height
                  : a.top + (a.height - b.height) / 2
        left = Math.max(4, Math.min(left, innerWidth - b.width - 4))
        top = Math.max(4, Math.min(top, innerHeight - reserve - b.height - 4))
        Object.assign(node.style, { left: `${left}px`, top: `${top}px` })
      }
      const { origin, from } = motion(placement, align)
      node.style.setProperty("--goose-origin", origin)
      node.style.setProperty("--goose-from", from)
    }
    const toggle = () => {
      ctx.setOpen(node.matches(":popover-open"))
      update()
    }
    node.addEventListener("toggle", toggle)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      node.removeEventListener("toggle", toggle)
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [ctx.content, ctx.trigger, ctx.setOpen, side, align, sideOffset])
  return (
    <>
      <style>{`
      [data-goose-menu] { position: fixed; inset: auto; margin: 0; position-anchor: var(--goose-anchor); position-area: var(--goose-side); position-try-fallbacks: flip-block, flip-inline; transform-origin: var(--goose-origin); opacity: 0; scale: .96; translate: var(--goose-from); transition: opacity .15s, scale .15s, translate .15s, display .15s allow-discrete, overlay .15s allow-discrete; transition-behavior: allow-discrete; }
      [data-goose-menu]:popover-open { opacity: 1; scale: 1; translate: 0 0; }
      @starting-style { [data-goose-menu]:popover-open { opacity: 0; scale: .96; translate: var(--goose-from); } }
      @media (prefers-reduced-motion: reduce) { [data-goose-menu] { transition: none; } }
    `}</style>
      <div
        {...props}
        id={ctx.id}
        ref={ctx.content}
        role="menu"
        popover="auto"
        data-goose-menu=""
        data-side={side}
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
        style={
          {
            ...style,
            "--goose-anchor": ctx.anchor,
            "--goose-origin": motion(side, align).origin,
            "--goose-from": motion(side, align).from,
            "--goose-side": area(side, align),
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
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "Escape") {
            event.preventDefault()
            ctx.close(true)
            return
          }
          if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
            return
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              '[role^="menuitem"]:not([aria-disabled="true"])',
            ),
          )
          if (!items.length) return
          event.preventDefault()
          const index = items.indexOf(document.activeElement as HTMLElement)
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : event.key === "ArrowDown"
                  ? (index + 1) % items.length
                  : (index <= 0 ? items.length : index) - 1
          items[next]?.focus()
        }}
      />
    </>
  )
}
function DropdownMenuItem({
  className,
  onClick,
  onSelect,
  disabled,
  ...props
}: Omit<React.ComponentProps<"button">, "onSelect"> & {
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const ctx = useMenu()
  return (
    <button
      {...props}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onSelect?.(event)
        if (!event.defaultPrevented) ctx.close(true)
      }}
    />
  )
}
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
