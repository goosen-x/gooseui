import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { RotatingTextDemo } from "./rotating-text-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  browserSupport: "Browser Support",
  supportDescription0: "Drives the word rotation cycle.",
  browserSupportText:
    "The cycle clock is a custom property registered with @property, Baseline newly available. With reduced motion the words still change, but only fade, without rotation and blur.",
  description: "Word that flips to the next one, letter by letter",
  intro:
    "A word inside a sentence that changes on a timer. Letters flip in around the X axis out of a blur, one after another, and leave the same way mirrored. It is a server component with no JavaScript: one registered custom property runs from 0 to 1 over the whole cycle, and every letter computes its opacity, rotation and blur from it with clamp(). The surrounding text does not jump: all words share one grid cell, so the component either reserves room for the longest word or tweens its width. Screen readers hear one static variant instead of every change.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  animateTitle: "Animated width",
  animateText:
    'With widthMode="animate" the gap around the word follows its length instead of staying at the longest one.',
  statusTitle: "Status line",
  statusText:
    "A slower stagger and a heavier blur suit a loading or status label.",
  a11yTitle: "Screen reader label",
  a11yText:
    "By default assistive tech reads the first word. Pass srLabel when a summary reads better.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propWords: "Words to cycle through",
  propInterval: "How long each word stays, in ms",
  propWidthMode:
    "reserve keeps the width of the longest word, animate tweens the width to the current one",
  propDuration: "Duration of one letter animation, in seconds",
  propStagger: "Delay between letters, in seconds",
  propBlur: "Blur of an entering or leaving letter, in px",
  propSrLabel: "Static text for screen readers. The first word by default",
  propClassName: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Управляет циклом смены слов.",
    browserSupportText:
      "Часы цикла сделаны на свойстве, зарегистрированном через @property, это Baseline newly. При reduced motion слова всё так же сменяются, но только через прозрачность, без поворота и размытия.",
    description: "Слово, которое по буквам переворачивается в следующее",
    intro:
      "Слово в строке, которое сменяется по таймеру. Буквы по очереди входят с поворотом по оси X и выходят из размытия, а уходят так же, только зеркально. Это серверный компонент без JavaScript: одно зарегистрированное CSS-свойство идёт от 0 до 1 за весь цикл, и каждая буква считает из него прозрачность, поворот и размытие через clamp(). Соседний текст не прыгает: все слова лежат в одной ячейке grid, поэтому компонент либо держит место под самое длинное слово, либо плавно меняет ширину. Скринридер слышит один статичный вариант, а не каждую смену.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    animateTitle: "Анимированная ширина",
    animateText:
      'С widthMode="animate" место под слово подстраивается под его длину, а не держится под самое длинное.',
    statusTitle: "Строка статуса",
    statusText:
      "Для индикатора загрузки или статуса подойдёт задержка побольше и размытие посильнее.",
    a11yTitle: "Текст для скринридера",
    a11yText:
      "По умолчанию вспомогательные технологии читают первое слово. Если лучше звучит общая фраза, передайте srLabel.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propWords: "Слова, которые сменяют друг друга",
    propInterval: "Сколько держится каждое слово, в мс",
    propWidthMode:
      "reserve держит ширину самого длинного слова, animate плавно подгоняет ширину под текущее",
    propDuration: "Длительность анимации одной буквы, в секундах",
    propStagger: "Задержка между буквами, в секундах",
    propBlur: "Размытие входящей и уходящей буквы, в px",
    propSrLabel: "Статичный текст для скринридера. По умолчанию первое слово",
    propClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Rotating Text", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function RotatingTextPage({ params }: Props) {
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
  ]

  const rows: [string, string, string, string][] = [
    ["words", "string[]", "-", t.propWords],
    ["interval", "number", "2500", t.propInterval],
    ["widthMode", '"reserve" | "animate"', '"reserve"', t.propWidthMode],
    ["duration", "number", "0.5", t.propDuration],
    ["stagger", "number", "0.04", t.propStagger],
    ["blur", "number", "6", t.propBlur],
    ["srLabel", "string", "words[0]", t.propSrLabel],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Rotating Text" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "registered-custom-properties",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center px-6 py-16 bg-muted/30 rounded-lg">
            <RotatingTextDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/rotating-text" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RotatingText } from "@/components/ui/rotating-text"

export default function Hero() {
  return (
    <h1 className="text-4xl font-semibold">
      Build{" "}
      <RotatingText
        words={["websites", "apps", "dashboards", "stores"]}
        className="text-primary"
      />{" "}
      that people enjoy
    </h1>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.animateTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.animateText}
              </p>
              <div className="flex justify-center px-6 py-12 bg-muted/30 rounded-lg">
                <RotatingTextDemo widthMode="animate" />
              </div>
              <CodeBlock className="mt-4">{`<RotatingText words={words} widthMode="animate" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.statusTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.statusText}
              </p>
              <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
                <RotatingTextDemo
                  variant="status"
                  interval={2000}
                  stagger={0.08}
                  blur={10}
                  duration={0.6}
                />
              </div>
              <CodeBlock className="mt-4">{`<RotatingText
  words={["LOADING", "SEARCHING", "SORTING", "DONE"]}
  interval={2000}
  stagger={0.08}
  blur={10}
  duration={0.6}
  className="text-4xl font-bold tracking-widest"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.a11yTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.a11yText}</p>
              <CodeBlock>{`<RotatingText
  words={["websites", "apps", "dashboards"]}
  srLabel="websites, apps and dashboards"
/>`}</CodeBlock>
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
                {rows.map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
