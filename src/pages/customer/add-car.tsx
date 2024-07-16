import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Mobil-1-Logo.png";

import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const carBrands = [
  "Honda",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Volkswagen"
];

const carModels = [
  "Civic",
  "Accord",
  "Jazz",
  "City",
  "CR-V",
  "HR-V",
  "Benz"
];
const carYears = [ "2020", "2017",  "2015",  "2012", "2011", "2010"];


  

export default function AddCarPage() {
  const navigate = useNavigate();
  const[carModel, setCarModel] = useState("");
  const[carBrand, setCarBrand] = useState("");
  const[carYear, setCarYear] = useState("");

  function onSubmit(){
    console.log(carBrand,carModel,carYear)
    navigate("/customer/book")
  }


  return (
    <CustomerLayout>
      <div className="flex-col flex w-screen justify-center items-center  ">
        <div className=" flex flex-col h-screen lg:w-2/5 items-center justify-center gap-5 p-7">
          <img src={logo} alt="logo" className="w-30 mx-10" width={200} />
          <p className=" font-semibold text-lg text-[#0E479F] ">
            เปลี่ยนถ่ายน้ำมันเครี่อง mobil ที่บ้าน
          </p>
          <div className="flex flex-col gap-4 shadow-lg px-5 py-7 w-full rounded-2xl items-center">
            <p>กรุณากรอกข้อมูลรถ</p>

            <Select value={carBrand} onValueChange={(value:string)=>{setCarBrand(value); }}>
              <SelectTrigger >
                <SelectValue placeholder="ยี่ห้อรถ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ยี่ห้อรถ</SelectLabel>
                    {carBrands.map((brand) =>(
                    <SelectItem value={brand}>{brand}</SelectItem>)) }
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={carModel} onValueChange={(value:string)=>{setCarModel(value); }}>
              <SelectTrigger >
                <SelectValue placeholder="รุ่น" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>รุ่น</SelectLabel>
                    {carModels.map((model) =>(
                    <SelectItem value={model}>{model}</SelectItem>)) }
                 
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={carYear} onValueChange={(value:string)=>{setCarYear(value); }}>
              <SelectTrigger >
                <SelectValue placeholder="ปีรถ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ปีรถ</SelectLabel>
                    {carYears.map((year) =>(
                    <SelectItem value={year}>{year}</SelectItem>)) }
                 
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          
          <Button
            className={`bg-[#0E479F] rounded-2xl  px-12 `}
            onClick={onSubmit}
          >
            ยืนยัน
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
}
