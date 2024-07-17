import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  IoPerson,
  IoCarSportSharp,
  IoClipboardSharp,
  IoChevronForwardOutline,
} from "react-icons/io5";
import {
  fetchCustomerCar,
  fetchBookingHistory,
  fetchCarBrand,
} from "@/lib/profile/fetch-data";
import TrackCard from "./track-card";
import { DropdownComponent } from "./dropdown-component";
import { useProfileStore } from "@/stores/profileStore";

export function TabComponent() {
  const button_style =
    "bg-red-600 shadow-md shadow-red-400 w-1/3 h-full rounded-xl overflow-hidden";
  const [CustomerCarData, setCustomerCarData] = useState<any[]>([]);
  const [bookingHistoryData, setBookingHistoryData] = useState<any[]>([]);
  const [carBrandData, setCarBrandData] = useState<any[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isAddCar, setIsAddCar] = useState<boolean>(false);

  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    fetchCustomerCar({
      setCustomerCarData,
    });
    fetchBookingHistory({
      setBookingHistoryData,
    });
    fetchCarBrand({
      setCarBrandData,
    });
  }, []);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
  };

  const handleBackClick = () => {
    setSelectedBrand(null);
    setIsAddCar(false);
  };

  const renderBrandList = () =>
    CustomerCarData.map((item, index) => (
      <div
        onClick={() => handleBrandClick(item.CarModel.brandName)}
        className="space-y-1 bg-white px-4 py-8 drop-shadow-md rounded-xl flex justify-between hover:cursor-pointer hover:scale-105 transition-transform"
        key={index}
      >
        <div>{item.CarModel.brandName}</div>
        <div>
          <IoChevronForwardOutline className="" />
        </div>
      </div>
    ));

  const renderCarList = (brand: string) => {
    const carDetail = CustomerCarData.find(
      (item) => item.CarModel.brandName === brand,
    );
    const sectionStyle = "font-bold text-md";
    return (
      <div className="flex-col">
        <div>
          <p className={sectionStyle}>ยี่ห้อรถ</p>
          <p>{carDetail.CarModel.brandName}</p>
        </div>
        <div>
          <p className={sectionStyle}>รุ่นรถ</p>
          <p>{carDetail.CarModel.model}</p>
        </div>
        <div>
          <p className={sectionStyle}>ปีรถ</p>
          <p>{carDetail.CarModel.year}</p>
        </div>
        <div>
          <p className={sectionStyle}>ความหนืดน้ำมัน</p>
          <p>{carDetail.CarModel.oilViscosity}</p>
        </div>
      </div>
    );
  };

  const renderAddCarForm = () => {
    return (
      <div>
        <DropdownComponent data={carBrandData} />
      </div>
    );
  };

  interface MyContentProps {
    render: () => any;
    tabName: string;
    button?: () => any;
    value: string;
  }

  const MyContent = ({ render, tabName, button, value }: MyContentProps) => {
    return (
      <TabsContent value={value}>
        <Card>
          <CardHeader>
            <CardTitle>{tabName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">{render()}</CardContent>
          <CardFooter>{button && button()}</CardFooter>
        </Card>
      </TabsContent>
    );
  };

  const renderUserInfo = () => {
    if (!profile) {
      return <div>Loading...</div>;
    }
    const info = `${profile?.firstName} ${profile?.lastName}`;
    const phone = profile?.mobilePhone;

    return (
      <div>
        <div className="space-y-1">
          <Label htmlFor="full-name">ชื่อ-นามสกุล</Label>
          <Input id="full-name" defaultValue={info} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="live-in">ที่อยู่</Label>
          <Input id="live-in" defaultValue="Bangkok" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone-no">เบอร์โทรติดต่อ</Label>
          <Input id="phone-no" defaultValue={phone} />
        </div>
      </div>
    );
  };

  const renderCarInfo = () => {
    if (selectedBrand === null) {
      if (isAddCar) {
        return renderAddCarForm();
      }
      return renderBrandList();
    } else {
      if (isAddCar) {
        return renderAddCarForm();
      }
      return renderCarList(selectedBrand);
    }
  };

  const renderCarInfoButton = () => {
    if (selectedBrand) {
      if (isAddCar) {
        return (
          <div className="gap-3 flex flex-row">
            <Button onClick={handleBackClick}>กลับ</Button>
            <Button>ยืนยันการแก้ไข</Button>
          </div>
        );
      }
      return (
        <div className="gap-3 flex flex-row">
          <Button onClick={handleBackClick}>กลับ</Button>
          <Button onClick={() => setIsAddCar(true)}>แก้ไขข้อมูล</Button>
        </div>
      );
    } else {
      if (isAddCar) {
        return (
          <div className="gap-3 flex flex-row">
            <Button onClick={handleBackClick}>กลับ</Button>
            <Button>ยืนยันการเพิ่มรถยนต์</Button>
          </div>
        );
      }
      return <Button onClick={() => setIsAddCar(true)}>เพิ่มรถยนต์</Button>;
    }
  };

  const renderTrack = () => {
    return bookingHistoryData.map((item, index) => (
      <TrackCard key={index} item={item} />
    ));
  };

  return (
    <Tabs defaultValue="user-info" className="w-[400px]">
      <TabsList className="w-full flex text-white bg-transparent justify-between gap-3 h-1/6">
        <TabsTrigger className={button_style} value="user-info">
          <div className="flex flex-col h-full justify-around items-center p-1">
            <IoPerson className="w-1/3 h-1/3 flex flex-col" />
            <p>ข้อมูลส่วนตัว</p>
          </div>
        </TabsTrigger>
        <TabsTrigger className={button_style} value="car-info">
          <div className="flex flex-col h-full justify-around items-center p-1">
            <IoCarSportSharp className="w-1/3 h-1/3" />
            <p>ข้อมูลรถยนต์</p>
          </div>
        </TabsTrigger>
        <TabsTrigger className={button_style} value="track">
          <div className="flex flex-col h-full justify-around items-center p-1">
            <IoClipboardSharp className="w-1/3 h-1/3" />
            <p>ประวัติการใช้งาน</p>
          </div>
        </TabsTrigger>
      </TabsList>
      {MyContent({
        render: renderUserInfo,
        tabName: "ข้อมูลส่วนตัว",
        button: () => <Button>ยืนยันการแก้ไข</Button>,
        value: "user-info",
      })}
      {MyContent({
        render: renderCarInfo,
        tabName: "ข้อมูลรถยนต์",
        button: renderCarInfoButton,
        value: "car-info",
      })}
      {MyContent({
        render: renderTrack,
        tabName: "ประวัติการใช้งาน",
        value: "track",
      })}
    </Tabs>
  );
}
