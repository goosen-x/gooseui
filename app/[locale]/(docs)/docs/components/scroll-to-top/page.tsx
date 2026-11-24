import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ScrollToTopDefaultDemo,
  ScrollToTopMinimalDemo,
  ScrollToTopPillDemo,
  ScrollToTopPreview,
  ScrollToTopProgressDemo,
  ScrollToTopTextDemo,
} from "./scroll-to-top-demo"

const en = {
  description:
    "Floating scroll-to-top link in 5 variants, appears and shows progress on CSS",
  intro:
    "A floating link back to the top of the page. It is a server component with no JavaScript: the link points to #top, appears after a scroll threshold through a scroll-driven animation, and the progress ring fills on the same scroll timeline. Five variants: default circle, pill with text, minimal icon, progress ring and text.",
  browserSupport: "Browser Support",
  supportDescription0: "Shows the button after scrolling.",
  supportDescription1: "Enables smooth scrolling while the link is active.",
  browserSupportText:
    'Appearing and the progress ring need scroll-driven animations. Without them the link is always visible and the ring stays empty, the link itself works everywhere. With behavior="smooth" the page gets scroll-behavior: smooth through :has() only while the link is hovered, pressed or focused, so other anchors and route changes keep their usual behavior.',
  preview: "Preview",
  previewHint:
    "Each box is its own scroll area: the button follows the nearest scroller, so here it reacts to the box, on a real page to the page.",
  installation: "Installation",
  usage: "Usage",
  variants: "Variants",
  examples: "Examples",
  props: "Props",
  hook: "useScrollToTop hook",
  defaultText: "Circular button with an arrow. Three sizes: sm, md, lg.",
  pillText: "Elongated button with a text label.",
  minimalText: "Icon-only button without background.",
  progressText:
    "Circular button with a ring that shows how far the page is scrolled.",
  textText: "Text link with a small progress circle.",
  customThreshold: "Custom threshold",
  customThresholdText:
    "The button fades in over 80 px of scroll after the threshold.",
  customPosition: "Custom position",
  customPositionText: "Override the default corner with your own classes.",
  scrollArea: "Inside a scroll area",
  scrollAreaText:
    "In a scrolling box, place the link inside the box: a click scrolls only the box and leaves the page where it is. href stays as the fallback without JavaScript.",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  common: "Common props",
  threshold: "Scroll distance in px before the button appears",
  behavior: '"smooth" makes the page scroll smoothly when the link is used',
  label: "Accessible name, and the visible text in Pill and Text",
  href: "Fallback anchor without JavaScript. #top scrolls to the top of the document",
  target:
    "Scroll container to send to the top: selector, element or ref. By default the nearest scrolling ancestor, else the page",
  animationDuration: "Duration of the hover and press transitions in ms",
  className: "Additional CSS classes",
  size: "Button size",
  progressColor: "Progress ring color",
  progressBgColor: "Color of the ring track",
  strokeWidth: "Ring stroke width in px",
  hookText:
    "The components do not use it anymore. It stays for custom client implementations that need the scroll position in JavaScript:",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Плавающая ссылка «Наверх» в 5 вариантах: появление и прогресс на CSS",
    intro:
      "Плавающая ссылка наверх страницы. Это серверный компонент без JavaScript: ссылка ведёт на #top, появляется после порога прокрутки через scroll-driven анимацию, а кольцо прогресса заполняется на той же шкале прокрутки. Пять вариантов: круглая кнопка, «таблетка» с текстом, иконка, кольцо прогресса и текст.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает кнопку после прокрутки.",
    supportDescription1: "Включает плавную прокрутку при действии со ссылкой.",
    browserSupportText:
      'Для появления и кольца прогресса нужны scroll-driven анимации. Без них ссылка видна всегда, а кольцо пустое, сама ссылка работает везде. При behavior="smooth" странице включается scroll-behavior: smooth через :has(), но только пока ссылка под курсором, нажата или в фокусе, поэтому другие якоря и переходы между страницами ведут себя как обычно.',
    preview: "Превью",
    previewHint:
      "Каждый блок прокручивается сам по себе: кнопка следует за ближайшей областью прокрутки, поэтому здесь реагирует на блок, а на настоящей странице на страницу.",
    installation: "Установка",
    usage: "Использование",
    variants: "Варианты",
    examples: "Примеры",
    props: "Пропсы",
    hook: "Хук useScrollToTop",
    defaultText: "Круглая кнопка со стрелкой. Три размера: sm, md, lg.",
    pillText: "Вытянутая кнопка с текстом.",
    minimalText: "Кнопка-иконка без фона.",
    progressText:
      "Круглая кнопка с кольцом, которое показывает, насколько прокручена страница.",
    textText: "Текстовая ссылка с маленьким кругом прогресса.",
    customThreshold: "Свой порог",
    customThresholdText: "Кнопка проявляется за 80 px прокрутки после порога.",
    customPosition: "Своя позиция",
    customPositionText: "Угол по умолчанию меняется своими классами.",
    scrollArea: "Внутри области прокрутки",
    scrollAreaText:
      "В прокручиваемом блоке положите ссылку внутрь блока: по клику прокрутится только он, страница останется на месте. href нужен как запасной вариант без JavaScript.",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    common: "Общие пропсы",
    threshold: "Сколько пикселей прокрутить, чтобы кнопка появилась",
    behavior: '"smooth" включает плавную прокрутку при переходе по ссылке',
    label: "Доступное имя, а в Pill и Text ещё и видимый текст",
    href: "Запасная ссылка на случай без JavaScript. #top прокручивает к началу документа",
    target:
      "Контейнер, который нужно прокрутить вверх: селектор, элемент или ref. По умолчанию ближайший прокручиваемый предок, иначе страница",
    animationDuration: "Длительность переходов при наведении и нажатии, мс",
    className: "Дополнительные CSS-классы",
    size: "Размер кнопки",
    progressColor: "Цвет кольца прогресса",
    progressBgColor: "Цвет дорожки кольца",
    strokeWidth: "Толщина кольца в px",
    hookText:
      "Компоненты им больше не пользуются. Хук оставлен для своих клиентских реализаций, которым нужна позиция прокрутки в JavaScript:",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Scroll To Top",
    description: t.description,
  }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

function PropsTable({
  t,
  rows,
}: {
  t: typeof en
  rows: [string, string, string, string][]
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-medium">{t.prop}</th>
            <th className="text-left p-3 font-medium">{t.type}</th>
            <th className="text-left p-3 font-medium">{t.default}</th>
            <th className="text-left p-3 font-medium">{t.description2}</th>
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
  )
}

export default async function ScrollToTopPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "hook", title: t.hook, level: 2 },
  ]

  const variants: [string, string, ReactNode, string][] = [
    [
      "Default",
      t.defaultText,
      <ScrollToTopDefaultDemo key="d" />,
      `<ScrollToTop />
<ScrollToTop size="sm" />
<ScrollToTop size="lg" />`,
    ],
    [
      "Pill",
      t.pillText,
      <ScrollToTopPillDemo key="p" />,
      `<ScrollToTopPill label="Back to top" />`,
    ],
    [
      "Minimal",
      t.minimalText,
      <ScrollToTopMinimalDemo key="m" />,
      "<ScrollToTopMinimal />",
    ],
    [
      "Progress",
      t.progressText,
      <ScrollToTopProgressDemo key="pr" />,
      `<ScrollToTopProgress />
<ScrollToTopProgress progressColor="var(--chart-2)" strokeWidth={4} />`,
    ],
    [
      "Text",
      t.textText,
      <ScrollToTopTextDemo key="t" />,
      `<ScrollToTopText label="Back to top" />`,
    ],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Scroll To Top" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.supportDescription0,
            },
            {
              featureId: "has",
              description: t.supportDescription1,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ScrollToTopPreview />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/scroll-to-top" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function Page() {
  return (
    <main>
      {/* Your page content */}
      <ScrollToTop />
    </main>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="variants" className={h2}>
            {t.variants}
          </h2>
          <div className="space-y-8">
            {variants.map(([title, text, demo, code]) => (
              <div key={title}>
                <h3 className="mb-3 text-lg font-medium">{title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{text}</p>
                <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                  {demo}
                </div>
                <CodeBlock className="mt-4">{code}</CodeBlock>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.customThreshold}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.customThresholdText}
              </p>
              <CodeBlock>{`<ScrollToTop threshold={500} />`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.customPosition}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.customPositionText}
              </p>
              <CodeBlock>{`<ScrollToTop className="left-6 right-auto" />
<ScrollToTop className="bottom-20" />`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.scrollArea}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.scrollAreaText}
              </p>
              <CodeBlock>{`<div className="relative h-96 overflow-y-auto scroll-smooth">
  <span id="list-top" />
  {items}
  <div className="sticky bottom-0 h-0">
    <ScrollToTop href="#list-top" className="absolute bottom-4 right-4" />
  </div>
</div>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <h3 className="mt-6 mb-3 text-lg font-medium">{t.common}</h3>
          <PropsTable
            t={t}
            rows={[
              ["threshold", "number", "300", t.threshold],
              ["behavior", "ScrollBehavior", '"smooth"', t.behavior],
              ["label", "string", '"Scroll to top"', t.label],
              ["href", "string", '"#top"', t.href],
              ["target", "string | HTMLElement | RefObject", "—", t.target],
              ["animationDuration", "number", "300", t.animationDuration],
              ["className", "string", "-", t.className],
            ]}
          />
          <h3 className="mt-6 mb-3 text-lg font-medium">ScrollToTop</h3>
          <PropsTable
            t={t}
            rows={[["size", '"sm" | "md" | "lg"', '"md"', t.size]]}
          />
          <h3 className="mt-6 mb-3 text-lg font-medium">ScrollToTopProgress</h3>
          <PropsTable
            t={t}
            rows={[
              ["progressColor", "string", "var(--primary)", t.progressColor],
              ["progressBgColor", "string", "var(--muted)", t.progressBgColor],
              ["strokeWidth", "number", "3", t.strokeWidth],
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2 id="hook" className={h2}>
            {t.hook}
          </h2>
          <p className="text-muted-foreground">{t.hookText}</p>
          <CodeBlock>{`"use client"
import { useScrollToTop } from "@/components/ui/scroll-to-top"

function ReadingProgress() {
  const { scrollProgress } = useScrollToTop(300)
  return <progress value={scrollProgress} max={100} />
}`}</CodeBlock>
        </div>
      </div>
    </DocsPage>
  )
}
