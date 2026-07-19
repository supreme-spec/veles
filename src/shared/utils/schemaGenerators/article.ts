import type { ArticleSchema } from '@/shared/types/schema';

export interface ArticleSchemaConfig {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function generateArticleSchema(config: ArticleSchemaConfig): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image || 'https://www.veles-voyage.ru/images/logo.png',
    datePublished: config.datePublished || new Date().toISOString(),
    dateModified: config.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: config.author || 'Велес Вояж | Экспертная редакция',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.veles-voyage.ru/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url,
    },
    inLanguage: 'ru-RU',
  };
}

