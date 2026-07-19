// Серверные функции для работы с MDX данными
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface CountryFrontmatter {
  title: string;
  description: string;
  keywords: string | string[];
  datePublished: string;
  dateModified: string;
  author: string;
  wordCount: number;
  inLanguage: string;
}

interface MdxCountryData {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  lastModified: string;
  frontmatter: CountryFrontmatter;
  filePath: string;
}

// Только серверные функции (не экспортируем в клиентский код)
export async function getAllCountriesServer(): Promise<MdxCountryData[]> {
  const countriesDir = path.join(process.cwd(), 'src/content/countries');
  
  try {
    const files = fs.readdirSync(countriesDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const countries = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '');
        return await getCountryBySlugServer(slug);
      })
    );

    const validCountries = countries.filter(Boolean) as MdxCountryData[];
    return validCountries.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    
  } catch (error) {
    console.error('Error loading all countries MDX:', error);
    return [];
  }
}

export async function getCountryBySlugServer(slug: string): Promise<MdxCountryData | null> {
  const filePath = path.join(process.cwd(), 'src/content/countries', `${slug}.mdx`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    if (!frontmatter.title || !frontmatter.description) {
      console.warn(`Missing required fields in ${slug}.mdx frontmatter`);
      return null;
    }

    let name = frontmatter.title;
    if (name.includes(':')) {
      name = name.split(':')[0].trim();
    } else if (name.includes('—')) {
      name = name.split('—')[0].trim();
    }

    let tags: string[] = [];
    if (typeof frontmatter.keywords === 'string') {
      tags = frontmatter.keywords.split(',').map(k => k.trim()).filter(Boolean);
    } else if (Array.isArray(frontmatter.keywords)) {
      tags = frontmatter.keywords;
    }

    const countryData: MdxCountryData = {
      id: slug,
      slug,
      title: name,
      description: frontmatter.description,
      content,
      tags,
      lastModified: frontmatter.dateModified || new Date().toISOString(),
      frontmatter: frontmatter as CountryFrontmatter,
      filePath
    };

    return countryData;

  } catch (error) {
    console.error(`Error loading MDX file for ${slug}:`, error);
    return null;
  }
}