import { House } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/gooseui/ui/breadcrumb"
import { Hint } from "@/registry/gooseui/ui/hint"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Breadcrumb",
  description:
    "Breadcrumb trail with CSS-drawn separators, a pill variant, an animated underline and a scrollable list with faded edges.",
  intro:
    "Breadcrumb shows the current location within a hierarchy. It is a labelled navigation landmark with an ordered list. Separators are drawn by CSS between items, so BreadcrumbSeparator is optional. On a narrow screen the list scrolls horizontally instead of wrapping, and its edges fade out where there is more to scroll. No JavaScript, the component stays a server component.",
  browserSupport: "Browser Support",
  browserFeatureDescription:
    "Drives the edge fade from the list's own scroll position. Where it is not supported the list still scrolls, just without the fade.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  separatorsTitle: "Separators",
  separatorsText:
    "separator picks the glyph drawn between items: chevron (default), slash, dot or arrow. Set it on Breadcrumb or on BreadcrumbList, the list wins. The glyph takes the text colour and flips in right-to-left layouts.",
  pillTitle: "Pill variant",
  pillText:
    "Items become pills with a light fill on hover. The current page sits on a bg-muted pill in font-medium.",
  homeTitle: "Home icon",
  homeText:
    "A link is an inline flex box, so an icon and a label sit side by side. Give an icon-only link an aria-label.",
  ellipsisTitle: "Ellipsis",
  ellipsisText:
    "BreadcrumbEllipsis stands in for the collapsed middle of a long path.",
  longTitle: "Long path",
  longText:
    "The list never wraps: it scrolls sideways, and the edges fade out only on the side that has more content. The current page is cut with an ellipsis when it does not fit, and a Hint shows the full name on hover. Resize the container below or use a phone.",
  explicitTitle: "Explicit separators",
  explicitText:
    "Existing markup with BreadcrumbSeparator keeps working. An item that follows an explicit separator gets no drawn one, so nothing is doubled.",
  props: "Props",
  propSeparator:
    "Glyph drawn between items. Not needed when BreadcrumbSeparator is used. On Breadcrumb or BreadcrumbList; the list value wins.",
  propVariant:
    "Visual style. pill turns items into rounded pills. On Breadcrumb or BreadcrumbList; the list value wins.",
  propClassName: "Additional CSS classes.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Breadcrumb",
    description:
      "Хлебные крошки: разделители на CSS, вариант pill, выезжающее подчёркивание и прокручиваемый список с затухающими краями.",
    intro:
      "Breadcrumb показывает положение страницы в иерархии. Это навигационная область с подписью и упорядоченным списком. Разделители рисует CSS между пунктами, поэтому BreadcrumbSeparator не обязателен. На узком экране список не переносится, а прокручивается по горизонтали, и его края затухают там, где есть что прокрутить. Без JavaScript, компонент остаётся серверным.",
    browserSupport: "Поддержка браузеров",
    browserFeatureDescription:
      "Управляет затуханием краёв по положению прокрутки самого списка. Где не поддерживается, список всё равно прокручивается, просто без затухания.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    separatorsTitle: "Разделители",
    separatorsText:
      "separator выбирает значок между пунктами: chevron (по умолчанию), slash, dot или arrow. Задаётся у Breadcrumb или у BreadcrumbList, значение списка важнее. Значок берёт цвет текста и отражается в раскладке справа налево.",
    pillTitle: "Вариант pill",
    pillText:
      "Пункты становятся пилюлями с лёгкой подложкой при наведении. Текущая страница лежит на пилюле bg-muted и набрана font-medium.",
    homeTitle: "Иконка «домой»",
    homeText:
      "Ссылка — строчный flex-блок, поэтому иконка и подпись стоят рядом. Ссылке только с иконкой задайте aria-label.",
    ellipsisTitle: "Многоточие",
    ellipsisText:
      "BreadcrumbEllipsis заменяет свёрнутую середину длинного пути.",
    longTitle: "Длинный путь",
    longText:
      "Список не переносится: он прокручивается вбок, а края затухают только со стороны, где ещё есть содержимое. Текущая страница обрезается многоточием, если не влезает, а Hint показывает полное название при наведении. Потяните контейнер ниже или откройте страницу на телефоне.",
    explicitTitle: "Явные разделители",
    explicitText:
      "Прежняя разметка с BreadcrumbSeparator работает как раньше. У пункта после явного разделителя нарисованного нет, поэтому двойных не бывает.",
    props: "Пропсы",
    propSeparator:
      "Значок между пунктами. Не нужен, если используется BreadcrumbSeparator. У Breadcrumb или BreadcrumbList; значение списка важнее.",
    propVariant:
      "Визуальный вариант. pill делает пункты скруглёнными пилюлями. У Breadcrumb или BreadcrumbList; значение списка важнее.",
    propClassName: "Дополнительные CSS-классы.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const path = ["Home", "Docs", "Components"]

function Trail({
  separator,
  variant,
  className,
}: {
  separator?: "chevron" | "slash" | "dot" | "arrow"
  variant?: "default" | "pill"
  className?: string
}) {
  return (
    <Breadcrumb separator={separator} variant={variant} className={className}>
      <BreadcrumbList>
        {path.map((name) => (
          <BreadcrumbItem key={name}>
            <BreadcrumbLink href="#">{name}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const stage = "flex justify-center rounded-lg bg-muted/30 px-4 py-8"

export default async function BreadcrumbPageDoc({ params }: Props) {
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
        <DocsPageNav title={t.title} />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.browserFeatureDescription,
            },
          ]}
        />

        <DocsSection id="preview" title={t.preview}>
          <div className={`${stage} py-12`}>
            <Trail />
          </div>
        </DocsSection>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/breadcrumb" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.separatorsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.separatorsText}
              </p>
              <div className={`${stage} flex-col items-center gap-5`}>
                <Trail separator="chevron" />
                <Trail separator="slash" />
                <Trail separator="dot" />
                <Trail separator="arrow" />
              </div>
              <CodeBlock className="mt-4">{`<Breadcrumb separator="slash">…</Breadcrumb>

// or on the list itself
<BreadcrumbList separator="dot">…</BreadcrumbList>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.pillTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.pillText}</p>
              <div className={stage}>
                <Trail variant="pill" separator="slash" />
              </div>
              <CodeBlock className="mt-4">{`<Breadcrumb variant="pill" separator="slash">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.homeTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.homeText}</p>
              <div className={`${stage} flex-col items-center gap-5`}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">
                        <House className="size-4" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Breadcrumb variant="pill">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" aria-label="Home">
                        <House className="size-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <CodeBlock className="mt-4">{`import { House } from "lucide-react"

<BreadcrumbItem>
  <BreadcrumbLink href="/">
    <House className="size-4" />
    Home
  </BreadcrumbLink>
</BreadcrumbItem>

// icon only: add an accessible name
<BreadcrumbLink href="/" aria-label="Home">
  <House className="size-4" />
</BreadcrumbLink>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.ellipsisTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.ellipsisText}
              </p>
              <div className={stage}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <CodeBlock className="mt-4">{`<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.longTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.longText}</p>
              <div className={stage}>
                <div className="w-72 max-w-full resize-x overflow-hidden rounded-md border bg-background p-3">
                  <Breadcrumb>
                    <BreadcrumbList>
                      {[
                        "Home",
                        "Documentation",
                        "Components",
                        "Navigation",
                        "Breadcrumb",
                      ].map((name) => (
                        <BreadcrumbItem key={name}>
                          <BreadcrumbLink href="#">{name}</BreadcrumbLink>
                        </BreadcrumbItem>
                      ))}
                      <BreadcrumbItem>
                        <Hint
                          content="A page with a really long title that never fits"
                          side="bottom"
                        >
                          <BreadcrumbPage>
                            A page with a really long title that never fits
                          </BreadcrumbPage>
                        </Hint>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
              <CodeBlock className="mt-4">{`<div className="w-72">
  <Breadcrumb>
    <BreadcrumbList>
      {/* …many items… */}
      <BreadcrumbItem>
        {/* Hint shows the full name on hover */}
        <Hint
          content="A page with a really long title that never fits"
          side="bottom"
        >
          <BreadcrumbPage>
            A page with a really long title that never fits
          </BreadcrumbPage>
        </Hint>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.explicitTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.explicitText}
              </p>
              <div className={stage}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <CodeBlock className="mt-4">{`<BreadcrumbItem>…</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>…</BreadcrumbItem>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "separator",
              type: '"chevron" | "slash" | "dot" | "arrow"',
              default: '"chevron"',
              description: t.propSeparator,
            },
            {
              name: "variant",
              type: '"default" | "pill"',
              default: '"default"',
              description: t.propVariant,
            },
            {
              name: "className",
              type: "string",
              description: t.propClassName,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
