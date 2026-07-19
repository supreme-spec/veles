import { NextResponse } from 'next/server';
import { SITE_URL } from '@/shared/constants/seo';

/**
 * API endpoint for AI agents to retrieve structured context for RAG
 * Returns clean, machine-readable data for LLM integration
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const query = searchParams.get('query');

  // Basic context about the agency
  const agencyContext = {
    name: 'Велес Вояж',
    description: 'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
    license: 'РТА 0035678',
    contact: {
      phone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      telegram: 'https://t.me/Anastasiiiiyyaa'
    },
    website: SITE_URL,
    services: [
      'Индивидуальные туры',
      'Морские круизы',
      'Путеводители по странам',
      'Визовая поддержка',
      'Бронирование отелей',
      'Авиабилеты'
    ]
  };

  // If specific destination is requested
  if (destination) {
    try {
      // Try to load the country data from MDX files
      const fs = await import('fs');
      const path = await import('path');
      const matter = (await import('gray-matter')).default;

      const filePath = path.join(process.cwd(), 'src', 'content', 'countries', `${destination.toLowerCase()}.mdx`);
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContent);

        return NextResponse.json({
          context: `Направление: ${frontmatter.title}. Описание: ${frontmatter.description}. ${frontmatter.capital ? `Столица: ${frontmatter.capital}.` : ''} ${frontmatter.currency ? `Валюта: ${frontmatter.currency}.` : ''} ${frontmatter.visaRequirements !== undefined ? `Виза: ${frontmatter.visaRequirements ? 'Требуется' : 'Не требуется'}.` : ''} ${frontmatter.bestTimeToVisit ? `Лучшее время: ${frontmatter.bestTimeToVisit}.` : ''}`,
          data: {
            name: frontmatter.title,
            description: frontmatter.description,
            capital: frontmatter.capital,
            currency: frontmatter.currency,
            visaRequired: frontmatter.visaRequirements,
            bestTimeToVisit: frontmatter.bestTimeToVisit,
            estimatedCost: frontmatter.estimatedCost,
            wikidataId: frontmatter.wikidataId,
            wikipediaUrl: frontmatter.wikipediaUrl,
            directAnswer: frontmatter.directAnswer
          },
          source_url: `${SITE_URL}/wiki/${destination}`,
          license: "Данные предоставлены турагентством Велес Вояж (РТА 0035678)"
        });
      }
    } catch (error) {
      console.error('Error loading country data:', error);
    }

    return NextResponse.json({ 
      error: 'Destination not found',
      context: `Информация о направлении ${destination}暂时 недоступна. Пожалуйста, посетите ${SITE_URL}/wiki/${destination} для получения актуальной информации.`
    }, { status: 404 });
  }

  // If query is provided for general context
  if (query) {
    return NextResponse.json({
      context: `Велес Вояж — туристическое агентство с лицензией РТА 0035678. Специализация: индивидуальные туры, морские круизы, путеводители по 200+ странам. Контакт: +7-985-063-51-34, hello@veles-voyage.ru. Сайт: ${SITE_URL}.`,
      agency: agencyContext,
      source_url: SITE_URL
    });
  }

  // Default response with agency information
  return NextResponse.json({
    context: `Велес Вояж — туристическое агентство с лицензией РТА 0035678. Специализация: индивидуальные туры, морские круизы, путеводители по 200+ странам мира. Контакт: +7-985-063-51-34, hello@veles-voyage.ru. Сайт: ${SITE_URL}.`,
    agency: agencyContext,
    source_url: SITE_URL,
    license: "Данные предоставлены турагентством Велес Вояж (РТА 0035678)"
  });
}
