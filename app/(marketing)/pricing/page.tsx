import { Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: 0,
    originalPrice: 0,
    description: "Free forever",
    highlighted: false,
    color: "default",
    ctaText: "Get Started",
    ctaHref: "/docs",
  },
  {
    name: "Pro",
    price: 79,
    originalPrice: 129,
    description: "Most popular",
    highlighted: true,
    color: "green",
    ctaText: "Unlock now",
    popular: true,
  },
  {
    name: "Team",
    price: 249,
    originalPrice: 399,
    description: "For teams",
    highlighted: false,
    color: "blue",
    ctaText: "Unlock now",
  },
  {
    name: "Enterprise",
    price: 499,
    originalPrice: 699,
    description: "For organizations",
    highlighted: false,
    color: "orange",
    ctaText: "Unlock now",
  },
]

type FeatureValue = boolean | string | "coming-soon"

const features: {
  name: string
  info?: string
  starter: FeatureValue
  pro: FeatureValue
  team: FeatureValue
  enterprise: FeatureValue
}[] = [
  {
    name: "Admin dashboards",
    starter: false,
    pro: "Limited",
    team: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    name: "Website templates",
    starter: false,
    pro: "5",
    team: "10",
    enterprise: "Unlimited",
  },
  {
    name: "Shadcn components",
    info: "Pre-built shadcn/ui components",
    starter: "10",
    pro: "30",
    team: "30",
    enterprise: "30",
  },
  {
    name: "Blocks",
    starter: false,
    pro: "20",
    team: "40",
    enterprise: "Unlimited",
  },
  {
    name: "Examples",
    starter: "5",
    pro: "15",
    team: "30",
    enterprise: "Unlimited",
  },
  {
    name: "Effects library",
    starter: "Basic",
    pro: "Advanced",
    team: "Advanced",
    enterprise: "Advanced",
  },
  {
    name: "Figma file",
    starter: false,
    pro: true,
    team: true,
    enterprise: true,
  },
  {
    name: "Visual editor",
    starter: false,
    pro: "coming-soon",
    team: "coming-soon",
    enterprise: "coming-soon",
  },
  {
    name: "Theme generator",
    starter: false,
    pro: true,
    team: true,
    enterprise: true,
  },
  {
    name: "GitHub access",
    starter: false,
    pro: true,
    team: true,
    enterprise: true,
  },
  {
    name: "Number of users",
    starter: "1",
    pro: "1",
    team: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    name: "Commercial license",
    starter: false,
    pro: true,
    team: true,
    enterprise: true,
  },
  {
    name: "Priority support",
    starter: false,
    pro: true,
    team: true,
    enterprise: true,
  },
  {
    name: "Dedicated account manager",
    starter: false,
    pro: false,
    team: false,
    enterprise: true,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-green-600" />
  }
  if (value === false) {
    return <X className="h-5 w-5 text-muted-foreground/30" />
  }
  if (value === "coming-soon") {
    return (
      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
        Coming soon
      </span>
    )
  }
  return <span className="text-sm font-medium">{value}</span>
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Buy once, use forever
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            One-time payment. Lifetime access. No subscriptions or recurring
            fees.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/5 border-b border-r bg-muted/30 p-6 text-left">
                  <div className="text-sm font-medium text-muted-foreground">
                    Choose your package
                  </div>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={cn(
                      "relative w-1/5 border-b border-r p-6",
                      plan.color === "green" && "bg-green-50",
                      plan.color === "blue" && "bg-blue-50",
                      plan.color === "orange" && "bg-orange-50",
                      plan.color === "default" && "bg-muted/30",
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <div className="text-xl font-bold">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {plan.description}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">
                            {formatPrice(plan.price)}
                          </span>
                          {plan.originalPrice > 0 &&
                            plan.price !== plan.originalPrice && (
                              <span className="text-lg text-muted-foreground line-through">
                                {formatPrice(plan.originalPrice)}
                              </span>
                            )}
                        </div>
                        {plan.price > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            One-time payment
                          </div>
                        )}
                      </div>
                      <Button
                        className={cn(
                          "w-full cursor-pointer",
                          plan.color === "green" &&
                            "bg-green-600 hover:bg-green-700",
                          plan.color === "blue" &&
                            "bg-blue-600 hover:bg-blue-700",
                          plan.color === "orange" &&
                            "bg-orange-600 hover:bg-orange-700",
                        )}
                        variant={plan.price === 0 ? "outline" : "default"}
                        asChild={plan.ctaHref !== undefined}
                      >
                        {plan.ctaHref ? (
                          <a href={plan.ctaHref}>{plan.ctaText}</a>
                        ) : (
                          <span>{plan.ctaText}</span>
                        )}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name}>
                  <td className="border-b border-r bg-muted/30 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {feature.name}
                      </span>
                      {feature.info && (
                        <Info className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td
                    className={cn(
                      "border-b border-r p-4 text-center",
                      "bg-muted/30",
                    )}
                  >
                    <FeatureCell value={feature.starter} />
                  </td>
                  <td
                    className={cn(
                      "border-b border-r p-4 text-center",
                      "bg-green-50",
                    )}
                  >
                    <FeatureCell value={feature.pro} />
                  </td>
                  <td
                    className={cn(
                      "border-b border-r p-4 text-center",
                      "bg-blue-50",
                    )}
                  >
                    <FeatureCell value={feature.team} />
                  </td>
                  <td
                    className={cn("border-b p-4 text-center", "bg-orange-50")}
                  >
                    <FeatureCell value={feature.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include lifetime updates and access to new components as
            they're released.
          </p>
        </div>
      </div>
    </div>
  )
}
