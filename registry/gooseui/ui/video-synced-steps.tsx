"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type VideoSyncedStep = {
  title: React.ReactNode
  description?: React.ReactNode
  /** Second of the video where this step begins */
  start: number
}

export type VideoSyncedStepsLabels = {
  play?: string
  pause?: string
  steps?: string
}

export type VideoSyncedStepsProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  src: string
  poster?: string
  steps: VideoSyncedStep[]
  /** `side`: video next to the list, `stack`: video above the list */
  layout?: "side" | "stack"
  /** Classes for the <video>, e.g. an aspect ratio */
  videoClassName?: string
  /** Start playing automatically when visible (off for reduced motion) */
  autoPlay?: boolean
  labels?: VideoSyncedStepsLabels
  onStepChange?: (index: number) => void
}

function Icon({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
    >
      <path
        d={
          playing
            ? "M6 4h4v16H6zM14 4h4v16h-4z"
            : "M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"
        }
      />
    </svg>
  )
}

export function VideoSyncedSteps({
  src,
  poster,
  steps,
  layout = "side",
  videoClassName,
  autoPlay = true,
  labels,
  onStepChange,
  className,
  ...props
}: VideoSyncedStepsProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const listRef = React.useRef<HTMLOListElement>(null)
  const pausedRef = React.useRef(!autoPlay)
  const visibleRef = React.useRef(false)
  // Survives effect re-runs, so a new `steps` array does not re-fire onStepChange
  const reportedRef = React.useRef(-1)
  const [active, setActive] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  const onStepChangeRef = React.useRef(onStepChange)
  onStepChangeRef.current = onStepChange

  // Sorted copy so `start` order in props does not matter
  const ordered = React.useMemo(
    () => [...steps].sort((a, b) => a.start - b.start),
    [steps],
  )

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let frame = 0

    const update = () => {
      const time = video.currentTime
      let index = 0
      ordered.forEach((step, i) => {
        if (time >= step.start) index = i
      })
      if (index !== reportedRef.current) {
        reportedRef.current = index
        setActive(index)
        onStepChangeRef.current?.(index)
      }
      const start = ordered[index]?.start ?? 0
      const end =
        ordered[index + 1]?.start ??
        (Number.isFinite(video.duration) ? video.duration : start + 1)
      const ratio = Math.min(1, Math.max(0, (time - start) / (end - start)))
      // The bar of the active step reads --progress, the rest stay at 0
      listRef.current?.style.setProperty("--progress", String(ratio))
      if (!video.paused) frame = requestAnimationFrame(update)
    }
    const onPlay = () => {
      setPlaying(true)
      cancelAnimationFrame(frame)
      update()
    }
    const onPause = () => {
      setPlaying(false)
      cancelAnimationFrame(frame)
      update()
    }

    // Play only while on screen
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pausedRef.current = true
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (!entry.isIntersecting) video.pause()
        else if (!pausedRef.current) video.play().catch(() => {})
      },
      { threshold: 0.25 },
    )
    observer.observe(video)

    const events: [string, () => void][] = [
      ["play", onPlay],
      ["pause", onPause],
      ["seeked", update],
      ["loadedmetadata", update],
    ]
    for (const [type, fn] of events) video.addEventListener(type, fn)
    if (video.paused) update()
    else onPlay()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      for (const [type, fn] of events) video.removeEventListener(type, fn)
    }
  }, [ordered])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    pausedRef.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  const seekTo = (start: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = start + 0.01
    if (!pausedRef.current && visibleRef.current) video.play().catch(() => {})
  }

  return (
    <div
      data-slot="video-synced-steps"
      data-layout={layout}
      className={cn(
        layout === "side"
          ? "grid items-center gap-4 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] sm:gap-6"
          : "flex flex-col gap-4",
        className,
      )}
      {...props}
    >
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          className={cn(
            "aspect-video w-full rounded-lg border bg-muted object-cover",
            videoClassName,
          )}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={
            playing
              ? (labels?.pause ?? "Pause video")
              : (labels?.play ?? "Play video")
          }
          className="absolute right-2 bottom-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm outline-none backdrop-blur transition-colors hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Icon playing={playing} />
        </button>
      </div>

      <ol
        ref={listRef}
        aria-label={labels?.steps ?? "Steps"}
        className="flex flex-col gap-1.5"
      >
        {ordered.map((step, index) => {
          const isActive = index === active
          return (
            <li key={`${step.start}-${index}`}>
              <button
                type="button"
                onClick={() => seekTo(step.start)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group relative flex w-full cursor-pointer items-start gap-3 overflow-hidden rounded-lg border px-3 py-2.5 text-left outline-none transition-colors duration-300 focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isActive
                    ? "border-border bg-card text-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-xs tabular-nums transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : index < active && "text-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-sm leading-6">
                    {step.title}
                  </span>
                  {step.description ? (
                    <span className="grid grid-rows-[0fr] text-muted-foreground text-xs leading-5 opacity-0 transition-[grid-template-rows,opacity] duration-300 group-aria-[current=step]:grid-rows-[1fr] group-aria-[current=step]:opacity-100 motion-reduce:transition-none">
                      <span className="overflow-hidden">
                        {step.description}
                      </span>
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary group-aria-[current=step]:scale-x-(--progress)"
                />
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
