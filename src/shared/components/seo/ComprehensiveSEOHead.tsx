'use client';

import Head from 'next/head';
import { SEO_CONFIG } from '@/shared/utils/comprehensiveSEO';

interface ComprehensiveSEOHeadProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  schemas?: Array<Record<string, unknown>>;
  hreflang?: Array<{ rel: string; hreflang: string; href: string }>;
  publishedTime?: string;
  modifiedTime?: string;
}

export function ComprehensiveSEOHead({
  title,
  description,
  url,
  image = SEO_CONFIG.logoUrl,
  type = 'website',
  keywords = [],
  schemas = [],
  hreflang = [],
  publishedTime,
  modifiedTime
}: ComprehensiveSEOHeadProps) {
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`;
  
  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={SEO_CONFIG.organization} />
      <meta name="creator" content={SEO_CONFIG.siteName} />
      <meta name="publisher" content={SEO_CONFIG.siteName} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="yandex" content="index, follow" />
      
      {/* Search Engine Verifications */}
      <meta name="yandex-verification" content={SEO_CONFIG.verifications.yandex} />
      <meta name="google-site-verification" content={SEO_CONFIG.verifications.google} />
      <meta name="yandex-verification" content={SEO_CONFIG.verifications.yandex2} />
      <meta name="baidu-site-verification" content={SEO_CONFIG.verifications.baidu} />
      <meta name="msvalidate.01" content={SEO_CONFIG.verifications.bing} />
      <meta name="naver-site-verification" content={SEO_CONFIG.verifications.naver} />
      
      {/* Telegram */}
      <meta name="tg:site_verification" content={SEO_CONFIG.verifications.telegram} />
      <meta property="telegram:channel" content={SEO_CONFIG.social.telegram.replace('https://t.me/', '@')} />
      <meta property="og:see_also" content={SEO_CONFIG.social.telegram} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Hreflang */}
      {hreflang.map((tag, index) => (
        <link key={index} rel={tag.rel} hrefLang={tag.hreflang} href={tag.href} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {modifiedTime && <meta property="og:updated_time" content={modifiedTime} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:creator" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Verification meta tags */}
      {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 && (
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1} />
      )}
      
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

