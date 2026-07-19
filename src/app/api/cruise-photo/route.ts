import { NextResponse } from 'next/server';

// Cruise photo data with Unsplash images (distinct, verified URLs per type)
const CRUISE_PHOTOS = {
  mediterranean: {
    url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Средиземноморский круиз по живописным побережьям',
    photographer: 'Unsplash',
    location: 'Mediterranean Sea'
  },
  caribbean: {
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Карибский круиз среди тропических островов',
    photographer: 'Unsplash',
    location: 'Caribbean Sea'
  },
  scandinavian: {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Скандинавский круиз среди фьордов и северных сияний',
    photographer: 'Unsplash',
    location: 'Scandinavia'
  },
  asian: {
    url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Азиатский круиз по экзотическим портам и островам',
    photographer: 'Unsplash',
    location: 'Asia'
  },
  alaska: {
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Аляска круиз среди ледников и дикой природы',
    photographer: 'Unsplash',
    location: 'Alaska'
  },
  world: {
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Кругосветный круиз по самым красивым местам планеты',
    photographer: 'Unsplash',
    location: 'Around the World'
  },
  default: {
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop&q=80&auto=format',
    description: 'Морской круиз по живописным маршрутам',
    photographer: 'Unsplash',
    location: 'Ocean'
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let photoData;

    if (type && CRUISE_PHOTOS[type as keyof typeof CRUISE_PHOTOS]) {
      photoData = CRUISE_PHOTOS[type as keyof typeof CRUISE_PHOTOS];
    } else {
      photoData = CRUISE_PHOTOS.default;
    }

    // Add cache busting parameter
    const cacheBuster = Date.now();
    const photoWithCacheBuster = {
      ...photoData,
      url: `${photoData.url}&cache=${cacheBuster}`,
      type,
      timestamp: new Date().toISOString()
    };

    return new NextResponse(
      JSON.stringify({
        success: true,
        photo: photoWithCacheBuster
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
    console.error('Cruise photo API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch cruise photo' 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}