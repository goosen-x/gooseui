# 🚨 Deployment Troubleshooting

**Статус:** Последние 4 деплоя на Vercel завершились с ошибкой

## 📊 Текущая ситуация

### Production (gooseui.pro)
- ✅ Сайт работает
- ❌ Registry устаревший (19 компонентов вместо 30)
- ❌ Sitemap.xml не существует (404)
- ✅ Локальная сборка проходит успешно

### Последние деплои (все failed):
```
3ba3c77 - 2026-02-28 19:51:21 - FAILED (redeploy trigger)
5717942 - 2026-02-28 19:45:39 - FAILED (competitive analysis)
60bcbf9 - 2026-02-28 19:32:53 - FAILED (sitemap)
171ceea - 2026-02-28 19:29:30 - FAILED (registry fix)
```

### Последний успешный деплой:
```
03a19bd - 2026-01-13 19:27:55 - SUCCESS
```

## 🔍 Возможные причины

### 1. Build Timeout
Vercel Free tier имеет лимит времени на билд.

**Решение:**
- Создан `vercel.json` с `maxDuration: 60`
- Возможно нужно оптимизировать сборку

### 2. Out of Memory
Большой проект может превысить лимит памяти.

**Решение:**
```json
// vercel.json
{
  "builds": [{
    "config": {
      "memory": 3008
    }
  }]
}
```

### 3. Environment Variables
Отсутствующие env переменные могут вызывать ошибки билда.

**Проверить в Vercel Dashboard:**
- Все ли env переменные настроены
- Совпадают ли они с `.env.example`

### 4. Dependency Issues
Проблемы с установкой зависимостей на Vercel.

**Решение:**
- Проверить `pnpm-lock.yaml`
- Очистить Vercel build cache

### 5. Next.js Version Conflicts
Возможна несовместимость с Vercel.

**Проверить:**
- Next.js версия: 16.1.0-canary.6
- Может быть нужна стабильная версия

## 📝 Шаги для диагностики

### Шаг 1: Проверить логи Vercel
1. Открыть [Vercel Dashboard](https://vercel.com/dashboard)
2. Выбрать проект `gooselabs-ui`
3. Открыть последний failed deployment
4. Посмотреть полные логи билда
5. Найти конкретную ошибку

### Шаг 2: Проверить Build Command
В Vercel Project Settings → Build & Development Settings:
```bash
Build Command: pnpm build
Install Command: pnpm install
Output Directory: .next
```

### Шаг 3: Проверить Environment Variables
Убедиться что все переменные из production настроены:
- `NEXT_PUBLIC_*` переменные
- Database credentials (если есть)
- API keys

### Шаг 4: Очистить Cache
В Vercel Dashboard:
1. Deployments → Failed deployment
2. Три точки (⋯) → Redeploy
3. Выбрать "Clear cache and deploy"

### Шаг 5: Downgrade Next.js (если нужно)
Если проблема в Next.js 16 (canary):
```bash
pnpm add next@latest react@latest react-dom@latest
```

## 🛠️ Quick Fixes

### Fix 1: Простой redeploy с очисткой кэша
```bash
# В Vercel Dashboard
Deployments → Latest → Redeploy → Clear cache and deploy
```

### Fix 2: Локальная проверка production билда
```bash
# Убедиться что production билд работает
pnpm build
pnpm start

# Проверить sitemap
curl http://localhost:3000/sitemap.xml

# Проверить registry
curl http://localhost:3000/r/registry.json | jq '.items | length'
```

### Fix 3: Проверить размер билда
```bash
# После build проверить размер
du -sh .next/

# Если слишком большой (>500MB), оптимизировать:
# - Уменьшить зависимости
# - Включить output: 'standalone' в next.config.ts
# - Оптимизировать images
```

### Fix 4: Добавить Build Output Caching
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next"
}
```

## ✅ Проверка после фикса

После успешного деплоя проверить:

```bash
# 1. Sitemap доступен
curl -I https://gooseui.pro/sitemap.xml
# Должен вернуть 200 OK

# 2. Registry обновлён
curl -s https://gooseui.pro/r/registry.json | \
  python3 -c "import sys, json; print(len(json.load(sys.stdin)['items']))"
# Должен вернуть 30

# 3. Shoogle может найти GooseUI
curl -X POST "https://mcp.shoogle.dev/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"keyword":"gooseui"}}}'
```

## 📞 Контакты поддержки

Если проблема не решается:
1. [Vercel Support](https://vercel.com/support)
2. [Next.js Discord](https://nextjs.org/discord)
3. GitHub Issues проекта

## 📚 Полезные ссылки

- [Vercel Build Step](https://vercel.com/docs/concepts/deployments/build-step)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Build Configuration](https://vercel.com/docs/build-step)
- [Vercel Troubleshooting](https://vercel.com/docs/errors)

---

**Последнее обновление:** 2026-02-28 19:52
**Статус:** Требует внимания
