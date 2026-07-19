'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { 
  MapIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  const footerSections = {
    company: {
      title: 'Компания',
      links: [
        { href: '/about', label: 'О нас' },
        { href: '/contacts', label: 'Контакты' },
        { href: '/requisites', label: 'Реквизиты компании' },
        { href: '/mission', label: 'Наша миссия' },
        { href: '/values', label: 'Наши ценности' },
        { href: '/cities', label: 'Города России' },
        { href: '/reviews', label: 'Отзывы клиентов' },
        { href: '/faq', label: 'Частые вопросы (FAQ)' },
        { href: '/blog', label: 'Блог' },
        { href: '/sitemap.xml', label: 'Карта сайта' }
      ]
    },
    destinations: {
      title: 'Путешествия',
      links: [
        { href: '/tours', label: 'Туры' },
        { href: '/cruises', label: 'Круизы' },
        { href: '/flights', label: 'Авиа' },
        { href: '/hotels', label: 'Отели' }
      ]
    },
    services: {
      title: 'Услуги',
      links: [
        { href: '/tours', label: 'Туры' },
        { href: '/cruises', label: 'Круизы' },
        { href: '/support', label: 'Поддержка' }
      ]
    },
    legal: {
      title: 'Правовая информация',
      links: [
        { href: '/privacy', label: 'Политика конфиденциальности' },
        { 
          href: 'https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0', 
          label: 'Реестровый номер турагентства',
          external: true
        },
        { href: '/wiki/travel-tips#important-notice', label: '⚠️ Важно помнить' }
      ]
    }
  };

  const socialLinks = [
    { 
      href: 'https://vk.com/veles__voyage', 
      label: 'ВКонтакте',
      icon: (
        <div className="w-5 h-5 flex items-center justify-center">
          <Image
            src="/images/vk.png"
            alt="Велес Вояж в VKontakte"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )
    },
    {
      href: 'https://t.me/veles_voyage',
      label: 'Telegram',
      icon: (
        <div className="w-5 h-5 flex items-center justify-center">
          <Image
            src="/images/telegram.png"
            alt="Telegram канал Велес Вояж"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )
    },
    {
      href: 'https://rutube.ru/channel/38701755/',
      label: 'Rutube',
      icon: (
        <div className="w-5 h-5 flex items-center justify-center">
          <Image
            src="/images/rutube.webp"
            alt="Rutube канал Велес Вояж"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-indigo-400 mb-3">
              Велес Вояж
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Откройте мир с нами! Уникальные путешествия, незабываемые впечатления.
            </p>

            {/* Contact Info - More compact */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href="tel:+79850635134" className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                  +7 985 063-51-34
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href="mailto:hello@veles-voyage.ru" className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                  hello@veles-voyage.ru
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">пр-т. Керамиков, 103, Голицыно</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">пр-т. Московский, 9/2, Пушкино</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-400 text-xs">⏰ Пн–Пт: 09:00–21:00</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-400 text-xs">⏰ Сб–Вс: 10:00–18:00</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">
                🌟 Подпишитесь на новости
              </h4>
              <p className="text-gray-300">
                Получайте эксклюзивные предложения и новости о путешествиях
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="https://t.me/veles_voyage" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200 text-center"
              >
                Подписаться
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-gray-200"
                title={social.label}
              >
                <span className="text-lg">{social.icon}</span>
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <GlobeAltIcon className="w-5 h-5 text-gray-400" />
            <select
              aria-label="Выберите язык"
              className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-gray-300"
            >
              <option value="ru">🇷🇺 Русский</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col items-center text-sm text-gray-400 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                <span className="text-gray-400">© {currentYear} Велес Вояж. Все права защищены.</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Сделано с</span>
                <HeartIcon className="w-4 h-4 text-red-500 inline-block" />
                <span className="text-gray-400">в России</span>
              </div>
            </div>
            
            {/* Federal Registry Information - Mobile Optimized */}
            <div className="text-left text-xs text-gray-400 w-full hidden sm:block">
              ООО "Велес" (ИНН 5032362524, ОГРН 1235000077685) включено в Единый Федеральный реестр турагентов, субагентов.{' '}
              <a 
                href="https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Запись в реестре №РТА 0035678 от 21.06.2023 г.
              </a>{' '}
              by Radun{' '}
              <Link 
                href="/privacy"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Политика конфиденциальности.
              </Link>
            </div>
            
            {/* Mobile Version - Shortened */}
            <div className="text-center text-xs text-gray-400 w-full sm:hidden">
              ООО "Велес" (ИНН 5032362524, ОГРН 1235000077685) - РТА 0035678.{' '}
              <Link 
                href="/privacy"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}