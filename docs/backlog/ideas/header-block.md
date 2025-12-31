# Header Block

#p2 #block #marketing

## Описание

Добавить блок хедера в стиле Efferd — минималистичный навбар с лого, выпадающими меню, кнопками Login и Get Access.

## Что хочется

- [ ] Лого слева
- [ ] Навигация с dropdown меню (Product, Resources)
- [ ] Простые ссылки (Pricing)
- [ ] Кнопки справа: Login (ghost), Get Access (primary с иконкой)
- [ ] Pill-образный контейнер с бордером
- [ ] Адаптивность (бургер-меню на мобильных)

## Референсы

| Библиотека | Ссылка | Что понравилось |
| ---------- | ------ | --------------- |
| Efferd | https://efferd.com/blocks/header | Pill-форма навбара, минимализм, hover-эффекты |
| @efferd/header-8 | Registry component | Готовый компонент для shadcn CLI |

## Примеры использования

```tsx
import { Header8 } from "@/components/blocks/header-8"

export default function Page() {
  return (
    <Header8
      logo={<Logo />}
      navigation={[
        {
          label: "Product",
          items: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
          ],
        },
        { label: "Resources", items: [...] },
        { label: "Pricing", href: "/pricing" },
      ]}
      actions={[
        { label: "Login", href: "/login", variant: "ghost" },
        { label: "Get Access", href: "/signup", variant: "default" },
      ]}
    />
  )
}
```

## Задачи для реализации

- [ ] Создать базовый компонент Header
- [ ] Добавить dropdown меню
- [ ] Стилизация pill-контейнера
- [ ] Мобильная версия с бургером
- [ ] Добавить в registry
- [ ] Написать документацию

## Заметки

- Efferd использует платную модель ($49 lifetime)
- Компонент @efferd/header-8 доступен через shadcn CLI
- Рассмотреть создание нескольких вариантов хедеров

---

Создано: 2024-12-30
Статус: idea
