"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}
const Context = React.createContext<ContextValue | null>(null)

function useCollapsible() {
  const context = React.useContext(Context)
  if (!context)
    throw new Error("Collapsible components must be used within Collapsible")
  return context
}

type CollapsibleProps = React.ComponentProps<"div"> & {
  asChild?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Collapsible({
  asChild,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen
  const contentId = React.useId()
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next)
      if (next !== isOpen) onOpenChange?.(next)
    },
    [open, isOpen, onOpenChange],
  )
  const rootProps = {
    ...props,
    "data-slot": "collapsible",
    "data-state": isOpen ? "open" : "closed",
  }
  return (
    <Context.Provider value={{ open: isOpen, setOpen, contentId }}>
      {asChild && React.isValidElement<{ className?: string }>(children) ? (
        React.cloneElement(children, {
          ...rootProps,
          className: cn(className, children.props.className),
        })
      ) : (
        <div {...rootProps} className={className}>
          {children}
        </div>
      )}
    </Context.Provider>
  )
}

type TriggerProps = React.ComponentProps<"button"> & { asChild?: boolean }
function CollapsibleTrigger({
  asChild,
  children,
  className,
  onClick,
  ...props
}: TriggerProps) {
  const { open, setOpen, contentId } = useCollapsible()
  const triggerProps = {
    ...props,
    "data-slot": "collapsible-trigger",
    "data-state": open ? "open" : "closed",
    "aria-expanded": open,
    "aria-controls": contentId,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (!event.defaultPrevented) setOpen(!open)
    },
  }
  if (asChild && React.isValidElement<TriggerProps>(children)) {
    const childOnClick = children.props.onClick
    return React.cloneElement(children, {
      ...triggerProps,
      className: cn("cursor-pointer", className, children.props.className),
      onClick: (event) => {
        childOnClick?.(event)
        if (!event.defaultPrevented) triggerProps.onClick(event)
      },
    })
  }
  return (
    <button
      type="button"
      {...triggerProps}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen, contentId } = useCollapsible()
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const element = ref.current
    const reveal = () => setOpen(true)
    element?.addEventListener("beforematch", reveal)
    return () => element?.removeEventListener("beforematch", reveal)
  }, [setOpen])
  // React writes hidden="until-found" as hidden="" (display: none), which
  // cuts the closing transition, so the attribute is set by hand
  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    if (open) element.removeAttribute("hidden")
    else element.setAttribute("hidden", "until-found")
  }, [open])
  return (
    <>
      <style href="goose-collapsible" precedence="default">{`
        [data-slot="collapsible-content"] { overflow: clip; interpolate-size: allow-keywords; height: auto; transition: height 200ms ease, opacity 150ms ease, content-visibility 200ms allow-discrete; }
        [data-slot="collapsible-content"][data-state="closed"] { height: 0; opacity: 0; }
        @starting-style { [data-slot="collapsible-content"][data-state="open"] { height: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { [data-slot="collapsible-content"] { transition: none; } }
      `}</style>
      <div
        {...props}
        ref={ref}
        id={contentId}
        data-slot="collapsible-content"
        data-state={open ? "open" : "closed"}
        className={className}
      >
        {children}
      </div>
    </>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
