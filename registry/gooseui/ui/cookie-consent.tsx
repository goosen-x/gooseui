import { type CSSProperties, type ReactNode, useId } from "react"
import { cn } from "@/lib/utils"
import {
  CookieConsentStore,
  type CookieConsentValue,
} from "@/registry/gooseui/ui/cookie-consent.client"

export {
  type CookieConsentStatus,
  type CookieConsentValue,
  useCookieConsent,
} from "@/registry/gooseui/ui/cookie-consent.client"

export type CookieCategory = {
  id: string
  label: string
  description?: string
  /** Always enabled, the switch is locked */
  required?: boolean
  /** Initial switch state in the settings panel */
  defaultEnabled?: boolean
}

export type CookieConsentLabels = {
  title: ReactNode
  description: ReactNode
  accept: string
  decline: string
  customize: string
  save: string
  close: string
}

export type CookieConsentProps = {
  /** localStorage key used to store the choice */
  storageKey?: string
  /** "bar" is a strip along the bottom edge, "card" sits in a corner */
  variant?: "bar" | "card"
  /** "fixed" pins to the viewport, "absolute" stays inside the nearest positioned parent */
  position?: "fixed" | "absolute"
  /** Corner for the card variant */
  side?: "left" | "right"
  /** Optional cookie categories with switches */
  categories?: CookieCategory[]
  labels?: Partial<CookieConsentLabels>
  /** Delay before the banner appears, ms */
  delay?: number
  /** Show the cookie icon */
  showIcon?: boolean
  /** Client components only: called after the choice is stored */
  onAccept?: (value: CookieConsentValue) => void
  onDecline?: (value: CookieConsentValue) => void
  className?: string
}

const defaultLabels: CookieConsentLabels = {
  title: "We use cookies",
  description:
    "Cookies help us keep the site working and understand how it is used. You can accept all of them or decline the optional ones.",
  accept: "Accept all",
  decline: "Decline",
  customize: "Customize",
  save: "Save choice",
  close: "Close",
}

// Non-modal <dialog open> + <form method="dialog">: the buttons close it without JS.
// Entry and exit are CSS transitions on [open] with @starting-style.
const styles = `
@layer base{.gooseui-cookie{margin:0;padding:0;border:0;background:none;color:inherit;max-width:none;max-height:none}}
.gooseui-cookie{opacity:1;translate:0;
transition:opacity .3s cubic-bezier(.2,.8,.2,1),translate .3s cubic-bezier(.2,.8,.2,1),display .3s allow-discrete;
transition-delay:var(--cc-delay,0ms)}
.gooseui-cookie:not([open]){opacity:0;translate:0 12px;transition-delay:0ms;transition-duration:.2s}
@starting-style{.gooseui-cookie[open]{opacity:0;translate:0 16px}}
.gooseui-cookie details>summary{list-style:none}
.gooseui-cookie details>summary::-webkit-details-marker{display:none}
.gooseui-cookie:has(details[open]) [data-cc-actions]>button{display:none}
.gooseui-cookie:has(details[open]) [data-cc-row]{flex-direction:column;align-items:stretch}
.gooseui-cookie:has(details[open]) [data-cc-actions]{padding-right:0}
.gooseui-cookie details[open]{flex-basis:100%}
.gooseui-cookie details[open]>summary{display:none}
@media (prefers-reduced-motion:reduce){.gooseui-cookie{transition:none}}
`

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

const btn =
  "inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
const primaryBtn = cn(
  btn,
  "bg-primary text-primary-foreground hover:bg-primary/90",
)
const outlineBtn = cn(
  btn,
  "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
)
const ghostBtn = cn(
  btn,
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
)

export function CookieConsent({
  storageKey = "cookie-consent",
  variant = "bar",
  position = "fixed",
  side = "right",
  categories,
  labels: labelsProp,
  delay = 0,
  showIcon = true,
  onAccept,
  onDecline,
  className,
}: CookieConsentProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const id = useId()
  const dialogId = `${id}-cookie`
  const titleId = `${id}-title`
  const descId = `${id}-desc`
  const hasCategories = Boolean(categories?.length)
  const isCard = variant === "card"

  // Runs while the HTML is parsed: hides the banner before the first paint if a choice is stored
  const hideIfAnswered =
    `try{localStorage.getItem(${JSON.stringify(storageKey)})&&document.getElementById(${JSON.stringify(dialogId)}).removeAttribute("open")}catch(e){}`.replace(
      /</g,
      "\\u003c",
    )

  return (
    <>
      <style href="gooseui-cookie-consent" precedence="default">
        {styles}
      </style>
      <dialog
        id={dialogId}
        open
        // The inline script may remove "open" before hydration
        suppressHydrationWarning
        aria-labelledby={titleId}
        aria-describedby={descId}
        data-variant={variant}
        style={{ "--cc-delay": `${delay}ms` } as CSSProperties}
        className={cn(
          "gooseui-cookie z-40",
          position === "fixed" ? "fixed" : "absolute",
          isCard
            ? cn(
                "top-auto bottom-4 w-[calc(100%-2rem)] max-w-sm",
                side === "left" ? "right-auto left-4" : "right-4 left-auto",
              )
            : "inset-x-0 top-auto bottom-0 w-full p-3 sm:p-4",
          className,
        )}
      >
        <script dangerouslySetInnerHTML={{ __html: hideIfAnswered }} />
        <form
          method="dialog"
          className={cn(
            "relative rounded-xl border bg-card text-card-foreground shadow-lg",
            isCard ? "p-4" : "mx-auto max-w-3xl p-4 sm:p-5",
          )}
        >
          <button
            type="submit"
            value="declined"
            aria-label={labels.close}
            className="absolute top-2.5 right-2.5 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <XIcon className="size-4" />
          </button>

          <div
            data-cc-row=""
            className={cn(
              "flex gap-3",
              isCard
                ? "flex-col"
                : "flex-col sm:flex-row sm:items-center sm:gap-4",
            )}
          >
            {showIcon && (
              <div
                aria-hidden
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
                  !isCard && "hidden sm:flex",
                )}
              >
                <CookieIcon className="size-5" />
              </div>
            )}

            <div className="min-w-0 flex-1 pr-8">
              <p id={titleId} className="text-sm font-semibold">
                {labels.title}
              </p>
              <div id={descId} className="mt-1 text-sm text-muted-foreground">
                {labels.description}
              </div>
            </div>

            <div
              data-cc-actions=""
              className={cn(
                "flex flex-wrap gap-2",
                isCard ? "pt-1" : "sm:shrink-0 sm:pr-8",
              )}
            >
              <button type="submit" value="accepted" className={primaryBtn}>
                {labels.accept}
              </button>
              <button type="submit" value="declined" className={outlineBtn}>
                {labels.decline}
              </button>
              {hasCategories && (
                <details>
                  <summary className={ghostBtn}>{labels.customize}</summary>
                  <div className="mt-2 space-y-3 border-t pt-4">
                    <ul className="space-y-3">
                      {categories?.map((c) => (
                        <CategorySwitch key={c.id} category={c} />
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="submit"
                        value="custom"
                        className={primaryBtn}
                      >
                        {labels.save}
                      </button>
                      <button
                        type="submit"
                        value="accepted"
                        className={outlineBtn}
                      >
                        {labels.accept}
                      </button>
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </form>
      </dialog>
      <CookieConsentStore
        dialogId={dialogId}
        storageKey={storageKey}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    </>
  )
}

function CategorySwitch({ category }: { category: CookieCategory }) {
  const id = useId()
  return (
    <li className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            !category.required && "cursor-pointer",
          )}
        >
          {category.label}
        </label>
        {category.description && (
          <p className="text-xs text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          name={category.id}
          // No form owner: Enter in a switch must not submit and accept everything
          form=""
          data-cc-category=""
          data-required={category.required ? "" : undefined}
          defaultChecked={Boolean(category.required || category.defaultEnabled)}
          disabled={category.required}
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
        <span
          aria-hidden
          className="inline-flex h-5 w-9 items-center rounded-full border border-transparent bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-disabled:opacity-60 dark:bg-muted dark:peer-checked:bg-primary [&>span]:transition-transform peer-checked:[&>span]:translate-x-4 motion-reduce:[&>span]:transition-none"
        >
          <span className="pointer-events-none block size-4 rounded-full bg-background shadow-sm" />
        </span>
      </span>
    </li>
  )
}
