// Utility for fetching tour photos from Unsplash API

export interface TourPhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
  week?: number;
  year?: number;
}

// Get current bi-weekly period (same logic as in API)
function getCurrentBiWeeklyPeriod(): { period: number; year: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + start.getDay() + 1) / 7);
  const biWeeklyPeriod = Math.ceil(week / 2);
  
  return {
    period: biWeeklyPeriod,
    year: now.getFullYear()
  };
}

// Fetch tour photo from our API with caching
export async function fetchTourPhoto(tourType: string): Promise<TourPhoto | null> {
  const { period, year } = getCurrentBiWeeklyPeriod();
  const cacheKey = `tour-photo-${tourType}-${year}-${period}`;
  
  // Check cache first (client-side only)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedPhoto = JSON.parse(cached) as TourPhoto;
        if (cachedPhoto.week === period && cachedPhoto.year === year) {
          return cachedPhoto;
        }
      } catch (error) {
        console.error('Error parsing cached tour photo:', error);
      }
    }
  }
  
  try {
    // Use relative URL for client-side, absolute for server-side
    const url = typeof window !== 'undefined' 
      ? `/api/service-photo?type=tours&tourType=${encodeURIComponent(tourType)}` // Relative URL on client
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9323'}/api/service-photo?type=tours&tourType=${encodeURIComponent(tourType)}`; // Absolute URL on server
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.url && data.description) {
        const photo = {
          url: data.url,
          description: data.description,
          photographer: data.photographer || 'Unsplash',
          location: data.location || 'Неизвестное место',
          week: period,
          year
        } as TourPhoto;
        
        // Cache the photo (client-side only)
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(photo));
        }
        
        return photo;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching tour photo:', error);
    return null;
  }
}

// Fetch all tour photos
export async function fetchAllTourPhotos(): Promise<Record<string, TourPhoto>> {
  const tourTypes = ['europe', 'asia', 'africa', 'america', 'cruise', 'extreme', 'oceania', 'south-america'];
  const photos: Record<string, TourPhoto> = {};
  
  // Fetch all tour photos in parallel
  const promises = tourTypes.map(async (tourType) => {
    const photo = await fetchTourPhoto(tourType);
    if (photo) {
      photos[tourType] = photo;
    }
  });
  
  await Promise.all(promises);
  return photos;
}