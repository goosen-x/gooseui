"use client"

/**
 * Upgrade Modal - Prompts users to upgrade for premium features
 * Uses Paddle for payment processing
 */

import { initializePaddle, type Paddle } from "@paddle/paddle-js"
import { Check, Loader2, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatPrice, plans } from "@/lib/payments/plans"
import { cn } from "@/lib/utils"

interface UpgradeModalProps {
  trigger?: React.ReactNode
  feature?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const featureMessages: Record<string, { title: string; description: string }> =
  {
    react: {
      title: "Export to React",
      description:
        "Export your landing page as a clean React component with TypeScript support.",
    },
    registry: {
      title: "shadcn Registry Export",
      description:
        "Export as a shadcn CLI compatible package for easy installation.",
    },
    watermark: {
      title: "Remove Watermark",
      description: "Remove the GooseUI watermark from your exported pages.",
    },
    projects: {
      title: "More Projects",
      description: "Create unlimited projects with a Pro subscription.",
    },
    exports: {
      title: "More Exports",
      description: "Get unlimited exports with a Pro subscription.",
    },
    default: {
      title: "Upgrade to Pro",
      description:
        "Unlock all premium features and take your landing pages to the next level.",
    },
  }

export function UpgradeModal({
  trigger,
  feature = "default",
  open,
  onOpenChange,
}: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paddle, setPaddle] = useState<Paddle | null>(null)
  const message = featureMessages[feature] || featureMessages.default
  const proPlan = plans.pro

  // Initialize Paddle
  useEffect(() => {
    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
    if (!clientToken) return

    initializePaddle({
      environment:
        (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as
          | "sandbox"
          | "production") || "sandbox",
      token: clientToken,
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          // Redirect to success page
          window.location.href = "/generate?success=true"
        }
        if (event.name === "checkout.closed") {
          setIsLoading(false)
        }
      },
    }).then((instance) => {
      if (instance) setPaddle(instance)
    })
  }, [])

  const handleUpgrade = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get price ID from API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "pro",
          interval: "monthly",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Checkout failed (${response.status})`)
      }

      // Demo mode - redirect
      if (data.demo) {
        window.location.href = data.redirectUrl
        return
      }

      // Open Paddle checkout
      if (data.priceId && paddle) {
        paddle.Checkout.open({
          items: [{ priceId: data.priceId, quantity: 1 }],
          settings: {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
          },
        })
      } else if (!paddle) {
        // Paddle not initialized - show error or redirect to pricing
        setError("Payment system not available. Please try again.")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            {message.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {message.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{proPlan.name}</h3>
              <p className="text-sm text-muted-foreground">
                {proPlan.description}
              </p>
            </div>
            <Badge variant="secondary">Popular</Badge>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold">
              {formatPrice(proPlan.price)}
            </span>
            {proPlan.priceYearly && (
              <span className="ml-2 text-sm text-muted-foreground">
                or {formatPrice(proPlan.priceYearly, true)}
              </span>
            )}
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Unlimited projects
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              React & Registry export
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              No watermark
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Custom domain support
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Priority support
            </li>
          </ul>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-destructive">{error}</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={handleUpgrade}
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening checkout...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full cursor-pointer"
            onClick={() => onOpenChange?.(false)}
            disabled={isLoading}
          >
            Maybe later
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Cancel anytime. 30-day money-back guarantee.
        </p>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Simple upgrade button that triggers the modal
 */
export function UpgradeButton({
  feature,
  className,
  children,
}: {
  feature?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <UpgradeModal
      feature={feature}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2 cursor-pointer", className)}
        >
          <Sparkles className="h-3 w-3" />
          {children || "Upgrade"}
        </Button>
      }
    />
  )
}
