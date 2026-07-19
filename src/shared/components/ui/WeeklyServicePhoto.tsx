'use client';

import { useState, useEffect } from 'react';
import { getServicePhotoWithCache, type ServicePhoto } from '@/shared/utils/servicePhotos';
import Image from 'next/image';

interface WeeklyServicePhotoProps {
  serviceType: 'tours' | 'cruises' | 'support';
  cruiseType?: 'mediterranean' | 'caribbean' | 'scandinavian' | 'asian' | 'alaska' | 'world';
  alt: string;
  className?: string;
}

export const WeeklyServicePhoto: React.FC<WeeklyServicePhotoProps> = ({ 
  serviceType,
  cruiseType,
  alt,
  className = "" 
}) => {
  const [photo, setPhoto] = useState<ServicePhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setImageError(false); // Reset error state
    
    const loadServicePhoto = async () => {
      try {
        setIsLoading(true);
        setImageError(false);
        const servicePhoto = await getServicePhotoWithCache(serviceType, cruiseType);
        if (servicePhoto && servicePhoto.url) {
          setPhoto(servicePhoto);
        } else {
          setImageError(true);
        }
      } catch (err) {
        console.error(`Error loading ${serviceType} photo:`, err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadServicePhoto();
  }, [serviceType, cruiseType]);

  // Don't render anything on the server to prevent hydration mismatch
  if (!isClient) {
    const gradientClass = 
      serviceType === 'cruises' ? 'bg-gradient-to-r from-teal-500 to-blue-600' :
      serviceType === 'tours' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
      'bg-gradient-to-r from-purple-500 to-pink-600';
    
    return (
      <div className={`relative w-full h-full ${gradientClass} ${className}`} style={{ minHeight: '100%', minWidth: '100%' }} />
    );
  }

  // Get gradient class based on service type
  const getGradientClass = () => {
    if (serviceType === 'cruises') return 'bg-gradient-to-r from-teal-500 to-blue-600';
    if (serviceType === 'tours') return 'bg-gradient-to-r from-green-500 to-emerald-600';
    return 'bg-gradient-to-r from-purple-500 to-pink-600';
  };

  // Show placeholder while loading or if error - используем градиент, соответствующий типу сервиса
  if (isLoading || !photo || imageError) {
    return (
      <div className={`relative w-full h-full ${getGradientClass()} ${className}`} style={{ minHeight: '100%', minWidth: '100%' }} />
    );
  }

  // Validate photo URL before rendering
  if (!photo.url || !photo.url.startsWith('http')) {
    return (
      <div className={`relative w-full h-full ${getGradientClass()} ${className}`} style={{ minHeight: '100%', minWidth: '100%' }} />
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '100%', minWidth: '100%' }}>
      {photo.url.includes('unsplash.com') ? (
        // Use img tag for Unsplash images to avoid optimization issues
        <img
          src={photo.url}
          alt={alt}
          className="object-cover w-full h-full"
          onError={() => {
            console.error(`Failed to load image for ${serviceType}:`, photo.url);
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image for ${serviceType}:`, photo.url);
          }}
        />
      ) : (
        // Use Next.js Image for other sources
        <Image 
          src={photo.url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => {
            console.error(`Failed to load image for ${serviceType}:`, photo.url);
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image for ${serviceType}:`, photo.url);
          }}
        />
      )}
    </div>
  );
};