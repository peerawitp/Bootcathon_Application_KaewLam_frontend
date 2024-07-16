import * as React from "react";
import { useState } from "react";
import { ChevronDown } from 'lucide-react';


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function SelectCar() {
  const [position, setPosition] = useState("bottom");
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string } | null>(null);

  const menuItems = [
    { label: 'Car 1', value: 'option1' },
    { label: 'Car 2', value: 'option2' },
    { label: 'Car 3', value: 'option3' },
  ];
  
  const handleItemClick = (item: { label: string; value: string }) => {
    setSelectedItem(item);
  };

  const handleButtonClick = () => {
    console.log('Selected item:', selectedItem ? selectedItem.label : 'None');
  };

  const initialLabel = menuItems.length > 0 ? menuItems[0].label : 'Select an option';

  return (
    <div className="w-full flex flex-col gap-2">
    <p className="font-bold">รถที่ใช้บริการ</p>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center w-full ">
            <Button variant="outline" onClick={handleButtonClick} className= "w-full  h-[45px] rounded-[15px] border-[#B4B4B4]">
                <div className="flex justify-between items-center w-full">
                    {selectedItem ? `${selectedItem.label}` : initialLabel} 
                    <ChevronDown className="pt-1"/>
                </div>
            </Button>
        </div>
            
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 border-[#B4B4B4]">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} >
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.value} onClick={() => handleItemClick(item)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}

export default SelectCar;
