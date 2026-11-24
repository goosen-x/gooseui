"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { useCopyToClipboard } from "@/registry/gooseui/hooks/use-copy-to-clipboard"

export type ShareAction =
  | "telegram"
  | "whatsapp"
  | "x"
  | "linkedin"
  | "facebook"
  | "email"
  | "copy"
  | "native"

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

function LinkIcon() {
  return (
    <svg {...svg}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg {...svg}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg {...svg} className="text-destructive">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg {...svg}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  )
}

const noop = () => () => {}
// Row: only touch devices, where the system sheet beats a row of buttons.
const canNativeShare = () =>
  typeof navigator.share === "function" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches
// Menu: wherever the browser can share this data (Safari on Mac included).
const canShareData = (data: ShareData) =>
  typeof navigator.share === "function" &&
  (typeof navigator.canShare !== "function" || navigator.canShare(data))

export type ShareButtonsIslandProps = {
  url?: string
  title?: string
  copy: boolean
  nativeShare: boolean
  layout: "row" | "menu"
  /**
   * Menu only. `start` renders just the system share item (placed before the
   * network links), `end` renders everything else.
   */
  slot?: "start" | "end"
  showLabels: boolean
  /** Classes for a row button, the island draws them like the links. */
  buttonClassName: string
  /** Colours of a neutral button (copy link). */
  neutralClassName: string
  iconOnlyClassName: string
  withLabelClassName: string
  primaryClassName: string
  itemClassName: string
  labels: {
    share: string
    copy: string
    copied: string
    copyFailed: string
    native: string
  }
  onShare?: (action: ShareAction) => void
}

/**
 * Client part of ShareButtons: copy link and the system share sheet.
 * Renders nothing on the server and before hydration, so without JavaScript
 * only the plain share links are visible. It also fills the page URL and
 * title into the links when they were not passed as props.
 */
export function ShareButtonsIsland({
  url,
  title,
  copy,
  nativeShare,
  layout,
  slot = "end",
  showLabels,
  buttonClassName,
  neutralClassName,
  iconOnlyClassName,
  withLabelClassName,
  primaryClassName,
  itemClassName,
  labels: l,
  onShare,
}: ShareButtonsIslandProps) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
  const touchShare = useSyncExternalStore(noop, canNativeShare, () => false)
  const menuShare = useSyncExternalStore(
    noop,
    () =>
      canShareData({
        url: url ?? location.href,
        title: title ?? document.title,
      }),
    () => false,
  )
  const native = nativeShare && (layout === "menu" ? menuShare : touchShare)
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")
  const { copy: copyLink } = useCopyToClipboard()
  const anchor = useRef<HTMLSpanElement>(null)
  const onShareRef = useRef(onShare)
  onShareRef.current = onShare

  useEffect(() => {
    if (state === "idle") return
    const t = window.setTimeout(() => setState("idle"), 2000)
    return () => window.clearTimeout(t)
  }, [state])

  const currentUrl = () => url ?? location.href
  const currentTitle = () => title ?? document.title

  // Fill page URL and title into the links at click time
  useEffect(() => {
    if (slot === "start") return
    const root = anchor.current?.closest("[data-gooseui-share]")
    if (!root) return
    const onClick = (event: Event) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[data-share-network]",
      )
      if (!link) return
      const template = link.dataset.shareTemplate
      if (template) {
        link.href = template
          .replaceAll("__URL__", encodeURIComponent(currentUrl()))
          .replaceAll("__TITLE__", encodeURIComponent(currentTitle()))
      }
      onShareRef.current?.(link.dataset.shareNetwork as ShareAction)
    }
    root.addEventListener("click", onClick, true)
    return () => root.removeEventListener("click", onClick, true)
  }, [url, title, slot])

  const onCopy = async () => {
    const ok = await copyLink(currentUrl())
    setState(ok ? "copied" : "failed")
    if (ok) onShare?.("copy")
  }

  const onNative = () => {
    onShare?.("native")
    // Closing the sheet rejects with AbortError: that is a normal outcome.
    // Other rejections (no user gesture, blocked by policy) are not actionable
    // for the visitor either, the other buttons stay available.
    navigator
      .share({ title: currentTitle(), url: currentUrl() })
      .catch(() => {})
  }

  const copied = state === "copied"
  const failed = state === "failed"
  const copyIcon = copied ? (
    <CheckIcon />
  ) : failed ? (
    <AlertIcon />
  ) : (
    <LinkIcon />
  )
  const copyLabel = copied ? l.copied : failed ? l.copyFailed : l.copy
  const status = (
    <span role="status" aria-live="polite" className="sr-only">
      {copied ? l.copied : failed ? l.copyFailed : ""}
    </span>
  )

  if (!mounted) return <span ref={anchor} hidden />

  if (layout === "menu" && slot === "start") {
    if (!native) return <span ref={anchor} hidden />
    return (
      <>
        <span ref={anchor} hidden />
        <button type="button" className={itemClassName} onClick={onNative}>
          <ShareIcon />
          {l.native}
        </button>
        <hr className="my-1 h-px border-0 bg-border" aria-hidden />
      </>
    )
  }

  if (layout === "menu") {
    return (
      <>
        <span ref={anchor} hidden />
        {copy && (
          <>
            <hr className="my-1 h-px border-0 bg-border" aria-hidden />
            <button type="button" className={itemClassName} onClick={onCopy}>
              {copyIcon}
              {copyLabel}
            </button>
          </>
        )}
        {status}
      </>
    )
  }

  return (
    <>
      <span ref={anchor} hidden />
      {copy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={showLabels ? undefined : l.copy}
          title={showLabels ? undefined : failed ? l.copyFailed : l.copy}
          className={`${buttonClassName} ${neutralClassName} ${showLabels ? withLabelClassName : iconOnlyClassName}`}
        >
          {copyIcon}
          {showLabels && copyLabel}
        </button>
      )}
      {native && (
        <button
          type="button"
          onClick={onNative}
          className={`${buttonClassName} ${withLabelClassName} ${primaryClassName}`}
        >
          <ShareIcon />
          {l.share}
        </button>
      )}
      {status}
    </>
  )
}
