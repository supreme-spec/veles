'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCruisePhoto } from '@/shared/utils/cruisePhoto';
import type { CruisePhoto } from '@/shared/utils/cruisePhoto';

interface CruiseCardProps {
  id: string;
  emoji: string;
  title: string;
  description: string;
  cruiseType: string;
}

// Fallback images for each cruise type - distinct, verified Unsplash URLs
const fallbackImages: Record<string, string> = {
  mediterranean: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=300&fit=crop&auto=format',
  caribbean: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=300&fit=crop&auto=format',
  scandinavian: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop&auto=format',
  asian: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=300&fit=crop&auto=format',
  alaska: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=300&fit=crop&auto=format',
  world: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=300&fit=crop&auto=format',
};

export default function CruiseCard({
  id: _id,
  emoji,
  title,
  description,
  cruiseType,
}: CruiseCardProps) {
  const [photo, setPhoto] = useState<CruisePhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false); // Reset error state on new load
    const loadCruisePhoto = async () => {
      try {
        setIsLoading(true);
        const fetchedPhoto = await fetchCruisePhoto(cruiseType);
        if (fetchedPhoto && fetchedPhoto.url) {
          setPhoto(fetchedPhoto);
          console.log(`Successfully loaded image for ${cruiseType}:`, fetchedPhoto.url);
        } else {
          setImageError(true);
          console.error(`Failed to fetch valid photo for ${cruiseType}. Using fallback.`);
        }
      } catch (err) {
        console.error(`Error fetching cruise photo for ${cruiseType}:`, err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCruisePhoto();
  }, [cruiseType]);

  // Get gradient class based on cruise type
  const getGradientClass = () => {
    switch (cruiseType) {
      case 'mediterranean':
        return 'from-blue-500 to-indigo-600';
      case 'caribbean':
        return 'from-teal-500 to-cyan-600';
      case 'scandinavian':
        return 'from-slate-500 to-blue-600';
      case 'asian':
        return 'from-orange-500 to-red-600';
      case 'alaska':
        return 'from-cyan-500 to-blue-600';
      case 'world':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  // Determine the final image URL
  const imageUrl =
    photo?.url && photo.url.startsWith('http')
      ? photo.url
      : fallbackImages[cruiseType] || fallbackImages.mediterranean;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className={`h-48 relative overflow-hidden bg-gradient-to-r ${getGradientClass()}`}>
        {isLoading || imageError || !imageUrl ? (
          // Show gradient placeholder if loading, error, or no valid URL
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-r ${getGradientClass()}`}
          />
        ) : (
          imageUrl.includes('unsplash.com') ? (
            // Use img tag for Unsplash images to avoid Next.js optimization issues
            <img
              src={imageUrl}
              alt={photo?.description || title}
              className="object-cover transition-transform duration-500 hover:scale-110 w-full h-full"
              onError={() => {
                console.error(`Failed to load image for ${cruiseType}:`, imageUrl);
                setImageError(true);
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for ${cruiseType}:`, imageUrl);
              }}
            />
          ) : (
            // Use Next.js Image for other images
            <Image
              src={imageUrl}
              alt={photo?.description || title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={cruiseType === 'mediterranean' || cruiseType === 'caribbean'}
              onError={() => {
                console.error(`Failed to load image for ${cruiseType}:`, imageUrl);
                setImageError(true);
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for ${cruiseType}:`, imageUrl);
              }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {emoji} {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        <Link
          href={`/cruises/${cruiseType}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 self-start mt-auto inline-block text-center no-underline"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
