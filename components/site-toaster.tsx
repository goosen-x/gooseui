"use client"

import { useLocale } from "next-intl"
import { type CSSProperties, useEffect, useSyncExternalStore } from "react"
import { Toaster, type ToastPosition } from "@/registry/gooseui/ui/toast"

// The only Toaster of the site. Its options live in a tiny store, so the
// controls of the Toast docs page can change them and put them back on leave
const DEFAULTS = {
  position: "top-right" as ToastPosition,
  rich: false,
  close: true,
}
let snapshot = DEFAULTS
const listeners = new Set<() => void>()

export function patchToaster(next: Partial<typeof DEFAULTS>) {
  snapshot = { ...snapshot, ...next }
  for (const notify of listeners) notify()
}

export function useToasterSettings() {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify)
      return () => {
        listeners.delete(notify)
      }
    },
    () => snapshot,
    () => snapshot,
  )
}

/** Mount on a page that changes the Toaster options, restores them on leave */
export function ToasterSettingsReset() {
  useEffect(
    () => () => {
      snapshot = DEFAULTS
      for (const notify of listeners) notify()
    },
    [],
  )
  return null
}

export function SiteToaster() {
  const ru = useLocale() === "ru"
  const { position, rich, close } = useToasterSettings()
  return (
    <Toaster
      position={position}
      // --oy is the vertical offset only. At the bottom it keeps clear of the
      // review bar of the docs (--review-panel-h)
      style={
        position.startsWith("bottom")
          ? ({
              "--oy": "calc(1.5rem + var(--review-panel-h, 0px))",
            } as CSSProperties)
          : undefined
      }
      richColors={rich}
      closeButton={close}
      label={ru ? "Уведомления" : "Notifications"}
      closeLabel={ru ? "Закрыть" : "Close"}
    />
  )
}
