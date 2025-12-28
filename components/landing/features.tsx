import {
  Sparkles,
  Zap,
  Code2,
  Palette,
  Blocks,
  Terminal
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Анимации и эффекты",
    description:
      "Border Beam, текстовые эффекты и другие анимации для привлекательных интерфейсов",
  },
  {
    icon: Zap,
    title: "Мгновенная установка",
    description:
      "Одна команда CLI — и компонент в вашем проекте. Никаких зависимостей от пакетов",
  },
  {
    icon: Code2,
    title: "Полный контроль",
    description:
      "Код копируется в ваш проект. Изменяйте что угодно без ограничений",
  },
  {
    icon: Palette,
    title: "Гибкая стилизация",
    description:
      "Tailwind CSS и CSS переменные для простой кастомизации под ваш бренд",
  },
  {
    icon: Blocks,
    title: "Готовые блоки",
    description:
      "Секции для лендингов, формы, карточки — собирайте страницы как конструктор",
  },
  {
    icon: Terminal,
    title: "shadcn CLI",
    description:
      "Полная совместимость с shadcn CLI. Используйте привычные команды",
  },
]

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Всё для современной разработки
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Компоненты, которые экономят время и помогают создавать качественные продукты
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
