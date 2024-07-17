import hotIcon from "@/assets/fire.png"
import RewardCard from "@/components/rewards/reward-card"
import { SearchIcon } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button"


export function TotalRewards() {
    const data = {
        couponID: "1",
        nameCoupon: "GenPay Gift Voucher",
        value: 500,
      };


  return (
    <div className="grid grid-cols-1 gap-5">
        <div className="bg-[url('D:\mobil-1-services\src\assets\picHotCard.png')] w-[374px] h-[198px]">
          <div className="flex pl-3 pt-3">
            <img src={hotIcon} alt="" style={{ width: '40px', height: '40px'}}/>
              <div className="pl-2 flex flex-col justify-center  text-white">
                <p className="font-bold text-[14px]">Most Likes</p>
                <p className="text-[10px]">Recommended</p>
              </div>
          </div>
        </div>
        <div className="relative">
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[#DDDDDD] text-[#49454F]"
              placeholder="ค้นหา"
            />
            <div className="flex">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Menu className="w-5 h-5 text-[#49454F]" aria-hidden="true" />
              </div>
              <div className="absolute inset-y-0 left-80 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-[#49454F]" aria-hidden="true" />
              </div>
            </div>
        </div>
        <div className="flex justify-between mx-6 text-[14px] text-[#49454F] ">
          <div>
            <Button className="rounded-none bg-white text-[#49454F] inline-block border-b-2 border-transparent hover:border-transparent hover:bg-transparent active:border-b-2 active:border-[#49454F] focus:outline-none">ทั้งหมด</Button>
          </div>
          <div>
            <Button className="rounded-none bg-white text-[#49454F] inline-block border-b-2 border-transparent hover:border-transparent hover:bg-transparent active:border-b-2 active:border-[#49454F] focus:outline-none">สิทธิพิเศษ</Button>
          </div>
          <div>
            <Button className="rounded-none bg-white text-[#49454F] inline-block border-b-2 border-transparent hover:border-transparent hover:bg-transparent active:border-b-2 active:border-[#49454F] focus:outline-none">คูปอง</Button>
          </div>

        </div>
        <div className="grid grid-cols-2 gap-5">
          <RewardCard></RewardCard>
          <RewardCard></RewardCard>
          <RewardCard></RewardCard>
          <RewardCard></RewardCard>
        </div>
    </div>
   
  );
}

export default TotalRewards;
