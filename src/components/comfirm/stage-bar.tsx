import { ReceiptText, Clock4, Check } from "lucide-react";
import { Avatar } from "../ui/avatar";


interface StatusBarProp {
  status: number;
}

export default function StatusBar({ status }: StatusBarProp) {
  return (
    <div className="relative  w-[350px]  items-center">
      <div
        style={{ top: "50%" }}
        className="absolute  w-[350px] h-1 bg-gray-400 -z-50"
      >
        <div
          style={{
            top: "50%",
            height: "100%",
            width: `${status}%`,
            backgroundColor: "#0E479F",
            borderRadius: "inherit",
            textAlign: "left",
            transition: " 0.5s ease-in",
          }}
        ></div>
      </div>
      <div className=" w-full flex gap-[2px] justify-between  ">
        <Avatar  className="bg-[#0E479F] text-white justify-center items-center  ">
          <ReceiptText />
        </Avatar>
        <Avatar style={{transition:" 0.4s",transitionDelay:"0.5s"}} className={` text-white justify-center text-center items-center ${status >= 50 ? "bg-[#0E479F]" : "bg-gray-400"} `}>
          <Clock4 />
        </Avatar>
        <Avatar style={{transition:" 0.4s",transitionDelay:"0.5s"}}  className={` text-white justify-center text-center items-center ${status > 50 ? "bg-[#0E479F]" : "bg-gray-400"}`}>
          <Check />
        </Avatar>
      </div>
    </div>
  );
}
