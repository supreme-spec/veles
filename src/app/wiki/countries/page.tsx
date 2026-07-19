import Link from 'next/link';
import { Suspense } from 'react';

import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { countryNamesDictionary } from '@/shared/data/country-names-dictionary';
import {
  CONTINENT_LABELS,
  CONTINENT_ICONS,
  CONTINENT_ORDER,
  normalizeContinentKey,
} from '@/shared/constants/continents';

// Определяем типы для информации о стране и континенте
type CountryInfo = { id: string; name: string; description: string };
type ContinentInfo = { name: string; icon: string; countries: CountryInfo[] };

// Названия и иконки континентов — единый источник правды в @/shared/constants/continents.
// Значение для 'other' (Прочее) задаётся явно для группировки неразмеченных стран.
const continentDisplayInfo: Record<string, { name: string; icon: string }> = {
  ...Object.fromEntries(
    Object.entries(CONTINENT_LABELS).map(([slug, name]) => [slug, { name, icon: CONTINENT_ICONS[slug as keyof typeof CONTINENT_ICONS] }])
  ),
  other: { name: 'Прочее', icon: '🌐' },
};

// Функция для генерации SEO-оптимизированных описаний
function generateCountryDescription(countryId: string, countryName: string): string {
  const specialDescriptions: Record<string, string> = {
    russia: 'Россия: Москва, Санкт-Петербург, достопримечательности, туризм, путеводитель, отдых',
    france: 'Франция: Париж, достопримечательности, виза, цены, туризм, отдых, путеводитель 2026',
    italy: 'Путеводитель по Италии: Рим, Венеция, достопримечательности, виза, цены, туризм 2026',
    spain: 'Отдых в Испании: Барселона, Мадрид, пляжи, виза, цены, туризм, достопримечательности',
    china: 'Китай: Пекин, Великая стена, виза, цены, достопримечательности, туризм 2026',
    thailand: 'Таиланд: Бангкок, пляжи, виза, цены, достопримечательности, отдых, туризм 2026',
    turkey: 'Турция: Стамбул, пляжи, виза, цены, достопримечательности, отдых, туризм 2026',
    usa: 'США: Нью-Йорк, Лос-Анджелес, виза, цены, достопримечательности, туризм 2026',
    egypt: 'Египет: Каир, пирамиды, виза, цены, пляжи, достопримечательности, туризм',
  };

  if (specialDescriptions[countryId]) {
    return specialDescriptions[countryId];
  }

  const templates = [
    `Путеводитель по ${countryName}: достопримечательности, виза, цены, туризм, отдых 2026`,
    `Отдых в ${countryName}: достопримечательности, виза, цены, туризм, путеводитель, туры`,
    `${countryName}: путеводитель, достопримечательности, виза, цены, туризм, отдых, советы`,
  ];
  const hash = countryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (
    templates[hash % templates.length] ||
    `Все о путешествии в ${countryName}: от визы до лучших маршрутов.`
  );
}

// Асинхронный компонент для получения и отображения данных
async function CountriesContent() {
  const wikiPages = await getWikiPages();

  // Динамически группируем страны по континентам
  const continents: Record<string, ContinentInfo> = {};

  Object.values(wikiPages).forEach(page => {
    // Используем 'other' если континент не указан; нормализуем к kebab-case
    const normalizedContinentKey = normalizeContinentKey(page.continent || 'other');

    if (!continents[normalizedContinentKey]) {
      continents[normalizedContinentKey] = {
        name: continentDisplayInfo[normalizedContinentKey]?.name || 'Прочее',
        icon: continentDisplayInfo[normalizedContinentKey]?.icon || '🌐',
        countries: [],
      };
    }

    // Используем словарь для получения корректного имени, а заголовок из файла — как запасной вариант
    const displayName =
      countryNamesDictionary[page.id] || page.title.replace(/ \d{4}.*$/, '').trim();

    continents[normalizedContinentKey].countries.push({
      id: page.id,
      name: displayName,
      description: page.description || generateCountryDescription(page.id, displayName),
    });
  });

  // Сортировка стран внутри каждого континента
  Object.values(continents).forEach(continent => {
    continent.countries.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  });

  // Стабильный порядок континентов (Старый Свет → Новый Свет → Океания, затем «Прочее»)
  const sortedContinentKeys = Object.keys(continents).sort((a, b) => {
    const orderA = CONTINENT_ORDER.indexOf(a as (typeof CONTINENT_ORDER)[number]);
    const orderB = CONTINENT_ORDER.indexOf(b as (typeof CONTINENT_ORDER)[number]);
    const rank = (i: number) => (i === -1 ? Number.MAX_SAFE_INTEGER : i);
    if (rank(orderA) !== rank(orderB)) return rank(orderA) - rank(orderB);
    return (continentDisplayInfo[a]?.name || '').localeCompare(continentDisplayInfo[b]?.name || '', 'ru');
  });

  const totalCount = Object.keys(wikiPages).length;

  const CountryCard = ({ country }: { country: CountryInfo }) => (
    <Link
      href={`/wiki/${country.id}`}
      prefetch={false}
      className="group block border border-gray-200 rounded-xl p-5 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 no-underline"
      style={{ textDecoration: 'none' }}
    >
      <h4 className="text-blue-600 group-hover:text-blue-700 text-lg font-semibold transition-colors duration-200 mb-2">
        {country.name}
      </h4>
      <p className="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-2 mb-3 leading-relaxed">
        {country.description}
      </p>
      <div className="flex items-center text-xs text-gray-500 group-hover:text-blue-600 transition-colors font-medium">
        <span className="mr-1">→</span>
        <span>Подробный путеводитель</span>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 md:pt-20 pb-12">
      <div className="max-w-7xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200 mt-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-3xl font-extrabold">
              <span className="mr-2">🌍</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
                Страны мира
              </span>
            </h1>
            <Link
              href="/wiki"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-base transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              📚 Исследовать Wiki
            </Link>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📚</span>
              <p className="text-blue-900 font-bold text-lg">
                Всего стран в путеводителе:{' '}
                <span className="text-blue-600 text-xl">{totalCount}</span>
              </p>
            </div>
            <p className="text-blue-700 text-sm ml-9">
              Выберите страну для просмотра подробного путеводителя с актуальной информацией на 2026
              год.
            </p>
          </div>
        </div>

        {totalCount === 0 && (
          <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl">
            <h3 className="text-xl font-bold text-red-700 mb-2">Страны не найдены</h3>
            <p className="text-red-600">
              Не удалось загрузить данные о странах. Пожалуйста, проверьте логи сервера для
              диагностики.
              <br />
              Ожидаемый путь к данным: {process.cwd()}/src/content/countries
            </p>
          </div>
        )}

        {sortedContinentKeys.map(continentKey => {
          const continent = continents[continentKey];
          if (!continent) return null;

          // Use a consistent ID for the HTML element that matches display expectations
          const continentId = continentKey;

          return (
            <div key={continentKey} className="mb-10 scroll-mt-24" id={continentId}>
              <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md mb-6 sticky top-20 z-10">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{continent.icon}</span>
                  <span>{continent.name}</span>
                  <span className="ml-auto bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-lg font-semibold">
                    {continent.countries.length}
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {continent.countries.map(country => (
                  <CountryCard key={`${continentKey}-${country.id}`} country={country} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-8 text-center">
          <Link
            href="/wiki"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400"
          >
            <span>←</span>
            <span>Вернуться к разделам Wiki</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Основной компонент страницы
export default function CountriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 md:pt-20 pb-12">
          <div className="max-w-7xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200 mt-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка стран...</p>
            </div>
          </div>
        </div>
      }
    >
      <CountriesContent />
    </Suspense>
  );
}
