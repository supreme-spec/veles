export interface VideoSchemaConfig {
  title: string;
  description: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function generateVideoSchema(config: VideoSchemaConfig): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: config.title,
    description: config.description,
    thumbnailUrl: config.thumbnailUrl || 'https://www.veles-voyage.ru/images/logo.png',
    uploadDate: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.veles-voyage.ru/images/logo.png',
      },
    },
    contentUrl: config.contentUrl || 'https://rutube.ru/u/velesvoyage/',
    embedUrl: config.embedUrl || 'https://rutube.ru/u/velesvoyage/',
  };
}

