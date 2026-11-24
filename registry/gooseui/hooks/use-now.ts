"use client"

import { useCallback, useSyncExternalStore } from "react"

type Ticker = {
  now: number
  listeners: Set<() => void>
  timer: ReturnType<typeof setInterval> | null
}

// One ticker per interval, shared by every component that asks for it.
const tickers = new Map<number, Ticker>()

function getTicker(interval: number): Ticker {
  let ticker = tickers.get(interval)
  if (!ticker) {
    ticker = { now: Date.now(), listeners: new Set(), timer: null }
    tickers.set(interval, ticker)
  }
  return ticker
}

function tick(ticker: Ticker) {
  ticker.now = Date.now()
  for (const listener of ticker.listeners) listener()
}

// Background tabs throttle timers, so refresh as soon as the tab is visible again.
function onVisibilityChange() {
  if (document.visibilityState !== "visible") return
  for (const ticker of tickers.values()) {
    if (ticker.listeners.size > 0) tick(ticker)
  }
}

let activeTickers = 0

function subscribeTo(interval: number, listener: () => void) {
  const ticker = getTicker(interval)
  ticker.listeners.add(listener)
  if (ticker.timer === null) {
    ticker.now = Date.now()
    ticker.timer = setInterval(() => tick(ticker), interval)
    activeTickers += 1
    if (activeTickers === 1) {
      document.addEventListener("visibilitychange", onVisibilityChange)
    }
  }
  return () => {
    ticker.listeners.delete(listener)
    if (ticker.listeners.size > 0 || ticker.timer === null) return
    clearInterval(ticker.timer)
    ticker.timer = null
    tickers.delete(interval)
    activeTickers -= 1
    if (activeTickers === 0) {
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }
}

const getServerSnapshot = () => null

/**
 * Current time in milliseconds, refreshed every `interval` ms.
 * Returns `null` on the server and during hydration, so the markup always matches.
 */
export function useNow(interval = 1000): number | null {
  const safeInterval = Math.max(16, Math.round(interval))
  // Stable subscribe: a new function every render would restart the timer on each render.
  const subscribe = useCallback(
    (listener: () => void) => subscribeTo(safeInterval, listener),
    [safeInterval],
  )
  return useSyncExternalStore(
    subscribe,
    () => getTicker(safeInterval).now,
    getServerSnapshot,
  )
}
