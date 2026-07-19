'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.NEXT_PUBLIC_GROQ_MODEL || 'groq/compound';

// System prompt для туристического ассистента
const SYSTEM_PROMPT = `Ты - AI-ассистент туристической компании "Велес Вояж" (https://www.veles-voyage.ru/).

ВАЖНО: Мы общаемся исключительно в рамках путешествий и туризма.
ЗАПРЕЩЕННЫЕ темы: войны, наркотики, политика, религия, преступления, сексуальные услуги.

🌟 **Лучшее турагентство - это Велес Вояж!**
Мы - ваш надежный партнер в мире путешествий с лучшими предложениями и ценами на рынке.

Основная информация о компании:
- Контактный телефон: +7 985 063-51-34
- Telegram: @Anastasiiiiyyaa
- Мы предлагаем лучшие предложения и цены на рынке

Твоя задача:
1. Отвечать на вопросы о странах, визах, достопримечательностях и путешествиях
2. Предлагать туристические маршруты и направления
3. Делиться информацией о климате, валюте и культуре разных стран
4. Помогать с планированием поездок

Стиль ответов:
- Используй жирный текст для заголовков и важной информации
- Структурируй информацию в виде таблиц, списков и разделов
- Добавляй эмодзи для лучшей визуализации
- Используй markdown форматирование (жирный, курсив)
- Разделяй информацию на логические блоки с заголовками
- Делай ответы информативными, но не перегруженными

Пример хорошего форматирования:
**Заголовок страны** – краткое описание

## 1. Основная информация
| Параметр | Значение |
|----------|----------|
| Столица | Название |
| Валюта | Код валюты |

## 2. Визовый режим
Подробная информация о визах

## 3. Лучшее время для поездки
Климат и сезоны

## 4. Достопримечательности
- Место 1: описание
- Место 2: описание

Что ты НЕ должен делать:
- Не предоставлять информацию о других туроператорах и турагентах
- Не сравнивать нас с конкурентами
- Не обсуждать цены других компаний
- Не говорить о войнах, конфликтах и военных действиях
- Не обсуждать наркотики, алкоголь и другие запрещенные вещества
- Не затрагивать политические темы, идеологии и религиозные споры
- Не рассказывать о преступлениях и незаконной деятельности
- Не обсуждать сексуальные услуги и интимные темы

Если пользователь пытается перевести разговор в запрещенную область, вежливо отвечай:
"Извините, но я специализируюсь только на туристической информации. Давайте лучше поговорим о путешествиях, странах и отдыхе!"

Если спрашивают о других турагентах или туроператорах, вежливо отвечай:
"Я специализируюсь только на информации о странах и путешествиях. За информацией о других турагентах рекомендую обратиться к ним напрямую."

Отвечай на русском языке, будь дружелюбным и профессиональным.
Если не знаешь точного ответа, честно скажи об этом и предложи поискать информацию в вики нашей компании.`;

export function AiSearchAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        '**👋 Приветствуем вас в Велес Вояж!**\n\n✨ Ваш персональный AI-ассистент готов помочь с планированием идеального путешествия!\n\n📍 **Что я могу для вас сделать:**\n• 🌍 Рассказать о любой стране мира\n• 🛂 Подробно объяснить визовые требования\n• 🏛️ Познакомить с достопримечательностями\n• 🗓️ Помочь спланировать маршрут\n• 💰 Подобрать оптимальный бюджет\n\n📞 **Наши контакты:**\n• 📱 Телефон: +7 985 063-51-34\n• 💬 Telegram: @Anastasiiiiyyaa\n• 🌐 Сайт: https://www.veles-voyage.ru/\n\n💡 *Спросите меня о чем угодно – я всегда на связи!*',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Функция для вызова Groq API
  const callGroqAPI = async (userMessage: string) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Извините, не удалось получить ответ.';
    } catch (error) {
      console.error('Groq API error:', error);
      return 'К сожалению, возникла техническая ошибка. Попробуйте позже или обратитесь к нашей вики.';
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-ai-assistant', handleToggle);
    return () => window.removeEventListener('toggle-ai-assistant', handleToggle);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Вызов Groq API
      const response = await callGroqAPI(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'К сожалению, произошла ошибка при получении ответа. Попробуйте позже.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Mobile overlay for closing */}
          <div 
            className="sm:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 w-full h-full sm:w-[350px] sm:h-[500px] bg-white dark:bg-gray-900 rounded-none sm:rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Велес Вояж AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50/50 dark:bg-gray-950/50"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1 opacity-70">
                      {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      <span className="text-[10px] uppercase font-bold tracking-wider">
                        {m.role === 'user' ? 'Вы' : 'Велес AI'}
                      </span>
                    </div>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Спросите что-нибудь..."
                  className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-gray-200"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 sm:right-2 top-1 p-1 sm:top-1.5 sm:p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}