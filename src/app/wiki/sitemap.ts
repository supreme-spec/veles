import type { MetadataRoute } from 'next';
import { allCountryIds } from '@/shared/data/wikiPages';
import { SITE_URL } from '@/shared/constants/seo';

export default function wikiSitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const currentDate: Date = new Date();
  
  // Wiki country pages
  const wikiUrls: MetadataRoute.Sitemap = allCountryIds.map(id => ({
    url: `${baseUrl}/wiki/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Matrix pages for each country (visa, weather, currency)
  const matrixPages: MetadataRoute.Sitemap = allCountryIds.flatMap(id => [
    {
      url: `${baseUrl}/wiki/${id}/visa`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wiki/${id}/weather`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wiki/${id}/currency`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]);

  return [...wikiUrls, ...matrixPages];
}