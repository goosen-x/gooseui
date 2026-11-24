"use client"

import { Building2, Cloud, Flame, Gauge, Server } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { Label } from "@/registry/gooseui/ui/label"
import { Select, SelectOption } from "@/registry/gooseui/ui/select"

const en = {
  workspace: "Workspace",
  current: "Current value:",
  workspaces: [
    ["acme", "Acme Inc.", "12 members, Team plan"],
    ["studio", "North Studio", "4 members, Pro plan"],
    ["personal", "Personal", "Only you"],
  ],
  region: "Region",
  regionPlaceholder: "Where to deploy",
  regions: [
    ["fra1", "eu-central (fra1)", "Frankfurt, Germany"],
    ["iad1", "us-east (iad1)", "Washington, D.C., USA"],
    ["hnd1", "ap-northeast (hnd1)", "Tokyo, Japan"],
    ["gru1", "sa-east (gru1)", "Capacity limit reached"],
  ],
  runtime: "Runtime",
  machine: "Machine (disabled)",
  shared: "Shared CPU",
  deploy: "Deploy",
  reset: "Reset",
  formHint: "Submit to see FormData",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    workspace: "Рабочее пространство",
    current: "Текущее значение:",
    workspaces: [
      ["acme", "Acme Inc.", "12 участников, тариф Team"],
      ["studio", "North Studio", "4 участника, тариф Pro"],
      ["personal", "Личное", "Только вы"],
    ],
    region: "Регион",
    regionPlaceholder: "Где развернуть",
    regions: [
      ["fra1", "eu-central (fra1)", "Франкфурт, Германия"],
      ["iad1", "us-east (iad1)", "Вашингтон, США"],
      ["hnd1", "ap-northeast (hnd1)", "Токио, Япония"],
      ["gru1", "sa-east (gru1)", "Мощности закончились"],
    ],
    runtime: "Среда выполнения",
    machine: "Машина (недоступно)",
    shared: "Общий CPU",
    deploy: "Развернуть",
    reset: "Сбросить",
    formHint: "Отправьте форму, чтобы увидеть FormData",
  },
}

/** Controlled value with onValueChange. */
export function SelectControlledDemo() {
  const t = content[useLocale() as Locale]
  const [workspace, setWorkspace] = React.useState("acme")
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="select-workspace">{t.workspace}</Label>
      <Select
        id="select-workspace"
        value={workspace}
        onValueChange={setWorkspace}
      >
        {t.workspaces.map(([value, label, description]) => (
          <SelectOption
            key={value}
            value={value}
            icon={<Building2 />}
            description={description}
          >
            {label}
          </SelectOption>
        ))}
      </Select>
      <p className="text-sm text-muted-foreground">
        {t.current} <code>{workspace}</code>
      </p>
    </div>
  )
}

/** Plain form: name, required, defaultValue and reset are native. */
export function SelectFormDemo() {
  const t = content[useLocale() as Locale]
  const [submitted, setSubmitted] = React.useState<Record<
    string,
    string
  > | null>(null)
  return (
    <form
      className="grid w-full max-w-sm gap-4 rounded-lg border bg-card p-5"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(Object.fromEntries(data) as Record<string, string>)
      }}
      onReset={() => setSubmitted(null)}
    >
      <div className="grid gap-2">
        <Label htmlFor="select-region">{t.region}</Label>
        <Select
          id="select-region"
          name="region"
          placeholder={t.regionPlaceholder}
          required
        >
          {t.regions.map(([value, label, description]) => (
            <SelectOption
              key={value}
              value={value}
              icon={<Server />}
              description={description}
              disabled={value === "gru1"}
            >
              {label}
            </SelectOption>
          ))}
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="select-runtime">{t.runtime}</Label>
        <Select
          id="select-runtime"
          name="runtime"
          defaultValue="node22"
          size="sm"
        >
          <SelectOption value="node22" icon={<Cloud />}>
            Node.js 22
          </SelectOption>
          <SelectOption value="edge" icon={<Gauge />}>
            Edge
          </SelectOption>
          <SelectOption value="bun" icon={<Flame />}>
            Bun 1.2
          </SelectOption>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="select-tier">{t.machine}</Label>
        <Select id="select-tier" name="tier" defaultValue="shared" disabled>
          <SelectOption value="shared">{t.shared}</SelectOption>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button type="submit">{t.deploy}</Button>
        <Button type="reset" variant="outline">
          {t.reset}
        </Button>
      </div>
      <pre className="min-h-10 rounded-md bg-muted p-3 text-xs">
        {submitted ? JSON.stringify(submitted, null, 2) : t.formHint}
      </pre>
    </form>
  )
}
