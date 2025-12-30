"use client"

import { Code, Download, HelpCircle, Palette, Shield, Zap } from "lucide-react"

const faqs = [
  {
    icon: HelpCircle,
    question: "What is GooseUI?",
    answer:
      "GooseUI is an open-source library of React components built on top of shadcn/ui. Components are copied into your project, giving you full control over the code.",
  },
  {
    icon: Download,
    question: "How do I install components?",
    answer:
      "Use shadcn CLI: npx shadcn@latest add https://gooseui.pro/r/button.json. The component will be added to the components/ui folder of your project.",
  },
  {
    icon: Palette,
    question: "Can I customize styles?",
    answer:
      "Yes, completely. Components use Tailwind CSS and CSS variables. You can change any styles since the code is in your project.",
  },
  {
    icon: Code,
    question: "What technologies are used?",
    answer:
      "React, TypeScript, Tailwind CSS, Radix UI for accessibility, and CSS variables for theming. All modern and well-maintained.",
  },
  {
    icon: Shield,
    question: "Is it free?",
    answer:
      "Yes, GooseUI is completely free and open source. Use it in personal and commercial projects without restrictions.",
  },
  {
    icon: Zap,
    question: "Is it compatible with shadcn/ui?",
    answer:
      "Yes, GooseUI is built on the same architecture as shadcn/ui. You can use components from both libraries in one project.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Answers to common questions about GooseUI
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq) => {
            const Icon = faq.icon
            return (
              <div
                key={faq.question}
                className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
