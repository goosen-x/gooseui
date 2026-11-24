# Дизайн-система: недостающие базовые компоненты (сверка с shadcn)

#p1 #component

## Описание

Сверка каталога shadcn/ui (`https://ui.shadcn.com/r/index.json`, тип `registry:ui`, 54 компонента) с реестром GooseUI на 2026-11-23. Цель: набор «кирпичиков», из которых можно собрать сайт целиком, а не набор отдельных компонентов.

Правило для всех новых компонентов: нативный HTML и современный CSS, JavaScript только там, где без него нельзя, без npm-зависимостей (см. `CLAUDE.md`, раздел Registry rules).

## Что уже есть

**Как у shadcn (23):** tooltip, dropdown-menu, dialog, sheet, button, card, carousel, checkbox, input, label, textarea, switch, slider, badge, skeleton, separator, kbd, breadcrumb, toggle, toggle-group, tabs, collapsible, sonner.

**Аналоги под другим именем (9):**

| shadcn | GooseUI |
| --- | --- |
| accordion | details-accordion |
| input-otp | otp-input |
| radio-group | radio |
| hover-card | responsive-hint / anchor-tooltip |
| navigation-menu | mega-menu |
| command | search-panel |
| toast | custom-toast |
| progress | progress-ring / step-progress |
| scroll-area | scroll-container |

## Чего нет (21)

Размер: S — до пары часов, M — день, L — несколько дней.

### Формы
- [ ] **select / native-select** — нативный `<select>`, кастомный вид через `appearance: base-select` как улучшение (M)
- [ ] **combobox** — `<input list>` + `<datalist>` (S); со своим списком на popover (L)
- [ ] **field** — подпись, поле, подсказка, ошибка; ошибки через `:user-invalid`. Заменяет удалённый Smart Form (S)
- [ ] **input-group** — поле с префиксом/суффиксом, `<fieldset>` + CSS (S)
- [ ] **form** — формы на нативной валидации, без react-hook-form (S)
- [ ] **button-group** — группа кнопок, flex и общие скругления (S)

### Оверлеи
- [ ] **popover** — атрибут `popover` + `popovertarget`, anchor positioning как улучшение (S)
- [ ] **alert-dialog** — `<dialog role="alertdialog">` (S)
- [ ] **drawer** — `<dialog>` снизу, закрытие свайпом (M)
- [ ] **context-menu** — `popover` + немного JS на `contextmenu` (M)
- [ ] **menubar** — набор popover-меню (M)

### Навигация
- [ ] **pagination** — ссылки `<a>` + CSS (S)
- [ ] **sidebar** — `<aside>` + `<details>` / чекбокс; основа есть в `components/ui/sidebar.tsx` сайта (L)

### Данные
- [ ] **table** — `<table>` + CSS, сортировка как улучшение (S)
- [ ] **avatar** — `<img>` + запасной вариант с инициалами на CSS (S)
- [ ] **item** — строка списка: иконка, текст, действие (S)
- [ ] **empty** — пустое состояние (S)
- [ ] **chart** — SVG + CSS-переменные; основа есть в radar-chart, gauge, activity-heatmap (L)
- [ ] **calendar** — `<table>` + минимум JS; основа есть в booking-calendar (L)

### Обратная связь
- [ ] **alert** — `role="alert"` + CSS, варианты как у badge (S)
- [ ] **spinner** — чистый CSS (S)

### Раскладка
- [ ] **aspect-ratio** — CSS `aspect-ratio` (S)
- [ ] **resizable** — CSS `resize`; настоящий split pane требует JS (M)

## Порядок

1. **Волна 1:** table, select, popover, alert, avatar, pagination, field, form, drawer, aspect-ratio.
2. **Волна 2:** alert-dialog, input-group, button-group, combobox, spinner, empty, item.
3. **Волна 3:** context-menu, menubar, sidebar, calendar, chart, resizable.

Каждый компонент проходит конвейер: страница на двух языках, превью, `pnpm test:components`, приёмка владельцем в панели на странице (dev), только потом прод.

## Заметки

- Сайт сам должен собираться из этих компонентов: после появления компонента заменить им локальные версии в `components/ui/*` и убрать сторонний пакет, если он был.
- Перед волной перепроверить список: shadcn добавляет компоненты.

---

Создано: 2026-11-23
Статус: todo
