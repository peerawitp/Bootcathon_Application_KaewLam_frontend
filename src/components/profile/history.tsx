import pin from "@/assets/pin.png";
import mobil_pin from "@/assets/mobilPin.png";
import { formatThaiTimestamp } from "@/lib/profile/format-time";
import { Button } from "../ui/button";
import { DrawerContent } from "../ui/drawer";
import CardOil from "./card-oil";

export default function HistoryDrawer({historyData ,CustomerCarData}: any) {

  const getUserCar = (id: number) => {
    return CustomerCarData.find((car: any) => car.id === id).CarModel;
  }

  const userCar = getUserCar(historyData.UserCar.id);

  return (
    <DrawerContent className="p-5 flex flex-col gap-3 ">
      <div className="flex flex-col gap-2 pt-3">
        <p className=" text-2xl font-bold">Mobil 1 center - {historyData.MobilCenter.name}</p>
        <p className="text-base font-light text-gray-400">
          {formatThaiTimestamp(historyData.bookingDate)}
        </p>
      </div>
      <hr
        style={{ borderTop: "1px solid lightgrey" }}
        className=" border-gray-300 w-full h-1 py-1"
      />
      <div className="flex flex-col gap-2 ">
        <div>
        <p className=" text-lg font-bold">{userCar.brandName}</p>
        <p className=" text-lg font-bold">{userCar.model} {userCar.year}</p>
        </div>
        <div className="flex gap-2 items-center my-2">
          <img src={pin} alt="" className="h-8" />
          <p className=" px-5 text-wrap">{historyData.customerAddress}</p>
        </div>
        <div className="flex gap-2 items-center my-2">
          <img src={mobil_pin} alt="" className="h-8" />
          <p className=" px-5 text-wrap">{historyData.MobilCenter.address}</p>
        </div>
      </div>
      <hr
        style={{ borderTop: "1px solid lightgrey" }}
        className=" border-gray-300 w-full h-1 py-1"
      />
      <div className="flex flex-col gap-2 ">
        <p className=" text-lg font-bold">บริการ</p>
        <p className=" text-base font-light">เปลี่ยนน้ำมันเครื่อง</p>
        <CardOil product={historyData.Product} />
      </div>
      <Button className="m-5 bg-[#0E479F]">ใช้บริการอีกครั้ง</Button>
    </DrawerContent>
  );
}
