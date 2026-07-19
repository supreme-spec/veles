/**
 * Sentry Server Configuration
 * 
 * Этот файл инициализирует Sentry на сервере.
 */

(function initSentryServer() {
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
      tracesSampleRate: 0.1, // 10% транзакций
      
      // Настройки окружения
      environment: process.env.NODE_ENV,
      
      // Игнорируемые ошибки
      ignoreErrors: [
        'TON_CONNECT_SDK_ERROR',
        'Operation aborted',
      ],
      
      // Фильтрация событий
      beforeSend(event: unknown, hint: unknown) {
        const eventObj = event as { exception?: unknown };
        const hintObj = hint as { originalException?: unknown };
        if (eventObj.exception) {
          const error = hintObj.originalException;
          if (error instanceof Error) {
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
    });
    
    console.log('[Sentry] Server initialized');
  } else if (!Sentry) {
    console.log('[Sentry] Server disabled - @sentry/nextjs not installed');
  } else {
    console.log('[Sentry] Server disabled - not in production or DSN not set');
  }
})();

