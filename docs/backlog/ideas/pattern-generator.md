# Pattern Generator

#p2 #component #effect

## Описание

Генератор паттернов для фона — интерактивный компонент, позволяющий создавать и кастомизировать фоновые паттерны.

## Что хочется

- [ ] SVG паттерны (точки, линии, сетки, волны)
- [ ] Градиенты (линейные, радиальные, mesh)
- [ ] Noise/grain эффекты
- [ ] Интерактивный превью
- [ ] Копирование CSS/SVG кода

## Референсы

| Библиотека    | Ссылка                                             | Что понравилось         |
| ------------- | -------------------------------------------------- | ----------------------- |
| MagicUI       | https://magicui.design/docs/components/dot-pattern | Dot pattern с анимацией |
| BGJar         | https://bgjar.com                                  | Генератор с UI          |
| Haikei        | https://haikei.app                                 | Blob, waves, stacked    |
| Hero Patterns | https://heropatterns.com                           | SVG паттерны            |

## Примеры использования

```tsx
// Простой паттерн
<DotPattern className="opacity-50" />

// С кастомизацией
<GridPattern
  size={32}
  strokeWidth={1}
  className="text-muted-foreground/20"
/>

// Gradient mesh
<MeshGradient colors={["#ff0080", "#7928ca", "#0070f3"]} />
```

## Задачи для реализации

- [ ] Исследовать существующие решения
- [ ] Определить API компонентов
- [ ] Реализовать базовые паттерны (dot, grid, line)
- [ ] Добавить градиенты
- [ ] Создать документацию с примерами
- [ ] Добавить интерактивный playground

## Заметки

- Можно начать с простых SVG паттернов
- Посмотреть как сделано в Aceternity UI
- Учесть производительность (CSS vs SVG vs Canvas)

---

Создано: 2024-12-29
Статус: idea
