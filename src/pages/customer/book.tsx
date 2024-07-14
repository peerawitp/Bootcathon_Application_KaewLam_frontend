import CustomerLayout from "@/components/layouts/CustomerLayout";
import { useState, useEffect } from "react";
import MapFrame from "@/components/map-frame";
import SearchBar from "@/components/search-bar";
import BottomSheet from "@/components/bottom-sheet";

function CustomerBookPage() {
  const [location, setLocation] = useState<any>([0, 0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(0);

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
          />
        </div>
        <div className="absolute z-10 bottom-10">
          <BottomSheet
                isSheetOpen={isSheetOpen}
                setIsSheetOpen={setIsSheetOpen}
                setLocation={setLocation}
                listData={mapData}
                renderItem={renderMapItem}
                title="Map Data"
                description="Information about the selected location"
                loading={loading}
                error={error}
            />
        </div>
        
        <div className="flex flex-col justify-center overflow-x-hidden z-0">
          <MapFrame
            center={location}
            setLocation={setLocation}
            zoom={17}
            popUpLabel={'You are here!'}
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            mapData={mapData}
          />
        </div>
      </div>
      
    </CustomerLayout>
  );
}

const renderMapItem = (data: any, setLocation: (value: any) => void, setIsSheetOpen: (value: boolean) => void) => (
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

export default CustomerBookPage;
