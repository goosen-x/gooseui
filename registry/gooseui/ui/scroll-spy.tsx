"use client"

import {
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useState,
} from "react"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/registry/gooseui/hooks/use-scroll-spy"

export type ScrollSpyItem = {
  id: string
  label: string
  icon: ReactNode
}

export type ScrollSpyProps = Omit<ComponentProps<"nav">, "children"> & {
  items: ScrollSpyItem[]
  /** Scroll distance in pixels after which the panel appears. */
  showAfter?: number
  /** Which edge the panel sticks to. */
  side?: "left" | "right"
  /** Use `position: fixed`. Set to false to place the panel inside a relative parent. */
  fixed?: boolean
  /** Scroll container. Defaults to the window. */
  root?: HTMLElement | null | RefObject<HTMLElement | null>
  /** Activation line and scroll offset in pixels, measured from the top of the root. */
  offset?: number
  labels?: { nav?: string }
  onNavigate?: (id: string) => void
}

function resolveEl(
  value: HTMLElement | null | undefined | RefObject<HTMLElement | null>,
): HTMLElement | null {
  if (!value) return null
  if (value instanceof HTMLElement) return value
  return value.current
}

// Keyframes live here so the component works without extra Tailwind setup.
const STYLES = `
@keyframes gooseui-scroll-spy-ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-scroll-spy-ring { animation: none !important; }
}
`

export function ScrollSpy({
  items,
  showAfter = 200,
  side = "left",
  fixed = true,
  root,
  offset = 200,
  labels,
  onNavigate,
  className,
  ...props
}: ScrollSpyProps) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const activeId = useScrollSpy(ids, { root, offset })
  const [visible, setVisible] = useState(showAfter <= 0)

  // The panel appears once the page is scrolled past `showAfter`.
  // The state flips only when the threshold is crossed, so scrolling does not re-render.
  useEffect(() => {
    if (showAfter <= 0) {
      setVisible(true)
      return
    }
    const rootEl = resolveEl(root)
    const target: HTMLElement | Window = rootEl ?? window
    const read = () =>
      setVisible((rootEl ? rootEl.scrollTop : window.scrollY) > showAfter)
    read()
    target.addEventListener("scroll", read, { passive: true })
    return () => target.removeEventListener("scroll", read)
  }, [root, showAfter])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    // Without the section, or with a modifier key, the plain link does its job
    if (
      !el ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }
    event.preventDefault()
    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth"
    const rootEl = resolveEl(root)
    if (rootEl) {
      const top =
        el.getBoundingClientRect().top -
        rootEl.getBoundingClientRect().top +
        rootEl.scrollTop -
        offset +
        1
      rootEl.scrollTo({ top, behavior })
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset + 1,
        behavior,
      })
    }
    // Move focus for keyboard and screen reader users without a jump
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
    el.focus({ preventScroll: true })
    onNavigate?.(id)
  }

  return (
    <nav
      aria-label={labels?.nav ?? "Page sections"}
      data-visible={visible || undefined}
      {...props}
      className={cn(
        "group/spy z-50 top-1/2 -translate-y-1/2 [interpolate-size:allow-keywords]",
        fixed ? "fixed" : "absolute",
        side === "left" ? "left-6 -translate-x-5" : "right-6 translate-x-5",
        // Hidden until scrolled: fade and slide in, and back out
        "invisible opacity-0 transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none",
        "data-visible:visible data-visible:translate-x-0 data-visible:opacity-100",
        className,
      )}
    >
      <style href="gooseui-scroll-spy" precedence="default">
        {STYLES}
      </style>
      <ul
        className={cn(
          "space-y-1 rounded-xl border border-border/50 bg-background/95 p-2 shadow-xl backdrop-blur-md",
          "transition-[padding] duration-300 motion-reduce:transition-none",
          "group-focus-within/spy:p-3 group-hover/spy:p-3",
        )}
      >
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => go(event, item.id)}
                aria-current={active ? "location" : undefined}
                title={item.label}
                className={cn(
                  "group/item flex w-full cursor-pointer items-center justify-center gap-0 rounded-lg p-1.5 text-sm",
                  "transition-[gap,padding,background-color] duration-300 motion-reduce:transition-none",
                  "hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  "group-focus-within/spy:justify-start group-focus-within/spy:gap-3 group-focus-within/spy:p-2",
                  "group-hover/spy:justify-start group-hover/spy:gap-3 group-hover/spy:p-2",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex shrink-0 items-center justify-center transition-colors duration-300 motion-reduce:transition-none",
                    "[&_svg]:size-5 [&_svg]:transition-[width,height] [&_svg]:duration-300",
                    "group-focus-within/spy:[&_svg]:size-4 group-hover/spy:[&_svg]:size-4",
                    active
                      ? "text-primary"
                      : "text-muted-foreground/50 group-hover/item:text-muted-foreground",
                  )}
                >
                  {item.icon}
                </span>
                <span
                  className={cn(
                    "block w-0 overflow-hidden whitespace-nowrap text-left opacity-0",
                    "transition-[width,opacity] duration-200 motion-reduce:transition-none",
                    "group-focus-within/spy:w-auto group-focus-within/spy:flex-1 group-focus-within/spy:opacity-100",
                    "group-hover/spy:w-auto group-hover/spy:flex-1 group-hover/spy:opacity-100",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground group-hover/item:text-foreground/80",
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative flex h-3 w-0 shrink-0 items-center justify-center opacity-0",
                    "transition-[width,opacity] duration-200 motion-reduce:transition-none",
                    "group-focus-within/spy:w-3 group-focus-within/spy:opacity-100",
                    "group-hover/spy:w-3 group-hover/spy:opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none",
                      active ? "bg-primary" : "bg-transparent",
                    )}
                  />
                  {active && (
                    <span
                      className="gooseui-scroll-spy-ring absolute size-3 rounded-full border-2 border-primary/30"
                      style={{
                        animation:
                          "gooseui-scroll-spy-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
