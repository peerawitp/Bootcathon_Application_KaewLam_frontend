import pic from "@/assets/waiting-pic.png";
import OrderDetail from "@/components/comfirm/order-detail";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StatusBar from "@/components/comfirm/stage-bar";
import useWebSocket from "react-use-websocket";

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
  const [progress, setProgress] = useState(0);
  const { lastMessage, readyState } = useWebSocket(
    "wss://mobil-nodered.peerawitp.me/ws/order-status"
  );
  useEffect(() => {
    if (readyState !== 1) {
      return;
    }
    if (!lastMessage || !lastMessage.data) {
      return;
    }
    const msg = JSON.parse(lastMessage.data);
    if (msg.orderId === data.orderId && msg.status === "SUCCESS") {
      setProgress(100);
    }
  }, [readyState, lastMessage]);
  let content;
  if (progress === 0) {
    content = "ยืนยันรายละเอียด";
  } else if (progress === 50) {
    content = "รอช่างยืนยัน . . .  ";
  } else {
    content = "ยืนยันการจองช่าง";
  }

  return (
    <>
      <div className="flex-col flex ">
        <div className="lg:w-2/5 gap-3 flex flex-col items-center h-screen">
          <img src={pic} alt="" />
          <div className="text-start w-full px-5">
            <p className=" font-bold text-2xl ">{content}</p>
          </div>
          <StatusBar status={progress} />
          <OrderDetail data={data} />
          {progress === 0 ? (
            <Button className="bg-[#0E479F] px-10 text-lg rounded-lg" size="lg" onClick={() => setProgress(50)}>
              ยืนยันการจอง
            </Button>
          ) : (
            <div className="h-full  flex items-end justify-center my-5">
            <Button
              className="relative text-red-500 text-md bottom-0 font-light bg-transparent hover:bg-transparent"
              onClick={() => setProgress(50)}
            >
              ยกเลิกการจอง
            </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
