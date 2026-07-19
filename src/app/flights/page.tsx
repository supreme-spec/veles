import type { Metadata } from 'next';
import AviakassaWidget from '@/components/widgets/AviakassaWidget';

export const metadata: Metadata = {
  title: 'Авиабилеты: поиск и бронирование по миру 2026',
  description: 'Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены на даты вашей поездки.',
  keywords: [
    'авиабилеты',
    'билеты на самолет',
    'поиск авиабилетов',
    'дешевые авиабилеты',
    'бронирование авиабилетов',
    'перелеты по миру',
    'авиабилеты онлайн',
    'прямые рейсы',
    'авиакомпании',
    'билеты за границу',
    'авиабилеты из России',
    'чартерные рейсы'
  ],
  alternates: {
    canonical: 'https://www.veles-voyage.ru/flights'
  },
  openGraph: {
    title: 'Авиабилеты по всему миру | Велес Вояж',
    description: 'Поиск и бронирование авиабилетов у официальных перевозчиков по лучшим ценам',
    url: 'https://www.veles-voyage.ru/flights',
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
    type: 'website',
    images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop'],
  }
};

// Schema.org structured data for voice search, AI, web3 compatibility
const flightsSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAction",
  "name": "Авиабилеты по всему миру",
  "description": "Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены на даты поездки от Велес Вояж.",
  "actionStatus": "PotentialActionStatus",
  "target": "https://www.veles-voyage.ru/flights",
  "provider": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "url": "https://www.veles-voyage.ru"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://www.veles-voyage.ru"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Авиа/Отели",
      "item": "https://www.veles-voyage.ru/flights"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как найти самые дешевые авиабилеты?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ищите билеты заранее, сравнивайте даты вылета с гибким окном плюс-минус несколько дней и рассматривайте рейсы с пересадками наравне с прямыми. Подпишитесь на уведомления о снижении цен и бронируйте через проверенных партнеров без скрытых комиссий. Наша система сравнивает сотни вариантов, чтобы предложить честную цену на выбранные даты."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли вернуть авиабилет, если передумал?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Возврат зависит от тарифа: возвратные билеты можно сдать полностью или частично, а невозвратные обычно допускают возврат только при болезни или отмене рейса перевозчиком. Обмен и возврат оформляются в личном кабинете или через службу поддержки 24/7. Точные условия всегда указаны при бронировании до оплаты."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза при покупке авиабилета?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Сам билет можно купить без визы, но для въезда в страну назначения может потребоваться виза, загранпаспорт со сроком действия не менее 6 месяцев и проездной документ. Наши специалисты помогут проверить визовые требования по направлению и подобрать подходящий маршрут."
      }
    }
  ]
};

// Web3 and voice search optimization schema
const web3Schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Велес Вояж",
  "url": "https://www.veles-voyage.ru",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.veles-voyage.ru/flights{?q}",
    "query-input": "required name=q"
  },
  "about": {
    "@type": "TravelAgency",
    "name": "Велес Вояж",
    "description": "Онлайн сервис по поиску и бронированию авиабилетов у официальных перевозчиков. Удобные стыковки, честные цены, поддержка 24/7."
  }
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Авиабилеты по всему миру: поиск и бронирование по лучшим ценам",
  "description": "Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены.",
  "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop",
  "datePublished": "2026-07-15",
  "dateModified": "2026-07-15",
  "author": [
    { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция" },
    { "@type": "Organization", "name": "Велес Вояж" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.veles-voyage.ru/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.veles-voyage.ru/flights"
  },
  "articleSection": "Авиабилеты",
  "keywords": "авиабилеты, поиск авиабилетов, бронирование, перелеты, авиакомпании",
  "wordCount": 2500,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": "2026-07-15"
};

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            ✈️ Авиабилеты по всему миру: поиск и бронирование по лучшим ценам
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Находите и бронируйте билеты у официальных перевозчиков без скрытых комиссий
          </p>

          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Авиабилеты от Велес Вояж</h2>
            <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
              Мы помогаем находить и бронировать авиабилеты у официальных перевозчиков без скрытых комиссий. Система сравнивает сотни вариантов, чтобы предложить самые удобные стыковки и честные цены на даты вашей поездки. Выбирайте прямые рейсы и пересадки, ориентируйтесь на бюджет и время в пути, получайте электронный билет сразу после оплаты. Поддержка 24/7 помогает с оформлением, возвратом и обменом билетов, а также с подбором оптимального маршрута под ваши цели — будь то отдых, командировка или транзит.
            </p>
          </div>
        </div>

        {/* Travelpayouts Search Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-12 max-w-6xl mx-auto border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Поиск авиабилетов
          </h2>

          {/* Aviakassa.Partner */}
          <AviakassaWidget
            id="9870"
            channelToken="3332f56e290f67d4f939f48ed8d2d1a578817244"
            showAvia
            showRail={false}
            showHotel={false}
          />
          {/* Aviakassa.Partner */}
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="font-bold text-lg mb-2">По всему миру</h3>
            <p className="text-gray-600 dark:text-gray-400">Более 200 стран и регионов</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">Лучшие цены</h3>
            <p className="text-gray-600 dark:text-gray-400">Сравнение цен от ведущих авиакомпаний</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-bold text-lg mb-2">Мгновенно</h3>
            <p className="text-gray-600 dark:text-gray-400">Бронирование в несколько кликов</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="font-bold text-lg mb-2">Надежно</h3>
            <p className="text-gray-600 dark:text-gray-400">Гарантия безопасности платежей</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Почему выбирают нас
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                  <div className="text-2xl">🌍</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Индивидуальный подбор рейсов</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Наши специалисты помогут подобрать оптимальный рейс, учитывая ваши интересы, 
                    бюджет и время поездки. Мы предлагаем перелеты различной продолжительности и направлений 
                    по всему миру через партнерскую платформу поиска авиабилетов.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                  <div className="text-2xl">🔍</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Экспертная консультация</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональная помощь в планировании путешествий. Наши менеджеры проконсультируют 
                    по всем вопросам, помогут с выбором направления, отелей и достопримечательностей.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                  <div className="text-2xl">💳</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Гибкие условия бронирования</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Различные варианты оплаты, рассрочка, возможность изменений и отмены бронирования. 
                    Прозрачные условия без скрытых комиссий при работе через нашу партнерскую платформу поиска.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                  <div className="text-2xl">📞</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Сопровождение 24/7</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Поддержка на всех этапах путешествия - до, во время и после поездки. 
                    Помощь в решении любых вопросов, возникающих в ходе путешествия через нашу службу поддержки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership with largest aggregator */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-2xl shadow-xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Поиск через крупнейший агрегатор</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="bg-white/20 rounded-xl p-6 text-center max-w-md">
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold mb-2">Крупнейший агрегатор</h3>
                <p className="text-lg">билетов в мире</p>
              </div>
            </div>
            
            <div>
              <p className="text-lg mb-4">
                Мы сотрудничаем с крупнейшим агрегатором билетов, предоставляя доступ к тысячам 
                предложений от ведущих авиакомпаний и туроператоров по лучшим ценам.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🔍</span>
                  Удобный поиск
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Сравнение цен</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Фильтрация по различным параметрам</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Мгновенное бронирование</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🛡️</span>
                  Надежность
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Прямое бронирование через платформу</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Гарантия безопасности платежей</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Поддержка 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg">
                Все бронирования осуществляются напрямую через партнерскую платформу поиска билетов.
              </p>
            </div>
          </div>
        </div>

        {/* GEO/AEO comparison table: Plane vs Train */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="flights-compare-heading">
          <h2 id="flights-compare-heading" className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Самолет vs Поезд: что выбрать для вашей поездки
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <caption style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>Сравнение перелета и поездки на поезде по критериям: время в пути, комфорт, багаж и цена</caption>
              <thead>
                <tr className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200">
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Критерий</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Самолет</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Поезд</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium">Время в пути</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Самый быстрый способ на дальние расстояния</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Дольше, но без времени на регистрацию и досмотр</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium">Комфорт</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Кресла с откидной спинкой, питание на борту</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Можно ходить, больше личного пространства, спальные места</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium">Багаж</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Лимит по весу и габаритам, доплата за сверхнорму</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Без жестких ограничений, можно взять больше вещей</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium">Цена</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Выгоднее при раннем бронировании и в сезон распродаж</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Часто дешевле на средние расстояния внутри страны</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к путешествию?</h2>
            <p className="text-indigo-100 mb-6">
              Найдите лучшие предложения на авиабилеты через нашу партнерскую платформу
            </p>
            <a 
              href="https://t.me/Anastasiiiiyyaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105 no-underline"
            >
              Связаться с нами
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Часто задаваемые вопросы</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Как найти самые дешевые авиабилеты?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ищите билеты заранее, сравнивайте даты вылета с гибким окном плюс-минус несколько дней и 
                рассматривайте рейсы с пересадками наравне с прямыми. Подпишитесь на уведомления о снижении 
                цен и бронируйте через проверенных партнеров без скрытых комиссий. Наша система сравнивает 
                сотни вариантов, чтобы предложить честную цену на выбранные даты.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Можно ли вернуть авиабилет, если передумал?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Возврат зависит от тарифа: возвратные билеты можно сдать полностью или частично, а невозвратные 
                обычно допускают возврат только при болезни или отмене рейса перевозчиком. Обмен и возврат 
                оформляются в личном кабинете или через службу поддержки 24/7. Точные условия всегда указаны 
                при бронировании до оплаты.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Нужна ли виза при покупке авиабилета?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Сам билет можно купить без визы, но для въезда в страну назначения может потребоваться виза, 
                загранпаспорт со сроком действия не менее 6 месяцев и проездной документ. Наши специалисты 
                помогут проверить визовые требования по направлению и подобрать подходящий маршрут.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO, voice search, AI and web3 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(flightsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web3Schema) }}
        />
      </div>
    </div>
  );
}