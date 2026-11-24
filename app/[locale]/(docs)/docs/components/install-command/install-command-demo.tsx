"use client"

import { useLocale } from "next-intl"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { InstallCommand } from "@/registry/gooseui/ui/install-command"

const en = {
  tabs: "Package manager",
  copy: "Copy command",
  copied: "Copied",
  toast: "Command copied",
  first: "Step 1. Add the dependency",
  second: "Step 2. Add the component",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    tabs: "Пакетный менеджер",
    copy: "Скопировать команду",
    copied: "Скопировано",
    toast: "Команда скопирована",
    first: "Шаг 1. Поставьте зависимость",
    second: "Шаг 2. Добавьте компонент",
  },
}

// A separate key keeps the demo independent from the site's own install blocks.
const DEMO_KEY = "gooseui-demo-package-manager"

function useLabels() {
  const t = content[useLocale() as Locale]
  const toast = useCopyToast()(t.toast)
  return {
    t,
    toast,
    labels: { tabs: t.tabs, copy: t.copy, copied: t.copied },
  }
}

const COMMANDS = {
  npm: "npm install motion",
  pnpm: "pnpm add motion",
  yarn: "yarn add motion",
  bun: "bun add motion",
}

export function InstallCommandDemo() {
  const { labels, toast } = useLabels()
  return (
    <div className="w-full max-w-lg px-4">
      <InstallCommand
        packageName="@gooseui/button"
        storageKey={DEMO_KEY}
        labels={labels}
        onCopy={toast.onCopy}
        onCopyError={toast.onCopyError}
      />
    </div>
  )
}

export function InstallCommandCustomDemo() {
  const { labels, toast } = useLabels()
  return (
    <div className="w-full max-w-lg px-4">
      <InstallCommand
        packageName="motion"
        commands={COMMANDS}
        storageKey={DEMO_KEY}
        labels={labels}
        onCopy={toast.onCopy}
        onCopyError={toast.onCopyError}
      />
    </div>
  )
}

export function InstallCommandSyncDemo() {
  const { t, labels, toast } = useLabels()
  return (
    <div className="w-full max-w-lg space-y-4 px-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">{t.first}</p>
        <InstallCommand
          packageName="motion"
          commands={COMMANDS}
          storageKey={DEMO_KEY}
          labels={labels}
          onCopy={toast.onCopy}
          onCopyError={toast.onCopyError}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">{t.second}</p>
        <InstallCommand
          packageName="@gooseui/timeline"
          storageKey={DEMO_KEY}
          labels={labels}
          onCopy={toast.onCopy}
          onCopyError={toast.onCopyError}
        />
      </div>
    </div>
  )
}
