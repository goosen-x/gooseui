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
import { hexToOklch, oklchToHex } from "@/registry/gooseui/ui/color-picker"
import {
  ColorPickerBrandDemo,
  ColorPickerGamutDemo,
  ColorPickerPopoverDemo,
} from "./color-picker-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "OKLCH color picker with a lightness × chroma area, hue and opacity sliders and gamut hints",
  intro:
    "Color Picker works in OKLCH, the space modern CSS themes are written in. The big area sets lightness and chroma at the current hue, the sliders set hue and opacity, and the text field accepts oklch() or hex. A dashed line in the area marks where sRGB ends; on wide-gamut screens a second line shows the edge of Display P3. The color math is about a hundred lines of plain TypeScript, with no color library.",
  browserSupport: "Browser Support",
  oklab: "The picker reads and writes oklch() colors.",
  gradient:
    "Draws the area and sliders with gradients in oklch. Without it, gradients interpolate in sRGB and look slightly duller in the middle.",
  colorMix: "Draws the soft glow around the preview circle.",
  relative:
    "Builds the glow from the current color. Without it, color-mix is used.",
  contrast:
    "Picks black or white for the thumb border and the Aa sample. Without it, the component computes WCAG luminance in JavaScript.",
  gamut: "Shows the P3 line and badge only on screens that can display P3.",
  preview: "Preview",
  previewHint:
    "Drag across the area, use the arrow keys on a focused slider (Shift for bigger steps), or type a value like #0ea5e9.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  popoverTitle: "Swatch button with a popover",
  popoverText:
    'A round swatch opens the picker in a native popover: light dismiss and Escape come from the browser. With anchor positioning it opens under the button, otherwise in the center of the screen. format="hex" returns #rrggbb.',
  gamutTitle: "Wide-gamut colors",
  gamutText:
    "This color starts outside sRGB. On a P3 screen the picker shows a P3 badge, elsewhere a warning. Fit to sRGB keeps lightness and hue and lowers chroma until the color fits.",
  formTitle: "In a form",
  formText:
    "name adds a hidden input, so the value is posted with the form like any other field.",
  helpersTitle: "Conversion helpers",
  helpersText:
    'The color math lives in a file without "use client", so the helpers work in Server Components too. This table is rendered on the server:',
  props: "Props",
  propValue: "Controlled value: any oklch() or hex string.",
  propDefaultValue: "Initial value for the uncontrolled mode.",
  propOnValueChange: "Receives the color in the chosen format on every change.",
  propFormat: "Output format. Hex values are mapped into sRGB first.",
  propSwatches: "Preset colors (oklch or hex) under the picker.",
  propShowAlpha: "Show the opacity slider.",
  propName: "Adds a hidden input with this name for form posts.",
  propDisabled: "Turns off all controls.",
  propLabels: "Texts for labels, hints and screen readers.",
  propClassName: "Classes for the wrapper (the default width is w-64).",
  helpers: "Helpers",
  helperHeader: "Function",
  descriptionHeader: "Description",
  helperList: [
    [
      "parseColor(text)",
      "oklch() or #rgb / #rgba / #rrggbb / #rrggbbaa to { l, c, h, alpha }, or null",
    ],
    ["formatOklch(color)", "{ l, c, h, alpha } to oklch(0.7 0.15 250 / 50%)"],
    ["formatHex(color)", "{ l, c, h, alpha } to #rrggbb, mapped into sRGB"],
    [
      "oklchToHex(text) / hexToOklch(text)",
      "string to string, null when the input cannot be parsed",
    ],
    ["isInSrgb(color) / isInP3(color)", "whether the color fits the gamut"],
    ["maxChroma(l, h, gamut)", "largest chroma that still fits sRGB or P3"],
    ["toSrgbGamut(color)", "lowers chroma until the color fits sRGB"],
    [
      "readableTextColor(color)",
      "#000 or #fff, whichever reads better on the color",
    ],
  ],
  features: "Features",
  featureList: [
    [
      "Keyboard",
      "arrows move by small steps, Shift and PageUp/PageDown by big ones; Home and End jump to grey and to the most saturated color that fits sRGB",
    ],
    [
      "Screen readers",
      "the area and sliders are role=slider with readable values, and gamut warnings are announced",
    ],
    [
      "Greys keep their hue",
      "dragging to zero chroma and back does not reset the hue",
    ],
    [
      "Typing",
      "the field applies a value as soon as it parses and marks invalid input; Escape restores the current value",
    ],
    [
      "Theme",
      "the frame uses theme tokens, the color area is the same in light and dark",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Выбор цвета в OKLCH: поле светлоты и насыщенности, ползунки тона и прозрачности, подсказки об охвате",
    intro:
      "Color Picker работает в OKLCH — пространстве, в котором сейчас пишут темы на CSS. Большое поле задаёт светлоту и насыщенность при текущем тоне, ползунки отвечают за тон и прозрачность, а в текстовое поле можно вписать oklch() или hex. Пунктир в поле показывает, где кончается sRGB; на экранах с широким охватом вторая линия отмечает границу Display P3. Вся математика цвета — около сотни строк обычного TypeScript, без библиотек.",
    browserSupport: "Поддержка браузеров",
    oklab: "Пикер читает и выдаёт цвета в oklch().",
    gradient:
      "Рисует поле и ползунки градиентами в oklch. Без поддержки градиенты считаются в sRGB и в середине выглядят чуть тусклее.",
    colorMix: "Рисует мягкое свечение вокруг кружка с образцом.",
    relative:
      "Строит свечение из текущего цвета. Без поддержки используется color-mix.",
    contrast:
      "Выбирает чёрный или белый для обводки ползунка и надписи Aa. Без поддержки компонент считает яркость по WCAG в JavaScript.",
    gamut:
      "Показывает линию P3 и значок только на экранах, которые умеют показывать P3.",
    preview: "Превью",
    previewHint:
      "Ведите по полю, стрелками двигайте ползунок в фокусе (с Shift шаг крупнее) или впишите значение вроде #0ea5e9.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    popoverTitle: "Кнопка-образец с popover",
    popoverText:
      'Круглый образец открывает пикер в нативном popover: закрытие кликом снаружи и по Escape даёт сам браузер. С anchor positioning окно открывается под кнопкой, без него — по центру экрана. format="hex" возвращает #rrggbb.',
    gamutTitle: "Цвета с широким охватом",
    gamutText:
      "Этот цвет с самого начала лежит вне sRGB. На экране с P3 пикер показывает значок P3, на остальных — предупреждение. «Вписать в sRGB» сохраняет светлоту и тон и снижает насыщенность, пока цвет не поместится.",
    formTitle: "В форме",
    formText:
      "name добавляет скрытое поле, и значение уходит вместе с формой, как любое другое.",
    helpersTitle: "Функции преобразования",
    helpersText:
      'Математика цвета лежит в файле без "use client", поэтому функции работают и в серверных компонентах. Эта таблица собрана на сервере:',
    props: "Пропсы",
    propValue: "Контролируемое значение: любая строка oklch() или hex.",
    propDefaultValue: "Начальное значение для неконтролируемого режима.",
    propOnValueChange:
      "Получает цвет в выбранном формате при каждом изменении.",
    propFormat: "Формат результата. Hex сначала вписывается в sRGB.",
    propSwatches: "Готовые цвета (oklch или hex) под пикером.",
    propShowAlpha: "Показать ползунок прозрачности.",
    propName: "Добавляет скрытое поле с этим name для отправки формы.",
    propDisabled: "Отключает все элементы управления.",
    propLabels: "Тексты подписей, подсказок и для скринридеров.",
    propClassName: "Классы обёртки (ширина по умолчанию w-64).",
    helpers: "Функции",
    helperHeader: "Функция",
    descriptionHeader: "Описание",
    helperList: [
      [
        "parseColor(text)",
        "oklch() или #rgb / #rgba / #rrggbb / #rrggbbaa в { l, c, h, alpha } либо null",
      ],
      ["formatOklch(color)", "{ l, c, h, alpha } в oklch(0.7 0.15 250 / 50%)"],
      [
        "formatHex(color)",
        "{ l, c, h, alpha } в #rrggbb, предварительно вписав в sRGB",
      ],
      [
        "oklchToHex(text) / hexToOklch(text)",
        "строка в строку, null, если разобрать не удалось",
      ],
      ["isInSrgb(color) / isInP3(color)", "помещается ли цвет в охват"],
      [
        "maxChroma(l, h, gamut)",
        "наибольшая насыщенность, которая ещё помещается в sRGB или P3",
      ],
      [
        "toSrgbGamut(color)",
        "снижает насыщенность, пока цвет не поместится в sRGB",
      ],
      [
        "readableTextColor(color)",
        "#000 или #fff — что лучше читается на этом цвете",
      ],
    ],
    features: "Возможности",
    featureList: [
      [
        "Клавиатура",
        "стрелки двигают мелким шагом, Shift и PageUp/PageDown — крупным; Home и End переносят к серому и к самому насыщенному цвету в пределах sRGB",
      ],
      [
        "Скринридеры",
        "поле и ползунки — role=slider с понятными значениями, предупреждения об охвате озвучиваются",
      ],
      [
        "Серый помнит тон",
        "если увести насыщенность в ноль и вернуть, тон не сбрасывается",
      ],
      [
        "Ввод с клавиатуры",
        "поле применяет значение, как только его удаётся разобрать, и подсвечивает ошибку; Escape возвращает текущее значение",
      ],
      [
        "Тема",
        "рамка берёт цвета из токенов темы, само поле одинаково в светлой и тёмной теме",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Color Picker", description: t.description }
}

const conversions = [
  "oklch(0.62 0.19 255)",
  "oklch(0.72 0.27 145)",
  "#f97316",
  "#7c3aed80",
]

export default async function ColorPickerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    ["browser-support", t.browserSupport],
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
    ["helpers", t.helpers],
    ["features", t.features],
  ].map(([id, title]) => ({ id, title, level: 2 }))

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Color Picker" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "oklab", description: t.oklab },
            { featureId: "gradient-interpolation", description: t.gradient },
            { featureId: "color-mix", description: t.colorMix },
            { featureId: "relative-color", description: t.relative },
            { featureId: "contrast-color", description: t.contrast },
            { featureId: "color-gamut", description: t.gamut },
          ]}
        />

        <DocsSection id="preview" title={t.preview}>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <ColorPickerBrandDemo />
          </div>
        </DocsSection>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/color-picker" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`"use client"

import { useState } from "react"
import { ColorPicker } from "@/components/ui/color-picker"

export function BrandColor() {
  const [brand, setBrand] = useState("oklch(0.62 0.19 255)")
  return (
    <ColorPicker
      value={brand}
      onValueChange={setBrand}
      swatches={["oklch(0.62 0.19 255)", "oklch(0.65 0.24 340)", "#22c55e"]}
      showAlpha
    />
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.popoverTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.popoverText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ColorPickerPopoverDemo />
              </div>
              <CodeBlock className="mt-4">{`const [color, setColor] = useState("#7c3aed")

<button
  type="button"
  popoverTarget="label-color"
  aria-label={\`Label color: \${color}\`}
  className="size-8 rounded-full border-2 border-background shadow-[0_0_0_1px_var(--border)]"
  style={{ background: color, anchorName: "--label-color" }}
/>
<div
  id="label-color"
  popover="auto"
  aria-label="Pick a label color"
  className="rounded-lg border bg-popover p-3 shadow-lg supports-[position-area:bottom]:m-0 supports-[position-area:bottom]:mt-2 supports-[position-area:bottom]:[inset:auto] supports-[position-area:bottom]:[position-area:bottom_span-right] supports-[position-area:bottom]:[position-try-fallbacks:flip-block,flip-inline]"
  style={{ positionAnchor: "--label-color" }}
>
  <ColorPicker value={color} onValueChange={setColor} format="hex" swatches={swatches} />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.gamutTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.gamutText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <ColorPickerGamutDemo />
              </div>
              <CodeBlock className="mt-4">{`<ColorPicker defaultValue="oklch(0.72 0.27 145)" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <CodeBlock>{`<form action={saveTheme}>
  <ColorPicker name="accent" defaultValue="#0ea5e9" format="hex" />
  <button type="submit">Save</button>
</form>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.helpersTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.helpersText}
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full font-mono text-xs">
                  <tbody>
                    {conversions.map((value) => {
                      const converted = value.startsWith("#")
                        ? hexToOklch(value)
                        : oklchToHex(value)
                      return (
                        <tr key={value} className="border-t first:border-t-0">
                          <td className="p-3">
                            <span
                              aria-hidden
                              className="mr-2 inline-block size-3 rounded-sm align-middle shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
                              style={{ background: value }}
                            />
                            {value}
                          </td>
                          <td className="p-3 text-muted-foreground">→</td>
                          <td className="p-3">{converted}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <CodeBlock className="mt-4">{`import { hexToOklch, oklchToHex } from "@/components/ui/color-picker"

oklchToHex("oklch(0.62 0.19 255)") // "${oklchToHex("oklch(0.62 0.19 255)")}"
hexToOklch("#f97316")              // "${hexToOklch("#f97316")}"`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "value",
              type: "string",
              default: "-",
              description: t.propValue,
            },
            {
              name: "defaultValue",
              type: "string",
              default: '"oklch(0.62 0.19 255)"',
              description: t.propDefaultValue,
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "-",
              description: t.propOnValueChange,
            },
            {
              name: "format",
              type: '"oklch" | "hex"',
              default: '"oklch"',
              description: t.propFormat,
            },
            {
              name: "swatches",
              type: "string[]",
              default: "-",
              description: t.propSwatches,
            },
            {
              name: "showAlpha",
              type: "boolean",
              default: "false",
              description: t.propShowAlpha,
            },
            {
              name: "name",
              type: "string",
              default: "-",
              description: t.propName,
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: t.propDisabled,
            },
            {
              name: "labels",
              type: "Partial<ColorPickerLabels>",
              default: "English",
              description: t.propLabels,
            },
            {
              name: "className",
              type: "string",
              default: "-",
              description: t.propClassName,
            },
          ]}
        />

        <DocsSection id="helpers" title={t.helpers}>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.helperHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.descriptionHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.helperList.map(([name, text]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocsSection>

        <DocsSection id="features" title={t.features}>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong> — {text}
              </li>
            ))}
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
