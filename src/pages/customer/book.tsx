import { apiInstance } from "@/api/instance";
import CustomerLayout from "@/components/layouts/CustomerLayout";

import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";

import MapFrame from "@/components/map-frame";
import SearchBar from "@/components/search-bar";

import { useEffect, useState } from "react";

function CustomerBookPage() {
  const { liffObject, status } = useLine();
  const { idToken } = useLineInfo({ liff: liffObject, status });
  const [location, setLocation] = useState<any>([13.844757035106669, 100.56749983783186]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  // API Example
  apiInstance({
    method: "GET",
    url: "/",
  }).then((res) => {
    console.log(res);
  });

  return (
    <CustomerLayout>
      <div className="flex flex-col items-center">
        <div className="absolute z-10 top-10 w-9/12">
          <SearchBar 
            setError={setError} 
            setLoading={setLoading} 
            setMapData={setMapData} 
            setIsSheetOpen={setIsSheetOpen} 
          />
        </div>
        
        <div className="flex flex-col justify-center overflow-x-hidden z-0">
          <MapFrame
            center={location}
            setLocation={setLocation}
            zoom={17}
            popUpLabel="สำนักบริการคอมพิวเตอร์"
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
