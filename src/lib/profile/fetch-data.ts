import { apiInstance } from "@/api/instance";

interface fetchCustomerCarProps {
    setCustomerCarData: (data: any) => void;
}

interface fetchBookingHistoryProps {
    setBookingHistoryData: (data: any) => void;
}

interface fetchCarBrandProps {
    setCarBrandData: (data: any) => void;
}

export const fetchCustomerCar = async ({setCustomerCarData}: fetchCustomerCarProps) => {
    try {
        const res = await apiInstance.get("/customer/car");
        setCustomerCarData(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
  };
}

export const fetchBookingHistory = async ({setBookingHistoryData}: fetchBookingHistoryProps) => {
    try {
        const res = await apiInstance.get("/customer/booking-history");
        setBookingHistoryData(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
  };
}

export const fetchCarBrand = async ({setCarBrandData}: fetchCarBrandProps) => {
    try {
        const res = await apiInstance.get("/car/brand");
        setCarBrandData(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
  };
}