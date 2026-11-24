import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ConfettiCannonsDemo,
  ConfettiDemo,
  ConfettiPresetsDemo,
  ConfettiTargetDemo,
  ConfettiTaskDemo,
} from "./confetti-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Dependency-free canvas confetti burst with a hook and presets",
  intro:
    "Confetti on canvas without dependencies. useConfetti returns fire(), which launches a burst from a point or an element. The canvas is created on demand on top of the page with pointer-events: none and removed once the last particle fades. With reduced motion turned on, fire does nothing.",
  preview: "Preview",
  previewHint: "Press the button. The burst starts from the button itself.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  presetsTitle: "Presets",
  presetsText:
    "preset sets particle count, spread and speed. Any explicit option overrides the preset.",
  targetTitle: "From an element",
  targetText:
    "origin accepts viewport coordinates, a DOM element or a ref. The burst starts from the element center.",
  cannonsTitle: "Side cannons",
  cannonsText:
    "Two calls with different origin and angle. Bursts share one canvas.",
  taskTitle: "On completion",
  taskText: "A small burst from a checkbox when a task is done.",
  props: "Options",
  propsHeaders: {
    prop: "Option",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  opt: {
    preset: "Intensity preset",
    origin: "Launch point: { x, y } in viewport px, an element or a ref",
    particleCount: "Number of particles",
    angle: "Launch direction in degrees, 90 is up",
    spread: "Cone width in degrees",
    startVelocity: "Initial speed in px per frame at 60 fps",
    gravity: "Downward acceleration",
    decay: "Velocity multiplier per frame",
    drift: "Horizontal wind",
    ticks: "Lifetime in frames, 60 per second",
    scalar: "Particle size multiplier",
    colors: "CSS colors, by default a bright palette",
    shapes: "Particle shapes",
    zIndex: "z-index of the canvas",
    respectReducedMotion: "Skip the effect for prefers-reduced-motion",
  },
  presetCol: "from preset",
  buttonTitle: "ConfettiButton",
  buttonText:
    "A button that fires from itself on click. Accepts every button prop plus options.",
  hook: "useConfetti",
  hookText:
    "useConfetti(defaults?) returns { fire }. fire(options?) merges options over the defaults and returns a Promise that resolves when the canvas is removed. Outside React use fireConfetti(options) from the same file.",
  presetsTable: "Preset values",
  features: "Features",
  featureList: [
    ["No dependencies", "own particle physics on canvas 2D in a single file"],
    [
      "On demand",
      "the canvas appears only for the burst and is removed after it",
    ],
    [
      "No leaks",
      "requestAnimationFrame stops and the resize listener is removed together with the canvas",
    ],
    [
      "Reduced motion",
      "fire returns right away when the user asked for less motion",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Залп конфетти на canvas без зависимостей, с хуком и пресетами",
    intro:
      "Конфетти на canvas без зависимостей. useConfetti возвращает fire(), который запускает залп из точки или от элемента. Canvas создаётся по требованию поверх страницы с pointer-events: none и удаляется, когда гаснет последняя частица. Если включено уменьшение движения, fire ничего не делает.",
    preview: "Превью",
    previewHint: "Нажмите на кнопку. Залп вылетает из неё самой.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    presetsTitle: "Пресеты",
    presetsText:
      "preset задаёт число частиц, разброс и скорость. Любая явно переданная опция важнее пресета.",
    targetTitle: "От элемента",
    targetText:
      "origin принимает координаты в окне, DOM-элемент или ref. Залп стартует из центра элемента.",
    cannonsTitle: "Пушки с краёв",
    cannonsText:
      "Два вызова с разными origin и angle. Все залпы рисуются на одном canvas.",
    taskTitle: "Когда задача выполнена",
    taskText: "Небольшой залп от чекбокса, когда задача отмечена.",
    props: "Опции",
    propsHeaders: {
      prop: "Опция",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    opt: {
      preset: "Пресет интенсивности",
      origin: "Точка вылета: { x, y } в px окна, элемент или ref",
      particleCount: "Число частиц",
      angle: "Направление в градусах, 90 значит вверх",
      spread: "Ширина конуса в градусах",
      startVelocity: "Начальная скорость в px за кадр",
      gravity: "Ускорение вниз за кадр",
      decay: "Множитель скорости за кадр",
      drift: "Боковой ветер",
      ticks: "Время жизни в кадрах, 60 в секунду",
      scalar: "Множитель размера частиц",
      colors: "CSS-цвета, по умолчанию яркая палитра",
      shapes: "Формы частиц",
      zIndex: "z-index для canvas",
      respectReducedMotion: "Пропускать эффект при prefers-reduced-motion",
    },
    presetCol: "из пресета",
    buttonTitle: "ConfettiButton",
    buttonText:
      "Кнопка, которая стреляет из себя при клике. Принимает все пропсы button и options.",
    hook: "useConfetti",
    hookText:
      "useConfetti(defaults?) возвращает { fire }. fire(options?) накладывает опции поверх defaults и возвращает Promise, который выполняется, когда canvas удалён. Вне React используйте fireConfetti(options) из того же файла.",
    presetsTable: "Значения пресетов",
    features: "Возможности",
    featureList: [
      ["Без зависимостей", "своя физика частиц на canvas 2D в одном файле"],
      [
        "По требованию",
        "canvas появляется только на время залпа и потом удаляется",
      ],
      [
        "Без утечек",
        "requestAnimationFrame останавливается, а слушатель resize снимается вместе с canvas",
      ],
      [
        "Reduced motion",
        "fire сразу выходит, если человек просил меньше движения",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Confetti", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
const th = "text-left p-3 font-medium"

export default async function ConfettiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "hook", title: t.hook, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const o = t.opt
  const fromPreset = t.presetCol
  const rows: [string, string, string, string][] = [
    ["preset", '"low" | "medium" | "high" | "burst"', '"medium"', o.preset],
    ["origin", "{ x, y } | Element | RefObject", "-", o.origin],
    ["particleCount", "number", fromPreset, o.particleCount],
    ["angle", "number", "90", o.angle],
    ["spread", "number", fromPreset, o.spread],
    ["startVelocity", "number", fromPreset, o.startVelocity],
    ["gravity", "number", "1", o.gravity],
    ["decay", "number", "0.9", o.decay],
    ["drift", "number", "0", o.drift],
    ["ticks", "number", fromPreset, o.ticks],
    ["scalar", "number", fromPreset, o.scalar],
    ["colors", "string[]", "-", o.colors],
    ["shapes", '("square" | "circle" | "strip")[]', "all", o.shapes],
    ["zIndex", "number", "100", o.zIndex],
    ["respectReducedMotion", "boolean", "true", o.respectReducedMotion],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Confetti" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <ConfettiDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/confetti" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { useConfetti } from "@/components/ui/confetti"

export default function Example() {
  const { fire } = useConfetti()

  return (
    <Button onClick={(e) => fire({ origin: e.currentTarget })}>
      Celebrate
    </Button>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.presetsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.presetsText}
              </p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <ConfettiPresetsDemo />
              </div>
              <CodeBlock className="mt-4">{`fire({ preset: "low" })
fire({ preset: "high", origin: buttonRef })
fire({ preset: "burst", particleCount: 300 })`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.targetTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.targetText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ConfettiTargetDemo />
              </div>
              <CodeBlock className="mt-4">{`const target = useRef<HTMLDivElement>(null)
const { fire } = useConfetti({ origin: target, preset: "burst" })

<Button onClick={() => fire()}>Fire at the target</Button>
<div ref={target}>Target</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.cannonsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.cannonsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ConfettiCannonsDemo />
              </div>
              <CodeBlock className="mt-4">{`const { fire } = useConfetti({ preset: "high", spread: 55 })

const y = window.innerHeight * 0.7
fire({ origin: { x: 0, y }, angle: 60 })
fire({ origin: { x: window.innerWidth, y }, angle: 120 })`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.taskTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.taskText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ConfettiTaskDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Checkbox } from "@/components/ui/checkbox"

const { fire } = useConfetti({ preset: "low", shapes: ["circle", "strip"] })

<Checkbox
  onChange={(e) => {
    if (e.target.checked) fire({ origin: e.currentTarget.parentElement ?? e.currentTarget })
  }}
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
                  <th className={th}>{t.propsHeaders.prop}</th>
                  <th className={th}>{t.propsHeaders.type}</th>
                  <th className={th}>{t.propsHeaders.default}</th>
                  <th className={th}>{t.propsHeaders.description}</th>
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

          <h3 className="text-lg font-medium">{t.presetsTable}</h3>
          <CodeBlock>{`low:    { particleCount: 30,  spread: 55,  startVelocity: 35, ticks: 160, scalar: 0.9 }
medium: { particleCount: 50,  spread: 45,  startVelocity: 45, ticks: 200 }
high:   { particleCount: 130, spread: 70,  startVelocity: 55, ticks: 240 }
burst:  { particleCount: 100, spread: 360, startVelocity: 30, ticks: 180 }`}</CodeBlock>

          <h3 className="text-lg font-medium">{t.buttonTitle}</h3>
          <p className="text-sm text-muted-foreground">{t.buttonText}</p>
          <CodeBlock>{`import { ConfettiButton } from "@/components/ui/confetti"

<ConfettiButton options={{ preset: "high" }}>Celebrate</ConfettiButton>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="hook" className={h2}>
            {t.hook}
          </h2>
          <p className="text-sm text-muted-foreground">{t.hookText}</p>
          <CodeBlock>{`const { fire } = useConfetti({ colors: ["#facc15", "#38bdf8"] })

await fire({ origin: { x: 200, y: 300 } })
// the canvas is gone here

// outside React
import { fireConfetti } from "@/components/ui/confetti"
fireConfetti({ preset: "burst" })`}</CodeBlock>
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
