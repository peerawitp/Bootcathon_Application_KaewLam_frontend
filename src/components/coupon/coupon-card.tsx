import { Button } from "@/components/ui/button"
import logo from "@/assets/Mobil-1-Logo.png"


export function CouponCard() {
    const data = {
        pomotion: 'ส่วนลด 5 %',
        company:'Mobil 1 Center',
        expirationDate:'1 ต.ค 2024',
    };


  return (
    <div className="flex justify-center">
        <div className="w-[385px] h-[120px] bg-[url('D:\CNC\Exxon_Mobil\mobil-1-services\src\assets\coupon_bg.png')] bg-transparent hover:bg-transparent flex flex-col justify-center mt-4">
        <div className="grid grid-cols-3 gap-[29px] ">
            <img src={logo} alt="" className="w-[82px] h-[33px] ml-8 mt-5"/>
            <div className="flex col-span-2 ml-3">
                <div>
                    <p className="text-[24px] font-semibold">{data.pomotion}</p>
                    <p className="text-[16px] font-medium">{data.company}</p>
                    <p className="text-[10px] mt-3">ใช้ได้ถึงวันที่ {data.expirationDate}</p>
                </div>
                <div className="ml-5 w-[70px] h-[30px] ">
                    <Button className="w-[70px] h-[30px] mt-6 bg-[#0E479F]">
                        ใช้คูปอง
                    </Button>
                </div>
                </div>
            </div>
        </div>

    </div>
    
   
  );
}

export default CouponCard;