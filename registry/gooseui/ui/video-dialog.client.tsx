"use client"

import * as React from "react"

type VideoDialogClientProps = {
  dialogId: string
  restartOnOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Progressive enhancement for VideoDialog. Renders nothing.
 * - starts the video inside the click, so the browser allows sound
 * - pauses it when the dialog closes
 * - opens the dialog where invoker commands are not supported yet
 * - closes on a backdrop click where <dialog closedby> is not supported
 */
export function VideoDialogClient({
  dialogId,
  restartOnOpen = false,
  onOpenChange,
}: VideoDialogClientProps) {
  const onOpenChangeRef = React.useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  React.useEffect(() => {
    const dialog = document.getElementById(dialogId)
    if (!(dialog instanceof HTMLDialogElement)) return
    const trigger = document.querySelector<HTMLButtonElement>(
      `[commandfor="${CSS.escape(dialogId)}"]`,
    )
    const video = dialog.querySelector("video")

    const open = () => {
      if (video) {
        if (restartOnOpen) video.currentTime = 0
        video.muted = false
        video.play().catch(() => {
          // Sound was blocked: play muted, the controls stay available
          video.muted = true
          video.play().catch(() => {})
        })
      }
      if (!("command" in HTMLButtonElement.prototype) && !dialog.open) {
        dialog.showModal()
      }
      // The invoker command runs right after the click event
      setTimeout(() => {
        if (dialog.open) onOpenChangeRef.current?.(true)
      })
    }
    const close = () => {
      video?.pause()
      onOpenChangeRef.current?.(false)
    }
    const backdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close()
    }

    trigger?.addEventListener("click", open)
    dialog.addEventListener("close", close)
    dialog.addEventListener("click", backdrop)
    return () => {
      trigger?.removeEventListener("click", open)
      dialog.removeEventListener("close", close)
      dialog.removeEventListener("click", backdrop)
    }
  }, [dialogId, restartOnOpen])

  return null
}
