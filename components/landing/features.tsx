"use client"

import { useLocale } from "next-intl"
import { Binary as BinaryAnimated } from "@/components/animate-ui/icons/binary"
import { Blocks as BlocksAnimated } from "@/components/animate-ui/icons/blocks"
import { BrushCleaning as BrushAnimated } from "@/components/animate-ui/icons/brush-cleaning"
import { Gauge as GaugeAnimated } from "@/components/animate-ui/icons/gauge"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { PartyPopper as PartyPopperAnimated } from "@/components/animate-ui/icons/party-popper"
import { Terminal as TerminalAnimated } from "@/components/animate-ui/icons/terminal"
import type { Dict, Localized } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BLOCKS_ENABLED } from "@/lib/config/features"

const features = [
  {
    icon: PartyPopperAnimated,
    title: {
      en: "Animations & Effects",
      ru: "Анимации и эффекты",
    } as Localized,
    description: {
      en: "Border Beam, text effects and other animations for attractive interfaces",
      ru: "Border Beam, текстовые эффекты и другие анимации для выразительных интерфейсов",
    } as Localized,
    animated: true,
  },
  {
    icon: GaugeAnimated,
    title: {
      en: "Instant Installation",
      ru: "Мгновенная установка",
    } as Localized,
    description: {
      en: "One CLI command — and the component is in your project. No package dependencies",
      ru: "Одна команда CLI — и компонент в вашем проекте. Без лишних зависимостей",
    } as Localized,
    animated: true,
  },
  {
    icon: BinaryAnimated,
    title: { en: "Full Control", ru: "Полный контроль" } as Localized,
    description: {
      en: "Code is copied to your project. Modify anything without restrictions",
      ru: "Код копируется в ваш проект. Меняйте что угодно без ограничений",
    } as Localized,
    animated: true,
  },
  {
    icon: BrushAnimated,
    title: { en: "Flexible Styling", ru: "Гибкая стилизация" } as Localized,
    description: {
      en: "Tailwind CSS and CSS variables for easy customization to match your brand",
      ru: "Tailwind CSS и CSS-переменные — легко подогнать под ваш бренд",
    } as Localized,
    animated: true,
  },
  {
    icon: BlocksAnimated,
    title: { en: "Ready-made Blocks", ru: "Готовые блоки" } as Localized,
    description: {
      en: "Sections for landing pages, forms, cards — assemble pages like building blocks",
      ru: "Секции для лендингов, формы, карточки — собирайте страницы как из кубиков",
    } as Localized,
    animated: true,
  },
  {
    icon: TerminalAnimated,
    title: { en: "shadcn CLI", ru: "shadcn CLI" } as Localized,
    description: {
      en: "Full compatibility with shadcn CLI. Use familiar commands",
      ru: "Полная совместимость с shadcn CLI. Привычные команды",
    } as Localized,
    animated: true,
  },
]

const en = {
  title: "Everything for Modern Development",
  description: "Components that save time and help you build quality products",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Всё для современной разработки",
    description:
      "Компоненты, которые экономят время и помогают делать качественные продукты",
  },
}

export function Features() {
  const locale = useLocale()
  const t = content[locale as Locale]
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features
            .filter(
              (feature) => BLOCKS_ENABLED || feature.icon !== BlocksAnimated,
            )
            .map((feature) => {
              const Icon = feature.icon
              const isAnimated = "animated" in feature && feature.animated

              const cardContent = (
                <div className="flex gap-4 sm:block">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 sm:mb-4">
                    {isAnimated ? (
                      <Icon size={24} className="text-primary" />
                    ) : (
                      <Icon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">
                      {pick(feature.title, locale)}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {pick(feature.description, locale)}
                    </p>
                  </div>
                </div>
              )

              if (isAnimated) {
                return (
                  <AnimateIcon
                    key={feature.title.en}
                    animateOnHover
                    animateOnTap
                    asChild
                  >
                    <div
                      className="relative group border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      style={
                        {
                          cornerShape: "squircle",
                          borderRadius: "1.5rem",
                        } as React.CSSProperties
                      }
                    >
                      {cardContent}
                    </div>
                  </AnimateIcon>
                )
              }

              return (
                <div
                  key={feature.title.en}
                  className="relative group border bg-card p-6 hover:shadow-lg transition-shadow"
                  style={
                    {
                      cornerShape: "squircle",
                      borderRadius: "1.5rem",
                    } as React.CSSProperties
                  }
                >
                  {cardContent}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
