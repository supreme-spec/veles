import type { Metadata } from 'next';
import Link from 'next/link';
import { ReadableContent } from '@/shared/components/ui/ReadableContentEnhanced';

export const metadata: Metadata = {
  title: 'Культура народов мира | Традиции и обычаи | Велес Вояж',
  description:
    'Изучите культурные традиции, обычаи, кухню и особенности разных народов мира. Подробные гиды по культурному наследию стран для путешественников 2026.',
  keywords: [
    'культура',
    'традиции',
    'обычаи',
    'кухня',
    'народы мира',
    'культурное наследие',
    'путешествия',
    'Велес Вояж',
    'культура стран',
    'этнография',
    'национальные традиции',
    'религиозные обычаи',
    'праздники народов',
    'этикет разных стран',
    'культурный туризм',
    'туризм 2026',
    'путеводитель по культуре',
    'культурные особенности',
    'межкультурное общение',
  ],
  openGraph: {
    title: 'Культура народов мира',
    description: 'Традиции, обычаи, кухня и культурные особенности разных народов',
    type: 'article',
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4',
    yandex:
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
      '1b9d713dc3f02bed',
    other: {
      'yandex-verification':
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
        '1b9d713dc3f02bed',
      'tg:site_verification':
        process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || 'veles_voyage_official',
    },
  },
};

// Компонент навигации по культурным регионам
const CultureNavigation = ({ currentSection }: { currentSection?: string }) => {
  const sectionGroups = {
    Регионы: [
      { id: 'europe', title: '🏰 Европа', path: `/wiki/culture#europe` },
      { id: 'asia', title: '🏮 Азия', path: `/wiki/culture#asia` },
      { id: 'americas', title: '🦅 Америки', path: `/wiki/culture#americas` },
    ],
    Аспекты: [
      { id: 'traditions', title: '🎯 Традиции', path: `/wiki/culture#traditions` },
      { id: 'cuisine', title: '🍽️ Кухня', path: `/wiki/culture#cuisine` },
      { id: 'etiquette', title: '🤝 Этикет', path: `/wiki/culture#etiquette` },
    ],
  };

  return (
    <nav className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        🎭 Культурные разделы
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(sectionGroups).map(([groupName, sections]) => (
          <div
            key={groupName}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              {groupName}
            </h4>
            <div className="space-y-2">
              {sections.map(section => (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`
                    block px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200
                    ${
                      currentSection === section.id
                        ? 'bg-purple-600 text-white shadow-md transform scale-105'
                        : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-600 hover:text-purple-800 dark:hover:text-purple-300'
                    }
                  `}
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/wiki" className="hover:text-blue-600 dark:hover:text-blue-400">
            Википедия
          </Link>
          {' > '}
          <span className="text-gray-900 dark:text-white font-medium">Культура</span>
        </nav>

        {/* Navigation */}
        <CultureNavigation />

        {/* Content with enhanced layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ReadableContent showTOC={false}>
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {/* Заголовок */}
                <header className="mb-8 text-center">
                  <h1 className="text-4xl font-extrabold mb-4">
                    <span className="mr-2">🎭</span>
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
                      Культура народов мира
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Откройте для себя удивительное разнообразие традиций, обычаев и культурных
                    особенностей народов планеты
                  </p>
                </header>

                {/* Вводная информация */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    🌍 Культурное разнообразие мира
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Каждая страна мира обладает уникальным культурным наследием, сформированным
                    тысячелетиями истории. Понимание местной культуры — ключ к незабываемым
                    путешествиям и глубокому погружению в атмосферу каждого уголка нашей планеты.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      🗺️ Что вы найдете в этом разделе
                    </h3>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>
                        • <strong>Традиции и обычаи</strong> разных народов
                      </li>
                      <li>
                        • <strong>Кулинарные особенности</strong> национальных кухонь
                      </li>
                      <li>
                        • <strong>Праздники и фестивали</strong> по всему миру
                      </li>
                      <li>
                        • <strong>Этикет и правила поведения</strong> в разных странах
                      </li>
                      <li>
                        • <strong>Практические советы</strong> для культурного погружения
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 id="europe">🏰 Европейская культура</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇮🇹 Средиземноморье
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Страстная и экспрессивная культура Италии, Испании, Греции. Семейные ценности,
                      сиеста, долгие застолья и жизнь на площадях.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/italiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇮🇹
                        </span>
                        <span className="relative z-10">Италия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/ispaniya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇪🇸
                        </span>
                        <span className="relative z-10">Испания</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/gretsiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇬🇷
                        </span>
                        <span className="relative z-10">Греция</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇩🇪 Северная Европа
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Пунктуальность, порядок и качество жизни. Hygge в Дании, немецкая
                      организованность, скандинавский минимализм.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/germaniya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇩🇪
                        </span>
                        <span className="relative z-10">Германия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/denmark"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇩🇰
                        </span>
                        <span className="relative z-10">Дания</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/sweden"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#2563eb',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇸🇪
                        </span>
                        <span className="relative z-10">Швеция</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="asia">🏮 Азиатская культура</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇯🇵 Восточная Азия
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Уважение к старшим, коллективизм, дисциплина. Японский минимализм, китайская
                      философия, корейская современность.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/yaponiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇯🇵
                        </span>
                        <span className="relative z-10">Япония</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/kitai-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇨🇳
                        </span>
                        <span className="relative z-10">Китай</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/uzhnaya-koreya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇰🇷
                        </span>
                        <span className="relative z-10">Южная Корея</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇹🇭 Юго-Восточная Азия
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Буддийские ценности, улыбки, острая кухня. Тайская jai yen, вьетнамская
                      трудолюбивость, индонезийское разнообразие.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/tailand-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇹🇭
                        </span>
                        <span className="relative z-10">Таиланд</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/vietnam"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇻🇳
                        </span>
                        <span className="relative z-10">Вьетнам</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/indonesia"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#dc2626',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇮🇩
                        </span>
                        <span className="relative z-10">Индонезия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="americas">🦅 Культура Америк</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇺🇸 Северная Америка
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Мультикультурное общество, инновации, разнообразие. Американская мечта,
                      канадская терпимость, мексиканская страсть.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/usa"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇺🇸
                        </span>
                        <span className="relative z-10">США</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/canada"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇨🇦
                        </span>
                        <span className="relative z-10">Канада</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/mexico"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇲🇽
                        </span>
                        <span className="relative z-10">Мексика</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇧🇷 Латинская Америка
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Страстность, музыка, танцы. Бразильский карнавал, аргентинское танго,
                      колумбийская кофе-культура.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/brazil"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇧🇷
                        </span>
                        <span className="relative z-10">Бразилия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/argentina"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇦🇷
                        </span>
                        <span className="relative z-10">Аргентина</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      <Link
                        href="/wiki/peru"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(163, 230, 53, 0.15) 100%)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#16a34a',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇵🇪
                        </span>
                        <span className="relative z-10">Перу</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="traditions">🎯 Народные традиции и обычаи</h2>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-purple-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🎭 Традиционные праздники и обряды
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Евро-азиатские традиции
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                        <li>• Японские чайные церемонии</li>
                        <li>• Испанские корриды и фланерия</li>
                        <li>• Индийские свадебные ритуалы</li>
                        <li>• Русская баня и парение</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Американские обычаи
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                        <li>• Мексиканские Дни мертвых</li>
                        <li>• Бразильский карнавал</li>
                        <li>• Американский Тыквенный фестиваль</li>
                        <li>• Канадский День благодарения</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 id="cuisine">🍽️ Кулинарные традиции</h2>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    🍜 Национальные кухни мира
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Европейская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Итальянская паста, французские сыры, испанская паэлья, немецкие колбасы
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Азиатская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Японские суши, китайские димсамы, тайские куриные супы, индийские карри
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Американская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Мексиканские тако, американские бургеры, бразильские асадо, канадские
                        кленовые сиропы
                      </p>
                    </div>
                  </div>
                </div>

                <h2 id="etiquette">🤝 Этикет и правила поведения</h2>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🤝 Культурный этикет в разных странах
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Азиатские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm ml-4 space-y-1">
                        <li>• Снимайте обувь перед входом в дом</li>
                        <li>• Не показывайте подошву ноги</li>
                        <li>• Используйте обе руки при передаче предметов</li>
                        <li>• Уважайте возрастную иерархию</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Европейские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm ml-4 space-y-1">
                        <li>• Пунктуальность считается признаком уважения</li>
                        <li>• Обслуживайте даму первой</li>
                        <li>• Не указывайте пальцем на людей</li>
                        <li>• Извиняйтесь за чихание и кашель</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Американские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm ml-4 space-y-1">
                        <li>• Прямое общение ценится как честность</li>
                        <li>• Персональное пространство важно</li>
                        <li>• Улыбайтесь незнакомцам</li>
                        <li>• Оставляйте чаевые 15-20%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </ReadableContent>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Популярные культуры
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/wiki/japan-culture"
                    className="block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline"
                  >
                    🇯🇵 Японская культура
                  </Link>
                  <Link
                    href="/wiki/italian-culture"
                    className="block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline"
                  >
                    🇮🇹 Итальянская культура
                  </Link>
                  <Link
                    href="/wiki/french-culture"
                    className="block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline"
                  >
                    🇫🇷 Французская культура
                  </Link>
                  <Link
                    href="/wiki/mexican-culture"
                    className="block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline"
                  >
                    🇲🇽 Мексиканская культура
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-purple-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  🌟 Советы путешественникам
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Изучайте местные обычаи перед поездкой</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Уважайте религиозные традиции</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Наблюдайте за поведением местных жителей</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Спросите разрешения перед фотографированием</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
