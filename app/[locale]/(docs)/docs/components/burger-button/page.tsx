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
  BurgerButtonControlledDemo,
  BurgerButtonCssMenuDemo,
  BurgerButtonDemo,
  BurgerButtonPopoverDemo,
  BurgerButtonSizesDemo,
  BurgerButtonVariantsDemo,
} from "./burger-button-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature1Description: "Opens and closes the popup",
  description:
    "Menu toggle with uneven lines that morph into a cross, no JavaScript",
  intro:
    "A menu toggle made of lines of different length. On hover the lines even out, and when open they turn into a cross or an arrow. The animation is CSS and the component is a Server Component. By default the state lives in a visually hidden checkbox, popoverTarget turns it into a button that opens a popover and follows :popover-open, and open with onOpenChange gives you a controlled button for state kept in a client component.",
  browserSupport: "Browser Support",
  supportDescription0: "Styles the button when the menu is open.",
  supportDescription1: "Opens the menu as a popover.",
  supportDescription2: "Positions the menu near the button.",
  browserSupportText:
    "The open look is matched with :has(:checked) or :has(:popover-open). The popover mode needs the popover attribute, Baseline newly available. The popover demo below places the menu with anchor positioning only inside @supports; elsewhere the browser centers it.",
  preview: "Preview",
  previewText: "Hover and click.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  propsTitle: "Props",
  variantsTitle: "Animation variants",
  variantsText:
    "cross rotates the outer lines, squeeze first brings them together and then rotates, spin turns the whole icon, arrow forms an arrow.",
  sizesTitle: "Sizes and appearance",
  sizesText: "Three sizes and three looks: ghost, outline and solid.",
  popoverTitle: "Popover menu without JavaScript",
  popoverText:
    "popoverTarget points the button at an element with the popover attribute. The browser opens and closes it, closes it on Escape or an outside click, and the lines follow :popover-open.",
  cssMenuTitle: "CSS-only menu",
  cssMenuText:
    "In the default mode the burger is a checkbox, so a parent can show the menu with :has(:checked). No state and no script.",
  controlledTitle: "Controlled menu",
  controlledText:
    "Keep the state yourself with open and onOpenChange, and link the button to the menu with aria-controls.",
  props: {
    open: "Controlled state. Renders a button with aria-expanded",
    defaultOpen: "Initial state of the built-in checkbox",
    onOpenChange: "Called with the next state. Only inside client components",
    popoverTarget:
      "Id of a popover element. The button opens it and follows its state",
    name: "Name of the built-in checkbox for forms",
    variant: "How the lines animate into the open state",
    size: "Button and icon size",
    appearance: "Button look",
    labels:
      "Screen reader labels: open and close for the controlled button, menu for the checkbox and popover modes",
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature1Description: "Открывает и закрывает всплывающее окно",
    description:
      "Кнопка-бургер из линий разной длины, превращается в крестик без JavaScript",
    intro:
      "Кнопка меню из линий разной длины. При наведении линии выравниваются, в открытом состоянии складываются в крестик или стрелку. Анимация на CSS, компонент серверный. По умолчанию состояние хранит скрытый чекбокс. С popoverTarget это кнопка, которая открывает поповер и следит за :popover-open. А open вместе с onOpenChange дают управляемую кнопку для состояния в клиентском компоненте.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Меняет вид кнопки при открытом меню.",
    supportDescription1: "Открывает меню во всплывающем слое.",
    supportDescription2: "Размещает меню рядом с кнопкой.",
    browserSupportText:
      "Открытый вид включается через :has(:checked) или :has(:popover-open). Режиму с поповером нужен атрибут popover, он в Baseline newly available. В демо с поповером меню прицеплено к кнопке через anchor positioning только внутри @supports, в остальных браузерах оно встаёт по центру.",
    preview: "Превью",
    previewText: "Наведите курсор и нажмите.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    propsTitle: "Пропсы",
    variantsTitle: "Варианты анимации",
    variantsText:
      "cross поворачивает крайние линии, squeeze сначала сводит их вместе, потом поворачивает, spin крутит всю иконку, arrow складывает стрелку.",
    sizesTitle: "Размеры и вид",
    sizesText: "Три размера и три вида: ghost, outline и solid.",
    popoverTitle: "Меню на поповере без JavaScript",
    popoverText:
      "popoverTarget связывает кнопку с элементом с атрибутом popover. Браузер сам открывает и закрывает его, закрывает по Escape и клику снаружи, а линии следят за :popover-open.",
    cssMenuTitle: "Меню на чистом CSS",
    cssMenuText:
      "В режиме по умолчанию бургер это чекбокс, поэтому родитель может показать меню через :has(:checked). Ни состояния, ни скрипта.",
    controlledTitle: "Управляемое меню",
    controlledText:
      "Храните состояние у себя через open и onOpenChange, а кнопку свяжите с меню через aria-controls.",
    props: {
      open: "Состояние в управляемом режиме. Рисует кнопку с aria-expanded",
      defaultOpen: "Начальное состояние встроенного чекбокса",
      onOpenChange:
        "Вызывается со следующим состоянием. Работает только в клиентских компонентах",
      popoverTarget:
        "id элемента с поповером. Кнопка открывает его и следит за его состоянием",
      name: "Имя встроенного чекбокса для форм",
      variant: "Как линии переходят в открытое состояние",
      size: "Размер кнопки и иконки",
      appearance: "Вид кнопки",
      labels:
        "Подписи для скринридера: open и close для управляемой кнопки, menu для режимов с чекбоксом и поповером",
      className: "Дополнительные CSS-классы",
    },
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Burger Button", description: t.description }
}

export default async function BurgerButtonPage({ params }: Props) {
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
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Burger Button" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "popover",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <BurgerButtonDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/burger-button" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { BurgerButton } from "@/components/ui/burger-button"

// A Server Component: the burger opens a popover menu on its own
export default function Header() {
  return (
    <header>
      <BurgerButton popoverTarget="main-menu" />
      <nav id="main-menu" popover="auto">…</nav>
    </header>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.variantsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.variantsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BurgerButtonVariantsDemo />
              </div>
              <CodeBlock className="mt-4">{`<BurgerButton variant="cross" />
<BurgerButton variant="squeeze" />
<BurgerButton variant="spin" />
<BurgerButton variant="arrow" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sizesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sizesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <BurgerButtonSizesDemo />
              </div>
              <CodeBlock className="mt-4">{`<BurgerButton size="sm" appearance="ghost" />
<BurgerButton size="md" appearance="outline" />
<BurgerButton size="lg" appearance="solid" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.popoverTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.popoverText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BurgerButtonPopoverDemo />
              </div>
              <CodeBlock className="mt-4">{`<BurgerButton popoverTarget="main-menu" variant="arrow" />
<nav id="main-menu" popover="auto">…</nav>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.cssMenuTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.cssMenuText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BurgerButtonCssMenuDemo />
              </div>
              <CodeBlock className="mt-4">{`<header className="group/header">
  <BurgerButton aria-controls="menu" />
  <nav id="menu" className="hidden group-has-[.gb_:checked]/header:block">…</nav>
</header>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.controlledTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.controlledText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <BurgerButtonControlledDemo />
              </div>
              <CodeBlock className="mt-4">{`const [open, setOpen] = useState(false)

<BurgerButton
  open={open}
  onOpenChange={setOpen}
  aria-controls="main-menu"
  labels={{ open: "Open navigation", close: "Close navigation" }}
/>
<nav id="main-menu" hidden={!open}>…</nav>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            { name: "open", type: "boolean", description: t.props.open },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: t.props.defaultOpen,
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: t.props.onOpenChange,
            },
            {
              name: "popoverTarget",
              type: "string",
              description: t.props.popoverTarget,
            },
            { name: "name", type: "string", description: t.props.name },
            {
              name: "variant",
              type: '"cross" | "squeeze" | "spin" | "arrow"',
              default: '"cross"',
              description: t.props.variant,
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: t.props.size,
            },
            {
              name: "appearance",
              type: '"outline" | "ghost" | "solid"',
              default: '"outline"',
              description: t.props.appearance,
            },
            {
              name: "labels",
              type: "{ open?: string; close?: string; menu?: string }",
              default: '"Open menu" / "Close menu" / "Menu"',
              description: t.props.labels,
            },
            {
              name: "className",
              type: "string",
              description: t.props.className,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
