import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/seo';
import citiesSitemap from './cities/sitemap';
import wikiSitemap from './wiki/sitemap';
import visualSitemap from './visual-sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const currentDate: Date = new Date();

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/values`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wiki/places`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours/oceania`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tours/south-america`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cruises`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: currentDate,
      changeFrequency: 'daily',
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
