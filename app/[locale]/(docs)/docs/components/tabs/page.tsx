import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import {
  TabsAccountDemo,
  TabsIconsDemo,
  TabsUnderlineDemo,
  TabsVerticalDemo,
} from "./tabs-demo"

type Props = { params: Promise<{ locale: string }> }
export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const ru = locale === "ru"
  const sections = [
    ["browser-support", ru ? "Поддержка браузеров" : "Browser support"],
    ["preview", ru ? "Превью" : "Preview"],
    ["installation", ru ? "Установка" : "Installation"],
    ["usage", ru ? "Использование" : "Usage"],
    ["examples", ru ? "Примеры" : "Examples"],
    ["props", ru ? "Пропсы" : "Props"],
  ]
  return (
    <DocsPage toc={sections.map(([id, title]) => ({ id, title, level: 2 }))}>
      <div className="space-y-8">
        <DocsPageNav title="Tabs" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Tabs организуют связанное содержимое в переключаемые панели. Нативные радиокнопки отвечают за выбор и управление с клавиатуры. Подложка активной вкладки плавно переезжает к новой и подстраивается под её ширину, а новая панель мягко проявляется. Есть вертикальный вариант и вариант с подчёркиванием."
            : "Tabs organize related content into selectable panels. Native radio inputs handle selection and keyboard navigation. The active tab's pill glides to the new tab and takes its width, and the new panel fades in. There is a vertical layout and an underline variant."}
        </p>
        <BrowserSupport
          title={ru ? "Поддержка браузеров" : "Browser support"}
          features={[
            {
              featureId: "anchor-positioning",
              description: ru
                ? "Подложка и подчёркивание привязаны к активной вкладке и переезжают к новой. Без поддержки вкладка заливается сама, а переключение мгновенное."
                : "The pill and the underline are anchored to the active tab and glide to the next one. Without support the active tab paints itself and the switch is instant.",
            },
            {
              featureId: "starting-style",
              description: ru
                ? "Новая панель проявляется из прозрачности со сдвигом на 6 пикселей."
                : "A new panel fades in from transparent with a 6 pixel shift.",
            },
            {
              featureId: "has",
              description: ru
                ? "Селектор используется для оформления состояний радиоэлементов."
                : "The selector styles radio input states.",
            },
          ]}
        />
        <DocsSection id="preview" title={sections[1][1]}>
          <TabsAccountDemo />
        </DocsSection>
        <DocsSection id="installation" title={sections[2][1]}>
          <InstallCommand packageName="@gooseui/tabs" />
        </DocsSection>
        <DocsSection id="usage" title={sections[3][1]}>
          <CodeBlock>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="profile">
  <TabsList aria-label="Account settings">
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">…</TabsContent>
  <TabsContent value="password">…</TabsContent>
</Tabs>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[4][1]}>
          <h3 className="mb-3 text-lg font-semibold">
            {ru ? "Настройки аккаунта" : "Account settings"}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {ru
              ? "Демо из превью: поля, переключатели и кнопки лежат внутри панелей. Панелям задана одинаковая min-height, поэтому блок не меняет высоту при переключении: новая панель сменяет старую, а размер контейнера не прыгает."
              : "The preview demo: fields, switches and buttons live inside the panels. The panels share one min-height, so the block keeps its size on switch: the new panel replaces the old one and the container does not jump."}
          </p>
          <CodeBlock>{`<Tabs defaultValue="profile" className="w-full max-w-sm">
  <TabsList aria-label="Account settings" className="w-full">
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile" className="min-h-80 rounded-lg border p-5">
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Anna Petrova" />
      </div>
      <Button type="submit">Save profile</Button>
    </form>
  </TabsContent>
  <TabsContent value="notifications" className="min-h-80 rounded-lg border p-5">
    <Label htmlFor="digest">Weekly digest</Label>
    <Switch id="digest" defaultChecked />
  </TabsContent>
</Tabs>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Вкладки с иконками" : "Tabs with icons"}
          </h3>
          <TabsIconsDemo />
          <CodeBlock>{`<TabsList aria-label="Views">
  <TabsTrigger value="overview" className="px-3">
    <LayoutDashboard aria-hidden="true" />
    Overview
  </TabsTrigger>
  <TabsTrigger value="analytics" className="px-3">
    <BarChart3 aria-hidden="true" />
    Analytics
  </TabsTrigger>
</TabsList>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Вертикальные вкладки" : "Vertical tabs"}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {ru
              ? 'orientation="vertical" ставит список слева от панели, подложка переезжает по вертикали.'
              : 'orientation="vertical" puts the list beside the panel, and the pill glides vertically.'}
          </p>
          <TabsVerticalDemo />
          <CodeBlock>{`<Tabs defaultValue="general" orientation="vertical">
  <TabsList aria-label="Settings sections">
    <TabsTrigger value="general" className="px-4">General</TabsTrigger>
    <TabsTrigger value="security" className="px-4">Security</TabsTrigger>
    <TabsTrigger value="billing" className="px-4">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">…</TabsContent>
  <TabsContent value="security">…</TabsContent>
  <TabsContent value="billing">…</TabsContent>
</Tabs>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Подчёркивание" : "Underline"}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {ru
              ? 'variant="underline" убирает подложку: под активной вкладкой едет линия по общей черте списка.'
              : 'variant="underline" drops the pill: a line under the active tab travels along the list rule.'}
          </p>
          <TabsUnderlineDemo />
          <CodeBlock>{`<Tabs defaultValue="overview">
  <TabsList variant="underline" aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="files">Files</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "Tabs value / defaultValue",
              type: "string",
              description: ru
                ? "Выбранная вкладка. value делает компонент управляемым, defaultValue задаёт начальную."
                : "The selected tab. value makes it controlled, defaultValue sets the initial one.",
            },
            {
              name: "Tabs onValueChange",
              type: "(value: string) => void",
              description: ru
                ? "Вызывается при выборе другой вкладки."
                : "Called when another tab is picked.",
            },
            {
              name: "Tabs orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: ru
                ? "Вертикальный вариант ставит список слева от панели."
                : "The vertical layout puts the list beside the panel.",
            },
            {
              name: "TabsList variant",
              type: '"default" | "underline"',
              default: '"default"',
              description: ru
                ? "default: подложка-пилюля на сером треке. underline: линия под активной вкладкой по общей черте."
                : "default: a pill on a muted track. underline: a line under the active tab along a shared rule.",
            },
            {
              name: "TabsList indicatorClassName",
              type: "string",
              description: ru
                ? "Классы для движущегося индикатора: цвет, рамка, тень или скругление."
                : "Classes for the moving indicator: colour, border, shadow or radius.",
            },
            {
              name: "TabsTrigger value",
              type: "string",
              description: ru
                ? "Значение вкладки. Остальные пропсы уходят на радиокнопку, например disabled."
                : "The tab's value. Other props go to the radio input, such as disabled.",
            },
            {
              name: "TabsContent value",
              type: "string",
              description: ru
                ? "Панель показывается, пока выбрана вкладка с таким же value. Задайте общую min-height, если панели разной высоты, чтобы блок не прыгал."
                : "The panel shows while the tab with the same value is selected. Give panels a shared min-height when they differ in size so the block does not jump.",
            },
            {
              name: "className",
              type: "string",
              description: ru
                ? "Дополнительные CSS-классы на каждом из четырёх элементов."
                : "Additional CSS classes on each of the four parts.",
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
