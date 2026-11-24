"use client"

import { useEffect, useState, useSyncExternalStore } from "react"

const EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const

// Shared by every hook instance on the page.
let interacted = false
const listeners = new Set<() => void>()
let attached = false

function attach() {
  if (attached || interacted) return
  attached = true
  for (const type of EVENTS) {
    // Capture phase also catches scrolls of nested containers.
    window.addEventListener(type, markInteracted, {
      capture: true,
      passive: true,
    })
  }
}

function detach() {
  if (!attached) return
  attached = false
  for (const type of EVENTS) {
    window.removeEventListener(type, markInteracted, { capture: true })
  }
}

function notify() {
  for (const listener of listeners) listener()
}

function markInteracted() {
  if (interacted) return
  interacted = true
  detach()
  notify()
}

/** Forget the first interaction. Meant for tests and demos. */
export function resetDeferredInteraction() {
  if (!interacted) return
  interacted = false
  if (listeners.size > 0) attach()
  notify()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  attach()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) detach()
  }
}

const getSnapshot = () => interacted
const getServerSnapshot = () => false

/**
 * `true` after the first user interaction on the page (scroll, pointerdown,
 * keydown, touchstart) or after `timeout` ms, whichever comes first.
 * The interaction is shared by all callers; the timeout is per call.
 * Pass `timeout: null` to wait for an interaction only.
 */
export function useDeferredInteraction(timeout: number | null = 5000): boolean {
  const hasInteracted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (hasInteracted || timeout === null) return
    setTimedOut(false)
    const id = window.setTimeout(() => setTimedOut(true), Math.max(0, timeout))
    return () => window.clearTimeout(id)
  }, [hasInteracted, timeout])

  return hasInteracted || timedOut
}
