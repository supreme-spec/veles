import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  InfoBlock,
  FeatureGrid,
  FeatureItem,
  Highlight,
  ResponsiveTable,
  PriceList,
  PriceItem,
  SocialLinks,
  StepList,
  StepItem,
  WikiHero,
  MdxImage,
  H1,
  H2,
  H3,
} from '@/components/mdx/MdxComponents';
import { countryNamesDictionary } from '@/shared/data/country-names-dictionary';
import { generateCountrySEOMetadata } from '@/shared/utils/generateCountrySEOMetadata';
import { generateUniversalMetadata, generateUniversalSchemas } from '@/lib/seo/universalSEO';
import { isDisputedTerritory, getPoliticalStatus, getPoliticalStatusNote } from '@/shared/constants/disputedTerritories';
import { SchemaScripts } from '@/components/SchemaScripts';
import { ZkpBadge } from '@/components/ZkpTrustBadge';
import InteractiveMap from '@/components/mdx/InteractiveMap';
// Заглушка для CountryMap компонента
const CountryMap = ({ countryName, countryId: _countryId, coordinates: _coordinates }: any) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
    <div className="flex items-center">
      <span className="text-2xl mr-3">🗺️</span>
      <div>
        <p className="font-medium text-blue-800">Карта {countryName}</p>
        <p className="text-sm text-blue-600">
          Интерактивная карта будет добавлена в следующем обновлении
        </p>
      </div>
    </div>
  </div>
);

// Рендерим страны на запрос (on-demand), а не пререндерим все 217 MDX-гайдов
// на этапе сборки: статическая компиляция next-mdx-remote/rsc для сотен страниц
// переполняет зону компилятора V8 в воркере сборки и обрывает `next build`.
// SEO сохраняется — страницы отдаются сервером и индексируются.
export const dynamic = 'force-dynamic';

// Translation dictionary removed as it is no longer used for image searching fallbacks.

// Local components removed in favor of shared ones from MdxComponents.tsx

// Компоненты, доступные в MDX
const components = {
  InfoBlock,
  FeatureGrid,
  FeatureItem,
  Highlight,
  ResponsiveTable,
  PriceList,
  PriceItem,
  SocialLinks,
  CountryMap,
  InteractiveMap,
  WikiHero,
  MdxImage,
  StepList,
  StepItem,
  H1,
  H2,
  H3,
  h1: H1,
  h2: H2,
  h3: H3,
  a: (props: any) => <Link {...props} className="text-blue-600 hover:underline" />,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();

  try {
    // Сначала пробуем использовать существующую функцию генерации метаданных
    const metadata = await generateCountrySEOMetadata({
      countryId: normalizedCountry,
      url: `https://www.veles-voyage.ru/wiki/${normalizedCountry}`,
    });

    return metadata;
  } catch (error) {
    console.error(`Error generating SEO metadata for ${normalizedCountry}:`, error);

    // Возвращаем базовые метаданные в случае ошибки
    try {
      const filePath = path.join(process.cwd(), 'src', 'content', 'countries', `${normalizedCountry}.mdx`);
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      return await generateUniversalMetadata({
        title: frontmatter.title || `${normalizedCountry} - путеводитель | Велес Вояж`,
        description: frontmatter.description || `Подробный путеводитель по ${normalizedCountry}`,
        url: `/wiki/${normalizedCountry}`,
        image: frontmatter.image,
        keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
        type: 'country',
        geo: {
          latitude: frontmatter.latitude || 0,
          longitude: frontmatter.longitude || 0,
        },
        publishedTime: frontmatter.datePublished,
        modifiedTime: frontmatter.dateModified,
        author: frontmatter.author,
      });
    } catch (innerError) {
      console.error(`Fallback metadata failed for ${normalizedCountry}:`, innerError);
      return await generateUniversalMetadata({
        title: `${normalizedCountry} - путеводитель | Велес Вояж`,
        description: `Подробный путеводитель по ${normalizedCountry}`,
        url: `/wiki/${normalizedCountry}`,
      });
    }
  }
}

export async function generateStaticParams() {
  try {
    const countriesDir = path.join(process.cwd(), 'src', 'content', 'countries');
    if (!fs.existsSync(countriesDir)) return [];

    const files = fs.readdirSync(countriesDir);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        country: file.replace('.mdx', ''),
      }));
  } catch (error) {
    console.error('[Wiki] Error generating static params:', error);
    return [];
  }
}

async function getCountryContent(country: string) {
  // Исключаем специальные маршруты
  const excludedRoutes = ['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'];

  const normalizedCountry = country.toLowerCase();

  if (excludedRoutes.includes(normalizedCountry)) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'countries', `${normalizedCountry}.mdx`);
    console.log(`[Wiki] Attempting to load MDX: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.warn(`[Wiki] MDX file not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: rawContent } = matter(fileContent);

    // Try MDX compilation with components
    try {
      const strippedContent = rawContent.replace(/<div id="faq"[\s\S]*?(?=<hr|$)/, '');
      const { content: compiledContent } = await compileMDX({
        source: strippedContent,
        options: { 
          parseFrontmatter: false,
          mdxOptions: {
            rehypePlugins: [
              rehypeRaw,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        },
        components,
      });
      return { frontmatter, content: compiledContent };
    } catch (compilationError) {
      console.error(`[Wiki] MDX compilation failed for ${normalizedCountry}:`, compilationError);
      // Fallback to raw content wrapped in a div if compilation fails
      return {
        frontmatter,
        content: <div dangerouslySetInnerHTML={{ __html: rawContent }} />
      };
    }
  } catch (error) {
    console.error(`[Wiki] Error loading content for ${normalizedCountry}:`, error);
    return null;
  }
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();
  const countryData = await getCountryContent(normalizedCountry);

  // Парсинг FAQ из фронтматтера (формат: Вопрос|Ответ;;Вопрос|Ответ)
  const faqs = countryData?.frontmatter?.faqs && typeof countryData.frontmatter.faqs === 'string'
    ? countryData.frontmatter.faqs.split(';;').map((pair: string) => {
      const parts = pair.split('|');
      return {
        question: parts[0]?.trim() || '',
        answer: parts[1]?.trim() || ''
      };
    }).filter((f: any) => f.question && f.answer)
    : [];

  // Парсинг ключевых слов
  const keywords = typeof countryData?.frontmatter?.keywords === 'string'
    ? countryData.frontmatter.keywords.split(',').map((k: string) => k.trim())
    : (Array.isArray(countryData?.frontmatter?.keywords) ? countryData.frontmatter.keywords : []);

  // Определяем, является ли страна спорной/частично признанной территорией.
  // Для таких страниц используем тип 'territory' (в JSON-LD — "@type": "Place", а не "Country"),
  // чтобы семантически корректно и безопасно для E-E-A-T подавать статус ИИ-поисковикам.
  const disputed = isDisputedTerritory(normalizedCountry);
  const politicalStatus =
    countryData?.frontmatter?.politicalStatus ||
    (disputed ? getPoliticalStatus(normalizedCountry) : undefined);

  // Получаем JSON-LD схемы для SEO с использованием универсальной функции
  const schemas = await generateUniversalSchemas({
    title: countryData?.frontmatter?.title || `${normalizedCountry} - путеводитель | Велес Вояж`,
    description: countryData?.frontmatter?.description || `Подробный путеводитель по ${normalizedCountry}`,
    url: `/wiki/${normalizedCountry}`,
    image: countryData?.frontmatter?.image,
    keywords,
    faqs,
    type: disputed ? 'territory' : 'country',
    geo: {
      latitude: countryData?.frontmatter?.latitude || 0,
      longitude: countryData?.frontmatter?.longitude || 0,
    },
    publishedTime: countryData?.frontmatter?.datePublished,
    modifiedTime: countryData?.frontmatter?.dateModified,
    author: countryData?.frontmatter?.author,
    politicalStatus,
  });

  if (!countryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
            {countryNamesDictionary[country] || country}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Контент для этой страны временно недоступен</p>
          <Link
            href="/wiki/countries"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Вернуться к списку стран
          </Link>
        </div>
      </div>
    );
  }

  const { content: mdxContent } = countryData;

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Структурированные данные для SEO с универсальным скриптом */}
      <SchemaScripts schemas={schemas} />

      <ZkpBadge
        subjectId={`wiki/${normalizedCountry}`}
        schema="veles-voyage:wiki-editorial-v1"
        contentText={
          typeof countryData?.content === 'string'
            ? countryData.content
            : (countryData?.frontmatter?.description || countryData?.frontmatter?.title || normalizedCountry)
        }
        claims={{
          reviewedBy: 'editorial',
          contentSource: 'mdx',
          countryId: normalizedCountry,
        }}
      />

      {/* Верхнее прокручивающееся меню - Оптимизированный адаптивный дизайн */}
      <div className="sticky top-16 md:top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-3 mb-8 -mx-4 px-4 z-[50] shadow-xl mt-4">
        <div className="max-w-6xl mx-auto relative group">
          {/* Левый градиент-индикатор (только для мобильных) */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <nav className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar scroll-smooth md:justify-center py-1 px-2">
            {[
              { id: 'overview', label: 'Обзор', icon: '🏠' },
              { id: 'history', label: 'История', icon: '🎨' },
              { id: 'geography', label: 'География', icon: '🌍' },
              { id: 'seasons', label: 'Сезоны', icon: '📅' },
              { id: 'visa', label: 'Визы', icon: '🎫' },
              { id: 'transport', label: 'Транспорт', icon: '✈️' },
              { id: 'budget', label: 'Бюджет', icon: '💰' },
              { id: 'food', label: 'Еда', icon: '🍽️' },
              { id: 'attractions', label: 'Места', icon: '🏛️' },
              { id: 'safety', label: 'Правила', icon: '⚠️' },
              { id: 'shopping', label: 'Шоппинг', icon: '🛍️' },
              { id: 'faq', label: 'FAQ', icon: '❓' },
              { id: 'maps', label: 'Карты', icon: '🗺️' },
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-xs md:text-sm bg-gray-50/80 dark:bg-gray-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-700 dark:text-gray-200 hover:text-white font-bold rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Правый градиент-индикатор (только для мобильных) */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none opacity-100 transition-opacity"></div>
        </div>
      </div>

      {/* Контекст политического статуса для спорных/частично признанных территорий (E-E-A-T) */}
      {disputed && politicalStatus && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <strong>Политический статус:</strong> {politicalStatus}. {getPoliticalStatusNote(normalizedCountry)}
          </p>
        </div>
      )}

      {/* TL;DR + сводная таблица (AEO/SEO: структурированный ответ для сниппетов) */}
      <section
        id="tldr"
        className="direct-answer mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700"
      >
        <div id="speakable-summary">
        <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
          <span className="text-3xl">⚡</span> Краткий ответ: {countryData?.frontmatter?.title?.split(' | ')[0] || countryNamesDictionary[country] || country}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          {(typeof countryData?.frontmatter?.visaRequirements === 'boolean'
            ? (countryData.frontmatter.visaRequirements
                ? 'Виза требуется. '
                : 'Виза не требуется (по прибытии или безвизовый въезд). ')
            : '')}
          {countryData?.frontmatter?.currency ? `Валюта — ${countryData.frontmatter.currency}. ` : ''}
          {countryData?.frontmatter?.bestTimeToVisit ? `Лучший сезон: ${countryData.frontmatter.bestTimeToVisit}. ` : ''}
          {countryData?.frontmatter?.estimatedCost ? `Средний чек: от ${Number(countryData.frontmatter.estimatedCost).toLocaleString('ru-RU')} ₽.` : ''}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {(countryData?.frontmatter?.capital && (
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Столица</th>
                  <td className="text-gray-900 dark:text-white py-2">{countryData.frontmatter.capital}</td>
                </tr>
              )) || null}
              {(typeof countryData?.frontmatter?.visaRequirements === 'boolean' && (
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Виза</th>
                  <td className="text-gray-900 dark:text-white py-2">
                    {countryData.frontmatter.visaRequirements ? 'Требуется' : 'Не требуется'}
                  </td>
                </tr>
              )) || null}
              {(countryData?.frontmatter?.currency && (
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Валюта</th>
                  <td className="text-gray-900 dark:text-white py-2">{countryData.frontmatter.currency}</td>
                </tr>
              )) || null}
              {(countryData?.frontmatter?.language && (
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Язык</th>
                  <td className="text-gray-900 dark:text-white py-2">{countryData.frontmatter.language}</td>
                </tr>
              )) || null}
              {(countryData?.frontmatter?.bestTimeToVisit && (
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Лучший сезон</th>
                  <td className="text-gray-900 dark:text-white py-2">{countryData.frontmatter.bestTimeToVisit}</td>
                </tr>
              )) || null}
              {(countryData?.frontmatter?.estimatedCost && (
                <tr>
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Средний чек</th>
                  <td className="text-gray-900 dark:text-white py-2">
                    от {Number(countryData.frontmatter.estimatedCost).toLocaleString('ru-RU')} ₽
                  </td>
                </tr>
              )) || null}
            </tbody>
          </table>
        </div>
        </div>
      </section>

      {/* E-E-A-T: автор и дата обновления */}
      {(countryData?.frontmatter?.author || countryData?.frontmatter?.dateModified) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
          {countryData?.frontmatter?.author && (
            <span>✍️ Автор: <strong className="text-gray-700 dark:text-gray-200">{countryData.frontmatter.author}</strong></span>
          )}
          {countryData?.frontmatter?.dateModified && countryData.frontmatter.dateModified !== 'dynamic' && (
            <span>🕒 Обновлено: {countryData.frontmatter.dateModified}</span>
          )}
          {countryData?.frontmatter?.datePublished && countryData.frontmatter.datePublished !== 'dynamic' && (
            <span>📅 Опубликовано: {countryData.frontmatter.datePublished}</span>
          )}
        </div>
      )}

      {/* Основной контент с MDX */}
      <article className="prose prose-lg max-w-none dark:prose-invert">{mdxContent}</article>

      {/* FAQ из фронтматтера — видимый блок, совпадающий с JSON-LD */}
      {faqs.length > 0 && (
        <div id="faq" className="scroll-mt-28 mb-12">
          <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 !mt-0">
            <span className="text-4xl">❓</span> Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {faqs.map((faq: { question: string; answer: string }, idx: number) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg group hover:shadow-blue-500/10 transition-all">
                <div className="font-bold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">Q</span>
                  {faq.question}
                </div>
                <div className="text-gray-600 dark:text-gray-400 pl-8 text-sm">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People Also Ask (PAA) — AEO-блок вопросов-связок */}
      {faqs.length > 0 && (
        <section id="paa" className="scroll-mt-28 mb-12">
          <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3 !mt-0">
            <span className="text-3xl">🔎</span> Люди также спрашивают
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {faqs.map((faq: { question: string; answer: string }, idx: number) => (
              <li key={idx}>
                <details className="group bg-white dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-3">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-gray-900 dark:text-white font-medium">
                    <span>{faq.question}</span>
                    <span className="ml-3 text-blue-600 dark:text-blue-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Внутренняя перелинковка — Hub & Spoke */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Связанные разделы</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/wiki/places" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
            Ключевые места мира
          </Link>
          <Link href="/cities" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
            Города вылета
          </Link>
          <Link href="/wiki/countries" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
            Все страны
          </Link>
          <Link href="/tours" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
            Туры и направления
          </Link>
        </div>
      </div>

      {/* Связанные страны для Internal Linking */}
      {countryData?.frontmatter?.relatedCountries && countryData.frontmatter.relatedCountries.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-green-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🌍 Похожие страны</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countryData.frontmatter.relatedCountries.map((relatedCountry: string) => (
              <Link
                key={relatedCountry}
                href={`/wiki/${relatedCountry.toLowerCase()}`}
                className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-green-400 hover:shadow-md transition text-center"
              >
                {relatedCountry}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/wiki/countries"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Вернуться к списку стран
        </Link>
      </div>
    </div >
  );
}
