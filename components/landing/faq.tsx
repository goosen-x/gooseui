import { HelpCircle, Download, Palette, Code, Shield, Zap } from "lucide-react"

const faqs = [
  {
    icon: HelpCircle,
    question: "Что такое GooseUI?",
    answer:
      "GooseUI — это коллекция переиспользуемых React компонентов, которые вы копируете в свой проект. Это не npm-пакет, а исходный код, который вы полностью контролируете.",
  },
  {
    icon: Download,
    question: "Как установить компоненты?",
    answer:
      "Используйте shadcn CLI: npx shadcn@latest add https://gooseui.pro/r/button.json. Компонент будет скопирован в ваш проект.",
  },
  {
    icon: Palette,
    question: "Можно ли кастомизировать стили?",
    answer:
      "Да, код компонентов полностью ваш. Используйте Tailwind CSS классы и CSS переменные для любых изменений.",
  },
  {
    icon: Code,
    question: "Какие технологии используются?",
    answer:
      "React 18+, TypeScript, Tailwind CSS, Radix UI для доступности, Framer Motion для анимаций.",
  },
  {
    icon: Shield,
    question: "Это бесплатно?",
    answer:
      "Да, GooseUI полностью бесплатен и с открытым исходным кодом. Используйте в личных и коммерческих проектах.",
  },
  {
    icon: Zap,
    question: "Совместимо с shadcn/ui?",
    answer:
      "Да, GooseUI построен на тех же принципах и полностью совместим с экосистемой shadcn/ui.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Частые вопросы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ответы на популярные вопросы о GooseUI
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <faq.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
