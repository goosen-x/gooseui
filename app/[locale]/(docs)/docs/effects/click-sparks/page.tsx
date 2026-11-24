import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ClickSparksButtonsDemo,
  ClickSparksDemo,
  ClickSparksStyleDemo,
} from "./click-sparks-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Short spark strokes burst from every click inside a wrapper",
  intro:
    "A wrapper that throws short spark strokes out of every click point. The sparks are drawn on a canvas on top of the content with pointer-events: none, so clicks still reach buttons and links. The animation loop only runs while sparks are alive.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "Wrap any content. The color follows the text color by default, so set it with a text class.",
  examples: "Examples",
  buttonsTitle: "Around buttons",
  buttonsText:
    "One wrapper covers a group of buttons. Their own click handlers keep working, and keyboard presses burst from the button center.",
  styleTitle: "Color, size and easing",
  styleText:
    "Tune the count, distance, stroke and timing. The easing accepts a preset or your own function.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propColor: "Stroke color, any CSS color or var()",
  propCount: "Sparks per click",
  propRadius: "Distance the sparks travel, in pixels",
  propLength: "Initial stroke length, in pixels",
  propLineWidth: "Stroke width, in pixels",
  propDuration: "Lifetime of a burst, in milliseconds",
  propEasing: "Easing preset or a function from [0, 1] to [0, 1]",
  propDisabled: "Turns the effect off",
  propClassName: "Additional CSS classes for the wrapper",
  features: "Features",
  featureList: [
    ["Does not block clicks", "the canvas ignores the pointer"],
    [
      "Idle when quiet",
      "requestAnimationFrame stops once the last spark fades",
    ],
    ["Keyboard friendly", "Enter and Space on a button burst from its center"],
    ["Reduced motion", "with prefers-reduced-motion nothing is drawn"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Из каждой точки клика внутри обёртки разлетаются искры",
    intro:
      "Обёртка, из каждой точки клика которой разлетаются короткие искры-штрихи. Искры рисуются на canvas поверх содержимого с pointer-events: none, поэтому клики доходят до кнопок и ссылок. Цикл анимации работает только пока есть живые искры.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Оберните любое содержимое. По умолчанию цвет берётся из цвета текста, его удобно задать текстовым классом.",
    examples: "Примеры",
    buttonsTitle: "Вокруг кнопок",
    buttonsText:
      "Одна обёртка на группу кнопок. Их собственные обработчики работают как обычно, а нажатие с клавиатуры даёт искры из центра кнопки.",
    styleTitle: "Цвет, размер и плавность",
    styleText:
      "Настраиваются число искр, дальность, штрих и время. В easing можно передать готовый вариант или свою функцию.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propColor: "Цвет штриха, любой CSS-цвет или var()",
    propCount: "Число искр на клик",
    propRadius: "Дальность разлёта в пикселях",
    propLength: "Начальная длина штриха в пикселях",
    propLineWidth: "Толщина штриха в пикселях",
    propDuration: "Время жизни вспышки в миллисекундах",
    propEasing: "Готовая кривая или функция из [0, 1] в [0, 1]",
    propDisabled: "Выключает эффект",
    propClassName: "Дополнительные CSS-классы обёртки",
    features: "Возможности",
    featureList: [
      ["Не мешает кликам", "canvas не перехватывает указатель"],
      [
        "Простаивает без дела",
        "requestAnimationFrame останавливается, когда гаснет последняя искра",
      ],
      [
        "Работает с клавиатуры",
        "Enter и пробел на кнопке дают искры из её центра",
      ],
      ["Reduced motion", "при prefers-reduced-motion ничего не рисуется"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Click Sparks", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function ClickSparksPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["color", "string", '"currentColor"', t.propColor],
    ["count", "number", "8", t.propCount],
    ["radius", "number", "24", t.propRadius],
    ["length", "number", "10", t.propLength],
    ["lineWidth", "number", "2", t.propLineWidth],
    ["duration", "number", "400", t.propDuration],
    [
      "easing",
      '"linear" | "ease-in" | "ease-out" | "ease-in-out" | (t: number) => number',
      '"ease-out"',
      t.propEasing,
    ],
    ["disabled", "boolean", "false", t.propDisabled],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Click Sparks" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center bg-muted/30 rounded-lg">
            <ClickSparksDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/click-sparks" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { ClickSparks } from "@/components/ui/click-sparks"

export default function Example() {
  return (
    <ClickSparks className="text-primary">
      <Button type="button">Click me</Button>
    </ClickSparks>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.buttonsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.buttonsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ClickSparksButtonsDemo />
              </div>
              <CodeBlock className="mt-4">{`<ClickSparks count={10} radius={36} color="var(--primary)" className="flex gap-3">
  <Button variant="outline" onClick={like}>Like</Button>
  <Button variant="outline" onClick={star}>Star</Button>
</ClickSparks>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.styleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.styleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ClickSparksStyleDemo />
              </div>
              <CodeBlock className="mt-4">{`<ClickSparks
  color="var(--chart-1)"
  count={16}
  radius={56}
  length={18}
  lineWidth={1.5}
  duration={650}
>
  ...
</ClickSparks>

const backOut = (t: number) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2

<ClickSparks color="var(--chart-2)" count={6} lineWidth={3} easing={backOut}>
  ...
</ClickSparks>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
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
