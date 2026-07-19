'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  estimatedReadTime?: number;
}

interface MdxTableOfContentsProps {
  mdxContent: React.ReactNode;
  className?: string;
  compactMode?: boolean;
  showReadingTime?: boolean;
}

// Простые SVG иконки
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export function MdxTableOfContents({ 
  mdxContent,
  className = '',
  compactMode = true,
  showReadingTime = true
}: MdxTableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [totalReadTime, setTotalReadTime] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Проверяем, что мы в браузере
    setIsClient(true);
    
    if (!isClient) return;

    // Извлекаем заголовки из отрендеренного MDX контента
    const extractHeadings = () => {
      // Ждем пока MDX контент отрендерится
      setTimeout(() => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocItems: TOCItem[] = [];
        let totalWords = 0;

        headings.forEach((heading, index) => {
          const id = heading.id || `heading-${index}`;
          if (!heading.id) {
            heading.id = id;
          }

          const level = parseInt(heading.tagName.charAt(1));
          const title = heading.textContent?.trim() || '';
          
          // Фильтруем заголовки (в компактном режиме только H2 и выше)
          const shouldInclude = compactMode ? level >= 2 && level <= 3 : level >= 1 && level <= 4;
          
          if (title && shouldInclude) {
            // Оцениваем время чтения для каждого раздела
            const nextHeading = Array.from(headings).find((h, i) => 
              i > index && parseInt(h.tagName.charAt(1)) <= level
            );
            
            let sectionContent = '';
            let currentElement = heading.nextElementSibling;
            
            while (currentElement && currentElement !== nextHeading) {
              sectionContent += currentElement.textContent || '';
              currentElement = currentElement.nextElementSibling;
            }
            
            const wordCount = sectionContent.split(/\s+/).length;
            const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
            totalWords += wordCount;
            
            tocItems.push({
              id,
              title: compactMode && title.length > 60 ? title.substring(0, 60) + '...' : title,
              level,
              estimatedReadTime
            });
          }
        });

        setToc(tocItems);
        setTotalReadTime(Math.ceil(totalWords / 200));
      }, 1500); // Увеличенная задержка для полного рендеринга MDX
    };

    extractHeadings();

    // Отслеживаем активный заголовок при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    // Добавляем observer к заголовкам через некоторое время
    setTimeout(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => observer.observe(heading));
    }, 2000);

    return () => {
      observer.disconnect();
    };
  }, [compactMode, mdxContent, isClient]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Не показываем на сервере или если нет заголовков
  if (!isClient || toc.length === 0) {
    return (
      <div className={`mdx-table-of-contents-placeholder ${className}`}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse">
              <ListIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-700">
                📖 Содержание загружается...
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                Подготовка оглавления путеводителя
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mdx-table-of-contents mb-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          ${compactMode 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 shadow-md'
          } overflow-hidden
        `}
      >
        {/* Заголовок оглавления */}
        <div 
          className={`
            ${compactMode ? 'p-5' : 'p-6'} 
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer select-none
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ListIcon className={`${compactMode ? 'h-6 w-6' : 'h-7 w-7'}`} />
              <div>
                <h3 className={`${compactMode ? 'text-lg' : 'text-xl'} font-bold`}>
                  📖 Содержание путеводителя
                </h3>
                {showReadingTime && (
                  <p className={`${compactMode ? 'text-sm' : 'text-base'} opacity-90 mt-1`}>
                    ⏱️ {totalReadTime} мин чтения • {toc.length} разделов
                  </p>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronDownIcon className="h-5 w-5" />
            </motion.div>
          </div>
        </div>

        {/* Содержимое оглавления */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className={`${compactMode ? 'p-5' : 'p-6'}`}>
                <nav className="space-y-2">
                  {toc.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToHeading(item.id)}
                      className={`
                        w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between
                        ${item.level === 2 ? 'font-semibold pl-4' : ''}
                        ${item.level === 3 ? 'font-medium pl-8 text-gray-700' : ''}
                        ${item.level >= 4 ? 'font-normal pl-12 text-gray-600 text-sm' : ''}
                        ${
                          activeId === item.id
                            ? 'bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-500'
                            : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        {item.level === 2 && <span className="text-lg">📍</span>}
                        {item.level === 3 && <span className="text-base">📌</span>}
                        {item.level >= 4 && <span className="text-sm">•</span>}
                        <span className="hover:underline">
                          {item.title}
                        </span>
                      </div>
                      {showReadingTime && item.estimatedReadTime && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {item.estimatedReadTime} мин
                        </span>
                      )}
                    </motion.button>
                  ))}
                </nav>
                
                {/* Информационная панель */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <span className="text-lg">💡</span>
                    <span className="text-sm font-medium">
                      Нажмите на любой раздел, чтобы быстро перейти к нему
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}