"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/registry/gooseui/ui/morphing-dialog"

const en = {
  mountainLandscape: "Mountain landscape",
  swissAlps: "Swiss Alps",
  exploreTheMajestic: "Explore the majestic mountains",
  theSwissAlpsAreA:
    "The Swiss Alps are a mountain range in Switzerland, forming a portion of the Alps. They are located in the Swiss Plateau and the Jura Mountains region. The highest peak is the Dufourspitze at 4,634 meters. The Alps are a popular destination for skiing, hiking, and mountaineering.",
  profile: "Profile",
  johnDoe: "John Doe",
  softwareEngineer: "Software Engineer",
  softwareEngineerAtAcme: "Software Engineer at Acme Inc.",
  johnIsAPassionate:
    "John is a passionate software engineer with over 10 years of experience in building web applications. He specializes in React, TypeScript, and Node.js. When not coding, he enjoys hiking and photography.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    mountainLandscape: "Горный пейзаж",
    swissAlps: "Швейцарские Альпы",
    exploreTheMajestic: "Величественные горы",
    theSwissAlpsAreA:
      "Швейцарские Альпы: горный массив в Швейцарии, часть Альп. Самая высокая вершина здесь пик Дюфур, 4634 метра. Здесь любят кататься на лыжах, ходить в походы и заниматься альпинизмом.",
    profile: "Фото профиля",
    johnDoe: "Иван Петров",
    softwareEngineer: "Разработчик",
    softwareEngineerAtAcme: "Разработчик в Acme Inc.",
    johnIsAPassionate:
      "Иван увлечённый разработчик с опытом больше 10 лет в создании веб-приложений. Специализируется на React, TypeScript и Node.js. В свободное время ходит в походы и занимается фотографией.",
  },
}

export function MorphingDialogDemo() {
  const t = content[useLocale() as Locale]

  return (
    <MorphingDialog>
      <MorphingDialogTrigger className="overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md max-w-xs">
        <MorphingDialogImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt={t.mountainLandscape}
          className="h-40 w-full rounded-lg"
        />
        <div className="mt-3">
          <MorphingDialogTitle>{t.swissAlps}</MorphingDialogTitle>
          <MorphingDialogSubtitle>
            {t.exploreTheMajestic}
          </MorphingDialogSubtitle>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="max-w-xl">
          <MorphingDialogClose />
          <MorphingDialogImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            alt={t.mountainLandscape}
            className="h-64 w-full rounded-lg"
          />
          <div className="mt-4">
            <MorphingDialogTitle className="text-xl">
              {t.swissAlps}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle>
              {t.exploreTheMajestic}
            </MorphingDialogSubtitle>
          </div>
          <MorphingDialogDescription>
            {t.theSwissAlpsAreA}
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export function MorphingDialogCardDemo() {
  const t = content[useLocale() as Locale]

  return (
    <MorphingDialog>
      <MorphingDialogTrigger className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md max-w-sm">
        <MorphingDialogImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt={t.profile}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <MorphingDialogTitle>{t.johnDoe}</MorphingDialogTitle>
          <MorphingDialogSubtitle>{t.softwareEngineer}</MorphingDialogSubtitle>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent>
          <MorphingDialogClose />
          <div className="flex items-start gap-4">
            <MorphingDialogImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
              alt={t.profile}
              className="h-24 w-24 rounded-full"
            />
            <div>
              <MorphingDialogTitle className="text-xl">
                {t.johnDoe}
              </MorphingDialogTitle>
              <MorphingDialogSubtitle>
                {t.softwareEngineerAtAcme}
              </MorphingDialogSubtitle>
            </div>
          </div>
          <MorphingDialogDescription>
            {t.johnIsAPassionate}
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
