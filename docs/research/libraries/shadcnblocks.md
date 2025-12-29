# ShadcnBlocks

> Премиум-библиотека готовых UI блоков для shadcn/ui, Tailwind CSS и React

**Официальный сайт:** https://shadcnblocks.com/
**Документация:** https://docs.shadcnblocks.com/
**Автор:** [@ausrobdev](https://x.com/ausrobdev)
**Дата исследования:** 28 декабря 2025

---

## Обзор

ShadcnBlocks — это обширная коллекция готовых к использованию UI-компонентов и блоков, построенных на основе shadcn/ui. Библиотека предлагает более **1110 блоков** и **1148 вариантов компонентов**, которые можно легко интегрировать в проекты через copy-paste или официальный Shadcn CLI.

### Ключевые характеристики

- **1110+ блоков** в 50+ категориях
- **1148+ вариантов компонентов**
- **11 премиум-шаблонов** (Next.js и Astro)
- **Figma Kit** с 478+ дизайнами блоков
- **Полная интеграция с Shadcn CLI** (namespaced registries)
- **Открытые исходники** для бесплатных блоков

---

## Технологический стек

| Технология       | Описание                 |
| ---------------- | ------------------------ |
| **React**        | Основной фреймворк       |
| **TypeScript**   | Типизация                |
| **Tailwind CSS** | Стилизация               |
| **shadcn/ui**    | Базовые примитивы        |
| **Next.js**      | Поддержка SSR/SSG        |
| **Astro**        | Альтернативный фреймворк |
| **Figma**        | Дизайн-система           |

---

## Категории блоков

### Marketing (маркетинговые)

| Категория       | Количество | Описание                                   |
| --------------- | ---------- | ------------------------------------------ |
| **Hero**        | 175+       | Главные секции лендингов                   |
| **Features**    | 40+        | Секции с функциями/возможностями           |
| **Pricing**     | 35+        | Таблицы цен и тарифов                      |
| **Testimonial** | 28+        | Отзывы клиентов, социальное доказательство |
| **CTA**         | 20+        | Call-to-action секции                      |
| **FAQ**         | 17+        | Часто задаваемые вопросы                   |
| **Logo Cloud**  | 15+        | Логотипы партнеров/клиентов                |

### Content (контентные)

| Категория        | Количество | Описание            |
| ---------------- | ---------- | ------------------- |
| **Blog**         | 14+        | Блоговые компоненты |
| **Gallery**      | 48+        | Галереи изображений |
| **Portfolio**    | 100+       | Портфолио проекты   |
| **About Us**     | 20+        | О компании          |
| **Case Studies** | 10+        | Кейсы               |
| **Timeline**     | 10+        | Временные линии     |

### Navigation (навигация)

| Категория      | Количество | Описание             |
| -------------- | ---------- | -------------------- |
| **Navbar**     | 14+        | Навигационные панели |
| **Footer**     | 15+        | Футеры               |
| **Breadcrumb** | 5+         | Хлебные крошки       |
| **Sidebar**    | 10+        | Боковые панели       |

### E-commerce

| Категория           | Количество | Описание          |
| ------------------- | ---------- | ----------------- |
| **Product Cards**   | 30+        | Карточки товаров  |
| **Shopping Cart**   | 15+        | Корзина           |
| **Checkout**        | 20+        | Оформление заказа |
| **Product Details** | 25+        | Детали товара     |

### Authentication (аутентификация)

| Категория           | Количество | Описание              |
| ------------------- | ---------- | --------------------- |
| **Login**           | 15+        | Страницы входа        |
| **Register**        | 10+        | Регистрация           |
| **Forgot Password** | 5+         | Восстановление пароля |
| **Two Factor**      | 5+         | 2FA                   |

### Other (прочие)

| Категория               | Количество | Описание            |
| ----------------------- | ---------- | ------------------- |
| **Team**                | 20+        | Команда             |
| **Contact**             | 15+        | Контактные формы    |
| **Data Tables**         | 25+        | Таблицы данных      |
| **Background Patterns** | 30+        | Фоновые паттерны    |
| **Shader**              | 10+        | Шейдер-эффекты      |
| **Error Pages**         | 4+         | Страницы ошибок     |
| **Cookies Consent**     | 3+         | Согласие на cookies |

---

## Установка и настройка

### Требования

- Node.js 18+
- Проект с настроенным shadcn/ui
- Файл `components.json` в корне проекта

### Шаг 1: Инициализация shadcn

```bash
npx shadcn@latest init
```

### Шаг 2: Настройка реестра (для Pro/Premium)

Добавьте в `components.json`:

```json
{
  "registries": {
    "@shadcnblocks": {
      "url": "https://shadcnblocks.com/r/{name}",
      "headers": {
        "Authorization": "Bearer ${SHADCNBLOCKS_API_KEY}"
      }
    }
  }
}
```

### Шаг 3: Настройка API ключа

1. Получите API ключ в личном кабинете: https://shadcnblocks.com/dashboard
2. Добавьте в `.env`:

```env
SHADCNBLOCKS_API_KEY=sk_live_your_api_key_here
```

### Шаг 4: Установка компонентов

```bash
# Установка одного блока
npx shadcn add @shadcnblocks/hero125

# Установка нескольких блоков
npx shadcn add @shadcnblocks/pricing3 @shadcnblocks/features8

# Просмотр блока перед установкой
npx shadcn view @shadcnblocks/hero125
```

### Альтернативные методы аутентификации

```json
// X-API-Key header
{
  "headers": {
    "X-API-Key": "${SHADCNBLOCKS_API_KEY}"
  }
}
```

---

## Тарифные планы

### Бесплатный доступ

- Ограниченный набор блоков
- Copy-paste использование
- Без CLI интеграции

### Pro Plan — $149 (единоразово)

- **1148+ вариантов компонентов**
- **976+ Pro блоков**
- Пожизненный доступ и обновления
- Безлимитные проекты
- Shadcn CLI интеграция
- Инструменты тематизации

### Premium Plan — $299 (единоразово)

Все из Pro, плюс:

- **11 премиум-шаблонов**
- **Figma Kit** (478+ дизайнов)
- **Admin Kit** (40+ страниц дашборда)

### Add-ons — $549 каждый

- **Payblocks**: Payload CMS интеграция (70+ компонентов)
- **Sanityblocks**: Sanity CMS интеграция

---

## Премиум-шаблоны

| Шаблон         | Тип            | Описание                                   |
| -------------- | -------------- | ------------------------------------------ |
| **Metafi**     | Marketing      | Современный изысканный маркетинговый сайт  |
| **Lumen**      | Marketing      | Люминесцентный дизайн для лендингов        |
| **Zippay**     | Fintech SaaS   | Финтех маркетинг шаблон                    |
| **Plasma**     | Developer SaaS | Docs, changelog, pricing для разработчиков |
| **Aspect**     | Corporate      | B2B корпоративный сайт                     |
| **Scalar**     | Open Source    | GitHub проекты и open-source               |
| **Sonic**      | Product        | Single-product лендинг                     |
| **Relative**   | Minimal        | Минималистичный лендинг                    |
| **Charter**    | Fintech        | Финтех маркетинг                           |
| **Streamline** | Professional   | Профессиональный лендинг                   |
| **Mainline**   | Open Source    | Бесплатный минималистичный шаблон          |

---

## Примеры использования

### Hero блок

```tsx
import { Hero125 } from "@/components/blocks/hero125"

export default function HomePage() {
  return (
    <Hero125
      title="Build faster with shadcn blocks"
      subtitle="Premium UI components for modern web apps"
      primaryCta={{ text: "Get Started", href: "/docs" }}
      secondaryCta={{ text: "View Demo", href: "/demo" }}
    />
  )
}
```

### Pricing блок

```tsx
import { Pricing3 } from "@/components/blocks/pricing3"

const plans = [
  {
    name: "Starter",
    price: "$9",
    features: ["5 projects", "Basic support", "1GB storage"],
  },
  {
    name: "Pro",
    price: "$29",
    features: ["Unlimited projects", "Priority support", "10GB storage"],
    popular: true,
  },
]

export default function PricingPage() {
  return <Pricing3 plans={plans} />
}
```

---

## CI/CD интеграция

### GitHub Actions

```yaml
name: Build
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pnpm install
        env:
          SHADCNBLOCKS_API_KEY: ${{ secrets.SHADCNBLOCKS_API_KEY }}
      - name: Add blocks
        run: npx shadcn add @shadcnblocks/hero125
        env:
          SHADCNBLOCKS_API_KEY: ${{ secrets.SHADCNBLOCKS_API_KEY }}
```

### Docker

```dockerfile
ARG SHADCNBLOCKS_API_KEY
ENV SHADCNBLOCKS_API_KEY=$SHADCNBLOCKS_API_KEY
RUN npx shadcn add @shadcnblocks/hero125
```

---

## История версий (Changelog)

### Декабрь 2025

- 182 новых блока (e-commerce, data tables, background patterns)

### Ноябрь 2025

- 1000+ новых паттернов компонентов (после приобретения Kibo UI)
- 50 дополнительных блоков
- Шаблон Metafi

### Октябрь 2025

- 100 portfolio-фокусированных блоков
- Шаблон Lumen
- Улучшенный viewer с фильтрами
- Open source релиз Mainline шаблона

### Август 2025

- Поддержка namespaced registries
- API аутентификация для CLI

### Май 2025

- Система тем
- Admin Kit (40+ страниц)

---

## Сравнение с альтернативами

| Характеристика | ShadcnBlocks | Shadcn Studio | Magic UI  |
| -------------- | ------------ | ------------- | --------- |
| Блоков         | 1110+        | 700+          | 150+      |
| CLI интеграция | Да           | Да            | Нет       |
| Figma Kit      | Да ($299)    | Нет           | Нет       |
| Шаблоны        | 11           | 5             | Нет       |
| Open Source    | Частично     | Частично      | Да        |
| Цена Pro       | $149         | $99           | Бесплатно |

---

## Полезные ссылки

- **Главная:** https://shadcnblocks.com/
- **Документация:** https://docs.shadcnblocks.com/
- **Блоки:** https://shadcnblocks.com/blocks
- **Шаблоны:** https://shadcnblocks.com/templates
- **Pricing:** https://shadcnblocks.com/pricing
- **Changelog:** https://shadcnblocks.com/changelog
- **GitHub (free blocks):** https://github.com/shadcnblocks

---

## Заключение

ShadcnBlocks — это зрелая и обширная библиотека UI блоков, которая значительно ускоряет разработку проектов на shadcn/ui. Особенно ценна для:

- **Быстрого прототипирования** маркетинговых лендингов
- **E-commerce проектов** с готовыми компонентами
- **SaaS приложений** с pricing, features, testimonials
- **Портфолио сайтов** с готовыми кейс-стадиями

Интеграция с официальным Shadcn CLI делает добавление блоков простым и удобным, а поддержка Figma Kit в Premium плане упрощает работу дизайнеров и разработчиков.
