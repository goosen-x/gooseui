# Components Grid Page

#p2 #feature #docs

## Описание

Страница /components со всеми компонентами в виде грида — удобный обзор всей библиотеки.

## Что хочется

- [ ] Грид с превью всех компонентов
- [ ] Фильтрация по категориям
- [ ] Поиск по названию
- [ ] Клик → переход на страницу компонента
- [ ] Hover эффект с описанием

## Референсы

| Библиотека | Ссылка | Что понравилось |
|------------|--------|-----------------|
| 8bitcn/ui | https://8bitcn.com/components | Грид всех компонентов |
| MagicUI | https://magicui.design | Карточки с превью |
| Aceternity | https://ui.aceternity.com | Анимированные превью |

## Структура страницы

```
/components
├── Hero: "All Components"
├── Filter: [All] [Buttons] [Forms] [Effects]
├── Search: input
└── Grid:
    ├── Button (превью + название)
    ├── Card
    ├── Input
    └── ...
```

## Пример карточки

```tsx
<ComponentCard
  name="Button"
  description="Clickable button with variants"
  href="/docs/components/button"
  preview={<Button>Click me</Button>}
/>
```

## Задачи для реализации

- [ ] Создать страницу /components
- [ ] Компонент ComponentCard с превью
- [ ] Грид layout
- [ ] Фильтрация по категориям
- [ ] Анимации hover

---

Создано: 2024-12-29
Источник: 8bitcn/ui
Статус: idea
