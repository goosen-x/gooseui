import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ShareButtonsBrandDemo,
  ShareButtonsDemo,
  ShareButtonsLabeledDemo,
  ShareButtonsMenuDemo,
  ShareButtonsSizesDemo,
} from "./share-buttons-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Opens and closes the popup",
  auditFeature1Description: "Positions the popup near its trigger",
  auditFeature2Description: "Animates the initial appearance",
  auditFeature3Description: "Styles the open share menu",
  auditFeature4Description: "Animates the menu closing",
  auditFeature5Description: "Copies the link to the clipboard",
  auditFeature6Description: "Opens the system share menu",
  description:
    "Share links for social networks, copy link and the system share sheet",
  intro:
    "Share buttons: a configurable set of networks (Telegram, WhatsApp, X, LinkedIn, Facebook, email) plus Copy link, which falls back to a legacy method on plain http. Two sizes of the row (sm, default, lg) and two looks: neutral buttons that take the brand colour on hover, or brand-coloured right away. The system share sheet is the first menu item wherever the browser supports it, and in the row it shows up on touch devices. Comes as a row of buttons or a dropdown menu.",
  how: "The links and the menu are server-rendered HTML: plain <a> tags and a native popover, so they work with JavaScript turned off. Only Copy link and the system share sheet need JavaScript. They live in a small client island that appears after the page loads, and the same island fills in the page URL and title when you did not pass url and title.",
  browserSupport: "Browser Support",
  supportDescription0: "Opens the share menu.",
  supportDescription1: "Positions the menu near the button.",
  supportDescription2: "Animates the menu entrance.",
  browserSupportText:
    "The menu relies on popover. Where anchor positioning is available, the menu drops down from the button and flips at the screen edges. Elsewhere it opens as a panel at the bottom of the screen.",
  preview: "Preview",
  previewText: "The link of this page is shared. Try Copy link.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  propsTitle: "Props",
  labeledTitle: "With labels",
  labeledText:
    "showLabels prints network names next to the glyphs. networks sets the list and order.",
  sizesTitle: "Sizes",
  sizesText:
    "sm is 32px, default is 40px, lg is 48px. The icon grows with the button: 16, 20 and 24px.",
  variantsTitle: "Brand colours",
  variantsText:
    'By default the buttons are neutral and take the brand colour of the network on hover. variant="brand" colours them right away. Brand colours are an intentional exception to the shadcn tokens: they make the networks recognisable. Telegram and WhatsApp use a darker shade so white on top stays above 3:1.',
  menuTitle: "Dropdown menu",
  menuText:
    'layout="menu" packs everything into one button. After Copy link the menu stays open to show the confirmation.',
  props: {
    url: "Link to share. Pass it to make the links work without JavaScript. Otherwise the page URL is filled in on click",
    title: "Post title. Otherwise document.title is filled in on click",
    networks: "Networks and their order",
    copy: "Show Copy link",
    nativeShare:
      "Show the system share sheet: the first menu item where navigator.share accepts the data, in the row only on touch devices",
    layout: "A row of buttons or a dropdown menu",
    variant:
      "Row only: neutral buttons with brand colour on hover, or brand colours at once",
    showLabels: "Row only: print network names",
    size: "Button size: 32, 40 or 48px",
    align: "Menu alignment relative to the button",
    labels: "Texts: share, copy, copied, copyFailed, native and shareOn(name)",
    onShare:
      'Called with the network, "copy" or "native". Only when ShareButtons is rendered from a client component',
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "Official marks",
      "inline SVGs from simple-icons (CC0) on currentColor, no extra dependencies",
    ],
    [
      "Copy fallback",
      "Clipboard API in a secure context, execCommand on plain http",
    ],
    [
      "Native share",
      "in the menu it is the first item wherever navigator.canShare allows (Safari on Mac too); in the row only on touch screens. Closing the sheet is not an error",
    ],
    [
      "Little JavaScript",
      "the links and the menu are plain HTML; the client island holds only copying and navigator.share and is hidden until it loads",
    ],
    [
      "Keyboard",
      "Tab reaches the button, Enter opens the menu, Tab moves through the items, Escape closes it and returns focus",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Открывает и закрывает всплывающее окно",
    auditFeature1Description: "Размещает окно рядом с кнопкой",
    auditFeature2Description: "Анимирует появление",
    auditFeature3Description: "Оформляет открытое меню отправки",
    auditFeature4Description: "Анимирует закрытие меню",
    auditFeature5Description: "Копирует ссылку в буфер обмена",
    auditFeature6Description: "Открывает системное меню отправки",
    description:
      "Кнопки «Поделиться» для соцсетей, копирование ссылки и системное меню",
    intro:
      "Кнопки «Поделиться»: настраиваемый набор сетей (Telegram, WhatsApp, X, LinkedIn, Facebook, почта) и «Скопировать ссылку», которая на обычном http работает старым способом. Три размера (sm, default, lg) и два вида: нейтральные кнопки, которые при наведении берут цвет сети, или сразу в цветах сетей. Системное меню «Поделиться» идёт первым пунктом везде, где его поддерживает браузер, а в ряду показывается на сенсорных устройствах. Ряд кнопок или выпадающее меню.",
    how: "Ссылки и меню приходят готовым HTML с сервера: обычные <a> и нативный popover, поэтому работают и с выключенным JavaScript. JavaScript нужен только для копирования ссылки и системного меню. Они живут в маленьком клиентском островке, который появляется после загрузки страницы. Он же подставляет адрес и заголовок страницы, если вы не передали url и title.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Открывает меню отправки.",
    supportDescription1: "Размещает меню рядом с кнопкой.",
    supportDescription2: "Анимирует появление меню.",
    browserSupportText:
      "Меню держится на popover. Там, где есть anchor positioning, оно выпадает под кнопкой и само переворачивается у края экрана. В остальных браузерах меню открывается панелью внизу экрана.",
    preview: "Превью",
    previewText:
      "Делимся ссылкой на эту страницу. Попробуйте скопировать ссылку.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    propsTitle: "Пропсы",
    labeledTitle: "С подписями",
    labeledText:
      "showLabels выводит названия сетей рядом со значками. networks задаёт список и порядок.",
    sizesTitle: "Размеры",
    sizesText:
      "sm — 32px, default — 40px, lg — 48px. Значок растёт вместе с кнопкой: 16, 20 и 24px.",
    variantsTitle: "Фирменные цвета",
    variantsText:
      'По умолчанию кнопки нейтральные и при наведении берут цвет сети. variant="brand" красит их сразу. Фирменные цвета — осознанное исключение из токенов shadcn: так сети узнаются. У Telegram и WhatsApp взят более тёмный оттенок, чтобы белый на нём держал контраст не ниже 3:1.',
    menuTitle: "Выпадающее меню",
    menuText:
      'layout="menu" собирает всё в одну кнопку. После копирования меню не закрывается, чтобы было видно подтверждение.',
    props: {
      url: "Ссылка, которой делимся. Передайте её, чтобы ссылки работали без JavaScript. Иначе адрес страницы подставится при клике",
      title: "Заголовок поста. Иначе при клике подставится document.title",
      networks: "Сети и их порядок",
      copy: "Показывать «Скопировать ссылку»",
      nativeShare:
        "Показывать системное меню: первым пунктом меню там, где navigator.share принимает данные, в ряду только на сенсорных устройствах",
      layout: "Ряд кнопок или выпадающее меню",
      variant:
        "Только для ряда: нейтральные кнопки с фирменным цветом при наведении или сразу в цветах сетей",
      showLabels: "Только для ряда: выводить названия сетей",
      size: "Размер кнопок: 32, 40 или 48px",
      align: "Выравнивание меню относительно кнопки",
      labels: "Тексты: share, copy, copied, copyFailed, native и shareOn(name)",
      onShare:
        'Вызывается с названием сети, "copy" или "native". Работает, только если ShareButtons рендерится из клиентского компонента',
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Официальные знаки",
        "встроенные SVG из simple-icons (CC0) на currentColor, без лишних зависимостей",
      ],
      [
        "Копирование без https",
        "Clipboard API в безопасном контексте, execCommand на обычном http",
      ],
      [
        "Системное меню",
        "в меню он первым пунктом везде, где navigator.canShare разрешает (и в Safari на Mac), в ряду только на сенсорных экранах. Закрытие окна не считается ошибкой",
      ],
      [
        "Мало JavaScript",
        "ссылки и меню написаны на HTML, в клиентском островке только копирование и navigator.share, до загрузки он скрыт",
      ],
      [
        "Клавиатура",
        "Tab доходит до кнопки, Enter открывает меню, Tab ходит по пунктам, Escape закрывает его и возвращает фокус",
      ],
    ],
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Share Buttons", description: t.description }
}

export default async function ShareButtonsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },

    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.propsTitle, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Share Buttons" />
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
            {
              featureId: "async-clipboard",
              description: t.auditFeature5Description,
            },
            {
              featureId: "share",
              description: t.auditFeature6Description,
            },
          ]}
        />
        <p className="text-muted-foreground">{t.how}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ShareButtonsDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/share-buttons" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ShareButtons } from "@/components/ui/share-buttons"

export default function ArticleFooter() {
  // Pass url and title so the links work before any JavaScript runs
  return (
    <ShareButtons
      url="https://example.com/articles/hello"
      title="Example article"
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
              <h3 className="mb-3 text-lg font-medium">{t.labeledTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.labeledText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ShareButtonsLabeledDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<ShareButtons networks={["telegram", "whatsapp", "x"]} showLabels size="sm" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sizesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sizesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ShareButtonsSizesDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<ShareButtons size="sm" />
<ShareButtons size="default" />
<ShareButtons size="lg" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.variantsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.variantsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ShareButtonsBrandDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<ShareButtons variant="brand" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.menuTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.menuText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ShareButtonsMenuDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<ShareButtons
  layout="menu"
  url="https://example.com/articles/hello"
  title="Example article"
  networks={["telegram", "whatsapp", "x", "linkedin", "facebook", "email"]}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "url",
              type: "string",
              default: "-",
              description: t.props.url,
            },
            {
              name: "title",
              type: "string",
              default: "-",
              description: t.props.title,
            },
            {
              name: "networks",
              type: "ShareNetwork[]",
              default: "telegram, whatsapp, x, linkedin, facebook, email",
              description: t.props.networks,
            },
            {
              name: "copy",
              type: "boolean",
              default: "true",
              description: t.props.copy,
            },
            {
              name: "nativeShare",
              type: "boolean",
              default: "true",
              description: t.props.nativeShare,
            },
            {
              name: "layout",
              type: '"row" | "menu"',
              default: '"row"',
              description: t.props.layout,
            },
            {
              name: "variant",
              type: '"default" | "brand"',
              default: '"default"',
              description: t.props.variant,
            },
            {
              name: "showLabels",
              type: "boolean",
              default: "false",
              description: t.props.showLabels,
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: t.props.size,
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"end"',
              description: t.props.align,
            },
            {
              name: "labels",
              type: "ShareButtonsLabels",
              description: t.props.labels,
            },
            {
              name: "onShare",
              type: "(network) => void",
              description: t.props.onShare,
            },
            {
              name: "className",
              type: "string",
              description: t.props.className,
            },
          ]}
        />

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
