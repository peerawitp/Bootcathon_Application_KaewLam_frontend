
import pin from "@/assets/pin.png";
import mobil_pin from "@/assets/mobilPin.png";

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
  function currencyFormat(num:number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"+"บ." );
  }

  return (
    <div className="m-5 ">
      <hr style={{ borderTop: "1px solid lightgrey "}} className="my-2"></hr>
      <p className=" font-bold text-lg pt-2">รายละเอียดการจอง</p>
      <div className="flex gap-2 items-center my-4">
        <img src={pin} alt="" className="h-8" />
        <p className=" px-5 text-wrap">{data.addresCustomer}</p>
      </div>
      <div className="flex gap-2 items-center my-3">
        <img src={mobil_pin} alt="" className="h-8" />
        <p className=" px-5 text-wrap">{data.addresM1}</p>
      </div>
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-5"></hr>
      <div className="flex justify-between items-center ">
        <p>วันที่และเวลา :</p>
        <p>{data.date}</p>
      </div>
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-5"></hr>
      {data.product.map((item,index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <p>ค่าบริการ</p>
        <p>{currencyFormat(data.service)}</p>
      </div>
      {data.discount == 0 ? (
        <></>
      ) : (
        <div className="flex justify-between items-center py-5">
          <p>ส่วนลด</p>
          <p>{currencyFormat(data.discount)}</p>
        </div>
      )}
      <hr style={{ borderTop: "1px solid lightgrey " }} className="my-5"></hr>
      <div className="flex justify-between items-center">
          <p>ยอดรวม</p>
          <p>{data.total}</p>
        </div>
        <hr style={{ borderTop: "1px solid lightgrey " }} className="my-5"></hr>
        <p className=" text-xs text-end">*ทั้งนี้ราคาน้ำมันอาจมีการเปลี่ยนแปลงตามอู่กำหนด</p>
    </div>
  );
};

export default OrderDetail;
