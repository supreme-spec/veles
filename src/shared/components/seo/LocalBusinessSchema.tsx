import React from 'react';

interface LocalBusinessSchemaProps {
  includeBusiness?: boolean;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ 
  includeBusiness = true 
}) => {
  if (!includeBusiness) return null;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://www.veles-voyage.ru/#business",
    "name": "Велес Вояж",
    "url": "https://www.veles-voyage.ru",
    "description": "Туристическое агентство и энциклопедия путешествий с поддержкой Web3 технологий",
    "telephone": "+7-985-063-51-34",
    "email": "hello@veles-voyage.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Керамиков пр-т, д. 103",
      "addressLocality": "Голицыно",
      "addressRegion": "Московская область",
      "postalCode": "143041",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.5833,
      "longitude": 36.9833
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://vk.com/veles__voyage",
      "https://t.me/veles_voyage",
      "https://rutube.ru/u/velesvoyage/"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 55.7558,
        "longitude": 37.6176
      },
      "geoRadius": "10000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Туристические услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Путеводители по странам мира"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Консультации по путешествиям"
          }
        }
      ]
    },
    "additionalType": [
      "https://schema.org/OnlineBusiness",
      "https://schema.org/WebApplication"
    ],
    "knowsAbout": [
      "Путешествия",
      "Туризм", 
      "Страны мира",
      "Визы",
      "Web3 технологии",
      "Блокчейн путешествия"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema, null, 2) }}
    />
  );
};