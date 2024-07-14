import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import BottomSheet from './bottom-sheet';

const customIcon = new L.Icon({
  iconUrl: '/marker.svg',
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});
<a href="https://www.flaticon.com/free-icons/google-maps" title="google maps icons">
  Google maps icons created by lalawidi - Flaticon
</a>;

interface MapFrameProps {
  center: [number, number];
  zoom: number;
  popUpLabel?: string;
  setLocation: (value: any) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
  mapData: any[];
}

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

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter, map.getZoom());
    }, [mapCenter, map]);
    return null;
  };

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
      <Marker position={center} icon={customIcon}>
        <Popup>
          {popUpLabel}
          <div className="text-green-500">ม.เกษตรศาสตร์ (บางเขน)</div>
        </Popup>
      </Marker>
      <MapUpdater />
      <div className="absolute z-10 bottom-10">
        <BottomSheet isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} setLocation={setLocation} mapData={mapData} />
      </div>
    </MapContainer>
  );
};

export default MapFrame;
