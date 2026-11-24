"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"

const en = {
  createProject: "Create Project",
  deployANewProjectIn: "Deploy a new project in one click",
  yourNewProjectWillBe:
    "Your new project will be created with a configured environment",
  cancelled: "Cancelled",
  projectCreationCancelled: "Project creation cancelled",
  cancel: "Cancel",
  created: "Created!",
  yourProjectHasBeen: "Your project has been created",
  create: "Create",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    createProject: "Создать проект",
    deployANewProjectIn: "Разверните новый проект в один клик",
    yourNewProjectWillBe: "Новый проект будет создан с настроенным окружением",
    cancelled: "Отменено",
    projectCreationCancelled: "Создание проекта отменено",
    cancel: "Отмена",
    created: "Готово!",
    yourProjectHasBeen: "Проект создан",
    create: "Создать",
  },
}

export function CardDemo() {
  const t = content[useLocale() as Locale]

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t.createProject}</CardTitle>
        <CardDescription>{t.deployANewProjectIn}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {t.yourNewProjectWillBe}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            customToast.info(t.cancelled, {
              description: t.projectCreationCancelled,
            })
          }
        >
          {t.cancel}
        </Button>
        <Button
          onClick={() =>
            customToast.success(t.created, {
              description: t.yourProjectHasBeen,
            })
          }
        >
          {t.create}
        </Button>
      </CardFooter>
    </Card>
  )
}
