"use client"

import * as React from "react"

type Id = string | number
type Content = React.ReactNode
type Type = "default" | "success" | "error" | "warning" | "info" | "loading"
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

interface Button {
  label: Content
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ToastOptions {
  /** Same id updates the existing toast instead of adding a new one */
  id?: Id
  description?: Content
  /** Milliseconds before closing. Infinity keeps the toast until dismissed */
  duration?: number
  action?: Button
  cancel?: Button
  /** Replaces the icon of the type. null hides it */
  icon?: Content
  /** Bar that runs down until the toast closes, false hides it */
  progress?: boolean
  closeButton?: boolean
  className?: string
  onDismiss?: (toast: ToastData) => void
  onAutoClose?: (toast: ToastData) => void
}

export interface ToastData extends ToastOptions {
  id: Id
  title: Content
  type: Type
  /** Grows on every update, restarts the timer and the progress bar */
  version: number
  dismissed?: boolean
}

type Message<A> = Content | ((value: A) => Content)

export interface ToasterProps {
  position?: ToastPosition
  /** How many toasts show in the stack, the rest wait behind */
  visibleToasts?: number
  /** Keep the stack always expanded */
  expand?: boolean
  richColors?: boolean
  closeButton?: boolean
  /** Space between toasts in px */
  gap?: number
  /** Distance to the screen edge, number in px or any CSS length */
  offset?: number | string
  dir?: "ltr" | "rtl" | "auto"
  /** Default lifetime in ms */
  duration?: number
  /** Keys that focus the toasts, event.code or a modifier like altKey */
  hotkey?: string[]
  /** Accessible name of the region */
  label?: string
  closeLabel?: string
  className?: string
  style?: React.CSSProperties
}

// Store: a list and subscribers, no context, so toast() works anywhere
let items: ToastData[] = []
let uid = 0
const subs = new Set<() => void>()
const none: ToastData[] = []
const same = (a: Id, b?: Id) => `${a}` === `${b}`
const set = (next: ToastData[]) => {
  items = next
  for (const notify of subs) notify()
}

function add(type: Type, title: Content, options: ToastOptions = {}): Id {
  const id = options.id ?? ++uid
  if (typeof window === "undefined") return id
  const old = items.find((t) => same(t.id, id))
  const next: ToastData = {
    ...old,
    ...options,
    id,
    title,
    type,
    version: (old?.version ?? 0) + 1,
    dismissed: false,
  }
  set(old ? items.map((t) => (t === old ? next : t)) : [next, ...items])
  return id
}

function close(id?: Id, auto?: boolean) {
  const hit = items.filter(
    (t) => !t.dismissed && (id == null || same(t.id, id)),
  )
  if (!hit.length) return
  set(items.map((t) => (hit.includes(t) ? { ...t, dismissed: true } : t)))
  for (const t of hit) (auto ? t.onAutoClose : t.onDismiss)?.(t)
}

function remove(id: Id) {
  if (items.some((t) => same(t.id, id)))
    set(items.filter((t) => !same(t.id, id)))
}

const make =
  (type: Type) =>
  (title: Content, options?: ToastOptions): Id =>
    add(type, title, options)

export const toast = Object.assign(make("default"), {
  success: make("success"),
  error: make("error"),
  warning: make("warning"),
  info: make("info"),
  loading: make("loading"),
  dismiss: (id?: Id) => close(id),
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: {
      loading?: Content
      success?: Message<T>
      error?: Message<unknown>
      finally?: () => void
    },
  ): Id {
    const id = add("loading", messages.loading)
    const finish =
      <A,>(type: Type, message?: Message<A>) =>
      (value: A) => {
        const body = typeof message === "function" ? message(value) : message
        if (body == null || body === false) close(id)
        else add(type, body, { id })
      }
    Promise.resolve(typeof promise === "function" ? promise() : promise)
      .then(
        finish("success", messages.success),
        finish("error", messages.error),
      )
      .finally(messages.finally)
    return id
  },
})

const icon = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
)
const RING = "M12 2a10 10 0 100 20 10 10 0 000-20"
const ICONS: Partial<Record<Type, Content>> = {
  default: icon(
    "M10.268 21a2 2 0 0 0 3.464 0M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
  ),
  success: icon(`${RING}M9 12l2 2 4-4`),
  error: icon(
    "m15 9-6 6M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586zM9 9l6 6",
  ),
  warning: icon(
    "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01",
  ),
  info: icon(`${RING}M12 16v-4M12 8h.01`),
  loading: icon("M21 12a9 9 0 1 1-6.219-8.56"),
}
const X = icon("M18 6L6 18M6 6l12 12")

const CSS = `
[data-nt]{all:unset;--d:1;--gap:14px;--off:24px;display:block;position:fixed;z-index:2147483647;width:min(var(--w,356px),calc(100vw - var(--off) * 2));height:0;font:16px/1.5 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
&[data-y=top]{top:calc(var(--oy,var(--off)) + env(safe-area-inset-top,0px));--d:1}
&[data-y=bottom]{bottom:calc(var(--oy,var(--off)) + env(safe-area-inset-bottom,0px));--d:-1}
&[data-x=left]{left:var(--off)}
&[data-x=right]{right:var(--off)}
&[data-x=center]{left:0;right:0;margin-inline:auto}
&[data-y=top] li{top:0}
&[data-y=bottom] li{bottom:0}
&[data-x=left] li{left:0}
&[data-x=right] li{right:0}
& ol{margin:0;padding:0;list-style:none}
& :focus-visible{outline:2px solid var(--ring);outline-offset:2px}
& li{--tone:var(--primary);position:absolute;height:var(--h,auto);z-index:calc(1000 - var(--i,0));touch-action:none;overflow-wrap:anywhere;width:100%;transform:translateY(calc(var(--d) * var(--i,0) * var(--gap))) scale(calc(1 - var(--i,0) * .05));translate:var(--sx,0px);transition:transform .4s,translate .4s,opacity .4s,height .4s,box-shadow .2s;transition-delay:.03s;
&[data-type=success]{--tone:oklch(.723 .219 149.579)}
&[data-type=error]{--tone:oklch(.637 .237 25.331)}
&[data-type=warning]{--tone:oklch(.769 .188 70.08)}
&[data-type=info]{--tone:oklch(.623 .214 259.815)}
&[data-type=loading]{--tone:var(--muted-foreground)}
&[data-removed],&[data-visible=false]{opacity:0;pointer-events:none}
&[data-sw]{transition:none;cursor:grabbing;user-select:none}
&[data-out]{transition:translate .2s ease-out,opacity .2s ease-out;transition-delay:0s}
&>div{position:relative;display:flex;align-items:flex-start;gap:12px;box-sizing:border-box;padding:16px;border:1px solid var(--border);border-left:4px solid var(--tone);border-radius:var(--radius,.625rem);background:var(--popover);color:var(--popover-foreground);box-shadow:0 10px 15px -3px rgb(0 0 0/.1),0 4px 6px -4px rgb(0 0 0/.1);overflow:hidden}
&>div>span{display:flex;flex:none;color:var(--tone)}
&>div>span svg{margin-top:2px}
&[data-type=loading]>div>span>svg{animation:nt-spin 1s linear infinite}
& svg{width:20px;height:20px}
&>div>div{flex:1;min-width:0}
& strong{display:block;font-size:1rem;font-weight:500;line-height:1.25;&:not(:last-child){margin-bottom:4px}}
& small{display:block;color:var(--muted-foreground);font-size:.875rem;line-height:1.25rem;white-space:pre-line}
&>div>div>p{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}
&>div>button,&>div>div>p>button{flex:none;align-self:center;height:32px;padding:0 12px;border:0;border-radius:calc(var(--radius) - 2px);background:var(--primary);color:var(--primary-foreground);font:inherit;font-size:.875rem;font-weight:500;cursor:pointer;transition:opacity .15s;
&:hover{opacity:.85}
&[data-cancel]{background:var(--muted);color:var(--muted-foreground)}
&[data-close]{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;width:24px;height:24px;padding:0;border-radius:calc(var(--radius,.625rem) - 2px);background:none;color:inherit;opacity:.7;transition:all .15s cubic-bezier(.4,0,.2,1);
&:hover{opacity:1;background:var(--accent);color:var(--accent-foreground);scale:1.02}
&:active{scale:.98}
&:focus-visible{outline:0;box-shadow:0 0 0 3px color-mix(in oklab,var(--ring) 50%,transparent)}
& svg{width:16px;height:16px}}}
&>div>i{position:absolute;inset:auto 0 0;height:2px;background:color-mix(in oklab,var(--muted) 50%,transparent);
&::after{content:"";display:block;width:100%;height:100%;background:var(--tone);animation:nt-bar var(--dur) linear forwards}}}
&:not([data-exp]) li:not([data-front]){height:var(--fh,auto)}
&:not([data-exp]) li[data-removed]:not([data-front]){translate:0 40%;transition:transform .5s,translate .5s,opacity .2s}
&[data-exp] li{transform:translateY(calc(var(--d) * var(--o,0px)));
&::after{content:"";position:absolute;inset:calc(-1px - var(--gap)) 0;z-index:-1}}
&[data-rich] li:not([data-type=default],[data-type=loading])>div{background:color-mix(in oklab,var(--tone) 12%,var(--popover));color:color-mix(in oklab,var(--tone) 80%,var(--popover-foreground));
& small{color:inherit;opacity:.8}}
&[data-paused] li>div>i::after{animation-play-state:paused}}
@media(max-width:600px){[data-nt]{--off:16px}[data-nt] li{left:0;right:0}}
@starting-style{[data-nt] li{opacity:0}}
@media(prefers-reduced-motion:no-preference){@starting-style{[data-nt] li{translate:0 calc(var(--d) * -100%)}}[data-nt] li[data-removed]{translate:var(--sx,0px) var(--sy,calc(var(--d) * -100%))}}
@media(prefers-reduced-motion:reduce){[data-nt] li{transition:opacity .2s}}
@keyframes nt-bar{to{width:0}}
@keyframes nt-spin{to{rotate:1turn}}
`

function Item({
  t,
  index,
  limit,
  paused,
  duration,
  closeButton,
  closeLabel,
}: {
  t: ToastData
  index?: number
  limit: number
  paused: boolean
  duration: number
  closeButton?: boolean
  closeLabel: string
}) {
  // A toast that is leaving keeps the place it had
  const last = React.useRef(index ?? 0)
  if (index != null) last.current = index
  const i = last.current
  const life = t.type === "loading" ? Infinity : (t.duration ?? duration)
  const left = React.useRef(life)

  React.useEffect(() => {
    left.current = life
  }, [t.version, life])

  React.useEffect(() => {
    if (paused || t.dismissed || left.current === Infinity) return
    const start = Date.now()
    const timer = setTimeout(() => close(t.id, true), left.current)
    return () => {
      clearTimeout(timer)
      left.current -= Date.now() - start
    }
  }, [paused, t.dismissed, t.id, t.version, life])

  // Leaves the DOM 200 ms after dismissing like sonner, plus its 30 ms of render lag (same in transition-delay)
  React.useEffect(() => {
    if (!t.dismissed) return
    const timer = setTimeout(() => remove(t.id), 230)
    return () => clearTimeout(timer)
  }, [t.dismissed, t.id])

  const picture = t.icon === undefined ? ICONS[t.type] : t.icon
  return (
    <li
      tabIndex={0}
      role={t.type === "error" ? "alert" : undefined}
      className={t.className}
      data-id={t.id}
      data-type={t.type}
      data-front={i === 0 || undefined}
      data-visible={i < limit}
      data-removed={t.dismissed || undefined}
      style={
        {
          "--i": Math.min(i, limit),
          "--dur": `${life}ms`,
        } as React.CSSProperties
      }
    >
      <div>
        {picture && <span>{picture}</span>}
        <div>
          <strong>{t.title}</strong>
          {t.description && <small>{t.description}</small>}
          {(t.cancel || t.action) && (
            <p>
              {t.action && (
                <button
                  type="button"
                  onClick={(e) => {
                    t.action?.onClick?.(e)
                    if (!e.defaultPrevented) close(t.id)
                  }}
                >
                  {t.action.label}
                </button>
              )}
              {t.cancel && (
                <button
                  type="button"
                  data-cancel
                  onClick={(e) => {
                    t.cancel?.onClick?.(e)
                    close(t.id)
                  }}
                >
                  {t.cancel.label}
                </button>
              )}
            </p>
          )}
        </div>
        {(t.closeButton ?? closeButton) && (
          <button
            type="button"
            data-close
            aria-label={closeLabel}
            onClick={() => close(t.id)}
          >
            {X}
          </button>
        )}
        {t.progress !== false && life < Infinity && (
          <i key={t.version} aria-hidden="true" />
        )}
      </div>
    </li>
  )
}

interface Drag {
  li: HTMLElement
  x: number
  time: number
  sign: number
  value: number
}

export function Toaster({
  position = "top-right",
  visibleToasts = 3,
  expand,
  richColors,
  closeButton = true,
  gap = 14,
  offset,
  dir,
  duration = 4000,
  hotkey = ["altKey", "KeyT"],
  label = "Notifications",
  closeLabel = "Close",
  className,
  style,
}: ToasterProps) {
  const list = React.useSyncExternalStore(
    (notify) => {
      subs.add(notify)
      return () => {
        subs.delete(notify)
      }
    },
    () => items,
    () => none,
  )
  const root = React.useRef<HTMLElement>(null)
  const observer = React.useRef<ResizeObserver>(null)
  const drag = React.useRef<Drag>(null)
  const promoted = React.useRef<Id>(null)
  // Bits: 1 pointer is over, 2 focus is inside, 4 tab is hidden, 8 swiping
  const [hold, setHold] = React.useState(0)
  const bit = (b: number, on: boolean) => setHold((h) => (on ? h | b : h & ~b))
  const [y, x] = position.split("-")
  const expanded = expand || (hold & 3) > 0

  // Heights are measured here, CSS animates everything else
  const layout = () => {
    const ol = root.current?.firstElementChild
    if (!root.current || !ol) return
    let sum = 0
    let first = true
    for (const li of ol.children as HTMLCollectionOf<HTMLElement>) {
      if (li.hasAttribute("data-removed")) continue
      const h = (li.firstElementChild as HTMLElement).offsetHeight
      li.style.setProperty("--h", `${h}px`)
      li.style.setProperty("--o", `${sum}px`)
      if (first) root.current.style.setProperty("--fh", `${h}px`)
      first = false
      sum += h + gap
    }
  }

  React.useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    layout()
    observer.current ??= new ResizeObserver(layout)
    for (const li of el.firstElementChild?.children ?? [])
      if (li.firstElementChild) observer.current.observe(li.firstElementChild)
    // Top layer: above everything, a modal dialog that opened later too
    const pop = (method: "showPopover" | "hidePopover") => {
      try {
        el[method]()
      } catch {}
    }
    const newest = list[0]?.id ?? null
    if (!list.length) pop("hidePopover")
    else {
      try {
        if (
          document.querySelector("dialog:modal") &&
          promoted.current !== newest
        )
          pop("hidePopover")
      } catch {}
      pop("showPopover")
    }
    promoted.current = newest
    // A removed element sends no blur or mouseleave
    if (!list.length) setHold((h) => h & 4)
    else if (!el.contains(document.activeElement)) setHold((h) => h & ~2)
  })

  React.useEffect(() => () => observer.current?.disconnect(), [])

  React.useEffect(() => {
    const hide = () => setHold((h) => (document.hidden ? h | 4 : h & ~4))
    const key = (e: KeyboardEvent) => {
      if (
        hotkey.length &&
        hotkey.every(
          (k) => (e as unknown as Record<string, unknown>)[k] || e.code === k,
        )
      ) {
        root.current?.focus()
      }
    }
    hide()
    document.addEventListener("visibilitychange", hide)
    document.addEventListener("keydown", key)
    return () => {
      document.removeEventListener("visibilitychange", hide)
      document.removeEventListener("keydown", key)
    }
  }, [hotkey.join()])

  const down = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    const li = target.closest("li")
    if (!li || e.button || target.closest("button,a,input,textarea,select"))
      return
    li.setPointerCapture(e.pointerId)
    li.setAttribute("data-sw", "")
    drag.current = { li, x: e.clientX, time: Date.now(), sign: 1, value: 0 }
    bit(8, true)
  }

  const move = (e: React.PointerEvent) => {
    const g = drag.current
    if (!g) return
    // Toward the screen edge the toast follows the pointer, back it resists
    let v = e.clientX - g.x
    g.sign = x === "center" ? Math.sign(v) || 1 : x === "right" ? 1 : -1
    if (v * g.sign < 0) v /= 1.5 + Math.abs(v) / 20
    g.value = v * g.sign
    g.li.style.setProperty("--sx", `${v}px`)
  }

  const up = (e: React.PointerEvent) => {
    const g = drag.current
    if (!g) return
    drag.current = null
    bit(8, false)
    g.li.removeAttribute("data-sw")
    const fast = g.value / (Date.now() - g.time) > 0.11
    if (e.type === "pointerup" && (g.value >= 45 || (g.value > 0 && fast))) {
      g.li.setAttribute("data-out", "")
      g.li.style.setProperty(
        "--sx",
        `${g.value * g.sign + g.sign * g.li.offsetWidth}px`,
      )
      g.li.style.setProperty("--sy", "0px")
      close(g.li.dataset.id)
    } else g.li.style.removeProperty("--sx")
  }

  let shown = 0
  const css = {
    "--gap": `${gap}px`,
    ...(offset !== undefined && {
      "--off": typeof offset === "number" ? `${offset}px` : offset,
    }),
    ...style,
  } as React.CSSProperties

  return (
    <>
      <style href="goose-native-toast" precedence="default">
        {CSS}
      </style>
      <section
        ref={root}
        popover="manual"
        aria-label={label}
        aria-live="polite"
        tabIndex={-1}
        dir={dir}
        className={className}
        style={css}
        data-nt=""
        data-x={x}
        data-y={y}
        data-exp={expanded || undefined}
        data-paused={hold > 0 || undefined}
        data-rich={richColors || undefined}
        onPointerEnter={() => bit(1, true)}
        onPointerLeave={() => bit(1, false)}
        onFocus={() => bit(2, true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null))
            bit(2, false)
        }}
        onKeyDown={(e) => {
          if (e.key !== "Escape") return
          const target = e.target as HTMLElement
          const li = target.closest("li")
          if (li) close(li.dataset.id)
          target.blur()
        }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <ol>
          {list.map((t) => (
            <Item
              key={t.id}
              t={t}
              index={t.dismissed ? undefined : shown++}
              limit={visibleToasts}
              paused={hold > 0}
              duration={duration}
              closeButton={closeButton}
              closeLabel={closeLabel}
            />
          ))}
        </ol>
      </section>
    </>
  )
}
