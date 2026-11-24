import { ArrowRight, BookOpen, Boxes, Code2, LifeBuoy } from "lucide-react"
import type * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"
import {
  MegaMenu,
  type MegaMenuCategory,
  type MegaMenuLinkRenderProps,
} from "@/registry/gooseui/ui/mega-menu"

/* -------------------------------------------------------------------------- */
/* Types and default data. Replace the data through props in your app.        */
/* -------------------------------------------------------------------------- */

export interface HeaderMegaMenuLink {
  label: string
  href: string
}

export interface HeaderMegaMenuLabels {
  home: string
  menu: string
  signIn: string
  cta: string
}

export interface HeaderMegaMenuProps {
  /** Brand name next to the logo mark. */
  brand?: string
  /** Categories of the full-width mega menu. */
  categories?: MegaMenuCategory[]
  /** Plain links next to the mega menu trigger. */
  links?: HeaderMegaMenuLink[]
  labels?: Partial<HeaderMegaMenuLabels>
  /** Where the buttons on the right lead. */
  signInHref?: string
  ctaHref?: string
  className?: string
  /** Render links with your router's link component. */
  renderLink?: (props: {
    href: string
    className?: string
    children: React.ReactNode
  }) => React.ReactNode
}

const DEFAULT_LABELS: HeaderMegaMenuLabels = {
  home: "Home",
  menu: "Explore",
  signIn: "Sign in",
  cta: "Get started",
}

const DEFAULT_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "product",
    label: "Product",
    icon: <Boxes />,
    description: "Everything you need to ship",
    links: [
      {
        label: "Analytics",
        href: "#analytics",
        description: "Dashboards and reports",
      },
      {
        label: "Automations",
        href: "#automations",
        description: "Workflows without code",
      },
      { label: "API", href: "#api", description: "REST and webhooks" },
      { label: "Teams", href: "#teams", description: "Roles and access" },
    ],
    footer: (
      <a
        href="#product"
        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium hover:underline"
      >
        All product features
        <ArrowRight className="size-3.5" />
      </a>
    ),
  },
  {
    id: "developers",
    label: "Developers",
    icon: <Code2 />,
    links: [
      { label: "Documentation", href: "#docs", description: "Guides and API" },
      { label: "SDKs", href: "#sdks", description: "JS, Python, Go" },
      { label: "Changelog", href: "#changelog", description: "What shipped" },
      { label: "Status", href: "#status", description: "Uptime and incidents" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: <BookOpen />,
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Case studies", href: "#cases" },
      { label: "Templates", href: "#templates" },
      { label: "Webinars", href: "#webinars" },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: <LifeBuoy />,
    links: [
      { label: "Help center", href: "#help" },
      { label: "Contact sales", href: "#sales" },
      { label: "Community", href: "#community" },
    ],
  },
]

const DEFAULT_LINKS: HeaderMegaMenuLink[] = [
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#company" },
]

const defaultRenderLink: NonNullable<HeaderMegaMenuProps["renderLink"]> = ({
  children,
  ...props
}) => <a {...props}>{children}</a>

const barLink =
  "inline-flex h-9 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Header with a mega menu that opens across the full width of the page.
 *
 * Built on the MegaMenu component: the open state lives in a native `<details>`,
 * hover and keyboard work without JavaScript. Below 768px the menu turns into
 * an accordion.
 */
export function HeaderMegaMenu({
  brand = "Brand",
  categories = DEFAULT_CATEGORIES,
  links = DEFAULT_LINKS,
  labels: labelsProp,
  signInHref = "#sign-in",
  ctaHref = "#get-started",
  className,
  renderLink = defaultRenderLink,
}: HeaderMegaMenuProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }

  const plainLinks = links.map((link) => (
    <span key={link.href + link.label}>
      {renderLink({
        href: link.href,
        className: barLink,
        children: link.label,
      })}
    </span>
  ))

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
        {renderLink({
          href: "/",
          className: "mr-4 flex cursor-pointer items-center gap-2",
          children: (
            <>
              <span className="sr-only">{labels.home}</span>
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
              >
                {brand.charAt(0)}
              </span>
              <span className="font-bold">{brand}</span>
            </>
          ),
        })}

        <nav
          aria-label={brand}
          className="flex flex-1 items-center gap-1 text-sm"
        >
          {/* The menu root is static, so from the md breakpoint the panel sits
              right under the header and spreads over its whole width. */}
          <MegaMenu
            categories={categories}
            labels={{ trigger: labels.menu }}
            className="static"
            panelClassName="md:absolute! md:top-full! md:left-0! md:right-0! md:flex md:justify-center md:px-4 md:pointer-events-none [&>*]:pointer-events-auto md:[&>.gm-cols]:w-full! md:[&>.gm-cols]:max-w-5xl"
            renderLink={(_link, props: MegaMenuLinkRenderProps) =>
              renderLink({
                href: props.href,
                className: props.className,
                children: props.children,
              })
            }
          />
          <div className="hidden items-center gap-1 md:flex">{plainLinks}</div>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden cursor-pointer sm:inline-flex"
          >
            <a href={signInHref}>{labels.signIn}</a>
          </Button>
          <Button size="sm" asChild className="cursor-pointer">
            <a href={ctaHref}>{labels.cta}</a>
          </Button>
        </div>
      </div>

      {/* Plain links move to a second row on narrow screens */}
      {links.length > 0 && (
        <div className="flex items-center gap-1 overflow-x-auto border-t px-4 py-1 md:hidden">
          {plainLinks}
        </div>
      )}
    </header>
  )
}
