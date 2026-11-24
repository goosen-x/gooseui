import {
  Children,
  type ComponentProps,
  type CSSProperties,
  isValidElement,
  type ReactElement,
} from "react"
import { cn } from "@/lib/utils"

export type AvatarSize = "sm" | "md" | "lg"
export type AvatarStatus = "online" | "away" | "busy"
export type AvatarGroupSpacing = "tight" | "normal" | "loose"

export type AvatarProps = Omit<ComponentProps<"span">, "children"> & {
  /** Full name. Used for initials, the fallback color and the accessible label */
  name?: string
  /** Image URL. Initials show while it loads, when it is missing and when it fails */
  src?: string
  /** Accessible label. Defaults to `name` */
  alt?: string
  /** Defaults to the size of the surrounding `AvatarGroup`, or `"md"` */
  size?: AvatarSize
  /** Presence dot in the bottom corner */
  status?: AvatarStatus
  /** Words for the status in the accessible label */
  statusLabels?: Partial<Record<AvatarStatus, string>>
}

export type AvatarGroupProps = ComponentProps<"div"> & {
  /** Avatars shown before the "+N" bubble. Shows all when omitted */
  max?: number
  size?: AvatarSize
  /** How much the avatars overlap at rest */
  spacing?: AvatarGroupSpacing
  /** Spread the avatars apart on hover and keyboard focus */
  fanOut?: boolean
  /** Turns the "+N" bubble into a link, e.g. to the full member list */
  overflowHref?: string
  /** Text for the "+N" tooltip and accessible name */
  overflowLabel?: (count: number, names: string[]) => string
  /** Makes each avatar a button. Client components only: functions cannot cross the server boundary */
  onAvatarClick?: (avatar: { index: number; name?: string }) => void
  /** Makes the "+N" bubble a button. Client components only */
  onOverflowClick?: () => void
}

const SIZES: Record<AvatarSize, { size: string; font: string }> = {
  sm: { size: "1.75rem", font: "0.6875rem" },
  md: { size: "2.25rem", font: "0.75rem" },
  lg: { size: "3rem", font: "0.875rem" },
}
const OVERLAP: Record<AvatarGroupSpacing, number> = {
  tight: 0.45,
  normal: 0.3,
  loose: 0.15,
}
const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: "online",
  away: "away",
  busy: "busy",
}

// Size comes from --avatar-size / --avatar-font: an Avatar with a size prop
// sets them inline, otherwise it inherits them from the group (no context, so
// both components stay server components).
// The image is a background layer over the initials: a URL that fails to load
// paints nothing, so the initials stay visible without onError or JavaScript.
// Stacking order and stagger come from the item's position. Where
// sibling-index()/sibling-count() exist they are used directly; elsewhere the
// same rules read --i/--n, which are set inline on every item.
const STYLES = `@layer components {
.gooseui-avatar {
  --_size: var(--avatar-size, 2.25rem);
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--_size);
  height: var(--_size);
  border-radius: 9999px;
  font-size: var(--avatar-font, 0.75rem);
  font-weight: 600;
  line-height: 1;
  user-select: none;
  background-color: var(--muted);
  color: var(--muted-foreground);
}
.gooseui-avatar[data-tinted] {
  --_tint: oklch(0.65 0.15 var(--avatar-hue));
  background-color: color-mix(in oklch, var(--_tint) 25%, var(--background));
  color: color-mix(in oklch, var(--_tint) 50%, var(--foreground));
}
.gooseui-avatar-image {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--avatar-src) center / cover no-repeat;
}
.gooseui-avatar-status {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(var(--_size) * 0.27);
  height: calc(var(--_size) * 0.27);
  border-radius: 9999px;
  box-shadow: 0 0 0 2px var(--avatar-ring, var(--background));
}
.gooseui-avatar-group {
  --_overlap: calc(var(--avatar-size) * var(--avatar-overlap) * -1);
  --_spread: calc(var(--avatar-size) * 0.12);
  --_stagger: 30ms;
}
.gooseui-avatar-group .gooseui-avatar,
.gooseui-avatar-overflow {
  box-shadow: 0 0 0 2px var(--avatar-ring, var(--background));
}
.gooseui-avatar-overflow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: 9999px;
  font-size: var(--avatar-font);
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background-color: var(--muted);
  color: var(--muted-foreground);
}
.gooseui-avatar-group > .gooseui-avatar-item {
  position: relative;
  display: flex;
  margin-inline-start: var(--_overlap);
  z-index: calc(var(--n) - var(--i) + 1);
  transition: margin-inline-start 220ms cubic-bezier(.2,.8,.2,1), translate 160ms ease;
  transition-delay: calc((var(--n) - var(--i)) * var(--_stagger)), 0ms;
}
.gooseui-avatar-group > .gooseui-avatar-item:first-child { margin-inline-start: 0; }
.gooseui-avatar-group[data-fan-out]:is(:hover, :focus-within) > .gooseui-avatar-item:not(:first-child) {
  margin-inline-start: var(--_spread);
  transition-delay: calc((var(--i) - 1) * var(--_stagger)), 0ms;
}
.gooseui-avatar-group > .gooseui-avatar-item:is(:hover, :focus-within) {
  z-index: 100;
  translate: 0 -3px;
}
@supports (z-index: sibling-index()) {
  .gooseui-avatar-group > .gooseui-avatar-item {
    z-index: calc(sibling-count() - sibling-index() + 1);
    transition-delay: calc((sibling-count() - sibling-index()) * var(--_stagger)), 0ms;
  }
  .gooseui-avatar-group[data-fan-out]:is(:hover, :focus-within) > .gooseui-avatar-item:not(:first-child) {
    transition-delay: calc((sibling-index() - 1) * var(--_stagger)), 0ms;
  }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-avatar-group > .gooseui-avatar-item { transition: none; }
  .gooseui-avatar-group > .gooseui-avatar-item:is(:hover, :focus-within) { translate: none; }
}
}`

function Styles() {
  return (
    <style href="gooseui-avatar-group" precedence="default">
      {STYLES}
    </style>
  )
}

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
}

function hueFromName(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % 360
}

function initialsFromName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ""
  const first = words[0][0] ?? ""
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : ""
  return (first + last).toUpperCase()
}

function sizeVars(size: AvatarSize | undefined) {
  if (!size) return undefined
  return {
    "--avatar-size": SIZES[size].size,
    "--avatar-font": SIZES[size].font,
  }
}

/** Round avatar with an initials fallback and a color derived from the name */
export function Avatar({
  name,
  src,
  alt,
  size,
  status,
  statusLabels,
  className,
  style,
  title,
  ...props
}: AvatarProps) {
  const label = alt ?? name
  const statusText = status
    ? (statusLabels?.[status] ?? STATUS_LABELS[status])
    : undefined
  const fullLabel = label
    ? statusText
      ? `${label} (${statusText})`
      : label
    : statusText
  const initials = name ? initialsFromName(name) : ""

  return (
    <span
      data-slot="avatar"
      data-size={size}
      data-status={status}
      data-tinted={name ? "" : undefined}
      role="img"
      aria-label={fullLabel}
      title={title ?? fullLabel}
      className={cn("gooseui-avatar", className)}
      style={
        {
          ...sizeVars(size),
          "--avatar-hue": name ? hueFromName(name) : undefined,
          // JSON.stringify quotes and escapes the URL for the CSS string
          "--avatar-src": src ? `url(${JSON.stringify(src)})` : undefined,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <Styles />
      {initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[55%]"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      )}
      {src && (
        <span
          data-slot="avatar-image"
          aria-hidden="true"
          className="gooseui-avatar-image"
        />
      )}
      {status && (
        <span
          data-slot="avatar-status"
          aria-hidden="true"
          className={cn("gooseui-avatar-status", statusClasses[status])}
        />
      )}
    </span>
  )
}

const focusRing =
  "rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--avatar-ring,var(--background))]"

const defaultOverflowLabel = (count: number, names: string[]) =>
  names.length > 0 ? `${count} more: ${names.join(", ")}` : `${count} more`

/** Overlapping stack of `Avatar`s with a "+N" bubble that fans out on hover and focus */
export function AvatarGroup({
  max,
  size = "md",
  spacing = "normal",
  fanOut = true,
  overflowHref,
  overflowLabel = defaultOverflowLabel,
  onAvatarClick,
  onOverflowClick,
  className,
  style,
  children,
  ...props
}: AvatarGroupProps) {
  const all = Children.toArray(children).filter(isValidElement) as ReactElement<
    Partial<AvatarProps>
  >[]
  const limit = max != null && max < all.length ? Math.max(0, max) : all.length
  const visible = all.slice(0, limit)
  const hidden = all.slice(limit)
  const hiddenNames = hidden
    .map((child) => child.props.name)
    .filter((name): name is string => Boolean(name))
  const count = visible.length + (hidden.length > 0 ? 1 : 0)
  const moreLabel = overflowLabel(hidden.length, hiddenNames)

  const itemStyle = (index: number) =>
    ({ "--i": index + 1, "--n": count }) as CSSProperties

  const bubbleClasses = cn(
    "gooseui-avatar-overflow",
    (overflowHref || onOverflowClick) &&
      cn(
        focusRing,
        "cursor-pointer hover:bg-accent hover:text-accent-foreground",
      ),
  )

  return (
    <div
      data-slot="avatar-group"
      data-fan-out={fanOut ? "" : undefined}
      role="list"
      className={cn("gooseui-avatar-group inline-flex items-center", className)}
      style={
        {
          "--avatar-size": SIZES[size].size,
          "--avatar-font": SIZES[size].font,
          "--avatar-overlap": OVERLAP[spacing],
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <Styles />
      {visible.map((child, index) => (
        <div
          key={child.key ?? index}
          role="listitem"
          data-slot="avatar-group-item"
          className="gooseui-avatar-item"
          style={itemStyle(index)}
        >
          {onAvatarClick ? (
            <button
              type="button"
              className={cn("flex cursor-pointer", focusRing)}
              onClick={() => onAvatarClick({ index, name: child.props.name })}
            >
              {child}
            </button>
          ) : (
            child
          )}
        </div>
      ))}
      {hidden.length > 0 && (
        <div
          role="listitem"
          data-slot="avatar-group-item"
          className="gooseui-avatar-item"
          style={itemStyle(visible.length)}
        >
          {onOverflowClick ? (
            <button
              type="button"
              data-slot="avatar-group-overflow"
              title={moreLabel}
              aria-label={moreLabel}
              onClick={onOverflowClick}
              className={bubbleClasses}
            >
              +{hidden.length}
            </button>
          ) : overflowHref ? (
            <a
              href={overflowHref}
              data-slot="avatar-group-overflow"
              title={moreLabel}
              aria-label={moreLabel}
              className={bubbleClasses}
            >
              +{hidden.length}
            </a>
          ) : (
            <span
              data-slot="avatar-group-overflow"
              role="img"
              title={moreLabel}
              aria-label={moreLabel}
              className={bubbleClasses}
            >
              +{hidden.length}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
