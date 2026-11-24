import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  MarqueeDemo,
  MarqueeRowsDemo,
  MarqueeShortDemo,
  MarqueeVerticalDemo,
} from "./marquee-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Removes inactive content from interaction",
  auditFeature1Description: "Pauses movement while focused",
  auditFeature2Description: "Creates fading edges",
  description:
    "Infinite CSS ticker with faded edges and a smooth stop on hover",
  intro:
    "An endless ticker for logos, tags or news. It is a server component: the content is rendered several times and the track moves by one copy with a CSS animation. The only client code is a tiny helper that eases the speed to zero on hover and focus. Edges fade out with a mask, copies are hidden from screen readers.",
  browserSupport: "Browser Support",
  supportDescription0: "Removes duplicate links from keyboard navigation.",
  browserSupportText:
    "Only CSS animations, transforms and mask-image, all of them are supported everywhere. The copies use the inert attribute so that links inside them are not focusable.",
  preview: "Preview",
  previewText:
    "Hover the ticker, it slows down smoothly and speeds up when you leave.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  rowsTitle: "Two rows in opposite directions",
  rowsText:
    "reverse flips the direction. Each row has its own duration and gap. The rows are short, so repeat renders four copies.",
  verticalTitle: "Vertical",
  verticalText:
    "vertical scrolls the items upwards. Give the marquee a fixed height.",
  shortTitle: "Few items",
  shortText:
    "CSS cannot measure the content, so the number of copies is set by repeat. One copy times repeat minus one must cover the container, otherwise a gap appears at the end of the loop.",
  props: "Props",
  features: "Features",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    children: "Items of the ticker",
    duration: "Seconds for one copy of the content to scroll past",
    repeat:
      "How many copies to render. Raise it when the content is narrower than the container",
    reverse: "Move right (or down) instead of left (or up)",
    vertical: "Scroll vertically. Needs a fixed height",
    pauseOnHover: "Slow down to a stop while hovered",
    stopDuration:
      "Milliseconds to slow down on hover or focus and to speed up again",
    gap: "Space between items: number in px or any CSS length",
    fade: "Width of the faded edges in px, 0 turns the mask off",
    className: "Additional CSS classes",
    rest: "Any other div attributes",
  },
  featureList: [
    [
      "Almost no JavaScript",
      "the ticker is a Server Component, about 60 lines of client code brake it smoothly; without scripts it still runs and pauses at once",
    ],
    [
      "Accessible",
      "copies get aria-hidden and inert, the ticker slows to a stop while focus is inside",
    ],
    [
      "Reduced motion",
      "with prefers-reduced-motion the ticker stops and wraps into rows",
    ],
    ["No dependencies", "keyframes live inside the component"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description:
      "Отключает взаимодействие с неактивным содержимым",
    auditFeature1Description: "Приостанавливает движение при фокусе",
    auditFeature2Description: "Создаёт затухающие края",
    description:
      "Бесконечная CSS-лента с затуханием по краям и плавной остановкой при наведении",
    intro:
      "Бесконечная лента для логотипов, тегов или новостей. Это серверный компонент: содержимое выводится несколько раз, а CSS-анимация сдвигает ленту ровно на одну копию. Клиентского кода совсем немного: помощник, который плавно гасит скорость при наведении и фокусе. Края плавно уходят в прозрачность через маску, копии скрыты от скринридеров.",
    browserSupport: "Поддержка браузеров",
    supportDescription0:
      "Исключает повторные ссылки из навигации с клавиатуры.",
    browserSupportText:
      "Только CSS-анимации, трансформации и mask-image, их понимают все браузеры. У копий стоит атрибут inert, поэтому ссылки внутри них не получают фокус.",
    preview: "Превью",
    previewText:
      "Наведите курсор на ленту: она плавно затормозит, а при уходе курсора разгонится.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    rowsTitle: "Две ленты навстречу",
    rowsText:
      "reverse меняет направление. У каждой ленты своя длительность и отступ. Ленты короткие, поэтому repeat выводит четыре копии.",
    verticalTitle: "Вертикальная",
    verticalText:
      "vertical прокручивает элементы снизу вверх. Задайте ленте фиксированную высоту.",
    shortTitle: "Мало элементов",
    shortText:
      "CSS не умеет измерять содержимое, поэтому число копий задаёт repeat. Ширина одной копии, умноженная на repeat минус один, должна перекрывать контейнер, иначе в конце круга появится дыра.",
    props: "Пропсы",
    features: "Возможности",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      children: "Элементы ленты",
      duration: "За сколько секунд проезжает одна копия содержимого",
      repeat:
        "Сколько копий выводить. Увеличьте, если содержимое уже контейнера",
      reverse: "Двигаться вправо (или вниз) вместо влево (или вверх)",
      vertical: "Вертикальная прокрутка, нужна фиксированная высота",
      pauseOnHover: "Плавно тормозить при наведении",
      stopDuration:
        "За сколько миллисекунд лента тормозит при наведении или фокусе и снова разгоняется",
      gap: "Отступ между элементами: число в px или любая CSS-длина",
      fade: "Ширина затухания по краям в px, 0 отключает маску",
      className: "Дополнительные CSS-классы",
      rest: "Любые другие атрибуты div",
    },
    featureList: [
      [
        "Почти без JavaScript",
        "лента — серверный компонент, около 60 строк клиентского кода плавно её тормозят; без скриптов она тоже едет и встаёт сразу",
      ],
      [
        "Доступность",
        "копии получают aria-hidden и inert, лента тормозит, пока фокус внутри",
      ],
      [
        "Без анимации",
        "при prefers-reduced-motion лента стоит и переносится по строкам",
      ],
      ["Без зависимостей", "keyframes живут внутри компонента"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Marquee", description: t.description }
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

export default async function MarqueePage({ params }: Props) {
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
        <DocsPageNav title="Marquee" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "inert",
              description: t.auditFeature0Description,
            },
            {
              featureId: "focus-within",
              description: t.auditFeature1Description,
            },
            {
              featureId: "masks",
              description: t.auditFeature2Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <MarqueeDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/marquee" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Marquee } from "@/components/ui/marquee"

export default function Example() {
  return (
    <Marquee duration={20} pauseOnHover>
      <img src="/logos/one.svg" alt="One" className="h-8" />
      <img src="/logos/two.svg" alt="Two" className="h-8" />
      <img src="/logos/three.svg" alt="Three" className="h-8" />
    </Marquee>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.rowsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.rowsText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <MarqueeRowsDemo />
              </div>
              <CodeBlock className="mt-4">{`<Marquee duration={12} repeat={4} gap={16}>{tags}</Marquee>
<Marquee duration={8} repeat={4} gap={16} reverse>{moreTags}</Marquee>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.verticalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.verticalText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <MarqueeVerticalDemo />
              </div>
              <CodeBlock className="mt-4">{`<Marquee vertical duration={14} gap={12} pauseOnHover className="h-56 w-64">
  {updates.map((text) => (
    <div key={text} className="rounded-lg border bg-card px-4 py-3 text-sm">
      {text}
    </div>
  ))}
</Marquee>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.shortTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.shortText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <MarqueeShortDemo />
              </div>
              <CodeBlock className="mt-4">{`<Marquee repeat={8} gap={48}>
  <Logo name="Orbitly" />
  <Logo name="Squarely" />
</Marquee>`}</CodeBlock>
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
              ["children", "ReactNode", "-", t.p.children],
              ["duration", "number", "20", t.p.duration],
              ["repeat", "number", "2", t.p.repeat],
              ["reverse", "boolean", "false", t.p.reverse],
              ["vertical", "boolean", "false", t.p.vertical],
              ["pauseOnHover", "boolean", "false", t.p.pauseOnHover],
              ["stopDuration", "number", "500", t.p.stopDuration],
              ["gap", "number | string", "32", t.p.gap],
              ["fade", "number", "48", t.p.fade],
              ["className", "string", "-", t.p.className],
              ["...props", 'ComponentProps<"div">', "-", t.p.rest],
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
