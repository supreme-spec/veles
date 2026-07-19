import { NextResponse } from 'next/server';

// Mock service photo data - replace with actual Unsplash API integration
const SERVICE_PHOTOS = {
  tours: {
    europe: {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Европейские туры',
      photographer: 'Unsplash',
      location: 'Европа'
    },
    asia: {
      url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Азиатские приключения',
      photographer: 'Unsplash',
      location: 'Азия'
    },
    africa: {
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Африканские сафари',
      photographer: 'Unsplash',
      location: 'Африка'
    },
    america: {
      url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Американские маршруты',
      photographer: 'Unsplash',
      location: 'Америка'
    },
    cruise: {
      url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Океанские круизы',
      photographer: 'Unsplash',
      location: 'Океан'
    },
    extreme: {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Экстремальные туры',
      photographer: 'Unsplash Photographer',
      location: 'Мир'
    },
    oceania: {
      url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Туры в Океанию',
      photographer: 'Unsplash Photographer',
      location: 'Океания'
    },
    'south-america': {
      url: 'https://images.unsplash.com/photo-1539053447282-6f32f2bddfed?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Туры в Южную Америку',
      photographer: 'Unsplash Photographer',
      location: 'Южная Америка'
    }
  },
  cruises: {
    mediterranean: {
      url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Средиземноморские круизы',
      photographer: 'Unsplash Photographer',
      location: 'Mediterranean Sea'
    },
    caribbean: {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Карибские круизы',
      photographer: 'Unsplash Photographer',
      location: 'Caribbean Sea'
    },
    default: {
      url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
      alt: 'Морские круизы',
      photographer: 'Unsplash Photographer',
      location: 'Ocean'
    }
  },
  support: {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    alt: 'Поддержка клиентов',
    photographer: 'Unsplash Photographer',
    location: 'Customer Service Center'
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const cruiseType = searchParams.get('cruiseType');

  try {
    let photoData;

    switch (type) {
      case 'tours': {
        const tourType = searchParams.get('tourType') || 'europe';
        const tours = SERVICE_PHOTOS.tours;
        photoData = tours[tourType as keyof typeof tours] ?? tours.europe;
        break;
      }
      
      case 'cruises':
        if (cruiseType && SERVICE_PHOTOS.cruises[cruiseType as keyof typeof SERVICE_PHOTOS.cruises]) {
          photoData = SERVICE_PHOTOS.cruises[cruiseType as keyof typeof SERVICE_PHOTOS.cruises];
        } else {
          photoData = SERVICE_PHOTOS.cruises.default;
        }
        break;
      
      case 'support':
        photoData = SERVICE_PHOTOS.support;
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid service type. Use: tours, cruises, or support' },
          { status: 400 }
        );
    }

    // Add cache busting
    const cacheBuster = Date.now();
    const photoWithCache = {
      ...photoData,
      url: `${photoData.url}&cache=${cacheBuster}`,
      type,
      cruiseType: type === 'cruises' ? cruiseType : undefined,
      timestamp: new Date().toISOString()
    };

    return new NextResponse(
      JSON.stringify(photoWithCache),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      }
    );

  } catch (error) {
    console.error('Service photo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service photo' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}