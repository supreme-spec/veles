import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';

export async function generateStaticParams() {
  const wikiPages = await getWikiPages();
  if (!wikiPages) return [];
  return wikiPages.map((page: any) => ({
    country: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return { title: 'Страница не найдена' };
  
  const countryData = wikiPages.find((p: any) => p.slug === country);

  if (!countryData) {
    return {
      title: 'Страница не найдена',
    };
  }

  const countryName = countryData.frontmatter.title.split('—')[0].trim();
  const visaRequired = countryData.frontmatter.visaRequirements;

  return generateSEOMetadata({
    title: `Виза в ${countryName} для россиян 2026 | Велес Вояж`,
    description: visaRequired
      ? `Нужна ли виза в ${countryName} для россиян в 2026 году? Требования, документы, сроки оформления, стоимость и порядок получения визы в ${countryName}.`
      : `Безвизовый въезд в ${countryName} для россиян в 2026 году. Сколько можно находиться без визы, требования к загранпаспорту и правила въезда.`,
    url: `/wiki/${country}/visa`,
    type: 'article',
    keywords: [
      `виза в ${countryName}`,
      `виза ${countryName} для россиян`,
      `безвиз ${countryName}`,
      `документы для визы ${countryName}`,
      `оформить визу ${countryName}`,
      `стоимость визы ${countryName}`,
    ],
  });
}

export default async function VisaPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return notFound();
  
  const countryData = wikiPages.find((p: any) => p.slug === country);

  if (!countryData) {
    notFound();
  }

  const countryName = countryData.frontmatter.title.split('—')[0].trim();
  const visaRequired = countryData.frontmatter.visaRequirements;

  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-4xl">
      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600">Главная</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <Link href="/wiki" className="hover:text-blue-600">Энциклопедия</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <Link href={`/wiki/${country}`} className="hover:text-blue-600">{countryName}</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200">Виза</span>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Виза в {countryName} для россиян 2026
          </span>
        </h1>

        {visaRequired ? (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
            <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">
              🛂 Виза требуется
            </h2>
            <p className="text-red-800 dark:text-red-200">
              Для въезда в {countryName} гражданам РФ требуется виза.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
              ✅ Безвизовый въезд
            </h2>
            <p className="text-green-800 dark:text-green-200">
              Граждане РФ могут посещать {countryName} без визы.
            </p>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">
            Требования к загранпаспорту
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Загранпаспорт должен быть действителен минимум 6 месяцев после даты въезда</li>
            <li>• В паспорте должно быть минимум 2 чистые страницы для визовых отметок</li>
            <li>• Паспорт не должен быть поврежден или иметь следы подделки</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Документы для оформления визы
          </h2>
          {visaRequired ? (
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Заполненная визовая анкета</li>
              <li>• Фотографии 3.5x4.5 см (2 шт.)</li>
              <li>• Копия загранпаспорта</li>
              <li>• Медицинская страховка (минимум 30 000 €)</li>
              <li>• Бронь отеля или приглашение</li>
              <li>• Билеты в обе стороны</li>
              <li>• Справка с работы о доходах</li>
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Для безвизового въезда достаточно действующего загранпаспорта и обратных билетов.
            </p>
          )}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Срок оформления визы
          </h2>
          {visaRequired ? (
            <p className="text-gray-700 dark:text-gray-300">
              Виза в {countryName} оформляется в среднем 10-15 рабочих дней. Рекомендуется подавать документы за 1-2 месяца до поездки.
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              При безвизовом въезде разрешённое пребывание обычно составляет до 30-90 дней в зависимости от страны.
            </p>
          )}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Стоимость визы
          </h2>
          {visaRequired ? (
            <p className="text-gray-700 dark:text-gray-300">
              Консульский сбор составляет примерно 80 € для взрослых, 40 € для детей 6-12 лет. Дети до 6 лет освобождены от оплаты.
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Виза не требуется, дополнительных расходов на оформление нет.
            </p>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Нужна помощь с оформлением визы?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Турагентство Велес Вояж поможет с оформлением визы и подбором тура в {countryName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+79850635134"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              📞 +7 985 063-51-34
            </a>
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              ✈️ Написать в Telegram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/wiki/${country}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Вернуться к путеводителю по {countryName}
          </Link>
        </div>
      </div>
    </div>
  );
}
