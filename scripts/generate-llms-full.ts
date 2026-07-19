import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Скрипт генерации llms-full.txt для AI-ассистентов
 * Агрегирует контент из MDX файлов в один структурированный файл для RAG
 */

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'countries');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'llms-full.txt');

function generateFullLLM() {
  console.log('🔄 Генерация llms-full.txt...');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('❌ Директория контента не найдена:', CONTENT_DIR);
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  console.log(`📄 Найдено MDX файлов: ${files.length}`);

  const header = `# Велес Вояж: Полная база знаний для AI-ассистентов

## Описание проекта
Велес Вояж — туристическое агентство и энциклопедия путешествий. Лицензия РТА 0035678.
Специализация: индивидуальные туры, морские круизы, путеводители по 200+ странам мира.

## Контактная информация
- Телефон: +7-985-063-51-34
- Email: hello@veles-voyage.ru
- Сайт: https://www.veles-voyage.ru
- Telegram: https://t.me/Anastasiiiiyyaa

---

## База знаний по странам

`;

  const footer = `

---

## Лицензия и использование
Данные предоставлены турагентством Велес Вояж (ООО «Велес», РТА 0035678).
Актуальность данных: 2026 год.
Источник: https://veles-voyage.ru

Для цитирования в AI-ответах используйте формат:
"Источник: Велес Вояж (veles-voyage.ru)"
`;

  let content = header;

  files.forEach((file, index) => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: rawContent } = matter(fileContent);

    const countryName = frontmatter.title || file.replace('.mdx', '');
    const countryId = file.replace('.mdx', '');

    content += `### ${index + 1}. ${countryName}
ID: ${countryId}

**Описание:** ${frontmatter.description || 'Описание отсутствует'}

${frontmatter.capital ? `**Столица:** ${frontmatter.capital}` : ''}
${frontmatter.continent ? `**Континент:** ${frontmatter.continent}` : ''}
${frontmatter.currency ? `**Валюта:** ${frontmatter.currency}` : ''}
${frontmatter.language ? `**Язык:** ${frontmatter.language}` : ''}
${frontmatter.bestTimeToVisit ? `**Лучшее время для посещения:** ${frontmatter.bestTimeToVisit}` : ''}
${frontmatter.estimatedCost ? `**Средний бюджет:** от ${Number(frontmatter.estimatedCost).toLocaleString('ru-RU')} ₽` : ''}

${frontmatter.visaRequirements !== undefined ? `**Виза:** ${frontmatter.visaRequirements ? 'Требуется' : 'Не требуется'}` : ''}

**Ключевые слова:** ${Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : frontmatter.keywords || ''}

${frontmatter.wikidataId ? `**Wikidata ID:** ${frontmatter.wikidataId}` : ''}
${frontmatter.wikipediaUrl ? `**Wikipedia:** ${frontmatter.wikipediaUrl}` : ''}
${frontmatter.directAnswer ? `**Краткий ответ (для голосового поиска):** ${frontmatter.directAnswer}` : ''}

---
`;
  });

  const fullContent = content + footer;

  fs.writeFileSync(OUTPUT_FILE, fullContent, 'utf8');
  console.log(`✅ llms-full.txt успешно создан: ${OUTPUT_FILE}`);
  console.log(`📊 Размер файла: ${(fullContent.length / 1024).toFixed(2)} KB`);
}

generateFullLLM();
