import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { RevealOnScrollDemo } from "./demo"

const en = {
  browserSupport: "Browser Support",
  browserFeature0Description: "Reveals elements as they enter the viewport.",
  elementsRevealWithAnimation:
    "Elements reveal with animation as they enter the viewport using CSS scroll-driven animations",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  cssFeature: "How it works",
  props: "Props",
  elementsRevealWithAnimation2:
    "Elements reveal with animation as they enter the viewport using CSS scroll-driven animations with view() timeline.",
  uses: "Uses",
  with: "with",
  toTriggerAnimationAs: "to trigger animation as element enters viewport.",
  scrollDownHint: "Scroll down ↓",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  animationDirection: "Animation direction",
  animationDelayInMs: "Animation delay in ms",
  animationDurationInMs: "Animation duration in ms",
  additionalCssClasses: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    browserFeature0Description: "Показывают элементы при появлении на экране.",
    elementsRevealWithAnimation:
      "Элементы появляются с анимацией при входе во вьюпорт на CSS scroll-driven анимациях",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    cssFeature: "Как это работает",
    props: "Пропсы",
    elementsRevealWithAnimation2:
      "Элементы появляются с анимацией при входе во вьюпорт. Работает на CSS scroll-driven анимациях с таймлайном view().",
    uses: "Использует",
    with: "вместе с",
    toTriggerAnimationAs:
      "для запуска анимации, когда элемент входит во вьюпорт.",
    scrollDownHint: "Прокрутите вниз ↓",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    animationDirection: "Направление анимации",
    animationDelayInMs: "Задержка анимации в мс",
    animationDurationInMs: "Длительность анимации в мс",
    additionalCssClasses: "Дополнительные CSS-классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Reveal on Scroll",
    description: t.elementsRevealWithAnimation,
  }
}

export default async function RevealOnScrollPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "css-feature", title: t.cssFeature, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Reveal on Scroll" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          {t.elementsRevealWithAnimation2}
        </p>

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
          <p className="text-sm text-muted-foreground">{t.scrollDownHint}</p>
          <div className="flex justify-center py-8 bg-muted/30 rounded-lg px-4">
            <RevealOnScrollDemo />
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
          <InstallCommand packageName="@gooseui/reveal-on-scroll" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { RevealOnScroll, RevealOnScrollStyles } from "@/components/effects/reveal-on-scroll"

// Add styles once in your layout
<RevealOnScrollStyles />

// Use component
<RevealOnScroll direction="up">
  <div>This reveals from below</div>
</RevealOnScroll>

<RevealOnScroll direction="left" delay={200}>
  <div>This reveals from right with delay</div>
</RevealOnScroll>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.cssFeature}
          </h2>
          <CodeBlock>{`.reveal-on-scroll {
  animation: reveal-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}</CodeBlock>
        </div>

        {/* 8. Props */}
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
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">direction</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;up&quot; | &quot;down&quot; | &quot;left&quot; |
                    &quot;right&quot; | &quot;fade&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;up&quot;</td>
                  <td className="p-3">{t.animationDirection}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">{t.animationDelayInMs}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">duration</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">600</td>
                  <td className="p-3">{t.animationDurationInMs}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalCssClasses}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
