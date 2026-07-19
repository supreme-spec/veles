export function generateGlobalSearchSchema(name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    alternateName: [
      { '@value': name, '@language': 'en' },
      { '@value': name, '@language': 'zh' },
      { '@value': name, '@language': 'de' },
    ],
    description: `Информация о ${name} для глобального поиска на разных языках.`,
    url: `https://www.veles-voyage.ru/wiki/${name.toLowerCase()}`,
  };
}

