'use client';

import React from 'react';

interface SimpleMapProps {
  coordinates: [number, number];
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  coordinates,
  zoom: _zoom = 10,
  height = '400px',
  markers = [],
}) => {
  // Преобразуем координаты в проценты для позиционирования маркеров
  const convertToPercentage = (lat: number, lng: number): [number, number] => {
    // Простое преобразование для Европы (приблизительное)
    // Нидерланды: примерно 50-53°N, 3-7°E
    const minLat = 50;
    const maxLat = 54;
    const minLng = 3;
    const maxLng = 8;

    const yPercent = ((maxLat - lat) / (maxLat - minLat)) * 100;
    const xPercent = ((lng - minLng) / (maxLng - minLng)) * 100;

    return [Math.max(0, Math.min(100, xPercent)), Math.max(0, Math.min(100, yPercent))];
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg my-6 border border-gray-200 dark:border-gray-700"
      style={{ height }}
    >
      {/* Фоновая карта (стилизованный div) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
        {/* Имитация континентов */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-green-300 dark:bg-green-700 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/4 bg-green-400 dark:bg-green-600 rounded-full opacity-40"></div>

        {/* Сетка координат */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
      </div>

      {/* Маркеры */}
      {markers.map((marker, index) => {
        const [x, y] = convertToPercentage(marker.position[0], marker.position[1]);

        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            {/* Маркер */}
            <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform duration-200 relative">
              <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-30"></div>
            </div>

            {/* Tooltip при наведении */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
              <div className="font-medium">{marker.title}</div>
              {marker.description && (
                <div className="text-xs text-gray-300 mt-1">{marker.description}</div>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
            </div>
          </div>
        );
      })}

      {/* Информационная панель */}
      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-3 py-2 rounded-lg shadow-md">
        <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">📍 Нидерланды</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Координаты: {coordinates[0]}, {coordinates[1]}
        </div>
      </div>

      {/* Счетчик маркеров */}
      <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-3 py-2 rounded-lg shadow-md">
        <div className="text-xs text-gray-600 dark:text-gray-300">
          📍 Маркеров: <span className="font-bold">{markers.length}</span>
        </div>
      </div>

      {/* Подпись */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Интерактивная карта Нидерландов
      </div>
    </div>
  );
};

export default SimpleMap;
