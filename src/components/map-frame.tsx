import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { apiInstance } from "@/api/instance";
import { Button } from "./ui/button";

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
  setLocation: (value: any) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
  mapData: any[];
  centerLocation: any[];
  setCenterLocation: (value: any[]) => void;
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

const haversineDistance = (
  coords1: [number, number],
  coords2: [number, number],
) => {
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
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // distance in kilometers
};

const MapFrame: React.FC<MapFrameProps> = ({
  center,
  zoom,
  popUpLabel,
  centerLocation,
  setCenterLocation,
  setSeleted,
}) => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    setMapCenter(center);
    setSeleted(null);
  }, [center]);

  useEffect(() => {
    apiInstance({
      method: "GET",
      url: "/center",
    })
      .then((res) => {
        const locations = res.data.map((location: any) => ({
          ...location,
          distance: haversineDistance(center, [
            location.latitude,
            location.longitude,
          ]),
          cost:
            parseInt(
              haversineDistance(center, [
                location.latitude,
                location.longitude,
              ]).toFixed(0),
              10,
            ) *
              8 +
            500,
        }));
        setCenterLocation(locations);
      })
      .catch((err) => {
        const locations = centerLocation.map((location) => ({
          ...location,
          distance: haversineDistance(center, [
            location.latitude,
            location.longitude,
          ]),
          cost:
            parseInt(
              haversineDistance(center, [
                location.latitude,
                location.longitude,
              ]).toFixed(0),
              10,
            ) *
              8 +
            500,
        }));
        setCenterLocation(locations);
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
          <div className="text-green-500">
            {center[0]} {center[1]}
          </div>
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
            <div className="text-blue-500">
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
