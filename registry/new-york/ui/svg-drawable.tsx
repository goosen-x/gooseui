"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Hook to inject styles into document.head
 * Uses useInsertionEffect for proper CSS-in-JS timing
 */
function useHeadStyles(css: string, id: string) {
  // useInsertionEffect is the proper hook for CSS injection (React 18+)
  React.useInsertionEffect(() => {
    if (!css || typeof document === "undefined") return

    // Check if style already exists
    let styleEl = document.getElementById(id) as HTMLStyleElement | null

    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = id
      document.head.appendChild(styleEl)
    }

    styleEl.textContent = css

    return () => {
      styleEl?.remove()
    }
  }, [css, id])
}

interface SVGDrawableProps {
  children: React.ReactElement<SVGElement>
  /** Draw range or keyframe array: "0 1" or ["0 0", "0 1", "1 1"] */
  draw?: string | string[]
  /** Animation duration in ms */
  duration?: number
  /** Animation delay in ms */
  delay?: number
  /** Stagger delay between paths (ms) */
  stagger?: number
  /** Easing function */
  ease?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  /** Animation trigger: mount, view, or hover */
  trigger?: "mount" | "view" | "hover"
  /** @deprecated Use trigger="mount" instead */
  animateOnMount?: boolean
  /** @deprecated Use trigger="view" instead */
  animateOnView?: boolean
  /** Loop animation */
  loop?: boolean
  /** Animation direction */
  direction?: "normal" | "reverse" | "alternate"
  className?: string
}

interface DrawKeyframe {
  start: number
  end: number
}

/**
 * SVG Drawable
 *
 * Animates SVG path/line/polyline/rect drawing using CSS.
 * Similar to anime.js createDrawable() but CSS-only.
 *
 * @example
 * // Simple draw animation
 * <SVGDrawable draw="0 1" duration={2000}>
 *   <svg viewBox="0 0 100 100">
 *     <path d="M10,50 Q50,10 90,50" fill="none" stroke="currentColor" />
 *   </svg>
 * </SVGDrawable>
 *
 * @example
 * // Keyframe animation with stagger
 * <SVGDrawable
 *   draw={['0 0', '0 1', '1 1']}
 *   duration={2000}
 *   stagger={100}
 *   loop
 * >
 *   <svg viewBox="0 0 100 100">
 *     <path d="..." fill="none" stroke="currentColor" />
 *     <path d="..." fill="none" stroke="currentColor" />
 *   </svg>
 * </SVGDrawable>
 */
export function SVGDrawable({
  children,
  draw = "0 1",
  duration = 1000,
  delay = 0,
  stagger = 0,
  ease = "ease-in-out",
  trigger = "mount",
  animateOnMount = true,
  animateOnView = false,
  loop = false,
  direction = "normal",
  className,
}: SVGDrawableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Handle deprecated props
  const effectiveTrigger = animateOnView ? "view" : trigger
  const shouldAnimateOnMount = trigger === "mount" && animateOnMount

  const [isVisible, setIsVisible] = React.useState(effectiveTrigger !== "view")
  const [pathData, setPathData] = React.useState<
    { length: number; index: number }[]
  >([])

  // Parse draw into keyframes array
  const keyframes = React.useMemo((): DrawKeyframe[] => {
    if (Array.isArray(draw)) {
      return draw.map((d) => {
        const parts = d.split(" ").map(Number)
        return { start: parts[0] || 0, end: parts[1] || 1 }
      })
    }
    const parts = draw.split(" ").map(Number)
    return [
      { start: 0, end: 0 }, // Start hidden
      { start: parts[0] || 0, end: parts[1] || 1 }, // End state
    ]
  }, [draw])

  // Calculate path lengths on mount
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const svg = container.querySelector("svg")
    if (!svg) return

    const paths = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle, ellipse",
    )
    const data: { length: number; index: number }[] = []

    paths.forEach((path, index) => {
      if (path instanceof SVGGeometryElement) {
        data.push({ length: path.getTotalLength(), index })
      }
    })

    setPathData(data)
  }, [children])

  // Intersection Observer for trigger="view"
  React.useEffect(() => {
    if (effectiveTrigger !== "view") return

    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!loop) {
            observer.disconnect()
          }
        } else if (loop) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [effectiveTrigger, loop])

  // Generate unique animation name
  const animationId = React.useId().replace(/:/g, "")

  // Clone SVG and apply per-path classes
  const styledChildren = React.useMemo(() => {
    if (!React.isValidElement(children)) return children

    let pathIndex = 0

    const cloneSvgWithStyles = (
      element: React.ReactElement<{ children?: React.ReactNode }>,
    ): React.ReactElement => {
      if (element.type === "svg") {
        const svgChildren = React.Children.map(
          element.props.children,
          (child) => {
            if (!React.isValidElement(child)) return child

            const tagName = typeof child.type === "string" ? child.type : ""
            const isDrawable = [
              "path",
              "line",
              "polyline",
              "polygon",
              "rect",
              "circle",
              "ellipse",
            ].includes(tagName)

            if (isDrawable) {
              const childProps = child.props as React.SVGAttributes<SVGElement>
              const currentIndex = pathIndex++
              return React.cloneElement(
                child as React.ReactElement<React.SVGAttributes<SVGElement>>,
                {
                  className: cn(
                    childProps.className,
                    `drawable-${animationId}-${currentIndex}`,
                  ),
                },
              )
            }

            return child
          },
        )

        return React.cloneElement(element, {}, svgChildren)
      }

      return element
    }

    return cloneSvgWithStyles(
      children as React.ReactElement<{ children?: React.ReactNode }>,
    )
  }, [children, animationId])

  // Calculate stroke-dashoffset for a keyframe
  const calculateOffset = (pathLength: number, kf: DrawKeyframe): number => {
    const visibleLength = (kf.end - kf.start) * pathLength
    const startOffset = kf.start * pathLength
    return pathLength - visibleLength - startOffset
  }

  // Generate CSS for each path with unique keyframes
  const cssStyles = React.useMemo(() => {
    if (pathData.length === 0) return ""

    let css = ""
    const containerId = `svg-drawable-${animationId}`

    // Hover mode uses CSS transitions
    if (effectiveTrigger === "hover") {
      pathData.forEach(({ length, index }) => {
        const pathDelay = index * stagger
        const finalKf = keyframes[keyframes.length - 1]
        const finalOffset = calculateOffset(length, finalKf)

        css += `
      .drawable-${animationId}-${index} {
        stroke-dasharray: ${length};
        stroke-dashoffset: ${length};
        transition: stroke-dashoffset ${duration}ms ${ease} ${pathDelay}ms;
      }

      .${containerId}:hover .drawable-${animationId}-${index} {
        stroke-dashoffset: ${finalOffset};
      }
`
      })
      return css
    }

    // Mount/View mode uses keyframe animations
    pathData.forEach(({ length, index }) => {
      const pathDelay = delay + index * stagger
      const animationName = `draw-${animationId}-${index}`

      // Generate keyframe percentages
      const stepPercent =
        keyframes.length > 1 ? 100 / (keyframes.length - 1) : 100
      const keyframeCSS = keyframes
        .map((kf, i) => {
          const percent = keyframes.length > 1 ? i * stepPercent : 100
          const offset = calculateOffset(length, kf)
          return `${percent}% { stroke-dashoffset: ${offset}; }`
        })
        .join("\n        ")

      css += `
      .drawable-${animationId}-${index} {
        stroke-dasharray: ${length};
        stroke-dashoffset: ${length};
        animation: ${animationName} ${duration}ms ${ease} ${pathDelay}ms ${loop ? "infinite" : "forwards"};
        animation-play-state: ${isVisible && shouldAnimateOnMount ? "running" : "paused"};
        animation-direction: ${direction};
      }

      @keyframes ${animationName} {
        ${keyframeCSS}
      }
`
    })

    return css
  }, [
    pathData,
    animationId,
    keyframes,
    duration,
    ease,
    delay,
    stagger,
    loop,
    isVisible,
    shouldAnimateOnMount,
    direction,
    effectiveTrigger,
  ])

  const containerId = `svg-drawable-${animationId}`

  // Inject styles into document.head
  useHeadStyles(cssStyles, `svg-drawable-styles-${animationId}`)

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-block",
        effectiveTrigger === "hover" && containerId,
        effectiveTrigger === "hover" && "cursor-pointer",
        className,
      )}
    >
      {styledChildren}
    </div>
  )
}

/**
 * Hook version for more control
 */
export function useDrawable(
  svgRef: React.RefObject<SVGSVGElement | null>,
  options: {
    draw?: string | string[]
    duration?: number
    delay?: number
    stagger?: number
    ease?: string
  } = {},
) {
  const {
    draw = "0 1",
    duration = 1000,
    delay = 0,
    stagger = 0,
    ease = "ease-in-out",
  } = options
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Parse draw into keyframes
  const keyframes = React.useMemo((): DrawKeyframe[] => {
    if (Array.isArray(draw)) {
      return draw.map((d) => {
        const parts = d.split(" ").map(Number)
        return { start: parts[0] || 0, end: parts[1] || 1 }
      })
    }
    const parts = draw.split(" ").map(Number)
    return [{ start: parts[0] || 0, end: parts[1] || 1 }]
  }, [draw])

  const animate = React.useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll<SVGGeometryElement>(
      "path, line, polyline, polygon, rect, circle, ellipse",
    )

    const totalDuration = duration + (paths.length - 1) * stagger

    paths.forEach((path, index) => {
      const length = path.getTotalLength()
      const pathDelay = delay + index * stagger
      const finalKeyframe = keyframes[keyframes.length - 1]
      const visibleLength = (finalKeyframe.end - finalKeyframe.start) * length

      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.transition = `stroke-dashoffset ${duration}ms ${ease} ${pathDelay}ms`

      // Trigger animation
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = `${length - visibleLength}`
      })
    })

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), totalDuration + delay)
  }, [svgRef, keyframes, duration, delay, stagger, ease])

  const reset = React.useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll<SVGGeometryElement>(
      "path, line, polyline, polygon, rect, circle, ellipse",
    )

    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.transition = "none"
      path.style.strokeDashoffset = `${length}`
    })
  }, [svgRef])

  return { animate, reset, isAnimating }
}
