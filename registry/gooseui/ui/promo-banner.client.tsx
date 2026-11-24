"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  PromoBanner,
  type PromoBannerProps,
} from "@/registry/gooseui/ui/promo-banner"

/** Remembers the dismissal and runs the callbacks. Closing itself is native. */
export function PromoBannerStore({
  dialogId,
  storageKey,
  onClose,
  onCtaClick,
}: {
  dialogId: string
  storageKey?: string
  onClose?: () => void
  onCtaClick?: () => void
}) {
  useEffect(() => {
    const dialog = document.getElementById(dialogId)
    if (!(dialog instanceof HTMLDialogElement)) return
    const read = () => {
      try {
        return storageKey ? localStorage.getItem(storageKey) : null
      } catch {
        return null
      }
    }
    // Rendered on the client, the inline script did not run
    if (read() === "true" && dialog.open) dialog.close()
    const handleClose = () => {
      try {
        if (storageKey) localStorage.setItem(storageKey, "true")
      } catch {
        // Storage can be blocked, the banner then comes back on the next visit
      }
      if (!onClose) return
      // onClose often unmounts the banner: wait for the closing transition,
      // otherwise React removes it before it fades out
      const ms =
        Math.max(
          ...getComputedStyle(dialog)
            .transitionDuration.split(",")
            .map((value) => Number.parseFloat(value) || 0),
        ) * 1000
      if (ms > 0) window.setTimeout(onClose, ms)
      else onClose()
    }
    const cta = dialog.querySelector("[data-promo-cta]")
    const handleCta = () => onCtaClick?.()
    dialog.addEventListener("close", handleClose)
    cta?.addEventListener("click", handleCta)
    return () => {
      dialog.removeEventListener("close", handleClose)
      cta?.removeEventListener("click", handleCta)
    }
  }, [dialogId, storageKey, onClose, onCtaClick])
  return null
}

interface PromoBannerConfig extends Omit<PromoBannerProps, "onClose"> {
  expiresAt?: Date
}

interface PromoBannerContextValue {
  show: (config: PromoBannerConfig) => void
  hide: () => void
  isVisible: boolean
}

const PromoBannerContext = createContext<PromoBannerContextValue | null>(null)

export function usePromoBanner() {
  const context = useContext(PromoBannerContext)
  if (!context) {
    throw new Error("usePromoBanner must be used within PromoBannerProvider")
  }
  return context
}

export function PromoBannerProvider({
  children,
  initialConfig,
}: {
  children: ReactNode
  initialConfig?: PromoBannerConfig
}) {
  const [config, setConfig] = useState<PromoBannerConfig | null>(
    initialConfig ?? null,
  )
  const show = useCallback((next: PromoBannerConfig) => setConfig(next), [])
  const hide = useCallback(() => setConfig(null), [])
  const expired = Boolean(config?.expiresAt && new Date() > config.expiresAt)
  const isVisible = Boolean(config) && !expired
  const value = useMemo(
    () => ({ show, hide, isVisible }),
    [show, hide, isVisible],
  )

  return (
    <PromoBannerContext.Provider value={value}>
      {children}
      {config && !expired && (
        <PromoBanner {...config} onClose={hide} defaultOpen />
      )}
    </PromoBannerContext.Provider>
  )
}
