import type { MetadataRoute } from 'next';
import { allCountryIds } from '@/shared/data/wikiPages';
import { SITE_LAST_UPDATED } from '@/shared/data/siteMeta';
import { SITE_URL } from '@/shared/constants/seo';

export default function wikiSitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  
  // Wiki country pages
  const wikiUrls: MetadataRoute.Sitemap = allCountryIds.map(id => ({
    url: `${baseUrl}/wiki/${id}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return wikiUrls;
}