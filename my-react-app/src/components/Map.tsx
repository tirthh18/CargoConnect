
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../components/ui/card';
import { Loader } from 'lucide-react';

interface MapProps {
  markers?: { lat: number; lng: number; label?: string }[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ 
  markers = [], 
  center = { lat: 21.1702, lng: 72.8311 }, // Default center: Surat, India
  zoom = 13
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    let mapInstance: any;
    let script: HTMLScriptElement | null = null;

    const initMap = () => {
      if (!mapRef.current) return;
      setLoading(true);
      
      try {
        // This would normally use Google Maps or Mapbox
        // Since we don't have an API key, we'll simulate a map with a placeholder
        mapRef.current.innerHTML = '';
        const mapPlaceholder = document.createElement('div');
        mapPlaceholder.className = 'bg-sky-100 w-full h-full rounded-lg flex items-center justify-center relative';
        mapPlaceholder.style.minHeight = '400px';
        
        // Simulate map
        const mapContainer = document.createElement('div');
        mapContainer.className = 'absolute inset-0 flex items-center justify-center';
        mapContainer.textContent = '© OpenStreetMap contributors';
        mapPlaceholder.appendChild(mapContainer);

        // Add markers
        markers.forEach((marker, index) => {
          const markerElement = document.createElement('div');
          markerElement.className = 'absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white';
          markerElement.textContent = marker.label || (index + 1).toString();
          
          // Position marker (simplified)
          const offsetX = (Math.random() * 300) - 150;
          const offsetY = (Math.random() * 300) - 150;
          markerElement.style.left = `calc(50% + ${offsetX}px)`;
          markerElement.style.top = `calc(50% + ${offsetY}px)`;
          
          markerElement.title = marker.label || `Location ${index + 1}`;
          mapPlaceholder.appendChild(markerElement);
        });

        mapRef.current.appendChild(mapPlaceholder);
        setLoading(false);
      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('Failed to load map. Please try again later.');
        setLoading(false);
      }
    };

    initMap();

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [markers, center, zoom]);

  return (
    <Card className="w-full h-full overflow-hidden">
      {loading && (
        <div className="flex items-center justify-center h-96">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading map...</span>
        </div>
      )}
      
      {mapError && (
        <div className="flex items-center justify-center h-96 bg-red-50 text-red-600">
          <p>{mapError}</p>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full min-h-[400px]"></div>
    </Card>
  );
};

export default Map;
