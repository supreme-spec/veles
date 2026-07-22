import { SITE_URL } from '@/shared/constants/seo';
import { generateFAQSchema } from '@/shared/utils/schemaGenerators/faq';
import { generateBreadcrumbSchema } from '@/shared/utils/schemaGenerators/breadcrumb';
import { generateSpeakableSchema } from '@/shared/utils/schemaGenerators/speakable';
import { generateOrganizationSchema } from '@/shared/utils/schemaGenerators/organization';
import { generateTravelAgencySchema } from '@/lib/seo/unifiedSEO';

export interface PageSchemaOptions {
  url: string;
  title: string;
  description: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  isDestination?: boolean;
  destinationName?: string;
  destinationGeo?: { latitude: number; longitude: number };
  offers?: Array<{
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
  }>;
  trips?: Array<{
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
    touristType?: string[];
  }>;
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    ratingValue?: string;
    itemReviewed?: string;
  }>;
  speakableSelectors?: string[];
}

export function generatePageSchemas(options: PageSchemaOptions) {
  const {
    url,
    title,
    description,
    breadcrumbs,
    faqs,
    isDestination,
    destinationName,
    destinationGeo,
    offers,
    trips,
    reviews,
  } = options;

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const schemas: any[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: title,
    url: SITE_URL,
    description,
    inLanguage: 'ru-RU',
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж',
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/wiki/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  schemas.push(generateOrganizationSchema());

  schemas.push(generateTravelAgencySchema({
    name: 'Велес Вояж',
    description,
    url: SITE_URL,
  }));

  if (breadcrumbs && breadcrumbs.length >= 2) {
    schemas.push(generateBreadcrumbSchema(options.url, breadcrumbs.map(b => ({ name: b.name, url: b.item }))));
  }

  schemas.push(generateSpeakableSchema(options.url));

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  if (isDestination && destinationName) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: destinationName,
      description,
      url: fullUrl,
      ...(destinationGeo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: destinationGeo.latitude,
          longitude: destinationGeo.longitude,
        },
      }),
      touristType: ['Туристы', 'Семьи с детьми', 'Романтические пары'],
    });
  }

  if (offers && offers.length > 0) {
    offers.forEach((offer) => {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        price: offer.price || 'по запросу',
        priceCurrency: offer.priceCurrency || 'RUB',
        availability: offer.availability || 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Велес Вояж',
          '@id': `${SITE_URL}/#organization`,
        },
        url: fullUrl,
      });
    });
  }

  if (trips && trips.length > 0) {
    trips.forEach((trip) => {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: trip.name,
        description: trip.description,
        ...(trip.price && {
          offers: {
            '@type': 'Offer',
            priceCurrency: trip.priceCurrency || 'RUB',
            price: trip.price,
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Велес Вояж',
              '@id': `${SITE_URL}/#organization`,
            },
          },
        }),
        ...(trip.touristType && trip.touristType.length > 0 && { touristType: trip.touristType }),
      });
    });
  }

  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => {
      const val = parseFloat(r.ratingValue || '5');
      return sum + (isNaN(val) ? 5 : val);
    }, 0) / reviews.length;

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${SITE_URL}/#organization`,
      name: 'Велес Вояж',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviews.length.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      review: reviews.map((r) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: r.author,
        },
        datePublished: r.datePublished,
        reviewBody: r.reviewBody,
        ...(r.ratingValue && {
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.ratingValue,
            bestRating: '5',
            worstRating: '1',
          },
        }),
        ...(r.itemReviewed && {
          itemReviewed: {
            '@type': 'TouristTrip',
            name: r.itemReviewed,
          },
        }),
      })),
    });
  }

  return schemas;
}

export function getDefaultPageSchemas(url: string, title: string, description: string) {
  return generatePageSchemas({
    url,
    title,
    description,
    breadcrumbs: [
      { name: 'Главная', item: '/' },
      { name: title, item: url },
    ],
    faqs: [],
    isDestination: false,
    offers: [],
    trips: [],
    reviews: [],
  });
}
