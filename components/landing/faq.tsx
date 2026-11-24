import { useLocale } from "next-intl"
import type { Dict, Localized } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { DetailsAccordion } from "@/registry/gooseui/ui/details-accordion"

const faqs: { question: Localized; answer: Localized }[] = [
  {
    question: {
      en: "What is GooseUI?",
      ru: "Что такое GooseUI?",
    },
    answer: {
      en: "GooseUI is an open-source library of React components built on top of shadcn/ui. Components are copied into your project, giving you full control over the code.",
      ru: "GooseUI — библиотека React-компонентов с открытым кодом на базе shadcn/ui. Компоненты копируются в ваш проект, так что код полностью под вашим контролем.",
    },
  },
  {
    question: {
      en: "How do I install components?",
      ru: "Как установить компоненты?",
    },
    answer: {
      en: "Use shadcn CLI: npx shadcn@latest add @gooseui/button. The component will be added to the components/ui folder of your project.",
      ru: "Через shadcn CLI: npx shadcn@latest add @gooseui/button. Компонент появится в папке components/ui вашего проекта.",
    },
  },
  {
    question: {
      en: "Can I customize styles?",
      ru: "Можно ли менять стили?",
    },
    answer: {
      en: "Yes, completely. Components use Tailwind CSS and CSS variables. You can change any styles since the code is in your project.",
      ru: "Да, как угодно. Компоненты построены на Tailwind CSS и CSS-переменных, а код лежит в вашем проекте, так что менять можно любые стили.",
    },
  },
  {
    question: {
      en: "What technologies are used?",
      ru: "Какие технологии используются?",
    },
    answer: {
      en: "React, TypeScript, Tailwind CSS, Radix UI for accessibility, and CSS variables for theming. All modern and well-maintained.",
      ru: "React, TypeScript, Tailwind CSS, Radix UI для доступности и CSS-переменные для тем. Всё современное и активно поддерживается.",
    },
  },
  {
    question: {
      en: "Is it free?",
      ru: "Это бесплатно?",
    },
    answer: {
      en: "Yes, GooseUI is completely free and open source. Use it in personal and commercial projects without restrictions.",
      ru: "Да, GooseUI полностью бесплатный и с открытым исходным кодом. Используйте в личных и коммерческих проектах без ограничений.",
    },
  },
  {
    question: {
      en: "Is it compatible with shadcn/ui?",
      ru: "Совместим ли он с shadcn/ui?",
    },
    answer: {
      en: "Yes, GooseUI is built on the same architecture as shadcn/ui. You can use components from both libraries in one project.",
      ru: "Да, GooseUI построен на той же архитектуре, что и shadcn/ui. Компоненты обеих библиотек можно использовать в одном проекте.",
    },
  },
]

const en = {
  description: "Answers to common questions about GooseUI",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Ответы на частые вопросы о GooseUI",
  },
}

export function FAQ() {
  const locale = useLocale()
  const t = content[locale as Locale]
  const items = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: pick(faq.question, locale),
    content: <p>{pick(faq.answer, locale)}</p>,
    defaultOpen: index === 0,
  }))

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <DetailsAccordion
          variant="framed"
          numbered
          name="landing-faq"
          items={items}
          className="mx-auto max-w-4xl"
        />
      </div>
    </section>
  )
}
