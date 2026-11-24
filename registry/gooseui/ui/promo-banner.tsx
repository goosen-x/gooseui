import { type CSSProperties, Fragment, type ReactNode, useId } from "react"
import { cn } from "@/lib/utils"
import { PromoBannerStore } from "@/registry/gooseui/ui/promo-banner.client"

export {
  PromoBannerProvider,
  usePromoBanner,
} from "@/registry/gooseui/ui/promo-banner.client"

export interface PromoBannerProps {
  /** Campaign or promo title */
  title?: string
  /** Main headline text or element */
  headline: ReactNode
  /** Current price (optional) */
  price?: number
  /** Original price (crossed out) */
  originalPrice?: number
  /** Currency symbol */
  currency?: string
  /** Call-to-action button text or element */
  ctaText?: ReactNode
  /** Call-to-action href */
  ctaHref?: string
  /** Text for the marquee banner, phrases separated by " • " */
  marqueeText?: string
  /** Position of the banner */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  /** Product images to display */
  images?: string[]
  /** Gradient colors as Tailwind classes. Defaults use theme tokens: foreground fading into a primary tint */
  gradientFrom?: string
  gradientTo?: string
  /** Close callback (client components only) */
  onClose?: () => void
  /** LocalStorage key for persistence */
  storageKey?: string
  /** Delay before showing (ms) */
  delay?: number
  /** Render the banner open */
  defaultOpen?: boolean
  /** Show diagonal lines pattern on background */
  showPattern?: boolean
  /** Callback when CTA button is clicked (client components only) */
  onCtaClick?: () => void
  /** Accessible texts */
  labels?: { banner?: string; close?: string }
  /** Custom className */
  className?: string
}

// Non-modal <dialog open> + <form method="dialog">: the close button works without JS.
const styles = `
@layer base{.gooseui-promo{margin:0;padding:0;border:0;background:none;color:inherit;max-width:none;max-height:none}}
.gooseui-promo{opacity:1;translate:0;scale:1;
transition:opacity .5s cubic-bezier(.2,.8,.2,1),translate .5s cubic-bezier(.2,.8,.2,1),scale .5s cubic-bezier(.2,.8,.2,1),display .5s allow-discrete;
transition-delay:var(--promo-delay,0ms)}
.gooseui-promo:not([open]){opacity:0;translate:0 2rem;scale:.95;transition-delay:0ms;transition-duration:.3s}
@starting-style{.gooseui-promo[open]{opacity:0;translate:0 2rem;scale:.95}}
@keyframes gooseui-promo-marquee{to{transform:translateX(calc(-100% - 1rem))}}
.gooseui-promo-track{animation:gooseui-promo-marquee var(--duration,15s) linear infinite}
.gooseui-promo-marquee:hover .gooseui-promo-track{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.gooseui-promo{transition:none}.gooseui-promo-track{animation:none}}
`

const positionClasses = {
  "bottom-right": "top-auto bottom-4 right-4 left-auto",
  "bottom-left": "top-auto bottom-4 left-4 right-auto",
  "top-right": "top-4 bottom-auto right-4 left-auto",
  "top-left": "top-4 bottom-auto left-4 right-auto",
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mx-3 h-3 w-3 shrink-0 fill-primary"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function Marquee({ children, speed }: { children: ReactNode; speed: number }) {
  const track =
    "gooseui-promo-track flex min-w-full shrink-0 items-center justify-around gap-4"
  return (
    <div
      className="gooseui-promo-marquee flex gap-4 overflow-hidden"
      style={{ "--duration": `${speed}s` } as CSSProperties}
    >
      <div className={track}>{children}</div>
      <div className={track} aria-hidden="true">
        {children}
      </div>
    </div>
  )
}

export function PromoBanner({
  title = "Special Offer",
  headline,
  price,
  originalPrice,
  currency = "$",
  ctaText = "Get Now",
  ctaHref = "#",
  marqueeText,
  position = "bottom-right",
  images,
  gradientFrom = "from-foreground",
  gradientTo = "to-[color-mix(in_oklab,var(--foreground)_55%,var(--primary))]",
  onClose,
  storageKey,
  delay = 0,
  defaultOpen = true,
  showPattern = false,
  onCtaClick,
  labels,
  className,
}: PromoBannerProps) {
  const id = `${useId()}-promo`
  const discount =
    originalPrice && price !== undefined
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null

  // Runs while the HTML is parsed: a dismissed banner never shows up
  const hideIfDismissed =
    storageKey &&
    `try{localStorage.getItem(${JSON.stringify(storageKey)})==="true"&&document.getElementById(${JSON.stringify(id)}).removeAttribute("open")}catch(e){}`.replace(
      /</g,
      "\\u003c",
    )

  return (
    <>
      <style href="gooseui-promo-banner" precedence="default">
        {styles}
      </style>
      <dialog
        id={id}
        open={defaultOpen}
        // The inline script may remove "open" before hydration
        suppressHydrationWarning
        aria-label={labels?.banner ?? "Promotional banner"}
        style={{ "--promo-delay": `${delay}ms` } as CSSProperties}
        className={cn(
          "gooseui-promo fixed z-50 w-[22rem] max-w-[calc(100%-2rem)] overflow-hidden rounded-2xl shadow-2xl",
          positionClasses[position],
          className,
        )}
      >
        {hideIfDismissed && (
          <script dangerouslySetInnerHTML={{ __html: hideIfDismissed }} />
        )}
        <div
          className={cn(
            "relative overflow-hidden bg-linear-to-br p-6",
            gradientFrom,
            gradientTo,
          )}
        >
          {showPattern && (
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 6px, var(--background) 6px, var(--background) 9px)",
              }}
            />
          )}
          <form method="dialog" className="absolute top-3 right-3 z-10">
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-background/20 p-1.5 text-background/80 backdrop-blur-sm transition-colors outline-none hover:bg-background/30 hover:text-background focus-visible:ring-2 focus-visible:ring-background"
              aria-label={labels?.close ?? "Close banner"}
            >
              <XIcon />
            </button>
          </form>

          {discount && (
            <div className="absolute top-4 left-4 z-10">
              <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
                -{discount}%
              </span>
            </div>
          )}

          <div className="relative z-10 mt-4 text-center text-background">
            <p className="text-xs font-medium tracking-widest text-background/80 uppercase">
              {title}
            </p>
            <h3 className="mt-2 text-xl leading-tight font-bold">{headline}</h3>

            {price !== undefined && (
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold">
                  {currency}
                  {price}
                </span>
                {originalPrice && (
                  <span className="text-lg text-background/70 line-through">
                    {currency}
                    {originalPrice}
                  </span>
                )}
              </div>
            )}

            {images && images.length > 0 && (
              <div className="mt-4 flex justify-center gap-2">
                {images.slice(0, 3).map((src) => (
                  <div
                    key={src}
                    className="h-14 w-14 overflow-hidden rounded-lg bg-background/10 backdrop-blur-sm"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <a
              href={ctaHref}
              data-promo-cta=""
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block cursor-pointer rounded-full bg-background px-6 py-2.5 text-sm font-semibold text-foreground shadow-lg transition-transform outline-none hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground active:scale-[0.98]"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {marqueeText && (
          <div className="border-t bg-card py-2 text-card-foreground">
            <Marquee speed={15}>
              {marqueeText.split(" • ").map((phrase, index) => (
                <Fragment key={index}>
                  <span className="text-xs font-medium tracking-wide whitespace-nowrap uppercase">
                    {phrase}
                  </span>
                  <StarIcon />
                </Fragment>
              ))}
            </Marquee>
          </div>
        )}
      </dialog>
      {(storageKey || onClose || onCtaClick) && (
        <PromoBannerStore
          dialogId={id}
          storageKey={storageKey}
          onClose={onClose}
          onCtaClick={onCtaClick}
        />
      )}
    </>
  )
}
