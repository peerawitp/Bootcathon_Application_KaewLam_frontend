import CustomerLayout from "@/components/layouts/CustomerLayout";
import mobil1 from "@/assets/ex-mobil.png";
import SelectCar from "@/components/booking/SelecCar";

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

import InfoM1C from "@/components/booking/m1c-info";
import OilInfo from "@/components/booking/oil-info";
import SelectDate from "@/components/booking/select-date";
import {
  fetchMobilCenter,
  fetchOilProducts,
  fetchRecommendedOil,
  MobilCenter,
  useOrderStore,
} from "@/stores/orderStore";
import { currencyFormat, timestampToTime } from "@/lib/utils";
import { distance_btw } from "@/lib/map/distance-btw";

const data = {
  orderId: "1",
  name: "Mobil 1 Center - เขตคลองสาน",
  addresM1: "20 ถ. กรุงธนบุรี  แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600",
  review: 4.5,
  date: "จันทร์ - ศุกร์   10:00 am - 20:00 pm  ",
  product: [
    {
      name: "Mobil 1™ Triple Action Power",
      detail:
        "Mobil 1™ Triple Action Power น้ำมันเครื่องสังเคราะห์แท้ขั้นสูงที่มอบสมรรถนะ การปกป้อง และความสะอาดของเครื่องยนต์ที่ยอดเยี่ยม <br/>สมรรถนะเครื่องยนต์: ให้เครื่องยนต์ทำงานเหมือนใหม่อยู่เสมอ <br/>ปกป้อง: ดีกว่า 10 เท่า4 ภายใต้ความร้อนสูง  <br/>ทำความสะอาด: จัดการกับตะกอนน้ำมันด้วยสารทำความสะอาด",
      price: "~ 1,000-1,200 บ.",
    },
    {
      name: "Mobil 1™ Triple Action Power+",
      detail:
        "Mobil 1™ สูตรใหม่ Triple Action Power+ เป็นน้ำมันเครื่องสังเคราะห์แท้ขั้นสูงที่มอบสมรรถนะ การปกป้อง และความสะอาดของเครื่องยนต์ที่ยอดเยี่ยม พร้อมทั้งประโยชน์เพิ่มเติมด้านการประหยัดเชื้อเพลิง สมรรถนะเครื่องยนต์: ทรงพลังยาวนาน <br/>ปกป้อง: ดีกว่า 30 เท่า1ภายใต้ความร้อนสูง <br/>ทำความสะอาด: ป้องกันสารปนเปื้อนกรดอันตราย ที่ทำลายเครื่องยนต์ได้ถึง 99.9%2 <br/>เพิ่มประสิทธิภาพเครื่องยนต์: เพื่อการประหยัดเชื้อเพลิงที่ดีขึ้นถึง 8.4%3",
      price: "~ 1,200-1,300 บ.",
    },
  ],
  service: 350,
  discount: 0,
  total: "~ 1,550 - 1,650 บ.",
};

export default function OrderPage() {
  const mockCenterId = 10;
  const userLocation = { latitude: 13.7563, longitude: 100.5018 };

  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const selectedCar = useOrderStore((state) => state.selectedCar);
  const selectedProduct = useOrderStore((state) => state.selectedProduct);
  const setSelectedProduct = useOrderStore((state) => state.setSelectedProduct);
  const recommendedOil = useOrderStore((state) => state.recommendedOil);
  const selectedCenter = useOrderStore((state) => state.selectedCenter);

  const [serviceCost, setServiceCost] = useState(0);
  const [totalCost, setTotalCost] = useState<number[]>([0.0, 0.0]);

  useEffect(() => {
    fetchOilProducts();
    fetchMobilCenter(mockCenterId);
  }, []);

  useEffect(() => {
    console.log(selectedCar);
    if (selectedCar) {
      fetchRecommendedOil(selectedCar);
      if (recommendedOil.length > 0) {
        setSelectedProduct(recommendedOil[0]);
      }
    }
  }, [selectedCar]);

  useEffect(() => {
    console.log(selectedProduct);

    if (selectedProduct) {
      setTotalCost([
        serviceCost + selectedProduct.priceRange[0],
        serviceCost + selectedProduct.priceRange[1],
      ]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedCenter) {
      setServiceCost(
        parseInt(
          distance_btw(
            [selectedCenter.latitude, selectedCenter.longitude],
            [userLocation.latitude, userLocation.longitude],
          ).toFixed(0),
          10,
        ) <= 5
          ? 350
          : (parseInt(
              distance_btw(
                [selectedCenter.latitude, selectedCenter.longitude],
                [userLocation.latitude, userLocation.longitude],
              ).toFixed(0),
              10,
            ) -
              5) *
              50 +
              350,
      );
    }
  }, [selectedCenter]);

  const [position, setPosition] = useState("bottom");
  const [date, setDate] = useState<Date>(new Date());

  const submitOrder = () => {
    console.log({
      selectedCar,
      selectedProduct,
      selectedItem,
      date,
    });
  };

  return (
    <CustomerLayout>
      <div className="flex-col flex w-screen justify-center items-center">
        <div className=" flex flex-col h-screen lg:w-2/5">
          <img src={mobil1} alt="" />
          <div className="flex flex-col  -mt-10 items-center rounded-3xl bg-slate-50  ">
            <InfoM1C
              name={selectedCenter?.name!}
              review={4.8}
              date={
                timestampToTime(selectedCenter?.openingTime!) +
                " - " +
                timestampToTime(selectedCenter?.closingTime!)
              }
              address={selectedCenter?.address!}
            />
            <hr
              style={{ borderTop: "1px solid lightgrey" }}
              className=" border-gray-300 w-full h-0.5"
            />
            <div className="flex flex-col w-full py-5 px-5 gap-5">
              <SelectCar />
              <OilInfo
                product={recommendedOil}
                selected={selectedProduct?.id as number}
                setSelect={setSelectedProduct}
              />
              <SelectDate
                date={date}
                setDate={setDate}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                position={position}
                setPosition={setPosition}
              />
            </div>
            <hr
              style={{ borderTop: "1px solid lightgrey" }}
              className=" border-gray-300 w-full h-1"
            />
            <div className="w-full px-5  flex justify-between items-center">
              <span className="font-bold">คูปอง</span>
              <Button variant="link" className=" p-0 h-[45px] rounded-[15px]">
                <div className="flex justify-end w-full items-center">
                  <p>ใช้งานคูปอง</p>
                  <ChevronRight className="pt-1" />
                </div>
              </Button>
            </div>
            <hr
              style={{ borderTop: "1px solid lightgrey" }}
              className=" border-gray-300 w-full h-1 py-1"
            />
            <div className="w-full ">
              <div className="flex w-full px-5  justify-between items-center">
                <p className="font-bold">ค่าบริการ:</p>
                <p>{currencyFormat(serviceCost)} บ.</p>
              </div>
              <div className="flex w-full px-5  justify-between items-center mb-2">
                <p className="font-bold  text-[#BF360C]">รวม</p>
                <p>
                  ~ {currencyFormat(totalCost[0])} -{" "}
                  {currencyFormat(totalCost[1])} บ.
                </p>
              </div>
            </div>
            <hr
              style={{ borderTop: "1px solid lightgrey" }}
              className=" border-gray-300 w-full h-1 py-2"
            />
            <Button
              onClick={submitOrder}
              className="bg-[#0E479F] text-xl rounded-2xl my-10 px-28"
            >
              จอง
            </Button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
