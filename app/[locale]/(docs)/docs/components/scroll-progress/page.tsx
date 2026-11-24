import { setRequestLocale } from "next-intl/server"
import type * as React from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollProgress } from "@/registry/gooseui/ui/scroll-progress"

const en = {
  browserSupport: "Browser Support",
  browserFeature0Description:
    "Without animation-timeline support the bar stays empty and hidden: it never shows a wrong value.",
  description:
    "Scroll progress bar for the page or any scrolling container, on CSS scroll-driven animations",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  cssFeature: "How it works",
  props: "Props",
  references: "References",
  intro:
    "Scroll progress bar on CSS scroll-driven animations, no JavaScript. It tracks the page or any scrolling container; the browser does the math on the compositor.",
  previewHint:
    "Scroll the text in the window: the bar at the top shows how much has been read.",
  articleTitle: "How a lighthouse keeper reads the weather",
  articleParagraphs: [
    "Long before forecasts reached the coast, the keeper of the northern lighthouse watched the sky from a gallery no wider than a doorstep. Every evening they wrote a single line in the logbook: the color of the sunset, the direction of the smoke, the height of the swell.",
    "Sea birds were the first signal. When gulls came inland and stayed on the fields, a storm was usually a day away. When cormorants dried their wings on the rocks for longer than usual, the air was heavy with moisture and rain followed by night.",
    "The second signal was sound. On a calm evening the bell of the village church carried across the bay, which meant the air near the water was cold and still. A bell that could not be heard at all promised wind from the open sea.",
    "The keeper never trusted a single sign. A red sky in the morning meant little if the barometer was rising, and a falling barometer meant little if the swell stayed low. Only when two or three signs agreed did the line in the logbook turn into a warning for the fishing boats.",
  ],
  articleSubtitle: "Reading the sea",
  articleParagraphs2: [
    "The sea itself kept the longest memory. A long, slow swell arriving from a calm horizon told of a storm hundreds of miles away, and it came days before the first cloud. The keeper counted the seconds between waves and wrote the number down.",
    "Fog was a different craft. It rose from the warm water on cold mornings and could hide the rocks completely, so the foghorn went on at the first white thread over the bay. The keeper listened for the answering horns of passing ships and counted them too.",
    "In winter the work was mostly waiting. The lamp was trimmed, the lens polished, the logbook filled. Those lines are still kept in the museum, and read together they form an almost unbroken record of the weather of a whole century.",
    "The last entry in the book is short. It says that the new automatic station works well and that the keeper will leave in the spring. Under it, in different ink, someone added the color of that evening's sunset.",
  ],
  pageExample: "Whole page",
  pageExampleText:
    "The default target is the page: the bar is fixed to the viewport edge. A live one is at the top of this page.",
  containerExample: "Any scrolling container",
  containerExampleText:
    'With target="nearest" the bar sticks inside the nearest scrollable ancestor and tracks it.',
  looksTitle: "Looks",
  looksText:
    "Thin line, thicker gradient in the theme color, and a percentage on the right. Scroll each window.",
  thinLine: "Thin line",
  gradientBar: "Gradient",
  withPercent: "With percentage",
  cssFeatureText:
    "The bar scales from 0 to 1 on a scroll() timeline; the percentage animates a registered @property integer shown through counter():",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  targetDesc:
    "Tracked scroller: the page, or the nearest scrollable ancestor (the bar becomes sticky)",
  colorDesc: "Bar color, any CSS color",
  heightDesc: "Bar thickness in pixels",
  positionDesc: "Edge where the bar sticks",
  gradientDesc: "Gradient from a faded to the full color",
  showPercentDesc: "Percentage to the right of the bar (CSS counter)",
  classNameDesc: "Additional CSS classes for the wrapper",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    browserFeature0Description:
      "Без поддержки animation-timeline полоса остаётся пустой и скрытой: неверного значения она не покажет.",
    description:
      "Индикатор прогресса прокрутки страницы или любого контейнера на CSS scroll-driven animations",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    cssFeature: "Как это работает",
    props: "Пропсы",
    references: "Ссылки",
    intro:
      "Индикатор прогресса прокрутки на CSS scroll-driven animations, без JavaScript. Следит за страницей или любым прокручиваемым контейнером, расчёт делает браузер.",
    previewHint:
      "Прокрутите текст в окне: полоса сверху показывает, сколько прочитано.",
    articleTitle: "Как смотритель маяка читает погоду",
    articleParagraphs: [
      "Задолго до прогнозов погоды смотритель северного маяка наблюдал за небом с галереи шириной в порог. Каждый вечер он записывал в журнал одну строку: цвет заката, направление дыма, высоту зыби.",
      "Первым знаком были морские птицы. Если чайки уходили вглубь суши и оставались на полях, шторм обычно приходил через день. Если бакланы сушили крылья на камнях дольше обычного, воздух был полон влаги и к ночи шёл дождь.",
      "Вторым знаком был звук. В тихий вечер колокол деревенской церкви долетал через бухту: значит, воздух у воды холодный и неподвижный. Если колокола не слышно совсем, жди ветра с открытого моря.",
      "Одному знаку смотритель не верил никогда. Красное утреннее небо мало значило при растущем барометре, а падающий барометр мало значил, пока зыбь оставалась низкой. Только когда сходились два-три знака, строка в журнале превращалась в предупреждение для рыбацких лодок.",
    ],
    articleSubtitle: "Читая море",
    articleParagraphs2: [
      "Дольше всех помнило само море. Длинная медленная зыбь из спокойного горизонта говорила о шторме за сотни миль и приходила за несколько дней до первого облака. Смотритель считал секунды между волнами и записывал число.",
      "Туман был отдельным ремеслом. Он поднимался от тёплой воды холодными утрами и мог полностью скрыть камни, поэтому туманный горн включали при первой белой нити над бухтой. Смотритель слушал ответные гудки проходящих кораблей и считал их тоже.",
      "Зимой работа сводилась к ожиданию. Лампу подрезали, линзу полировали, журнал заполняли. Эти записи до сих пор хранятся в музее, и вместе они дают почти непрерывную летопись погоды целого века.",
      "Последняя запись в журнале короткая. В ней сказано, что новая автоматическая станция работает хорошо и смотритель уедет весной. Под ней другими чернилами кто-то дописал цвет того вечернего заката.",
    ],
    pageExample: "Вся страница",
    pageExampleText:
      "По умолчанию отслеживается страница: полоса закреплена у края окна. Живой пример вверху этой страницы.",
    containerExample: "Любой прокручиваемый контейнер",
    containerExampleText:
      'С target="nearest" полоса липнет внутри ближайшего прокручиваемого предка и следит за ним.',
    looksTitle: "Внешний вид",
    looksText:
      "Тонкая линия, толстая с градиентом цвета темы и проценты справа. Прокрутите каждое окно.",
    thinLine: "Тонкая линия",
    gradientBar: "Градиент",
    withPercent: "С процентами",
    cssFeatureText:
      "Полоса растягивается от 0 до 1 по шкале scroll(); проценты анимируют целое число, объявленное через @property, и выводятся через counter():",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    targetDesc:
      "Какой скроллер отслеживать: страницу или ближайший прокручиваемый предок (полоса становится sticky)",
    colorDesc: "Цвет полосы, любой CSS-цвет",
    heightDesc: "Толщина полосы в пикселях",
    positionDesc: "У какого края полоса закреплена",
    gradientDesc: "Градиент от бледного цвета к полному",
    showPercentDesc: "Проценты справа от полосы (CSS-счётчик)",
    classNameDesc: "Дополнительные CSS-классы для обёртки",
  },
}

type Copy = typeof en

function DemoWindow({
  t,
  height,
  className,
  barProps,
}: {
  t: Copy
  height: string
  className?: string
  barProps: React.ComponentProps<typeof ScrollProgress>
}) {
  return (
    <div
      className={`relative overflow-y-auto rounded-lg border bg-background ${height} ${className ?? ""}`}
    >
      <ScrollProgress
        target="nearest"
        className="bg-background/90 px-4 py-2 backdrop-blur"
        {...barProps}
      />
      <article className="space-y-3 px-4 pb-6 pt-2 text-sm leading-relaxed">
        <h3 className="text-lg font-semibold">{t.articleTitle}</h3>
        {t.articleParagraphs.map((p) => (
          <p key={p} className="text-muted-foreground">
            {p}
          </p>
        ))}
        <h4 className="pt-2 text-base font-semibold">{t.articleSubtitle}</h4>
        {t.articleParagraphs2.map((p) => (
          <p key={p} className="text-muted-foreground">
            {p}
          </p>
        ))}
      </article>
    </div>
  )
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Scroll Progress",
    description: t.description,
  }
}

export default async function ScrollProgressPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "css-feature", title: t.cssFeature, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "references", title: t.references, level: 2 },
  ]

  return (
    <>
      {/* Live demo - scroll progress bar */}
      <ScrollProgress />

      <DocsPage toc={toc}>
        <div className="space-y-8">
          {/* 1. Navigation */}
          <DocsPageNav title="Scroll Progress" />

          {/* 2. Description */}
          <p className="text-muted-foreground">{t.intro}</p>

          {/* 3. Browser Support */}
          <BrowserSupport
            title={t.browserSupport}
            features={[
              {
                featureId: "scroll-driven-animations",

                description: t.browserFeature0Description,
              },
            ]}
          />

          {/* 4. Preview */}
          <div className="space-y-4">
            <h2
              id="preview"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.preview}
            </h2>
            <div className="space-y-3 rounded-lg bg-muted/30 p-6">
              <p className="text-sm text-muted-foreground">{t.previewHint}</p>
              <DemoWindow
                t={t}
                height="h-80"
                barProps={{ height: 6, gradient: true, showPercent: true }}
              />
            </div>
          </div>

          {/* 5. Installation */}
          <div className="space-y-4">
            <h2
              id="installation"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.installation}
            </h2>
            <InstallCommand packageName="@gooseui/scroll-progress" />
          </div>

          {/* 6. Usage */}
          <div className="space-y-4">
            <h2
              id="usage"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.usage}
            </h2>
            <CodeBlock>{`import { ScrollProgress } from "@/components/ui/scroll-progress"

// Whole page: put it once in the layout
<ScrollProgress />

// Any scrolling container: the bar sticks inside it
<div className="h-80 overflow-y-auto">
  <ScrollProgress target="nearest" className="bg-background px-4 py-2" />
  {/* long content */}
</div>`}</CodeBlock>
          </div>

          {/* 7. Examples */}
          <div className="space-y-4">
            <h2
              id="examples"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.examples}
            </h2>

            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">{t.pageExample}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.pageExampleText}
                </p>
                <CodeBlock>{`<ScrollProgress />`}</CodeBlock>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">{t.containerExample}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.containerExampleText}
                </p>
                <CodeBlock>{`<ScrollProgress target="nearest" />`}</CodeBlock>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">{t.looksTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.looksText}</p>
                <div className="space-y-8 rounded-lg bg-muted/30 p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.thinLine}</p>
                    <DemoWindow t={t} height="h-60" barProps={{ height: 2 }} />
                    <CodeBlock>{`<ScrollProgress target="nearest" height={2} />`}</CodeBlock>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.gradientBar}</p>
                    <DemoWindow
                      t={t}
                      height="h-60"
                      barProps={{ height: 8, gradient: true }}
                    />
                    <CodeBlock>{`<ScrollProgress target="nearest" height={8} gradient />`}</CodeBlock>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.withPercent}</p>
                    <DemoWindow
                      t={t}
                      height="h-60"
                      barProps={{ height: 4, showPercent: true }}
                    />
                    <CodeBlock>{`<ScrollProgress target="nearest" showPercent />`}</CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. CSS Feature */}
          <div className="space-y-4">
            <h2
              id="css-feature"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.cssFeature}
            </h2>
            <p className="text-muted-foreground mb-4">{t.cssFeatureText}</p>
            <CodeBlock>{`@property --gsp { syntax: "<integer>"; inherits: true; initial-value: 0; }

[data-gsp-bar] {
  transform: scaleX(0);
  transform-origin: left;
}

@supports (animation-timeline: scroll()) {
  [data-target="nearest"],
  [data-target="nearest"] [data-gsp-bar] {
    animation-timeline: scroll(nearest); /* or scroll(root) */
  }
  [data-gsp-bar] { animation: gsp-grow linear both; }
  [data-gooseui-scroll-progress] { animation: gsp-count linear both; }
  [data-gsp-label]::after { content: counter(gsp) "%"; }
}

@keyframes gsp-grow { to { transform: scaleX(1); } }
@keyframes gsp-count { to { --gsp: 100; } }`}</CodeBlock>
          </div>

          {/* 9. Props */}
          <div className="space-y-4">
            <h2
              id="props"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.props}
            </h2>
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">{t.prop}</th>
                    <th className="text-left p-3 font-medium">{t.type}</th>
                    <th className="text-left p-3 font-medium">{t.default}</th>
                    <th className="text-left p-3 font-medium">
                      {t.description2}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">target</td>
                    <td className="p-3 font-mono text-xs">
                      &quot;root&quot; | &quot;nearest&quot;
                    </td>
                    <td className="p-3 font-mono text-xs">&quot;root&quot;</td>
                    <td className="p-3">{t.targetDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">color</td>
                    <td className="p-3 font-mono text-xs">string</td>
                    <td className="p-3 font-mono text-xs">primary</td>
                    <td className="p-3">{t.colorDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">height</td>
                    <td className="p-3 font-mono text-xs">number</td>
                    <td className="p-3 font-mono text-xs">3</td>
                    <td className="p-3">{t.heightDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">position</td>
                    <td className="p-3 font-mono text-xs">
                      &quot;top&quot; | &quot;bottom&quot;
                    </td>
                    <td className="p-3 font-mono text-xs">&quot;top&quot;</td>
                    <td className="p-3">{t.positionDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">gradient</td>
                    <td className="p-3 font-mono text-xs">boolean</td>
                    <td className="p-3 font-mono text-xs">false</td>
                    <td className="p-3">{t.gradientDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">showPercent</td>
                    <td className="p-3 font-mono text-xs">boolean</td>
                    <td className="p-3 font-mono text-xs">false</td>
                    <td className="p-3">{t.showPercentDesc}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs">className</td>
                    <td className="p-3 font-mono text-xs">string</td>
                    <td className="p-3 font-mono text-xs">-</td>
                    <td className="p-3">{t.classNameDesc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 10. References */}
          <div className="space-y-4">
            <h2
              id="references"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.references}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  MDN: animation-timeline
                </a>
              </li>
              <li>
                <a
                  href="https://scroll-driven-animations.style/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Scroll-driven Animations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </DocsPage>
    </>
  )
}
