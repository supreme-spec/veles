import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { allCities } from './all-cities';
import { getCityData } from '@/shared/data/cityCoordinates';
import { SITE_URL } from '@/shared/constants/seo';
import { generateCitySlug } from '@/lib/slugify';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Города вылета — туры из 700+ городов России | Велес Вояж',
  description:
    'Полный список городов вылета Велес Вояж: туры в Турцию, Египет, ОАЭ и Таиланд из Москвы, Санкт-Петербурга и регионов России. Выберите свой город и подберите тур онлайн.',
  alternates: { canonical: `${siteUrl}/cities` },
  robots: { index: true, follow: true },
};

function isRegionEntity(name: string): boolean {
  return (
    /край$|область$|автономный округ|федеральный округ| АО$/.test(name) ||
    name.startsWith('Республика ')
  );
}

// Рендерим хаб на запрос (on-demand): статическая компиляция страницы со
// списком из 700+ ссылок переполняет зону компилятора V8 в воркере сборки
// (как и wiki MDX). Страница остаётся серверно-рендеренной и индексируемой.
export const dynamic = 'force-dynamic';

export default function CitiesHubPage() {
  const regions = allCities.filter(isRegionEntity);
  const cities = allCities.filter((c) => !isRegionEntity(c));

  // Группируем города по реальному региону из координат (хаб-структура вместо
  // плоского списка из 700+ ссылок), остальные — в отдельную группу.
  const groups = new Map<string, string[]>();
  for (const city of cities) {
    const region =
      getCityData(city)?.region ||
      'Другие города России';
    if (!groups.has(region)) groups.set(region, []);
    groups.get(region)!.push(city);
  }
  const sortedGroups = Array.from(groups.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], 'ru')
  );

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Города вылета', item: `${siteUrl}/cities` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Города вылета — Велес Вояж',
    description:
      'Каталог городов вылета Велес Вояж: стыковочные и прямые рейсы в Турцию, Египет, ОАЭ и Таиланд из 700+ городов России.',
    url: `${siteUrl}/cities`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allCities.length,
      itemListElement: allCities.map((city, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: city,
        url: `${siteUrl}/cities/${generateCitySlug(city)}`,
      })),
    },
  };

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2';

  return (
    <>
      <StructuredData schemas={[breadcrumbsSchema, collectionSchema]} />

      {/* Светлый фон страницы (#F9FAFB) — белые карточки контрастно выделяются */}
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Видимые хлебные крошки (Главная / Города) */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">Главная</Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">Города</li>
          </ol>
        </nav>

        {/* Шапка */}
          <header className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
              Вылет из любой точки России
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Города вылета
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 max-w-3xl">
              Как выбрать город вылета? Велес Вояж организует стыковочные и прямые рейсы
              из 700+ городов России — от Москвы и Санкт-Петербурга до региональных аэропортов
              Урала, Сибири и Юга. Выберите свой регион ниже, чтобы увидеть актуальные
              направления, примерное время перелёта и цены на туры.
            </p>
          </header>

          {/* AEO-блок: прямой ответ на вопрос «как выбрать город вылета» */}
          <section className="mb-12 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8" aria-labelledby="choose-city">
            <h2 id="choose-city" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Как выбрать город вылета?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Определитесь с ближайшим аэропортом: для Москвы и Санкт-Петербурга доступны
              прямые рейсы, для остальных регионов мы подбираем удобные стыковки. Откройте
              свой федеральный округ или субъект РФ в списке ниже — на странице города вы
              увидите актуальные направления, примерное время в пути и стартовые цены на туры.
            </p>
          </section>

          {/* Регионы и федеральные округа */}
          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Регионы и федеральные округа
            </h2>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={`/cities/${generateCitySlug(region)}`}
                  className={`inline-flex items-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-sm hover:border-blue-500 hover:text-blue-700 hover:shadow-md transition-all ${focusRing}`}
                >
                  {region}
                </Link>
              ))}
            </div>
          </section>

          {/* Города, сгруппированные по субъекту РФ — каждая группа как белая карточка */}
          {sortedGroups.map(([region, groupCities]) => (
            <section
              key={region}
              className="mb-8 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="h-5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                Туры из городов: {region}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {groupCities
                  .slice()
                  .sort((a, b) => a.localeCompare(b, 'ru'))
                  .map((city) => (
                    <Link
                      key={city}
                      href={`/cities/${generateCitySlug(city)}`}
                      className={`block px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors ${focusRing}`}
                    >
                      {city}
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
