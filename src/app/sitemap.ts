import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/seo';
import citiesSitemap from './cities/sitemap';
import wikiSitemap from './wiki/sitemap';
import visualSitemap from './visual-sitemap';
import { SITE_LAST_UPDATED } from '@/shared/data/siteMeta';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/values`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wiki/places`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours/oceania`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tours/south-america`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cruises`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  const noindexPatterns = [/\/api\//, /\/_next\//, /\/private\//, /\/admin\//, /\/search\?/];

  let cities: MetadataRoute.Sitemap = [];
  let wiki: MetadataRoute.Sitemap = [];
  let visual: MetadataRoute.Sitemap = [];
  try {
    cities = citiesSitemap();
  } catch (e) {
    console.error('citiesSitemap error:', e);
  }
  try {
    wiki = wikiSitemap();
  } catch (e) {
    console.error('wikiSitemap error:', e);
  }
  try {
    visual = visualSitemap();
  } catch (e) {
    console.error('visualSitemap error:', e);
  }

  const filtered = [
    ...mainUrls,
    ...wiki,
    ...cities,
    ...visual,
  ].filter((entry) => !noindexPatterns.some((re) => re.test(entry.url)));

  return filtered as MetadataRoute.Sitemap;
}
