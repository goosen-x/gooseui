"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  type NotificationPermissionState,
  type UseNotificationPermissionOptions,
  useNotificationPermission,
} from "@/registry/gooseui/hooks/use-notification-permission"
import { Button } from "@/registry/gooseui/ui/button"

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </svg>
  )
}

function BellOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" />
      <path d="m2 2 20 20" />
      <path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

// Enter with @starting-style, leave with a discrete display transition
const STYLES = `
.gooseui-notification-prompt {
  transition-property: opacity, translate, display;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;
}
.gooseui-notification-prompt[data-open="false"] {
  display: none;
  opacity: 0;
  translate: 0 var(--notification-prompt-offset, 8px);
}
@starting-style {
  .gooseui-notification-prompt[data-open="true"] {
    opacity: 0;
    translate: 0 var(--notification-prompt-offset, 8px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-notification-prompt { transition-duration: 150ms; }
  .gooseui-notification-prompt[data-open="false"] { translate: none; }
  @starting-style {
    .gooseui-notification-prompt[data-open="true"] { translate: none; }
  }
}
`

export type NotificationPromptLabels = {
  title: string
  description: string
  enable: string
  dismiss: string
  /** Shown when the permission is blocked and `whenDenied` is "hint". */
  deniedTitle: string
  deniedDescription: string
  deniedDismiss: string
  close: string
}

const DEFAULT_LABELS: NotificationPromptLabels = {
  title: "Turn on notifications",
  description: "We will tell you when something needs your attention.",
  enable: "Allow",
  dismiss: "Not now",
  deniedTitle: "Notifications are blocked",
  deniedDescription:
    "Allow them in your browser's site settings, then reload the page.",
  deniedDismiss: "Got it",
  close: "Close",
}

type Mode = "ask" | "denied"

export type NotificationPromptProps = Omit<
  React.ComponentProps<"aside">,
  "children"
> &
  UseNotificationPermissionOptions & {
    /** Icon on the left. */
    icon?: React.ReactNode
    labels?: Partial<NotificationPromptLabels>
    /** Milliseconds to wait before the banner appears. */
    delay?: number
    /** What to do when the permission is already blocked. */
    whenDenied?: "hide" | "hint"
    /** One row, no description. */
    compact?: boolean
    /** Pin to the bottom of the viewport instead of rendering in place. */
    floating?: boolean
    /**
     * Show the banner whatever the browser permission is. Useful for demos and
     * design reviews. Nothing is written to storage; the button still calls
     * the real `Notification.requestPermission()`.
     */
    forceShow?: "default" | "denied"
    onGranted?: () => void
    onDenied?: () => void
    onDismiss?: () => void
  }

export function NotificationPrompt({
  icon,
  labels,
  delay = 1000,
  whenDenied = "hide",
  compact = false,
  floating = false,
  forceShow,
  dismissDays,
  storageKey,
  onGranted,
  onDenied,
  onDismiss,
  className,
  ...props
}: NotificationPromptProps) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const hook = useNotificationPermission({ dismissDays, storageKey })
  const titleId = React.useId()
  const [pending, setPending] = React.useState(false)
  // Forced mode keeps its own state and never touches storage
  const [forcedState, setForcedState] = React.useState<
    NotificationPermissionState | undefined
  >(undefined)
  const [forcedHidden, setForcedHidden] = React.useState(false)
  const [ready, setReady] = React.useState(delay <= 0)

  React.useEffect(() => {
    if (delay <= 0) {
      setReady(true)
      return
    }
    const timer = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const permission: NotificationPermissionState = forceShow
    ? (forcedState ?? (forceShow === "denied" ? "denied" : "default"))
    : hook.permission
  const dismissed = forceShow ? forcedHidden : hook.isDismissed

  let mode: Mode | null = null
  if (ready && !dismissed) {
    if (permission === "default") mode = "ask"
    else if (permission === "denied" && whenDenied === "hint") mode = "denied"
  }

  const dismiss = () => {
    if (forceShow) setForcedHidden(true)
    else hook.dismiss()
    onDismiss?.()
  }

  const enable = async () => {
    setPending(true)
    try {
      const result = await hook.request()
      if (forceShow) setForcedState(result)
      if (result === "granted") onGranted?.()
      else if (result === "denied") onDenied?.()
    } finally {
      setPending(false)
    }
  }

  // The last mode stays rendered while the banner animates out
  const [lastMode, setLastMode] = React.useState(mode)
  if (mode && mode !== lastMode) setLastMode(mode)
  const shown = mode ?? lastMode

  if (!shown) return null

  const isDenied = shown === "denied"

  return (
    <aside
      aria-labelledby={titleId}
      data-open={mode ? "true" : "false"}
      className={cn(
        "gooseui-notification-prompt flex w-full max-w-md gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-lg",
        compact ? "items-center p-3" : "items-start",
        floating &&
          "fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto w-auto [--notification-prompt-offset:24px]",
        className,
      )}
      {...props}
    >
      <style href="gooseui-notification-prompt" precedence="default">
        {STYLES}
      </style>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg [&_svg]:size-5",
          compact ? "size-8" : "size-10",
          isDenied
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {icon && !isDenied ? icon : isDenied ? <BellOffIcon /> : <BellIcon />}
      </div>
      <div
        className={cn(
          "min-w-0 flex-1",
          compact &&
            "flex flex-wrap items-center justify-between gap-x-3 gap-y-2",
        )}
      >
        <div className="min-w-0">
          <p id={titleId} className="text-sm font-semibold leading-5">
            {isDenied ? text.deniedTitle : text.title}
          </p>
          {(!compact || isDenied) && (
            <p className="mt-1 text-sm text-muted-foreground">
              {isDenied ? text.deniedDescription : text.description}
            </p>
          )}
        </div>
        <div className={cn("flex flex-wrap gap-2", !compact && "mt-3")}>
          {!isDenied && (
            <Button
              type="button"
              size="sm"
              disabled={pending}
              onClick={() => void enable()}
            >
              {text.enable}
            </Button>
          )}
          <Button type="button" size="sm" variant="ghost" onClick={dismiss}>
            {isDenied ? text.deniedDismiss : text.dismiss}
          </Button>
        </div>
      </div>
      {!compact && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={dismiss}
          aria-label={text.close}
          className="-mt-1 -mr-1 size-7 text-muted-foreground"
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </aside>
  )
}
