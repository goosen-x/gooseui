import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"
import { MegaMenuDismiss } from "@/registry/gooseui/ui/mega-menu.client"

export type MegaMenuLink = {
  label: string
  href: string
  description?: string
  icon?: ReactNode
}

export type MegaMenuCategory = {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  links: MegaMenuLink[]
  /** Extra content under the links, e.g. a "View all" link or a promo. */
  footer?: ReactNode
}

export type MegaMenuLinkRenderProps = {
  href: string
  className: string
  "data-mega-link": ""
  children: ReactNode
}

export type MegaMenuProps = Omit<ComponentProps<"div">, "children"> & {
  categories: MegaMenuCategory[]
  defaultOpen?: boolean
  /** "auto" switches to the accordion below `breakpoint`. */
  layout?: "auto" | "columns" | "accordion"
  breakpoint?: number
  /** Hover delays in ms (mouse and trackpad only). */
  openDelay?: number
  closeDelay?: number
  /** Delay before a hovered category replaces the current one, ms. */
  aimDelay?: number
  /** Which edge of the trigger the panel lines up with. */
  align?: "start" | "end"
  /** Custom trigger content. */
  trigger?: ReactNode
  labels?: { trigger?: string }
  panelClassName?: string
  /** Render links with your router's link component. */
  renderLink?: (link: MegaMenuLink, props: MegaMenuLinkRenderProps) => ReactNode
}

// Open state lives in <details>: click, Enter and tap work without JS.
// On mouse devices the panel also shows on :hover, delays come from transition-delay.
const css = `
.gm{--mm-delay:var(--mm-close)}
.gm>details>summary{list-style:none}
.gm>details>summary::-webkit-details-marker{display:none}
.gm-panel{position:absolute;top:100%;left:0;z-index:50;padding-top:.5rem;visibility:hidden;opacity:0;translate:0 -4px;
transition:opacity 150ms ease var(--mm-delay),translate 150ms ease var(--mm-delay),visibility 0s linear calc(var(--mm-delay) + 150ms)}
.gm[data-align=end]>.gm-panel{left:auto;right:0}
.gm:has(>details[open])>.gm-panel{--mm-delay:0ms;visibility:visible;opacity:1;translate:none;transition-delay:0ms}
.gm:has(>details[open]) .gm-chev-main{rotate:180deg}
.gm-cols{position:relative;display:grid;grid-template-columns:12rem 1fr;min-height:15rem}
.gm-sub{position:absolute;inset:0 0 0 12rem;overflow-y:auto;visibility:hidden;opacity:0;
transition:opacity 120ms ease var(--mm-aim),visibility 0s linear var(--mm-aim)}
.gm-cat:has(:checked)>.gm-sub{visibility:visible;opacity:1}
.gm-cat:has(:checked)>.gm-row{background:var(--accent);color:var(--accent-foreground)}
.gm-row:has(:focus-visible){box-shadow:0 0 0 2px var(--ring)}
.gm-acc details[open]>summary .gm-chev{rotate:180deg}
.gm-acc summary{list-style:none}
.gm-acc summary::-webkit-details-marker{display:none}
@media (hover:hover) and (pointer:fine){
.gm-cats:has(>.gm-cat:hover)>.gm-cat:not(:hover)>.gm-sub{visibility:hidden;opacity:0}
.gm-cats:has(>.gm-cat:hover)>.gm-cat:not(:hover)>.gm-row{background:none;color:inherit}
.gm-cat:hover>.gm-sub{visibility:visible;opacity:1;z-index:1}
.gm-cat:hover>.gm-row{background:var(--accent);color:var(--accent-foreground)}
}
@supports (anchor-name:--a){
.gm>details>summary{anchor-name:var(--mm-anchor)}
.gm>.gm-panel{position:fixed;position-anchor:var(--mm-anchor);top:anchor(bottom);left:anchor(left);right:auto;position-try-fallbacks:flip-inline,--gm-fit}
@position-try --gm-fit{top:anchor(bottom);left:1rem;right:auto}
.gm[data-align=end]>.gm-panel{left:auto;right:anchor(right)}
}
@media (prefers-reduced-motion:reduce){.gm-panel,.gm-sub,.gm-chev,.gm-chev-main{translate:none;transition-duration:0s}}
`

// Rules that depend on the layout: hover opening only makes sense with columns
const columnsRules = (s: string) =>
  `${s} .gm-acc{display:none}
@media (hover:hover) and (pointer:fine){${s}:hover>.gm-panel{--mm-delay:var(--mm-open);visibility:visible;opacity:1;translate:none}}`
const accordionRules = (s: string) => `${s} .gm-cols{display:none}`

const staticCss = `${css}
${columnsRules(".gm[data-layout=columns]")}
${accordionRules(".gm[data-layout=accordion]")}`

const breakpointCss = (bp: number) => {
  const s = `.gm[data-layout=auto][data-bp="${bp}"]`
  return `@media (min-width:${bp}px){${columnsRules(s)}}
@media (max-width:${bp - 0.02}px){${accordionRules(s)}}`
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

const linkClass =
  "group flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent focus-visible:bg-accent outline-none focus-visible:ring-2 focus-visible:ring-ring"

const rowClass =
  "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring"

const cardClass =
  "overflow-hidden rounded-xl border bg-background text-foreground shadow-lg"

export function MegaMenu({
  categories,
  defaultOpen = false,
  layout = "auto",
  breakpoint = 768,
  openDelay = 120,
  closeDelay = 280,
  aimDelay = 100,
  align = "start",
  trigger,
  labels,
  className,
  panelClassName,
  renderLink,
  style,
  ...props
}: MegaMenuProps) {
  const baseId = useId()
  const rootId = `${baseId}-root`
  const panelId = `${baseId}-panel`
  const anchor = `--mm${baseId.replace(/[^a-zA-Z0-9_-]/g, "")}`

  const renderLinks = (category: MegaMenuCategory, twoColumns: boolean) => (
    <ul className={cn("grid gap-0.5", twoColumns && "sm:grid-cols-2")}>
      {category.links.map((link) => {
        const children = (
          <>
            {link.icon && (
              <span
                aria-hidden
                className="mt-0.5 text-muted-foreground [&_svg]:size-4"
              >
                {link.icon}
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-medium text-foreground">
                {link.label}
              </span>
              {link.description && (
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                  {link.description}
                </span>
              )}
            </span>
          </>
        )
        const linkProps: MegaMenuLinkRenderProps = {
          href: link.href,
          className: linkClass,
          "data-mega-link": "",
          children,
        }
        return (
          <li key={link.href + link.label}>
            {renderLink ? renderLink(link, linkProps) : <a {...linkProps} />}
          </li>
        )
      })}
    </ul>
  )

  const icon = (category: MegaMenuCategory) =>
    category.icon && (
      <span aria-hidden className="text-muted-foreground [&_svg]:size-4">
        {category.icon}
      </span>
    )

  return (
    <div
      id={rootId}
      data-layout={layout}
      data-bp={breakpoint}
      data-align={align}
      className={cn("gm relative inline-block", className)}
      style={
        {
          "--mm-open": `${openDelay}ms`,
          "--mm-close": `${closeDelay}ms`,
          "--mm-aim": `${aimDelay}ms`,
          "--mm-anchor": anchor,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <style href="gooseui-mega-menu" precedence="default">
        {staticCss}
      </style>
      {layout === "auto" && (
        <style href={`gooseui-mega-menu-${breakpoint}`} precedence="default">
          {breakpointCss(breakpoint)}
        </style>
      )}
      <details open={defaultOpen}>
        <summary
          aria-controls={panelId}
          className={cn(
            "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent",
            "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [details[open]>&]:bg-accent",
          )}
        >
          {trigger ?? labels?.trigger ?? "Menu"}
          <ChevronDown className="gm-chev-main size-4 text-muted-foreground transition-[rotate] duration-200" />
        </summary>
      </details>

      <div id={panelId} className={cn("gm-panel", panelClassName)}>
        <div
          className={cn("gm-cols w-[min(40rem,calc(100vw-2rem))]", cardClass)}
        >
          <ul className="gm-cats space-y-0.5 border-r bg-muted/40 p-1.5">
            {categories.map((category, index) => (
              <li key={category.id} className="gm-cat">
                <label className={cn("gm-row", rowClass)}>
                  <input
                    type="radio"
                    name={`${baseId}-cat`}
                    value={category.id}
                    defaultChecked={index === 0}
                    aria-controls={`${baseId}-sub-${category.id}`}
                    className="sr-only"
                  />
                  {icon(category)}
                  <span className="flex-1 truncate">{category.label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </label>
                <section
                  id={`${baseId}-sub-${category.id}`}
                  aria-label={category.label}
                  className="gm-sub p-3"
                >
                  {category.description && (
                    <p className="mb-2 px-3 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                  {renderLinks(category, true)}
                  {category.footer && (
                    <div className="mt-2 border-t px-3 pt-3">
                      {category.footer}
                    </div>
                  )}
                </section>
              </li>
            ))}
          </ul>
        </div>

        <ul
          className={cn(
            "gm-acc w-[min(22rem,calc(100vw-2rem))] space-y-0.5 p-1.5",
            cardClass,
          )}
        >
          {categories.map((category) => (
            <li key={category.id}>
              <details name={`${baseId}-acc`}>
                <summary className={rowClass}>
                  {icon(category)}
                  <span className="flex-1">{category.label}</span>
                  <ChevronDown className="gm-chev size-4 text-muted-foreground transition-[rotate] duration-200" />
                </summary>
                <div className="py-1 pl-4">
                  {renderLinks(category, false)}
                  {category.footer && (
                    <div className="mt-1 px-3 pb-1">{category.footer}</div>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <MegaMenuDismiss rootId={rootId} />
    </div>
  )
}
