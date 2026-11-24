"use client"

import { useCallback, useSyncExternalStore } from "react"

export type NotificationPermissionState = NotificationPermission | "unsupported"

export type UseNotificationPermissionOptions = {
  /** Days to stay quiet after the user dismisses the offer. */
  dismissDays?: number
  /** localStorage key for the dismissal timestamp. */
  storageKey?: string
}

export type UseNotificationPermissionReturn = {
  /** Current permission, or "unsupported" without the Notification API (and on the server). */
  permission: NotificationPermissionState
  isSupported: boolean
  /** User dismissed the offer less than `dismissDays` ago. */
  isDismissed: boolean
  /** Permission is still undecided and the user has not dismissed the offer. */
  shouldOffer: boolean
  /** Opens the browser dialog. Call it only from a click or another user action. */
  request: () => Promise<NotificationPermissionState>
  dismiss: () => void
  /** Forget the dismissal, e.g. from a settings screen. */
  resetDismiss: () => void
}

const DAY_MS = 86_400_000
const DISMISS_EVENT = "notification-permission:dismiss"

const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

function readPermission(): NotificationPermissionState {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported"
  }
  return Notification.permission
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  let status: PermissionStatus | undefined
  let active = true
  // The user can change the permission in the site settings while the page is open.
  try {
    void navigator.permissions
      .query({ name: "notifications" })
      .then((result) => {
        if (!active) return
        status = result
        status.addEventListener("change", listener)
      })
      .catch(() => {})
  } catch {
    // No Permissions API, the permission still updates after request().
  }
  return () => {
    active = false
    listeners.delete(listener)
    status?.removeEventListener("change", listener)
  }
}

// Fallback when localStorage is blocked, so a dismissal still holds for this page view
const memory = new Map<string, string>()

function readDismissedAt(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null
  } catch {
    return memory.get(key) ?? null
  }
}

function subscribeDismissed(listener: () => void) {
  window.addEventListener("storage", listener)
  window.addEventListener(DISMISS_EVENT, listener)
  return () => {
    window.removeEventListener("storage", listener)
    window.removeEventListener(DISMISS_EVENT, listener)
  }
}

export function useNotificationPermission(
  options: UseNotificationPermissionOptions = {},
): UseNotificationPermissionReturn {
  const { dismissDays = 7, storageKey = "notification-prompt-dismissed-at" } =
    options
  const permission = useSyncExternalStore(
    subscribe,
    readPermission,
    () => "unsupported" as const,
  )
  const dismissedRaw = useSyncExternalStore(
    subscribeDismissed,
    () => readDismissedAt(storageKey),
    () => null,
  )

  const dismissedAt = dismissedRaw === null ? Number.NaN : Number(dismissedRaw)
  const isDismissed =
    Number.isFinite(dismissedAt) &&
    Date.now() - dismissedAt < dismissDays * DAY_MS

  const dismiss = useCallback(() => {
    const now = String(Date.now())
    try {
      localStorage.setItem(storageKey, now)
    } catch {
      // Storage may be blocked; the offer just comes back next visit.
      memory.set(storageKey, now)
    }
    window.dispatchEvent(new Event(DISMISS_EVENT))
  }, [storageKey])

  const resetDismiss = useCallback(() => {
    memory.delete(storageKey)
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // Nothing to clear when storage is blocked.
    }
    window.dispatchEvent(new Event(DISMISS_EVENT))
  }, [storageKey])

  const request =
    useCallback(async (): Promise<NotificationPermissionState> => {
      if (readPermission() === "unsupported") return "unsupported"
      try {
        await Notification.requestPermission()
      } catch {
        // Some browsers throw when there is no user gesture; read the state below.
      }
      notify()
      return readPermission()
    }, [])

  const isSupported = permission !== "unsupported"

  return {
    permission,
    isSupported,
    isDismissed,
    shouldOffer: permission === "default" && !isDismissed,
    request,
    dismiss,
    resetDismiss,
  }
}
