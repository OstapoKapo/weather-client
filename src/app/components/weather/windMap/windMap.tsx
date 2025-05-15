'use client';
import './windMap.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { currentDay } from '@/types';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

interface WindMapProps {
  currentDay: currentDay
}


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const WindMap:React.FC<WindMapProps> = ({currentDay}) => {
  const center: [number, number] = [currentDay.coord.lat, currentDay.coord.lon]; // Київ
  const position: [number, number] = [currentDay.coord.lat, currentDay.coord.lon];
  return (
    <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
  
        <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`}
            attribution='&copy; OpenWeather'
        />

        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    </MapContainer>

    
  );
}

export default WindMap;


