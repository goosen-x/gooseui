"use client"

import { Check, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, getDisplayPlans, type Plan } from "@/lib/payments/plans"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const plans = getDisplayPlans()

  return (
    <div className="container max-w-6xl py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include access to our
          component library.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={cn(
              "text-sm font-medium",
              !isYearly && "text-foreground",
              isYearly && "text-muted-foreground",
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
              isYearly ? "bg-primary" : "bg-muted",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                isYearly && "translate-x-5",
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium",
              isYearly && "text-foreground",
              !isYearly && "text-muted-foreground",
            )}
          >
            Yearly
            <Badge variant="beta" className="ml-2">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
        ))}
      </div>

      {/* FAQ or Additional Info */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Questions?</h2>
        <p className="text-muted-foreground mb-4">
          Need help choosing a plan or have questions about features?
        </p>
        <Button squircle variant="outline" asChild>
          <Link href="mailto:support@gooseui.pro">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}

function PricingCard({ plan, isYearly }: { plan: Plan; isYearly: boolean }) {
  const price = isYearly && plan.priceYearly ? plan.priceYearly : plan.price
  const isPopular = plan.popular

  const handleCheckout = async () => {
    if (plan.id === "free") {
      window.location.href = "/generate"
      return
    }

    if (plan.id === "enterprise") {
      window.location.href = "mailto:enterprise@gooseui.pro"
      return
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan.id,
          interval: isYearly ? "yearly" : "monthly",
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else if (data.demo) {
        window.location.href = data.redirectUrl
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border bg-card p-6",
        isPopular && "border-primary shadow-lg",
      )}
    >
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">
          {formatPrice(price, isYearly)}
        </span>
        {plan.priceYearly && !isYearly && plan.price > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            or {formatPrice(plan.priceYearly, true)} (save 20%)
          </p>
        )}
      </div>

      <Button
        squircle
        onClick={handleCheckout}
        variant={isPopular ? "default" : "outline"}
        className="w-full mb-6 cursor-pointer"
      >
        {plan.id === "free" && "Get Started"}
        {plan.id === "enterprise" && "Contact Sales"}
        {plan.id !== "free" && plan.id !== "enterprise" && (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to {plan.name}
          </>
        )}
      </Button>

      <div className="space-y-3 text-sm">
        <FeatureItem included={plan.features.htmlExport}>
          HTML Export
        </FeatureItem>
        <FeatureItem included={plan.features.reactExport}>
          React Export
        </FeatureItem>
        <FeatureItem included={plan.features.registryExport}>
          shadcn Registry Export
        </FeatureItem>
        <FeatureItem included={plan.features.removeWatermark}>
          No Watermark
        </FeatureItem>
        <FeatureItem included={plan.features.customDomain}>
          Custom Domain
        </FeatureItem>
        <FeatureItem included={plan.features.analytics}>Analytics</FeatureItem>
        <FeatureItem included={plan.features.prioritySupport}>
          Priority Support
        </FeatureItem>
        <FeatureItem included={plan.features.apiAccess}>API Access</FeatureItem>
        <FeatureItem included={plan.features.whiteLabel}>
          White Label
        </FeatureItem>
      </div>

      <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
        <p>
          {plan.limits.projects === -1
            ? "Unlimited projects"
            : `${plan.limits.projects} projects`}
        </p>
        <p>
          {plan.limits.exportsPerMonth === -1
            ? "Unlimited exports"
            : `${plan.limits.exportsPerMonth} exports/month`}
        </p>
        {plan.limits.teamMembers > 1 && (
          <p>
            {plan.limits.teamMembers === -1
              ? "Unlimited team members"
              : `Up to ${plan.limits.teamMembers} team members`}
          </p>
        )}
      </div>
    </div>
  )
}

function FeatureItem({
  included,
  children,
}: {
  included: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      {included ? (
        <Check className="h-4 w-4 text-primary shrink-0" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground/50 shrink-0" />
      )}
      <span className={cn(!included && "text-muted-foreground/50")}>
        {children}
      </span>
    </div>
  )
}
