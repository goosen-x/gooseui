"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/gooseui/ui/dropdown-menu"

export interface LanguageOption {
  /** Language code, for example "en" */
  code: string
  /** Name shown in the menu, in its own language: "Русский" */
  label: string
  /** Link to the same page in this language. Works without JavaScript */
  href?: string
  /** Flag or any other mark shown before the name */
  flag?: React.ReactNode
}

export interface LanguageSwitcherProps {
  languages: LanguageOption[]
  /** Code of the current language */
  value: string
  /** Called on choice. For items with `href` it replaces the page load */
  onValueChange?: (code: string) => void
  labels?: { language?: string }
  size?: "sm" | "default" | "lg"
  /** `button` is compact (header), `select` is full width (mobile menu) */
  variant?: "button" | "select"
  /** Show the language code on the trigger. Default: true for `button` */
  showCode?: boolean
  /** Show the language name on the trigger. Default: true for `select` */
  showLabel?: boolean
  align?: "start" | "center" | "end"
  className?: string
}

const sizes = {
  sm: "h-8 px-2 text-xs",
  default: "h-9 px-2.5 text-sm",
  lg: "h-10 px-3 text-base",
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

const itemClass =
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:shrink-0"

function LanguageSwitcher({
  languages,
  value,
  onValueChange,
  labels,
  size = "default",
  variant = "button",
  showCode,
  showLabel,
  align = "end",
  className,
}: LanguageSwitcherProps) {
  const isSelect = variant === "select"
  const code = showCode ?? !isSelect
  const label = showLabel ?? isSelect
  const current = languages.find((language) => language.code === value)
  const ariaLabel = labels?.language ?? "Language"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-input bg-background font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          sizes[size],
          isSelect && "w-full justify-between",
          className,
        )}
      >
        <span className="flex min-w-0 items-center gap-1.5">
          {current?.flag ?? (
            <svg
              viewBox="0 0 24 24"
              className="size-4 shrink-0"
              aria-hidden="true"
              {...stroke}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
          {label && <span className="truncate">{current?.label ?? value}</span>}
          {code && <span className="uppercase">{value}</span>}
        </span>
        <svg
          viewBox="0 0 24 24"
          className="size-3.5 shrink-0 opacity-60"
          aria-hidden="true"
          {...stroke}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="min-w-36 p-1"
        style={isSelect ? { minWidth: "anchor-size(width)" } : undefined}
      >
        {languages.map((language) => {
          const active = language.code === value
          const content = (
            <>
              {language.flag}
              <span className="flex-1">{language.label}</span>
              {active && (
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  aria-hidden="true"
                  {...stroke}
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </>
          )
          if (language.href !== undefined) {
            return (
              <a
                key={language.code}
                href={language.href}
                hrefLang={language.code}
                lang={language.code}
                role="menuitem"
                tabIndex={-1}
                aria-current={active ? "true" : undefined}
                className={itemClass}
                onClick={(event) => {
                  if (
                    !onValueChange ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  )
                    return
                  event.preventDefault()
                  if (!active) onValueChange(language.code)
                  event.currentTarget
                    .closest<HTMLElement>("[popover]")
                    ?.hidePopover()
                }}
              >
                {content}
              </a>
            )
          }
          return (
            <DropdownMenuItem
              key={language.code}
              lang={language.code}
              aria-current={active ? "true" : undefined}
              onSelect={() => {
                if (!active) onValueChange?.(language.code)
              }}
            >
              {content}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
