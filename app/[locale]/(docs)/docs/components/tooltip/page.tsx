import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { TooltipDemo } from "./demo"

const en = {
  description:
    "Tooltip shows a short hint beside a control. It appears after a brief delay on hover or focus. Escape dismisses the hint. Use it for supplementary information, not essential instructions.",
  browser: "Browser support",
  popover: "Displays content in the browser top layer.",
  anchor:
    "Positions content by its trigger; JavaScript positions it when anchors are unavailable.",
  starting:
    "Animates entry when supported; otherwise content appears immediately.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  example: "Position",
  props: "Props",
  side: "Preferred side of the trigger.",
  align: "Alignment along the trigger.",
  offset: "Distance from the trigger in pixels.",
  asChild: "Use the child as the trigger.",
  hidden: "Prevent the tooltip from opening.",
  select: "Runs on selection; preventDefault keeps the menu open.",
  disabled: "Disable this action.",
  label: "Hover or focus",
  hint: "Helpful information",
  first: "Edit",
  second: "Duplicate",
  third: "Delete",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Tooltip показывает короткую подсказку рядом с элементом управления. Она появляется с небольшой задержкой при наведении или фокусе. Escape закрывает подсказку. Используйте её для дополнительной, а не обязательной информации.",
    browser: "Поддержка браузеров",
    popover: "Показывает содержимое в верхнем слое браузера.",
    anchor:
      "Размещает содержимое рядом с кнопкой; без поддержки якорей координаты вычисляет JavaScript.",
    starting:
      "Анимирует появление в поддерживаемых браузерах; иначе элемент появляется сразу.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    example: "Расположение",
    props: "Пропсы",
    side: "Предпочтительная сторона кнопки.",
    align: "Выравнивание относительно кнопки.",
    offset: "Расстояние от кнопки в пикселях.",
    asChild: "Использовать дочерний элемент как кнопку.",
    hidden: "Запрещает открытие подсказки.",
    select: "Вызывается при выборе; preventDefault оставляет меню открытым.",
    disabled: "Отключает действие.",
    label: "Наведите или выберите",
    hint: "Полезная информация",
    first: "Изменить",
    second: "Дублировать",
    third: "Удалить",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    title: "Tooltip",
    description: content[locale as Locale].description,
  }
}
export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    ["browser-support", t.browser],
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
  ].map(([id, title]) => ({ id, title, level: 2 }))
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Tooltip" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <BrowserSupport
          title={t.browser}
          features={[
            {
              featureId: "popover",
              description: t.popover,
            },
            {
              featureId: "anchor-positioning",
              description: t.anchor,
            },
            {
              featureId: "starting-style",
              description: t.starting,
            },
          ]}
        />
        <DocsSection id="preview" title={t.preview}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <TooltipDemo label={t.label} hint={t.hint} />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/tooltip" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger asChild><button>Details</button></TooltipTrigger>
  <TooltipContent side="top">Helpful information</TooltipContent>
</Tooltip>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <h3 className="mb-3 text-lg font-medium">{t.example}</h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <TooltipDemo label={t.label} hint={t.hint} side="right" />
          </div>
          <CodeBlock>{`<TooltipContent side="right">Helpful information</TooltipContent>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: t.side,
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: t.align,
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: t.offset,
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: t.asChild,
            },
            {
              name: "hidden",
              type: "boolean",
              default: "false",
              description: t.hidden,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
