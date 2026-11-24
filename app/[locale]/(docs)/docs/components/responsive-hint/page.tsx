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
  ResponsiveHintDemo,
  ResponsiveHintIconDemo,
  ResponsiveHintSheetDemo,
} from "./responsive-hint-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Opens and closes the popup",
  auditFeature1Description: "Animates the initial appearance",
  auditFeature2Description: "Styles elements based on their contents",
  auditFeature3Description: "Positions the popup near its trigger",
  auditFeature4Description: "Styles the mobile popover backdrop",
  auditFeature5Description: "Animates the popover closing",
  description:
    "Help icon: a tooltip with a mouse, a bottom sheet on touch screens",
  intro:
    "A help icon. With a mouse it shows a tooltip on hover and keyboard focus, on touch devices and narrow screens it opens a bottom sheet with the same content and title. It ships no JavaScript: the tooltip is shown by CSS, the sheet is a native popover, and the (hover: hover) and (pointer: fine) media query plus a width breakpoint pick the mode. It works with JavaScript turned off.",
  browserSupport: "Browser Support",
  supportDescription0: "Opens the hint.",
  supportDescription1: "Animates the sheet entrance.",
  supportDescription2: "Shows the hint on keyboard focus.",
  supportDescription3: "Positions the tooltip near its trigger.",
  browserSupportText:
    "The sheet relies on popover and slides in with @starting-style. Where anchor positioning is available, the tooltip flips at the screen edges. Elsewhere it sits on the chosen side of the icon and can run past the edge of the screen.",
  preview: "Preview",
  previewText:
    "Hover the icons. On a phone or in a narrow window they open a sheet instead.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  propsTitle: "Props",
  sheetTitle: "Always a sheet",
  sheetText: 'mode="sheet" or mode="tooltip" turns the media query off.',
  iconTitle: "Custom icon and breakpoint",
  iconText:
    "Any icon works as the trigger. breakpoint sets the width below which the sheet is used even with a mouse.",
  props: {
    children: "Hint content, the same in both modes",
    title: "Heading. In the sheet it becomes the dialog title",
    icon: "Trigger icon",
    breakpoint: "Width in px below which the sheet is used",
    mode: "Force a mode instead of the media query",
    side: "Tooltip side",
    align: "Tooltip alignment",
    delayDuration:
      "Hover delay before the tooltip shows, ms (transition-delay)",
    labels: "Texts: trigger (aria-label), close, title (hidden dialog title)",
    contentClassName: "Classes for the tooltip or the sheet",
    className: "Classes for the trigger",
  },
  features: "Features",
  featureList: [
    [
      "Two modes",
      "a CSS tooltip for mouse users, a popover bottom sheet for touch. Media queries pick the mode, so nothing jumps after hydration",
    ],
    [
      "Accessible",
      "the trigger is a button with aria-label and aria-describedby pointing to the tooltip. The sheet has a title, Escape and a tap outside close it, focus returns to the button",
    ],
    [
      "Limits",
      "Escape does not hide a tooltip opened by keyboard focus, move focus away instead. The content is rendered twice, so avoid ids inside children",
    ],
    ["Reduced motion", "the sheet appears without sliding"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Открывает и закрывает всплывающее окно",
    auditFeature1Description: "Анимирует появление",
    auditFeature2Description: "Меняет стиль по содержимому",
    auditFeature3Description: "Размещает окно рядом с кнопкой",
    auditFeature4Description: "Оформляет подложку мобильной подсказки",
    auditFeature5Description: "Анимирует закрытие подсказки",
    description:
      "Значок подсказки: тултип при мыши, нижняя шторка на сенсорных",
    intro:
      "Значок с подсказкой. При мыши показывает тултип при наведении и фокусе с клавиатуры, на сенсорных устройствах и узких экранах открывает нижнюю шторку с тем же текстом и заголовком. JavaScript в браузер не уходит: тултип показывает CSS, шторка сделана на нативном popover, а режим выбирают медиазапрос (hover: hover) and (pointer: fine) и брейкпоинт. Всё работает и с выключенным JavaScript.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Открывает подсказку.",
    supportDescription1: "Анимирует появление панели.",
    supportDescription2: "Показывает подсказку при фокусе с клавиатуры.",
    supportDescription3: "Размещает подсказку рядом с кнопкой.",
    browserSupportText:
      "Шторка держится на popover и выезжает через @starting-style. Там, где есть anchor positioning, тултип сам переворачивается у края экрана. В остальных браузерах он стоит с выбранной стороны значка и может выйти за край экрана.",
    preview: "Превью",
    previewText:
      "Наведите курсор на значки. На телефоне или в узком окне вместо тултипа откроется шторка.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    propsTitle: "Пропсы",
    sheetTitle: "Всегда шторка",
    sheetText: 'mode="sheet" или mode="tooltip" отключают медиазапрос.',
    iconTitle: "Своя иконка и брейкпоинт",
    iconText:
      "Значок можно заменить любой иконкой. breakpoint задаёт ширину, ниже которой шторка включается даже при мыши.",
    props: {
      children: "Текст подсказки, одинаковый в обоих режимах",
      title: "Заголовок. В шторке становится заголовком диалога",
      icon: "Иконка кнопки",
      breakpoint: "Ширина в px, ниже которой используется шторка",
      mode: "Принудительный режим вместо медиазапроса",
      side: "С какой стороны тултип",
      align: "Выравнивание тултипа",
      delayDuration: "Задержка перед показом тултипа, мс (transition-delay)",
      labels:
        "Тексты: trigger (aria-label), close, title (скрытый заголовок диалога)",
      contentClassName: "Классы для тултипа или шторки",
      className: "Классы для кнопки",
    },
    features: "Возможности",
    featureList: [
      [
        "Два режима",
        "тултип на CSS для мыши, шторка на popover для пальца. Режим выбирают медиазапросы, поэтому после гидрации ничего не прыгает",
      ],
      [
        "Доступность",
        "кнопка с aria-label и aria-describedby на тултип. У шторки есть заголовок, Escape и нажатие мимо закрывают её, фокус возвращается на кнопку",
      ],
      [
        "Ограничения",
        "Escape не прячет тултип, открытый фокусом с клавиатуры: уведите фокус. Содержимое рендерится дважды, поэтому не ставьте id внутри children",
      ],
      ["Reduced motion", "шторка появляется без выезда"],
    ],
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Responsive Hint", description: t.description }
}

export default async function ResponsiveHintPage({ params }: Props) {
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
        <DocsPageNav title="Responsive Hint" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "popover",
              description: t.auditFeature0Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature1Description,
            },
            {
              featureId: "has",
              description: t.auditFeature2Description,
            },
            {
              featureId: "anchor-positioning",
              description: t.auditFeature3Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature4Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature5Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ResponsiveHintDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/responsive-hint" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ResponsiveHint } from "@/components/ui/responsive-hint"

export default function Price() {
  return (
    <span className="flex items-center gap-1.5">
      Shipping
      <ResponsiveHint title="How shipping is calculated">
        The price depends on parcel weight and distance.
      </ResponsiveHint>
    </span>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sheetTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sheetText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ResponsiveHintSheetDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<ResponsiveHint mode="sheet" title="Returns">
  You can return the item within 30 days.
</ResponsiveHint>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.iconTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.iconText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ResponsiveHintIconDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`import { Info } from "lucide-react"

<ResponsiveHint side="right" icon={<Info />} breakpoint={1024}>
  Below 1024px this becomes a sheet.
</ResponsiveHint>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: t.props.children,
            },
            { name: "title", type: "ReactNode", description: t.props.title },
            {
              name: "icon",
              type: "ReactNode",
              default: "help icon",
              description: t.props.icon,
            },
            {
              name: "breakpoint",
              type: "number",
              default: "768",
              description: t.props.breakpoint,
            },
            {
              name: "mode",
              type: '"auto" | "tooltip" | "sheet"',
              default: '"auto"',
              description: t.props.mode,
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"top"',
              description: t.props.side,
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: t.props.align,
            },
            {
              name: "delayDuration",
              type: "number",
              default: "150",
              description: t.props.delayDuration,
            },
            {
              name: "labels",
              type: "{ trigger?: string; close?: string; title?: string }",
              description: t.props.labels,
            },
            {
              name: "contentClassName",
              type: "string",
              description: t.props.contentClassName,
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
