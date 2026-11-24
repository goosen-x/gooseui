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
import {
  ContextMenuCanvasDemo,
  ContextMenuFilesDemo,
} from "./context-menu-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Right-click, long-press and Shift+F10 menu with checkbox, radio and submenu items",
  intro:
    "Context Menu opens a list of actions where the user right-clicks, long-presses on a touch screen, or presses Shift+F10 or the Menu key. It lives in the browser top layer as a popover, sits at the pointer and flips away from the viewport edges. Items look and behave like the ones in",
  introLink: "Dropdown Menu",
  introEnd:
    ", plus checkbox and radio items, labels, shortcuts and nested submenus.",
  browserSupport: "Browser Support",
  popover:
    "Shows the menu in the top layer with light dismiss. Submenus are nested popovers, so the parent stays open.",
  anchor:
    "Places the menu at the pointer and flips it near the edges. Without it, JavaScript measures the menu and clamps it into the viewport.",
  starting:
    "Fades and scales the menu in. Without it the menu appears instantly.",
  transition:
    "Keeps the closing animation running while the popover leaves the top layer.",
  preview: "Preview",
  previewHint:
    "Right-click a file, long-press it on a touch screen, or focus it with Tab and press Shift+F10.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  canvasTitle: "Checkbox and radio items",
  canvasText:
    "View options of a canvas: checkbox items toggle the grid and rulers, a radio group picks the zoom. Labels and inset keep the text aligned.",
  submenuTitle: "Submenu",
  submenuText:
    "ContextMenuSub nests another level. It opens on hover, click, Enter or Arrow Right and closes with Arrow Left or Escape.",
  keepOpenTitle: "Keep the menu open",
  keepOpenText:
    "Call event.preventDefault() in onSelect to keep the menu open, for example when several checkboxes are toggled in a row.",
  props: "Props",
  propOpenChange: "ContextMenu: called when the menu opens or closes.",
  propTriggerDisabled:
    "ContextMenuTrigger: let the browser show its own menu instead.",
  propSelect:
    "Items: runs on click, Enter or Space. event.preventDefault() keeps the menu open.",
  propVariant: "ContextMenuItem: red style for destructive actions.",
  propShortcut: "Items: hint such as ⌘D shown at the end of the item.",
  propInset: "Item, label, sub trigger: indent to line up with checkbox items.",
  propTextValue:
    "Items: text for typeahead when the children are not plain text.",
  propDisabled: "Items: skip the item in keyboard navigation and clicks.",
  propChecked: "ContextMenuCheckboxItem: controlled checked state.",
  propDefaultChecked: "ContextMenuCheckboxItem: initial checked state.",
  propCheckedChange: "ContextMenuCheckboxItem: called with the new state.",
  propRadioValue: "ContextMenuRadioGroup: controlled selected value.",
  propRadioDefault: "ContextMenuRadioGroup: initial selected value.",
  propRadioChange: "ContextMenuRadioGroup: called with the new value.",
  propItemValue: "ContextMenuRadioItem: value of this option.",
  components: "Components",
  componentHeader: "Component",
  descriptionHeader: "Description",
  componentList: [
    ["ContextMenu", "Root. Holds the open state and the pointer position."],
    [
      "ContextMenuTrigger",
      "Area that reacts to right-click, long-press, Shift+F10 and the Menu key. A focusable div.",
    ],
    ["ContextMenuContent", "The menu itself, a popover with role=menu."],
    ["ContextMenuItem", "Action. Supports icons, shortcut and variant."],
    ["ContextMenuCheckboxItem", "Item with role=menuitemcheckbox."],
    ["ContextMenuRadioGroup", "Group of radio items with one value."],
    ["ContextMenuRadioItem", "Item with role=menuitemradio."],
    ["ContextMenuLabel", "Small caption for a group of items."],
    ["ContextMenuSeparator", "Thin line between groups."],
    ["ContextMenuShortcut", "Keyboard hint at the end of an item."],
    ["ContextMenuSub", "Wraps one nested level."],
    ["ContextMenuSubTrigger", "Item that opens the submenu."],
    ["ContextMenuSubContent", "The nested menu."],
  ],
  features: "Features",
  featureList: [
    [
      "Three ways to open",
      "right-click, a 500 ms long-press on touch, Shift+F10 or the Menu key on a focused trigger",
    ],
    [
      "Keyboard",
      "arrows, Home and End move between items, a letter jumps to the matching item, Escape and Tab close the menu and return focus",
    ],
    [
      "One highlight",
      "the pointer moves focus, so the mouse and the keyboard never highlight two items at once",
    ],
    [
      "Edges",
      "the menu flips to the other side of the pointer when there is no room; submenus flip to the left",
    ],
    ["Nested triggers", "only the innermost trigger handles the gesture"],
    ["Reduced motion", "the open animation is turned off"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Меню по правому клику, долгому нажатию и Shift+F10 с флажками, переключателями и подменю",
    intro:
      "Context Menu открывает список действий там, где пользователь нажал правую кнопку мыши, задержал палец на сенсорном экране или нажал Shift+F10 либо клавишу Menu. Меню живёт в верхнем слое браузера как popover, появляется у курсора и отодвигается от краёв окна. Пункты выглядят и работают так же, как в",
    introLink: "Dropdown Menu",
    introEnd:
      ", а сверху добавлены флажки, переключатели, подписи, горячие клавиши и вложенные подменю.",
    browserSupport: "Поддержка браузеров",
    popover:
      "Показывает меню в верхнем слое и закрывает его кликом снаружи. Подменю — вложенные popover, поэтому родительское меню остаётся открытым.",
    anchor:
      "Ставит меню у курсора и переворачивает его у краёв. Без поддержки JavaScript измеряет меню и сам удерживает его в пределах окна.",
    starting:
      "Плавно проявляет и увеличивает меню. Без поддержки меню появляется сразу.",
    transition:
      "Даёт доиграть анимации закрытия, пока popover покидает верхний слой.",
    preview: "Превью",
    previewHint:
      "Нажмите правой кнопкой на файл, задержите на нём палец на сенсорном экране или выберите его клавишей Tab и нажмите Shift+F10.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    canvasTitle: "Флажки и переключатели",
    canvasText:
      "Настройки вида для холста: флажки включают сетку и линейки, группа переключателей выбирает масштаб. Подписи и inset выравнивают текст.",
    submenuTitle: "Подменю",
    submenuText:
      "ContextMenuSub добавляет ещё один уровень. Он открывается при наведении, клике, Enter или стрелке вправо и закрывается стрелкой влево или Escape.",
    keepOpenTitle: "Не закрывать меню",
    keepOpenText:
      "Вызовите event.preventDefault() в onSelect, чтобы меню осталось открытым, например когда нужно переключить несколько флажков подряд.",
    props: "Пропсы",
    propOpenChange: "ContextMenu: вызывается при открытии и закрытии меню.",
    propTriggerDisabled:
      "ContextMenuTrigger: оставить браузеру его собственное меню.",
    propSelect:
      "Пункты: срабатывает на клик, Enter или пробел. event.preventDefault() оставляет меню открытым.",
    propVariant: "ContextMenuItem: красный стиль для опасных действий.",
    propShortcut: "Пункты: подсказка вроде ⌘D в конце пункта.",
    propInset:
      "Пункт, подпись, кнопка подменю: отступ, чтобы текст совпал с флажками.",
    propTextValue:
      "Пункты: текст для поиска по первой букве, если внутри не просто текст.",
    propDisabled: "Пункты: пропускать пункт при навигации и кликах.",
    propChecked: "ContextMenuCheckboxItem: контролируемое состояние флажка.",
    propDefaultChecked: "ContextMenuCheckboxItem: начальное состояние флажка.",
    propCheckedChange: "ContextMenuCheckboxItem: получает новое состояние.",
    propRadioValue: "ContextMenuRadioGroup: контролируемое выбранное значение.",
    propRadioDefault: "ContextMenuRadioGroup: начальное выбранное значение.",
    propRadioChange: "ContextMenuRadioGroup: получает новое значение.",
    propItemValue: "ContextMenuRadioItem: значение этого варианта.",
    components: "Компоненты",
    componentHeader: "Компонент",
    descriptionHeader: "Описание",
    componentList: [
      ["ContextMenu", "Корень. Хранит состояние и позицию курсора."],
      [
        "ContextMenuTrigger",
        "Область, которая реагирует на правый клик, долгое нажатие, Shift+F10 и клавишу Menu. Это div с фокусом.",
      ],
      ["ContextMenuContent", "Само меню: popover с role=menu."],
      ["ContextMenuItem", "Действие. Поддерживает иконки, shortcut и variant."],
      ["ContextMenuCheckboxItem", "Пункт с role=menuitemcheckbox."],
      ["ContextMenuRadioGroup", "Группа переключателей с одним значением."],
      ["ContextMenuRadioItem", "Пункт с role=menuitemradio."],
      ["ContextMenuLabel", "Мелкая подпись над группой пунктов."],
      ["ContextMenuSeparator", "Тонкая линия между группами."],
      ["ContextMenuShortcut", "Подсказка с клавишами в конце пункта."],
      ["ContextMenuSub", "Обёртка одного вложенного уровня."],
      ["ContextMenuSubTrigger", "Пункт, который открывает подменю."],
      ["ContextMenuSubContent", "Вложенное меню."],
    ],
    features: "Возможности",
    featureList: [
      [
        "Три способа открыть",
        "правый клик, долгое нажатие 500 мс на сенсорном экране, Shift+F10 или клавиша Menu на триггере в фокусе",
      ],
      [
        "Клавиатура",
        "стрелки, Home и End ходят по пунктам, буква переносит к подходящему пункту, Escape и Tab закрывают меню и возвращают фокус",
      ],
      [
        "Одна подсветка",
        "курсор переносит фокус, поэтому мышь и клавиатура не подсвечивают два пункта одновременно",
      ],
      [
        "Края окна",
        "если места не хватает, меню открывается по другую сторону от курсора, подменю уходит влево",
      ],
      [
        "Вложенные триггеры",
        "жест обрабатывает только самый внутренний триггер",
      ],
      ["Меньше движения", "анимация открытия отключается"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Context Menu", description: t.description }
}

export default async function ContextMenuPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    ["browser-support", t.browserSupport],
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
    ["components", t.components],
    ["features", t.features],
  ].map(([id, title]) => ({ id, title, level: 2 }))

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Context Menu" />

        <p className="text-muted-foreground">
          {t.intro}{" "}
          <Link
            href="/docs/components/dropdown-menu"
            className="underline underline-offset-4"
          >
            {t.introLink}
          </Link>
          {t.introEnd}
        </p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "popover", description: t.popover },
            { featureId: "anchor-positioning", description: t.anchor },
            { featureId: "starting-style", description: t.starting },
            { featureId: "transition-behavior", description: t.transition },
          ]}
        />

        <DocsSection id="preview" title={t.preview}>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <ContextMenuFilesDemo />
          </div>
        </DocsSection>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/context-menu" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function FileCard() {
  return (
    <ContextMenu>
      <ContextMenuTrigger aria-label="report.pdf. Shift+F10 for actions" className="rounded-lg border p-4">
        report.pdf
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem shortcut="⌘O" onSelect={() => open()}>Open</ContextMenuItem>
        <ContextMenuItem shortcut="⌘D" onSelect={() => duplicate()}>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" onSelect={() => remove()}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.canvasTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.canvasText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ContextMenuCanvasDemo />
              </div>
              <CodeBlock className="mt-4">{`const [grid, setGrid] = useState(true)
const [zoom, setZoom] = useState("100")

<ContextMenu>
  <ContextMenuTrigger aria-label="Canvas. Shift+F10 for view options">…</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel inset>View</ContextMenuLabel>
    <ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid} shortcut="⌘'">
      Show grid
    </ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuLabel inset id="zoom-label">Zoom</ContextMenuLabel>
    <ContextMenuRadioGroup value={zoom} onValueChange={setZoom} aria-labelledby="zoom-label">
      <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
      <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
      <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.submenuTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.submenuText}
              </p>
              <CodeBlock>{`<ContextMenuSub>
  <ContextMenuSubTrigger>
    <UsersIcon />
    Share
  </ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem onSelect={copyLink}>Copy link</ContextMenuItem>
    <ContextMenuItem onSelect={sendEmail}>Send by email</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.keepOpenTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.keepOpenText}
              </p>
              <CodeBlock>{`<ContextMenuCheckboxItem
  checked={rulers}
  onCheckedChange={setRulers}
  onSelect={(event) => event.preventDefault()}
>
  Rulers
</ContextMenuCheckboxItem>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: t.propOpenChange,
            },
            {
              name: "onSelect",
              type: "(event) => void",
              default: "-",
              description: t.propSelect,
            },
            {
              name: "variant",
              type: '"default" | "destructive"',
              default: '"default"',
              description: t.propVariant,
            },
            {
              name: "shortcut",
              type: "ReactNode",
              default: "-",
              description: t.propShortcut,
            },
            {
              name: "inset",
              type: "boolean",
              default: "false",
              description: t.propInset,
            },
            {
              name: "textValue",
              type: "string",
              default: "-",
              description: t.propTextValue,
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: `${t.propTriggerDisabled} ${t.propDisabled}`,
            },
            {
              name: "checked",
              type: "boolean",
              default: "-",
              description: t.propChecked,
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: t.propDefaultChecked,
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              default: "-",
              description: t.propCheckedChange,
            },
            {
              name: "value",
              type: "string",
              default: "-",
              description: t.propRadioValue,
            },
            {
              name: "defaultValue",
              type: "string",
              default: "-",
              description: t.propRadioDefault,
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "-",
              description: t.propRadioChange,
            },
            {
              name: "RadioItem value",
              type: "string",
              default: "-",
              description: t.propItemValue,
            },
          ]}
        />

        <DocsSection id="components" title={t.components}>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.descriptionHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.componentList.map(([name, text]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocsSection>

        <DocsSection id="features" title={t.features}>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong> — {text}
              </li>
            ))}
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
