import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Mobil-1-Logo.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "@/api/instance";

// interface User {
//   name: string;
//   surname: string;
//   tel: string;
//   email: string;
// }

export default function RegisterPage() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    apiInstance({
      url: "/customer/register",
      method: "post",
      data: {
        firstName: firstName,
        lastName: lastName,
        mobilePhone: mobilePhone,
        email: email,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/customer/add-car");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CustomerLayout>
      <div className="flex-col flex w-screen justify-center items-center ">
        <div className=" flex flex-col h-screen lg:w-2/5 items-center justify-center gap-5 p-7">
          <img src={logo} alt="logo" className="w-30 mx-10" width={200} />
          <p className=" font-semibold text-lg text-[#0E479F] ">
            เปลี่ยนถ่ายน้ำมันเครี่อง mobil ที่บ้าน
          </p>
          <div className="flex flex-col gap-4 shadow-lg p-5 w-full rounded-2xl items-center">
            <p>กรุณากรอกข้อมูล</p>

            <Input
              id="name"
              placeholder="ชื่อ"
              className=" rounded-lg"
              onChange={(e) => setFirstName(e.target.value)}
              required={true}
            />
            <Input
              id="surname"
              placeholder="นามสกุล"
              className=" rounded-lg"
              onChange={(e) => setLastName(e.target.value)}
              required={true}
            />
            <Input
              id="tel"
              placeholder="เบอร์โทรศัพท์"
              className=" rounded-lg"
              onChange={(e) => setMobilePhone(e.target.value)}
              required={true}
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className=" rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex gap-2 mb-5">
            <Checkbox
              id="consent"
              checked={check}
              onCheckedChange={() => setCheck(!check)}
            />
            <label
              htmlFor="consent"
              className="text-sm font-medium leading-none text-pretty peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ฉันยอมรับข้อกำหนดและเงื่อนไขของ Mobil 1 Center และรับทราบ
              นโยบายความเป็นส่วนตัว และอนุญาติให้ “ Mobil 1 Center ”
              แบ่งปันข้อมูลที่จำเป็นสำหรับการลงทะเบียนใช้งาน Mobil 1 Center
            </label>
          </div>
          <Button
            disabled={!check}
            className={`bg-[#0E479F] rounded-2xl  px-12 `}
            onClick={handleRegister}
          >
            ลงทะเบียน
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
}
