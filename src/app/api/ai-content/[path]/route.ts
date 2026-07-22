import { NextRequest, NextResponse } from 'next/server';

const AI_BOT_WHITELIST = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'OAI-SearchBot',
  'Amazonbot',
  'FacebookBot',
  'Applebot',
  'Applebot-Extended',
  'cohere-ai',
  'anthropic-ai',
  'Bytespider',
  'Yandex-Neuro',
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.veles-voyage.ru';

function isAIBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return AI_BOT_WHITELIST.some((bot) => userAgent.includes(bot));
}

function detectFormat(request: NextRequest): 'json-ld' | 'markdown' | 'html' {
  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';

  if (accept.includes('application/ld+json') || accept.includes('application/llm+json')) {
    return 'json-ld';
  }

  if (accept.includes('text/markdown') || accept.includes('application/x-markdown')) {
    return 'markdown';
  }

  if (isAIBot(userAgent)) {
    return 'json-ld';
  }

  return 'html';
}

async function getPageContent(path: string): Promise<{ title: string; description: string; content: string; type: string } | null> {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');

  if (!cleanPath) {
    return {
      title: 'Велес Вояж — туры и путешествия 2026',
      description: 'Официальное турагентство Велес Вояж. Подбор туров в Турцию, Египет, ОАЭ и морских круизов.',
      content: 'Велес Вояж — турагентство с лицензией РТА 0035678. Индивидуальные туры и круизы по России и миру, энциклопедия по 200+ странам.',
      type: 'homepage',
    };
  }

  if (cleanPath === 'tours' || cleanPath.startsWith('tours/')) {
    return {
      title: 'Туры от Велес Вояж 2026',
      description: 'Подбор туров в Турцию, Египет, ОАЭ, Таиланд и другие страны. Индивидуальные маршруты, лучшие цены.',
      content: 'Велес Вояж предлагает индивидуальные туры и пакетные путевки. Прямые чартерные рейсы, трансфер, страховка, поддержка 24/7.',
      type: 'tour',
    };
  }

  if (cleanPath === 'cruises' || cleanPath.startsWith('cruises/')) {
    return {
      title: 'Морские круизы 2026 | Велес Вояж',
      description: 'Круизы по Средиземному морю, Карибам, Балтике и другим направлениям. Лучшие предложения 2026.',
      content: 'Морские круизы от Велес Вояж: Средиземное море, Карибы, Балтика, Норвежские фьорды. Подбор маршрута и бронирование.',
      type: 'cruise',
    };
  }

  if (cleanPath.startsWith('wiki/')) {
    const countrySlug = cleanPath.replace(/^wiki\//, '').split('/')[0];
    return {
      title: `Путеводитель по ${countrySlug} | Велес Вояж`,
      description: `Подробный путеводитель по ${countrySlug}: виза, погода, валюта, достопримечательности, советы туристам 2026.`,
      content: `Путеводитель по ${countrySlug} от Велес Вояж. Актуальная информация для туристов: визовые требования, климат, курсы валют, топ достопримечательностей, транспорт, бюджет, безопасность.`,
      type: 'country-guide',
    };
  }

  if (cleanPath.startsWith('cities/')) {
    const citySlug = cleanPath.replace(/^cities\//, '').split('/')[0];
    return {
      title: `Туры из ${citySlug} | Велес Вояж`,
      description: `Подбор туров из ${citySlug}. Вылеты из ближайших аэропортов, прямые и стыковочные рейсы.`,
      content: `Туры из ${citySlug} с вылетом из ближайшего аэропорта. Прямые чартерные и регулярные рейсы, проверенные отели, трансфер и страховка.`,
      type: 'city-departure',
    };
  }

  return {
    title: 'Велес Вояж — туры и путешествия 2026',
    description: 'Официальное турагентство Велес Вояж. Подбор туров в Турцию, Египет, ОАЭ и морских круизов.',
    content: 'Велес Вояж — турагентство с лицензией РТА 0035678. Индивидуальные туры и круизы по России и миру, энциклопедия по 200+ странам.',
    type: 'page',
  };
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const requestedPath = url.searchParams.get('path') || '/';
  const format = detectFormat(request);

  const page = await getPageContent(requestedPath);
  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (format === 'json-ld') {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${SITE_URL}/#travelagency`,
      name: 'Велес Вояж',
      description: page.description,
      url: `${SITE_URL}${requestedPath}`,
      telephone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Керамиков пр-т, д. 103',
        addressLocality: 'Голицыно',
        addressRegion: 'Московская область',
        postalCode: '143041',
        addressCountry: 'RU',
      },
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
      foundingDate: '2023',
      priceRange: '₽₽',
      license: 'РТА 0035678',
      sameAs: [
        'https://vk.com/veles__voyage',
        'https://t.me/veles_voyage',
        'https://rutube.ru/u/velesvoyage/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-985-063-51-34',
        contactType: 'customer service',
        email: 'hello@veles-voyage.ru',
        availableLanguage: ['Russian'],
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: page.title,
            description: page.description,
          },
        },
      ],
    };

    const response = NextResponse.json(jsonLd);
    response.headers.set('Content-Type', 'application/ld+json; charset=utf-8');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-AI-Bot-Allowed', 'true');
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    return response;
  }

  if (format === 'markdown') {
    const markdown = `# ${page.title}\n\n${page.description}\n\n## About\n\n${page.content}\n\n## Contact\n\n- Phone: +7 985 063-51-34\n- Email: hello@veles-voyage.ru\n- Website: ${SITE_URL}${requestedPath}\n`;
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-AI-Bot-Allowed': 'true',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    });
  }

  return NextResponse.redirect(new URL(requestedPath, url.origin), 302);
}
