/**
 * Sentry Client Configuration
 * 
 * Этот файл инициализирует Sentry на клиенте.
 * Для полной настройки:
 * 1. npm install @sentry/nextjs
 * 2. npx @sentry/wizard@latest -i nextjs
 * 3. Добавьте NEXT_PUBLIC_SENTRY_DSN в .env.local
 */

(function initSentryClient() {
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const SENTRY_ENABLED = process.env.NODE_ENV === 'production' && !!SENTRY_DSN;

  // Условный импорт Sentry (если установлен)
  // @ts-expect-error - Sentry может быть не установлен, это нормально
  let Sentry: typeof import('@sentry/nextjs') | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Sentry = require('@sentry/nextjs');
  } catch {
    // Sentry не установлен - это нормально для разработки
  }

  if (SENTRY_ENABLED && SENTRY_DSN && Sentry) {
    Sentry.init({
      dsn: SENTRY_DSN,
      
      // Настройки производительности
      tracesSampleRate: 0.1, // 10% транзакций для мониторинга производительности
      
      // Настройки окружения
      environment: process.env.NODE_ENV,
      
      // Игнорируемые ошибки
      ignoreErrors: [
        // TON Connect ошибки (известные проблемы SDK)
        'TON_CONNECT_SDK_ERROR',
        'Operation aborted',
        // Браузерные ошибки
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
      ],
      
      // Фильтрация событий
      beforeSend(event: unknown, hint: unknown) {
        // Фильтруем известные проблемы
        const eventObj = event as { exception?: unknown };
        const hintObj = hint as { originalException?: unknown };
        if (eventObj.exception) {
          const error = hintObj.originalException;
          if (error instanceof Error) {
            // Игнорируем TON Connect ошибки
            if (error.message?.includes('TON_CONNECT_SDK_ERROR') || 
                error.message?.includes('Operation aborted')) {
              return null;
            }
          }
        }
        
        return event;
      },
      
      // Настройки релиза
      release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      
      // Интеграции
      integrations: [
        new Sentry.BrowserTracing({
          // Трассировка навигации
          tracePropagationTargets: ['localhost', /^https:\/\/veles-voyage\.ru/],
        }),
      ],
    });
    
    console.log('[Sentry] Client initialized');
  } else if (!Sentry) {
    console.log('[Sentry] Client disabled - @sentry/nextjs not installed');
  } else {
    console.log('[Sentry] Client disabled - not in production or DSN not set');
  }
})();

