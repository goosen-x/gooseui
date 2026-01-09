# Stripe в Израиле: Полный Отчёт

> Исследование на основе 30+ источников: официальная документация Stripe, налоговые органы Израиля, PWC, форумы и блоги.

---

## Краткое резюме

**Stripe официально НЕ работает в Израиле напрямую.** Израиль не входит в список 46+ стран, где Stripe полностью поддерживается. Однако израильские предприниматели могут использовать Stripe через обходные пути — регистрацию компании в США (LLC) или Великобритании.

---

## 1. Регистрация Stripe в Израиле

### Текущий статус Stripe в Израиле

Stripe пытается получить клиринговую лицензию Банка Израиля уже более 4 лет. В 2022 году компания даже назначила Гура Бирона (бывший топ-менеджер Google) для управления израильским рынком, но он покинул компанию после неудачных попыток запуска.

**Причины задержки:**
- Сложная бюрократия Банка Израиля
- Технологические особенности израильской финансовой системы (SHVA — уникальный клиринговый слой между Stripe и Visa/Mastercard)
- Только 5 компаний имеют клиринговую лицензию: CAL, Isracard, MAX, Cardcom, Tranzila

**Последние новости (ноябрь 2024):** Патрик Коллисон, основатель Stripe, посетил Тель-Авив, что породило спекуляции о возможном скором запуске в Израиле.

### Требования для использования Stripe израильтянами

Поскольку Stripe напрямую не поддерживает Израиль, необходимо создать иностранную компанию:

#### Вариант 1: US LLC (рекомендуемый)

**Что нужно:**
1. Зарегистрировать LLC в США (Delaware, Wyoming или New Mexico)
2. Получить EIN (Employer Identification Number) — налоговый ID
3. Открыть американский банковский счёт
4. Получить американский адрес и номер телефона

**Лучшие штаты для израильтян:**
- **Wyoming** — нет state income tax, сильная защита активов
- **Delaware** — бизнес-ориентированное законодательство
- **New Mexico** — минимальные требования к отчётности

**Сервисы для регистрации:**
- Stripe Atlas ($500 + $100/год)
- Doola
- Northwest Registered Agent

#### Вариант 2: UK Company

Регистрация британской компании с последующим открытием Stripe-аккаунта в Великобритании.

### Документы для верификации Stripe

**Для физлиц:**
- Паспорт или водительские права
- Подтверждение адреса (счёт за коммунальные услуги, банковская выписка за последние 6 месяцев)

**Для бизнеса:**
- Учредительные документы (Articles of Organization)
- EIN подтверждение
- Документы на бенефициарных владельцев

**Важно:** Документы загружаются только через Stripe Dashboard, не по email.

### Сроки верификации

- Регистрация LLC через Stripe Atlas: **2 рабочих дня**
- Получение EIN: **2-4 дня** (с SSN и US-адресом) или **25-40 дней** (без них)
- Верификация Stripe: обычно **несколько дней** после подачи документов

---

## 2. Приём платежей

### Можно ли принимать платежи со всего мира?

**Да**, через US LLC можно принимать платежи из любой страны мира, где Stripe работает.

### Поддерживаемые валюты

Stripe поддерживает 135+ валют, включая:
- USD, EUR, GBP, CAD, AUD
- ILS (израильский шекель) — **с ограничениями**

**Важно:** Stripe не поддерживает прямые транзакции в шекелях напрямую. Платежи принимаются в иностранной валюте.

### Комиссии Stripe

| Тип операции | Комиссия |
|--------------|----------|
| Онлайн-транзакции | 2.9% + $0.30 |
| Международные карты | +1.5% |
| Конвертация валюты | +1% (US) или +2% (не-US) |
| Instant Payouts | +1% |

**Дополнительные расходы для израильтян:**
- Регистрация LLC: $50-500
- Stripe Atlas: $500 + $100/год
- Delaware Franchise Tax: $300/год (для LLC)
- Registered Agent: ~$100/год

### Лимиты на транзакции

Стандартных лимитов нет, но:
- Новые аккаунты могут иметь временные ограничения
- При высоком объёме транзакций возможен запрос дополнительной верификации
- Custom pricing доступен для высокообъёмных бизнесов

---

## 3. Вывод денег

### Поддерживаемые банки

**Для US LLC:**
- Mercury (рекомендуется для стартапов)
- Brex
- Relay
- Любой US-банк с FDIC-страховкой

**Виртуальные банковские решения:**
- Wise (бывший TransferWise)
- Payoneer

### Важные ограничения Wise + Stripe

Wise работает со Stripe для валют: CAD, CHF, DKK, HKD, HUF, JPY, NOK, NZD, PLN, RON, SEK, SGD, USD, ZAR.

**НЕ работает:** ILS (израильский шекель), AED, AUD, BGN, CNY, CZK

### Сроки вывода

| Метод | Срок |
|-------|------|
| Standard Payout | 2 рабочих дня (US) |
| Instant Payout | Мгновенно (+1% комиссия) |
| Перевод в Израиль (через Wise/Payoneer) | 2-7 рабочих дней |

### Комиссии за вывод

- Stripe Payout (на US-счёт): **бесплатно**
- Wise USD → ILS: **0.5-1%** (mid-market rate)
- Payoneer: **до 2%**

### В какой валюте приходят деньги

1. **На US-счёт:** USD
2. **При переводе в Израиль:** конвертируются в ILS через сервис перевода

**Рекомендуемая схема:**
```
Stripe → Mercury/US Bank (USD) → Wise → Israeli Bank (ILS)
```

---

## 4. Налогообложение

### 4.1 Налоги в США (для US LLC)

#### Delaware Franchise Tax
- **$300/год** для LLC (срок оплаты: 1 июня)

#### Federal Tax
- LLC — pass-through entity (прибыль облагается налогом на уровне владельца)
- Без US-резидентства и physical presence — возможно освобождение от US income tax
- **Form 5472 + Form 1120** — обязательная отчётность для foreign-owned LLC

### 4.2 Налоги в Израиле

#### מע"מ (НДС/VAT)

**Ставка с 1 января 2025:** **18%** (увеличена с 17%)

| Статус | Требования по НДС |
|--------|-------------------|
| עוסק פטור | Не платит и не взимает НДС |
| עוסק מורשה | Платит и взимает 18% НДС |
| חברה בע"מ | Платит и взимает 18% НДС |

#### Лимиты עוסק פטור (2025)

- **Максимальный годовой оборот:** 120,000 ₪
- **Для 2026:** 122,833 ₪

**Кто НЕ может быть עוסק פטור:**
- Врачи, психологи
- Бухгалтеры, налоговые консультанты
- Юристы, архитекторы, инженеры
- Риэлторы, частные детективы

#### מס הכנסה (Подоходный налог)

**Ставки מס הכנסה 2025:**

| Годовой доход (₪) | Ставка |
|-------------------|--------|
| 0 – 84,120 | 10% |
| 84,121 – 120,720 | 14% |
| 120,721 – 193,800 | 20% |
| 193,801 – 269,280 | 31% |
| 269,281 – 721,560 | 35% |
| 721,561 – 1,443,120 | 47% |
| Свыше 1,443,120 | 50% |

**מס יסף (налог на высокие доходы):**
- Доход свыше 721,560 ₪/год: +5% (было 3%, увеличено на 2% в 2025)

#### ביטוח לאומי (Национальное страхование)

**Для עצמאי (самозанятых) 2025:**

| Доля дохода | Ставка (вкл. здравоохранение) |
|-------------|-------------------------------|
| До 60% средней зарплаты (7,522 ₪) | 6.92% |
| Свыше 60% средней зарплаты | 15.79% |

### 4.3 CFC Rules (правила контролируемых иностранных компаний)

Израильские резиденты с долей 10%+ в иностранной компании могут облагаться налогом на нераспределённую прибыль, если:
- Более 50% компании контролируется израильтянами
- Большая часть дохода — пассивная (дивиденды, проценты, роялти)
- Эффективная ставка налога в иностранной юрисдикции ≤15%

### 4.4 Сроки подачи деклараций

| Отчёт | Срок |
|-------|------|
| Годовой отчёт מס הכנסה | 30 апреля (может продлеваться) |
| דו"ח מע"מ (עוסק מורשה) | 15-е число следующего месяца (19-е для онлайн) |
| דו"ח שנתי עוסק פטור | Январь (за предыдущий год) |
| Delaware Franchise Tax | 1 июня |
| IRS Form 5472 | 15 апреля |

### 4.5 Штрафы

| Нарушение | Штраф |
|-----------|-------|
| Просрочка דו"ח מע"מ | От 200 ₪ (даже за 1 день) |
| Недоплата налога >50% | 15% от суммы недоплаты |
| Недоплата >500,000 ₪ | 30% от суммы |
| Неподача регистрации VAT | 1% от недостающего НДС + проценты |
| Просрочка מס הכנסה | 4% годовых + инфляционная разница |

---

## 5. Практические советы

### Лучшие практики от израильских предпринимателей

1. **Разделяйте личные и бизнес-финансы** с первого дня
2. **Используйте Mercury или Relay** как основной US-банк — они интегрируются со Stripe
3. **Wise для конвертации** — лучший курс без скрытых наценок
4. **Ведите учёт в USD**, конвертируйте только при выводе
5. **Наймите бухгалтера**, знакомого с US-Israel налогами (CPA-Dray, Philip Stein & Associates)
6. **Используйте QuickBooks или Xero** для автоматической синхронизации со Stripe

### Частые ошибки

1. **Случайная регистрация на Sales Tax** при открытии LLC — будьте внимательны в формах
2. **Игнорирование Form 5472** — обязательна даже при нулевой прибыли
3. **Неверный выбор штата** — избегайте Калифорнии (высокие налоги)
4. **Использование личного адреса** вместо Registered Agent
5. **Отсутствие налогового планирования** между US и IL
6. **Просрочка Delaware Franchise Tax** — блокировка компании

### Рекомендации по бухгалтерии

1. **Ежемесячно** сверяйте транзакции Stripe с банковскими выписками
2. **Храните все счета** и receipts минимум 7 лет
3. **Выписывайте חשבונית מס** израильским клиентам (требование закона)
4. **Декларируйте весь доход** — и в US, и в Israel
5. **Используйте tax treaty** для избежания двойного налогообложения

---

## 6. Альтернативы Stripe в Израиле

| Сервис | Особенности |
|--------|-------------|
| **Tranzila** | Израильская лицензия, ILS, интеграция с Bit |
| **Cardcom** | Израильская лицензия, конкурентные ставки |
| **PayPal** | Работает напрямую, но высокие комиссии |
| **Payoneer** | Хорош для фриланса, multi-currency |
| **2Checkout** | Международный, но без локализации |

---

## 7. Источники

### Официальные источники

1. [Stripe - How to accept payments in Israel](https://stripe.com/resources/more/payments-in-israel)
2. [Stripe Documentation - Acceptable verification documents](https://docs.stripe.com/acceptable-verification-documents)
3. [Stripe Atlas](https://stripe.com/atlas)
4. [Stripe Atlas - Business taxes](https://stripe.com/guides/atlas/business-taxes)
5. [Israel Tax Authority (Gov.il)](https://www.gov.il/en/departments/israel_tax_authority/govil-landing-page)
6. [Bituach Leumi - Self-employed rates](https://www.btl.gov.il/English%20Homepage/Insurance/Ratesandamount/Pages/Selfemployedperson.aspx)
7. [Bank of Israel - Acquirer licenses](https://www.boi.org.il/en/communication-and-publications/press-releases/the-bank-of-israel-grants-a-license-to-another-new-acquirer-today/)

### Новостные источники

8. [Globes - Stripe struggling to receive Israeli clearing license](https://en.globes.co.il/en/article-stripe-struggling-to-receive-israeli-clearing-license-1001381078)
9. [Globes - Stripe founder visits Israel](https://en.globes.co.il/en/article-stripe-founder-patrick-collisons-israel-visit-stirs-strong-feelings-1001495502)
10. [Times of Israel - VAT and tax hikes 2026](https://www.timesofisrael.com/wave-of-price-rises-and-tax-hikes-takes-effect-fueling-costs-for-israelis-in-2026/)

### Блоги и гиды

11. [Doola - How to open a Stripe account in Israel](https://www.doola.com/stripe-guide/how-to-open-a-stripe-account-in-israel/)
12. [LinkedIn - How to Use Stripe in Israel 2024](https://www.linkedin.com/pulse/how-use-stripe-israel-mazino-oyolo-wn2rf)
13. [Medium - Create Stripe Account in Israel](https://medium.com/@payometrix/how-to-create-a-verified-stripe-account-in-israel-without-ssn-in-2024-bdf0fb8078c8)
14. [OneSafe - Does Stripe Work in Israel](https://www.onesafe.io/blog/does-stripe-work-in-israel)
15. [Persuasion Nation - Is Stripe Available in Israel](https://persuasion-nation.com/is-stripe-available-in-israel/)
16. [HubiFi - Stripe Atlas Guide](https://www.hubifi.com/blog/stripe-atlas-accounting-guide)

### Налоговые источники

17. [PWC Tax Summaries - Israel Individual](https://taxsummaries.pwc.com/israel/individual/taxes-on-personal-income)
18. [PWC Tax Summaries - Israel Corporate](https://taxsummaries.pwc.com/israel/corporate/other-taxes)
19. [Avalara - Israel VAT](https://www.avalara.com/vatlive/en/country-guides/africa-and-middle-east/israel/israel-vat-registration.html)
20. [Nefesh B'Nefesh - US-Israel Tax Update 2025](https://www.nbn.org.il/life-in-israel/finances/taxes/us-tax-compliance/)

### Израильские ресурсы (иврит)

21. [כל-זכות - עוסק פטור](https://www.kolzchut.org.il/he/עוסק_פטור)
22. [Green Invoice - תקרת עוסק פטור 2025](https://www.greeninvoice.co.il/magazine/תקרת-עוסק-פטור/)
23. [Protocol - מדרגות מס הכנסה 2025](https://protocol.co.il/income-tax-rates/)
24. [Hyp - עוסק פטור](https://hyp.co.il/blog/exempt-dealer/)

### Форумы и Q&A

25. [Quora - Can Israeli startup accept Stripe](https://www.quora.com/Can-an-Israeli-startup-accept-Stripe-payments)
26. [Quora - Best payment gateway for Israel business](https://www.quora.com/What-is-the-best-payment-gateway-for-an-Israel-business-to-use)

### Дополнительные источники

27. [Wise - Payoneer in Israel](https://wise.com/gb/blog/payoneer-israel)
28. [Wise - Stripe integration](https://wise.com/help/articles/2977935/how-do-i-receive-money-from-stripe-with-wise)
29. [CWS Israel - 2025 Tax Updates](https://www.cwsisrael.com/2025-latest-updates-to-israeli-taxes-and-deductions/)
30. [Sovos - Israel VAT increase to 18%](https://sovos.com/regulatory-updates/vat/israel-vat-rate-increase-to-18-from-january-1-2025/)

---

## Заключение

**Ключевые выводы:**

1. **Stripe напрямую в Израиле не работает**, но доступен через US LLC
2. **Оптимальный путь:** Stripe Atlas → Delaware/Wyoming LLC → Mercury Bank → Wise → Israeli Bank
3. Необходимо учитывать **налоговые обязательства в обеих странах**
4. **VAT в Израиле с 2025 года — 18%**
5. Следите за новостями — Stripe может официально запуститься в Израиле в ближайшие годы

---

*Отчёт подготовлен: Январь 2025*
*Источники: 30+ проверенных ресурсов*
