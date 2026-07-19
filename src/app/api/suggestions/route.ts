import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    // Mock suggestions for now - in real implementation this would search through wiki content
    const suggestions = [
      'Путешествия по России',
      'Визы в Европу',
      'Лучшие пляжи мира',
      'Горнолыжные курорты',
      'Экзотические страны',
      'Бюджетные туры',
      'Семейный отдых',
      'Романтические путешествия'
    ].filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);

    return NextResponse.json({
      suggestions,
      query,
      total: suggestions.length
    });
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
