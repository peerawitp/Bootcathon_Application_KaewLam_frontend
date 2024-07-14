import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import BottomSheet from './bottom-sheet';
import { apiInstance } from '@/api/instance';

const marker_user_icon = new L.Icon({
  iconUrl: '/marker-user.svg',
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});
const marker_center_icon = new L.Icon({
  iconUrl: '/marker-center.svg',
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});

interface MapFrameProps {
  center: [number, number];
  zoom: number;
  popUpLabel?: string;
  setLocation: (value: any) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
  mapData: any[];
}

const MapUpdater: React.FC<{ mapCenter: [number, number]; center: [number, number]; }> = ({ mapCenter, center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(mapCenter, map.getZoom());
  }, [mapCenter, map]);

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const haversineDistance = (coords1: [number, number], coords2: [number, number]) => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = coords1[0];
  const lon1 = coords1[1];
  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // distance in kilometers
};

const MapFrame: React.FC<MapFrameProps> = ({
  center,
  zoom,
  popUpLabel,
  setLocation,
  isSheetOpen,
  setIsSheetOpen,
  mapData,
}) => {
  const [mapCenter, setMapCenter] = useState(center);
  const [centerLocation, setCenterLocation] = useState<any[]>([]);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  useEffect(() => {
    apiInstance({
      method: "GET",
      url: "/center",
    })
    .then((res) => {
      const locations = res.data.map((location: any) => ({
        ...location,
        distance: haversineDistance(center, [location.latitude, location.longitude]),
      }));
      setCenterLocation(locations);
    })
    .catch((err) => {
      console.error("Failed to fetch center locations:", err);
    });
  }, [center]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className="w-screen h-screen"
      dragging={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      touchZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={marker_user_icon}>
        <Popup>
          {popUpLabel}
          <div className="text-green-500">{center[0]} {center[1]}</div>
        </Popup>
      </Marker>
      {centerLocation.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={marker_center_icon}
        >
          <Popup>
            {location.name}
            <div className='text-blue-500'>Distance: {location.distance.toFixed(2)} km</div>
          </Popup>
        </Marker>
      ))}
      <MapUpdater mapCenter={mapCenter} center={center} />
      <div className="absolute z-10 bottom-10">
      <BottomSheet
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            setLocation={setLocation}
            listData={mapData}
            renderItem={renderMapItem}
            title="Map Data"
            description="Information about the selected location"
        />
      </div>
    </MapContainer>
  );
};

const renderMapItem = (data: any, setLocation: (value: any) => void, setIsSheetOpen: (value: boolean) => void) => (
  <div
      key={data.place_id}
      className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 hover:scale-95 rounded-xl p-5 flex flex-cols-2"
      onClick={() => {
          setLocation([data.lat, data.lon]);
          setIsSheetOpen(false);
      }}
  >
      <div className="flex flex-col">
          <h2 className="font-bold">{data.name}</h2>
          <div>
              <p>location: {data.display_name}</p>
              <p>type: {data.type}</p>
          </div>
      </div>
  </div>
);

export default MapFrame;
