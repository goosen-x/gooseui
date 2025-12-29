# Search в Header

#p1 #feature

## Описание

Добавить поиск по документации в header с горячей клавишей ⌘K (Cmd+K / Ctrl+K).

## Что хочется

- [ ] Поиск по названиям компонентов
- [ ] Поиск по документации
- [ ] Горячая клавиша ⌘K
- [ ] Модальное окно с результатами
- [ ] Навигация стрелками

## Референсы

| Библиотека | Ссылка                | Что понравилось |
| ---------- | --------------------- | --------------- |
| 8bitcn/ui  | https://8bitcn.com    | ⌘K search       |
| shadcn/ui  | https://ui.shadcn.com | cmdk интеграция |
| Vercel     | https://vercel.com    | Command palette |

## Варианты реализации

1. **cmdk** — популярная библиотека для command palette
2. **Algolia DocSearch** — бесплатно для OSS
3. **Свой поиск** — простой fuzzy search по JSON

```tsx
// cmdk пример
import { Command } from "cmdk"

;<Command.Dialog open={open} onOpenChange={setOpen}>
  <Command.Input placeholder="Search..." />
  <Command.List>
    <Command.Group heading="Components">
      <Command.Item>Button</Command.Item>
      <Command.Item>Card</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
```

## Задачи для реализации

- [ ] Выбрать библиотеку (cmdk?)
- [ ] Собрать индекс для поиска
- [ ] Создать компонент SearchDialog
- [ ] Добавить в header
- [ ] Настроить горячие клавиши

---

Создано: 2024-12-29
Источник: 8bitcn/ui
Статус: idea
