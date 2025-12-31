# Dashboard Widgets (Blocks)

#p2 #block #dashboard

## Описание

Добавить виджеты как часть Dashboard блоков — готовые мини-приложения для дашбордов. Виджеты размещаются в категории `dashboard` раздела Blocks.

## Референсы

| Библиотека | Ссылка | Что понравилось |
| ---------- | ------ | --------------- |
| Eindev UI | https://ui.eindev.ir/docs/components/stock-widget | Stock виджет с графиком |
| Eindev UI | https://ui.eindev.ir/docs/components/glass-button | Glassmorphism стиль |
| Tremor | https://tremor.so | Dashboard компоненты |
| shadcn/ui Charts | https://ui.shadcn.com/charts | Графики на Recharts |

## Идеи виджетов

### Finance / Crypto
- [ ] Stock Widget — цена акции с графиком
- [ ] Crypto Widget — курс криптовалюты
- [ ] Portfolio Widget — баланс портфеля
- [ ] Price Ticker — бегущая строка с ценами

### Analytics
- [ ] Stats Card — метрика с трендом
- [ ] Mini Chart — спарклайн
- [ ] Progress Widget — прогресс с процентами
- [ ] Comparison Widget — сравнение двух значений

### Social / Activity
- [ ] Activity Feed — лента активности
- [ ] User Card — карточка пользователя
- [ ] Notification Widget — уведомления
- [ ] Online Users — онлайн пользователи

### Weather / Time
- [ ] Weather Widget — погода
- [ ] Clock Widget — часы (уже есть Digital Clock!)
- [ ] Timezone Widget — время в разных зонах
- [ ] Calendar Widget — мини-календарь

### System
- [ ] System Status — статус сервисов
- [ ] Server Stats — CPU/RAM/Disk
- [ ] Uptime Widget — аптайм
- [ ] API Status — статус API

## Структура

```
/docs/blocks/dashboard     # Категория в Blocks
  /stock-widget-1
  /crypto-widget-1
  /stats-card-1
  /weather-widget-1
  ...

components/blocks/dashboard/  # Блоки
  stock-widget-1.tsx
  crypto-widget-1.tsx
  stats-card-1.tsx
  ...
```

## Категория в blocks-categories.ts

```ts
// lib/config/blocks-categories.ts
{
  slug: "dashboard",
  name: "Dashboard",
  description: "Widgets and cards for dashboards and admin panels",
  icon: LayoutDashboard,
}
```

## Примеры компонентов

### Stock Widget
```tsx
<StockWidget
  symbol="AAPL"
  name="Apple Inc."
  price={178.52}
  change={+2.34}
  changePercent={+1.33}
  data={sparklineData}
/>
```

### Stats Card
```tsx
<StatsCard
  title="Total Revenue"
  value="$45,231.89"
  change={+20.1}
  trend="up"
  icon={DollarSign}
/>
```

### Crypto Widget
```tsx
<CryptoWidget
  symbol="BTC"
  name="Bitcoin"
  price={42150.00}
  change24h={-1.2}
  marketCap="$824B"
  volume24h="$12.5B"
/>
```

## Glassmorphism стиль

Рассмотреть добавление glass-варианта для компонентов:

```tsx
// Glass Button (как у Eindev)
<Button variant="glass">Glass Button</Button>

// Glass Card
<Card variant="glass">
  <StockWidget />
</Card>
```

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Зависимости

- `recharts` — для графиков (уже используется в shadcn charts)
- API для данных (опционально, можно mock)

## Задачи для реализации

### Фаза 1: Категория Dashboard
- [ ] Добавить категорию "dashboard" в blocks-categories.ts
- [ ] Создать components/blocks/dashboard/

### Фаза 2: Первые виджеты
- [ ] stats-card-1 (самый простой)
- [ ] stats-card-2 (с графиком)
- [ ] stock-widget-1
- [ ] crypto-widget-1

### Фаза 3: Glassmorphism варианты
- [ ] Glass Button variant в компонентах
- [ ] Glass Card для виджетов
- [ ] glass-stats-card-1

### Фаза 4: Расширение
- [ ] weather-widget-1
- [ ] activity-feed-1
- [ ] server-stats-1
- [ ] api-status-1

## Заметки

- Digital Clock уже по сути виджет — можно переместить
- Виджеты хорошо подходят для dashboard блоков
- Glassmorphism требует тёмный/цветной фон для эффекта
- Eindev использует Framer Motion для анимаций

---

Создано: 2024-12-30
Статус: idea
