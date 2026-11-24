import {
  StackingCard,
  StackingCardsContainer,
} from "@/registry/gooseui/ui/stacking-cards"

const steps = ["01", "02", "03"]

export default function CardPreview() {
  return (
    <StackingCardsContainer className="w-56 space-y-0 pb-0">
      {steps.map((n, i) => (
        <StackingCard key={n} className="!static mb-[-34px]" index={i}>
          <div className="flex items-center gap-3 p-3">
            <span className="font-semibold text-muted-foreground/50 text-xl tabular-nums">
              {n}
            </span>
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-foreground/70" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
            </div>
            <span className="size-2 rounded-full bg-primary" />
          </div>
          <div className="h-8" />
        </StackingCard>
      ))}
    </StackingCardsContainer>
  )
}
