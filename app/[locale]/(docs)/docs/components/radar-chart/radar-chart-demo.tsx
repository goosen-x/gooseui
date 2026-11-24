import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { RadarChart } from "@/registry/gooseui/ui/radar-chart"

const en = {
  title: "Skill profile",
  axis: "Skill",
  axes: {
    layout: "Layout",
    typography: "Typography",
    accessibility: "Accessibility",
    performance: "Performance",
    testing: "Testing",
    animation: "Animation and motion",
  },
  junior: "Junior",
  senior: "Senior",
  team: "Team average",
  product: "Product comparison",
  feature: "Criterion",
  p: {
    battery: "Battery",
    camera: "Camera",
    screen: "Screen",
    price: "Price",
    weight: "Weight",
  },
  modelA: "Model A",
  modelB: "Model B",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Профиль навыков",
    axis: "Навык",
    axes: {
      layout: "Вёрстка",
      typography: "Типографика",
      accessibility: "Доступность",
      performance: "Производительность",
      testing: "Тесты",
      animation: "Анимация и движение",
    },
    junior: "Джун",
    senior: "Сеньор",
    team: "Среднее по команде",
    product: "Сравнение моделей",
    feature: "Критерий",
    p: {
      battery: "Батарея",
      camera: "Камера",
      screen: "Экран",
      price: "Цена",
      weight: "Вес",
    },
    modelA: "Модель A",
    modelB: "Модель B",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function RadarPreviewDemo() {
  const t = useT()
  const axes = (Object.keys(t.axes) as (keyof typeof t.axes)[]).map((key) => ({
    key,
    label: t.axes[key],
  }))
  return (
    <RadarChart
      title={t.title}
      axisHeader={t.axis}
      axes={axes}
      max={10}
      series={[
        {
          name: t.junior,
          values: {
            layout: 7,
            typography: 5,
            accessibility: 3,
            performance: 4,
            testing: 2,
            animation: 6,
          },
        },
        {
          name: t.senior,
          values: {
            layout: 9,
            typography: 8,
            accessibility: 8,
            performance: 9,
            testing: 7,
            animation: 7,
          },
        },
        {
          name: t.team,
          values: {
            layout: 8,
            typography: 6,
            accessibility: 6,
            performance: 6,
            testing: 5,
            animation: 5,
          },
        },
      ]}
    />
  )
}

export function RadarCircleDemo() {
  const t = useT()
  const keys = Object.keys(t.p) as (keyof typeof t.p)[]
  return (
    <RadarChart
      title={t.product}
      axisHeader={t.feature}
      grid="circle"
      levels={5}
      max={5}
      axes={keys.map((key) => ({ key, label: t.p[key] }))}
      formatValue={(v) => `${v} / 5`}
      series={[
        {
          name: t.modelA,
          values: { battery: 4, camera: 5, screen: 4, price: 2, weight: 3 },
        },
        {
          name: t.modelB,
          color: "var(--primary)",
          values: { battery: 5, camera: 3, screen: 3, price: 4, weight: 4 },
        },
      ]}
    />
  )
}

export function RadarSingleDemo() {
  const t = useT()
  const keys = Object.keys(t.p) as (keyof typeof t.p)[]
  return (
    <RadarChart
      title={t.product}
      axisHeader={t.feature}
      showLegend={false}
      levels={3}
      className="max-w-[280px]"
      axes={keys.map((key) => ({ key, label: t.p[key] }))}
      series={[
        {
          name: t.modelA,
          color: "var(--foreground)",
          values: {
            battery: 80,
            camera: 95,
            screen: 70,
            price: 40,
            weight: 60,
          },
        },
      ]}
    />
  )
}
