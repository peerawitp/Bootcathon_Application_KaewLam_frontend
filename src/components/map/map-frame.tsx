import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { apiInstance } from "@/api/instance";
import { Button } from "../ui/button";
import { distance_btw } from "@/lib/map/distance-btw";

const marker_user_icon = new L.Icon({
  iconUrl: "/marker-user.svg",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});
const marker_center_icon = new L.Icon({
  iconUrl: "/marker-center.svg",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});

interface MapFrameProps {
  center: [number, number];
  zoom: number;
  popUpLabel?: string;
  isSheetOpen: boolean;
  mapData: any[];
  mobilCenterLocation: any[];

  setLocation: (value: any) => void;
  setIsSheetOpen: (value: boolean) => void;
  setMobilCenterLocation: (value: any[]) => void;
  setSeleted: (value: any) => void;
}

const MapUpdater: React.FC<{
  mapCenter: [number, number];
  center: [number, number];
}> = ({ mapCenter, center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(mapCenter, map.getZoom());
  }, [mapCenter, map]);

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const MapFrame: React.FC<MapFrameProps> = ({
  center,
  zoom,
  popUpLabel,
  mobilCenterLocation,
  setMobilCenterLocation,
  setSeleted,
}) => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    setMapCenter(center);
    setSeleted(null);

    apiInstance({
      method: "GET",
      url: "/center",
    })
      .then((res) => {
        const locations = res.data.map((location: any) => ({
          ...location,
          distance: distance_btw(center, [
            location.latitude,
            location.longitude,
          ]),
          cost:
            parseInt(
              distance_btw(center, [
                location.latitude,
                location.longitude,
              ]).toFixed(0), 10,) * 8 + 500,
        }));
        setMobilCenterLocation(locations);
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
          <div className="text-green-600">
            {center[0]} {center[1]}
          </div>
        </Popup>
      </Marker>
      {mobilCenterLocation.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={marker_center_icon}
        >
          <Popup>
            {location.name}
            <div className="text-blue-600">
              Distance: {location.distance.toFixed(2)} km
            </div>
            <Button
              onClick={() => setSeleted(location)}
              className="w-full mt-2"
            >
              Select
            </Button>
          </Popup>
        </Marker>
      ))}
      <MapUpdater mapCenter={mapCenter} center={center} />
    </MapContainer>
  );
};

export default MapFrame;
