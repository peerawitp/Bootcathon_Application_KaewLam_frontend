import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import couponIcon from "@/assets/coupon_icon.png";
import fireIcon from "@/assets/fire.png"

const dataUser = {
    point: 400,
}


export default function ReviewPage() {
    
  
    return (
      <CustomerLayout>
        <div>
            <div className="flex justify-center py-[28px]">
                <div className="bg-[#0E479F] w-[250px] p-5 rounded-lg font-bold">
                    <p className="text-white text-[16px]">แต้มของคุณ:</p>
                    <h1 className="text-[36px]"> 
                        <span className="text-[#FFD233]">400</span>
                        <span className="text-white">   คะแนน</span>
                    </h1>
                </div>
                <div className="pl-[14px] w-[120px] h-[130px] ">
                    <Button className="w-full h-full drop-shadow-lg flex flex-col text-[16px] font-medium gap-3 bg-[#D4D4D4] border-[#D4D4D4]" variant="outline">
                    <img src={couponIcon} alt="" style={{ width: '40px', height: '40px'}}/>
                    คูปองของฉัน
                    </Button>
                </div>
            </div>
            
            
        </div>
      </CustomerLayout>
    )
}