import { FaStar } from "react-icons/fa";

interface InfoM1CProps {
  name: string;
  review: number;
  date: string;
  address: string;
}

export default function InfoM1C({ name, review, date, address }: InfoM1CProps) {
  if (!name) {
    return null;
  }
  return (
    <div className="flex flex-col p-6 w-full  gap-2">
      <p className=" text-2xl font-bold">{name}</p>
      <div className="flex items-center gap-1">
        <p>{review}</p>
        {new Array(5).fill(0).map((_, index) => (
          <FaStar
            className={`text-[15px]  ${
              review > index ? "text-[#FFD233]" : "text-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-5">
        <span className=" w-3/12">เวลาเปิด-ปิด :</span>
        <span className="w-8/12">{date} </span>
      </div>
      <div className="flex gap-5">
        <span className="w-3/12">ที่อยู่ร้าน :</span>
        <span className="w-8/12">{address} </span>
      </div>
    </div>
  );
}

