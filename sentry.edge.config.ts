/**
 * Sentry Edge Configuration
 * 
 * Этот файл инициализирует Sentry для Edge Runtime.
 */

(function initSentryEdge() {
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
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
    
    console.log('[Sentry] Edge initialized');
  } else if (!Sentry) {
    console.log('[Sentry] Edge disabled - @sentry/nextjs not installed');
  } else {
    console.log('[Sentry] Edge disabled - not in production or DSN not set');
  }
})();

