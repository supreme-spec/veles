import type { SpeakableSpecification } from '@/shared/types/schema';

export function generateSpeakableSchema(url: string): { '@context': string; '@type': string; url: string; speakable: SpeakableSpecification } {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: [
        '/html/body//h1',
        '/html/body//h2[1]',
        '/html/body//p[1]',
      ],
    },
  };
}

