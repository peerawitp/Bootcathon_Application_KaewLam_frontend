import CustomerLayout from "@/components/layouts/CustomerLayout";
import CouponCard from "@/components/coupon/coupon-card"
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function couponPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
    
  
    return (
      <CustomerLayout>
        <div className="flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-4 border-b-[#797979] border-b-[1px]">
                <X className="mt-7 ml-7" onClick={()=>navigate(-1)}/>
                <div className="flex justify-start text-[24px] font-semibold pt-[20px] pb-[17px] text-[#0E479F] col-span-2">
                    <h1>คูปองของฉัน</h1>
                </div>
            </div>
            <CouponCard></CouponCard>
            <CouponCard></CouponCard>
            <CouponCard></CouponCard>
        </div>
      </CustomerLayout>
    )
}