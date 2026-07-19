'use client';

import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  coordinates: [number, number];
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  coordinates,
  zoom = 10,
  height: _height = '400px',
  markers = [],
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Загружаем Google Maps API
      const loadGoogleMaps = async () => {
        // Используем бесплатную версию Google Maps без API ключа для разработки
        // В production нужно добавить свой API ключ
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
        script.async = true;
        script.defer = true;

        // Создаем callback функцию
        (window as any).initMap = () => {
          if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
              center: { lat: coordinates[0], lng: coordinates[1] },
              zoom: zoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: [
                {
                  featureType: 'administrative',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#444444' }],
                },
                {
                  featureType: 'landscape',
                  elementType: 'all',
                  stylers: [{ color: '#f2f2f2' }],
                },
                {
                  featureType: 'poi',
                  elementType: 'all',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'road',
                  elementType: 'all',
                  stylers: [{ saturation: -100 }, { lightness: 45 }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'all',
                  stylers: [{ visibility: 'simplified' }],
                },
                {
                  featureType: 'road.arterial',
                  elementType: 'labels.icon',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'transit',
                  elementType: 'all',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'water',
                  elementType: 'all',
                  stylers: [{ color: '#46bcec' }, { visibility: 'on' }],
                },
              ],
            });

            mapInstanceRef.current = map;

            // Добавляем маркеры
            markers.forEach(marker => {
              const markerInstance = new google.maps.Marker({
                position: { lat: marker.position[0], lng: marker.position[1] },
                map: map,
                title: marker.title,
                animation: google.maps.Animation.DROP,
              });

              // Добавляем info window
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="padding: 10px; min-width: 150px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${marker.title}</h3>
                    ${marker.description ? `<p style="margin: 0; color: #666;">${marker.description}</p>` : ''}
                  </div>
                `,
              });

              google.maps.event.addListener(markerInstance, 'click', () => {
                infoWindow.open(map, markerInstance);
              });
            });
          }
        };

        document.head.appendChild(script);

        // Cleanup
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
          delete (window as any).initMap;
        };
      };

      loadGoogleMaps();
    }
  }, [coordinates, zoom, markers]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg overflow-hidden"
    />
  );
};

export default GoogleMap;
