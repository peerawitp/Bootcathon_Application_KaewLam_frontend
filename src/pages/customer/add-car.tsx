import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Mobil-1-Logo.png";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Import the Input component
import { useEffect, useState } from "react";
import { apiInstance } from "@/api/instance";

// Define types
interface Car {
  id: number;
  model: string;
  year: number;
  carType: string;
  oilViscosity: string;
  brandName: string;
  createdAt: string;
  updatedAt: string;
}

interface CarBrand {
  name: string;
  cars: Car[];
}

export default function AddCarPage() {
  const navigate = useNavigate();
  const [carBrands, setCarBrands] = useState<CarBrand[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");

  useEffect(() => {
    apiInstance({
      method: "GET",
      url: "/car/brand",
    })
      .then((res) => {
        setCarBrands(res.data);
      })
      .catch((error) => {
        console.error("Error fetching car brands:", error);
      });
  }, []);

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const selectedBrand = carBrands.find((brand) => brand.name === brandName);
    setCarModels(
      selectedBrand ? selectedBrand.cars.map((car) => car.model) : [],
    );
    setSelectedModel("");
    setCarYear("");
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
  };

  const handleYearChange = (year: string) => {
    setCarYear(year);
  };

  function onSubmit() {
    const selectedCar = carBrands
      .find((brand) => brand.name === selectedBrand)
      ?.cars.find((car) => car.model === selectedModel);

    if (!selectedCar) {
      return;
    }

    apiInstance({
      method: "POST",
      url: "/customer/add-car",
      data: {
        carModelId: selectedCar.id,
        carYear: parseInt(carYear),
      },
    }).then((res) => {
      if (res.status === 200) {
        navigate("/customer/book");
      } else {
        console.error("Error adding car:", res.data);
      }
    });
  }

  return (
    <CustomerLayout>
      <div className="flex-col flex w-screen justify-center items-center">
        <div className="flex flex-col h-screen lg:w-2/5 items-center justify-center gap-5 p-7">
          <img src={logo} alt="logo" className="w-30 mx-10" width={200} />
          <p className="font-semibold text-lg text-[#0E479F]">
            เปลี่ยนถ่ายน้ำมันเครี่อง mobil ที่บ้าน
          </p>
          <div className="flex flex-col gap-4 shadow-lg px-5 py-7 w-full rounded-2xl items-center">
            <p>กรุณากรอกข้อมูลรถ</p>

            <Select value={selectedBrand} onValueChange={handleBrandChange}>
              <SelectTrigger>
                <SelectValue placeholder="ยี่ห้อรถ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ยี่ห้อรถ</SelectLabel>
                  {carBrands.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={selectedModel}
              onValueChange={handleModelChange}
              disabled={!selectedBrand}
            >
              <SelectTrigger>
                <SelectValue placeholder="รุ่น" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>รุ่น</SelectLabel>
                  {carModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              type="text"
              value={carYear}
              onChange={(e) => handleYearChange(e.target.value)}
              placeholder="ปีรถ"
              disabled={!selectedModel}
            />
          </div>

          <Button className="bg-[#0E479F] rounded-2xl px-12" onClick={onSubmit}>
            ยืนยัน
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
}
