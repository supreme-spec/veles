import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCitySlug } from '@/lib/slugify';
import { countryNamesDictionary } from '@/shared/data/country-names-dictionary';
import { allCities } from '@/app/cities/all-cities';

// Whitelist для ИИ-ботов (GEO/AEO optimization)
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
  'Bytespider'
];

const LEGACY_SLUG_MAP: Record<string, string> = {
  'abkhaziya-gid': 'abkhazia',
  'niderlandy-gid': 'netherlands',
  'polsha-gid': 'poland',
  'panama-gid': 'panama',
  'venezuela-gid': 'venezuela',
  'vetnam-gid': 'vietnam',
  'zapadnaya-sahara-gid': 'western-sahara',
  'yemen-gid': 'yemen',
  'north-korea-gid': 'north-korea',
  'horvatiya-gid': 'croatia',
  'vengriya-gid': 'hungary',
  'kosta-rika-ekologicheskaya-respublika-gid': 'costa-rica',
  'palestina-gid': 'palestine',
  'singapur-gid': 'singapore',
  'slovakiya-gid': 'slovakia',
  'sloveniya-gid': 'slovenia',
  'solomonovy-ostrova-melaneziya-gid': 'solomon-islands',
  'yuzhno-afrikanskaya-respublika-gid': 'south-africa',
  'uzhnaia-koreya-gid': 'south-korea',
  'yuzhnaya-osetiya-gid': 'south-ossetia',
  'ispaniya-gid': 'spain',
  'shri-lanka-gid': 'sri-lanka',
  'shveitsariya-gid': 'switzerland',
  'siriya-gid': 'syria',
  'oae-gid': 'uae',
  'velikobritaniya-gid': 'uk',
  'turtsiya-gid': 'turkey',
  'ssha-gid': 'usa',
  'maldivy-gid': 'maldives',
  'malayziya-gid': 'malaysia',
  'avstriya-gid': 'austria',
  'bolgariya-gid': 'bulgaria',
  'kuba-respublika-gid': 'cuba',
  'chekhiya-gid': 'czechia',
  'cyprus-gid': 'cyprus',
  'cambodia-gid': 'cambodia',
  'portugaliya-gid': 'portugal',
  'uzbekistan-gid': 'uzbekistan',
  'vanuatu-gid': 'vanuatu',
  'kitai-gid': 'china',
  'yaponiya-gid': 'japan',
  'tury-iz-dagestan': 'dagestan',
  'tury-iz-liski': 'liski',
  'tury-iz-lipetsk': 'lipetsk',
  'tury-iz-rostov-na-donu': 'rostov-on-don',
};

// Справочники для разрешения битых внутренних ссылок вида /wiki/<тип>/<имя>
const COUNTRY_IDS = new Set(Object.keys(countryNamesDictionary));
const CITY_SLUGS = new Set(allCities.map(generateCitySlug));
const WIKI_STATIC = new Set([
  'countries', 'countries-mdx', 'culture',
  'places', 'travel-tips', 'intro',
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Whitelist для ИИ-ботов - разрешаем доступ без rate limiting
  const isAIBot = AI_BOT_WHITELIST.some((bot: string) => userAgent.includes(bot));
  if (isAIBot) {
    const response = NextResponse.next();
    response.headers.set('X-AI-Bot-Allowed', 'true');
    return response;
  }

  if (pathname.startsWith('/wiki/')) {
    const slug = pathname.replace('/wiki/', '').split('/')[0];
    const canonical = LEGACY_SLUG_MAP[slug as keyof typeof LEGACY_SLUG_MAP];
    if (canonical) {
      const newPath = `/wiki/${canonical}${pathname.replace('/wiki/' + slug, '')}`;
      return NextResponse.redirect(new URL(newPath, request.url), 301);
    }

    // Разрешение битых ссылок MDX: /wiki/<тип>/<имя> (hotels, cities, nature, guides, ...)
    // Не трогаем реальные маршруты: /wiki/<country> и /wiki/<country>/<section>,
    // а также статические разделы (/wiki/destinations, /wiki/places, ...).
    const segments = pathname.split('/').filter(Boolean);
    const type = segments[1];
    if (type && !COUNTRY_IDS.has(type) && !WIKI_STATIC.has(type)) {
      const name = segments[2];
      if (!name) {
        return NextResponse.redirect(new URL('/wiki', request.url), 301);
      }
      const countryMatch = [...COUNTRY_IDS].find(
        (id) => name === id || name.startsWith(`${id}-`)
      );
      if (countryMatch) {
        return NextResponse.redirect(new URL(`/wiki/${countryMatch}`, request.url), 301);
      }
      if (CITY_SLUGS.has(name)) {
        return NextResponse.redirect(new URL(`/cities/${name}`, request.url), 301);
      }
      return NextResponse.redirect(new URL('/wiki', request.url), 301);
    }
  }

  // 301-редирект с кириллических URL городов/регионов на латинские слаги
  if (pathname.startsWith('/cities/')) {
    const segments = pathname.split('/');
    const citySeg = segments[2];
    if (citySeg && /[а-яА-ЯёЁ]/.test(citySeg)) {
      segments[2] = generateCitySlug(decodeURIComponent(citySeg));
      return NextResponse.redirect(new URL(segments.join('/'), request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/wiki/:path*', '/cities/:path*'],
};
