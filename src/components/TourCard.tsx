'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchTourPhoto, type TourPhoto } from '@/shared/utils/tourPhotos';

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
}

// Fallback images for each tour type (proven-working Unsplash URLs)
const fallbackImages: Record<string, string> = {
  europe: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&auto=format',
  asia: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop&auto=format',
  africa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&auto=format',
  america: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop&auto=format',
  cruise: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop&auto=format',
  extreme: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format',
  oceania: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop&auto=format',
  'south-america': 'https://images.unsplash.com/photo-1539053447282-6f32f2bddfed?w=600&h=400&fit=crop&auto=format',
  // Specific countries
  turkey: 'https://images.unsplash.com/photo-1541867329-024aafd2e546?w=600&h=400&fit=crop&auto=format',
  egypt: 'https://images.unsplash.com/photo-1566125882500-54c2e76ceae7?w=600&h=400&fit=crop&auto=format',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format',
  thailand: 'https://images.unsplash.com/photo-1528183429303-0b2e8e90e3d8?w=600&h=400&fit=crop&auto=format',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop&auto=format',
  greece: 'https://images.unsplash.com/photo-1570077188677-4a4c26d44f09?w=600&h=400&fit=crop&auto=format',
  'sri-lanka': 'https://images.unsplash.com/photo-1588258596535-2498cdb08303?w=600&h=400&fit=crop&auto=format',
  vietnam: 'https://images.unsplash.com/photo-1528183429303-0b2e8e90e3d8?w=600&h=400&fit=crop&auto=format',
};

export default function TourCard({ id, title, description, imageAlt }: TourCardProps) {
  const [photo, setPhoto] = useState<TourPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadTourPhoto = async () => {
      try {
        setIsLoading(true);
        setImageError(false);
        const tourPhoto = await fetchTourPhoto(id);
        if (tourPhoto) {
          setPhoto(tourPhoto);
        } else {
          // Use fallback if API doesn't return photo
          const locationMap: Record<string, string> = {
            europe: 'Европа',
            asia: 'Азия',
            africa: 'Африка',
            america: 'Америка',
            cruise: 'Океан',
            extreme: 'Горы',
            oceania: 'Океания',
            'south-america': 'Южная Америка',
            turkey: 'Турция',
            egypt: 'Египет',
            uae: 'ОАЭ',
            thailand: 'Таиланд',
            maldives: 'Мальдивы',
            greece: 'Греция',
            'sri-lanka': 'Шри-Ланка',
            vietnam: 'Вьетнам',
          };
          setPhoto({
            url: fallbackImages[id] || fallbackImages.europe || '',
            description: imageAlt,
            photographer: 'Unsplash',
            location: locationMap[id] || 'Мир',
          });
        }
      } catch (err) {
        console.error(`Error loading ${id} photo:`, err);
        // Use fallback on error
        const locationMap: Record<string, string> = {
          europe: 'Европа',
          asia: 'Азия',
          africa: 'Африка',
          america: 'Америка',
          cruise: 'Океан',
          extreme: 'Горы',
          oceania: 'Океания',
          'south-america': 'Южная Америка',
          turkey: 'Турция',
          egypt: 'Египет',
          uae: 'ОАЭ',
          thailand: 'Таиланд',
          maldives: 'Мальдивы',
          greece: 'Греция',
          'sri-lanka': 'Шри-Ланка',
          vietnam: 'Вьетнам',
        };
        setPhoto({
          url: fallbackImages[id] || fallbackImages.europe || '',
          description: imageAlt,
          photographer: 'Unsplash',
          location: locationMap[id] || 'Мир',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTourPhoto();
  }, [id, imageAlt]);

  // Get gradient class based on tour type
  const getGradientClass = () => {
    switch (id) {
      case 'europe':
        return 'from-blue-500 to-indigo-600';
      case 'asia':
        return 'from-orange-500 to-red-600';
      case 'africa':
        return 'from-yellow-500 to-orange-600';
      case 'america':
        return 'from-purple-500 to-pink-600';
      case 'cruise':
        return 'from-teal-500 to-blue-600';
      case 'extreme':
        return 'from-gray-600 to-gray-800';
      case 'oceania':
        return 'from-cyan-500 to-teal-600';
      case 'south-america':
        return 'from-emerald-500 to-lime-600';
      // Specific countries
      case 'turkey':
        return 'from-blue-400 to-cyan-600';
      case 'egypt':
        return 'from-yellow-400 to-orange-600';
      case 'uae':
        return 'from-amber-400 to-orange-600';
      case 'thailand':
        return 'from-green-400 to-emerald-600';
      case 'maldives':
        return 'from-cyan-400 to-blue-600';
      case 'greece':
        return 'from-blue-500 to-indigo-600';
      case 'sri-lanka':
        return 'from-teal-400 to-green-600';
      case 'vietnam':
        return 'from-red-400 to-rose-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  // Don't render image on server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        <div className={`h-48 relative overflow-hidden bg-gradient-to-r ${getGradientClass()}`} />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
          <Link
            href={`/tours/${id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 self-start mt-auto inline-block text-center no-underline"
          >
            Подробнее
          </Link>
        </div>
      </div>
    );
  }

  // Show gradient while loading or if image failed
  if (isLoading || imageError || !photo) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        <div className={`h-48 relative overflow-hidden bg-gradient-to-r ${getGradientClass()}`} />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
          <Link
            href={`/tours/${id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 self-start mt-auto inline-block text-center no-underline"
          >
            Подробнее
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className={`h-48 relative overflow-hidden bg-gradient-to-r ${getGradientClass()}`}>
        {photo.url.includes('unsplash.com') ? (
          // Use img tag for Unsplash images to avoid optimization issues
          <img
            src={photo.url}
            alt={imageAlt}
            className="object-cover transition-transform duration-500 hover:scale-110 w-full h-full"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          // Use Next.js Image for other sources
          <Image
            src={photo.url}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            unoptimized
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        <Link
          href={`/tours/${id}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 self-start mt-auto inline-block text-center no-underline"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
