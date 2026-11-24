import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { DropdownMenuDemo } from "./demo"

const en = {
  description:
    "Dropdown Menu presents actions in a compact popover. It opens from a button and closes when an action is chosen or the user clicks outside. Arrow keys, Home and End move between actions. Escape closes the menu and returns focus to the trigger.",
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
  positionText:
    "The menu opens on the chosen side of the trigger. When there is not enough room, it flips to the opposite side on its own.",
  top: "Top",
  bottom: "Bottom",
  props: "Props",
  side: "Preferred side of the trigger. Flips to the opposite side when there is no room.",
  align: "Alignment along the trigger.",
  offset: "Distance from the trigger in pixels.",
  asChild: "Use the child as the trigger.",
  hidden: "Prevent the tooltip from opening.",
  select: "Runs on selection; preventDefault keeps the menu open.",
  disabled: "Disable this action.",
  label: "Open menu",
  hint: "Helpful information",
  first: "Edit",
  second: "Duplicate",
  third: "Delete",
  langTitle: "Language switcher",
  langText: "Menu items can be links. Ready-made version:",
  langLink: "Language Switcher",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Dropdown Menu собирает действия в компактном всплывающем меню. Оно открывается кнопкой и закрывается после выбора действия или клика снаружи. Стрелки, Home и End перемещают фокус между пунктами. Escape закрывает меню и возвращает фокус кнопке.",
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
    positionText:
      "Меню открывается с выбранной стороны кнопки. Если места не хватает, оно само переворачивается на противоположную сторону.",
    top: "Сверху",
    bottom: "Снизу",
    props: "Пропсы",
    side: "Предпочтительная сторона кнопки. Без места переворачивается на противоположную.",
    align: "Выравнивание относительно кнопки.",
    offset: "Расстояние от кнопки в пикселях.",
    asChild: "Использовать дочерний элемент как кнопку.",
    hidden: "Запрещает открытие подсказки.",
    select: "Вызывается при выборе; preventDefault оставляет меню открытым.",
    disabled: "Отключает действие.",
    label: "Открыть меню",
    hint: "Полезная информация",
    first: "Изменить",
    second: "Дублировать",
    third: "Удалить",
    langTitle: "Переключатель языка",
    langText: "Пункты меню могут быть ссылками. Готовая версия:",
    langLink: "Language Switcher",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    title: "Dropdown Menu",
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
        <DocsPageNav title="Dropdown Menu" />
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
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 pb-12 pt-36">
            <DropdownMenuDemo
              label={t.label}
              first={t.first}
              second={t.second}
              third={t.third}
            />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/dropdown-menu" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild><button>Actions</button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={() => console.log("Edit")}>Edit</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <h3 className="mb-3 text-lg font-medium">{t.example}</h3>
          <p className="mb-3 text-muted-foreground">{t.positionText}</p>
          <div className="flex flex-wrap justify-center gap-4 rounded-lg bg-muted/30 px-4 pb-12 pt-36">
            <DropdownMenuDemo
              label={t.top}
              first={t.first}
              second={t.second}
              third={t.third}
              side="top"
            />
            <DropdownMenuDemo
              label={t.bottom}
              first={t.first}
              second={t.second}
              third={t.third}
              side="bottom"
            />
          </div>
          <CodeBlock>{`<DropdownMenuContent side="top">...</DropdownMenuContent>
<DropdownMenuContent side="bottom" align="end">...</DropdownMenuContent>`}</CodeBlock>
          <h3 className="mb-2 mt-6 text-lg font-medium">{t.langTitle}</h3>
          <p className="mb-3 text-muted-foreground">
            {t.langText}{" "}
            <Link
              href="/docs/components/language-switcher"
              className="cursor-pointer underline underline-offset-4"
            >
              {t.langLink}
            </Link>
          </p>
          <CodeBlock>{`<DropdownMenu>
  <DropdownMenuTrigger aria-label="Language">EN</DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <a role="menuitem" tabIndex={-1} href="/" aria-current="true">English</a>
    <a role="menuitem" tabIndex={-1} href="/ru">Русский</a>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
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
              name: "onSelect",
              type: "(event) => void",
              default: "—",
              description: t.select,
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: t.disabled,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
