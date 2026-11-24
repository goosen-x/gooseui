"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  PHONE_COUNTRIES,
  type PhoneCountry,
} from "@/registry/gooseui/lib/phone-countries"
import { Input } from "@/registry/gooseui/ui/input"

export { PHONE_COUNTRIES, type PhoneCountry }

export type PhoneValueMeta = {
  isValid: boolean
  country: PhoneCountry
}

export type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "size"
> & {
  /** Controlled value in E.164, e.g. "+14155550123" */
  value?: string
  /** Initial value in E.164 */
  defaultValue?: string
  /** Fires with the E.164 value ("" when empty) and validity */
  onValueChange?: (value: string, meta: PhoneValueMeta) => void
  /** ISO code of the country picked on mount */
  defaultCountry?: string
  onCountryChange?: (country: PhoneCountry) => void
  /** Countries to offer. All countries of the world by default */
  countries?: PhoneCountry[]
  /** ISO codes shown on top of the list as a separate group. Default RU, KZ, BY, UZ */
  preferredCountries?: string[]
  /** Accessible label of the country button. Shorthand for `labels.country` */
  countryLabel?: string
  /** Texts of the country picker, English by default */
  labels?: Partial<PhoneInputLabels>
  /** BCP 47 tag, e.g. "ru". Country names are translated with Intl.DisplayNames */
  locale?: string
  /** Classes for the inner text input */
  inputClassName?: string
  /** External error. Replaces the built-in one and paints the field red */
  error?: React.ReactNode
  /** Built-in check of the number. Pass `false` to turn it off. Default `true` */
  validate?: boolean
}

export type PhoneInputLabels = {
  /** Accessible name of the country button */
  country: string
  /** Placeholder and accessible name of the search field */
  search: string
  /** Shown when the search finds nothing */
  empty: string
  /** Error under the field when the number is not complete */
  incomplete: string
  /** Error under the field when `required` and the field is empty */
  required: string
}

const DEFAULT_LABELS: PhoneInputLabels = {
  country: "Country",
  search: "Search country",
  empty: "No country found",
  incomplete: "Enter the full phone number",
  required: "Enter a phone number",
}

const onlyDigits = (s: string) => s.replace(/\D/g, "")
const capacity = (c: PhoneCountry) => (c.mask.match(/#/g) ?? []).length
// E.164 allows 15 digits in total
const maxNational = (c: PhoneCountry) =>
  Math.min(c.maxLength ?? capacity(c), 15 - c.dialCode.length)
const minNational = (c: PhoneCountry) => c.minLength ?? capacity(c)

const isComplete = (c: PhoneCountry, national: string) =>
  national.length >= minNational(c) && national.length <= maxNational(c)

const DEFAULT_PREFERRED = ["RU", "KZ", "BY", "UZ"]

const flagOf = (c: PhoneCountry) =>
  c.flag ??
  String.fromCodePoint(
    ...[...c.code.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65),
  )

function formatNational(digits: string, mask: string) {
  let out = ""
  let i = 0
  for (const ch of mask) {
    if (i >= digits.length) break
    if (ch === "#") out += digits[i++]
    else out += ch
  }
  // Longer numbers than the mask: the rest goes as is
  return i < digits.length ? out + digits.slice(i) : out
}

function caretAfterDigits(formatted: string, n: number) {
  if (n <= 0) return 0
  let count = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++count === n) return i + 1
  }
  return formatted.length
}

function resolveCountry(
  digits: string,
  countries: PhoneCountry[],
  current?: PhoneCountry,
) {
  const matches = countries.filter((c) => digits.startsWith(c.dialCode))
  if (matches.length === 0) return undefined
  const longest = Math.max(...matches.map((c) => c.dialCode.length))
  const group = matches.filter((c) => c.dialCode.length === longest)
  const national = digits.slice(longest)
  const byPrefix = group.find((c) =>
    c.prefixes?.some((p) => national.startsWith(p)),
  )
  if (byPrefix) return byPrefix
  if (current && group.includes(current) && !current.prefixes) return current
  return group.find((c) => !c.prefixes) ?? group[0]
}

/** Read a whole pasted or autofilled number. Returns undefined for fragments */
function normalizeWhole(
  text: string,
  current: PhoneCountry,
  countries: PhoneCountry[],
) {
  const trimmed = text.trim()
  const digits = onlyDigits(trimmed)
  if (!digits) return undefined
  if (trimmed.startsWith("+") || trimmed.startsWith("00")) {
    const intl = trimmed.startsWith("+") ? digits : digits.slice(2)
    const country = resolveCountry(intl, countries, current)
    if (!country) return undefined
    return { country, national: intl.slice(country.dialCode.length) }
  }
  if (digits.length <= maxNational(current)) return undefined
  // "8 900 …" with a domestic prefix, or "7 900 …" without the plus
  if (current.trunkPrefix && digits.startsWith(current.trunkPrefix)) {
    return {
      country: current,
      national: digits.slice(current.trunkPrefix.length),
    }
  }
  if (digits.startsWith(current.dialCode)) {
    const country = resolveCountry(digits, countries, current) ?? current
    return { country, national: digits.slice(country.dialCode.length) }
  }
  return undefined
}

// The list is a native popover, so it lives in the top layer and cannot be
// positioned relative to the field with plain `absolute`. Without anchor
// positioning the component writes top/left/width into the CSS variables on
// open, scroll and resize. With it the browser does the work and flips the
// list at the screen edges.
const css = `
.gooseui-phone-list {
  position: fixed;
  inset: auto;
  margin: 0;
  top: var(--gooseui-phone-top, auto);
  bottom: var(--gooseui-phone-bottom, auto);
  left: var(--gooseui-phone-left, 0);
  width: var(--gooseui-phone-width, 18rem);
  max-width: calc(100vw - 1rem);
  opacity: 0;
  translate: 0 -0.25rem;
  transition: opacity 150ms ease-out, translate 150ms ease-out,
    display 150ms allow-discrete, overlay 150ms allow-discrete;
}
.gooseui-phone-list:popover-open { opacity: 1; translate: 0 0 }
@starting-style {
  .gooseui-phone-list:popover-open { opacity: 0; translate: 0 -0.25rem }
}
@supports (anchor-name: --a) {
  .gooseui-phone-field { anchor-name: var(--gooseui-phone-anchor) }
  .gooseui-phone-list {
    position-anchor: var(--gooseui-phone-anchor);
    top: anchor(bottom);
    bottom: auto;
    left: anchor(left);
    margin-top: 4px;
    width: max(anchor-size(width), 18rem);
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  }
}
.gooseui-phone-field:has(:popover-open) .gooseui-phone-chevron { rotate: 180deg }
@media (prefers-reduced-motion: reduce) {
  .gooseui-phone-list, .gooseui-phone-chevron { transition: none; translate: none }
}
`

const iconProps = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function PhoneInput({
  value,
  defaultValue,
  onValueChange,
  defaultCountry = "US",
  onCountryChange,
  countries: customCountries,
  preferredCountries = DEFAULT_PREFERRED,
  countryLabel,
  labels,
  locale,
  placeholder,
  disabled,
  name,
  className,
  inputClassName,
  style,
  onKeyDown,
  onPaste,
  onInvalid,
  required,
  error,
  validate = true,
  "aria-invalid": ariaInvalid,
  "aria-describedby": describedBy,
  ref,
  ...props
}: PhoneInputProps) {
  const countries = customCountries?.length ? customCountries : PHONE_COUNTRIES

  const text = {
    ...DEFAULT_LABELS,
    ...(countryLabel ? { country: countryLabel } : null),
    ...labels,
  }

  // Country names come from the browser, so the list carries no names
  const names = React.useMemo(() => {
    const open = (tag: string) => {
      try {
        return new Intl.DisplayNames([tag], { type: "region" })
      } catch {
        return undefined
      }
    }
    const nameOf = (dn: Intl.DisplayNames | undefined, c: PhoneCountry) => {
      try {
        const name = dn?.of(c.code)
        return name && name !== c.code ? name : (c.name ?? c.code)
      } catch {
        return c.name ?? c.code
      }
    }
    const local = open(locale || "en")
    const english = locale && !/^en\b/i.test(locale) ? open("en") : undefined
    let collator: Intl.Collator | undefined
    try {
      collator = new Intl.Collator(locale || "en")
    } catch {
      collator = undefined
    }
    return {
      show: (c: PhoneCountry) => nameOf(local, c),
      english: (c: PhoneCountry) => nameOf(english ?? local, c),
      compare: (a: string, b: string) =>
        collator ? collator.compare(a, b) : a.localeCompare(b),
    }
  }, [locale])
  const displayName = names.show

  const fallback =
    countries.find((c) => c.code === defaultCountry) ?? countries[0]

  const parse = (e164: string | undefined) => {
    const digits = onlyDigits(e164 ?? "")
    const country =
      (digits && resolveCountry(digits, countries, fallback)) || fallback
    const national = digits.startsWith(country.dialCode)
      ? digits.slice(country.dialCode.length)
      : digits
    return {
      code: country.code,
      national: national.slice(0, maxNational(country)),
    }
  }

  const [state, setState] = React.useState(() => parse(value ?? defaultValue))
  const [seenValue, setSeenValue] = React.useState(value)
  // Set once focus leaves the field, like :user-invalid
  const [touched, setTouched] = React.useState(false)
  const country = countries.find((c) => c.code === state.code) ?? fallback

  const toE164 = (c: PhoneCountry, national: string) =>
    national ? `+${c.dialCode}${national}` : ""

  // Sync from a controlled value set from outside
  if (value !== undefined && value !== seenValue) {
    setSeenValue(value)
    if (value !== toE164(country, state.national)) setState(parse(value))
  } else if (value !== undefined && value !== toE164(country, state.national)) {
    // The parent kept its value after an edit: show that value, not the edit
    const kept = parse(value)
    if (kept.code !== state.code || kept.national !== state.national) {
      setState(kept)
    }
  }

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const caret = React.useRef<number | null>(null)

  const formatted = formatNational(state.national, country.mask)

  React.useLayoutEffect(() => {
    const el = inputRef.current
    if (caret.current === null || !el) return
    if (document.activeElement === el) {
      el.setSelectionRange(caret.current, caret.current)
    }
    caret.current = null
  })

  const commit = (next: PhoneCountry, digits: string, caretDigits: number) => {
    const national = digits.slice(0, maxNational(next))
    const pos = Math.min(Math.max(caretDigits, 0), national.length)
    caret.current = caretAfterDigits(formatNational(national, next.mask), pos)
    const prevE164 = toE164(country, state.national)
    setState({ code: next.code, national })
    if (next.code !== country.code) onCountryChange?.(next)
    const e164 = toE164(next, national)
    if (e164 !== prevE164 || next.code !== country.code) {
      onValueChange?.(e164, {
        isValid: isComplete(next, national),
        country: next,
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const el = event.target
    const raw = el.value
    const caretPos = el.selectionStart ?? raw.length
    let digits = onlyDigits(raw)
    let caretDigits = onlyDigits(raw.slice(0, caretPos)).length

    // Autofill or drop of a whole number into an empty field
    if (/^\s*(\+|00)/.test(raw) || (!state.national && digits.length > 0)) {
      const whole = normalizeWhole(raw, country, countries)
      if (whole) {
        commit(whole.country, whole.national, Number.POSITIVE_INFINITY)
        return
      }
    }

    // Too many digits: drop the ones just typed before the caret
    const overflow = digits.length - maxNational(country)
    if (overflow > 0) {
      const cut = Math.max(caretDigits - overflow, 0)
      digits = digits.slice(0, cut) + digits.slice(cut + overflow)
      caretDigits = cut
    }
    commit(country, digits, caretDigits)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event)
    if (event.defaultPrevented) return
    event.preventDefault()
    const el = event.currentTarget
    const pasted = event.clipboardData.getData("text")
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? start
    const replacesAll = start === 0 && end === el.value.length
    if (replacesAll || /^\s*(\+|00)/.test(pasted)) {
      const whole = normalizeWhole(pasted, country, countries)
      if (whole) {
        commit(whole.country, whole.national, Number.POSITIVE_INFINITY)
        return
      }
    }
    const before = onlyDigits(el.value.slice(0, start))
    const after = onlyDigits(el.value.slice(end))
    const room = Math.max(
      maxNational(country) - before.length - after.length,
      0,
    )
    const inserted = onlyDigits(pasted).slice(0, room)
    commit(country, before + inserted + after, before.length + inserted.length)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    const el = event.currentTarget
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    if (start !== end || event.altKey || event.ctrlKey || event.metaKey) return
    const back = event.key === "Backspace"
    if (!back && event.key !== "Delete") return
    const v = el.value
    const at = back ? start - 1 : start
    // Deleting a mask character removes the nearest digit instead
    if (at < 0 || at >= v.length || /\d/.test(v[at])) return
    event.preventDefault()
    const all = onlyDigits(v)
    const index = onlyDigits(v.slice(0, start)).length - (back ? 1 : 0)
    if (index < 0 || index >= all.length) return
    commit(country, all.slice(0, index) + all.slice(index + 1), index)
  }

  // Country picker
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const listId = `gooseui-phone-${uid}`
  const listboxId = `${listId}-listbox`
  const optionId = (c: PhoneCountry) => `${listId}-${c.code}`

  const errorId = `${listId}-error`
  const empty = !state.national
  const invalidNow =
    validate && (empty ? !!required : !isComplete(country, state.national))
  const builtinMessage = empty ? text.required : text.incomplete
  const message = error || (invalidNow && touched ? builtinMessage : null)
  const nativeMessage =
    typeof error === "string" && error
      ? error
      : error
        ? text.incomplete
        : invalidNow
          ? builtinMessage
          : ""

  // The browser blocks form submit and shows the same text
  React.useLayoutEffect(() => {
    inputRef.current?.setCustomValidity(nativeMessage)
  }, [nativeMessage])

  const handleFieldBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget
    if (next instanceof Node && event.currentTarget.contains(next)) return
    // The search field is removed when the list closes, that is not a blur
    if (!next && listRef.current?.contains(event.target as Node)) return
    setTouched(true)
  }

  const fieldRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const [pad, setPad] = React.useState<number>()

  // Preferred countries first, then the rest by name in the current language
  const { ordered, preferredCount } = React.useMemo(() => {
    const byCode = new Map(countries.map((c) => [c.code, c]))
    const top = [...new Set(preferredCountries)]
      .map((code) => byCode.get(code))
      .filter((c): c is PhoneCountry => !!c)
    const rest = countries
      .filter((c) => !top.includes(c))
      .map((c) => ({ c, label: displayName(c) }))
      .sort((a, b) => names.compare(a.label, b.label))
      .map(({ c }) => c)
    return { ordered: [...top, ...rest], preferredCount: top.length }
  }, [countries, preferredCountries, displayName, names])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ordered
    const digits = q.replace(/^\+/, "")
    const labels = (c: PhoneCountry) => [
      displayName(c).toLowerCase(),
      names.english(c).toLowerCase(),
    ]
    const matches = ordered.filter(
      (c) =>
        labels(c).some((n) => n.includes(q)) ||
        c.code.toLowerCase() === q ||
        (/^\d+$/.test(digits) && c.dialCode.startsWith(digits)),
    )
    const starts = (c: PhoneCountry) => labels(c).some((n) => n.startsWith(q))
    return [...matches].sort((a, b) => Number(starts(b)) - Number(starts(a)))
  }, [ordered, displayName, names, query])
  // The divider between the preferred group and the rest, only without a query
  const dividerAt =
    !query.trim() && preferredCount > 0 && preferredCount < ordered.length
      ? preferredCount
      : -1

  const activeIndex = Math.min(active, filtered.length - 1)
  const activeOption = filtered[activeIndex]

  // Keep the left padding of the field equal to the width of the button
  React.useLayoutEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const measure = () => setPad(el.offsetWidth + 10)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Place the list under the field and move focus into the search
  React.useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const field = fieldRef.current
      const list = listRef.current
      if (!field || !list) return
      const rect = field.getBoundingClientRect()
      const viewport = document.documentElement
      const width = Math.min(
        Math.max(rect.width, 288),
        viewport.clientWidth - 16,
      )
      const left = Math.min(
        Math.max(rect.left, 8),
        viewport.clientWidth - width - 8,
      )
      const below = window.innerHeight - rect.bottom - 8
      const above = rect.top - 8
      const flip = list.offsetHeight > below && above > below
      list.style.setProperty("--gooseui-phone-left", `${left}px`)
      list.style.setProperty("--gooseui-phone-width", `${width}px`)
      if (flip) {
        list.style.setProperty(
          "--gooseui-phone-bottom",
          `${window.innerHeight - rect.top + 4}px`,
        )
        list.style.removeProperty("--gooseui-phone-top")
      } else {
        list.style.setProperty("--gooseui-phone-top", `${rect.bottom + 4}px`)
        list.style.removeProperty("--gooseui-phone-bottom")
      }
    }
    place()
    searchRef.current?.focus({ preventScroll: true })
    window.addEventListener("resize", place)
    window.addEventListener("scroll", place, true)
    return () => {
      window.removeEventListener("resize", place)
      window.removeEventListener("scroll", place, true)
    }
  }, [open])

  React.useEffect(() => {
    if (!open || !activeOption) return
    document
      .getElementById(optionId(activeOption))
      ?.scrollIntoView({ block: "nearest" })
  })

  const handleToggle = (event: React.ToggleEvent<HTMLDivElement>) => {
    const next = event.newState === "open"
    setOpen(next)
    if (next) {
      setQuery("")
      setActive(Math.max(ordered.indexOf(country), 0))
    }
  }

  const pick = (next: PhoneCountry) => {
    listRef.current?.hidePopover()
    commit(next, state.national, state.national.length)
    inputRef.current?.focus()
  }

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setActive(Math.min(activeIndex + 1, filtered.length - 1))
        break
      case "ArrowUp":
        event.preventDefault()
        setActive(Math.max(activeIndex - 1, 0))
        break
      case "Enter":
        event.preventDefault()
        if (!event.nativeEvent.isComposing && activeOption) pick(activeOption)
        break
      case "Escape":
        event.preventDefault()
        event.stopPropagation()
        listRef.current?.hidePopover()
        break
      case "Tab":
        listRef.current?.hidePopover()
        break
    }
  }

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
    event.preventDefault()
    try {
      listRef.current?.showPopover()
    } catch {
      // Already open
    }
  }

  return (
    <div
      data-slot="phone-input"
      onBlur={handleFieldBlur}
      className={cn("group w-full", className)}
    >
      <style href="gooseui-phone-input" precedence="default">
        {css}
      </style>
      <div
        ref={fieldRef}
        className="gooseui-phone-field relative w-full"
        style={
          { "--gooseui-phone-anchor": `--${listId}` } as React.CSSProperties
        }
      >
        <button
          ref={triggerRef}
          type="button"
          popoverTarget={listId}
          disabled={disabled}
          aria-label={`${text.country}: ${displayName(country)} +${country.dialCode}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onKeyDown={handleTriggerKeyDown}
          // Keep focus in the field on click, so opening the list is not a blur
          onMouseDown={(event) => event.preventDefault()}
          className="absolute inset-y-px z-10 left-px flex cursor-pointer items-center gap-1.5 rounded-l-[calc(var(--radius-md)-1px)] border-r border-input pr-2 pl-3 text-sm outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 group-has-[input[aria-invalid=true]]:border-destructive"
        >
          <span aria-hidden="true" className="text-base leading-none">
            {flagOf(country)}
          </span>
          <span
            aria-hidden="true"
            className="tabular-nums text-muted-foreground"
          >
            +{country.dialCode}
          </span>
          <ChevronIcon className="gooseui-phone-chevron size-3.5 text-muted-foreground transition-[rotate]" />
        </button>
        <Input
          {...props}
          ref={(el) => {
            inputRef.current = el
            if (typeof ref === "function") return ref(el)
            if (ref) ref.current = el
          }}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          required={required}
          aria-invalid={message ? true : ariaInvalid}
          aria-describedby={
            [describedBy, message ? errorId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onInvalid={(event) => {
            onInvalid?.(event)
            setTouched(true)
          }}
          placeholder={placeholder ?? country.mask.replace(/#/g, "0")}
          value={formatted}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          style={{ ...(pad ? { paddingLeft: pad } : null), ...style }}
          className={cn("pl-24 tabular-nums", inputClassName)}
        />
        <div
          ref={listRef}
          id={listId}
          popover="auto"
          onToggle={handleToggle}
          className="gooseui-phone-list overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md"
        >
          {open && (
            <>
              <div className="flex items-center gap-2 border-b px-3">
                <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listboxId}
                  aria-activedescendant={
                    activeOption ? optionId(activeOption) : undefined
                  }
                  aria-autocomplete="list"
                  aria-label={text.search}
                  placeholder={text.search}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setActive(0)
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="h-9 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
                />
              </div>
              {filtered.length === 0 ? (
                <p
                  role="status"
                  className="px-3 py-6 text-center text-sm text-muted-foreground"
                >
                  {text.empty}
                </p>
              ) : (
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-label={text.country}
                  onMouseDown={(event) => event.preventDefault()}
                  className="max-h-60 overflow-y-auto p-1"
                >
                  {filtered.map((c, i) => (
                    <React.Fragment key={c.code}>
                      {i === dividerAt && (
                        <li
                          role="presentation"
                          aria-hidden="true"
                          className="-mx-1 my-1 h-px bg-border"
                        />
                      )}
                      <li
                        id={optionId(c)}
                        role="option"
                        aria-selected={c.code === country.code}
                        data-active={i === activeIndex ? "" : undefined}
                        onMouseMove={() => setActive(i)}
                        onClick={() => pick(c)}
                        className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-active:bg-accent data-active:text-accent-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="text-base leading-none"
                        >
                          {flagOf(c)}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {displayName(c)}
                        </span>
                        <span className="tabular-nums text-muted-foreground">
                          +{c.dialCode}
                        </span>
                        <CheckIcon
                          className={cn(
                            "size-4 shrink-0",
                            c.code === country.code
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        {name && (
          <input
            type="hidden"
            name={name}
            value={toE164(country, state.national)}
          />
        )}
      </div>
      <div aria-live="polite">
        {message && (
          <p id={errorId} className="mt-2 text-sm text-destructive">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export { PhoneInput }
