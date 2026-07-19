import fs from 'fs';
import path from 'path';
import { SITE_LAST_UPDATED } from '@/shared/data/siteMeta';
import { SITE_URL } from '@/shared/constants/seo';

/**
 * Visual Content Sitemap Generator
 * Generates a specialized sitemap for visual content including photos, illustrations, and graphics
 * Helps search engines discover and index visual assets
 */

interface VisualEntry {
  url: string;
  title?: string;
  caption?: string;
  geoLocation?: string;
  license?: string;
  type: 'photo' | 'illustration' | 'graphic' | 'infographic' | 'map' | 'chart';
}

interface VisualSitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  visuals?: VisualEntry[];
}

export default function visualSitemap(): VisualSitemapEntry[] {
  const baseUrl = SITE_URL;
  const imagesDir = path.join(process.cwd(), 'public/images');

  const sitemap: VisualSitemapEntry[] = [];

  // Helper function to get all image files recursively
  function getImageFiles(dir: string, baseDir: string = dir): string[] {
    const files: string[] = [];

    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
          files.push(...getImageFiles(fullPath, baseDir));
        } else if (item.isFile()) {
          const ext = path.extname(item.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'].includes(ext)) {
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
            files.push(relativePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }

    return files;
  }

  // Get all image files
  const imageFiles = getImageFiles(imagesDir);

  // Categorize visual content by type and context
  const visualGroups: { [key: string]: VisualEntry[] } = {
    homepage: [],
    about: [],
    countries: [],
    services: [],
    team: [],
    educational: [],
  };

  // Categorize images by type and context
  for (const imagePath of imageFiles) {
    const imageUrl = `${baseUrl}/images/${imagePath}`;
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const dirName = path.dirname(imagePath).split('/').pop() || '';

    const visualEntry: VisualEntry = {
      url: imageUrl,
      title: fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      type: 'photo', // default type
    };

    // Determine visual type based on filename or directory
    if (fileName.includes('map') || fileName.includes('schema')) {
      visualEntry.type = 'map';
      visualEntry.caption = 'Карта или схема';
    } else if (fileName.includes('chart') || fileName.includes('graph')) {
      visualEntry.type = 'chart';
      visualEntry.caption = 'Диаграмма или график';
    } else if (fileName.includes('info') || fileName.includes('infographic')) {
      visualEntry.type = 'infographic';
      visualEntry.caption = 'Инфографика';
    } else if (dirName === 'illustrations' || fileName.includes('illustration')) {
      visualEntry.type = 'illustration';
      visualEntry.caption = 'Иллюстрация';
    } else if (fileName.includes('logo') || fileName.includes('icon')) {
      visualEntry.type = 'graphic';
      visualEntry.caption = 'Графический элемент';
    } else {
      visualEntry.type = 'photo';
      visualEntry.caption = 'Фотография';
    }

    // Categorize based on path or filename
    if (imagePath.includes('countries/')) {
      const countryName = imagePath.split('/')[1]?.replace(/[-_]/g, ' ');
      visualEntry.caption = `Фотография страны: ${countryName}`;
      visualGroups.countries?.push(visualEntry);
    } else if (fileName.includes('svistunov') || fileName.includes('kolesnikova')) {
      visualEntry.caption = 'Фотография члена команды Велес Вояж';
      visualGroups.team?.push(visualEntry);
    } else if (fileName.includes('education')) {
      visualEntry.caption = 'Образовательный материал турагентства';
      visualGroups.educational?.push(visualEntry);
    } else if (fileName.includes('service')) {
      visualEntry.caption = 'Изображение услуги турагентства';
      visualGroups.services?.push(visualEntry);
    } else if (
      fileName.includes('logo') ||
      fileName.includes('rutube') ||
      fileName.includes('telegram') ||
      fileName.includes('vk')
    ) {
      visualEntry.caption = 'Графический элемент сайта Велес Вояж';
      visualGroups.homepage?.push(visualEntry);
    } else {
      visualEntry.caption = 'Изображение сайта Велес Вояж';
      visualGroups.homepage?.push(visualEntry);
    }
  }

  // Homepage with general visual content
  const allVisuals = [
    ...(visualGroups.homepage || []),
    ...(visualGroups.services || []),
    ...(visualGroups.educational || []),
  ];

  if (allVisuals.length > 0) {
    sitemap.push({
      url: baseUrl,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
      visuals: allVisuals,
    });
  }

  // About/Team page
  if (visualGroups.team && visualGroups.team.length > 0) {
    sitemap.push({
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
      visuals: visualGroups.team,
    });
  }

  // Educational content page
  if (visualGroups.educational && visualGroups.educational.length > 0) {
    sitemap.push({
      url: `${baseUrl}/education`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
      visuals: visualGroups.educational,
    });
  }

  // Wiki/Countries pages
  if (visualGroups.countries && visualGroups.countries.length > 0) {
    // Group country visuals by country
    const countryVisualMap: { [key: string]: VisualEntry[] } = {};

    for (const visual of visualGroups.countries) {
      const countryMatch = visual.url.match(/\/countries\/([^/]+)\//);
      if (countryMatch && countryMatch[1]) {
        const countrySlug = countryMatch[1];
        if (!countryVisualMap[countrySlug]) {
          countryVisualMap[countrySlug] = [];
        }
        countryVisualMap[countrySlug].push(visual);
      }
    }

    // Add entry for each country with visuals
    for (const [countrySlug, visuals] of Object.entries(countryVisualMap)) {
      sitemap.push({
        url: `${baseUrl}/wiki/${countrySlug}`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.7,
        visuals: visuals,
      });
    }
  }

  return sitemap;
}

/**
 * Custom Visual Sitemap Specification:
 *
 * <url>
 *   <loc>https://example.com/page</loc>
 *   <visual:visual>
 *     <visual:loc>https://example.com/image.jpg</visual:loc>
 *     <visual:caption>Image caption</visual:caption>
 *     <visual:geo_location>Location</visual:geo_location>
 *     <visual:title>Image title</visual:title>
 *     <visual:license>https://example.com/license</visual:license>
 *     <visual:type>photo</visual:type>
 *   </visual:visual>
 * </url>
 *
 * Visual Types:
 * - photo: Photographs and images
 * - illustration: Illustrations and drawings
 * - graphic: Logos, icons, and graphic elements
 * - infographic: Infographics and data visualizations
 * - map: Maps and geographical schematics
 * - chart: Charts and graphs
 *
 * Note: This is a custom implementation that extends the standard image sitemap
 * to provide more detailed categorization of visual content.
 */
