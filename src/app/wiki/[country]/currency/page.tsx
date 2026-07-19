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
  const currency = countryData.frontmatter.currency || 'местная валюта';

  return generateSEOMetadata({
    title: `Валюта ${countryName}, курс к рублю 2026 | Велес Вояж`,
    description: `Национальная валюта ${countryName} - ${currency}. Курс к рублю, где обменять, использование карт, чаевые и финансовые советы для туристов.`,
    url: `/wiki/${country}/currency`,
    type: 'article',
    keywords: [
      `валюта ${countryName}`,
      `курс ${countryName} к рублю`,
      `деньги ${countryName}`,
      `обмен валюты ${countryName}`,
      `карты в ${countryName}`,
      `чаевые ${countryName}`,
      `финансы ${countryName}`,
    ],
  });
}

export default async function CurrencyPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return notFound();
  
  const countryData = wikiPages.find((p: any) => p.slug === country);

  if (!countryData) {
    notFound();
  }

  const countryName = countryData.frontmatter.title.split('—')[0].trim();
  const currency = countryData.frontmatter.currency || 'местная валюта';

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
            <span className="text-gray-800 dark:text-gray-200">Валюта</span>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Валюта {countryName} и курс к рублю 2026
          </span>
        </h1>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
            💰 Национальная валюта
          </h2>
          <p className="text-green-800 dark:text-green-200">
            Официальная валюта {countryName}: {currency}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">
            Обмен валюты
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>• Обменяйте рубли на местную валюту в банках или официальных обменниках</li>
            <li>• Избегайте обмена в аэропортах и отелях (неблагоприятный курс)</li>
            <li>• Проверяйте актуальный курс перед обменом</li>
            <li>• Сохраняйте чеки об обмене валюты</li>
            <li>• Используйте карты для крупных покупок</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Использование банковских карт
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>• Visa и Mastercard принимаются в большинстве мест</li>
            <li>• Уведомите банк о поездке заранее</li>
            <li>• Имейте наличные для мелких расходов</li>
            <li>• Проверьте комиссии за международные операции</li>
            <li>• Используйте карты с бесконтактной оплатой</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Чаевые
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>• Чаевые не обязательны, но приветствуются</li>
            <li>• В ресторанах: 5-10% от счета</li>
            <li>• Такси: округление до удобной суммы</li>
            <li>• Гостиницы: 1-2 USD за ночь</li>
            <li>• Гиды: 5-10 USD за день</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Финансовые советы
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Имейте несколько способов оплаты (карта + наличные)</li>
            <li>• Храните деньги в разных местах</li>
            <li>• Используйте сейф в отеле для хранения ценностей</li>
            <li>• Делайте копии карт и документов</li>
            <li>• Проверьте лимиты на снятие наличных</li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Нужна помощь с планированием бюджета?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Турагентство Велес Вояж поможет рассчитать бюджет поездки в {countryName}.
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
