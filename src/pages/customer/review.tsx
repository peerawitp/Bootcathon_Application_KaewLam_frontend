import logo from "@/assets/Mobil-1-Logo.png";
import face from "@/assets/happy.png";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/components/layouts/CustomerLayout";
export default function ReviewPage() {
  const [score, setScore] = useState(5);

  return (
    <CustomerLayout>
    <div className=" h-screen flex flex-col justify-center items-center gap-5">
      <img src={logo} alt="logo" className="w-30 mx-10" width={200} />
      <p className=" font-semibold text-lg text-[#0E479F] ">
        เปลี่ยนถ่ายน้ำมันเครี่อง mobil ที่บ้าน
      </p>
      <div className=" shadow-lg flex flex-col gap-5  items-center rounded-xl justify-center p-10">
        <p className=" font-semibold text-xl text-[#0E479F] ">
          {" "}
          ให้คะแนนการบริการ
        </p>
        <img src={face} alt="" width={80} height={80} />
        <div className="flex gap-2">
          {new Array(5).fill(0).map((_, index) => (
            <FaStar
              className={`text-[36px]  ${
                score > index ? "text-[#0E479F]" : "text-gray-200"
              }`}
              onClick={() => setScore(index + 1)}
            />
          ))}
        </div>
        <Button asChild variant={"outline"} className="w-full rounded-xl px-2">
          <Link to="/" >
          <div className="flex  justify-between items-center w-full">
            <span className=" font-light text-xs text-gray-300">ร้องเรียนปัญหาที่พบเจอ</span>
            <ChevronRight className="font-light text-gray-300 p" />
            </div>
          </Link>
        </Button>
      </div>
      <Button asChild className="bg-[#0E479F] rounded-2xl  px-10">
        <Link to="/">ส่งคะแนน</Link>
      </Button>
    </div>
    </CustomerLayout>
  );
}
