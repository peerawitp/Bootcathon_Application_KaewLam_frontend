import apiInstance from "@/api/instance";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import Car from "@/components/booking/SelecCar";

import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";

function CustomerBookPage() {
  const { liffObject, status } = useLine();
  const { idToken } = useLineInfo({ liff: liffObject, status });

  // API Example
  apiInstance({
    method: "GET",
    url: "/",
  }).then((res) => {
    console.log(res);
  });

  return (
    <CustomerLayout>
        <Car/>
    </CustomerLayout>
  );
}

export default CustomerBookPage;
