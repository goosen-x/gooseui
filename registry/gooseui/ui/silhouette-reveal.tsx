import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type SilhouetteRevealLabels = {
  /** Accessible name of the trigger while the image is hidden */
  reveal: string
  /** Text read instead of the alt while the image is hidden, so it does not give the answer away */
  hidden: string
}

const defaultLabels: SilhouetteRevealLabels = {
  reveal: "Reveal image",
  hidden: "Hidden image",
}

export type SilhouetteRevealProps = {
  /** Image URL. Works best with a transparent background (PNG, SVG, WebP) */
  src: string
  /** Alt text, read once the image is revealed */
  alt: string
  /** Revealed state set from outside. With trigger="manual" it is the only switch */
  revealed?: boolean
  /** Start revealed (click trigger) */
  defaultRevealed?: boolean
  /** What reveals the image: click, hover/focus or only the `revealed` prop */
  trigger?: "click" | "hover" | "manual"
  /** Transition duration in ms */
  duration?: number
  /** Form field name of the click checkbox, so the state reaches FormData */
  name?: string
  className?: string
  imageClassName?: string
  /** Classes for the silhouette layer. Its color is `currentColor` */
  silhouetteClassName?: string
  labels?: Partial<SilhouetteRevealLabels>
  /** Content rendered on top, for example a caption */
  children?: ReactNode
}

// Escape characters that would break a quoted CSS url()
const cssUrl = (src: string) =>
  `url("${src.replace(/["\\\n]/g, (c) => encodeURIComponent(c))}")`

// Revealed when: the prop says so, the click checkbox is checked,
// or (hover trigger) the pointer or keyboard focus is on it
const on = `[data-gooseui-silhouette]:is([data-revealed],:has(>[data-sr-input]:checked),[data-trigger=hover]:hover,[data-trigger=hover]:focus-visible)`

const css = `@layer components{
[data-sr-image]{opacity:0;scale:.95;filter:blur(4px);transition:opacity var(--sr-duration) ease-out,scale var(--sr-duration) ease-out,filter var(--sr-duration) ease-out}
[data-sr-silhouette]{transition:opacity var(--sr-duration) ease-out,scale var(--sr-duration) ease-out}
[data-sr-shown]{display:none}
${on} [data-sr-image]{opacity:1;scale:1;filter:none}
${on} [data-sr-silhouette]{opacity:0;scale:1.05}
${on} [data-sr-hidden]{display:none}
${on} [data-sr-shown]{display:inline}
${on}>[data-sr-input]{visibility:hidden}
${on}[data-trigger=click]{cursor:default}
[data-gooseui-silhouette]:has(>[data-sr-input]:focus-visible){outline:2px solid var(--ring);outline-offset:2px}
@media (prefers-reduced-motion:reduce){[data-sr-image],[data-sr-silhouette]{transition:none}}
}`

/**
 * An image shown as a solid silhouette that reveals itself.
 * Server component: the state lives in a checkbox, :hover or the prop.
 */
export function SilhouetteReveal({
  src,
  alt,
  revealed,
  defaultRevealed = false,
  trigger = "click",
  duration = 700,
  name,
  className,
  imageClassName,
  silhouetteClassName,
  labels: labelsProp,
  children,
}: SilhouetteRevealProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const mask = cssUrl(src)

  const rootProps = {
    "data-gooseui-silhouette": "",
    "data-trigger": trigger,
    "data-revealed": revealed || undefined,
    style: { "--sr-duration": `${duration}ms` } as CSSProperties,
    className: cn(
      "relative inline-block rounded-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      trigger !== "manual" && "cursor-pointer",
      className,
    ),
  }

  const layers = (
    <>
      <style href="gooseui-silhouette-reveal" precedence="default">
        {css}
      </style>
      <img
        src={src}
        alt=""
        draggable={false}
        data-sr-image=""
        className={cn(
          "block h-full w-full select-none object-contain",
          imageClassName,
        )}
      />
      <span
        aria-hidden
        data-sr-silhouette=""
        className={cn(
          "pointer-events-none absolute inset-0 bg-current",
          silhouetteClassName,
        )}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span className="sr-only" data-sr-hidden="">
        {labels.hidden}
      </span>
      <span className="sr-only" data-sr-shown="">
        {alt}
      </span>
      {children}
    </>
  )

  if (trigger === "click") {
    return (
      <label {...rootProps}>
        <input
          type="checkbox"
          name={name}
          aria-label={labels.reveal}
          defaultChecked={defaultRevealed || revealed}
          data-sr-input=""
          className="sr-only"
        />
        {layers}
      </label>
    )
  }

  if (trigger === "hover") {
    return (
      <div {...rootProps} tabIndex={0} role="group" aria-label={labels.reveal}>
        {layers}
      </div>
    )
  }

  return <div {...rootProps}>{layers}</div>
}
