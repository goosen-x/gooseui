import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  DetailsAccordion,
  DetailsAccordionItem,
} from "@/registry/gooseui/ui/details-accordion"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Groups expandable sections",
  auditFeature1Description: "Animates the content height",
  auditFeature2Description: "Targets the expandable content",
  auditFeature3Description: "Controls visibility of closed content",
  auditFeature4Description: "Animates opening and closing",
  description:
    "Accordion on native details with exclusive mode and no JavaScript",
  intro:
    "An accordion built on native <details> elements. A shared name attribute makes the browser keep only one item open, with no JavaScript and no state. Where the browser supports ::details-content and interpolate-size, items open with a smooth height transition.",
  browserSupport: "Browser Support",
  supportDescription0: "Keeps only one accordion item open.",
  supportDescription1: "Animates the item height.",
  browserSupportText:
    "The exclusive mode relies on the name attribute of <details>. Without it, several items can be open at once. The height animation needs ::details-content and interpolate-size: allow-keywords; where they are missing, items open instantly. Everything else is plain HTML.",
  preview: "Preview",
  previewHint:
    "Open one question, then another: the first one closes by itself.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  multipleTitle: "Several open items",
  multipleText: "multiple drops the shared name, so items open independently.",
  cardTitle: "Card variant",
  cardText:
    'variant="card" puts every item in its own card. The first one here is open from the start through defaultOpen.',
  framedTitle: "As on the GooseUI home page",
  framedText:
    'variant="framed" with numbered gives the FAQ from the home page: a dashed outer frame, a filled inner card and big numbers. It is plain details, so it works without JavaScript.',
  itemTitle: "Single items",
  itemText:
    "DetailsAccordionItem works alone. Give several items the same name to link them anywhere on the page.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propItems: "Items: title, content, optional id and defaultOpen",
  propMultiple: "Let several items stay open",
  propName: "Shared name for the exclusive mode. Generated when omitted",
  propVariant: "Dividers, separate cards or the framed home page look",
  propNumbered: "Show 01, 02, … before every title",
  propItemClassName: "Classes for every item",
  propClassName: "Classes for the wrapper",
  components: "Components",
  componentHeader: "Component",
  componentAccordion: "List of items from the items array",
  componentItem:
    "One <details> item: title, children, name, defaultOpen, variant and any details attribute",
  features: "Features",
  featureList: [
    ["No JavaScript", "works in Server Components and before hydration"],
    [
      "Find in page",
      "browser search opens a closed item when the match is inside it",
    ],
    ["Keyboard", "summary is focusable, Enter and Space toggle it"],
    ["Reduced motion", "the height transition is turned off"],
  ],
  faq: [
    [
      "How long does delivery take?",
      "Orders within the city arrive the next day. Other regions take two to five days depending on the distance.",
    ],
    [
      "Can I return an item?",
      "Yes, within 14 days if the item has not been used. The refund goes to the same card.",
    ],
    [
      "Do you work on weekends?",
      "The warehouse is closed on Sundays, but orders are accepted around the clock.",
    ],
    [
      "How do I change my address?",
      "Open the order and press Edit until it is handed to the courier.",
    ],
  ],
  multiple: [
    ["Ingredients", "Flour, water, salt and a little yeast."],
    ["Storage", "Keep in a paper bag for up to three days."],
    ["Allergens", "Contains gluten. May contain traces of sesame."],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Объединяет раскрывающиеся секции",
    auditFeature1Description: "Анимирует высоту содержимого",
    auditFeature2Description: "Выбирает раскрывающееся содержимое",
    auditFeature3Description: "Управляет видимостью закрытого содержимого",
    auditFeature4Description: "Анимирует раскрытие и закрытие",
    description:
      "Аккордеон на нативном details: открыт один пункт, без JavaScript",
    intro:
      "Аккордеон на нативных элементах <details>. Общий атрибут name заставляет браузер держать открытым только один пункт, без JavaScript и без состояния. Там, где браузер знает ::details-content и interpolate-size, пункты раскрываются плавно.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Оставляет открытым один пункт аккордеона.",
    supportDescription1: "Анимирует высоту пункта.",
    browserSupportText:
      "Режим «открыт один пункт» держится на атрибуте name у <details>. Без его поддержки можно открыть несколько пунктов сразу. Плавной высоте нужны ::details-content и interpolate-size: allow-keywords; где их нет, пункт открывается мгновенно. Всё остальное обычный HTML.",
    preview: "Превью",
    previewHint: "Откройте один вопрос, потом другой: первый закроется сам.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    multipleTitle: "Несколько открытых пунктов",
    multipleText:
      "multiple убирает общий name, и пункты открываются независимо.",
    cardTitle: "Карточки",
    cardText:
      'variant="card" кладёт каждый пункт в отдельную карточку. Первый пункт здесь открыт сразу благодаря defaultOpen.',
    framedTitle: "Как на главной GooseUI",
    framedText:
      'variant="framed" с numbered даёт FAQ с главной: пунктирная внешняя рамка, заполненная карточка внутри и крупные номера. Это обычный details, поэтому работает без JavaScript.',
    itemTitle: "Отдельные пункты",
    itemText:
      "DetailsAccordionItem работает и сам по себе. Дайте нескольким пунктам одинаковый name, и они свяжутся в любом месте страницы.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propItems: "Пункты: title, content, необязательные id и defaultOpen",
    propMultiple: "Разрешить несколько открытых пунктов",
    propName:
      "Общий name для режима одного пункта. Если не задан, создаётся сам",
    propVariant: "Разделители, отдельные карточки или рамка как на главной",
    propNumbered: "Показать 01, 02, … перед каждым заголовком",
    propItemClassName: "Классы каждого пункта",
    propClassName: "Классы обёртки",
    components: "Компоненты",
    componentHeader: "Компонент",
    componentAccordion: "Список пунктов из массива items",
    componentItem:
      "Один пункт <details>: title, children, name, defaultOpen, variant и любые атрибуты details",
    features: "Возможности",
    featureList: [
      ["Без JavaScript", "работает в Server Components и до гидратации"],
      [
        "Поиск по странице",
        "поиск браузера сам открывает закрытый пункт, если совпадение внутри",
      ],
      [
        "Клавиатура",
        "summary получает фокус, Enter и пробел открывают и закрывают",
      ],
      ["Меньше движения", "анимация высоты отключается"],
    ],
    faq: [
      [
        "Сколько идёт доставка?",
        "По городу привезём на следующий день. В другие регионы от двух до пяти дней, смотря как далеко.",
      ],
      [
        "Можно вернуть товар?",
        "Да, в течение 14 дней, если вещью не пользовались. Деньги вернутся на ту же карту.",
      ],
      [
        "Вы работаете в выходные?",
        "По воскресеньям склад закрыт, но заказы принимаем круглосуточно.",
      ],
      [
        "Как поменять адрес?",
        "Откройте заказ и нажмите «Изменить», пока его не передали курьеру.",
      ],
    ],
    multiple: [
      ["Состав", "Мука, вода, соль и немного дрожжей."],
      ["Хранение", "В бумажном пакете до трёх дней."],
      ["Аллергены", "Содержит глютен. Может содержать следы кунжута."],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Details Accordion", description: t.description }
}

export default async function DetailsAccordionPage({ params }: Props) {
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
    { id: "components", title: t.components, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const faqItems = t.faq.map(([title, text], index) => ({
    id: `faq-${index}`,
    title,
    content: <p>{text}</p>,
  }))
  const multipleItems = t.multiple.map(([title, text]) => ({
    title,
    content: <p>{text}</p>,
  }))

  const rows: [string, string, string, string][] = [
    ["items", "DetailsAccordionItemData[]", "-", t.propItems],
    ["multiple", "boolean", "false", t.propMultiple],
    ["name", "string", "useId()", t.propName],
    ["variant", '"line" | "card" | "framed"', '"line"', t.propVariant],
    ["numbered", "boolean", "false", t.propNumbered],
    ["itemClassName", "string", "-", t.propItemClassName],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Details Accordion" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "details-name",
              description: t.auditFeature0Description,
            },
            {
              featureId: "interpolate-size",
              description: t.auditFeature1Description,
            },
            {
              featureId: "details-content",
              description: t.auditFeature2Description,
            },
            {
              featureId: "content-visibility",
              description: t.auditFeature3Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature4Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <DetailsAccordion items={faqItems} className="max-w-lg" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/details-accordion" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { DetailsAccordion } from "@/components/ui/details-accordion"

const items = [
  { title: "How long does delivery take?", content: "Next day within the city." },
  { title: "Can I return an item?", content: "Yes, within 14 days." },
]

export default function Faq() {
  return <DetailsAccordion items={items} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.multipleTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.multipleText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <DetailsAccordion
                  items={multipleItems}
                  multiple
                  className="max-w-lg"
                />
              </div>
              <CodeBlock className="mt-4">{`<DetailsAccordion items={items} multiple />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.cardTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.cardText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <DetailsAccordion
                  variant="card"
                  items={faqItems.map((item, index) => ({
                    ...item,
                    id: `card-${index}`,
                    defaultOpen: index === 0,
                  }))}
                  className="max-w-lg"
                />
              </div>
              <CodeBlock className="mt-4">{`<DetailsAccordion
  variant="card"
  items={[
    { title: "How long does delivery take?", content: "…", defaultOpen: true },
    { title: "Can I return an item?", content: "…" },
  ]}
/>`}</CodeBlock>
            </div>

            <div id="gooseui-faq-example">
              <h3 className="mb-3 text-lg font-medium">{t.framedTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.framedText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <DetailsAccordion
                  variant="framed"
                  numbered
                  name="framed-example"
                  items={faqItems.map((item, index) => ({
                    ...item,
                    id: `framed-${index}`,
                    defaultOpen: index === 0,
                  }))}
                  className="mx-auto max-w-2xl"
                />
              </div>
              <CodeBlock className="mt-4">{`<DetailsAccordion
  variant="framed"
  numbered
  items={[
    { title: "What is GooseUI?", content: "…", defaultOpen: true },
    { title: "Is it free?", content: "…" },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.itemTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.itemText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
                  {t.multiple.slice(0, 2).map(([title, text]) => (
                    <DetailsAccordionItem
                      key={title}
                      name="product-info"
                      variant="card"
                      title={title}
                    >
                      {text}
                    </DetailsAccordionItem>
                  ))}
                </div>
              </div>
              <CodeBlock className="mt-4">{`import { DetailsAccordionItem } from "@/components/ui/details-accordion"

<div className="grid gap-4 sm:grid-cols-2">
  <DetailsAccordionItem name="product-info" variant="card" title="Ingredients">
    Flour, water, salt and a little yeast.
  </DetailsAccordionItem>
  <DetailsAccordionItem name="product-info" variant="card" title="Storage">
    Keep in a paper bag for up to three days.
  </DetailsAccordionItem>
</div>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
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
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.components}
          </h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">DetailsAccordion</td>
                  <td className="p-3">{t.componentAccordion}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    DetailsAccordionItem
                  </td>
                  <td className="p-3">{t.componentItem}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
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
