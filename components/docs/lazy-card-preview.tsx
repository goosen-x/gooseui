"use client"

import { useEffect, useRef, useState } from "react"
import { PREVIEW_COMPONENTS } from "@/components/docs/card-previews.generated"

/**
 * Mounts a catalog card preview only when the card gets close to the viewport,
 * so the catalog page does not load every registry component up front.
 */
export function LazyCardPreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  const Preview = PREVIEW_COMPONENTS[slug]

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      {visible && Preview ? <Preview /> : null}
    </div>
  )
}
