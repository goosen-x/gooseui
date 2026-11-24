import * as React from "react"
import { cn } from "@/lib/utils"
import { VideoDialogClient } from "@/registry/gooseui/ui/video-dialog.client"

export type VideoDialogLabels = {
  /** Accessible name of the preview button */
  play?: string
  /** Accessible name of the close button */
  close?: string
}

export type VideoDialogProps = Omit<
  React.ComponentProps<"button">,
  "children" | "onClick"
> & {
  /** Video shown in the dialog */
  src: string
  /** Poster image for the preview and the player */
  poster?: string
  /** Dialog title, visually hidden, read by screen readers */
  title?: string
  labels?: VideoDialogLabels
  /** Restart from the beginning every time the dialog opens */
  restartOnOpen?: boolean
  /** Called when the dialog opens or closes. Works from client components */
  onOpenChange?: (open: boolean) => void
  /** Classes for the dialog frame around the player */
  dialogClassName?: string
}

const DEFAULT_LABELS: Required<VideoDialogLabels> = {
  play: "Play video",
  close: "Close video",
}

const STYLES = `
[data-slot="video-dialog-content"] {
  opacity: 1;
  scale: 1;
  transition: opacity 200ms ease-out, scale 240ms cubic-bezier(0.2, 0.8, 0.2, 1),
    overlay 240ms allow-discrete, display 240ms allow-discrete;
}
[data-slot="video-dialog-content"]:not([open]) { opacity: 0; scale: 0.96 }
[data-slot="video-dialog-content"]::backdrop {
  background-color: rgb(0 0 0 / 0);
  backdrop-filter: blur(4px);
  transition: background-color 200ms ease-out, overlay 200ms allow-discrete,
    display 200ms allow-discrete;
}
[data-slot="video-dialog-content"][open]::backdrop { background-color: rgb(0 0 0 / 0.8) }
@starting-style {
  [data-slot="video-dialog-content"][open] { opacity: 0; scale: 0.94 }
  [data-slot="video-dialog-content"][open]::backdrop { background-color: rgb(0 0 0 / 0) }
}
html:has([data-slot="video-dialog-content"][open]) { overflow: hidden }
@media (prefers-reduced-motion: reduce) {
  [data-slot="video-dialog-content"],
  [data-slot="video-dialog-content"]::backdrop { transition: none }
}
`

// Invoker command attributes are not in React's DOM types yet
const invoke = (target: string, command: "show-modal" | "close") =>
  ({ commandfor: target, command }) as Record<string, string>

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="ml-0.5 size-6"
    >
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/**
 * Poster button that opens a native modal <dialog> with the player.
 * Opening and closing work without JavaScript (invoker commands and
 * <form method="dialog">). A tiny client island starts playback inside
 * the click, so Safari allows sound, and pauses the video on close.
 */
export function VideoDialog({
  src,
  poster,
  title = "Video",
  labels,
  restartOnOpen = false,
  onOpenChange,
  className,
  dialogClassName,
  ...props
}: VideoDialogProps) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const dialogId = `video-dialog-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  return (
    <>
      <style href="gooseui-video-dialog" precedence="default">
        {STYLES}
      </style>
      <button
        type="button"
        aria-label={text.play}
        aria-haspopup="dialog"
        data-slot="video-dialog-trigger"
        className={cn(
          "group relative isolate block aspect-video w-full cursor-pointer overflow-hidden rounded-xl border bg-muted outline-none",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50",
          className,
        )}
        {...invoke(dialogId, "show-modal")}
        {...props}
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : null}
        <span className="absolute inset-0 bg-foreground/0 transition-colors duration-200 group-hover:bg-foreground/10" />
        <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none">
          <PlayIcon />
        </span>
      </button>

      <dialog
        id={dialogId}
        aria-label={title}
        data-slot="video-dialog-content"
        // Backdrop click closes where closedby is supported; the island covers the rest
        {...{ closedby: "any" }}
        className={cn(
          "m-auto aspect-video w-[min(92vw,1100px,calc((100dvh-8rem)*16/9))] max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 outline-none",
          dialogClassName,
        )}
      >
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          className="h-full w-full rounded-xl bg-black object-contain"
        />
        <form method="dialog" className="contents">
          <button
            type="submit"
            aria-label={text.close}
            className="absolute -top-12 right-0 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-md outline-none transition-colors hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/60"
          >
            <CloseIcon />
          </button>
        </form>
      </dialog>
      <VideoDialogClient
        dialogId={dialogId}
        restartOnOpen={restartOnOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
