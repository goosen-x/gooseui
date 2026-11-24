import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  type Testimonial,
  TestimonialRotator,
} from "@/registry/gooseui/ui/testimonial-rotator"

const en = {
  items: [
    {
      quote:
        "We replaced three internal tools with one dashboard. Onboarding a new teammate now takes an afternoon.",
      author: "Lena Hart",
      avatar: "/demo/testimonial-rotator/lena-hart.webp",
      role: "Operations lead, Northwind Labs",
    },
    {
      quote:
        "The API is boring in the best way. It does what the docs say, every single time.",
      author: "Marco Silva",
      avatar: "/demo/testimonial-rotator/marco-silva.webp",
      role: "Backend engineer, Fieldnote",
    },
    {
      quote:
        "Support answered faster than our own team chat. That alone made us stay.",
      author: "Priya Nair",
      avatar: "/demo/testimonial-rotator/priya-nair.webp",
      role: "Founder, Little Orbit",
    },
    {
      quote:
        "We shipped the redesign two weeks early and nobody had to work a weekend.",
      author: "Tom Becker",
      avatar: "/demo/testimonial-rotator/tom-becker.webp",
      role: "Product manager, Quietbyte",
    },
  ] satisfies Testimonial[],
  show: (author: string) => `Show testimonial from ${author}`,
  region: "Testimonials",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    items: [
      {
        quote:
          "Заменили три внутренних сервиса одной панелью. Новый сотрудник теперь осваивается за полдня.",
        author: "Лена Харитонова",
        avatar: "/demo/testimonial-rotator/lena-hart.webp",
        role: "Руководитель операций, Северный ветер",
      },
      {
        quote:
          "API скучный в хорошем смысле: делает ровно то, что написано в документации, каждый раз.",
        author: "Марк Сильвестров",
        avatar: "/demo/testimonial-rotator/marco-silva.webp",
        role: "Бэкенд-разработчик, Полевые заметки",
      },
      {
        quote:
          "Поддержка отвечала быстрее, чем наш собственный рабочий чат. Уже ради этого остались.",
        author: "Полина Наумова",
        avatar: "/demo/testimonial-rotator/priya-nair.webp",
        role: "Основатель, Маленькая орбита",
      },
      {
        quote:
          "Выпустили редизайн на две недели раньше, и никому не пришлось работать в выходные.",
        author: "Тимур Беккер",
        avatar: "/demo/testimonial-rotator/tom-becker.webp",
        role: "Продакт-менеджер, Тихий байт",
      },
    ],
    show: (author: string) => `Показать отзыв: ${author}`,
    region: "Отзывы",
  },
}

// Server components: the rotator needs no JavaScript
function textFor(locale: Locale) {
  return content[locale]
}

export function TestimonialRotatorDemo({ locale }: { locale: Locale }) {
  const t = textFor(locale)
  return (
    <div className="w-full px-6">
      <TestimonialRotator
        items={t.items}
        labels={{ show: t.show, region: t.region }}
      />
    </div>
  )
}

export function TestimonialRotatorHorizontalDemo({
  locale,
}: {
  locale: Locale
}) {
  const t = textFor(locale)
  return (
    <div className="w-full px-6">
      <TestimonialRotator
        items={t.items}
        orientation="horizontal"
        interval={4000}
        labels={{ show: t.show, region: t.region }}
      />
    </div>
  )
}

export function TestimonialRotatorManualDemo({ locale }: { locale: Locale }) {
  const t = textFor(locale)
  return (
    <div className="w-full px-6">
      <TestimonialRotator
        items={t.items.slice(0, 3)}
        autoPlay={false}
        defaultIndex={1}
        labels={{ show: t.show, region: t.region }}
      />
    </div>
  )
}
