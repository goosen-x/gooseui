"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const faqs = [
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

function FAQItem({
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
    <div
      className="group border border-border/50 border-dashed p-2 transition-all hover:border-border"
      style={
        {
          cornerShape: "squircle",
          borderRadius: "1.5rem",
        } as React.CSSProperties
      }
    >
      <div
        className="overflow-hidden border border-border/50 bg-muted/30"
        style={
          {
            cornerShape: "squircle",
            borderRadius: "1rem",
          } as React.CSSProperties
        }
      >
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Answers to common questions about GooseUI
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
