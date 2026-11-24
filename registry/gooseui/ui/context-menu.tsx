"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ITEM_SELECTOR = '[role^="menuitem"]:not([aria-disabled="true"])'
/** Gap kept between the menu and the viewport edge */
const EDGE = 4
/** The menu overlaps the pointer by a few pixels, so releasing the button lands inside it */
const OVERLAP = 3
/** Border + padding of the menu: the submenu shifts up by this to line up its first item */
const SUB_SHIFT = 5
const SUB_OVERLAP = 2
const LONG_PRESS_MS = 500

// Without anchor positioning the menu sits at --context-menu-x/y, which JS
// clamps to the viewport. With it, a 0x0 anchor sits at the pointer and the
// browser flips the menu near the edges by itself.
const styles = `
[data-context-menu] {
  position: fixed; inset: auto; margin: 0;
  left: var(--context-menu-x, 0px); top: var(--context-menu-y, 0px);
  max-height: calc(100dvh - ${EDGE * 2}px); overflow-y: auto; overscroll-behavior: contain;
  transform-origin: var(--context-menu-origin, top left);
  opacity: 0; scale: .96;
  transition: opacity .15s, scale .15s, display .15s allow-discrete, overlay .15s allow-discrete;
  transition-behavior: allow-discrete;
}
[data-context-menu]:popover-open { opacity: 1; scale: 1; }
@starting-style { [data-context-menu]:popover-open { opacity: 0; scale: .96; } }
[data-context-menu-point] { position: fixed; left: var(--context-menu-x, 0px); top: var(--context-menu-y, 0px); width: 0; height: 0; pointer-events: none; }
@supports (position-try-fallbacks: flip-block) {
  [data-context-menu] {
    inset: auto; margin: -${OVERLAP}px;
    position-anchor: var(--context-menu-anchor);
    position-area: bottom right;
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  }
  [data-context-menu][data-context-menu-sub] {
    margin: -${SUB_SHIFT}px -${SUB_OVERLAP}px;
    position-area: right span-bottom;
    position-try-fallbacks: flip-inline, flip-block, flip-inline flip-block;
  }
}
@media (prefers-reduced-motion: reduce) { [data-context-menu] { transition: none; } }
`

function supportsNative() {
  return (
    typeof CSS !== "undefined" &&
    CSS.supports("position-try-fallbacks: flip-block")
  )
}

function setPoint(nodes: (HTMLElement | null)[], x: number, y: number) {
  for (const node of nodes) {
    node?.style.setProperty("--context-menu-x", `${x}px`)
    node?.style.setProperty("--context-menu-y", `${y}px`)
  }
}

function isOpen(node: HTMLElement | null) {
  return !!node?.matches(":popover-open")
}

function getItems(menu: HTMLElement) {
  return Array.from(menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (item) => item.closest('[role="menu"]') === menu,
  )
}

const typeahead = new WeakMap<HTMLElement, { text: string; time: number }>()

function itemLabel(item: HTMLElement) {
  return (item.dataset.textValue ?? item.textContent ?? "").trim().toLowerCase()
}

/** Arrow keys, Home/End and first-letter typeahead for one menu level */
function navigate(event: React.KeyboardEvent<HTMLElement>, menu: HTMLElement) {
  const items = getItems(menu)
  if (!items.length) return
  const index = items.indexOf(document.activeElement as HTMLElement)
  const { key } = event
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
    event.preventDefault()
    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? items.length - 1
          : key === "ArrowDown"
            ? (index + 1) % items.length
            : (index <= 0 ? items.length : index) - 1
    items[next]?.focus()
    return
  }
  if (
    key.length !== 1 ||
    key === " " ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey
  )
    return
  const state = typeahead.get(menu) ?? { text: "", time: 0 }
  const fresh = event.timeStamp - state.time > 500
  state.text = fresh ? key.toLowerCase() : state.text + key.toLowerCase()
  state.time = event.timeStamp
  typeahead.set(menu, state)
  // A single letter moves past the current item; a longer word may stay on it
  const from = state.text.length > 1 ? Math.max(index, 0) : index + 1
  const ordered = [...items.slice(from), ...items.slice(0, from)]
  const repeated = state.text.split("").every((c) => c === state.text[0])
  const match =
    ordered.find((item) => itemLabel(item).startsWith(state.text)) ??
    (repeated
      ? [...items.slice(index + 1), ...items.slice(0, index + 1)].find((item) =>
          itemLabel(item).startsWith(state.text[0]),
        )
      : undefined)
  if (match) {
    event.preventDefault()
    match.focus()
  }
}

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [inner, setInner] = React.useState(defaultValue)
  const controlled = value !== undefined
  const current = controlled ? value : inner
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next)
      onChange?.(next)
    },
    [controlled, onChange],
  )
  return [current, set] as const
}

type RootContextValue = {
  id: string
  anchor: string
  content: React.RefObject<HTMLDivElement | null>
  point: React.RefObject<HTMLSpanElement | null>
  trigger: React.RefObject<HTMLDivElement | null>
  open: boolean
  setOpen: (open: boolean) => void
  openAt: (x: number, y: number, focusFirst: boolean) => void
  close: (restoreFocus?: boolean) => void
}

const RootContext = React.createContext<RootContextValue | null>(null)
/** The menu element of the current level, used by submenus and items */
const MenuLevelContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

function useContextMenu() {
  const ctx = React.useContext(RootContext)
  if (!ctx) throw new Error("ContextMenu parts must be inside ContextMenu")
  return ctx
}

function ContextMenu({
  children,
  onOpenChange,
}: {
  children: React.ReactNode
  /** Called when the menu opens or closes */
  onOpenChange?: (open: boolean) => void
}) {
  const id = `context-menu-${React.useId().replace(/:/g, "")}`
  const content = React.useRef<HTMLDivElement>(null)
  const point = React.useRef<HTMLSpanElement>(null)
  const trigger = React.useRef<HTMLDivElement>(null)
  const restore = React.useRef<HTMLElement | null>(null)
  const [open, setOpenState] = React.useState(false)
  const onOpenChangeRef = React.useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const setOpen = React.useCallback((next: boolean) => {
    setOpenState((prev) => {
      if (prev !== next) onOpenChangeRef.current?.(next)
      return next
    })
  }, [])

  const openAt = React.useCallback(
    (x: number, y: number, focusFirst: boolean) => {
      const node = content.current
      if (!node) return
      const active = document.activeElement
      if (!node.contains(active))
        restore.current = active instanceof HTMLElement ? active : null
      for (const sub of node.querySelectorAll<HTMLElement>(
        "[data-context-menu-sub]",
      ))
        if (isOpen(sub)) sub.hidePopover()

      setPoint([node, point.current], x, y)
      if (!isOpen(node)) node.showPopover()
      // Layout size, not affected by the entry scale
      const w = node.offsetWidth
      const h = node.offsetHeight
      const flipX =
        x + w - OVERLAP > innerWidth - EDGE && x - w + OVERLAP >= EDGE
      const flipY =
        y + h - OVERLAP > innerHeight - EDGE && y - h + OVERLAP >= EDGE
      node.style.setProperty(
        "--context-menu-origin",
        `${flipX ? "right" : "left"} ${flipY ? "bottom" : "top"}`,
      )
      if (!supportsNative()) {
        const left = flipX ? x - w + OVERLAP : x - OVERLAP
        const top = flipY ? y - h + OVERLAP : y - OVERLAP
        setPoint(
          [node],
          Math.max(EDGE, Math.min(left, innerWidth - w - EDGE)),
          Math.max(EDGE, Math.min(top, innerHeight - h - EDGE)),
        )
      }
      if (focusFirst) getItems(node)[0]?.focus({ preventScroll: true })
      else node.focus({ preventScroll: true })
    },
    [],
  )

  const close = React.useCallback((restoreFocus = false) => {
    if (isOpen(content.current)) content.current?.hidePopover()
    if (!restoreFocus) return
    const target = restore.current
    const fallback = trigger.current
    if (target?.isConnected && target !== document.body)
      target.focus({ preventScroll: true })
    else fallback?.focus({ preventScroll: true })
  }, [])

  const value = React.useMemo(
    () => ({
      id,
      anchor: `--${id}`,
      content,
      point,
      trigger,
      open,
      setOpen,
      openAt,
      close,
    }),
    [id, open, setOpen, openAt, close],
  )
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}

// One gesture can bubble through nested triggers; only the innermost handles it
const claimed = new WeakSet<Event>()

function ContextMenuTrigger({
  disabled = false,
  tabIndex = 0,
  className,
  onContextMenu,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<"div"> & {
  /** Let the browser show its own menu instead */
  disabled?: boolean
}) {
  const ctx = useContextMenu()
  const press = React.useRef<{ x: number; y: number; timer: number } | null>(
    null,
  )
  const lastOpen = React.useRef(0)

  const cancelPress = () => {
    if (press.current) window.clearTimeout(press.current.timer)
    press.current = null
  }
  React.useEffect(() => cancelPress, [])

  const claim = (event: React.SyntheticEvent) => {
    if (disabled || claimed.has(event.nativeEvent)) return false
    claimed.add(event.nativeEvent)
    return true
  }

  return (
    <div
      {...props}
      ref={ctx.trigger}
      tabIndex={disabled ? undefined : tabIndex}
      data-slot="context-menu-trigger"
      data-state={ctx.open ? "open" : "closed"}
      data-disabled={disabled || undefined}
      className={cn(
        "[-webkit-touch-callout:none] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      onContextMenu={(event) => {
        onContextMenu?.(event)
        if (event.defaultPrevented || !claim(event)) return
        event.preventDefault()
        cancelPress()
        // Already opened by long press or by the keyboard handler
        if (Date.now() - lastOpen.current < 600 && isOpen(ctx.content.current))
          return
        const native = event.nativeEvent as PointerEvent
        const fromKeyboard =
          native.pointerType === "" ||
          (event.clientX === 0 && event.clientY === 0)
        if (fromKeyboard) {
          const r = (event.target as HTMLElement).getBoundingClientRect()
          ctx.openAt(r.left + 8, r.height <= 64 ? r.bottom : r.top + 8, true)
        } else {
          ctx.openAt(event.clientX, event.clientY, false)
        }
        lastOpen.current = Date.now()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const isMenuKey =
          event.key === "ContextMenu" || (event.key === "F10" && event.shiftKey)
        if (!isMenuKey || !claim(event)) return
        event.preventDefault()
        const r = (event.target as HTMLElement).getBoundingClientRect()
        ctx.openAt(r.left + 8, r.height <= 64 ? r.bottom : r.top + 8, true)
        lastOpen.current = Date.now()
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (event.pointerType === "mouse" || !claim(event)) return
        cancelPress()
        const { clientX: x, clientY: y } = event
        press.current = {
          x,
          y,
          timer: window.setTimeout(() => {
            press.current = null
            ctx.openAt(x, y, false)
            lastOpen.current = Date.now()
          }, LONG_PRESS_MS),
        }
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        const p = press.current
        if (p && Math.hypot(event.clientX - p.x, event.clientY - p.y) > 10)
          cancelPress()
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        cancelPress()
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        cancelPress()
      }}
    />
  )
}

function ContextMenuContent({
  className,
  style,
  onKeyDown,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useContextMenu()

  React.useEffect(() => {
    const node = ctx.content.current
    if (!node) return
    const onToggle = (event: Event) =>
      ctx.setOpen((event as ToggleEvent).newState === "open")
    // A menu at a fixed point makes no sense once the page moves under it
    const onScroll = (event: Event) => {
      if (isOpen(node) && !node.contains(event.target as Node)) ctx.close()
    }
    const onResize = () => ctx.close()
    node.addEventListener("toggle", onToggle)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)
    return () => {
      node.removeEventListener("toggle", onToggle)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [ctx.content, ctx.setOpen, ctx.close])

  return (
    <>
      <style href="gooseui-context-menu" precedence="default">
        {styles}
      </style>
      <span
        ref={ctx.point}
        aria-hidden
        data-context-menu-point=""
        style={{ anchorName: ctx.anchor } as React.CSSProperties}
      />
      <div
        {...props}
        id={ctx.id}
        ref={ctx.content}
        role="menu"
        popover="auto"
        tabIndex={-1}
        data-slot="context-menu-content"
        data-context-menu=""
        className={cn(
          "z-50 min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          className,
        )}
        style={
          {
            ...style,
            "--context-menu-anchor": ctx.anchor,
          } as React.CSSProperties
        }
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "Escape" || event.key === "Tab") {
            event.preventDefault()
            ctx.close(true)
            return
          }
          navigate(event, event.currentTarget)
        }}
      >
        <MenuLevelContext.Provider value={ctx.content}>
          {children}
        </MenuLevelContext.Provider>
      </div>
    </>
  )
}

// Same item look as DropdownMenuItem, plus icon sizing for leading icons
const itemClass =
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ChevronRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

// The pointer moves focus, so mouse and keyboard share one highlight
const pointerFocus = {
  onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return
    if (document.activeElement !== event.currentTarget)
      event.currentTarget.focus({ preventScroll: true })
  },
  onPointerLeave(event: React.PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      document.activeElement !== event.currentTarget
    )
      return
    event.currentTarget
      .closest<HTMLElement>('[role="menu"]')
      ?.focus({ preventScroll: true })
  },
}

type ItemBaseProps = Omit<React.ComponentProps<"button">, "onSelect"> & {
  /** Runs on click, Enter or Space. Call `event.preventDefault()` to keep the menu open */
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Text used by typeahead when the children are not plain text */
  textValue?: string
  /** Indent to line up with checkbox and radio items */
  inset?: boolean
}

function useItemProps({
  onClick,
  onSelect,
  onPointerMove,
  onPointerLeave,
  disabled,
  textValue,
  ...rest
}: Omit<ItemBaseProps, "inset" | "className">) {
  const ctx = useContextMenu()
  return {
    ...rest,
    type: "button" as const,
    tabIndex: -1,
    disabled,
    "aria-disabled": disabled || undefined,
    "data-text-value": textValue,
    onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(event)
      pointerFocus.onPointerMove(event)
    },
    onPointerLeave: (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event)
      pointerFocus.onPointerLeave(event)
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      onSelect?.(event)
      if (!event.defaultPrevented) ctx.close(true)
    },
  }
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto pl-4 font-sans text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuItem({
  className,
  variant = "default",
  shortcut,
  inset,
  children,
  ...props
}: ItemBaseProps & {
  variant?: "default" | "destructive"
  /** Hint such as "⌘D", shown at the end of the item */
  shortcut?: React.ReactNode
}) {
  const itemProps = useItemProps(props)
  return (
    <button
      {...itemProps}
      role="menuitem"
      data-slot="context-menu-item"
      data-variant={variant}
      className={cn(
        itemClass,
        inset && "pl-8",
        variant === "destructive" &&
          "text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive dark:hover:bg-destructive/20 dark:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-destructive",
        className,
      )}
    >
      {children}
      {shortcut != null && (
        <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
      )}
    </button>
  )
}

function ContextMenuCheckboxItem({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  onSelect,
  shortcut,
  children,
  ...props
}: Omit<ItemBaseProps, "inset"> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  shortcut?: React.ReactNode
}) {
  const [state, setState] = useControllableState(
    checked,
    defaultChecked,
    onCheckedChange,
  )
  const itemProps = useItemProps({
    ...props,
    onSelect: (event) => {
      setState(!state)
      onSelect?.(event)
    },
  })
  return (
    <button
      {...itemProps}
      role="menuitemcheckbox"
      aria-checked={state}
      data-slot="context-menu-checkbox-item"
      data-state={state ? "checked" : "unchecked"}
      className={cn(itemClass, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        {state && <CheckIcon className="text-current" />}
      </span>
      {children}
      {shortcut != null && (
        <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
      )}
    </button>
  )
}

const RadioContext = React.createContext<{
  value: string | undefined
  setValue: (value: string) => void
} | null>(null)

function ContextMenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [current, setValue] = useControllableState<string | undefined>(
    value,
    defaultValue,
    onValueChange as (value: string | undefined) => void,
  )
  return (
    <RadioContext.Provider value={{ value: current, setValue }}>
      <div role="group" data-slot="context-menu-radio-group" {...props} />
    </RadioContext.Provider>
  )
}

function ContextMenuRadioItem({
  className,
  value,
  onSelect,
  shortcut,
  children,
  ...props
}: Omit<ItemBaseProps, "inset" | "value"> & {
  value: string
  shortcut?: React.ReactNode
}) {
  const group = React.useContext(RadioContext)
  if (!group)
    throw new Error("ContextMenuRadioItem must be inside ContextMenuRadioGroup")
  const checked = group.value === value
  const itemProps = useItemProps({
    ...props,
    onSelect: (event) => {
      group.setValue(value)
      onSelect?.(event)
    },
  })
  return (
    <button
      {...itemProps}
      role="menuitemradio"
      aria-checked={checked}
      data-slot="context-menu-radio-item"
      data-state={checked ? "checked" : "unchecked"}
      className={cn(itemClass, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        {checked && <span className="size-2 rounded-full bg-current" />}
      </span>
      {children}
      {shortcut != null && (
        <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
      )}
    </button>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="context-menu-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  )
}

type SubContextValue = {
  id: string
  anchor: string
  trigger: React.RefObject<HTMLButtonElement | null>
  content: React.RefObject<HTMLDivElement | null>
  open: boolean
  setOpen: (open: boolean) => void
  show: (focusFirst: boolean) => void
  hide: (focusTrigger?: boolean) => void
}

const SubContext = React.createContext<SubContextValue | null>(null)

function useSub() {
  const ctx = React.useContext(SubContext)
  if (!ctx)
    throw new Error("ContextMenuSub parts must be inside ContextMenuSub")
  return ctx
}

/** One nested level. Opens to the right of its trigger and flips left near the edge */
function ContextMenuSub({ children }: { children: React.ReactNode }) {
  const id = `context-sub-${React.useId().replace(/:/g, "")}`
  const parent = React.useContext(MenuLevelContext)
  const trigger = React.useRef<HTMLButtonElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  const show = React.useCallback((focusFirst: boolean) => {
    const node = content.current
    const anchor = trigger.current
    if (!node || !anchor) return
    if (!isOpen(node)) node.showPopover()
    const r = anchor.getBoundingClientRect()
    const w = node.offsetWidth
    const h = node.offsetHeight
    const flipX =
      r.right + w - SUB_OVERLAP > innerWidth - EDGE &&
      r.left - w + SUB_OVERLAP >= EDGE
    const flipY =
      r.top - SUB_SHIFT + h > innerHeight - EDGE &&
      r.bottom + SUB_SHIFT - h >= EDGE
    node.style.setProperty(
      "--context-menu-origin",
      `${flipX ? "right" : "left"} ${flipY ? "bottom" : "top"}`,
    )
    if (!supportsNative()) {
      const left = flipX ? r.left - w + SUB_OVERLAP : r.right - SUB_OVERLAP
      const top = flipY ? r.bottom + SUB_SHIFT - h : r.top - SUB_SHIFT
      setPoint(
        [node],
        Math.max(EDGE, Math.min(left, innerWidth - w - EDGE)),
        Math.max(EDGE, Math.min(top, innerHeight - h - EDGE)),
      )
    }
    if (focusFirst) getItems(node)[0]?.focus({ preventScroll: true })
  }, [])

  const hide = React.useCallback((focusTrigger = false) => {
    if (isOpen(content.current)) content.current?.hidePopover()
    if (focusTrigger) trigger.current?.focus({ preventScroll: true })
  }, [])

  // Focus landing on another item of the parent menu closes this submenu
  React.useEffect(() => {
    const menu = parent?.current
    if (!menu) return
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node
      if (
        target === menu ||
        trigger.current?.contains(target) ||
        content.current?.contains(target)
      )
        return
      hide()
    }
    menu.addEventListener("focusin", onFocusIn)
    return () => menu.removeEventListener("focusin", onFocusIn)
  }, [parent, hide])

  const value = React.useMemo(
    () => ({
      id,
      anchor: `--${id}`,
      trigger,
      content,
      open,
      setOpen,
      show,
      hide,
    }),
    [id, open, show, hide],
  )
  return <SubContext.Provider value={value}>{children}</SubContext.Provider>
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  style,
  onClick,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  disabled,
  textValue,
  ...props
}: Omit<ItemBaseProps, "onSelect">) {
  const sub = useSub()
  const timer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <button
      {...props}
      ref={sub.trigger}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-haspopup="menu"
      aria-expanded={sub.open}
      aria-controls={sub.id}
      data-text-value={textValue}
      data-slot="context-menu-sub-trigger"
      data-state={sub.open ? "open" : "closed"}
      className={cn(
        itemClass,
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
      style={{ ...style, anchorName: sub.anchor } as React.CSSProperties}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) sub.show(false)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (
          event.key === "ArrowRight" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault()
          sub.show(true)
        }
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.pointerType !== "mouse") return
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => sub.show(false), 100)
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        pointerFocus.onPointerMove(event)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        window.clearTimeout(timer.current)
        pointerFocus.onPointerLeave(event)
      }}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </button>
  )
}

function ContextMenuSubContent({
  className,
  style,
  onKeyDown,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const root = useContextMenu()
  const sub = useSub()
  React.useEffect(() => {
    const node = sub.content.current
    if (!node) return
    const onToggle = (event: Event) =>
      sub.setOpen((event as ToggleEvent).newState === "open")
    node.addEventListener("toggle", onToggle)
    return () => node.removeEventListener("toggle", onToggle)
  }, [sub.content, sub.setOpen])

  // Rendered inside the parent menu, so the browser treats it as a nested popover
  return (
    <div
      {...props}
      id={sub.id}
      ref={sub.content}
      role="menu"
      popover="auto"
      tabIndex={-1}
      data-slot="context-menu-sub-content"
      data-context-menu=""
      data-context-menu-sub=""
      className={cn(
        "z-50 min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
        className,
      )}
      style={
        { ...style, "--context-menu-anchor": sub.anchor } as React.CSSProperties
      }
      onKeyDown={(event) => {
        onKeyDown?.(event)
        // Keep the parent menu from handling the same key
        event.stopPropagation()
        if (event.defaultPrevented) return
        if (event.key === "Escape" || event.key === "ArrowLeft") {
          event.preventDefault()
          sub.hide(true)
          return
        }
        if (event.key === "Tab") {
          event.preventDefault()
          root.close(true)
          return
        }
        navigate(event, event.currentTarget)
      }}
    >
      <MenuLevelContext.Provider value={sub.content}>
        {children}
      </MenuLevelContext.Provider>
    </div>
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
