import { NextResponse } from 'next/server';
import citiesSitemap from '@/app/cities/sitemap';
import wikiSitemap from '@/app/wiki/sitemap';
import visualSitemap from '@/app/visual-sitemap';

export async function GET() {
  try {
    const cities = citiesSitemap();
    const wiki = wikiSitemap();
    const visual = visualSitemap();
    return NextResponse.json({
      cities: cities.length,
      wiki: wiki.length,
      visual: visual.length,
      citiesSample: cities.slice(0, 5),
      wikiSample: wiki.slice(0, 5),
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
