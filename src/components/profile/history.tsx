import pin from "@/assets/pin.png";
import mobil_pin from "@/assets/mobilPin.png";
import { formatThaiTimestamp } from "@/lib/profile/format-time";
import { Button } from "../ui/button";
import { DrawerContent } from "../ui/drawer";
import CardOil from "./card-oil";
import { Product } from "@/stores/orderStore";


const bookingData = {
  mobil1Name: "Mobil 1 center - เขตคลองสาน",
  bookingDate: "2022-01-01 10:34 น.",
  mobil1Address:
    "110 1 ถ. กรุงธนบุรี แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600",
  customerAddress:
    "20 ถ. กรุงธนบุรี แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600",
  carBrand: "Mercedes-Benz",
  carModel: "c220 2.0 W205 AMG Dynamic 2019",
};
const product: Product = {
  id: 1,
  name: "Mobil 1™ Triple Action Power+",
  description:
    "น้ำมันเครื่องสังเคราะห์เต็มรูปแบบที่ออกแบบมาเพื่อให้เครื่องยนต์ของคุณทำงานเหมือนใหม่โดยให้ความคุ้มค่าในการป้องกันการสึกกร่อนที่ยอดเยี่ยม พลังการทำความสะอาดที่ยอดเยี่ยม และประสิทธิภาพโดยรวมที่ยอดเยี่ยม",
  oilViscosity: "5W-30",
  liquidVolume: 5,
  priceRange: [50, 60],
  createdAt: "2022-01-01",
  updatedAt: "2022-01-02",
};


export default function HistoryDrawer() {
  return (
    <DrawerContent className="p-5 flex flex-col gap-3 ">
      <div className="flex flex-col gap-2 pt-3">
        <p className=" text-2xl font-bold">{bookingData.mobil1Name}</p>
        <p className="text-base font-light text-gray-400">
          {formatThaiTimestamp(bookingData.bookingDate)}
        </p>
      </div>
      <hr
        style={{ borderTop: "1px solid lightgrey" }}
        className=" border-gray-300 w-full h-1 py-1"
      />
      <div className="flex flex-col gap-2 ">
        <div>
        <p className=" text-lg font-bold">{bookingData.carBrand}</p>
        <p className=" text-lg font-bold">{bookingData.carModel}</p>
        </div>
        <div className="flex gap-2 items-center my-2">
          <img src={pin} alt="" className="h-8" />
          <p className=" px-5 text-wrap">{bookingData.customerAddress}</p>
        </div>
        <div className="flex gap-2 items-center my-2">
          <img src={mobil_pin} alt="" className="h-8" />
          <p className=" px-5 text-wrap">{bookingData.mobil1Address}</p>
        </div>
      </div>
      <hr
        style={{ borderTop: "1px solid lightgrey" }}
        className=" border-gray-300 w-full h-1 py-1"
      />
      <div className="flex flex-col gap-2 ">
        <p className=" text-lg font-bold">บริการ</p>
        <p className=" text-base font-light">เปลี่ยนน้ำมันเครื่อง</p>
        <CardOil product={product} />
      </div>
      <Button className="m-5 bg-[#0E479F]">ใช้บริการอีกครั้ง</Button>
    </DrawerContent>
  );
}
