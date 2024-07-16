import pin from "@/assets/pin.png";
import mobil_pin from "@/assets/mobilPin.png";

import { useOrderStore } from "@/stores/orderStore";
import { currencyFormat } from "@/lib/utils";

interface DetailProps {
  data: {
    addresCustomer: string;
    addresM1: string;
    date: string;
    product: {
      name: string;
      price: string;
    }[];
    service: number;
    discount: number;
    total: string;
  };
}

const OrderDetail = ({ data }: DetailProps) => {
  const selectedProduct = useOrderStore((state) => state.selectedProduct);
  const selectedCenter = useOrderStore((state) => state.selectedCenter);
  const userAddress = useOrderStore((state) => state.userAddress);
  const selectedDateTime = useOrderStore((state) => state.selectedDateTime);
  const serviceCost = useOrderStore((state) => state.serviceCost);

  return (
    <div className="m-5 ">
      <hr style={{ borderTop: "1px solid lightgrey " }} className="mb-2"></hr>
      <p className=" font-bold text-lg pt-2">รายละเอียดการจอง</p>
      <div className="flex gap-2 items-center my-4">
        <img src={pin} alt="" className="h-8" />
        <p className=" px-5 text-wrap">{userAddress}</p>
      </div>
      <div className="flex gap-2 items-center my-3">
        <img src={mobil_pin} alt="" className="h-8" />
        <p className=" px-5 text-wrap">{selectedCenter?.address}</p>
      </div>
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-4"></hr>
      <div className="flex justify-between items-center ">
        <p>วันที่และเวลา :</p>
        <p>
          {selectedDateTime?.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" เวลา "}
          {selectedDateTime?.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-4"></hr>
      {selectedProduct && (
        <div className="flex justify-between items-center py-2">
          <p>{selectedProduct.name}</p>
          <p>
            ~{currencyFormat(selectedProduct.priceRange[0])}-
            {currencyFormat(selectedProduct.priceRange[1])}
          </p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <p>ค่าบริการ</p>
        <p>{currencyFormat(serviceCost)}</p>
      </div>
      {data.discount == 0 ? (
        <></>
      ) : (
        <div className="flex justify-between items-center py-5">
          <p>ส่วนลด</p>
          <p>{currencyFormat(0)}</p>
        </div>
      )}
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-4"></hr>
      <div className="flex justify-between items-center">
        <p>ยอดรวม</p>
        <p>
          ~ {currencyFormat(selectedProduct?.priceRange[0]! + serviceCost)}-
          {currencyFormat(selectedProduct?.priceRange[1]!)}
        </p>
      </div>
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-4"></hr>
      <p className=" text-xs text-end">
        *ทั้งนี้ราคาน้ำมันอาจมีการเปลี่ยนแปลงตามอู่กำหนด
      </p>
    </div>
  );
};

export default OrderDetail;
