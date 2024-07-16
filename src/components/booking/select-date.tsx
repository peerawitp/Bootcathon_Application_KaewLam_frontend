import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";

interface SelectDateProps {
  date: Date;
  setDate: (value: Date) => void;
  selectedItem: { label: string; value: string } | null;
  setSelectedItem: (value: { label: string; value: string } | null) => void;
  position: string;
  setPosition: (value: string) => void;
}

const menuItems = [
  { label: "08:00", value: "option1" },
  { label: "09:00 ", value: "option2" },
  { label: "10:00", value: "option3" },
  { label: "11:00", value: "option4" },
  { label: "12:00", value: "option5" },
  { label: "13:00", value: "option6" },
  { label: "14:00", value: "option7" },
  { label: "15:00", value: "option8" },
  { label: "16:00", value: "option9" },
  { label: "17:00", value: "option10" },
  { label: "18:00", value: "option11" },
  { label: "19:00", value: "option12" },
  { label: "20:00", value: "option13" },
  { label: "21:00", value: "option14" },
  { label: "22:00", value: "option15" },
];

export default function SelectDate({
  date,
  setDate,
  selectedItem,
  setSelectedItem,
  position,
  setPosition,
}: SelectDateProps) {
  const initialLabel =
    menuItems.length > 0 ? menuItems[0].label : "Select an option";

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-bold">เลือกวันเวลา</p>
      <div className="flex gap-2 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-3/4 justify-between flex items-center  rounded-[15px] text-left font-normal border-[#B4B4B4]",
                !date && "text-muted-foreground"
              )}
            >
                <div className="flex ">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              
              </div>
              <ChevronDown className="pt-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(value: Date | undefined) =>
                setDate(value || new Date())
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-1/4  ">
              <Button
                variant="outline"
                onClick={() =>
                  console.log(
                    "Selected item:",
                    selectedItem ? selectedItem.label : "None"
                  )
                }
                className=" rounded-[15px] border-[#B4B4B4]"
              >
                <div className="flex items-center justify-between w-full">
                  {selectedItem ? `${selectedItem.label}` : initialLabel}
                  <ChevronDown className="pt-1" />
                </div>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 border-[#B4B4B4]">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <ScrollArea className="h-72 rounded-md ">
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
