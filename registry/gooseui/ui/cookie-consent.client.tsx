"use client"

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react"

export type CookieConsentStatus = "accepted" | "declined" | "custom"

export type CookieConsentValue = {
  status: CookieConsentStatus
  categories: Record<string, boolean>
  timestamp: number
}

// Tiny external store so the banner and useCookieConsent stay in sync
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

// Fallback when localStorage is blocked, so the banner still closes for this page view
const memory = new Map<string, string>()

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key) ?? memory.get(key) ?? null
  } catch {
    return memory.get(key) ?? null
  }
}

function writeRaw(key: string, value: string | null) {
  memory.delete(key)
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    if (value !== null) memory.set(key, value)
  }
  for (const listener of listeners) listener()
}

function parse(raw: string | null | undefined): CookieConsentValue | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as CookieConsentValue
    return typeof value?.status === "string" ? value : null
  } catch {
    return null
  }
}

export function useCookieConsent(storageKey = "cookie-consent") {
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => readRaw(storageKey),
    () => undefined,
  )
  const consent = useMemo(() => parse(raw), [raw])
  const reset = useCallback(() => writeRaw(storageKey, null), [storageKey])
  const isAllowed = useCallback(
    (category: string) => consent?.categories[category] === true,
    [consent],
  )
  return {
    /** Stored choice, null when the user has not answered yet */
    consent,
    /** False until the stored value has been read on the client */
    isLoaded: raw !== undefined,
    isAllowed,
    /** Forget the choice and show the banner again */
    reset,
  }
}

/** Stores the choice made in the <dialog> form and reopens the banner after reset. */
export function CookieConsentStore({
  dialogId,
  storageKey,
  onAccept,
  onDecline,
}: {
  dialogId: string
  storageKey: string
  onAccept?: (value: CookieConsentValue) => void
  onDecline?: (value: CookieConsentValue) => void
}) {
  useEffect(() => {
    const dialog = document.getElementById(dialogId)
    if (!(dialog instanceof HTMLDialogElement)) return
    const sync = () => {
      const answered = readRaw(storageKey) !== null
      if (answered && dialog.open) dialog.close()
      if (!answered && !dialog.open) {
        const settings = dialog.querySelector("details")
        if (settings) settings.open = false
        dialog.show()
      }
    }
    const onSubmit = (e: SubmitEvent) => {
      const status = (e.submitter as HTMLButtonElement | null)
        ?.value as CookieConsentStatus
      if (!status) return
      const categories: Record<string, boolean> = {}
      for (const input of dialog.querySelectorAll<HTMLInputElement>(
        "input[data-cc-category]",
      )) {
        const required = input.dataset.required !== undefined
        categories[input.name] =
          required ||
          (status === "accepted" ? true : status === "custom" && input.checked)
      }
      const value: CookieConsentValue = {
        status,
        categories,
        timestamp: Date.now(),
      }
      if (status === "declined") onDecline?.(value)
      else onAccept?.(value)
      dialog.dispatchEvent(
        new CustomEvent("cookieconsent", { detail: value, bubbles: true }),
      )
      writeRaw(storageKey, JSON.stringify(value))
    }
    sync()
    const unsubscribe = subscribe(sync)
    dialog.addEventListener("submit", onSubmit)
    return () => {
      unsubscribe()
      dialog.removeEventListener("submit", onSubmit)
    }
  }, [dialogId, storageKey, onAccept, onDecline])
  return null
}
