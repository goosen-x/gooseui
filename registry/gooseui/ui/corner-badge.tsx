import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type CornerBadgeCorner = "tl" | "tr" | "bl" | "br"

export type CornerBadgeColor =
  | "primary"
  | "secondary"
  | "muted"
  | "foreground"
  | "destructive"
  | "background"

export type CornerBadgeVariant = "badge" | "photo"

export type CornerBadgeProps = ComponentProps<"div"> & {
  /**
   * `badge` fills the shape with a color. `photo` cuts the corner out of
   * the card with a CSS mask and sets an image or children into the cut.
   * The badge must be a direct child of the card
   */
  variant?: CornerBadgeVariant
  /** Image URL for the `photo` variant */
  src?: string
  /** Alt text of the image. Empty string marks it as decorative */
  alt?: string
  /** Shape of the inset photo */
  shape?: "circle" | "rounded"
  /** Gap between the photo and the cut edge in px (`--corner-photo-gap`) */
  gap?: number
  /** Card corner the badge sits in */
  corner?: CornerBadgeCorner
  /** Badge side in px (`--corner-photo-size` for `photo`) */
  size?: number
  /**
   * Radius of the concave notches in px. Default: 40% of size.
   * For `photo` it is the fillet where the cut meets the card edges
   * (default 16, `--corner-photo-fillet`)
   */
  notch?: number
  /**
   * Radius of the badge's inner corner in px. Default: same as notch.
   * For `photo` with `shape="rounded"` it is the photo radius
   * (default 25% of size, `--corner-photo-radius`)
   */
  radius?: number
  /**
   * Token color of the `badge` variant. Override with `--corner-badge-bg`
   * (any CSS background, gradients included) and `--corner-badge-fg`.
   * The `photo` variant has no fill and ignores it
   */
  color?: CornerBadgeColor
}

const colors: Record<CornerBadgeColor, [string, string]> = {
  primary: ["var(--primary)", "var(--primary-foreground)"],
  secondary: ["var(--secondary)", "var(--secondary-foreground)"],
  muted: ["var(--muted)", "var(--foreground)"],
  foreground: ["var(--foreground)", "var(--background)"],
  destructive: ["var(--destructive)", "var(--primary-foreground)"],
  background: ["var(--background)", "var(--foreground)"],
}

const STYLES = `
.gooseui-corner-badge-fill {
  background: var(--corner-badge-bg, var(--cb-default-bg));
  background-size: var(--cb-canvas) var(--cb-canvas);
  background-position: var(--cb-x) var(--cb-y);
  background-repeat: no-repeat;
}
`

// How far the mask extends past the card, so box-shadow survives the cut
const BLEED = 48

type Layer = {
  image: string
  size: string
  pos: string
  op: "add" | "subtract"
}

const px = (e: string) => `calc((${e}) * 1px)`
const solid = "linear-gradient(#000, #000)"
const disc = (cx: string, cy: string, r: string, h: string, v: string) =>
  `radial-gradient(circle at ${h} ${px(cx)} ${v} ${px(cy)}, #000 calc(${px(r)} - 0.5px), transparent ${px(r)})`
const hole = (cx: string, cy: string, r: string, h: string, v: string) =>
  `radial-gradient(circle at ${h} ${px(cx)} ${v} ${px(cy)}, transparent calc(${px(r)} - 0.5px), #000 ${px(r)})`

/**
 * The card is cut by a mask: solid fill minus the corner cut, plus the photo
 * window put back. Everything is built from the --corner-photo-* variables
 * (plain numbers, px). The cut is concentric with the photo: a circle of
 * radius R + gap (or a rounded square of radius r + gap), so the gap is
 * even along the whole arc. Where the cut meets the card edges it is
 * rounded by fillets tangent to both the cut and the edge, so the card
 * has no steps.
 */
function photoRule(
  key: string,
  corner: CornerBadgeCorner,
  round: boolean,
  d: { size: number; gap: number; fillet: number; radius: number },
) {
  const h = corner[1] === "l" ? "left" : "right"
  const v = corner[0] === "t" ? "top" : "bottom"
  const B = BLEED
  const at = (x: string, y: string) => `${h} ${px(x)} ${v} ${px(y)}`
  const L: Layer[] = []
  const add = (
    image: string,
    w: string,
    hh: string,
    x: string,
    y: string,
    op: "add" | "subtract" = "add",
  ) => L.push({ image, size: `${px(w)} ${px(hh)}`, pos: at(x, y), op })

  // 1. photo window, put back so the photo is not masked out
  if (round) {
    add(solid, "var(--_p) - 2 * var(--_r)", "var(--_p)", "var(--_r)", "0")
    add(solid, "var(--_p)", "var(--_p) - 2 * var(--_r)", "0", "var(--_r)")
    const q = (x: string, y: string, cx: string, cy: string) =>
      add(disc(cx, cy, "var(--_r)", h, v), "var(--_r)", "var(--_r)", x, y)
    q("0", "0", "var(--_r)", "var(--_r)")
    q("var(--_p) - var(--_r)", "0", "0", "var(--_r)")
    q("0", "var(--_p) - var(--_r)", "var(--_r)", "0")
    q("var(--_p) - var(--_r)", "var(--_p) - var(--_r)", "0", "0")
  } else {
    add(
      disc("var(--_r)", "var(--_r)", "var(--_r)", h, v),
      "var(--_p)",
      "var(--_p)",
      "0",
      "0",
    )
  }

  // 2. the card fill (bleeds past the card for the shadow)
  L.push({
    image: solid,
    size: `calc(100% + ${B * 2}px) calc(100% + ${B * 2}px)`,
    pos: `${-B}px ${-B}px`,
    op: "subtract",
  })

  // 3. the cut and its fillets
  if (round) {
    const e = "var(--_p) + var(--_g)"
    const arm = "var(--_p) - var(--_r)"
    add(solid, `${e} + ${B}`, `${arm} + ${B}`, `-${B}`, `-${B}`)
    add(solid, `${arm} + ${B}`, `${e} + ${B}`, `-${B}`, `-${B}`)
    add(
      disc("0", "0", "var(--_rc)", h, v),
      "var(--_rc)",
      "var(--_rc)",
      arm,
      arm,
    )
    add(
      hole("var(--_f)", "var(--_f)", "var(--_f)", h, v),
      "var(--_f)",
      "var(--_f)",
      e,
      "0",
    )
    add(
      hole("var(--_f)", "var(--_f)", "var(--_f)", h, v),
      "var(--_f)",
      "var(--_f)",
      "0",
      e,
    )
  } else {
    add(
      disc(`var(--_r) + ${B}`, `var(--_r) + ${B}`, "var(--_rc)", h, v),
      `var(--_r) + var(--_rc) + ${B}`,
      `var(--_r) + var(--_rc) + ${B}`,
      `-${B}`,
      `-${B}`,
    )
    add(
      hole("var(--_xf)", "var(--_f)", "var(--_f)", h, v),
      "var(--_xf)",
      "var(--_ty)",
      "0",
      "0",
    )
    add(
      hole("var(--_f)", "var(--_xf)", "var(--_f)", h, v),
      "var(--_ty)",
      "var(--_xf)",
      "0",
      "0",
    )
  }

  // The first layer is the top one: window adds, fill subtracts the rest
  const ops = L.map((l, i) => (i === 0 ? "add" : l.op))
  const radius = round
    ? "var(--corner-photo-radius, " + d.radius + ")"
    : "calc(var(--_p) / 2)"
  const fillet = round
    ? `min(var(--corner-photo-fillet, ${d.fillet}), calc(var(--_p) - var(--_r)))`
    : `var(--corner-photo-fillet, ${d.fillet})`
  return `*:has(> [data-gooseui-cb="${key}"]) {
  --_p: var(--corner-photo-size, ${d.size});
  --_g: var(--corner-photo-gap, ${d.gap});
  --_r: ${radius};
  --_f: ${fillet};
  --_rc: calc(var(--_r) + var(--_g));
  --_xf: calc(var(--_r) + sqrt(pow(var(--_rc) + var(--_f), 2) - pow(var(--_r) - var(--_f), 2)));
  --_ty: calc(var(--_r) - var(--_rc) * (var(--_r) - var(--_f)) / (var(--_rc) + var(--_f)));
  mask-image: ${L.map((l) => l.image).join(", ")};
  mask-size: ${L.map((l) => l.size).join(", ")};
  mask-position: ${L.map((l) => l.pos).join(", ")};
  mask-composite: ${ops.join(", ")};
  mask-repeat: no-repeat;
  mask-origin: border-box;
  mask-clip: no-clip;
}`
}

// Opposite corner of the card corner: [vertical, horizontal]
const inner: Record<CornerBadgeCorner, ["top" | "bottom", "left" | "right"]> = {
  tl: ["bottom", "right"],
  tr: ["bottom", "left"],
  bl: ["top", "right"],
  br: ["top", "left"],
}

/**
 * Badge for a card corner with concave notches on both sides.
 * The card needs `position: relative`. The outer corner inherits
 * the card's border radius, so it fits any rounding.
 * With `variant="photo"` the corner is cut out of the card by a mask.
 */
export function CornerBadge({
  variant = "badge",
  src,
  alt = "",
  shape = "circle",
  gap = 4,
  corner = "tr",
  size = 48,
  notch,
  radius,
  color,
  className,
  style,
  children,
  ...props
}: CornerBadgeProps) {
  const photo = variant === "photo"
  const tone = color ?? "primary"
  const n = notch ?? Math.round(size * 0.4)
  const r = radius ?? n
  const canvas = size + n
  const [v, h] = inner[corner]
  const top = corner[0] === "t"
  const left = corner[1] === "l"

  // All three pieces share one background canvas, so gradients run through
  // the badge and both notches without a visible joint.
  const at = (x: number, y: number): CSSProperties =>
    ({ "--cb-x": `${-x}px`, "--cb-y": `${-y}px` }) as CSSProperties

  const badgeX = left ? 0 : n
  const badgeY = top ? 0 : n
  const mask = `radial-gradient(circle at ${v} ${h}, transparent ${n - 0.5}px, #000 ${n}px)`

  // Notch running along the horizontal card edge, next to the badge
  const edgeX: CSSProperties = {
    width: n,
    height: n,
    [top ? "top" : "bottom"]: 0,
    [left ? "left" : "right"]: "100%",
    mask,
    WebkitMask: mask,
    ...at(left ? size : 0, top ? 0 : size),
  }
  // Notch running along the vertical card edge, below or above the badge
  const edgeY: CSSProperties = {
    width: n,
    height: n,
    [left ? "left" : "right"]: 0,
    [top ? "top" : "bottom"]: "100%",
    mask,
    WebkitMask: mask,
    ...at(left ? 0 : size, top ? size : 0),
  }

  const radiusKey = `border${top ? "Top" : "Bottom"}${left ? "Left" : "Right"}Radius`
  const innerRadiusKey = `border${v === "top" ? "Top" : "Bottom"}${h === "left" ? "Left" : "Right"}Radius`

  if (photo) {
    const round = shape === "rounded"
    const d = {
      size,
      gap,
      fillet: notch ?? 16,
      radius: radius ?? Math.round(size * 0.25),
    }
    const maskKey = `${corner}-${size}-${gap}-${d.fillet}-${d.radius}-${shape}`
    const side = px("var(--corner-photo-size, " + size + ")")
    return (
      <div
        data-gooseui-cb={maskKey}
        className={cn(
          "absolute z-10 flex items-center justify-center text-sm font-semibold",
          top ? "top-0" : "bottom-0",
          left ? "left-0" : "right-0",
          className,
        )}
        style={{ width: side, height: side, ...style }}
        {...props}
      >
        <style href={`gooseui-corner-badge-${maskKey}`} precedence="default">
          {photoRule(maskKey, corner, round, d)}
        </style>
        {(src || children) && (
          <span
            className={cn(
              "relative flex size-full items-center justify-center overflow-hidden bg-muted text-sm font-semibold text-foreground",
              !round && "rounded-full",
            )}
            style={
              round
                ? {
                    borderRadius: px(
                      "var(--corner-photo-radius, " + d.radius + ")",
                    ),
                  }
                : undefined
            }
          >
            {src ? (
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="size-full object-cover"
              />
            ) : (
              children
            )}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "gooseui-corner-badge-fill absolute z-10 flex items-center justify-center text-sm font-semibold",
        top ? "top-0" : "bottom-0",
        left ? "left-0" : "right-0",
        className,
      )}
      style={
        {
          width: size,
          height: size,
          color: `var(--corner-badge-fg, ${colors[tone][1]})`,
          "--cb-default-bg": colors[tone][0],
          "--cb-canvas": `${canvas}px`,
          [radiusKey]: "inherit",
          [innerRadiusKey]: r,
          ...at(badgeX, badgeY),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <style href="gooseui-corner-badge" precedence="default">
        {STYLES}
      </style>
      <span
        aria-hidden="true"
        className="gooseui-corner-badge-fill pointer-events-none absolute"
        style={edgeX}
      />
      <span
        aria-hidden="true"
        className="gooseui-corner-badge-fill pointer-events-none absolute"
        style={edgeY}
      />
      {children}
    </div>
  )
}
