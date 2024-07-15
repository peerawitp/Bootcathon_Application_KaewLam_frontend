import { mapApiInstance } from "@/api/instance";

interface fetchDataProps {
    setLoading: (value: boolean) => void;
    setError: (value: string | null) => void;
    setMapData: (value: any[]) => void;
    searchTerm: string;
}

export const fetchData = async ({searchTerm, setLoading, setError, setMapData}: fetchDataProps) => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await mapApiInstance.get("/search.php", {
        params: {
          q: searchTerm,
          format: 'jsonv2',
        },
      });
      if (Array.isArray(res.data)) {
        setMapData(res.data);
      } else {
        setError("Unexpected response format");
        console.error("Expected an array but got:", res.data);
      }
    } catch (err) {
      setError("Failed to fetch map data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };