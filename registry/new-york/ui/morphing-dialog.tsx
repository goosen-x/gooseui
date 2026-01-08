"use client"

import { X } from "lucide-react"
import * as React from "react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

// ============================================================================
// Types & Context
// ============================================================================

interface MorphingDialogContextValue {
  isOpen: boolean
  uniqueId: string
  openDialog: (triggerEl: HTMLElement) => void
  closeDialog: () => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
  sourceRef: React.MutableRefObject<HTMLElement | null>
}

const MorphingDialogContext =
  React.createContext<MorphingDialogContextValue | null>(null)

function useMorphingDialog() {
  const context = React.useContext(MorphingDialogContext)
  if (!context) {
    throw new Error(
      "MorphingDialog components must be used within MorphingDialog",
    )
  }
  return context
}

// ============================================================================
// Utilities
// ============================================================================

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Fallback for browsers without View Transitions
const transition = (callback: () => void) => {
  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    prefersReducedMotion()
  ) {
    callback()
    return { finished: Promise.resolve() }
  }
  return document.startViewTransition(callback)
}

// Helper to set/clear view transition names
const setTransitionNames = (
  element: HTMLElement | null,
  name: string,
  active: boolean,
) => {
  if (!element || prefersReducedMotion()) return
  element.style.viewTransitionName = active ? name : ""
}

// ============================================================================
// MorphingDialog (Root)
// ============================================================================

interface MorphingDialogProps {
  children: React.ReactNode
}

export function MorphingDialog({ children }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId().replace(/:/g, "-")
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const sourceRef = React.useRef<HTMLElement | null>(null)

  const openDialog = React.useCallback(
    (triggerEl: HTMLElement) => {
      sourceRef.current = triggerEl
      const dialog = dialogRef.current
      if (!dialog) return

      // Set view transition name on source before transition
      setTransitionNames(triggerEl, `morph-${uniqueId}`, true)

      transition(() => {
        // Mark source as expanded (hidden) and remove name
        triggerEl.setAttribute("data-expanded", "true")
        setTransitionNames(triggerEl, `morph-${uniqueId}`, false)
        // Render content first
        flushSync(() => {
          setIsOpen(true)
        })
        // Open dialog (makes it visible)
        dialog.showModal()
        // Now set name on visible dialog
        setTransitionNames(dialog, `morph-${uniqueId}`, true)
      }).finished.then(() => {
        // Keep name on dialog for closing transition
      })
    },
    [uniqueId],
  )

  const closeDialog = React.useCallback(() => {
    const dialog = dialogRef.current
    const source = sourceRef.current
    if (!dialog || !source) return

    // Dialog already has view-transition-name from opening
    transition(() => {
      // Hand-off: remove from dialog, add to source
      setTransitionNames(dialog, `morph-${uniqueId}`, false)
      setTransitionNames(source, `morph-${uniqueId}`, true)
      // Remove expanded state
      source.removeAttribute("data-expanded")
      // Close dialog
      flushSync(() => {
        setIsOpen(false)
      })
      dialog.close()
    }).finished.then(() => {
      // Clean up after transition
      if (source) {
        setTransitionNames(source, `morph-${uniqueId}`, false)
      }
    })
  }, [uniqueId])

  return (
    <MorphingDialogContext.Provider
      value={{
        isOpen,
        uniqueId,
        openDialog,
        closeDialog,
        dialogRef,
        sourceRef,
      }}
    >
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
  const { openDialog } = useMorphingDialog()
  const triggerRef = React.useRef<HTMLDivElement>(null)

  const handleClick = React.useCallback(() => {
    if (triggerRef.current) {
      openDialog(triggerRef.current)
    }
  }, [openDialog])

  return (
    <div
      ref={triggerRef}
      onClick={handleClick}
      className={cn(
        "cursor-pointer [&[data-expanded=true]]:invisible",
        className,
      )}
      style={style}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {children}
    </div>
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
  const { isOpen, closeDialog, dialogRef } = useMorphingDialog()

  // Handle cancel event (Escape key, click outside with closedby="any")
  const handleCancel = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      closeDialog()
    },
    [closeDialog],
  )

  // Handle backdrop click
  const handleBackdropClick = React.useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Only close if clicking directly on the dialog (backdrop)
      if (e.target === e.currentTarget) {
        closeDialog()
      }
    },
    [closeDialog],
  )

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className={cn(
        "m-auto border-none bg-transparent p-0",
        "w-full max-w-lg max-h-[calc(100vh-2rem)]",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
      )}
    >
      {isOpen && children}
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
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Focus content when mounted
  React.useEffect(() => {
    contentRef.current?.focus()
  }, [])

  return (
    <div
      ref={contentRef}
      className={cn(
        "relative w-full rounded-xl bg-background p-6 shadow-2xl outline-none",
        className,
      )}
      style={style}
      tabIndex={-1}
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
  const { closeDialog } = useMorphingDialog()

  return (
    <button
      onClick={closeDialog}
      className={cn(
        "absolute right-2 top-2 rounded-full p-1 transition-colors cursor-pointer",
        "bg-background/80 text-foreground backdrop-blur-sm",
        "hover:bg-background",
        // Invisible touch target extension for mobile (44x44px minimum)
        "after:absolute after:inset-0 after:-m-2 after:content-['']",
        className,
      )}
      aria-label="Close dialog"
    >
      {children || <X className="h-3.5 w-3.5" />}
    </button>
  )
}
