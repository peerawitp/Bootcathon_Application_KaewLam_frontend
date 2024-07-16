import { formatThaiTimestamp } from "@/lib/profile/format-time";
import { Badge } from "../ui/badge";
import { IoChevronForwardOutline } from "react-icons/io5";

const TrackCard = ({ item }: any) => {
    const maxAddressLength = 20;
    const truncateAddress = (address: string, maxLength: number) => {
      if (address.length > maxLength) {
        return `${address.substring(0, maxLength)}...`;
      }
      return address;
    };
  
    return (
      <div onClick={() => console.log('go to nha sud tai')} className="flex flex-row shadow-lg w-full h-full p-3 rounded-xl gap-2 hover:cursor-pointer">
        <div className="w-3/12 flex justify-center rounded-xl h-fit">
          <img src="/fuel-icon.svg" alt="" />
        </div>
        <div className="flex flex-col w-7/12 gap-3">
          <div className="gap-2 flex flex-col">
            <Badge variant="default" className="w-fit">{item.bookingState}</Badge>
            <p>{formatThaiTimestamp(item.bookingDate)}</p>
          </div>
          <div className="text-sm flex gap-2">
            <div className="w-1/12">
              <img src="/marker-user.png" className="w-full" alt="" />
            </div>
            <div className="w-11/12">{truncateAddress(item.customerAddress, maxAddressLength)}</div>
          </div>
        </div>
        <div className="w-2/12">
          <IoChevronForwardOutline className="h-full w-full" />
        </div>
      </div>
    );
  };

export default TrackCard;