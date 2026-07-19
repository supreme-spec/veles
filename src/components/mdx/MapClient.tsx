'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Исправляем проблему с иконками по умолчанию
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapClientProps {
  coordinates?: [number, number] | undefined;
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

// Компонент для автоматического изменения масштаба под маркеры
const FitBounds: React.FC<{ markers: MapClientProps['markers'] }> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => m.position));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

const MapClient: React.FC<MapClientProps> = ({ coordinates, zoom = 6, markers = [] }) => {
  // Если центр не задан, используем первый маркер или дефолт
  const center: [number, number] = coordinates || (markers?.[0]?.position || [34.555, 69.177]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OSM</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {/* Fallback layer if Stadia is unavailable */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div className="p-1">
              <strong className="text-blue-600 block mb-1">{marker.title}</strong>
              {marker.description && <p className="text-xs text-gray-600 !m-0">{marker.description}</p>}
            </div>
          </Popup>
        </Marker>
      ))}

      {markers && markers.length > 1 && <FitBounds markers={markers} />}
    </MapContainer>
  );
};


export default MapClient;
