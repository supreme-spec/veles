import { Suspense } from 'react';
import { WikiPageClient } from './WikiPageClient';
import { getReadyArticlesCount, getContinentStats } from '@/shared/data/wikiPages-mdx';
import { getPlacesStats } from '@/shared/utils/getAllPlacesData';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata = {
  title: 'Энциклопедия стран мира | Велес Вояж — Путеводители по всем странам',
  description: 'Полная энциклопедия стран мира с подробными путеводителями: визы, достопримечательности, культура, транспорт, проживание. 195+ стран, актуальная информация 2026.',
  alternates: { canonical: `${SITE_URL}/wiki` },
  openGraph: {
    title: 'Энциклопедия стран мира | Велес Вояж',
    description: 'Полная энциклопедия стран мира с подробными путеводителями: визы, достопримечательности, культура, транспорт, проживание.',
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

export default async function WikiPage() {
  // Fetch data on the server
  const readyArticles = await getReadyArticlesCount();
  const continentStats = await getContinentStats();
  const placesStats = await getPlacesStats();

  const stats = {
    readyArticles,
    citiesCount: placesStats.cities,
    attractionsCount: placesStats.attractions,
    totalCountries: continentStats.total,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WikiPageClient stats={stats} />
    </Suspense>
  );
}