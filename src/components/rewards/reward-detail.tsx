import * as React from "react";
import picReward from "@/assets/picDetailReward.png";
import { Heart } from 'lucide-react';
import PointExchangeButton from "@/components/rewards/button-exchange";


export function RewardDetail() {
    const data = {
        couponID: "1",
        nameCoupon: "GenPay Gift Voucher",
        value: 500,
      };



  return (
    <div>
        <div className="flex justify-center">
            <img src={picReward} alt="" style={{ width: '374px', height: '340px'}}/>
        </div>
        <div className="grid grid-rows-2 gap-y-64 mt-3">
            <div>
                <div className="flex justify-between">
                    <p className="font-bold text-[24px]">{data.nameCoupon}</p>
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center">
                            <Heart />
                            <p className="pl-2">312 Likes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[14px]">มูลค่า {data.value} บาท</p>
                </div>
            </div>
            <div className="w-374 h-109">
                <PointExchangeButton></PointExchangeButton>
            </div>
        </div>
    </div>
   
  );
}

export default RewardDetail;
