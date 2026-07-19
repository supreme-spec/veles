import matter from 'gray-matter';

// Dynamic imports for server-side only
let fs: typeof import('fs') | null = null;
let path: typeof import('path') | null = null;

// Initialize modules only on server side
function initModules() {
  if (typeof window === 'undefined' && !fs) {
    fs = require('fs');
    path = require('path');
  }
}

// Helper function to ensure modules are loaded
function ensureModules() {
  initModules();
  if (!fs || !path) {
    throw new Error('Server-side modules not available');
  }
  return { fs, path };
}

// Интерфейсы для типизации данных
export interface CountryFrontmatter {
  title: string;
  description: string;
  keywords: string | string[];
  datePublished: string;
  dateModified: string;
  author: string;
  wordCount: number;
  inLanguage: string;
}

export interface MdxCountryData {
  slug: string;
  frontmatter: CountryFrontmatter;
  content: string;
  filePath: string;
}

// Кэш для оптимизации производительности
const countryCache = new Map<string, MdxCountryData>();
const allCountriesCache: MdxCountryData[] = [];

/**
 * Загружает конкретную страну из MDX файла
 */
export async function loadCountryMdx(slug: string): Promise<MdxCountryData | null> {
  // Проверяем кэш первым
  if (countryCache.has(slug)) {
    return countryCache.get(slug)!;
  }

  const { fs, path } = ensureModules();
  const filePath = path.join(process.cwd(), 'src/content/countries', `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Валидация обязательных полей
    if (!frontmatter.title || !frontmatter.description) {
      console.warn(`Missing required fields in ${slug}.mdx frontmatter`);
      return null;
    }

    const countryData: MdxCountryData = {
      slug,
      frontmatter: frontmatter as CountryFrontmatter,
      content,
      filePath,
    };

    // Сохраняем в кэш
    countryCache.set(slug, countryData);
    return countryData;
  } catch (error) {
    console.error(`Error loading MDX file for ${slug}:`, error);
    return null;
  }
}

/**
 * Загружает все страны из MDX файлов
 */
export async function loadAllCountriesMdx(): Promise<MdxCountryData[]> {
  // Всегда загружаем заново для разработки
  // if (allCountriesCache.length > 0) {
  //   return [...allCountriesCache];
  // }

  const { fs, path } = ensureModules();
  const countriesDir = path.join(process.cwd(), 'src/content/countries');

  try {
    const files = fs.readdirSync(countriesDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const countries = await Promise.all(
      mdxFiles.map(async file => {
        const slug = file.replace('.mdx', '');
        const countryData = await loadCountryMdx(slug);
        return countryData;
      })
    );

    // Фильтруем null значения и сохраняем в кэш
    const validCountries = countries.filter(Boolean) as MdxCountryData[];
    allCountriesCache.length = 0; // Очищаем кэш
    allCountriesCache.push(...validCountries);

    console.log(`Loaded ${validCountries.length} countries from MDX files`);

    return validCountries;
  } catch (error) {
    console.error('Error loading all countries MDX:', error);
    return [];
  }
}

/**
 * Получает список всех слагов стран
 */
export async function getAllCountrySlugs(): Promise<string[]> {
  const { fs, path } = ensureModules();
  const countriesDir = path.join(process.cwd(), 'src/content/countries');

  try {
    const files = fs.readdirSync(countriesDir);
    return files.filter(file => file.endsWith('.mdx')).map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error reading countries directory:', error);
    return [];
  }
}

/**
 * Извлекает информацию о стране для списка (название, описание)
 */
export function extractCountryInfo(countryData: MdxCountryData) {
  const { frontmatter } = countryData;

  // Извлекаем название страны из заголовка
  let name = frontmatter.title;

  // Обрабатываем различные форматы заголовков
  if (name.includes(':')) {
    const namePart = name.split(':')[0];
    if (namePart) {
      name = namePart.trim();
    }
  } else if (name.includes('—')) {
    const namePart = name.split('—')[0];
    if (namePart) {
      name = namePart.trim();
    }
  }

  // Убираем эмодзи и специальные символы
  const cleanName = name.replace(/^[\w\s-]+/, '').trim() || name;

  return {
    id: countryData.slug,
    name: cleanName,
    description: frontmatter.description,
  };
}

/**
 * Сортирует страны по названию
 */
export function sortCountriesByName(countries: ReturnType<typeof extractCountryInfo>[]) {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

/**
 * Группирует страны по континентам (на основе существующей логики)
 */
export function groupCountriesByContinent(countries: MdxCountryData[]) {
  // TODO: Реализовать логику группировки по континентам
  // Пока возвращаем все страны в одной группе
  const grouped = {
    'Все страны': countries.map(extractCountryInfo),
  };

  // Сортируем каждую группу
  Object.keys(grouped).forEach(continent => {
    const key = continent as keyof typeof grouped;
    const countries = grouped[key];
    if (countries) {
      grouped[key] = sortCountriesByName(countries);
    }
  });

  return grouped;
}

/**
 * Очищает кэш (для разработки)
 */
export function clearCountryCache() {
  countryCache.clear();
  allCountriesCache.length = 0;
}
