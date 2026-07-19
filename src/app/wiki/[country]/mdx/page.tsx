import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import matter from 'gray-matter';
import { COUNTRY_COORDINATES } from '@/shared/data/countryCoordinates';
import { redirect } from 'next/navigation';

// Рендерим на запрос (on-demand): статическая компиляция 217 MDX-гайдов через
// next-mdx-remote/rsc на этапе сборки переполняет зону компилятора V8 и обрывает
// `next build`. Страницы остаются серверно-рендеренными и индексируемыми.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const { country } = await params;
  const filePath = path.join(process.cwd(), 'src/content/countries', `${country}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    const countryTitle = frontmatter.title || `${country} - Путеводитель`;
    const description = frontmatter.description || `Гид по стране ${country}`;
    const url = `https://www.veles-voyage.ru/wiki/${country}/mdx`;
    const image = frontmatter.image || 'https://www.veles-voyage.ru/images/logo.png';

    const stats = fs.statSync(filePath);
    const fileLastModified = stats.mtime.toISOString().split('T')[0];
    
    // Получаем реальные координаты страны для GEO-тегов
    const coords = COUNTRY_COORDINATES[country] || { latitude: 0, longitude: 0, countryCode: 'XX' };

    return {
      title: countryTitle,
      description: description,
      keywords: frontmatter.keywords,
      authors: [{ name: frontmatter.author || 'Велес Вояж' }],
      openGraph: {
        title: countryTitle,
        description: description,
        url: url,
        images: [{ url: image }],
        type: 'article',
        siteName: 'Велес Вояж',
        locale: 'ru_RU',
      },
      twitter: {
        card: 'summary_large_image',
        title: countryTitle,
        description: description,
        images: [image],
        site: '@velesvoyage',
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ? ([process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1, process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2].filter(Boolean) as string[]) : [],
        other: {
          'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || '',
          'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
          'bing-site-verification': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
        },
      },
      other: {
        'article:published_time': frontmatter.datePublished === 'dynamic' ? fileLastModified : frontmatter.datePublished,
        'article:modified_time': frontmatter.dateModified === 'dynamic' ? fileLastModified : frontmatter.dateModified,
        'og:updated_time': frontmatter.dateModified === 'dynamic' ? fileLastModified : frontmatter.dateModified,
        'geo.region': coords.countryCode !== 'XX' ? coords.countryCode : 'Global',
        'geo.placename': frontmatter.title || country,
        'ICBM': `${coords.latitude}, ${coords.longitude}`,
        'geo.position': `${coords.latitude};${coords.longitude}`,
        'content-language': 'ru',
        'apple-mobile-web-app-title': countryTitle,
        'theme-color': '#ffffff',
        'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        'googlebot': 'index, follow',
        'bingbot': 'index, follow',
        'yandexbot': 'index, follow',
      }
    };
  } catch {
    return {
      title: 'Страна не найдена',
      description: 'Путеводитель временно недоступен'
    };
  }
}

export async function generateStaticParams() {
  // Получаем список всех MDX-файлов
  const contentDir = path.join(process.cwd(), 'src/content/countries');
  const files = fs.readdirSync(contentDir);

  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      country: file.replace('.mdx', '')
    }));
}

export default async function MdxCountryPage({ params }: { params: { country: string } }) {
  const { country } = await params;
  // Редирект на основной маршрут для предотвращения каннибализации канонических URL
  redirect(`/wiki/${country}`);
}