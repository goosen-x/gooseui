import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { GanttChart, type GanttItem } from "@/registry/gooseui/ui/gantt-chart"

const en = {
  timeLocale: "en-GB",
  name: "Job",
  planned: "Planned",
  actual: "Actual",
  now: "Now",
  shaded: "Night",
  status: {
    planned: "Planned",
    running: "Running",
    done: "Done",
    delayed: "Late",
    failed: "Failed",
  },
  groups: { night: "Night jobs", day: "Daytime", evening: "Evening" },
  jobs: {
    backup: "Database backup",
    reindex: "Search reindex",
    reports: "Daily reports",
    sync: "Catalog sync",
    digest: "Email digest",
    cleanup: "Cache cleanup",
    export: "Data export",
  },
  shift: "Station",
  stations: { a: "Assembly", b: "Painting", c: "Packing", d: "Quality check" },
  lunch: "Break",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    timeLocale: "ru-RU",
    name: "Задача",
    planned: "План",
    actual: "Факт",
    now: "Сейчас",
    shaded: "Ночь",
    status: {
      planned: "По плану",
      running: "Идёт",
      done: "Готово",
      delayed: "Опоздало",
      failed: "Упало",
    },
    groups: { night: "Ночные задачи", day: "Днём", evening: "Вечером" },
    jobs: {
      backup: "Резервная копия базы",
      reindex: "Переиндексация поиска",
      reports: "Дневные отчёты",
      sync: "Синхронизация каталога",
      digest: "Рассылка дайджеста",
      cleanup: "Очистка кеша",
      export: "Выгрузка данных",
    },
    shift: "Участок",
    stations: {
      a: "Сборка",
      b: "Покраска",
      c: "Упаковка",
      d: "Контроль качества",
    },
    lunch: "Перерыв",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const h = (hours: number, minutes = 0) => hours * 60 + minutes

export function GanttPreviewDemo() {
  const t = useT()
  const items: GanttItem[] = [
    {
      id: "backup",
      label: t.jobs.backup,
      group: "night",
      planned: [h(2), h(3)],
      actual: [h(2, 5), h(3, 20)],
      status: "done",
    },
    {
      id: "reindex",
      label: t.jobs.reindex,
      group: "night",
      planned: [h(4), h(5, 30)],
      actual: [h(4), h(4, 50)],
      status: "done",
    },
    {
      id: "reports",
      label: t.jobs.reports,
      group: "day",
      planned: [h(8), h(9)],
      actual: [h(8, 40), h(10, 10)],
      status: "delayed",
    },
    {
      id: "sync",
      label: t.jobs.sync,
      group: "day",
      planned: [h(12), h(13)],
      actual: [h(12), h(12, 20)],
      status: "failed",
    },
    {
      id: "digest",
      label: t.jobs.digest,
      group: "evening",
      planned: [h(18), h(18, 30)],
      status: "planned",
    },
    {
      id: "cleanup",
      label: t.jobs.cleanup,
      group: "evening",
      planned: [h(21), h(21, 45)],
      status: "planned",
    },
    {
      id: "export",
      label: t.jobs.export,
      planned: [h(10), h(16)],
      actual: [h(10), h(14)],
      status: "running",
    },
  ]
  return (
    <div className="w-full px-4">
      <GanttChart
        items={items}
        groups={[
          { id: "night", label: t.groups.night },
          { id: "day", label: t.groups.day },
          { id: "evening", label: t.groups.evening },
        ]}
        shaded={[
          [0, h(7)],
          [h(23), h(24)],
        ]}
        labels={{
          name: t.name,
          planned: t.planned,
          actual: t.actual,
          now: t.now,
          shaded: t.shaded,
          status: t.status,
        }}
        labelWidth={230}
      />
    </div>
  )
}

const SHIFT_START = new Date("2026-11-23T08:00:00Z")
const SHIFT_END = new Date("2026-11-23T20:00:00Z")
const at = (hh: number, mm = 0) => new Date(Date.UTC(2026, 10, 23, hh, mm))

export function GanttDatesDemo() {
  const t = useT()
  return (
    <div className="w-full px-4">
      <GanttChart
        start={SHIFT_START}
        end={SHIFT_END}
        timeZone="UTC"
        locale={t.timeLocale}
        tickStep={120}
        now={at(13, 15)}
        shaded={[[at(12), at(13)]]}
        minTimelineWidth={480}
        labelWidth={170}
        items={[
          {
            id: "a",
            label: t.stations.a,
            planned: [at(8), at(12)],
            actual: [at(8, 10), at(11, 50)],
          },
          {
            id: "b",
            label: t.stations.b,
            planned: [at(10), at(15)],
            actual: [at(10, 30), at(13, 15)],
          },
          { id: "c", label: t.stations.c, planned: [at(14), at(19)] },
          { id: "d", label: t.stations.d, planned: [at(16), at(20)] },
        ]}
        labels={{
          name: t.shift,
          planned: t.planned,
          actual: t.actual,
          now: t.now,
          shaded: t.lunch,
        }}
      />
    </div>
  )
}

export function GanttCollapsedDemo() {
  const t = useT()
  return (
    <div className="w-full px-4">
      <GanttChart
        now={null}
        tickStep={180}
        defaultCollapsed={["night"]}
        showLegend={false}
        rowHeight={30}
        groups={[
          { id: "night", label: t.groups.night },
          { id: "day", label: t.groups.day },
        ]}
        items={[
          {
            id: "backup",
            label: t.jobs.backup,
            group: "night",
            actual: [h(2), h(3, 15)],
          },
          {
            id: "reindex",
            label: t.jobs.reindex,
            group: "night",
            actual: [h(4), h(5)],
          },
          {
            id: "reports",
            label: t.jobs.reports,
            group: "day",
            actual: [h(8, 30), h(10)],
          },
          {
            id: "sync",
            label: t.jobs.sync,
            group: "day",
            actual: [h(12), h(14)],
          },
        ]}
        labels={{ name: t.name }}
      />
    </div>
  )
}
