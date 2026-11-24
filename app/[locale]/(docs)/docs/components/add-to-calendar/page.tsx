import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  AddToCalendarAllDayDemo,
  AddToCalendarDemo,
  AddToCalendarOutlineDemo,
} from "./add-to-calendar-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  auditFeature0Description: "Opens and closes the popup",
  auditFeature1Description: "Positions the popup near its trigger",
  auditFeature2Description: "Animates the initial appearance",
  auditFeature3Description: "Turns the arrow when the menu opens",
  auditFeature4Description: "Animates the menu closing",
  title: "Add to Calendar",
  description:
    "Button with links to Google, Apple, Outlook and an .ics download",
  intro:
    "AddToCalendar is a button with a menu: open the event in Google Calendar or Outlook on the web, add it to Apple Calendar, or download an .ics file for any other app. Apple Calendar has no web link, so its item downloads the same .ics file and Calendar opens it on macOS and iOS. The component ships no JavaScript: the menu is a native popover, and the file is built on the server by the ics utility and embedded as a data: link with the download attribute. It works with JavaScript turned off. Service logos are inlined from simple-icons.",
  browserSupport: "Browser Support",
  supportDescription0: "Opens the calendar menu.",
  supportDescription1: "Positions the menu near the button.",
  supportDescription2: "Animates the menu entrance.",
  browserSupportText:
    "The menu relies on popover. Where anchor positioning is available, the menu drops down from the button and flips at the screen edges. Elsewhere it opens as a panel at the bottom of the screen.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  providersTitle: "Choose providers",
  providersText:
    "List the menu items in the order you want. apple and ics download the same file. office365 opens Outlook for work and school accounts.",
  allDayTitle: "All-day event",
  allDayText:
    "With allDay only the dates count. end is the last day of the event, inclusive.",
  labelsTitle: "Your own texts",
  labelsText:
    "All texts are English by default and can be replaced through labels. The Russian version of this page does exactly that.",
  props: "Props",
  headers: {
    prop: "Prop",
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propEvent:
    "The event: title, start, end or duration, description, location, reminder",
  propProviders: "Menu items in order",
  propFilename:
    "Name of the downloaded file without .ics. Defaults to the title",
  propLabels:
    "Texts of the button and menu items: trigger, google, apple, outlook, office365, ics",
  propVariant: "Button style",
  propSize: "Button size",
  propAlign: "Menu alignment relative to the button",
  propDisabled: "Disable the button",
  propClassName: "Extra classes for the button",
  propContentClassName: "Extra classes for the menu panel",
  event: "CalendarEvent",
  eventText:
    "The same object goes to the component and to every function of the ics utility.",
  fieldTitle: "Event name",
  fieldStart: "Start: Date, ISO string or timestamp. Stored in UTC",
  fieldEnd: "End. For allDay, the last day of the event",
  fieldDuration: "Length in minutes when end is missing",
  fieldAllDay: "Whole-day event",
  fieldText:
    "Shown in the event details. URL goes into the description for Google and Outlook",
  fieldUid: "Stable id. Keep it to update or cancel the event later",
  fieldReminder:
    "Minutes before the start, or { minutesBefore, description }. Becomes a VALARM",
  fieldSequence:
    "Revision number. Bump it every time you resend a changed event",
  fieldCancelled: "Adds STATUS:CANCELLED and sends METHOD:CANCEL",
  utility: "ics utility",
  utilityText:
    "The component depends on @gooseui/ics, a small iCalendar builder with no dependencies. It works on the server too, for example to attach an invite to an email.",
  utilityInstall: "Install it on its own:",
  fnBuild: "Full calendar file with one or more events",
  fnGoogle: "Link that opens a prefilled event in Google Calendar",
  fnOutlook: 'Same for Outlook on the web. Pass "office" for work accounts',
  fnEscape: "Escapes backslashes, commas, semicolons and line breaks",
  fnFold:
    "Splits lines longer than 75 octets without breaking UTF-8 characters",
  fnDate: "UTC timestamp like 20270415T160000Z",
  cancelTitle: "Cancelling an event",
  cancelText:
    "Send a file with the same uid and cancelled: true. Its SEQUENCE is higher than the original one, so the calendar marks the event as cancelled or removes it.",
  features: "Features",
  featureList: [
    [
      "RFC 5545",
      "Text escaping, line folding at 75 octets, CRLF endings and UTC times",
    ],
    ["Reminders", "VALARM with your own text, the event title by default"],
    [
      "No JavaScript",
      "A server component. The download is a data: link, so there is no blob to clean up",
    ],
    [
      "Keyboard",
      "Tab reaches the button, Enter opens the menu, Tab moves through the items, Escape closes it and returns focus to the button",
    ],
    [
      "Server rendering",
      "Render it from a server component. Without a uid the file gets a random id and the current time, which would differ between the server and the client render",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Открывает и закрывает всплывающее окно",
    auditFeature1Description: "Размещает окно рядом с кнопкой",
    auditFeature2Description: "Анимирует появление",
    auditFeature3Description: "Поворачивает стрелку открытого меню",
    auditFeature4Description: "Анимирует закрытие меню",
    title: "Add to Calendar",
    description:
      "Кнопка со ссылками в Google, Apple, Outlook и скачиванием .ics",
    intro:
      "AddToCalendar показывает кнопку с меню: открыть событие в Google Calendar или Outlook в браузере либо скачать файл .ics для любого другого приложения. Для Apple Календаря веб-ссылки нет, поэтому его пункт скачивает тот же файл .ics, а на macOS и iOS его открывает Календарь. JavaScript в браузер не уходит: меню сделано на нативном popover, а файл собирает на сервере утилита ics и вшивает в ссылку data: с атрибутом download. Всё работает даже с выключенным JavaScript. Логотипы сервисов встроены из simple-icons.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Открывает меню календаря.",
    supportDescription1: "Размещает меню рядом с кнопкой.",
    supportDescription2: "Анимирует появление меню.",
    browserSupportText:
      "Меню держится на popover. Там, где есть anchor positioning, оно выпадает под кнопкой и само переворачивается у края экрана. В остальных браузерах меню открывается панелью внизу экрана.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    providersTitle: "Выбор календарей",
    providersText:
      "Перечислите пункты меню в нужном порядке. apple и ics скачивают один и тот же файл. office365 открывает Outlook для рабочих и учебных аккаунтов.",
    allDayTitle: "Событие на весь день",
    allDayText:
      "С allDay учитываются только даты. end означает последний день события включительно.",
    labelsTitle: "Свои тексты",
    labelsText:
      "По умолчанию все тексты английские, их можно заменить через labels. Русская версия этой страницы так и делает.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propEvent:
      "Событие: название, начало, конец или длительность, описание, место, напоминание",
    propProviders: "Пункты меню по порядку",
    propFilename:
      "Имя скачиваемого файла без .ics. По умолчанию берётся из названия",
    propLabels:
      "Тексты кнопки и пунктов меню: trigger, google, apple, outlook, office365, ics",
    propVariant: "Стиль кнопки",
    propSize: "Размер кнопки",
    propAlign: "Выравнивание меню относительно кнопки",
    propDisabled: "Отключить кнопку",
    propClassName: "Дополнительные классы для кнопки",
    propContentClassName: "Дополнительные классы для панели меню",
    event: "CalendarEvent",
    eventText:
      "Один и тот же объект передаётся компоненту и всем функциям утилиты ics.",
    fieldTitle: "Название события",
    fieldStart: "Начало: Date, ISO-строка или timestamp. В файл пишется в UTC",
    fieldEnd: "Конец. Для allDay это последний день события",
    fieldDuration: "Длительность в минутах, если нет end",
    fieldAllDay: "Событие на весь день",
    fieldText:
      "Показываются в подробностях события. Для Google и Outlook url добавляется в описание",
    fieldUid:
      "Постоянный id. Сохраните его, чтобы потом обновить или отменить событие",
    fieldReminder:
      "За сколько минут напомнить или { minutesBefore, description }. Превращается в VALARM",
    fieldSequence:
      "Номер версии. Увеличивайте при каждой повторной отправке изменённого события",
    fieldCancelled: "Добавляет STATUS:CANCELLED и METHOD:CANCEL",
    utility: "Утилита ics",
    utilityText:
      "Компонент зависит от @gooseui/ics, маленького сборщика iCalendar без зависимостей. Он работает и на сервере, например чтобы приложить приглашение к письму.",
    utilityInstall: "Отдельная установка:",
    fnBuild: "Готовый файл календаря с одним или несколькими событиями",
    fnGoogle: "Ссылка, которая открывает заполненное событие в Google Calendar",
    fnOutlook: 'То же для Outlook в браузере. "office" для рабочих аккаунтов',
    fnEscape:
      "Экранирует обратную косую черту, запятые, точки с запятой и переносы строк",
    fnFold: "Переносит строки длиннее 75 октетов, не разрывая символы UTF-8",
    fnDate: "Время в UTC вида 20270415T160000Z",
    cancelTitle: "Отмена события",
    cancelText:
      "Отправьте файл с тем же uid и cancelled: true. SEQUENCE у него выше, чем у исходного, поэтому календарь пометит событие отменённым или уберёт его.",
    features: "Возможности",
    featureList: [
      [
        "RFC 5545",
        "Экранирование текста, перенос строк по 75 октетов, окончания CRLF и время в UTC",
      ],
      [
        "Напоминания",
        "VALARM со своим текстом, по умолчанию с названием события",
      ],
      [
        "Без JavaScript",
        "Серверный компонент. Скачивание идёт по ссылке data:, поэтому чистить blob не нужно",
      ],
      [
        "Клавиатура",
        "Tab доходит до кнопки, Enter открывает меню, Tab ходит по пунктам, Escape закрывает его и возвращает фокус на кнопку",
      ],
      [
        "Рендер на сервере",
        "Рендерите компонент из серверного компонента. Без uid файл получает случайный id и текущее время, и они разойдутся между серверным и клиентским рендером",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const tableClass = "w-full text-sm min-w-[500px]"
const th = "text-left p-3 font-medium"

function Rows({ rows }: { rows: string[][] }) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row[0]} className="border-t">
          {row.map((cell, index) => (
            <td
              key={index}
              className={
                index === row.length - 1 ? "p-3" : "p-3 font-mono text-xs"
              }
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default async function AddToCalendarPage({ params }: Props) {
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
    { id: "event", title: t.event, level: 2 },
    { id: "ics-utility", title: t.utility, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const props = [
    ["event", "CalendarEvent", "-", t.propEvent],
    [
      "providers",
      '("google" | "apple" | "outlook" | "office365" | "ics")[]',
      '["google", "apple", "outlook", "ics"]',
      t.propProviders,
    ],
    ["filename", "string", "-", t.propFilename],
    ["labels", "Partial<AddToCalendarLabels>", "-", t.propLabels],
    ["variant", '"default" | "outline"', '"default"', t.propVariant],
    ["size", '"sm" | "md"', '"md"', t.propSize],
    ["align", '"start" | "center" | "end"', '"start"', t.propAlign],
    ["disabled", "boolean", "false", t.propDisabled],
    ["className", "string", "-", t.propClassName],
    ["contentClassName", "string", "-", t.propContentClassName],
  ]

  const fields = [
    ["title", "string", "-", t.fieldTitle],
    ["start", "Date | string | number", "-", t.fieldStart],
    ["end", "Date | string | number", "-", t.fieldEnd],
    ["duration", "number", "60", t.fieldDuration],
    ["allDay", "boolean", "false", t.fieldAllDay],
    ["description, location, url", "string", "-", t.fieldText],
    ["uid", "string", "random", t.fieldUid],
    ["reminder", "number | IcsReminder", "-", t.fieldReminder],
    ["sequence", "number", "0", t.fieldSequence],
    ["cancelled", "boolean", "false", t.fieldCancelled],
  ]

  const functions = [
    ["buildIcs(events, options?)", "string", t.fnBuild],
    ["googleCalendarUrl(event)", "string", t.fnGoogle],
    ["outlookCalendarUrl(event, account?)", "string", t.fnOutlook],
    ["escapeIcsText(value)", "string", t.fnEscape],
    ["foldIcsLine(line)", "string", t.fnFold],
    ["formatIcsDate(date)", "string", t.fnDate],
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
              featureId: "popover",
              description: t.auditFeature0Description,
            },
            {
              featureId: "anchor-positioning",
              description: t.auditFeature1Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature2Description,
            },
            {
              featureId: "has",
              description: t.auditFeature3Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature4Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <AddToCalendarDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/add-to-calendar" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { AddToCalendar } from "@/components/ui/add-to-calendar"

export function EventCard() {
  return (
    <AddToCalendar
      event={{
        uid: "meetup-2027-04@example.com",
        title: "Design systems meetup",
        start: "2027-04-15T19:00:00+02:00",
        duration: 120,
        location: "Main hall, 12 Example Street",
        reminder: 60,
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
              <h3 className="text-lg font-medium mb-3">{t.providersTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.providersText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AddToCalendarOutlineDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<AddToCalendar
  event={event}
  providers={["google", "apple", "outlook", "office365", "ics"]}
  variant="outline"
  size="sm"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.allDayTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.allDayText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AddToCalendarAllDayDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<AddToCalendar
  event={{
    title: "Team offsite",
    start: "2027-06-10",
    end: "2027-06-11", // two days, inclusive
    allDay: true,
  }}
  providers={["google", "ics"]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.labelsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.labelsText}
              </p>
              <CodeBlock>{`<AddToCalendar
  event={event}
  filename="meetup"
  labels={{
    trigger: "Save the date",
    apple: "Add to Apple Calendar",
    ics: "Download file",
  }}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className={tableClass}>
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <Rows rows={props} />
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="event" className={h2}>
            {t.event}
          </h2>
          <p className="text-sm text-muted-foreground">{t.eventText}</p>
          <div className="border rounded-lg overflow-x-auto">
            <table className={tableClass}>
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.name}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <Rows rows={fields} />
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="ics-utility" className={h2}>
            {t.utility}
          </h2>
          <p className="text-muted-foreground">{t.utilityText}</p>
          <p className="text-sm text-muted-foreground">{t.utilityInstall}</p>
          <InstallCommand packageName="@gooseui/ics" />
          <CodeBlock>{`import { buildIcs } from "@/lib/ics"

const ics = buildIcs(
  {
    uid: "booking-4821@example.com",
    title: "Consultation",
    start: new Date("2027-04-15T10:00:00Z"),
    duration: 50,
    description: "Video call. The link comes an hour before the start.",
    reminder: { minutesBefore: 60, description: "Consultation in an hour" },
  },
  { method: "REQUEST" },
)

// send it as an email attachment: text/calendar; method=REQUEST`}</CodeBlock>
          <div className="border rounded-lg overflow-x-auto">
            <table className={tableClass}>
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.name}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <Rows rows={functions} />
            </table>
          </div>
          <h3 className="text-lg font-medium">{t.cancelTitle}</h3>
          <p className="text-sm text-muted-foreground">{t.cancelText}</p>
          <CodeBlock>{`const cancel = buildIcs({
  uid: "booking-4821@example.com", // same uid as the invite
  title: "Consultation",
  start: new Date("2027-04-15T10:00:00Z"),
  duration: 50,
  cancelled: true, // SEQUENCE:1, STATUS:CANCELLED, METHOD:CANCEL
})`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}.</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
