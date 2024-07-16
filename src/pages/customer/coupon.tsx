import CustomerLayout from "@/components/layouts/CustomerLayout";
import CouponCard from "@/components/coupon/coupon-card"
import { X } from 'lucide-react';

export default function couponPage() {
    
  
    return (
      <CustomerLayout>
        <div className="flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-4 border-b-[#797979] border-b-[1px]">
                <X className="mt-7 ml-7"/>
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