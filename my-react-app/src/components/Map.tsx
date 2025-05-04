import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../contexts/AuthContext';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapProps {
  markers?: { lat: number; lng: number; label?: string }[];
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ markers = [], zoom = 13 }) => {
  const { user } = useAuth();

  const center: LatLngExpression =
    user?.city === 'nadiad'
      ? { lat: 22.6916, lng: 72.8634 }
      : { lat: 21.1702, lng: 72.8311 }; // Surat

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-[400px] rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => {
  const numberIcon = divIcon({
    html: `<div style="background:#ec4899;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;">${marker.label || index + 1}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <Marker key={index} position={[marker.lat, marker.lng]} icon={numberIcon}>
      <Popup>{marker.label || `Location ${index + 1}`}</Popup>
    </Marker>
  );
})}

      </MapContainer>
    </div>
  );
};

export default Map;
