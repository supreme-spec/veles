/**
 * Video Sitemap Generator
 * Generates a sitemap for all videos on the website
 * Helps search engines discover and index video content
 * 
 * Based on Google's video sitemap specification:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */

import { SITE_LAST_UPDATED } from '@/shared/data/siteMeta';
import { SITE_URL } from '@/shared/constants/seo';

interface VideoEntry {
    thumbnailLoc: string;
    title: string;
    description: string;
    contentLoc?: string;
    playerLoc?: string;
    duration?: number; // in seconds
    expirationDate?: Date;
    rating?: number; // 0.0 to 5.0
    viewCount?: number;
    publicationDate?: Date;
    familyFriendly?: 'yes' | 'no';
    restriction?: {
        relationship: 'allow' | 'deny';
        countries: string[]; // ISO 3166 country codes
    };
    platform?: {
        relationship: 'allow' | 'deny';
        platforms: ('web' | 'mobile' | 'tv')[];
    };
    price?: {
        currency: string;
        value: number;
        type?: 'rent' | 'own';
        resolution?: 'HD' | 'SD';
    };
    requiresSubscription?: 'yes' | 'no';
    uploader?: {
        info: string; // URL to uploader info
        name: string;
    };
    live?: 'yes' | 'no';
    tag?: string[];
}

interface VideoSitemapEntry {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    videos?: VideoEntry[];
}

export default function videoSitemap(): VideoSitemapEntry[] {
    const baseUrl = SITE_URL;
    
    // Since we don't currently have video files, we'll create placeholders
    // for future video content based on the Rutube channel mentioned in the project
    
    const sitemap: VideoSitemapEntry[] = [
        {
            url: `${baseUrl}/`,
            lastModified: SITE_LAST_UPDATED,
            changeFrequency: 'weekly',
            priority: 1.0,
            videos: [
                {
                    thumbnailLoc: `${baseUrl}/images/rutube.webp`,
                    title: 'Видеогид по странам от Велес Вояж',
                    description: 'Официальный видеоканал турагентства Велес Вояж на Rutube с обзорами стран, городов и достопримечательностей',
                    playerLoc: 'https://rutube.ru/u/velesvoyage/',
                    contentLoc: 'https://rutube.ru/u/velesvoyage/',
                    duration: 300, // 5 minutes
                    publicationDate: new Date('2026-01-01'),
                    familyFriendly: 'yes',
                    tag: ['путешествия', 'туризм', 'страны', 'путеводитель'],
                    uploader: {
                        info: `${baseUrl}/about`,
                        name: 'Турагентство Велес Вояж'
                    },
                    live: 'no'
                }
            ]
        }
    ];

    // Add video entries for country pages that might have video content
    const countriesWithVideos = [
        { slug: 'albania', name: 'Албания' },
        { slug: 'greece', name: 'Греция' },
        { slug: 'turkey', name: 'Турция' },
        { slug: 'egypt', name: 'Египет' }
    ];

    for (const country of countriesWithVideos) {
        sitemap.push({
            url: `${baseUrl}/wiki/${country.slug}`,
            lastModified: SITE_LAST_UPDATED,
            changeFrequency: 'monthly',
            priority: 0.8,
            videos: [
                {
                    thumbnailLoc: `${baseUrl}/images/logo.png`,
                    title: `Видеогид по ${country.name} от Велес Вояж`,
                    description: `Подробный видеогид по ${country.name} с рекомендациями от экспертов турагентства Велес Вояж`,
                    playerLoc: 'https://rutube.ru/u/velesvoyage/',
                    contentLoc: 'https://rutube.ru/u/velesvoyage/',
                    duration: 600, // 10 minutes
                    publicationDate: new Date('2026-01-15'),
                    familyFriendly: 'yes',
                    tag: ['путешествия', 'туризм', country.name, 'путеводитель', 'видео'],
                    uploader: {
                        info: `${baseUrl}/about`,
                        name: 'Турагентство Велес Вояж'
                    },
                    live: 'no'
                }
            ]
        });
    }

    return sitemap;
}

/**
 * Google Video Sitemap Specification:
 * 
 * <url>
 *   <loc>https://example.com/videos/some_video_landing_page.html</loc>
 *   <video:video>
 *     <video:thumbnail_loc>https://example.com/thumbs/123.jpg</video:thumbnail_loc>
 *     <video:title>Grilling steaks for summer</video:title>
 *     <video:description>Alkis shows you how to get perfectly done steaks every time</video:description>
 *     <video:content_loc>https://example.com/video123.flv</video:content_loc>
 *     <video:player_loc>https://example.com/videoplayer.php?video=123</video:player_loc>
 *     <video:duration>600</video:duration>
 *     <video:expiration_date>2021-11-05T19:20:30+08:00</video:expiration_date>
 *     <video:rating>4.2</video:rating>
 *     <video:view_count>12345</video:view_count>
 *     <video:publication_date>2007-11-05T19:20:30+08:00</video:publication_date>
 *     <video:family_friendly>yes</video:family_friendly>
 *     <video:restriction relationship="allow">IE GB US CA</video:restriction>
 *     <video:platform relationship="allow">web mobile</video:platform>
 *     <video:price currency="EUR">1.99</video:price>
 *     <video:requires_subscription>yes</video:requires_subscription>
 *     <video:uploader info="https://example.com/users/grillymcgrillerson">GrillyMcGrillerson</video:uploader>
 *     <video:live>no</video:live>
 *     <video:tag>sample_tag1</video:tag>
 *     <video:tag>sample_tag2</video:tag>
 *   </video:video>
 * </url>
 * 
 * Note: Next.js will automatically convert this to proper XML format
 * when accessed via /video-sitemap.xml
 */