import type { Locale } from "@/i18n/routing"
import { Input } from "@/registry/gooseui/ui/input"
import { OptionPicker } from "@/registry/gooseui/ui/option-picker"
import { StepWizard, StepWizardStep } from "@/registry/gooseui/ui/step-wizard"

const text = {
  en: {
    labels: undefined,
    q1: "What are you planning?",
    q1d: "Next stays locked until you pick an option.",
    q1Options: [
      { value: "trip", label: "A trip", description: "A few days away" },
      { value: "party", label: "A party", description: "Friends and music" },
      {
        value: "course",
        label: "A course",
        description: "Learn something new",
      },
    ],
    q2: "How many people?",
    q2Options: [
      { value: "1", label: "Just me" },
      { value: "2-4", label: "2–4" },
      { value: "5+", label: "5 or more" },
    ],
    q3: "How should we call you?",
    q3d: "At least two letters: the minlength attribute checks it.",
    q3Placeholder: "Your name",
    q4: "All set",
    q4d: "Finish submits the form. Here it is a dialog form, so nothing is sent.",
  },
  ru: {
    labels: {
      back: "Назад",
      next: "Далее",
      finish: "Готово",
      progress: "Шаг {current} из {total}",
    },
    q1: "Что вы планируете?",
    q1d: "Пока ничего не выбрано, «Далее» не нажимается.",
    q1Options: [
      { value: "trip", label: "Поездку", description: "На несколько дней" },
      { value: "party", label: "Вечеринку", description: "Друзья и музыка" },
      { value: "course", label: "Курс", description: "Узнать новое" },
    ],
    q2: "Сколько будет людей?",
    q2Options: [
      { value: "1", label: "Только я" },
      { value: "2-4", label: "2–4" },
      { value: "5+", label: "5 и больше" },
    ],
    q3: "Как к вам обращаться?",
    q3d: "Хотя бы две буквы: это проверяет атрибут minlength.",
    q3Placeholder: "Ваше имя",
    q4: "Всё готово",
    q4d: "«Готово» отправляет форму. Здесь это форма диалога, так что ничего не уходит.",
  },
}

/** Server component: the whole wizard works with JavaScript turned off */
export function StepWizardNativeDemo({ locale }: { locale: Locale }) {
  const t = text[locale]
  return (
    <form
      method="dialog"
      className="w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
    >
      <StepWizard transition="slide" labels={t.labels}>
        <StepWizardStep title={t.q1} description={t.q1d} headingAs="h3">
          <OptionPicker
            aria-label={t.q1}
            variant="tiles"
            name="plan"
            required
            options={t.q1Options}
          />
        </StepWizardStep>
        <StepWizardStep title={t.q2} headingAs="h3">
          <OptionPicker
            aria-label={t.q2}
            variant="segment"
            name="people"
            defaultValue="2-4"
            options={t.q2Options}
          />
        </StepWizardStep>
        <StepWizardStep title={t.q3} description={t.q3d} headingAs="h3">
          <Input
            aria-label={t.q3}
            name="name"
            required
            minLength={2}
            placeholder={t.q3Placeholder}
          />
        </StepWizardStep>
        <StepWizardStep title={t.q4} description={t.q4d} headingAs="h3" />
      </StepWizard>
    </form>
  )
}
