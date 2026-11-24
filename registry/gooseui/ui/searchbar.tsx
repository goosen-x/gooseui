"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"

export type SearchbarLabels = {
  loading: string
  empty: string
  error: string
}

export type SearchbarItemState = {
  active: boolean
  query: string
}

export type SearchbarProps<T> = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "onSelect" | "children"
> & {
  /** Loads suggestions. Abort the request when `signal` fires. */
  fetcher: (query: string, signal: AbortSignal) => Promise<T[]>
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSelect?: (item: T) => void
  getItemLabel?: (item: T) => string
  getItemKey?: (item: T, index: number) => string
  renderItem?: (item: T, state: SearchbarItemState) => React.ReactNode
  /** Delay before the request, in ms */
  debounce?: number
  /** Minimum trimmed query length that triggers a request */
  minLength?: number
  labels?: Partial<SearchbarLabels>
  /** Classes for the wrapper */
  className?: string
  inputClassName?: string
  listClassName?: string
}

const iconClass =
  "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground"

export function Searchbar<T>({
  fetcher,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSelect,
  getItemLabel = (item) => String(item),
  getItemKey,
  renderItem,
  debounce = 250,
  minLength = 2,
  labels: labelsProp,
  className,
  inputClassName,
  listClassName,
  id: idProp,
  onKeyDown,
  onFocus,
  onBlur,
  ...inputProps
}: SearchbarProps<T>) {
  const labels = {
    loading: "Searching…",
    empty: "Nothing found",
    error: "Could not load suggestions",
    ...labelsProp,
  }
  const autoId = React.useId()
  const id = idProp ?? autoId
  const listId = `${id}-listbox`

  const [inner, setInner] = React.useState(defaultValue)
  const query = valueProp ?? inner
  const [items, setItems] = React.useState<T[]>([])
  const [status, setStatus] = React.useState<Status>("idle")
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(-1)
  const [present, setPresent] = React.useState(false)
  const [resultVersion, setResultVersion] = React.useState(0)
  const contentRef = React.useRef<HTMLDivElement>(null)
  // Text of a <label for={id}>, so the listbox is named like the input
  const [labelText, setLabelText] = React.useState<string>()
  const listRef = React.useRef<HTMLUListElement>(null)
  const fetcherRef = React.useRef(fetcher)
  fetcherRef.current = fetcher
  // Set after a pick: the next query change came from us, not from typing
  const lockedRef = React.useRef(false)

  React.useEffect(() => {
    const input = document.getElementById(id)
    if (!(input instanceof HTMLInputElement)) return
    const text = Array.from(input.labels ?? [], (label) =>
      label.textContent?.trim(),
    )
      .filter(Boolean)
      .join(" ")
    setLabelText(text || undefined)
  }, [id])

  React.useEffect(() => {
    if (lockedRef.current) return
    const trimmed = query.trim()
    if (trimmed.length < minLength) {
      setItems([])
      setStatus("idle")
      return
    }
    const controller = new AbortController()
    const settle = (result: T[], next: Status) => {
      if (controller.signal.aborted) return
      setItems(result)
      if (next === "success") setResultVersion((version) => version + 1)
      setActive(result.length > 0 ? 0 : -1)
      setStatus(next)
    }
    const timer = setTimeout(() => {
      setStatus("loading")
      fetcherRef
        .current(trimmed, controller.signal)
        .then((result) => settle(result, "success"))
        .catch(() => settle([], "error"))
    }, debounce)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, minLength, debounce])

  const expanded = open && status !== "idle"
  const showList = expanded && status !== "error" && items.length > 0

  React.useEffect(() => {
    if (expanded) setPresent(true)
  }, [expanded])

  React.useEffect(() => {
    const content = contentRef.current
    if (!content || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(([entry]) => {
      content.parentElement?.style.setProperty(
        "--gooseui-searchbar-height",
        `${(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height) / (Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)}rem`,
      )
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!showList || active < 0) return
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" })
  }, [active, showList])

  const setQuery = (next: string) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  const pick = (item: T) => {
    lockedRef.current = true
    setQuery(getItemLabel(item))
    setOpen(false)
    setStatus("idle")
    setItems([])
    setActive(-1)
    onSelect?.(item)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    const count = items.length
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (status === "idle") return
      event.preventDefault()
      if (!open) setOpen(true)
      else if (count > 0) {
        const step = event.key === "ArrowDown" ? 1 : -1
        setActive((current) => (current + step + count) % count)
      }
    } else if (event.key === "Enter" && showList && items[active]) {
      event.preventDefault()
      pick(items[active])
    } else if (event.key === "Escape" && expanded) {
      event.preventDefault()
      setOpen(false)
    }
  }

  const message = !expanded
    ? null
    : status === "error"
      ? labels.error
      : status === "loading" && items.length === 0
        ? labels.loading
        : status === "success" && items.length === 0
          ? labels.empty
          : null

  const snapshot = React.useRef({ items, message, status, resultVersion })
  if (expanded) snapshot.current = { items, message, status, resultVersion }
  const display = expanded
    ? { items, message, status, resultVersion }
    : snapshot.current
  const displayList = display.status !== "error" && display.items.length > 0

  return (
    <div className={cn("relative w-full", className)}>
      <style href="gooseui-searchbar" precedence="default">{`
        @keyframes gooseui-searchbar-open { from { opacity: 0; transform: translateY(-0.25rem) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes gooseui-searchbar-close { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(-0.25rem) scale(0.98); } }
        @keyframes gooseui-searchbar-item { from { opacity: 0; transform: translateY(-0.125rem); } to { opacity: 1; transform: none; } }
        @keyframes gooseui-searchbar-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gooseui-searchbar-spin { to { transform: rotate(360deg); } }
        .gooseui-searchbar-popup { transform-origin: top; }
        .gooseui-searchbar-popup[data-state="open"] { animation: gooseui-searchbar-open 160ms cubic-bezier(0.2, 0, 0, 1) both; }
        .gooseui-searchbar-popup[data-state="closed"] { animation: gooseui-searchbar-close 120ms ease-in both; pointer-events: none; }
        .gooseui-searchbar-icon { transition: opacity 150ms; }
        .gooseui-searchbar-spinner { animation: gooseui-searchbar-spin 700ms linear infinite; }
        .gooseui-searchbar-option { transition: background-color 120ms; }
        .gooseui-searchbar-option[data-cascade="true"] { animation: gooseui-searchbar-item 140ms both; animation-delay: calc(var(--gooseui-searchbar-index) * 25ms); }
        .gooseui-searchbar-message { animation: gooseui-searchbar-fade 150ms both; }
        .gooseui-searchbar-message[data-error="true"] { animation: gooseui-searchbar-item 150ms both; }
        @supports (interpolate-size: allow-keywords) {
          .gooseui-searchbar-popup { interpolate-size: allow-keywords; height: var(--gooseui-searchbar-height, auto); transition: height 160ms; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gooseui-searchbar-popup, .gooseui-searchbar-option, .gooseui-searchbar-icon, .gooseui-searchbar-spinner, .gooseui-searchbar-message { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; animation-delay: 0ms !important; transition: none !important; }
        }
      `}</style>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn(
          iconClass,
          "left-3 gooseui-searchbar-icon",
          status === "loading" && "opacity-0",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        {...inputProps}
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={
          showList && active >= 0 ? `${id}-option-${active}` : undefined
        }
        aria-busy={status === "loading"}
        value={query}
        onChange={(event) => {
          lockedRef.current = false
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={(event) => {
          onFocus?.(event)
          if (!lockedRef.current) setOpen(true)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setOpen(false)
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-10 w-full min-w-0 rounded-md border border-input bg-background pr-9 pl-9 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          iconClass,
          "left-3 gooseui-searchbar-icon",
          status !== "loading" && "opacity-0",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 gooseui-searchbar-spinner"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M21 12a9 9 0 1 1-6.22-8.56" />
        </svg>
      </span>

      <div
        className={cn(
          "gooseui-searchbar-popup absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          !(expanded || present) && "hidden",
          listClassName,
        )}
        data-state={expanded ? "open" : "closed"}
        aria-hidden={!expanded}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && !expanded)
            setPresent(false)
        }}
      >
        <div ref={contentRef}>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={
              inputProps["aria-label"] ??
              (inputProps["aria-labelledby"] ? undefined : labelText)
            }
            aria-labelledby={
              inputProps["aria-label"]
                ? undefined
                : inputProps["aria-labelledby"]
            }
            className={cn(
              "max-h-64 overflow-y-auto p-1",
              !displayList && "hidden",
            )}
          >
            {displayList &&
              display.items.map((item, index) => (
                <li
                  key={`${display.resultVersion}-${getItemKey?.(item, index) ?? `${getItemLabel(item)}-${index}`}`}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={index === active}
                  // mousedown keeps focus in the input until the pick is done
                  onMouseDown={(event) => {
                    event.preventDefault()
                    if (event.button === 0) pick(item)
                  }}
                  onMouseMove={() => setActive(index)}
                  data-cascade={index < 6}
                  style={
                    {
                      "--gooseui-searchbar-index": index,
                    } as React.CSSProperties
                  }
                  className="gooseui-searchbar-option cursor-pointer rounded-sm px-2 py-1.5 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  {renderItem
                    ? renderItem(item, { active: index === active, query })
                    : getItemLabel(item)}
                </li>
              ))}
          </ul>
          {display.message && (
            // Announced by the live region below, which never gets hidden
            <div
              key={display.status}
              aria-hidden="true"
              data-error={display.status === "error"}
              className={cn(
                "gooseui-searchbar-message px-3 py-2 text-sm",
                display.status === "error"
                  ? "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {display.message}
            </div>
          )}
        </div>
      </div>
      <div role="status" aria-live="polite" className="sr-only">
        {message}
      </div>
    </div>
  )
}
