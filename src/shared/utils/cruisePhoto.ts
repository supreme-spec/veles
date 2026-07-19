// Utility for fetching cruise photos from Unsplash API

export interface CruisePhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
}

// Fetch cruise photo from our API
export async function fetchCruisePhoto(cruiseType?: string): Promise<CruisePhoto | null> {
  try {
    // Use relative URL for client-side fetching, absolute for server-side
    const requestUrl = typeof window !== 'undefined' 
      ? `/api/cruise-photo${cruiseType ? `?type=${cruiseType}` : ''}` // Relative URL on client
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9323'}/api/cruise-photo${cruiseType ? `?type=${cruiseType}` : ''}`; // Absolute URL on server
      
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.photo && data.photo.url && data.photo.url.startsWith('http')) {
        return data.photo as CruisePhoto;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching cruise photo:', error);
    return null;
  }
}