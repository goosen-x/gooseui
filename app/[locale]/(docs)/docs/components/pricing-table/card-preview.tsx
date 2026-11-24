import { Check } from "lucide-react"

const plans = [
  { name: "Starter", price: "$9", features: 2 },
  { name: "Growth", price: "$24", features: 3, highlighted: true },
  { name: "Scale", price: "$63", features: 3 },
]

export default function CardPreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex rounded-full border bg-muted p-0.5 text-[10px] font-medium">
        <span className="rounded-full px-2.5 py-0.5 text-muted-foreground">
          Monthly
        </span>
        <span className="rounded-full bg-background px-2.5 py-0.5 shadow-sm">
          Yearly
        </span>
      </div>
      <div className="flex items-stretch gap-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlighted
                ? "relative w-20 space-y-1.5 rounded-lg border border-primary bg-primary/5 p-2"
                : "w-20 space-y-1.5 rounded-lg border bg-card p-2"
            }
          >
            {plan.highlighted ? (
              <span className="absolute -top-2 left-2 rounded-full bg-primary px-1.5 text-[8px] font-semibold text-primary-foreground">
                Popular
              </span>
            ) : null}
            <div className="text-[10px] font-semibold">{plan.name}</div>
            <div className="text-base font-semibold leading-none tabular-nums">
              {plan.price}
              <span className="text-[8px] font-normal text-muted-foreground">
                {" "}
                /mo
              </span>
            </div>
            <div
              className={
                plan.highlighted
                  ? "h-3.5 rounded bg-primary"
                  : "h-3.5 rounded border bg-background"
              }
            />
            {Array.from({ length: plan.features }, (_, index) => (
              <div key={index} className="flex items-center gap-1">
                <Check className="size-2.5 text-primary" strokeWidth={3} />
                <span className="h-1 flex-1 rounded-full bg-muted-foreground/25" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
