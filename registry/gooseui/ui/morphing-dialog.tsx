"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// The dialog opens and closes natively: the trigger is an invoker button
// (commandfor / command="show-modal"), so it works before hydration and
// without JavaScript. The script only adds the morph through the View
// Transitions API and opens the dialog where invoker commands are missing.

const MorphingDialogContext = React.createContext<string | null>(null)

function useMorphingDialogId() {
  const id = React.useContext(MorphingDialogContext)
  if (!id) {
    throw new Error(
      "MorphingDialog components must be used within MorphingDialog",
    )
  }
  return id
}

// Invoker command attributes are not in React's DOM types yet
const invoke = (target: string, command: "show-modal" | "close") =>
  ({ commandfor: target, command }) as Record<string, string>

const STYLES = `
dialog[data-morphing-dialog] {
  opacity: 1;
  scale: 1;
  transition: opacity 200ms ease-out, scale 200ms ease-out,
    overlay 200ms allow-discrete, display 200ms allow-discrete;
}
dialog[data-morphing-dialog]:not([open]) { opacity: 0; scale: 0.96 }
@starting-style { dialog[data-morphing-dialog][open] { opacity: 0; scale: 0.96 } }
dialog[data-morphing-dialog][data-vt] { transition: none }
html:has(dialog[data-morphing-dialog][open]) { overflow: hidden }
@media (prefers-reduced-motion: reduce) {
  dialog[data-morphing-dialog] { transition: none }
}
`

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Runs `update` inside a view transition that morphs `from` into `to`
function morph(from: HTMLElement, to: HTMLElement, update: () => void) {
  if (!document.startViewTransition || reducedMotion()) {
    update()
    return
  }
  const name = `morph-${to.id || from.id}`.replace(/[^a-zA-Z0-9_-]/g, "")
  const dialog = from instanceof HTMLDialogElement ? from : to
  // A morph is already running (backdrop click and closedby fire together)
  if ("vt" in dialog.dataset) return
  dialog.dataset.vt = ""
  from.style.viewTransitionName = name
  const vt = document.startViewTransition(() => {
    from.style.viewTransitionName = ""
    update()
    to.style.viewTransitionName = name
  })
  vt.ready.catch(() => {})
  vt.finished.finally(() => {
    to.style.viewTransitionName = ""
    delete dialog.dataset.vt
  })
}

function openDialog(trigger: HTMLElement, id: string) {
  const dialog = document.getElementById(id)
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return
  morph(trigger, dialog, () => {
    trigger.setAttribute("data-expanded", "true")
    dialog.showModal()
  })
}

const getTrigger = (id: string) =>
  document.querySelector<HTMLElement>(
    `[commandfor="${CSS.escape(id)}"][data-morphing-trigger]`,
  )

function closeDialog(id: string) {
  const dialog = document.getElementById(id)
  const trigger = getTrigger(id)
  if (!(dialog instanceof HTMLDialogElement) || !dialog.open) return
  const update = () => {
    trigger?.removeAttribute("data-expanded")
    dialog.close()
  }
  if (trigger) morph(dialog, trigger, update)
  else update()
}

// ============================================================================
// MorphingDialog (Root)
// ============================================================================

interface MorphingDialogProps {
  children: React.ReactNode
}

export function MorphingDialog({ children }: MorphingDialogProps) {
  const id = `morphing-dialog-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <MorphingDialogContext.Provider value={id}>
      {children}
    </MorphingDialogContext.Provider>
  )
}

// ============================================================================
// MorphingDialogTrigger
// ============================================================================

interface MorphingDialogTriggerProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
}: MorphingDialogTriggerProps) {
  const id = useMorphingDialogId()
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      data-morphing-trigger=""
      {...invoke(id, "show-modal")}
      onClick={(e) => {
        // Take over the native command to animate it
        e.preventDefault()
        openDialog(e.currentTarget, id)
      }}
      className={cn(
        "block cursor-pointer text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-expanded=true]]:invisible",
        className,
      )}
      style={style}
    >
      {children}
    </button>
  )
}

// ============================================================================
// MorphingDialogContainer (Native Dialog)
// ============================================================================

interface MorphingDialogContainerProps {
  children: React.ReactNode
}

export function MorphingDialogContainer({
  children,
}: MorphingDialogContainerProps) {
  const id = useMorphingDialogId()
  return (
    <dialog
      id={id}
      data-morphing-dialog=""
      // Backdrop click closes natively where closedby is supported
      {...{ closedby: "any" }}
      onCancel={(e) => {
        e.preventDefault()
        closeDialog(id)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDialog(id)
      }}
      // Closed without the morph (for example, Esc the browser would not cancel)
      onClose={() => getTrigger(id)?.removeAttribute("data-expanded")}
      className={cn(
        "m-auto border-none bg-transparent p-0",
        "w-full max-w-lg max-h-[calc(100vh-2rem)]",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
      )}
    >
      <style href="gooseui-morphing-dialog" precedence="default">
        {STYLES}
      </style>
      {children}
    </dialog>
  )
}

// ============================================================================
// MorphingDialogContent
// ============================================================================

interface MorphingDialogContentProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-xl bg-background p-6 shadow-2xl outline-none",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

// ============================================================================
// MorphingDialogImage
// ============================================================================

interface MorphingDialogImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export function MorphingDialogImage({
  src,
  alt,
  className,
  style,
}: MorphingDialogImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      style={style}
    />
  )
}

// ============================================================================
// MorphingDialogTitle
// ============================================================================

interface MorphingDialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function MorphingDialogTitle({
  children,
  className,
}: MorphingDialogTitleProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
}

// ============================================================================
// MorphingDialogSubtitle
// ============================================================================

interface MorphingDialogSubtitleProps {
  children: React.ReactNode
  className?: string
}

export function MorphingDialogSubtitle({
  children,
  className,
}: MorphingDialogSubtitleProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  )
}

// ============================================================================
// MorphingDialogDescription
// ============================================================================

interface MorphingDialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function MorphingDialogDescription({
  children,
  className,
}: MorphingDialogDescriptionProps) {
  return (
    <div className={cn("mt-4 text-sm text-muted-foreground", className)}>
      {children}
    </div>
  )
}

// ============================================================================
// MorphingDialogClose
// ============================================================================

interface MorphingDialogCloseProps {
  children?: React.ReactNode
  className?: string
}

export function MorphingDialogClose({
  children,
  className,
}: MorphingDialogCloseProps) {
  const id = useMorphingDialogId()
  return (
    <button
      type="button"
      {...invoke(id, "close")}
      onClick={(e) => {
        e.preventDefault()
        closeDialog(id)
      }}
      className={cn(
        "absolute right-2 top-2 rounded-full p-1 transition-colors cursor-pointer",
        "bg-background/80 text-foreground backdrop-blur-sm",
        "hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Invisible touch target extension for mobile (44x44px minimum)
        "after:absolute after:inset-0 after:-m-2 after:content-['']",
        className,
      )}
      aria-label="Close dialog"
    >
      {children || (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-3.5 w-3.5"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      )}
    </button>
  )
}
