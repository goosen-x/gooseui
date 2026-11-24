"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge, BadgeRemove } from "@/registry/gooseui/ui/badge"

const SPLIT_CHARS = [",", ";", "\n", "\t"]

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export type TagInputLabels = {
  /** Error when `maxTags` is reached */
  max: (max: number) => string
  /** Error for a duplicate tag */
  duplicate: (tag: string) => string
  /** Live region text after tags were added */
  added: (tags: string[]) => string
  /** Live region text after a tag was removed */
  removed: (tag: string) => string
  /** Accessible name of the remove button on a tag */
  remove: (tag: string) => string
  /** Accessible name of the suggestions listbox */
  suggestions: string
}

const DEFAULT_LABELS: TagInputLabels = {
  max: (max) => `You can add up to ${max} tags`,
  duplicate: (tag) => `“${tag}” is already added`,
  added: (tags) => `Added ${tags.join(", ")}`,
  removed: (tag) => `Removed ${tag}`,
  remove: (tag) => `Remove ${tag}`,
  suggestions: "Suggestions",
}

export type TagInputProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "id"
> & {
  /** Controlled list of tags */
  value?: string[]
  /** Initial tags when uncontrolled */
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Keys that commit the typed text. Single characters are also split on paste. Default: Enter, comma, Tab */
  delimiters?: string[]
  /** Maximum number of tags */
  maxTags?: number
  /** Return an error message to reject a tag, or `true` to accept it */
  validate?: (tag: string) => string | true
  /** Treat "React" and "react" as different tags. Default: false */
  caseSensitive?: boolean
  /** Options shown in a listbox under the input while typing (ArrowDown opens the full list) */
  suggestions?: string[]
  /** Renders one hidden input per tag with this name, so the value is sent with a form */
  name?: string
  disabled?: boolean
  placeholder?: string
  /** Id of the text input, for `<label htmlFor>` */
  id?: string
  /** Texts for errors and screen readers */
  labels?: Partial<TagInputLabels>
}

function TagInput({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  delimiters = ["Enter", ",", "Tab"],
  maxTags,
  validate,
  caseSensitive = false,
  suggestions,
  name,
  disabled = false,
  placeholder,
  id: idProp,
  labels: labelsProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TagInputProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(
    defaultValue ?? [],
  )
  const tags = valueProp ?? uncontrolled
  const setTags = (next: string[]) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  const [text, setText] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const reactId = React.useId()
  const inputId = idProp ?? `${reactId}-input`
  const listId = `${reactId}-list`
  const errorId = `${reactId}-error`

  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const chipRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const pendingFocus = React.useRef<number | "input" | null>(null)

  const normalize = (tag: string) => (caseSensitive ? tag : tag.toLowerCase())

  const typedDelimiters = delimiters.filter((d) => d.length === 1)
  const splitPattern = new RegExp(
    `[${[...new Set([...SPLIT_CHARS, ...typedDelimiters])].map(escapeRegExp).join("")}]+`,
  )

  const filtered = React.useMemo(() => {
    if (!suggestions?.length) return []
    const taken = new Set(tags.map((t) => t.toLowerCase()))
    const query = text.trim().toLowerCase()
    return suggestions
      .filter((s) => !taken.has(s.toLowerCase()))
      .filter((s) => !query || s.toLowerCase().includes(query))
      .slice(0, 8)
  }, [suggestions, tags, text])
  const listOpen = open && filtered.length > 0 && !disabled

  /** Adds every valid part of `raw`; returns the parts that were rejected */
  const commit = (raw: string): string[] => {
    const parts = raw
      .split(splitPattern)
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length === 0) return []
    const next = [...tags]
    const seen = new Set(next.map(normalize))
    const rejected: string[] = []
    let firstError: string | null = null
    for (const part of parts) {
      let reason: string | null = null
      if (maxTags !== undefined && next.length >= maxTags) {
        reason = labels.max(maxTags)
      } else if (seen.has(normalize(part))) {
        reason = labels.duplicate(part)
      } else if (validate) {
        const result = validate(part)
        if (result !== true) reason = result
      }
      if (reason) {
        rejected.push(part)
        firstError ??= reason
      } else {
        next.push(part)
        seen.add(normalize(part))
      }
    }
    const added = next.slice(tags.length)
    if (added.length > 0) {
      setTags(next)
      setAnnouncement(labels.added(added))
    }
    setError(firstError)
    return rejected
  }

  const commitText = (raw: string) => {
    const rejected = commit(raw)
    setText(rejected.join(", "))
    setOpen(false)
    setActiveIndex(-1)
  }

  const removeAt = (index: number, focusAfter: number | "input" = "input") => {
    const removed = tags[index]
    if (removed === undefined) return
    setTags(tags.filter((_, i) => i !== index))
    setAnnouncement(labels.removed(removed))
    setError(null)
    pendingFocus.current = focusAfter
  }

  // Focus moves after the tag list re-renders, so refs point at the right chips
  React.useEffect(() => {
    const target = pendingFocus.current
    if (target === null) return
    pendingFocus.current = null
    const chip = typeof target === "number" ? chipRefs.current[target] : null
    ;(chip ?? inputRef.current)?.focus()
  })

  React.useEffect(() => {
    if (!listOpen || activeIndex < 0) return
    const option = listRef.current?.children[activeIndex] as
      | HTMLElement
      | undefined
    option?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, listOpen])

  const focusChip = (index: number) => {
    chipRefs.current[index]?.focus()
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return
    const input = event.currentTarget
    const caretAtStart = input.selectionStart === 0 && input.selectionEnd === 0

    if (event.key === "ArrowDown" && filtered.length > 0) {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((i) => (listOpen ? (i + 1) % filtered.length : 0))
      return
    }
    if (event.key === "ArrowUp" && listOpen) {
      event.preventDefault()
      setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1))
      return
    }
    if (event.key === "Escape" && listOpen) {
      event.preventDefault()
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    if (delimiters.includes(event.key)) {
      const option = listOpen && activeIndex >= 0 ? filtered[activeIndex] : null
      if (option && (event.key === "Enter" || event.key === "Tab")) {
        event.preventDefault()
        commitText(option)
        return
      }
      if (text.trim()) {
        event.preventDefault()
        commitText(text)
      } else if (event.key.length === 1) {
        event.preventDefault()
      }
      return
    }

    if (event.key === "Backspace" && text === "" && tags.length > 0) {
      event.preventDefault()
      focusChip(tags.length - 1)
      return
    }
    if (event.key === "ArrowLeft" && caretAtStart && tags.length > 0) {
      event.preventDefault()
      focusChip(tags.length - 1)
    }
  }

  const handleChipKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    const last = tags.length - 1
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault()
        if (index > 0) focusChip(index - 1)
        break
      case "ArrowRight":
        event.preventDefault()
        if (index < last) focusChip(index + 1)
        else inputRef.current?.focus()
        break
      case "Home":
        event.preventDefault()
        focusChip(0)
        break
      case "End":
      case "Escape":
        event.preventDefault()
        inputRef.current?.focus()
        break
      case "Backspace":
        event.preventDefault()
        if (!disabled) removeAt(index, index > 0 ? index - 1 : "input")
        break
      case "Delete":
        event.preventDefault()
        if (!disabled) removeAt(index, index < last ? index : "input")
        break
      default:
        // Typing a character while a chip is selected goes back to the input
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
          inputRef.current?.focus()
        }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    setError(null)
    setOpen(true)
    setActiveIndex(-1)
    // Mobile keyboards often report "Unidentified" on keydown, so catch typed delimiters here
    const lastChar = next.slice(-1)
    if (typedDelimiters.includes(lastChar)) {
      commitText(next.slice(0, -1))
      return
    }
    setText(next)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text")
    if (!splitPattern.test(pasted)) return
    event.preventDefault()
    const input = event.currentTarget
    const start = input.selectionStart ?? text.length
    const end = input.selectionEnd ?? text.length
    commitText(text.slice(0, start) + pasted + text.slice(end))
  }

  const describedBy =
    [ariaDescribedBy, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined

  return (
    <div
      data-slot="tag-input"
      data-disabled={disabled || undefined}
      className={cn("relative grid w-full gap-1.5", className)}
      {...props}
    >
      <div className="relative">
        <div
          data-slot="tag-input-control"
          data-invalid={error ? true : undefined}
          onMouseDown={(event) => {
            // Clicks on the empty area of the box focus the input
            if (event.target === event.currentTarget && !disabled) {
              event.preventDefault()
              inputRef.current?.focus()
            }
          }}
          className={cn(
            "dark:bg-input/30 border-input flex min-h-9 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-2 py-1.5 text-base shadow-xs transition-[color,box-shadow] md:text-sm",
            // :has() adds the ring; without it the border still changes through :focus-within
            "focus-within:border-ring has-[input:focus-visible]:ring-ring/30 has-[input:focus-visible]:ring-[5px] has-[input:focus-visible]:ring-offset-2 has-[input:focus-visible]:ring-offset-background",
            "data-[invalid]:border-destructive data-[invalid]:has-[input:focus-visible]:ring-destructive/30",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
          )}
        >
          {tags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              ref={(node: HTMLSpanElement | null) => {
                chipRefs.current[index] = node
              }}
              data-slot="tag-input-tag"
              variant="secondary"
              tabIndex={-1}
              aria-keyshortcuts="Backspace Delete"
              onKeyDown={(event) => handleChipKeyDown(event, index)}
              className="max-w-full rounded-md outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
            >
              <span className="truncate">{tag}</span>
              {!disabled && (
                <BadgeRemove
                  tabIndex={-1}
                  aria-label={labels.remove(tag)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => removeAt(index)}
                />
              )}
            </Badge>
          ))}
          <input
            ref={inputRef}
            id={inputId}
            data-slot="tag-input-input"
            type="text"
            role={suggestions ? "combobox" : undefined}
            aria-autocomplete={suggestions ? "list" : undefined}
            aria-expanded={suggestions ? listOpen : undefined}
            aria-controls={suggestions ? listId : undefined}
            aria-activedescendant={
              listOpen && activeIndex >= 0
                ? `${listId}-${activeIndex}`
                : undefined
            }
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="enter"
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : undefined}
            value={text}
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
            onPaste={handlePaste}
            onBlur={() => {
              setOpen(false)
              setActiveIndex(-1)
            }}
            // field-sizing hugs the text; without it the input starts at 8ch and flex-1 fills the row
            className="placeholder:text-muted-foreground field-sizing-content h-6 w-[8ch] max-w-full min-w-[6ch] flex-1 bg-transparent px-1 outline-none supports-[field-sizing:content]:w-auto disabled:cursor-not-allowed"
          />
        </div>

        {listOpen && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={labels.suggestions}
            data-slot="tag-input-suggestions"
            className="bg-popover text-popover-foreground absolute inset-x-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-md border p-1 text-sm shadow-md"
          >
            {filtered.map((option, index) => (
              <li
                key={option}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                data-slot="tag-input-suggestion"
                onMouseDown={(event) => event.preventDefault()}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => {
                  commitText(option)
                  inputRef.current?.focus()
                }}
                className="aria-selected:bg-accent aria-selected:text-accent-foreground cursor-default rounded-sm px-2 py-1.5"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          data-slot="tag-input-error"
          className="text-destructive text-sm"
        >
          {error}
        </p>
      )}

      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>

      {name &&
        tags.map((tag, index) => (
          <input
            key={`${tag}-${index}`}
            type="hidden"
            name={name}
            value={tag}
          />
        ))}
    </div>
  )
}

export { TagInput }
