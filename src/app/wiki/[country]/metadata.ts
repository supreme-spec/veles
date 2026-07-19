import { generateCountrySEOMetadata } from '@/shared/utils/generateCountrySEOMetadata';
import { generateUniversalMetadata } from '@/lib/seo/universalSEO';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}): Promise<Metadata> {
  try {
    // Сначала пробуем использовать существующую функцию генерации метаданных
    const metadata = await generateCountrySEOMetadata({
      countryId: params.country,
      url: `https://www.veles-voyage.ru/wiki/${params.country}`,
    });

    return metadata;
  } catch (error) {
    console.error(`Error generating SEO metadata for ${params.country}:`, error);

    // Возвращаем базовые метаданные в случае ошибки
    try {
      const filePath = path.join(process.cwd(), 'src/content/countries', `${params.country}.mdx`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      // Используем универсальную функцию генерации метаданных
      return await generateUniversalMetadata({
        title: frontmatter.title || `${params.country} - путеводитель | Велес Вояж`,
        description: frontmatter.description || `Подробный путеводитель по ${params.country}`,
        url: `/wiki/${params.country}`,
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
    } catch {
      return await generateUniversalMetadata({
        title: `${params.country} - путеводитель | Велес Вояж`,
        description: `Подробный путеводитель по ${params.country}`,
        url: `/wiki/${params.country}`,
      });
    }
  }
}
