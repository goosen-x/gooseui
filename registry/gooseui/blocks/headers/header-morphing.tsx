import type * as React from "react"
import { Button } from "@/registry/gooseui/ui/button"
import {
  MorphingHeader,
  MorphingLogo,
  MorphingNav,
} from "@/registry/gooseui/ui/morphing-header"

/* -------------------------------------------------------------------------- */
/* Types and default data. Replace the data through props in your app.        */
/* -------------------------------------------------------------------------- */

export interface HeaderMorphingLink {
  label: string
  href: string
}

export interface HeaderMorphingProps {
  /** Brand name next to the logo. */
  brand?: string
  /** Logo image URL. By default a small inline "B" mark. */
  logoSrc?: string
  links?: HeaderMorphingLink[]
  ctaLabel?: string
  ctaHref?: string
  /** Scroll distance in px over which the header becomes compact. */
  compactThreshold?: number
  /** Use "div" when the header lives inside a scroll container demo. */
  as?: "header" | "div"
  className?: string
  /** Render links with your router's link component. */
  renderLink?: (props: {
    href: string
    className?: string
    children: React.ReactNode
  }) => React.ReactNode
}

const DEFAULT_LOGO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#8b5cf6" fill-opacity=".2"/><text x="24" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#8b5cf6">B</text></svg>',
)}`

const DEFAULT_LINKS: HeaderMorphingLink[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
]

const defaultRenderLink: NonNullable<HeaderMorphingProps["renderLink"]> = ({
  children,
  ...props
}) => <a {...props}>{children}</a>

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Sticky header that shrinks while the page scrolls: padding, logo height and
 * nav spacing follow the scroll position. Pure CSS (scroll-driven animations),
 * no JavaScript. Without browser support the header stays full size.
 */
export function HeaderMorphing({
  brand = "Brand",
  logoSrc = DEFAULT_LOGO,
  links = DEFAULT_LINKS,
  ctaLabel = "Get started",
  ctaHref = "#get-started",
  compactThreshold = 80,
  as,
  className,
  renderLink = defaultRenderLink,
}: HeaderMorphingProps) {
  return (
    <MorphingHeader
      as={as}
      compactThreshold={compactThreshold}
      className={className}
    >
      <div className="flex items-center justify-between gap-4">
        {renderLink({
          href: "/",
          className: "flex cursor-pointer items-center gap-3",
          children: (
            <>
              <MorphingLogo
                src={logoSrc}
                alt=""
                fullSize={48}
                compactSize={32}
              />
              <span className="font-semibold">{brand}</span>
            </>
          ),
        })}

        <div className="flex items-center gap-4">
          <MorphingNav className="hidden whitespace-nowrap sm:flex">
            {links.map((link) => (
              <span key={link.href + link.label}>
                {renderLink({
                  href: link.href,
                  className:
                    "cursor-pointer text-muted-foreground transition-colors hover:text-foreground",
                  children: link.label,
                })}
              </span>
            ))}
          </MorphingNav>
          <Button size="sm" asChild className="cursor-pointer">
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </MorphingHeader>
  )
}
