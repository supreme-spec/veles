'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Устанавливаем токен (можно использовать публичный тестовый)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapboxMapProps {
  coordinates: [number, number];
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  coordinates,
  zoom = 10,
  height: _height = '400px',
  markers = [],
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current) {
      // Проверяем, что карта существует и имеет метод remove
      if (mapRef.current && typeof mapRef.current.remove === 'function') {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.warn('Error removing previous map:', error);
        }
      }

      // Создаем новую карту с обработкой ошибок
      try {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v12', // Стиль улиц
          center: [coordinates[1], coordinates[0]], // [lng, lat]
          zoom: zoom,
          attributionControl: false,
        });

        mapRef.current = map;

        // Добавляем элементы управления
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

        // Добавляем маркеры
        markers.forEach(marker => {
          try {
            // Создаем элемент для маркера
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.background = 'red';
            el.style.width = '24px';
            el.style.height = '24px';
            el.style.borderRadius = '50%';
            el.style.cursor = 'pointer';
            el.style.boxShadow = '0 0 0 4px white, 0 0 0 6px red';

            // Создаем popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="padding: 10px; min-width: 150px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${marker.title}</h3>
                  ${marker.description ? `<p style="margin: 0; color: #666;">${marker.description}</p>` : ''}
                </div>
              `);

            // Создаем маркер
            new mapboxgl.Marker(el)
              .setLngLat([marker.position[1], marker.position[0]])
              .setPopup(popup)
              .addTo(map);
          } catch (markerError) {
            console.warn('Error creating marker:', markerError);
          }
        });
      } catch (mapError) {
        console.error('Error initializing Mapbox map:', mapError);
        // Показываем сообщение об ошибке
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div class="text-center p-4">
                <div class="text-2xl mb-2">⚠️</div>
                <p class="text-red-600 dark:text-red-400">Ошибка загрузки карты</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Попробуйте обновить страницу</p>
              </div>
            </div>
          `;
        }
        return () => {
          // Cleanup function for error case
        };
      }

      // Очистка при размонтировании
      return () => {
        if (mapRef.current && typeof mapRef.current.remove === 'function') {
          try {
            mapRef.current.remove();
          } catch (error) {
            console.warn('Error removing map on cleanup:', error);
          }
        }
      };
    }
    return () => {
      // Default cleanup
    };
  }, [coordinates, zoom, markers]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg overflow-hidden"
    />
  );
};

export default MapboxMap;
