import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { WeeklyServicePhoto } from '@/shared/components/ui/WeeklyServicePhoto';
import { generateEnhancedSEOMetadata as generateSEOMetadata } from '@/lib/seo/unifiedSEO';
import { generateUniversalSchemas } from '@/lib/seo/universalSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { FAQSection } from '@/components/FAQSection';
import { BookingSteps } from '@/components/BookingSteps';
import { WeeklyHeroBackground } from '@/shared/components/ui/WeeklyHeroBackground';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SITE_URL } from '@/shared/constants/seo';
import { DestinationImage } from '@/components/DestinationImage';
export const metadata: Metadata = generateSEOMetadata({
  title: 'Велес Вояж: туры и круизы 2026 | Путешествия',
  description:
    'Турагентство Велес Вояж (РТА 0035678): подбор туров в Турцию, Египет, ОАЭ, морские круизы. Поддержка 24/7.',
  url: SITE_URL,
  type: 'website',
  keywords: [
    'индивидуальные туры',
    'авторские путешествия',
    'морские круизы 2026',
    'путеводители по странам',
    'турагентство Велес Вояж',
    'РТА 0035678'
  ],
  faqs: [
    {
      question: 'Как забронировать тур в Велес Вояж?',
      answer:
        'Забронируйте тур онлайн на сайте или позвоните +7 985 063-51-34. Менеджер подберет маршрут и свяжется с вами в течение 15 минут.'
    },
    {
      question: 'Работаете ли вы с турами по России?',
      answer:
        'Да, мы организуем индивидуальные путешествия по всем регионам России, а также международные туры и морские круизы с полной поддержкой 24/7.'
    }
  ],
});



const POPULAR_DESTINATION_SLUGS = [
  'турция',
  'египет',
  'оаэ',
  'таиланд',
  'мальдивы',
  'греция',
  'шри-ланка',
  'вьетнам',
];

export default async function Home() {
  const schemas = await generateUniversalSchemas({
    title: 'Велес Вояж: туры, круизы и путешествия 2026',
    description:
      'Официальное турагентство Велес Вояж (РТА 0035678). Подбор туров в Турцию, Египет, ОАЭ и морских круизов. Индивидуальные маршруты, поддержка 24/7, лучшие цены.',
    url: SITE_URL,
    type: 'website',
    keywords: [
      'индивидуальные туры',
      'авторские путешествия',
      'морские круизы 2026',
      'путеводители по странам',
      'турагентство Велес Вояж',
      'РТА 0035678'
    ],
    faqs: [
      {
        question: 'Как забронировать тур в Велес Вояж?',
        answer:
          'Забронируйте тур онлайн на сайте или позвоните +7 985 063-51-34. Менеджер подберет маршрут и свяжется с вами в течение 15 минут.'
      },
      {
        question: 'Работаете ли вы с турами по России?',
        answer:
          'Да, мы организуем индивидуальные путешествия по всем регионам России, а также международные туры и морские круизы с полной поддержкой 24/7.'
      },
      {
        question: 'Нужна ли виза в Египет в 2026 году?',
        answer:
          'Для граждан России виза в Египет оформляется по прибытии в аэропорт (стоимость около 25 USD) либо заранее через электронную визу. Загранпаспорт должен быть действителен минимум 6 месяцев.'
      },
      {
        question: 'Сколько стоит тур в Турцию «всё включено» из Москвы?',
        answer:
          'Тур в Турцию «всё включено» из Москвы на двоих обычно стоит от 90 000 до 160 000 рублей за 7 ночей в зависимости от отеля и сезона. Точную цену подберёт менеджер Велес Вояж.'
      }
    ],
  });

  const faqData = [
    {
      question: 'Как забронировать тур в Велес Вояж?',
      answer:
        'Забронируйте тур онлайн на сайте или позвоните +7 985 063-51-34. Менеджер подберет маршрут и свяжется с вами в течение 15 минут.'
    },
    {
      question: 'Работаете ли вы с турами по России?',
      answer:
        'Да, мы организуем индивидуальные путешествия по всем регионам России, а также международные туры и морские круизы с полной поддержкой 24/7.'
    },
    {
      question: 'Нужна ли виза в Египет в 2026 году?',
      answer:
        'Для граждан России виза в Египет оформляется по прибытии в аэропорт (стоимость около 25 USD) либо заранее через электронную визу. Загранпаспорт должен быть действителен минимум 6 месяцев.'
    },
    {
      question: 'Сколько стоит тур в Турцию «всё включено» из Москвы?',
      answer:
        'Тур в Турцию «всё включено» из Москвы на двоих обычно стоит от 90 000 до 160 000 рублей за 7 ночей в зависимости от отеля и сезона. Точную цену подберёт менеджер Велес Вояж.'
    }
  ];

  return (
    <>
      <SchemaScripts schemas={schemas} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <WeeklyHeroBackground>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 text-center text-white">
            <div className="mt-12 md:mt-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Турагентство Велес Вояж — подбор туров и путешествий 2026
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg">
                <span className="bg-gradient-to-r from-white/95 via-blue-50/90 to-indigo-100/90 bg-clip-text text-transparent">
                  Путешествуйте с уверенностью, исследуйте с экспертами и откройте новые горизонты
                </span>
              </p>

              {/* Info card and buttons - side by side layout */}
              <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
                {/* Buttons - left side */}
                <div className="order-1 lg:order-1 flex flex-col gap-5 justify-center lg:justify-start">
                  <Link
                    href="/wiki"
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 hover:from-green-700 hover:via-emerald-600 hover:to-green-700 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      <span>Исследовать Wiki</span>
                    </span>
                  </Link>
                  <Link
                    href="/wiki/countries"
                    className="group relative inline-flex items-center justify-center bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 border-2 border-white/60 hover:border-white shadow-2xl hover:shadow-white/30 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-2xl">🌍</span>
                      <span>Страны мира</span>
                    </span>
                  </Link>
                  <Link
                    href="/wiki/places"
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-2xl">🗺️</span>
                      <span>Мировые локации</span>
                    </span>
                  </Link>
                </div>

                {/* Info card - right side */}
                <div className="order-2 lg:order-2">
                  <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md rounded-xl shadow-2xl p-3 md:p-4 border border-white/30 dark:border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden max-w-sm">
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-emerald-400/10 rounded-full blur-2xl -z-0"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                          <span className="text-base">✈️</span>
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                          Путешествуйте через наше турагентство
                        </h2>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start space-x-2 p-2 rounded-md bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 dark:hover:from-green-900/30 transition-all duration-300 border border-green-100/50 dark:border-green-800/30">
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-0.5 text-left">
                              Предоставляем лучшие цены
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-tight text-left">
                              Прямые договоренности с туроператорами
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-2 rounded-md bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 dark:hover:from-blue-900/30 transition-all duration-300 border border-blue-100/50 dark:border-blue-800/30">
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-0.5 text-left">
                              Официальная лицензия РТА 0035678
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-tight text-left">
                              аккредитованное турагентство
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-2 rounded-md bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 dark:hover:from-purple-900/30 transition-all duration-300 border border-purple-100/50 dark:border-purple-800/30">
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-0.5 text-left">
                              Поддержка 24/7
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-tight text-left">
                              Круглосуточная помощь
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-2 rounded-md bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 dark:hover:from-orange-900/30 transition-all duration-300 border border-orange-100/50 dark:border-orange-800/30">
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-0.5 text-left">
                              Индивидуальный подход
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-tight text-left">
                              Маршруты под ваши интересы
                            </p>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://t.me/Anastasiiiiyyaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block w-full text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 text-xs md:text-sm overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                        <span className="relative z-10">Выбрать тур</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WeeklyHeroBackground>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Почему выбирают Велес Вояж?
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Мы создаем незабываемые путешествия для наших клиентов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div className="text-4xl mb-4 animate-float relative z-10">🏆</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10">
                  Официальная лицензия
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  РТА 0035678 с 2023 года
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div
                  className="text-4xl mb-4 animate-float relative z-10"
                  style={{ animationDelay: '0.2s' }}
                >
                  👥
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10">
                  Индивидуальный подход
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  Маршруты под ваши интересы и бюджет
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div
                  className="text-4xl mb-4 animate-float relative z-10"
                  style={{ animationDelay: '0.4s' }}
                >
                  🎧
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10">
                  Поддержка 24/7
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  Круглосуточная помощь во время путешествий
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div
                  className="text-4xl mb-4 animate-float relative z-10"
                  style={{ animationDelay: '0.6s' }}
                >
                  🌍
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10">
                  Экспертное знание
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  Более 200 стран и направлений
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наши услуги</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Откройте для себя уникальные направления и незабываемые приключения
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto serviceType="tours" alt="Туры" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Туры</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Маршруты под ваши интересы и бюджет
                  </p>
                  <Link
                    href="/tours"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-sm mt-auto shadow-modern relative z-10"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:via-blue-500/10 group-hover:to-cyan-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-40 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center relative z-10 overflow-hidden">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto
                      serviceType="cruises"
                      cruiseType="mediterranean"
                      alt="Морские круизы по Средиземному морю и Карибам от Велес Вояж"
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Морские круизы
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Откройте красоты океанских островов и морских побережий
                  </p>
                  <Link
                    href="/cruises"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-sm mt-auto shadow-modern relative z-10"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-rose-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center relative z-10">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto serviceType="support" alt="Круглосуточная поддержка клиентов 24/7 от Велес Вояж" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Поддержка 24/7
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Круглосуточная помощь в планировании и во время путешествий
                  </p>
                  <Link
                    href="/support"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-sm mt-auto shadow-modern relative z-10"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations (GEO: "Туры В ...") */}
        <section className="py-16 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Куда поехать в 2026 году: популярные направления и цены
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Туры в самые востребованные страны: визы, лучшие курорты и цены
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {POPULAR_DESTINATION_SLUGS.map((slug) => {
                const dest = WORLD_DESTINATIONS_DATA[slug];
                if (!dest) return null;
                return (
                    <article key={slug} className="country-card">
                      <div className="country-image">
                        <DestinationImage
                          src={dest.image}
                          alt={`Туры в ${dest.name} - популярное направление 2026 от Велес Вояж`}
                          width={600}
                          height={400}
                          className="w-full h-full"
                        />
                      </div>
                      <h3>Сколько стоит тур в {dest.name} и нужна ли виза?</h3>
                      <p className="speakable-summary flex-1">{dest.description}</p>
                      <Link
                        href={`/wiki/${dest.slug}`}
                        className="more-link"
                      >
                        Подробнее →
                      </Link>
                    </article>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/wiki/countries"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Все страны и направления
              </Link>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наша философия</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Открываем мир через призму личного опыта
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">🛡️</span> Велес — покровитель путешественников
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Имя нашего агентства не случайно. Велес — древнеславянский бог-покровитель
                  путешественников, торговцев и странников. Он олицетворяет мудрость, накопленную
                  через познание мира, и защищает тех, кто отважился покинуть привычное окружение
                  ради новых открытий.
                </p>
                <Link
                  href="/mission"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
                >
                  Наша миссия
                </Link>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2 text-green-500">✨</span> Наши ценности
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Аутентичные и уникальные впечатления
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Устойчивый и ответственный туризм
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Современные технологии в путешествиях
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Персональный подход к каждому клиенту
                    </li>
                  </ul>
                  <Link
                    href="/values"
                    className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4"
                  >
                    Подробнее о наших ценностях
                  </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2 text-blue-500">🎯</span> Наш подход
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Индивидуальные маршруты под ваши интересы
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Экспертное знание направлений
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Полное сопровождение 24/7
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Безопасность и комфорт
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наша команда</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Команда опытных путешественников и профессионалов туристической индустрии
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg">
                  <Image
                    src="/images/svistunov.webp"
                    alt="Свистунов Сергей Григорьевич - Генеральный директор ООО Велес"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Сергей Свистунов
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  Генеральный директор
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-gray-600/50 shadow-sm">
                  Опытный предприниматель и путешественник с глубокими знаниями туристической
                  индустрии
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg">
                  <Image
                    src="/images/kolesnikova.webp"
                    alt="Колесникова Анастасия Юрьевна - Директор ООО Велес"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Анастасия Колесникова
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Директор</p>
                <p className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-gray-600/50 shadow-sm">
                  Эксперт в области туристических услуг и клиентского сопровождения
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Подробнее о нас
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Преимущества работы с нами
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Полная поддержка на всех этапах путешествия
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
                <div className="text-4xl mb-4 text-blue-600">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Полная энциклопедия
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Подробные путеводители по всем странам мира с актуальной информацией о визах,
                  культуре и достопримечательностях.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-green-500">
                <div className="text-4xl mb-4 text-green-600">📱</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Цифровые решения
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Современные решения для планирования и организации путешествий.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-purple-500">
                <div className="text-4xl mb-4 text-purple-600">🌟</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Персональный опыт
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Индивидуальные рекомендации и маршруты, адаптированные под ваши предпочтения и
                  стиль путешествий.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-yellow-500">
                <div className="text-4xl mb-4 text-yellow-600">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Лучшие цены
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Прямые договоренности с поставщиками услуг и эксклюзивные предложения позволяют
                  предлагать лучшие цены на рынке.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-red-500">
                <div className="text-4xl mb-4 text-red-600">🛡️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Надежность и безопасность
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Лицензия РТА 0035678, полное страхование и юридическая защита всех туристических
                  услуг.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="text-4xl mb-4 text-indigo-600">🎧</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Круглосуточная поддержка
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Наши специалисты всегда на связи для решения любых вопросов во время вашего
                  путешествия.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HowTo: Как забронировать тур в 5 шагов */}
        <BookingSteps />

        {/* FAQ Section */}
        <FAQSection faqs={faqData} />

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы начать путешествие?
            </h2>
            <p className="text-xl text-white mb-8">
              Присоединяйтесь к сообществу путешественников и откройте мир заново
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/wiki"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Начать исследование
              </Link>
              <Link
                href="/wiki/countries"
                className="inline-flex items-center justify-center bg-transparent hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 border-2 border-white"
              >
                Посмотреть страны
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
