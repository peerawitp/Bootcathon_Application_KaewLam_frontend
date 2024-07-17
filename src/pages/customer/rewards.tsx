import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import couponIcon from "@/assets/coupon_icon.png";
import RewardDetail from "@/components/rewards/reward-detail";
import TotalRewards from "@/components/rewards/total-rewards";


export default function ReviewPage() {
 
    return (
      <CustomerLayout>
        <div>
            <div className="flex justify-center pt-[28px] pb-[24px]">
                <div className="bg-[#0E479F] w-[250px] p-5 rounded-lg font-bold">
                    <p className="text-white text-[16px]">แต้มของคุณ:</p>
                    <h1 className="text-[36px]"> 
                        <span className="text-[#FFD233]">400</span>
                        <span className="text-white">   คะแนน</span>
                    </h1>
                </div>
                <div className="pl-[14px] w-[120px] h-[130px] ">
                    <Button className="w-full h-full drop-shadow-lg flex flex-col text-[16px] font-medium gap-3 bg-[#EDEBF2] border-[#D4D4D4]" variant="outline">
                    <img src={couponIcon} alt="" style={{ width: '40px', height: '40px'}}/>
                    คูปองของฉัน
                    </Button>
                </div>
            </div>
            <div className="px-6">
                <TotalRewards></TotalRewards>
            </div>   
            
        </div>
      </CustomerLayout>
    )
}