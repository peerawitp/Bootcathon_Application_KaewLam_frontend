import create from "zustand";
import { apiInstance } from "@/api/instance";

export interface Car {
  id: number;
  CarModel: {
    brandName: string;
    model: string;
    oilViscosity: string;
  };
  carYear: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  oilViscosity: string;
  liquidVolume: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface MobilCenter {
  id: number;
  lineUid: string | null;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  openingTime: number;
  closingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderStore {
  selectedCenter: MobilCenter | null;
  setSelectedCenter: (center: MobilCenter | null) => void;
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  userCars: Car[];
  setUserCars: (cars: Car[]) => void;
  oilProducts: Product[];
  setOilProducts: (products: Product[]) => void;
  userLocation: string | null;
  setUserLocation: (location: string | null) => void;
  recommendedOil: Product[];
  setRecommendedOil: (oil: Product[]) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  selectedCenter: null,
  setSelectedCenter: (center) => set({ selectedCenter: center }),
  selectedCar: null,
  setSelectedCar: (car) => set({ selectedCar: car }),
  selectedProduct: null,
  setSelectedProduct: (oil) => set({ selectedProduct: oil }),
  userCars: [],
  setUserCars: (cars) => set({ userCars: cars }),
  oilProducts: [],
  setOilProducts: (products) => set({ oilProducts: products }),
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  recommendedOil: [],
  setRecommendedOil: (oil) => set({ recommendedOil: oil }),
}));

export const fetchUserCars = () => {
  apiInstance({
    method: "GET",
    url: "/customer/car",
  })
    .then((res) => {
      useOrderStore.setState({ userCars: res.data });
    })
    .catch((error) => {
      console.error("Error fetching user cars:", error);
    });
};

export const fetchOilProducts = () => {
  apiInstance({
    method: "GET",
    url: "/product",
  })
    .then((res) => {
      useOrderStore.setState({ oilProducts: res.data });
    })
    .catch((error) => {
      console.error("Error fetching oil products:", error);
    });
};

export const fetchRecommendedOil = (car: Car) => {
  const oilProducts = useOrderStore.getState().oilProducts;
  const matchedViscosity = oilProducts.filter(
    (product) => product.oilViscosity === car.CarModel.oilViscosity,
  );
  useOrderStore.setState({ recommendedOil: matchedViscosity });
};

export const fetchMobilCenter = (centerId: number) => {
  apiInstance({ method: "GET", url: `/center/${centerId}` })
    .then((res) => {
      useOrderStore.setState({ selectedCenter: res.data });
    })
    .catch((error) => {
      console.error("Error fetching mobil center:", error);
    });
};
