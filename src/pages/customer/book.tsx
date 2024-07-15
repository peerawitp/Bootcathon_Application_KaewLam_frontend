import CustomerLayout from "@/components/layouts/CustomerLayout";
import { useState, useEffect } from "react";
import MapFrame from "@/components/map-frame";
import SearchBar from "@/components/search-bar";
import BottomSheet from "@/components/bottom-sheet";
import { Button } from "@/components/ui/button";

function CustomerBookPage() {
  const [location, setLocation] = useState<any>([0, 0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(0);
  const [selected, setSeleted] = useState<any>(null);
  const [isMobilCenter, setIsMobileCenter] = useState(false);
  const [centerLocation, setCenterLocation] = useState<any[]>([]);

  const renderMapItem = (data: MapItemData) => (
    <div
        key={data.place_id}
        className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 rounded-xl p-5 flex flex-cols-2"
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
  
  const renderMobileCenterItem = (data: MobileCenterItemData) => {
    if (data.distance > value) {
        return null;
    }
    return (
        <div
            key={data.place_id}
            className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 rounded-xl p-5 flex flex-cols-2"
            onClick={() => {
                setIsSheetOpen(false);
                setIsMobileCenter(false);
                setSeleted(data);
            }}
        >
            <div className="flex flex-col">
                <h2 className="font-bold">{data.name}</h2>
                <div>
                    <p>distance: {data.distance.toFixed(2)} km</p>
                    <p>cost: {data.cost} บาท</p>
                </div>
            </div>
        </div>
    );
  };

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
                  setLocation={setLocation}
                  listData={centerLocation}
                  renderItem={renderMobileCenterItem}
                  title="MobilCenter Data"
                  description={`mobil 1 center locations in range ${value} km`}
                  loading={loading}
                  error={error}
              />
            ): (
              <BottomSheet
                  isSheetOpen={isSheetOpen}
                  setIsSheetOpen={setIsSheetOpen}
                  setLocation={setLocation}
                  listData={mapData}
                  renderItem={renderMapItem}
                  title="Map Data"
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
              <Button className="flex w-full justify-between border-blue-500 border-2" variant={'secondary'} onClick={() => console.log('goto next page')}>
                <p>{`+ ค่าบริการ (${selected.distance.toFixed(2)} km):`}</p>
                <p>{`${selected.cost} บาท`}</p>
              </Button>
            </div>
          )
        }
        
        <div className="flex flex-col justify-center overflow-x-hidden z-0">
          <MapFrame
            center={location}
            setLocation={setLocation}
            zoom={17}
            popUpLabel={'You are here!'}
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            mapData={mapData}
            centerLocation={centerLocation}
            setCenterLocation={setCenterLocation}
            setSeleted={setSeleted}
          />
        </div>
      </div>
      
    </CustomerLayout>
  );
}

interface MapItemData {
  place_id: string;
  lat: number;
  lon: number;
  name: string;
  display_name: string;
  type: string;
}

interface MobileCenterItemData {
  place_id: string;
  name: string;
  distance: number;
  cost: number;
}




export default CustomerBookPage;
