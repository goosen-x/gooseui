"use client"

import * as React from "react"

/**
 * Hook to inject global CSS into document.head
 * Uses useInsertionEffect for proper CSS-in-JS timing
 * Styles are only injected once per unique id (singleton)
 */
export function useGlobalStyles(css: string, id: string) {
  React.useInsertionEffect(() => {
    if (!css || typeof document === "undefined") return

    // Check if style already exists (singleton)
    if (document.getElementById(id)) return

    const styleEl = document.createElement("style")
    styleEl.id = id
    styleEl.textContent = css
    document.head.appendChild(styleEl)

    // Don't remove on unmount - styles are global and shared
  }, [css, id])
}
