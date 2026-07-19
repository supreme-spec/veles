# 🌍 Велес Вояж — Русская энциклопедия туризма

Современная платформа для путешествий и туризма с поддержкой Web3, PWA и комплексной SEO-оптимизацией.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install --legacy-peer-deps

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-версии
npm start
```

## 📁 Структура проекта

```
veles-voyage.ru/
├── src/
│   ├── app/              # Next.js App Router страницы
│   ├── components/       # React компоненты
│   ├── shared/           # Общие утилиты и компоненты
│   │   ├── components/   # Переиспользуемые компоненты
│   │   ├── data/         # Данные для SEO и контента
│   │   ├── hooks/        # Custom React hooks
│   │   ├── providers/    # Context providers
│   │   ├── types/        # TypeScript типы
│   │   └── utils/        # Утилиты
│   └── __tests__/        # Тесты
├── docs/                 # Документация
├── scripts/              # Вспомогательные скрипты
└── public/               # Статические файлы
```

## 🔧 Доступные команды

### Разработка
- `npm run dev` — запуск dev-сервера
- `npm run build` — сборка проекта
- `npm run start` — запуск продакшен-версии
- `npm run lint` — проверка кода линтером
- `npm run lint:fix` — автоматическое исправление ошибок линтера
- `npm run format` — форматирование кода Prettier
- `npm run format:check` — проверка форматирования
- `npm run type-check` — проверка типов TypeScript

### Тестирование
- `npm run test` — запуск тестов
- `npm run test:watch` — запуск тестов в watch-режиме
- `npm run test:coverage` — запуск тестов с покрытием

### Анализ и оптимизация
- `npm run measure` — измерение метрик производительности
- `npm run check-bundle` — проверка размера бандла
- `npm run build:analyze` — детальный анализ бандла
- `npm run analyze` — анализ с переменной окружения ANALYZE

### Очистка
- `npm run clean` — очистка .next директории
- `npm run clean-all` — полная очистка (включая node_modules)
- `npm run fresh` — очистка и запуск dev-сервера
- `npm run fresh-install` — полная переустановка

## 🌐 Переменные окружения

Создайте файл `.env.local` на основе `.env.example`:

```env
# API Keys
CRON_SECRET=your_cron_secret
ADMIN_SECRET_KEY=your_admin_secret
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key

# Мониторинг
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🛠 Технологический стек

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Web3**: Wagmi, RainbowKit, TON Connect
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics, Web Vitals

## 📊 Метрики производительности

Текущие показатели:
- **Файлы с `use client`**: 11 (-84% после оптимизации)
- **Использование `any`**: 292 вхождения (-27%)
- **API endpoints с rate limiting**: 4
- **Тестовое покрытие**: Базовая настройка завершена

Подробнее: [docs/API.md](docs/API.md)

## 📚 Документация

- [API Documentation](docs/API.md) — описание API endpoints

## 🔒 Безопасность

- Rate limiting на всех API endpoints
- Валидация секретов через environment variables
- Security headers в `next.config.js`
- Защита от XSS и CSRF

## 🧪 Тестирование

Проект использует Jest и React Testing Library для тестирования:

```bash
# Запуск всех тестов
npm run test

# Запуск с покрытием
npm run test:coverage
```

## 📈 CI/CD

GitHub Actions workflow настроен для:
- Линтинга и проверки типов
- Запуска тестов
- Сборки проекта
- Автоматического деплоя на Vercel

## 🤝 Контакты

- **Email**: hello@veles-voyage.ru
- **Телефон**: +7 (985) 063-51-34
- **VK**: [veles__voyage](https://vk.com/veles__voyage)
- **Telegram**: [veles_voyage](https://t.me/veles_voyage)

## 📄 Лицензия

Проект является частной собственностью Велес Вояж.

---

**Версия**: 1.0.0  
**Последнее обновление**: 2026

