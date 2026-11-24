import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BookingCalendar } from "@/registry/gooseui/ui/booking-calendar"
import {
  BookingCalendarDemo,
  BookingCalendarErrorDemo,
  BookingCalendarRangeDemo,
  BookingCalendarSundayDemo,
} from "./booking-calendar-demo"
import { buildSlots, RU_LABELS } from "./demo-slots"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature1Description: "Adapts the layout to container width",
  auditFeature2Description: "Colors the day cell focus ring",
  title: "Booking Calendar",
  description:
    "Server-rendered month grid with free times on native radio inputs, JavaScript only for onBook",
  intro:
    "Pick a day, then a time. The grid is rendered on the server, days and times are native radio inputs, months switch through hidden radios and :checked, and the times of the chosen day appear through a sibling selector. Inside a <form> the choice is sent as date and time with no JavaScript at all. A small client island loads only when you pass onBook or onDateChange: it runs the callback, shows the pending state and clears a time left over from another day.",
  browserSupport: "Browser Support",
  browserSupportHasName: ":has()",
  browserSupportHasDescription:
    "Dims the Book button until a time is picked; without it the button stays visible.",
  browserSupportContainerName: "Container queries",
  browserSupportContainerDescription:
    "Moves the times panel next to the grid on wide cards; without them it stays below.",
  preview: "Preview",
  previewHint:
    "Keyboard: Tab reaches the month switch, the days and the times; arrows move inside each group like any radio buttons.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  sundayTitle: "Week starts on Sunday",
  sundayText:
    "weekStartsOn takes 0 for Sunday through 6 for Saturday. The default is Monday.",
  rangeTitle: "Limited range",
  rangeText:
    "minDate and maxDate limit both the grid and the month buttons. In a narrow container the times panel moves under the grid.",
  errorTitle: "Async booking and errors",
  errorText:
    "onBook may return a promise. While it is pending the button is locked and shows a spinner. If the promise rejects, the error label is shown and the selected time stays.",
  formTitle: "In a form, without JavaScript",
  formText:
    "Without onBook the calendar is a pure server component. Put it in a <form>: the Book button submits it and FormData gets date and time. Rename the fields with name and timeName.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescriptions: {
    slots: 'Free times keyed by day in "YYYY-MM-DD" format',
    onBook:
      "Called with the chosen day and time, may be async. Loads the client island",
    onDateChange:
      "Called when the selected day changes. Loads the client island",
    name: "Form field name of the day",
    timeName: "Form field name of the time",
    locale: "Locale for month and weekday names",
    weekStartsOn: "First day of the week, 0 is Sunday",
    minDate: "Earliest bookable day",
    maxDate: "Latest bookable day",
    defaultDate: "Day selected on first render",
    formatTime: "Formats a time string for display",
    note: "Small note under the times heading, e.g. a time zone",
    labels: "Overrides for every built-in text",
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "No JavaScript",
      "the grid, month switch, day and time choice work in a Server Component",
    ],
    ["Native form", "date and time go to FormData through name and timeName"],
    [
      "Native keyboard",
      "months, days and times are radio groups: one Tab stop each, arrows inside",
    ],
    ["Pending state", "the island locks the button while onBook runs"],
    ["Animation", "CSS transitions respect reduced-motion preferences"],
    [
      "Container queries",
      "the layout reacts to the card width, not the viewport",
    ],
    ["Any locale", "names and full dates for screen readers come from Intl"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature1Description: "Меняет раскладку по ширине контейнера",
    auditFeature2Description: "Окрашивает кольцо фокуса дня",
    title: "Booking Calendar",
    description:
      "Сетка месяца со свободным временем на радиокнопках, рендер на сервере, JavaScript только для onBook",
    intro:
      "Сначала день, потом время. Сетка рисуется на сервере, дни и время сделаны на нативных радиокнопках, месяцы переключаются скрытыми радиокнопками и :checked, а время выбранного дня показывает соседний селектор. Внутри <form> выбор уходит полями date и time вообще без JavaScript. Маленький клиентский островок грузится, только если передать onBook или onDateChange: он вызывает колбэк, показывает ожидание и сбрасывает время, оставшееся от другого дня.",
    browserSupport: "Поддержка браузеров",
    browserSupportHasName: ":has()",
    browserSupportHasDescription:
      "Приглушает кнопку «Записаться» до выбора времени, а без него кнопка остаётся видимой.",
    browserSupportContainerName: "Контейнерные запросы",
    browserSupportContainerDescription:
      "Ставят панель времени рядом с сеткой в широкой карточке, а без них она остаётся внизу.",
    preview: "Превью",
    previewHint:
      "Клавиатура: Tab переходит к переключателю месяцев, дням и времени, стрелки двигают внутри каждой группы, как у любых радиокнопок.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    sundayTitle: "Неделя с воскресенья",
    sundayText:
      "weekStartsOn принимает число от 0 (воскресенье) до 6 (суббота). По умолчанию неделя начинается с понедельника.",
    rangeTitle: "Ограниченный диапазон",
    rangeText:
      "minDate и maxDate ограничивают и сетку, и кнопки переключения месяцев. В узком контейнере панель со временем уходит под сетку.",
    errorTitle: "Асинхронная запись и ошибки",
    errorText:
      "onBook может вернуть промис. Пока он не завершился, кнопка заблокирована и показывает спиннер. Если промис отклонён, появляется текст ошибки, а выбранное время остаётся.",
    formTitle: "В форме, без JavaScript",
    formText:
      "Без onBook календарь остаётся чистым серверным компонентом. Положите его в <form>: кнопка «Записаться» отправит форму, а в FormData попадут date и time. Имена полей меняются через name и timeName.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescriptions: {
      slots: "Свободное время по дням, ключ в формате «YYYY-MM-DD»",
      onBook:
        "Вызывается с выбранным днём и временем, может быть асинхронным. Подключает клиентский островок",
      onDateChange:
        "Вызывается при смене выбранного дня. Подключает клиентский островок",
      name: "Имя поля формы для дня",
      timeName: "Имя поля формы для времени",
      locale: "Локаль для названий месяцев и дней недели",
      weekStartsOn: "Первый день недели, 0 значит воскресенье",
      minDate: "Самый ранний день для записи",
      maxDate: "Самый поздний день для записи",
      defaultDate: "День, выбранный сразу",
      formatTime: "Форматирует строку времени для показа",
      note: "Подпись под заголовком панели, например часовой пояс",
      labels: "Замена любого встроенного текста",
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Без JavaScript",
        "сетка, смена месяца, выбор дня и времени работают в серверном компоненте",
      ],
      [
        "Обычная форма",
        "день и время попадают в FormData через name и timeName",
      ],
      [
        "Нативная клавиатура",
        "месяцы, дни и время это группы радиокнопок: один Tab на группу, стрелки внутри",
      ],
      ["Ожидание", "островок блокирует кнопку, пока выполняется onBook"],
      ["Анимация", "CSS-переходы учитывают настройку уменьшения движения"],
      [
        "Контейнерные запросы",
        "раскладка зависит от ширины карточки, а не окна",
      ],
      [
        "Любая локаль",
        "названия и полные даты для скринридеров берутся из Intl",
      ],
    ],
  },
}

const propRows: [keyof typeof en.propDescriptions, string, string][] = [
  ["slots", "Record<string, string[]>", "-"],
  ["onBook", "(date, time) => void | Promise<void>", "-"],
  ["onDateChange", "(date: string) => void", "-"],
  ["name", "string", '"date"'],
  ["timeName", "string", '"time"'],
  ["locale", "string", '"en-US"'],
  ["weekStartsOn", "0 | 1 | 2 | 3 | 4 | 5 | 6", "1"],
  ["minDate", "string | Date", "-"],
  ["maxDate", "string | Date", "-"],
  ["defaultDate", "string", "-"],
  ["formatTime", "(time: string) => string", "-"],
  ["note", "ReactNode", "-"],
  ["labels", "Partial<BookingCalendarLabels>", "-"],
  ["className", "string", "-"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function BookingCalendarPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },

    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "container-queries",
              description: t.auditFeature1Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature2Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <BookingCalendarDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/booking-calendar" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`"use client"

import { BookingCalendar } from "@/components/ui/booking-calendar"

const slots = {
  "2026-03-16": ["09:00", "10:30", "14:00"],
  "2026-03-17": ["12:00", "15:30"],
}

export default function Example() {
  return (
    <BookingCalendar
      slots={slots}
      minDate={new Date()}
      onBook={async (date, time) => {
        await fetch("/api/book", {
          method: "POST",
          body: JSON.stringify({ date, time }),
        })
      }}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <form
                id="booking-form"
                action="#booking-form"
                className="flex justify-center rounded-lg bg-muted/30 px-4 py-8"
              >
                <BookingCalendar
                  className="max-w-2xl"
                  slots={buildSlots(45)}
                  locale={locale === "ru" ? "ru-RU" : "en-US"}
                  minDate={new Date()}
                  labels={locale === "ru" ? RU_LABELS : undefined}
                />
              </form>
              <CodeBlock className="mt-4">{`// Server Component, no client JavaScript
<form action={bookAction}>
  <BookingCalendar slots={slots} minDate={new Date()} />
</form>

async function bookAction(formData: FormData) {
  "use server"
  const date = formData.get("date") // "2026-03-16"
  const time = formData.get("time") // "10:30"
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sundayTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sundayText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BookingCalendarSundayDemo />
              </div>
              <CodeBlock className="mt-4">{`<BookingCalendar slots={slots} locale="en-US" weekStartsOn={0} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.rangeTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.rangeText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BookingCalendarRangeDemo />
              </div>
              <CodeBlock className="mt-4">{`const today = new Date()
const inTwoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)

<BookingCalendar
  className="max-w-sm"
  slots={slots}
  minDate={today}
  maxDate={inTwoWeeks}
  note="Booking is open for the next two weeks"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.errorTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.errorText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BookingCalendarErrorDemo />
              </div>
              <CodeBlock className="mt-4">{`<BookingCalendar
  slots={slots}
  labels={{ error: "This time was just taken. Pick another one." }}
  onBook={async (date, time) => {
    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({ date, time }),
    })
    if (!res.ok) throw new Error("Slot taken")
  }}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.default}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {propRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDescriptions[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
