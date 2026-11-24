import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  TestimonialRotatorDemo,
  TestimonialRotatorHorizontalDemo,
  TestimonialRotatorManualDemo,
} from "./testimonial-rotator-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature2Description: "Colors the selected review controls",
  auditFeature3Description: "Balances review text wrapping",
  auditFeature4Description: "Animates the review change",
  description: "Auto-rotating testimonials with a progress ring, no JavaScript",
  intro:
    "Testimonials that change on their own. A ring around the active avatar shows how much time is left before the next one. The avatars are radio buttons: a click or the arrow keys pick a quote and restart the cycle from it. The rotation itself is one CSS animation shared by quotes, avatars and rings, so it pauses only while the cursor is over the avatar that is playing now, all without JavaScript. It is a Server Component.",
  browserSupport: "Browser Support",
  supportDescription0: "Switches the active quote.",
  browserSupportText:
    ":has() links the checked radio with its quote and swaps the animation name, which restarts the cycle. The rest is plain CSS animation.",
  preview: "Preview",
  previewText: "Hover the current avatar to pause the rotation.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  horizontalTitle: "Avatars on the side",
  horizontalText:
    'orientation="horizontal" puts the avatars in a column on the left from the md breakpoint. Here the interval is 4 seconds.',
  manualTitle: "Manual switching",
  manualText:
    "With autoPlay={false} the quotes change only on click or with the arrow keys. The ring stays as a marker of the active avatar.",
  avatarTitle: "Photos and custom avatars",
  avatarText:
    "Pass a square photo URL (160px is enough for the 56px avatar at 2x) or any node in avatar. The photo is a round <img> with lazy loading: inactive ones are dimmed, the active one is at full brightness inside the progress ring. Without avatar the component draws initials on a colored background.",
  props: "Props",
  itemTitle: "Testimonial",
  features: "Features",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    items: "List of testimonials",
    interval: "Time per testimonial in ms",
    autoPlay: "Switch testimonials automatically",
    defaultIndex: "Testimonial shown first",
    name: "Name of the radio group. Generated when omitted",
    orientation: "Avatars below the quote or in a column on the left",
    labels: "Texts: show(author) for the avatar radios, region for the section",
    className: "Additional CSS classes",
    quote: "Quote text",
    author: "Author name, also used for initials",
    role: "Position, company or any caption",
    avatar:
      "Square photo URL (160px or more) or a custom node. Falls back to initials",
  },
  featureList: [
    [
      "No JavaScript",
      "radio buttons and one CSS animation, a Server Component",
    ],
    ["Progress ring", "the SVG ring fills up until the next switch"],
    ["Pause", "only on hover over the avatar that is playing now"],
    [
      "Reduced motion",
      "with prefers-reduced-motion automatic switching is off",
    ],
    [
      "Keyboard",
      "the avatars are a radio group: Tab to enter, arrows to switch",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature2Description: "Окрашивает выбранные элементы управления",
    auditFeature3Description: "Выравнивает перенос текста отзывов",
    auditFeature4Description: "Анимирует смену отзывов",
    description:
      "Отзывы сменяются сами, вокруг аватарки кольцо прогресса, без JavaScript",
    intro:
      "Отзывы, которые сменяются сами. Кольцо вокруг активной аватарки показывает, сколько осталось до следующего. Аватарки сделаны радиокнопками: клик или стрелки выбирают отзыв и запускают цикл заново с него. Сама смена это одна CSS-анимация на цитатах, аватарках и кольцах, поэтому она встаёт на паузу только при наведении на аватарку, которая сейчас играет, и всё это без JavaScript. Компонент серверный.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Переключает активный отзыв.",
    browserSupportText:
      ":has() связывает выбранную радиокнопку с её отзывом и меняет имя анимации, отчего цикл начинается заново. Остальное обычная CSS-анимация.",
    preview: "Превью",
    previewText: "Наведите курсор на текущий аватар, чтобы остановить смену.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    horizontalTitle: "Аватарки сбоку",
    horizontalText:
      'С orientation="horizontal" аватарки начиная с брейкпоинта md встают колонкой слева. Здесь интервал 4 секунды.',
    manualTitle: "Ручное переключение",
    manualText:
      "С autoPlay={false} отзывы меняются только по клику или стрелками. Кольцо остаётся как отметка активной аватарки.",
    avatarTitle: "Фото и свои аватарки",
    avatarText:
      "В avatar можно передать адрес квадратного фото (хватит 160 px: аватарка 56 px при плотности 2x) или любой элемент. Фото выводится круглым <img> с ленивой загрузкой: неактивные приглушены, активное полной яркости внутри кольца прогресса. Без avatar компонент рисует инициалы на цветном фоне.",
    props: "Пропсы",
    itemTitle: "Testimonial",
    features: "Возможности",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      items: "Список отзывов",
      interval: "Сколько показывать один отзыв, мс",
      autoPlay: "Менять отзывы автоматически",
      defaultIndex: "Какой отзыв показать первым",
      name: "Имя группы радиокнопок. Если не задано, создаётся само",
      orientation: "Аватарки под цитатой или колонкой слева",
      labels:
        "Тексты: show(author) для радиокнопок-аватарок, region для секции",
      className: "Дополнительные CSS-классы",
      quote: "Текст отзыва",
      author: "Имя автора, из него же берутся инициалы",
      role: "Должность, компания или любая подпись",
      avatar:
        "Адрес квадратного фото (от 160 px) или свой элемент. Без него инициалы",
    },
    featureList: [
      [
        "Без JavaScript",
        "радиокнопки и одна CSS-анимация, серверный компонент",
      ],
      ["Кольцо прогресса", "SVG-кольцо заполняется до следующей смены"],
      ["Пауза", "только при наведении на аватарку, которая сейчас играет"],
      ["Без анимации", "при prefers-reduced-motion автосмена выключена"],
      [
        "Клавиатура",
        "аватарки это группа радиокнопок: Tab заходит в неё, стрелки переключают",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Testimonial Rotator", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

function PropsTable({
  headers,
  rows,
}: {
  headers: typeof en.propsHeaders
  rows: [string, string, string, string][]
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-medium">{headers.prop}</th>
            <th className="text-left p-3 font-medium">{headers.type}</th>
            <th className="text-left p-3 font-medium">{headers.default}</th>
            <th className="text-left p-3 font-medium">{headers.description}</th>
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

export default async function TestimonialRotatorPage({ params }: Props) {
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
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Testimonial Rotator" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature2Description,
            },
            {
              featureId: "text-wrap-balance",
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
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <TestimonialRotatorDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/testimonial-rotator" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { TestimonialRotator } from "@/components/ui/testimonial-rotator"

const items = [
  {
    quote: "We shipped the redesign two weeks early.",
    author: "Tom Becker",
    role: "Product manager, Quietbyte",
    avatar: "/avatars/tom-becker.webp",
  },
  {
    quote: "Support answered faster than our own team chat.",
    author: "Priya Nair",
    role: "Founder, Little Orbit",
    avatar: "/avatars/priya-nair.webp",
  },
]

export default function Example() {
  return <TestimonialRotator items={items} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.horizontalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.horizontalText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TestimonialRotatorHorizontalDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<TestimonialRotator items={items} orientation="horizontal" interval={4000} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.manualTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.manualText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TestimonialRotatorManualDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<TestimonialRotator items={items} autoPlay={false} defaultIndex={1} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.avatarTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.avatarText}
              </p>
              <CodeBlock>{`const items = [
  { quote: "…", author: "Lena Hart", avatar: "/avatars/lena-hart.webp" },
  { quote: "…", author: "Marco Silva", avatar: <UserIcon className="size-5" /> },
  { quote: "…", author: "Priya Nair" }, // initials "PN"
]

<TestimonialRotator
  items={items}
  labels={{ show: (author) => \`Read \${author}\`, region: "Customer stories" }}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <PropsTable
            headers={t.propsHeaders}
            rows={[
              ["items", "Testimonial[]", "-", t.p.items],
              ["interval", "number", "6000", t.p.interval],
              ["autoPlay", "boolean", "true", t.p.autoPlay],
              ["defaultIndex", "number", "0", t.p.defaultIndex],
              ["name", "string", "useId()", t.p.name],
              [
                "orientation",
                '"vertical" | "horizontal"',
                '"vertical"',
                t.p.orientation,
              ],
              ["labels", "Partial<TestimonialRotatorLabels>", "-", t.p.labels],
              ["className", "string", "-", t.p.className],
            ]}
          />
          <h3 className="text-lg font-medium pt-2">{t.itemTitle}</h3>
          <PropsTable
            headers={t.propsHeaders}
            rows={[
              ["quote", "ReactNode", "-", t.p.quote],
              ["author", "string", "-", t.p.author],
              ["role", "ReactNode", "-", t.p.role],
              ["avatar", "string | ReactNode", "initials", t.p.avatar],
            ]}
          />
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
