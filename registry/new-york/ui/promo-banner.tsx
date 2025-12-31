"use client"

import { Star, X } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// Marquee Component
// ============================================================================

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  pauseOnHover?: boolean
}

function Marquee({
  children,
  className,
  speed = 20,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex overflow-hidden [--duration:20s]",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className,
      )}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-4">
        {children}
      </div>
      <div
        className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-4"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// PromoBanner Component
// ============================================================================

interface PromoBannerProps {
  /** Campaign or promo title */
  title?: string
  /** Main headline text or element */
  headline: React.ReactNode
  /** Current price (optional) */
  price?: number
  /** Original price (crossed out) */
  originalPrice?: number
  /** Currency symbol */
  currency?: string
  /** Call-to-action button text or element */
  ctaText?: React.ReactNode
  /** Call-to-action href */
  ctaHref?: string
  /** Text for the marquee banner */
  marqueeText?: string
  /** Position of the banner */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  /** Product images to display */
  images?: string[]
  /** Custom gradient colors */
  gradientFrom?: string
  gradientTo?: string
  /** Close callback */
  onClose?: () => void
  /** LocalStorage key for persistence */
  storageKey?: string
  /** Delay before showing (ms) */
  delay?: number
  /** Show by default or wait for trigger */
  defaultOpen?: boolean
  /** Show diagonal lines pattern on background */
  showPattern?: boolean
  /** Custom className */
  className?: string
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
  gradientFrom = "from-violet-600",
  gradientTo = "to-pink-600",
  onClose,
  storageKey,
  delay = 0,
  defaultOpen = true,
  showPattern = false,
  className,
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [isEntering, setIsEntering] = React.useState(true)

  React.useEffect(() => {
    // Check localStorage if storageKey is provided
    if (storageKey) {
      const dismissed = localStorage.getItem(storageKey)
      if (dismissed === "true") {
        return
      }
    }

    // Show with delay
    if (defaultOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Trigger entrance animation after a frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsEntering(false)
          })
        })
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [storageKey, delay, defaultOpen])

  const handleClose = React.useCallback(() => {
    setIsClosing(true)

    // Store dismissal in localStorage
    if (storageKey) {
      localStorage.setItem(storageKey, "true")
    }

    // Wait for animation to complete
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      onClose?.()
    }, 300)
  }, [storageKey, onClose])

  if (!isVisible) return null

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  const discount =
    originalPrice && price !== undefined
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null

  return (
    <div
      className={cn(
        "fixed z-50 w-[22rem] overflow-hidden rounded-2xl shadow-2xl",
        "transition-all duration-500 ease-out",
        isClosing || isEntering
          ? "translate-y-8 opacity-0 scale-95"
          : "translate-y-0 opacity-100 scale-100",
        positionClasses[position],
        className,
      )}
      role="dialog"
      aria-label="Promotional banner"
    >
      {/* Main Content */}
      <div
        className={cn(
          "relative bg-gradient-to-br p-6 overflow-hidden",
          gradientFrom,
          gradientTo,
        )}
      >
        {/* Diagonal Pattern Overlay */}
        {showPattern && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 6px,
                rgba(255, 255, 255, 1) 6px,
                rgba(255, 255, 255, 1) 9px
              )`,
            }}
          />
        )}
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/20 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/30 hover:text-white cursor-pointer"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-xs font-bold text-black">
              -{discount}%
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 mt-4 text-center text-white">
          {/* Title */}
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">
            {title}
          </p>

          {/* Headline */}
          <h3 className="mt-2 text-xl font-bold leading-tight">{headline}</h3>

          {/* Price Section */}
          {price !== undefined && (
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold">
                {currency}
                {price}
              </span>
              {originalPrice && (
                <span className="text-lg text-white/60 line-through">
                  {currency}
                  {originalPrice}
                </span>
              )}
            </div>
          )}

          {/* Product Images */}
          {images && images.length > 0 && (
            <div className="mt-4 flex justify-center gap-2">
              {images.slice(0, 3).map((src, index) => (
                <div
                  key={index}
                  className="h-14 w-14 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
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

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* Marquee */}
      {marqueeText && (
        <div className="bg-black/90 py-2 text-white">
          <Marquee speed={15}>
            {marqueeText.split(" • ").map((phrase, index) => (
              <React.Fragment key={index}>
                <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
                  {phrase}
                </span>
                <Star className="mx-3 h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
              </React.Fragment>
            ))}
          </Marquee>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// PromoBanner Provider (for global management)
// ============================================================================

interface PromoBannerConfig extends Omit<PromoBannerProps, "onClose"> {
  expiresAt?: Date
}

interface PromoBannerContextValue {
  show: (config: PromoBannerConfig) => void
  hide: () => void
  isVisible: boolean
}

const PromoBannerContext = React.createContext<PromoBannerContextValue | null>(
  null,
)

export function usePromoBanner() {
  const context = React.useContext(PromoBannerContext)
  if (!context) {
    throw new Error("usePromoBanner must be used within PromoBannerProvider")
  }
  return context
}

interface PromoBannerProviderProps {
  children: React.ReactNode
  initialConfig?: PromoBannerConfig
}

export function PromoBannerProvider({
  children,
  initialConfig,
}: PromoBannerProviderProps) {
  const [config, setConfig] = React.useState<PromoBannerConfig | null>(
    initialConfig || null,
  )
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (config) {
      // Check if expired
      if (config.expiresAt && new Date() > config.expiresAt) {
        return
      }
      setIsVisible(true)
    }
  }, [config])

  const show = React.useCallback((newConfig: PromoBannerConfig) => {
    setConfig(newConfig)
    setIsVisible(true)
  }, [])

  const hide = React.useCallback(() => {
    setIsVisible(false)
    setConfig(null)
  }, [])

  return (
    <PromoBannerContext.Provider value={{ show, hide, isVisible }}>
      {children}
      {config && isVisible && (
        <PromoBanner {...config} onClose={hide} defaultOpen={true} />
      )}
    </PromoBannerContext.Provider>
  )
}
