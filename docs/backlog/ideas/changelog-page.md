# Changelog Page

#p2 #page #marketing

## Описание

Добавить страницу Changelog для документирования всех изменений в GooseUI — новые компоненты, блоки, улучшения, фиксы.

## Что хочется

- [ ] Страница /changelog
- [ ] Timeline-дизайн с датами
- [ ] Группировка изменений по дате
- [ ] Превью добавленных компонентов/блоков
- [ ] Фильтрация по типу (components, blocks, fixes)
- [ ] RSS фид для подписки

## Референсы

| Библиотека | Ссылка | Что понравилось |
| ---------- | ------ | --------------- |
| Efferd | https://efferd.com/changelog | Простой timeline, превью блоков, группировка по датам |
| shadcn/ui | https://ui.shadcn.com/docs/changelog | MDX-based changelog |
| Vercel | https://vercel.com/changelog | Красивый дизайн, теги, фильтры |

## Структура контента

```
/changelog
  └── Все записи в timeline

Каждая запись:
- Дата
- Заголовок
- Описание (опционально)
- Список компонентов/блоков с превью
```

## Примеры записей

```md
## 30 December 2024
### New Components
Added 2 new display components

- digital-clock
- baseline-status

## 28 December 2024
### Carousel Component
A zero-dependency carousel with drag-to-scroll and auto-play.

- carousel

## 25 December 2024
### Initial Blocks Launch
Premium UI blocks for Web3, Dashboards, Marketing.

- hero-1
- wallet-connect-1
- pricing-1
```

## Технические детали

### Вариант 1: MDX файлы
```
content/
  changelog/
    2024-12-30.mdx
    2024-12-28.mdx
```

### Вариант 2: JSON конфиг
```ts
// lib/config/changelog.ts
export const CHANGELOG = [
  {
    date: "2024-12-30",
    title: "New Components",
    description: "Added 2 new display components",
    items: ["digital-clock", "baseline-status"],
    type: "component",
  },
]
```

### Вариант 3: GitHub Releases API
Автоматическая синхронизация с GitHub releases.

## Задачи для реализации

- [ ] Выбрать формат хранения (MDX vs JSON vs API)
- [ ] Создать страницу /changelog
- [ ] Компонент ChangelogEntry
- [ ] Компонент ChangelogTimeline
- [ ] Превью компонентов в записях
- [ ] Добавить в навигацию
- [ ] RSS фид (опционально)
- [ ] Фильтры по типу (опционально)

## UI компоненты

```tsx
// Основная страница
<ChangelogPage>
  <ChangelogHeader />
  <ChangelogTimeline>
    <ChangelogEntry date="2024-12-30" title="New Components">
      <ChangelogItemList items={["digital-clock", "baseline-status"]} />
    </ChangelogEntry>
  </ChangelogTimeline>
</ChangelogPage>

// Entry с превью
<ChangelogEntry>
  <div className="grid grid-cols-2 gap-4">
    <ComponentPreview name="digital-clock" />
    <ComponentPreview name="baseline-status" />
  </div>
</ChangelogEntry>
```

## Заметки

- Efferd показывает простые карточки компонентов
- Можно переиспользовать BlockCard/ComponentCard для превью
- Рассмотреть автогенерацию из git commits/releases

---

Создано: 2024-12-30
Статус: idea
