import { type CSSProperties, type ReactNode, useId } from "react"
import { cn } from "@/lib/utils"
import {
  buildIcs,
  type CalendarEvent,
  googleCalendarUrl,
  outlookCalendarUrl,
} from "@/registry/gooseui/lib/ics"

export type CalendarProvider =
  | "google"
  | "apple"
  | "outlook"
  | "office365"
  | "ics"

export type AddToCalendarLabels = {
  trigger: string
  google: string
  apple: string
  outlook: string
  office365: string
  ics: string
}

const defaultLabels: AddToCalendarLabels = {
  trigger: "Add to calendar",
  google: "Google Calendar",
  apple: "Apple Calendar",
  outlook: "Outlook.com",
  office365: "Microsoft 365",
  ics: "Other calendar (.ics)",
}

export type AddToCalendarProps = {
  event: CalendarEvent
  /** Menu items, in order. */
  providers?: CalendarProvider[]
  /** File name for the .ics download, without extension. */
  filename?: string
  labels?: Partial<AddToCalendarLabels>
  variant?: "default" | "outline"
  size?: "sm" | "md"
  align?: "start" | "center" | "end"
  disabled?: boolean
  className?: string
  /** Extra classes for the menu panel. */
  contentClassName?: string
}

// The menu is a native popover. Without anchor positioning it opens as a
// sheet at the bottom of the viewport; with it, it drops down from the button
// and flips at the screen edges.
const css = `
.gooseui-atc-menu {
  inset: auto 0 0 0;
  margin: 0;
  width: 100%;
  max-width: none;
  border-radius: 0.75rem 0.75rem 0 0;
  padding-bottom: max(0.25rem, env(safe-area-inset-bottom));
  opacity: 0;
  translate: 0 0.5rem;
  transition: opacity 150ms ease-out, translate 150ms ease-out,
    display 150ms allow-discrete, overlay 150ms allow-discrete;
}
.gooseui-atc-menu:popover-open { opacity: 1; translate: 0 0 }
@starting-style {
  .gooseui-atc-menu:popover-open { opacity: 0; translate: 0 0.5rem }
}
@media (min-width: 640px) {
  .gooseui-atc-menu {
    inset: auto 0 1rem 0;
    margin-inline: auto;
    width: 20rem;
    border-radius: 0.5rem;
  }
}
@supports (anchor-name: --a) {
  .gooseui-atc-trigger { anchor-name: var(--gooseui-anchor) }
  .gooseui-atc-menu {
    position-anchor: var(--gooseui-anchor);
    inset: auto;
    margin: 6px 0;
    width: max-content;
    min-width: 14rem;
    max-width: calc(100vw - 1rem);
    border-radius: 0.375rem;
    padding-bottom: 0.25rem;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline;
    translate: 0 -0.25rem;
  }
  .gooseui-atc-menu[data-align="center"] { position-area: block-end }
  .gooseui-atc-menu[data-align="end"] { position-area: block-end span-inline-start }
}
.gooseui-atc:has(:popover-open) .gooseui-atc-chevron { rotate: 180deg }
@media (prefers-reduced-motion: reduce) {
  .gooseui-atc-menu, .gooseui-atc-chevron { transition: none; translate: none }
}
`

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
  return slug || "event"
}

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

function CalendarPlusIcon() {
  return (
    <svg {...svg}>
      <path d="M8 2v4M16 2v4M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M3 10h18M16 19h6M19 16v6" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg {...svg} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg {...svg}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg {...svg}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

const triggerVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
}

const triggerSizes = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-9 gap-2 px-4 text-sm",
}

const itemClass =
  "flex cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"

/*
 * Service logos from simple-icons (CC0), inlined so there is no package.
 * Google Calendar and Outlook keep their brand colors on purpose: people
 * recognize these services by color, which is the one exception to the
 * "shadcn tokens only" rule. The Apple logo is monochrome and follows the
 * text color of the theme.
 */
function GoogleCalendarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#4285F4" aria-hidden="true">
      <path d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z" />
    </svg>
  )
}

function OutlookLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#0078D4" aria-hidden="true">
      <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-foreground!"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

const providerLogos = {
  google: GoogleCalendarLogo,
  outlook: OutlookLogo,
  office365: OutlookLogo,
} as const

/**
 * Server component, no client JavaScript: the menu is a native popover,
 * the .ics file is a data: URL built on the server.
 */
export function AddToCalendar({
  event,
  providers = ["google", "apple", "outlook", "ics"],
  filename,
  labels,
  variant = "default",
  size = "md",
  align = "start",
  disabled = false,
  className,
  contentClassName,
}: AddToCalendarProps) {
  const text = { ...defaultLabels, ...labels }
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const menuId = `atc-${id}`

  // One file for every .ics item, so its UID and timestamp stay the same.
  let icsHref: string | undefined
  const getIcsHref = () =>
    (icsHref ??= `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(event))}`)
  const icsName = `${filename ?? slugify(event.title)}.ics`

  const linkItem = (
    provider: "google" | "outlook" | "office365",
    href: string,
  ) => {
    const Logo = providerLogos[provider]
    return (
      <a
        key={provider}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
      >
        <Logo />
        <span className="flex-1">{text[provider]}</span>
        <ExternalLinkIcon />
      </a>
    )
  }

  const renderItem = (provider: CalendarProvider): ReactNode => {
    switch (provider) {
      case "google":
        return linkItem("google", googleCalendarUrl(event))
      case "outlook":
        return linkItem("outlook", outlookCalendarUrl(event))
      case "office365":
        return linkItem("office365", outlookCalendarUrl(event, "office"))
      // Apple Calendar has no web link, so both items download the same file.
      // macOS and iOS Safari hand it to Calendar.
      case "apple":
        return (
          <a
            key="apple"
            href={getIcsHref()}
            download={icsName}
            type="text/calendar"
            className={itemClass}
          >
            <AppleLogo />
            <span className="flex-1">{text.apple}</span>
          </a>
        )
      case "ics":
        return (
          <a
            key="ics"
            href={getIcsHref()}
            download={icsName}
            type="text/calendar"
            className={itemClass}
          >
            <DownloadIcon />
            <span className="flex-1">{text.ics}</span>
          </a>
        )
    }
  }

  return (
    <span
      className="gooseui-atc inline-flex"
      style={{ "--gooseui-anchor": `--${menuId}` } as CSSProperties}
    >
      <style href="gooseui-add-to-calendar" precedence="default">
        {css}
      </style>
      <button
        type="button"
        popoverTarget={menuId}
        disabled={disabled}
        className={cn(
          "gooseui-atc-trigger inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
          triggerVariants[variant],
          triggerSizes[size],
          className,
        )}
      >
        <CalendarPlusIcon />
        {text.trigger}
        <ChevronDownIcon className="gooseui-atc-chevron opacity-70 transition-[rotate]" />
      </button>
      <div
        id={menuId}
        popover="auto"
        data-align={align}
        className={cn(
          "gooseui-atc-menu min-w-[14rem] overflow-hidden border bg-popover p-1 text-popover-foreground shadow-md",
          contentClassName,
        )}
      >
        {providers.map(renderItem)}
      </div>
    </span>
  )
}
