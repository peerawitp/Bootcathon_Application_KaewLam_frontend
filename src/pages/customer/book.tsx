import CustomerLayout from "@/components/layouts/CustomerLayout";
import { useState, useEffect } from "react";
import MapFrame from "@/components/map-frame";
import SearchBar from "@/components/search-bar";

function CustomerBookPage() {
  const [location, setLocation] = useState<any>([0, 0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

export default CustomerBookPage;
