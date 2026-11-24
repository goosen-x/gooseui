import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  GlitchTextColorDemo,
  GlitchTextDemo,
  GlitchTextHeroDemo,
  GlitchTextIntensityDemo,
  GlitchTextMinimalDemo,
} from "./demo"

const en = {
  animatedGlitchTextEffect:
    "Animated glitch text effect with chromatic aberration",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  features: "Features",
  animatedGlitchTextEffect2:
    "Animated glitch text effect with chromatic aberration, scanlines, and distortion. A server component: CSS keyframes on clip-path and mix-blend-mode, no client JavaScript. Respects reduced motion preferences.",
  browserSupport: "Browser Support",
  supportDescription0: "Clips the glitch layers.",
  supportDescription1: "Blends the glitch colors.",
  browserSupportText:
    "Everything here is widely available CSS: keyframes, clip-path inset() and mix-blend-mode. The effect works with JavaScript turned off.",
  hoverToSeeThe: "Hover to see the effect in action.",
  intensityVariants: "Intensity Variants",
  controlTheIntensityOf:
    "Control the intensity of the glitch effect: low, medium, or high.",
  customColors: "Custom Colors",
  useTheColorProp: "Use the color prop for custom text colors.",
  minimalEffect: "Minimal Effect",
  disableScanlinesAndGlow: "Disable scanlines and glow for a cleaner look.",
  heroSection: "Hero Section",
  exampleUsageInA: "Example usage in a hero section.",
  textToDisplayWith: "Text to display with glitch effect",
  intensityOfTheGlitch: "Intensity of the glitch effect",
  showScanlineOverlayEffect: "Show scanline overlay effect",
  showGlowEffectBehind: "Show glow effect behind text",
  customTextColorCss: "Custom text color (CSS color value)",
  additionalCssClassesFor: "Additional CSS classes for styling",
  chromaticAberration: "Chromatic aberration",
  cyanAndMagentaColor:
    "— cyan and magenta color separation with mix-blend-mode",
  clipPathAnimation: "Clip-path animation",
  randomSliceEffectUsing: "— random slice effect using CSS clip-path inset",
  scanlinesOverlay: "Scanlines overlay",
  retroCrtMonitorEffect: "— retro CRT monitor effect",
  glowEffect: "Glow effect",
  blurBasedGlowBehind: "— blur-based glow behind text",
  reducedMotion: "Reduced motion",
  respectsPrefersReducedMotion: "— respects prefers-reduced-motion media query",
  pureCss: "Pure CSS",
  noJavascriptAnimationsUses: "— no JavaScript animations, uses CSS keyframes",
  customizable: "Customizable",
  intensityColorsAndEffects: "— intensity, colors, and effects can be toggled",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    animatedGlitchTextEffect:
      "Анимированный глитч-эффект для текста с хроматической аберрацией",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    features: "Возможности",
    animatedGlitchTextEffect2:
      "Анимированный глитч-эффект для текста: хроматическая аберрация, скан-линии и искажения. Серверный компонент: CSS-анимации на clip-path и mix-blend-mode, клиентского JavaScript нет. Учитывает настройку уменьшения анимации.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Обрезает слои эффекта.",
    supportDescription1: "Смешивает цвета эффекта.",
    browserSupportText:
      "Здесь только давно поддерживаемый CSS: keyframes, clip-path inset() и mix-blend-mode. Эффект работает и с отключённым JavaScript.",
    hoverToSeeThe: "Наведите курсор, чтобы увидеть эффект.",
    intensityVariants: "Интенсивность",
    controlTheIntensityOf: "Сила глитча: low, medium или high.",
    customColors: "Свои цвета",
    useTheColorProp: "Проп color задаёт цвет текста.",
    minimalEffect: "Минимальный эффект",
    disableScanlinesAndGlow:
      "Отключите скан-линии и свечение, чтобы эффект выглядел чище.",
    heroSection: "Hero-секция",
    exampleUsageInA: "Пример для hero-секции.",
    textToDisplayWith: "Текст с глитч-эффектом",
    intensityOfTheGlitch: "Интенсивность глитча",
    showScanlineOverlayEffect: "Показывать наложение скан-линий",
    showGlowEffectBehind: "Показывать свечение за текстом",
    customTextColorCss: "Свой цвет текста (любое значение CSS-цвета)",
    additionalCssClassesFor: "Дополнительные CSS-классы для стилизации",
    chromaticAberration: "Хроматическая аберрация",
    cyanAndMagentaColor:
      "— разделение на голубой и пурпурный через mix-blend-mode",
    clipPathAnimation: "Анимация clip-path",
    randomSliceEffectUsing: "— случайные срезы через CSS clip-path inset",
    scanlinesOverlay: "Скан-линии",
    retroCrtMonitorEffect: "— ретро-эффект ЭЛТ-монитора",
    glowEffect: "Свечение",
    blurBasedGlowBehind: "— размытое сияние за текстом",
    reducedMotion: "Уменьшенная анимация",
    respectsPrefersReducedMotion:
      "— учитывает медиазапрос prefers-reduced-motion",
    pureCss: "Чистый CSS",
    noJavascriptAnimationsUses: "— без JS-анимаций, только CSS keyframes",
    customizable: "Настраиваемость",
    intensityColorsAndEffects: "— интенсивность, цвета и отдельные эффекты",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Glitch Text", description: t.animatedGlitchTextEffect }
}

export default async function GlitchTextPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Glitch Text" />

        <p className="text-muted-foreground">{t.animatedGlitchTextEffect2}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "clip-path",
              description: t.supportDescription0,
            },
            {
              featureId: "mix-blend-mode",
              description: t.supportDescription1,
            },
          ]}
        />

        <DocsPreview description={t.hoverToSeeThe}>
          <GlitchTextDemo />
        </DocsPreview>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/glitch-text" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { GlitchText } from "@/components/effects/glitch-text"

export default function Page() {
  return (
    <div className="p-8">
      <GlitchText
        text="GLITCH"
        className="text-6xl text-foreground"
      />
    </div>
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.intensityVariants}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.controlTheIntensityOf}
              </p>
              <GlitchTextIntensityDemo />
              <CodeBlock className="mt-4">{`<GlitchText text="SUBTLE" intensity="low" />
<GlitchText text="DEFAULT" intensity="medium" />
<GlitchText text="INTENSE" intensity="high" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.customColors}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.useTheColorProp}
              </p>
              <GlitchTextColorDemo />
              <CodeBlock className="mt-4">{`<GlitchText text="NEON" color="#00b36b" />
<GlitchText text="CYBER" color="#e6006e" />
<GlitchText text="PUNK" color="#d99a00" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.minimalEffect}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.disableScanlinesAndGlow}
              </p>
              <GlitchTextMinimalDemo />
              <CodeBlock className="mt-4">{`<GlitchText
  text="CLEAN"
  showScanlines={false}
  showGlow={false}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.heroSection}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.exampleUsageInA}
              </p>
              <GlitchTextHeroDemo />
              <CodeBlock className="mt-4">{`<div className="py-16">
  <GlitchText
    text="GOOSEUI"
    intensity="medium"
    className="text-8xl text-foreground font-black"
  />
  <p className="text-muted-foreground tracking-[0.3em] uppercase">
    Component Library
  </p>
</div>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "text",
              type: "string",
              description: t.textToDisplayWith,
            },
            {
              name: "intensity",
              type: '"low" | "medium" | "high"',
              default: '"medium"',
              description: t.intensityOfTheGlitch,
            },
            {
              name: "showScanlines",
              type: "boolean",
              default: "true",
              description: t.showScanlineOverlayEffect,
            },
            {
              name: "showGlow",
              type: "boolean",
              default: "true",
              description: t.showGlowEffectBehind,
            },
            {
              name: "color",
              type: "string",
              description: t.customTextColorCss,
            },
            {
              name: "className",
              type: "string",
              description: t.additionalCssClassesFor,
            },
          ]}
        />

        <DocsSection id="features" title={t.features}>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                {t.chromaticAberration}
              </strong>{" "}
              {t.cyanAndMagentaColor}
            </li>
            <li>
              <strong className="text-foreground">{t.clipPathAnimation}</strong>{" "}
              {t.randomSliceEffectUsing}
            </li>
            <li>
              <strong className="text-foreground">{t.scanlinesOverlay}</strong>{" "}
              {t.retroCrtMonitorEffect}
            </li>
            <li>
              <strong className="text-foreground">{t.glowEffect}</strong>{" "}
              {t.blurBasedGlowBehind}
            </li>
            <li>
              <strong className="text-foreground">{t.reducedMotion}</strong>{" "}
              {t.respectsPrefersReducedMotion}
            </li>
            <li>
              <strong className="text-foreground">{t.pureCss}</strong>{" "}
              {t.noJavascriptAnimationsUses}
            </li>
            <li>
              <strong className="text-foreground">{t.customizable}</strong>{" "}
              {t.intensityColorsAndEffects}
            </li>
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
