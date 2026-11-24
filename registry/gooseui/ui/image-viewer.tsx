"use client"

import {
  type ComponentProps,
  cloneElement,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { cn } from "@/lib/utils"

export type ImageViewerLabels = {
  viewer: string
  instructions: string
  zoomIn: string
  zoomOut: string
  zoomLevel: string
  rotate: string
  fit: string
  reset: string
  close: string
  error: string
}

const defaultLabels: ImageViewerLabels = {
  viewer: "Image viewer",
  instructions:
    "Use plus and minus to zoom, arrow keys to pan, R to rotate and 0 to fit the image.",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zoomLevel: "Zoom level",
  rotate: "Rotate 90 degrees",
  fit: "Fit to view",
  reset: "Reset view",
  close: "Close",
  error: "The image could not be loaded",
}

type Size = { w: number; h: number }
type Point = { x: number; y: number }
type View = { scale: number; x: number; y: number; rotation: number }

const INITIAL_VIEW: View = { scale: 1, x: 0, y: 0, rotation: 0 }
const PAN_STEP = 48

type Gesture =
  | { kind: "pan"; start: Point; origin: View; moved: boolean }
  | { kind: "pinch"; dist: number; mid: Point; origin: View }

const clampNum = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

const isEditable = (target: EventTarget) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement)

function Icon({ d }: { d: string | string[] }) {
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
      {(Array.isArray(d) ? d : [d]).map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  )
}

const ICONS = {
  minus: "M5 12h14",
  plus: "M5 12h14M12 5v14",
  rotate: ["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", "M21 3v5h-5"],
  undo: [
    "M9 14 4 9l5-5",
    "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
  ],
  scan: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2",
  close: "M18 6 6 18M6 6l12 12",
}

export type ImageViewerProps = Omit<ComponentProps<"div">, "children"> & {
  /** Image URL */
  src: string
  /** Alternative text, also used in the viewer label */
  alt: string
  /** Minimum zoom, relative to the fitted size */
  minZoom?: number
  /** Maximum zoom, relative to the fitted size */
  maxZoom?: number
  /** Zoom change for buttons and keys */
  zoomStep?: number
  /** Show the control toolbar */
  showControls?: boolean
  /** Extra toolbar content rendered after the built-in buttons */
  toolbarEnd?: ReactNode
  /** Classes for the <img> element */
  imageClassName?: string
  /** Override texts */
  labels?: Partial<ImageViewerLabels>
}

export function ImageViewer(props: ImageViewerProps) {
  // A new src starts from a clean state
  return <ImageViewerInner key={props.src} {...props} />
}

function ImageViewerInner({
  src,
  alt,
  minZoom = 0.5,
  maxZoom = 4,
  zoomStep = 0.25,
  showControls = true,
  toolbarEnd,
  imageClassName,
  labels: labelsProp,
  className,
  onKeyDown,
  ...props
}: ImageViewerProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const id = useId()
  const viewportRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [natural, setNatural] = useState<Size | null>(null)
  const [failed, setFailed] = useState(false)
  const [box, setBox] = useState<Size>({ w: 0, h: 0 })
  const [view, setViewState] = useState<View>(INITIAL_VIEW)
  // Latest view, also between a set and the next render (gestures read it)
  const viewRef = useRef(view)
  const setView = useCallback((next: View | ((v: View) => View)) => {
    const value = typeof next === "function" ? next(viewRef.current) : next
    viewRef.current = value
    setViewState(value)
  }, [])
  const [smooth, setSmooth] = useState(false)
  const [dragging, setDragging] = useState(false)
  const pointers = useRef(new Map<number, Point>())
  const gesture = useRef<Gesture | null>(null)
  const lastTap = useRef<{ t: number; p: Point } | null>(null)
  const lastPointerType = useRef("mouse")

  // Image may finish loading or fail before hydration, so onLoad/onError never fire
  useEffect(() => {
    const img = imgRef.current
    if (!img?.complete) return
    if (img.naturalWidth) {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight })
    } else {
      setFailed(true)
    }
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setBox({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Fitted size of the image for a given rotation
  const getFit = useCallback(
    (rotation: number) => {
      if (!natural || !box.w || !box.h) return { fit: 0, w: 0, h: 0 }
      const sideways = Math.abs(rotation / 90) % 2 === 1
      const rw = sideways ? natural.h : natural.w
      const rh = sideways ? natural.w : natural.h
      const fit = Math.min(box.w / rw, box.h / rh)
      return { fit, w: rw * fit, h: rh * fit }
    },
    [natural, box],
  )

  const clampView = useCallback(
    (v: View): View => {
      const scale = clampNum(v.scale, minZoom, maxZoom)
      const { w, h } = getFit(v.rotation)
      const limX = Math.max(0, (w * scale - box.w) / 2)
      const limY = Math.max(0, (h * scale - box.h) / 2)
      return {
        ...v,
        scale,
        x: clampNum(v.x, -limX, limX),
        y: clampNum(v.y, -limY, limY),
      }
    },
    [getFit, box, minZoom, maxZoom],
  )

  // Zoom so that the point under `at` stays in place
  const zoomAround = useCallback(
    (v: View, nextScale: number, at: Point = { x: 0, y: 0 }): View => {
      const scale = clampNum(nextScale, minZoom, maxZoom)
      const k = scale / v.scale
      return clampView({
        ...v,
        scale,
        x: at.x - k * (at.x - v.x),
        y: at.y - k * (at.y - v.y),
      })
    },
    [clampView, minZoom, maxZoom],
  )

  // Position relative to the viewport center
  const toLocal = useCallback((clientX: number, clientY: number): Point => {
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    }
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      // Trackpad pinch arrives as wheel + ctrlKey with small deltas
      const factor = Math.exp(-delta * (e.ctrlKey ? 0.01 : 0.0015))
      const at = toLocal(e.clientX, e.clientY)
      setSmooth(false)
      setView((v) => zoomAround(v, v.scale * factor, at))
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [zoomAround, toLocal])

  // Re-clamp when the viewport or image size changes
  useEffect(() => {
    setView((v) => clampView(v))
  }, [clampView])

  const act = (update: (v: View) => View) => {
    setSmooth(true)
    setView((v) => update(v))
  }

  const snapUp = (s: number) => (Math.floor(s / zoomStep + 1e-6) + 1) * zoomStep
  const snapDown = (s: number) =>
    (Math.ceil(s / zoomStep - 1e-6) - 1) * zoomStep

  const zoomIn = () => act((v) => zoomAround(v, snapUp(v.scale)))
  const zoomOut = () => act((v) => zoomAround(v, snapDown(v.scale)))
  const fit = () => act((v) => clampView({ ...v, scale: 1, x: 0, y: 0 }))
  const reset = () => act(() => clampView(INITIAL_VIEW))
  const rotate = (dir: 1 | -1 = 1) =>
    act((v) =>
      clampView({
        ...v,
        rotation: v.rotation + 90 * dir,
        x: dir === 1 ? -v.y : v.y,
        y: dir === 1 ? v.x : -v.x,
      }),
    )
  const pan = (dx: number, dy: number) =>
    act((v) => clampView({ ...v, x: v.x + dx, y: v.y + dy }))

  const toggleZoom = (at: Point) =>
    act((v) =>
      v.scale > 1.01
        ? clampView({ ...v, scale: 1, x: 0, y: 0 })
        : zoomAround(v, Math.min(2, maxZoom), at),
    )

  const startGesture = () => {
    const pts = [...pointers.current.values()]
    if (pts.length >= 2) {
      gesture.current = {
        kind: "pinch",
        dist: distance(pts[0], pts[1]) || 1,
        mid: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 },
        origin: viewRef.current,
      }
    } else if (pts.length === 1) {
      gesture.current = {
        kind: "pan",
        start: pts[0],
        origin: viewRef.current,
        moved: false,
      }
    } else {
      gesture.current = null
    }
  }

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    lastPointerType.current = e.pointerType
    if (e.pointerType === "mouse" && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, toLocal(e.clientX, e.clientY))
    setSmooth(false)
    startGesture()
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return
    const p = toLocal(e.clientX, e.clientY)
    pointers.current.set(e.pointerId, p)
    const g = gesture.current
    if (!g) return
    if (g.kind === "pan") {
      const dx = p.x - g.start.x
      const dy = p.y - g.start.y
      if (!g.moved && Math.hypot(dx, dy) < 3) return
      g.moved = true
      setDragging(true)
      setView(
        clampView({ ...g.origin, x: g.origin.x + dx, y: g.origin.y + dy }),
      )
      return
    }
    const pts = [...pointers.current.values()]
    if (pts.length < 2) return
    const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
    const scale = clampNum(
      (g.origin.scale * distance(pts[0], pts[1])) / g.dist,
      minZoom,
      maxZoom,
    )
    const k = scale / g.origin.scale
    setView(
      clampView({
        ...g.origin,
        scale,
        x: mid.x - k * (g.mid.x - g.origin.x),
        y: mid.y - k * (g.mid.y - g.origin.y),
      }),
    )
  }

  const handlePointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return
    const g = gesture.current
    const p = toLocal(e.clientX, e.clientY)
    pointers.current.delete(e.pointerId)
    // Double tap on touch screens
    if (
      e.type === "pointerup" &&
      e.pointerType === "touch" &&
      g?.kind === "pan" &&
      !g.moved &&
      pointers.current.size === 0
    ) {
      const prev = lastTap.current
      if (prev && e.timeStamp - prev.t < 300 && distance(prev.p, p) < 30) {
        lastTap.current = null
        toggleZoom(p)
      } else {
        lastTap.current = { t: e.timeStamp, p }
      }
    }
    if (pointers.current.size === 0) setDragging(false)
    startGesture()
  }

  const handleDoubleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (lastPointerType.current === "touch") return
    toggleZoom(toLocal(e.clientX, e.clientY))
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
    // Leave typing alone in fields placed in toolbarEnd
    if (isEditable(e.target)) return
    const step = e.shiftKey ? PAN_STEP * 3 : PAN_STEP
    const actions: Record<string, () => void> = {
      "+": zoomIn,
      "=": zoomIn,
      "-": zoomOut,
      _: zoomOut,
      "0": fit,
      r: () => rotate(1),
      R: () => rotate(-1),
      ArrowLeft: () => pan(step, 0),
      ArrowRight: () => pan(-step, 0),
      ArrowUp: () => pan(0, step),
      ArrowDown: () => pan(0, -step),
    }
    const run = actions[e.key]
    if (!run) return
    // Arrow keys on toolbar buttons keep their default behavior
    if (e.key.startsWith("Arrow") && e.target !== viewportRef.current) return
    e.preventDefault()
    run()
  }

  const fitted = getFit(view.rotation)
  const pannable =
    fitted.w * view.scale > box.w + 1 || fitted.h * view.scale > box.h + 1
  const ready = natural !== null && fitted.fit > 0

  return (
    <div
      data-image-viewer=""
      className={cn(
        "relative h-96 w-full overflow-hidden rounded-lg border bg-muted/40",
        className,
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        ref={viewportRef}
        data-image-viewer-viewport=""
        role="region"
        tabIndex={0}
        aria-label={`${labels.viewer}: ${alt}`}
        aria-describedby={`${id}-hint`}
        className={cn(
          "absolute inset-0 touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          dragging
            ? "cursor-grabbing"
            : pannable
              ? "cursor-grab"
              : "cursor-zoom-in",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onDoubleClick={handleDoubleClick}
      >
        <span id={`${id}-hint`} className="sr-only">
          {labels.instructions}
        </span>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onLoad={(e) =>
            setNatural({
              w: e.currentTarget.naturalWidth || 1,
              h: e.currentTarget.naturalHeight || 1,
            })
          }
          onError={() => setFailed(true)}
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 max-w-none origin-center select-none",
            smooth &&
              "transition-transform duration-200 ease-out motion-reduce:transition-none",
            !ready && "opacity-0",
            imageClassName,
          )}
          style={
            ready && natural
              ? {
                  width: natural.w,
                  height: natural.h,
                  transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) rotate(${view.rotation}deg) scale(${fitted.fit * view.scale})`,
                }
              : undefined
          }
        />
        {failed && (
          <p className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-muted-foreground">
            {labels.error}
          </p>
        )}
      </div>

      {showControls && (
        <div
          role="toolbar"
          aria-label={labels.viewer}
          className="absolute bottom-3 left-1/2 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border bg-background/90 p-1 shadow-sm backdrop-blur"
        >
          <ToolbarButton
            label={labels.zoomOut}
            onClick={zoomOut}
            disabled={view.scale <= minZoom + 1e-6}
          >
            <Icon d={ICONS.minus} />
          </ToolbarButton>
          <output
            aria-label={labels.zoomLevel}
            className="min-w-12 text-center text-xs font-medium tabular-nums text-muted-foreground"
          >
            {Math.round(view.scale * 100)}%
          </output>
          <ToolbarButton
            label={labels.zoomIn}
            onClick={zoomIn}
            disabled={view.scale >= maxZoom - 1e-6}
          >
            <Icon d={ICONS.plus} />
          </ToolbarButton>
          <span aria-hidden className="mx-1 h-5 w-px bg-border" />
          <ToolbarButton label={labels.rotate} onClick={() => rotate(1)}>
            <Icon d={ICONS.rotate} />
          </ToolbarButton>
          <ToolbarButton label={labels.fit} onClick={fit}>
            <Icon d={ICONS.scan} />
          </ToolbarButton>
          <ToolbarButton label={labels.reset} onClick={reset}>
            <Icon d={ICONS.undo} />
          </ToolbarButton>
          {toolbarEnd}
        </div>
      )}
    </div>
  )
}

function ToolbarButton({
  label,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export type ImageViewerDialogProps = Omit<
  ImageViewerProps,
  "className" | "toolbarEnd"
> & {
  /** Controlled open state */
  open?: boolean
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean
  /** Called when the dialog opens or closes */
  onOpenChange?: (open: boolean) => void
  /** Trigger element: a single element, its onClick opens the dialog */
  children?: ReactNode
  /** Dialog title, defaults to alt */
  title?: string
  /** Classes for the dialog content */
  className?: string
}

const dialogCss = `
dialog[data-image-viewer-dialog]{opacity:1;transition:opacity .2s ease-out}
@starting-style{dialog[data-image-viewer-dialog][open]{opacity:0}}
html:has(dialog[data-image-viewer-dialog][open]){overflow:hidden}
@media (prefers-reduced-motion:reduce){dialog[data-image-viewer-dialog]{transition:none}}
`

type TriggerProps = {
  onClick?: (event: SyntheticEvent) => void
  "aria-haspopup"?: "dialog"
}

export function ImageViewerDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  title,
  className,
  labels,
  ...viewerProps
}: ImageViewerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const isOpen = open ?? innerOpen
  const closeLabel = labels?.close ?? defaultLabels.close

  const setOpen = (next: boolean) => {
    if (open === undefined) setInnerOpen(next)
    onOpenChange?.(next)
  }

  // Native modal: top layer, focus trap, Esc, inert page behind it
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
      dialog.querySelector<HTMLElement>("[data-image-viewer-viewport]")?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  const trigger = isValidElement<TriggerProps>(children)
    ? cloneElement(children, {
        "aria-haspopup": "dialog",
        onClick: (event: SyntheticEvent) => {
          children.props.onClick?.(event)
          if (!event.defaultPrevented) setOpen(true)
        },
      })
    : children

  return (
    <>
      {trigger}
      <dialog
        ref={dialogRef}
        data-image-viewer-dialog=""
        aria-labelledby={titleId}
        onClose={() => {
          if (isOpen) setOpen(false)
        }}
        className={cn(
          "fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-background/95 p-0 text-foreground backdrop-blur-sm open:flex open:flex-col backdrop:bg-transparent",
          className,
        )}
      >
        <style href="gooseui-image-viewer" precedence="default">
          {dialogCss}
        </style>
        {isOpen && (
          <>
            <div className="flex items-center gap-3 border-b px-4 py-2">
              <h2
                id={titleId}
                className="min-w-0 flex-1 truncate text-sm font-medium"
              >
                {title ?? viewerProps.alt}
              </h2>
              <button
                type="button"
                aria-label={closeLabel}
                title={closeLabel}
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
              >
                <Icon d={ICONS.close} />
              </button>
            </div>
            <ImageViewer
              {...viewerProps}
              labels={labels}
              className="h-auto min-h-0 flex-1 rounded-none border-0 bg-transparent"
            />
          </>
        )}
      </dialog>
    </>
  )
}
