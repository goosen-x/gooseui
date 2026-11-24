"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// The listbox is a manual popover in the top layer, tied to the control with
// CSS anchor positioning. Without anchor support it stays a plain absolutely
// positioned box under the control, shown by data-open: no positioning script.
const css = `
[data-slot="combobox-content"] { display: none; position: absolute; inset: 100% auto auto 0; width: 100%; z-index: 50; margin: .25rem 0 0; max-height: min(18rem, 50dvh); }
@supports not (anchor-name: --a) {
  [data-slot="combobox"][data-open] > [data-slot="combobox-content"] { display: block; }
}
@supports (anchor-name: --a) {
  [data-slot="combobox-content"] {
    position: fixed; inset: auto; margin: .25rem 0;
    position-anchor: var(--goose-anchor);
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-block;
    width: anchor-size(width);
    opacity: 0; translate: 0 -.25rem;
    transition: opacity .15s, translate .15s, display .15s allow-discrete, overlay .15s allow-discrete;
  }
  [data-slot="combobox-content"]:popover-open { display: block; opacity: 1; translate: 0 0; }
  @starting-style { [data-slot="combobox-content"]:popover-open { opacity: 0; translate: 0 -.25rem; } }
}
@media (prefers-reduced-motion: reduce) { [data-slot="combobox-content"] { transition: none; translate: none; } }
`

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

export type ComboboxOptionData = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type ComboboxOptionProps = {
  value: string
  /** Text used for filtering and the input. Defaults to string children, then `value` */
  label?: string
  description?: string
  disabled?: boolean
  children?: React.ReactNode
}

/** Declarative option. Read by `Combobox`, renders nothing by itself */
function ComboboxOption(_props: ComboboxOptionProps): React.ReactNode {
  return null
}

type BaseProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  /** Options as data. Ignored when `ComboboxOption` children are given */
  options?: ComboboxOptionData[]
  children?: React.ReactNode
  /** Form field name. Rendered as hidden input(s) */
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  /** Accept text that matches no option (Enter or the "Add" row) */
  allowCustomValue?: boolean
  /** Text typed in the input (controlled) */
  inputValue?: string
  onInputValueChange?: (text: string) => void
  /** Built-in filter. `false` shows `options` as they are (server-side search) */
  filter?: boolean | ((option: ComboboxOptionData, query: string) => boolean)
  /** Shows a loading row instead of the empty state */
  loading?: boolean
  loadingMessage?: React.ReactNode
  emptyMessage?: React.ReactNode
  /** Content of the "Add" row for a custom value */
  addMessage?: (query: string) => React.ReactNode
  /** Result count announced to screen readers */
  resultsMessage?: (count: number) => string
  /** Accessible name of the chip remove button */
  removeLabel?: (label: string) => string
  /** Props for the inner `<input>` (id, aria-label, autoFocus...) */
  inputProps?: Omit<React.ComponentProps<"input">, "value" | "defaultValue">
}

export type ComboboxProps = BaseProps &
  (
    | {
        multiple?: false
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
      }
    | {
        /** Pick several values, shown as removable chips */
        multiple: true
        value?: string[]
        defaultValue?: string[]
        onValueChange?: (value: string[]) => void
      }
  )

const words = (query: string) =>
  query.toLowerCase().split(/\s+/).filter(Boolean)

const defaultFilter = (option: ComboboxOptionData, query: string) => {
  const label = option.label.toLowerCase()
  return words(query).every((word) => label.includes(word))
}

/** Wraps the matched words in <mark> */
function highlight(text: string, query: string) {
  const list = words(query).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  if (list.length === 0) return text
  return text.split(new RegExp(`(${list.join("|")})`, "gi")).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="bg-primary/20 font-medium text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

const defaultAdd = (query: string) => (
  <>
    Add “<span className="font-medium">{query}</span>”
  </>
)
const defaultResults = (count: number) =>
  `${count} result${count === 1 ? "" : "s"}`
const defaultRemove = (label: string) => `Remove ${label}`

type Option = ComboboxOptionData & { node?: React.ReactNode }

function readChildren(children: React.ReactNode) {
  const result: Option[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<ComboboxOptionProps>(child)) return
    if (child.type !== ComboboxOption) return
    const p = child.props
    result.push({
      value: p.value,
      label: p.label ?? (typeof p.children === "string" ? p.children : p.value),
      description: p.description,
      disabled: p.disabled,
      node: typeof p.children === "string" ? undefined : p.children,
    })
  })
  return result
}

const CUSTOM = "\u0000custom"

const toArray = (v: string | string[] | undefined) =>
  v === undefined ? [] : Array.isArray(v) ? v : v === "" ? [] : [v]

function Combobox(props: ComboboxProps) {
  const {
    options: optionsProp,
    children,
    name,
    placeholder,
    disabled,
    required,
    allowCustomValue = false,
    inputValue: inputValueProp,
    onInputValueChange,
    filter = true,
    loading = false,
    loadingMessage = "Loading…",
    emptyMessage = "No results",
    addMessage = defaultAdd,
    resultsMessage = defaultResults,
    removeLabel = defaultRemove,
    inputProps,
    multiple = false,
    value: valueProp,
    defaultValue,
    onValueChange,
    className,
    style,
    ...rest
  } = props

  const uid = React.useId().replace(/[^\w-]/g, "")
  const listId = `combobox-${uid}-list`
  const anchor = `--combobox-${uid}`

  const input = React.useRef<HTMLInputElement>(null)
  const popover = React.useRef<HTMLDivElement>(null)
  const list = React.useRef<HTMLDivElement>(null)

  const childOptions = React.useMemo(() => readChildren(children), [children])
  const options: Option[] =
    childOptions.length > 0 ? childOptions : (optionsProp ?? [])

  const [innerValue, setInnerValue] = React.useState<string[]>(() =>
    toArray(defaultValue),
  )
  const selected = valueProp !== undefined ? toArray(valueProp) : innerValue

  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v
  const singleLabel =
    !multiple && selected[0] !== undefined ? labelOf(selected[0]) : ""

  const [innerText, setInnerText] = React.useState(singleLabel)
  const text = inputValueProp ?? innerText
  const setText = (next: string) => {
    setInnerText(next)
    onInputValueChange?.(next)
  }
  // Filter only by what the user typed, not by the label of the current value
  const [dirty, setDirty] = React.useState(false)
  const query = multiple || dirty ? text.trim() : ""

  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(-1)

  const visible =
    !query || filter === false
      ? options
      : options.filter((o) =>
          (filter === true ? defaultFilter : filter)(o, query),
        )

  const showCustom =
    allowCustomValue &&
    query !== "" &&
    !loading &&
    !options.some((o) => o.label.toLowerCase() === query.toLowerCase()) &&
    !selected.includes(query)
  const rows: { value: string; disabled?: boolean }[] = showCustom
    ? [...visible, { value: CUSTOM }]
    : visible

  const commit = (next: string[]) => {
    if (valueProp === undefined) setInnerValue(next)
    if (multiple) (onValueChange as ((v: string[]) => void) | undefined)?.(next)
    else (onValueChange as ((v: string) => void) | undefined)?.(next[0] ?? "")
  }

  // Keep the input text in sync with an outside value change (single mode)
  const lastLabel = React.useRef(singleLabel)
  React.useEffect(() => {
    if (multiple || lastLabel.current === singleLabel) return
    lastLabel.current = singleLabel
    if (!dirty) setInnerText(singleLabel)
  }, [multiple, singleLabel, dirty])

  const choose = (raw: string) => {
    const v = raw === CUSTOM ? query : raw
    if (multiple) {
      commit(
        selected.includes(v)
          ? selected.filter((x) => x !== v)
          : [...selected, v],
      )
      if (query) {
        setText("")
        setActive(options.findIndex((o) => o.value === v))
      }
    } else {
      commit([v])
      lastLabel.current = labelOf(v)
      setText(labelOf(v))
      setDirty(false)
      setOpen(false)
    }
  }

  const openList = () => {
    if (disabled || open) return -1
    setOpen(true)
    const index = rows.findIndex((r) => selected.includes(r.value))
    setActive(index)
    return index
  }

  const closeList = () => {
    setOpen(false)
    setActive(-1)
  }

  const step = (from: number, dir: 1 | -1) => {
    for (let n = 1; n <= rows.length; n++) {
      const i = (from + dir * n + rows.length * 2) % rows.length
      if (!rows[i].disabled) return i
    }
    return -1
  }

  // The top layer is used only together with anchor positioning
  React.useEffect(() => {
    const node = popover.current
    if (typeof node?.togglePopover !== "function") return
    if (!CSS.supports("anchor-name: --a")) return
    node.togglePopover(open)
  }, [open])

  // Typing moves the active option to the first match
  React.useEffect(() => {
    if (query) setActive(step(-1, 1))
  }, [query])

  React.useEffect(() => {
    if (!open || active < 0) return
    list.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [open, active])

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(event)
    if (event.defaultPrevented) return
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        if (!open) {
          if (openList() < 0 && !event.altKey) setActive(step(-1, 1))
        } else setActive((i) => step(i, 1))
        break
      case "ArrowUp":
        event.preventDefault()
        if (!open) {
          if (openList() < 0) setActive(step(rows.length, -1))
        } else setActive((i) => step(i < 0 ? 0 : i, -1))
        break
      case "Home":
      case "End":
        if (!open || rows.length === 0) return
        event.preventDefault()
        setActive(event.key === "Home" ? step(-1, 1) : step(rows.length, -1))
        break
      case "Enter":
        if (!open) return
        event.preventDefault()
        if (active >= 0 && rows[active] && !rows[active].disabled)
          choose(rows[active].value)
        else if (allowCustomValue && query) choose(CUSTOM)
        break
      case "Escape":
        if (open) {
          event.preventDefault()
          closeList()
        } else if (!multiple && text) {
          event.preventDefault()
          setText("")
          setDirty(true)
          commit([])
        }
        break
      case "Backspace":
        if (multiple && text === "" && selected.length > 0)
          commit(selected.slice(0, -1))
        break
      case "Tab":
        closeList()
        break
    }
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    inputProps?.onBlur?.(event)
    closeList()
    if (multiple) {
      setText("")
      return
    }
    if (!dirty) return
    setDirty(false)
    const trimmed = text.trim()
    const match = options.find(
      (o) => o.label.toLowerCase() === trimmed.toLowerCase() && !o.disabled,
    )
    if (trimmed === "") {
      if (selected.length) commit([])
    } else if (match) {
      if (selected[0] !== match.value) commit([match.value])
      setText(match.label)
    } else if (allowCustomValue) {
      if (selected[0] !== trimmed) commit([trimmed])
    } else setText(singleLabel)
  }

  const activeId =
    open && active >= 0 && rows[active] ? `${listId}-${active}` : undefined

  return (
    <div
      {...rest}
      data-slot="combobox"
      data-open={open ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      onMouseDown={(event) => {
        rest.onMouseDown?.(event)
        if (event.target === event.currentTarget) {
          event.preventDefault()
          input.current?.focus()
          openList()
        }
      }}
      className={cn(
        "relative flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-transparent py-1 pr-8 pl-3 text-base shadow-xs transition-[color,box-shadow] md:text-sm dark:bg-input/30",
        "focus-within:border-ring focus-within:ring-[5px] focus-within:ring-ring/30 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "has-[input[aria-invalid=true]]:border-destructive",
        multiple && selected.length > 0 && "pl-1.5",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      style={{ ...style, anchorName: anchor } as React.CSSProperties}
    >
      <style href="gooseui-combobox" precedence="default">
        {css}
      </style>
      {multiple &&
        selected.map((v) => (
          <span
            key={v}
            data-slot="combobox-chip"
            className="inline-flex h-6 max-w-full items-center gap-1 rounded-md bg-secondary pr-1.5 pl-2 text-xs font-medium text-secondary-foreground"
          >
            <span className="truncate">{labelOf(v)}</span>
            {!disabled && (
              <button
                type="button"
                tabIndex={-1}
                aria-label={removeLabel(labelOf(v))}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  commit(selected.filter((x) => x !== v))
                  input.current?.focus()
                }}
                className="-mr-0.5 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full opacity-70 hover:bg-current/15 hover:opacity-100"
              >
                <svg {...icon} className="size-3">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}
      <input
        type="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        {...inputProps}
        ref={input}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        required={required && selected.length === 0}
        data-slot="combobox-input"
        disabled={disabled}
        placeholder={multiple && selected.length > 0 ? undefined : placeholder}
        value={text}
        onChange={(event) => {
          inputProps?.onChange?.(event)
          setText(event.target.value)
          setDirty(true)
          setOpen(true)
        }}
        onClick={(event) => {
          inputProps?.onClick?.(event)
          if (open) closeList()
          else openList()
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn(
          "h-7 min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
          inputProps?.className,
        )}
      />
      <svg
        {...icon}
        className={cn(
          "pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-50 transition-transform motion-reduce:transition-none",
          open && "rotate-180",
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
      {name &&
        (multiple ? (
          selected.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))
        ) : (
          <input type="hidden" name={name} value={selected[0] ?? ""} />
        ))}
      <div
        ref={popover}
        popover="manual"
        onMouseDown={(event) => event.preventDefault()}
        data-slot="combobox-content"
        className="overflow-y-auto overscroll-contain rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        style={{ "--goose-anchor": anchor } as React.CSSProperties}
      >
        <div
          ref={list}
          id={listId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          aria-label={inputProps?.["aria-label"]}
          aria-labelledby={inputProps?.["aria-labelledby"]}
        >
          {!loading &&
            rows.map((row, index) => {
              const option = row.value === CUSTOM ? null : (row as Option)
              const isSelected = option
                ? selected.includes(option.value)
                : false
              return (
                <div
                  key={option ? option.value : CUSTOM}
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={row.disabled || undefined}
                  data-active={index === active ? "" : undefined}
                  data-slot="combobox-option"
                  onMouseMove={() => {
                    if (!row.disabled && active !== index) setActive(index)
                  }}
                  onClick={() => !row.disabled && choose(row.value)}
                  className={cn(
                    "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none",
                    "data-[active]:bg-accent data-[active]:text-accent-foreground",
                    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
                  )}
                >
                  {option ? (
                    <>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate">
                          {option.node ?? highlight(option.label, query)}
                        </span>
                        {option.description && (
                          <span className="truncate text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </span>
                      <svg
                        {...icon}
                        className={cn(
                          "size-4 shrink-0 text-primary",
                          !isSelected && "invisible",
                        )}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg {...icon} className="size-4 shrink-0 opacity-60">
                        <path d="M5 12h14M12 5v14" />
                      </svg>
                      <span className="truncate">{addMessage(query)}</span>
                    </>
                  )}
                </div>
              )
            })}
        </div>
        <div
          role="status"
          aria-live="polite"
          data-slot="combobox-status"
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground",
            !loading && rows.length > 0 && "sr-only",
          )}
        >
          {loading ? (
            <>
              <svg
                {...icon}
                className="size-4 animate-spin motion-reduce:animate-none"
              >
                <path d="M21 12a9 9 0 1 1-6.22-8.56" />
              </svg>
              {loadingMessage}
            </>
          ) : rows.length === 0 ? (
            emptyMessage
          ) : open ? (
            resultsMessage(visible.length)
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { Combobox, ComboboxOption }
