import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useOrderStore, Car, fetchUserCars } from '@/stores/orderStore' // Import useOrderStore and Car type

export function SelectCar() {
  const setSelectedCar = useOrderStore((state) => state.setSelectedCar)
  const userCars = useOrderStore((state) => state.userCars)
  const selectedCar = useOrderStore((state) => state.selectedCar)

  const [position, setPosition] = React.useState('bottom')

  React.useEffect(() => {
    fetchUserCars()
  }, [])

  React.useEffect(() => {
    if (userCars.length > 0) {
      setSelectedCar(userCars[0])
    }
  }, [userCars])

  const handleItemClick = (car: Car) => {
    setSelectedCar(car)
  }

  const handleButtonClick = () => {
    if (selectedCar) {
      console.log('Selected car:', selectedCar.CarModel.brandName)
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-bold">รถที่ใช้บริการ</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center w-full ">
            <Button
              variant="outline"
              onClick={handleButtonClick}
              className="w-full  h-[45px] rounded-[15px] border-[#B4B4B4]"
            >
              <div className="flex justify-between items-center w-full">
                {selectedCar
                  ? `${selectedCar.CarModel.brandName} ${selectedCar.CarModel.model} ปี ${selectedCar.carYear}`
                  : 'Loading...'}
                <ChevronDown className="pt-1" />
              </div>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 border-[#B4B4B4]">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {userCars.map((car) => (
              <DropdownMenuItem
                key={car.id}
                onClick={() => handleItemClick(car)}
              >
                {car.CarModel.brandName} {car.CarModel.model} ปี {car.carYear}{' '}
              </DropdownMenuItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SelectCar
