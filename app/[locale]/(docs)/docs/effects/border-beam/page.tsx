import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BorderBeam } from "@/registry/gooseui/effects/border-beam"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"

const en = {
  anAnimatedBeamOf:
    "An animated beam of light traveling along the container border",
  intro:
    "An animated beam of light traveling along the container border. A server component with no client JavaScript: the angle of a linear gradient is a registered @property, and a CSS keyframe spins it.",
  browserSupport: "Browser Support",
  browserSupportProperty:
    "Animates the gradient angle; without it the border stays still.",
  browserSupportCorner:
    "Gives the border squircle corners when requested; without it the corners remain rounded.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  animatedBorderEffect: "Animated border effect",
  aBeamOfLight:
    "A beam of light smoothly moves around the perimeter of the card, creating an impressive animation",
  important: "Important:",
  containerMustHave: "Container must have",
  and: "and",
  classes: "classes",
  differentColors: "Different colors",
  orangePurple: "Orange → Purple",
  cyanBlue: "Cyan → Blue",
  greenYellow: "Green → Yellow",
  pinkRed: "Pink → Red",
  differentSpeeds: "Different speeds",
  fast6s: "Fast (6s)",
  normal12s: "Normal (12s)",
  slow20s: "Slow (20s)",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  beamSizeInPixels: "Beam size in pixels",
  animationDurationInSeconds: "Animation duration in seconds",
  animationDelayInSeconds: "Animation delay in seconds",
  gradientStartColor: "Gradient start color",
  gradientEndColor: "Gradient end color",
  borderWidthInPixels: "Border width in pixels",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    anAnimatedBeamOf: "Анимированный луч света, бегущий по границе контейнера",
    intro:
      "Анимированный луч света, бегущий по границе контейнера. Серверный компонент без клиентского JavaScript: угол градиента зарегистрирован через @property, и его крутит CSS-анимация.",
    browserSupport: "Поддержка браузеров",
    browserSupportProperty:
      "Вращает угол градиента, а без него граница остаётся неподвижной.",
    browserSupportCorner:
      "Придаёт границе форму скруглённого квадрата, а без неё остаётся обычное скругление.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    animatedBorderEffect: "Эффект анимированной границы",
    aBeamOfLight:
      "Луч света плавно обходит карточку по периметру и создаёт эффектную анимацию",
    important: "Важно:",
    containerMustHave: "у контейнера должны быть классы",
    and: "и",
    classes: "",
    differentColors: "Разные цвета",
    orangePurple: "Оранжевый → фиолетовый",
    cyanBlue: "Голубой → синий",
    greenYellow: "Зелёный → жёлтый",
    pinkRed: "Розовый → красный",
    differentSpeeds: "Разная скорость",
    fast6s: "Быстро (6 с)",
    normal12s: "Средне (12 с)",
    slow20s: "Медленно (20 с)",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    beamSizeInPixels: "Размер луча в пикселях",
    animationDurationInSeconds: "Длительность анимации в секундах",
    animationDelayInSeconds: "Задержка анимации в секундах",
    gradientStartColor: "Начальный цвет градиента",
    gradientEndColor: "Конечный цвет градиента",
    borderWidthInPixels: "Толщина границы в пикселях",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Border Beam", description: t.anAnimatedBeamOf }
}

export default async function BorderBeamPage({ params }: Props) {
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
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Border Beam" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "registered-custom-properties",
              description: t.browserSupportProperty,
            },
            {
              featureId: "corner-shape",
              description: t.browserSupportCorner,
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
          <div className="flex items-center justify-center rounded-lg border p-10 bg-muted/30">
            <Card className="relative w-[21.875rem] overflow-hidden">
              <CardHeader>
                <CardTitle>Border Beam</CardTitle>
                <CardDescription>{t.animatedBorderEffect}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.aBeamOfLight}
                </p>
              </CardContent>
              <BorderBeam />
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/border-beam" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { BorderBeam } from "@/components/effects/border-beam"

export function MyCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border p-4">
      <p>Card content</p>
      <BorderBeam />
    </div>
  )
}`}</CodeBlock>
          <p className="text-sm text-muted-foreground">
            <strong>{t.important}</strong> {t.containerMustHave}{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              relative
            </code>{" "}
            {t.and}{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              overflow-hidden
            </code>{" "}
            {t.classes}
          </p>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.differentColors}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.orangePurple}</p>
                  <BorderBeam colorFrom="#ffaa40" colorTo="#9c40ff" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.cyanBlue}</p>
                  <BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.greenYellow}</p>
                  <BorderBeam colorFrom="#00ff88" colorTo="#ffff00" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.pinkRed}</p>
                  <BorderBeam colorFrom="#ff69b4" colorTo="#ff0000" />
                </div>
              </div>
              <CodeBlock>{`<BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.differentSpeeds}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.fast6s}</p>
                  <BorderBeam duration={6} />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.normal12s}</p>
                  <BorderBeam duration={12} />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">{t.slow20s}</p>
                  <BorderBeam duration={20} />
                </div>
              </div>
              <CodeBlock>{`<BorderBeam duration={6} />  {/* fast */}
<BorderBeam duration={20} /> {/* slow */}`}</CodeBlock>
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
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[31.25rem]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">200</td>
                  <td className="p-3">{t.beamSizeInPixels}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">duration</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">12</td>
                  <td className="p-3">{t.animationDurationInSeconds}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">{t.animationDelayInSeconds}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">colorFrom</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#ffaa40</td>
                  <td className="p-3">{t.gradientStartColor}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">colorTo</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#9c40ff</td>
                  <td className="p-3">{t.gradientEndColor}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">borderWidth</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1.5</td>
                  <td className="p-3">{t.borderWidthInPixels}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
