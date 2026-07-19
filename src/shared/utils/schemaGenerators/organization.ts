import type { OrganizationSchema } from '@/shared/types/schema';

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization',
    name: 'Велес Вояж | Экспертная редакция',
    url: 'https://www.veles-voyage.ru/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.veles-voyage.ru/images/logo.png',
    },
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '89850635134',
      contactType: 'customer service',
      email: 'hello@veles-voyage.ru',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Московская область, Одинцовский р-н, Голицыно, Керамиков пр-т, д. 103',
      addressLocality: 'Голицыно',
      postalCode: '143041',
      addressCountry: 'RU',
    },
    sameAs: [
      'https://vk.com/veles__voyage',
      'https://t.me/veles_voyage',
    ],
    priceRange: '₽₽',
    areaServed: { '@type': 'Country', name: 'Russia' },
  };
}

