import type { MetadataRoute } from 'next';
import { allCities } from './all-cities';
import { SITE_URL } from '@/shared/constants/seo';
import { generateCitySlug } from '@/lib/slugify';

const siteUrl = SITE_URL;
const currentDate: Date = new Date();

const uniqueCities = Array.from(new Set(allCities.map(generateCitySlug))).sort();

const HIGH_PRIORITY_CITIES = new Set([
  'moskva',
  'sankt-peterburg',
  'novosibirsk',
  'ekaterinburg',
  'kazan',
  'nizhnii-novgorod',
  'krasnoyarsk',
  'chelyabinsk',
  'samara',
  'ufa',
  'rostov-na-donu',
  'krasnodar',
  'omsk',
  'voronezh',
  'perm',
  'volgograd',
  'saratov',
  'tumen',
  'irkutsk',
  'barnaul',
  'ulyanovsk',
  'vladivostok',
  'yaroslavl',
  'izhevsk',
  'khabarovsk',
  'makhachkala',
  'tomsk',
  'orenburg',
  'kemerovo',
  'sochi',
  'stavropol',
  'kaliningrad',
  'tver',
  'ulan-ude',
  'magnitogorsk',
  'vladikavkaz',
  'surgut',
  'vologda',
  'simferopol',
  'belgorod',
  'novokuznetsk',
  'yakutsk',
  'bryansk',
  'kurgan',
  'smolensk',
  'orel',
  'kursk',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const cityEntries: MetadataRoute.Sitemap = uniqueCities.map((slug) => {
    const isHighPriority = HIGH_PRIORITY_CITIES.has(slug);
    return {
      url: `${siteUrl}/cities/${slug}`,
      lastModified: currentDate,
      changeFrequency: isHighPriority ? 'daily' : 'weekly',
      priority: isHighPriority ? 0.8 : 0.5,
    };
  });

  return [
    {
      url: `${siteUrl}/cities`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...cityEntries,
  ];
}
