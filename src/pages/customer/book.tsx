import CustomerLayout from "@/components/layouts/CustomerLayout";
import { useState, useEffect } from "react";
import MapFrame from "@/components/map/map-frame";
import SearchBar from "@/components/map/search-bar";
import BottomSheet from "@/components/map/bottom-sheet";
import { Button } from "@/components/ui/button";
import Renderer from "@/components/map/renderer";

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

  const mobilCenter = new Renderer(
    {
      setLocationPoint,
      setIsSheetOpen,
      setIsMobileCenter,
      setSeleted,
      value
    }
  ).renderMobileCenterItem

  const currentLocation = new Renderer(
    {
      setLocationPoint,
      setIsSheetOpen,
      setIsMobileCenter,
      setSeleted,
      value
    }
  ).renderMapItem

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMapData([
        {
          "place_id": 0,
          "lat": position.coords.latitude,
          "lon": position.coords.longitude,
          "type": "home",
          "name": "Your current location",
          "display_name": "Your current location",
        }
      ]);
    });
    setIsSheetOpen(true);
  }, []);

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
          {
            isMobilCenter ? (
              <BottomSheet
                  isSheetOpen={isSheetOpen}
                  setIsSheetOpen={setIsSheetOpen}
                  setLocationPoint={setLocationPoint}
                  listData={mobilCenterLocation}
                  renderItem={mobilCenter}
                  title="MobilCenter Data"
                  description={`mobil 1 center locations within range ${value} km`}
                  loading={loading}
                  error={error}
              />
            ): (
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
            )
          }
        </div>
        {
          selected && (
            <div className="absolute z-10 bottom-10 w-9/12">
              <Button className="flex w-full justify-between border-blue-600 border-2" variant={'secondary'} onClick={() => console.log('goto next page')}>
                <p>{`+ ค่าบริการ (${selected.distance.toFixed(2)} km):`}</p>
                <p className="text-green-600 font-bold">{`${selected.cost} บาท`}</p>
              </Button>
            </div>
          )
        }
        
        <div className="flex flex-col justify-center overflow-x-hidden z-0">
          <MapFrame
            center={locationPoint}
            setLocation={setLocationPoint}
            zoom={17}
            popUpLabel={'You are here!'}
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
