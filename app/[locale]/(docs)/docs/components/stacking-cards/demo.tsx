"use client"

import { Check } from "lucide-react"
import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"
import {
  StackingCard,
  StackingCardsContainer,
} from "@/registry/gooseui/ui/stacking-cards"
import {
  BuildIllustration,
  DesignIllustration,
  IdeaIllustration,
  LaunchIllustration,
} from "./illustrations"

const en = {
  hint: "Scroll down, the steps stack on top of each other",
  steps: [
    {
      title: "Idea",
      text: "Describe the problem in one sentence and check that people actually need the answer.",
      points: [
        "Five customer interviews",
        "One clear promise",
        "A short list of must-haves",
      ],
      window: "New idea",
    },
    {
      title: "Design",
      text: "Turn the idea into screens: layout, type and a single accent color.",
      points: [
        "Wireframes in a day",
        "A small set of components",
        "Review with the team",
      ],
      window: "Layout",
    },
    {
      title: "Development",
      text: "Build the first version in small steps, with tests on every change.",
      points: [
        "Weekly releases",
        "Automated checks",
        "Code review for each change",
      ],
      window: "app.tsx",
    },
    {
      title: "Launch",
      text: "Open access, watch the numbers and fix the weak spots first.",
      points: [
        "Public announcement",
        "Metrics from day one",
        "Feedback in one inbox",
      ],
      window: "Analytics",
    },
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    hint: "Прокрутите вниз, шаги ложатся друг на друга",
    steps: [
      {
        title: "Идея",
        text: "Опишите проблему одним предложением и проверьте, что ответ действительно нужен людям.",
        points: [
          "Пять интервью с клиентами",
          "Одно понятное обещание",
          "Короткий список обязательного",
        ],
        window: "Новая идея",
      },
      {
        title: "Дизайн",
        text: "Превратите идею в экраны: сетка, шрифты и один акцентный цвет.",
        points: [
          "Макеты за один день",
          "Небольшой набор компонентов",
          "Обсуждение с командой",
        ],
        window: "Макет",
      },
      {
        title: "Разработка",
        text: "Соберите первую версию небольшими шагами, с тестами на каждое изменение.",
        points: [
          "Релиз каждую неделю",
          "Автоматические проверки",
          "Ревью каждого изменения",
        ],
        window: "app.tsx",
      },
      {
        title: "Запуск",
        text: "Откройте доступ, следите за цифрами и сначала чините слабые места.",
        points: [
          "Публичный анонс",
          "Метрики с первого дня",
          "Отзывы в одном месте",
        ],
        window: "Аналитика",
      },
    ],
  },
}

const illustrations = [
  IdeaIllustration,
  DesignIllustration,
  BuildIllustration,
  LaunchIllustration,
]

export function StackingCardsDemo() {
  const t = content[useLocale() as Locale]

  return (
    <ScrollContainer
      height={520}
      autoHide={false}
      className="w-full rounded-lg border bg-background"
    >
      <div className="p-6">
        <p className="pb-6 text-center text-sm text-muted-foreground">
          {t.hint}
        </p>

        <StackingCardsContainer
          stickyTop={24}
          stackOffset={14}
          endSpace={26}
          className="space-y-6"
        >
          {t.steps.map((step, i) => {
            const Illustration = illustrations[i]
            return (
              <StackingCard key={step.title} className="@container">
                <div className="grid min-h-[380px] items-center gap-6 p-6 @xl:grid-cols-2 @xl:gap-8 @xl:p-8">
                  <div className="space-y-4">
                    <span className="block font-semibold text-5xl text-muted-foreground/40 tabular-nums leading-none @xl:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-2xl tracking-tight @xl:text-[28px]">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.text}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <Check
                            className="size-4 shrink-0 text-primary"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden items-center justify-center rounded-xl border bg-muted/40 p-6 @xl:flex">
                    <Illustration label={step.window} />
                  </div>
                </div>
              </StackingCard>
            )
          })}
        </StackingCardsContainer>
      </div>
    </ScrollContainer>
  )
}
