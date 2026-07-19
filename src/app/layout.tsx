import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/features/auth/context/AuthContext.simple';
import ClientProviders from './ClientProviders';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';
import { TabletContactBar } from '@/components/TabletContactBar';
import { PWABackButton } from '@/components/PWABackButton';
import { PWANetworkStatus } from '@/components/PWANetworkStatus';
import { PWAUpdateNotification } from '@/components/PWAUpdateNotification';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { WebVitals } from '@/components/analytics/WebVitals';
import { AiSearchAssistant } from '@/shared/components/ui/AiSearchAssistant';
import { SITE_URL } from '@/shared/constants/seo';
import { SOCIAL_LINKS } from '@/shared/constants/seo';

// Optimized font loading for Core Web Vitals (LCP/CLS)
const mainFont = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  preload: true,
  variable: '--font-main',
});

const siteUrl = SITE_URL;

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'TravelAgency', 'LocalBusiness'],
      '@id': `${siteUrl}#organization`,
      name: 'Велес Вояж',
      alternateName: 'Veles Voyage',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 512,
        height: 512,
        caption: 'Логотип турагентства Велес Вояж',
      },
      image: [
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`,
          width: 512,
          height: 512,
          caption: 'Логотип турагентства Велес Вояж',
        },
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/svistunov.webp`,
          width: 128,
          height: 128,
          caption: 'Свистунов Сергей Григорьевич - Генеральный директор ООО Велес, турагентство Велес Вояж',
        },
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/kolesnikova.webp`,
          width: 128,
          height: 128,
          caption: 'Колесникова Анастасия Юрьевна - Директор ООО Велес, турагентство Велес Вояж',
        },
      ],
      description: 'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
      foundingDate: '2023',
      priceRange: '₽₽',
      legalName: 'ООО «Велес»',
      license: 'РТА 0035678',
      sameAs: [
        SOCIAL_LINKS.telegram,
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.rutube,
        'https://www.rata.ru/agent/0035678',
        ...(SOCIAL_LINKS.yandexBusiness ? [SOCIAL_LINKS.yandexBusiness] : []),
        ...(SOCIAL_LINKS.gis2 ? [SOCIAL_LINKS.gis2] : []),
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+7-985-063-51-34',
          contactType: 'customer service',
          email: 'hello@veles-voyage.ru',
          areaServed: 'RU',
          availableLanguage: ['Russian', 'English'],
          availableChannel: ['Phone', 'Email', 'Telegram'],
        },
      ],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Керамиков пр-т, д. 103',
          addressLocality: 'Голицыно',
          addressRegion: 'Московская область',
          postalCode: '143041',
          addressCountry: 'RU',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'пр-т. Московский, 9/2',
          addressLocality: 'Пушкино',
          addressRegion: 'Московская область',
          postalCode: '141207',
          addressCountry: 'RU',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 55.751244,
        longitude: 37.618421,
      },
      areaServed: [
        { '@type': 'Country', name: 'Russia' },
        { '@type': 'Country', name: 'Kazakhstan' },
        { '@type': 'Country', name: 'Belarus' },
        { '@type': 'Country', name: 'Armenia' },
        { '@type': 'Country', name: 'Azerbaijan' },
        { '@type': 'Country', name: 'Georgia' },
        { '@type': 'Country', name: 'Turkey' },
        { '@type': 'Country', name: 'Abkhazia' },
        { '@type': 'Country', name: 'Worldwide' }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '10:00',
          closes: '16:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Туристические услуги',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Индивидуальные туры',
              description: 'Персональные маршруты под ваши интересы и бюджет',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Морские круизы',
              description: 'Круизы по Средиземному морю, Карибам и Балтике',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Путеводители по странам',
              description: 'Подробные гиды по 200+ странам мира',
            },
          },
        ],
      },
      knowsAbout: [
        'Туризм',
        'Путешествия',
        'Морские круизы',
        'Индивидуальные туры',
        'Визовая поддержка',
        'Бронирование отелей',
        'Авиабилеты',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Велес Вояж',
      description: 'Энциклопедия путешествий и туристическое агентство',
      inLanguage: 'ru-RU',
      publisher: { '@id': `${siteUrl}#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/wiki/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: siteUrl,
        },
      ],
    },
    {
      '@type': 'SpeakableSpecification',
      '@id': `${siteUrl}#speakable`,
      cssSelector: [
        'h1',
        'h2',
        'h3',
        '.speakable-summary',
        '.direct-answer',
      ],
      xpath: [
        '//h1',
        '//h2',
        '//h3',
        '//*[contains(@class, "speakable-summary")]',
        '//*[contains(@class, "direct-answer")]',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person/svistunov`,
      'name': 'Свистунов Сергей Григорьевич',
      'jobTitle': 'Генеральный директор, финансовый советник',
      'image': `${siteUrl}/images/svistunov.webp`,
      'sameAs': [
        'https://finradun.ru',
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.telegram,
        `${siteUrl}/about#team`
      ],
      'worksFor': { '@id': `${siteUrl}#organization` },
      'knowsAbout': [
        'Финансовое консультирование',
        'Инвестиции',
        'Международный туризм',
        'Управление капиталом'
      ]
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person/kolesnikova`,
      'name': 'Колесникова Анастасия Юрьевна',
      'jobTitle': 'Директор, эксперт по туризму',
      'image': `${siteUrl}/images/kolesnikova.webp`,
      'sameAs': [
        'https://franglish-original.ru',
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.telegram,
        `${siteUrl}/about#team`
      ],
      'worksFor': { '@id': `${siteUrl}#organization` },
      'knowsAbout': [
        'Международный туризм',
        'Организация туров',
        'Визовая поддержка',
        'Круизные путешествия'
      ]
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Велес Вояж — туры и путешествия 2026',
    template: '%s',
  },
  description: 'Турагентство Велес Вояж: индивидуальные туры, круизы, путеводители по 200+ странам. Поддержка 24/7, лицензия РТА 0035678. Забронируйте тур онлайн!',
  keywords: [
    'турагентство',
    'туры',
    'круизы',
    'путеводитель по странам',
    'отдых 2026',
    'Велес Вояж'
  ],

  // Авторство
  authors: [{ name: 'Велес Вояж' }],
  creator: 'Велес Вояж',
  publisher: 'Велес Вояж',

  // Верификации (только реальные!)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || '',
    other: {
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '',
      'bing-site-verification': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical
  alternates: {
    canonical: siteUrl,
    languages: {
      'ru': siteUrl,
      'x-default': siteUrl,
    },
  },

  // Open Graph
  openGraph: {
    title: 'Велес Вояж — Официальное турагентство',
    description: 'Профессиональная организация путешествий по России и миру. Полностью дистанционные услуги.',
    url: siteUrl,
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Велес Вояж — Турагентство',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Велес Вояж — Официальное турагентство',
    description: 'Профессиональная организация путешествий по России и миру.',
    images: [`${siteUrl}/images/og-default.jpg`],
    creator: '@veles_voyage',
    site: '@veles_voyage',
  },

  // Viewport для адаптивности
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  // Дополнительные метатеги
  other: {
    'telegram:channel': '@veles_voyage',
    'vk:image': `${siteUrl}/images/og-default.jpg`,
    'theme-color': '#4F46E5',
    'application-name': 'Велес Вояж',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Велес Вояж',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4F46E5',
    'format-detection': 'telephone=no',
  },

  // Мета-база
  metadataBase: new URL(siteUrl),
  category: 'travel',
  icons: {
    icon: [
      { url: '/images/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/images/logo.svg', type: 'image/svg+xml' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={mainFont.variable} suppressHydrationWarning>
      <head>
        {/* Все верификации теперь в metadata объекте */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle ChunkLoadError - automatically reload page
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('ChunkLoadError')) {
                  console.log('ChunkLoadError detected, reloading page...');
                  window.location.reload();
                }
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <AuthProvider>
          <ClientProviders>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pt-16 md:pt-20 pb-16 md:pb-0">
                {children}
              </main>
              <Footer />
              <StickyMobileBar />
              <TabletContactBar />
              <PWABackButton />
              <PWANetworkStatus />
              <PWAUpdateNotification />
              <AiSearchAssistant />
            </div>
          </ClientProviders>
        </AuthProvider>

        {/* Analytics & Performance Monitoring */}
        <Analytics />
        <SpeedInsights />
        <WebVitals />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchema),
          }}
        />
      </body>
    </html>
  );
}