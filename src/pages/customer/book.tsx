import CustomerLayout from "@/components/layouts/CustomerLayout";
import { useState, useEffect } from "react";
import MapFrame from "@/components/map/map-frame";
import SearchBar from "@/components/map/search-bar";
import BottomSheet from "@/components/map/bottom-sheet";
import { Button } from "@/components/ui/button";
import Renderer from "@/components/map/renderer";
import { mapApiInstance } from "@/api/instance";

function CustomerBookPage() {
  const [locationPoint, setLocationPoint] = useState<any>([0, 0]);
  const [mapData, setMapData] = useState<any[]>([]);
  const [mobilCenterLocation, setMobilCenterLocation] = useState<any[]>([]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(0);
  const [selected, setSeleted] = useState<any>(null);
  const [isMobilCenter, setIsMobileCenter] = useState(false);

  const [reverseData, setReverseData] = useState<any>(null);
  const [address, setAddress] = useState<string>("Loading...");

  const mobilCenter = new Renderer({
    setLocationPoint,
    setIsSheetOpen,
    setIsMobileCenter,
    setSeleted,
    value,
  }).renderMobileCenterItem;

  const currentLocation = new Renderer({
    setLocationPoint,
    setIsSheetOpen,
    setIsMobileCenter,
    setSeleted,
    value,
  }).renderMapItem;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      mapApiInstance
        .get(
          `/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
        )
        .then((res) => {
          setReverseData(res.data);
          setAddress(res.data.display_name);
        })
        .catch((err) => {
          console.log(err);
        });
      setMapData([
        {
          place_id: 0,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          type: "home",
          name: "📍 Your current location",
          display_name: address,
        },
      ]);
    });
    setIsSheetOpen(true);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMapData([
        {
          place_id: 0,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          type: "home",
          name: "📍 Your current location",
          display_name: address,
        },
      ]);
    });
  }, [address]);

  const onSubmit = () => {
    console.log(selected, locationPoint);
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col items-center">
        <div className="absolute z-10 top-10 w-9/12">
          <SearchBar
            setError={setError}
            setLoading={setLoading}
            setMapData={setMapData}
            setIsSheetOpen={setIsSheetOpen}
            value={value}
            setValue={setValue}
            setIsMobileCenter={setIsMobileCenter}
          />
        </div>
        <div className="absolute z-10 bottom-10">
          {isMobilCenter ? (
            <BottomSheet
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
              setLocationPoint={setLocationPoint}
              listData={mobilCenterLocation}
              renderItem={mobilCenter}
              title="Mobil 1 Center"
              description={`Search result for ${value} km radius from your location`}
              loading={loading}
              error={error}
            />
          ) : (
            <BottomSheet
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
              setLocationPoint={setLocationPoint}
              listData={mapData}
              renderItem={currentLocation}
              title="Location Data"
              description="searched locations"
              loading={loading}
              error={error}
            />
          )}
        </div>
        {selected && (
          <div className="absolute z-10 bottom-10 w-9/12">
            <Button
              className="flex w-full justify-between border-blue-600 border-2"
              variant={"secondary"}
            >
              <p>{`+ ค่าบริการ (${selected.distance.toFixed(2)} km):`}</p>
              <p className="text-green-600 font-bold">{`${selected.cost} บาท`}</p>
            </Button>
            <Button className="w-full mt-2" onClick={onSubmit}>
              ดำเนินการต่อ
            </Button>
          </div>
        )}

        <div className="flex flex-col justify-center overflow-x-hidden z-0">
          <MapFrame
            center={locationPoint}
            setLocation={setLocationPoint}
            zoom={17}
            popUpLabel={"📍 Your current location"}
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            mapData={mapData}
            mobilCenterLocation={mobilCenterLocation}
            setMobilCenterLocation={setMobilCenterLocation}
            setSeleted={setSeleted}
          />
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerBookPage;
