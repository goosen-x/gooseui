import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CookieConsentCardDemo,
  CookieConsentCategoriesDemo,
  CookieConsentDemo,
  CookieConsentHookDemo,
} from "./cookie-consent-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Cookie banner on <dialog> and CSS with a stored choice and a hook",
  intro:
    'The banner is a non-modal <dialog open> with a <form method="dialog">: every button closes it without JavaScript, the settings panel is a <details>, the switches are checkboxes. Entry and exit are CSS transitions with @starting-style. The client part is small: it saves the choice to localStorage, reopens the banner after a reset and calls the callbacks. A one-line inline script hides the banner before the first paint if a choice is already stored, so it never flashes.',
  browserSupport: "Browser Support",
  supportDescription0: "Displays the consent banner.",
  supportDescription1: "Styles the banner based on its state.",
  supportDescription2: "Animates the banner entrance.",
  supportDescription3: "Animates the banner exit.",
  browserSupportText:
    "The banner itself needs only <dialog>. Without @starting-style and transition-behavior it appears and disappears without animation. With JavaScript disabled the banner works and closes, but the choice is not remembered.",
  preview: "Preview",
  previewHint:
    'Here the banner is rendered inside the frame with position="absolute". Answer it, then press the button to bring it back.',
  installation: "Installation",
  usage: "Usage",
  usageText:
    "Put the banner once in the root layout. It is a server component: the HTML arrives with the banner, and the inline script removes it at once for people who already answered.",
  examples: "Examples",
  cardTitle: "Corner card",
  cardText: 'variant="card" takes less space. side picks the corner.',
  categoriesTitle: "Categories",
  categoriesText:
    "Pass categories to show a Customize button with switches. Required categories are locked on.",
  hookTitle: "Reading the choice",
  hookText:
    "useCookieConsent reads the same storage key and updates when the choice changes. This card follows the banner from the previous example.",
  callbacksTitle: "Callbacks and event",
  callbacksText:
    'onAccept fires for Accept all and for saved preferences (status "custom"), onDecline for Decline and the close button. Functions can be passed only from a client component. From a server layout listen to the bubbling "cookieconsent" event, its detail is the stored value.',
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescs: {
    storageKey: "localStorage key for the choice",
    variant: "Bottom bar or corner card",
    position:
      "fixed pins to the viewport, absolute stays inside the nearest positioned parent",
    side: "Corner for the card variant",
    categories: "Categories with switches, see the type below",
    labels:
      "Texts: title, description, accept, decline, customize, save, close",
    delay: "Delay before showing, ms",
    showIcon: "Show the cookie icon",
    onAccept: "Called on accept or saved preferences (client components only)",
    onDecline: "Called on decline or close (client components only)",
    className: "Additional CSS classes for the wrapper",
  },
  hook: "useCookieConsent",
  hookIntro:
    'Exported from the same file. Takes the storage key ("cookie-consent" by default) and returns:',
  hookReturns: {
    consent:
      "Stored value { status, categories, timestamp } or null if there is no answer",
    isLoaded: "False on the server and during hydration",
    isAllowed: "Checks whether a category was allowed",
    reset: "Clears the choice and shows the banner again",
  },
  returnHeaders: { name: "Field", type: "Type", description: "Description" },
  features: "Features",
  featureList: [
    [
      "No flash",
      "an inline script removes the banner during HTML parsing if a choice is stored",
    ],
    [
      "Works without JavaScript",
      'the buttons close the <dialog> through <form method="dialog">, Customize is a <details>',
    ],
    [
      "Synced",
      "every banner and hook with the same key updates together, including other tabs",
    ],
    [
      "CSS animation",
      "@starting-style and transition-behavior: allow-discrete, off for reduced motion",
    ],
    [
      "Accessible",
      'a labelled dialog, real buttons and checkboxes with role="switch"; Enter in a switch does not submit the form',
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Cookie-баннер на <dialog> и CSS с сохранённым выбором и хуком",
    intro:
      'Баннер сделан на немодальном <dialog open> с <form method="dialog">: любая кнопка закрывает его без JavaScript, панель настроек это <details>, переключатели это чекбоксы. Появление и скрытие на CSS-переходах с @starting-style. Клиентская часть маленькая: сохраняет выбор в localStorage, снова показывает баннер после сброса и вызывает колбэки. Однострочный встроенный скрипт прячет баннер до первой отрисовки, если выбор уже сохранён, поэтому он не мигает.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает баннер согласия.",
    supportDescription1: "Меняет вид баннера в зависимости от состояния.",
    supportDescription2: "Анимирует появление баннера.",
    supportDescription3: "Анимирует исчезновение баннера.",
    browserSupportText:
      "Самому баннеру нужен только <dialog>. Без @starting-style и transition-behavior он появляется и исчезает без анимации. С отключённым JavaScript баннер показывается и закрывается, но выбор не запоминается.",
    preview: "Превью",
    previewHint:
      'Здесь баннер нарисован внутри рамки через position="absolute". Ответьте на него, а потом верните кнопкой.',
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Поставьте баннер один раз в корневой layout. Это серверный компонент: баннер приходит в HTML, а встроенный скрипт сразу убирает его у тех, кто уже ответил.",
    examples: "Примеры",
    cardTitle: "Карточка в углу",
    cardText: 'variant="card" занимает меньше места. Угол задаёт side.',
    categoriesTitle: "Категории",
    categoriesText:
      "Если передать categories, появится кнопка «Настроить» с переключателями. Обязательные категории включены и заблокированы.",
    hookTitle: "Чтение выбора",
    hookText:
      "useCookieConsent читает тот же ключ и обновляется, когда выбор меняется. Эта карточка следит за баннером из предыдущего примера.",
    callbacksTitle: "Колбэки и событие",
    callbacksText:
      'onAccept срабатывает на «Принять все» и на сохранение настроек (status "custom"), onDecline на «Отклонить» и крестик. Функции можно передать только из клиентского компонента. В серверном layout слушайте всплывающее событие "cookieconsent", в detail лежит сохранённое значение.',
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescs: {
      storageKey: "Ключ в localStorage для выбора",
      variant: "Полоса снизу или карточка в углу",
      position:
        "fixed привязывает к окну, absolute оставляет внутри ближайшего позиционированного родителя",
      side: "Угол для карточки",
      categories: "Категории с переключателями, тип ниже",
      labels:
        "Тексты: title, description, accept, decline, customize, save, close",
      delay: "Задержка перед показом, мс",
      showIcon: "Показывать иконку cookie",
      onAccept:
        "Вызывается при согласии или сохранении настроек (только из клиентского компонента)",
      onDecline:
        "Вызывается при отказе или закрытии (только из клиентского компонента)",
      className: "Дополнительные CSS-классы обёртки",
    },
    hook: "useCookieConsent",
    hookIntro:
      'Экспортируется из того же файла. Принимает ключ хранилища (по умолчанию "cookie-consent") и возвращает:',
    hookReturns: {
      consent:
        "Сохранённое значение { status, categories, timestamp } или null, если ответа нет",
      isLoaded: "false на сервере и во время гидрации",
      isAllowed: "Проверяет, разрешена ли категория",
      reset: "Стирает выбор и снова показывает баннер",
    },
    returnHeaders: { name: "Поле", type: "Тип", description: "Описание" },
    features: "Возможности",
    featureList: [
      [
        "Без мигания",
        "встроенный скрипт убирает баннер ещё при разборе HTML, если выбор сохранён",
      ],
      [
        "Работает без JavaScript",
        'кнопки закрывают <dialog> через <form method="dialog">, «Настроить» сделано на <details>',
      ],
      [
        "Синхронизация",
        "все баннеры и хуки с одним ключом обновляются вместе, в том числе в других вкладках",
      ],
      [
        "CSS-анимация",
        "@starting-style и transition-behavior: allow-discrete, при reduced motion выключена",
      ],
      [
        "Доступность",
        'подписанный dialog, настоящие кнопки и чекбоксы с role="switch"; Enter в переключателе не отправляет форму',
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Cookie Consent", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function CookieConsentPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const loc = locale as Locale
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "hook", title: t.hook, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["storageKey", "string", '"cookie-consent"', t.propDescs.storageKey],
    ["variant", '"bar" | "card"', '"bar"', t.propDescs.variant],
    ["position", '"fixed" | "absolute"', '"fixed"', t.propDescs.position],
    ["side", '"left" | "right"', '"right"', t.propDescs.side],
    ["categories", "CookieCategory[]", "-", t.propDescs.categories],
    ["labels", "Partial<CookieConsentLabels>", "-", t.propDescs.labels],
    ["delay", "number", "0", t.propDescs.delay],
    ["showIcon", "boolean", "true", t.propDescs.showIcon],
    [
      "onAccept",
      "(value: CookieConsentValue) => void",
      "-",
      t.propDescs.onAccept,
    ],
    [
      "onDecline",
      "(value: CookieConsentValue) => void",
      "-",
      t.propDescs.onDecline,
    ],
    ["className", "string", "-", t.propDescs.className],
  ]

  const hookRows: [string, string, string][] = [
    ["consent", "CookieConsentValue | null", t.hookReturns.consent],
    ["isLoaded", "boolean", t.hookReturns.isLoaded],
    ["isAllowed", "(category: string) => boolean", t.hookReturns.isAllowed],
    ["reset", "() => void", t.hookReturns.reset],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Cookie Consent" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.supportDescription0,
            },
            {
              featureId: "has",
              description: t.supportDescription1,
            },
            {
              featureId: "starting-style",
              description: t.supportDescription2,
            },
            {
              featureId: "transition-behavior",
              description: t.supportDescription3,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12 sm:px-8">
            <CookieConsentDemo locale={loc} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/cookie-consent" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { CookieConsent } from "@/components/ui/cookie-consent"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.cardTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.cardText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8 sm:px-8">
                <CookieConsentCardDemo locale={loc} />
              </div>
              <CodeBlock className="mt-4">{`<CookieConsent variant="card" side="left" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.categoriesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.categoriesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8 sm:px-8">
                <CookieConsentCategoriesDemo locale={loc} />
              </div>
              <CodeBlock className="mt-4">{`<CookieConsent
  variant="card"
  categories={[
    { id: "necessary", label: "Necessary", required: true },
    { id: "analytics", label: "Analytics", defaultEnabled: true },
    { id: "marketing", label: "Marketing" },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.hookTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.hookText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <CookieConsentHookDemo />
              </div>
              <CodeBlock className="mt-4">{`import { useCookieConsent } from "@/components/ui/cookie-consent"

function Analytics() {
  const { isAllowed } = useCookieConsent()
  if (!isAllowed("analytics")) return null
  return <script src="/analytics.js" async />
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.callbacksTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.callbacksText}
              </p>
              <CodeBlock>{`<CookieConsent
  storageKey="my-site-consent"
  delay={800}
  labels={{ title: "Cookies", accept: "OK" }}
  onAccept={(value) => console.log(value.status, value.categories)}
  onDecline={() => console.log("declined")}
/>

// In a server layout
// window.addEventListener("cookieconsent", (e) => console.log(e.detail))`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, type, def, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock>{`type CookieCategory = {
  id: string
  label: string
  description?: string
  required?: boolean
  defaultEnabled?: boolean
}

type CookieConsentValue = {
  status: "accepted" | "declined" | "custom"
  categories: Record<string, boolean>
  timestamp: number
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="hook" className={h2}>
            {t.hook}
          </h2>
          <p className="text-sm text-muted-foreground">{t.hookIntro}</p>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.returnHeaders.name}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.returnHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.returnHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {hookRows.map(([name, type, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{desc}</td>
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
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
