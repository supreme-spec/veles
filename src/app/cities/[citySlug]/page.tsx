import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';
import { generateEnhancedSEOMetadata, generatePageBreadcrumbs } from '@/lib/seo/unifiedSEO';
import { allCities } from '../all-cities';
import { DEPARTURE_CITIES_DATA } from '@/shared/data/departureCitiesData';
import { CITY_COORDINATES } from '@/shared/data/cityCoordinates';
import { SITE_URL, CONTACT_PHONE, SOCIAL_LINKS } from '@/shared/constants/seo';
import { HeroImage } from '@/components/HeroImage';
import { generateCitySlug } from '@/lib/slugify';

const siteUrl = SITE_URL;

function findCityBySlug(slug: string) {
  const decoded = decodeURIComponent(slug);
  const normalized = generateCitySlug(decoded);
  return allCities.find((c) => generateCitySlug(c) === normalized) || null;
}

export async function generateStaticParams() {
  return allCities.map((city) => ({ citySlug: generateCitySlug(city) }));
}

export const dynamicParams = true;
export const revalidate = 86400;

function getCityCoordinates(cityName: string) {
  const key = cityName.toLowerCase();
  const direct = CITY_COORDINATES[key as keyof typeof CITY_COORDINATES];
  if (direct) return direct;
  const normalizedKey = key.replace(/\s+/g, '-').replace(/ё/g, 'е');
  return CITY_COORDINATES[normalizedKey as keyof typeof CITY_COORDINATES] || null;
}

const REGION_SHORT_NAMES = [
  'Адыгея', 'Алтай', 'Бурятия', 'Ингушетия', 'Калмыкия', 'Карачаево-Черкесия',
  'Саха', 'Северная Осетия', 'Тыва', 'Хакасия', 'Чечня',
];

function isRegionEntity(name: string): boolean {
  return (
    /край$|область$|автономный округ|федеральный округ| АО$/.test(name) ||
    name.startsWith('Республика ') ||
    REGION_SHORT_NAMES.includes(name)
  );
}

function extractIataCode(airportString: string): string | null {
  const match = airportString.match(/\(([A-Z]{3})\)/);
  return match?.[1] ?? null;
}

const REQUEST_PHRASE = 'по запросу';
const priceText = (v?: string) => (v ? `от ${v} ₽` : REQUEST_PHRASE);

const DEST_COORDS = {
  turkey: { lat: 36.8969, lon: 30.7133 },
  egypt: { lat: 27.2579, lon: 33.7960 },
  uae: { lat: 25.2048, lon: 55.2708 },
} as const;

type DestKey = keyof typeof DEST_COORDS;

function haversineKm(
  lat1: number, lon1: number, lat2: number, lon2: number
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateFlightHours(
  coords: { latitude: number; longitude: number },
  dest: DestKey
): number | null {
  const d = haversineKm(coords.latitude, coords.longitude, DEST_COORDS[dest].lat, DEST_COORDS[dest].lon);
  if (!d) return null;
  return Math.max(1, Math.round(d / 800 + 1.5));
}

function findNearestAirport(coords: { latitude: number; longitude: number }) {
  if (!coords) return null;
  const { RUSSIAN_AIRPORTS } = require('@/shared/data/russianAirports');
  return (RUSSIAN_AIRPORTS as Array<{ name: string; iata?: string; latitude: number; longitude: number }>)
    .map((a) => ({
      ...a,
      distanceKm: haversineKm(coords.latitude, coords.longitude, a.latitude, a.longitude)
    }))
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm)[0] || null;
}

type FAQ = { question: string; answer: string };

function generateDepartureFAQs(
  cityName: string,
  airportName: string,
  isRegion: boolean,
  hasRealAirport: boolean,
  cityCoords?: { latitude: number; longitude: number } | null
): FAQ[] {
  const base: FAQ[] = isRegion
    ? [
        {
          question: `Откуда вылетают туры из ${cityName}?`,
          answer: `Мы подбираем вылеты из аэропортов ${cityName}. Точки вылета и актуальное расписание рейсов уточняйте у менеджера — подберём ближайший удобный аэропорт.`,
        },
        {
          question: `Какие направления доступны из ${cityName}?`,
          answer: `Из региона доступны туры в Турцию, Египет, ОАЭ и Таиланд, а также другие популярные страны. Точный список и цены зависят от сезона.`,
        },
        {
          question: `За сколько дней лучше бронировать тур?`,
          answer: `Для получения лучшей цены рекомендуем бронировать за 2-3 месяца до вылета. Горящие предложения появляются за 3-7 дней до даты вылета.`,
        },
      ]
    : [
        {
          question: `Есть ли прямые рейсы из ${cityName}?`,
          answer: `Да, из аэропорта ${airportName} выполняются прямые регулярные и чартерные рейсы в популярные страны. Время перелета зависит от направления и составляет от 3 до 7 часов.`,
        },
        {
          question: `Сколько стоят горящие туры из ${cityName}?`,
          answer: `Стоимость горящих туров начинается от 35 000 рублей на человека. Цена зависит от сезона, звездности отеля и даты вылета. Мы подберем лучший вариант под ваш бюджет.`,
        },
        {
          question: `За сколько дней лучше бронировать тур?`,
          answer: `Для получения лучшей цены рекомендуем бронировать за 2-3 месяца до вылета. Горящие предложения появляются за 3-7 дней до даты вылета из ${airportName}.`,
        },
      ];

  if (!isRegion && hasRealAirport) {
    base.push({
      question: `Из какого аэропорта вылетают туры из ${cityName}?`,
      answer: `Вылеты организуются из аэропорта ${airportName}. Наши менеджеры подскажут, как добраться до терминала, и помогут с трансфером.`,
    });
  }

  if (!isRegion && !hasRealAirport && cityCoords) {
    const nearest = findNearestAirport(cityCoords);
    if (nearest) {
      base.push({
        question: `Какой аэропорт ближайший к ${cityName}?`,
        answer: `Ближайший гражданский аэропорт к ${cityName} — ${nearest.name} (${nearest.iata}), примерно в ${Math.round(nearest.distanceKm)} км. Точные рейсы и расписание уточняйте у менеджера.`,
      });
    }
  }

  return base;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const cityName = findCityBySlug(citySlug);

  if (!cityName) {
    return generateEnhancedSEOMetadata({
      title: 'Город вылета не найден | Велес Вояж',
      description: 'Запрошенный город вылета не найден в базе.',
      url: `${siteUrl}/cities/${citySlug}`,
      noIndex: true,
    });
  }

  const isRegion = isRegionEntity(cityName);
  const cityData = DEPARTURE_CITIES_DATA[cityName.toLowerCase()];
  const hasRealAirport = !!cityData?.airport;
  const airportLabel = cityData?.airport || (isRegion ? cityName : `аэропорт г. ${cityName}`);
  const cityCoords = getCityCoordinates(cityName);
  const description = isRegion
    ? `Горящие туры из ${cityName}. Подбор путевок в Турцию, Египет, ОАЭ и Таиланд. Цены от 35 000 ₽, онлайн-бронирование, поддержка 24/7.`
    : `Горящие туры из ${cityName} с вылетом из ${airportLabel}. Подбор путевок в Турцию, Египет, ОАЭ и Таиланд. Цены от 35 000 ₽, онлайн-бронирование, поддержка 24/7.`;

  return generateEnhancedSEOMetadata({
    title: isRegion
      ? `Туры по направлению ${cityName} — Турция, Египет, ОАЭ 2026 | Велес Вояж`
      : `Туры из ${cityName} в Турцию, Египет и ОАЭ 2026 | Велес Вояж`,
    description,
    url: `${siteUrl}/cities/${generateCitySlug(cityName)}`,
    type: 'website',
    keywords: [`туры из ${cityName}`, `горящие туры из ${cityName}`, `путевки ${cityName} Турция Египет`, `вылеты из ${cityName}`],
    faqs: generateDepartureFAQs(cityName, airportLabel, isRegion, hasRealAirport, cityCoords),
  });
}

export default async function CityDeparturePage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const cityName = findCityBySlug(citySlug);

  if (!cityName) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Город вылета не найден</h1>
        <Link href="/cities" className="text-blue-600 hover:underline">← Выбрать другой город</Link>
      </div>
    );
  }

  const slug = generateCitySlug(cityName);
  const isRegion = isRegionEntity(cityName);
  const cityData = DEPARTURE_CITIES_DATA[cityName.toLowerCase()];
  const hasRealAirport = !!cityData?.airport;
  const airportLabel = cityData?.airport || (isRegion ? cityName : `аэропорт г. ${cityName}`);
  const iataCode = hasRealAirport ? extractIataCode(airportLabel) : null;
  const cityCoords = getCityCoordinates(cityName);
  const nearestAirport = !hasRealAirport && cityCoords ? findNearestAirport(cityCoords) : null;

  const flightText = (v?: string, dest?: DestKey) => {
    if (v) return `~${v} ч. (прямой)`;
    if (cityCoords && dest) {
      const h = estimateFlightHours(cityCoords, dest);
      if (h) return `≈${h} ч. (по координатам)`;
    }
    return REQUEST_PHRASE;
  };

  const touristDestinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: `Туры из ${cityName}`,
    description: isRegion
      ? `Подбор и бронирование туров по направлению ${cityName}.`
      : `Подбор и бронирование туров с вылетом из ${airportLabel}.`,
    url: `${siteUrl}/cities/${slug}`,
    geo: cityCoords ? {
      '@type': 'GeoCoordinates',
      latitude: cityCoords.latitude,
      longitude: cityCoords.longitude
    } : undefined,
    address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: 'RU' },
    touristType: ['Туристы', 'Семьи с детьми', 'Романтические пары'],
    containsPlace: isRegion
      ? { '@type': 'AdministrativeArea', name: cityName }
      : { '@type': 'City', name: cityName }
  };

  const offerItems = [
    { country: 'Турция', price: cityData?.prices?.turkey },
    { country: 'Египет', price: cityData?.prices?.egypt },
    { country: 'ОАЭ', price: cityData?.prices?.uae },
  ].filter((o) => !!o.price);

  const offerCatalogSchema = offerItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: `Туры из ${cityName}`,
        itemListElement: offerItems.map((o) => ({
          '@type': 'Offer',
          name: `Тур в ${o.country} из ${cityName}`,
          price: String(o.price).replace(/\s/g, ''),
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/cities/${slug}`
        }))
      }
    : null;

  const heroImage = cityCoords
    ? `https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200&q=80&auto=format&fit=crop`
    : `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&auto=format&fit=crop`;

  const { items: breadcrumbItems, schema: breadcrumbSchema } = generatePageBreadcrumbs(`/cities/${slug}`, cityName);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: `Велес Вояж - офис подбора туров${isRegion ? '' : ` из ${cityName}`}`,
      description: isRegion
        ? `Подбор и бронирование туров по направлению ${cityName}.`
        : `Подбор и бронирование туров с вылетом из ${airportLabel}.`,
      areaServed: isRegion
        ? { '@type': 'AdministrativeArea', name: cityName }
        : { '@type': 'City', name: cityName },
      geo: cityCoords ? {
        '@type': 'GeoCoordinates',
        latitude: cityCoords.latitude,
        longitude: cityCoords.longitude
      } : undefined,
      address: cityCoords ? {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressRegion: cityCoords.region,
        addressCountry: 'RU'
      } : undefined,
      knowsAbout: ['Турция', 'Египет', 'ОАЭ', 'Таиланд', 'Международные туры']
    },
    touristDestinationSchema,
    ...(hasRealAirport ? [
      {
        '@context': 'https://schema.org',
        '@type': 'Airport',
        name: airportLabel,
        iataCode: iataCode || undefined,
        geo: cityCoords ? {
          '@type': 'GeoCoordinates',
          latitude: cityCoords.latitude,
          longitude: cityCoords.longitude
        } : undefined,
        address: cityCoords ? {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressRegion: cityCoords.region,
          addressCountry: 'RU'
        } : undefined
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Flight',
        departureAirport: {
          '@type': 'Airport',
          name: airportLabel,
          iataCode: iataCode || undefined
        },
        arrivalAirport: {
          '@type': 'Airport',
          name: 'Анталья (AYT)'
        },
        flightDistance: (() => {
          if (cityData?.flightTimes?.turkey) {
            return `${Math.round(parseFloat(cityData.flightTimes.turkey) * 850)} км`;
          }
          if (cityCoords) {
            return `${Math.round(haversineKm(cityCoords.latitude, cityCoords.longitude, DEST_COORDS.turkey.lat, DEST_COORDS.turkey.lon))} км`;
          }
          return undefined;
        })()
      }
    ] : []),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: generateDepartureFAQs(cityName, airportLabel, isRegion, hasRealAirport, cityCoords).map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    },
    ...(offerCatalogSchema ? [offerCatalogSchema] : []),
    {
      '@context': 'https://schema.org',
      '@type': 'SpeakableSpecification',
      xpath: ['/html/body//h1', '/html/body//p[1]']
    },
  ].filter(Boolean);

  return (
    <>
      <StructuredData schemas={schemas} />
      <StructuredData schemas={[breadcrumbSchema]} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-5xl pt-6 md:pt-8">
          <Breadcrumbs items={breadcrumbItems} disableSchema />

          {/* Hero image */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <HeroImage
              src={heroImage}
              alt={`${cityName} — архитектура, достопримечательности и туристические объекты`}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                {isRegion ? `Туры по направлению ${cityName}` : `Туры из ${cityName}`}
              </h1>
              <p className="text-white/90 mt-2 text-lg">Турция, Египет, ОАЭ, Таиланд и другие направления</p>
            </div>
          </div>

          {/* Speakable summary */}
          <div id="speakable-summary" className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">Быстрые факты о вылетах из {cityName}</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Аэропорт:</strong> {airportLabel}{nearestAirport ? ` (ближайший: ${nearestAirport.name}, ${Math.round(nearestAirport.distanceKm)} км)` : ''}</li>
              <li><strong>До Антальи:</strong> {flightText(cityData?.flightTimes?.turkey, 'turkey')}</li>
              <li><strong>До Хургады:</strong> {flightText(cityData?.flightTimes?.egypt, 'egypt')}</li>
              <li><strong>До Дубая:</strong> {flightText(cityData?.flightTimes?.uae, 'uae')}</li>
              <li><strong>Цены от:</strong> {priceText(cityData?.prices?.turkey)}</li>
            </ul>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            {isRegion
              ? `Подбираем выгодные путевки по направлению ${cityName}. Вылеты из ближайших аэропортов, прямые чартерные и регулярные рейсы, проверенные отели, трансфер и страховка включены.`
              : `Подбираем выгодные путевки с вылетом из ${airportLabel}. Прямые чартерные и регулярные рейсы, проверенные отели, трансфер и страховка включены.`}
          </p>

          {/* Flight info */}
          <div className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              ✈️ Особенности вылетов из {cityName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">Аэропорт вылета</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">{airportLabel}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">До Антальи (Турция)</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">{flightText(cityData?.flightTimes?.turkey, 'turkey')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">До Хургады (Египет)</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">{flightText(cityData?.flightTimes?.egypt, 'egypt')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">До Дубая (ОАЭ)</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">{flightText(cityData?.flightTimes?.uae, 'uae')}</p>
              </div>
            </div>
          </div>

          {/* Popular destinations */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { country: 'Турция', price: priceText(cityData?.prices?.turkey), icon: '🇹🇷' },
              { country: 'Египет', price: priceText(cityData?.prices?.egypt), icon: '🇪🇬' },
              { country: 'ОАЭ', price: priceText(cityData?.prices?.uae), icon: '🇦🇪' }
            ].map((dest) => (
              <div key={dest.country} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{dest.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Туры в {dest.country} из {cityName}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  Регулярные и чартерные вылеты из {airportLabel}. Все включено, лучшие отели.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{dest.price}</span>
                  <Link href={`/tours?from=${slug}&to=${dest.country.toLowerCase()}`}                   className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Найти тур →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Частые вопросы о турах из {cityName}</h2>
            <div className="space-y-4">
              {generateDepartureFAQs(cityName, airportLabel, isRegion, hasRealAirport, cityCoords).map((faq, idx) => (
                <details key={idx} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 open:ring-2 open:ring-blue-100 transition">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-gray-900 dark:text-gray-100">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-300 mt-3 group-open:animate-fadeIn">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/cities" className="flex-1 text-center px-6 py-3 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              ← Выбрать другой город вылета
            </Link>
            <Link href="/wiki/russia" className="flex-1 text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Путеводитель по России →
            </Link>
            <Link href={`/tours?from=${slug}`} className="flex-1 text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Подобрать тур из {cityName} →
            </Link>
          </div>

          {/* Контакты — реальные данные из констант проекта */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 font-semibold rounded-xl transition-colors text-center"
            >
              📞 Позвонить: {CONTACT_PHONE}
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors text-center"
            >
              ✈️ Написать в Telegram
            </a>
          </div>

          {/* Nearby cities */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Туры из других городов России</h3>
            <div className="flex flex-wrap gap-3">
              {['moskva', 'sankt-peterburg', 'kazan', 'ekaterinburg', 'novosibirsk']
                .map((nearbySlug) => {
                  const nearbyCity = allCities.find(c => generateCitySlug(c) === nearbySlug);
                  if (!nearbyCity) return null;
                  return (
                    <Link
                      key={nearbySlug}
                      href={`/cities/${generateCitySlug(nearbyCity)}`}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 transition text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      {nearbyCity} →
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
