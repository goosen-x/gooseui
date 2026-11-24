"use client"

import { type RefObject, useEffect, useMemo, useRef, useState } from "react"
import {
  type ScrollSpyRoot,
  useScrollSpy,
} from "@/registry/gooseui/hooks/use-scroll-spy"

type Collected = { id: string; title: string; level: number }

export type TocScrollspySpyProps = {
  /** Ids of server-rendered links. Ignored when `selector` is set */
  ids?: string[]
  selector?: string
  container?: HTMLElement | null | RefObject<HTMLElement | null>
  root?: ScrollSpyRoot
  offset: number
  updateHash: boolean
  onNavigate?: (id: string) => void
}

function resolveEl(
  value: HTMLElement | null | undefined | RefObject<HTMLElement | null>,
): HTMLElement | null {
  if (!value) return null
  if (value instanceof HTMLElement) return value
  return value.current
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Client part of TocScrollspy: highlights the active link and makes
 * clicks scroll smoothly with an offset. The links
 * themselves are plain anchors and work without it.
 */
export function TocScrollspySpy({
  ids: idsProp,
  selector,
  container,
  root,
  offset,
  updateHash,
  onNavigate,
}: TocScrollspySpyProps) {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const [collected, setCollected] = useState<Collected[]>([])

  // Selector mode: collect headings and render the list on the client
  useEffect(() => {
    if (!selector) return
    const scope = resolveEl(container) ?? document
    const read = () => {
      const next: Collected[] = []
      for (const el of scope.querySelectorAll<HTMLElement>(selector)) {
        const title = el.textContent?.trim() ?? ""
        if (!el.id) {
          const base = slugify(title) || "section"
          let id = base
          for (let n = 2; document.getElementById(id); n++) id = `${base}-${n}`
          el.id = id
        }
        const level = /^H([1-6])$/.exec(el.tagName)?.[1]
        next.push({ id: el.id, title, level: level ? Number(level) : 2 })
      }
      setCollected((prev) =>
        prev.length === next.length &&
        prev.every((p, i) => p.id === next[i].id && p.title === next[i].title)
          ? prev
          : next,
      )
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(scope, { childList: true, subtree: true, characterData: true })
    return () => mo.disconnect()
  }, [selector, container])

  const ids = useMemo(
    () => (selector ? collected.map((c) => c.id) : (idsProp ?? [])),
    [selector, collected, idsProp],
  )
  const spied = useScrollSpy(ids, { root, offset: offset + 8 })

  // While a click-triggered smooth scroll runs, keep the clicked item active
  const [pinned, setPinned] = useState<string | null>(null)
  const activeId = pinned ?? spied

  useEffect(() => {
    if (!pinned) return
    const target: HTMLElement | Window = resolveEl(root) ?? window
    let timer = window.setTimeout(() => setPinned(null), 1200)
    const release = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setPinned(null), 80)
    }
    target.addEventListener("scrollend", release)
    return () => {
      window.clearTimeout(timer)
      target.removeEventListener("scrollend", release)
    }
  }, [pinned, root])

  // aria-current marks the single active link
  useEffect(() => {
    const nav = anchorRef.current?.closest("[data-toc-scrollspy]")
    if (!nav) return
    for (const link of nav.querySelectorAll<HTMLElement>("[data-toc-id]")) {
      if (link.dataset.tocId === activeId) {
        link.setAttribute("aria-current", "location")
      } else link.removeAttribute("aria-current")
    }
  }, [activeId, ids])

  // Smooth scroll with offset, focus move and optional hash update
  useEffect(() => {
    const nav = anchorRef.current?.closest("[data-toc-scrollspy]")
    if (!nav) return
    const onClick = (event: Event) => {
      const e = event as MouseEvent
      const link = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-toc-id]",
      )
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)
        return
      const id = link.dataset.tocId ?? ""
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
      const behavior: ScrollBehavior = reduce ? "auto" : "smooth"
      const rootEl = resolveEl(root)
      if (rootEl) {
        const top =
          el.getBoundingClientRect().top -
          rootEl.getBoundingClientRect().top +
          rootEl.scrollTop -
          offset
        rootEl.scrollTo({ top, behavior })
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior })
      }
      if (updateHash) history.replaceState(history.state, "", `#${id}`)
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
      el.focus({ preventScroll: true })
      setPinned(id)
      onNavigate?.(id)
    }
    nav.addEventListener("click", onClick)
    return () => nav.removeEventListener("click", onClick)
  }, [root, offset, updateHash, onNavigate])

  if (!selector) return <span ref={anchorRef} hidden />

  const base = Math.min(...collected.map((c) => c.level))
  return (
    <>
      <span ref={anchorRef} hidden />
      <ul className="space-y-2">
        {collected.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-toc-id={item.id}
              style={{
                paddingLeft: `${item.level === base ? 0 : 0.5 + (item.level - base) * 0.5}rem`,
              }}
              className="block cursor-pointer rounded-sm text-[0.8rem] leading-snug text-muted-foreground no-underline transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:font-medium aria-[current=location]:text-foreground"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
