// Utility for managing weekly changing photos
export interface WeeklyPhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
  week: number;
  year: number;
}

// Get current week number of the year
export function getCurrentWeek(): { week: number; year: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + start.getDay() + 1) / 7);

  return {
    week,
    year: now.getFullYear(),
  };
}

// Predefined tourism photos for fallback
const fallbackPhotos: Omit<WeeklyPhoto, 'week' | 'year'>[] = [
  {
    url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Городские пейзажи и архитектура',
    photographer: 'Unsplash',
    location: 'Европейские города',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Природные ландшафты и горы',
    photographer: 'Unsplash',
    location: 'Горные регионы',
  },
  {
    url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Пляжный отдых и море',
    photographer: 'Unsplash',
    location: 'Тропические острова',
  },
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Дорожные приключения и путешествия',
    photographer: 'Unsplash',
    location: 'Открытые дороги',
  },
  {
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Культурные достопримечательности',
    photographer: 'Unsplash',
    location: 'Исторические места',
  },
  {
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&h=1080&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    description: 'Северное сияние и природа',
    photographer: 'Unsplash',
    location: 'Арктические регионы',
  }
];

// Tourism-related search terms for API
const tourismKeywords = [
  'travel destination',
  'mountain landscape',
  'tropical beach',
  'ancient architecture',
  'city skyline',
  'cultural landmark',
  'natural wonder',
  'scenic view',
  'tourist attraction',
  'adventure travel',
  'beautiful landscape',
  'world heritage',
  'exotic destination',
  'famous landmark',
  'breathtaking view',
];

// Get photo for current week
export function getWeeklyPhoto(): WeeklyPhoto {
  const { week, year } = getCurrentWeek();

  // Use week number to select from fallback photos
  if (fallbackPhotos.length === 0) {
    throw new Error('No fallback photos available');
  }

  const photoIndex = (week - 1) % fallbackPhotos.length;
  const selectedPhoto = fallbackPhotos[photoIndex];

  if (!selectedPhoto) {
    throw new Error('Could not select photo for week');
  }

  return {
    ...selectedPhoto,
    week,
    year,
  };
}

// Fetch photo from Unsplash API
export async function fetchUnsplashPhoto(): Promise<WeeklyPhoto | null> {
  try {
    const { week, year } = getCurrentWeek();

    // Use week to select keyword
    if (tourismKeywords.length === 0) {
      return null;
    }
    const keywordIndex = (week - 1) % tourismKeywords.length;
    const keyword = tourismKeywords[keywordIndex];
    if (!keyword) {
      return null;
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(keyword)}&orientation=landscape&w=1920&h=1080&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo'}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }
    const data = await response.json();

    const urls = data.urls;
    const user = data.user;
    const location = data.location;

    if (!urls || (!urls.regular && !urls.full)) {
      return null;
    }

    const url = urls.regular || urls.full;
    if (!url) {
      return null;
    }

    return {
      url,
      description:
        data.description || data.alt_description || 'Красивый пейзаж для путешественников',
      photographer: user?.name || 'Unsplash',
      location: location?.name || 'Неизвестное место',
      week,
      year,
    };
  } catch (error) {
    console.error('Error fetching Unsplash photo:', error);
    return null;
  }
}

// Get cached photo or fetch new one
export async function getWeeklyPhotoWithCache(): Promise<WeeklyPhoto> {
  const { week, year } = getCurrentWeek();
  const cacheKey = `weekly-photo-${year}-${week}`;

  // Check if we have a cached photo for this week
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedPhoto = JSON.parse(cached) as WeeklyPhoto;
        if (cachedPhoto.week === week && cachedPhoto.year === year) {
          return cachedPhoto;
        }
      } catch (error) {
        console.error('Error parsing cached photo:', error);
      }
    }
  }

  // Try to fetch from our API
  try {
    const response = await fetch('/api/weekly-photo');
    if (response.ok) {
      const data = await response.json();
      // API returns photo data directly, not wrapped in success/photo
      if (data.url && data.description) {
        const apiPhoto = {
          url: data.url,
          description: data.description,
          photographer: data.photographer || 'Unsplash',
          location: data.location || 'Неизвестное место',
          week: data.week || week,
          year: data.year || year
        };

        // Cache the photo
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(apiPhoto));
        }
        return apiPhoto;
      }
    }
  } catch (error) {
    console.error('Error fetching from weekly photo API:', error);
  }
  // Fallback to predefined photos
  const fallbackPhoto = getWeeklyPhoto();
  // Cache the fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify(fallbackPhoto));
  }

  return fallbackPhoto;
}
