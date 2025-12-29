# Sponsors Page

#p3 #feature

## Описание

Страница благодарности спонсорам с уровнями поддержки и кнопкой "Become a Sponsor".

## Что хочется

- [ ] Уровни спонсоров (Mythic, Legendary, Epic...)
- [ ] Логотипы/аватары спонсоров
- [ ] Ссылки на спонсоров
- [ ] Кнопка "Become a Sponsor"
- [ ] Интеграция с GitHub Sponsors / Open Collective

## Референсы

| Библиотека | Ссылка                      | Что понравилось   |
| ---------- | --------------------------- | ----------------- |
| 8bitcn/ui  | https://8bitcn.com/sponsors | Уровни спонсоров  |
| Vue.js     | https://vuejs.org/sponsors  | Тиры с логотипами |
| Nuxt       | https://nuxt.com/sponsors   | Красивый дизайн   |

## Структура страницы

```
/sponsors
├── Hero: "Our Sponsors"
├── CTA: "Become a Sponsor" → GitHub Sponsors
├── Tiers:
│   ├── Mythic ($500+/mo)
│   ├── Legendary ($100+/mo)
│   ├── Epic ($50+/mo)
│   └── Supporters ($10+/mo)
└── Footer: "Thank you!"
```

## Задачи для реализации

- [ ] Создать страницу /sponsors
- [ ] Компонент SponsorTier
- [ ] Настроить GitHub Sponsors
- [ ] Добавить ссылку в навигацию
- [ ] Дизайн карточек спонсоров

---

Создано: 2024-12-29
Источник: 8bitcn/ui
Статус: idea
