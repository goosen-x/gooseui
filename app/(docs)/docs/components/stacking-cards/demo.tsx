"use client"

import { ScrollContainer } from "@/registry/new-york/ui/scroll-container"
import {
  StackingCard,
  StackingCardsContainer,
} from "@/registry/new-york/ui/stacking-cards"

export function StackingCardsDemo() {
  const cards = [
    { title: "Card 1", color: "bg-blue-500/10 border-blue-500/20" },
    { title: "Card 2", color: "bg-green-500/10 border-green-500/20" },
    { title: "Card 3", color: "bg-purple-500/10 border-purple-500/20" },
    { title: "Card 4", color: "bg-orange-500/10 border-orange-500/20" },
  ]

  return (
    <ScrollContainer
      height={400}
      autoHide={false}
      className="rounded-lg border bg-background"
    >
      <div className="p-4">
        {/* Spacer */}
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl mb-2">↓</p>
            <p className="text-sm text-muted-foreground">Scroll down slowly</p>
            <p className="text-xs text-muted-foreground mt-1">
              Cards will stack at the top
            </p>
          </div>
        </div>

        <StackingCardsContainer className="pb-[100px]">
          {cards.map((card, i) => (
            <StackingCard key={i} className={card.color}>
              <div className="p-6">
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  This card stacks on top of previous cards using position:
                  sticky
                </p>
              </div>
            </StackingCard>
          ))}
        </StackingCardsContainer>
      </div>
    </ScrollContainer>
  )
}
