// Utility for managing weekly changing photos for service cards
export interface ServicePhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
  week: number;
  year: number;
}

// Get current bi-weekly period (every 1-1.5 weeks)
export function getCurrentBiWeeklyPeriod(): { period: number; year: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  // Calculate period as every 10 days (approximately 1.5 weeks)
  const period = Math.ceil(days / 10);

  return {
    period,
    year: now.getFullYear(),
  };
}

// Specific keywords for each cruise type to match descriptions
const cruiseTypeKeywords = {
  mediterranean: [
    'mediterranean sea cruise',
    'greek island cruise',
    'italian coast cruise',
    'ancient ruins cruise',
    'mediterranean yacht',
  ],
  caribbean: [
    'caribbean beach cruise',
    'tropical palm cruise',
    'caribbean island hopping',
    'white sand beach cruise',
    'caribbean vacation',
  ],
  scandinavian: [
    'scandinavian fjord cruise',
    'norway fjord ship',
    'northern lights cruise',
    'scandinavian nature cruise',
    'wilderness fjord',
  ],
  asian: [
    'asian cruise tour',
    'southeast asia cruise',
    'exotic island cruise',
    'asian culture cruise',
    'tropical asian waters',
  ],
  alaska: [
    'alaska cruise glacier',
    'iceberg cruise alaska',
    'wild alaska cruise',
    'alaska wildlife cruise',
    'northern cruise alaska',
  ],
  world: [
    'world cruise ship',
    'around the world cruise',
    'luxury world cruise',
    'global cruise tour',
    'international cruise',
  ],
};

// Predefined fallback photos for each service
const fallbackPhotos = {
  tours: [
    {
      url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&h=300&fit=crop',
      description: 'Путешественник в горах',
      photographer: 'Unsplash',
      location: 'Альпы',
    },
    {
      url: 'https://images.unsplash.com/photo-1474314881477-04c4aac40a0e?w=600&h=300&fit=crop',
      description: 'Группа туристов',
      photographer: 'Unsplash',
      location: 'Италия',
    },
  ],
  cruises: [
    {
      url: 'https://images.unsplash.com/photo-1574273783741-56987754ef68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300',
      description: 'Роскошный круизный лайнер',
      photographer: 'Unsplash',
      location: 'Средиземное море',
    },
    {
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300',
      description: 'Круизное судно в море',
      photographer: 'Unsplash',
      location: 'Карибское море',
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300',
      description: 'Океанский лайнер',
      photographer: 'Unsplash',
      location: 'Открытое море',
    },
    {
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300',
      description: 'Круизный корабль',
      photographer: 'Unsplash',
      location: 'Тропические воды',
    },
  ],
  support: [
    {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=300&fit=crop',
      description: 'Планирование путешествия',
      photographer: 'Unsplash',
      location: 'Офис турагентства',
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      description: 'Консультация по путешествиям',
      photographer: 'Unsplash',
      location: 'Туристическое агентство',
    },
    {
      url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=300&fit=crop',
      description: 'Поддержка путешественников',
      photographer: 'Unsplash',
      location: 'Служба поддержки',
    },
    {
      url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop',
      description: 'Помощь в планировании поездки',
      photographer: 'Unsplash',
      location: 'Туристический консультант',
    },
  ],
};

// Get photo for current bi-weekly period based on service type
export function getWeeklyServicePhoto(serviceType: 'tours' | 'cruises' | 'support'): ServicePhoto {
  const { period, year } = getCurrentBiWeeklyPeriod();

  // Use period number to select from fallback photos
  const photos = fallbackPhotos[serviceType];
  if (!photos || photos.length === 0) {
    throw new Error(`No fallback photos available for service type: ${serviceType}`);
  }

  const photoIndex = (period - 1) % photos.length;
  const selectedPhoto = photos[photoIndex];

  if (!selectedPhoto) {
    throw new Error(`Could not select photo for service type: ${serviceType}`);
  }

  return {
    ...selectedPhoto,
    week: period,
    year,
  };
}

// Fetch photo from our server API (which handles Unsplash requests server-side)
export async function fetchServicePhotoFromUnsplash(
  serviceType: 'tours' | 'cruises' | 'support',
  cruiseType?: keyof typeof cruiseTypeKeywords
): Promise<ServicePhoto | null> {
  try {
    const { period, year } = getCurrentBiWeeklyPeriod();

    // Use relative URL for client-side, absolute for server-side
    const url =
      typeof window !== 'undefined'
        ? `/api/service-photo?type=${serviceType}${cruiseType ? `&cruiseType=${cruiseType}` : ''}` // Relative URL on client
        : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9323'}/api/service-photo?type=${serviceType}${cruiseType ? `&cruiseType=${cruiseType}` : ''}`; // Absolute URL on server

    const response = await fetch(url);

    if (!response.ok) {
      // If API fails, return null to use fallback
      return null;
    }

    const data = await response.json();

    if (data.success && data.photo) {
      // Validate that we got a valid URL
      const imageUrl = data.photo.url;
      if (!imageUrl || !imageUrl.startsWith('http')) {
        return null;
      }

      return {
        url: imageUrl,
        description:
          data.photo.description ||
          `Фото для ${serviceType === 'tours' ? 'туров' : serviceType === 'cruises' ? 'круизов' : 'поддержки'}`,
        photographer: data.photo.photographer || 'Unsplash',
        location: data.photo.location || 'Неизвестное место',
        week: data.photo.week || period,
        year: data.photo.year || year,
      };
    }

    return null;
  } catch (error) {
    // Тихая обработка ошибок - используем fallback
    return null;
  }
}

// Check if Unsplash API key is valid (cache the result to avoid repeated 401 errors)
function isUnsplashKeyValid(): boolean {
  if (typeof window === 'undefined') return false;

  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!accessKey || accessKey === 'demo' || accessKey === 'your_unsplash_access_key_here') {
    return false;
  }

  // Check cache for invalid key status (only if key hasn't changed)
  const invalidKeyCache = localStorage.getItem('unsplash-key-invalid');
  const cachedKey = localStorage.getItem('unsplash-key-value');

  // If key changed, clear invalid status
  if (cachedKey !== accessKey) {
    localStorage.removeItem('unsplash-key-invalid');
    localStorage.setItem('unsplash-key-value', accessKey);
    return true;
  }

  if (invalidKeyCache === 'true') {
    return false;
  }

  return true;
}

// Export function to clear invalid key cache (for manual reset)
export function clearUnsplashKeyCache(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('unsplash-key-invalid');
    localStorage.removeItem('unsplash-key-value');
    // Clear all cached photos to force refresh
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('service-photo-')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Get cached photo or fetch new one for specific service
export async function getServicePhotoWithCache(
  serviceType: 'tours' | 'cruises' | 'support',
  cruiseType?: keyof typeof cruiseTypeKeywords
): Promise<ServicePhoto> {
  const { period, year } = getCurrentBiWeeklyPeriod();
  const cacheKey = `service-photo-${serviceType}-${cruiseType || 'general'}-${year}-${period}`;

  // Check if we have a cached photo for this period
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedPhoto = JSON.parse(cached) as ServicePhoto;
        if (cachedPhoto.week === period && cachedPhoto.year === year) {
          return cachedPhoto;
        }
      } catch (error) {
        console.error('Error parsing cached photo:', error);
      }
    }
  }

  // Try to fetch from Unsplash only if API key is valid
  if (isUnsplashKeyValid()) {
    const servicePhoto = await fetchServicePhotoFromUnsplash(serviceType, cruiseType);
    if (servicePhoto && servicePhoto.url && servicePhoto.url.startsWith('http')) {
      // Cache the photo
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify(servicePhoto));
      }
      return servicePhoto;
    }
  }

  // Fallback to predefined photos (always available)
  const fallbackPhoto = getWeeklyServicePhoto(serviceType);

  // Ensure fallback photo has valid URL
  if (!fallbackPhoto.url || !fallbackPhoto.url.startsWith('http')) {
    // Use a default fallback if the predefined one is invalid
    const defaultFallback: ServicePhoto = {
      url:
        serviceType === 'cruises'
          ? 'https://images.unsplash.com/photo-1574273783741-56987754ef68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
          : serviceType === 'tours'
            ? 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
            : 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      description: `Фото для ${serviceType === 'tours' ? 'туров' : serviceType === 'cruises' ? 'круизов' : 'поддержки'}`,
      photographer: 'Unsplash',
      location: 'Неизвестное место',
      week: period,
      year,
    };

    // Cache the default fallback
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify(defaultFallback));
    }
    return defaultFallback;
  }

  // Cache the fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify(fallbackPhoto));
  }

  return fallbackPhoto;
}
