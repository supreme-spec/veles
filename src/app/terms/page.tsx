import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Условия использования Велес Вояж 2026 | Правила',
  description: 'Условия использования платформы Велес Вояж. Регулирование отношений при использовании услуг и подключении кошельков.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-gray-100">
        Условия использования
      </h1>
      
      <div className="space-y-6 md:space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            1. Общие положения
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Настоящие Условия использования регулируют отношения между пользователем и платформой Велес Вояж при использовании наших услуг и подключении криптокошельков.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            2. Подключение кошелька
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            При подключении TON кошелька пользователь соглашается с возможностью совершения транзакций для оплаты туристических услуг.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            3. Ответственность
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Пользователь несет полную ответственность за безопасность своего кошелька и совершенные транзакции.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            4. Контакты
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            По всем вопросам обращайтесь:{' '}
            <a 
              href="mailto:hello@veles-voyage.ru" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
            >
              hello@veles-voyage.ru
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
