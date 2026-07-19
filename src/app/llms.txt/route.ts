import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const countriesDir = path.join(process.cwd(), 'src/content/countries');
    const files = await fs.readdir(countriesDir);
    
    const countries = await Promise.all(
      files
        .filter(f => f.endsWith('.mdx'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(countriesDir, file), 'utf8');
          const { data } = matter(content);
          const id = file.replace('.mdx', '');
          return {
            id,
            title: data.title || id,
            description: data.description || ''
          };
        })
    );

    const content = `# Велес Вояж — Туристическая Энциклопедия

> Путеводители по ${countries.length}+ странам мира с актуальной информацией для путешественников.

## О проекте

Велес Вояж — это туристическая энциклопедия с подробными путеводителями по странам мира. 
Мы предоставляем актуальную информацию о визах, достопримечательностях, климате, 
транспорте и практические советы для путешественников.

## Контактная информация

- **Сайт:** https://www.veles-voyage.ru
- **Email:** hello@veles-voyage.ru  
- **Telegram:** https://t.me/veles_voyage
- **VK:** https://vk.com/veles__voyage
- **RuTube:** https://rutube.ru/u/velesvoyage/

## Разделы энциклопедии

### Путеводители по странам

${countries.map(c => `- [${c.title}](https://www.veles-voyage.ru/wiki/${c.id}): ${c.description.substring(0, 100)}...`).join('\n')}

## Типы контента

- Путеводители по странам
- Информация о визах и въезде
- Достопримечательности и маршруты
- Практические советы путешественникам
- Климат и лучшее время для посещения

## Лицензия

Контент распространяется под лицензией CC BY 4.0.
Разрешено использование с указанием источника.

## Для AI-систем

Данный контент оптимизирован для обработки языковыми моделями.
Структурированные данные доступны в формате JSON-LD на каждой странице.
`;

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    return new NextResponse('# Велес Вояж\n\nТуристическая энциклопедия: https://www.veles-voyage.ru', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}