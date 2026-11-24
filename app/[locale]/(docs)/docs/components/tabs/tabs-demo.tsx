"use client"

import { BarChart3, FileText, LayoutDashboard } from "lucide-react"
import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Input } from "@/registry/gooseui/ui/input"
import { Label } from "@/registry/gooseui/ui/label"
import { Switch } from "@/registry/gooseui/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/gooseui/ui/tabs"

const en = {
  account: "Account settings",
  profile: "Profile",
  password: "Password",
  notifications: "Notifications",
  name: "Name",
  email: "Email",
  current: "Current password",
  next: "New password",
  repeat: "Repeat new password",
  saveProfile: "Save profile",
  savePassword: "Update password",
  profileSaved: "Profile saved",
  passwordSaved: "Password updated",
  digest: "Weekly digest",
  digestHint: "A summary of the week on Monday morning.",
  product: "Product news",
  productHint: "New components and releases, once or twice a month.",
  security: "Security alerts",
  securityHint: "Sign-ins from a new device. Always worth keeping on.",
  views: "Views",
  overview: "Overview",
  analytics: "Analytics",
  reports: "Reports",
  overviewTitle: "This week at a glance",
  overviewText: "12 480 visits, 8% more than last week. 312 new sign-ups.",
  analyticsTitle: "Where visitors come from",
  analyticsText: "Search 46%, direct 31%, social 14%, other 9%.",
  reportsTitle: "Monthly reports",
  reportsText:
    "Three reports are ready to download: October, September, August.",
  settings: "Settings sections",
  general: "General",
  securitySection: "Security",
  billing: "Billing",
  generalTitle: "Workspace name and language",
  generalText: "Shown in the header and in the emails your team receives.",
  securityTitle: "Two-factor authentication",
  securityText:
    "Ask for a code from an authenticator app on every new sign-in.",
  billingTitle: "Team plan, 5 seats",
  billingText: "Renews on 1 December. Invoices go to the billing email.",
  sections: "Project sections",
  activity: "Activity",
  files: "Files",
  projectOverviewTitle: "Landing redesign",
  projectOverviewText: "Due 12 December. Four of seven tasks are done.",
  activityTitle: "Latest changes",
  activityText: "Anna moved the hero to review, Ivan added the pricing table.",
  filesTitle: "Attachments",
  filesText: "brief.pdf, moodboard.fig and 6 more files, 18 MB in total.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    account: "Настройки аккаунта",
    profile: "Профиль",
    password: "Пароль",
    notifications: "Уведомления",
    name: "Имя",
    email: "Почта",
    current: "Текущий пароль",
    next: "Новый пароль",
    repeat: "Повторите новый пароль",
    saveProfile: "Сохранить профиль",
    savePassword: "Обновить пароль",
    profileSaved: "Профиль сохранён",
    passwordSaved: "Пароль обновлён",
    digest: "Недельная сводка",
    digestHint: "Итоги недели в понедельник утром.",
    product: "Новости продукта",
    productHint: "Новые компоненты и релизы, раз или два в месяц.",
    security: "Уведомления о безопасности",
    securityHint: "Входы с нового устройства. Лучше не отключать.",
    views: "Виды",
    overview: "Обзор",
    analytics: "Аналитика",
    reports: "Отчёты",
    overviewTitle: "Неделя в цифрах",
    overviewText:
      "12 480 визитов, на 8% больше, чем неделей раньше. 312 новых регистраций.",
    analyticsTitle: "Откуда приходят посетители",
    analyticsText: "Поиск 46%, прямые заходы 31%, соцсети 14%, прочее 9%.",
    reportsTitle: "Отчёты за месяц",
    reportsText: "Три отчёта готовы к скачиванию: октябрь, сентябрь, август.",
    settings: "Разделы настроек",
    general: "Общие",
    securitySection: "Безопасность",
    billing: "Оплата",
    generalTitle: "Название и язык рабочего пространства",
    generalText: "Показываются в шапке и в письмах, которые получает команда.",
    securityTitle: "Двухфакторная аутентификация",
    securityText:
      "Просить код из приложения-аутентификатора при каждом новом входе.",
    billingTitle: "Тариф «Команда», 5 мест",
    billingText: "Продлится 1 декабря. Счета приходят на почту для оплаты.",
    sections: "Разделы проекта",
    activity: "Активность",
    files: "Файлы",
    projectOverviewTitle: "Редизайн лендинга",
    projectOverviewText: "Срок 12 декабря. Готово четыре задачи из семи.",
    activityTitle: "Последние изменения",
    activityText:
      "Анна передала главный экран на ревью, Иван добавил таблицу тарифов.",
    filesTitle: "Вложения",
    filesText: "brief.pdf, moodboard.fig и ещё 6 файлов, всего 18 МБ.",
  },
}

const stage = "flex justify-center rounded-lg bg-muted/30 px-4 py-12"
const panel = "rounded-lg border bg-card p-5 text-card-foreground"

function Field({
  id,
  label,
  ...props
}: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  )
}

export function TabsAccountDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className={stage}>
      <Tabs defaultValue="profile" className="w-full max-w-sm">
        <TabsList aria-label={t.account} className="w-full">
          <TabsTrigger value="profile">{t.profile}</TabsTrigger>
          <TabsTrigger value="password">{t.password}</TabsTrigger>
          <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className={`${panel} min-h-80`}>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              customToast.success(t.profileSaved)
            }}
          >
            <Field
              id="tabs-name"
              label={t.name}
              name="name"
              defaultValue="Anna Petrova"
              autoComplete="name"
            />
            <Field
              id="tabs-email"
              label={t.email}
              name="email"
              type="email"
              defaultValue="anna@example.com"
              autoComplete="email"
            />
            <Button type="submit" className="justify-self-start">
              {t.saveProfile}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="password" className={`${panel} min-h-80`}>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              customToast.success(t.passwordSaved)
            }}
          >
            <Field
              id="tabs-current"
              label={t.current}
              name="current"
              type="password"
              autoComplete="current-password"
            />
            <Field
              id="tabs-new"
              label={t.next}
              name="next"
              type="password"
              autoComplete="new-password"
            />
            <Field
              id="tabs-repeat"
              label={t.repeat}
              name="repeat"
              type="password"
              autoComplete="new-password"
            />
            <Button type="submit" className="justify-self-start">
              {t.savePassword}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="notifications" className={`${panel} min-h-80`}>
          <ul className="grid gap-5">
            {[
              ["digest", t.digest, t.digestHint, true],
              ["product", t.product, t.productHint, false],
              ["security", t.security, t.securityHint, true],
            ].map(([id, label, hint, on]) => (
              <li
                key={id as string}
                className="flex items-start justify-between gap-4"
              >
                <div className="grid gap-1.5">
                  <Label htmlFor={`tabs-${id}`} className="cursor-pointer">
                    {label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
                <Switch
                  id={`tabs-${id}`}
                  defaultChecked={on as boolean}
                  onChange={(e) =>
                    customToast.info(
                      `${label as string}: ${e.target.checked ? "on" : "off"}`,
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function TabsIconsDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    {
      value: "overview",
      label: t.overview,
      Icon: LayoutDashboard,
      title: t.overviewTitle,
      text: t.overviewText,
    },
    {
      value: "analytics",
      label: t.analytics,
      Icon: BarChart3,
      title: t.analyticsTitle,
      text: t.analyticsText,
    },
    {
      value: "reports",
      label: t.reports,
      Icon: FileText,
      title: t.reportsTitle,
      text: t.reportsText,
    },
  ]
  return (
    <div className={stage}>
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList aria-label={t.views}>
          {items.map(({ value, label, Icon }) => (
            <TabsTrigger key={value} value={value} className="px-3">
              <Icon aria-hidden="true" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map(({ value, title, text }) => (
          <TabsContent
            key={value}
            value={value}
            className={`${panel} min-h-28`}
          >
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export function TabsVerticalDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    {
      value: "general",
      label: t.general,
      title: t.generalTitle,
      text: t.generalText,
    },
    {
      value: "security",
      label: t.securitySection,
      title: t.securityTitle,
      text: t.securityText,
    },
    {
      value: "billing",
      label: t.billing,
      title: t.billingTitle,
      text: t.billingText,
    },
  ]
  return (
    <div className={stage}>
      <Tabs
        defaultValue="general"
        orientation="vertical"
        className="w-full max-w-lg"
      >
        <TabsList aria-label={t.settings}>
          {items.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="px-4">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map(({ value, title, text }) => (
          <TabsContent
            key={value}
            value={value}
            className={`${panel} min-h-32`}
          >
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export function TabsUnderlineDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    {
      value: "overview",
      label: t.overview,
      title: t.projectOverviewTitle,
      text: t.projectOverviewText,
    },
    {
      value: "activity",
      label: t.activity,
      title: t.activityTitle,
      text: t.activityText,
    },
    { value: "files", label: t.files, title: t.filesTitle, text: t.filesText },
  ]
  return (
    <div className={stage}>
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList variant="underline" aria-label={t.sections}>
          {items.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map(({ value, title, text }) => (
          <TabsContent key={value} value={value} className="min-h-24 pt-2">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
