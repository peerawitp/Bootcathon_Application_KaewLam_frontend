import { useNavigate } from "react-router-dom";

export function RewardCard() {
    const data = {
        couponID: "1",
        nameCoupon: "GenPay Gift Voucher",
        value: 500,
        point: 680,
      };
    const narigate = useNavigate();


  return (
    <div className="bg-[url('@/assets/picCardReward.png')] w-[173px] h-[189px] flex flex-col justify-end text-white" onClick={()=>narigate("/customer/reward-detail")}>
        <div className="pl-3">
            <p className="text-[14px]">{data.nameCoupon}</p>
            <p className="text-[10px]">มูลค่า {data.value} บาท...</p>
        </div>
        <div className="flex justify-end">
            <p className="text-[14px] font-bold pb-2 pr-3">{data.point} pts</p>
        </div>
    </div>
   
  );
}

export default RewardCard;
