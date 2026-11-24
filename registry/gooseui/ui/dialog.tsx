"use client"

import { XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
  triggerRef: React.RefObject<HTMLElement | null>
}
const DialogContext = React.createContext<DialogContextValue | null>(null)
function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("Dialog components must be used inside Dialog")
  return context
}

function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const id = React.useId()
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next)
      if (next !== open) onOpenChange?.(next)
    },
    [controlledOpen, onOpenChange, open],
  )
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        titleId: `${id}-title`,
        descriptionId: `${id}-description`,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

type ActionProps = React.ComponentProps<"button"> & { asChild?: boolean }
function DialogAction({
  asChild,
  children,
  onClick,
  action,
  ...props
}: ActionProps & { action: "open" | "close" }) {
  const { setOpen, triggerRef, open } = useDialog()
  const child = asChild
    ? (React.Children.only(children) as React.ReactElement<
        React.ComponentProps<"button">
      >)
    : null
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    child?.props.onClick?.(event)
    onClick?.(event)
    if (!event.defaultPrevented) {
      if (action === "open") triggerRef.current = event.currentTarget
      setOpen(action === "open")
    }
  }
  if (child)
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      "aria-expanded": action === "open" ? open : undefined,
      onClick: handleClick,
      className: cn("cursor-pointer", props.className, child.props.className),
    })
  return (
    <button
      type="button"
      {...props}
      className={cn("cursor-pointer", props.className)}
      aria-expanded={action === "open" ? open : undefined}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
function DialogTrigger(props: ActionProps) {
  return <DialogAction {...props} action="open" />
}
function DialogClose(props: ActionProps) {
  return <DialogAction {...props} action="close" />
}

let locks = 0
let previousOverflow = ""
function lockScroll() {
  if (locks++ === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
  }
  return () => {
    if (--locks === 0) document.body.style.overflow = previousOverflow
  }
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  onCancel,
  onClose,
  onClick,
  ...props
}: React.ComponentProps<"dialog"> & { showCloseButton?: boolean }) {
  const { open, setOpen, triggerRef, titleId, descriptionId } = useDialog()
  const ref = React.useRef<HTMLDialogElement>(null)
  const ignoreClose = React.useRef(0)
  React.useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      if (!triggerRef.current && document.activeElement instanceof HTMLElement)
        triggerRef.current = document.activeElement
      dialog.showModal()
      const unlock = lockScroll()
      return () => {
        unlock()
        if (dialog.open) {
          ignoreClose.current++
          dialog.close()
        }
        triggerRef.current?.focus()
      }
    }
  }, [open, triggerRef])
  return (
    <>
      <style href="goose-dialog" precedence="default">{`
      dialog[data-goose-dialog] { display: none; opacity: 0; scale: .95; transition: opacity 200ms, scale 200ms, display 200ms allow-discrete, overlay 200ms allow-discrete; }
      dialog[data-goose-dialog][open] { display: grid; opacity: 1; scale: 1; }
      dialog[data-goose-dialog]::backdrop { background: rgb(0 0 0 / .5); opacity: 0; transition: opacity 200ms, display 200ms allow-discrete, overlay 200ms allow-discrete; }
      dialog[data-goose-dialog][open]::backdrop { opacity: 1; }
      @starting-style { dialog[data-goose-dialog][open] { opacity: 0; scale: .95; } dialog[data-goose-dialog][open]::backdrop { opacity: 0; } }
      @media (prefers-reduced-motion: reduce) { dialog[data-goose-dialog], dialog[data-goose-dialog]::backdrop { transition: none; } }
    `}</style>
      <dialog
        ref={ref}
        data-goose-dialog=""
        data-slot="dialog-content"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "fixed inset-0 m-auto grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border bg-background p-6 text-foreground shadow-lg outline-none sm:max-w-lg",
          className,
        )}
        onCancel={(event) => {
          onCancel?.(event)
          if (!event.defaultPrevented) {
            event.preventDefault()
            setOpen(false)
          }
        }}
        onClose={(event) => {
          onClose?.(event)
          if (ignoreClose.current > 0) ignoreClose.current--
          else setOpen(false)
        }}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || event.target !== event.currentTarget)
            return
          const rect = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            setOpen(false)
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 cursor-pointer opacity-70 hover:opacity-100"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        )}
      </dialog>
    </>
  )
}
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}
function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useDialog()
  return (
    <h2
      data-slot="dialog-title"
      id={titleId}
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}
function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId } = useDialog()
  return (
    <p
      data-slot="dialog-description"
      id={descriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
