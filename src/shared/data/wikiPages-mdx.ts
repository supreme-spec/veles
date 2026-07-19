// Экспорт данных из MDX файлов для wiki страниц
// Использует серверные функции для избежания проблем с fs модулем

import { countryNamesDictionary } from './country-names-dictionary';
import { normalizeContinentKey } from '@/shared/constants/continents';

interface WikiPage {
  id: string;
  title: string;
  description?: string;
  content: string;
  lastModified: string;
  tags?: string[];
  continent?: string;
  politicalStatus?: string;
}

// Кэш для оптимизации (только в памяти)
let cachedWikiPages: Record<string, WikiPage> = {};
let isInitialized = false;

/**
 * Инициализирует данные wiki (заглушка - данные будут загружаться через API)
 */
async function initializeWikiData() {
  if (isInitialized) {
    return;
  }

  console.log('[WikiPages] Initializing wiki data...'); // Debug log

  try {
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');

    // Explicitly log the CWD and target directory
    console.log(`[WikiPages] CWD: ${process.cwd()}`);
    const countriesDir = path.join(process.cwd(), 'src', 'content', 'countries');
    console.log(`[WikiPages] Target countries directory: ${countriesDir}`);

    if (!fs.existsSync(countriesDir)) {
      console.error('[WikiPages] Could not find countries directory at:', countriesDir);
      cachedWikiPages = {};
      isInitialized = true;
      return;
    }

    const mdxFiles = fs.readdirSync(countriesDir).filter((file: string) => file.endsWith('.mdx'));
    console.log(`[WikiPages] Found ${mdxFiles.length} MDX files.`);

    let successCount = 0;
    let errorCount = 0;

    mdxFiles.forEach((filename: string) => {
      const countryId = filename.replace('.mdx', '');
      const filePath = path.join(countriesDir, filename);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        cachedWikiPages[countryId] = {
          id: countryId,
          title: data.title || countryId,
          description: data.description || `Путеводитель по ${data.title || countryId}`,
          content: content,
          lastModified: new Date().toISOString(),
          tags: Array.isArray(data.keywords)
            ? data.keywords
            : typeof data.keywords === 'string'
              ? data.keywords.split(',').map((tag: string) => tag.trim())
              : [],
          continent: data.continent || 'other',
          politicalStatus: typeof data.politicalStatus === 'string' ? data.politicalStatus : undefined,
        };
        successCount++;
      } catch (parseError) {
        console.warn(`[WikiPages] Could not parse MDX file ${filename}:`, parseError);
        errorCount++;
        // Fallback for a single file that fails to parse
        cachedWikiPages[countryId] = {
          id: countryId,
          title: countryNamesDictionary[countryId] || countryId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: `Путеводитель по ${countryNamesDictionary[countryId] || countryId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}`,
          content: '',
          lastModified: new Date().toISOString(),
          tags: [],
          continent: 'other',
        };
      }
    });

    console.log(
      `[WikiPages] Successfully loaded ${Object.keys(cachedWikiPages).length} countries from MDX files. (Success: ${successCount}, Errors: ${errorCount})`
    );

    isInitialized = true;
  } catch (error) {
    console.error('[WikiPages] Failed to initialize wiki data:', error);
    cachedWikiPages = {}; // Ensure cache is clear on failure
    isInitialized = true; // Mark as initialized to prevent retries
  }
}


/**
 * Получает все страницы wiki через API
 */
export async function getWikiPages(): Promise<Record<string, WikiPage>> {
  // В реальной реализации будет вызов API
  await initializeWikiData();
  return { ...cachedWikiPages };
}

/**
 * Получает все ID стран через API
 */
export async function getAllCountryIds(): Promise<string[]> {
  // В реальной реализации будет вызов API
  await initializeWikiData();
  return Object.keys(cachedWikiPages);
}

/**
 * Получает страну по ID через API
 */
export async function getCountryById(id: string): Promise<WikiPage | undefined> {
  // В реальной реализации будет вызов API
  await initializeWikiData();
  return cachedWikiPages[id];
}

/**
 * Поиск стран по запросу через API
 */
export async function searchCountries(query: string): Promise<WikiPage[]> {
  // В реальной реализации будет вызов API
  await initializeWikiData();

  console.log('searchCountries called with query:', query);
  console.log('cachedWikiPages keys:', Object.keys(cachedWikiPages).slice(0, 10));
  console.log('Total pages in cache:', Object.keys(cachedWikiPages).length);

  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const allPages = Object.values(cachedWikiPages);

  console.log('Searching for term:', searchTerm);

  const results = allPages.filter(page => {
    const titleMatch = page.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = page.description?.toLowerCase().includes(searchTerm);
    const tagMatch = page.tags?.some(tag => tag.toLowerCase().includes(searchTerm));

    console.log(`Checking page ${page.id}: title='${page.title}', titleMatch=${titleMatch}, descMatch=${!!descriptionMatch}, tagMatch=${!!tagMatch}`);

    return titleMatch || descriptionMatch || tagMatch;
  });

  console.log('Search found', results.length, 'results');
  return results;
}

/**
 * Получает страны по континенту
 */
export async function getCountriesByContinent(
  _continent: string
): Promise<Record<string, WikiPage>> {
  // В реальной реализации будет вызов API
  await initializeWikiData();
  return cachedWikiPages;
}

/**
 * Получает статистику по континентам
 */
export async function getContinentStats() {
  await initializeWikiData();

  const stats = {
    europe: 0,
    asia: 0,
    northAmerica: 0,
    southAmerica: 0,
    africa: 0,
    oceania: 0,
    total: 0,
  };

  const pages = Object.values(cachedWikiPages);
  stats.total = pages.length;

  pages.forEach(page => {
    // Нормализуем kebab/underscore/camel/русское название → kebab-case, затем на camel для статистики
    const normalized = normalizeContinentKey(page.continent || 'other');
    switch (normalized) {
      case 'europe':
        stats.europe++;
        break;
      case 'asia':
        stats.asia++;
        break;
      case 'north-america':
        stats.northAmerica++;
        break;
      case 'south-america':
        stats.southAmerica++;
        break;
      case 'africa':
        stats.africa++;
        break;
      case 'oceania':
        stats.oceania++;
        break;
      default:
        // Other or unknown continents — не учитываем в разбивке по континентам
        break;
    }
  });

  return stats;
}

/**
 * Получает количество готовых статей
 */
export async function getReadyArticlesCount(): Promise<number> {
  await initializeWikiData();
  return Object.keys(cachedWikiPages).length;
}

// Экспорт для обратной совместимости
export { getWikiPages as wikiPages };
export { getAllCountryIds as allCountryIds };
