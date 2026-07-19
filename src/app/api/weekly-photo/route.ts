import { NextResponse } from 'next/server';

// Mock weekly photo data - replace with actual Unsplash API integration
// In production, this should rotate photos weekly using a database or cron job
const WEEKLY_PHOTOS = [
  {
    id: 'week-1',
    url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    alt: 'Неделя 1: Городские пейзажи',
    photographer: 'Urban Explorer',
    location: 'European Cities',
    week: 1,
    year: 2026,
    theme: 'urban'
  },
  {
    id: 'week-2',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    alt: 'Неделя 2: Природные красоты',
    photographer: 'Nature Photographer',
    location: 'Mountain Landscapes',
    week: 2,
    year: 2026,
    theme: 'nature'
  },
  {
    id: 'week-3',
    url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    alt: 'Неделя 3: Пляжный отдых',
    photographer: 'Beach Photographer',
    location: 'Tropical Beaches',
    week: 3,
    year: 2026,
    theme: 'beach'
  },
  {
    id: 'week-4',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    alt: 'Неделя 4: Дорожные приключения',
    photographer: 'Adventure Traveler',
    location: 'Road Trip Destinations',
    week: 4,
    year: 2026,
    theme: 'adventure'
  }
];

export async function GET(_request: Request) {
  try {
    // Get current week number (1-52) using ISO week calculation
    const now = new Date();
    const target = new Date(now.valueOf());
    const dayNumber = (now.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    
    // Use modulo to cycle through available photos
    const photoIndex = (weekNumber - 1) % WEEKLY_PHOTOS.length;
    const currentPhoto = WEEKLY_PHOTOS[photoIndex];
    
    // Validate that we have a valid photo
    if (!currentPhoto) {
      throw new Error('No photo found for current week');
    }

    return new NextResponse(
      JSON.stringify({
        ...currentPhoto,
        currentWeek: weekNumber,
        totalPhotos: WEEKLY_PHOTOS.length,
        nextUpdate: new Date(now.getFullYear(), 0, 1 + (weekNumber * 7)).toISOString(),
        timestamp: now.toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      }
    );

  } catch (error) {
    console.error('Weekly photo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly photo' },
      { status: 500 }
    );
  }
}

// POST endpoint for admin to update weekly photo (protected)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In production, add authentication check here
    if (!body.adminToken || body.adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!body.photo || !body.photo.url || !body.photo.alt) {
      return NextResponse.json(
        { error: 'Missing required photo data' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly photo updated successfully',
      photo: body.photo
    });

  } catch (error) {
    console.error('Weekly photo update error:', error);
    return NextResponse.json(
      { error: 'Failed to update weekly photo' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}