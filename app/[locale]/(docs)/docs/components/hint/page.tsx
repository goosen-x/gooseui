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
import { HintCompare, HintDemo, HintSides, HintTruncated } from "./demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Hint",
  description:
    "A tiny text label beside an element, shown on hover and keyboard focus. Like the title attribute, but styled, positioned and animated. The browser does the work: no JavaScript opens it.",
  browserSupport: "Browser Support",
  interestDescription:
    "The interestfor attribute on a button or link opens the hint on hover, keyboard focus and long press, after a delay. Without it, plain CSS shows the hint on :hover and :focus-visible.",
  hintDescription:
    'popover="hint" puts the label in the top layer, above everything, and closes on Escape without touching other popovers.',
  anchorDescription:
    "Places the hint beside the element and flips it to the other side when it would leave the screen. Without it the hint is placed with plain absolute positioning.",
  preview: "Preview",
  previewText: "Hover an icon or Tab to it.",
  copy: "Copy",
  remove: "Delete",
  share: "Share",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "Wrap one element. Give an icon-only button its own aria-label: the hint describes the element, it does not name it.",
  examples: "Examples",
  sidesTitle: "Sides",
  sidesText:
    "side picks where the hint appears. It flips to the opposite side when there is no room.",
  top: "Above",
  bottom: "Below",
  left: "To the left",
  right: "To the right",
  truncatedTitle: "Truncated text",
  truncatedText:
    "A line cut with an ellipsis shows its full text in the hint. The trigger is a plain span, so the hint is driven by CSS hover here. Add tabIndex={0} if keyboard users need it too.",
  truncated:
    "Quarterly report: revenue, churn and the long tail of enterprise contracts.pdf",
  compareTitle: "Hint and title",
  compareText:
    "The title attribute is slow, cannot be styled, never shows on keyboard focus and does nothing on touch. Hint shows the same text consistently.",
  compareHint: "Hint",
  compareTitleButton: "title attribute",
  compareValue: "Copy the link",
  props: "Props",
  propContent: "Hint text. Plain text, nothing interactive.",
  propChildren:
    "One element that gets the hint. A button or link opens it natively, any other element uses CSS hover.",
  propSide: "Which side of the element the hint appears on.",
  propDelay:
    "Delay before the hint appears, in ms. A system tooltip waits about 500.",
  propClassName: "Extra classes for the hint bubble.",
  features: "Features",
  featureNative: "Native first",
  featureNativeText:
    'interestfor and popover="hint" in the browser that has them: top layer, delay, Escape and cleanup come from the platform.',
  featureFallback: "No double tooltip",
  featureFallbackText:
    "The title attribute is never added, so no browser shows two hints. Browsers without interestfor get the same bubble from CSS.",
  featureA11y: "Accessible",
  featureA11yText:
    'The element gets aria-describedby, the bubble has role="tooltip", Escape hides it in both modes and it never takes clicks.',
  featureTouch: "Touch",
  featureTouchText:
    "Browsers with interestfor open the hint on long press. In the CSS mode a tap shows nothing, because a sticky hover on touch is worse than no hint.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Hint",
    description:
      "Крошечная текстовая подсказка у элемента при наведении и фокусе с клавиатуры. Как атрибут title, только со стилем, позиционированием и анимацией. Работу делает браузер: JavaScript её не открывает.",
    browserSupport: "Поддержка браузеров",
    interestDescription:
      "Атрибут interestfor на кнопке или ссылке открывает подсказку при наведении, фокусе с клавиатуры и долгом нажатии, с задержкой. Без него подсказку показывает обычный CSS по :hover и :focus-visible.",
    hintDescription:
      'popover="hint" выносит подсказку в верхний слой поверх всего и закрывает по Escape, не трогая другие поповеры.',
    anchorDescription:
      "Ставит подсказку рядом с элементом и переносит на другую сторону, если она не помещается на экран. Без него подсказка размещается обычным absolute.",
    preview: "Превью",
    previewText: "Наведите курсор на иконку или дойдите до неё клавишей Tab.",
    copy: "Копировать",
    remove: "Удалить",
    share: "Поделиться",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Оберните один элемент. Кнопке с одной иконкой задайте свой aria-label: подсказка описывает элемент, но не заменяет его имя.",
    examples: "Примеры",
    sidesTitle: "Стороны",
    sidesText:
      "side задаёт, с какой стороны появится подсказка. Если места нет, она перейдёт на противоположную.",
    top: "Сверху",
    bottom: "Снизу",
    left: "Слева",
    right: "Справа",
    truncatedTitle: "Обрезанный текст",
    truncatedText:
      "Строка, обрезанная многоточием, показывает полный текст в подсказке. Здесь триггер — обычный span, поэтому подсказку показывает CSS по :hover. Добавьте tabIndex={0}, если она нужна и тем, кто ходит с клавиатуры.",
    truncated:
      "Квартальный отчёт: выручка, отток и длинный хвост корпоративных контрактов.pdf",
    compareTitle: "Hint и title",
    compareText:
      "Атрибут title появляется медленно, не стилизуется, не показывается при фокусе с клавиатуры и ничего не делает на тач-экране. Hint показывает тот же текст одинаково везде.",
    compareHint: "Hint",
    compareTitleButton: "атрибут title",
    compareValue: "Скопировать ссылку",
    props: "Пропсы",
    propContent: "Текст подсказки. Только текст, ничего интерактивного.",
    propChildren:
      "Один элемент, к которому относится подсказка. Кнопку или ссылку браузер открывает сам, остальные элементы работают через CSS-наведение.",
    propSide: "С какой стороны элемента появляется подсказка.",
    propDelay:
      "Задержка перед появлением в мс. Системная подсказка ждёт около 500.",
    propClassName: "Дополнительные классы для подсказки.",
    features: "Особенности",
    featureNative: "Сначала нативное",
    featureNativeText:
      'interestfor и popover="hint" там, где они есть: верхний слой, задержку, Escape и закрытие даёт платформа.',
    featureFallback: "Без двойной подсказки",
    featureFallbackText:
      "Атрибут title не добавляется, поэтому ни один браузер не покажет две подсказки. Где нет interestfor, тот же пузырь показывает CSS.",
    featureA11y: "Доступность",
    featureA11yText:
      'У элемента есть aria-describedby, у пузыря role="tooltip", Escape скрывает его в обоих режимах, а клики он не перехватывает.',
    featureTouch: "Тач",
    featureTouchText:
      "Браузеры с interestfor открывают подсказку долгим нажатием. В CSS-режиме касание ничего не показывает: залипший hover на тач-экране хуже, чем отсутствие подсказки.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

export default async function Page({ params }: Props) {
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
        <DocsPageNav title={t.title} />
        <p className="text-lg text-muted-foreground">{t.description}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "interest-invokers",
              description: t.interestDescription,
            },
            { featureId: "popover-hint", description: t.hintDescription },
            {
              featureId: "anchor-positioning",
              description: t.anchorDescription,
            },
          ]}
        />

        <DocsSection id="preview" title={t.preview}>
          <p className="mb-4 text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <HintDemo
              labels={{ copy: t.copy, remove: t.remove, share: t.share }}
            />
          </div>
        </DocsSection>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/hint" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <p className="mb-4 text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { Copy } from "lucide-react"
import { Hint } from "@/components/ui/hint"

<Hint content="Copy">
  <button type="button" aria-label="Copy">
    <Copy />
  </button>
</Hint>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-10">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sidesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sidesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <HintSides
                  labels={{
                    top: t.top,
                    bottom: t.bottom,
                    left: t.left,
                    right: t.right,
                  }}
                />
              </div>
              <CodeBlock className="mt-4">{`<Hint content="Below" side="bottom">
  <button type="button">bottom</button>
</Hint>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.truncatedTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.truncatedText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <HintTruncated text={t.truncated} />
              </div>
              <CodeBlock className="mt-4">{`<Hint content={fileName} side="bottom">
  <span className="block min-w-0 truncate">{fileName}</span>
</Hint>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.compareTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.compareText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <HintCompare
                  hintLabel={t.compareHint}
                  titleLabel={t.compareTitleButton}
                  text={t.compareValue}
                />
              </div>
              <CodeBlock className="mt-4">{`<Hint content="Copy the link">
  <button type="button">Hint</button>
</Hint>

<button type="button" title="Copy the link">title attribute</button>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "content",
              type: "string",
              default: "-",
              description: t.propContent,
            },
            {
              name: "children",
              type: "ReactElement",
              default: "-",
              description: t.propChildren,
            },
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: t.propSide,
            },
            {
              name: "delay",
              type: "number",
              default: "500",
              description: t.propDelay,
            },
            {
              name: "className",
              type: "string",
              default: "-",
              description: t.propClassName,
            },
          ]}
        />

        <DocsSection id="features" title={t.features}>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">{t.featureNative}</strong> —{" "}
              {t.featureNativeText}
            </li>
            <li>
              <strong className="text-foreground">{t.featureFallback}</strong> —{" "}
              {t.featureFallbackText}
            </li>
            <li>
              <strong className="text-foreground">{t.featureA11y}</strong> —{" "}
              {t.featureA11yText}
            </li>
            <li>
              <strong className="text-foreground">{t.featureTouch}</strong> —{" "}
              {t.featureTouchText}
            </li>
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
