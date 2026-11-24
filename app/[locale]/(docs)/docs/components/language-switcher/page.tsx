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
import { LanguageSwitcherDemo, LanguageSwitcherLinksDemo } from "./demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Language Switcher",
  description:
    "Language Switcher is a dropdown for choosing the site language. Items are plain links, so switching works without JavaScript; with JavaScript you can handle the choice yourself. Built on Dropdown Menu, keyboard accessible.",
  browser: "Browser support",
  popover: "Opens the menu in the browser top layer, even before JavaScript.",
  anchor:
    "Positions the menu by its trigger; JavaScript positions it when anchors are unavailable.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  usageNext: "With next-intl",
  usageNextText:
    "Pass a link to the same page for every locale, and change the language without a reload in onValueChange.",
  usageLinks: "Links without JavaScript",
  usageLinksText:
    "With href and no onValueChange the items are ordinary links. Try it in the preview below with JavaScript disabled: the menu still opens, and a click follows the link.",
  examples: "Examples",
  flags: "With flags",
  flagsText: "Any node in flag shows before the name, here emoji.",
  select: "Select variant",
  selectText:
    "Full width with the language name: fits a mobile menu or a form.",
  buttons: "Buttons instead of links",
  buttonsText: "Without href the items are buttons and call onValueChange.",
  props: "Props",
  languages: "Languages: code, label, optional href and flag.",
  value: "Code of the current language.",
  onValueChange:
    "Called on choice. For items with href it replaces the page load.",
  labels: "Texts: aria-label of the trigger (language).",
  size: "Trigger size.",
  variant: "button is compact, select is full width.",
  showCode: "Show the language code. Default: true for button.",
  showLabel: "Show the language name. Default: true for select.",
  align: "Alignment of the menu along the trigger.",
  className: "Additional CSS classes for the trigger.",
  label: "Language",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Переключатель языка",
    description:
      "Переключатель языка — выпадающий список для выбора языка сайта. Пункты — обычные ссылки, поэтому переключение работает без JavaScript; с JavaScript выбор можно обработать самому. Собран на Dropdown Menu, управляется с клавиатуры.",
    browser: "Поддержка браузеров",
    popover:
      "Открывает меню в верхнем слое браузера, в том числе до загрузки JavaScript.",
    anchor:
      "Размещает меню рядом с кнопкой; без поддержки якорей координаты вычисляет JavaScript.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    usageNext: "С next-intl",
    usageNextText:
      "Передайте ссылку на ту же страницу для каждого языка, а смену языка без перезагрузки выполните в onValueChange.",
    usageLinks: "Ссылки без JavaScript",
    usageLinksText:
      "С href и без onValueChange пункты — обычные ссылки. Проверьте на превью ниже с отключённым JavaScript: меню всё равно открывается, а клик ведёт по ссылке.",
    examples: "Примеры",
    flags: "С флагами",
    flagsText: "Любой узел в flag показывается перед названием, здесь эмодзи.",
    select: "Вариант select",
    selectText:
      "На всю ширину и с названием языка: подходит для мобильного меню или формы.",
    buttons: "Кнопки вместо ссылок",
    buttonsText: "Без href пункты — кнопки, они вызывают onValueChange.",
    props: "Пропсы",
    languages: "Языки: code, label, необязательные href и flag.",
    value: "Код текущего языка.",
    onValueChange:
      "Вызывается при выборе. Для пунктов с href заменяет загрузку страницы.",
    labels: "Тексты: aria-label кнопки (language).",
    size: "Размер кнопки.",
    variant: "button — компактный, select — на всю ширину.",
    showCode: "Показывать код языка. По умолчанию: true для button.",
    showLabel: "Показывать название языка. По умолчанию: true для select.",
    align: "Выравнивание меню относительно кнопки.",
    className: "Дополнительные CSS-классы кнопки.",
    label: "Язык",
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
    ["browser-support", t.browser],
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
  ].map(([id, title]) => ({ id, title, level: 2 }))
  const box = "flex justify-center rounded-lg bg-muted/30 px-4 py-12"

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <BrowserSupport
          title={t.browser}
          features={[
            { featureId: "popover", description: t.popover },
            { featureId: "anchor-positioning", description: t.anchor },
          ]}
        />
        <DocsSection id="preview" title={t.preview}>
          <div className={box}>
            <LanguageSwitcherDemo label={t.label} />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/language-switcher" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <h3 className="mb-2 text-lg font-medium">{t.usageNext}</h3>
          <p className="mb-3 text-muted-foreground">{t.usageNextText}</p>
          <CodeBlock>{`"use client"

import { useLocale } from "next-intl"
import { getPathname, usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

const NAMES = { en: "English", ru: "Русский" }

export function SiteLanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <LanguageSwitcher
      value={locale}
      languages={routing.locales.map((code) => ({
        code,
        label: NAMES[code],
        href: getPathname({ href: pathname, locale: code }),
      }))}
      onValueChange={(code) => router.replace(pathname, { locale: code })}
    />
  )
}`}</CodeBlock>
          <h3 className="mb-2 mt-6 text-lg font-medium">{t.usageLinks}</h3>
          <p className="mb-3 text-muted-foreground">{t.usageLinksText}</p>
          <div className={box}>
            <LanguageSwitcherLinksDemo label={t.label} />
          </div>
          <CodeBlock>{`import { LanguageSwitcher } from "@/components/ui/language-switcher"

<LanguageSwitcher
  value="en"
  showLabel
  languages={[
    { code: "en", label: "English", href: "/" },
    { code: "ru", label: "Русский", href: "/ru" },
  ]}
/>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <h3 className="mb-2 text-lg font-medium">{t.flags}</h3>
          <p className="mb-3 text-muted-foreground">{t.flagsText}</p>
          <div className={box}>
            <LanguageSwitcherDemo languages="flags" showLabel label={t.label} />
          </div>
          <CodeBlock>{`<LanguageSwitcher
  value="en"
  showLabel
  onValueChange={setLanguage}
  languages={[
    { code: "en", label: "English", flag: <span aria-hidden>🇬🇧</span> },
    { code: "ru", label: "Русский", flag: <span aria-hidden>🇷🇺</span> },
    { code: "de", label: "Deutsch", flag: <span aria-hidden>🇩🇪</span> },
    { code: "fr", label: "Français", flag: <span aria-hidden>🇫🇷</span> },
    { code: "es", label: "Español", flag: <span aria-hidden>🇪🇸</span> },
  ]}
/>`}</CodeBlock>
          <h3 className="mb-2 mt-6 text-lg font-medium">{t.select}</h3>
          <p className="mb-3 text-muted-foreground">{t.selectText}</p>
          <div className={box}>
            <LanguageSwitcherDemo
              variant="select"
              languages="flags"
              label={t.label}
            />
          </div>
          <CodeBlock>{`<LanguageSwitcher variant="select" value="en" languages={languages} />`}</CodeBlock>
          <h3 className="mb-2 mt-6 text-lg font-medium">{t.buttons}</h3>
          <p className="mb-3 text-muted-foreground">{t.buttonsText}</p>
          <CodeBlock>{`const [language, setLanguage] = useState("en")

<LanguageSwitcher
  value={language}
  onValueChange={setLanguage}
  languages={[
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
  ]}
/>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "languages",
              type: "{ code: string; label: string; href?: string; flag?: ReactNode }[]",
              default: "—",
              description: t.languages,
            },
            {
              name: "value",
              type: "string",
              default: "—",
              description: t.value,
            },
            {
              name: "onValueChange",
              type: "(code: string) => void",
              default: "—",
              description: t.onValueChange,
            },
            {
              name: "labels",
              type: "{ language?: string }",
              default: '{ language: "Language" }',
              description: t.labels,
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: t.size,
            },
            {
              name: "variant",
              type: '"button" | "select"',
              default: '"button"',
              description: t.variant,
            },
            {
              name: "showCode",
              type: "boolean",
              default: "true (button)",
              description: t.showCode,
            },
            {
              name: "showLabel",
              type: "boolean",
              default: "true (select)",
              description: t.showLabel,
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"end"',
              description: t.align,
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: t.className,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
