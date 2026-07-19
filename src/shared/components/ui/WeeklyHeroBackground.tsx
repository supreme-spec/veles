'use client';

import { useState, useEffect } from 'react';
import { getWeeklyPhoto, type WeeklyPhoto } from '@/shared/utils/weeklyPhoto';

interface WeeklyHeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const WeeklyHeroBackground: React.FC<WeeklyHeroBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const [photo, setPhoto] = useState<WeeklyPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeeklyPhoto = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // First try our API
        const response = await fetch('/api/weekly-photo');
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          
          if (data.url && data.description) {
            const apiPhoto = {
              url: data.url,
              description: data.description,
              photographer: data.photographer || 'Unsplash',
              location: data.location || 'Неизвестное место',
              week: data.week || data.currentWeek || 1,
              year: data.year || 2026
            };
            
            setPhoto(apiPhoto);
            
            // Preload image with priority hints
            const img = new Image();
            img.loading = 'eager';
            img.fetchPriority = 'high';
            img.onload = () => {
              console.log('Image loaded successfully');
              setIsLoading(false);
            };
            img.onerror = (e) => {
              console.error('Image preload failed:', e);
              setError('Не удалось загрузить фоновое изображение');
              setIsLoading(false);
            };
            img.src = apiPhoto.url;
            return;
          }
        }
        
        // Fallback to predefined photos
        console.log('Using fallback photo');
        const fallbackPhoto = getWeeklyPhoto();
        setPhoto(fallbackPhoto);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error loading weekly photo:', err);
        setError('Не удалось загрузить фото недели');
        setIsLoading(false);
      }
    };

    loadWeeklyPhoto();
  }, []);

  // Fallback background while loading
  const fallbackBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <section className={`relative min-h-screen flex items-center justify-center ${className}`}>
      {/* Background Image with fallback */}
      {photo ? (
        <>
          <img
            src={photo.url}
            alt={photo.description}
            className="absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{
              opacity: isLoading ? 0.7 : 1
            }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              console.error('Image failed to load:', e);
              console.error('Failed URL:', photo.url);
              setError('Не удалось загрузить фоновое изображение');
              setIsLoading(false);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        </>
      ) : (
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            background: fallbackBackground,
            opacity: isLoading ? 0.7 : 1
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}

      {/* Loading indicator */}
      {(isLoading || !photo) && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 text-white text-sm">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>{photo ? 'Загружаем фото недели...' : 'Загружаем фоновое изображение...'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Photo attribution */}
      {photo && !isLoading && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-3 text-white text-xs max-w-xs">
            <div className="font-medium">{photo.description}</div>
            <div className="mt-1 opacity-75">
              📍 {photo.location}
            </div>
            <div className="mt-1 opacity-75">
              📷 Фото: {photo.photographer}
            </div>
            <div className="mt-1 opacity-60">
              🗓️ Неделя {photo.week}, {photo.year}
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
            <div className="font-medium">⚠️ Ошибка загрузки</div>
            <div className="text-xs mt-1 opacity-90">{error}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};