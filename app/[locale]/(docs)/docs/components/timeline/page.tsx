import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  TimelineAlternateDemo,
  TimelineIconsDemo,
  TimelineRightDemo,
  TimelineStepperDemo,
  TimelineStepperHorizontalDemo,
} from "./timeline-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Vertical or horizontal timeline with step statuses",
  intro:
    'A compound timeline for order tracking, changelogs and roadmaps. Vertical or horizontal, content on either side or alternating, with completed, current and upcoming steps. It is an ordered list, and the current step carries aria-current="step". A server component with no JavaScript: markers pick their look from the item status in CSS, and the status names from labels reach screen readers as CSS generated content.',
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  alternateTitle: "Alternating sides",
  alternateText:
    'position="alternate" puts items on both sides of the line. Below 640 px it falls back to one column.',
  rightTitle: "Line on the right",
  rightText:
    'position="right" moves the line to the right edge and aligns the text to it.',
  horizontalTitle: "Horizontal",
  horizontalText:
    'orientation="horizontal" lays steps out in a row that scrolls when there is no room. Here position="left" means content below the line, and "right" means above.',
  iconsTitle: "Custom icons and dashed line",
  iconsText:
    'Put any icon inside TimelineMarker. The --timeline-marker variable sets the marker size, and variant="dashed" on the connector marks a plan rather than a fact.',
  activeTitle: "Current step from activeIndex",
  activeText:
    "Pass activeIndex and the statuses follow: earlier steps are completed, that one is current, the rest are upcoming. Changing it animates the line filling, the halo appearing and the check drawing, in both directions. Pass the previous value as fromIndex so a jump over several steps plays one step after another. A status set on an item still wins. Reduced motion turns the animation off.",
  props: "Props",
  timelineProps: "Timeline",
  itemProps: "TimelineItem",
  connectorProps: "TimelineConnector",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    component: "Component",
  },
  pOrientation: "Direction of the line",
  pPosition:
    "Side of the content. In horizontal mode left is below and right is above",
  pLabels: "Screen reader text for each status, read inside the marker",
  pActiveIndex:
    "Index of the current step. Sets the status of every item that has no status of its own",
  pFromIndex:
    "Previous activeIndex. Makes transitions over several steps play in sequence",
  pStatus: 'Step state. current also sets aria-current="step"',
  pVariant: "Line style",
  pClassName: "Additional CSS classes",
  components: "Components",
  cTimeline: "Root <ol>. Sets orientation and position",
  cItem: "A step, <li>",
  cMarker:
    "Circle on the line. Shows a check, a dot or your icon passed as children",
  cConnector: "Line to the next step. Hidden on the last one",
  cContent: "Wrapper for title, description and time",
  cTitle: "Step title",
  cDescription: "Secondary text",
  cTime: "<time> element, pass dateTime for machines",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Вертикальный или горизонтальный таймлайн со статусами шагов",
    intro:
      'Составной таймлайн для статуса заказа, истории изменений и планов. Бывает вертикальным и горизонтальным, текст можно поставить с любой стороны или чередовать, у шагов есть статусы completed, current и upcoming. Внутри упорядоченный список, а текущий шаг помечен aria-current="step". Это серверный компонент без JavaScript: маркер выбирает вид по статусу пункта через CSS, а названия статусов из labels доходят до скринридера как сгенерированный CSS-текст.',
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    alternateTitle: "Чередование сторон",
    alternateText:
      'position="alternate" раскладывает шаги по обе стороны линии. Уже 640 px всё собирается в одну колонку.',
    rightTitle: "Линия справа",
    rightText:
      'position="right" переносит линию к правому краю и выравнивает текст по ней.',
    horizontalTitle: "Горизонтальный",
    horizontalText:
      'orientation="horizontal" выстраивает шаги в ряд, который прокручивается, если не хватает места. Здесь position="left" ставит текст под линией, а "right" над ней.',
    iconsTitle: "Свои иконки и пунктир",
    iconsText:
      'В TimelineMarker можно положить любую иконку. Переменная --timeline-marker задаёт размер маркера, а variant="dashed" у соединителя показывает, что это план, а не факт.',
    activeTitle: "Текущий шаг через activeIndex",
    activeText:
      "Передайте activeIndex, и статусы вычислятся сами: шаги до него completed, он сам current, остальные upcoming. При смене линия заполняется, появляется ореол и рисуется галочка, и так же плавно в обратную сторону. Если передать прежнее значение как fromIndex, переход через несколько шагов идёт по очереди. Статус, заданный у самого пункта, главнее. При reduced motion анимации нет.",
    props: "Пропсы",
    timelineProps: "Timeline",
    itemProps: "TimelineItem",
    connectorProps: "TimelineConnector",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
      component: "Компонент",
    },
    pOrientation: "Направление линии",
    pPosition:
      "С какой стороны текст. В горизонтальном режиме left значит снизу, right сверху",
    pLabels: "Текст статусов для скринридера, звучит внутри маркера",
    pActiveIndex:
      "Индекс текущего шага. Задаёт статус всем пунктам без собственного status",
    pFromIndex:
      "Прежний activeIndex. Переходы через несколько шагов идут по очереди",
    pStatus: 'Состояние шага. current заодно ставит aria-current="step"',
    pVariant: "Стиль линии",
    pClassName: "Дополнительные CSS-классы",
    components: "Компоненты",
    cTimeline: "Корневой <ol>. Задаёт orientation и position",
    cItem: "Шаг, <li>",
    cMarker:
      "Кружок на линии. Показывает галочку, точку или вашу иконку из children",
    cConnector: "Линия к следующему шагу. У последнего скрыта",
    cContent: "Обёртка для заголовка, описания и времени",
    cTitle: "Заголовок шага",
    cDescription: "Второстепенный текст",
    cTime: "Элемент <time>, для машин передайте dateTime",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Timeline", description: t.description }
}

function PropsTable({
  rows,
  headers,
}: {
  rows: [string, string, string, string][]
  headers: typeof en.headers
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-medium">{headers.prop}</th>
            <th className="text-left p-3 font-medium">{headers.type}</th>
            <th className="text-left p-3 font-medium">{headers.default}</th>
            <th className="text-left p-3 font-medium">{headers.description}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, def, description]) => (
            <tr key={prop} className="border-t">
              <td className="p-3 font-mono text-xs">{prop}</td>
              <td className="p-3 font-mono text-xs">{type}</td>
              <td className="p-3 font-mono text-xs">{def}</td>
              <td className="p-3">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function TimelinePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "components", title: t.components, level: 2 },
  ]

  const parts: [string, string][] = [
    ["Timeline", t.cTimeline],
    ["TimelineItem", t.cItem],
    ["TimelineMarker", t.cMarker],
    ["TimelineConnector", t.cConnector],
    ["TimelineContent", t.cContent],
    ["TimelineTitle", t.cTitle],
    ["TimelineDescription", t.cDescription],
    ["TimelineTime", t.cTime],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Timeline" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <TimelineStepperDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/timeline" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

export function OrderStatus() {
  return (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineMarker />
        <TimelineConnector />
        <TimelineContent>
          <TimelineTime dateTime="2026-03-03T09:12">Mar 3, 09:12</TimelineTime>
          <TimelineTitle>Order placed</TimelineTitle>
          <TimelineDescription>Payment confirmed.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem status="current">
        <TimelineMarker />
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>On the way</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineMarker />
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>Delivered</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.activeTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.activeText}
              </p>
              <CodeBlock>{`const [state, setState] = useState({ active: 1, from: 1 })
const go = (index: number) =>
  setState((s) => ({ active: index, from: s.active }))

<Timeline activeIndex={state.active} fromIndex={state.from}>
  {steps.map((step, index) => (
    <TimelineItem key={step.id} onClick={() => go(index)}>
      <TimelineMarker />
      <TimelineConnector />
      <TimelineContent>
        <TimelineTitle>{step.title}</TimelineTitle>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.alternateTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.alternateText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TimelineAlternateDemo />
              </div>
              <CodeBlock className="mt-4">{`<Timeline position="alternate">
  {steps.map((step) => (
    <TimelineItem key={step.id} status={step.status}>
      <TimelineMarker />
      <TimelineConnector />
      <TimelineContent>
        <TimelineTitle>{step.title}</TimelineTitle>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.rightTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.rightText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TimelineRightDemo />
              </div>
              <CodeBlock className="mt-4">{`<Timeline position="right">…</Timeline>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.horizontalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.horizontalText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TimelineStepperHorizontalDemo />
              </div>
              <CodeBlock className="mt-4">{`<Timeline orientation="horizontal">
  <TimelineItem status="completed">
    <TimelineMarker />
    <TimelineConnector />
    <TimelineContent>
      <TimelineTitle>Idea</TimelineTitle>
      <TimelineTime>Jan</TimelineTime>
    </TimelineContent>
  </TimelineItem>
  {/* … */}
</Timeline>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.iconsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.iconsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TimelineIconsDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Rocket } from "lucide-react"

<Timeline
  orientation="horizontal"
  position="alternate"
  className="[--timeline-marker:2rem]"
>
  <TimelineItem status="upcoming">
    <TimelineMarker>
      <Rocket />
    </TimelineMarker>
    <TimelineConnector variant="dashed" />
    <TimelineContent>
      <TimelineTitle>Launch</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <h3 className="font-mono text-base font-medium">{t.timelineProps}</h3>
          <PropsTable
            headers={t.headers}
            rows={[
              [
                "orientation",
                '"vertical" | "horizontal"',
                '"vertical"',
                t.pOrientation,
              ],
              [
                "position",
                '"left" | "right" | "alternate"',
                '"left"',
                t.pPosition,
              ],
              [
                "labels",
                "Partial<Record<TimelineStatus, string>>",
                '{ completed: "Completed", … }',
                t.pLabels,
              ],
              ["activeIndex", "number", "-", t.pActiveIndex],
              ["fromIndex", "number", "-", t.pFromIndex],
              ["className", "string", "-", t.pClassName],
            ]}
          />
          <h3 className="font-mono text-base font-medium">{t.itemProps}</h3>
          <PropsTable
            headers={t.headers}
            rows={[
              [
                "status",
                '"completed" | "current" | "upcoming"',
                "-",
                t.pStatus,
              ],
              ["className", "string", "-", t.pClassName],
            ]}
          />
          <h3 className="font-mono text-base font-medium">
            {t.connectorProps}
          </h3>
          <PropsTable
            headers={t.headers}
            rows={[
              ["variant", '"solid" | "dashed"', '"solid"', t.pVariant],
              ["className", "string", "-", t.pClassName],
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2 id="components" className={h2}>
            {t.components}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.component}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {parts.map(([name, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
