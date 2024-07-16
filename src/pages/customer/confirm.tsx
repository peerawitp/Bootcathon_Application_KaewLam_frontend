import pic from "@/assets/waiting-pic.png";
import OrderDetail from "@/components/comfirm/order-detail";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StatusBar from "@/components/comfirm/stage-bar";
import useWebSocket from "react-use-websocket";
import CustomerLayout from "@/components/layouts/CustomerLayout";

import { useOrderStore } from "@/stores/orderStore";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "@/api/instance";

const data = {
  orderId: "1",
  addresCustomer:
    "110 1 ถ. กรุงธนบุรี แขวงบางลำภูล่าง  เขตคลองสาน กรุงเทพมหานคร 10600",
  addresM1: "Mobil 1 Center - เขตคลองสาน",
  date: "17 ก.ค. 2024  15:00 น.",
  product: [
    {
      name: "Mobil 1™ Triple Action Power+",
      price: "~ 1200-1300 บ.",
    },
  ],
  service: 350,
  discount: 0,
  total: "~ 1550-1650 บ.",
};

export default function ComfirmOrderPage() {
  const navigate = useNavigate();
  const selectedProduct = useOrderStore((state) => state.selectedProduct);
  const selectedCenter = useOrderStore((state) => state.selectedCenter);
  const userLocation = useOrderStore((state) => state.userLocation);
  const userAddress = useOrderStore((state) => state.userAddress);
  const selectedCar = useOrderStore((state) => state.selectedCar);
  const selectedDateTime = useOrderStore((state) => state.selectedDateTime);

  const [bookingData, setBookingData] = useState<any>(null);

  if (!selectedProduct) {
    navigate("/customer/book");
  }

  const [progress, setProgress] = useState(0);
  const { lastMessage, readyState } = useWebSocket(
    import.meta.env.VITE_NODE_RED,
  );
  useEffect(() => {
    if (readyState !== 1) {
      return;
    }
    if (!lastMessage || !lastMessage.data) {
      return;
    }
    const msg = JSON.parse(lastMessage.data);
    console.log(bookingData);
    if (msg.orderId === bookingData.id && msg.status === "SUCCESS") {
      setProgress(100);
    } else if (msg.orderId === bookingData.id && msg.status === "CANCELLED") {
      setProgress(-1);
    }
  }, [readyState, lastMessage]);
  let content;
  if (progress === 0) {
    content = "ยืนยันรายละเอียด";
  } else if (progress === 50) {
    content = "รอช่างยืนยัน . . .  ";
  } else if (progress === -1) {
    content = "ช่างไม่สามารถมาให้บริการได้";
  } else {
    content = "ยืนยันการจองช่าง";
  }

  const onSubmit = () => {
    apiInstance("/customer/booking", {
      method: "POST",
      data: {
        centerId: selectedCenter?.id,
        productId: selectedProduct?.id,
        customerAddress: {
          address: userAddress,
          latitude: userLocation[0],
          longitude: userLocation[1],
        },
        customerCarId: selectedCar?.id,
        bookingDate: selectedDateTime,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setBookingData(res.data);
          console.log("booking success");
          setProgress(50);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CustomerLayout>
      <div className="flex-col flex w-screen justify-center items-center">
        <div className="lg:w-2/5 gap-3 flex flex-col items-center h-screen">
          <img src={pic} alt="" />
          <div className="text-start w-full px-5">
            <p className=" font-bold text-2xl ">{content}</p>
          </div>
          <StatusBar status={progress} />
          <OrderDetail data={data} />
          {progress === 0 ? (
            <Button
              className="bg-[#0E479F] px-10 py-5  text-lg rounded-lg "
              size="lg"
              onClick={onSubmit}
            >
              ยืนยันการจอง
            </Button>
          ) : (
            <div className="h-full  flex items-end justify-center my-5">
              <Button
                className="relative text-red-500 text-md bottom-0 font-light bg-transparent hover:bg-transparent"
                onClick={() => {
                  console.log("cancel booking");
                }}
              >
                ยกเลิกการจอง
              </Button>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
