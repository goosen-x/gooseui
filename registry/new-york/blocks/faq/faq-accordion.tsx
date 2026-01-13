"use client"

import { Plus } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

const demoFaqs = [
  {
    question: "What is GooseUI?",
    answer:
      "GooseUI is an open-source library of React components built on top of shadcn/ui. Components are copied into your project, giving you full control over the code.",
  },
  {
    question: "How do I install components?",
    answer:
      "Use shadcn CLI: npx shadcn@latest add @gooseui/button. The component will be added to the components/ui folder of your project.",
  },
  {
    question: "Can I customize styles?",
    answer:
      "Yes, completely. Components use Tailwind CSS and CSS variables. You can change any styles since the code is in your project.",
  },
  {
    question: "What technologies are used?",
    answer:
      "React, TypeScript, Tailwind CSS, Radix UI for accessibility, and CSS variables for theming. All modern and well-maintained.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, GooseUI is completely free and open source. Use it in personal and commercial projects without restrictions.",
  },
  {
    question: "Is it compatible with shadcn/ui?",
    answer:
      "Yes, GooseUI is built on the same architecture as shadcn/ui. You can use components from both libraries in one project.",
  },
]

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items?: FAQItem[]
  className?: string
}

function FAQItemComponent({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="group rounded-2xl border border-border/50 border-dashed p-2 transition-all hover:border-border">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/30">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="Show more"
          className="relative flex w-full items-center justify-between gap-4 p-5 text-left transition-colors cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex flex-1 items-center gap-4">
            <span
              className={cn(
                "font-mono text-3xl sm:text-4xl font-bold transition-colors duration-300",
                isOpen ? "text-primary/70" : "text-muted-foreground/30",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="flex-1 font-medium text-foreground/80 text-base tracking-tight sm:text-lg">
              {question}
            </h3>
          </div>
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              isOpen
                ? "bg-primary/70 text-primary-foreground"
                : "bg-muted/50 group-hover:bg-muted",
            )}
          >
            <Plus
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isOpen
                  ? "rotate-45 text-primary-foreground"
                  : "text-muted-foreground",
              )}
              aria-hidden="true"
            />
          </div>
        </button>
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 pl-[4.5rem] text-sm text-muted-foreground">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({
  items = demoFaqs,
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn("mx-auto max-w-4xl space-y-3", className)}>
      {items.map((item, index) => (
        <FAQItemComponent
          key={item.question}
          index={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export type { FAQItem, FAQAccordionProps }
