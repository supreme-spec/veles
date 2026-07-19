import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },
      // Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },
      // Retrieval-боты ИИ (разрешаем для цитирования в реальном времени)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // Обучающие боты ИИ (разрешаем для GEO/AEO)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Rules for web3 crawlers
      {
        userAgent: 'ipfs',
        allow: '/',
      },
      {
        userAgent: 'ipld',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https?:\/\//, '')
  };
}