import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function DropdownComponent({ data }: { data: any }) {
  const [selectedBrand, setSelectedBrand] = useState<any>("None");
  const [selectedYear, setSelectedYear] = useState<any>("None");

  const renderYearList = (brand: string) => {
    const carList = data.find((item: any) => item.name === brand);
    if (carList) {
      return carList.cars.map((item: any, index: number) => (
        <DropdownMenuRadioItem value={item} key={index}>
          {item.model} {item.year}
        </DropdownMenuRadioItem>
      ));
    }
    return null;
  };

  return (
    <div>
      <p className="font-bold mt-3">ยี่ห้อรถยนต์</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button variant="outline">ยี่ห้อรถยนต์</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Car Brand</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedBrand}
            onValueChange={setSelectedBrand}
          >
            {data.map((item: any, index: number) => (
              <DropdownMenuRadioItem value={item} key={index}>
                {item.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="font-bold mt-3">รุ่น และ ปีรถยนต์</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button variant="outline">รุ่น และ ปีรถยนต์</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Car Year</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            {renderYearList(selectedBrand.name)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
