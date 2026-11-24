import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"
import {
  type ShareAction,
  ShareButtonsIsland,
} from "@/registry/gooseui/ui/share-buttons.client"

export type ShareNetwork =
  | "telegram"
  | "whatsapp"
  | "x"
  | "linkedin"
  | "facebook"
  | "email"

export type ShareButtonsLabels = {
  share?: string
  copy?: string
  copied?: string
  /** Shown when the browser refused to copy. */
  copyFailed?: string
  native?: string
  /** Accessible name for a network link. */
  shareOn?: (network: string) => string
}

export type ShareButtonsProps = Omit<ComponentProps<"div">, "children"> & {
  /** Link to share. Without it the page URL is filled in on click (needs JS). */
  url?: string
  /** Title for the post. Without it `document.title` is used (needs JS). */
  title?: string
  networks?: ShareNetwork[]
  /** Show the "Copy link" action (client island, hidden without JS). */
  copy?: boolean
  /**
   * Show the system share sheet. Row: touch devices only. Menu: the first
   * item, wherever `navigator.share` accepts the data (Safari on Mac too).
   */
  nativeShare?: boolean
  /** Layout: a row of buttons or a dropdown menu. */
  layout?: "row" | "menu"
  /**
   * Row only. `default`: neutral buttons that turn into the network's brand
   * colour on hover. `brand`: buttons are in brand colours right away.
   */
  variant?: "default" | "brand" | "row" | "menu"
  /** Row only: show network names next to the glyphs. */
  showLabels?: boolean
  /** `sm` 32px, `default` 40px, `lg` 48px. */
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  labels?: ShareButtonsLabels
  /** Works only when ShareButtons is rendered from a client component. */
  onShare?: (network: ShareAction) => void
}

type Glyph = (props: { className?: string }) => ReactNode

// Stroke icons for the neutral actions (mail, share). Same 2px weight as the
// rest of the set so the row looks even next to the filled brand marks.
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

const markProps = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const

// Official marks from simple-icons (CC0). Each network has its own mark, so
// the row stays recognisable.
const glyphs: Record<Exclude<ShareNetwork, "email">, Glyph> = {
  telegram: ({ className }) => (
    <svg {...markProps} className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  whatsapp: ({ className }) => (
    <svg {...markProps} className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg {...markProps} className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg {...markProps} className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg {...markProps} className={className}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  ),
}

/**
 * Brand colours are an intentional exception to the "shadcn tokens only" rule:
 * a share button has to look like the network to be recognised. White on the
 * background must keep at least 3:1 (icons), so two brand colours are darker
 * than the logo files: Telegram #229ED9 (the classic Telegram blue, 3.0:1) and
 * WhatsApp #128C7E (the teal from the WhatsApp palette, 4.1:1; the bright
 * #25D366 gives only 2.0:1).
 */
const brandColors: Record<Exclude<ShareNetwork, "email">, string> = {
  telegram: "#229ED9",
  whatsapp: "#128C7E",
  x: "#000000",
  linkedin: "#0A66C2",
  facebook: "#0866FF",
}

const networkNames: Record<ShareNetwork, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  x: "X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  email: "Email",
}

function shareHref(network: ShareNetwork, url: string, title: string): string {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  switch (network) {
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(title ? `${title} ${url}` : url)}`
    case "x":
      return `https://x.com/intent/tweet?url=${u}&text=${t}`
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`
    case "email":
      return `mailto:?subject=${t}&body=${encodeURIComponent(title ? `${title}\n\n${url}` : url)}`
  }
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  )
}

function NetworkGlyph({
  network,
  className,
}: {
  network: ShareNetwork
  className?: string
}) {
  if (network === "email") return <MailIcon className={className} />
  const G = glyphs[network]
  return <G className={className} />
}

const sizes = {
  sm: {
    box: "h-8 text-xs",
    svg: "[&_svg]:size-4",
    icon: "w-8",
    label: "px-2.5",
    trigger: "h-8 px-3 text-xs",
  },
  default: {
    box: "h-10 text-sm",
    svg: "[&_svg]:size-5",
    icon: "w-10",
    label: "px-3.5",
    trigger: "h-10 px-4 text-sm",
  },
  lg: {
    box: "h-12 text-base",
    svg: "[&_svg]:size-6",
    icon: "w-12",
    label: "px-4",
    trigger: "h-12 px-5 text-base",
  },
} as const

function isKnownNetwork(network: string): network is ShareNetwork {
  return Object.hasOwn(networkNames, network)
}

export const defaultShareNetworks: ShareNetwork[] = [
  "telegram",
  "whatsapp",
  "x",
  "linkedin",
  "facebook",
  "email",
]

// Same pattern as the other GooseUI menus: a native popover. Without anchor
// positioning it is a sheet at the bottom of the viewport; with it, it drops
// down from the button and flips at the screen edges.
const css = `
.gooseui-share-menu {
  inset: auto 0 0 0;
  margin: 0;
  width: 100%;
  max-width: none;
  border-radius: 0.75rem 0.75rem 0 0;
  padding-bottom: max(0.375rem, env(safe-area-inset-bottom));
  opacity: 0;
  translate: 0 0.5rem;
  transition: opacity 150ms ease-out, translate 150ms ease-out,
    display 150ms allow-discrete, overlay 150ms allow-discrete;
}
.gooseui-share-menu:popover-open { opacity: 1; translate: 0 0 }
@starting-style {
  .gooseui-share-menu:popover-open { opacity: 0; translate: 0 0.5rem }
}
@media (min-width: 640px) {
  .gooseui-share-menu {
    inset: auto 0 1rem 0;
    margin-inline: auto;
    width: 18rem;
    border-radius: 0.5rem;
  }
}
@supports (anchor-name: --a) {
  .gooseui-share-trigger { anchor-name: var(--gooseui-anchor) }
  .gooseui-share-menu {
    position-anchor: var(--gooseui-anchor);
    inset: auto;
    margin: 6px 0;
    width: max-content;
    min-width: 13rem;
    max-width: calc(100vw - 1rem);
    padding-bottom: 0.375rem;
    position-area: block-end span-inline-start;
    position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline;
    translate: 0 -0.25rem;
  }
  .gooseui-share-menu[data-align="start"] { position-area: block-end span-inline-end }
  .gooseui-share-menu[data-align="center"] { position-area: block-end }
}
.gooseui-share:has(:popover-open) .gooseui-share-trigger { background: var(--accent) }
@media (prefers-reduced-motion: reduce) {
  .gooseui-share-menu { transition: none; translate: none }
}
`

/**
 * Server component. Share links and the menu (native popover) work without
 * JavaScript. Copy link and the system share sheet live in a small client
 * island that only appears after hydration.
 */
export function ShareButtons({
  url,
  title,
  networks = defaultShareNetworks,
  copy = true,
  nativeShare = true,
  layout: layoutProp = "row",
  variant: variantProp = "default",
  showLabels = false,
  size = "default",
  align = "end",
  labels,
  onShare,
  className,
  style,
  ...props
}: ShareButtonsProps) {
  // Before layout existed, variant took "row" | "menu": keep that working
  const legacy = variantProp === "row" || variantProp === "menu"
  const layout = legacy ? variantProp : layoutProp
  const variant = legacy ? "default" : variantProp
  // An unknown name (a removed network, a typo, bad JSON) is skipped
  // so one bad entry doesn't take the whole page down.
  const known = networks.filter((network) => {
    if (isKnownNetwork(network)) return true
    if (typeof process !== "undefined" && process.env.NODE_ENV !== "production")
      console.warn(`[ShareButtons] Unknown network "${network}" was skipped`)
    return false
  })
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const menuId = `share-${id}`
  const l = {
    share: labels?.share ?? "Share",
    copy: labels?.copy ?? "Copy link",
    copied: labels?.copied ?? "Link copied",
    copyFailed: labels?.copyFailed ?? "Couldn't copy the link",
    native: labels?.native ?? "More options…",
  }
  const shareOn = labels?.shareOn ?? ((name: string) => `Share on ${name}`)

  // Missing url or title become placeholders that the island fills on click.
  const templated = url === undefined || title === undefined
  const linkProps = (network: ShareNetwork) => {
    const template = shareHref(network, url ?? "__URL__", title ?? "__TITLE__")
    return {
      href: templated
        ? template.replaceAll("__URL__", "").replaceAll("__TITLE__", "")
        : template,
      "data-share-network": network,
      "data-share-template": templated ? template : undefined,
      ...(network === "email"
        ? {}
        : { target: "_blank", rel: "noopener noreferrer nofollow" }),
    }
  }

  const item =
    "flex w-full cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0"
  const sz = sizes[size]
  const btn = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border font-medium transition-colors",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:shrink-0",
    sz.box,
    sz.svg,
  )
  const neutral =
    variant === "brand"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : "bg-background text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
  // Network links: neutral until hover (default) or filled with the brand colour (brand)
  const networkTone = (network: ShareNetwork) => {
    if (network === "email") return neutral
    return variant === "brand"
      ? "bg-(--gooseui-brand) text-white [border-color:color-mix(in_oklab,var(--gooseui-brand),var(--foreground)_20%)] hover:opacity-90"
      : "bg-background text-foreground hover:bg-(--gooseui-brand) hover:text-white hover:border-(--gooseui-brand)"
  }
  const iconOnly = sz.icon
  const withLabel = sz.label

  const island = (slot: "start" | "end") => (
    <ShareButtonsIsland
      slot={slot}
      url={url}
      title={title}
      copy={copy}
      nativeShare={nativeShare}
      layout={layout}
      showLabels={showLabels}
      buttonClassName={btn}
      neutralClassName={neutral}
      iconOnlyClassName={iconOnly}
      withLabelClassName={withLabel}
      primaryClassName="border-primary bg-primary text-primary-foreground hover:bg-primary/90"
      itemClassName={item}
      labels={l}
      onShare={onShare}
    />
  )

  if (layout === "menu") {
    return (
      <div
        data-gooseui-share=""
        className={cn("gooseui-share inline-flex", className)}
        style={{ ...style, "--gooseui-anchor": `--${menuId}` } as CSSProperties}
        {...props}
      >
        <style href="gooseui-share-buttons" precedence="default">
          {css}
        </style>
        <button
          type="button"
          popoverTarget={menuId}
          className={cn(
            "gooseui-share-trigger inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background font-medium text-foreground transition-colors hover:bg-accent",
            "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:shrink-0",
            sz.trigger,
            sz.svg,
          )}
        >
          <ShareIcon />
          {l.share}
        </button>
        <div
          id={menuId}
          popover="auto"
          data-align={align}
          className="gooseui-share-menu min-w-52 border bg-background p-1.5 text-foreground shadow-lg"
        >
          {island("start")}
          {known.map((network) => (
            <a key={network} {...linkProps(network)} className={item}>
              <NetworkGlyph network={network} />
              {networkNames[network]}
            </a>
          ))}
          {island("end")}
        </div>
      </div>
    )
  }

  return (
    <div
      data-gooseui-share=""
      className={cn("flex flex-wrap items-center gap-2", className)}
      style={style}
      {...props}
    >
      {known.map((network) => (
        <a
          key={network}
          {...linkProps(network)}
          aria-label={showLabels ? undefined : shareOn(networkNames[network])}
          title={showLabels ? undefined : networkNames[network]}
          style={
            network === "email"
              ? undefined
              : ({
                  "--gooseui-brand": brandColors[network],
                } as CSSProperties)
          }
          className={cn(
            btn,
            networkTone(network),
            showLabels ? withLabel : iconOnly,
          )}
        >
          <NetworkGlyph network={network} />
          {showLabels && networkNames[network]}
        </a>
      ))}
      {island("end")}
    </div>
  )
}
