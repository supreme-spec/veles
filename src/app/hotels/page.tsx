import { 
  CalendarIcon, 
  TicketIcon, 
  UserIcon,
  MapPinIcon,
  CheckCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { hotelsSchema, breadcrumbSchema, faqSchema } from './metadata';
import StructuredData from '@/components/SEO/StructuredData';
import AviakassaWidget from '@/components/widgets/AviakassaWidget';
import { generatePageBreadcrumbs } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import Image from 'next/image';

const breadcrumbs = generatePageBreadcrumbs('/hotels', 'Отели');
const HERO_IMAGE = 'https://images.unsplash.com/photo-1763094006165-7db02c4abb61?w=1200&h=630&fit=crop&auto=format';

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.items.map((item, index) => (
              <li key={index}>
                {index > 0 && <span aria-hidden="true" className="text-gray-400">/</span>}
                {index === breadcrumbs.items.length - 1 ? (
                  <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                ) : (
                  <a href={item.href} className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">{item.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={HERO_IMAGE}
              alt="Поиск и бронирование отелей по всему миру онлайн через Велес Вояж"
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                🏨 Отели по всему миру
              </h1>
              <p className="text-white/90 mt-2 text-lg">Поиск и бронирование отелей онлайн</p>
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Найдите и забронируйте отели с гарантией лучшей цены. Более 200 стран, мгновенное подтверждение, поддержка 24/7.
          </p>

          {/* Speakable summary for AI/GEO/voice search */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left" aria-label="Краткая информация для голосовых помощников">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Отели от Велес Вояж</h2>
            <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
              Подбираем отели по всему миру с гарантией лучшей цены и поддержкой 24/7. Мы работаем с проверенными партнерами, предоставляя мгновенное подтверждение бронирования. Подбираем варианты под любой бюджет — от бюджетных гостиниц до люксовых курортов, помогаем с выбором района и типа размещения. Доступны отели в России, Европе, Азии, Африке, Америке и Океании.
            </p>
          </div>
        </header>

        {/* Search Widget - Aviakassa Partner */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-12 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700" aria-labelledby="hotels-search-heading">
          <div className="text-center mb-6">
            <h2 id="hotels-search-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Поиск отелей
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Найдите лучшие цены на отели по всему миру
            </p>
          </div>

          {/* Aviakassa.Partner */}
          <AviakassaWidget
            id="9878"
            channelToken="4da1c0bd1b87e6a72d79478ca5686792ff58108b"
            showAvia={false}
            showRail={false}
            showHotel
          />
          {/* Aviakassa.Partner */}
        </section>

        {/* Introduction / Value Proposition */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-12 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl" aria-labelledby="hotels-intro-heading">
          <div className="text-center mb-8">
            <h2 id="hotels-intro-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Онлайн бронирование отелей по всему миру
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Поиск и бронирование отелей в любой точке мира
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Туристическое агентство <strong>Велес Вояж</strong> предлагает полный спектр услуг по подбору и бронированию отелей:
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Отели в <strong>200+ странах мира</strong> — от столиц до экзотических курортов</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Мгновенное подтверждение</strong> бронирования на большинство отелей</span>
              </li>
              <li className="flex items-start">
                <CalendarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Гибкие даты</strong> заезда и выезда, подбор под ваш график</span>
              </li>
              <li className="flex items-start">
                <TicketIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Выгодные цены</strong> и специальные предложения от проверенных партнеров</span>
              </li>
              <li className="flex items-start">
                <UserIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Бесплатные консультации</strong> специалистов по выбору отеля</span>
              </li>
            </ul>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы сотрудничаем с ведущими отельными сетями и агрегаторами по всему миру, чтобы предложить вам лучшие условия для отдыха. Подбираем отели под любой бюджет: от бюджетных гостиниц и хостелов до люксовых курортов 5*. Помогаем с выбором района, типа размещения и дополнительных услуг.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-xl p-6 text-white mb-8">
              <blockquote className="text-lg italic">
                "Путешествие с Велес Вояж - гарантия счастливых и довольных туристов. Узнайте больше о наших турах и предложениях."
              </blockquote>
              <p className="text-right mt-4 font-medium">— Велес Вояж</p>
            </div>
          </div>
        </section>

        {/* Hotel Categories / Types */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-labelledby="hotel-types-heading">
          <h2 id="hotel-types-heading" className="sr-only">Типы отелей</h2>
          
          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                <MapPinIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Отели по всему миру
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              От эконом-отелей в центре города до люксовых курортов на побережье. Доступно бронирование в 200+ странах.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Отели в России, Европе, Азии, Африке, Америке</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">От бюджетных гостиниц до 5* люксовых отелей</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Пляжные, городские, горные и spa-отели</p>
              </li>
            </ul>
          </article>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                <CheckCircleIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Почему бронируют у нас
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Честные цены, проверенные партнеры и поддержка на каждом этапе бронирования.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Гарантия лучшей цены или вернем разницу</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Работаем только с официальными партнерами</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Бесплатная отмена на большинство вариантов</p>
              </li>
            </ul>
          </article>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                <PhoneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Поддержка 24/7
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Наши менеджеры всегда на связи и готовы помочь с выбором и бронированием отеля.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Бесплатная консультация по выбору отеля</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Помощь с оформлением и изменением брони</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Поддержка во время путешествия</p>
              </li>
            </ul>
          </article>
        </section>

        {/* How To Book - AEO optimized */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="how-to-book-heading">
          <h2 id="how-to-book-heading" className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Как забронировать отель онлайн за 4 шага
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Выберите направление и даты</h3>
                <p className="text-gray-600 dark:text-gray-300">Укажите город или страну, даты заезда и выезда, количество гостей и категорию отеля.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Сравните варианты</h3>
                <p className="text-gray-600 dark:text-gray-300">Просмотрите доступные отели, сравните цены, рейтинги и удобства. Мы покажем лучшие предложения.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Оформите бронирование</h3>
                <p className="text-gray-600 dark:text-gray-300">Выберите подходящий отель и оформите бронирование через нашего менеджера или партнерскую платформу.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Получите подтверждение</h3>
                <p className="text-gray-600 dark:text-gray-300">Получите подтверждение на почту. Предъявите номер бронирования при заселении в отеле.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations for Hotels - SEO content */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="popular-hotels-heading">
          <h2 id="popular-hotels-heading" className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Популярные направления для бронирования отелей
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇷🇺 Россия</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Москва, Санкт-Петербург, Сочи, Казань, Калининград, Алтай</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇹🇷 Турция</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Анталья, Стамбул, Бодрум, Каппадокия, Мармарис, Кушадасы</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇪🇬 Египет</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Хургада, Шарм-эль-Шейх, Марса-Алам, Каир, Александрия</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇦🇪 ОАЭ</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Дубай, Абу-Даби, Шарджа, Рас-аль-Хайма, Фуджейра</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇹🇭 Таиланд</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Паттайя, Пхукет, Бангкок, Самуи, Краби, Чианг Май</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇪🇸 Испания</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Барселона, Мадрид, Валенсия, Севилья, Коста-Брава, Майорка</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇮🇹 Италия</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Рим, Милан, Венеция, Флоренция, Амальфи, Сицилия</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🇬🇷 Греция</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Афины, Санторини, Крит, Миконос, Корфу, Родос</p>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="hotels-seo-heading">
          <h2 id="hotels-seo-heading" className="text-3xl font-extrabold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Поиск и бронирование отелей по всему миру с Велес Вояж
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Велес Вояж — это современный туристический агрегатор, который помогает находить и бронировать отели по всему миру онлайн. Мы объединили сотни проверенных партнеров, чтобы предложить вам максимально широкий выбор размещения: от бюджетных хостелов и гостиниц до премиум-отелей 5* и люксовых курортов. Благодаря прямому интеграции с ведущими отельными системами, мы обеспечиваем мгновенное подтверждение бронирования и гарантируем честные цены без скрытых комиссий.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🏨 Какие отели доступны для бронирования?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              В нашей базе — отели всех категорий и типов размещения. Вы можете забронировать городской отель в центре Москвы или Санкт-Петербурга, пляжный курорт в Турции или Египте, горный отель в Альпах или на Алтае, спа-отель в Европе или бутик-отель на островах. Мы предлагаем варианты для отдыха с семьей, романтические поездки, корпоративные размещения и индивидуальные туры.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🌍 Популярные направления для бронирования отелей
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Чаще всего наши клиенты бронируют отели в Турции, Египте, ОАЭ, Таиланде, Испании, Италии, Греции, а также по России — в Сочи, Краснодарском крае, Крыму и других регионах. Мы также помогаем подобрать отели в менее популярных, но интересных направлениях: в Азии, Африке, Южной Америке и Океании. Для каждого направления у нас есть актуальные предложения и персональные рекомендации.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              💰 Почему выгодно бронировать отели через Велес Вояж?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Прямые контракты с отельными сетями и агрегаторами позволяют предлагать цены ниже, чем при самостоятельном бронировании. Мы регулярно обновляем базу специальных предложений и горящих туров, поэтому у вас есть шанс получить существенную экономию. Все бронирования защищены, а оплата происходит через безопасные платежные системы.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              📋 Как забронировать отель: пошаговая инструкция
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Процесс бронирования простой и занимает несколько минут. Выберите направление и даты на нашем сайте или напишите менеджеру в Telegram. Мы подберем подходящие варианты, сравним цены и условия, поможем с выбором и оформим бронирование. После оплаты вы получите подтверждение на почту. Если планы изменятся, мы поможем с отменой или изменением бронирования в соответствии с условиями отеля.
            </p>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mt-8">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="mr-2">🌟</span>
                Начните планировать ваш отдых уже сегодня!
              </h3>
              <p className="mb-4">
                Отели с Велес Вояж — это гарантия лучших цен, профессиональной организации и комфортного отдыха. 
                Свяжитесь с нами, чтобы подобрать идеальный отель для вашей поездки.
              </p>
              <p className="font-medium">
                Откройте для себя мир комфорта и незабываемых впечатлений вместе с нами!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Extended for AEO */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-16" aria-labelledby="hotels-faq-heading">
          <h2 id="hotels-faq-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Часто задаваемые вопросы о бронировании отелей
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Как забронировать отель онлайн через Велес Вояж?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Вы можете забронировать отель через наш сайт, связаться с нами по WhatsApp или Telegram. 
                Наши специалисты помогут подобрать оптимальный вариант по направлению, датам и бюджету.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Можно ли отменить бронирование отеля?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Условия отмены зависят от выбранного отеля и тарифа. Многие отели предлагают бесплатную отмену 
                за определенное время до заезда. Мы всегда указываем условия бронирования до оплаты.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Как получить подтверждение бронирования?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                После бронирования мы вышлем подтверждение на вашу электронную почту. Для заселения в отеле 
                достаточно предъявить паспорт и номер бронирования.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Какие отели доступны для бронирования?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Мы сотрудничаем с ведущими отельными сетями и агрегаторами по всему миру. У нас доступны отели 
                от бюджетных гостиниц до люксовых курортов 5*, включая все основные категории: стандарт, 
                улучшенный, семейный, бизнес, spa-отели и бутик-отели.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Есть ли специальные предложения на отели?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Да, мы регулярно предлагаем специальные предложения и акции на отели. Подпишитесь на наш 
                Telegram-канал или напишите менеджеру, чтобы получить доступ к горящим предложениям и 
                персональным скидкам на бронирование.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                В каких странах можно забронировать отель?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Мы предлагаем бронирование отелей в более чем 200 странах мира: в России, Европе, Азии, 
                Африке, Америке и Океании. Самые популярные направления — Турция, Египет, ОАЭ, Таиланд, 
                Испания, Италия, Греция, а также курорты России: Сочи, Крым, Алтай, Байкал.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Готовы к отдыху?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами, чтобы подобрать идеальный отель для вашей поездки
            </p>
            <a 
              href="https://t.me/Anastasiiiiyyaa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium transform hover:scale-105 inline-block no-underline"
            >
              Связаться с нами
            </a>
          </div>
        </div>

        {/* Structured Data */}
        <StructuredData schemas={[hotelsSchema, breadcrumbSchema, faqSchema]} />

        {/* Web3 and voice search optimization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Велес Вояж",
              "url": `${SITE_URL}`,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/hotels?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "about": {
                "@type": "TravelAgency",
                "name": "Велес Вояж",
                "description": "Поиск и бронирование отелей по всему миру. Более 200 стран, мгновенное подтверждение, лучшие цены без скрытых комиссий, поддержка 24/7."
              }
            })
          }}
        />
      </div>
    </div>
  );
}

export { hotelsMetadata as metadata } from './metadata';
